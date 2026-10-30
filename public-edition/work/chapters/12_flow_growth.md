# 12. Why another robot may change nothing

Three machines stand in a row. One makes parts, one assembles them, and one tests them. The first machine is the most impressive. It moves quickly, removes material, and produces an object that can be held in a hand. The test station spends much of its time appearing to do almost nothing. When the team wants more output, the natural temptation is to buy another impressive machine.

The temptation may be wrong. A factory is a network of dependent operations. Its useful output depends on the slowest relevant constraint, the quality of what reaches that constraint, and the coordination between operations. Watching the fastest motion is a poor way to understand the whole system. A queue of beautifully machined parts can represent delayed value, tied-up material, and an approaching storage problem.

This chapter develops the arithmetic beneath that observation. The calculations remain deliberately simple enough to reproduce. Their purpose is to help a reader interrogate a simulation, a supplier's claim, or a proposed improvement. Later, when a lunar base produces structural material but waits for a small imported component, the same logic will apply at a larger scale.

## Give every rate the same denominator

MERIDIAN's illustrative target is 30 accepted inspection modules in an eight-hour shift. The word accepted matters. A part waiting for inspection, a failed assembly, and a module that passed every release requirement are not interchangeable outputs. The target corresponds to 3.75 accepted modules per scheduled hour.

The fabrication station takes 10 minutes per input unit when operating. Its assumed availability is 0.90: over a sufficiently long representative period, it can perform scheduled production 90 percent of the time. Its first-pass yield is 0.96: 96 percent of processed units meet the defined station acceptance on the first attempt. These are invented teaching assumptions, not measured machine performance. Availability excludes time when the machine cannot produce; yield describes what happens to the units it does process.

Assembly takes 12 minutes per unit, with availability 0.95 and first-pass yield 0.98. Test takes 15 minutes per unit, with availability 0.90 and a passing fraction of 0.95. For this introductory model, failed units leave the forward flow. Rework, shared labor constraints, batch effects, setup time, starvation, blocking, and correlated failures are excluded. Upstream supply is sufficient, buffers decouple the stations, and the two illustrative staff members can support the required operations without becoming the bottleneck. Those assumptions are a declared boundary, not an expectation that real factories behave so conveniently.

### Engineering notebook: the three-station line

Fabrication has 60 /10 =6 processing opportunities per operating hour. Applying availability gives 5.4 input units per scheduled hour. Applying its first-pass yield gives 5.184 acceptable fabricated units per scheduled hour. Assembly can process 5 x0.95 =4.75 inputs per scheduled hour, and pass 4.655 units onward. Test can process 4 x0.90 =3.6 inputs per scheduled hour and release 3.42 accepted modules per scheduled hour.

Test is the binding station in this simplified steady flow because upstream stations can supply more than its 3.6 required inputs per hour. The resulting expected output is 3.42 x8 =27.36 accepted modules per shift. The decimal is a long-run average, not a promise to ship a fraction of a physical module. A particular day's integer result will differ.

The 30-module target is therefore infeasible under these assumptions. Buying another fabrication machine leaves the 3.42-per-hour test limit intact. Improving test cycle time to 12 minutes, with the same availability and passing fraction, raises its accepted capacity to 5 x0.90 x0.95 =4.275 per scheduled hour, or 34.2 per shift. Assembly can supply its 4.5 inputs per hour, and fabrication can support the required upstream rate. The bottleneck has moved closer to assembly, but the target now fits inside the simplified capacity envelope.

[[FIG:throughput]]

## Why yield multiplication is easy to misuse

If a single unit must pass fabrication, assembly, and final test without rework, and the listed passing fractions apply successively to the populations reaching each operation, the overall first-pass fraction is 0.96 x0.98 x0.95 =0.89376. Approximately 89.4 percent of starts would reach final acceptance on that path. This is a statement about the fraction of starts, not a reason to multiply the finished capacity of every station together.

For the original line, test needs 3.6 inputs per scheduled hour. Assembly must start 3.6 /0.98, approximately 3.6735 units per hour, to supply those inputs. Fabrication must start 3.6735 /0.96, approximately 3.8265 units per hour. Its available 5.4 input capacity is sufficient. The final output is then 3.8265 x0.89376, approximately 3.42 accepted units per hour. This backward calculation reconciles the yield chain with the bottleneck calculation.

If instead fabrication were limited to 3 inputs per hour, the same overall fraction would yield approximately 2.6813 accepted units per hour, assuming downstream stations could keep up. The binding constraint would have changed. Every rate needs a clear location in the process and a clear definition of what constitutes a unit.

Real yield behavior adds complications. A material batch can affect several stations. An incorrect drawing can cause every unit to pass an inappropriate check and fail later in service. Rework can consume bottleneck time and create a loop in the process map. A test that rejects healthy units wastes capacity; a test that accepts defective ones creates risk beyond the factory. Quality is not simply a percentage that can be optimized independently of what the measurement means.

For SHIPYARD ONE, this is a particularly useful first model. Make one product travel through these three stations. Give every counter a definition. Verify the arithmetic by hand. Only then add another machine, a failure distribution, or a more attractive animation. If the model cannot explain why the faster fabrication machine changes nothing, it does not yet explain the factory.

## Work in progress is time made visible

A queue is not always a mistake. A small buffer can protect an expensive station from brief upstream interruptions. The problem is uncontrolled accumulation or misunderstanding what it represents. Material waiting between processes has already consumed purchasing, handling, and perhaps manufacturing effort without yet becoming an accepted product.

In a stable system, an accounting relationship connects average work in progress, average throughput, and average time in the system. Average work in progress equals average throughput multiplied by average flow time, provided the boundaries and averaging conditions are consistent. This is commonly called Little's law. It is not a machine-speed formula or permission to assume that unstable queues will settle themselves. [I16]

Use an illustrative flow of 3 accepted units per hour and an average flow time of 4 hours through a defined, stable boundary. The average population within that boundary is 12 units. If unnecessary waiting doubles flow time while throughput remains unchanged, the average population becomes 24. The factory has tied up more material without shipping faster.

Care is needed when failures or scrap leave through different exits. A boundary that counts all entering items must account for all departing items, including scrap, or separate the populations appropriately. Comparing a queue of all work to a throughput count of accepted shipments can conceal the missing exits. A good simulation preserves conservation: an item is somewhere, has been consumed, has been scrapped, or has left. It does not disappear because the dashboard no longer displays it.

The most useful intervention might therefore be a release rule. Start work only when downstream capacity and material readiness justify it. This can make the shop look less busy while reducing lead time. The goal is useful flow, not maximal local activity. Engineers must resist a familiar psychological trap: people trust visible motion more readily than invisible coordination.

## Availability belongs to a repair system

Chapter 10 described maintenance as a chain of observation, diagnosis, access, replacement, verification, and return to service. Availability condenses part of that chain into a measure. In a simplified alternating operation-and-repair model, long-run availability can be written as mean operating time divided by mean operating time plus mean restoration time. The familiar notation MTBF / (MTBF + MTTR) needs careful definitions; it is not a universal law for every equipment population.

Take illustrative averages of 90 hours operating and 10 hours unavailable for restoration. The ratio is 90 /100 =0.90. Reducing restoration time to 5 hours raises the ratio to 90 /95, approximately 0.947. The mechanism did not become less likely to fail. The support system restored it faster. Better access, diagnosis, a compatible spare, and an understood acceptance test can all improve useful capacity.

A design team may therefore gain more by making an actuator easy to swap than by marginally increasing its peak speed. The calculation also reveals why a spare part in inventory is not sufficient. If replacing it requires unavailable tooling or an inaccessible fastener, restoration time remains large. If several machines depend on the same repair technician or charger, their downtimes are not independent.

These distinctions become sharper off Earth. A mean repair time measured in a well-equipped terrestrial workshop cannot be copied into a lunar model. The model must include detection, communications policy, available manipulators, spare inventory, environmental conditions, and the possibility that a repair cannot be completed locally. A facility that keeps working through a failure by switching to a slower process may be more resilient than one optimized for maximum nominal efficiency.

## Growth is construction minus loss

The dramatic idea behind this book is that productive machinery can help create more productive machinery. In the simplest imaginable model, capacity produces output, a fixed fraction of output becomes new capacity immediately, and nothing wears out. If the same fraction is reinvested every period, the capacity curve grows exponentially. This mathematical result is genuine. Its assumptions are also extraordinarily strong.

Physical construction consumes materials, energy, tools, inspection, installation effort, and time. It may depend on components that the existing factory cannot produce. Existing equipment needs maintenance and eventually replacement. New equipment can sit idle if power or customers are missing. A growth model that counts every newly assembled machine as net productive capacity has silently deleted these obligations.

The model supplied with this book is intentionally small. It is a teaching instrument, not a forecast for robotics, lunar settlement, or any company. A period is an abstract accounting interval. A capacity unit is an equivalent machine capability, not a literal industrial robot. Fractional units allow smooth comparisons. A production credit is a normalized output budget. None of these quantities is a dollar, kilogram, or calendar year.

At the start, the fictional network has 4 installed capacity units. Each active unit can produce 1 credit per period. Active capacity cannot exceed the power-supported capacity. Every installed unit, including idle equipment, requires 0.15 credits of care per period. The chosen maintenance policy limits how much gross production can be allocated to care. After care, half of the remaining credits are offered for expansion and half are reserved for useful external output. Starting 1 unit of new capacity costs 8 credits and consumes 1 imported component kit. Completed construction enters service only after a specified delay.

The model also removes 1 percent of installed capacity each period as baseline wear or retirement. Unmet care causes an additional loss: for every unit's worth of unpaid care, an extra 0.10 capacity units are lost. That penalty is invented to make neglect visible; it is not a measured reliability relation. The model has no random failures, no prices, no workforce, no explicit material chemistry, and no detailed thermal design. It cannot predict real industrial growth.

[[FIG:growth]]

### Read the trajectories as experiments on assumptions

The ideal reference removes maintenance, wear, component constraints, power limits, and build delays. With half of each period's output reinvested at 8 credits per unit, its fractional growth rate is 6.25 percent per period. This curve is included to show what the familiar exponential picture assumes, not as the expected future.

The supported-growth case restores care and wear, allows up to 0.8 imported kits per period, limits power to 12 active capacity units, and delays completed expansion by 4 periods. It can expand for a while, but installed equipment and active equipment eventually diverge when power binds. Adding more idle equipment can increase maintenance obligations without increasing production. The plot distinguishes installed capacity from productive capacity for that reason.

The component-limited case receives only 0.08 kits per period. Even with available power and a willing construction budget, that stream limits expansion. Eventually replacement demand can consume most or all additions. The system may be manufacturing continuously while its net capacity grows little. This is a more useful picture of constrained industry than a chart of gross machines assembled.

The neglect-and-shock case allocates only a small fraction of gross output to maintenance. After period 20, its power-supported capacity falls and component arrivals stop. Existing equipment then loses capacity while the build pipeline empties. The result is not a forecast of collapse; it is a demonstration that reinvestment alone does not guarantee growth when care and support are missing.

Change one assumption at a time and observe the effect. Increasing component supply helps only while components bind. Reducing construction delay accelerates the arrival of already-funded equipment but does not create more power. Increasing maintenance allocation can reduce immediate expansion while preserving more useful equipment later. These interactions are the point of the exercise.

## Delays change the character of a feedback loop

Suppose a planner orders more equipment whenever current demand exceeds output. If delivery takes a long time and the planner ignores orders already in the pipeline, it can repeatedly order solutions to the same shortage. When the equipment finally arrives, capacity overshoots demand. The next reaction may be to cancel investment, producing a later shortage when equipment retires. Oscillation can emerge from delayed decisions even without irrational people.

The book's supplied model is simpler than a full demand-and-order system and does not claim to reproduce business cycles. Its explicit construction queue nevertheless makes one crucial distinction visible: committed expansion is different from operating capacity. A dashboard should show both. So should a public argument about factories under construction, spacecraft in development, or energy projects awaiting connection.

A mature planning model would add uncertain demand, workforce training, capital constraints, supplier behavior, inventories, and multiple equipment types. It would be calibrated against measured operations and tested on data not used for fitting. The added complexity is justified only if it improves a decision. A model with hundreds of parameters that nobody can explain may be less useful than a small model with an honest boundary.

## The bottleneck can be an institution

Not every limiting factor is a physical machine. A design change may wait for approval because evidence is missing. A supplier may avoid expansion because future demand is uncertain. A team may lack someone authorized and competent to release a repaired assembly. Capital can be committed to the wrong stage of the process. These are real constraints, even though they do not appear in a mechanical drawing.

The response should be specific. If approval takes too long, determine whether the delay is unnecessary handoff, unclear responsibility, missing tests, or a legitimate unresolved risk. Removing review without understanding its purpose can speed the release of defects. Automating paperwork can help if the underlying evidence is sound. It cannot substitute for the measurement that was never made.

This is where understanding customers and business can combine with engineering. A useful product must meet a real need at a sustainable cost, and the customer must be able to use and maintain it. Understanding demand is valuable. So is understanding why a plausible promise cannot yet be delivered. Technical depth gives the business conversation a stronger foundation.

The future factory will not be judged by the slope of its most flattering graph. It will be judged by what useful work survives the constraints: accepted hardware, dependable service, restored capacity, and expansion that can sustain itself. Learning to follow those quantities is one of the most powerful ways to turn an ambitious image into an engineering argument.
