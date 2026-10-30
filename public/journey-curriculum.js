// Original learning explorations. All numerical inputs are illustrative models,
// not released designs, equipment instructions, course credit, or a calendar.
export const explorations = [
  {
    id: 'coding', title: 'Make the calculation repeatable', subject: 'Programming', level: 'Early degree', minutes: 25,
    prerequisites: ['units', 'algebra'],
    hook: 'A useful first program can be smaller than a robot: turn four position measurements into three velocities.',
    why: 'Programming preserves a sequence of reasoning so you can inspect it, repeat it, and apply it to new observations. A short script you understand is already an engineering instrument.',
    story: [
      'Consider a fictional carriage recorded at 0, 1, 2, and 3 seconds. Its positions are 0, 50, 120, and 200 millimeters. You want the average velocity within each interval. These observations describe motion; they are not commands to send to hardware.',
      'Before writing a loop, solve one interval by hand. Then identify what changes from one interval to the next. A program becomes easier to trust when its inputs, units, and small reference cases are explicit. It should reject duplicate timestamps rather than divide by zero and produce a convincing-looking result.'
    ],
    equation: 'v[i] = (x[i + 1] − x[i]) / (t[i + 1] − t[i]); units: mm/s',
    steps: [
      'First interval: (50 − 0) mm / (1 − 0) s = 50 mm/s. The next two intervals give 70 mm/s and 80 mm/s.',
      'Store times and positions as two equal-length lists. For each adjacent pair, subtract positions, subtract times, check that elapsed time is positive, then divide.',
      'Check the whole record independently: total displacement is 200 mm over 3 s, giving about 66.7 mm/s. Because these intervals have equal durations, their average velocities also average to 66.7 mm/s.',
      'Test a stationary interval: positions 100 and 100 mm one second apart must give 0 mm/s. Convert the first result to meters per second: 50 / 1,000 = 0.050 m/s.'
    ],
    check: {question: 'Two samples are 0.00 m at 0 s and 0.20 m at 4 s. What should your program return for their average velocity?', options: ['0.80 m/s', '0.050 m/s', '20 m/s'], answer: 1, explanation: 'Displacement divided by elapsed time is 0.20 m / 4 s = 0.050 m/s. Multiplication would answer a different question and leave the wrong units.'},
    action: 'Write pseudocode or a small script for the three intervals. Save the input table and two hand-checked test cases beside it so another person can follow the calculation.',
    chapter: '22', chapterLabel: 'Mathematics becomes a physical language'
  },
  {
    id: 'frames', title: 'Describe one point in two worlds', subject: 'Linear algebra', level: 'Core degree', minutes: 30,
    prerequisites: ['vectors', 'trigonometry'],
    hook: 'A camera, a robot, and a fixture can give different coordinates for the same physical point.',
    why: 'Linear algebra organizes geometric relationships without losing their meaning. Coordinate transforms let several instruments and mechanisms share a description of the worksite.',
    story: [
      'Draw a world frame and a robot frame on paper. The robot origin is at world coordinates (0.30 m, 0.20 m). Its axes are rotated 90° counterclockwise relative to the world axes. A point has robot-frame coordinates (0.10 m, 0.05 m).',
      'To describe that point in the world, first rotate its displacement from the robot origin, then add the origin’s world position. The rotation changes the components without changing that displacement’s length. Translation changes where the whole frame sits. Mixing these two operations is a common way to create a plausible but misplaced point.'
    ],
    equation: 'p_world = R p_robot + origin; for 90° counterclockwise, R = [[0, −1], [1, 0]]',
    steps: [
      'Read the rotation matrix by rows: the new horizontal component is −y_robot, and the new vertical component is x_robot.',
      'Rotate the point’s displacement: (0.10 m, 0.05 m) becomes (−0.05 m, 0.10 m). This vector still has length about 0.112 m.',
      'Add the robot origin: (−0.05, 0.10) m + (0.30, 0.20) m = (0.25 m, 0.30 m). Label the result as world coordinates.',
      'Check the special case p_robot = (0, 0). Its world position must equal the robot origin, (0.30 m, 0.20 m). This is a useful test for a later program.'
    ],
    check: {question: 'In the same frames, where is the robot-frame point (0.20 m, 0 m) in world coordinates?', options: ['(0.30 m, 0.40 m)', '(0.50 m, 0.20 m)', '(−0.20 m, 0 m)'], answer: 0, explanation: 'The robot’s positive x direction points upward in the world frame. Rotate (0.20, 0) to (0, 0.20), then add the origin (0.30, 0.20).'},
    action: 'Draw both frames and both points to scale. Write a sentence distinguishing the location of the robot origin from a displacement measured inside the robot frame.',
    chapter: '09', chapterLabel: 'Making motion answer to evidence'
  },
  {
    id: 'odes', title: 'Predict a temperature one step at a time', subject: 'Differential equations', level: 'Core degree', minutes: 30,
    prerequisites: ['derivative', 'integral', 'exponential'],
    hook: 'Sometimes the model tells you how fast a quantity changes, rather than giving its value directly.',
    why: 'Differential equations connect a system’s current state to what happens next. An initial condition and a physical rate law become a prediction through time.',
    story: [
      'Use an illustrative cooling model for an object that is uniform in temperature. Its surroundings remain at 20°C, its initial temperature is 60°C, and its cooling coefficient is 0.10 per minute. The model says that cooling slows as the object approaches its surroundings.',
      'The equation dT/dt = −k(T − T_ambient) gives a temperature-change rate. An Euler step estimates the next temperature by holding that rate constant over one short interval. This approximation introduces numerical error; smaller steps can improve it, but they cannot repair an unsuitable physical model.'
    ],
    equation: 'dT/dt = −(0.10/min)(T − 20°C); Euler update: T_next = T_now + (rate × Δt)',
    steps: [
      'At the start, the temperature difference is 60 − 20 = 40°C. The model’s initial rate is −0.10 × 40 = −4°C/min.',
      'For a 1 min step, estimate T(1) = 60°C + (−4°C/min)(1 min) = 56°C.',
      'Recalculate the rate at 56°C: −0.10 × (56 − 20) = −3.6°C/min. The next Euler estimate is 52.4°C.',
      'For comparison, this model has the exact solution T(t) = 20 + 40 exp(−0.10t), with t in minutes. At 10 min it predicts about 34.7°C, rather than the 20°C obtained by incorrectly keeping the initial cooling rate constant.'
    ],
    check: {question: 'What cooling rate does this model predict when the object is at 40°C?', options: ['−4°C/min', '+2°C/min', '−2°C/min'], answer: 2, explanation: 'The temperature difference is 20°C, so the rate is −0.10/min × 20°C = −2°C/min. The minus sign describes cooling under the chosen convention.'},
    action: 'Make a five-step table using 1 min intervals, then repeat with 0.5 min intervals. Compare temperatures at the same elapsed time and name both a model assumption and a numerical approximation.',
    chapter: '22', chapterLabel: 'Mathematics becomes a physical language'
  },
  {
    id: 'statics', title: 'Find where the load goes', subject: 'Statics', level: 'Early degree', minutes: 25,
    prerequisites: ['algebra', 'vectors'],
    hook: 'A load does not divide equally between supports simply because there are two of them.',
    why: 'Statics makes load paths explicit. A free-body diagram and equilibrium equations help you identify what each support must provide before you consider material strength.',
    story: [
      'Sketch an ideal horizontal beam with supports 0.50 m apart. A downward point load of 20 N acts 0.30 m from the left support. Ignore the beam’s own weight and assume the supports provide vertical reactions. This is a paper model, not a released lifting arrangement.',
      'For equilibrium, both the net force and the net turning moment must be zero. Balancing forces alone gives one equation for two unknown reactions. Taking moments about a support supplies another equation while removing that support’s reaction from the moment calculation.'
    ],
    equation: 'R_left + R_right = 20 N; R_right(0.50 m) − (20 N)(0.30 m) = 0',
    steps: [
      'Draw the beam by itself, showing the 20 N load downward and unknown reactions R_left and R_right upward. Mark the distances from the left support.',
      'Take moments about the left support. The right reaction acts through 0.50 m; the load acts through 0.30 m. Thus R_right × 0.50 = 20 × 0.30 N·m.',
      'Solve: R_right = 6 N·m / 0.50 m = 12 N. Force balance then gives R_left = 20 − 12 = 8 N.',
      'Check the result physically: the load is closer to the right support, which carries the larger reaction. Taking moments about the right support gives 8 N × 0.50 m = 20 N × 0.20 m.'
    ],
    check: {question: 'Move the same load to the midpoint, 0.25 m from either support. What reactions does this model predict?', options: ['20 N at each support', '10 N at each support', '5 N at each support'], answer: 1, explanation: 'The centered geometry is symmetric, and the reactions must sum to 20 N. Each is therefore 10 N; the moment equation confirms it.'},
    action: 'Draw two more load positions and predict which reaction increases before calculating. Keep the support assumptions beside the diagram so the result cannot be mistaken for a complete strength assessment.',
    chapter: '04', chapterLabel: 'The physical grammar of machines'
  },
  {
    id: 'dynamics', title: 'Connect a force to changing motion', subject: 'Dynamics', level: 'Early degree', minutes: 25,
    prerequisites: ['statics', 'derivative'],
    hook: 'A force that balances a load holds a state. A force imbalance changes it.',
    why: 'Dynamics links load, mass, acceleration, velocity, and position. These connections explain why a visually smooth animation can still demand forces its mechanism cannot deliver.',
    story: [
      'A fictional 2 kg carriage moves along a straight horizontal rail at an initial velocity of 1 m/s. During the next 2 seconds, a drive applies 6 N forward and a separate opposing load applies 2 N backward. Treat both forces as constant over this interval.',
      'The point-mass model ignores rotation, flexibility, and other forces. First find the net force; then calculate acceleration. Only afterward use time to find the change in velocity and position. Keeping those steps separate prevents force, speed, and power from becoming interchangeable labels.'
    ],
    equation: 'F_net = ma; v = v_initial + at; displacement = v_initial t + ½at²',
    steps: [
      'Choose forward as positive. The net force is 6 N − 2 N = 4 N, not the sum of the force magnitudes.',
      'Divide by mass: a = 4 N / 2 kg = 2 m/s². Since 1 N = 1 kg·m/s², the units agree.',
      'After 2 s, velocity is 1 m/s + (2 m/s²)(2 s) = 5 m/s.',
      'Displacement is (1 m/s)(2 s) + ½(2 m/s²)(2 s)² = 6 m. Check with average velocity: (1 + 5)/2 = 3 m/s, and 3 m/s × 2 s = 6 m.'
    ],
    check: {question: 'Double the carriage mass to 4 kg while keeping both forces unchanged. What is its acceleration?', options: ['1 m/s²', '4 m/s²', '2 m/s²'], answer: 0, explanation: 'The net force remains 4 N. Dividing by 4 kg gives 1 m/s². More mass requires more net force to achieve the same acceleration.'},
    action: 'Make separate force, velocity–time, and position–time sketches for the interval. Label every axis and explain which assumptions would need checking before using the model for actual motion planning.',
    chapter: '09', chapterLabel: 'Making motion answer to evidence'
  },
  {
    id: 'materials', title: 'Choose a property for a purpose', subject: 'Material selection', level: 'Core degree', minutes: 30,
    prerequisites: ['units', 'research'],
    hook: 'The strongest-sounding material is not automatically the best answer to a stiffness requirement.',
    why: 'Material selection connects function to measurable properties and production constraints. It becomes a comparison you can explain instead of a preference for a familiar material name.',
    story: [
      'Compare two hypothetical property cards for the same slender axial member. Candidate A has elastic modulus 70 GPa and density 2,700 kg/m³. Candidate B has modulus 200 GPa and density 7,800 kg/m³. These chosen values are not certificates for particular material grades.',
      'The member is 0.20 m long with cross-sectional area 10 mm². Suppose the classroom requirement is axial stiffness of at least 2 MN/m. Use linear elastic behavior for this comparison. Strength, buckling, temperature, corrosion, joints, and manufacturing remain separate questions before either candidate could become a real design choice.'
    ],
    equation: 'axial stiffness k = EA/L; mass = density × area × length',
    steps: [
      'Convert area carefully: 10 mm² = 10 × 10⁻⁶ m² = 0.000010 m². The volume is area × length = 0.000002 m³.',
      'Candidate A: k = (70 × 10⁹ N/m²)(0.000010 m²)/0.20 m = 3.5 MN/m. Its mass is 2,700 × 0.000002 = 0.0054 kg, or 5.4 g.',
      'Candidate B: the same calculation gives k = 10 MN/m and mass = 0.0156 kg, or 15.6 g.',
      'Both exceed the illustrative 2 MN/m requirement. If lower mass is the next objective, A is lighter under the assumed geometry. That conclusion does not establish its strength or suitability in the intended environment.'
    ],
    check: {question: 'Raise the stiffness requirement to 6 MN/m while keeping the geometry unchanged. Which candidate meets it?', options: ['Both A and B', 'Neither candidate', 'B only'], answer: 2, explanation: 'A provides 3.5 MN/m, below the new requirement. B provides 10 MN/m. Changing the geometry might change the comparison, but this question holds it fixed.'},
    action: 'Create a two-column decision sheet: properties demonstrated by this model and properties still needed. Add one manufacturing question that could reverse the apparent preference.',
    chapter: '06', chapterLabel: 'The materials hidden inside a simple machine'
  },
  {
    id: 'stress', title: 'Turn a load into a deformation', subject: 'Stress and strain', level: 'Core degree', minutes: 30,
    prerequisites: ['statics', 'materials'],
    hook: 'Two bars carrying the same force can experience very different internal demands.',
    why: 'Stress relates force to area; strain relates deformation to original length. Together they connect a load-path sketch to an estimate of how a component changes shape.',
    story: [
      'Consider an illustrative straight bar under a centered tensile force of 1,000 N. Its cross-sectional area is 20 mm², its original length is 200 mm, and its assumed elastic modulus is 100 GPa. Treat the bar as uniform and linearly elastic.',
      'The model deliberately excludes holes, local stress concentrations, bending, joint behavior, and material failure. It gives a first estimate of axial extension. A small calculated extension does not prove the component is strong enough or that the assumptions apply to the actual part.'
    ],
    equation: 'stress σ = F/A; strain ε = σ/E; extension ΔL = εL',
    steps: [
      'Convert the area: 20 mm² = 20 × 10⁻⁶ m². Stress is 1,000 N / (20 × 10⁻⁶ m²) = 50 × 10⁶ Pa = 50 MPa.',
      'Express modulus in compatible units: 100 GPa = 100,000 MPa. Strain is 50/100,000 = 0.0005.',
      'Strain has no units because it is a length ratio. Multiplying by 100 expresses it as 0.05%, not 0.0005%.',
      'Extension is 0.0005 × 200 mm = 0.10 mm. Check the trend: a longer bar of the same area and material extends more under the same force.'
    ],
    check: {question: 'Double the area to 40 mm², holding force, length, and modulus fixed. What extension does this model predict?', options: ['0.20 mm', '0.05 mm', '0.10 mm'], answer: 1, explanation: 'Doubling area halves stress, strain, and extension in this axial linear model. The estimated extension becomes 0.05 mm.'},
    action: 'Draw the force, area, and length on one sketch. Make a small sensitivity table showing what happens when each quantity doubles independently, and identify which omitted feature would concern you first.',
    chapter: '04', chapterLabel: 'The physical grammar of machines'
  },
  {
    id: 'vibrations', title: 'Hear the frequency inside the mechanism', subject: 'Vibrations', level: 'Core degree', minutes: 30,
    prerequisites: ['dynamics', 'odes'],
    hook: 'After a movement stops, the structure may still be moving.',
    why: 'Vibration analysis connects stiffness and inertia to repeated motion. It explains why settling time, disturbance frequency, and flexible structures matter to precision mechanisms.',
    story: [
      'Model a fictional component as a 1 kg mass attached to an ideal spring of stiffness 100 N/m. Measure displacement from equilibrium and temporarily ignore damping. The spring pulls toward equilibrium, while inertia carries the mass through it.',
      'This one-coordinate model is a useful doorway into structural modes, not a complete model of a robot arm. A real assembly may have many flexible modes and energy losses. Exciting it near a natural frequency can produce a response very different from a slow static load.'
    ],
    equation: 'm ẍ + kx = 0; natural angular frequency ω_n = √(k/m); frequency f_n = ω_n/(2π)',
    steps: [
      'Compute the angular frequency: √(100 N/m ÷ 1 kg) = 10 rad/s. The underlying units reduce to inverse seconds.',
      'Convert radians per second to cycles per second: 10/(2π) ≈ 1.59 Hz. One cycle takes about 1/1.59 = 0.628 s.',
      'If the displacement amplitude is 0.010 m, the largest spring-force magnitude is k × amplitude = 100 N/m × 0.010 m = 1 N.',
      'Quadruple stiffness to 400 N/m with the same mass. The square root gives twice the angular frequency, 20 rad/s, corresponding to about 3.18 Hz.'
    ],
    check: {question: 'Instead, keep stiffness at 100 N/m and increase mass from 1 kg to 4 kg. What happens to the natural frequency?', options: ['It halves, to about 0.796 Hz.', 'It quadruples, to about 6.37 Hz.', 'It stays at about 1.59 Hz.'], answer: 0, explanation: 'Frequency is proportional to the square root of 1/m. A fourfold mass increase therefore halves the frequency, rather than reducing it by a factor of four.'},
    action: 'Sketch two seconds of the original ideal oscillation. Add a second sketch whose amplitude gradually decreases, and explain which missing physical effect that second sketch represents.',
    chapter: '09', chapterLabel: 'Making motion answer to evidence'
  },
  {
    id: 'feedback', title: 'Watch an error become a command', subject: 'Controls and feedback', level: 'Core degree', minutes: 30,
    prerequisites: ['slope', 'odes'],
    hook: 'A controller must turn “not there yet” into a physical action with the right sign and units.',
    why: 'Feedback connects a desired state to measured behavior. Even a tiny ideal model reveals why gain, time steps, measurement, and machine response belong in the same discussion.',
    story: [
      'Use a paper-only carriage model with target position 0.100 m and measured position 0.080 m. A proportional rule requests velocity equal to position error multiplied by gain K = 2 per second. Assume perfect measurement and immediate, exact velocity response for each 0.10 s interval.',
      'Those assumptions deliberately remove the difficult parts of real control: inertia, delay, saturation, friction, and uncertainty. This is not a gain recommendation for hardware. It is a way to follow the chain from a measurement to a command and then to a new measurement.'
    ],
    equation: 'error = target − measured position; commanded velocity = K × error; e_next = (1 − KΔt)e_now in this ideal model',
    steps: [
      'Compute the initial error: 0.100 m − 0.080 m = 0.020 m. Positive error means the carriage needs positive motion.',
      'Apply the gain: (2/s)(0.020 m) = 0.040 m/s commanded velocity. Gain converts a position error into a velocity command.',
      'For 0.10 s, ideal travel is 0.040 m/s × 0.10 s = 0.004 m. The new position is 0.084 m, leaving 0.016 m error.',
      'The next command is 2 × 0.016 = 0.032 m/s. Each ideal step retains 1 − 2 × 0.10 = 0.8 of the previous error, connecting feedback to repeated multiplication.'
    ],
    check: {question: 'If the measured position is 0.110 m with the same target and gain, what velocity is requested?', options: ['+0.020 m/s', '+0.220 m/s', '−0.020 m/s'], answer: 2, explanation: 'The error is 0.100 − 0.110 = −0.010 m. Multiplying by 2/s requests −0.020 m/s, moving back toward the target under the model’s sign convention.'},
    action: 'Tabulate five ideal steps. Then name one physical effect that could make a real carriage disagree, and explain which assumption it breaks rather than simply calling the controller wrong.',
    chapter: '09', chapterLabel: 'Making motion answer to evidence'
  },
  {
    id: 'sensors', title: 'Give a sensor reading a reference', subject: 'Sensors and calibration', level: 'Early degree', minutes: 25,
    prerequisites: ['slope', 'uncertainty'],
    hook: 'A digital count becomes a length only through a relationship someone has checked.',
    why: 'Calibration connects instrument output to a defined quantity. Independent checks help distinguish a neat fitted equation from a measurement process you can trust.',
    story: [
      'A fictional position sensor reports 100 counts at a reference position of 0 mm and 600 counts at 50 mm. Assume a linear conversion over this interval. You want an equation that turns a raw count into an estimated position.',
      'The two reference points determine a line, but they do not establish every aspect of accuracy. Reference uncertainty, drift, repeatability, and nonlinearity remain. Checking another known position gives you evidence that was not used to construct the original line.'
    ],
    equation: 'estimated position = (count − 100) × 0.10 mm/count',
    steps: [
      'Find the change in position and output: 50 mm over 500 counts. The conversion slope is 50/500 = 0.10 mm/count.',
      'Account for the offset. A raw reading of 100 counts means 0 mm, so subtract 100 before multiplying by the slope.',
      'Convert a reading of 350 counts: (350 − 100) × 0.10 = 25.0 mm. Substituting 100 and 600 counts should recover both reference endpoints.',
      'At an independent 30.0 mm reference, imagine the sensor reports 405 counts. The line estimates 30.5 mm, a residual of +0.5 mm. Investigate that discrepancy rather than silently forcing the check point onto the line.'
    ],
    check: {question: 'What position does the fitted line assign to a reading of 250 counts?', options: ['25.0 mm', '15.0 mm', '50.0 mm'], answer: 1, explanation: 'Subtract the 100-count offset first: (250 − 100) × 0.10 = 15.0 mm. Multiplying 250 directly by the slope would ignore the zero reference.'},
    action: 'Plot the two calibration points and the independent check in a different symbol. Record one question about the reference and one about the sensor before deciding how to revise the model.',
    chapter: '05', chapterLabel: 'How a factory learns to trust a measurement'
  },
  {
    id: 'circuits', title: 'Follow an electrical load', subject: 'Circuits', level: 'Early degree', minutes: 25,
    prerequisites: ['units', 'algebra'],
    hook: 'A sensor system still needs current paths and an energy budget, even when the main interest is mechanical.',
    why: 'Basic circuit reasoning helps you communicate across mechanical and electrical boundaries. It gives voltage, current, resistance, and power distinct physical meanings.',
    story: [
      'Draw an ideal 5 V source connected across a 1,000 Ω resistor. Treat the source voltage and resistance as constant. This paper example uses a simple resistive load; motors, semiconductor devices, and changing signals can require different models.',
      'Voltage describes an electrical potential difference. Current is a flow of charge, and resistance relates the two in this model. Power measures the rate of energy transfer. A calculation of power is not, by itself, a component rating or a complete wiring design.'
    ],
    equation: 'V = IR; I = V/R; P = VI = V²/R',
    steps: [
      'Compute current: I = 5 V / 1,000 Ω = 0.005 A = 5 mA. The prefix milli means one thousandth.',
      'Compute power: P = 5 V × 0.005 A = 0.025 W = 25 mW. In the ideal resistor this electrical power becomes heat.',
      'Double resistance to 2,000 Ω with voltage unchanged. Current becomes 0.0025 A, and power becomes 0.0125 W.',
      'Check the energy meaning: the original 0.025 W load transfers 0.025 J/s × 60 s = 1.5 J in one minute. Current, power, and energy are related but are not the same quantity.'
    ],
    check: {question: 'At fixed voltage, what does doubling an ideal resistor’s resistance do to its current?', options: ['It halves the current.', 'It doubles the current.', 'It leaves current unchanged.'], answer: 0, explanation: 'I = V/R. With the numerator fixed, doubling the denominator halves current. The stated fixed-voltage condition is essential to the conclusion.'},
    action: 'Draw the circuit and annotate its four quantities with units. Add a short interface question a mechanical designer should ask an electrical teammate, such as where the heat goes or how a connector is serviced.',
    chapter: '11', chapterLabel: 'The factory has a pulse'
  },
  {
    id: 'cad', title: 'Dimension the relationship that matters', subject: 'CAD and tolerances', level: 'Core degree', minutes: 30,
    prerequisites: ['trigonometry', 'uncertainty'],
    hook: 'Two individually acceptable feature positions can still produce an unacceptable distance between them.',
    why: 'A CAD model defines nominal geometry; a drawing must communicate permissible variation and functional relationships. That choice affects both manufacturing and inspection.',
    story: [
      'On a fictional flat part, feature A is dimensioned 10.0 ± 0.1 mm from an origin, while feature B is 50.0 ± 0.1 mm from the same origin. The nominal separation is 40.0 mm. Suppose the mechanism needs that separation within 40.0 ± 0.1 mm.',
      'Treat these values as independent worst-case bounds on one-dimensional feature positions. This simplified stack does not describe complete geometric tolerancing. It does reveal a mismatch between what two dimensions individually permit and what the mechanism actually needs.'
    ],
    equation: 'separation = x_B − x_A; allowed by the two position limits: 39.8 mm to 40.2 mm',
    steps: [
      'Write the permitted positions: A may lie from 9.9 to 10.1 mm; B may lie from 49.9 to 50.1 mm.',
      'The smallest separation combines B at 49.9 mm with A at 10.1 mm: 49.9 − 10.1 = 39.8 mm.',
      'The largest separation combines B at 50.1 mm with A at 9.9 mm: 50.1 − 9.9 = 40.2 mm. Both extremes violate the functional interval of 39.9 to 40.1 mm.',
      'Consider controlling the functional separation directly, while separately locating the pair on the part. A clearer requirement does not automatically improve the process; the manufacturing method and inspection plan must be able to meet it.'
    ],
    check: {question: 'A finished part has A at 9.9 mm and B at 50.1 mm. Which statement is correct?', options: ['Its separation is exactly 40.0 mm.', 'Both position limits and the functional separation requirement are satisfied.', 'Both position limits pass, but the 40.2 mm separation fails the functional requirement.'], answer: 2, explanation: 'Subtracting gives 40.2 mm. The individual position limits permit this combination, showing why passing separate dimensions does not necessarily establish the needed relationship.'},
    action: 'Draw both dimensioning schemes and circle the relationship that matters to the mechanism. Add one sentence describing how an inspector would measure it.',
    chapter: '03', chapterLabel: 'From an intention to an accepted artifact'
  },
  {
    id: 'thermal', title: 'Account for the energy that changes temperature', subject: 'Thermodynamics', level: 'Core degree', minutes: 25,
    prerequisites: ['units', 'integral'],
    hook: 'A heater’s wattage tells you a rate. The temperature change depends on where that energy goes.',
    why: 'An energy balance connects input, storage, and loss. It helps you separate a source’s power from a component’s thermal response.',
    story: [
      'Use an illustrative block of mass 0.50 kg with constant specific heat capacity 900 J/(kg·K). It begins at 20°C. A heater transfers thermal power of 100 W into it for 60 s. First assume no heat escapes and the block remains uniform in temperature.',
      'This lumped model treats the block as a single thermal state and assumes no phase change. It does not resolve internal temperature gradients or predict material limits. Later, heat-transfer analysis can investigate whether the uniform-temperature and negligible-loss assumptions are reasonable.'
    ],
    equation: 'stored energy = mcΔT; with no losses, ΔT = Pt/(mc)',
    steps: [
      'Calculate the supplied energy: 100 J/s × 60 s = 6,000 J. A watt is a joule per second, not an amount of stored energy.',
      'Calculate the block’s heat capacity: mc = 0.50 kg × 900 J/(kg·K) = 450 J/K.',
      'Divide energy by heat capacity: ΔT = 6,000/450 ≈ 13.3 K. A temperature difference of 13.3 K is also a difference of 13.3°C, giving an ideal final temperature near 33.3°C.',
      'As a separate assumed case, let 20% of the input escape. Stored energy is then 4,800 J, giving ΔT ≈ 10.7 K and final temperature near 30.7°C. The loss fraction would need evidence in a real model.'
    ],
    check: {question: 'With no losses, what happens if 200 W is supplied for 30 s to the same block?', options: ['The temperature rise doubles.', 'The temperature rise remains about 13.3 K.', 'The temperature rise becomes zero.'], answer: 1, explanation: '200 W × 30 s is still 6,000 J. Under the same constant-heat-capacity, no-loss assumptions, equal stored energy gives the same temperature rise.'},
    action: 'Draw an energy-flow diagram with input, stored energy, and loss. Label which quantities were given and which were assumed before calculating.',
    chapter: '11', chapterLabel: 'The factory has a pulse'
  },
  {
    id: 'heat', title: 'Give heat a path out', subject: 'Heat transfer', level: 'Core degree', minutes: 25,
    prerequisites: ['thermal', 'algebra'],
    hook: 'Knowing how much heat exists does not tell you how readily it can cross an interface.',
    why: 'Heat-transfer models connect geometry, material properties, and temperature differences to a transfer rate. They help you identify the bottleneck between a heat source and its surroundings.',
    story: [
      'Imagine an ideal flat layer conducting heat steadily from a 30°C face to a 20°C face. Use thickness 0.005 m, area 0.010 m², and constant thermal conductivity 2 W/(m·K). These are chosen teaching inputs rather than a specified product.',
      'Assume one-dimensional conduction, uniform face temperatures, no contact resistance, and no internal heat generation in the layer. The cooler face must be held at its stated temperature by something outside this model. The calculated transfer rate therefore does not establish the performance of a complete cooling system.'
    ],
    equation: 'heat-transfer rate Q̇ = kAΔT/L; thermal resistance R_th = L/(kA)',
    steps: [
      'The temperature difference is 30 − 20 = 10 K. Using a difference avoids confusion between Celsius and absolute temperature scales.',
      'Calculate Q̇ = [2 W/(m·K) × 0.010 m² × 10 K] / 0.005 m = 40 W. Heat flows from the warmer face toward the cooler face.',
      'Calculate thermal resistance: 0.005 m / [2 W/(m·K) × 0.010 m²] = 0.25 K/W. Then ΔT/R_th = 10 K / 0.25 K/W = 40 W.',
      'Double thickness to 0.010 m while holding the other conditions fixed. Resistance doubles to 0.50 K/W, so the rate falls to 20 W.'
    ],
    check: {question: 'Instead double the area to 0.020 m², keeping the original thickness and temperatures. What rate does the model predict?', options: ['80 W', '20 W', '40 W'], answer: 0, explanation: 'The conduction rate is proportional to area when the other quantities remain fixed. Doubling area doubles the original 40 W rate to 80 W.'},
    action: 'Sketch a heat source, this layer, and the external sink. Mark two interfaces or environmental effects omitted from the calculation and explain where they would enter the thermal path.',
    chapter: '11', chapterLabel: 'The factory has a pulse'
  },
  {
    id: 'fluids', title: 'Follow the flow through a narrowing', subject: 'Fluid mechanics', level: 'Core degree', minutes: 25,
    prerequisites: ['units', 'algebra'],
    hook: 'The same volume each second must move faster when it passes through a smaller cross-section.',
    why: 'Conservation of mass is a powerful first constraint on fluid behavior. It helps connect pumps, cooling channels, air passages, and underwater systems without pretending they are identical.',
    story: [
      'For an illustrative incompressible flow, assume a maintained volume flow rate of 2.0 liters per minute through a passage with cross-sectional area 100 mm². The area then narrows to 50 mm². There are no leaks or branches, and the flow is steady.',
      'The model calculates average cross-section velocity from volume flow rate and area. It does not provide the pressure needed to maintain that flow. Real losses and the pump’s behavior may change the flow rate, so the fixed-flow assumption must remain visible.'
    ],
    equation: 'volume flow rate Q = average velocity × area; v = Q/A',
    steps: [
      'Convert the flow rate: 2.0 L/min = 0.0020 m³/min = 0.0020/60 m³/s ≈ 0.0000333 m³/s.',
      'Convert the first area: 100 mm² = 0.000100 m². Average velocity is 0.0000333/0.000100 ≈ 0.333 m/s.',
      'The narrowed area is 50 mm² = 0.000050 m². With the same flow rate, average velocity becomes about 0.667 m/s.',
      'Check the scaling: halving area doubles velocity in this model. Halving the diameter of a circular passage would quarter its area, a different geometric change.'
    ],
    check: {question: 'At the same maintained flow rate, what is the average velocity through an area of 200 mm²?', options: ['0.667 m/s', '0.333 m/s', 'About 0.167 m/s'], answer: 2, explanation: '200 mm² is twice the original area. At fixed volume flow rate, average velocity is halved from about 0.333 to 0.167 m/s.'},
    action: 'Draw a wide section and a narrow section. Label flow rate and velocity separately, then write the additional information needed to investigate pressure loss or pump selection.',
    chapter: '15', chapterLabel: 'The workshop beneath the water'
  },
  {
    id: 'orbits', title: 'Turn falling into a circular orbit', subject: 'Orbital mechanics', level: 'Core degree', minutes: 30,
    prerequisites: ['vectors', 'dynamics'],
    hook: 'An orbiting spacecraft is not beyond gravity. Its motion keeps changing direction as it falls.',
    why: 'A simple orbit model connects gravitational acceleration, speed, geometry, and time. It provides a foundation for asking where an orbital workshop operates and how long motion around its central body takes.',
    story: [
      'Use an illustrative two-body circular-orbit calculation with gravitational parameter μ = 3.986 × 10¹⁴ m³/s² and orbital radius r = 7.00 × 10⁶ m. Treat μ as the given model input. Radius is measured from the central body’s center, not from its surface.',
      'The model ignores atmosphere, other bodies, non-spherical gravity, and propulsion. Circular motion requires inward acceleration v²/r. Equating this to the model’s gravitational acceleration μ/r² gives the circular speed. This is an explanatory calculation, not a maneuver plan or a full mission design.'
    ],
    equation: 'v²/r = μ/r²  →  v = √(μ/r); orbital period T = 2πr/v',
    steps: [
      'Form μ/r: (3.986 × 10¹⁴ m³/s²)/(7.00 × 10⁶ m) ≈ 5.694 × 10⁷ m²/s².',
      'Take the square root: circular speed is about 7,546 m/s, or 7.55 km/s. The units reduce to distance per time.',
      'Divide circumference by speed: T ≈ 2π × 7.00 × 10⁶ m / 7,546 m/s ≈ 5,829 s, or 97.1 min.',
      'Examine a change without repeating every number. At twice the radius around the same central body, speed is multiplied by 1/√2 and period by 2√2. A larger circular orbit has a longer circumference and a lower speed.'
    ],
    check: {question: 'In this model, how does circular speed change if orbital radius becomes four times larger while μ stays fixed?', options: ['It becomes four times larger.', 'It becomes half as large.', 'It remains unchanged.'], answer: 1, explanation: 'Speed is proportional to 1/√r. A fourfold radius increase gives a factor of 1/√4 = 1/2 in circular speed.'},
    action: 'Draw the inward acceleration and tangential velocity at four points on a circle. Explain why a constant speed can coexist with a continuously changing velocity vector.',
    chapter: '16', chapterLabel: 'A shipyard with no floor'
  },
  {
    id: 'quality', title: 'Follow accepted output through two gates', subject: 'Manufacturing quality', level: 'Core degree', minutes: 25,
    prerequisites: ['ratios', 'uncertainty'],
    hook: 'Two impressive percentages can still leave a meaningful fraction of the starting parts outside the accepted output.',
    why: 'Quality reasoning follows populations through a process. It connects trial records, inspection gates, and the accepted hardware a factory can deliver.',
    story: [
      'Model a fictional two-stage process starting with 1,000 parts. Stage one accepts 98% of its incoming parts. Stage two accepts 95% of the parts that reach it after stage one. Exclude rework and assume these conditional yields apply to the modeled batch.',
      'The denominator changes between stages. The second percentage applies to the survivors of the first stage, not to all original starts. Multiplying these conditional fractions follows the chain; averaging the two percentages would answer neither the final output nor a useful combined acceptance question.'
    ],
    equation: 'expected accepted output = starts × first-stage yield × second-stage conditional yield = 1,000 × 0.98 × 0.95',
    steps: [
      'Stage one accepts 1,000 × 0.98 = 980 parts in this planning model, leaving 20 outside its accepted output.',
      'Stage two receives those 980 parts. Its expected accepted output is 980 × 0.95 = 931 parts; 49 of its incoming parts do not pass.',
      'Overall expected yield is 931/1,000 = 93.1%. The 20 and 49 non-passing parts total 69, consistent with 1,000 − 931.',
      'Keep process acceptance distinct from truth about every part. A flawed inspection can reject suitable parts or accept unsuitable ones; these yield numbers alone do not measure inspection error or field reliability.'
    ],
    check: {question: 'If the first conditional yield is 80% and the second is 90%, what combined yield does the same no-rework model predict?', options: ['72%', '85%', '170%'], answer: 0, explanation: '0.80 × 0.90 = 0.72. Ninety percent applies to the 80% that pass the first gate, so the combined fraction is 72%.'},
    action: 'Draw a flow diagram with counts above every arrow and a denominator beside each percentage. Add a separate box describing how you would check the inspection method itself.',
    chapter: '12', chapterLabel: 'Why another robot may change nothing'
  },
  {
    id: 'systems', title: 'Make one change visible to the whole project', subject: 'Systems engineering', level: 'Core degree', minutes: 30,
    prerequisites: ['writing', 'research', 'economics'],
    hook: 'A better component can still make the overall machine miss its requirement.',
    why: 'Systems engineering connects requirements, interfaces, resource budgets, decisions, and evidence. It makes the consequences of a local improvement visible beyond the team that proposed it.',
    story: [
      'A fictional demonstration module has a total mass limit of 5.0 kg. Its preliminary budget assigns 1.2 kg to the payload, 1.8 kg to structure, 0.5 kg to power hardware, and 0.5 kg to control hardware. Assume mounts and wiring are included within these four allocations.',
      'The subsystem estimates add to less than the limit, leaving reserve. Now a stronger support adds 0.4 kg and a longer-duration power package adds 0.3 kg. Each change may have a reasonable purpose. The project still needs to evaluate their combined effect and any changes to interfaces, heat, and test requirements.'
    ],
    equation: 'remaining mass reserve = total mass limit − sum of current subsystem mass estimates',
    steps: [
      'Add the baseline estimates: 1.2 + 1.8 + 0.5 + 0.5 = 4.0 kg. Against the 5.0 kg limit, reserve is 1.0 kg.',
      'State the denominator when expressing reserve: 1.0/5.0 = 20% of the total limit. The same reserve is 25% of the original 4.0 kg estimate.',
      'Include both proposed changes: new estimated mass = 4.0 + 0.4 + 0.3 = 4.7 kg. Remaining reserve is 0.3 kg, before any further growth.',
      'Record who owns each revised estimate and what evidence will verify it. Weighing the finished module can check mass compliance; demonstrating that it performs its intended inspection task addresses a different requirement.'
    ],
    check: {question: 'After reaching the 4.7 kg estimate, another change adds 0.4 kg. Where does the estimate stand against the 5.0 kg limit?', options: ['It has 0.4 kg reserve.', 'It exactly meets the limit.', 'It exceeds the limit by 0.1 kg.'], answer: 2, explanation: '4.7 + 0.4 = 5.1 kg. The added change is larger than the remaining 0.3 kg reserve, so the estimate exceeds the limit by 0.1 kg.'},
    action: 'Create a one-page change record with purpose, affected interfaces, budget impact, owner, and verification evidence. Name one question that requires the entire team’s agreement.',
    chapter: '03', chapterLabel: 'From an intention to an accepted artifact'
  }
];

export const curriculumRoutes = [
  {
    id: 'mechanism-builder', title: 'From a sketch to a mechanism',
    description: 'Follow geometry into coordinates, load paths, drawings, and motion. Return to a prerequisite whenever its physical meaning feels uncertain; this is a route through ideas, not a course timetable.',
    missionIds: ['units', 'algebra', 'trigonometry', 'vectors', 'statics', 'frames', 'uncertainty', 'cad', 'derivative', 'dynamics']
  },
  {
    id: 'energy-and-flow', title: 'Follow the energy and the flow',
    description: 'Connect electrical loads, accumulated energy, temperature change, thermal paths, and moving fluids. Keep a common notebook of inputs, outputs, units, and assumptions across the different models.',
    missionIds: ['units', 'algebra', 'slope', 'integral', 'circuits', 'thermal', 'heat', 'fluids']
  },
  {
    id: 'sensing-and-motion', title: 'Make motion answer to evidence',
    description: 'Build from repeatable calculations and calibrated observations toward evolving states, vibration, and feedback. Use hand calculations as anchors while your models become more capable.',
    missionIds: ['units', 'algebra', 'slope', 'coding', 'uncertainty', 'sensors', 'derivative', 'integral', 'exponential', 'odes', 'vectors', 'statics', 'dynamics', 'vibrations', 'feedback']
  },
  {
    id: 'materials-and-making', title: 'Make the part, then earn trust in it',
    description: 'Compare properties, estimate deformation, control functional geometry, and follow acceptance through production. Writing, research, and ethical judgment help make the evidence useful to other people.',
    missionIds: ['units', 'ratios', 'algebra', 'vectors', 'statics', 'research', 'materials', 'stress', 'uncertainty', 'trigonometry', 'cad', 'quality', 'writing', 'ethics', 'communication']
  },
  {
    id: 'aerospace-integration', title: 'Bring the pieces into an aerospace system',
    description: 'Connect mechanics and orbital motion to histories, choices, budgets, and shared requirements. Explore the interfaces between specialties before deciding which questions deserve your deepest study.',
    missionIds: ['units', 'ratios', 'algebra', 'trigonometry', 'vectors', 'statics', 'derivative', 'dynamics', 'frames', 'orbits', 'writing', 'research', 'history', 'economics', 'systems', 'communication']
  }
];
