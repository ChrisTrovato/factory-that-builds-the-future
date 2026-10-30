# 4. The physical grammar of machines

Hold a loose hinge in your hand and it may feel excellent. Mount it between two stiff plates whose axes are slightly misaligned, and the same hinge can bind. The hinge did not become less intelligent. Its constraints changed. Mechanical design begins by noticing what an object is allowed to do, what prevents it from doing something else, and where the resulting forces travel.

A mechanism is an arrangement of parts that guides motion or transmits force. It may be as simple as a lever or as intricate as a robot wrist. The familiar objects inside it perform distinct jobs. A bearing supports and guides motion. A shaft transmits rotation or supports rotating parts. A gear changes the relationship between rotations. A spring stores mechanical energy. A latch retains a state. A coupling connects motion between components while accommodating selected differences between them.

Learning this vocabulary makes machinery more readable. It also makes ambitious systems less mysterious. An orbital arm and a workshop fixture operate in different environments, but both must establish constraints, carry loads, accommodate variation, and reveal their state. Their designers speak related physical languages.

## Degrees of freedom are possibilities of motion

A rigid object free in three-dimensional space can translate along three independent directions and rotate about three independent axes. These six degrees of freedom describe possible motion, not six motors. A loose plate on a bench is constrained by contact and gravity in ways that differ from a plate floating in orbit. A joint intentionally permits some relative motions while resisting others.

A revolute joint permits rotation about an axis. A prismatic joint permits translation along a direction. Real joints approximate these ideal relationships. Bearings have clearances and elasticity. Guides have friction. Structures bend. The ideal model is useful because it gives a starting point from which the real deviations can be investigated.

MERIDIAN's removable plate is meant to become well located when installed. Its locating features should constrain the relevant motions without demanding impossible agreement among redundant surfaces. Overconstraint occurs when more geometric conditions are imposed than can be satisfied reliably in the presence of manufacturing variation or thermal change. A plate may then seat differently depending on which fastener is tightened first.

A familiar conceptual solution uses one feature to establish position in two directions and another to establish orientation while allowing a small amount of accommodation in a redundant direction. A round locating feature paired with a suitably relieved second feature illustrates the idea. The detailed design still needs loads, tolerances, wear, and manufacturing considered. The principle is to constrain what matters deliberately, rather than hoping several imperfect features agree.

## Retention and location should not be confused

A fastener can pull two surfaces together, but that does not mean its clearance hole precisely locates them. If a plate can slide within the clearance before tightening, its final position may depend on assembly force and friction. Locating features establish position more directly. Retaining features maintain the necessary contact and resist separation.

In MERIDIAN's concept, two alignment features locate the plate and two captive fasteners retain it. Keeping the fasteners captured prevents loose hardware from becoming a handling problem during removal. The design must still provide tool access and a clear release sequence. Captive does not mean self-explanatory or impossible to damage.

The fastener is also a spring-like member in a joint. Tightening can stretch it and compress the clamped parts. The resulting preload can help maintain contact, but its relationship to applied torque depends strongly on friction and the details of the joint. NASA's Fastener Design Manual discusses preload, lubrication, coatings, temperature, fatigue, and other factors that complicate selection and installation. [F08] A torque value is consequently a controlled process parameter, not a universal statement of clamping force.

For a beginner, the practical conceptual lesson is to avoid treating tightening as an unlimited improvement. More tightening can distort a thin plate, damage a thread, or change alignment. A sound design specifies an appropriate joint and an appropriate assembly method. Learning why the joint works is more useful than memorizing a number divorced from its conditions.

[[FIG:exploded_carrier]]

## Leverage makes force easier to see

Torque describes the turning effect of a force about an axis. For a force perpendicular to a lever, torque equals force multiplied by perpendicular distance. Distance matters because the same force applied farther from the axis produces a larger turning effect. A door is easier to turn near its handle than near its hinge for this reason.

In an illustrative notebook example, a 20-newton force acts perpendicular to a lever 0.15 meters from its pivot. The torque is 20 multiplied by 0.15, or 3 newton-meters. If the perpendicular distance is reduced to 0.05 meters, the same force produces 1 newton-meter. To recover 3 newton-meters at that shorter distance would require 60 newtons. These are teaching values, not a specification for MERIDIAN.

The sanity check is physical. Tripling the lever distance triples the turning effect if the force direction remains perpendicular. If the force becomes aligned with the lever, its turning effect approaches zero even though the force itself remains. Later, trigonometry will express this dependence through the angle between the force and lever. The geometry is already present in the everyday action of pushing a door.

Mechanical advantage exchanges force and motion. A longer lever can reduce the required input force, but the input point moves through a greater distance for the same output motion. An ideal gear reduction similarly increases torque while reducing rotational speed. Losses mean a real mechanism delivers less output power than the ideal relationship would suggest.

Suppose an ideal gear pair has a driven gear with sixty teeth and a driving gear with twenty. The speed reduction is three to one. An input of 300 revolutions per minute produces 100 revolutions per minute at the driven gear, with the direction determined by the gear arrangement. An ideal input torque of 0.4 newton-meters becomes 1.2 newton-meters. If a purely illustrative efficiency of 0.85 is assumed, the corresponding output torque is 1.02 newton-meters. That result is a model using a chosen efficiency, not measured performance of a particular gearbox.

This relationship explains both the attraction and cost of reduction. More torque can help move a load, but the gearbox adds mass, friction, clearance, and components that can wear. The mechanism must still accelerate the load, withstand contact forces, and survive its duty cycle. A favorable ratio is one ingredient in a design.

## Stiffness is different from strength

A component can remain far from breaking while deflecting too much to perform its job. Strength concerns resistance to failure under specified conditions. Stiffness concerns resistance to deformation. A sensor carrier may be strong enough to survive its load yet too flexible to preserve measurement alignment.

An elementary linear model relates force F, stiffness k, and displacement x through F = kx. In an illustrative test, a fixture with an effective stiffness of 200 newtons per millimeter deflects 0.10 millimeters under 20 newtons. Doubling the load to 40 newtons produces 0.20 millimeters in this model. The relation applies only over a range where the stiffness is approximately constant and the structure behaves as assumed.

The word effective matters. The measured stiffness can include the plate, joints, base, and test support. If a joint slips, the simple linear model may no longer describe the motion. If a contact opens, stiffness can change abruptly. A test should record the loading direction and support conditions because those conditions help define what was measured.

A designer can increase stiffness by changing material, geometry, support spacing, or load path. Adding thickness may work, but a rib or a shorter unsupported span may use material more effectively. Moving a load closer to a support may reduce the bending demand. A geometry that looks less dramatic can be mechanically superior because it directs force through a shorter, straighter path.

## Backlash, friction, and compliance change the conversation

Backlash is lost motion associated with clearance when the direction of transmitted motion reverses. A motor may begin turning while an output remains momentarily still as contact transfers between opposing surfaces. In a positioning system, this can make behavior depend on the direction of approach. A controller can compensate for some effects, but compensation does not eliminate the underlying contact and load relationships.

Friction can be useful or troublesome. It allows a clamp to retain a part and a wheel to develop traction. It also resists motion and produces heat. Static and moving behavior may differ, creating stick-slip motion in which an actuator builds force before suddenly moving. Surface condition, lubrication, temperature, load, and wear can change the behavior.

Compliance is deformation under load. It is often described as a weakness, but controlled compliance can help an insertion tolerate small misalignment. A rigid tool that pushes a slightly misplaced pin may jam. A suitably compliant tool can accommodate the error while contact guides the parts together. Too much compliance, however, can reduce positioning accuracy or permit unwanted motion.

The choice is therefore not stiffness everywhere or softness everywhere. The designer decides which directions should be stiff and which should accommodate movement. A gripper may need firm retention along one direction and gentle accommodation in another. A coupling may transmit torque while accepting a small misalignment that would otherwise overload bearings. The useful mechanism distributes constraints deliberately.

## Bearings turn support into a design problem

A bearing supports relative motion while carrying loads. Rolling-element bearings use balls or rollers between surfaces; plain bearings support sliding contact. The suitable choice depends on load direction, speed, environment, life, precision, lubrication, and maintenance. A bearing selected only by whether the shaft fits can fail to satisfy the actual duty.

Radial loads act across a shaft's axis; axial loads act along it. A mechanism may experience both. The arrangement of bearings determines how the shaft is supported and how thermal growth is accommodated. Fixing every part of a shaft rigidly in every direction can create internal loads when temperatures change. Allowing selected movement can preserve alignment without forcing incompatible expansions to agree.

Bearings also connect the mechanical story to the materials story. Contact stresses, surface finish, hardness, contamination, and lubricant behavior influence life. The tiny particles that seem harmless on a bench can become damaging in a loaded contact. A seal or shield is therefore part of the mechanism's performance, not decorative packaging.

ESA's 2026 report on lubricant containment describes research into labyrinth-seal geometry for space mechanisms, where escaping lubricant can be lost from the mechanism and contaminate sensitive surfaces. [F09] The example shows why moving a familiar bearing into space changes the engineering problem. A mechanism's environment is part of its design.

## Belts, screws, springs, and other useful compromises

A belt can transmit motion between separated shafts and can be convenient to replace. It introduces tension, compliance, and alignment considerations. A lead screw converts rotation into translation, with behavior influenced by thread geometry, friction, backlash, and support. A ball screw changes the contact mechanism and can reduce friction, while adding its own requirements. No transmission is simply better without a task.

A spring can maintain contact, return a mechanism, or absorb variation. It also stores energy and can change force as it moves. A brake holds or slows motion; a clutch engages or disengages a transmission. A latch maintains a selected state until released. Each component brings a question about how the state is established and how it is confirmed.

A flexure guides limited motion through elastic deformation instead of a conventional sliding or rolling joint. It can avoid backlash and lubrication at the moving interface, but its travel and stress limits matter. It is especially instructive because it makes the relationship between geometry and motion visible. A thin compliant region can define movement without adding a separate bearing.

Tool changers combine several of these ideas. They must locate a tool, retain it, transmit the necessary services, and release it intentionally. A mechanical lock may appear engaged while an electrical connector is not fully seated. A useful state indication must correspond to the condition that matters, rather than merely to a commanded action. The robot needs evidence that the tool is attached and ready.

## A revision that makes service easier

In MERIDIAN revision A, the fasteners are close to the sensor body. A person with a narrow tool can reach them, but the approach requires an awkward angle. The connector is placed under an overhang, so the operator cannot see whether its key is aligned. The assembly works when built on an open bench; it becomes difficult when installed next to other equipment.

Revision B moves the fasteners into a clear approach envelope, adds visible alignment cues, and separates the locating action from final retention. The connector is given an accessible approach and a strain-relief route that does not pull the plate sideways. The team also provides a small feature that allows the module to be supported during removal. These are conceptual changes; each must be checked for effects on stiffness, envelope, and manufacture.

[[FIG:assembly_sequence]]

The improvement is larger than the sum of the moved features. The service sequence becomes less ambiguous. A robot can approach with fewer difficult orientations. A person can inspect the contacts before closing the assembly. A connector fault becomes easier to investigate. Better access can reduce damage during repair and make the same hardware easier to test.

This is design for service expressed through geometry. It is also a place where aerospace and mechanical interests meet. Deployment mechanisms, payload mounts, inspection tools, and modular spacecraft components all require decisions about access, force, sequence, and state. A student does not need to begin with a spacecraft to learn those decisions. A modest removable module can make them tangible.

At the end of this chapter, the carrier should look different to the reader. The plate is a load path. The locating features are a constraint system. The fasteners are retaining elements with controlled joint behavior. The connector is a mechanical and electrical interface. The empty space around them is tool access. The next chapter asks how a factory determines whether all those intentions survived manufacture.
