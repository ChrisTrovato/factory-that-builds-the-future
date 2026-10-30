/**
 * Curated learning doors for the website's second edition.
 * Each source URL was opened and checked against its primary publisher.
 * `learn` is an original suggested way to use the resource, not a quotation.
 * `level` is an editorial guide, not an institutional prerequisite or credit claim.
 * All fields are strings; `source` is the external HTTPS URL.
 */
export const fieldNotes = [
  {
    id: 'numbers-into-hardware',
    title: 'Make the numbers mean something.',
    type: 'Math foundation',
    description: 'OpenStax Prealgebra 2e connects arithmetic, fractions, ratios, equations, geometry, and graphs. Its free web edition gives you worked examples and practice before the mathematics becomes more abstract.',
    learn: 'Take one rate or ratio from the book and attach units to it. Explain what doubling an input changes, then check the result by estimating before calculating.',
    source: 'https://openstax.org/books/prealgebra-2e/pages/preface',
    label: 'OpenStax · Prealgebra 2e',
    level: 'Start with arithmetic'
  },
  {
    id: 'read-a-mechanism',
    title: 'Learn to read a mechanism.',
    type: 'Open course',
    description: 'MIT’s How and Why Machines Work archive approaches engineering through observation, sketches, mechanical ideas, and a design project. These are materials from the Spring 2002 undergraduate course.',
    learn: 'Choose a harmless hinge or clamp. Sketch its moving and fixed parts, mark the permitted motion, and trace the load from your hand to the object it holds.',
    source: 'https://ocw.mit.edu/courses/2-000-how-and-why-machines-work-spring-2002/',
    label: 'MIT OpenCourseWare · 2.000',
    level: 'Curiosity + basic geometry'
  },
  {
    id: 'forces-behind-flight',
    title: 'See the forces behind flight.',
    type: 'Aerospace primer',
    description: 'NASA Glenn’s Guide to Aerodynamics links aircraft parts to force, motion, lift, drag, and balance. Start with the four forces, then follow the question that makes the airplane feel less mysterious.',
    learn: 'Draw an aircraft in steady level flight. Label the forces, describe what balanced means, and separate the direction of a force from the direction of motion.',
    source: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/learn-about-aerodynamics/',
    label: 'NASA Glenn · Aerodynamics guide',
    level: 'Conceptual entry point'
  },
  {
    id: 'geometry-of-motion',
    title: 'Give motion a mathematical language.',
    type: 'Math foundation',
    description: 'OpenStax Algebra and Trigonometry 2e develops equations, functions, and trigonometry with worked examples. Use its prerequisite review to locate gaps before moving into the unit circle and periodic motion.',
    learn: 'Draw a rotating link and predict how its horizontal reach changes with angle. Use a sketch first; later connect the same question to sine, cosine, and a graph.',
    source: 'https://openstax.org/books/algebra-and-trigonometry-2e/pages/preface',
    label: 'OpenStax · Algebra and Trigonometry 2e',
    level: 'After basic algebra'
  },
  {
    id: 'rover-ratios',
    title: 'Turn wheel rotations into a route.',
    type: 'Project prompt',
    description: 'This NASA/JPL education challenge uses ratios and a programmable rover to navigate a course around obstacles. The lesson also describes a virtual-programming option when a physical robot is unavailable.',
    learn: 'Predict a travel distance from wheel motion, then compare prediction with observation. Record the error and ask which assumption changed: geometry, slipping, steering, or measurement.',
    source: 'https://www.jpl.nasa.gov/edu/resources/lesson-plan/robotics-making-a-self-driving-rover/',
    label: 'NASA/JPL Education · Rover challenge',
    level: 'Ratios + introductory coding'
  },
  {
    id: 'design-under-constraints',
    title: 'Build a machine around a constraint.',
    type: 'Open course',
    description: 'MIT’s Spring 2009 Design and Manufacturing I archive includes design lectures, project examples, and robot-competition videos. The useful thread is how a specific task shapes a mechanical solution.',
    learn: 'Choose one student mechanism and reconstruct the tradeoff behind it. Identify the task, the force or motion it needs, and one test that could distinguish a clever idea from a dependable result.',
    source: 'https://ocw.mit.edu/courses/2-007-design-and-manufacturing-i-spring-2009/',
    label: 'MIT OpenCourseWare · 2.007',
    level: 'Undergraduate design preview'
  },
  {
    id: 'rover-as-a-system',
    title: 'Explore a rover one subsystem at a time.',
    type: 'Open hardware',
    description: 'The NASA/JPL Open Source Rover repository exposes a terrestrial six-wheel learning platform: mechanical assemblies, wiring, electronics, and software. A complete build is a substantial project; its documentation is useful before buying parts.',
    learn: 'Begin with the rocker-bogie mechanism. Sketch how its joints connect, then inspect how cables and motors turn that mechanism into a serviceable system. Make a dependency map before proposing a build.',
    source: 'https://github.com/nasa-jpl/open-source-rover',
    label: 'NASA/JPL · Open Source Rover',
    level: 'Later project / team scale'
  },
  {
    id: 'robots-build-structures',
    title: 'See what robots can build together.',
    type: 'Research window',
    description: 'NASA’s ARMADAS research joins specialized robots with repeatable structural building blocks. Its ground demonstrations offer a concrete bridge from a small assembly task to ambitions for large space infrastructure.',
    learn: 'Separate the demonstrated assembly from the future mission concept. Ask what the regular geometry makes easier, what still arrives from outside, and how the structure could be inspected or repaired.',
    source: 'https://www.nasa.gov/general/robot-team-builds-high-performance-digital-structure-for-nasa/',
    label: 'NASA Ames · ARMADAS research',
    level: 'Explore now, analyze deeper later'
  }
];
