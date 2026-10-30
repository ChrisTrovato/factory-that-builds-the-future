# 17. Who needs the yard?

The truss is assembled. Its joints have passed inspection. The robot is healthy, the thermal system has margin, and the next delivery could be accepted. Then the customer postpones the instrument that was supposed to use the structure. The yard has solved a physical problem and acquired an economic one.

Industrial capability becomes useful when somebody needs its output enough to support the system that produces it. This is true even when the customer is a public science program rather than a commercial buyer. A scientific mission must justify resources against alternatives. A company must find a sustainable relationship among price, reliability, investment, and demand. A beautiful orbital facility can fail either test while every individual machine works.

This chapter treats economics as engineering with a wider boundary. The comparison includes equipment, operations, transport, delays, risk, and the value of the resulting service. It does not attempt to forecast launch prices or declare a profitable market for a fictional yard. Those quantities depend on contracts, dates, destinations, vehicles, utilization, and capabilities that would require a real project study.

## Begin with the alternative that might make the yard unnecessary

A large space structure could reach orbit in several ways. It could be launched as one piece in a larger vehicle. It could fold and deploy. It could arrive in a few large modules. It could be assembled from many repeated pieces. Some functions could be distributed across several smaller spacecraft instead of concentrated in one large structure.

Each option moves complexity. A one-piece structure may require a larger launch package and demanding ground testing. A deployable structure concentrates engineering in hinges, restraints, release mechanisms, and deployment reliability. An assembled structure needs robotics, interfaces, verification, and logistical coordination. A distributed system may avoid a giant structure while adding synchronization, communication, navigation, and data-combination challenges.

The right question is therefore not whether assembly is possible. It is whether assembly produces a better complete mission under stated constraints. NASA's in-Space Assembled Telescope study was framed around a similar comparison: when does assembling a telescope in space offer advantages over building it on Earth and deploying it from a single launch vehicle? [S25] That framing is more useful than treating in-space assembly as an automatic next step for every observatory.

MERIDIAN-O's proposed scientific support truss is only a starting case. If the instrument can fit on a small deployable boom with adequate performance, the yard may be excessive. If the required structure grows beyond a practical packaging envelope, or if repeated upgrades have high value, assembly may become more attractive. The mission's function determines whether large size is valuable. Size alone is not an economic argument.

## The cost of a job includes the waiting

A factory machine earns its place through useful service over time. An orbital yard carries fixed burdens even while idle. Communications, ground operations, health monitoring, collision assessment, thermal management, and orbit maintenance may continue when no customer hardware is present. Some components age with calendar time, others with operating cycles, and some with environmental exposure. Low utilization spreads those burdens over fewer accepted jobs.

Suppose a terrestrial shop owns a machine that runs only occasionally. The owner may still pay for space, insurance, maintenance, and trained staff. Orbit changes the details but preserves the logic. A robot that performs one difficult operation per year can be worthwhile if that operation is sufficiently valuable. It should not be evaluated as though it worked continuously at its demonstration rate.

Utilization is also constrained by compatibility. A yard may have a free manipulator and available power but lack the tool, fixture, reach, contamination controls, or inspection capability required by the next payload. Calling all unoccupied time available capacity would overstate the business. The useful capacity is capacity for a specific class of accepted work.

A transparent early study can use normalized cost units before credible prices exist. For example, a fixed infrastructure burden of 100 units plus 20 units per job is lower than a 40-unit direct alternative only after more than five equivalent jobs, if all other factors are equal. This is elementary algebra, not a forecast. If only three jobs occur, the yard loses that comparison. If its jobs create substantially more value or reduce failure risk, the comparison must include that difference explicitly.

The exercise exposes the assumption that matters: repeated demand. A spreadsheet can make any ambitious facility look inexpensive by filling every future slot. A serious study asks who will use those slots, which requirements they share, and what happens when demand arrives later or in a different form.

## Delivery is a chain of accepted states

The phrase delivered to orbit conceals several stages. Hardware must be manufactured, inspected, packed, launched, separated, navigated to the worksite, captured, checked, and entered into inventory. A part can survive launch and still arrive in an unusable condition. A vehicle can reach a valid orbit but not the orbit that makes servicing economical. A delayed delivery can leave the yard with equipment but no work.

The destination matters because moving between orbital states takes time and propulsion. A yard is not automatically accessible to every satellite simply because all are in space. Inclination, altitude, orbital phase, fuel, navigation, and safety constraints shape the feasible customer set. This book does not attach universal transport prices to kilograms without specifying where those kilograms must go.

The receiving process should resemble the Earth factory's incoming inspection, adapted to remote conditions. The yard verifies identity, configuration, visible condition, restraint state, and any available health data. It distinguishes an accepted module from one awaiting additional evidence. A suspect delivery should not silently become production inventory because its scheduled arrival was counted as success.

Contingency storage matters. If a customer payload cannot be installed, can it remain safely restrained? Does its thermal design permit waiting? Does it require power? Can it be returned, relocated, or disposed of responsibly? Those questions affect both the physical layout and the contract. The consequences of a failed installation should be planned before the payload arrives.

## Make, stock, repair, or tolerate

Now consider a replacement bracket. Carrying finished spares is simple to understand: each spare is inspected before launch and installed when needed. Local manufacturing offers flexibility: the same feedstock may support several designs. Repair may preserve material and avoid making a whole component. A tolerant design may continue operating with reduced performance until a planned replacement opportunity.

These are four different strategies, and a mature system may use all four. Finished spares suit critical items whose manufacture or inspection is difficult. Local production suits a qualified range of geometries and materials. Repair suits accessible damage with a validated restoration process. Graceful degradation suits functions that can be reduced without unacceptable consequences.

The decision depends on uncertainty about future needs. If the mission knows exactly which part will fail and when, stocking is easier to optimize. If many possible small fixtures may be needed, flexible production can reduce the risk of carrying the wrong inventory. But uncertainty also makes qualification harder: a machine that can produce many shapes does not automatically provide evidence for every new application.

### Engineering notebook: a mass crossover that is not a business case

Imagine two fictional logistics options using different candidate designs for the same noncritical fixture function. Option A carries a conventional, finished, accepted 5 kg fixture for every required replacement. Option B carries 60 kg of manufacturing and inspection equipment, then 2 kg of imported feedstock per attempted lightweight fixture. The lightweight design's finished mass is no greater than its 2 kg input; that input also covers any processing waste for each attempt. Assume 80% of attempts yield usable fixtures, with rejected feedstock and process waste unrecovered during this mission. All numbers are teaching inputs; they are not specifications for an actual printer.

For this comparison only, assume that the two designs have separately demonstrated equivalent performance against the same applicable functional, interface, life, and environmental requirements. That equivalence is a condition of the example, not an automatic consequence of redesign or local manufacture. A real study would have to establish it and account for the qualification effort. The 5-to-2 kg difference comes from the hypothetical lightweight design, not from manufacturing a 5 kg object out of 2 kg of material.

The expected feedstock per accepted fixture is 2 / 0.80 = 2.5 kg. For n accepted fixtures, the simplified delivered-mass comparison is:

```text
Finished spares:     M_A = 5 n kg.
Local manufacture:   M_B = 60 + 2.5 n kg.
Crossover:          60 + 2.5 n = 5 n.
                    n = 24 accepted fixtures.
```

At 24 fixtures the two masses are equal in this limited model. At 10 fixtures, finished spares total 50 kg while the production option totals 85 kg. At 40 fixtures, the comparison is 200 kg against 160 kg. The arithmetic explains how repeated use can repay a fixed equipment burden when the assumed lightweight alternative is valid. If local production instead needs at least 5 kg of feedstock per attempt for the same 5 kg product, its expected feedstock burden at 80% yield is at least 6.25 kg per accepted fixture. With the additional 60 kg equipment burden, that version never wins this simplified mass comparison. Flexibility or another benefit would have to justify it.

The assumption list is where the engineering begins. The 60 kg must truly include the equipment required for processing and acceptance. Additional power generation, radiators, containment, tools, maintenance spares, and packaging may increase it. The yield may depend on geometry and operator intervention. Expected yield does not guarantee sufficient stock for a particular mission. Producing a fixture also consumes time and can fail when the manufacturing station itself is unavailable.

Transport mass is not cost. Different items can have different volume, integration, handling, and destination requirements. A critical spare may need to be immediately available, while manufactured output takes time. Conversely, an adaptable process may prevent an expensive mission loss caused by an unforeseen need. The mass crossover is a useful first filter, followed by a complete mission trade.

## Repair creates value by preserving a larger investment

A failed component can make a much larger asset unproductive. Replacing a sensor, restoring pointing capability, or providing a new power interface can preserve the value of equipment that remains healthy. This is why servicing can be attractive before broad in-space manufacturing matures. The service does not need to reproduce the asset. It needs to restore a function whose value exceeds the service burden.

The benefit is easiest to understand when the failure mode is bounded. A designed-for-service module has a known interface, an expected removal sequence, and a clear acceptance test. An unprepared spacecraft may have unknown condition, inaccessible features, and no safe capture point. Both can be interesting engineering problems, but their risk and effort differ greatly.

NASA's March 2024 OSAM-1 discontinuation notice cited technical, cost, schedule, and partnership-context difficulties. [S11] The later mission page records reassessment and a reconfirmed cancellation decision, followed by an orderly shutdown process. [S12] The case does not prove servicing is impossible. It shows that a technically motivated mission can fail to justify its particular program architecture.

The practical lesson is to avoid treating technical feasibility, program success, and market demand as synonyms. A mechanism can work while its development costs become unsustainable. A customer can want a service but prefer a simpler alternative. A capable team can encounter integration difficulties that were underestimated early. Learning from those outcomes is part of building durable industry.

## Interfaces are an economic technology

Standardization can reduce the effort needed for each new job. A shared grasp feature, module envelope, power interface, or data protocol lets a service platform reuse tools and procedures. This can improve utilization and reduce uncertainty. It also creates a coordination problem: somebody must accept the cost and constraints of the standard before the future service benefit is guaranteed.

The spacecraft designer may ask why a mission should carry extra mass for a service it might never need. The yard operator may ask why it should invest in tools for an installed base that lacks compatible interfaces. This is a familiar infrastructure problem. Useful standards often need a credible initial application, several participants with aligned incentives, and evidence that the interface performs well.

A standard should preserve enough flexibility for different missions. If it is too narrow, it excludes valuable customers. If it is so general that every installation needs a custom adapter and new qualification, much of the promised simplicity disappears. Good interface design separates stable requirements from negotiable features. It states loads, alignment, environment, retention, electrical behavior, and verification responsibilities clearly.

The economic value can be seen in engineering hours. A known connector and validated approach reduce the number of questions that must be answered again. A repeatable inspection method reduces disagreement about acceptance. A well-maintained configuration record reduces the chance of sending the wrong tool. The small parts that hold up the future also hold down the transaction cost of working together.

## Reliability changes both expense and trust

A service platform that succeeds most of the time may still be unsuitable for high-value assets if its rare failures are severe. Average success percentage is insufficient. What fails, how recoverable is it, and what is the consequence? A failed insertion that leaves both objects safe differs from one that damages the client's only attachment point.

The customer also needs confidence in the evidence. Does the service provider report interventions honestly? Are test conditions comparable to the mission? Can an independent reviewer understand the acceptance record? A polished animation cannot substitute for this trust. In early markets, uncertainty about capability can be as consequential as the capability itself.

Insurance, contracts, and public oversight are ways societies allocate consequences, but the engineering contribution is to make the consequences legible. Clear operating envelopes and failure responses help people decide which risks to accept. This chapter does not provide legal advice or claim a universal liability rule. It emphasizes that a responsible technical proposal must describe what happens when the plan does not work.

A useful test campaign therefore includes recovery, not just nominal success. The team deliberately introduces bounded misalignment, missing data, delayed communication, and rejected parts in controlled settings. It demonstrates safe stopping and resumption. That evidence may make a slower system more valuable than a faster one whose failure behavior is unknown.

## Growth can move the bottleneck into orbit

Suppose MERIDIAN-O learns to assemble truss segments faster. Its next limit may be delivery cadence. If deliveries increase, the limit may become inspection. If inspection improves, power or thermal rejection may constrain simultaneous work. If all those improve, the remaining limit may be demand for the finished structure. The bottleneck does not disappear because the arm became more capable.

Expanding the yard creates additional maintenance. More tools need storage, more joints need inspection, and more control modes need verification. A larger solar array can support more activity but changes dynamics and thermal geometry. A second manipulator can provide redundancy and parallel work, yet it adds collision and coordination problems. Capacity growth must be measured after these support costs are included.

A modest expansion may be more useful than a grand one. Adding an inspection station could reduce uncertainty in every job. Adding a standard service port could expand the customer set. Adding a spare tool could reduce downtime more effectively than adding a second full robot. The mature industrial imagination asks which small investment unlocks the largest amount of accepted work.

The same reasoning applies to manufacturing its own structural pieces. If structural mass dominates deliveries and the process is qualified, local fabrication may help. If imported electronics, precision joints, or thermal equipment dominate the expansion constraint, making more beams may produce an impressive pile of inventory without additional useful capacity. Closure has to be measured against the dependency that is actually limiting growth.

## A yard that earns the right to become larger

The strongest early orbital business may be a focused service with a small number of compatible customers. It could inspect a particular class of interface, assemble a recurring structure, or exchange a designed module. Success would create records, trained people, proven tools, and a more credible basis for the next capability. This pathway lacks the instant grandeur of a universal factory, but its learning can accumulate.

Public programs may also support infrastructure whose scientific or strategic value is not captured in a simple sale. That is a legitimate choice when the goals and tradeoffs are explicit. The problem arises when a project alternates between commercial certainty and public-purpose arguments whenever one becomes inconvenient. A clear purpose helps engineers choose the right performance, cost, and reliability priorities.

The lesson connects technical interests to the work of understanding customers. A useful machine solves a problem within a system that can support it. Understanding what the customer actually needs is not a distraction from engineering. It helps determine which loads, interfaces, tests, and production processes matter most.

The next destination changes the bargain again. On the Moon, raw material lies beneath the machinery, but obtaining a useful part from it requires an industrial chain. The yard will acquire a floor, though not a forgiving one. Before it can expand, it must first unload, power itself, survive, and complete one accepted task.
