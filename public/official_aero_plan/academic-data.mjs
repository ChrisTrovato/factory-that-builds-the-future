// Academic evidence ledger and browser-compatible normalized planning data.
// Generated research ledger is embedded below so the application has no runtime fetch dependency.
import { normalizeCode } from './engine.mjs';

export const academic = {
  "checked": "2026-10-31",
  "scope": "Academic planning baseline, not an official credit evaluation. Future catalog years and sections require rechecking.",
  "sources": [
    {
      "id": "ucsd-screening",
      "institution": "UC San Diego Admissions",
      "title": "Transfer major preparation",
      "url": "https://admissions.ucsd.edu/transfer/transfer-major-preparation.html",
      "year": "Current page checked 2026-10-31",
      "status": "verified-primary",
      "use": "Admission screening and grade/deadline rules"
    },
    {
      "id": "ucsd-math",
      "institution": "UC San Diego",
      "title": "Mathematics course descriptions",
      "url": "https://catalog.ucsd.edu/courses/MATH.html",
      "year": "2026–27",
      "status": "verified-primary",
      "use": "Lower-division degree math names, units and common prerequisites"
    },
    {
      "id": "ucsd-physics",
      "institution": "UC San Diego",
      "title": "Physics course descriptions",
      "url": "https://catalog.ucsd.edu/courses/PHYS.html",
      "year": "2026–27",
      "status": "verified-primary",
      "use": "Lower-division physics names, units and common prerequisites"
    },
    {
      "id": "ucsd-chemistry",
      "institution": "UC San Diego",
      "title": "Chemistry course descriptions",
      "url": "https://catalog.ucsd.edu/courses/CHEM.html",
      "year": "2026–27",
      "status": "verified-primary",
      "use": "CHEM 6A units, placement alternatives and CHEM 6AH substitution"
    },
    {
      "id": "ucsd-transfer",
      "institution": "UC San Diego Admissions",
      "title": "Transfer application requirements",
      "url": "https://admissions.ucsd.edu/transfer/application-requirements.html",
      "year": "Current page checked 2026-10-31",
      "status": "verified-primary",
      "use": "60 semester units, seven-course pattern, GPA minimums"
    },
    {
      "id": "ucsd-program",
      "institution": "UC San Diego MAE",
      "title": "Aerospace Engineering",
      "url": "https://mae.ucsd.edu/undergrad/aerospace-engineering",
      "year": "FA23 curriculum links currently published",
      "status": "verified-primary",
      "use": "ABET and explicit three-year transfer plan"
    },
    {
      "id": "ucsd-plan",
      "institution": "UC San Diego MAE",
      "title": "Aerospace Engineering three-year transfer plan",
      "url": "https://mae.ucsd.edu/sites/default/files/uploads/AE%203.pdf",
      "year": "FA23 catalog; reviewed May 2025; currently linked",
      "status": "verified-primary-historical-template",
      "use": "Illustrative nine-quarter sequence; not future section availability"
    },
    {
      "id": "ucsd-prereq",
      "institution": "UC San Diego MAE",
      "title": "Aerospace prerequisite guide",
      "url": "https://mae.ucsd.edu/sites/default/files/uploads/AE%20Course%20list%20w%20prereqs%20by%20major%20FA23_Feb2025%20(3).pdf",
      "year": "Reviewed May 2025",
      "status": "verified-primary-historical-template",
      "use": "Common aerospace prerequisite route; use current catalog for alternatives"
    },
    {
      "id": "ucsd-catalog",
      "institution": "UC San Diego",
      "title": "MAE undergraduate catalog",
      "url": "https://catalog.ucsd.edu/curric/MAE-ug.html",
      "year": "2026–27",
      "status": "verified-primary",
      "use": "Degree core, technical electives and program policy"
    },
    {
      "id": "ucsd-courses",
      "institution": "UC San Diego",
      "title": "MAE course descriptions",
      "url": "https://catalog.ucsd.edu/courses/MAE.html",
      "year": "2026–27",
      "status": "verified-primary",
      "use": "Course titles, units, prerequisites"
    },
    {
      "id": "ucsd-se",
      "institution": "UC San Diego",
      "title": "Structural Engineering course descriptions",
      "url": "https://catalog.ucsd.edu/courses/SE.html",
      "year": "2026–27",
      "status": "verified-primary",
      "use": "SE 160A alternatives"
    },
    {
      "id": "ucsd-offerings",
      "institution": "UC San Diego MAE",
      "title": "MAE course offerings",
      "url": "https://mae.ucsd.edu/courses",
      "year": "2026–27",
      "status": "verified-primary",
      "use": "Current annual offerings; no guarantee for 2030+"
    },
    {
      "id": "ucsd-specializations",
      "institution": "UC San Diego MAE",
      "title": "Aerospace Engineering specializations",
      "url": "https://mae.ucsd.edu/undergrad/aero-eng-specializations",
      "year": "Current page checked 2026-10-31",
      "status": "verified-primary",
      "use": "Three optional specializations, electives, declaration timing"
    },
    {
      "id": "swc-math",
      "institution": "Southwestern College",
      "title": "Mathematics course descriptions",
      "url": "https://catalog.swccd.edu/course-descriptions/math/",
      "year": "2026–27",
      "status": "official-search-index-verified",
      "use": "Math prerequisites, units, entry alternatives; direct page bot-gated"
    },
    {
      "id": "swc-physics",
      "institution": "Southwestern College",
      "title": "Physics course descriptions",
      "url": "https://catalog.swccd.edu/course-descriptions/phys/",
      "year": "2026–27",
      "status": "official-search-index-verified",
      "use": "Physics chain and corequisites; direct page bot-gated"
    },
    {
      "id": "swc-engineering",
      "institution": "Southwestern College",
      "title": "Engineering course descriptions",
      "url": "https://catalog.swccd.edu/course-descriptions/engr/",
      "year": "2026–27",
      "status": "official-search-index-verified",
      "use": "MATLAB, mechanics and engineering math prerequisites"
    },
    {
      "id": "swc-chemistry",
      "institution": "Southwestern College",
      "title": "Chemistry course descriptions",
      "url": "https://catalog.swccd.edu/course-descriptions/chem/",
      "year": "2026–27",
      "status": "official-search-index-verified",
      "use": "CHEM 170/200 prerequisites and contact hours"
    },
    {
      "id": "swc-aliases",
      "institution": "Southwestern College",
      "title": "Common Course Numbering",
      "url": "https://catalog.swccd.edu/ccn/",
      "year": "2025–26 and 2026–27 transitions",
      "status": "official-search-index-verified",
      "use": "Avoid counting old and new course codes twice"
    },
    {
      "id": "assist-aero",
      "institution": "ASSIST",
      "title": "Southwestern to UC San Diego Aerospace Engineering B.S.",
      "url": "https://assist.org/transfer/results?year=77&institution=138&agreement=7&agreementType=to&viewAgreementsOptions=true&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=77%2F138%2Fto%2F7%2FMajor%2F082ebebd-b31d-4525-4865-08def1776a55",
      "year": "2026–27",
      "status": "verified-primary",
      "use": "Articulation agreement verified live in Chrome by parent agent: correct year, institutions, degree and all listed mappings.",
      "checked": "2026-10-31"
    },
    {
      "id": "swc-schedule",
      "institution": "Southwestern College",
      "title": "Class Schedule",
      "url": "https://www.swccd.edu/classes-and-registration/class-schedule/",
      "year": "Spring 2027",
      "status": "verified-primary",
      "use": "Term dates and registration cohorts; seats and personal appointment unknown"
    },
    {
      "id": "swc-fees",
      "institution": "Southwestern College",
      "title": "Tuition and fees",
      "url": "https://www.swccd.edu/admissions-and-financial-aid/tuition-and-fees/",
      "year": "Current page checked 2026-10-31",
      "status": "verified-primary",
      "use": "$46/unit enrollment baseline, not total attendance cost"
    },
    {
      "id": "ucsd-parttime",
      "institution": "UC San Diego",
      "title": "Part-Time Study",
      "url": "https://students.ucsd.edu/academics/enroll/special-enrollment/parttime-halftime-study/part-time-study.html",
      "year": "Updated 2026-09-04",
      "status": "verified-primary",
      "use": "10-or-fewer-unit approved status; reapply each quarter"
    },
    {
      "id": "uc-calgetc",
      "institution": "University of California",
      "title": "Cal-GETC",
      "url": "https://admission.universityofcalifornia.edu/admission-requirements/transfer-requirements/preparing-to-transfer/general-education-igetc/cal-getc/",
      "year": "Current page checked 2026-10-31",
      "status": "verified-primary",
      "use": "General education is separate from major screening"
    },
    {
      "id": "ucsd-seventh",
      "institution": "UC San Diego",
      "title": "Seventh College catalog",
      "url": "https://catalog.ucsd.edu/undergraduate/colleges/seventh-college/index.html",
      "year": "2026–27",
      "status": "verified-primary",
      "use": "Example of remaining college obligations, units and residency"
    },
    {
      "id": "ucsd-revelle",
      "institution": "UC San Diego",
      "title": "Revelle College catalog",
      "url": "https://catalog.ucsd.edu/undergraduate/colleges/revelle-college/index.html",
      "year": "2026–27",
      "status": "verified-primary",
      "use": "Updated transfer GE rules; do not apply across all colleges"
    },
    {
      "id": "sdsu-gpa",
      "institution": "SDSU Admissions",
      "title": "Minimum GPA requirements",
      "url": "https://admissions.sdsu.edu/transfers/gpa-requirements",
      "year": "Fall 2027",
      "status": "verified-primary",
      "use": "Aerospace 2.70 minimum, not competitive prediction"
    },
    {
      "id": "sdsu-transfer",
      "institution": "SDSU Admissions",
      "title": "Minimum transfer requirements",
      "url": "https://admissions.sdsu.edu/transfers/minimum-requirements",
      "year": "Fall 2027",
      "status": "verified-primary",
      "use": "Separate CSU eligibility and Golden Four"
    },
    {
      "id": "sdsu-pathways",
      "institution": "SDSU Admissions",
      "title": "Transfer pathways",
      "url": "https://admissions.sdsu.edu/transfers/transfer-pathways",
      "year": "Fall 2027",
      "status": "verified-primary",
      "use": "Aerospace has no ADT pathway in current table; local guarantee and general pathway available with conditions"
    },
    {
      "id": "sdsu-accreditation",
      "institution": "SDSU Aerospace",
      "title": "Accreditation",
      "url": "https://aerospace.sdsu.edu/programs/undergraduate/accreditation",
      "year": "Current page; enrollment statistics on page historical",
      "status": "verified-primary",
      "use": "Department states undergraduate EAC/ABET accreditation"
    },
    {
      "id": "sdsu-organizations",
      "institution": "SDSU Aerospace",
      "title": "Student organizations",
      "url": "https://aerospace.sdsu.edu/student-orgs",
      "year": "Current page checked 2026-10-31",
      "status": "verified-primary",
      "use": "Rocket Project, Aztec Aerospace Design, ACOSE and AIAA leads"
    },
    {
      "id": "sdsu-department",
      "institution": "SDSU Aerospace",
      "title": "Aerospace Engineering department",
      "url": "https://aerospace.sdsu.edu/",
      "year": "Current page checked 2026-10-31",
      "status": "verified-primary",
      "use": "Local alternative and research themes"
    }
  ],
  "facts": [
    {
      "id": "three-years",
      "text": "UCSD publishes a three-year aerospace transfer plan. Preserve nine university quarters in baseline scenarios; transfer credit does not automatically shorten annual prerequisite chains.",
      "sourceIds": [
        "ucsd-program",
        "ucsd-plan"
      ],
      "kind": "official-department-guidance"
    },
    {
      "id": "screening",
      "text": "Required screening: MATH 18, 20A, 20B, 20C, 20D; CHEM 6A; PHYS 2A, 2B, 2C, 2CL. MAE 8 is recommended. Required screening courses need C or better and completion by spring before fall admission.",
      "sourceIds": [
        "ucsd-screening"
      ],
      "kind": "official-admission-policy"
    },
    {
      "id": "eligibility",
      "text": "UCSD minimum transfer eligibility includes 60 UC-transferable semester units or 90 quarter units, the seven-course pattern, and a 2.4 GPA for California residents or 2.8 for nonresidents. These are minimums; admission is not guaranteed.",
      "sourceIds": [
        "ucsd-transfer"
      ],
      "kind": "official-admission-policy"
    },
    {
      "id": "seven-course",
      "text": "The seven-course pattern comprises two English composition courses, one mathematical concepts/quantitative reasoning course, and four courses across at least two of arts/humanities, physical/biological sciences and social/behavioral sciences; grade C or better, with stated Pass equivalence permitted.",
      "sourceIds": [
        "ucsd-transfer"
      ],
      "kind": "official-admission-policy"
    },
    {
      "id": "math-entry",
      "text": "Math skill review and enrollment eligibility are different. Calculus I can follow MATH 244 OR both MATH 101 and 104, OR an accepted equivalent/college placement. Do not require every route or manufacture a remedial transcript ladder.",
      "sourceIds": [
        "swc-math"
      ],
      "kind": "official-catalog"
    },
    {
      "id": "first-term",
      "text": "Spring 2027 runs February 1–May 28. The public schedule lists new/returning-student registration from November 16 and open registration November 19. Confirm personal appointment, holds, placement and actual sections.",
      "sourceIds": [
        "swc-schedule"
      ],
      "kind": "current-cycle"
    },
    {
      "id": "part-time",
      "text": "UCSD part-time undergraduate status requires approval for 10 or fewer quarter units, can be based on employment, and must be requested every quarter. Approval is not automatic; academic sequencing and aid need separate review.",
      "sourceIds": [
        "ucsd-parttime"
      ],
      "kind": "official-policy"
    },
    {
      "id": "summer",
      "text": "Many UCSD upper-division MAE courses run once yearly. The department expressly warns that summer offerings are never guaranteed. A catalog offering pattern is not a reserved seat or a future section.",
      "sourceIds": [
        "ucsd-offerings"
      ],
      "kind": "official-department-guidance"
    },
    {
      "id": "cost",
      "text": "Southwestern currently lists a $46-per-unit enrollment fee; nonresident tuition and other charges may apply. Keep books, campus fees, transport, tools and income changes separate, and do not infer residency or aid.",
      "sourceIds": [
        "swc-fees"
      ],
      "kind": "current-fee-baseline"
    },
    {
      "id": "degree-layers",
      "text": "UCSD MAE degrees require at least 180 quarter units. University, college and major obligations all matter; for example Seventh also specifies 60 upper-division units and 35 of the final 45 units in UCSD residence. Check the eventual college and evaluation.",
      "sourceIds": [
        "ucsd-catalog",
        "ucsd-seventh"
      ],
      "kind": "official-degree-policy"
    }
  ],
  "aliases": {
    "MATH 250": "MATH C2210",
    "MATH 251": "MATH C2220",
    "ENGL 115": "ENGL C1000",
    "ENGL 116": "ENGL C1001",
    "COMM 104": "COMM C1000",
    "MATH 119": "STAT C1000"
  },
  "swcCourses": [
    {
      "id": "MATH 101",
      "title": "College Algebra",
      "units": 3,
      "prerequisiteNote": "College multiple-measures algebra proficiency; support may be required.",
      "source": "swc-math",
      "role": "Conditional preparation",
      "why": "Turn relationships into functions and make algebraic manipulation dependable."
    },
    {
      "id": "MATH 104",
      "title": "Trigonometry",
      "units": 3,
      "prerequisiteNote": "College multiple-measures algebra proficiency; support may be required.",
      "source": "swc-math",
      "role": "Conditional preparation",
      "why": "Resolve forces and describe directions, rotations and periodic motion."
    },
    {
      "id": "MATH 244",
      "title": "Pre-Calculus with Trigonometry",
      "units": 6,
      "prerequisiteNote": "College multiple-measures algebra proficiency.",
      "source": "swc-math",
      "role": "Alternative preparation route",
      "why": "Combine functions and trigonometry before calculus; an alternative to the 101+104 pair."
    },
    {
      "id": "MATH C2210",
      "title": "Calculus I: Early Transcendentals",
      "units": 5,
      "prerequisites": {
        "any": [
          "MATH 244",
          {
            "all": [
              "MATH 101",
              "MATH 104"
            ]
          },
          {
            "approval": "accepted equivalent or college placement"
          }
        ]
      },
      "source": "swc-math",
      "role": "Admission preparation",
      "why": "Describe rates of change and accumulation: velocity, mass flow and work."
    },
    {
      "id": "MATH C2220",
      "title": "Calculus II: Early Transcendentals",
      "units": 4,
      "prerequisites": {
        "any": [
          "MATH C2210",
          {
            "approval": "accepted equivalent or college placement"
          }
        ]
      },
      "source": "swc-math",
      "role": "Admission preparation",
      "why": "Develop integration tools and approximation methods for physical models."
    },
    {
      "id": "MATH 252",
      "title": "Analytic Geometry and Calculus III",
      "units": 4,
      "prerequisites": {
        "any": [
          "MATH C2220",
          {
            "approval": "accepted equivalent"
          }
        ]
      },
      "source": "swc-math",
      "role": "Admission and degree preparation",
      "why": "Model fields and surfaces in three dimensions. One course may satisfy two destination requirements; count its credits once."
    },
    {
      "id": "MATH 253",
      "title": "Introduction to Differential Equations",
      "units": 3,
      "prerequisites": {
        "any": [
          "MATH C2220",
          {
            "approval": "accepted equivalent"
          }
        ]
      },
      "source": "swc-math",
      "role": "Alternative admission route",
      "why": "Express how a system evolves: vibration, cooling and feedback."
    },
    {
      "id": "MATH 254",
      "title": "Introduction to Linear Algebra",
      "units": 3,
      "prerequisites": {
        "any": [
          "MATH C2220",
          {
            "approval": "accepted equivalent"
          }
        ]
      },
      "source": "swc-math",
      "role": "Admission preparation",
      "why": "Work with coupled equations, coordinate transforms and system modes."
    },
    {
      "id": "PHYS 270",
      "title": "Principles of Physics I",
      "units": 4,
      "prerequisites": {
        "any": [
          "MATH C2210",
          {
            "approval": "accepted equivalent or college placement"
          }
        ]
      },
      "source": "swc-physics",
      "role": "Admission preparation",
      "why": "Connect force, momentum and energy to the motion of actual objects."
    },
    {
      "id": "PHYS 272",
      "title": "Principles of Physics II",
      "units": 4,
      "prerequisites": {
        "all": [
          "PHYS 270",
          "MATH C2220"
        ]
      },
      "prerequisiteNote": "Accepted equivalents/placement as specified by catalog can apply.",
      "source": "swc-physics",
      "role": "Admission preparation",
      "why": "Understand electrical and magnetic effects used in sensing and actuation."
    },
    {
      "id": "PHYS 273",
      "title": "Principles of Physics Laboratory II",
      "units": 1,
      "corequisites": {
        "any": [
          "PHYS 272",
          {
            "approval": "PHYS 272 already completed"
          }
        ]
      },
      "contactHours": 3,
      "source": "swc-physics",
      "role": "Admission preparation",
      "why": "Make measurement, uncertainty and laboratory evidence part of your reasoning."
    },
    {
      "id": "PHYS 274",
      "title": "Principles of Physics III",
      "units": 4,
      "prerequisites": {
        "any": [
          "PHYS 272",
          {
            "approval": "accepted equivalent"
          }
        ]
      },
      "corequisites": {
        "any": [
          "MATH 252",
          {
            "approval": "MATH 252 already completed"
          }
        ]
      },
      "source": "swc-physics",
      "role": "Admission preparation",
      "why": "Connect thermal behavior, waves and optics to engineering systems."
    },
    {
      "id": "CHEM 170",
      "title": "Preparation for General Chemistry",
      "units": 4,
      "prerequisiteNote": "College multiple-measures intermediate algebra proficiency.",
      "contactHours": 6,
      "source": "swc-chemistry",
      "role": "Conditional prerequisite",
      "why": "Build chemical reasoning and laboratory habits before the more intensive sequence."
    },
    {
      "id": "CHEM 200",
      "title": "General Chemistry I",
      "units": 5,
      "prerequisites": {
        "any": [
          "CHEM 170",
          {
            "approval": "accepted chemistry equivalent"
          }
        ]
      },
      "prerequisiteNote": "Also requires intermediate algebra proficiency; college algebra/precalculus listed as recommended preparation.",
      "contactHours": 9,
      "source": "swc-chemistry",
      "role": "Admission preparation",
      "why": "Reason about matter, energy and material behavior; budget for substantial laboratory time."
    },
    {
      "id": "ENGR 221",
      "title": "Computer Programming and Applications — MATLAB",
      "units": 3,
      "prerequisites": {
        "any": [
          "MATH C2220",
          {
            "approval": "accepted equivalent or college placement"
          }
        ]
      },
      "contactHours": 5,
      "source": "swc-engineering",
      "role": "Recommended admission / degree preparation",
      "why": "Turn equations into checked, reproducible numerical experiments."
    },
    {
      "id": "ENGR 250",
      "title": "Engineering Statics",
      "units": 3,
      "prerequisites": {
        "all": [
          "MATH C2220",
          "PHYS 270"
        ]
      },
      "prerequisiteNote": "Accepted equivalents permitted.",
      "source": "swc-engineering",
      "role": "Degree preparation",
      "why": "Use force and moment balance to explain why a structure stays put."
    },
    {
      "id": "ENGR 251",
      "title": "Engineering Dynamics",
      "units": 3,
      "prerequisites": {
        "any": [
          "ENGR 250",
          {
            "approval": "accepted equivalent"
          }
        ]
      },
      "source": "swc-engineering",
      "role": "Degree preparation",
      "why": "Predict how mechanisms and rigid bodies move under forces."
    },
    {
      "id": "ENGR 280",
      "title": "Methods of Analysis",
      "units": 4,
      "prerequisites": {
        "any": [
          "MATH C2220",
          {
            "approval": "accepted equivalent"
          }
        ]
      },
      "typicalOffering": "Fall per catalog; verify actual section",
      "source": "swc-engineering",
      "role": "Alternative to MATH 253 for mapped MATH 20D",
      "why": "Study engineering mathematical methods, including differential equations and transforms; not automatically needed in addition to MATH 253."
    }
  ],
  "articulation": {
    "source": "assist-aero",
    "agreementYear": "2026–27",
    "from": "Southwestern College",
    "to": "UC San Diego",
    "major": "Aerospace Engineering B.S.",
    "status": "verified-primary",
    "rules": [
      {
        "all": [
          "MATH C2210"
        ],
        "satisfies": [
          "MATH 20A"
        ]
      },
      {
        "all": [
          "MATH C2220"
        ],
        "satisfies": [
          "MATH 20B"
        ]
      },
      {
        "all": [
          "MATH 252"
        ],
        "satisfies": [
          "MATH 20C",
          "MATH 20E"
        ]
      },
      {
        "all": [
          "MATH 254"
        ],
        "satisfies": [
          "MATH 18"
        ]
      },
      {
        "any": [
          "MATH 253",
          "ENGR 280"
        ],
        "satisfies": [
          "MATH 20D"
        ]
      },
      {
        "all": [
          "PHYS 270"
        ],
        "satisfies": [
          "PHYS 2A"
        ]
      },
      {
        "all": [
          "PHYS 272"
        ],
        "satisfies": [
          "PHYS 2B"
        ]
      },
      {
        "all": [
          "PHYS 273"
        ],
        "satisfies": [
          "PHYS 2CL"
        ]
      },
      {
        "all": [
          "PHYS 274"
        ],
        "satisfies": [
          "PHYS 2C"
        ]
      },
      {
        "all": [
          "CHEM 200"
        ],
        "satisfies": [
          "CHEM 6A"
        ]
      },
      {
        "all": [
          "ENGR 221"
        ],
        "satisfies": [
          "MAE 8"
        ]
      },
      {
        "all": [
          "ENGR 250",
          "ENGR 251"
        ],
        "satisfies": [
          "MAE 30A"
        ]
      },
      {
        "all": [
          "ENGR 251"
        ],
        "satisfies": [
          "MAE 30B"
        ]
      }
    ],
    "unarticulated": [
      {
        "id": "MAE 2",
        "note": "Complete at UCSD per live 2026–27 agreement"
      },
      {
        "id": "MAE 11",
        "note": "No articulated SWC course in live 2026–27 agreement"
      },
      {
        "id": "MAE 21",
        "note": "No articulated SWC course in live 2026–27 agreement"
      }
    ],
    "engineRules": [
      "Canonicalize aliases before credit sums.",
      "Count each earned course once, even if it satisfies multiple requirements.",
      "Do not treat all alternative pathways as mandatory.",
      "Unknown grade/term/equivalency stays unknown, not officially satisfied.",
      "Pending petitions are not approved credit.",
      "Semester totals and quarter totals must remain explicitly separate."
    ],
    "checked": "2026-10-31"
  },
  "ucsdLowerDivisionScience": [
    {
      "id": "MATH 18",
      "title": "Linear Algebra",
      "units": 4,
      "source": "ucsd-math",
      "commonRoutePrereqs": [],
      "prerequisiteNote": "Placement/AP/MATH 4C, 10A or 20A routes; consent alternative. Do not import SWC prerequisites into UCSD course records.",
      "why": "Coordinate transformations and interacting equations."
    },
    {
      "id": "MATH 20A",
      "title": "Calculus for Science and Engineering",
      "units": 4,
      "source": "ucsd-math",
      "commonRoutePrereqs": [],
      "prerequisiteNote": "Placement/AP/MATH 4C or MATH 10A routes.",
      "why": "Rates and accumulation."
    },
    {
      "id": "MATH 20B",
      "title": "Calculus for Science and Engineering",
      "units": 4,
      "source": "ucsd-math",
      "commonRoutePrereqs": [
        "MATH 20A"
      ],
      "prerequisiteNote": "C– or better in ordinary course route; AP and other listed alternatives exist.",
      "why": "Integration and series."
    },
    {
      "id": "MATH 20C",
      "title": "Calculus and Analytic Geometry for Science and Engineering",
      "units": 4,
      "source": "ucsd-math",
      "commonRoutePrereqs": [
        "MATH 20B"
      ],
      "prerequisiteNote": "C– or better in course route; listed AP alternative.",
      "why": "Functions and geometry in more than one dimension."
    },
    {
      "id": "MATH 20D",
      "title": "Introduction to Differential Equations",
      "units": 4,
      "source": "ucsd-math",
      "commonRoutePrereqs": [
        "MATH 20C",
        "MATH 18"
      ],
      "prerequisiteNote": "Current 2026–27 catalog requires both calculus and linear-algebra branches with C– or better; honors/consent alternatives exist.",
      "why": "Mathematical descriptions of change."
    },
    {
      "id": "MATH 20E",
      "title": "Vector Calculus",
      "units": 4,
      "source": "ucsd-math",
      "commonRoutePrereqs": [
        "MATH 20C",
        "MATH 18"
      ],
      "prerequisiteNote": "C– or better; listed honors alternatives exist.",
      "why": "Flux, circulation and fields.",
      "role": "Degree requirement, not separately on current aerospace screening list"
    },
    {
      "id": "PHYS 2A",
      "title": "Physics—Mechanics",
      "units": 4,
      "source": "ucsd-physics",
      "commonRoutePrereqs": [
        "MATH 20A"
      ],
      "prerequisiteNote": "Other math routes listed; MATH 20B concurrent or prior recommended.",
      "why": "Force, motion, energy and momentum."
    },
    {
      "id": "PHYS 2B",
      "title": "Physics—Electricity and Magnetism",
      "units": 4,
      "source": "ucsd-physics",
      "commonRoutePrereqs": [
        "PHYS 2A",
        "MATH 20B"
      ],
      "why": "Fields, circuits and electromagnetic effects."
    },
    {
      "id": "PHYS 2C",
      "title": "Physics—Fluids, Waves, Thermodynamics, and Optics",
      "units": 4,
      "source": "ucsd-physics",
      "commonRoutePrereqs": [
        "PHYS 2A",
        "MATH 20C"
      ],
      "prerequisiteNote": "PHYS 2B prior completion strongly recommended, not listed as a prerequisite here; do not substitute this rule for SWC PHYS 274.",
      "why": "Waves and energy transport."
    },
    {
      "id": "PHYS 2CL",
      "title": "Physics Laboratory—Electricity and Magnetism",
      "units": 2,
      "source": "ucsd-physics",
      "commonRoutePrereqs": [
        "PHYS 2A",
        "PHYS 2B"
      ],
      "why": "Measurements and experimental uncertainty."
    },
    {
      "id": "CHEM 6A",
      "title": "General Chemistry I",
      "units": 4,
      "source": "ucsd-chemistry",
      "commonRoutePrereqs": [],
      "prerequisiteNote": "CHEM 4, AP, placement, or math routes in catalog; CHEM 6AH satisfies degree substitution per MAE catalog.",
      "why": "Matter, chemical relationships and physical properties."
    }
  ],
  "ucsdCoreCourses": [
    {
      "id": "MAE 2",
      "title": "Introduction to Aerospace Engineering",
      "units": 4,
      "commonRoutePrereqs": [],
      "why": "Learn how the aircraft or spacecraft fits together before specializing."
    },
    {
      "id": "MAE 8",
      "title": "MATLAB Programming for Engineering Analysis",
      "units": 4,
      "commonRoutePrereqs": [
        "MATH 20A",
        "MATH 20B"
      ],
      "why": "Implement models and make calculations reproducible."
    },
    {
      "id": "MAE 11",
      "title": "Thermodynamics",
      "units": 4,
      "commonRoutePrereqs": [
        "PHYS 2C",
        "CHEM 6A"
      ],
      "why": "Account for energy, work and heat in physical systems."
    },
    {
      "id": "MAE 21",
      "title": "Aerospace Materials Science",
      "units": 4,
      "commonRoutePrereqs": [
        "PHYS 2A",
        "CHEM 6A",
        "MATH 20B"
      ],
      "why": "Connect material structure to useful behavior and failure."
    },
    {
      "id": "MAE 30A",
      "title": "Statics and Introduction to Dynamics",
      "units": 4,
      "commonRoutePrereqs": [
        "MATH 20C",
        "PHYS 2A"
      ],
      "why": "Build load paths and free-body models."
    },
    {
      "id": "MAE 30B",
      "title": "Dynamics and Vibrations",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 30A"
      ],
      "why": "Predict motion and oscillation of assemblies."
    },
    {
      "id": "MAE 101A",
      "title": "Introductory Fluid Mechanics",
      "units": 4,
      "commonRoutePrereqs": [
        "PHYS 2A",
        "MATH 20D",
        "MATH 20E"
      ],
      "why": "Translate conservation laws into flowing-system models."
    },
    {
      "id": "MAE 101B",
      "title": "Advanced Fluid Mechanics",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 101A",
        "MAE 11"
      ],
      "why": "Study flow features that determine drag and performance."
    },
    {
      "id": "MAE 104",
      "title": "Aerodynamics",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 101A",
        "MAE 101B"
      ],
      "why": "Connect flow to forces and moments on a vehicle."
    },
    {
      "id": "MAE 105",
      "title": "Introduction to Mathematical Physics",
      "units": 4,
      "commonRoutePrereqs": [
        "PHYS 2A",
        "PHYS 2B",
        "MATH 20D"
      ],
      "why": "Use mathematical tools for waves, vibration and diffusion."
    },
    {
      "id": "MAE 107",
      "title": "Computational Methods in Engineering",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 8",
        "MATH 18"
      ],
      "why": "Understand the error and limitations inside numerical answers."
    },
    {
      "id": "MAE 113",
      "title": "Fundamentals of Propulsion",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 11",
        "MAE 101A",
        "MAE 101B"
      ],
      "why": "Connect thermal and fluid reasoning to propulsion performance."
    },
    {
      "id": "MAE 131A",
      "title": "Solid Mechanics I",
      "units": 4,
      "commonRoutePrereqs": [
        "MATH 20D",
        "MAE 30A"
      ],
      "why": "Predict deformation and stress instead of judging strength by appearance."
    },
    {
      "id": "MAE 142",
      "title": "Dynamics and Control of Aerospace Vehicles",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 104",
        "MAE 143B"
      ],
      "why": "Explain the behavior of a vehicle and influence it through feedback."
    },
    {
      "id": "MAE 143A",
      "title": "Signals and Systems",
      "units": 4,
      "commonRoutePrereqs": [
        "MATH 20D",
        "MATH 20E",
        "MATH 18"
      ],
      "why": "Describe system behavior using states, inputs and outputs."
    },
    {
      "id": "MAE 143B",
      "title": "Linear Control",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 143A"
      ],
      "why": "Design and assess feedback with explicit stability and performance tradeoffs."
    },
    {
      "id": "MAE 155A",
      "title": "Aerospace Engineering Design I",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 2",
        "MAE 21",
        "MAE 30B",
        "MAE 104",
        "SE 160A"
      ],
      "why": "Integrate requirements and disciplines into a coherent vehicle design."
    },
    {
      "id": "MAE 155B",
      "title": "Aerospace Engineering Design II",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 113",
        "MAE 142",
        "MAE 155A",
        "MAE 170"
      ],
      "why": "Carry a team design through evidence, iteration and communication."
    },
    {
      "id": "MAE 170",
      "title": "Experimental Techniques",
      "units": 4,
      "commonRoutePrereqs": [
        "PHYS 2C",
        "PHYS 2CL"
      ],
      "why": "Build an experiment that can actually challenge your model."
    },
    {
      "id": "MAE 175A",
      "title": "Aerospace Engineering Laboratory I",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 143B",
        "MAE 170"
      ],
      "extraCondition": "Senior standing or approved consent route per catalog.",
      "why": "Analyze aerospace experiments and defend conclusions from measurements."
    },
    {
      "id": "SE 160A",
      "title": "Aerospace Structural Mechanics I",
      "units": 4,
      "commonRoutePrereqs": [
        "MAE 21",
        "MAE 30B",
        "MAE 131A"
      ],
      "source": "ucsd-se",
      "why": "Reason about lightweight structural systems and interacting loads."
    }
  ],
  "ucsdCoreNotes": "All units above are quarter units. Common-route prerequisites show the ordinary aerospace path, not every catalog equivalency or consent route. Current catalog contains alternatives; inspect course source before an exceptional enrollment. Required MATH/CHEM/PHYS, five approved technical electives, college GE and university obligations are additional layers. Course-purpose text is original educational interpretation.",
  "transferGrid": [
    {
      "year": 1,
      "fall": [
        "MAE 2",
        "MAE 8",
        "MAE 21"
      ],
      "winter": [
        "MATH 20E",
        "MAE 30A",
        "GE"
      ],
      "spring": [
        "MAE 30B",
        "MAE 131A",
        "TE",
        "GE"
      ]
    },
    {
      "year": 2,
      "fall": [
        "MAE 11",
        "MAE 101A",
        "MAE 105",
        "MAE 107"
      ],
      "winter": [
        "MAE 101B",
        "MAE 143A",
        "SE 160A",
        "TE"
      ],
      "spring": [
        "MAE 104",
        "MAE 143B",
        "MAE 170",
        "GE"
      ]
    },
    {
      "year": 3,
      "fall": [
        "MAE 113",
        "MAE 142",
        "TE",
        "GE"
      ],
      "winter": [
        "MAE 155A",
        "MAE 175A",
        "TE",
        "GE"
      ],
      "spring": [
        "MAE 155B",
        "TE",
        "GE",
        "GE"
      ]
    }
  ],
  "transferGridNotes": "Read as department template, not personal degree audit. Verify the GE placement against source grid when laying out; GE requirements depend on college and certified credit. Remove credited MAE 8, 30A, 30B and MATH 20E only after confirmed equivalencies; keep downstream availability checks. Source: ucsd-plan.",
  "specializations": [
    {
      "name": "Astrodynamics and Space Applications",
      "anchor": "MAE 180",
      "chooseThree": [
        "MAE 108",
        "MAE 114",
        "MAE 181",
        "MAE 182",
        "MAE 240"
      ],
      "departmentAdditionalOption": "MAE 184 appears on department list but not catalog list; confirm before relying on it.",
      "work": "Orbits, mission architecture, spacecraft navigation and trajectories.",
      "trap": "MAE 182 has no offering shown in 2026–27. MAE 114 requires MAE 113, and both currently appear only in fall."
    },
    {
      "name": "Aerothermodynamics",
      "anchor": "MAE 101C",
      "chooseThree": [
        "MAE 101D",
        "MAE 110",
        "MAE 114",
        "MAE 184",
        "MAE 185",
        "MAE 201",
        "MAE 202",
        "MAE 212"
      ],
      "work": "Fluids, heating, cooling and thermal behavior in aerospace systems.",
      "trap": "MAE 101C is a specialization anchor, not a universal aerospace core requirement; its prerequisites include MAE 101A/B and 105."
    },
    {
      "name": "Flight Dynamics and Controls",
      "anchor": "MAE 184",
      "chooseThree": [
        "MAE 108",
        "MAE 130",
        "MAE 144",
        "MAE 145",
        "MAE 146",
        "MAE 148",
        "MAE 200"
      ],
      "work": "Stability, feedback, simulation and autonomous vehicle behavior.",
      "trap": "Enrollment priority, instructor permission and course preparation can constrain attractive robotics electives."
    }
  ],
  "specializationPolicy": {
    "optional": true,
    "maximum": 1,
    "technicalElectives": 5,
    "specializationElectives": 4,
    "planAtLeastYearsBeforeGraduation": 2,
    "declareAtLeastQuartersBeforeGraduation": 1,
    "notes": "The department says specialization appears on transcript and diploma and must fit the normal four-year/three-year-transfer period. Graduate electives on an approved list are not automatic enrollment permission. Source: ucsd-specializations."
  },
  "scenarioAssumptions": [
    {
      "name": "Earlier, conditional",
      "transferFall": 2029,
      "graduateSpring": 2032,
      "conditions": "Verified calculus readiness at spring 2027 entry; sequence completed by spring 2029; sufficient GE/60 transferable units; admission; sustainable load and sections; nine university quarters. Not proven merely by choosing a target date."
    },
    {
      "name": "Target journey",
      "transferFall": 2030,
      "graduateSpring": 2033,
      "conditions": "Manageable spring 2027 start, verified placement, steady math/physics progression, preparation and 60 units by spring 2030, application in preceding fall, admission, and full university sequence."
    },
    {
      "name": "More room to grow",
      "transferFall": 2031,
      "graduateSpring": 2034,
      "conditions": "More space for foundation work, paid work, repeats or unavailable sections. Preserve nine university quarters and update future degree requirements. A later finish can be the more sustainable plan."
    }
  ],
  "schoolComparison": [
    {
      "factor": "Degree and accreditation",
      "UCSD": "B.S. Aerospace Engineering; department confirms EAC/ABET.",
      "SDSU": "B.S. Aerospace Engineering; department confirms EAC/ABET.",
      "sources": [
        "ucsd-program",
        "sdsu-accreditation"
      ]
    },
    {
      "factor": "Transfer model",
      "UCSD": "Explicit three-year transfer plan; quarter calendar.",
      "SDSU": "Separate semester-based program and course audit required; do not promise two years from generic CSU rules.",
      "sources": [
        "ucsd-program",
        "sdsu-transfer"
      ]
    },
    {
      "factor": "Admission baseline",
      "UCSD": "UC eligibility plus published aerospace screening; minimums do not predict selection.",
      "SDSU": "Fall 2027 aerospace minimum cumulative GPA 2.70; CSU units, Golden Four and major preparation separately required.",
      "sources": [
        "ucsd-screening",
        "ucsd-transfer",
        "sdsu-gpa",
        "sdsu-transfer"
      ]
    },
    {
      "factor": "Formal emphasis",
      "UCSD": "Optional astrodynamics, aerothermodynamics, or flight dynamics/controls specialization.",
      "SDSU": "Evaluate actual aerospace curriculum, labs and technical electives; no UCSD specialization labels should be carried over.",
      "sources": [
        "ucsd-specializations",
        "sdsu-department"
      ]
    },
    {
      "factor": "Hands-on ecosystem",
      "UCSD": "Research and teams require current membership/access checks.",
      "SDSU": "Department lists Rocket Project, Aztec Aerospace Design, ACOSE and AIAA. Listings are leads, not guaranteed places.",
      "sources": [
        "sdsu-organizations"
      ]
    },
    {
      "factor": "Work, commute and cost",
      "UCSD": "Quarter rhythm, labs/team work and annual sequences need a real schedule; part-time approval is conditional.",
      "SDSU": "Audit actual daytime sections, commute and net costs; neither university is established here as an evening degree.",
      "sources": [
        "ucsd-parttime",
        "sdsu-department"
      ]
    }
  ],
  "unresolved": [
    {
      "question": "Which catalog/articulation year applies to Chris's actual courses?",
      "impact": "Do not presume 2026 rules govern a 2030 transfer.",
      "sourceIds": [
        "ucsd-catalog",
        "assist-aero"
      ]
    },
    {
      "question": "What official placement, existing credit, prerequisite clearance and registration appointment apply?",
      "impact": "The website must begin with unknown academic records, not inferred completions.",
      "sourceIds": [
        "swc-schedule",
        "swc-math"
      ]
    },
    {
      "question": "How does admissions reconcile PHYS 2CL and programming wording with the department template/catalog?",
      "impact": "Plan PHYS 2CL from current central screening; MAE 8 recommended by central admissions. Catalog transfer prose differs.",
      "sourceIds": [
        "ucsd-screening",
        "ucsd-catalog",
        "ucsd-plan"
      ]
    },
    {
      "question": "Is MAE 184 accepted in the eventual Astrodynamics specialization?",
      "impact": "Department and catalog lists differ; choose common options or get approval.",
      "sourceIds": [
        "ucsd-specializations",
        "ucsd-catalog"
      ]
    },
    {
      "question": "Can desired electives fit without delaying the degree?",
      "impact": "MAE 182 unavailable in current annual table; MAE 113→114 fall-only dependency creates a trap in final year.",
      "sourceIds": [
        "ucsd-offerings",
        "ucsd-courses"
      ]
    },
    {
      "question": "Which UCSD college and GE certification will apply?",
      "impact": "College and university obligations remain separate from aerospace preparation; Revelle transfer rules changed for fall 2026.",
      "sourceIds": [
        "ucsd-revelle",
        "ucsd-seventh",
        "uc-calgetc"
      ]
    },
    {
      "question": "What is the applicable SWC-to-SDSU aerospace agreement and local pathway?",
      "impact": "SDSU comparison is substantive but is not a second automated credit audit; do not reuse UCSD mappings.",
      "sourceIds": [
        "sdsu-pathways",
        "sdsu-transfer"
      ]
    }
  ]
};
export const checked = academic.checked;
export const aliases = Object.freeze({ ...academic.aliases });
export const sources = academic.sources.map(source => ({
  ...source,
  checked: source.checked || academic.checked,
  lastChecked: source.checked || academic.checked,
  evidenceStatus: source.status,
  applicableYear: source.year,
  description: source.use,
}));
export const sourceById = Object.freeze(Object.fromEntries(sources.map(source => [source.id, source])));

/** Preserve logic while extracting only explicit course routes. Approval is never a silent bypass. */
function compileLogic(logic) {
  if (!logic) return { routes: [], approvals: [], complete: true };
  if (typeof logic === 'string') return { routes: [[normalizeCode(logic)]], approvals: [], complete: true };
  if (logic.approval) return { routes: [], approvals: [logic.approval], complete: false };
  if (Array.isArray(logic.any)) {
    const children = logic.any.map(compileLogic);
    return { routes: children.flatMap(child => child.routes), approvals: children.flatMap(child => child.approvals), complete: children.every(child => child.complete) };
  }
  if (Array.isArray(logic.all)) {
    const children = logic.all.map(compileLogic);
    const routes = children.reduce((result, child) => child.routes.length ? result.flatMap(route => child.routes.map(option => [...route, ...option])) : [], [[]]);
    return { routes: routes.filter(route => route.length), approvals: children.flatMap(child => child.approvals), complete: children.every(child => child.complete) };
  }
  return { routes: [], approvals: ['Unmodeled catalog condition; inspect the source.'], complete: false };
}

const admissionTargets = new Set(['MATH 18', 'MATH 20A', 'MATH 20B', 'MATH 20C', 'MATH 20D', 'CHEM 6A', 'PHYS 2A', 'PHYS 2B', 'PHYS 2C', 'PHYS 2CL']);
const normalizeSwc = course => {
  const prerequisite = compileLogic(course.prerequisites), corequisite = compileLogic(course.corequisites);
  return {
    ...course,
    code: normalizeCode(course.id), institution: 'Southwestern College', institutionId: 'swc', unitSystem: 'semester',
    prerequisites: prerequisite.routes, corequisites: corequisite.routes,
    prerequisiteLogic: course.prerequisites || null, corequisiteLogic: course.corequisites || null,
    prerequisiteScope: prerequisite.approvals.length || corequisite.approvals.length ? 'catalog-course-routes-with-approval-alternatives' : 'catalog-course-routes',
    prerequisiteWarning: prerequisite.approvals.length || corequisite.approvals.length
      ? 'Course routes are shown below. Placement, accepted equivalencies and other stated approval routes require confirmation; a missing course route does not establish that the college will deny enrollment.'
      : course.prerequisiteNote || '',
    approvalRoutes: [...prerequisite.approvals, ...corequisite.approvals],
    sourceIds: [course.source], evidenceStatus: sourceById[course.source]?.status || 'unknown',
    offerings: course.typicalOffering ? { status: 'typical', seasons: ['fall'], note: course.typicalOffering, sourceIds: [course.source] }
      : { status: 'unknown', note: 'Check the actual term schedule, section time, modality and seats.', sourceIds: ['swc-schedule'] },
  };
};

const normalizeUcsd = course => {
  const source = course.source || 'ucsd-courses';
  return {
    ...course,
    code: normalizeCode(course.id), institution: 'UC San Diego', institutionId: 'ucsd', unitSystem: 'quarter',
    source, sourceIds: [source, ...(course.commonRoutePrereqs?.length ? ['ucsd-prereq'] : [])],
    // The research table is a common-route guide. Treating it as complete logic
    // would reject valid alternate catalog routes, honors equivalents or consent.
    prerequisites: [], corequisites: [], prerequisiteLogic: null, corequisiteLogic: null,
    indicativePrerequisites: course.commonRoutePrereqs?.length ? [course.commonRoutePrereqs.map(normalizeCode)] : [],
    prerequisiteScope: 'illustrative-common-route-only',
    prerequisiteWarning: 'These are common aerospace-route dependencies, not the full catalog prerequisite rule. They are displayed for orientation and are not used as exact enrollment eligibility checks. Check current catalog alternatives, minimum grades, standing and consent.',
    approvalRoutes: [], evidenceStatus: sourceById[source]?.status || 'verified-primary',
    role: course.role || (admissionTargets.has(course.id) ? 'Admission and degree requirement' : 'Degree requirement'),
    offerings: course.id === 'MAE 113' ? { status: 'confirmed', academicYear: '2026–2027', terms: ['2026-fall'], sourceIds: ['ucsd-offerings'], note: 'Only fall is listed in the 2026–27 table. Future-year offerings remain assumptions.' }
      : { status: 'unknown', sourceIds: ['ucsd-offerings'], note: 'Future sections are unconfirmed. Consult the annual department offering table.' },
  };
};

export const courses = [
  ...academic.swcCourses.map(normalizeSwc),
  ...academic.ucsdLowerDivisionScience.map(normalizeUcsd),
  ...academic.ucsdCoreCourses.map(normalizeUcsd),
];
export const courseByCode = Object.freeze(Object.fromEntries(courses.map(course => [course.code, course])));
export const mappings = academic.articulation.rules.flatMap((rule, index) => {
  const routes = rule.all ? [rule.all.map(normalizeCode)] : rule.any.map(code => [normalizeCode(code)]);
  return rule.satisfies.map(target => ({
    id: `assist-${target.toLowerCase().replace(/\s+/g, '-')}`,
    target, title: courseByCode[target]?.title || target,
    alternatives: routes,
    minimumGrade: 'C',
    sourceId: academic.articulation.source, sourceIds: [academic.articulation.source],
    agreementYear: academic.articulation.agreementYear, checked: academic.checked,
    sendingInstitution: academic.articulation.from, receivingInstitution: academic.articulation.to, major: academic.articulation.major,
    evidenceStatus: academic.articulation.status,
    role: admissionTargets.has(target) ? 'screening' : target === 'MAE 8' ? 'recommended' : 'degree',
    scope: 'The agreement maps requirements. An official evaluation, applicable agreement year, grades and overall admission requirements remain separate.',
    originalRuleIndex: index,
  }));
});

export const degreePlan = academic.transferGrid.map(year => ({
  ...year, sourceId: 'ucsd-plan', evidenceStatus: 'verified-primary-historical-template',
  note: academic.transferGridNotes,
}));
export const scenarios = academic.scenarioAssumptions.map((scenario, index) => ({
  ...scenario,
  id: ['earlier', 'target', 'flexible'][index] || `scenario-${index}`,
  inputs: { startYear: 2027, startSeason: 'spring', transferYear: scenario.transferFall, universityYears: 3,
    mathEntry: index === 0 ? 'calculus' : 'precalculus', unitsPerTerm: [12, 10, 8][index] || 10, summer: false, completedUnits: 0 },
  calculationNote: 'Unit loads are editable scenario assumptions introduced for comparison, not a personalized course prescription. The course-by-course plan, workload and actual eligibility need separate checks.',
}));

export const screeningTargets = [...admissionTargets];
export const specializations = academic.specializations;
export const schoolComparison = academic.schoolComparison;
export const advisingQuestions = academic.unresolved;
