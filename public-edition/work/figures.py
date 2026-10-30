"""Original vector illustrations. Coordinates are editorial schematics, not drawings for fabrication."""
from math import sin, cos, pi, atan2
from reportlab.graphics.shapes import Drawing, Rect, Circle, Line, Polygon, PolyLine, String, Ellipse
from reportlab.lib.colors import HexColor, Color, white
from reportlab.pdfbase.pdfmetrics import stringWidth
from calculations import trajectories

NAVY=HexColor('#102D40'); INK=HexColor('#243844'); TEAL=HexColor('#137E82')
COPPER=HexColor('#BA6C45'); LIGHT=HexColor('#E9EFED'); PALE=HexColor('#F6F4EE')
GRAY=HexColor('#667780'); BLUE=HexColor('#DCE7EC')
W=424

def text(d,x,y,s,size=10,color=INK,font='Sans',anchor='start'):
    d.add(String(x,y,str(s),fontName=font,fontSize=size,fillColor=color,textAnchor=anchor))

def wrap(d,x,y,s,width,size=10,color=INK,font='Sans',leading=None):
    leading=leading or size*1.3
    words=str(s).split(); lines=[]; line=''
    for word in words:
        trial=(line+' '+word).strip()
        if stringWidth(trial,font,size)>width and line:
            lines.append(line); line=word
        else: line=trial
    if line: lines.append(line)
    for i,l in enumerate(lines): text(d,x,y-i*leading,l,size,color,font)
    return len(lines)*leading

def line(d,x1,y1,x2,y2,color=GRAY,width=1,dash=None):
    d.add(Line(x1,y1,x2,y2,strokeColor=color,strokeWidth=width,strokeDashArray=dash))

def arrow(d,x1,y1,x2,y2,color=TEAL,dash=None,width=1.5):
    line(d,x1,y1,x2,y2,color,width,dash)
    a=atan2(y2-y1,x2-x1); r=5
    d.add(Polygon([x2,y2,x2-r*cos(a-.5),y2-r*sin(a-.5),x2-r*cos(a+.5),y2-r*sin(a+.5)],fillColor=color,strokeColor=color))

def box(d,x,y,w,h,title,body='',accent=TEAL):
    d.add(Rect(x,y,w,h,rx=4,ry=4,fillColor=white,strokeColor=LIGHT,strokeWidth=.8))
    d.add(Rect(x,y,w,3,fillColor=accent,strokeColor=None))
    wrap(d,x+10,y+h-18,title,w-20,10.5,accent,'SansB')
    if body: wrap(d,x+10,y+h-36,body,w-20,9,GRAY)

def panel(h=260):
    d=Drawing(W,h)
    d.add(Rect(0,0,W,h,fillColor=PALE,strokeColor=None,rx=5,ry=5))
    return d

def badge(d,x,y,n,color=TEAL):
    d.add(Circle(x,y,10,fillColor=color,strokeColor=None)); text(d,x,y-3,str(n),9,white,'SansB','middle')

def flow(nodes,sub='',h=235,connected=True):
    d=panel(h); n=len(nodes); cols=min(n,3); rows=(n+cols-1)//cols
    bw=120; bh=65; gap=18
    for i,(title,body) in enumerate(nodes):
        row=i//cols; col=i%cols
        if connected and row%2:col=cols-1-col
        x=14+col*(bw+gap); y=h-24-(row+1)*bh-row*24
        box(d,x,y,bw,bh,title,body)
        if connected and i+1<n:
            if i%cols<cols-1:
                if row%2:arrow(d,x-2,y+bh/2,x-gap+3,y+bh/2)
                else:arrow(d,x+bw+2,y+bh/2,x+bw+gap-3,y+bh/2)
            else:arrow(d,x+bw/2,y-2,x+bw/2,y-20,COPPER,dash=[3,2])
    if sub: wrap(d,15,24,sub,W-30,9,GRAY)
    return d

def feedback():
    d=panel(340)
    box(d,14,244,120,70,'DESIGN','Requirements, models, review')
    box(d,152,244,120,70,'PRODUCTION','Materials become parts')
    box(d,290,244,120,70,'INSPECTION','Evidence before release')
    box(d,290,128,120,70,'DEPLOYMENT','Accepted useful hardware')
    box(d,152,128,120,70,'MAINTENANCE','Diagnose, repair, retest')
    box(d,14,128,120,70,'LEARNING','Measured results change designs')
    for a,b in [((134,280),(149,280)),((272,280),(287,280)),((350,241),(350,202)),((287,163),(276,163)),((149,163),(138,163)),((74,202),(74,240))]: arrow(d,*a,*b)
    box(d,14,30,396,64,'EXTERNAL SUPPORT','Materials + energy + labor + capital + suppliers + demand',COPPER)
    for x in (74,212,350): arrow(d,x,96,x,124,COPPER,[4,3])
    text(d,105,219,'Feedback can improve capability.',9,TEAL)
    text(d,20,12,'Constraints, waste and wear remain inside the accounting.',9,GRAY)
    return d

def history():
    d=panel(275); x=46
    line(d,x,32,x,244,TEAL,2)
    entries=[('Reference surfaces','Make a stable geometric starting point.'),('Interchangeability','Parts fit without individual hand adjustment.'),('Machine tools + power','Repeat controlled transformations.'),('Numerical control + CAD','Express geometry and process in data.'),('Robotics + metrology','Execute and verify more complex tasks.'),('Connected evidence','Preserve what was made and why it passed.')]
    for i,(a,b) in enumerate(entries):
        y=245-i*40; badge(d,x,y,str(i+1)); text(d,67,y+2,a,10.5,TEAL,'SansB'); text(d,67,y-13,b,9,GRAY)
    return d

def plate(d,x,y,w=150,h=60,color=BLUE):
    skew=24; thick=9
    d.add(Polygon([x,y,x+w,y,x+w+skew,y+h,x+skew,y+h],fillColor=color,strokeColor=NAVY,strokeWidth=1))
    d.add(Polygon([x,y,x+w,y,x+w,y-thick,x,y-thick],fillColor=LIGHT,strokeColor=NAVY,strokeWidth=.8))
    d.add(Polygon([x+w,y,x+w+skew,y+h,x+w+skew,y+h-thick,x+w,y-thick],fillColor=GRAY,strokeColor=NAVY,strokeWidth=.8))
    for dx,dy in [(28,16),(w-28,16),(40,h-14),(w-16,h-14)]:
        d.add(Ellipse(x+dx,y+dy,4,2.5,fillColor=PALE,strokeColor=NAVY,strokeWidth=.8))

def exploded():
    d=panel(315)
    plate(d,65,55,160,70); plate(d,88,155,126,52)
    for x in (112,194):
        line(d,x,218,x,183,TEAL,2); d.add(Ellipse(x,219,7,3,fillColor=TEAL,strokeColor=NAVY))
        line(d,x,153,x-10,94,GRAY,.8,[3,3])
    d.add(Rect(142,214,42,25,fillColor=LIGHT,strokeColor=NAVY));text(d,163,225,'sensor',8,INK,anchor='middle')
    arrow(d,241,66,278,66,COPPER); wrap(d,286,76,'Base: 120 x 80 x 6 mm',120,10)
    line(d,238,176,274,176,GRAY);wrap(d,282,188,'Removable plate: 80 x 50 x 4 mm',126,10)
    line(d,202,219,274,254,GRAY);wrap(d,282,266,'Captive retention fasteners',125,10)
    text(d,18,286,'MERIDIAN / EXPLODED SERVICE CONCEPT',10,TEAL,'SansB')
    text(d,18,22,'Illustrative envelope. Not a released fabrication drawing.',9,GRAY)
    return d

def assembly():
    d=panel(230)
    titles=['01 / GUIDE','02 / SEAT','03 / RETAIN']
    for i in range(3):
        x=16+138*i; text(d,x,207,titles[i],10,TEAL,'SansB')
        plate(d,x+3,77,82,35); plate(d,x+12,135-i*17,64,25)
        arrow(d,x+52,164-i*17,x+52,125-i*10,COPPER)
        wrap(d,x,46,['Alignment enters before connector.','Confirm interface seating without forcing.','Secure, inspect and function-test.'][i],121,9)
    return d

def alignment():
    d=panel(260)
    for i,(x,name) in enumerate([(45,'Nominal'),(235,'Offset')]):
        text(d,x+45,225,name,11,TEAL,'SansB','middle')
        d.add(Rect(x,100,105,78,fillColor=BLUE,strokeColor=NAVY))
        for xx in (x+25,x+80):d.add(Circle(xx,139,12,fillColor=white,strokeColor=NAVY))
        dx=0 if i==0 else 8
        for xx in (x+25+dx,x+80+dx):d.add(Circle(xx,139,6,fillColor=COPPER,strokeColor=None))
        line(d,x+25,85,x+25,190,GRAY,.7,[3,3]);line(d,x+80,85,x+80,190,GRAY,.7,[3,3])
    arrow(d,267,194,280,194,COPPER)
    wrap(d,18,61,'Two individually acceptable parts can still have a difficult fit. Define functional datums, clearance and the tolerance stack together.',388,10)
    return d

def tolerance():
    d=panel(275)
    text(d,18,244,'ONE-DIMENSIONAL CLEARANCE / ILLUSTRATIVE',10,TEAL,'SansB')
    d.add(Rect(28,127,169,73,fillColor=BLUE,strokeColor=NAVY))
    d.add(Rect(50,127,125,48,fillColor=PALE,strokeColor=NAVY))
    d.add(Rect(239,127,130,48,fillColor=LIGHT,strokeColor=NAVY))
    text(d,112,213,'Opening',10,TEAL,'SansB','middle');text(d,304,213,'Tongue',10,COPPER,'SansB','middle')
    text(d,112,103,'20.00 +/- 0.05 mm',10,INK,anchor='middle');text(d,304,103,'19.80 +/- 0.04 mm',10,INK,anchor='middle')
    line(d,20,83,404,83,LIGHT,1)
    text(d,20,61,'MINIMUM GAP',9,TEAL,'SansB');text(d,172,61,'19.95 - 19.84 = 0.11 mm',10)
    text(d,20,36,'MAXIMUM GAP',9,COPPER,'SansB');text(d,172,36,'20.05 - 19.76 = 0.29 mm',10)
    return d

def degreepath():
    d=panel(310)
    entries=[('FOUNDATIONS','Placement -> algebra / trigonometry / precalculus'),('LOWER DIVISION','Calculus + physics + chemistry + programming'),('TRANSFER PREPARATION','Eligibility + major preparation + GE + articulation'),('UPPER DIVISION','Structures, fluids, thermal, controls, design'),('EVIDENCE + DEPTH','Projects, laboratories, internships and electives')]
    for i,(t,b) in enumerate(entries):
        y=246-i*54;badge(d,28,y+10,i+1);text(d,50,y+15,t,9.5,TEAL,'SansB');wrap(d,50,y,b,350,9)
    text(d,18,17,'Conditional concept map. Exact college equivalencies require verification.',8.6,COPPER)
    return d

def calibration():
    return flow([('REFERENCE','Known value + uncertainty'),('CALIBRATION','Comparison and correction'),('WORKING GAUGE','Condition and drift checks'),('PART MEASUREMENT','Method + environment'),('DECISION','Acceptance rule'),('INDEPENDENT CHECK','Catch shared assumptions')],'Traceability connects measurements; it does not make uncertainty zero.',255)

def semiconductor():
    d=panel(285); box(d,141,116,142,65,'WORKING CHIP','One small item; many process capabilities')
    nodes=[(14,207,'MATERIALS','Purity, gases, chemicals'),(286,207,'PATTERNING','Optics, masks, equipment'),(14,27,'CONTROL','Cleanroom + stable utilities'),(286,27,'FINISH','Metrology, packaging, test')]
    for x,y,t,b in nodes:
        box(d,x,y,124,63,t,b,COPPER); arrow(d,x+62,y+(0 if y>180 else 63),212,181 if y>180 else 116,GRAY)
    return d

def robot_forms():
    d=panel(285)
    forms=[('Fixed arm','Stable base; flexible reach.'),('Gantry','Structured workspace; direct axes.'),('Mobile base','Travel + docking + traffic.'),('Crawler','Uses structure for support.'),('Underwater vehicle','Pressure, drag, buoyancy.'),('Humanoid','Human access; more mechanisms.')]
    for i,(a,b) in enumerate(forms):
        x=14+(i%3)*138; y=170-(i//3)*125
        if i==0:
            line(d,x+25,y+18,x+42,y+63,NAVY,5);line(d,x+42,y+63,x+83,y+44,NAVY,5);d.add(Circle(x+42,y+63,7,fillColor=TEAL,strokeColor=None))
        elif i==1:
            line(d,x+20,y+10,x+20,y+65,NAVY,3);line(d,x+100,y+10,x+100,y+65,NAVY,3);line(d,x+20,y+65,x+100,y+65,NAVY,4);line(d,x+65,y+65,x+65,y+27,TEAL,3)
        elif i==2:
            d.add(Rect(x+25,y+25,72,28,fillColor=BLUE,strokeColor=NAVY));[d.add(Circle(xx,y+20,9,fillColor=TEAL,strokeColor=None)) for xx in (x+39,x+83)]
        elif i==3:
            line(d,x+10,y+34,x+109,y+34,NAVY,2);d.add(Rect(x+34,y+34,48,27,fillColor=BLUE,strokeColor=NAVY));line(d,x+45,y+60,x+66,y+82,TEAL,3)
        elif i==4:
            d.add(Ellipse(x+62,y+45,48,20,fillColor=BLUE,strokeColor=NAVY));d.add(Circle(x+26,y+45,10,fillColor=TEAL,strokeColor=None));line(d,x+65,y+25,x+75,y+8,TEAL,2)
        else:
            d.add(Circle(x+62,y+75,9,fillColor=TEAL,strokeColor=None));line(d,x+62,y+64,x+62,y+36,NAVY,4)
            for a1,b1 in [((62,57),(35,43)),((62,57),(88,43)),((62,36),(45,10)),((62,36),(78,10))]:line(d,x+a1[0],y+a1[1],x+b1[0],y+b1[1],NAVY,3)
        text(d,x,y-3,a,10,TEAL,'SansB');wrap(d,x,y-18,b,123,8.7)
    return d

def control():
    d=panel(235)
    for x,t,b in [(12,'PLAN','Desired state'),(151,'CONTROL','Compare + command'),(290,'MACHINE','Physical response')]:box(d,x,137,122,64,t,b)
    arrow(d,135,169,148,169);arrow(d,275,169,287,169)
    box(d,151,29,122,64,'MEASURE','State + uncertainty',COPPER)
    arrow(d,351,135,351,59,COPPER);arrow(d,351,59,276,59,COPPER);arrow(d,151,59,74,59,COPPER);arrow(d,74,59,74,134,COPPER)
    text(d,294,111,'disturbance',9,GRAY);arrow(d,383,111,383,136,GRAY,[3,3])
    return d

def frames():
    d=panel(245)
    for x,y,name in [(55,55,'WORLD'),(188,88,'ROBOT'),(318,145,'PART')]:
        arrow(d,x,y,x+47,y,TEAL);arrow(d,x,y,x,y+47,COPPER);text(d,x-5,y-20,name,10,NAVY,'SansB');text(d,x+49,y-4,'x',9);text(d,x-4,y+52,'y',9)
    arrow(d,70,80,174,110,GRAY,[4,3]);arrow(d,210,124,303,158,GRAY,[4,3]);wrap(d,18,220,'A position needs a frame. A transform relates frames.',388,11,TEAL,'SansB')
    return d

def maintenance():
    d=panel(305)
    for x,y,w,t,b in [(131,229,162,'OBSERVE','What changed?'),(131,130,162,'DIAGNOSE','Which cause fits the evidence?'),(14,27,120,'LOCAL REPAIR','Tools + access + parts'),(152,27,120,'MODULE SWAP','Known replacement'),(290,27,120,'WAIT / REDESIGN','Preserve recoverability')]:box(d,x,y,w,65,t,b)
    arrow(d,212,226,212,198)
    for x in (74,212,350):arrow(d,212,127,x,95)
    text(d,19,10,'Every path returns through a release test.',9,COPPER,'SansB')
    return d

def smallparts(page=1):
    d=panel(472)
    items=([('BEARING','Controls relative motion. Precision surfaces, lubricant and cleanliness remain dependencies.'),('SEAL','Keeps environments apart. Material compatibility and surface condition determine performance.'),('CONNECTOR','Joins systems physically and electrically. Alignment, retention and repeated use all matter.'),('GAUGE','Makes a requirement measurable. Its condition and uncertainty need a reference.')]
           if page==1 else [('FILTER','Protects a process by capturing contamination. Replacement media must be supplied.'),('CUTTING TOOL','Makes parts by wearing itself. Geometry, material and tool-life evidence matter.'),('CALIBRATION ARTIFACT','Checks the checker. Damage or drift can corrupt a whole measurement chain.'),('FASTENER','Retains an assembly. Access, preload and loss prevention shape repairability.')])
    for i,(title,body) in enumerate(items):
        x=18+(i%2)*205; y=252-(i//2)*220
        cx=x+87; cy=y+125
        if title=='BEARING':
            for r in (50,34,19):d.add(Circle(cx,cy,r,fillColor=white if r==50 else None,strokeColor=NAVY,strokeWidth=2))
            for a in range(8):d.add(Circle(cx+42*cos(a*pi/4),cy+42*sin(a*pi/4),6,fillColor=TEAL,strokeColor=None))
        elif title=='SEAL':
            d.add(Ellipse(cx,cy,55,26,fillColor=NAVY,strokeColor=None));d.add(Ellipse(cx,cy+2,39,15,fillColor=PALE,strokeColor=None))
        elif title=='CONNECTOR':
            d.add(Rect(cx-44,cy-23,88,46,rx=6,ry=6,fillColor=BLUE,strokeColor=NAVY));d.add(Rect(cx-9,cy+23,18,10,fillColor=COPPER,strokeColor=NAVY))
            for j in range(4):d.add(Circle(cx-27+j*18,cy,4,fillColor=TEAL,strokeColor=None))
        elif title=='GAUGE':
            line(d,cx-55,cy,cx+55,cy,NAVY,6);line(d,cx-45,cy,cx-45,cy+40,NAVY,5);line(d,cx+15,cy,cx+15,cy+40,NAVY,5);d.add(Rect(cx-5,cy-13,37,24,fillColor=TEAL,strokeColor=None));text(d,cx+13,cy-3,'0.00',8,white,anchor='middle')
        elif title=='FILTER':
            d.add(Rect(cx-43,cy-38,86,76,fillColor=white,strokeColor=NAVY))
            for j in range(9):line(d,cx-37+j*9,cy-33,cx-37+j*9,cy+33,TEAL,1)
        elif title=='CUTTING TOOL':
            d.add(Polygon([cx-47,cy-25,cx+47,cy-25,cx,cy+52],fillColor=BLUE,strokeColor=NAVY,strokeWidth=2));d.add(Circle(cx,cy,10,fillColor=PALE,strokeColor=NAVY));d.add(Circle(cx,cy+44,3,fillColor=COPPER,strokeColor=None))
        elif title=='CALIBRATION ARTIFACT':
            plate(d,cx-64,cy-20,95,44,LIGHT);d.add(Circle(cx,cy+15,22,fillColor=white,strokeColor=TEAL,strokeWidth=2))
        else:
            line(d,cx,cy-35,cx,cy+33,NAVY,11);d.add(Polygon([cx-22,cy+30,cx-12,cy+45,cx+12,cy+45,cx+22,cy+30,cx+12,cy+15,cx-12,cy+15],fillColor=TEAL,strokeColor=NAVY))
            for yy in range(-28,11,7):line(d,cx-8,cy+yy,cx+8,cy+yy+6,COPPER,1)
        text(d,x,y+53,title,10,TEAL,'SansB');wrap(d,x,y+34,body,175,10,INK,leading=13.5)
    return d

def power():
    d=panel(270)
    box(d,15,171,116,73,'MACHINE','2 kW x 3 h = 6 kWh')
    box(d,154,171,116,73,'SUPPORT','0.5 kW x 8 h = 4 kWh')
    box(d,293,171,116,73,'CELL TOTAL','10 kWh in the shift',COPPER)
    arrow(d,133,207,150,207);arrow(d,272,207,290,207)
    text(d,18,136,'ENERGY',10,TEAL,'SansB');text(d,140,136,'An amount accumulated over time.',10)
    text(d,18,106,'POWER',10,COPPER,'SansB');text(d,140,106,'The instantaneous rate of delivery.',10)
    line(d,18,88,406,88,LIGHT,1)
    wrap(d,18,65,'Battery example: 12 kWh x 0.80 usable x 0.90 conversion = 8.64 kWh delivered. Peak-power capability is a separate requirement.',388,10)
    return d

def heat():
    d=panel(290)
    entries=[('EARTH','Machine -> coolant / air -> surroundings','Fans, pumps, heat exchangers; room conditions.'),('OCEAN','Equipment -> housing / exchanger -> water','Pressure enclosure, corrosion, fouling, flow.'),('ORBIT','Equipment -> thermal path -> radiator -> space','Area, temperature, optical properties, view.')]
    for i,(t,path,body) in enumerate(entries):
        y=213-i*88;box(d,14,y,396,72,t,path,TEAL if i<2 else COPPER);text(d,25,y+12,body,8.7,GRAY)
    return d

def throughput():
    d=panel(275); labels=['Fabrication','Assembly','Test']; vals=[5.184,4.655,3.42]
    for i,(a,v) in enumerate(zip(labels,vals)):
        y=210-i*58;text(d,16,y+7,a,10,INK,'SansB');d.add(Rect(112,y,250*v/6,24,fillColor=TEAL if i<2 else COPPER,strokeColor=None));text(d,119+250*v/6,y+7,f'{v:.3f}',10)
    text(d,112,245,'Station accepted capacity / scheduled hour',9,GRAY)
    wrap(d,16,39,'Original line: 27.36 accepted units / shift. Target: 30. Improving test to 12 minutes raises the modeled line to 34.20.',392,10)
    return d

def growthplot():
    d=panel(330); series=trajectories(); colors=[GRAY,TEAL,COPPER,NAVY]
    # Two scales keep constrained trajectories legible without hiding the reference.
    for p,(left,bottom,pw,ph,limit,title) in enumerate([(38,186,354,108,160,'Ideal reference / installed capacity'),(38,43,354,108,14,'Constrained cases / active capacity')]):
        text(d,left,bottom+ph+13,title,10,INK,'SansB')
        line(d,left,bottom,left+pw,bottom);line(d,left,bottom,left,bottom+ph)
        for val in [0,limit/2,limit]:
            yy=bottom+ph*val/limit;line(d,left,yy,left+pw,yy,LIGHT,.6);text(d,left-7,yy-3,f'{val:g}',8,GRAY,anchor='end')
        for t in (0,20,40,60):text(d,left+pw*t/60,bottom-13,str(t),8,GRAY,anchor='middle')
        keys=['Ideal reference'] if p==0 else ['Supported growth','Component limit','Neglect + shock']
        for key in keys:
            idx=list(series).index(key);rows=series[key]; field='installed' if p==0 else 'active'
            pts=[]
            for r in rows:pts.extend([left+pw*r['period']/60,bottom+ph*r[field]/limit])
            d.add(PolyLine(pts,strokeColor=colors[idx],strokeWidth=1.8,fillColor=None,strokeDashArray=[4,2] if idx==3 else None))
    for i,(label,color) in enumerate(zip(['Supported','Component-limited','Neglect + shock'],colors[1:])):
        x=22+i*135;line(d,x,18,x+18,18,color,2);text(d,x+23,15,label,8.5,color)
    return d

def evidence():
    d=panel(284)
    entries=[('Principle','Does known physics permit it?'),('Model','What assumptions produce the result?'),('Experiment','What worked in controlled conditions?'),('Relevant environment','Does it work under mission conditions?'),('Pilot operation','Can the integrated process deliver?'),('Repeated deployment','Can it sustain useful service?')]
    for i,(a,b) in enumerate(entries):
        y=238-i*40;d.add(Rect(16,y-10,58+i*28,27,fillColor=TEAL if i>3 else BLUE,strokeColor=None));text(d,28,y,str(i+1),10,white if i>3 else NAVY,'SansB');text(d,214,y+4,a,9.8,TEAL,'SansB');text(d,214,y-9,b,7.8,GRAY)
    text(d,16,13,'Announcements and ambitions are claims to evaluate, not maturity levels.',8.7,COPPER)
    return d

def digital():
    return flow([('REQUIREMENT','What must be true?'),('REVISION','Which design applies?'),('PROCESS','How was it made?'),('SERIAL RECORD','Which item and batch?'),('TEST EVIDENCE','Why was it accepted?'),('SERVICE HISTORY','What changed in use?')],'A controlled change preserves the links; an attractive dashboard does not create them.',254)

def shipyard():
    d=panel(310)
    # Isometric block assembly beneath a simple gantry.
    for i in range(4):
        x=40+i*80;y=75+i*14
        d.add(Polygon([x,y,x+65,y+11,x+89,y+61,x+24,y+50],fillColor=BLUE,strokeColor=NAVY))
        line(d,x+25,y+8,x+49,y+58,TEAL,2)
    line(d,42,54,42,251,NAVY,4);line(d,378,111,378,251,NAVY,4);line(d,42,251,378,251,NAVY,5)
    line(d,229,251,229,199,TEAL,2);line(d,229,199,193,155,TEAL,2);line(d,229,199,268,168,TEAL,2)
    text(d,18,286,'BLOCKS + ACCESS + MEASUREMENT + SHARED RESOURCES',9.3,TEAL,'SansB')
    wrap(d,19,31,'Assembly order determines what tools can reach. Heat and handling change as-built geometry.',386,10)
    text(d,282,226,'shared crane',9,GRAY);text(d,57,203,'module interface',9,GRAY);arrow(d,113,196,122,151,GRAY)
    return d

def ocean():
    d=panel(320)
    for y in (275,265,255):line(d,14,y,410,y,BLUE,1)
    d.add(Rect(0,0,424,242,fillColor=BLUE,strokeColor=None))
    line(d,14,39,410,39,NAVY,2)
    d.add(Rect(58,40,90,45,fillColor=white,strokeColor=NAVY));text(d,103,58,'DOCK',10,TEAL,'SansB','middle')
    d.add(Ellipse(273,145,61,26,fillColor=white,strokeColor=NAVY,strokeWidth=1.5));d.add(Circle(229,145,12,fillColor=TEAL,strokeColor=None))
    arrow(d,244,113,148,71,TEAL,[4,3]);arrow(d,148,97,225,157,COPPER,[4,3])
    wrap(d,17,300,'RESIDENT INSPECTION SYSTEM / CONCEPT',390,10,TEAL,'SansB')
    wrap(d,183,62,'Power + data + alignment + recovery',210,10)
    wrap(d,19,218,'The dock extends the vehicle. It is also a shared dependency.',165,10)
    text(d,288,185,'task-specific vehicle',9,GRAY);line(d,334,180,314,165,GRAY)
    return d

def orbital():
    d=panel(335)
    # Open schematic, with omitted enclosure to expose support systems.
    d.add(Rect(138,99,126,90,fillColor=BLUE,strokeColor=NAVY,strokeWidth=1.3))
    for x in (15,293):
        d.add(Rect(x,120,116,55,fillColor=LIGHT,strokeColor=NAVY))
        for j in range(1,6):line(d,x+j*19.3,120,x+j*19.3,175,TEAL,.6)
    line(d,264,149,293,149,NAVY,3);line(d,131,149,138,149,NAVY,3)
    line(d,201,189,225,241,NAVY,5);line(d,225,241,292,267,NAVY,4)
    for x,y in [(201,189),(225,241),(292,267)]:d.add(Circle(x,y,6,fillColor=COPPER,strokeColor=None))
    for i in range(4):d.add(Rect(147+i*27,108,20,34,fillColor=white,strokeColor=TEAL))
    line(d,141,79,262,79,GRAY,6)
    text(d,18,309,'MERIDIAN-O / IMPORTED MODULE ASSEMBLY',10,TEAL,'SansB')
    text(d,15,188,'solar generation',9,GRAY);text(d,289,189,'thermal radiator',9,GRAY)
    text(d,289,289,'arm + end tool',9,GRAY)
    text(d,154,163,'fixture / inspection',9,NAVY)
    text(d,154,150,'storage in service bus',8,GRAY)
    wrap(d,19,51,'Delivered modules, restrained inventory, spare tools and a quarantine location. No local chip or actuator production assumed.',389,10)
    return d

def momentum():
    d=panel(240)
    d.add(Rect(50,69,113,82,fillColor=BLUE,strokeColor=NAVY));text(d,106,105,'BASE',11,TEAL,'SansB','middle')
    line(d,163,110,238,160,NAVY,6);line(d,238,160,322,125,NAVY,6)
    d.add(Circle(238,160,8,fillColor=COPPER,strokeColor=None));d.add(Rect(322,112,50,29,fillColor=LIGHT,strokeColor=NAVY))
    arrow(d,78,177,130,177,TEAL);arrow(d,326,177,274,177,COPPER)
    text(d,18,216,'Internal motion changes the base response.',11,TEAL,'SansB')
    wrap(d,18,39,'For an isolated system, total momentum is conserved. Grasping and moving a payload couples arm, base and flexible structure.',390,10)
    return d

def lunar():
    d=panel(310)
    stages=[('LAND + CHECK','Delivered equipment must survive and report its state.'),('UNLOAD + DEPLOY','Mobility, restraint, power and recovery come first.'),('VERIFY + PRODUCE','Make a coupon; inspect it against declared criteria.'),('MAINTAIN + LEARN','Use imported spares; preserve return-to-service evidence.')]
    for i,(t,b) in enumerate(stages):
        y=232-i*68;badge(d,28,y+24,i+1);box(d,48,y,361,58,t,b,TEAL if i<3 else COPPER)
    return d

def inventory():
    d=panel(300)
    cols=[('LOCAL / CANDIDATE',['Regolith collection','Simple construction coupons','Some fixtures after validation']),('IMPORTED / REQUIRED',['Sensors and electronics','Precision mechanisms','Seals, lubricants, cables']),('SUPPORT / REQUIRED',['Campaign power + thermal control','Metrology and records','Recovery tools and spares'])]
    for i,(a,items) in enumerate(cols):
        x=14+i*138;box(d,x,24,120,248,a,'',TEAL if i==0 else COPPER)
        for j,b in enumerate(items):wrap(d,x+10,193-j*58,b,100,10)
    return d

def mars():
    d=panel(270)
    d.add(Circle(64,159,29,fillColor=BLUE,strokeColor=TEAL));d.add(Circle(352,159,25,fillColor=COPPER,strokeColor=None))
    text(d,64,111,'EARTH',10,TEAL,'SansB','middle');text(d,352,111,'MARS',10,COPPER,'SansB','middle')
    arrow(d,102,185,317,185,TEAL);text(d,210,199,'cargo: planned transport opportunities',9,GRAY,anchor='middle')
    arrow(d,317,145,103,145,COPPER,[4,3]);arrow(d,103,139,317,139,COPPER,[4,3]);text(d,210,120,'commands + data: delay and interruptions',9,GRAY,anchor='middle')
    wrap(d,18,73,'Local operating decisions need bounded autonomy, inventories, fault recovery and evidence. Atmospheric oxygen production is one capability, not a whole industrial network.',389,10)
    text(d,18,242,'LOGISTICS CHANGES THE AUTONOMY REQUIREMENT',10,TEAL,'SansB')
    return d

def closure():
    d=panel(300);rows=['Bulk structure','Precision motion','Electronics','Consumables','Reference hardware','Specialist support'];cols=['Earth cell','Orbital yard','Lunar study']
    text(d,18,272,'DEPENDENCY MATRIX / ILLUSTRATIVE BOUNDARIES',10,TEAL,'SansB')
    for j,c in enumerate(cols):text(d,183+j*82,240,c,9,INK,'SansB','middle')
    vals=[['L','I','P'],['I','I','I'],['I','I','I'],['I','I','I'],['I','I','I'],['E','E','E']]
    for i,r in enumerate(rows):
        y=202-i*29;text(d,15,y,r,9.5)
        for j,v in enumerate(vals[i]):
            d.add(Rect(151+j*82,y-8,64,23,fillColor=TEAL if v=='L' else LIGHT,strokeColor=white));text(d,183+j*82,y,v,10,white if v=='L' else COPPER,'SansB','middle')
    wrap(d,15,30,'L local in declared scope / I imported / P proposed local process / E external expertise. A mass percentage cannot replace this map.',394,9)
    return d

def mathpath():
    return flow([('ALGEBRA','Units, ratios, rearranging laws'),('TRIGONOMETRY','Force components and reach'),('CALCULUS','Changing motion and accumulation'),('LINEAR ALGEBRA','Frames and coupled systems'),('DIFFERENTIAL EQS','Dynamics, heat and feedback'),('STATISTICS','Variation, tests and uncertainty')],'Concept map, not a verified personal course schedule.',254)

def projects():
    d=panel(300)
    stages=[('OBSERVE','Draw a mechanism. Explain what moves and what constrains it.'),('MEASURE','Define a quantity. Repeat the measurement and estimate uncertainty.'),('BUILD + REVISE','Make a benign interface. Compare serviceability across revisions.'),('MODEL + TEST','Predict behavior. Challenge the model with measured evidence.'),('INTEGRATE','Own a small subsystem through requirements and acceptance.')]
    for i,(a,b) in enumerate(stages):
        y=247-i*52;badge(d,28,y+8,i+1);text(d,50,y+12,a,10,TEAL,'SansB');wrap(d,50,y-3,b,352,9)
    return d

def roles():
    d=panel(285)
    rows=[('Mechanisms','Interfaces + motion','CAD, loads, tests'),('Controls','Desired behavior','Models, feedback, logs'),('Manufacturing','Repeatable quality','Tools, process, yield'),('Test / integration','Evidence of function','Fixtures, procedures, data'),('Materials / processes','Properties in context','Samples, microscopy, qualification')]
    text(d,16,258,'ROLE',9,TEAL,'SansB');text(d,147,258,'PRIMARY QUESTION',9,TEAL,'SansB');text(d,290,258,'DAILY EVIDENCE',9,TEAL,'SansB')
    for i,row in enumerate(rows):
        y=220-i*42;line(d,14,y-19,410,y-19,LIGHT,1)
        for j,s in enumerate(row):wrap(d,[16,147,290][j],y,s,[122,132,116][j],9.5)
    text(d,16,19,'Actual responsibilities vary by team; job titles are imperfect maps.',9,GRAY)
    return d

def graduate():
    d=panel(310)
    box(d,105,228,214,65,'START WITH A QUESTION','What capability do you want to gain?')
    for x,t,b in [(14,'COURSEWORK MS','Structured depth and applied work.'),(152,'THESIS MS','A bounded research question.'),(290,'PHD','Create and defend new knowledge.')]:
        box(d,x,108,120,84,t,b);arrow(d,212,225,x+60,196)
    box(d,14,16,396,64,'CHECK FIT','Advisor + methods + funding + time + actual project access',COPPER)
    for x in (74,212,350):arrow(d,x,105,x,84,COPPER)
    return d

REGISTRY={
 'feedback':('The industrial feedback loop',feedback,'Original systems diagram. Solid arrows show useful feedback; dashed arrows keep external support visible. No acceleration percentages are assumed.'),
 'history':('The accumulated ability to repeat',history,'Conceptual historical sequence, not a claim that one technique replaced every earlier technique.'),
 'release_gates':('From intention to accepted hardware',lambda:flow([('REQUIRE','Function and environment'),('MODEL','Loads and assumptions'),('PLAN','Make and measure'),('BUILD','Controlled process'),('VERIFY','Evidence against requirements'),('RELEASE','Authorized configuration')],'A change can reopen an earlier gate.',254),'Original release-chain schematic.'),
 'exploded_mechanism':('A small, serviceable machine interface',exploded,'MERIDIAN fictional carrier. Dimensions define a teaching envelope; geometry is schematic and not to scale.'),
 'assembly_sequence':('Guide before you retain',assembly,'Original conceptual assembly sequence. Retention and positioning serve different functions.'),
 'tolerance_alignment':('Where nominal geometry meets variation',alignment,'Illustrative alignment diagram; offsets exaggerated for visibility.'),
 'tolerance_stack':('The clearance that survives the limits',tolerance,'Original worst-case calculation from Chapter5. Schematic geometry is not to scale; shape and angular effects are excluded.'),
 'measurement_chain':('Who checks the checker?',calibration,'Original conceptual measurement chain. Independent checks help reveal common-mode errors.'),
 'semiconductor_dependencies':('The industrial network inside a chip',semiconductor,'Simplified dependency map. It omits many specialized processes and suppliers.'),
 'manufacturing_choice':('Choose the process for the requirement',lambda:flow([('MACHINE','Precision and stock removal'),('FORM','Shape by controlled deformation'),('CAST / MOLD','Tooling and repeated geometry'),('PRINT','Complexity + finishing needs'),('STOCK','Standard parts and inventory'),('REPAIR','Restore useful function')],'Compare accepted lifecycle output, not the attractiveness of the machine.',254,False),'Original comparison of process options; no process is universally preferred.'),
 'robot_forms':('The environment helps choose the robot',robot_forms,'Six conceptual forms, not vendor products. Stability, access and support determine the useful architecture.'),
 'control_loop':('Planning meets physical feedback',control,'Original conceptual feedback loop. Measurement uncertainty and disturbances remain part of the system.'),
 'coordinate_frames':('A coordinate is a relationship',frames,'Two-dimensional teaching schematic. Real spatial transformations also include the third dimension.'),
 'maintenance_tree':('A failure is the start of a decision',maintenance,'Original recovery framework. Diagnosis, access, resources and release testing determine which path is possible.'),
 'small_parts_1':('The Small Parts That Hold Up the Big Future / I',lambda:smallparts(1),'Original schematic objects. These small interfaces can carry large functional dependencies.'),
 'small_parts_2':('The Small Parts That Hold Up the Big Future / II',lambda:smallparts(2),'Original schematic objects. Local structural mass does not replace these process capabilities.'),
 'power_budget':('The two promises of electrical supply',power,'All inputs are illustrative. Energy capacity and peak-power capability must be checked separately.'),
 'heat_worlds':('The same heat, three different exits',heat,'Original comparison. Every environment requires an engineered path from heat source to sink.'),
 'throughput':('The slowest useful flow sets the pace',throughput,'Original calculation using the MERIDIAN assumptions in Chapter12. Rates refer to station accepted capacity; line flow is checked sequentially.'),
 'growth':('Growth under declared constraints',growthplot,'Original toy model. Periods and capacity units are abstract. Upper and lower panels use different vertical scales; these curves are not forecasts.'),
 'evidence_ladder':('Ask what the demonstration establishes',evidence,'Book framework, not an official maturity standard. Every level still needs a task boundary and evidence.'),
 'digital_thread':('The product carries a history',digital,'Original information-chain diagram. Traceability connects a physical item to the evidence supporting it.'),
 'shipyard':('A yard must coordinate geometry and access',shipyard,'Original schematic, not a depiction of a particular ship or shipyard.'),
 'ocean_residency':('A resident robot is more than a vehicle',ocean,'Original conceptual resident inspection system. Docking does not imply universal autonomous repair.'),
 'orbital_yard':('A modest orbital assembly yard',orbital,'MERIDIAN-O fictional architecture. Imported modules and support systems remain explicit; no flight qualification claimed.'),
 'orbital_momentum':('The arm moves its own world',momentum,'Qualitative free-floating reaction diagram. Arrow lengths do not encode a measured velocity.'),
 'orbital_economics':('What must earn its place in orbit?',lambda:flow([('CUSTOMER','A defined useful service'),('ALTERNATIVE','Launch larger or deploy?'),('UTILIZATION','How much recurring work?'),('SUPPORT','Spares, operations, disposal'),('RISK','Delivery and recovery'),('VALUE','Accepted service over life')],'Technical possibility and economic value are separate tests.',254),'Original decision framework; no invented launch-price forecast.'),
 'lunar_deployment':('The first factory must first start',lunar,'MERIDIAN-L fictional sunlit campaign sequence. Recovery equipment is delivered before it is needed.'),
 'lunar_inventory':('What still has to arrive?',inventory,'Illustrative dependency categories for the separate lunar design study. Local processes require validation.'),
 'lunar_repair':('The supported lunar repair sequence',lambda:flow([('SECURE LOAD','Confirm the support state'),('DIAGNOSE','Bounded tests, no forced motion'),('CONFIRM ACCESS','Tools and evidence ready'),('SWAP CARTRIDGE','Imported spares: two to one'),('QUARANTINE','Retain the failed module'),('RELEASE TEST','Staged return to service')],'No internal actuator rebuilding capability is assumed.',254),'MERIDIAN-L fictional recovery. The delivered support fixture and imported cartridge make the repair possible.'),
 'mars_logistics':('Distance turns logistics into autonomy requirements',mars,'Original conceptual map; no mission schedule or communication-delay value is encoded.'),
 'closure_matrix':('Closure has more than one dimension',closure,'Book framework. Earth local structure means machining imported stock. Reference hardware is imported while measurements are performed locally. Categories are not closure percentages.'),
 'future_horizons':('Milestones before calendars',lambda:flow([('NEXT DECADE','Bounded tasks + service evidence'),('MID-CENTURY','Conditional integrated infrastructure'),('LATE CENTURY','Conditional wider industrial networks'),('ENABLE','Quality + maintenance + power'),('CHALLENGE','Costs + failures + weak demand'),('REVISE','Update beliefs from evidence')],'Three horizons organize questions; they are not predictions.',254),'Original conditional scenario framework.'),
 'math_path':('Mathematics becomes a language for hardware',mathpath,'Conceptual learning map, not course articulation or an enrollment promise.'),
 'degree_path':('A conditional route into aerospace engineering',degreepath,'Planning concept only. Remaining degree sequences vary by program and preparation; this map promises no individual duration.'),
 'subject_hardware':('Courses become engineering questions',lambda:flow([('STATICS','What supports the load?'),('DYNAMICS','How does motion change?'),('MATERIALS','What deforms or fails?'),('FLUIDS','What does air or water do?'),('THERMAL','Where does energy go?'),('CONTROLS','How does it behave reliably?')],'Aerospace foundations transfer through the questions they let you answer.',254,False),'Original subject-to-hardware map.'),
 'project_ladder':('Build evidence before complexity',projects,'Original progression. Supervision and equipment requirements vary by project.'),
 'role_comparison':('Different roles, shared physical systems',roles,'Illustrative role comparison. Read current job responsibilities, not only the degree title.'),
 'graduate_map':('Choose graduate study by the work',graduate,'Original decision map. Program requirements and funding must be verified for the relevant application year.'),
 'research_cycle':('From an apparatus to a research contribution',lambda:flow([('QUESTION','What is not yet known?'),('BASELINE','What already works?'),('METHOD','What will you change?'),('EXPERIMENT','Which evidence discriminates?'),('LIMITS','Where does the result fail?'),('CONTRIBUTION','What can others now decide?')],'A working demonstration is a beginning; a research claim needs a comparison.',254),'Original research-method map for the graduate chapters.'),
}

ALIASES={'industrial_feedback':'feedback','industrial_loop':'feedback','mechanism_exploded':'exploded_mechanism','exploded_carrier':'exploded_mechanism','metrology_chain':'measurement_chain','calibration_chain':'measurement_chain','alignment':'tolerance_alignment','robot_comparison':'robot_forms','feedback_control':'control_loop','maintenance_decision':'maintenance_tree','lunar_seed':'lunar_deployment','local_imports':'lunar_inventory','lunar_imports':'lunar_inventory','prerequisite_path':'math_path','career_roles':'role_comparison','graduate_decision':'graduate_map'}

def get_figure(key):
    key=ALIASES.get(key,key)
    title,fn,caption=REGISTRY[key]
    return title,fn(),caption
