import { SubjectCourse, SubjectFolderData, TimetableItem, SubjectAttendance } from '../types';

export interface SatiSemesterInfo {
  semester: number;
  semesterName: string;
  academicYear: string;
  coreSubjects: SubjectCourse[];
  electiveGroups?: {
    groupName: string;
    description: string;
    subjects: SubjectCourse[];
    defaultSelectedId: string;
  }[];
}

// --------------------------------------------------------------------------
// COMPLETE OFFICIAL SATI VIDISHA CSE SYLLABUS DATA (ALL 8 SEMESTERS IN ASCENDING ORDER)
// Source: Samrat Ashok Technological Institute (Engineering College) Vidisha M.P.
// Department of Computer Science & Engineering (Autonomous Institute Affiliated to RGPV Bhopal)
// --------------------------------------------------------------------------

export const SATI_SEMESTER_CURRICULA: Record<number, SatiSemesterInfo> = {
  // ==========================================
  // SEMESTER 1 (First Year / I Sem)
  // ==========================================
  1: {
    semester: 1,
    semesterName: '1st Semester B.Tech (First Year)',
    academicYear: 'First Year / I Sem',
    coreSubjects: [
      {
        id: 'pyb101',
        code: 'PYB101',
        name: 'Applied Physics',
        credits: 4,
        color: 'blue',
        standardTextbook: 'Concepts of Modern Physics by Arthur Beiser & Optics by A. Ghatak',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'phy-u1',
            title: 'Unit-I: Quantum Mechanics',
            weightagePercentage: 20,
            topics: [
              { id: 'phy-t1', name: 'Planck hypothesis, de-Broglie matter waves, Compton effect', completed: false },
              { id: 'phy-t2', name: 'Heisenberg uncertainty principle, Schrödinger wave equations & 1D box', completed: false },
            ],
          },
          {
            id: 'phy-u2',
            title: 'Unit-II: Lasers, Optical Fibers & Holography',
            weightagePercentage: 20,
            topics: [
              { id: 'phy-t3', name: 'Population inversion, He-Ne & Nd:YAG lasers', completed: false },
              { id: 'phy-t4', name: 'Optical fiber light guidance, Numerical Aperture, Holography reconstruction', completed: false },
            ],
          },
          {
            id: 'phy-u3',
            title: 'Unit-III: Semiconductors & LEDs',
            weightagePercentage: 20,
            topics: [
              { id: 'phy-t5', name: 'Band formation, Fermi energy, PN junction diode equation, Photovoltaic cell & LED', completed: false },
            ],
          },
          {
            id: 'phy-u4',
            title: 'Unit-IV & V: Superconductors, Nanomaterials & Dielectrics',
            weightagePercentage: 40,
            topics: [
              { id: 'phy-t6', name: 'Meissner effect, BCS theory, Carbon nanotubes, Fullerene & Piezoelectric materials', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs26101',
        code: 'CS26101',
        name: 'Fundamentals of Computer Science & Engineering',
        credits: 3,
        color: 'emerald',
        standardTextbook: 'Let us C by Yashwant Kanetkar & Programming in C (Schaum Outline)',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'fcse-u1',
            title: 'Unit-I: Computer Organization & Translators',
            weightagePercentage: 20,
            topics: [
              { id: 'fcse-t1', name: 'Hardware/software architecture, Linker, Loader, Assembler & Compiler', completed: false },
            ],
          },
          {
            id: 'fcse-u2',
            title: 'Unit-II & III: Problem Solving in C & Modular Programming',
            weightagePercentage: 40,
            topics: [
              { id: 'fcse-t2', name: 'Data types, Operators, Control constructs (if-else, while, for, switch)', completed: false },
              { id: 'fcse-t3', name: 'Arrays (1D/2D), Functions, Parameter passing (call by value/reference), Storage classes', completed: false },
            ],
          },
          {
            id: 'fcse-u3',
            title: 'Unit-IV & V: Structures, Pointers & File Handling',
            weightagePercentage: 40,
            topics: [
              { id: 'fcse-t4', name: 'Structures, Unions, Self-referential structures, Pointers & Dynamic memory', completed: false },
              { id: 'fcse-t5', name: 'File I/O operations, Preprocessor directives (#include, #define)', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs26101p',
        code: 'CS26101P',
        name: 'Fundamentals of CSE Lab',
        credits: 1,
        color: 'teal',
        standardTextbook: 'Programming in ANSI-C by E. Balagurusami',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'fcse-lab',
            title: '17 Official SATI C Programming Experiments',
            weightagePercentage: 100,
            topics: [
              { id: 'fcse-e1', name: 'Exp 1-6: Armstrong number, Quadratic roots, Factorial, Diamond star, Prime sum', completed: false },
              { id: 'fcse-e2', name: 'Exp 7-12: Matrix arithmetic, Triangle area function, Recursion, Books structure', completed: false },
              { id: 'fcse-e3', name: 'Exp 13-17: Time structure, File char counter, Pointers reverse array, Text file writer', completed: false },
            ],
          },
        ],
      },
      {
        id: 'itc101',
        code: 'ITC101',
        name: 'Python Programming',
        credits: 4,
        color: 'amber',
        standardTextbook: 'Digital Logic and Computer Design by M. Mano & Python Programming',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'py-u1',
            title: 'Unit-I & II: Python Environment & Flow Control',
            weightagePercentage: 40,
            topics: [
              { id: 'py-t1', name: 'Interactive shell, IDLE, Variables, Datatypes, Operators & Indentation', completed: false },
              { id: 'py-t2', name: 'Control statements: Break, Continue, Pass, if-else, while, for loops', completed: false },
            ],
          },
          {
            id: 'py-u2',
            title: 'Unit-III to V: Collections, Files & OOP in Python',
            weightagePercentage: 60,
            topics: [
              { id: 'py-t3', name: 'Strings, File I/O, Lists, Tuples, Dictionaries & Set operations', completed: false },
              { id: 'py-t4', name: 'Classes, Objects, Inheritance, Overriding, Exception Handling (try-except-finally)', completed: false },
            ],
          },
        ],
      },
      {
        id: 'csl110',
        code: 'CSL110',
        name: 'Computer Workshop (Linux & Shell Scripting)',
        credits: 1,
        color: 'slate',
        standardTextbook: 'Advanced Programming in UNIX Environment by W. Richard Stevens',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cw-u1',
            title: 'Linux Utilities & 10 Workshop Experiments',
            weightagePercentage: 100,
            topics: [
              { id: 'cw-t1', name: 'Exp 1-5: Linux commands (grep, sed, awk), Bash shell scripts, Pipes & Redirection', completed: false },
              { id: 'cw-t2', name: 'Exp 6-10: Inode structure, Process scheduling, IPC Pipes, Shared memory, Socket programming', completed: false },
            ],
          },
        ],
      },
    ],
  },

  // ==========================================
  // SEMESTER 2 (First Year / II Sem)
  // ==========================================
  2: {
    semester: 2,
    semesterName: '2nd Semester B.Tech (First Year)',
    academicYear: 'First Year / II Sem',
    coreSubjects: [
      {
        id: 'mab102',
        code: 'MAB-102',
        name: 'Statistics: Probability Distributions & Differential Equations',
        credits: 4,
        color: 'indigo',
        standardTextbook: 'Higher Engineering Mathematics by B.S. Grewal & Advance Engineering Mathematics (Kreyszig)',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'mab-u1',
            title: 'Unit-I & II: Probability & Sampling Distributions',
            weightagePercentage: 40,
            topics: [
              { id: 'mab-t1', name: 'Binomial, Poisson, Normal distributions, Method of least squares & Curve fitting', completed: false },
              { id: 'mab-t2', name: 'Sampling distributions: Student-t, F, and Chi-square (χ²) distributions', completed: false },
            ],
          },
          {
            id: 'mab-u2',
            title: 'Unit-III to V: Differential & Partial Differential Equations',
            weightagePercentage: 60,
            topics: [
              { id: 'mab-t3', name: 'First order & higher order linear differential equations with constant coefficients', completed: false },
              { id: 'mab-t4', name: 'Homogeneous linear, Legendre equation, Method of Variation of Parameters', completed: false },
              { id: 'mab-t5', name: 'Lagrange linear PDE, 2nd order PDE with constant coefficients (Wave & Heat equations)', completed: false },
            ],
          },
        ],
      },
      {
        id: 'csa103',
        code: 'CSA103',
        name: 'Problem Solving using Data Structures',
        credits: 4,
        color: 'emerald',
        standardTextbook: 'Data Structures through C by Yashwant Kanetkar & Schaum Outline',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'ds-u1',
            title: 'Unit-I & II: Arrays, Complexity & Linked Lists',
            weightagePercentage: 40,
            topics: [
              { id: 'ds-t1', name: 'Asymptotic complexity, 1D/2D Array address calculation, Sparse matrices', completed: false },
              { id: 'ds-t2', name: 'Singly, Doubly, and Circular Linked Lists with polynomial manipulation', completed: false },
            ],
          },
          {
            id: 'ds-u2',
            title: 'Unit-III to V: Stacks, Queues, Trees, Graphs & Sorting',
            weightagePercentage: 60,
            topics: [
              { id: 'ds-t3', name: 'Stack (Infix to Postfix evaluation) & Queue (Circular, Priority queue)', completed: false },
              { id: 'ds-t4', name: 'Binary Search Tree (BST), AVL balanced tree, Graph BFS & DFS traversal', completed: false },
              { id: 'ds-t5', name: 'Sorting & Searching: Quick, Merge, Heap, Radix sort, Linear/Binary search & Hashing', completed: false },
            ],
          },
        ],
      },
      {
        id: 'csa104',
        code: 'CSA104',
        name: 'Principle of System Software',
        credits: 3,
        color: 'sky',
        standardTextbook: 'Systems Programming and Operating Systems by D.M. Dhamdhere',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'ss-u1',
            title: 'Unit-I & II: Language Processors & Assemblers',
            weightagePercentage: 40,
            topics: [
              { id: 'ss-t1', name: 'Language processing activities, Editors, Debug monitors & Programming environments', completed: false },
              { id: 'ss-t2', name: 'Elements of assembly language, Pass structure & Design of a Two-Pass Assembler', completed: false },
            ],
          },
          {
            id: 'ss-u2',
            title: 'Unit-III to V: Macros, Interpreters, Linkers & Loaders',
            weightagePercentage: 60,
            topics: [
              { id: 'ss-t3', name: 'Macro definitions, Nested macro calls & Macro Preprocessor design', completed: false },
              { id: 'ss-t4', name: 'Interpreters (Pure and Impure interpreters)', completed: false },
              { id: 'ss-t5', name: 'Relocation and Linking concepts, Design of Linker, Self-Relocating Programs & Loaders', completed: false },
            ],
          },
        ],
      },
      {
        id: 'mac102',
        code: 'MAC102',
        name: 'Professional Ethics & Social Responsibility',
        credits: 2,
        color: 'teal',
        standardTextbook: 'Professional Ethics includes Human Values by R. Subramanian (Oxford)',
        pyqPaperAvailable: false,
        modules: [
          {
            id: 'pe-u1',
            title: 'Units I-V: Ethics, Codes of Conduct & CSR',
            weightagePercentage: 100,
            topics: [
              { id: 'pe-t1', name: 'Principles of professional ethics, Codes of conduct in workplace', completed: false },
              { id: 'pe-t2', name: 'Corporate Social Responsibility (CSR), Environmental & Philanthropic ethics', completed: false },
            ],
          },
        ],
      },
    ],
  },

  // ==========================================
  // SEMESTER 3 (Second Year / III Sem)
  // ==========================================
  3: {
    semester: 3,
    semesterName: '3rd Semester B.Tech (Second Year)',
    academicYear: 'Second Year / III Sem',
    coreSubjects: [
      {
        id: 'mab301',
        code: 'MAB-301',
        name: 'Discrete Mathematics',
        credits: 4,
        color: 'indigo',
        standardTextbook: 'Elements of Discrete Mathematics by C.L. Liu & Kenneth Rosen',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'dm-u1',
            title: 'Unit-I & II: Sets, Relations, Functions & Induction',
            weightagePercentage: 40,
            topics: [
              { id: 'dm-t1', name: 'Cartesian products, Equivalence relations, Cantor\'s diagonal argument & Power set', completed: false },
              { id: 'dm-t2', name: 'Mathematical Induction, Euclidean GCD algorithm, Pigeon-hole principle, Permutations', completed: false },
            ],
          },
          {
            id: 'dm-u2',
            title: 'Unit-III to V: Logic, Algebraic Structures, Graphs & Trees',
            weightagePercentage: 60,
            topics: [
              { id: 'dm-t3', name: 'Propositional logic, Truth tables, Rules of inference & Proof techniques', completed: false },
              { id: 'dm-t4', name: 'Groups, Monoids, Rings, Integral domains, Fields & Boolean Algebra', completed: false },
              { id: 'dm-t5', name: 'Graph coloring, Eulerian/Hamiltonian walks, Spanning trees, Dijkstra shortest distances', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs302',
        code: 'CS-302',
        name: 'Analysis & Design of Algorithms (ADA)',
        credits: 4,
        color: 'emerald',
        standardTextbook: 'Introduction to Algorithms (CLRS) by Cormen, Leiserson, Rivest, Stein',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'ada-u1',
            title: 'Unit-I: Asymptotic Analysis & Divide-and-Conquer',
            weightagePercentage: 20,
            topics: [
              { id: 'ada-t1', name: 'Big-O, Omega, Theta notations, Master Theorem & Recurrence relations', completed: false },
              { id: 'ada-t2', name: 'Merge Sort, Quick Sort, Strassen\'s Matrix Multiplication analysis', completed: false },
            ],
          },
          {
            id: 'ada-u2',
            title: 'Unit-II: Greedy & Dynamic Programming',
            weightagePercentage: 25,
            topics: [
              { id: 'ada-t3', name: 'Knapsack problem, Job sequencing with deadlines, Huffman coding', completed: false },
              { id: 'ada-t4', name: '0/1 Knapsack, All pairs shortest path, Longest Common Subsequence (LCS), TSP', completed: false },
            ],
          },
          {
            id: 'ada-u3',
            title: 'Unit-III to V: Graphs, Backtracking & NP-Completeness',
            weightagePercentage: 55,
            topics: [
              { id: 'ada-t5', name: 'DFS, BFS, Dijkstra, Prim\'s & Kruskal\'s MST, Topological sorting', completed: false },
              { id: 'ada-t6', name: 'Branch & Bound (0/1 Knapsack, 8-puzzle), Backtracking (8-Queens, Graph coloring)', completed: false },
              { id: 'ada-t7', name: 'P, NP, NP-Complete, NP-Hard & Approximation algorithms', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs303',
        code: 'CS-303',
        name: 'Object Oriented Programming (Java)',
        credits: 4,
        color: 'purple',
        standardTextbook: 'The Complete Reference Java 2 by Herbert Schildt',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'java-u1',
            title: 'Unit-I & II: OOP Paradigms, Classes & Objects',
            weightagePercentage: 40,
            topics: [
              { id: 'java-t1', name: 'Procedural vs OOP, Bytecode, JVM, JDK, Classes, Objects & Data hiding', completed: false },
              { id: 'java-t2', name: 'Constructors, Overloading, Visibility modifiers, String & Wrapper classes', completed: false },
            ],
          },
          {
            id: 'java-u2',
            title: 'Unit-III to V: Inheritance, Packages, Multithreading & Exceptions',
            weightagePercentage: 60,
            topics: [
              { id: 'java-t3', name: 'Inheritance, Super, Polymorphism, Overriding, Static & Final keywords', completed: false },
              { id: 'java-t4', name: 'Abstract classes, Interfaces, Packages, CLASSPATH & Coupling/Cohesion', completed: false },
              { id: 'java-t5', name: 'Exception Handling (try-catch-finally), Multithreading, Thread lifecycle & Synchronization', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs304',
        code: 'CS-304',
        name: 'Operating System',
        credits: 4,
        color: 'sky',
        standardTextbook: 'Operating System Concepts by Silberschatz, Galvin & Gagne',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'os-u1',
            title: 'Unit-I & II: OS Architecture & Process Scheduling',
            weightagePercentage: 40,
            topics: [
              { id: 'os-t1', name: 'OS Evolution, System Calls, Process Control Block (PCB)', completed: false },
              { id: 'os-t2', name: 'CPU Scheduling Algorithms: FCFS, SJF, Round Robin, Priority & Multithreading', completed: false },
            ],
          },
          {
            id: 'os-u2',
            title: 'Unit-III to V: Concurrency, Memory & Disk Management',
            weightagePercentage: 60,
            topics: [
              { id: 'os-t3', name: 'IPC, Critical Section, Semaphores, Deadlock Avoidance (Banker\'s Algorithm)', completed: false },
              { id: 'os-t4', name: 'Memory Hierarchy, Paging, Segmentation, Virtual Memory, Page replacement (FIFO, LRU)', completed: false },
              { id: 'os-t5', name: 'File systems, Inode structure, Disk scheduling (FCFS, SCAN, C-SCAN)', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs305',
        code: 'CS-305',
        name: 'Computer System Organization (CSO)',
        credits: 3,
        color: 'teal',
        standardTextbook: 'Computer Systems Architecture by M. Morris Mano',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cso-u1',
            title: 'Unit-I to V: RTL, CPU, Control Unit & Pipelining',
            weightagePercentage: 100,
            topics: [
              { id: 'cso-t1', name: 'Register Transfer Language, Bus & Memory Transfers, Arithmetic Microoperations', completed: false },
              { id: 'cso-t2', name: 'CPU Design, Instruction Cycle, Addressing Modes, Computer Arithmetic', completed: false },
              { id: 'cso-t3', name: 'Control Unit Design (Hardwired vs Microprogrammed), Memory Hierarchy & Cache Mapping', completed: false },
              { id: 'cso-t4', name: 'Parallel Processing, Arithmetic & Instruction Pipelining, Multiprocessors', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs306',
        code: 'CS-306',
        name: 'Internet Programming',
        credits: 2,
        color: 'amber',
        standardTextbook: 'Web Technologies: TCP/IP, Web/Java Programming by Achyut Godbole',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'ip-u1',
            title: 'Units I-V & 15 Web Experiments',
            weightagePercentage: 100,
            topics: [
              { id: 'ip-t1', name: 'HTTP Requests/Responses, HTML5 Semantic Elements, CSS3 Flex/Transitions', completed: false },
              { id: 'ip-t2', name: 'JavaScript DOM Manipulation, Form Validation, DHTML, Event Handling & XML', completed: false },
            ],
          },
        ],
      },
    ],
  },

  // ==========================================
  // SEMESTER 4 (Second Year / IV Sem)
  // ==========================================
  4: {
    semester: 4,
    semesterName: '4th Semester B.Tech (Second Year)',
    academicYear: 'Second Year / IV Sem',
    coreSubjects: [
      {
        id: 'cs401',
        code: 'CS-401',
        name: 'Computer Network',
        credits: 4,
        color: 'emerald',
        standardTextbook: 'Computer Networks (Tanenbaum 4th Ed) & Data Communications (William Stallings)',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cn-u1',
            title: 'Unit-I: Layered Architecture & OSI Model',
            weightagePercentage: 20,
            topics: [
              { id: 'cn-t1', name: 'ISO-OSI 7-Layer Reference Model vs TCP/IP Protocol Stack', completed: false },
              { id: 'cn-t2', name: 'Connection-oriented vs Connectionless services & Network standardization', completed: false },
            ],
          },
          {
            id: 'cn-u2',
            title: 'Unit-II: Media, Topology & Connecting Devices',
            weightagePercentage: 20,
            topics: [
              { id: 'cn-t3', name: 'Guided/Unguided Media, Topologies (Mesh, Star, Bus, Ring)', completed: false },
              { id: 'cn-t4', name: 'Repeaters, Hubs, Bridges, 2-Layer & 3-Layer Switches, Gateways', completed: false },
            ],
          },
          {
            id: 'cn-u3',
            title: 'Unit-III: Data Link Layer & MAC Sublayer',
            weightagePercentage: 20,
            topics: [
              { id: 'cn-t5', name: 'Framing methods, Flow & Error control, Sliding Window protocols', completed: false },
              { id: 'cn-t6', name: 'ALOHA (Pure/Slotted), CSMA/CD, CSMA/CA & IEEE 802.3/802.11 standards', completed: false },
            ],
          },
          {
            id: 'cn-u4',
            title: 'Unit-IV: Network Layer & Routing Algorithms',
            weightagePercentage: 20,
            topics: [
              { id: 'cn-t7', name: 'Dijkstra Least Cost Routing & Bellman-Ford Distance Vector', completed: false },
              { id: 'cn-t8', name: 'Hierarchical Routing, Congestion Control policies, IPv4 vs IPv6 & Subnetting', completed: false },
            ],
          },
          {
            id: 'cn-u5',
            title: 'Unit-V: Transport & Application Layers',
            weightagePercentage: 20,
            topics: [
              { id: 'cn-t9', name: 'TCP 3-way handshake, UDP, Congestion Control & QoS techniques', completed: false },
              { id: 'cn-t10', name: 'DNS, SMTP, FTP, HTTP, WWW, VoIP & Virtual Terminal Protocol', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs402',
        code: 'CS-402',
        name: 'Database Management System',
        credits: 4,
        color: 'sky',
        standardTextbook: 'Database System Concepts by Silberschatz, Korth (7th Ed)',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'dbms-u1',
            title: 'Unit-I: 3-Schema Architecture & ER Modeling',
            weightagePercentage: 20,
            topics: [
              { id: 'dbms-t1', name: '3-Schema Architecture, Data Independence & DBMS Components', completed: false },
              { id: 'dbms-t2', name: 'Conceptual ER Modeling: Entities, Attributes, Relationships & Constraints', completed: false },
            ],
          },
          {
            id: 'dbms-u2',
            title: 'Unit-II: Relational Model & SQL',
            weightagePercentage: 20,
            topics: [
              { id: 'dbms-t3', name: 'Relational Algebra Operators (Select, Project, Cartesian, Joins)', completed: false },
              { id: 'dbms-t4', name: 'SQL DDL, DML, Primary/Foreign keys, Group By, Having & Aggregate queries', completed: false },
            ],
          },
          {
            id: 'dbms-u3',
            title: 'Unit-III: Normalization Theory (1NF to 5NF)',
            weightagePercentage: 25,
            topics: [
              { id: 'dbms-t5', name: 'Functional Dependencies, Armstrong Axioms & Minimal Cover', completed: false },
              { id: 'dbms-t6', name: '1NF, 2NF, 3NF, BCNF, 4NF, 5NF Decomposition & Dependency Preservation', completed: false },
            ],
          },
          {
            id: 'dbms-u4',
            title: 'Unit-IV: Transaction Processing & Recovery',
            weightagePercentage: 20,
            topics: [
              { id: 'dbms-t7', name: 'ACID Properties, Serializability & Lock-Based Concurrency Control (2PL)', completed: false },
              { id: 'dbms-t8', name: 'Crash Recovery: Undo, Redo, Write-Ahead Logging (WAL) & Checkpoints', completed: false },
            ],
          },
          {
            id: 'dbms-u5',
            title: 'Unit-V: Storage, Indexing & B+ Trees',
            weightagePercentage: 15,
            topics: [
              { id: 'dbms-t9', name: 'File Organization, Primary/Secondary Indexing & Dynamic Hashing', completed: false },
              { id: 'dbms-t10', name: 'B+ Tree Index insertion, deletion and search mechanics', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs403',
        code: 'CS-403',
        name: 'Automata & Compiler Design',
        credits: 4,
        color: 'purple',
        standardTextbook: 'Principles of Compiler Design by Aho, Ullman, Sethi (Dragon Book)',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cd-u1',
            title: 'Unit-I: Finite Automata & Regular Expressions',
            weightagePercentage: 20,
            topics: [
              { id: 'cd-t1', name: 'Deterministic Finite Automata (DFA) & NFA equivalence', completed: false },
              { id: 'cd-t2', name: 'DFA Minimization algorithm, Regular expressions & Arden\'s theorem', completed: false },
            ],
          },
          {
            id: 'cd-u2',
            title: 'Unit-II: Lexical Analysis & CFG',
            weightagePercentage: 20,
            topics: [
              { id: 'cd-t3', name: 'Phases of Compiler, Lexical Tokens, Symbol Table & Bootstrapping', completed: false },
              { id: 'cd-t4', name: 'Context Free Grammars (CFG), Chomsky Hierarchy & Ambiguity Resolution', completed: false },
            ],
          },
          {
            id: 'cd-u3',
            title: 'Unit-III: Parsing Techniques (Top-Down & Bottom-Up)',
            weightagePercentage: 25,
            topics: [
              { id: 'cd-t5', name: 'Recursive Descent & Predictive LL(1) Parsing with FIRST/FOLLOW sets', completed: false },
              { id: 'cd-t6', name: 'Shift-Reduce, Operator Precedence, LR(0), SLR(1), LALR(1) & YACC', completed: false },
            ],
          },
          {
            id: 'cd-u4',
            title: 'Unit-IV & V: Code Generation & Optimization',
            weightagePercentage: 35,
            topics: [
              { id: 'cd-t7', name: 'Intermediate representations: Three-address code, Quadruples, Triples & SDT', completed: false },
              { id: 'cd-t8', name: 'Runtime storage allocation (Stack-based activation records)', completed: false },
              { id: 'cd-t9', name: 'Code Optimization: Basic blocks, Flow graphs, DAG & Peephole optimization', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs404',
        code: 'CS-404',
        name: 'Software Engineering',
        credits: 4,
        color: 'teal',
        standardTextbook: 'Software Engineering: A Practitioner\'s Approach by Roger S. Pressman',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'se-u1',
            title: 'Unit-I: SDLC Process Models & Agile',
            weightagePercentage: 20,
            topics: [
              { id: 'se-t1', name: 'Waterfall, Prototyping, RAD, Spiral & Agile Scrum process models', completed: false },
              { id: 'se-t2', name: 'CMMI Levels and ISO 9000 quality standards', completed: false },
            ],
          },
          {
            id: 'se-u2',
            title: 'Unit-II & III: SRS, Estimation & Architecture',
            weightagePercentage: 40,
            topics: [
              { id: 'se-t3', name: 'Software Requirement Specification (SRS), DFD & Use Case modeling', completed: false },
              { id: 'se-t4', name: 'COCOMO estimation model, CPM/PERT project scheduling & Halstead metrics', completed: false },
            ],
          },
          {
            id: 'se-u3',
            title: 'Unit-IV & V: Testing & Maintenance',
            weightagePercentage: 40,
            topics: [
              { id: 'se-t5', name: 'Unit, Integration, System, Black-box (BVA) & White-box structural testing', completed: false },
              { id: 'se-t6', name: 'Software reengineering, Version control & RMMM risk plan', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs405',
        code: 'CS-405',
        name: 'Foundation of Blockchain Technology',
        credits: 3,
        color: 'amber',
        standardTextbook: 'Blockchain: The Beginners Guide by Artemis Caro',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'bc4-u1',
            title: 'Units I-V: Cryptography, Smart Contracts & Ethereum',
            weightagePercentage: 100,
            topics: [
              { id: 'bc4-t1', name: 'Hashing puzzles, Public-Key Cryptography & Blockchain Architecture', completed: false },
              { id: 'bc4-t2', name: 'Bitcoin Mechanics, Ethereum, Hyperledger Fabric & Real-world use cases', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs406',
        code: 'CS-406',
        name: 'Advanced Java Programming (Lab Course)',
        credits: 2,
        color: 'rose',
        standardTextbook: 'Programming in Java by E. Balagurusamy & Herbert Schildt',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'aj-u1',
            title: 'Units I-V & 20 Official Lab Experiments',
            weightagePercentage: 100,
            topics: [
              { id: 'aj-t1', name: 'JVM, Collections Framework, Multithreading, Sockets, RMI, JDBC Database Connectivity', completed: false },
              { id: 'aj-t2', name: 'Servlets, JSP, Session Tracking & Spring MVC overview with all 20 lab experiments', completed: false },
            ],
          },
        ],
      },
    ],
  },

  // ==========================================
  // SEMESTER 5 (Third Year / V Sem)
  // ==========================================
  5: {
    semester: 5,
    semesterName: '5th Semester B.Tech (Third Year)',
    academicYear: 'Third Year / V Sem',
    coreSubjects: [
      {
        id: 'cs501',
        code: 'CS–501',
        name: 'Artificial Intelligence',
        credits: 3,
        color: 'indigo',
        standardTextbook: 'Artificial Intelligence: A Modern Approach by Stuart Russell & Peter Norvig',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'ai-u1',
            title: 'Unit-I & II: Agents & Search Strategies',
            weightagePercentage: 40,
            topics: [
              { id: 'ai-t1', name: 'Intelligent Agents, State Space Search, Constraint Satisfaction', completed: false },
              { id: 'ai-t2', name: 'Uninformed (BFS/DFS) vs Informed (A*, Heuristic) & Backtracking Search', completed: false },
            ],
          },
          {
            id: 'ai-u2',
            title: 'Unit-III to V: Knowledge, Reasoning & Minimax',
            weightagePercentage: 60,
            topics: [
              { id: 'ai-t3', name: 'First Order Logic, Forward/Backward Chaining & Resolution', completed: false },
              { id: 'ai-t4', name: 'Bayesian Networks, Probabilistic Reasoning & Temporal Models', completed: false },
              { id: 'ai-t5', name: 'Minimax Game Playing, Alpha-Beta Pruning & Expert Systems', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs502',
        code: 'CS–502',
        name: 'Distributed System',
        credits: 3,
        color: 'sky',
        standardTextbook: 'Distributed Systems: Concepts and Design by George Coulouris',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'ds-u1',
            title: 'Unit-I & II: Architecture, IPC & Clock Sync',
            weightagePercentage: 40,
            topics: [
              { id: 'ds-t1', name: 'Architecture, RPC mechanism, Stub generation & Group communication', completed: false },
              { id: 'ds-t2', name: 'Lamport & Vector Logical Clocks, Clock Synchronization algorithms', completed: false },
            ],
          },
          {
            id: 'ds-u2',
            title: 'Unit-III to V: DSM, Mutual Exclusion & 2PC',
            weightagePercentage: 60,
            topics: [
              { id: 'ds-t3', name: 'Distributed Shared Memory (DSM) & Distributed File System (NFS)', completed: false },
              { id: 'ds-t4', name: 'Distributed Mutual Exclusion (Token/Non-token) & Deadlock Detection', completed: false },
              { id: 'ds-t5', name: 'Distributed Transactions, 2-Phase Commit (2PC) & Concurrency Control', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs503',
        code: 'CS–503',
        name: 'Computer Graphics & Multimedia',
        credits: 4,
        color: 'purple',
        standardTextbook: 'Computer Graphics C Version by Donald Hearn & M. Pauline Baker',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cg-u1',
            title: 'Unit-I & II: Scan Conversion & 2D Transforms',
            weightagePercentage: 40,
            topics: [
              { id: 'cg-t1', name: 'CRT, Scanline, Flood Fill, DDA & Bresenham Line & Circle algorithms', completed: false },
              { id: 'cg-t2', name: '2D Transformations, Cohen-Sutherland Line Clipping & Sutherland-Hodgman', completed: false },
            ],
          },
          {
            id: 'cg-u2',
            title: 'Unit-III to V: 3D, Curves, Shading & Multimedia',
            weightagePercentage: 60,
            topics: [
              { id: 'cg-t3', name: '3D Projections, Bezier & B-Spline Curves, Z-Buffer & Painter\'s algorithm', completed: false },
              { id: 'cg-t4', name: 'Phong & Gouraud Shading models, RGB, CMY, HSV Color models', completed: false },
              { id: 'cg-t5', name: 'Multimedia compression standards: JPEG, MPEG, MP3 & Video authoring', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs506',
        code: 'CS–506',
        name: 'Programming Lab I (Computer Graphics Lab)',
        credits: 2,
        color: 'emerald',
        standardTextbook: 'OpenGL ES Programming Guide & Computer Graphics in C',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cg-lab',
            title: '16 Official SATI Lab Experiments',
            weightagePercentage: 100,
            topics: [
              { id: 'cg-e1', name: 'Exp 1-5: DDA, Bresenham Line & Midpoint Circle algorithms in C', completed: false },
              { id: 'cg-e2', name: 'Exp 6-10: 2D Transformations, Shear, Rotating Circle, Car Animation', completed: false },
              { id: 'cg-e3', name: 'Exp 11-16: 3D Cube transformation, Cohen-Sutherland Clipping, Bezier & Solar System', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs507',
        code: 'CS–507',
        name: 'Programming Lab II (Web Technology Lab)',
        credits: 2,
        color: 'teal',
        standardTextbook: 'Web Technologies: TCP/IP, Web/Java Programming by Achyut Godbole',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'wt-lab',
            title: '10 Official Web Experiments',
            weightagePercentage: 100,
            topics: [
              { id: 'wt-e1', name: 'Exp 1-5: XAMPP on Linux, HTML Form with PHP, MySQLi CRUD connectivity', completed: false },
              { id: 'wt-e2', name: 'Exp 6-10: OOP MySQLi, File Upload, Session Login & AJAX XMLHttpRequest scripts', completed: false },
            ],
          },
        ],
      },
    ],
    electiveGroups: [
      {
        groupName: 'Departmental Elective (CS-504)',
        description: 'Choose 1 of Software Testing, Web Technology, or Network Security:',
        defaultSelectedId: 'cs504a',
        subjects: [
          {
            id: 'cs504a',
            code: 'CS–504(A)',
            name: 'Software Testing',
            credits: 3,
            color: 'teal',
            standardTextbook: 'Software Testing: Principles and Practices by Srinivasan Desikan',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'st-u1',
                title: 'Unit-I to V: STLC, Black/White Box & Test Automation',
                weightagePercentage: 100,
                topics: [
                  { id: 'st-t1', name: 'V-Model, Unit, Integration, System, Acceptance & Smoke Testing', completed: false },
                  { id: 'st-t2', name: 'Boundary Value Analysis, Equivalence Class, Cyclomatic Complexity & DRE metrics', completed: false },
                ],
              },
            ],
          },
          {
            id: 'cs504b',
            code: 'CS–504(B)',
            name: 'Web Technology',
            credits: 3,
            color: 'sky',
            standardTextbook: 'HTML & CSS The Complete Reference by Thomas Powel',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'wt-u1',
                title: 'Unit-I to V: HTML5, CSS3, JS DOM, PHP & Sessions',
                weightagePercentage: 100,
                topics: [
                  { id: 'wt-t1', name: 'HTML5 Semantic elements, CSS3 Flexbox/Grid, JavaScript DOM event handling', completed: false },
                  { id: 'wt-t2', name: 'PHP backend processing, Form validation, Cookies & Session tracking', completed: false },
                ],
              },
            ],
          },
          {
            id: 'cs504c',
            code: 'CS–504(C)',
            name: 'Network Security',
            credits: 3,
            color: 'rose',
            standardTextbook: 'Cryptography and Network Security by William Stallings',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'ns-u1',
                title: 'Unit-I to V: Ciphers, DES, RSA, Diffie-Hellman & SHA',
                weightagePercentage: 100,
                topics: [
                  { id: 'ns-t1', name: 'Symmetric ciphers, DES Feistel structure, AES & Asymmetric RSA algorithm', completed: false },
                  { id: 'ns-t2', name: 'Diffie-Hellman key exchange, SHA-256, MD5, Digital Signatures & PKI', completed: false },
                ],
              },
            ],
          },
        ],
      },
      {
        groupName: 'Open Elective (CS-505)',
        description: 'Choose Foundation of Data Science or Artificial Intelligence:',
        defaultSelectedId: 'cs505a',
        subjects: [
          {
            id: 'cs505a',
            code: 'CS–505(A)',
            name: 'Foundation of Data Science',
            credits: 3,
            color: 'blue',
            standardTextbook: 'Data Science from Scratch by Joel Grus (O\'Reilly)',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'fds-u1',
                title: 'Unit-I to V: Data Cleaning, Stats, MongoDB & ML',
                weightagePercentage: 100,
                topics: [
                  { id: 'fds-t1', name: 'Data Science lifecycle, MongoDB document store & Data visualization', completed: false },
                  { id: 'fds-t2', name: 'Descriptive statistics, Karl Pearson correlation, Linear Regression & ML basics', completed: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ==========================================
  // SEMESTER 6 (Third Year / VI Sem)
  // ==========================================
  6: {
    semester: 6,
    semesterName: '6th Semester B.Tech (Third Year)',
    academicYear: 'Third Year / VI Sem',
    coreSubjects: [
      {
        id: 'cs601',
        code: 'CS–601',
        name: 'Cloud Computing',
        credits: 4,
        color: 'sky',
        standardTextbook: 'Cloud Computing by Dr. Kumar Saurabh & Barrie Sosinsky',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cc-u1',
            title: 'Unit-I & II: NIST Model & Virtualization',
            weightagePercentage: 40,
            topics: [
              { id: 'cc-t1', name: 'NIST Cloud Cube, IaaS, PaaS, SaaS, Public/Private/Hybrid Cloud', completed: false },
              { id: 'cc-t2', name: 'Abstraction & Virtualization, Hypervisors (Type 1 & 2), VMware & Load Balancing', completed: false },
            ],
          },
          {
            id: 'cc-u2',
            title: 'Unit-III to V: AWS, Azure & Cloud Security',
            weightagePercentage: 60,
            topics: [
              { id: 'cc-t3', name: 'Google App Engine, Amazon AWS (EC2, S3, EBS, Elastic Cloud)', completed: false },
              { id: 'cc-t4', name: 'Microsoft Azure architecture, AppFabric, SQL Azure & Cloud Lifecycle', completed: false },
              { id: 'cc-t5', name: 'Cloud Security, Data encryption, Multi-tenancy & Service Oriented Architecture (SOA)', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs602',
        code: 'CS–602',
        name: 'Machine Learning',
        credits: 3,
        color: 'indigo',
        standardTextbook: 'Introduction to Machine Learning by Ethem Alpaydin (MIT Press)',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'ml-u1',
            title: 'Unit-I & II: PAC Learning & Supervised Regression',
            weightagePercentage: 40,
            topics: [
              { id: 'ml-t1', name: 'Hypothesis spaces, Inductive bias, Bias-Variance tradeoff', completed: false },
              { id: 'ml-t2', name: 'Linear regression, Least squares, Gradient descent & Perceptron', completed: false },
            ],
          },
          {
            id: 'ml-u2',
            title: 'Unit-III to V: Classification, Unsupervised & Ensembles',
            weightagePercentage: 60,
            topics: [
              { id: 'ml-t3', name: 'Logistic Regression, Naive Bayes, Support Vector Machines (SVM) & Decision Trees', completed: false },
              { id: 'ml-t4', name: 'K-Means, KNN, Gaussian Mixture Models (GMM) & Principal Component Analysis (PCA)', completed: false },
              { id: 'ml-t5', name: 'Ensemble Learning: Bagging, Boosting (AdaBoost, XGBoost), Stacking & K-fold CV', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs606',
        code: 'CS–606',
        name: 'Programming Lab-III (ML & Cloud Lab)',
        credits: 2,
        color: 'emerald',
        standardTextbook: 'Hands-On Machine Learning with Scikit-Learn & Python',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'ml-lab',
            title: '16 Lab Experiments: Cloud & Scikit-Learn',
            weightagePercentage: 100,
            topics: [
              { id: 'mll-t1', name: 'Exp 1-6: VirtualBox Linux VM, AWS S3 buckets, Azure Case Study & Hadoop MapReduce', completed: false },
              { id: 'mll-t2', name: 'Exp 7-16: Linear/Logistic Regression, Naive Bayes, KNN, SVM & ID3 Decision Tree in Python', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs607',
        code: 'CS–607',
        name: 'Minor Project-I',
        credits: 4,
        color: 'amber',
        standardTextbook: 'Planning Algorithms (S. M. LaValle) & Project Management (David I Cleland)',
        pyqPaperAvailable: false,
        modules: [
          {
            id: 'min-u1',
            title: 'Synopsis, Mid-Sem & End-Sem Viva Evaluation',
            weightagePercentage: 100,
            topics: [
              { id: 'min-t1', name: 'Problem Identification, Literature Review & Approval by Coordinator', completed: false },
              { id: 'min-t2', name: 'Software/Hardware Prototype Implementation & Logbook Maintenance', completed: false },
              { id: 'min-t3', name: 'Technical Report Writing, PPT Presentation & Practical Viva-Voce', completed: false },
            ],
          },
        ],
      },
    ],
    electiveGroups: [
      {
        groupName: 'Departmental Elective 1 (CS-603)',
        description: 'Choose Advanced Web Technologies, Project Management, or Cyber Security:',
        defaultSelectedId: 'cs603b',
        subjects: [
          {
            id: 'cs603b',
            code: 'CS-603(B)',
            name: 'Advanced Web Technologies',
            credits: 3,
            color: 'teal',
            standardTextbook: 'PHP: The Complete Reference & React.js Design Patterns by Anthony Onyekachukwu',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'awt-u1',
                title: 'Unit-I to V: OOP PHP, Laravel, Node.js & React.js',
                weightagePercentage: 100,
                topics: [
                  { id: 'awt-t1', name: 'OOP with PHP, cURL Web Scraping, REST APIs & Services', completed: false },
                  { id: 'awt-t2', name: 'Laravel MVC Architecture, Eloquent ORM, Routing & Database migrations', completed: false },
                  { id: 'awt-t3', name: 'Node.js Express Server, NPM & RESTful JSON API endpoints', completed: false },
                  { id: 'awt-t4', name: 'React.js JSX, Functional Components & Hooks (useState, useEffect)', completed: false },
                ],
              },
            ],
          },
          {
            id: 'cs603a',
            code: 'CS–603(A)',
            name: 'Project Management',
            credits: 3,
            color: 'amber',
            standardTextbook: 'Software Project Management by Bob Hughes and Mike Cotterell',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'pm-u1',
                title: 'Unit-I to V: PERT/CPM, Agile Scrum & Cost Variance',
                weightagePercentage: 100,
                topics: [
                  { id: 'pm-t1', name: 'Project Lifecycle, Feasibility study & SWOT analysis', completed: false },
                  { id: 'pm-t2', name: 'PERT/CPM networks, Forward/Backward pass, Critical Path & Floats', completed: false },
                  { id: 'pm-t3', name: 'Agile Manifesto, Scrum Framework, Sprints & Burndown charts', completed: false },
                ],
              },
            ],
          },
          {
            id: 'cs603c',
            code: 'CS–603(C)',
            name: 'Cyber Security',
            credits: 3,
            color: 'rose',
            standardTextbook: 'Law Relating to Computer Internet and E-commerce by Nandan Kamath',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'cs-u1',
                title: 'Unit-I to V: ITA 2000, Forensics, Digital Evidence & Law',
                weightagePercentage: 100,
                topics: [
                  { id: 'cs-t1', name: 'Cybercrime classification, Botnets, Indian Information Technology Act 2000', completed: false },
                  { id: 'cs-t2', name: 'Computer forensics, Evidence seizure, Digital signatures & Cyber laws', completed: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ==========================================
  // SEMESTER 7 (Final Year / VII Sem)
  // ==========================================
  7: {
    semester: 7,
    semesterName: '7th Semester B.Tech (Final Year)',
    academicYear: 'Fourth Year / VII Sem',
    coreSubjects: [
      {
        id: 'cs701',
        code: 'CS–701',
        name: 'Deep Learning',
        credits: 3,
        color: 'indigo',
        standardTextbook: 'Deep Learning by Ian Goodfellow, Yoshua Bengio, Aaron Courville (MIT Press)',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cs701-m1',
            title: 'Unit-I: History, Perceptrons & Backpropagation',
            weightagePercentage: 20,
            topics: [
              { id: 'cs701-t1', name: 'History of Deep Learning & Success Stories', completed: false },
              { id: 'cs701-t2', name: 'Neuron model, activation functions & Perceptron Learning', completed: false },
              { id: 'cs701-t3', name: 'Multilayer Perceptrons (MLPs) & Feed Forward Neural Networks', completed: false },
              { id: 'cs701-t4', name: 'Backpropagation, Weight initialization & Batch Normalization', completed: false },
              { id: 'cs701-t5', name: 'Representation Learning, GPU implementation, PCA & SVD', completed: false },
            ],
          },
          {
            id: 'cs701-m2',
            title: 'Unit-II: Deep Optimization & Autoencoders',
            weightagePercentage: 20,
            topics: [
              { id: 'cs701-t6', name: 'Gradient Descent (GD), Momentum Based GD & Nesterov GD', completed: false },
              { id: 'cs701-t7', name: 'Stochastic GD, AdaGrad, Adam & RMSProp optimizers', completed: false },
              { id: 'cs701-t8', name: 'Autoencoders: Denoising, Sparse, Contractive & Variational (VAE)', completed: false },
            ],
          },
          {
            id: 'cs701-m3',
            title: 'Unit-III: Convolutional Neural Networks (CNN)',
            weightagePercentage: 25,
            topics: [
              { id: 'cs701-t10', name: 'CNN Architectures, ReLU, Stride, Padding & Pooling', completed: false },
              { id: 'cs701-t11', name: 'LeNet, AlexNet, ZF-Net, VGGNet, GoogLeNet, ResNet & RCNN', completed: false },
              { id: 'cs701-t13', name: 'Regularization: Dropout, DropConnect, Pruning, Early Stopping', completed: false },
            ],
          },
          {
            id: 'cs701-m4',
            title: 'Unit-IV: Recurrent Neural Networks & Attention',
            weightagePercentage: 20,
            topics: [
              { id: 'cs701-t14', name: 'RNN Architectures, Backpropagation Through Time (BPTT)', completed: false },
              { id: 'cs701-t15', name: 'Vanishing & Exploding Gradients, GRUs & LSTMs', completed: false },
              { id: 'cs701-t17', name: 'Attention Mechanism & Hierarchical Attention over images', completed: false },
            ],
          },
          {
            id: 'cs701-m5',
            title: 'Unit-V: Deep Generative Models & Real Applications',
            weightagePercentage: 15,
            topics: [
              { id: 'cs701-t18', name: 'Restricted Boltzmann Machines (RBMs) & Deep Belief Networks', completed: false },
              { id: 'cs701-t20', name: 'Generative Adversarial Networks (GANs)', completed: false },
              { id: 'cs701-t21', name: 'Applications in Object Detection, Speech recognition, Video & NLP', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs705',
        code: 'CS–705',
        name: 'Major Project Prelim',
        credits: 3,
        color: 'amber',
        standardTextbook: 'Planning Algorithms (S. M. LaValle) & Project Management (David I Cleland)',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cs705-m1',
            title: 'Phase I: Problem Statement & Requirements (Mid Sem I - 4 Marks)',
            weightagePercentage: 35,
            topics: [
              { id: 'cs705-t1', name: 'Identification of Research Gap & Literature Survey', completed: false },
              { id: 'cs705-t2', name: 'Requirement Engineering & Tech Stack Finalization', completed: false },
            ],
          },
          {
            id: 'cs705-m2',
            title: 'Phase II: Architecture & Risk Management (Mid Sem II - 4 Marks)',
            weightagePercentage: 35,
            topics: [
              { id: 'cs705-t4', name: 'System Use Case, Class Diagrams & Block Architecture', completed: false },
              { id: 'cs705-t6', name: 'Quality Synopsis & Research Methodology Submission', completed: false },
            ],
          },
          {
            id: 'cs705-m3',
            title: 'Phase III: Internal (12M) & External Defense (30M)',
            weightagePercentage: 30,
            topics: [
              { id: 'cs705-t7', name: 'Working Prototype Demonstration & Innovation Analysis', completed: false },
              { id: 'cs705-t9', name: 'Project Dissertation Report in IEEE Standard Format', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs706',
        code: 'CS–706',
        name: 'Programming Lab IV (Deep Learning Lab)',
        credits: 2,
        color: 'emerald',
        standardTextbook: 'Hands-On Machine Learning with Scikit-Learn, Keras and TensorFlow (Aurelien Geron)',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cs706-m1',
            title: 'Official SATI 11 Lab Experiments',
            weightagePercentage: 100,
            topics: [
              { id: 'cs706-exp1', name: 'Exp 1: Extract data from database using Python', completed: false },
              { id: 'cs706-exp2', name: 'Exp 2: Python Program to implement single Perceptron', completed: false },
              { id: 'cs706-exp3', name: 'Exp 3: Implement AND and OR logic gates using Perceptron', completed: false },
              { id: 'cs706-exp4', name: 'Exp 4: Implement Linear Regression using Python & Gradient Descent', completed: false },
              { id: 'cs706-exp5', name: 'Exp 5: Genetic Algorithm implementation in Python', completed: false },
              { id: 'cs706-exp6', name: 'Exp 6: Backpropagation Algorithm implementation from scratch', completed: false },
              { id: 'cs706-exp7', name: 'Exp 7: Linearly Separable Data Classification using Perceptron', completed: false },
              { id: 'cs706-exp8', name: 'Exp 8: LSTM Architecture for Time Series Prediction', completed: false },
              { id: 'cs706-exp9', name: 'Exp 9: Comparative study of CNN vs RNN architectures', completed: false },
              { id: 'cs706-exp10', name: 'Exp 10: Deep Convolutional Nets: ImageNet, GoogLeNet & ResNet', completed: false },
              { id: 'cs706-exp11', name: 'Exp 11: Stock Price Prediction using LSTM / GRU based on historical data', completed: false },
            ],
          },
        ],
      },
      {
        id: 'cs707',
        code: 'CS–707',
        name: 'Internship-III Evaluation',
        credits: 3,
        color: 'teal',
        standardTextbook: 'Technical Communication: Principles and Practice by Meenakshi Raman',
        pyqPaperAvailable: false,
        modules: [
          {
            id: 'cs707-m1',
            title: 'Industry & Institute Evaluation Stages',
            weightagePercentage: 100,
            topics: [
              { id: 'cs707-t1', name: 'Industry Certificate, Remarks & Daily Diary Submission', completed: false },
              { id: 'cs707-t2', name: 'Comprehensive Training Report in Department Format', completed: false },
              { id: 'cs707-t3', name: 'Departmental Seminar Presentation before Expert Committee', completed: false },
            ],
          },
        ],
      },
    ],
    electiveGroups: [
      {
        groupName: 'Departmental Elective 3 (CS-702)',
        description: 'Choose OOAD, Bio-Informatics, or Optimization Techniques:',
        defaultSelectedId: 'cs702a',
        subjects: [
          {
            id: 'cs702a',
            code: 'CS-702(A)',
            name: 'Object Oriented Analysis & Design (OOAD)',
            credits: 3,
            color: 'cyan',
            standardTextbook: 'Object-Oriented Analysis and Design by Grady Booch (Pearson Education)',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'ooad-u1',
                title: 'Unit-I to V: OMT, UML, Design to Code & Distributed Objects',
                weightagePercentage: 100,
                topics: [
                  { id: 'ooad-t1', name: 'Modeling, Inheritance, Aggregation, Dynamic modeling & State diagrams', completed: false },
                  { id: 'ooad-t2', name: 'OMT methodology, System design, Class design vs SASD/JSD', completed: false },
                  { id: 'ooad-t3', name: 'Distributed object systems: CORBA, EJB, COM+, DCOM', completed: false },
                  { id: 'ooad-t4', name: 'UML Class, Sequence, Collaboration, State Machine & Deployment Diagrams', completed: false },
                ],
              },
            ],
          },
          {
            id: 'cs702b',
            code: 'CS–702(B)',
            name: 'Bio-Informatics',
            credits: 3,
            color: 'emerald',
            standardTextbook: 'Bioinformatics with Fundamentals of Genomics & Proteomics by Gopal and Jones',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'bio-u1',
                title: 'Units I-V: DNA/RNA, Sequence Alignment & Proteomics',
                weightagePercentage: 100,
                topics: [
                  { id: 'bio-t1', name: 'Nucleic acids, DNA/RNA structures, Cloning, GenBank databases', completed: false },
                  { id: 'bio-t2', name: 'Sequence Alignment (BLAST, FASTA), Gene mapping, E-Cell simulation', completed: false },
                ],
              },
            ],
          },
          {
            id: 'cs702c',
            code: 'CS-702(C)',
            name: 'Optimization Techniques',
            credits: 3,
            color: 'amber',
            standardTextbook: 'Optimization: Theory and Applications by S.S. Rao',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'opt-u1',
                title: 'Units I-V: Simplex, Queuing & Non-Linear Optimization',
                weightagePercentage: 100,
                topics: [
                  { id: 'opt-t1', name: 'Linear Programming, Simplex methods, Duality, Transportation, Queuing theory', completed: false },
                  { id: 'opt-t2', name: 'Steepest descent, Conjugate gradient, Kuhn-Tucker conditions', completed: false },
                ],
              },
            ],
          },
        ],
      },
      {
        groupName: 'Departmental Elective 4 (CS-703)',
        description: 'Choose Android Programming, NLP, or Blockchain & IoT:',
        defaultSelectedId: 'cs703a',
        subjects: [
          {
            id: 'cs703a',
            code: 'CS–703(A)',
            name: 'Android Programming',
            credits: 3,
            color: 'emerald',
            standardTextbook: 'Android Programming: The Big Nerd Ranch Guide by Bill Phillips & Chris Stewart',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'and-u1',
                title: 'Units I-V: Architecture, UI, Room DB, WorkManager & Retrofit',
                weightagePercentage: 100,
                topics: [
                  { id: 'and-t1', name: 'ART, Project structure, Activity lifecycle, Intents, UI Views & Layouts', completed: false },
                  { id: 'and-t2', name: 'Room Persistence Library, LiveData, WorkManager, Retrofit & Play Store release', completed: false },
                ],
              },
            ],
          },
          {
            id: 'cs703b',
            code: 'CS–703(B)',
            name: 'Natural Language Processing (NLP)',
            credits: 3,
            color: 'rose',
            standardTextbook: 'Speech and Language Processing by Daniel Jurafsky & James H. Martin',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'nlp-u1',
                title: 'Units I-V: N-grams, POS, Parsing & Machine Translation',
                weightagePercentage: 100,
                topics: [
                  { id: 'nlp-t1', name: 'N-gram language models, HMM POS tagging, Context Free Grammars', completed: false },
                  { id: 'nlp-t2', name: 'Semantic Analysis, WordNet, Named Entity Recognition, Machine Translation', completed: false },
                ],
              },
            ],
          },
          {
            id: 'cs703c',
            code: 'CS–703(C)',
            name: 'Blockchain and IoT',
            credits: 3,
            color: 'violet',
            standardTextbook: 'Handbook of IoT and Blockchain by Brojo Kishore Mishra & Sanjay Kumar Kuanar',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'bc-u1',
                title: 'Units I-V: Consensus, Smart Contracts, BaaS & IoT Security',
                weightagePercentage: 100,
                topics: [
                  { id: 'bc-t1', name: 'PoW, PoS, Smart Contracts, Sensing layer security challenges', completed: false },
                  { id: 'bc-t2', name: 'Blockchain as a Service (BaaS), Smart Cities & VANETs use cases', completed: false },
                ],
              },
            ],
          },
        ],
      },
      {
        groupName: 'Open Elective (CS-704)',
        description: 'Choose Data Engineering & Analytics, Wireless Networks, or Ubiquitous Computing:',
        defaultSelectedId: 'cs704b',
        subjects: [
          {
            id: 'cs704b',
            code: 'CS–704(B)',
            name: 'Data Engineering & Analytics',
            credits: 3,
            color: 'teal',
            standardTextbook: 'Hadoop: The Definitive Guide by Tom White (O\'Reilly Media)',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'dea-u1',
                title: 'Units I-V: HDFS, MapReduce, Pig, Hive & R Analytics',
                weightagePercentage: 100,
                topics: [
                  { id: 'dea-t1', name: 'Big Data features, HDFS architecture, Sqoop/Flume ingest, MapReduce anatomy', completed: false },
                  { id: 'dea-t2', name: 'Pig Latin, Hive HiveQL vs RDBMS, HBase NoSQL, Machine Learning in R', completed: false },
                ],
              },
            ],
          },
          {
            id: 'cs704a',
            code: 'CS–704(A)',
            name: 'Wireless Networks',
            credits: 3,
            color: 'blue',
            standardTextbook: 'Principles of Wireless Networks by Kaveh Pahlavan & Prashant Krishnamurthy',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'wn-u1',
                title: 'Units I-V: Radio Propagation, Cellular, CDMA, 802.11 WLAN',
                weightagePercentage: 100,
                topics: [
                  { id: 'wn-t1', name: 'Wireless generations, Multipath/Doppler, Cellular topology & CDMA', completed: false },
                  { id: 'wn-t2', name: 'FDMA/TDMA/OFDM, IEEE 802.11 WLAN architecture, Bluetooth, 2.5G/3G', completed: false },
                ],
              },
            ],
          },
          {
            id: 'cs704c',
            code: 'CS–704(C)',
            name: 'Pervasive & Ubiquitous Computing',
            credits: 3,
            color: 'purple',
            standardTextbook: 'Pervasive Computing: Technology and Architecture by Jochen Burkhardt',
            pyqPaperAvailable: true,
            modules: [
              {
                id: 'puc-u1',
                title: 'Units I-V: Context-Awareness, RFID, BLE, Wearables & Mixed Reality',
                weightagePercentage: 100,
                topics: [
                  { id: 'puc-t1', name: 'Pervasive architecture, Sensor networks, RFID, NFC, BLE, Wearable computing', completed: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ==========================================
  // SEMESTER 8 (Final Year / VIII Sem)
  // ==========================================
  8: {
    semester: 8,
    semesterName: '8th Semester B.Tech (Final Year)',
    academicYear: 'Fourth Year / VIII Sem',
    coreSubjects: [
      {
        id: 'cs801',
        code: 'CS–801',
        name: 'Major Project (Dissertation & Defense)',
        credits: 10,
        color: 'indigo',
        standardTextbook: 'Planning Algorithms (S. M. LaValle) & Project Management (David I Cleland, Gopalkrishnan)',
        pyqPaperAvailable: true,
        modules: [
          {
            id: 'cs801-m1',
            title: 'Evaluation I: Algorithms, Security & Code Standards (30 Marks)',
            weightagePercentage: 20,
            topics: [
              { id: 'cs801-t1', name: 'Analysis of Complexity of Algorithms & Optimization', completed: false },
              { id: 'cs801-t2', name: 'Analysis of Security Issues, Data Privacy & Adopted Testing Practices', completed: false },
              { id: 'cs801-t3', name: 'Quality of Implementation (Coding standards, deployment complexity)', completed: false },
            ],
          },
          {
            id: 'cs801-m2',
            title: 'Evaluation II: Baseline Comparison & Optimization (30 Marks)',
            weightagePercentage: 20,
            topics: [
              { id: 'cs801-t4', name: 'Incorporation of Mentor suggestions & visualization of results', completed: false },
              { id: 'cs801-t5', name: 'Technical comparison with baseline/previous systems & efficiency analysis', completed: false },
            ],
          },
          {
            id: 'cs801-m3',
            title: 'Internal Committee Evaluation: Novelty & Report (90 Marks)',
            weightagePercentage: 25,
            topics: [
              { id: 'cs801-t6', name: 'Technical Novelty, Ethical AI implications & Sustainability', completed: false },
              { id: 'cs801-t7', name: 'Demonstration, Presentation & 14-Section Project Dissertation in Times New Roman', completed: false },
            ],
          },
          {
            id: 'cs801-m4',
            title: 'External Viva-Voce Examination (250 Marks)',
            weightagePercentage: 35,
            topics: [
              { id: 'cs801-t8', name: 'Interpretation & discussion of results before External Expert committee', completed: false },
              { id: 'cs801-t9', name: 'Standards, Policies, Ethical AI Use, Cybersecurity & Research Paper publication proof', completed: false },
            ],
          },
        ],
      },
    ],
  },
};

// --------------------------------------------------------------------------
// OFFICIAL SATI VIDISHA SUBJECT FOLDERS DATA (Rich Exam Notes, PYQ, Viva, Assignments)
// --------------------------------------------------------------------------

export const SATI_SUBJECT_FOLDERS_DATA: Record<string, SubjectFolderData> = {
  cs701: {
    subjectId: 'cs701',
    topperNotes: [
      {
        id: 'cs701-n1',
        title: 'Deep Learning Unit-I & II Complete Mathematical Notes',
        type: 'notes',
        dateAdded: 'SATI CSE 2025-26',
        fileSizeOrPages: '24 Pages · Comprehensive PDF',
        summary: 'Backpropagation chain rule derivation, Batch Normalization mathematics, Adam vs RMSProp comparison tables and Vanishing Gradient proofs.',
        tags: ['Backpropagation', 'Adam Optimizer', 'Batch Norm', 'Unit 1 & 2'],
      },
      {
        id: 'cs701-n2',
        title: 'CNN & Computer Vision Architectures Cheat-Sheet',
        type: 'notes',
        dateAdded: 'SATI Topper Notes',
        fileSizeOrPages: '14 Pages · Architecture Diagrams',
        summary: 'LeNet, AlexNet, VGG-16, GoogLeNet Inception modules, and ResNet skip connections with parameter counts and receptive field formulas.',
        tags: ['CNN', 'ResNet', 'AlexNet', 'Unit 3'],
      },
      {
        id: 'cs701-n3',
        title: 'RNN, LSTM & Attention Mechanism Illustrated Notes',
        type: 'notes',
        dateAdded: 'Exam Sprint',
        fileSizeOrPages: '18 Pages · Handwritten',
        summary: 'LSTM forget/input/output gate mathematical equations, BPTT unfolding diagrams, and Self-Attention calculation steps.',
        tags: ['LSTM', 'GRU', 'Attention', 'Unit 4'],
      },
    ],
    previousYearQuestions: [
      {
        id: 'cs701-pyq1',
        title: 'SATI Vidisha 2024 End-Sem: CS-701 Deep Learning (Solved)',
        type: 'pyq',
        dateAdded: 'Dec 2024 Exam',
        fileSizeOrPages: 'Full Paper · With Model Solutions',
        summary: 'Contains the compulsory 14-mark question on ResNet skip connections and comparative derivation of Backpropagation with momentum.',
        tags: ['End-Sem 2024', '14-Mark Question', 'SATI Autonomous'],
        solved: true,
      },
      {
        id: 'cs701-pyq2',
        title: 'SATI Vidisha Mid-Sem I & II Question Bank (Last 3 Years)',
        type: 'pyq',
        dateAdded: 'Department Exam Cell',
        fileSizeOrPages: '8 Pages · Repeated Questions',
        summary: 'High-frequency recurring sessional questions on Autoencoders, Activation functions (ReLU, LeakyReLU, GeLU), and Adam optimizer.',
        tags: ['Mid-Sem', 'High Yield', 'Guaranteed Questions'],
        solved: true,
      },
    ],
    labVivaQuestions: [
      {
        id: 'cs701-v1',
        question: 'Why do we need Non-Linear Activation functions in Deep Neural Networks? What happens if we only use Linear functions?',
        answer: 'Without non-linear activations (like ReLU or Sigmoid), any stack of dense layers collapses mathematically into a single linear transformation (W2 * (W1 * x) = W_combined * x). Non-linearities allow the network to approximate arbitrary non-linear functions (Universal Approximation Theorem).',
        importance: 'Guaranteed Viva Question',
      },
      {
        id: 'cs701-v2',
        question: 'How do Residual Connections in ResNet solve the Vanishing Gradient problem during backpropagation?',
        answer: 'ResNet introduces shortcut identity mappings: F(x) + x. During backpropagation, the gradient is (dF/dx + 1). The "+1" term guarantees that the gradient signal can flow directly through the skip connections back to the earliest layers without vanishing.',
        importance: 'Guaranteed Viva Question',
      },
      {
        id: 'cs701-v3',
        question: 'What is the role of the Forget Gate in an LSTM cell, and what is its mathematical formula?',
        answer: 'The forget gate f_t decides what information to discard from the previous cell state C_{t-1}. Formula: f_t = σ(W_f · [h_{t-1}, x_t] + b_f). A value of 0 means completely get rid of this, while 1 means completely keep this.',
        importance: 'Frequent',
      },
    ],
    assignments: [
      {
        id: 'cs701-a1',
        title: 'Assignment 1: Implementation of Backprop with Batch Norm in NumPy',
        dueDate: 'Next Monday, 4:30 PM',
        completed: false,
        maxMarks: 10,
      },
    ],
  },

  cs706: {
    subjectId: 'cs706',
    topperNotes: [
      {
        id: 'cs706-n1',
        title: 'CS-706 Programming Lab IV Complete Manual (All 11 Experiments)',
        type: 'notes',
        dateAdded: 'SATI Lab Manual',
        fileSizeOrPages: '32 Pages · Python Source Code',
        summary: 'Complete code, dataset descriptions, and output screenshots for all 11 official SATI experiments from Perceptron to LSTM stock prediction.',
        tags: ['All 11 Experiments', 'Python Code', 'Verified Outputs'],
      },
    ],
    previousYearQuestions: [
      {
        id: 'cs706-pyq1',
        title: 'Practical External Viva Marking Scheme & Questions (250 Marks)',
        type: 'pyq',
        dateAdded: 'External Viva Prep',
        fileSizeOrPages: 'Viva Rubrics',
        summary: 'External examiner checklist: algorithm complexity analysis, live coding test on Perceptron/Genetic algorithm, and output interpretation.',
        tags: ['External Viva', 'Practical Exam'],
        solved: true,
      },
    ],
    labVivaQuestions: [
      {
        id: 'cs706-v1',
        question: 'In Experiment 3, why can a single Perceptron solve AND and OR gates, but CANNOT solve the XOR gate?',
        answer: 'AND and OR gates are linearly separable (can be separated by a single 2D decision boundary line). XOR is NOT linearly separable, which was proven by Minsky and Papert in 1969, requiring at least one hidden layer (Multilayer Perceptron).',
        importance: 'Guaranteed Viva Question',
      },
      {
        id: 'cs706-v2',
        question: 'In Experiment 11 (Stock Price Prediction), why do we prefer LSTM or GRU over traditional linear regression?',
        answer: 'Stock prices exhibit temporal dependencies and non-stationary patterns. LSTMs maintain an internal memory cell capable of learning long-term sequential dependencies and autocorrelation, which standard regression cannot capture.',
        importance: 'Guaranteed Viva Question',
      },
    ],
    assignments: [
      {
        id: 'cs706-a1',
        title: 'Lab Record Submission: Experiments 1 to 6 with Graphs',
        dueDate: 'Friday, 1:30 PM',
        completed: false,
        maxMarks: 20,
      },
    ],
  },

  cs801: {
    subjectId: 'cs801',
    topperNotes: [
      {
        id: 'cs801-n1',
        title: 'SATI Vidisha CS-801 Major Project Standard Dissertation Template',
        type: 'notes',
        dateAdded: 'SATI Department Guide',
        fileSizeOrPages: '45 Pages · LaTeX / Word Format',
        summary: 'Official 14-section format: Cover Page, Declarations, Abstract, Research Gaps, Methodology, Use Case/Class Diagrams, Result snapshots, and IEEE References.',
        tags: ['14-Section Format', 'Times New Roman 12', 'IEEE Citations'],
      },
    ],
    previousYearQuestions: [
      {
        id: 'cs801-pyq1',
        title: 'Major Project 4-Tier Rubrics & Marking Scheme',
        type: 'pyq',
        dateAdded: 'Official Exam Matrix',
        fileSizeOrPages: '4 Pages',
        summary: 'Evaluation I (30 Marks), Evaluation II (30 Marks), Internal Committee (90 Marks), External Defense (250 Marks).',
        tags: ['Evaluation Rubrics', 'Viva 250 Marks'],
        solved: true,
      },
    ],
    labVivaQuestions: [
      {
        id: 'cs801-v1',
        question: 'How do you justify the Technical Novelty and Real-World Sustainability of your Major Project?',
        answer: 'By presenting clear benchmark comparisons with baseline solutions, citing identified research gaps from IEEE publications, demonstrating modular architecture, and adhering to data privacy and security standards.',
        importance: 'Guaranteed Viva Question',
      },
    ],
    assignments: [
      {
        id: 'cs801-a1',
        title: 'Draft Dissertation Submission with Plagiarism Report (< 10%)',
        dueDate: 'Mid-Semester Examination',
        completed: false,
        maxMarks: 50,
      },
    ],
  },
};

// Default fallback generator based on semester (1 to 8)
export function getCurriculumForSatiSemester(semester: number): SubjectCourse[] {
  const semInfo = SATI_SEMESTER_CURRICULA[semester] || SATI_SEMESTER_CURRICULA[7] || SATI_SEMESTER_CURRICULA[4];
  const list = [...semInfo.coreSubjects];
  if (semInfo.electiveGroups) {
    semInfo.electiveGroups.forEach((eg) => {
      const def = eg.subjects.find((s) => s.id === eg.defaultSelectedId) || eg.subjects[0];
      if (def && !list.some((s) => s.id === def.id)) {
        list.push(def);
      }
    });
  }
  return list;
}
