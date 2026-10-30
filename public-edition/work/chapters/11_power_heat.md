# 11. The factory has a pulse

The machining station stops halfway through a cut. The computer is still on. The lights are still on. The building has electricity. Yet the process has lost the particular kind of electrical service it needed at the particular moment it needed it. In a production meeting, someone says the factory needs more energy. That may be true, but it is not yet a diagnosis.

An industrial system lives inside several budgets at once. It has an energy budget over a shift, a power budget over seconds, a temperature budget at every component, and a recovery budget after an interruption. These budgets interact. A slower operation might reduce peak power while consuming more energy because pumps and controllers run longer. A hotter process might improve throughput while shortening tool life. A backup supply might preserve a controller's memory without being able to run the spindle. Words such as power, capacity, cooling, and backup need enough precision to guide a decision.

For a learner, this chapter connects the apparent abstraction of thermodynamics to the physical machine on the bench. A motor turns because energy moves through a chain of conversions. A bearing warms because part of that energy is dissipated. A sensor drifts because temperature changes its behavior. Later, a spacecraft will carry a large radiator because the same bookkeeping has followed us into vacuum. The technology changes; the obligation to account for energy does not.

## Energy is an amount; power is a rate

Imagine MERIDIAN's illustrative machining operation drawing 2 kilowatts of electrical power while it runs for three hours. The operating energy is 2 kilowatts multiplied by three hours, or 6 kilowatt-hours. A kilowatt-hour is an amount of energy, not a rate and not the same thing as a kilowatt. Because one watt is one joule per second, 6 kilowatt-hours also equals 21.6 million joules. The second form is useful in physics; the first is familiar on an electricity bill.

The machine's 2 kilowatts are a teaching input, not a measured specification. If a coolant pump, extraction system, compressor, lighting, computers, and room cooling support the operation, their energy belongs in the factory's budget too. The boundary determines the answer. A supplier might quote energy at the spindle, the machine cabinet, the workcell, or the whole building. Two numbers with the same unit can describe different systems.

Suppose the supporting equipment draws another illustrative 0.5 kilowatts for the same three hours. The immediate cell energy becomes 7.5 kilowatt-hours. If that equipment stays on for an eight-hour shift, its contribution is 4 kilowatt-hours instead, and the combined total is 10 kilowatt-hours. Nothing about the machine's cutting operation changed. The operating policy changed. Leaving support equipment running through idle periods can matter as much as improving a component's peak efficiency.

Now distinguish average demand from peak demand. A device averaging 2 kilowatts may draw more during acceleration, heating, or startup. Its electrical service must tolerate the relevant transient, subject to the actual equipment's design and protection. Dividing daily energy by 24 hours does not size the supply for a machine that operates only briefly and intensely. The factory needs sufficient power when work occurs, not merely sufficient annual energy on a spreadsheet.

### Engineering notebook: a battery is two promises

An illustrative battery stores 12 kilowatt-hours of nominal energy. The operating policy allows 80 percent of that energy to be used, and the electrical conversion efficiency is 90 percent. The delivered energy is therefore 12 x 0.80 x 0.90 = 8.64 kilowatt-hours. At a constant delivered load of 2.5 kilowatts, the idealized duration is 8.64 / 2.5 = 3.456 hours, approximately three hours and 27 minutes.

That calculation says nothing about whether the battery and converter can supply the required peak power. A large reservoir connected through a narrow pipe contains enough water but cannot deliver it quickly. Electrical storage has an analogous distinction between energy capacity and discharge capability. Temperature, aging, reserve policy, and auxiliary consumption can further reduce the useful duration. A real system requires manufacturer data and an engineered installation. This example teaches the accounting rather than specifying equipment to buy or wire.

The same distinction appears in lunar industry. A base might collect enough sunlight over a favorable interval and still fail to survive a dark period or support a high-power process. The power architecture must address timing, location, storage, conversion, and operational priorities. Asking only how many solar panels the base has misses the system.

[[FIG:power_budget]]

## Productive power includes the infrastructure around it

A new machine arriving at a loading dock is not yet new productive capacity. It needs a foundation or mounting arrangement, suitable electrical distribution, environmental control, tools, access, commissioning, and an accepted process. Utility equipment has its own production and supply chain. The Department of Energy's distribution-transformer work illustrates this hidden layer: its public analysis describes specification diversity and efforts to harmonize requirements. Its widely cited lead-time comparison refers to 2019 and 2023 data, not a universal current delivery promise. [I04]

The broader lesson is architectural. If every customer specifies a different accessory or interface, suppliers must manage more variants, inventory, and engineering work. Standardization can reduce that burden, but it must preserve needed performance. A common connector that fails in the actual environment is a false economy. The interesting problem is deciding which variation carries value and which variation exists because nobody coordinated the interfaces.

MERIDIAN faces a smaller version. The team proposes adding a second machining capability. The existing inspection fixture remains the bottleneck, as Chapter 12 will show. Even if the new machine could be installed instantly, it would not increase accepted output. If it also adds heat to a room whose temperature stability matters for measurement, it could make dimensional acceptance harder. A decision that looked like a pure capacity increase has changed the quality environment.

This is why facilities engineers, electricians, controls specialists, technicians, and production engineers belong in the same story as robot designers. The factory's intelligence is partly embodied in the interfaces between their work. A process schedule that avoids simultaneous peaks might improve output without adding generation. A cooling modification might restore measurement stability. A maintenance plan for a common utility might protect several machines at once.

An autonomous factory would have to reason about these dependencies. It cannot treat electricity as an unlimited variable supplied by the simulation engine. It needs observations of actual supply condition, validated operating envelopes, priorities during shortage, and a recovery sequence. A controlled reduction in output can be a better outcome than an abrupt loss of every process in the building.

## Every useful operation leaves a thermal story

Electrical energy entering a motor becomes mechanical work and heat. Mechanical work may move a load, deform material, overcome friction, or accelerate a rotating assembly. Some of that energy can be stored or recovered; much ultimately becomes heat in the surroundings. A machining process also carries energy away in chips, coolant, exhaust, and the workpiece. A thermal analysis must choose the boundary and timescale before declaring where all the energy went.

Heat moves by conduction through matter, by fluid motion, and by electromagnetic radiation. In a terrestrial workcell, these mechanisms overlap. A warm motor conducts heat through its mounting, exchanges heat with air, and radiates to surrounding surfaces. A fan improves airflow but does not destroy heat. It moves heat toward another place where the environment must accept it. A heat exchanger similarly connects two flows; it does not create an infinite sink.

This matters to measurement. A part just removed from a process may not be at the reference temperature used for inspection. Measuring immediately can be appropriate if a validated correction exists, but otherwise the inspection is mixing manufacturing variation with thermal state. A factory that makes a dimension correctly only when its room happens to be cool has an uncontrolled process. Temperature history becomes part of the evidence, particularly when tolerances are tight.

It matters to mechanisms as well. Different materials can expand by different amounts. A shaft, housing, and bearing can change their relative fit as they warm. Lubricant properties change. A cable can become stiff in cold conditions. A seal can behave differently after thermal cycling. The same engineering that makes a terrestrial machine reliable becomes more demanding when the surrounding environment is harder to control.

### Engineering notebook: a warm part has a memory

Take an illustrative component with heat capacity represented by a mass of 2 kilograms and a specific heat of 500 joules per kilogram per kelvin. Raising its average temperature by 20 kelvins requires approximately 2 x500 x20 =20,000 joules, ignoring phase changes and heat lost during warming. At a net heating rate of 100 watts, the idealized time is 200 seconds.

The word net is doing work. If the component loses 40 watts while receiving 100 watts, the net rate at that moment is 60 watts. As temperature changes, losses usually change. The constant-rate calculation is a useful first estimate, not a full transient solution. Differential equations enter when the heating and loss rates depend on the state. Chapter 22 will show why learning them gives a more powerful language for machines rather than merely another hurdle in college.

## Underwater cooling is an exchange, not a gift

Water can carry heat effectively, but an underwater industrial system still requires an engineered thermal path. The heat must travel from electronics or motors to a housing or exchanger. Contact resistances and internal layout can leave a component hot even when the surrounding water is cold. A pressure-resistant enclosure can protect equipment while making heat transfer harder.

The environment also changes the surface. Corrosion, deposits, and biological growth can alter performance. Pumps, if present, consume power and require maintenance. The temperature and flow of surrounding water vary. A thermal design that works in moving cold water may perform differently in a sheltered warm location. The mission must define its conditions rather than borrowing a general intuition about the ocean.

A resident robot's charging dock joins the thermal problem to the operational problem. Charging produces heat, connectors and interfaces need to function repeatedly, and a shared dock can become a fleet-wide dependency. The appeal of residency is that equipment stays near the work. Its price is that the support system must remain dependable there too. Chapter 15 develops this architecture in more detail.

The design opportunity is substantial. Thermal pathways can be incorporated into modular housings, serviceable interfaces, and replaceable equipment. Condition monitoring can reveal degrading performance before a shutdown. But the measurements need an interpretation: a rising internal temperature might indicate a larger load, a fouled exchanger, a failing pump, or an incorrect sensor. The factory's thermal model should help distinguish these explanations rather than merely paint a red warning icon.

## Space changes the final step

In vacuum, a spacecraft cannot reject heat to surrounding air. Heat can move internally through conduction and fluid loops, but its final rejection to space is mainly radiative. The background being cold does not remove the need for a radiator. The surface must have a useful temperature, appropriate optical properties, an unobstructed view, and a connection to the heat sources. Sunlight, reflected light, and radiation from a nearby planet can add heat. NASA's thermal-control survey organizes these coupled effects and the technologies used to manage them. [I05]

A radiator is therefore productive infrastructure. If an orbital facility adds a process that dissipates more heat, the expansion may require radiator area, plumbing, pumps, deployment hardware, structure, and control. A rendering that adds more computers while keeping the cooling system unchanged may depict an impossible operating state. The missing radiator is the space equivalent of the missing electrical substation on Earth.

### Engineering notebook: how much radiator?

For a deliberately simplified case, assume a flat surface at uniform temperature T radiates to a very cold unobstructed sink. Ignore absorbed sunlight, planetary radiation, conduction losses elsewhere, and temperature gradients. Its radiated power is Q = emissivity x sigma x area x T^4. Here Q is watts, area is square meters, T is absolute temperature in kelvins, emissivity is a dimensionless factor between zero and one, and sigma is the Stefan-Boltzmann constant, approximately 5.6704 x10^-8 watts per square meter per kelvin to the fourth power.

Choose illustrative inputs Q =1,000 watts, emissivity =0.85, and T =300 kelvins. Solving for area gives approximately 2.56 square meters of effective radiating area. At 350 kelvins, the same idealized problem requires about 1.38 square meters. At 400 kelvins, it requires about 0.81 square meters. The strong temperature dependence is why hotter heat rejection can be attractive.

But the equipment must tolerate the corresponding temperature, and the thermal pathway must deliver heat to the surface. Raising radiator temperature may require a different process, materials, or a heat pump that consumes power. Area also does not equal total system mass. Tubes, fluid, panels, supports, deployment mechanisms, and protection all count. If both sides of a panel radiate, the area convention must say so. These numbers are a sanity-check exercise, not a design for a spacecraft.

Scale the 300-kelvin example from 1 kilowatt to 10 kilowatts and the idealized effective area becomes 25.6 square meters. At a fixed temperature and emissivity, area grows linearly with heat load. That makes thermal rejection an immediately visible constraint on an orbital manufacturing concept. A stronger claim requires a better model, including actual environmental heating and operating geometry.

[[FIG:heat_worlds]]

## Data centers are factories' customers as well as their tools

AI can help engineers search designs, write analysis code, inspect logs, and compare operating alternatives. The computers supplying that assistance themselves consume manufactured equipment, electricity, cooling, buildings, networks, and maintenance. That creates a potentially reinforcing relationship between computation and industry. It does not erase the physical accounting.

The IEA's2026 central projection puts global data-center electricity consumption at 950 terawatt-hours in 2030, compared with 485 terawatt-hours in 2025. The category covers data centers broadly, and the 2030 value is a projection. The report also identifies bottlenecks involving energy equipment, chips, and finance. These figures establish the scale of an infrastructure problem; they do not measure a self-building capability. [I03]

Consider the phrase one gigawatt of compute. A gigawatt measures power, not intelligence, useful answers, or scientific discoveries. A facility's electrical nameplate, its actual draw, its installed processors, its utilization, and its effective application performance are different quantities. Improving software can increase useful work at the same electrical draw. Increasing demand can then consume the gain. A good industrial argument says which variable it is discussing.

Putting computation underwater or in orbit changes the constraint set. It may offer advantages for a particular architecture, but it also changes installation, maintenance, communications, cooling, replacement, and end-of-life operations. No location wins merely because its background is cold or its imagery is futuristic. The comparison should begin with a defined service and include the full support system.

For MERIDIAN, the immediate opportunity is modest and real: use computation to understand process data and make better decisions. The cell does not need to invent a new data-center architecture before it can reduce defects. For a future orbital yard, computation may be essential to planning and autonomy, but it remains one subsystem among several. An excellent controller cannot operate a gripper with no power, and a large power supply cannot make an uncalibrated measurement trustworthy.

## Designing the graceful shortage

A capable factory should know what to do when resources become scarce. Which process can pause without damaging work? Which temperature must remain controlled? Which records must be preserved? Which machine should finish its current safe sequence before stopping? These are engineering decisions that can be built into operating procedures and verified controls.

The answer is rarely all on or all off. A heat-intensive process may wait while inspection continues. A charging schedule may be staggered. A maintenance operation may become more valuable than another production run during a constrained period. In a remote facility, preserving the ability to restart may outrank maximizing immediate output. Resilience includes the transition between states, not only performance at the nominal point.

This gives readers a practical way to read a futuristic proposal. Trace the power into the system, trace the heat out, and trace what happens during interruption. Ask whether the equipment that maintains those paths is itself serviceable. If the answer is vague, there is an engineering problem waiting to be made concrete. If the answer is careful, the ambition becomes more persuasive because the machine has acquired a believable pulse.
