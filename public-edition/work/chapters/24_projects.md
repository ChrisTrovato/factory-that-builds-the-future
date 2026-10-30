# 24. Twelve projects that earn their complexity

The first question about a project should be what it can teach you to know. A complicated machine can be a poor learning instrument if every important decision is hidden in copied code or purchased modules. A simple fixture can be an excellent one if it makes a prediction, exposes an error, and lets you test a revision. The goal is increasing ownership of the reasoning.

The twelve options in this chapter form a ladder of prerequisites, not a schedule and not a shopping list. You can follow one branch deeply rather than completing every item. The early projects are low-energy observation and hand-operated exercises. Powered machinery, higher loads, fabrication equipment, and robotic hardware belong in supervised environments with appropriate training. The advanced projects can begin entirely in simulation.

Each option has a question, a minimal version, a deeper version, and an evidence standard. Completion means you can explain what happened and support the explanation. It does not mean the prototype resembles industrial equipment. A video may help show behavior, but the engineering record carries the claim.

[[FIG:project_ladder]]

## 1. Make an atlas of one mechanism

Choose a benign, accessible mechanism such as a drawer slide, hand-operated clamp, simple hinge, or toy linkage. The question is: how does the mechanism constrain motion and carry load? The prerequisites are observation, basic measurement, sketches, and willingness to distinguish what you can see from what you are inferring. Essential equipment can be paper, a ruler, and a camera. Optional calipers improve some measurements if you know their limitations.

The minimal version documents the mechanism without disassembling anything that contains stored energy or inaccessible electrical hazards. Draw the parts you can identify. Mark the fixed and moving bodies, joints, contact surfaces, and possible load paths. Show the motion at three positions. Record a few dimensions and state how they were measured. If an internal feature is hidden, label it unknown rather than inventing a plausible interior.

The deeper version uses a safely disassembled hand mechanism or a simple model you construct from harmless materials. Create an exploded view and an assembly sequence. Predict which direction will be stiffest and which will allow play, then test gently by hand under consistent conditions. If you can add a small known load safely, compare movement in different configurations without claiming a precision stiffness test.

The deliverable is a short mechanism atlas: annotated images, labeled sketches, a parts list, an explanation of degrees of freedom, and a page of unresolved questions. Likely failures include confusing a contact with a joint, overlooking a constraint, or assuming the visible fastener carries every load. The project is complete when another person can follow your explanation and you can predict the motion before moving the mechanism. Teach it back without relying on the photographs.

## 2. Build a hand-operated linkage with a measurable output

The question is how changing one geometric dimension changes motion or mechanical advantage. Use a simple planar linkage made from card, wood strips, or an educational construction system, with hand operation and no stored-energy drive. Prerequisites are basic geometry and an understanding of pivots. Essential equipment includes a ruler, simple fastening or pivot materials, and a surface on which the motion can be traced. Tools must match your training and the material.

The minimal version has one input motion and one observable output. Mark the input angle or displacement at several positions and measure the corresponding output. Draw the mechanism to scale before building it. Predict whether the output moves faster or slower over different portions of the motion. You do not need a complete analytical solution to form a testable geometric prediction.

For the deeper version, develop a spreadsheet or short script that calculates positions from measured link lengths. Compare predicted and observed positions. Examine the influence of loose pivots, flexible links, and imperfect measurement. Keep the applied loads small; the project investigates kinematics before strength.

Deliver the drawing, a data table, a graph, and an explanation of where the idealized model fails. Likely failures include a linkage reaching a configuration that binds, pivots drifting out of plane, and measuring the wrong angle reference. Completion means the model predicts several positions within a stated measurement tolerance and you can explain the largest discrepancy. A useful teach-back question is what changes if one link grows longer while all others remain fixed.

## 3. Create a manual assembly task board

The question is which features make a repetitive assembly task easy to locate, orient, and complete. Build a hand-operated board using benign large pegs, matching openings, a safe keyed connector mockup, or simple fasteners suitable for the setting. Prerequisites are drawing literacy, basic measurement, and the ability to define a repeatable procedure. No industrial robot is needed.

The minimal version compares two arrangements of the same task. For example, one arrangement presents a part in an ambiguous orientation while the other includes an obvious alignment cue. Record completion time, incorrect starts, and intervention or repositioning. Define when the timer starts and stops. Separate practice trials from the trials used for comparison, and alternate arrangements so that learning does not benefit only the second design.

The deeper version changes one interface feature at a time or uses a small planned experiment. Investigate visibility, access, part symmetry, or the distance a hand must travel. Keep the conclusions within manual assembly; do not assume human results predict a robot's performance exactly.

NIST's assembly task-board work is a useful inspiration because it decomposes assembly into identifiable competencies and emphasizes repeated measurements. Your board is an educational adaptation, not a certified reproduction or a NIST benchmark unless you follow the actual protocol. [C17]

Deliver the board drawing, procedure, raw trial record, and a comparison that includes unsuccessful attempts. Likely failures are inconsistent starting conditions and measuring speed while ignoring errors. Completion means you can identify a specific design change and show whether it improved the chosen task under your conditions. The teach-back question is why the better layout helped, not merely which one won.

## 4. Design a removable module that locates before it fastens

This project asks whether alignment and retention can be assigned to different features. Use MERIDIAN's inspection-carrier concept as inspiration, keeping the device passive and hand operated. Prerequisites are the mechanism atlas, basic drawings, and a first understanding of tolerances. The essential equipment can be cardboard or a safe fabrication material, simple fasteners, and a ruler; a supervised maker facility can enable a more precise version.

The minimal module uses a removable plate, two intentional locating features, and separate retention. Draw the assembly sequence. Show where a person's fingers or a future gripper would approach. Make the connector a physical mockup initially so that electrical details do not obscure the mechanical question. Define which surfaces establish position and which features merely hold the plate in place.

The deeper version compares two locating strategies and measures repeated removal and replacement. Use a pointer, grid, or suitable gauge to observe variation at a reference feature. The measurements need not be extremely precise, but the instrument should be capable of resolving the effect you claim. Test whether tightening retention changes alignment.

Deliver a drawing, interface description, assembly sequence, repeatability record, and one revision. Likely failures include overconstraining the plate, using fastener clearance as an accidental locator, or trapping the tool needed for removal. Completion means the module can be removed and restored through a defined sequence and its final position satisfies your explicitly chosen educational requirement. The teach-back prompt is to identify the load path if the module is pulled sideways.

## 5. Measure repeatability without confusing it with accuracy

The question is whether a device returns to the same place, and how that differs from returning to the correct place. The device can be a manual slide, hinge stop, or repositionable plate. Prerequisites are basic statistics, units, and the measurement concepts in Chapter 5. Essential equipment is a reference, a suitable measuring method, and a consistent record. A dial indicator can be useful where trained setup and access are available, but a carefully photographed pointer and scale can support a simpler study.

In the minimal version, repeatedly move away from and return to a defined stop. Record every reading in order. Calculate a center and a spread, then compare the center with an independently defined target. A cluster of readings displaced from the target illustrates repeatability without accuracy. The experiment is stronger if the reference is not adjusted to make the result appear correct.

The deeper version changes approach direction, applied force, or removal and reinstallation of the fixture. These conditions can reveal backlash, friction, or setup sensitivity. Repeat the measurement process on a stationary reference to estimate how much variation comes from the measurement method itself.

Deliver the setup diagram, sequence of readings, plots, instrument limitations, and an interpretation. Likely failures include moving the reference, reading with inconsistent parallax, or discarding inconvenient readings. Completion means the reported variation can be traced to the raw record and you can distinguish the instrument's limits from the mechanism's behavior. Explain what evidence would be needed before claiming the device is accurate.

## 6. Build an inspection fixture that can reject something

The question is whether a simple fixture can distinguish acceptable geometry from a defined nonconformance. Use harmless parts or mockups with intentionally different dimensions. Prerequisites are a functional requirement, basic tolerances, and awareness that the fixture itself has uncertainty. Essential equipment includes the parts, fixture material, and a measuring method. The minimal version can be entirely manual.

Define the feature that matters before designing the gauge. Perhaps a removable plate must clear an opening while locating against a reference edge. Construct a fixture that checks that relationship. Include known acceptable and intentionally unacceptable samples. If every sample passes, the test may reveal only that the fixture is too permissive.

The deeper version investigates borderline samples, fixture wear, and differences between operators. Compare the fixture's decision with an independent measurement. Keep a record of false acceptance and false rejection in your small sample, while avoiding broad rate claims from insufficient data. Consider what happens if dirt or a burr changes the contact condition.

Deliver the acceptance rule, fixture drawing, sample definitions, decision record, and limitations. Likely failures include checking a convenient dimension rather than the functional feature, applying inconsistent force, and assuming a homemade gauge has negligible error. Completion means the fixture reliably distinguishes your clearly separated test samples under the documented conditions and the borderline region is honestly described. The teach-back question is who verifies the verifier.

## 7. Compare two designs for repairability

The question is how interface choices affect restoration of function. Make two passive mockups containing a removable component. One might hide a fastener behind another part; the other might provide direct access and captive retention. Prerequisites are assembly sequencing and a basic understanding of fault isolation. Use low-energy objects with no hazardous electrical or pressure system.

The minimal experiment follows a scripted replacement task. Begin with the same tools and starting condition, remove the designated module, install a substitute, and perform a return-to-service check such as correct alignment and free motion. Record time, number of parts disturbed, dropped items, and ambiguous steps. A faster replacement that leaves the system misaligned is not a successful repair.

The deeper version introduces a benign complication such as reduced visibility or limited access, while preserving safe hand operation. Ask whether labeling, connector keying, or a locating feature reduces mistakes. You can also compare module replacement with component-level repair in terms of the tools and knowledge required, without assuming one is universally preferable.

Deliver two drawings, a task procedure, trial record, failure observations, and a revised design. Likely failures include a comparison biased by familiarity, an undefined success condition, or ignoring recalibration after replacement. Completion means the full restoration sequence has been compared, including verification. Teach back which design change reduced the chance of an undetected bad repair.

## 8. Investigate a fault through competing hypotheses

This project asks how to choose a test that distinguishes possible causes. Use a safe, deliberately constructed system, such as a loose hand-operated linkage, a misaligned fixture, or a low-voltage educational circuit under appropriate supervision. Your Pac-Man display problem can motivate the reasoning, but the book does not establish its cause or a completed repair. Do not open equipment with hazardous stored energy merely to create a learning exercise.

The minimal version begins with a symptom and at least three plausible explanations. For a module that no longer seats, possibilities might include debris, a shifted locator, and deformation of the plate. Predict what observation each explanation would produce. Choose a test that is informative and does not damage the system or erase the evidence.

The deeper version has another person introduce one of several known benign faults without telling you which. Record your initial hypotheses, test order, results, and revisions. Avoid changing multiple variables at once. If you restore operation by moving several parts, you may have solved the immediate problem without identifying the cause.

Deliver a diagnostic tree, a chronological test log, and a conclusion that separates observed facts from inferred causes. Likely failures include anchoring on the first explanation, replacing parts without a hypothesis, and interpreting a temporary recovery as proof. Completion means the selected test distinguishes the actual fault from the alternatives within the exercise. The teach-back prompt is what evidence would make you abandon your preferred explanation.

## 9. Characterize a guarded low-energy actuator

The question is how a real actuator's response differs from a command. This project requires suitable supervision, a low-energy educational actuator, guarding against pinch points, and a clear stop method. Prerequisites include basic circuits, programming, measurement, and the earlier motion concepts. It belongs in a trained setting if you cannot assess the hardware's behavior safely.

The minimal version commands a small, bounded movement and measures the resulting position over time using a safe sensor or video method. Keep the load and travel limited. Establish a baseline before changing control settings. Record command, observed position, supply condition, and any saturation or limit behavior. Do not use an unexplained software library as evidence that you understand the controller.

The deeper version compares responses under two small, known loads or studies the effect of a conservative motion profile. Estimate rise time, overshoot, and settling according to definitions you state. Ask whether the sensor measures the output joint or only a motor shaft separated from it by backlash or compliance.

Deliver the system diagram, bounded operating conditions, code, raw response data, and an explanation of the discrepancy between command and motion. Likely failures include loose sensor mounting, inconsistent timing, unmodeled friction, and commands beyond the actuator's capability. Completion means you can reproduce a response and explain its main features without claiming industrial or safety qualification. Teach back why a larger control gain might make behavior worse.

## 10. Reduce SHIPYARD ONE to one understandable cell

The question is whether a small simulation conserves resources and makes production assumptions visible. SHIPYARD ONE is the educational simulation concept developed in this book. Treat the following as a proposed learning model whose implementation and physical validity must be checked. Prerequisites are algebra, elementary programming or spreadsheets, and the flow concepts in Chapter 12. Essential equipment is a computer; no robot is required.

The minimal model contains one product, three operations, an incoming inventory, a queue, a machine state, and an accepted-output counter. Use explicitly labeled illustrative times and yields. Every part must occupy a defined state. A rejected item cannot silently become accepted, and a machine cannot process two items at once unless parallel capacity has been deliberately modeled.

Test the model using cases you can calculate by hand. With unlimited materials and no failures, the bottleneck should constrain output. With zero incoming material, output should stop after existing work is exhausted. If inspection is disabled, the model should not automatically classify all output as accepted. These tests reveal whether the animation is connected to meaningful logic.

The deeper version adds downtime, repair resources, rework, and limited spares one at a time. Compare repeated runs only after documenting the random inputs and what is held fixed. You can later calibrate one operation using measurements from a manual task board. That improves one part of the model; it does not validate every factory assumption.

Deliver the model, assumptions, resource ledger, verification cases, and a short explanation of what it cannot predict. Likely failures are counting gross attempts as accepted output, ignoring resource conflicts, and changing several assumptions to obtain a desired curve. Completion means you can explain every counter and reproduce a small run manually. A moving robot icon earns no additional credibility by itself.

## 11. Design an educational tool interface or rover module

The question is whether an interface can support location, load transfer, connection, release, and verification as separate requirements. This is a more advanced design exercise using a passive or low-energy mockup, or supervised educational hardware. Prerequisites are CAD, tolerances, statics, materials, and basic test planning. Essential equipment may remain a computer and simple prototype materials; machining or powered testing requires the relevant facility.

The minimal version is a removable tool-holder or rover sensor module. Define a benign payload envelope and a small illustrative load case. Show the approach direction, locating features, retention, connector strategy, and evidence that the interface is fully seated. Include a recovery method if the first insertion fails. Avoid assuming that an elegant CAD assembly proves a robot can operate it.

The deeper version compares two concepts using a common test fixture. Measure repeatability, insertion effort, removal time, and the effect of controlled misalignment within safe limits. Perform a simple load calculation and compare its prediction with a low-energy physical observation. Record the material and manufacturing process because printed plastic and machined metal do not justify the same assumptions.

Deliver requirements, concept alternatives, a released educational drawing, test evidence, and a failure review. Likely failures include overconstraint, poor tool access, ambiguous latch state, and a connector carrying unintended structural loads. Completion means the interface satisfies its stated educational requirements across a defined set of trials and the remaining limitations are explicit. Explain what would need to change before any space or field qualification claim could be considered.

## 12. Model the reaction of a free-floating base

The question is how an arm's motion changes the motion of the vehicle supporting it. Begin in simulation, using a simplified planar system rather than physical free-floating hardware. Prerequisites are dynamics, linear algebra, differential equations, and numerical programming. Essential equipment is a computer and a clear model diagram. The purpose is to connect robotics to spacecraft mechanics.

The minimal model uses two rigid bodies with a defined rotational relationship and no external torque. State the inertias and initial conditions as illustrative inputs. Predict the sign of the base motion before calculating it. Check conservation of angular momentum within the assumptions. If the simulation creates net angular momentum without an external interaction, the model or integration is wrong.

The deeper version introduces a simple flexible mode, actuator limits, or a finite maneuver profile. Compare a rapid command with a slower one and examine residual vibration or attitude error. Numerical convergence matters: reduce the time step and see whether the answer changes materially. A beautiful trajectory produced by an unstable integration method is still wrong.

Deliver the derivation, parameter table, code, conservation checks, plots, and interpretation. Likely failures include confusing motion relative to the base with inertial motion, using inconsistent inertia definitions, and omitting a reaction term. Completion means the simplified model passes its conservation and limiting-case checks and you can explain why it is not a mission-ready orbital simulator. The teach-back question is what external control authority would change the result and what resources that control would consume.

## The engineering record is the common product

Each project should leave behind a compact but complete record. State the question and the requirement. Show the drawing or model that defines the object. Record the chosen method and the alternatives rejected. Preserve the test conditions and raw observations. Explain the uncertainty and the failed attempts. Finish with the revision and the claim that the evidence supports.

This record makes a modest project useful in a future interview or research conversation. Another person can see how you think. They can ask why you chose a measurement, what you would change, and whether the conclusion survives a different condition. You can answer from work you understand instead of defending a polished demonstration whose internals are opaque.

The record also changes how AI assistance fits into the project. Generated code or geometry should be identified as assistance and checked. Keep a distinction between a suggestion you accepted, a calculation you independently verified, and a behavior you measured. The most valuable use of assistance may be helping you formulate alternatives or exposing a contradiction. It should not erase your ability to explain the result.

The twelve projects lead toward different futures. The task board and inspection fixture can grow into manufacturing research. The actuator study can lead toward controls. The removable module can lead toward mechanisms and maintainability. The one-cell model can lead toward operations and systems engineering. The free-floating-base model can lead toward space robotics. You do not have to choose all of them. Choose a question, make it measurable, and let the evidence justify the next increase in complexity.
