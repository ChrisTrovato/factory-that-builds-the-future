"""Original teaching models for The Factory That Builds the Future.

All numeric assumptions below are illustrative. No industrial forecast is made.
Run with Python 3.11+; standard library only.
"""
import csv
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def station_flow(test_minutes=15):
    cycles = [10, 12, test_minutes]
    availability = [.90, .95, .90]
    yields = [.96, .98, .95]
    gross_caps = [60 / t * a for t, a in zip(cycles, availability)]
    flow = float('inf')
    rows = []
    for name, cap, y in zip(['Fabrication', 'Assembly', 'Test'], gross_caps, yields):
        inputs = min(flow, cap)
        flow = inputs * y
        rows.append(dict(station=name, input_capacity_per_hour=cap,
                         pass_fraction=y, output_per_hour=flow))
    return dict(stations=rows, final_per_hour=flow, final_per_shift=8*flow,
                first_pass_fraction=math.prod(yields))

def growth(*, periods=60, power=12, kits=.8, delay=4, maintenance_fraction=.30,
           care_per_unit=.15, wear=.01, neglect=.10, shock=False):
    installed = 4.0
    pipeline = []
    rows = []
    for t in range(periods + 1):
        arriving = sum(q for due, q in pipeline if due == t)
        pipeline = [(due,q) for due,q in pipeline if due != t]
        installed += arriving
        current_power = 4 if shock and t >=20 else power
        current_kits = 0 if shock and t >=20 else kits
        active = min(installed, current_power)
        gross = active
        required_care = care_per_unit*installed
        care = min(required_care, maintenance_fraction*gross)
        unpaid = max(0, required_care-care)
        loss = wear*installed + (neglect*unpaid/care_per_unit if care_per_unit else 0)
        available = max(0, gross-care)
        starts = min(.5*available/8, current_kits)
        rows.append(dict(period=t,installed=installed,active=active,
                         care=care,unpaid_care=unpaid,loss=loss,starts=starts,
                         pipeline=sum(q for _,q in pipeline)))
        if t == periods:
            break
        installed = max(0, installed-loss)
        # A zero-delay start becomes productive at the next accounting boundary.
        pipeline.append((t+max(1,delay), starts))
    return rows

def trajectories():
    return {
        'Ideal reference': growth(power=1e9,kits=1e9,delay=0,care_per_unit=0,wear=0,neglect=0),
        'Supported growth': growth(),
        'Component limit': growth(kits=.08),
        'Neglect + shock': growth(maintenance_fraction=.03,shock=True),
    }

def main():
    out = ROOT/'model_results'
    out.mkdir(exist_ok=True)
    results = {
        'original_line':station_flow(), 'improved_test':station_flow(12),
        'radiator_m2_per_kw':{str(t):1000/(.85*5.670374419e-8*t**4) for t in (300,350,400)},
        'battery_delivered_kwh':12*.8*.9,
        'battery_hours':12*.8*.9/2.5,
        'heat_joules':2*500*20,
    }
    assert math.isclose(results['original_line']['final_per_shift'],27.36)
    assert math.isclose(results['improved_test']['final_per_shift'],34.2)
    series=trajectories()
    assert math.isclose(series['Ideal reference'][60]['installed'],4*(1.0625)**60,rel_tol=1e-10)
    assert all(r['active'] <= r['installed']+1e-10 for rows in series.values() for r in rows)
    (out/'worked_examples.json').write_text(json.dumps(results,indent=2))
    for name,rows in series.items():
        with (out/(name.lower().replace(' ','_').replace('+','and')+'.csv')).open('w',newline='') as f:
            writer=csv.DictWriter(f,fieldnames=rows[0].keys()); writer.writeheader(); writer.writerows(rows)
    print(json.dumps(results,indent=2))

if __name__=='__main__': main()
