// Catalog facts checked 2026-10-31. Learning previews and worked examples are original,
// illustrative teaching material, not UC San Diego assignments or promised syllabi.
// prerequisites uses OR between rows and AND within a row. Standing, grades, consent,
// corequisites and restricted enrollment remain in prerequisiteText/enrollmentNotes.
import { academic } from './academic-data.mjs';

const checked = '2026-10-31';
const source = (id, title, url, use, year = '2026–27') => ({id,title,url,institution:'UC San Diego',checked,status:'verified-primary',use,year});
export const ucsdSources = [
  source('journey-degree','Aerospace degree and formal specializations','https://catalog.ucsd.edu/curric/MAE-ug.html','Core, five technical electives, 24-quarter-unit arts/humanities/social-science minimum and formal specialization patterns.'),
  source('journey-mae','MAE course catalog','https://catalog.ucsd.edu/courses/MAE.html','Current titles, units, prerequisites, enrollment restrictions and catalog subjects; original learning examples are separate.'),
  source('journey-se','Structural Engineering course catalog','https://catalog.ucsd.edu/courses/SE.html','SE 160A title, units and alternative prerequisite branches.'),
  source('journey-ceng','Chemical and Nano Engineering course catalog','https://catalog.ucsd.edu/courses/NANO.html','Official destination for external CENG prerequisite alternatives; CENG courses are published on the NANO catalog page.'),
  source('journey-beng','Bioengineering course catalog','https://catalog.ucsd.edu/courses/BENG.html','Official destination for external BENG prerequisite alternatives.'),
  source('journey-ece','Electrical and Computer Engineering course catalog','https://catalog.ucsd.edu/courses/ECE.html','Official destination for external ECE prerequisite alternatives.'),
  source('journey-cse','Computer Science and Engineering course catalog','https://catalog.ucsd.edu/courses/CSE.html','Official destination for external CSE prerequisite alternatives.'),
  source('journey-econ','Economics course catalog','https://catalog.ucsd.edu/courses/ECON.html','Official destination for external ECON prerequisite alternatives.'),
  source('journey-math','Mathematics course catalog','https://catalog.ucsd.edu/courses/MATH.html','Lower-division mathematics and optional probability/numerical-analysis depth.'),
  source('journey-physics','Physics course catalog','https://catalog.ucsd.edu/courses/PHYS.html','PHYS 2A, 2B, 2C and the separate 2CL laboratory.'),
  source('journey-chemistry','Chemistry course catalog','https://catalog.ucsd.edu/courses/CHEM.html','CHEM 6A course and placement routes.'),
  source('journey-specializations','MAE aerospace specialization guidance','https://mae.ucsd.edu/undergrad/aero-eng-specializations','Department lists, fifth-elective policy, declaration timing and catalog discrepancy for MAE 184 in astrodynamics.'),
  source('journey-seventh','Seventh transfer degree requirements','https://seventh.ucsd.edu/academics/degree-requirements/degree-requirements-transfers.html','IGETC/partial IGETC, SYN 100 transfer preauthorization, high-impact overlap and approved MAE 155A/148.'),
  source('journey-seventh-catalog','Seventh College catalog','https://catalog.ucsd.edu/undergraduate/colleges/seventh-college/index.html','All transfers need SYN 100 and high-impact; remaining requirements depend on transfer credit.'),
  source('journey-revelle','Revelle College catalog','https://catalog.ucsd.edu/undergraduate/colleges/revelle-college/index.html','Separate IGETC and Cal-GETC rules, HUM 100, fall 2026 transfer science/math/language conditions.'),
  source('journey-revelle-transfer','Revelle transfer GE guidance','https://revelle.ucsd.edu/academics/general-education/gen-ed-tran-students.html','Explicit Cal-GETC, LOTE and IGETC conditions; HUM 100 recommended in the first UCSD year.'),
  source('journey-revelle-math','Revelle approved mathematics courses','https://revelle.ucsd.edu/academics/general-education/mathematics.html','MATH 20A calculus plus MATH 20B/20C are approved; accepted semester pathways are detailed on the transfer page.'),
  source('journey-revelle-science','Revelle approved natural sciences','https://revelle.ucsd.edu/academics/general-education/nat-science.html','Fall-2026 transfer three-course pattern and explicit CHEM 6A / PHYS 2A / PHYS 2B approval.'),
  source('journey-syn','Synthesis course catalog','https://catalog.ucsd.edu/courses/SYN.html','SYN 100 and 150, letter grading, restriction and duplicate-credit conditions.'),
  source('journey-hum','Humanities course catalog','https://catalog.ucsd.edu/courses/HUM.html','HUM 100 title, units, Revelle restriction and letter grading.'),
  source('journey-languages','Linguistics language course catalog','https://catalog.ucsd.edu/courses/LING.html','Spanish conversation/analysis pairs, 2.5 units each, corequisites and placement.'),
  source('journey-dei','Diversity, Equity and Inclusion requirement','https://undergrad.ucsd.edu/academics/dei/index.html','One approved four-unit course; ANTH 21 and MGT 18 appear on the current offered-course list.'),
  source('journey-dei-transfer','Academic advising petition policy','https://advising.ucsd.edu/students/policies/petitions.html','Transfer work can meet DEI through accepted equivalency to an approved UCSD course; generic category similarity is insufficient.'),
  source('journey-anth','Anthropology course catalog','https://catalog.ucsd.edu/courses/ANTH.html','ANTH 21 course facts.'),
  source('journey-mgt','Rady course catalog','https://catalog.ucsd.edu/courses/MGT.html','MGT 18 course facts and duplicate-credit restriction.'),
  source('journey-climate','Jane Teranes Climate Change Education Requirement','https://undergrad.ucsd.edu/academics/jtccer.html','Dedicated policy currently exempts incoming transfer students.'),
  {...academic.sources.find(s=>s.id==='assist-aero'),institution:'ASSIST / Southwestern College / UC San Diego',checked,status:'verified-primary',use:'Existing verified 2026–27 agreement retained from the base research; mappings are conditional on accepted credit.',year:'2026–27'}
];
const sourceById = Object.fromEntries(ucsdSources.map(s=>[s.id,s]));
const catalogFor = code => code.startsWith('MATH')?'journey-math':code.startsWith('PHYS')?'journey-physics':code.startsWith('CHEM')?'journey-chemistry':code.startsWith('SE ')?'journey-se':code.startsWith('SYN')?'journey-syn':code.startsWith('HUM')?'journey-hum':code.startsWith('LISP')?'journey-languages':code.startsWith('ANTH')?'journey-anth':code.startsWith('MGT')?'journey-mgt':'journey-mae';
const ordinary = (...groups) => groups.reduce((rows, group)=>rows.flatMap(row=>(Array.isArray(group)?group:[group]).map(code=>[...row,code])),[[]]);
const L = (about, ideas, task, solution, buildsOn=[], opens=[], use='', projectIds=[], frontierIds=[]) => ({about,ideas,task:`Original learning example — ${task}`,solution,buildsOn,opens,use,projectIds,frontierIds,resources:[]});
const C = (code,title,subject,routeRole,prerequisiteText,learning,extra={}) => {
  const sid=catalogFor(code), sourceIds=[sid,...(code.startsWith('MAE')||code.startsWith('SE ')?['journey-degree']:[])];
  const links=[{title:`Official ${code} catalog entry`,url:sourceById[sid].url}];
  return {id:code,code,title,units:4,institution:'UC San Diego',institutionId:'ucsd',unitSystem:'quarter',subject,stage:'university',routeRole,aliases:[],prerequisiteText,prerequisites:[],prerequisiteScope:'catalog-course-branches-with-text-conditions',prerequisiteWarning:'Course branches alone do not establish enrollment eligibility. The text includes applicable standing, minimum grades, consent, restricted enrollment and co-enrollment conditions.',sourceIds,reviewed:checked,evidenceStatus:'verified-primary',learning:{...learning,resources:links},...extra};
};

const core = [
 C('MAE 2','Introduction to Aerospace Engineering','engineering','required','No course prerequisite is stated in the current catalog.',
 L('A first look at how an aerospace idea becomes a system with a mission, constraints and interacting parts. You begin connecting physical estimates to design decisions.',
 ['A mission determines what success means.','Mass, power and performance budgets connect subsystems.','An estimate is useful when its assumptions are visible.'],
 'A concept has a 20 kg mass limit. Structure is 8 kg, instruments 5 kg and power hardware 4 kg. What remains?',
 'The allocated mass is 17 kg, leaving 3 kg, or 15% of the 20 kg limit. That is a bookkeeping margin, not evidence that the design is flight ready.',[],['MAE 155A','MAE 148'],'Learn to ask what a mechanism must do before choosing its shape.',['p01','p11'],['assembly','habitable']),{aliases:['MAE 02']}),
 C('MAE 8','MATLAB Programming for Engineering Analysis','math','required','MATH 20A and MATH 20B, or instructor consent.',
 L('Turn a calculation into a small, inspectable program. Variables, arrays, plots and reusable functions let you compare many conditions without hiding the physics.',
 ['Represent a set of measurements as an array.','Separate model inputs from calculation steps.','Check output against a hand calculation.'],
 'For times [0, 1, 2] seconds, evaluate x(t)=3t² metres.',
 'Squaring each time and multiplying by 3 gives [0, 3, 12] m. In array-oriented MATLAB use elementwise squaring; the hand result is a useful test.', ['MATH 20A','MATH 20B'],['MAE 107','MAE 145'],'Build reproducible plots and numerical experiments.',['p03','p05'],['caretaker']),{aliases:['MAE 08'],prerequisites:[['MATH 20A','MATH 20B']]}),
 C('MAE 11','Thermodynamics','engineering','required','PHYS 2C and CHEM 6A. Engineering-major enrollment restriction. Former MAE 110A is duplicate credit.',
 L('Track energy as it crosses the boundary of a system. Temperature, work, heat and entropy help distinguish possible processes from attractive but impossible claims.',
 ['Choose the system boundary before balancing energy.','Heat and work are different ways energy moves.','Energy conservation alone does not determine efficiency.'],
 'A steady device receives 100 W as heat and delivers 30 W as useful work. With no other transfers, find rejected heat and efficiency.',
 'The energy balance gives 100−30=70 W rejected. Thermal efficiency is 30/100=0.30, or 30%. This simplified balance does not specify a real engine cycle.', ['PHYS 2C','CHEM 6A'],['MAE 101B','MAE 113','MAE 110'],'Reason about power generation, thermal budgets and resource limits.',['p08','p11'],['heat','habitable']),{aliases:['MAE 110A'],prerequisites:[['PHYS 2C','CHEM 6A']]}),
 C('MAE 21','Aerospace Materials Science','engineering','required','(PHYS 2A or PHYS 4A), (CHEM 6A or CHEM 6AH), and MATH 20B. MAE-major enrollment restriction.',
 L('Connect the internal structure of a material to its behavior. A light part still has to tolerate temperature, loading, manufacturing and its environment.',
 ['Bonding and microstructure influence properties.','Strength, stiffness and toughness answer different questions.','Selection is a tradeoff across several requirements.'],
 'Assume a uniform bar expands freely with α=10×10⁻⁶/K through a 50 K temperature increase. Find strain and the length change of a 1 m bar.',
 'Thermal strain αΔT=0.0005. Multiplying by 1 m gives 0.0005 m=0.5 mm. A constrained bar would also develop stress, so this free-expansion answer would be insufficient.', ['CHEM 6A','PHYS 2A'],['SE 160A','MAE 155A'],'Select and compare materials for spacecraft structures and deployable mechanisms.',['p04','p09'],['assembly','extremes']),{prerequisites:ordinary(['PHYS 2A','PHYS 4A'],['CHEM 6A','CHEM 6AH'],'MATH 20B')}),
 C('MAE 30A','Statics and Introduction to Dynamics','engineering','required','PHYS 2A and (MATH 31BH or MATH 20C). MAE-major enrollment restriction.',
 L('Draw a body separately from its surroundings and account for the forces and moments acting on it. This turns a sketch of a mechanism into equations you can check.',
 ['A free-body diagram names every external load.','Moment depends on force and perpendicular lever arm.','Equilibrium requires balanced forces and moments.'],
 'A horizontal 1 m beam has a 100 N downward load at its center and ideal simple supports at both ends. Find the support forces.',
 'Taking moments about the left support gives R_right×1−100×0.5=0, so R_right=50 N. Vertical balance gives R_left=50 N. Symmetry is a second check.', ['PHYS 2A','MATH 20C'],['MAE 30B','MAE 131A'],'Trace how a robotic arm passes loads into its joints and base.',['p02','p04'],['repair','assembly']),{prerequisites:ordinary('PHYS 2A',['MATH 31BH','MATH 20C'])}),
 C('MAE 30B','Dynamics and Vibrations','engineering','required','MAE 30A. MAE-major enrollment restriction.',
 L('Explain how forces produce motion and why flexible systems oscillate. The same model can describe a suspended mass, a robot joint or a vibrating instrument mount.',
 ['Translation and rotation need consistent coordinate choices.','Inertia resists acceleration.','Mass and stiffness set a simple natural frequency.'],
 'For an undamped 1 kg mass on a 100 N/m spring, find natural angular frequency and period.',
 'ωₙ=√(k/m)=10 rad/s. The period is 2π/ωₙ≈0.628 s. This assumes linear spring behavior, one degree of freedom and no damping.', ['MAE 30A','MATH 20D'],['MAE 130','SE 160A'],'Recognize vibration and motion limits before trying to control a mechanism.',['p02','p06'],['repair','caretaker']),{prerequisites:[['MAE 30A']]}),
 C('MAE 101A','Introductory Fluid Mechanics','engineering','required','(PHYS 2A or PHYS 4A), MATH 20D, and (MATH 20E or MATH 31CH), or instructor consent. MAE-major enrollment restriction.',
 L('Describe moving liquids and gases using conservation laws. Pressure, velocity and momentum become quantities you can balance across a chosen control volume.',
 ['Mass cannot disappear from a steady flow.','Pressure and momentum both contribute to forces.','Dimensionless ratios tell you which effects matter.'],
 'In steady incompressible flow, a passage narrows from 0.02 m² to 0.01 m². Inlet speed is 3 m/s. Find exit speed.',
 'Continuity gives A₁V₁=A₂V₂. Thus V₂=(0.02/0.01)×3=6 m/s. Compressibility, leakage or transient storage would change the model.', ['PHYS 2A','MATH 20D','MATH 20E'],['MAE 101B','MAE 104','MAE 113'],'Model habitat ventilation, coolant flow and vehicle-fluid interaction.',['p05'],['habitable','extremes']),{prerequisites:ordinary(['PHYS 2A','PHYS 4A'],'MATH 20D',['MATH 20E','MATH 31CH'])}),
 C('MAE 101B','Advanced Fluid Mechanics','engineering','required','(MAE 101A or CENG 101A) and (MAE 11 or MAE 110A or CENG 102), or instructor consent.',
 L('Go beyond an ideal flow picture to examine viscosity, boundary layers and the effects of compressibility. You learn why a plausible simple estimate can fail near a surface.',
 ['Viscosity transports momentum.','Boundary layers connect a wall to the outer flow.','Scaling helps choose a useful approximation.'],
 'For density 1.2 kg/m³, speed 10 m/s, length 0.1 m and dynamic viscosity 1.8×10⁻⁵ Pa·s, estimate Reynolds number.',
 'Re=ρVL/μ=(1.2×10×0.1)/(1.8×10⁻⁵)≈66,667. It compares inertial and viscous effects; it does not alone prove a flow is turbulent.', ['MAE 101A','MAE 11'],['MAE 104','MAE 113','MAE 185'],'Judge when a fluid simulation needs more than an idealized model.',['p05'],['heat','extremes']),{prerequisites:ordinary(['MAE 101A','CENG 101A'],['MAE 11','MAE 110A','CENG 102'])}),
 C('MAE 104','Aerodynamics','engineering','required','MAE 101A and MAE 101B, or instructor consent. Listed MAE/SE major restrictions apply.',
 L('Relate the flow around a body to lift, drag and pitching moment. You learn what aerodynamic coefficients mean and where the underlying approximations stop working.',
 ['Pressure and shear distributions create total forces.','Coefficients allow comparisons across sizes and speeds.','Subsonic and supersonic flows need different reasoning.'],
 'Use L=½ρV²SC_L with ρ=1.2 kg/m³, V=10 m/s, S=0.5 m² and C_L=0.6.',
 'Dynamic pressure is 60 Pa; multiplying by 0.5 m² and 0.6 gives 18 N. This uses a supplied coefficient rather than predicting it, and assumes the associated flow condition applies.', ['MAE 101A','MAE 101B'],['MAE 142','MAE 155A'],'Evaluate a vehicle design with explicit aerodynamic assumptions.',['p05','p12'],['extremes']),{prerequisites:[['MAE 101A','MAE 101B']]}),
 C('MAE 105','Introduction to Mathematical Physics','math','required','PHYS 2A and PHYS 2B, and MATH 20D or MATH 21D. Engineering-major restriction.',
 L('Mathematics continues after calculus. Fourier series and partial differential equations describe fields that change across space and time: temperature in a wall, a vibrating structure or a traveling wave.',
 ['A complicated shape can be assembled from simpler modes.','Boundary conditions select which modes are allowed.','Each mode can evolve at its own rate.'],
 'A simplified temperature mode has amplitude A(t)=10e^(−0.1t) K, with t in seconds. Find the amplitude after 10 s and explain the negative exponent.',
 'A(10)=10/e≈3.68 K. The negative rate makes the disturbance decay rather than grow. This is one idealized diffusion mode, not a complete spacecraft thermal model.', ['MATH 20D','PHYS 2A','PHYS 2B'],['MAE 101C','MAE 101D'],'Translate spatial temperature or vibration patterns into models that can be analyzed and tested.',['p05','p08'],['heat','habitable']),{prerequisites:ordinary('PHYS 2A','PHYS 2B',['MATH 20D','MATH 21D'])}),
 C('MAE 107','Computational Methods in Engineering','math','required','(MAE 8 or MAE 9) and (MATH 18 or MATH 20F or MATH 31AH).',
 L('Learn what a numerical answer actually means. You solve equations, fit data and advance differential equations in time, while checking error and sensitivity.',
 ['An algorithm approximates a mathematical operation.','A smaller time step can improve accuracy but costs work.','Residuals and convergence checks reveal bad answers.'],
 'For y′=−y and y(0)=1, take one forward-Euler step of h=0.1 s and compare it with the exact solution.',
 'Euler gives y₁=1+0.1(−1)=0.9. The exact value e^(−0.1)≈0.90484, so the one-step absolute error is about 0.00484. Repeat with half the step to study convergence.', ['MAE 8','MATH 18','MATH 20D'],['MAE 184','MAE 185','MATH 170A'],'Build simulations whose results survive basic numerical checks.',['p05','p07'],['caretaker','orbits']),{prerequisites:ordinary(['MAE 8','MAE 9'],['MATH 18','MATH 20F','MATH 31AH'])}),
 C('MAE 113','Fundamentals of Propulsion','engineering','required','(MAE 11 or MAE 110A or CENG 102), (MAE 101A or CENG 101A), and (MAE 101B or CENG 101C). Listed MAE-major restrictions apply.',
 L('Connect momentum, fluid flow and thermodynamics to vehicle propulsion. The emphasis here is understanding performance models and component tradeoffs, not building propulsion hardware.',
 ['Changing a flow’s momentum produces a reaction force.','Energy and pressure constrain the available performance.','A useful component must work within the whole system.'],
 'In a deliberately simplified momentum-only model, mass flow is 0.5 kg/s and exhaust velocity relative to the inlet changes by 200 m/s. Find force.',
 'F=ṁΔV=0.5×200=100 N. Real thrust calculations also need pressure forces and appropriate reference frames; the example isolates one conservation-law contribution.', ['MAE 11','MAE 101A','MAE 101B'],['MAE 114','MAE 155B'],'Read propulsion performance claims and understand their assumptions.',['p11'],['orbits','lunar']),{prerequisites:ordinary(['MAE 11','MAE 110A','CENG 102'],['MAE 101A','CENG 101A'],['MAE 101B','CENG 101C'])}),
 C('MAE 131A','Solid Mechanics I','engineering','required','MATH 20D and (MAE 30A or MAE 130A or SE 101A).',
 L('Calculate how loads become stress, strain and deflection. This is the bridge between knowing that a structure balances forces and predicting whether it remains stiff and intact.',
 ['Stress is force distributed over area.','Stiffness and strength set different limits.','Bending, torsion and buckling require different models.'],
 'A straight bar carries 1,000 N in tension across a 100 mm² section. Find average axial stress.',
 'σ=F/A=1,000/100=10 N/mm²=10 MPa. This average neglects local stress concentrations near holes or joints.', ['MAE 30A','MATH 20D'],['SE 160A','MAE 155A'],'Estimate loads and deflections in brackets, beams and robot links.',['p04','p09'],['assembly','repair']),{prerequisites:ordinary('MATH 20D',['MAE 30A','MAE 130A','SE 101A'])}),
 C('MAE 142','Dynamics and Control of Aerospace Vehicles','engineering','required','MAE 104 and (MAE 143B or ECE 171A), or instructor consent. Engineering-major restriction.',
 L('Combine motion models and feedback for an entire aerospace vehicle. You study how coupled states behave and how a controller changes those dynamics.',
 ['A vehicle has interacting translational and rotational states.','Linearization describes behavior near a reference condition.','Stable eigenvalues are one local-model check, not a complete safety case.'],
 'A simplified perturbation obeys q′=−0.4q with q(0)=5 degrees/s. Predict q after 5 s.',
 'q(5)=5e^(−2)≈0.677 degrees/s. The negative coefficient predicts decay in this one-state model; neglected couplings can matter in a real vehicle.', ['MAE 104','MAE 143B'],['MAE 155B','MAE 184'],'Understand how a small disturbance becomes a vehicle response.',['p06'],['caretaker','orbits']),{prerequisites:ordinary('MAE 104',['MAE 143B','ECE 171A'])}),
 C('MAE 143A','Signals and Systems','math','required','(MATH 20D or MATH 21D), MATH 20E, and (MATH 18 or MATH 20F or MATH 31AH), or instructor consent.',
 L('Describe a system through inputs, internal state and outputs. Differential equations, transforms and sampled signals provide a common language for motors, sensors and thermal systems.',
 ['An input-output model separates cause from response.','Time and frequency descriptions reveal different behavior.','Sampling turns continuous motion into a sequence of numbers.'],
 'For a unit step into τy′+y=1 with y(0)=0 and τ=2 s, find y(2 s).',
 'The response is y(t)=1−e^(−t/τ), so y(2)=1−e^(−1)≈0.632. The output has reached about 63.2% of its final value after one time constant.', ['MATH 20D','MATH 18','MATH 20E'],['MAE 143B'],'Recognize the dynamics hidden inside a sensor trace or actuator response.',['p03','p06'],['caretaker','repair']),{prerequisites:ordinary(['MATH 20D','MATH 21D'],'MATH 20E',['MATH 18','MATH 20F','MATH 31AH'])}),
 C('MAE 143B','Linear Control','math','required','MAE 143A, or instructor consent.',
 L('Use feedback to make a system follow a target and reject disturbances. You compare tracking error, speed, stability margins and the limitations of an actuator.',
 ['Feedback acts on measured error.','A controller changes both transient and steady behavior.','Saturation and delay can invalidate a simple model.'],
 'A unity-gain first-order plant uses proportional gain K=3 and unity feedback. For a unit reference, find the steady output and error.',
 'The closed-loop DC gain is K/(1+K)=3/4, so y∞=0.75 and error=0.25. Higher proportional gain reduces this model’s error but does not make it exactly zero.', ['MAE 143A'],['MAE 142','MAE 144','MAE 175A'],'Analyze how a robot joint or pointing system responds when its position differs from the command.',['p06','p10'],['caretaker','repair']),{prerequisites:[['MAE 143A']]}),
 C('MAE 155A','Aerospace Engineering Design I','engineering','required','Catalog lists MAE 2; MAE 21 or SE 2 or SE 104; MAE 104; MAE 30B or MAE 130C; and SE 160A, or instructor consent. Confirm alternative-group interpretation when using a nonstandard route.',
 L('Bring separate subjects together in a design that can be explained, compared and reviewed. A team must choose requirements and document why its concept deserves further development.',
 ['Requirements need measurable acceptance criteria.','Subsystem choices interact through shared budgets.','A trade study must reveal its assumptions and priorities.'],
 'Compare two concepts against a 10 kg mass ceiling and a 50 W power ceiling: A uses 9 kg/60 W; B uses 11 kg/40 W. Which meets both?',
 'Neither. A fails power and B fails mass. A weighted score cannot erase a hard requirement; the team must revise a concept or renegotiate the requirement with justification.', ['MAE 2','MAE 21','MAE 104','MAE 30B','SE 160A'],['MAE 155B'],'Practice design reviews, traceable decisions and integration. This required course also appears on Seventh’s approved high-impact list.',['p09','p11'],['assembly','habitable']),{sourceIds:['journey-mae','journey-degree','journey-seventh']}),
 C('MAE 155B','Aerospace Engineering Design II','engineering','required','MAE 113, MAE 142, MAE 155A and MAE 170, or instructor consent. Program/materials fees may apply.',
 L('Continue the integrated design and show how evidence supports its claims. Analysis, testing, communication and revision have to agree with each other.',
 ['A test should trace back to a requirement.','An unexpected result can improve the design model.','A complete report distinguishes evidence from remaining uncertainty.'],
 'A mechanism must position within ±2 mm. Five measured errors are 1.1, −0.6, 1.8, 2.3 and −1.0 mm. Does this test demonstrate compliance?',
 'No: the 2.3 mm result exceeds the limit. Report the failure, test conditions and measurement uncertainty. Averaging the five errors would conceal the relevant event.', ['MAE 113','MAE 142','MAE 155A','MAE 170'],[],'Produce a defensible engineering case rather than a collection of attractive diagrams.',['p11','p12'],['repair','assembly']),{prerequisites:[['MAE 113','MAE 142','MAE 155A','MAE 170']]}),
 C('MAE 170','Experimental Techniques','engineering','required','(PHYS 2C or PHYS 4B) and (PHYS 2CL or MAE 140 or MAE 40). Listed engineering-major restrictions apply.',
 L('Learn to obtain measurements that answer a question. Calibration, uncertainty, sampling and clear reporting turn a sensor reading into usable evidence.',
 ['Every measurement has a method and uncertainty.','Calibration relates an instrument output to a physical quantity.','A good report allows someone else to check the result.'],
 'A sensor reads 2.04 V for a known 2.00 V input. Estimate its additive bias and correct a subsequent 3.10 V reading under that assumption.',
 'The estimated bias is +0.04 V. Subtracting it gives 3.06 V. One calibration point cannot establish gain error, nonlinearity or behavior over a wide range.', ['PHYS 2C','PHYS 2CL'],['MAE 175A','MAE 155B'],'Compare models with measured behavior and write evidence-based technical reports.',['p03','p12'],['caretaker','extremes']),{prerequisites:ordinary(['PHYS 2C','PHYS 4B'],['PHYS 2CL','MAE 140','MAE 40'])}),
 C('MAE 175A','Aerospace Engineering Laboratory I','engineering','required','Senior standing, MAE 143B and MAE 170, or instructor consent.',
 L('Use aerospace laboratory systems to test a model against reality. Data reduction and substantial reports matter as much as operating the apparatus.',
 ['A predicted trend needs a controlled comparison.','A discrepancy can arise from physics, sensors or procedure.','Repeatability is different from accuracy.'],
 'A model predicts a vibration frequency of 8.0 Hz; the experiment gives 7.6 Hz. Find the difference relative to the prediction.',
 '(7.6−8.0)/8.0=−0.05, or 5% lower. Before changing the model, check uncertainty, boundary conditions and whether the same mode was measured.', ['MAE 143B','MAE 170'],['MAE 155B'],'Learn the patient work of validating an aerospace model.',['p05','p12'],['repair','extremes']),{prerequisites:[['MAE 143B','MAE 170']],enrollmentNotes:'Senior standing is an additional prerequisite; it is not inferred from a course checkbox.'}),
 C('SE 160A','Aerospace Structural Mechanics I','engineering','required','(SE 105 or MAE 21), (SE 101B or MAE 30B), and (SE 110A or MAE 131A or MAE 131AR).',
 L('Extend basic solid mechanics to lightweight aerospace structures. Thin walls, combined loads and material directionality make the load path as important as the nominal material strength.',
 ['A structure carries combinations of bending, torsion and axial load.','Thin-walled geometry changes stiffness and load distribution.','Material axes matter in a composite.'],
 'For a simplified thin-walled circular tube under torque T=100 N·m, enclosed median area A=0.01 m² and thickness t=0.001 m, estimate shear stress using τ=T/(2At).',
 'τ=100/(2×0.01×0.001)=5,000,000 Pa=5 MPa. The supplied relation assumes a closed, thin wall and a suitable idealized torsion model; joints and local effects need more analysis.', ['MAE 21','MAE 30B','MAE 131A'],['MAE 155A'],'Reason about lightweight spacecraft panels, booms and vehicle structures.',['p04','p09'],['assembly','extremes']),{prerequisites:ordinary(['SE 105','MAE 21'],['SE 101B','MAE 30B'],['SE 110A','MAE 131A','MAE 131AR'])})
];

const electives = [
 C('MAE 108','Probability and Statistical Methods for Engineering','math','choice','MATH 18 or MATH 20F. No credit for both MAE 108 and ECE 109, ECON 120A, MATH 180A, MATH 183, MATH 186 or SE 125.',
 L('Give uncertainty a mathematical language. Probability models, estimation and inference help you decide what a noisy measurement supports and what it does not.',
 ['Conditional probability updates a belief using evidence.','An average and its uncertainty answer different questions.','Independent failures and shared causes require different models.'],
 'Two independent sensors each have a 0.1 probability of missing an event. If either detection is sufficient, what is the probability both miss?',
 'Independence gives 0.1×0.1=0.01, or 1%. If both sensors share the same failure cause, multiplying the probabilities is unjustified.', ['MATH 18'],['MAE 145','MAE 146','MAE 182'],'Reason about sensing, reliability and test evidence in autonomous systems.',['p03','p10'],['caretaker','repair']),{prerequisites:[['MATH 18'],['MATH 20F']],creditExclusions:['ECE 109','ECON 120A','MATH 180A','MATH 183','MATH 186','SE 125']}),
 C('MAE 180','Orbital Mechanics','engineering','choice','No explicit prerequisite is stated in the current course entry. This does not establish unrestricted enrollment; verify current access. Calculus, vectors and dynamics are useful preparation.',
 L('Describe spacecraft motion under gravity and translate mission needs into orbital choices. Position, velocity, reference frame and time all matter.',
 ['An orbit is a continuing gravitational motion.','Energy and angular momentum help characterize a trajectory.','Changing velocity changes the future path, not just the current speed.'],
 'In an ideal circular two-body orbit, speed is √(μ/r). If orbital radius doubles around the same body, how does speed change?',
 'The new speed is 1/√2≈0.707 times the old speed. This comparison assumes circular orbits and neglects other bodies, drag and nonspherical gravity.', ['PHYS 2A','MATH 20D','MAE 30B'],['MAE 181','MAE 182','MAE 240'],'Understand orbital constraints behind servicing, observation and transport missions.',['p07'],['orbits','repair'])),
 C('MAE 114','Space Propulsion','engineering','choice','MAE 113.',
 L('Compare ways of changing a spacecraft’s motion and their system-level consequences. Performance, power, mass and mission duration pull in different directions.',
 ['Propellant mass and achievable velocity change are connected.','High exhaust speed can trade against thrust and available power.','A propulsion choice belongs inside a mission architecture.'],
 'In the ideal rocket equation Δv=v_e ln(m₀/m_f), let mass ratio m₀/m_f=2 and effective exhaust speed v_e=1,000 m/s. Find ideal Δv.',
 'Δv=1,000 ln2≈693 m/s. This is a mathematical performance estimate; it excludes losses and does not describe how to construct any propulsion system.', ['MAE 113'],['MAE 181'],'Compare mission capability with mass and power budgets.',['p07','p11'],['orbits','lunar']),{prerequisites:[['MAE 113']]}),
 C('MAE 181','Space Mission Analysis and Design','engineering','choice','Upper-division standing, or instructor consent.',
 L('Choose a mission architecture by connecting orbit, payload, spacecraft resources, cost and risk. A subsystem can be excellent alone and still make the whole mission unworkable.',
 ['A mission requirement becomes several coupled engineering requirements.','Power, mass and thermal budgets must close together.','A trade study needs uncertainty as well as nominal values.'],
 'An instrument consumes 40 W for one quarter of an operating cycle and 8 W for the rest. Find average power before margins or other loads.',
 'P_avg=0.25×40+0.75×8=16 W. Peak power remains 40 W, so a power system sized only for the average would miss a separate constraint.', ['MAE 180','MAE 11'],[],'Connect a habitat, servicing or science idea to a coherent resource budget.',['p11'],['habitable','repair'])),
 C('MAE 182','Spacecraft Guidance and Navigation','engineering','choice','MAE 108 and MAE 180. MAE 143B before or concurrently is recommended, not listed as a prerequisite.',
 L('Estimate where a spacecraft is and determine how to guide it. Navigation measurements, coordinate frames and communication constraints link the mathematical model to operations.',
 ['Guidance chooses a desired path; navigation estimates the current state.','Measurements have uncertainty and geometric limits.','Pointing and tracking depend on consistent reference frames.'],
 'Two unbiased independent position estimates are 10 m with variance 4 m² and 12 m with variance 1 m². Find their inverse-variance weighted estimate.',
 'Weights proportional to 1/4 and 1 normalize to 0.2 and 0.8. The fused estimate is 0.2×10+0.8×12=11.6 m, with variance 1/(0.25+1)=0.8 m² under those assumptions.', ['MAE 108','MAE 180','MAE 143B'],[],'Understand why uncertainty matters during rendezvous and precise pointing.',['p07','p10'],['repair','orbits']),{prerequisites:[['MAE 108','MAE 180']]}),
 C('MAE 184','Flight Simulation Techniques','math','choice','Upper-division standing, or instructor consent. MAE 104/143B are useful background but are not stated prerequisites in the current catalog.',
 L('Build a computable vehicle-motion model and inspect how it behaves. Integration methods, equilibrium, linearization and visualization connect equations to a working simulation.',
 ['A state stores the quantities needed to predict what happens next.','The time step can alter numerical accuracy or stability.','A simulation needs checks independent of its visualization.'],
 'For one-dimensional motion x′=v and v′=a, use forward Euler with x₀=0 m, v₀=2 m/s, a=1 m/s² and h=0.1 s. Find the next state.',
 'Using the old state for both updates gives x₁=0+0.1×2=0.2 m and v₁=2+0.1×1=2.1 m/s. Exact position is 0.205 m, revealing the integration error.', ['MAE 107','MAE 30B','MAE 143A'],['MAE 155B'],'Test a motion model before interpreting a convincing-looking animation.',['p05','p07'],['caretaker','extremes'])),
 C('MAE 101C','Heat Transfer','engineering','choice','(MAE 101A or CENG 101A), MAE 101B and MAE 105.',
 L('Predict how rapidly heat moves, not just how much energy is available. Conduction, convection and radiation determine component temperatures and cooling requirements.',
 ['Thermal resistance connects heat flow to temperature difference.','Different mechanisms can act in parallel or series.','Boundary conditions can dominate a result.'],
 'A flat layer has conductivity k=2 W/(m·K), area 0.5 m², thickness 0.01 m and a 10 K temperature difference. Find steady one-dimensional conduction.',
 'Q̇=kAΔT/L=2×0.5×10/0.01=1,000 W. The model assumes constant conductivity, no internal heat source and known surface temperatures.', ['MAE 101A','MAE 101B','MAE 105'],['MAE 101D','MAE 202'],'Estimate thermal paths in habitats, electronics and spacecraft hardware.',['p08'],['heat','habitable']),{prerequisites:ordinary(['MAE 101A','CENG 101A'],'MAE 101B','MAE 105')}),
 C('MAE 101D','Intermediate Heat Transfer','engineering','choice','Senior standing and MAE 101C, or instructor consent.',
 L('Move from basic thermal laws to difficult configurations, numerical solutions and heat-exchanger decisions. Spacecraft thermal design is among the catalog’s applications.',
 ['Thermal design combines several heat-transfer mechanisms.','Heat-exchanger effectiveness measures practical performance.','Radiation depends strongly on absolute temperature.'],
 'A heat exchanger transfers 600 W where the maximum possible rate for the specified inlet conditions is 1,000 W. Find effectiveness.',
 'Effectiveness ε=600/1,000=0.60. This is a heat-exchanger measure, not a heat-engine efficiency; the maximum rate depends on fluid heat capacities and inlet temperatures.', ['MAE 101C'],[],'Evaluate cooling hardware and uncertainty in a thermal design.',['p08','p11'],['heat','habitable']),{prerequisites:[['MAE 101C']]}),
 C('MAE 110','Thermodynamic Systems','engineering','choice','MAE 11 or MAE 110A. Former MAE 110B is duplicate credit.',
 L('Apply thermodynamics to complete cycles and mixtures. You learn to compare a system’s processes instead of treating every component as an isolated energy box.',
 ['A cycle returns the working substance to its initial state.','Net work comes from the balance of all cycle processes.','Equilibrium constrains mixtures and phase behavior.'],
 'A cycle receives 500 kJ of heat and rejects 350 kJ. Find net work and thermal efficiency.',
 'For a complete cycle ΔU=0, so net work is 500−350=150 kJ. Efficiency is 150/500=30%. The calculation does not establish whether a specific cycle can achieve these transfers.', ['MAE 11'],['MAE 181'],'Understand energy-system tradeoffs in sustained operations.',['p11'],['habitable']),{aliases:['MAE 110B'],prerequisites:[['MAE 11'],['MAE 110A']]}),
 C('MAE 185','Computational Fluid Mechanics','math','choice','MAE 101B and MAE 107. Some specialization lists still use the title Computational Fluid Dynamics.',
 L('Approximate fluid conservation equations on a computer grid. You learn to distinguish a visually smooth flow picture from a result supported by discretization and convergence checks.',
 ['A mesh converts a continuous field into finite unknowns.','Conservation should survive the numerical approximation.','Grid refinement tests whether a result is stable.'],
 'A one-dimensional finite-volume cell has inflow 3 kg/s and outflow 2.5 kg/s. With no sources, find mass change in 0.2 s.',
 'Mass accumulates at 0.5 kg/s, so Δm=0.5×0.2=0.1 kg. A claimed steady solution with this imbalance would violate the cell’s mass balance.', ['MAE 101B','MAE 107'],[],'Interrogate simulations used in ventilation, cooling and vehicle design.',['p05'],['heat','extremes']),{aliases:['Computational Fluid Dynamics'],prerequisites:[['MAE 101B','MAE 107']]}),
 C('MAE 130','Advanced Vibrations','engineering','choice','(MATH 18 or MATH 31AH) and MAE 30B. Listed engineering-major restrictions apply.',
 L('Study systems with several coupled motions and structures that deform continuously. Modes explain why a disturbance can excite one pattern much more strongly than another.',
 ['A mode is a characteristic pattern of motion.','Coupling lets energy move between coordinates.','Forcing near a natural frequency can amplify response.'],
 'For an undamped single-mode approximation with natural angular frequency 10 rad/s, evaluate the normalized displacement magnification 1/|1−r²| at forcing ratio r=0.5.',
 'The magnification is 1/(1−0.25)=4/3≈1.33. Near r=1 the undamped formula becomes singular; real damping and nonlinear limits must be included.', ['MATH 18','MAE 30B'],[],'Recognize vibration constraints in long booms and precision mechanisms.',['p04','p06'],['assembly','repair']),{prerequisites:ordinary(['MATH 18','MATH 31AH'],'MAE 30B')}),
 C('MAE 144','Embedded Control and Robotics','engineering','choice','Upper-division or graduate standing and (MAE 143B or BENG 122A or ECE 171A), or instructor consent. Program/materials fees may apply.',
 L('Make feedback interact with actual computing and sensing hardware. Sampling, motor commands, timing and electrical interfaces become part of the control problem.',
 ['A digital controller sees samples rather than continuous reality.','A motor command is bounded and may arrive late.','Hardware tests expose assumptions hidden by a simulation.'],
 'A controller samples at 100 Hz. Find its sample interval and the number of samples during a 0.5 s event.',
 'The interval is 1/100=0.01 s=10 ms. A 0.5 s duration contains 50 sample intervals. Whether that resolves the motion adequately depends on its bandwidth and timing behavior.', ['MAE 143B','MAE 8','MAE 30B'],[],'Connect a control law to a real robotic mechanism.',['p06','p10'],['repair','caretaker']),{prerequisites:[['MAE 143B'],['BENG 122A'],['ECE 171A']]}),
 C('MAE 145','Introduction to Robotic Planning and Estimation','engineering','choice','MAE 8, MAE 108 and senior standing, or instructor consent. MAE 143B is not a listed prerequisite in the current catalog.',
 L('Plan a robot’s movement through an environment while estimating where it is. A route is more than a line on a map: the robot has a shape, uncertain measurements and possible collisions.',
 ['Configuration space represents the robot’s possible arrangements.','Search trades path cost against computation.','State estimation combines uncertain information over time.'],
 'A point-robot graph offers path A with edge costs 2+2+3 and path B with costs 1+5. Which is cheaper, and what does this comparison leave out?',
 'A costs 7; B costs 6, so B is cheaper in this graph. The result depends on the chosen costs and valid edges; it does not establish clearance, dynamic feasibility or safety for a physical robot.', ['MAE 8','MAE 108','MATH 18'],[],'Understand planning and uncertainty in inspection or servicing robots.',['p10'],['caretaker','repair']),{prerequisites:[['MAE 8','MAE 108']],enrollmentNotes:'Senior standing is additionally required unless instructor consent is granted.'}),
 C('MAE 146','Introduction to Machine Learning Algorithms','math','choice','(MATH 31AH or MATH 18), (MATH 20C or MATH 31BH), MAE 8, and one of MAE 108/ECE 109/SE 125/MATH 186/MATH 183/MATH 180A/ECON 120A. Python experience is recommended.',
 L('Learn how fitted models find patterns and where those patterns can mislead. Training data, validation data and the intended use all affect whether a prediction is useful.',
 ['Training error is not evidence of reliable generalization.','A loss function defines what the algorithm optimizes.','Distribution changes can undermine a deployed model.'],
 'A regression model predicts [2,4] for measured values [3,3]. Find mean squared error.',
 'Errors are −1 and +1. Squared errors are 1 and 1, so MSE=(1+1)/2=1 in squared measurement units. This score says nothing about performance on untested conditions.', ['MATH 18','MATH 20C','MAE 8','MAE 108'],[],'Evaluate perception or prediction tools without confusing a good demo with verified autonomy.',['p10'],['caretaker']),{aliases:['Introduction to Machine Learning Algorithms with Python'],prerequisites:ordinary(['MATH 31AH','MATH 18'],['MATH 20C','MATH 31BH'],'MAE 8',['MAE 108','ECE 109','SE 125','MATH 186','MATH 183','MATH 180A','ECON 120A'])}),
 C('MAE 148','Introduction to Autonomous Vehicles','engineering','choice','(ECE 15 or ECE 35 or MAE 2 or MAE 3) and department approval. Cross-listed as ECE 148; this is one course identity.',
 L('Integrate sensing, computing and motion in a small autonomous-vehicle project. The educational value lies in making imperfect components cooperate and measuring where they fail.',
 ['Odometry accumulates error.','Perception and planning must operate within computation limits.','Integration testing needs explicit failure cases.'],
 'A wheel-odometry model overestimates every metre by 2%. After a true 20 m straight path, what distance does it report?',
 'The report is 20×1.02=20.4 m, an error of +0.4 m. Real error can also arise from wheel slip and turning, so a constant-scale model is only a first check.', ['MAE 2','MAE 8','MAE 108'],[],'See how a robot’s model can drift from its environment. MAE 148 is also a Seventh high-impact option, but MAE 155A already covers the default plan.',['p10'],['caretaker','extremes']),{aliases:['ECE 148'],prerequisites:[['ECE 15'],['ECE 35'],['MAE 2'],['MAE 3']],enrollmentNotes:'Department approval is required in addition to a listed course route.',sourceIds:['journey-mae','journey-specializations','journey-seventh']}),
 C('MAE 200','Controls','math','choice','Graduate course. Nongraduate students may enroll only with instructor consent.',
 L('Extend feedback and estimation to stochastic, nonlinear and optimal formulations. This is later depth, not an automatic next step in the undergraduate timetable.',
 ['A cost function defines a chosen notion of good performance.','Noise models affect estimation.','Nonlinear behavior can differ from a local linear model.'],
 'For a toy one-step decision, minimize J(u)=(1−u)²+u² over real u.',
 'J′(u)=−2+4u=0 gives u=0.5; J″=4>0 verifies a minimum. The result balances remaining error against effort in this invented cost, not in every control problem.', ['MAE 143B','MAE 108'],[],'Explore research-level control questions after building strong fundamentals.',['p06'],['caretaker']),{graduate:true,enrollmentNotes:'Instructor consent for undergraduate enrollment is explicitly required; availability and degree use need confirmation.'}),
 C('MAE 201','Mechanics of Fluids','engineering','choice','Graduate course. Nongraduate students may enroll only with instructor consent.',
 L('Revisit fluid motion with greater mathematical depth, including vorticity and boundary-layer reasoning. The aim is to understand the equations and approximations behind familiar flow models.',
 ['Velocity gradients describe local fluid deformation.','Vorticity measures local rotational behavior.','A scaling choice can reveal a reduced model.'],
 'For a planar velocity field u=ay and v=0 with a=2 s⁻¹, compute out-of-plane vorticity ∂v/∂x−∂u/∂y.',
 'The result is 0−a=−2 s⁻¹. The sign follows the selected coordinate convention. Vorticity is a local property, not the trajectory of an individual parcel.', ['MAE 101B','MATH 20E','MAE 105'],[],'Build deeper understanding for advanced fluid modeling.',['p05'],['extremes']),{graduate:true}),
 C('MAE 202','Thermal Processes','engineering','choice','Graduate course. Nongraduate students may enroll only with instructor consent.',
 L('Study thermal transport as a connected analytical problem. Conduction, convection and radiation have to fit the geometry, boundary conditions and energy budget.',
 ['Thermal pathways can compete.','A resistance model is an approximation to a temperature field.','Boundary conditions are physical assumptions that need evidence.'],
 'Two thermal resistances of 2 K/W and 3 K/W are in series. For a 20 K difference, find heat flow.',
 'Series resistance is 5 K/W, so Q̇=20/5=4 W. This assumes a steady one-dimensional path and negligible other heat exchange.', ['MAE 101C','MAE 105'],[],'Investigate thermal questions in sustained space operations.',['p08'],['heat','habitable']),{graduate:true}),
 C('MAE 212','Introductory Compressible Flow','engineering','choice','Graduate course. Nongraduate students may enroll only with instructor consent.',
 L('Study flows where density changes and pressure waves are essential. Compressible-flow reasoning is needed when an incompressible approximation misses the important physics.',
 ['Mach number compares flow speed with acoustic propagation.','Pressure disturbances travel as waves.','Compression and expansion affect temperature and density.'],
 'A flow travels at 500 m/s where the local sound speed is 340 m/s. Find Mach number.',
 'M=V/a=500/340≈1.47, which is supersonic relative to that local sound speed. The number alone does not determine a full flow field.', ['MAE 101B','MAE 113'],[],'Understand the limits of high-speed aerodynamic and propulsion models.',['p05'],['extremes']),{graduate:true}),
 C('MAE 240','Space Flight Mechanics','engineering','choice','Graduate standing is the catalog prerequisite. Its appearance on an undergraduate specialization list does not grant enrollment; a specific authorized exception would be needed.',
 L('Move beyond a simple two-body orbit to strongly perturbed motion and richer dynamical models. This is an advanced branch for students who want deeper astrodynamics.',
 ['Several gravitating bodies can change the useful model.','Small perturbations can accumulate over time.','Numerical methods need physical invariants and error checks.'],
 'A numerical model of an ideal conservative orbit starts with normalized energy −1 and later reports −0.99. Quantify the drift relative to the initial magnitude.',
 'The change is +0.01, or 1% of |−1|. In the ideal conservative problem this is a numerical warning; in a deliberately perturbed model, identify which forces can change energy before judging the result.', ['MAE 180','MAE 107','MATH 20D'],[],'Prepare for advanced trajectory research rather than treating a simulation as a black box.',['p07'],['orbits']),{graduate:true,enrollmentNotes:'Catalog requires graduate standing. Do not schedule as an assured undergraduate course.'})
];

const lower = [
 C('MATH 18','Linear Algebra','math','covered','Placement/AP route, MATH 4C, MATH 10A or MATH 20A; instructor consent is also listed. MATH 31AH is duplicate credit.',
 L('Represent coupled equations and changes of coordinates with vectors and matrices. This becomes the language of robot geometry, numerical models and control systems.',
 ['A matrix can transform coordinates.','A linear system can describe several constraints at once.','Eigenvectors reveal directions with a simple response.'],
 'Rotate the point (1,0) by 90° counterclockwise using the matrix [[0,−1],[1,0]].',
 'Matrix multiplication gives (0,1). Checking length before and after gives 1 in both cases, consistent with a pure rotation.',[],['MAE 107','MAE 108','MAE 143A'],'Describe robot frames and solve coupled engineering models.',['p02','p05'],['repair'])),
 C('MATH 20A','Calculus for Science and Engineering','math','covered','Qualifying placement/AP route, MATH 4C or MATH 10A; exact placement thresholds and credit limits are in the catalog.',
 L('Turn a graph’s changing slope into a quantitative rate. Differentiation helps you reason about motion and how an output responds to a changing input.',
 ['A derivative is a local rate of change.','Units change when differentiating with respect to time.','An integral accumulates small contributions.'],
 'If x(t)=3t² metres with t in seconds, find velocity at t=2 s.',
 'v=dx/dt=6t m/s, so v(2)=12 m/s. The slope changes with time; x/t is not the instantaneous velocity.',[],['MATH 20B','PHYS 2A'],'Read motion and rates rather than memorizing isolated formulas.',['p03'],['repair'])),
 C('MATH 20B','Calculus for Science and Engineering','math','covered','MATH 20A, MATH 10B or MATH 10C with C− or better, or a listed AP route.',
 L('Use integration to accumulate changing quantities and series to approximate functions. This supplies tools for motion, energy and later differential-equation models.',
 ['Area under a rate curve gives accumulated change.','An approximation has an interval and error.','Different integral techniques reveal structure.'],
 'A velocity is v(t)=2t m/s from t=0 to 3 s. Find displacement.',
 'Integrating gives ∫₀³2t dt=[t²]₀³=9 m. The unit check is (m/s)×s=m.', ['MATH 20A'],['MATH 20C','MAE 8','MAE 21'],'Compute accumulated motion and energy from changing rates.',['p03'],['orbits'])),
 C('MATH 20C','Calculus and Analytic Geometry for Science and Engineering','math','covered','MATH 20B with C− or better, or AP Calculus BC score 4 or 5. MATH 31BH is duplicate credit.',
 L('Extend calculus to geometry and functions of several variables. A temperature field or a robot’s position has more than one independent input.',
 ['Vectors describe direction as well as magnitude.','Partial derivatives vary one input while holding others fixed.','Several-variable optimization identifies local sensitivity.'],
 'For T(x,y)=x²+2y in a chosen consistent unit system, find the gradient at (3,1).',
 '∇T=(2x,2), so the gradient is (6,2). It points toward the local direction of fastest increase; its components have temperature-per-length units if x and y are lengths.', ['MATH 20B'],['MATH 20D','MATH 20E','MAE 30A'],'Describe spatial fields and sensitivities in mechanisms and thermal systems.',['p02','p08'],['repair','heat'])),
 C('MATH 20D','Introduction to Differential Equations','math','covered','(MATH 20C or MATH 31BH) and (MATH 18 or MATH 31AH), with C− or better; instructor consent is also listed.',
 L('Solve for a changing quantity when you know a rule for its rate. Initial conditions pick one motion or thermal history from a family of possible solutions.',
 ['The equation describes a rate; the solution describes a history.','Initial conditions are part of the model.','Systems of equations describe interacting quantities.'],
 'Solve y′=−0.5y with y(0)=4, where time is in seconds.',
 'y(t)=4e^(−0.5t). Substituting gives y′=−2e^(−0.5t)=−0.5y, and y(0)=4 verifies the initial condition.', ['MATH 18','MATH 20C'],['MAE 105','MAE 143A','MAE 101A'],'Model decay, vibration and feedback response.',['p05','p06'],['caretaker','heat']),{prerequisites:ordinary(['MATH 20C','MATH 31BH'],['MATH 18','MATH 31AH'])}),
 C('MATH 20E','Vector Calculus','math','covered','(MATH 18 or MATH 31AH) and (MATH 20C or MATH 31BH), with C− or better.',
 L('Measure how fields flow, circulate and change across surfaces and volumes. Conservation laws in fluids and electromagnetism use this language.',
 ['Flux measures a field passing through a surface.','Divergence describes local spreading or accumulation.','Integral theorems connect local and global descriptions.'],
 'A uniform velocity field of 2 m/s passes normally through a 0.3 m² surface. Find volume flow rate.',
 'Flux is v·n times area: 2×0.3=0.6 m³/s. An angled surface uses only the normal velocity component.', ['MATH 18','MATH 20C'],['MAE 101A','MAE 143A'],'Translate conservation into the spatial mathematics of fluid and thermal models.',['p05'],['heat','extremes']),{prerequisites:ordinary(['MATH 18','MATH 31AH'],['MATH 20C','MATH 31BH'])}),
 C('PHYS 2A','Physics—Mechanics','physics','covered','MATH 10A–10B, or MATH 20A, 20B, 20C or 31BH. Prior/concurrent MATH 20B is recommended.',
 L('Connect motion to forces, energy and momentum. This is the physical foundation underneath later statics, dynamics and vehicle models.',
 ['A free-body diagram precedes Newton’s law.','Energy provides another route to a motion result.','Momentum is useful when interactions are brief.'],
 'A net horizontal force of 6 N acts on a 2 kg body. Neglect other effects and find acceleration.',
 'a=F/m=6/2=3 m/s². The force must be the net force, not just one of several forces.', ['MATH 20A'],['MAE 30A','PHYS 2B','MAE 21'],'Explain what pushes a mechanism and why it accelerates.',['p02','p03'],['repair'])),
 C('PHYS 2B','Physics—Electricity and Magnetism','physics','covered','(PHYS 2A or PHYS 4A) and (MATH 20B or MATH 20C or MATH 31BH). Prior/concurrent MATH 20C/31BH is recommended.',
 L('Understand electric and magnetic fields, circuits and changing electromagnetic systems. This supports an informed view of sensors, actuators and measurement electronics.',
 ['Potential difference and current describe different quantities.','Capacitors and inductors store energy.','Changing fields can induce a response.'],
 'A 12 V ideal source drives a 6 Ω resistor. Find current and dissipated power.',
 'I=V/R=2 A. P=VI=24 W. This is an ideal resistive example; physical components must tolerate their actual operating conditions.', ['PHYS 2A','MATH 20B'],['PHYS 2CL','MAE 105'],'Understand the electrical quantities reported by instruments and control hardware.',['p03'],['caretaker']),{prerequisites:ordinary(['PHYS 2A','PHYS 4A'],['MATH 20B','MATH 20C','MATH 31BH'])}),
 C('PHYS 2C','Physics—Fluids, Waves, Thermodynamics, and Optics','physics','covered','(PHYS 2A or PHYS 4A) and (MATH 20C or MATH 31BH). PHYS 2B is strongly recommended; prior/concurrent MATH 20D is recommended.',
 L('Meet physical ideas that later become specialized engineering courses: waves, fluid behavior, heat and light. The connections matter more than treating them as unrelated chapters.',
 ['Waves carry patterns and energy.','Temperature and heat are not interchangeable.','A model’s physical scale affects its usefulness.'],
 'A wave has frequency 5 Hz and wavelength 0.4 m. Find propagation speed.',
 'v=fλ=5×0.4=2 m/s. This describes the chosen wave relation; the medium and dispersion determine whether speed changes with frequency.', ['PHYS 2A','MATH 20C'],['MAE 11','MAE 170'],'Build the physical intuition for thermal and measurement work.',['p03','p08'],['heat','habitable']),{prerequisites:ordinary(['PHYS 2A','PHYS 4A'],['MATH 20C','MATH 31BH'])}),
 C('PHYS 2CL','Physics Laboratory—Electricity and Magnetism','physics','covered','(PHYS 2A or PHYS 4A) and (PHYS 2B or PHYS 4C). Prior/concurrent PHYS 2C or PHYS 4D is recommended. Materials fee may apply.',
 L('Test electrical and magnetic behavior with real measurements. The laboratory is a separate course: understanding a lecture does not automatically supply experimental credit.',
 ['A measurement procedure must be reproducible.','Uncertainty belongs beside a reported value.','A fitted curve can test a model.'],
 'Three independent readings are 1.9, 2.0 and 2.1 V. Find the mean and identify one thing the spread cannot reveal.',
 'The mean is 2.0 V. The spread shows variation but cannot reveal a shared calibration bias; all three readings could be shifted by the same amount.', ['PHYS 2A','PHYS 2B'],['MAE 170'],'Practice making and documenting measurements.',['p03'],['caretaker']),{units:2,prerequisites:ordinary(['PHYS 2A','PHYS 4A'],['PHYS 2B','PHYS 4C'])}),
 C('CHEM 6A','General Chemistry I','science','covered','CHEM 4, qualifying AP/placement, or MATH 3C or higher. Current entry lists exact test thresholds. No credit after CHEM 6AH.',
 L('Connect atoms, bonds and composition to observable material behavior. Counting matter and understanding bonding support later materials and energy reasoning.',
 ['Chemical amount links microscopic particles to measurable mass.','Bonding affects structure and properties.','Balanced equations conserve atoms.'],
 'Using a supplied molar mass of 18 g/mol, how many moles are in 36 g of a substance?',
 'n=m/M=36/18=2 mol. The units divide as grams/(grams per mole), leaving moles.',[],['MAE 21','MAE 11'],'Build a foundation for materials selection and thermodynamic reasoning.',['p01'],['habitable','extremes']))
];

const depth = [
 C('MATH 180A','Introduction to Probability','math','optional','MATH 20C or MATH 31BH, or instructor consent. MATH 109 prior/concurrent is highly recommended. MAE 108 prohibits duplicate credit with this course; do not add both as independent credit.',
 L('An optional mathematical treatment of probability, useful if your eventual plan calls for more theoretical depth. It is an alternative to overlapping introductory probability credit, not an automatic sixth technical elective.',
 ['Events and random variables are different objects.','Expectation summarizes a distribution.','Conditioning changes the information available.'],
 'A fair six-sided die pays its face value in points. Find expected points.',
 'E[X]=(1+2+3+4+5+6)/6=3.5 points. The expected value need not be a possible outcome of one trial.', ['MATH 20C'],[],'Build deeper reasoning about uncertain quantities.',['p03'],['caretaker']),{creditExclusions:['MAE 108'],enrollmentNotes:'Technical-elective or substitution use is not asserted; obtain the relevant approval before changing the default MAE 108 route.'}),
 C('MATH 170A','Introduction to Numerical Analysis: Linear Algebra','math','optional','(MATH 18 or MATH 31AH), (MATH 20C or MATH 31BH), and one of CSE 20/MATH 15A/MATH 31CH/MATH 109; instructor consent route also exists. Programming knowledge recommended.',
 L('Study why numerical linear algebra succeeds or fails. Conditioning, orthogonalization and least squares give a deeper explanation of the calculations used in engineering models.',
 ['A small input error can become a large solution error.','Orthogonality can improve numerical behavior.','Least squares handles inconsistent measurement equations.'],
 'Estimate one constant from measurements 1, 2 and 3 by minimizing the sum of squared residuals.',
 'For J(c)=(1−c)²+(2−c)²+(3−c)², J′=6c−12. Thus c=2, the mean. The residuals −1, 0 and 1 sum to zero.', ['MATH 18','MATH 20C','MAE 107'],[],'Understand numerical reliability in estimation and simulation.',['p05'],['caretaker']),{enrollmentNotes:'Additional proof/discrete-math preparation is required on the ordinary route. This is optional depth; no automatic TE approval is claimed.'})
];

const college = [
 C('SYN 100','Engaging with a Changing Planet','writing','choice','Seventh students only; catalog lists upper-division standing and SYN 1/1R plus SYN 2/2R. Seventh transfer guidance explicitly preauthorizes all transfers beginning winter of their first UCSD year. Letter grade required.',
 L('Work with classmates on a defined question about a changing planet. Research, communication and project decisions are combined rather than treated as separate exercises.',
 ['A broad concern becomes a tractable project question.','Different disciplines reveal different evidence and constraints.','A useful project explains who benefits and how success is judged.'],
 'Turn “make campus sustainable” into one question a small team could investigate in a quarter.',
 'Example: “Which two changes would reduce avoidable food waste in one dining location, based on a week of observations and interviews?” State the access limits, proposed evidence and how recommendations would be evaluated. This is an original example, not a promised section topic.',[],[],'Develop collaborative research, writing and presentation skills alongside engineering.',['p12'],['habitable']),{sourceIds:['journey-syn','journey-seventh'],enrollmentNotes:'Required in the Seventh reference scenario, not a universal UCSD requirement. Do not schedule SYN 1/2 again for a transfer using the published preauthorization.'}),
 C('HUM 100','Advanced Topics in the Humanities','humanities','choice','Open to Revelle students only. Must be taken for a letter grade.',
 L('Read demanding texts closely and construct an interpretation that can be defended. The course strengthens analytical writing through a selected humanities theme.',
 ['Interpretation needs textual evidence.','A strong argument engages a plausible alternative reading.','Revision can change the claim as well as the wording.'],
 'Revise “The author proves technology is bad” into a defensible analytical claim.',
 'Example: “In the passage’s contrast between convenience and dependence, the author questions whether this particular technology expands the character’s agency.” A full paragraph would identify precise language and address another reasonable interpretation.',[],[],'Practice careful interpretation and reasoned disagreement; these have value beyond technical work.',['p12'],[]),{sourceIds:['journey-hum','journey-revelle'],enrollmentNotes:'Required for Revelle transfers under the current rule; it is not added to the Seventh scenario.'}),
 C('SYN 150','Defining the Scope of a Changing Planet','humanities','choice','Seventh transfer students only; must precede SYN 100, not be concurrent with or after it. Letter grade needed for high-impact. Duplicate credit with SYN 150R.',
 L('Frame a complex global question through several disciplines and an antiracist perspective before beginning a team project. This is a named high-impact alternative, not an extra default course.',
 ['The scope of a question determines what evidence is useful.','Different communities can face different consequences.','A project needs a feasible boundary.'],
 'For a proposed neighborhood cooling project, name two groups to consult and one question that a temperature measurement alone cannot answer.',
 'Residents and people maintaining the site may reveal access and upkeep needs. Temperature data cannot determine whether the space feels welcoming or is accessible to those most affected by heat.',[],['SYN 100'],'Develop a project question that accounts for people and implementation.',['p11'],['habitable']),{aliases:['SYN 150R'],sourceIds:['journey-syn','journey-seventh'],enrollmentNotes:'The default high-impact requirement overlaps MAE 155A. Choose SYN 150 only if you want this additional preparation or need a different high-impact route.'}),
 C('ANTH 21','Race and Racisms','society','choice','No course prerequisite is stated in the current catalog. Current DEI list includes this course; future offerings must be rechecked.',
 L('Study how racial categories and racism operate across historical and social settings. Evidence from several branches of anthropology helps examine assumptions rather than leaving them unspoken.',
 ['A social category has a history.','Lived experience and institutional patterns require different kinds of evidence.','A comparison should avoid treating a group as uniform.'],
 'An argument uses one person’s experience to claim that an institution treats everyone equally. Identify the evidentiary gap.',
 'One experience cannot establish an institution-wide pattern. A stronger inquiry would define the decision being studied, examine broader evidence and consider experiences that challenge the initial claim.',[],[],'Practice evidence-aware interpretation of social institutions. This is the concrete DEI fallback if no accepted transfer equivalency has cleared it.',[],[]),{sourceIds:['journey-anth','journey-dei','journey-dei-transfer']}),
 C('MGT 18','Managing Diverse Teams','society','choice','No course prerequisite is stated in the current catalog. Duplicate credit with MGT 18GS. Current DEI list includes this course.',
 L('Examine how people with different backgrounds work together and make decisions. Team participation, communication and cultural understanding are part of the problem.',
 ['A meeting structure can affect who is heard.','Different experiences can reveal neglected assumptions.','An inclusive process needs observable practices.'],
 'A project meeting repeatedly ends before quieter members contribute. Propose one process change and a way to assess it.',
 'Circulate the decision question beforehand and begin with a brief written round from every member. Compare whether concerns are recorded and considered; equal speaking time alone does not prove the decision process is equitable.',[],[],'Improve team decision processes. This is a DEI alternative, not an additional requirement alongside ANTH 21.',[],[]),{aliases:['MGT 18GS'],sourceIds:['journey-mgt','journey-dei'],enrollmentNotes:'Do not automatically count management coursework toward the major’s arts/humanities/social-science minimum; the degree explicitly excludes some management subjects.'})
];

const language = [
 C('LISP 1A','Spanish Conversation','humanities','choice','For students with no prior Spanish study; take concurrently with LISP 1AX. Students with prior study use placement.',
 L('Begin communicating in Spanish through listening and speaking. Conversation practice and the paired analysis course develop related skills together.',
 ['Listening for meaning comes before translating every word.','A useful phrase is learned in a context.','Asking for clarification keeps communication moving.'],
 'Plan a short introduction: greet someone, give your name and ask their name.',
 'One example is “Hola, me llamo Chris. ¿Cómo te llamas?” Practice understanding the reply and asking for repetition. This is a beginner illustration, not a placement test.',[],['LISP 1B'],'Communicate with more people and gain practice listening across unfamiliar language. ',[],[]),{units:2.5,corequisites:['LISP 1AX']}),
 C('LISP 1AX','Analysis of Spanish','humanities','choice','For students with no prior Spanish study; take concurrently with LISP 1A.',
 L('Study the structures that make introductory Spanish communication work. The paired conversation course gives you a place to use them.',
 ['Verb form can identify the speaker.','Grammar helps express meaning precisely.','Patterns become useful through repeated use.'],
 'Compare “Me llamo Chris” and “Te llamas Ana.” What change marks the person being described?',
 'The pronoun and verb form change together: me/llamo describes the speaker, while te/llamas addresses another person. Learn the pattern as part of a meaningful exchange.',[],['LISP 1BX'],'Build another language as a way to understand and express ideas. ',[],[]),{units:2.5,corequisites:['LISP 1A']}),
 C('LISP 1B','Spanish Conversation','humanities','choice','LISP 1A with C− or better and LISP 1AX with D or better, or equivalents. Take concurrently with LISP 1BX.',
 L('Continue speaking and listening beyond the first-quarter foundation. More vocabulary and practice help sustain a short exchange instead of relying on a memorized opening.',
 ['Follow-up questions extend a conversation.','Context helps interpret an unfamiliar word.','Feedback helps separate an understandable message from an accurate one.'],
 'Add a follow-up to “Estudio ingeniería” that invites the other person to speak.',
 '“¿Qué estudias?” asks what the other person studies. Listen to the answer before choosing the next question; communication is an exchange, not only a prepared speech.', ['LISP 1A','LISP 1AX'],[],'Build confidence communicating across language differences.',[],[]),{units:2.5,prerequisites:[['LISP 1A','LISP 1AX']],corequisites:['LISP 1BX']}),
 C('LISP 1BX','Analysis of Spanish','humanities','choice','LISP 1A with C− or better and LISP 1AX with D or better, or equivalents. Take concurrently with LISP 1B.',
 L('Develop the grammatical and written foundation accompanying second-quarter conversation. The two linked courses together are a five-quarter-unit language level.',
 ['Sentence structure links people, actions and objects.','Writing gives time to inspect and revise meaning.','A repeated error can become a focused practice goal.'],
 'Explain why a written paragraph and a conversation can reveal different strengths in a new language.',
 'Writing gives time to revise form and consult references. Conversation adds listening and real-time response. Practicing both provides more useful evidence of communication than either alone.', ['LISP 1A','LISP 1AX'],[],'Continue a language sequence without mistaking its linked components for separate language levels.',[],[]),{units:2.5,prerequisites:[['LISP 1A','LISP 1AX']],corequisites:['LISP 1B']})
];

// Preserve documented transfer relationships without asserting that this user has
// earned, passed or received UCSD approval for any credit.
const coverage = new Map();
for(const rule of academic.articulation.rules){
  for(const code of rule.satisfies){
    coverage.set(code,{logic:rule.all?'all':'any',courseCodes:rule.all||rule.any,sourceIds:['assist-aero'],status:'conditional-on-accepted-transfer-credit',note:rule.all?.length>1?'All listed courses are required together; each earned course still contributes units only once.':'Use accepted articulation to cover this requirement; do not automatically repeat the UCSD course.'});
  }
}
const allCourseUpdates = [...lower,...core,...electives,...depth,...college,...language];
const localCourseCodes = new Set(allCourseUpdates.map(c=>c.code));
const externalCatalogSources = {
  MATH:'journey-math',PHYS:'journey-physics',CHEM:'journey-chemistry',
  MAE:'journey-mae',SE:'journey-se',BENG:'journey-beng',CENG:'journey-ceng',
  CSE:'journey-cse',ECE:'journey-ece',ECON:'journey-econ',SYN:'journey-syn',
  HUM:'journey-hum',LISP:'journey-languages'
};
const expandedTextAlternatives = {
  'PHYS 2A':['MATH 10B'],
  'SYN 100':['SYN 1R','SYN 2R']
};
function externalPrerequisitesFor(c){
  const textCodes=c.prerequisiteText.match(/\b(?:MATH|PHYS|CHEM|MAE|SE|BENG|CENG|CSE|ECE|ECON|SYN|HUM|LISP)\s+\d+[A-Z]*/g)||[];
  const references=[...(c.prerequisites||[]).flat(),...(c.corequisites||[]).flat(),...textCodes,...(expandedTextAlternatives[c.code]||[])];
  return [...new Set(references)].filter(code=>!localCourseCodes.has(code)).map(code=>{
    const sourceId=externalCatalogSources[code.split(' ')[0]];
    return {code,url:sourceById[sourceId].url,sourceId,note:'External catalog reference; this is an alternative, supporting or legacy code named in the course conditions, not an additional required class. Read the complete prerequisite text for its role.'};
  });
}
export const ucsdCourseUpdates = allCourseUpdates.map(c=>{
  const match=coverage.get(c.code);
  const externalPrerequisites=externalPrerequisitesFor(c);
  return {...c,...(match?{coveredBy:match}:{}),externalPrerequisites,sourceIds:[...new Set([...c.sourceIds,...(match?['assist-aero']:[]),...externalPrerequisites.map(p=>p.sourceId)])],learning:{...c.learning,exampleStatus:'Original simplified learning example, not an official course assignment.',linksAreLearningConnections:true}};
});

export const technicalDirection = {
 title:'Aerospace degree, with a controls and robotics direction to explore',
 formalName:'Flight Dynamics and Controls',
 defaultCodes:['MAE 184','MAE 108','MAE 144','MAE 145','MAE 148'],
 summary:'Five approved technical-elective slots are required. This example fills them with simulation, uncertainty, embedded feedback, planning and integration. Choosing a formal specialization remains optional.',
 rationale:[
  {code:'MAE 108',why:'Probability supports the estimation and planning work and is a prerequisite for MAE 145.'},
  {code:'MAE 184',why:'Flight simulation is the required anchor for the formal Flight Dynamics and Controls specialization.'},
  {code:'MAE 144',why:'Connect feedback mathematics with sensing, timing and hardware.'},
  {code:'MAE 145',why:'Study collision-aware planning and uncertain robot localization after probability and programming.'},
  {code:'MAE 148',why:'Practice integration; department approval is required. It is the fifth approved choice in this example.'}
 ],
 alternatives:[
  {title:'More dynamics, less vehicle integration',replace:'MAE 148',with:'MAE 130',courseCodes:['MAE 130'],description:'Vibrations strengthens the mechanics side and remains on the controls specialization list.'},
  {title:'More learning algorithms',replace:'MAE 148',with:'MAE 146',courseCodes:['MAE 146'],description:'Choose this if model fitting and validation become more compelling than a vehicle integration project; complete its full prerequisites.'},
  {title:'Astrodynamics branch',courseCodes:['MAE 180','MAE 108','MAE 181','MAE 182','MAE 114'],description:'A coherent five-course alternative emphasizes orbital motion, navigation, mission design and propulsion. It meets the published four-course astrodynamics pattern without depending on MAE 184’s disputed listing.'},
  {title:'Thermal branch',courseCodes:['MAE 101C','MAE 101D','MAE 110','MAE 114','MAE 185'],description:'Four of these meet the aerothermodynamics pattern with MAE 101C as anchor; the fifth is an approved listed choice. This gives more thermal/fluids depth and less robotics practice.'}
 ],
 notes:[
  'For Flight Dynamics and Controls, use MAE 184 plus any three of MAE 108/130/144/145/146/148/200. The fifth elective may be another approved specialization or general TE choice.',
  'A particular elective is a choice; completing five approved slots is a degree requirement. Five classes are not added on top of another five unspecified slots.',
  'These are current approved choices, not guaranteed 2030–33 offerings. Check annual offerings and approval before scheduling; MAE upper-division courses may run only once a year.',
  'MAE 145 requires senior standing on the ordinary route. MAE 144 requires control preparation. MAE 148 additionally requires department approval.',
  'Graduate courses on specialization lists are optional advanced branches with enrollment restrictions; no graduate class is in this default.',
  'MAE 108 and MATH 180A are overlapping introductory probability credit. Do not add both to increase the earned-unit total.'
 ],sourceIds:['journey-degree','journey-specializations','journey-mae']
};

const row=(id,title,courseCodes,type,description,sourceIds)=>({
 id,title,courseCodes,type,description,sourceIds,
 ...(['syn100','hum100','language-one','language-two','dei'].includes(id)?{planCodes:[...courseCodes],addsUnits:true}:{}),
 ...(['high-impact','math','science'].includes(id)?{planCodes:[],addsUnits:false}:{}),
 ...(id==='dei'?{planCondition:'Include the named fallback only while accepted DEI credit remains unconfirmed; remove it when the audit confirms satisfaction.'}:{}),
 ...(id.startsWith('language-')&&courseCodes.length?{planCondition:'Reference assumption: no optional LOTE certification, no accepted prior language, and beginner Spanish placement.'}:{})
});
const universityRows=()=>[
 row('dei','DEI: ANTH 21 only if still needed',['ANTH 21'],'condition','One approved four-quarter-unit DEI course remains unless accepted transfer equivalency already clears it. ANTH 21 is the default fallback; MGT 18 is an alternative. MAS 110 meeting Cal-GETC ethnic studies does not by itself prove UCSD DEI completion.',['journey-dei','journey-dei-transfer']),
 row('climate','Climate requirement: currently exempt for incoming transfers',[],'condition','The dedicated current policy exempts incoming transfer students. No extra climate course is added. Recheck the policy for the actual admission cohort.',['journey-climate']),
 row('hss','Arts, humanities and social sciences: 24 quarter units total',[],'condition','Count eligible accepted transfer and UCSD work toward the same 24-quarter-unit major minimum. Do not add a fresh 24-unit block on top of already-counted GE. The catalog excludes accounting, industrial management, finance and personnel administration; not every course labeled management qualifies.',['journey-degree']),
 row('university','Other university conditions and accepted prior work',[],'condition','Entry Level Writing, American History and Institutions, the 180-quarter-unit degree minimum, at least 60 upper-division units, residence and grade requirements still apply. These are audit conditions, not invented extra classes. College/major overlap earns units once.',['journey-seventh-catalog','journey-revelle'])
];
const seventhRows = [
 row('syn100','SYN 100: one required university course',['SYN 100'],'required','Four quarter units, letter grade, at UCSD. Published transfer guidance preauthorizes enrollment starting winter of the first UCSD year; do not add SYN 1/2 solely because the general catalog displays their prerequisite chain.',['journey-seventh','journey-syn']),
 row('high-impact','High-impact: already in the aerospace core',['MAE 155A'],'required','Use MAE 155A, explicitly listed as an approved high-impact course. It earns its four units once while meeting both requirements. MAE 148 is another approved example; SYN 150 is an optional alternative before SYN 100.',['journey-seventh'])
];
const revellePrep = [
 row('math','Mathematics: use accepted engineering preparation',['MATH 20A','MATH 20B','MATH 20C'],'condition','The approved quarter route is calculus plus two listed mathematics courses; MATH 20A/20B/20C meet that pattern. Revelle also explicitly accepts two semesters of calculus. Accepted Southwestern preparation can supply the requirement without repeating UCSD classes.',['journey-revelle','journey-revelle-transfer','journey-revelle-math']),
 row('science','Three sciences across the required disciplines',['CHEM 6A','PHYS 2A','PHYS 2B'],'condition','From fall 2026 the transfer rule requires three approved sciences, with two courses from different disciplines among biology, chemistry and physics. CHEM 6A and PHYS 2A/2B appear on the approved list and supply chemistry plus physics. Accepted transfer equivalents count toward the same requirement.',['journey-revelle','journey-revelle-science']),
 row('hum100','HUM 100: one required university humanities course',['HUM 100'],'required','Revelle transfers must complete this four-quarter-unit upper-division course for a letter grade; the college encourages completion in the first UCSD year. It is not added in the Seventh scenario.',['journey-revelle','journey-revelle-transfer','journey-hum'])
];
export const collegeScenarios = [
 {
  id:'seventh-calgetc',title:'Seventh + Cal-GETC — reference example, recognition pending',certification:'Cal-GETC',
  summary:'Known fixed work: SYN 100. High-impact overlaps MAE 155A. Seventh’s current pages describe IGETC but do not explicitly grant the same lower-division waiver to Cal-GETC; this example therefore keeps that recognition question open.',
  rows:[...seventhRows,row('calgetc-recognition','Specific open question: lower-division Cal-GETC recognition',[],'condition','The published baseline is SYN 1/2 plus two courses in each of arts, humanities, natural sciences/engineering, quantitative reasoning and social sciences, with accepted transfer work applied. The planned ART 104, PHIL 120, PSYC C1000, ECON C2001, writing and technical courses supply concrete work to evaluate. If recognition is course-by-course rather than a complete waiver, a second arts/humanities selection or writing evaluation could remain; do not declare those areas cleared or add speculative courses as mandatory. Obtain the college’s actual Cal-GETC decision before treating this scenario as complete.',['journey-seventh','journey-seventh-catalog']),...universityRows()],
  notes:['This is a reference college, not a claim that Chris has selected or been admitted to Seventh.','The uncertainty is the Cal-GETC lower-division waiver, not whether SYN 100 and high-impact are required.','No additional high-impact class is charged because MAE 155A already serves both purposes.'],sourceIds:['journey-seventh','journey-seventh-catalog','journey-syn','journey-dei','journey-climate']
 },
 {
  id:'seventh-igetc',title:'Seventh + certified IGETC',certification:'Full IGETC',
  summary:'The published full-IGETC scenario has SYN 100 plus high-impact; required MAE 155A supplies high-impact without a second enrollment.',
  rows:[row('igetc','Posted full IGETC certification',[],'condition','This scenario applies only to a student eligible for IGETC whose community-college certification is sent to UCSD and posted. It is not a substitution of IGETC for a new student’s Cal-GETC route.',['journey-seventh']),...seventhRows,...universityRows()],
  notes:['Partial IGETC is different: Seventh specifies one or two missing IGETC requirements in addition to SYN 100 and high-impact.','All requirements depend on accepted credit, not on marking a website checkbox.'],sourceIds:['journey-seventh','journey-syn','journey-dei','journey-climate']
 },
 {
  id:'revelle-calgetc',title:'Revelle + Cal-GETC, without optional LOTE',certification:'Cal-GETC without LOTE',
  summary:'Accepted engineering preparation can cover mathematics and science. HUM 100 remains, plus two language levels under the current fall-2026 transfer rule if language has not already been satisfied.',
  rows:[row('lower-ge','Cal-GETC lower-division humanities/social-science/fine-arts waiver',[],'condition','The current Revelle catalog explicitly grants these waivers to certified Cal-GETC transfers. Math, natural science, transfer language and HUM 100 are separately retained.',['journey-revelle']),...revellePrep,row('language-one','Language example, quarter one: Spanish level 1A',['LISP 1A','LISP 1AX'],'choice','For a beginner with no prior Spanish, enroll in conversation and analysis together: 2.5+2.5=5 quarter units. This is one linked language level, not two completed quarters. Prior study changes placement.',['journey-revelle','journey-languages']),row('language-two','Language example, quarter two: Spanish level 1B',['LISP 1B','LISP 1BX'],'choice','Continue the paired sequence for another 5 quarter units after the stated grades in 1A/1AX. These two completed language levels illustrate the two-quarter transfer language requirement; an accepted prior language route can remove this additional coursework.',['journey-revelle','journey-languages']),...universityRows()],
  notes:['This is a complete reference example, not a statement that Chris has selected or been admitted to Revelle.','The two-quarter transfer rule is distinct from Revelle’s longer first-year-student language proficiency sequence.','Language examples are choices, not a claim that Spanish is mandatory. The example assumes no prior Spanish, no optional LOTE certification and no accepted prior language.','The two linked pairs total 10 quarter units; do not count each 2.5-unit component as a separate language level.'],sourceIds:['journey-revelle','journey-revelle-transfer','journey-hum','journey-languages','journey-dei','journey-climate']
 },
 {
  id:'revelle-calgetc-lote',title:'Revelle + Cal-GETC with optional LOTE certified',certification:'Cal-GETC + LOTE',
  summary:'The current language exception applies with the optional LOTE certification. HUM 100 remains; accepted engineering preparation can cover the retained mathematics and science requirements.',
  rows:[...revellePrep,row('language-certified','Language: optional LOTE certification exception',[],'condition','The fall-2026 rule exempts Cal-GETC transfers with optional LOTE certification from the two-course transfer language requirement. The certification must actually be present; general Spanish experience is not the same evidence.',['journey-revelle']),...universityRows()],notes:['Cal-GETC alone and Cal-GETC with optional LOTE have different consequences at Revelle.','Do not add language courses when the certified exception already applies.'],sourceIds:['journey-revelle','journey-hum','journey-dei','journey-climate']
 },
 {
  id:'revelle-igetc',title:'Revelle + certified IGETC',certification:'Full IGETC',
  summary:'IGETC waives lower-division humanities, social science, fine arts and language. Revelle still requires mathematics, natural science and HUM 100; accepted major preparation can cover the first two.',
  rows:[...revellePrep,row('igetc-waivers','IGETC waivers include language',[],'condition','Use the current Revelle full-IGETC transfer rule only if eligible and certified. This is not identical to Cal-GETC without LOTE.',['journey-revelle']),...universityRows()],notes:['HUM 100 applies to all Revelle transfers under the rule effective fall 2024.','This scenario does not require a second language sequence merely because the generic first-year GE page lists one.'],sourceIds:['journey-revelle','journey-hum','journey-dei','journey-climate']
 }
];

export const defaultCollegeScenarioId = 'revelle-calgetc';

export const formalSpecializations = [
 {id:'astrodynamics',title:'Astrodynamics and Space Applications',required:['MAE 180'],choose:3,options:['MAE 108','MAE 114','MAE 181','MAE 182','MAE 184','MAE 240'],sourceIds:['journey-degree','journey-specializations'],notes:['MAE 184 appears on the department specialization page but is absent from the current catalog astrodynamics list. Confirm before relying on it for this specialization. The proposed astrodynamics branch avoids this discrepancy.','MAE 240 requires graduate standing in the catalog; its listing is not enrollment permission.']},
 {id:'aerothermodynamics',title:'Aerothermodynamics',required:['MAE 101C'],choose:3,options:['MAE 101D','MAE 110','MAE 114','MAE 184','MAE 185','MAE 201','MAE 202','MAE 212'],sourceIds:['journey-degree','journey-specializations'],notes:['MAE 201, 202 and 212 require instructor consent for nongraduate students.']},
 {id:'flight-controls',title:'Flight Dynamics and Controls',required:['MAE 184'],choose:3,options:['MAE 108','MAE 130','MAE 144','MAE 145','MAE 146','MAE 148','MAE 200'],sourceIds:['journey-degree','journey-specializations'],notes:['MAE 200 requires instructor consent for nongraduate students.','Any formal specialization uses four of the five degree TE slots; a fifth approved TE remains required.']}
];
