import { SubjectCourse } from '../types';

export const FOUNDATION_ENGINEERING_SUBJECTS: SubjectCourse[] = [
  {
    id: 'sub-applied-chem',
    code: 'CH-101',
    name: 'Applied Chemistry',
    credits: 4,
    color: 'emerald',
    standardTextbook: 'Engineering Chemistry by P.C. Jain & Monica Jain / Shashi Chawla',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'chem-u1',
        title: 'Unit-I: Water Technology & Softening Processes',
        weightagePercentage: 20,
        topics: [
          { id: 'ch-t1', name: 'Hardness of water, EDTA titration method & numerical calculations', completed: false },
          { id: 'ch-t2', name: 'Boiler troubles, Zeolite & Ion exchange demineralization processes', completed: false },
        ],
      },
      {
        id: 'chem-u2',
        title: 'Unit-II: Polymers, Plastics & Advanced Materials',
        weightagePercentage: 20,
        topics: [
          { id: 'ch-t3', name: 'Classification & mechanisms of addition and condensation polymerization', completed: false },
          { id: 'ch-t4', name: 'Thermoplastics, Thermosetting, Conducting polymers & Carbon Nanomaterials', completed: false },
        ],
      },
      {
        id: 'chem-u3',
        title: 'Unit-III: Lubricants & Phase Rule',
        weightagePercentage: 20,
        topics: [
          { id: 'ch-t5', name: 'Mechanisms of lubrication, Viscosity Index, Flash and Fire points', completed: false },
          { id: 'ch-t6', name: 'Gibbs Phase Rule, One-component Water system & Pb-Ag binary eutectic system', completed: false },
        ],
      },
      {
        id: 'chem-u4',
        title: 'Unit-IV: Fuels & Combustion Calculations',
        weightagePercentage: 20,
        topics: [
          { id: 'ch-t7', name: 'Gross & Net Calorific values, Bomb calorimeter testing', completed: false },
          { id: 'ch-t8', name: 'Proximate and Ultimate analysis of coal, Flue gas analysis using Orsat apparatus', completed: false },
        ],
      },
      {
        id: 'chem-u5',
        title: 'Unit-V: Spectroscopy & Corrosion Control',
        weightagePercentage: 20,
        topics: [
          { id: 'ch-t9', name: 'Principles of UV-Visible & IR Spectroscopy, Beer-Lambert Law', completed: false },
          { id: 'ch-t10', name: 'Electrochemical corrosion mechanisms, Galvanic protection & Protective coatings', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-applied-phys',
    code: 'PH-101',
    name: 'Applied Physics',
    credits: 4,
    color: 'blue',
    standardTextbook: 'Concepts of Modern Physics by Arthur Beiser / Engineering Physics by H.K. Malik',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'phy-u1',
        title: 'Unit-I: Quantum Mechanics & Wave Optics',
        weightagePercentage: 20,
        topics: [
          { id: 'ph-t1', name: 'De Broglie hypothesis, Wave packets, Heisenberg Uncertainty Principle', completed: false },
          { id: 'ph-t2', name: 'Schrodinger wave equations, 1D Infinite potential well analysis', completed: false },
        ],
      },
      {
        id: 'phy-u2',
        title: 'Unit-II: Lasers & Fiber Optics Communication',
        weightagePercentage: 20,
        topics: [
          { id: 'ph-t3', name: 'Spontaneous & Stimulated emission, Einstein coefficients, He-Ne laser', completed: false },
          { id: 'ph-t4', name: 'Optical fiber light guidance, Acceptance angle, Numerical Aperture (NA)', completed: false },
        ],
      },
      {
        id: 'phy-u3',
        title: 'Unit-III: Semiconductors & Superconductivity',
        weightagePercentage: 20,
        topics: [
          { id: 'ph-t5', name: 'Intrinsic & Extrinsic semiconductors, Fermi level, Hall effect & applications', completed: false },
          { id: 'ph-t6', name: 'Superconductivity, Meissner effect, Type-I & Type-II, BCS theory basics', completed: false },
        ],
      },
      {
        id: 'phy-u4',
        title: 'Unit-IV: Electromagnetism & Dielectric Materials',
        weightagePercentage: 20,
        topics: [
          { id: 'ph-t7', name: 'Maxwells equations in differential and integral forms, Poynting vector', completed: false },
          { id: 'ph-t8', name: 'Dielectric polarization, Clausius-Mossotti equation, Ferroelectricity', completed: false },
        ],
      },
      {
        id: 'phy-u5',
        title: 'Unit-V: Nanotechnology & Ultrasonics',
        weightagePercentage: 20,
        topics: [
          { id: 'ph-t9', name: 'Introduction to nanomaterials, Quantum dots, Carbon nanotubes (CNTs)', completed: false },
          { id: 'ph-t10', name: 'Ultrasonic wave production by Magnetostriction & Piezoelectric oscillator', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-maths',
    code: 'MA-101',
    name: 'Mathematics',
    credits: 4,
    color: 'amber',
    standardTextbook: 'Higher Engineering Mathematics by B.S. Grewal / Advanced Engineering Mathematics by Erwin Kreyszig',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'm1-u1',
        title: 'Unit-I: Differential Calculus',
        weightagePercentage: 20,
        topics: [
          { id: 'm-t1', name: 'Rolle Theorem, Mean Value Theorems, Taylors and Maclaurins expansions', completed: false },
          { id: 'm-t2', name: 'Indeterminate forms, L-Hospitals Rule, Curvature, Radius & Center of curvature', completed: false },
        ],
      },
      {
        id: 'm1-u2',
        title: 'Unit-II: Partial Differentiation & Multivariable Calculus',
        weightagePercentage: 20,
        topics: [
          { id: 'm-t3', name: 'Partial derivatives, Eulers Theorem on homogeneous functions', completed: false },
          { id: 'm-t4', name: 'Jacobians, Maxima & Minima of two variables, Lagranges method of multipliers', completed: false },
        ],
      },
      {
        id: 'm1-u3',
        title: 'Unit-III: Integral Calculus & Special Functions',
        weightagePercentage: 20,
        topics: [
          { id: 'm-t5', name: 'Definite integrals, Beta and Gamma functions and relation properties', completed: false },
          { id: 'm-t6', name: 'Multiple integrals (Double and Triple), Evaluation of Area and Volume', completed: false },
        ],
      },
      {
        id: 'm1-u4',
        title: 'Unit-IV: Ordinary Differential Equations (ODEs)',
        weightagePercentage: 20,
        topics: [
          { id: 'm-t7', name: 'Exact differential equations, Integrating factors, First order linear equations', completed: false },
          { id: 'm-t8', name: 'Higher order linear differential equations with constant coefficients', completed: false },
        ],
      },
      {
        id: 'm1-u5',
        title: 'Unit-V: Matrices & Linear Algebra',
        weightagePercentage: 20,
        topics: [
          { id: 'm-t9', name: 'Rank of a matrix, Row echelon form, System of linear equations consistency', completed: false },
          { id: 'm-t10', name: 'Eigenvalues and Eigenvectors, Cayley-Hamilton Theorem & Diagonalization', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-eng-comm',
    code: 'HU-101',
    name: 'English for Communication',
    credits: 3,
    color: 'teal',
    standardTextbook: 'Technical Communication: Principles and Practice by Meenakshi Raman & Sangeeta Sharma',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'eng-u1',
        title: 'Unit-I: Fundamentals of Effective Communication',
        weightagePercentage: 20,
        topics: [
          { id: 'en-t1', name: 'Communication cycle, Verbal and Non-verbal modes, Overcoming barriers', completed: false },
          { id: 'en-t2', name: 'The 7 Cs of communication, Active listening and feedback mechanics', completed: false },
        ],
      },
      {
        id: 'eng-u2',
        title: 'Unit-II: Technical & Professional Correspondence',
        weightagePercentage: 20,
        topics: [
          { id: 'en-t3', name: 'Professional emails, Formal letters, Inquiries, Complaints & Circulars', completed: false },
          { id: 'en-t4', name: 'Resume building, Curriculum Vitae (CV) & Customized cover letters', completed: false },
        ],
      },
      {
        id: 'eng-u3',
        title: 'Unit-III: Technical Reports & Proposal Drafting',
        weightagePercentage: 20,
        topics: [
          { id: 'en-t5', name: 'Structure of engineering reports, Executive summary and Abstracts', completed: false },
          { id: 'en-t6', name: 'Project proposals, Technical documentation & Citation styles (IEEE)', completed: false },
        ],
      },
      {
        id: 'eng-u4',
        title: 'Unit-IV: Grammar, Syntax & Vocabulary Enhancement',
        weightagePercentage: 20,
        topics: [
          { id: 'en-t7', name: 'Subject-verb agreement, Common grammatical errors, Active/Passive voice', completed: false },
          { id: 'en-t8', name: 'Vocabulary in context: Collocations, Idioms, Technical terminology', completed: false },
        ],
      },
      {
        id: 'eng-u5',
        title: 'Unit-V: Group Discussions, Presentations & Interview Skills',
        weightagePercentage: 20,
        topics: [
          { id: 'en-t9', name: 'Group Discussion (GD) strategies, Role playing, Extempore delivery', completed: false },
          { id: 'en-t10', name: 'Slide presentation skills, Body language, Answering campus interview questions', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-basic-electr',
    code: 'EC-101',
    name: 'Basics of Electronics',
    credits: 3,
    color: 'violet',
    standardTextbook: 'Electronic Devices and Circuit Theory by Robert L. Boylestad / David A. Bell',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'ec-u1',
        title: 'Unit-I: Semiconductor Diodes & Power Rectifiers',
        weightagePercentage: 20,
        topics: [
          { id: 'ec-t1', name: 'PN junction diode characteristics, V-I curve, Zener diode regulator', completed: false },
          { id: 'ec-t2', name: 'Half wave, Full wave & Bridge rectifiers, Capacitive filters, Clippers & Clampers', completed: false },
        ],
      },
      {
        id: 'ec-u2',
        title: 'Unit-II: Bipolar Junction Transistors (BJT)',
        weightagePercentage: 20,
        topics: [
          { id: 'ec-t3', name: 'NPN & PNP operation, Common Emitter (CE), CB, CC characteristics', completed: false },
          { id: 'ec-t4', name: 'DC load line, Q-point selection, Transistor biasing and thermal stability', completed: false },
        ],
      },
      {
        id: 'ec-u3',
        title: 'Unit-III: Field Effect Transistors (FET & MOSFET)',
        weightagePercentage: 20,
        topics: [
          { id: 'ec-t5', name: 'JFET construction, Pinch-off voltage, Transfer and drain characteristics', completed: false },
          { id: 'ec-t6', name: 'Depletion and Enhancement MOSFETs, CMOS logic inverter basics', completed: false },
        ],
      },
      {
        id: 'ec-u4',
        title: 'Unit-IV: Operational Amplifiers (Op-Amps)',
        weightagePercentage: 20,
        topics: [
          { id: 'ec-t7', name: 'Ideal Op-Amp characteristics, Virtual ground concept, Inverting/Non-inverting modes', completed: false },
          { id: 'ec-t8', name: 'Op-amp circuits: Summing amplifier, Subtractor, Differentiator & Integrator', completed: false },
        ],
      },
      {
        id: 'ec-u5',
        title: 'Unit-V: Digital Logic Fundamentals & Number Systems',
        weightagePercentage: 20,
        topics: [
          { id: 'ec-t9', name: 'Number systems (Binary, Hexadecimal), Logic gates (AND, OR, NOT, NAND, NOR)', completed: false },
          { id: 'ec-t10', name: 'Boolean algebra theorems, De Morgans laws, Karnaugh Map (K-map) minimization', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-basic-elec',
    code: 'EE-101',
    name: 'Basics of Electrical',
    credits: 3,
    color: 'orange',
    standardTextbook: 'Basic Electrical Engineering by D.P. Kothari & I.J. Nagrath / V.K. Mehta',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'ee-u1',
        title: 'Unit-I: DC Network Analysis & Theorems',
        weightagePercentage: 20,
        topics: [
          { id: 'ee-t1', name: 'Ohms Law, Kirchhoffs Laws (KCL, KVL), Mesh and Node voltage analysis', completed: false },
          { id: 'ee-t2', name: 'Network Theorems: Thevenin, Norton, Superposition & Maximum Power Transfer', completed: false },
        ],
      },
      {
        id: 'ee-u2',
        title: 'Unit-II: Single Phase AC Circuits',
        weightagePercentage: 20,
        topics: [
          { id: 'ee-t3', name: 'Generation of sinusoidal AC, RMS and Average values, Form and Peak factors', completed: false },
          { id: 'ee-t4', name: 'Series R-L, R-C, R-L-C circuits, Phasor diagrams, Resonance and Power factor', completed: false },
        ],
      },
      {
        id: 'ee-u3',
        title: 'Unit-III: Three Phase Systems & Power Measurement',
        weightagePercentage: 20,
        topics: [
          { id: 'ee-t5', name: 'Advantages of three-phase, Star and Delta relationships between Line & Phase values', completed: false },
          { id: 'ee-t6', name: 'Measurement of three-phase power by Two-Wattmeter method', completed: false },
        ],
      },
      {
        id: 'ee-u4',
        title: 'Unit-IV: Magnetic Circuits & Single-Phase Transformers',
        weightagePercentage: 20,
        topics: [
          { id: 'ee-t7', name: 'MMF, Flux, Reluctance, B-H curve, Hysteresis and Eddy current core losses', completed: false },
          { id: 'ee-t8', name: 'Transformer: Construction, Working principle, EMF equation, Losses & Efficiency', completed: false },
        ],
      },
      {
        id: 'ee-u5',
        title: 'Unit-V: Electrical Machines & Domestic Safety',
        weightagePercentage: 20,
        topics: [
          { id: 'ee-t9', name: 'Construction & working principle of DC machines and 1-Phase induction motors', completed: false },
          { id: 'ee-t10', name: 'Earthing methods (Pipe & Plate), MCB, ELCB, Fuses and electrical safety standards', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-eng-graphics',
    code: 'ME-101',
    name: 'Engineering Graphics/Drawing',
    credits: 3,
    color: 'rose',
    standardTextbook: 'Engineering Drawing by N.D. Bhatt / P.S. Gill',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'eg-u1',
        title: 'Unit-I: Drawing Standards, Scales & Conic Sections',
        weightagePercentage: 20,
        topics: [
          { id: 'eg-t1', name: 'Lines, Lettering, Dimensioning conventions, Plain and Diagonal scales', completed: false },
          { id: 'eg-t2', name: 'Conic sections: Construction of Ellipse, Parabola & Hyperbola (Eccentricity method)', completed: false },
        ],
      },
      {
        id: 'eg-u2',
        title: 'Unit-II: Orthographic Projections of Points & Lines',
        weightagePercentage: 20,
        topics: [
          { id: 'eg-t3', name: 'Principles of projection, First angle and Third angle projection comparisons', completed: false },
          { id: 'eg-t4', name: 'Projections of straight lines inclined to both reference planes, True length & traces', completed: false },
        ],
      },
      {
        id: 'eg-u3',
        title: 'Unit-III: Projections of Planes & Solids',
        weightagePercentage: 20,
        topics: [
          { id: 'eg-t5', name: 'Projections of planes: Triangle, Square, Pentagon, Hexagon & Circle', completed: false },
          { id: 'eg-t6', name: 'Projections of regular solids: Prisms, Pyramids, Cylinders and Cones', completed: false },
        ],
      },
      {
        id: 'eg-u4',
        title: 'Unit-IV: Sections of Solids & Development of Surfaces',
        weightagePercentage: 20,
        topics: [
          { id: 'eg-t7', name: 'Section planes, True shape of sections of prisms, cylinders and cones', completed: false },
          { id: 'eg-t8', name: 'Development of lateral surfaces of prisms, cylinders, pyramids and cones', completed: false },
        ],
      },
      {
        id: 'eg-u5',
        title: 'Unit-V: Isometric Views & Computer Aided Drafting (CAD)',
        weightagePercentage: 20,
        topics: [
          { id: 'eg-t9', name: 'Isometric scale, Isometric view vs Isometric projection of composite solids', completed: false },
          { id: 'eg-t10', name: 'Introduction to Computer-Aided Drafting (CAD interface, Coordinate systems & 2D drawing)', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-basic-cs',
    code: 'CS-101',
    name: 'Basics of Computer Science',
    credits: 3,
    color: 'indigo',
    standardTextbook: 'Programming in ANSI C by E. Balagurusamy / Problem Solving and Python Programming',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'cs-u1',
        title: 'Unit-I: Computer System Architecture & Foundations',
        weightagePercentage: 20,
        topics: [
          { id: 'cs-t1', name: 'Von Neumann architecture, CPU registers, Memory hierarchy (RAM, Cache, Disk)', completed: false },
          { id: 'cs-t2', name: 'Operating system functions, Compilers vs Interpreters, Flowcharts & Algorithms', completed: false },
        ],
      },
      {
        id: 'cs-u2',
        title: 'Unit-II: C / Python Syntax & Flow Control',
        weightagePercentage: 20,
        topics: [
          { id: 'cs-t3', name: 'Primitive data types, Variables, Constants, Operators and Expressions', completed: false },
          { id: 'cs-t4', name: 'Control statements: if-else, switch-case, Looping: while, for, do-while', completed: false },
        ],
      },
      {
        id: 'cs-u3',
        title: 'Unit-III: Arrays, Strings & Modular Functions',
        weightagePercentage: 20,
        topics: [
          { id: 'cs-t5', name: '1D & 2D arrays, Matrix operations, String handling library functions', completed: false },
          { id: 'cs-t6', name: 'User-defined functions, Call by value vs reference, Recursion principles', completed: false },
        ],
      },
      {
        id: 'cs-u4',
        title: 'Unit-IV: Pointers & Structured Data Types',
        weightagePercentage: 20,
        topics: [
          { id: 'cs-t7', name: 'Pointers concept, Pointer arithmetic, Dynamic memory allocation (malloc, calloc, free)', completed: false },
          { id: 'cs-t8', name: 'Structures, Unions, Array of structures, Self-referential structures', completed: false },
        ],
      },
      {
        id: 'cs-u5',
        title: 'Unit-V: Fundamental Algorithms & Networking Basics',
        weightagePercentage: 20,
        topics: [
          { id: 'cs-t9', name: 'Searching (Linear, Binary) and Sorting (Bubble, Selection, Insertion sort)', completed: false },
          { id: 'cs-t10', name: 'Computer networks basics, LAN, WAN, IP addresses & Internet protocols', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-fund-mech',
    code: 'ME-102',
    name: 'Fundamentals of Mechanical',
    credits: 3,
    color: 'cyan',
    standardTextbook: 'Basic Mechanical Engineering by Pravin Kumar / R.K. Rajput',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'fm-u1',
        title: 'Unit-I: Thermodynamics & Laws of Heat',
        weightagePercentage: 20,
        topics: [
          { id: 'fm-t1', name: 'Thermodynamic system, Properties, Processes, Zeroth Law & Temperature measurement', completed: false },
          { id: 'fm-t2', name: 'First Law of Thermodynamics (Energy conservation), Second Law (Kelvin-Planck & Clausius statements)', completed: false },
        ],
      },
      {
        id: 'fm-u2',
        title: 'Unit-II: Steam Generators & Boilers',
        weightagePercentage: 20,
        topics: [
          { id: 'fm-t3', name: 'Classification of boilers: Fire tube (Cochran) & Water tube (Babcock & Wilcox)', completed: false },
          { id: 'fm-t4', name: 'Boiler mountings for safety and accessories for efficiency improvement', completed: false },
        ],
      },
      {
        id: 'fm-u3',
        title: 'Unit-III: Internal Combustion (IC) Engines',
        weightagePercentage: 20,
        topics: [
          { id: 'fm-t5', name: 'Working of 2-stroke and 4-stroke Petrol (Otto) & Diesel cycles comparison', completed: false },
          { id: 'fm-t6', name: 'Engine terminologies: Bore, Stroke, Compression ratio, Indicated and Brake power', completed: false },
        ],
      },
      {
        id: 'fm-u4',
        title: 'Unit-IV: Power Transmission Elements',
        weightagePercentage: 20,
        topics: [
          { id: 'fm-t7', name: 'Belt drives (Flat & V-belt), Velocity ratio, Slip, Belt tensions', completed: false },
          { id: 'fm-t8', name: 'Gear drives: Spur, Helical, Bevel, Worm gears and Simple/Compound gear trains', completed: false },
        ],
      },
      {
        id: 'fm-u5',
        title: 'Unit-V: Manufacturing Processes & Machine Tools',
        weightagePercentage: 20,
        topics: [
          { id: 'fm-t9', name: 'Foundry: Pattern making, Moulding sand properties, Common casting defects', completed: false },
          { id: 'fm-t10', name: 'Welding: Arc welding, Gas welding, Brazing & Soldering; Working principle of Lathe machine', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-fund-civil',
    code: 'CE-101',
    name: 'Fundamentals of Civil',
    credits: 3,
    color: 'stone',
    standardTextbook: 'Basic Civil Engineering by S.S. Bhavikatti / B.C. Punmia',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'fc-u1',
        title: 'Unit-I: Civil Engineering Construction Materials',
        weightagePercentage: 20,
        topics: [
          { id: 'fc-t1', name: 'Bricks: Manufacturing, Qualities of first-class bricks, Field tests', completed: false },
          { id: 'fc-t2', name: 'Cement: Types, Setting time tests, Mortar, Plain and Reinforced Cement Concrete (RCC)', completed: false },
        ],
      },
      {
        id: 'fc-u2',
        title: 'Unit-II: Building Components & Structure Types',
        weightagePercentage: 20,
        topics: [
          { id: 'fc-t3', name: 'Substructure and Superstructure, Types of foundations (Shallow vs Deep)', completed: false },
          { id: 'fc-t4', name: 'Masonry work: English and Flemish bonds, Lintels, Arches, Floors and Roofs', completed: false },
        ],
      },
      {
        id: 'fc-u3',
        title: 'Unit-III: Surveying Principles & Linear Measurements',
        weightagePercentage: 20,
        topics: [
          { id: 'fc-t5', name: 'Classification of surveying, Fundamental principles (Working from whole to part)', completed: false },
          { id: 'fc-t6', name: 'Chain surveying, Compass surveying, Prismatic compass, Whole Circle Bearings & Local attraction', completed: false },
        ],
      },
      {
        id: 'fc-u4',
        title: 'Unit-IV: Levelling & Contour Mapping',
        weightagePercentage: 20,
        topics: [
          { id: 'fc-t7', name: 'Dumpy level, Levelling staff, Height of Instrument (HI) & Rise and Fall computation methods', completed: false },
          { id: 'fc-t8', name: 'Contour lines, Characteristics of contours, Interpolation and engineering uses', completed: false },
        ],
      },
      {
        id: 'fc-u5',
        title: 'Unit-V: Environmental Engineering & Sustainable Infrastructure',
        weightagePercentage: 20,
        topics: [
          { id: 'fc-t9', name: 'Water demand, Sources of water supply, Potable water quality standards', completed: false },
          { id: 'fc-t10', name: 'Rainwater harvesting techniques, Sewage treatment basics, Green building concepts', completed: false },
        ],
      },
    ],
  },
];
