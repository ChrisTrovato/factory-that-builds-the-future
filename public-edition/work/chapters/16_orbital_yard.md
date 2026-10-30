# 16. A shipyard with no floor

A robot arm reaches toward a truss segment. On Earth, the arm's base would push against a foundation. In orbit, its base is a spacecraft. As the arm moves, the spacecraft responds. The camera mounted on that spacecraft moves too. The target may flex, the gripper may obscure its own view, and a small contact force can begin a slow motion that continues long after the motor stops.

The scene is not a violation of familiar mechanics. It is familiar mechanics with the convenient supports removed. Gravity still acts, but the yard and its cargo are falling around Earth together. Their shared orbital motion produces the experience usually called microgravity. Objects retain mass and inertia. They still resist acceleration, collide, bend, vibrate, and exchange momentum.

An orbital yard becomes plausible when its purpose is narrower than its image. Instead of starting with a city-sized factory, imagine a service platform that assembles one class of standardized support structure from delivered modules. Its value might be a structure too large to fit inside one launch fairing, a replaceable instrument mount, or a way to upgrade a valuable asset. The first question is what useful work the platform enables that a simpler architecture cannot provide as well.

## The MERIDIAN-O study boundary

MERIDIAN-O is an original design study, separate from the Earth cell. Its proposed product is an uncrewed modular support truss for a scientific instrument demonstrator. The study does not assume precision optical performance, a pressurized habitat, or a commercial customer. It asks whether imported structural modules can be assembled, inspected, and later exchanged at a small orbital worksite. No hardware dimensions from the Earth carrier are carried over as a qualified space design.

The initial inventory is explicit. A delivered service bus supplies power conditioning, communications, navigation, attitude control, thermal management, and computers. A restrained magazine holds imported truss modules. A manipulator has compatible capture tools. A fixed assembly fixture defines the worksite. Cameras, fiducials, joint-state sensing, and force or torque measurements support assembly. A separate storage location holds rejected or suspect hardware. Imported replacement tools and a spare replaceable actuator module support a limited recovery plan. The spare serves an accessible fixture actuator while the manipulator remains functional; a disabling failure of the sole arm is outside this local recovery capability.

People on Earth review operations and authorize changes. They are not assumed to watch every instant. The bus has enough local control to hold a permitted state, stop an operation, retain a captured object, and wait for communication. Power comes from an imported solar-generation and storage system sized by a later design study; this chapter assigns no fabricated flight power rating. The proposed work is scheduled around its actual energy and thermal limits.

This inventory excludes a metal refinery, a semiconductor facility, and a machine that can repair every other machine. At first, MERIDIAN-O assembles delivered parts. Its nearest relationship to MERIDIAN on Earth is a design philosophy: visible interfaces, controlled changes, acceptance evidence, and service access. A later manufacturing extension would be a new capability with additional equipment and qualification, not a switch hidden in the software.

[[FIG:orbital_yard]]

## Servicing, assembly, and manufacturing are different verbs

NASA uses in-space servicing, assembly, and manufacturing, or ISAM, to describe a broad field of activities. Its current survey includes systems at many stages of development. A catalog of entries is not a count of operating factories. [S05] The categories help because they keep different achievements visible.

Servicing preserves or restores useful function. It may include inspection, refueling, replacing a module, relocating a spacecraft, or providing a capability the original vehicle no longer supplies. Assembly joins components into a useful configuration. Manufacturing transforms feedstock into parts or products. A service mission can be valuable without manufacturing anything. A manufacturing experiment can be meaningful without producing a flight-qualified replacement.

The International Space Station provides strong evidence for robotic assembly and maintenance supported by people and prepared interfaces. NASA describes Canadarm 2's role in assembly, Dextre's replacement of equipment, and the Mobile Base System's movement along the station truss. It also identifies ground robotics controllers. [S06] That combination matters. The achievement belongs to robots, interfaces, procedures, communications, spare hardware, and skilled operations together.

The Canadian Space Agency describes Dextre's tools, cameras, and ability to exchange selected external equipment. [S07] It would be misleading to compress that into a claim that space robots already repair arbitrary spacecraft. The hardware was designed for particular tasks and supported by an extensive operational system. The useful inference is that serviceability can be engineered into the asset, making difficult remote work repeatable within a defined scope.

## Launch packaging becomes assembly logic

Before a module reaches the yard, it must survive transportation. The stowed configuration experiences launch loads and vibration. Restraints protect fragile features. Covers protect mating surfaces. Interfaces must be accessible after release, and the release sequence must avoid creating an uncontrolled object. The design for launch and the design for assembly therefore overlap.

A tightly packed cargo arrangement can improve transport efficiency while making retrieval awkward. If the robot must remove three modules to reach a spare, inventory management has become a motion-planning problem. If a protective cover can only be removed from a direction blocked by the magazine, the drawing contains a hidden impossibility. Assembly planning should begin while the packaging is still negotiable.

The worksite needs somewhere to put every object at every stage. On a bench, a technician can set a tool down. In orbit, an unsecured tool does not stay on a convenient tabletop. Tool holders, temporary capture points, and positive retention become part of the process. A well-designed operation never relies on a part merely being nearby. Its state is restrained, captured, installed, transferred, or deliberately released under an approved plan.

The fixture also needs an acceptance definition independent of the arm's enthusiasm. A camera may show that two pieces touch while a small gap remains at the load-bearing surface. A latch may close before the locating features seat. The team therefore decides which measurements establish geometry, which establish retention, and which establish structural function. Separating those questions prevents one convenient sensor from being asked to prove three different things.

The same reasoning applies to debris. Chips, fragments, loose fasteners, and escaped covers are operational hazards. This encourages captive hardware, contained processes, and assembly methods that minimize free material. Manufacturing can still be possible, but its containment and waste-handling equipment must be included. A printer drawing does not represent a complete manufacturing station unless the feedstock, byproducts, inspection, and rejected material have somewhere to go.

## A moving base changes the reach problem

Chapter 9 introduced coordinate frames as a way to describe where things are relative to one another. MERIDIAN-O has frames attached to the bus, arm links, gripper, fixture, and target. A camera estimate of the target pose is useful only when the transformations between those frames are known well enough for the operation.

On Earth, treating the factory floor as fixed is often an excellent approximation. In orbit, the bus can rotate as the arm moves. Its flexible appendages may respond on different time scales. A position command expressed in the bus frame can therefore produce a different inertial motion than a beginner expects. The controller must know which task is being controlled: joint angle, gripper pose relative to the fixture, target motion relative to the bus, or orientation relative to the stars.

These tasks can conflict. Keeping the gripper aligned with a joint may require allowing the bus to move slightly. Holding the bus orientation tightly may consume reaction-wheel capacity or thruster propellant. Moving a long module quickly may excite structural vibration that degrades a camera measurement. The optimal operation is often slower and more coordinated than a promotional animation suggests, because the valuable output is a verified joint, not an impressive arm trajectory.

### Engineering notebook: two bodies exchange momentum

Use a deliberately simple linear model over a short time interval. Assume an isolated 1,000 kg bus and a 100 kg payload, initially at rest in a local inertial frame. Ignore the arm's mass, rotation, flexible motion, and external forces during the maneuver. The mechanism moves the payload at 0.10 m/s relative to the bus. Let v_b be bus velocity and v_p be payload velocity in the original frame.

```text
Momentum conservation: 1,000 v_b + 100 v_p = 0.
Relative velocity:     v_p - v_b = 0.10 m/s.
Therefore:             v_b = -0.00909 m/s.
                       v_p =  0.09091 m/s.
```

The payload moves forward and the bus moves backward. The mass-weighted total remains zero. The result is not obtained by setting payload velocity to 0.10 m/s in the inertial frame; that would confuse relative and absolute motion. The arithmetic is introductory algebra, yet it exposes a real design issue: the support moves when the supported machinery acts.

For a similarly simplified rotational example, imagine two coaxial rigid bodies with moments of inertia of 2,000 and 200 kg m2. If the smaller body rotates at 0.020 rad/s relative to the larger, with zero initial angular momentum and no external torque, the larger body's rate is -0.00182 rad/s and the smaller body's inertial rate is 0.01818 rad/s. Moment of inertia plays the role that mass played in the linear calculation. Real articulated spacecraft require a richer model because their inertia and coupling change with configuration.

[[FIG:orbital_momentum]]

A reaction wheel can exchange angular momentum with the spacecraft, but it does not remove angular momentum from the complete isolated system. Thrusters can apply external torque by expelling propellant. This distinction explains why control hardware has limits and why an assembly sequence must fit the vehicle's momentum-management plan. A robot arm is part of the spacecraft dynamics, not a detached appliance bolted onto an imaginary floor.

## Contact is a negotiation between imperfect geometries

The target joint has a lead-in feature and a final locating surface. The arm approaches with bounded uncertainty. As contact begins, small forces reveal whether the parts are aligning or binding. A stiff position controller that insists on the original trajectory may turn a minor pose error into a large load. Deliberate compliance, mechanical or controlled, can let the geometry guide the parts into place.

Compliance is not simply softness. Too much can make the final position uncertain or permit oscillation. Too little can transmit harmful forces. The designer chooses where motion is allowed, where stiffness is needed, and what evidence shows that the joint has seated. The latch should not report success merely because its motor reached a commanded angle. Independent indications can include engagement position, force history, electrical continuity where appropriate, and inspection of the final geometry.

A useful sequence divides the operation into states. The arm first confirms identity and orientation. It captures the module and verifies retention. It transports the module through a collision-free corridor. It approaches the joint at a permitted rate, enters a controlled contact phase, establishes alignment, locks the joint, and verifies acceptance before releasing the gripper. Each transition needs a condition that can actually be observed.

If evidence disagrees, the system should enter a known recoverable state. For example, it may keep holding the module while withdrawing to a safe clearance. That option requires sufficient reach, energy, thermal margin, and mechanical clearance. Recovery cannot be invented after the joint jams. It belongs in the sequence from the beginning.

## Build the structure and its assembly method together

NASA's ARMADAS research offers an instructive ground demonstration: specialized robots assemble modular structural building blocks. The important evidence is the demonstrated Earth-based assembly approach; illustrations of future lunar infrastructure are concepts. [S08] Its broader lesson is that a product can be designed to simplify robotic work.

A structure assembled from regular modules may provide convenient paths, grasp points, and locating features. This can reduce the need for a robot to solve every possible manipulation problem. But modularity brings costs. Joints add mass, compliance, manufacturing effort, and failure opportunities. A highly repetitive lattice may not be optimal for every load case. The design must compare the benefit of easier assembly with the cost of the assembled structure.

MERIDIAN-O therefore does not assume that the most modular architecture wins. The team compares a deployable truss, a small number of larger delivered sections, and many smaller repeated modules. The deployable option concentrates risk in hinges and deployment behavior. The modular option spreads work across repeated connections and inspections. Larger sections reduce joint count but complicate packaging and handling. The correct comparison includes performance after assembly, not merely whether the robot can complete the sequence.

A useful experiment might test a representative joint repeatedly under measured misalignment and thermal conditions. It could record insertion force, time, final stiffness, and the ability to release after cycling. Those results would inform both the mechanical design and the controller. This is an excellent example of a research question that joins aerospace structures, mechanisms, controls, and manufacturing without requiring a universal robot.

## Manufacturing begins with a narrow material claim

ESA reported the first metal shape printed by its ISS technology demonstrator in August 2024, with samples intended for analysis on Earth. [S09] A July 2026 update described a fifth sample and comparison of returned samples with ground prints. It said analysis results would be published subsequently. [S10] On October 1, ESA reported that the fifth sample had returned to Earth and included small thruster-shaped components intended for subsequent functional testing at DLR. The report described earlier findings being used to improve printing procedures; the functional tests were still presented as next steps. [S26] These are important process demonstrations. They do not by themselves establish arbitrary on-demand production of certified spacecraft hardware.

For MERIDIAN-O, an eventual manufacturing extension might begin with a low-consequence tool or fixture whose requirements are narrow and measurable. Imported feedstock would enter a contained process. The output would be inspected, perhaps machined or finished, and tested against its intended function. The facility would retain an imported fallback while the new process accumulated evidence. This is an architecture for learning without making the first experiment responsible for the whole mission.

The most useful product may initially be something mundane. A custom holding fixture can enable a repair. A spacer can accommodate a known interface change. A replacement cover can protect a surface. The industrial significance lies in reducing a specific logistics burden while preserving acceptance standards. Printing a complex shape merely because it looks advanced is a poor use of scarce orbital equipment.

The manufacturing station also needs maintenance. Its feed system can jam. Its optics or sensors can drift. Its containment can become contaminated. If it requires a replacement part made only on Earth, that is a declared dependency. The printer can still be worthwhile; the book's central question is whether the capability it adds exceeds the support burden it introduces.

## The first successful shift

Imagine MERIDIAN-O completing its first bounded assembly campaign. The record includes delivered serial numbers, tool configuration, temperature ranges, accepted joint states, rejected operations, and operator interventions. One joint required a second approach. One module remained quarantined because its inspection evidence was ambiguous. The accepted structure is smaller than the most optimistic rendering, but every installed connection has a defensible history.

That is the beginning of an orbital yard. It is not self-replication, and it does not need to be. It has converted delivered components, energy, information, and human support into a verified assembled configuration larger than the campaign's stipulated transport envelope. That envelope is a scenario assumption, not a packaging analysis established here. The achievement is concrete enough to improve.

The next campaign can ask a sharper question. Can the process reduce intervention without increasing damage? Can a different joint lower assembly time while preserving stiffness? Can a tool be exchanged robotically? Can a module be removed after months of exposure? Each answer adds a capability whose limits are known. The future grows through those links.

For an aerospace student, the work is recognizable. Dynamics predicts how the base reacts. Structures predicts how the truss deflects. Thermal engineering predicts changing geometry. Controls manages motion and contact. Manufacturing produces repeatable interfaces. Test engineering establishes what the system actually does. Space becomes less mysterious as the disciplines connect, while the problem remains large enough to reward a lifetime of learning.
