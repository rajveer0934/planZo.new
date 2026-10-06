import { SubjectCourse } from '../types';

export const SEM_1_FOUNDATION_SUBJECTS: SubjectCourse[] = [
  {
    id: 'sub-applied-chem',
    code: 'CHB101',
    name: 'Applied Chemistry',
    credits: 4,
    color: 'emerald',
    standardTextbook: 'Engineering Chemistry by Jain & Jain / O.G. Palanna',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'chem-u1',
        title: 'Chapter 1: Water Technology',
        weightagePercentage: 20,
        topics: [
          { id: 'ch-t1', name: 'Sources, impurities, types & units of hardness, EDTA titration & Alkalinity determination', completed: false },
          { id: 'ch-t2', name: 'Boiler troubles (Sludge, Scale, Priming, Foaming, Caustic Embrittlement), Lime-Soda, Zeolite & Ion-Exchange softening', completed: false },
        ],
      },
      {
        id: 'chem-u2',
        title: 'Chapter 2: Electrochemistry & Energy Storage Systems',
        weightagePercentage: 20,
        topics: [
          { id: 'ch-t3', name: 'EMF of cell, Single electrode potential, Derivation of Nernst Equation & numerical problems', completed: false },
          { id: 'ch-t4', name: 'Primary, Secondary & Reserve batteries, Li-ion battery for EVs, Na-ion & Graphene batteries, Direct cycling recycling', completed: false },
        ],
      },
      {
        id: 'chem-u3',
        title: 'Chapter 3: Corrosion & Methods of Prevention',
        weightagePercentage: 20,
        topics: [
          { id: 'ch-t5', name: 'Types of corrosion, Dry (chemical) & Wet (electrochemical) theories, Factors influencing rate of corrosion', completed: false },
          { id: 'ch-t6', name: 'Prevention methods: Galvanization, Tinning, Electroplating, Anodizing, Cathodic & Sacrificial Anode protection', completed: false },
        ],
      },
      {
        id: 'chem-u4',
        title: 'Chapter 4: Engineering Materials (Polymers & Nanomaterials)',
        weightagePercentage: 20,
        topics: [
          { id: 'ch-t7', name: 'Polymers nomenclature, Conducting polymers (PANi, PPy, PTh), Liquid-Crystal & Photoactive polymers, Solar cells', completed: false },
          { id: 'ch-t8', name: 'Nanomaterials (Fullerene, Graphene, Carbon Nanotubes, Quantum Dots) synthesis & Optical Fibres', completed: false },
        ],
      },
      {
        id: 'chem-u5',
        title: 'Chapter 5: Instrumental Methods of Analysis',
        weightagePercentage: 20,
        topics: [
          { id: 'ch-t9', name: 'Spectroscopic & Electroanalytical techniques: Colorimetry (Beer-Lambert Law) & IR Spectroscopy', completed: false },
          { id: 'ch-t10', name: 'Conductometry, pH-Metry, Chromatography & Gas Chromatography instrumentation and applications', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-eng-comm',
    code: 'HUB102',
    name: 'Communication and Report Writing',
    credits: 4,
    color: 'teal',
    standardTextbook: 'A Practical English Grammar by Thomson & Martinet / Business Correspondence & Report Writing by R.C. Sharma',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'eng-u1',
        title: 'Chapter 1: Significance of Communication',
        weightagePercentage: 20,
        topics: [
          { id: 'en-t1', name: 'Process of communication, Importance of effective communication in business', completed: false },
          { id: 'en-t2', name: 'Verbal and Non-Verbal communication, Oral and Written communication, Barriers to communication', completed: false },
        ],
      },
      {
        id: 'eng-u2',
        title: 'Chapter 2: Employability Traits',
        weightagePercentage: 20,
        topics: [
          { id: 'en-t3', name: 'Job Interview & Body Language (Kinesics, Proxemics, Oculesics), Types of Interviews', completed: false },
          { id: 'en-t4', name: 'Interview skills, Employability skills & Group Discussion (GD) strategies', completed: false },
        ],
      },
      {
        id: 'eng-u3',
        title: 'Chapter 3: Soft Skills',
        weightagePercentage: 20,
        topics: [
          { id: 'en-t5', name: 'Goal setting (SMART goals), Qualities of a good leader & leadership styles', completed: false },
          { id: 'en-t6', name: 'Time management matrix, Overcoming time wasters & Analytical problem solving', completed: false },
        ],
      },
      {
        id: 'eng-u4',
        title: 'Chapter 4: Report Writing',
        weightagePercentage: 20,
        topics: [
          { id: 'en-t7', name: 'Definition, importance & types of reports (Informational, Analytical, Feasibility)', completed: false },
          { id: 'en-t8', name: 'Structure and layout of technical reports, Technical writing & Essay writing', completed: false },
        ],
      },
      {
        id: 'eng-u5',
        title: 'Chapter 5: Applied Grammar in Communication',
        weightagePercentage: 20,
        topics: [
          { id: 'en-t9', name: 'Articles, Punctuations, Question Tags & Subject-Verb Agreement rules', completed: false },
          { id: 'en-t10', name: 'Prepositions & Direct/Indirect Narration conversions', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-basic-cs',
    code: 'CSA101',
    name: 'Introduction to Computer Science and Engineering',
    credits: 4,
    color: 'indigo',
    standardTextbook: 'Let Us C by Yashavant Kanetkar / Programming in ANSI C by E. Balagurusamy',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'cs-u1',
        title: 'Chapter 1: Introduction to Computer Science and Engineering',
        weightagePercentage: 20,
        topics: [
          { id: 'cs-t1', name: 'Computer definition, classification, generations & organization (CPU, registers, bus architecture, instruction set)', completed: false },
          { id: 'cs-t2', name: 'Memory & storage systems, I/O devices, System & Application software', completed: false },
        ],
      },
      {
        id: 'cs-u2',
        title: 'Chapter 2: Problem Solving using C',
        weightagePercentage: 20,
        topics: [
          { id: 'cs-t3', name: 'Flowcharts, structure of C program, data types, constants, variables, operators & pointer operators (& and *)', completed: false },
          { id: 'cs-t4', name: 'Control constructs (if-else, for, while, do-while, switch-case, break, continue, exit, goto) & type casting', completed: false },
        ],
      },
      {
        id: 'cs-u3',
        title: 'Chapter 3: Modular Programming',
        weightagePercentage: 20,
        topics: [
          { id: 'cs-t5', name: 'Arrays (1D & 2D), Storage classes (auto, register, static, extern), Functions & Parameter passing (Call by Value vs Reference)', completed: false },
          { id: 'cs-t6', name: 'Scope, visibility & lifetime rules, Recursion (direct, indirect, tree, tail recursion) vs Iteration', completed: false },
        ],
      },
      {
        id: 'cs-u4',
        title: 'Chapter 4: Advance C Programming',
        weightagePercentage: 20,
        topics: [
          { id: 'cs-t7', name: 'Structures, pointer to structure, self-referential structures, array of structures & Unions', completed: false },
          { id: 'cs-t8', name: 'C Preprocessor directives (#include, #define), Enumerated data types, typedef & File Handling in C', completed: false },
        ],
      },
      {
        id: 'cs-u5',
        title: 'Chapter 5: Computer Science Disciplines and Applications',
        weightagePercentage: 20,
        topics: [
          { id: 'cs-t9', name: 'Networking, Cyber Security, Operating Systems & Database fundamentals', completed: false },
          { id: 'cs-t10', name: 'Data Science, Machine Learning, Cloud Computing, Blockchain & Web Development', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-basic-electr',
    code: 'CSA102',
    name: 'Digital Electronics',
    credits: 3,
    color: 'violet',
    standardTextbook: 'Digital Logic and Computer Design by M. Morris Mano / A. Anand Kumar',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'ec-u1',
        title: 'Chapter 1: Introduction to Digital Electronics & Number Systems',
        weightagePercentage: 20,
        topics: [
          { id: 'ec-t1', name: 'Number systems & conversions, Binary arithmetic, Signed & Unsigned (1’s and 2’s complement) representation', completed: false },
          { id: 'ec-t2', name: 'Binary codes (BCD, Excess-3, Gray code) & Error detection/correction codes (Parity check & Hamming code)', completed: false },
        ],
      },
      {
        id: 'ec-u2',
        title: 'Chapter 2: Boolean Algebra and Switching Functions',
        weightagePercentage: 20,
        topics: [
          { id: 'ec-t3', name: 'Basic & Universal logic gates (NAND, NOR), Boolean postulates, De-Morgan’s theorems & SOP/POS canonical forms', completed: false },
          { id: 'ec-t4', name: 'Simplification of switching functions using Karnaugh Map (K-Map up to 4 variables) & Quine-McCluskey tabular method', completed: false },
        ],
      },
      {
        id: 'ec-u3',
        title: 'Chapter 3: Combinational Logic Modules and Applications',
        weightagePercentage: 20,
        topics: [
          { id: 'ec-t5', name: 'Half Adder, Full Adder, Half/Full Subtractors, Code converters, Parity generators & Magnitude comparators', completed: false },
          { id: 'ec-t6', name: 'Encoders, Decoders, BCD to Seven-Segment Decoder, Multiplexers (MUX) & Demultiplexers (DEMUX)', completed: false },
        ],
      },
      {
        id: 'ec-u4',
        title: 'Chapter 4: Sequential Circuits and Shift Registers',
        weightagePercentage: 20,
        topics: [
          { id: 'ec-t7', name: 'SR Latch, Clocked Flip-Flops (D, R-S, J-K, T), Race-around condition & Master-Slave JK Flip-Flop', completed: false },
          { id: 'ec-t8', name: 'Edge-triggered flip-flops, Characteristic & Excitation tables, Shift Registers (SISO, SIPO, PISO, PIPO, Universal)', completed: false },
        ],
      },
      {
        id: 'ec-u5',
        title: 'Chapter 5: Counters and Finite State Machines',
        weightagePercentage: 20,
        topics: [
          { id: 'ec-t9', name: 'Asynchronous (Ripple) counters vs Synchronous counters, BCD Decade counter, Ring & Johnson counters', completed: false },
          { id: 'ec-t10', name: 'MOD-N counter design steps & Introduction to Finite State Machines (Mealy and Moore models)', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-maths',
    code: 'MAB101',
    name: 'Mathematics-I (Linear Algebra and Calculus)',
    credits: 4,
    color: 'amber',
    standardTextbook: 'Higher Engineering Mathematics by B.S. Grewal / H.K. Dass',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'm1-u1',
        title: 'Chapter 1: Differential Calculus',
        weightagePercentage: 20,
        topics: [
          { id: 'm-t1', name: 'Leibnitz Theorem for nth derivative, Maclaurin’s and Taylor’s series expansion (one variable)', completed: false },
          { id: 'm-t2', name: 'Maxima & Minima of functions of two variables, Radius and Centre of Curvature in Cartesian coordinates', completed: false },
        ],
      },
      {
        id: 'm1-u2',
        title: 'Chapter 2: Partial Differentiation',
        weightagePercentage: 20,
        topics: [
          { id: 'm-t3', name: 'Partial derivatives of higher order, Homogeneous functions & Euler’s Theorem', completed: false },
          { id: 'm-t4', name: 'Total differentiation, Change of variables, Jacobians & Errors and Approximations', completed: false },
        ],
      },
      {
        id: 'm1-u3',
        title: 'Chapter 3: Integral Calculus',
        weightagePercentage: 20,
        topics: [
          { id: 'm-t5', name: 'Definite Integral as a Limit of Sum, Summation of series, Beta and Gamma functions', completed: false },
          { id: 'm-t6', name: 'Multiple Integrals (Double & Triple), Change of order of integration, Area and Volume applications', completed: false },
        ],
      },
      {
        id: 'm1-u4',
        title: 'Chapter 4: Matrix & Linear Algebra',
        weightagePercentage: 20,
        topics: [
          { id: 'm-t7', name: 'Types & properties of Matrices, Elementary transformations, Rank of Matrix (Echelon & Normal form)', completed: false },
          { id: 'm-t8', name: 'Consistency of Linear System of Equations (Rouche’s Theorem), Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem', completed: false },
        ],
      },
      {
        id: 'm1-u5',
        title: 'Chapter 5: Boolean Algebra & Graph Theory',
        weightagePercentage: 20,
        topics: [
          { id: 'm-t9', name: 'Algebra of logic, Principle of Duality, Basic theorems, Boolean expressions and functions', completed: false },
          { id: 'm-t10', name: 'Graph definitions, Types of Graphs, Subgraphs, Walks, Paths, Circuits, Eulerian & Hamiltonian graphs', completed: false },
        ],
      },
    ],
  },
];

export const SEM_2_FOUNDATION_SUBJECTS: SubjectCourse[] = [
  {
    id: 'sub-applied-phys',
    code: 'PYB101',
    name: 'Applied Physics',
    credits: 4,
    color: 'blue',
    standardTextbook: 'Concepts of Modern Physics by Arthur Beiser / Engineering Physics by H.K. Malik & A.K. Singh',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'phy-u1',
        title: 'Chapter 1: Quantum Mechanics',
        weightagePercentage: 20,
        topics: [
          { id: 'ph-t1', name: 'Planck’s hypothesis, de-Broglie matter waves, Davisson-Germer experiment, Compton effect, Phase & Group velocity', completed: false },
          { id: 'ph-t2', name: 'Heisenberg Uncertainty Principle, Born interpretation of wave function, Schrödinger time-dependent/independent equations & Particle in 1D box', completed: false },
        ],
      },
      {
        id: 'phy-u2',
        title: 'Chapter 2: Lasers, Optical Fibers & Holography',
        weightagePercentage: 20,
        topics: [
          { id: 'ph-t3', name: 'Einstein coefficients, Population inversion, Working of He-Ne, Ruby, Nd:YAG & CO2 lasers', completed: false },
          { id: 'ph-t4', name: 'Optical fibers: Critical & Acceptance angle, Numerical Aperture (NA), V-Number, Dispersion & Holography construction/reconstruction', completed: false },
        ],
      },
      {
        id: 'phy-u3',
        title: 'Chapter 3: Semiconductor Physics & Devices',
        weightagePercentage: 20,
        topics: [
          { id: 'ph-t5', name: 'Density of energy states, Direct vs Indirect band gap, Effective mass, Fermi energy levels & Carrier concentration', completed: false },
          { id: 'ph-t6', name: 'PN Junction I-V diode equation, Photovoltaic (Solar) cell, LED structures & Injection Laser Diode (ILD)', completed: false },
        ],
      },
      {
        id: 'phy-u4',
        title: 'Chapter 4: Superconductors & Nanomaterials',
        weightagePercentage: 20,
        topics: [
          { id: 'ph-t7', name: 'Superconductivity, Meissner effect, Critical field temperature dependence, Type-I vs Type-II superconductors & BCS theory', completed: false },
          { id: 'ph-t8', name: 'Nanoscience principles, Quantum confinement, Structure & properties of Fullerene (C60) and Carbon Nanotubes (CNTs)', completed: false },
        ],
      },
      {
        id: 'phy-u5',
        title: 'Chapter 5: Dielectric & Piezoelectric Materials',
        weightagePercentage: 20,
        topics: [
          { id: 'ph-t9', name: 'Polar & Non-Polar dielectrics, Dipole moment, Polarization, Gauss law in dielectric & relation D = ε0E + P', completed: false },
          { id: 'ph-t10', name: 'Ferroelectric & Piezoelectric materials, Direct & Converse piezoelectric effect, Piezoceramics, Piezopolymers & Transducers', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-maths-2',
    code: 'MAB102',
    name: 'Mathematics-II (Probability Distributions & Differential Equations)',
    credits: 4,
    color: 'amber',
    standardTextbook: 'Higher Engineering Mathematics by B.S. Grewal / T. Veerarajan',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'm2-u1',
        title: 'Chapter 1: Probability Distribution I & Curve Fitting',
        weightagePercentage: 20,
        topics: [
          { id: 'm2-t1', name: 'Binomial, Poisson and Normal distributions, Derivation of Mean and Variance', completed: false },
          { id: 'm2-t2', name: 'Method of Least Squares and Curve Fitting (Straight line & Second-degree parabola)', completed: false },
        ],
      },
      {
        id: 'm2-u2',
        title: 'Chapter 2: Probability Sampling Distributions',
        weightagePercentage: 20,
        topics: [
          { id: 'm2-t3', name: 'Sampling theory, Standard error, Student’s t-distribution and F-distribution tests of significance', completed: false },
          { id: 'm2-t4', name: 'Chi-Square (χ²) distribution: Goodness of fit and Test of independence of attributes', completed: false },
        ],
      },
      {
        id: 'm2-u3',
        title: 'Chapter 3: Ordinary Differential Equations',
        weightagePercentage: 20,
        topics: [
          { id: 'm2-t5', name: 'Differential equations of first order & first degree (Exact, Linear, Bernoulli) and first order & higher degree', completed: false },
          { id: 'm2-t6', name: 'Linear differential equations of higher order with constant coefficients (CF and PI rules)', completed: false },
        ],
      },
      {
        id: 'm2-u4',
        title: 'Chapter 4: Differential Equations of Other Types',
        weightagePercentage: 20,
        topics: [
          { id: 'm2-t7', name: 'Cauchy’s Homogeneous linear differential equation & Legendre’s linear differential equation', completed: false },
          { id: 'm2-t8', name: 'Simultaneous linear differential equations & Method of Variation of Parameters', completed: false },
        ],
      },
      {
        id: 'm2-u5',
        title: 'Chapter 5: Partial Differential Equations (PDE)',
        weightagePercentage: 20,
        topics: [
          { id: 'm2-t9', name: 'Formation of PDEs, Lagrange’s Linear PDE (Pp + Qq = R), Non-linear PDE of first order (Charpit’s method)', completed: false },
          { id: 'm2-t10', name: 'Homogeneous Linear PDE of second order with constant coefficients & Applications to Wave and Heat equations', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-dsa',
    code: 'CSA103',
    name: 'Problem Solving using Data Structures',
    credits: 4,
    color: 'rose',
    standardTextbook: 'Data Structures Through C by Yashavant Kanetkar / Horowitz & Sartaj Sahni',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'dsa-u1',
        title: 'Chapter 1: Problem Solving Concepts & Arrays',
        weightagePercentage: 20,
        topics: [
          { id: 'dsa-t1', name: 'Top-down & bottom-up design, Dynamic memory allocation (malloc, calloc, realloc, free), Algorithm complexity (Big-O)', completed: false },
          { id: 'dsa-t2', name: 'Linear vs Non-linear data structures, 1D & 2D Arrays address calculation (Row-major & Column-major) & array operations', completed: false },
        ],
      },
      {
        id: 'dsa-u2',
        title: 'Chapter 2: Linked Lists',
        weightagePercentage: 20,
        topics: [
          { id: 'dsa-t3', name: 'Singly Linked List: Memory representation, Traversing, Searching, Insertion & Deletion algorithms', completed: false },
          { id: 'dsa-t4', name: 'Doubly Linked List, Circular Linked List operations & Polynomial representation and addition using linked lists', completed: false },
        ],
      },
      {
        id: 'dsa-u3',
        title: 'Chapter 3: Stacks and Queues',
        weightagePercentage: 20,
        topics: [
          { id: 'dsa-t5', name: 'Stack LIFO operations (Push, Pop, Peek), Array & Linked List implementation, Polish notations (Infix to Postfix & Evaluation)', completed: false },
          { id: 'dsa-t6', name: 'Queue FIFO operations (Enqueue, Dequeue), Circular Queue, Deque, Priority Queue & Applications', completed: false },
        ],
      },
      {
        id: 'dsa-u4',
        title: 'Chapter 4: Trees and Graphs',
        weightagePercentage: 20,
        topics: [
          { id: 'dsa-t7', name: 'Binary Tree representation, Traversals (Preorder, Inorder, Postorder), Binary Search Tree (BST) & AVL Balanced Trees', completed: false },
          { id: 'dsa-t8', name: 'Graph terminology, Adjacency Matrix & Adjacency List representation, Breadth First Search (BFS) & Depth First Search (DFS)', completed: false },
        ],
      },
      {
        id: 'dsa-u5',
        title: 'Chapter 5: Searching, Hashing and Sorting',
        weightagePercentage: 20,
        topics: [
          { id: 'dsa-t9', name: 'Linear Search, Binary Search, Hashing functions & Collision resolution (Chaining, Linear/Quadratic Probing)', completed: false },
          { id: 'dsa-t10', name: 'Sorting algorithms & complexity: Bubble, Selection, Insertion, Quick, Merge, Radix & Shell Sort', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-python',
    code: 'ITC101',
    name: 'Python Programming',
    credits: 4,
    color: 'cyan',
    standardTextbook: 'Think Python by Allen B. Downey / Python Programming by Sumita Arora',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'py-u1',
        title: 'Chapter 1: Introduction to Computer Science & Python Basics',
        weightagePercentage: 20,
        topics: [
          { id: 'py-t1', name: 'Algorithms, data representation, Python interactive shell, IDLE, saving and running scripts', completed: false },
          { id: 'py-t2', name: 'Variables, Mutable vs Immutable data types, Numeric types, Operators, Expressions, Indentation & Comments', completed: false },
        ],
      },
      {
        id: 'py-u2',
        title: 'Chapter 2: Conditional & Control Flow Statements',
        weightagePercentage: 20,
        topics: [
          { id: 'py-t3', name: 'Boolean logic, Logical operators, range() function, Conditional statements (if, if-else, if-elif-else, nested if)', completed: false },
          { id: 'py-t4', name: 'Iterative loops (for loop, while loop, nested loops) & Control statements (break, continue, pass)', completed: false },
        ],
      },
      {
        id: 'py-u3',
        title: 'Chapter 3: Strings, File Manipulation & Directories',
        weightagePercentage: 20,
        topics: [
          { id: 'py-t5', name: 'String subscript operator, Positive & negative indexing, Slicing, String methods & Number system conversions', completed: false },
          { id: 'py-t6', name: 'Text file operations (r, w, a, r+, w+ modes), reading/writing text & numbers, CSV files, os and sys directory modules', completed: false },
        ],
      },
      {
        id: 'py-u4',
        title: 'Chapter 4: Lists, Tuples and Dictionaries',
        weightagePercentage: 20,
        topics: [
          { id: 'py-t7', name: 'List operations & methods (append, extend, insert, remove, pop, sort, slicing), Searching & sorting lists, Tuples', completed: false },
          { id: 'py-t8', name: 'Dictionary literals, Key-value manipulation, adding/removing keys, get(), items(), keys(), values() & traversing dictionaries', completed: false },
        ],
      },
      {
        id: 'py-u5',
        title: 'Chapter 5: Classes, Object-Oriented Programming & Exceptions',
        weightagePercentage: 20,
        topics: [
          { id: 'py-t9', name: 'Classes, Objects, Attributes & Methods, __init__ constructor, Inheritance, Overloading, Overriding & Data Hiding', completed: false },
          { id: 'py-t10', name: 'Exception Handling: try-except-else-finally blocks, Raising exceptions & User-Defined Exceptions', completed: false },
        ],
      },
    ],
  },
  {
    id: 'sub-sys-soft',
    code: 'CSA104',
    name: 'Principle of System Software & Linux',
    credits: 3,
    color: 'orange',
    standardTextbook: 'Systems Programming and Operating Systems by D.M. Dhamdhere / UNIX & Shell Programming by B.A. Forouzan',
    pyqPaperAvailable: true,
    modules: [
      {
        id: 'ss-u1',
        title: 'Chapter 1: Language Processors, Software Tools & Linux Commands',
        weightagePercentage: 20,
        topics: [
          { id: 'ss-t1', name: 'Language processing activities, Toy compiler front-end (Lexical, Syntax, Semantic analysis), Symbol tables & Software tools', completed: false },
          { id: 'ss-t2', name: 'Linux architecture, vi editor, File handling, chmod permissions, Process utilities & Text filters (grep, sed, awk)', completed: false },
        ],
      },
      {
        id: 'ss-u2',
        title: 'Chapter 2: Assemblers & Two-Pass Assembler Design',
        weightagePercentage: 20,
        topics: [
          { id: 'ss-t3', name: 'Elements of Assembly Language Programming: Imperative statements, Assembler Directives (START, END, ORIGIN, EQU, LTORG) & Declarations', completed: false },
          { id: 'ss-t4', name: 'Pass structure of Assemblers, Design of a Two-Pass Assembler (OPTAB, SYMTAB, LITTAB, POOLTAB & Intermediate Code)', completed: false },
        ],
      },
      {
        id: 'ss-u3',
        title: 'Chapter 3: Macros and Macro Processors',
        weightagePercentage: 20,
        topics: [
          { id: 'ss-t5', name: 'Macro definition and call, Lexical vs Semantic expansion, Positional, Keyword & Default parameters', completed: false },
          { id: 'ss-t6', name: 'Nested Macro calls, Advanced Macro facilities (AIF, AGO, ANOP, Expansion time variables) & Design of Macro Preprocessor (MNT, MDT, KPDTAB)', completed: false },
        ],
      },
      {
        id: 'ss-u4',
        title: 'Chapter 4: Interpreters, Processes & Inter-Process Communication',
        weightagePercentage: 20,
        topics: [
          { id: 'ss-t7', name: 'Use and overview of Interpreters, Components of an interpreter, Pure vs Impure interpreters & P-code', completed: false },
          { id: 'ss-t8', name: 'UNIX File structure (Inode), Process management (fork, exec, wait, zombie, orphan) & IPC (Pipes, Semaphores, Shared Memory)', completed: false },
        ],
      },
      {
        id: 'ss-u5',
        title: 'Chapter 5: Linkers and Loaders',
        weightagePercentage: 20,
        topics: [
          { id: 'ss-t9', name: 'Relocation and Linking concepts, Translated, Linked and Load-time addresses, External symbol resolution (EXTRN, ENTRY)', completed: false },
          { id: 'ss-t10', name: 'Design of a Linker, Self-Relocating Programs, Overlay structured programs, Absolute & Relocating Loaders, Dynamic Linking', completed: false },
        ],
      },
    ],
  },
];

export const FOUNDATION_ENGINEERING_SUBJECTS: SubjectCourse[] = [
  ...SEM_1_FOUNDATION_SUBJECTS,
  ...SEM_2_FOUNDATION_SUBJECTS,
];

export function getFoundationSemesterSubjects(semester: number): SubjectCourse[] {
  if (semester === 2) {
    return SEM_2_FOUNDATION_SUBJECTS;
  }
  return SEM_1_FOUNDATION_SUBJECTS;
}
