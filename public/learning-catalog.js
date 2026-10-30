import {missions as foundations,pathways as foundationStages} from './learning-data.js';
import {explorations,curriculumRoutes} from './journey-curriculum.js';
export {curriculumRoutes};
const foundationSubjects={units:'Units and dimensions',ratios:'Ratios and yield',algebra:'Algebra',slope:'Graphs and rates',trigonometry:'Trigonometry',vectors:'Vectors',derivative:'Differential calculus',integral:'Integral calculus',uncertainty:'Measurement uncertainty',exponential:'Exponential change',writing:'Technical writing',research:'Research and evidence',history:'History and industry',ethics:'Engineering ethics',economics:'Engineering economics',communication:'Communication'};
export const allMissions=[...foundations.map(m=>({...m,subject:foundationSubjects[m.id]})),...explorations.map(m=>({...m,track:'engineering'}))];
export const learningStages=[...foundationStages,
 {id:'engineering-language',title:'Model a physical system',description:'Preview the languages of engineering: code, coordinates, differential equations, equilibrium, motion, and material behavior. The prerequisites show where to return when you need more grounding.',missionIds:explorations.slice(0,6).map(m=>m.id)},
 {id:'engineering-behavior',title:'Make the behavior dependable',description:'Move from a nominal answer to a useful mechanism. Investigate stress, vibration, feedback, sensing, electrical behavior, and the geometry that makes parts fit.',missionIds:explorations.slice(6,12).map(m=>m.id)},
 {id:'engineering-systems',title:'Connect the whole machine',description:'Follow heat, energy, fluid motion, orbits, production evidence, and interfaces. These are conceptual previews to grow into alongside formal study.',missionIds:explorations.slice(12).map(m=>m.id)}
];
