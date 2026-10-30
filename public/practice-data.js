// Original educational practice. Numerical situations are illustrative, not hardware specifications.
export const PRACTICE_SUBJECTS = [
  { id: 'units', title: 'Units', symbol: '↔', description: 'Give every number a physical meaning.' },
  { id: 'algebra', title: 'Algebra', symbol: 'x', description: 'Find the unknown that the mechanism needs.' },
  { id: 'geometry', title: 'Geometry', symbol: '△', description: 'Connect shapes, locations, and tolerances.' },
  { id: 'motion', title: 'Motion', symbol: '→', description: 'Read rates, changes, and accumulated travel.' },
  { id: 'energy', title: 'Energy', symbol: 'ϟ', description: 'Keep work, power, and efficiency distinct.' },
  { id: 'engineeringjudgment', title: 'Engineering judgment', symbol: '◎', description: 'Make claims and decisions the evidence supports.' }
];

export const PRACTICE_MISSIONS = {
  units: 'Make a number mean something', ratios: 'Count what actually worked',
  algebra: 'Turn the relationship around', slope: 'Read the change hiding in a graph',
  trigonometry: 'Locate the end of the arm', vectors: 'Let direction count',
  derivative: 'Catch a changing speed', integral: 'Add up a motion',
  uncertainty: 'Ask whether it still fits', exponential: 'Follow a repeated multiplier',
  writing: 'Write something another person can test', research: 'Separate the claim from the evidence',
  history: 'Find the people inside the progress story', ethics: 'Ask who carries the consequence',
  economics: 'Find when the better tool pays back', communication: 'Help another person make the next decision'
};

export const PRACTICE_CARDS = [
  {
    id: 'units-01', subject: 'units', difficulty: 'Foundation',
    prompt: 'A drawing specifies a travel of 375 mm. What is the same travel in meters?',
    options: ['0.375 m', '3.75 m', '37.5 m', '375,000 m'], answer: 0,
    explanation: 'There are 1,000 millimeters in one meter. Divide the numerical value by 1,000: 375 mm × (1 m / 1,000 mm) = 0.375 m. The physical travel has not changed; only its unit has.',
    connection: 'A CAD model and a controller must describe the same physical distance even if their preferred units differ.', missionId: 'units'
  },
  {
    id: 'units-02', subject: 'units', difficulty: 'Bridge',
    prompt: 'A square test coupon is 20 mm on each side. What is its face area in square meters?',
    options: ['0.020 m²', '0.000400 m²', '0.0400 m²', '400 m²'], answer: 1,
    explanation: 'Convert each length first: 20 mm = 0.020 m. Then multiply: 0.020 m × 0.020 m = 0.000400 m². An area conversion uses the square of the length conversion factor; 1 m² contains 1,000,000 mm².',
    connection: 'The same distinction matters when converting a surface area for pressure loads or heat transfer.', missionId: 'units'
  },
  {
    id: 'units-03', subject: 'units', difficulty: 'Foundation',
    prompt: 'A shaft turns steadily at 90 revolutions per minute. How many revolutions does it complete in 5 seconds?',
    options: ['450 revolutions', '18 revolutions', '7.5 revolutions', '1.5 revolutions'], answer: 2,
    explanation: 'Convert the rate: 90 rev/min ÷ 60 s/min = 1.5 rev/s. Multiply by 5 s to get 7.5 revolutions. Multiplying 90 directly by 5 would mix minutes and seconds.',
    connection: 'Rotation counts connect motor speed to how far a screw, wheel, or geared mechanism can move.', missionId: 'units'
  },
  {
    id: 'units-04', subject: 'units', difficulty: 'Foundation',
    prompt: 'Which expression has the dimensions of force in SI base units?',
    options: ['kg·m', 'kg·m²/s²', 'm/s', 'kg·m/s²'], answer: 3,
    explanation: 'Newton’s second law is F = ma. Mass has units kg and acceleration has units m/s², so force has units kg·m/s², called a newton. The expression kg·m²/s² instead has the dimensions of energy.',
    connection: 'Dimensional checks can catch a mistaken formula before a calculation becomes a hardware decision.', missionId: 'units'
  },
  {
    id: 'units-05', subject: 'units', difficulty: 'Bridge',
    prompt: 'An illustrative device consumes a constant 250 W for 4 minutes. How much energy does it consume?',
    options: ['60,000 J', '1,000 J', '62.5 J', '600 J'], answer: 0,
    explanation: 'A watt is a joule per second. Four minutes is 240 seconds, so E = Pt = 250 J/s × 240 s = 60,000 J. The result is also 60 kJ. The time unit must match the seconds contained in watts.',
    connection: 'Power determines the rate at which a machine uses energy; duration determines how much energy a task requires.', missionId: 'integral'
  },
  {
    id: 'units-06', subject: 'units', difficulty: 'Foundation',
    prompt: 'A nominal 1.50 m rail receives a 25 mm extension. Ignoring tolerances, what is the new total length?',
    options: ['1.750 m', '1.525 m', '26.5 m', '1.5025 m'], answer: 1,
    explanation: 'First express the extension in meters: 25 mm = 0.025 m. Then add quantities with the same unit: 1.50 m + 0.025 m = 1.525 m. This is nominal arithmetic; no measurement uncertainty was supplied.',
    connection: 'An assembly stack-up begins by putting every dimension into compatible units.', missionId: 'units'
  },
  {
    id: 'algebra-01', subject: 'algebra', difficulty: 'Foundation',
    prompt: 'For a constant positive speed, v = d/t. Which expression correctly gives the travel time t?',
    options: ['t = v/d', 't = dv', 't = d/v', 't = d − v'], answer: 2,
    explanation: 'Multiply both sides by t to obtain vt = d, then divide by v: t = d/v. The units confirm the rearrangement: meters divided by meters per second gives seconds.',
    connection: 'Rearranging a familiar relationship lets a planner estimate duration from a required travel and an available speed.', missionId: 'algebra'
  },
  {
    id: 'algebra-02', subject: 'algebra', difficulty: 'Foundation',
    prompt: 'A 40 N force acts perpendicular to a lever at a radius of 0.25 m. Using torque τ = Fr, what is the torque magnitude?',
    options: ['160 N·m', '40 N·m', '1 N·m', '10 N·m'], answer: 3,
    explanation: 'For the stated perpendicular force, τ = 40 N × 0.25 m = 10 N·m. Dividing by the radius would solve a different equation. A force at another angle would require the perpendicular component.',
    connection: 'Torque connects a force requirement to a rotating joint; the lever geometry is part of the requirement.', missionId: 'algebra'
  },
  {
    id: 'algebra-03', subject: 'algebra', difficulty: 'Foundation',
    prompt: 'An illustrative calibration relation is y = 3x + 2. If the reading y is 17, what value of x does the model imply?',
    options: ['5', '19/3', '45', '15'], answer: 0,
    explanation: 'Subtract the offset first: 17 − 2 = 3x. Then divide by the scale factor: x = 15/3 = 5. Checking the result gives 3 × 5 + 2 = 17.',
    connection: 'A sensor conversion often combines an offset and a scale factor. Solving the relation is different from assuming the raw number is already the physical quantity.', missionId: 'algebra'
  },
  {
    id: 'algebra-04', subject: 'algebra', difficulty: 'Bridge',
    prompt: 'Use the small-expansion model ΔL = αLΔT. With α = 0.000020 K⁻¹, L = 2 m, and ΔT = 50 K, what is ΔL?',
    options: ['0.020 m', '0.0020 m', '0.00020 m', '2.0 m'], answer: 1,
    explanation: 'Multiply the three inputs: 0.000020 × 2 × 50 = 0.0020 m, or 2 mm. The K⁻¹ and K cancel. This calculation assumes a constant expansion coefficient over the stated temperature interval.',
    connection: 'A small material response can become a significant positioning error when a structure is long or the temperature changes.', missionId: 'algebra'
  },
  {
    id: 'algebra-05', subject: 'algebra', difficulty: 'Bridge',
    prompt: 'A planning model assumes a 90% first-pass yield. How many attempts give an expected 72 first-pass accepted parts?',
    options: ['64.8 attempts', '72 attempts', '80 attempts', '90 attempts'], answer: 2,
    explanation: 'Let n be the attempts. The model says 0.90n = 72, so n = 72/0.90 = 80. Multiplying 72 by 0.90 would treat the desired accepted count as an input count. Expected yield does not guarantee the outcome of an individual batch.',
    connection: 'Working backward from useful output prevents a production plan from treating every attempt as an accepted part.', missionId: 'ratios'
  },
  {
    id: 'algebra-06', subject: 'algebra', difficulty: 'Bridge',
    prompt: 'A fictional tool option costs 60 credits to set up plus 4 credits per part. An alternative costs 7 credits per part with no setup. At what quantity are the total costs equal?',
    options: ['10 parts', '15 parts', '24 parts', '20 parts'], answer: 3,
    explanation: 'Set the two totals equal: 60 + 4n = 7n. Subtract 4n, giving 60 = 3n, so n = 20. Both totals are 140 credits at that quantity. Time, quality, risk, and differing outputs are omitted from this teaching comparison.',
    connection: 'A break-even calculation makes the assumed recurring demand visible; it does not establish a complete business case.', missionId: 'economics'
  },
  {
    id: 'geometry-01', subject: 'geometry', difficulty: 'Foundation',
    prompt: 'A right triangle has perpendicular legs of 0.30 m and 0.40 m. What is its diagonal length?',
    options: ['0.50 m', '0.70 m', '0.10 m', '0.25 m'], answer: 0,
    explanation: 'The Pythagorean relation gives L = √(0.30² + 0.40²) = √0.25 = 0.50 m. Adding the legs would give the length of a two-segment path, not the straight diagonal.',
    connection: 'Distances between mounting points and the reach of a simple brace can begin with this geometric relationship.', missionId: 'trigonometry'
  },
  {
    id: 'geometry-02', subject: 'geometry', difficulty: 'Foundation',
    prompt: 'An ideal 2.0 m arm lies at 60° above the positive horizontal axis. What is its horizontal reach x = L cos θ?',
    options: ['About 1.73 m', '1.0 m', '2.0 m', '0.50 m'], answer: 1,
    explanation: 'cos 60° = 0.5, so x = 2.0 m × 0.5 = 1.0 m. The approximately 1.73 m value is the vertical component, L sin 60°. The angle is specified in degrees.',
    connection: 'A robot’s link length and angle jointly determine its reach; a long arm does not always have a long horizontal projection.', missionId: 'trigonometry'
  },
  {
    id: 'geometry-03', subject: 'geometry', difficulty: 'Foundation',
    prompt: 'The radius of a circular face doubles. What happens to its area, A = πr²?',
    options: ['It doubles', 'It becomes eight times as large', 'It becomes four times as large', 'It stays the same'], answer: 2,
    explanation: 'The new area is π(2r)² = 4πr². Area scales with the square of a length scale. This is one reason a larger opening can change pressure load faster than intuition based only on diameter suggests.',
    connection: 'Scaling geometry helps you anticipate how area-dependent loads and heat transfer change with size.', missionId: 'ratios'
  },
  {
    id: 'geometry-04', subject: 'geometry', difficulty: 'Bridge',
    prompt: 'A point is at (x, y) = (2, 1) cm. Rotate it 90° counterclockwise about the origin in the usual x-right, y-up plane. Where does it go?',
    options: ['(1, −2) cm', '(2, −1) cm', '(−2, −1) cm', '(−1, 2) cm'], answer: 3,
    explanation: 'A 90° counterclockwise rotation maps (x, y) to (−y, x). Applying that rule gives (−1, 2) cm. The original positive-x component now points up, and the original positive-y component now points left.',
    connection: 'Coordinate transformations let a robot relate a part’s frame to a workbench or camera frame.', missionId: 'vectors'
  },
  {
    id: 'geometry-05', subject: 'geometry', difficulty: 'Foundation',
    prompt: 'A drawing gives a shaft diameter of 10.00 ± 0.02 mm. Considering only this stated size tolerance, what is the largest permitted diameter?',
    options: ['10.02 mm', '10.20 mm', '9.98 mm', '10.04 mm'], answer: 0,
    explanation: 'The upper limit is nominal plus tolerance: 10.00 + 0.02 = 10.02 mm. The lower limit is 9.98 mm. The total permitted interval is 0.04 mm wide, but that width is not added to the nominal diameter.',
    connection: 'Interpreting limits correctly is an early step toward deciding whether a measured component can fit its intended interface.', missionId: 'uncertainty'
  },
  {
    id: 'geometry-06', subject: 'geometry', difficulty: 'Bridge',
    prompt: 'An ideal cylinder has radius 0.10 m and height 0.50 m. Using V = πr²h, what is its approximate volume?',
    options: ['0.157 m³', '0.0157 m³', '0.00157 m³', '0.0500 m³'], answer: 1,
    explanation: 'Square the radius before multiplying: V = π × 0.10² × 0.50 = 0.005π m³ ≈ 0.0157 m³. The result is a volume, so the unit contains three powers of length.',
    connection: 'Volume estimates help connect a proposed geometry to material inventory or internal capacity; actual walls and clearances require additional accounting.', missionId: 'units'
  },
  {
    id: 'motion-01', subject: 'motion', difficulty: 'Foundation',
    prompt: 'A carriage is at x = 2 m when t = 1 s and at x = 14 m when t = 4 s. What is its average velocity over that interval?',
    options: ['3 m/s', '12 m/s', '4 m/s', '16 m/s'], answer: 2,
    explanation: 'Average velocity is change in position divided by elapsed time: (14 − 2) m / (4 − 1) s = 12/3 = 4 m/s. Both differences matter; the elapsed time is 3 seconds, not the final clock reading of 4 seconds.',
    connection: 'A slope calculation turns two position measurements into a statement about motion between them.', missionId: 'slope'
  },
  {
    id: 'motion-02', subject: 'motion', difficulty: 'Foundation',
    prompt: 'An ideal cart starts from rest and has constant acceleration 3 m/s² for 4 seconds. What is its final velocity?',
    options: ['48 m/s', '24 m/s', '7 m/s', '12 m/s'], answer: 3,
    explanation: 'Use v = v₀ + at. Starting from rest means v₀ = 0, so v = 3 m/s² × 4 s = 12 m/s. This calculates velocity; the distance would require a separate accumulation.',
    connection: 'Acceleration is the rate of changing velocity. Knowing one does not make it interchangeable with the other.', missionId: 'derivative'
  },
  {
    id: 'motion-03', subject: 'motion', difficulty: 'Foundation',
    prompt: 'A carriage moves in one direction at a constant 2 m/s for 5 seconds. How far does it travel?',
    options: ['10 m', '2.5 m', '7 m', '25 m'], answer: 0,
    explanation: 'For constant speed, distance is speed × time: 2 m/s × 5 s = 10 m. On a velocity–time graph, this is the area of a rectangle with height 2 m/s and width 5 s.',
    connection: 'The simple speed-times-time formula is the constant-rate version of accumulating motion from a graph.', missionId: 'integral'
  },
  {
    id: 'motion-04', subject: 'motion', difficulty: 'Bridge',
    prompt: 'Velocity rises linearly from 0 to 8 m/s over 4 seconds and remains nonnegative. What distance is represented by the area under that velocity–time line?',
    options: ['32 m', '16 m', '2 m', '12 m'], answer: 1,
    explanation: 'The shaded region would be a triangle. Its area is ½ × 4 s × 8 m/s = 16 m. Using 8 × 4 would pretend the object had the final velocity for the entire interval.',
    connection: 'An area under a rate graph captures accumulated change; its shape tells you whether a rectangle, triangle, or more general integral is needed.', missionId: 'integral'
  },
  {
    id: 'motion-05', subject: 'motion', difficulty: 'Bridge',
    prompt: 'A cart starts at 2 m/s and accelerates constantly at 1 m/s² for 3 seconds. What is its displacement during that interval?',
    options: ['9 m', '15 m', '10.5 m', '4.5 m'], answer: 2,
    explanation: 'Use s = v₀t + ½at² = 2 × 3 + ½ × 1 × 3² = 6 + 4.5 = 10.5 m. The first term accounts for the starting velocity; omitting it would describe a different cart that started from rest.',
    connection: 'The rectangle-plus-triangle view of a velocity graph helps you see why two contributions belong in this expression.', missionId: 'integral'
  },
  {
    id: 'motion-06', subject: 'motion', difficulty: 'Bridge',
    prompt: 'On a position-versus-time graph, the tangent at a later instant has a larger positive slope. What does that say about the instantaneous velocity?',
    options: ['The position must have returned to zero', 'The acceleration must be zero everywhere', 'The object must be moving backward', 'The instantaneous velocity is more positive'], answer: 3,
    explanation: 'Instantaneous velocity is the slope of position versus time. A larger positive tangent slope therefore means a larger positive velocity at that instant. The two slopes alone do not specify the full acceleration history.',
    connection: 'Reading a derivative as a physical rate is more useful than treating it only as a symbolic operation.', missionId: 'derivative'
  },
  {
    id: 'energy-01', subject: 'energy', difficulty: 'Foundation',
    prompt: 'Using g = 9.81 m/s², what useful gravitational energy is gained by raising a 10 kg mass through 2 m?',
    options: ['196.2 J', '19.62 J', '98.1 J', '20 J'], answer: 0,
    explanation: 'The useful gain is E = mgh = 10 kg × 9.81 m/s² × 2 m = 196.2 J. This is the change in gravitational potential energy; a real lifting system may require more input energy because of losses.',
    connection: 'A lift links force, distance, and energy. Its duration determines power separately.', missionId: 'algebra'
  },
  {
    id: 'energy-02', subject: 'energy', difficulty: 'Foundation',
    prompt: 'A process transfers 6,000 J of useful energy in 20 seconds. What is its mean useful power?',
    options: ['120,000 W', '300 W', '120 W', '30 W'], answer: 1,
    explanation: 'Mean power is energy divided by elapsed time: 6,000 J / 20 s = 300 W. It is a mean over the interval; the instantaneous power could vary and have a higher peak.',
    connection: 'Average task power is useful for an energy budget, but peak power can matter when selecting hardware.', missionId: 'units'
  },
  {
    id: 'energy-03', subject: 'energy', difficulty: 'Foundation',
    prompt: 'An illustrative conversion has efficiency η = useful output energy / input energy = 0.80. How much input energy is needed for 400 J of useful output?',
    options: ['320 J', '400 J', '500 J', '480 J'], answer: 2,
    explanation: 'Rearrange the efficiency relation: input energy = 400 J / 0.80 = 500 J. The remaining 100 J does not become the stated useful output. Multiplying 400 by 0.80 would treat 400 J as the input instead.',
    connection: 'Efficiency makes the boundary of a useful output explicit; it does not remove the need to account for other energy destinations.', missionId: 'ratios'
  },
  {
    id: 'energy-04', subject: 'energy', difficulty: 'Bridge',
    prompt: 'For a fixed mass, kinetic energy is E = ½mv². If speed doubles, by what factor does the kinetic energy change?',
    options: ['2', '8', '1; it is unchanged', '4'], answer: 3,
    explanation: 'Substitute 2v for v: E new = ½m(2v)² = 4 × ½mv². The square makes the energy increase faster than the speed. This assumes the classical kinetic-energy model.',
    connection: 'Increasing a machine’s motion speed can change the energy involved in stopping or contact substantially.', missionId: 'ratios'
  },
  {
    id: 'energy-05', subject: 'energy', difficulty: 'Foundation',
    prompt: 'In a steady DC example, a device has 12 V across it and draws 5 A. Using P = VI, what is its electrical input power?',
    options: ['60 W', '2.4 W', '17 W', 'About 0.417 W'], answer: 0,
    explanation: 'Multiply voltage by current: 12 V × 5 A = 60 W. That is the electrical input power for the stated condition. It is not automatically the mechanical output of a motor or the energy used over an unspecified duration.',
    connection: 'A power budget must distinguish the electrical supply from the useful output and the heat produced along the way.', missionId: 'units'
  },
  {
    id: 'energy-06', subject: 'energy', difficulty: 'Bridge',
    prompt: 'The same mass is lifted through the same height, but the lift takes half as long. Ignoring start/stop effects and keeping efficiency fixed, what happens?',
    options: ['Useful work doubles; mean power is unchanged', 'Useful work is unchanged; mean power doubles', 'Useful work and mean power both halve', 'Useful work and mean power are both unchanged'], answer: 1,
    explanation: 'The useful work is still mgh because mass and height are unchanged. Mean useful power is E/t, so halving t doubles power. At fixed efficiency, the mean input power doubles as well.',
    connection: 'A short, demanding motion can require high power without using more total useful energy than a slower version of the same lift.', missionId: 'algebra'
  },
  {
    id: 'judgment-01', subject: 'engineeringjudgment', difficulty: 'Foundation',
    prompt: 'A robot completes all 20 trials in a specified tabletop test. Which claim is best supported by that result alone?',
    options: ['It is proven 100% reliable for all future work', 'It can manipulate every object of similar size', 'It completed the 20 tested trials under the stated conditions', 'It is ready for unattended operation in every environment'], answer: 2,
    explanation: 'The observed result supports a bounded claim about the trials and their conditions. It does not establish an arbitrary object range, future reliability of exactly 100%, or readiness in untested environments. Broader claims need broader evidence.',
    connection: 'Reading a demonstration accurately helps you respect genuine progress without silently adding capabilities that were not tested.', missionId: 'research'
  },
  {
    id: 'judgment-02', subject: 'engineeringjudgment', difficulty: 'Bridge',
    prompt: 'A gauge gives tightly clustered repeat readings, but you suspect all readings share an offset. What best tests that concern?',
    options: ['Average many more readings of the same unknown part', 'Display more decimal places', 'Discard whichever reading looks least convenient', 'Compare the gauge with an appropriate calibrated reference'], answer: 3,
    explanation: 'Repeated agreement shows repeatability, but a common offset can survive averaging. An appropriate reference with understood uncertainty can reveal that bias. More displayed digits do not establish accuracy.',
    connection: 'The instrument that checks a part also needs evidence. Measurement quality is a chain, not an appearance of precision.', missionId: 'uncertainty'
  },
  {
    id: 'judgment-03', subject: 'engineeringjudgment', difficulty: 'Bridge',
    prompt: 'A mechanism’s current rises and its motion becomes irregular. Several causes are plausible. What is the strongest next engineering response?',
    options: ['Secure the load, stop normal work, and compare trustworthy observations under bounded conditions', 'Force repeated motion until the symptom disappears', 'Declare that a hidden bearing is definitely damaged from current alone', 'Ignore the change because the mechanism moved yesterday'], answer: 0,
    explanation: 'A symptom can have several causes: load, temperature, alignment, contamination, sensing, or electrical behavior. First preserve a recoverable state. Then use a bounded diagnostic plan to distinguish explanations; a current increase alone does not identify a microscopic failure.',
    connection: 'Repair capability begins with diagnosis and recoverability, not merely with a spare part on a shelf.', missionId: 'communication'
  },
  {
    id: 'judgment-04', subject: 'engineeringjudgment', difficulty: 'Bridge',
    prompt: 'In a simple repeating model, equipment runs for 90 hours and then needs 10 hours to restore. Restoration improves to 5 hours while operating time between failures stays 90 hours. Which conclusion follows?',
    options: ['The equipment now fails half as often', 'Availability rises from 90% to about 94.7%, without showing less frequent failures', 'Availability becomes exactly 100%', 'The equipment no longer needs replacement parts'], answer: 1,
    explanation: 'Original availability is 90/(90 + 10) = 90%. With faster restoration it is 90/(90 + 5) ≈ 94.7%. The stated operating time between failures did not change. This simplified alternating-operation model does not describe every equipment population.',
    connection: 'Maintenance access, tools, and verification can improve productive availability even when the underlying failure behavior is unchanged.', missionId: 'ratios'
  },
  {
    id: 'judgment-05', subject: 'engineeringjudgment', difficulty: 'Bridge',
    prompt: 'A remote facility makes 95% of its expansion mass locally but cannot replace an imported control sensor essential to its only production process. What is the most useful interpretation?',
    options: ['It has proved complete industrial independence', 'The remaining 5% cannot matter because it is light', 'It has reduced imported mass while retaining a critical functional dependency', 'Local material production removes its need for energy'], answer: 2,
    explanation: 'A high local mass fraction is a real achievement, but it does not measure every dependency. A small, essential component can stop a large process if it is unavailable and has no qualified substitute. Mass share and functional criticality answer different questions.',
    connection: 'Industrial closure needs a dependency map that includes precision components, consumables, metrology, and specialist support.', missionId: 'research'
  },
  {
    id: 'judgment-06', subject: 'engineeringjudgment', difficulty: 'Foundation',
    prompt: 'Which revision makes “the carriage should move quickly and accurately” most testable?',
    options: ['The carriage should be excellent at motion', 'The carriage should use an advanced controller', 'The carriage should look smooth in a demonstration video', 'Move between defined positions in at most 3 s and finish within ±0.5 mm under a stated load, environment, and measurement procedure'], answer: 3,
    explanation: 'The final option identifies a task, numerical acceptance limits, and the conditions needed to interpret the result. A controller choice describes an implementation, not proof that the required motion was achieved. The illustrative limits would need justification for a real application.',
    connection: 'Clear requirements connect intention to a test that another person can perform and review.', missionId: 'writing'
  }
];
