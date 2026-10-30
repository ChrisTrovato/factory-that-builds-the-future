# 9. Making motion answer to evidence

The gripper approaches the carrier. The camera says the plate is aligned. A force sensor reports rising resistance before the expected seating position. Which signal should the robot believe? The useful answer is not that one sensor is always right. The system needs a model of what each measurement can reveal, a policy for disagreement, and a way to stop without making the situation worse.

This is the practical world of feedback and control. A plan describes an intended course of action. Control uses measurements to influence what happens while the action is carried out. The distinction matters because the physical world deviates from the plan. Parts vary, loads change, friction shifts, and measurements contain noise. A successful controller works within those uncertainties rather than pretending they are absent.

MERIDIAN's assembly task gives us a concrete path through the subject. The system must identify a part, establish its location, move toward a target, manage contact, verify the result, and coordinate shared resources. Each stage needs different information and different limits.

## A feedback loop has four visible ingredients

A basic feedback loop has a desired condition, a measurement, a comparison, and an action. A temperature controller compares measured temperature with a setpoint and adjusts heating or cooling. A position controller compares measured position with a target and commands an actuator. An inventory controller compares available stock with a desired policy and requests replenishment.

The error is the difference between desired and measured conditions. In a simple proportional controller, the commanded correction is proportional to that error. A larger error produces a larger correction, up to the actuator's limits. The proportionality is called a gain. Its units and useful value depend on what is measured and commanded.

Consider an illustrative positioning model in which an error of 2 millimeters produces a requested velocity of 10 millimeters per second. The proportional gain is 5 per second because velocity divided by position has units of inverse time. If the error falls to 0.5 millimeters, the same rule requests 2.5 millimeters per second. This arithmetic explains a control idea; it is not a tuning prescription for an actual machine.

The real mechanism has inertia, friction, delay, and limits. Increasing gain may reduce some errors while producing overshoot or oscillation. An actuator may saturate at its maximum output, so the requested action cannot be delivered. A sensor may report old information. The controller's design has to account for these physical relationships.

## Delay changes the meaning of a correction

Imagine steering a cart while looking only at where it was a moment ago. A correction that would have been appropriate then may be excessive now. In a feedback system, delay can arise from sensing, communication, computation, actuator response, or the plant itself. The plant is the physical system being controlled.

Noise creates another difficulty. If a controller responds strongly to every small fluctuation in a measurement, it can command unnecessary motion. Filtering can reduce noise but can also add delay or hide a rapid event. There is a trade between responsiveness and confidence in the signal. The appropriate balance depends on the task's dynamics and consequences.

This is why a robot's control problem cannot be reduced to an AI model recognizing the scene. Recognition may help establish what is present. Reliable motion still needs timely measurements, actuator authority, physical models, and limits. A powerful planner does not repeal the time required for a motor to accelerate a load or for a structure to settle.

The same concepts connect to aerospace. An aircraft or spacecraft controller must respond to motion and disturbances through actuators with finite authority. An underwater vehicle encounters currents and hydrodynamic effects. A workshop arm encounters contact and friction. The equations and environments differ, but the habit of relating measurements, dynamics, commands, and limits transfers.

## Coordinate frames prevent good numbers from being used badly

A point has coordinates only relative to a reference frame. The camera, robot base, gripper, part, and fixture can each have a different frame. A camera may identify a feature accurately in its own coordinates while the robot needs that feature expressed relative to its base. The relationship between frames must be established.

Northwestern University's Modern Robotics material describes transformation matrices as a way to represent position and orientation and to change the frame in which a quantity is expressed. [F21] The mathematical machinery becomes easier to understand after a small geometric example.

In a two-dimensional illustrative example, a fixture's origin is located at world coordinates (100, 40) millimeters, and the fixture is rotated 90 degrees counterclockwise relative to the world frame. A point on the fixture has local coordinates (30, 10) millimeters. The rotation turns the local displacement into (-10, 30) in world directions. Adding the fixture origin gives world coordinates (90, 70) millimeters.

The sanity check is visual. The fixture's positive local x direction now points upward in the world frame, so the local 30-millimeter x displacement raises the world y coordinate. Its positive local y direction points left, so the local 10-millimeter y displacement reduces world x. Simply adding the original local coordinates to the origin would be wrong because it would ignore orientation.

[[FIG:coordinate_frames]]

In three dimensions, rotations and translations require a more general representation. The order of transformations matters. Rotating and then translating usually gives a different result from translating and then rotating about the original origin. Carefully named frames and units prevent a large class of confusing errors. A coordinate transform is not just algebra; it is a statement about physical reference relationships.

Calibration establishes those relationships from measurements. If the camera moves on its mount, the old relationship may no longer be valid. If a tool is changed, the location of its useful tip relative to the wrist may change. Configuration management must therefore include geometric information as well as software files.

## Planning a path and making contact are different tasks

During free motion, the robot can plan a collision-free path through known space. It must consider the whole robot, tool, part, and relevant environment, not only the point at the end of the arm. A path that is geometrically clear may still demand excessive acceleration or pass through a poor configuration. Motion planning and dynamic feasibility need to meet.

Contact changes the problem. The part and fixture constrain one another. Small position errors can produce substantial forces if the system is stiff. The robot may need to limit force, use compliance, or follow a controlled search appropriate to the interface. The desired outcome becomes a physical relationship, such as seating, rather than merely reaching a coordinate.

For MERIDIAN, the system approaches the locating features slowly enough for the intended sensing and control strategy. It monitors whether contact occurs in the expected region and whether the resulting motion is consistent with seating. Unexpected resistance triggers a defined response. Repeatedly pushing harder is not a general solution because the cause may be misalignment, debris, a wrong part, or damage.

The state of the electrical connector may need separate verification. Mechanical seating does not necessarily establish electrical continuity, and continuity does not necessarily establish full sensor function. A sequence of evidence can support the final decision: correct identity, acceptable seating, appropriate retention, electrical relationship, and functional response.

## A state machine makes the task legible

A state machine describes a system in terms of named conditions and allowed transitions. MERIDIAN's task might include ready, part identified, part grasped, approaching, contacting, seated, retained, tested, and released. Each transition has a condition that must be satisfied. There are also states for uncertainty, failed test, and recovery.

The benefit is clarity. If the system is in the contacting state, it should not assume retention is complete. If a test fails, it should not proceed to delivery because the motion program reached its final line. A state machine makes the difference between commanded action and verified outcome explicit.

The design also specifies what information is preserved during a fault. The last known position, sensor readings, part identity, and operation stage can help a person or recovery routine understand the situation. If power is lost, the system must determine its actual state on restart rather than blindly resuming an old command. The physical world may have changed while the controller was unavailable.

Not every state requires advanced AI. Some transitions can use simple, well-tested logic. AI may help interpret uncertain observations or propose recovery options, while lower-level control maintains bounded behavior. A useful architecture assigns each decision to a method suited to its timing, uncertainty, and consequences.

## Sensor disagreement is a valuable event

Two deeper ideas help explain which signals the system needs. Observability concerns whether internal states can be inferred from available measurements within a chosen model. Controllability concerns whether available inputs can move the system through the states required by the task. These are mathematical concepts, but their physical meaning is accessible. A robot may be able to move a latch without having a sensor that distinguishes fully latched from nearly latched. It has an action capability but insufficient information about the result.

Adding a sensor can improve observability, yet only if its signal distinguishes the important conditions. A switch that activates before the latch is fully engaged may report the wrong proxy. A camera view may be blocked exactly when confirmation is needed. Designing a visible witness feature or a better sensing geometry can be more effective than adding a more complex interpretation model.

Conversely, the system may detect a problem it cannot correct. It can see that a plate is tilted but lack a degree of freedom or a reachable grasp needed to reposition it. The solution may require a mechanical change rather than more perception. Useful autonomy needs both the ability to know enough about the task and the ability to act on that knowledge.

Return to the camera and force sensor. The camera indicates acceptable alignment, but force rises too early. Several explanations are possible. The camera-to-robot calibration may be wrong. The plate may be the wrong revision. Debris may obstruct a contact. The force sensor may have an offset. The mechanism may be binding for a reason invisible from the camera's viewpoint.

A well-designed response preserves the part and evidence. The robot stops within a defined condition, withdraws if that action is known to be appropriate, and records the observations. It may repeat a bounded check, inspect a reference, or request help. The choice depends on what has been validated. Autonomy includes deciding that the available evidence is insufficient.

The next experiment should separate causes. Checking a known reference can test calibration. Inspecting the mating surfaces can reveal debris. Comparing the part identity with the work order can catch a revision mismatch. Repeating the same insertion without new evidence may simply reproduce the same uncertainty.

This approach is useful for the student as well. A machine behaving unexpectedly is an opportunity to practice competing hypotheses. The goal is to design a test whose possible outcomes change what you believe. Guessing correctly once is less transferable than learning how to investigate reliably.

## Two capable robots can still block each other

Imagine an illustrative MERIDIAN expansion with one robot delivering trays and another installing modules. Both need access to a narrow handoff area. The delivery robot enters and waits for the assembly robot to remove a tray. The assembly robot waits for space to place its completed tray before accepting the next one. The completed tray's destination is blocked by the delivery robot. Each robot is following a locally reasonable rule; the system is stuck.

This is a resource-coordination problem. A faster arm does not resolve it. The architecture needs a place for completed work, a handoff protocol, or a rule governing reservation and release of the shared space. The problem can be simplified physically by providing separate incoming and outgoing buffers.

The revised system gives the handoff area an explicit owner at any moment. A robot requests access, receives permission under defined conditions, completes the transfer, and releases the resource. Timeouts and recovery rules handle cases in which a task does not finish as expected. The physical layout and the software protocol reinforce one another.

Adding more robots can increase such interactions. Charging stations, tools, fixtures, aisles, communication channels, and inspection devices become shared resources. Useful output depends on their coordination. The right performance measure is the complete flow of accepted work, not the sum of each robot's best isolated cycle time.

## Scheduling must include uncertainty and maintenance

A schedule predicts when resources will be needed. Actual operations vary. A part may need reinspection, a tool may need replacement, or a robot may require recovery. A schedule with no room for variation can be efficient on paper and fragile in practice. Buffers and slack can have value because they limit the propagation of disturbances.

The amount and location of buffer matter. Too much work in progress can hide problems and consume space. Too little can cause frequent starvation. Chapter 12 will examine throughput and bottlenecks more quantitatively. Here the control lesson is that a factory operates at multiple time scales: fast motion control, slower task execution, and still slower scheduling and maintenance decisions.

A change at one level can affect another. Increasing robot speed may raise vibration and reduce placement quality. Reducing a buffer may expose a previously hidden supply variation. Deferring maintenance may improve today's schedule while worsening tomorrow's availability. A useful model connects these effects without pretending every detail can be predicted exactly.

## Teach the controller what it is allowed to assume

Every controller relies on a boundary of expected conditions. The object range, load range, environmental conditions, sensor behavior, and recovery options should be stated. If an assumption is violated, the system needs a response. This is the operational meaning of bounded autonomy.

For MERIDIAN, the robot may be authorized to retry a recognized insertion issue within a tested procedure, but not to invent a new high-force maneuver. It may quarantine a part whose identity is uncertain. It may continue production with a redundant measurement only if the acceptance plan permits that substitution. The decisions are tied to evidence and consequences rather than to a desire to avoid human involvement at all costs.

The result is a machine that can be trusted with a meaningful slice of work. Its limits are not a failure of ambition. They are how capability becomes usable. As evidence accumulates, the operating envelope can expand deliberately. The next chapter follows the same logic after a machine fails, when control must give way to diagnosis, repair, and a justified return to service.
