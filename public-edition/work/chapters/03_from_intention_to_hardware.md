# 3. From an intention to an accepted artifact

The first MERIDIAN drawing is attractive. The plate has rounded corners, two retaining fasteners, and an opening for a connector. A rendered sensor sits neatly on top. Someone asks whether it is ready to make. The honest answer is that the geometry is ready to discuss. The engineering is still being defined.

A model can be geometrically complete while leaving crucial questions unanswered. How much load must the plate carry? Where does that load enter? How far may the sensor move? What happens when the cable is pulled? Can the plate be removed with adjacent equipment installed? How will a technician recognize the correct revision? Which surfaces establish alignment, and how will those surfaces be inspected?

The work of turning an intention into an artifact is the work of making those questions explicit, answering them with adequate evidence, and preserving the answers as the object changes hands. It is creative work. Clear requirements do not eliminate imagination; they give imagination a useful target.

## Begin with the use, then describe the requirement

Suppose the customer says, 'We need to exchange the sensor quickly.' Quickly is a clue, not yet a testable requirement. The team needs to understand the operation. Perhaps a person is replacing a damaged sensor during a short maintenance stop. Perhaps a robot is exchanging different instruments between inspection tasks. Perhaps the sensor remains installed for months and exchange time matters much less than alignment.

A short concept of operations describes what happens before, during, and after the exchange. The equipment is placed in an appropriate state. The module is supported. The connector is released. Retaining features are opened. The plate is removed and a replacement installed. The system verifies seating and performs a functional check. This description exposes missing actions before a detailed mechanism is chosen.

The team can now propose measurable requirements. An illustrative requirement might state that the carrier must return the sensor reference feature within a specified positional interval after removal and reinstallation, under specified bench conditions. Another might limit the number of distinct tools required. Another might require that retaining fasteners remain captured when released. The numerical limits should come from the customer's task and the consequences of failure, not from an arbitrary preference for impressive precision.

Requirements should also distinguish desired behavior from a prematurely chosen solution. 'The module shall use a particular latch' may unnecessarily constrain the designer if the real need is secure retention and straightforward release. Sometimes a specific connector or fastener really is required because of an existing interface. In that case, the restriction belongs in the record with its reason. A good requirement makes the source of a constraint visible.

NASA's handbook includes guidance on writing requirements and preparing verification matrices. The useful principle is that a requirement should connect to a way of showing whether it is satisfied. [F24] For MERIDIAN, a small table can connect the alignment requirement to repeated installation measurements, the access requirement to a representative service trial, and the electrical-interface requirement to an appropriate continuity or functional test. The table is a plan for evidence.

## Interfaces are agreements made physical

An interface is where two parts of a system meet. It may carry force, electrical power, data, heat, fluid, or information about state. MERIDIAN's base-to-plate contact carries mechanical loads and establishes position. Its connector carries the sensor's electrical relationships. Its fastener access is an interface with a tool and, indirectly, with a person or robot.

An interface is rarely just a nominal shape. It includes allowable variation, orientation, clearance, assembly sequence, material compatibility, and the expected condition of surfaces. If one team assumes the connector is mated before the plate is seated and another assumes the reverse, both can produce individually reasonable components that are difficult to assemble together.

This is why an interface drawing deserves attention early. It can identify the locating surfaces, reserved tool space, cable route, insertion direction, and release direction. It can specify which side controls each dimension. It can show an envelope that other components must respect. A simple drawing with these agreements may be more valuable than a detailed rendering without them.

The interface also determines future repair options. A component attached with an inaccessible permanent joint may be easy to assemble in an open factory and difficult to replace after installation. A removable module may require more parts and space, yet reduce recovery time. The correct trade depends on how often failure or change is expected, the cost of access, and the consequences of downtime.

## The load path comes before decorative strength

To understand whether the carrier is stiff enough, follow the force. A load acts on the sensor. The sensor's attachment transmits it into the plate. The plate transfers it through its contact and retaining features into the base. The base transfers it into the supporting structure. Each transfer can introduce deflection, slip, or local stress.

Simply making the plate thicker may not solve a flexible mounting problem. The supporting structure may dominate the motion. The contact may not seat consistently. The sensor itself may have a compliant attachment. The engineer therefore asks which part of the load path contributes most to the functional error. A stiff component in a flexible system can still move substantially.

An initial hand calculation is often useful before a detailed model. It establishes scale. If an assumed load is doubled, does the simple model predict approximately twice the deflection? If a beam-like feature becomes longer, why does its bending behavior change so strongly? If the estimated motion is already far beyond the requirement, an elaborate simulation may not be the best first use of time.

The hand calculation also creates an independent check on software. Agreement between two methods does not prove both are correct, but disagreement is informative. Perhaps a unit was wrong. Perhaps the simulation constrained a surface that will actually move. Perhaps the simple model ignored a contact that matters. The goal is to understand the cause, not to choose whichever result looks better.

## CAD, analysis, and manufacturing each answer different questions

Computer-aided design describes geometry and relationships. It helps the team see whether parts occupy the same space, how an assembly fits together, and what dimensions are intended. It can support drawings and bills of material. It does not by itself establish material properties, loads, process capability, or service life.

Computer-aided engineering includes methods for predicting physical behavior. Finite-element analysis divides a structure into a mathematical representation so stresses, deformations, or other responses can be estimated. Computational fluid dynamics estimates fluid behavior under a chosen model. Both require appropriate inputs and assumptions. A colorful plot can be wrong because of a mistaken boundary condition long before the numerical solver becomes the limiting issue.

Computer-aided manufacturing translates a manufacturing plan into tool motions or process instructions. It must consider the actual machine, tool, workholding, stock, and sequence. A toolpath that reaches the nominal surface may still leave a part distorted, poorly supported, or difficult to inspect. A simulation of the toolpath can catch certain problems while leaving material effects outside its scope.

Production execution is the controlled performance of that plan. It includes identifying the correct material, installing tools, checking offsets, recording results, and managing exceptions. This is where the organization discovers whether its planned process can be repeated by real equipment under real conditions. The engineer's responsibility does not end when the program is exported.

AI assistance can be useful throughout this chain. It can organize requirements, suggest alternative concepts, draft analysis code, compare test logs, and help explain unfamiliar terminology. Its outputs become candidates for checking. A proposed fixture still needs a feasible load path. A generated calculation still needs units and a model. A confident explanation of a failure still needs evidence capable of distinguishing it from other explanations.

## Release gates are questions with consequences

MERIDIAN uses a sequence of release decisions. The first asks whether the task is understood well enough to choose a concept. The second asks whether the proposed design can meet the requirements. The third asks whether the manufacturing and inspection plans can realize and verify the design. The fourth asks whether the built artifact has the evidence required for acceptance. Later changes trigger review of the evidence they affect.

[[FIG:release_gates]]

These gates need not become a miniature bureaucracy. Their purpose is to prevent an unanswered question from becoming someone else's expensive surprise. A small project can use a concise checklist and a clear record of decisions. A complex flight program needs more formal controls because the number of interfaces and consequences is larger. The depth should fit the system.

Consider a material substitution. A supplier offers stock with the same nominal dimensions but a different condition. The geometry may be unchanged, yet strength, machinability, residual stress, or corrosion behavior may differ. The old test result cannot automatically establish the new part's suitability. Similarly, a software change may alter the force used during insertion and invalidate an assumption behind a mechanical wear test.

Controlled change does not mean refusing improvement. It means identifying what the improvement changes and what evidence must be renewed. The alternative is a product that evolves without a reliable record of why it works. That can appear fast until an intermittent failure forces the organization to reconstruct its own history.

## A failed inspection becomes a useful investigation

Return to the rocking plate. In this fictional episode, the first unit passed the original fixture but fails on a second base. The team initially suspects that the plate is warped. That is plausible, but it is not the only explanation. The second base may have a raised burr. The first fixture may be contaminated. The locating features may interfere before the intended contact surfaces meet. The inspection method may apply a force that temporarily flattens the plate.

The next action should distinguish hypotheses. The team cleans and inspects the contact surfaces, checks a known reference, and repeats the seating test without changing several variables at once. A small chip is found under the original fixture's reference surface. That observation explains why the fixture could mislead the operator, but the team still needs to determine which previously accepted parts were affected.

They quarantine the relevant batch rather than guessing that only the visibly rocking unit matters. They check the fixture condition and identify the period since its last trustworthy verification. Parts are rechecked with an independent setup. The record notes the symptom, evidence, cause, affected population, correction, and revised inspection practice. This sequence restores confidence in both product and process.

The design team also asks whether the fixture can be made less sensitive to contamination. Perhaps the locating contacts can be made easier to clean and see. Perhaps a verification artifact can reveal a seating error before production begins. Perhaps the operator's procedure needs a clearer check. The best improvement may be physical, procedural, or both.

The lesson is not that every rejected part demands an elaborate investigation. It is that the depth of investigation should follow the risk and the possibility of a repeated cause. A systemic measurement error can affect many parts. Treating each failure as an isolated bad object would miss the opportunity to improve the factory's ability to know.

## Qualification and acceptance are different jobs

Qualification establishes evidence that a design and its associated process can meet specified conditions. Acceptance establishes whether a particular delivered item meets its applicable criteria. The exact meaning and methods depend on the program, but the distinction is useful. Testing one representative design through a demanding environment does not eliminate the need to check production units. Checking every unit's dimensions does not establish long-term behavior under an untested environment.

For MERIDIAN, a development test might repeatedly remove and reinstall representative carriers to learn how the interface changes with use. A production acceptance test might check seating, identity, and function for each completed module. If the application later becomes more demanding, the team revisits whether the existing qualification covers it.

An Earth bench carrier is therefore not quietly promoted to a spacecraft mechanism later in this book. The orbital and lunar versions are separate design studies. Vacuum, thermal exposure, launch conditions, dust, radiation, and remote access can change materials and interfaces. What transfers is the reasoning process, along with selected design ideas that still need relevant evidence.

## What the customer receives besides a part

Before delivery, MERIDIAN's team can perform a simple traceability exercise. Pick one completed carrier and ask which drawing revision defined it, which material batch supplied its plate, which process revision made the locating features, which instruments checked them, and which test record supported acceptance. The answers need not live in an expensive software platform. They do need to be recoverable and unambiguous.

The exercise reveals why a serial number and a revision number are different. A serial number identifies a particular physical item. A revision identifies a version of a definition. Many serial-numbered items may share one revision, while one item may acquire an approved change over its service life. Confusing those identities makes it difficult to connect a field failure to the population that might share its cause.

The same logic applies to a fixture. If the fixture changes, a stable product drawing does not necessarily mean the manufacturing process stayed the same. A new contact pad, a different clamping arrangement, or a software correction can alter results. The team should record changes that affect the controlled characteristics and decide which checks establish continuity.

This record is especially valuable when a future engineer inherits the project. The engineer should be able to determine what is known without reconstructing every conversation. A short rationale can preserve the reason a seemingly odd feature exists. Perhaps a clearance was added for a service tool, or a dimension was deliberately left generous because it does not control function. Removing that feature without its history could undo an important lesson.

A useful delivery includes enough information to operate and support the object. That might include identification, installation instructions, interface details, inspection records, maintenance limits, and a way to report anomalies. The exact package should be proportionate to the product. Information omitted at delivery often reappears later as confusion.

Imagine two visually identical carriers from different revisions. One uses a revised locating arrangement. If the installer cannot tell them apart, the design improvement may introduce a new failure opportunity. Identification is therefore part of engineering. It allows the physical object to be connected to the correct instructions and evidence.

The same principle applies to a student's portfolio. A video shows an event. An engineering record explains what was intended, what was measured, what failed, what changed, and what remains uncertain. The record makes the work useful to someone who was not present. It also helps its author learn, because the original assumptions remain visible after memory has softened them.

The next time a beautiful CAD model appears on a screen, a reader can enjoy it and ask what stage of the promise it represents. Is it an idea, a detailed design, a manufacturing definition, or a tested configuration? That question turns admiration into engineering attention. Chapter 4 supplies the physical vocabulary needed to examine the mechanism itself.
