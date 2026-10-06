import { FirstYearSubjectNotesDetail } from './firstYearDetailedNotes';

export const SEM_2_DETAILED_NOTES: Record<string, FirstYearSubjectNotesDetail> = {
  // 1. APPLIED PHYSICS (PYB101)
  'sub-applied-phys': {
    subjectId: 'sub-applied-phys',
    subjectCode: 'PYB101',
    subjectName: 'Applied Physics',
    shortDescription:
      'Quantum mechanics & Schrödinger wave equations, Lasers, Optical Fibers & Holography, Semiconductor physics & optoelectronic devices, Superconductors & Nanomaterials, and Dielectric/Piezoelectric materials.',
    textbook: 'Concepts of Modern Physics by Arthur Beiser / Engineering Physics by H.K. Malik & A.K. Singh',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: 'de-Broglie Wavelength & Electron Acceleration',
        formula: 'λ = h / p = h / √(2mE) = 12.27 / √V Å (non-relativistic)',
        note: 'h = 6.626 × 10⁻³⁴ J·s, V = Accelerating potential in Volts.',
      },
      {
        title: 'Particle in 1D Infinite Potential Box',
        formula: 'E_n = (n² h²) / (8 m L²) ; ψ_n(x) = √(2/L) sin(nπx / L)',
        note: 'Zero-point energy E_1 = h² / (8mL²) ≠ 0, confirming Heisenberg’s Uncertainty Principle.',
      },
      {
        title: 'Optical Fiber Numerical Aperture & V-Number',
        formula: 'NA = sin(θ_a) = √(n₁² - n₂²) = n₁ √(2Δ) ; V = (2πa / λ) · NA',
        note: 'For single-mode step-index fiber, V ≤ 2.405. Number of modes N ≈ V² / 2 (step-index) or V² / 4 (graded-index).',
      },
      {
        title: 'Compton Wavelength Shift',
        formula: 'Δλ = λ\' - λ = (h / m₀c)(1 - cos φ) = 0.02426 (1 - cos φ) Å',
        note: 'Maximum shift Δλ_max = 0.0485 Å at scattering angle φ = 180°.',
      },
      {
        title: 'Superconductor Critical Magnetic Field & Clausius-Mossotti',
        formula: 'H_c(T) = H_c(0) [1 - (T / T_c)²] ; (ε_r - 1)/(ε_r + 2) = (N α_e) / (3 ε₀)',
        note: 'Relates macroscopic dielectric constant ε_r to microscopic electronic polarizability α_e.',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Quantum Mechanics',
        weightage: '20% (14 Marks)',
        summary:
          'Introduction to Quantum hypothesis, Planck’s radiation law, matter waves & de-Broglie hypothesis, Davisson-Germer experiment, Compton scattering, Concept of wave packets (Phase & Group velocity), Heisenberg Uncertainty Principle & applications, Born physical interpretation of wave function ψ, Time-dependent and Time-independent Schrödinger wave equations, and Particle in a 1D infinite potential box.',
        keyFormulas: [
          'de-Broglie Wavelength: λ = h/mv = h/√(2mk_BT) (thermal neutrons)',
          'Phase velocity v_p = ω/k = c²/v ; Group velocity v_g = dω/dk = v',
          'Uncertainty Principle: Δx · Δp_x ≥ ħ/2 ; ΔE · Δt ≥ ħ/2 ; ΔL · Δθ ≥ ħ/2',
          'Time-independent Schrödinger eq.: ∇²ψ + (2m/ħ²)(E - V)ψ = 0',
          '1D Box Eigenvalues: E_n = n²h² / (8mL²), Eigenfunctions: ψ_n(x) = √(2/L) sin(nπx/L)',
        ],
        keyConcepts: [
          {
            heading: 'de-Broglie Matter Waves, Phase & Group Velocity',
            description:
              'Louis de-Broglie postulated that every moving material particle has an associated matter wave of wavelength λ = h/p. Davisson and Germer experimentally verified electron diffraction using a Nickel crystal (nλ = 2d sin θ).',
            bulletPoints: [
              'Phase Velocity (v_p = ω/k = E/p = c²/v): The velocity with which an individual monochromatic wave crest travels; for a relativistic particle v_p > c, so a single wave cannot represent a physical particle.',
              'Group Velocity (v_g = dω/dk = dE/dp = v): A localized wave packet formed by constructive superposition of waves moves with group velocity equal to the classical particle velocity v.',
              'Relation between Group and Phase Velocity: v_g = v_p - λ (dv_p / dλ). In a non-dispersive medium, v_g = v_p.',
            ],
          },
          {
            heading: 'Compton Effect & Photon Momentum Verification',
            description:
              'When monochromatic X-rays of wavelength λ scatter off loosely bound (free) target electrons at angle φ, the scattered beam contains both unmodified wavelength λ and modified longer wavelength λ\' > λ.',
            bulletPoints: [
              'Applying relativistic conservation of energy (hν + m₀c² = hν\' + mc²) and conservation of linear momentum along X and Y axes yields Δλ = (h / m₀c)(1 - cos φ).',
              'Here h/(m₀c) = 0.02426 Å is the Compton wavelength of the electron. Shift Δλ depends only on scattering angle φ and is independent of target material and incident wavelength.',
            ],
          },
          {
            heading: 'Heisenberg Uncertainty Principle & Physical Applications',
            description:
              'It is impossible to simultaneously measure both position (x) and canonically conjugate momentum (p_x) of a microscopic particle with arbitrary accuracy: Δx · Δp_x ≥ ħ/2.',
            bulletPoints: [
              'Non-existence of free electrons inside the nucleus: Taking nuclear radius r ≈ 5 × 10⁻¹⁵ m, Δx = 2r = 10⁻¹⁴ m gives minimum electron kinetic energy E_min ≈ 9.8 MeV, whereas experimental β-decay electrons never exceed 4 MeV.',
              'Also explains finite natural width of spectral lines (ΔE · Δt ≥ ħ/2) and non-zero ground-state zero-point energy of harmonic oscillators.',
            ],
          },
          {
            heading: 'Schrödinger Equations & Particle in 1D Box',
            description:
              'Max Born interpreted |ψ(x,t)|² dx as the probability of finding the particle between x and x+dx, requiring ψ to be finite, single-valued, continuous, and normalized (∫|ψ|² dτ = 1).',
            bulletPoints: [
              'For a particle of mass m confined in 0 ≤ x ≤ L with V(x) = 0 inside and V = ∞ outside, solving d²ψ/dx² + k²ψ = 0 with boundary conditions ψ(0) = 0 and ψ(L) = 0 gives k = nπ/L.',
              'Quantized energy levels E_n = n²h² / (8mL²) and normalized wave functions ψ_n(x) = √(2/L) sin(nπx/L) for n = 1, 2, 3...',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of Compton shift Δλ = (h/m₀c)(1 - cos φ) using relativistic energy-momentum conservation.',
          'Derivation of Time-independent & Time-dependent Schrödinger equations and Particle in 1D Box eigenvalues.',
        ],
        frequentExamQuestions: [
          'Derive time-independent Schrödinger wave equation and solve it for a particle trapped in a 1D infinite potential well of width L.',
          'Prove using Heisenberg’s Uncertainty Principle that free electrons cannot exist inside an atomic nucleus.',
          'What is Compton effect? Derive the expression for Compton shift and calculate Δλ at φ = 90° and φ = 180°.',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Lasers, Optical Fibers & Holography',
        weightage: '20% (14 Marks)',
        summary:
          'Spontaneous and Stimulated emission, Einstein’s A & B coefficients, Population inversion, Optical resonator, Construction & working of Ruby, He-Ne, Nd:YAG, and CO2 lasers. Optical Fiber structure, Total Internal Reflection, Acceptance angle, Numerical Aperture (NA), Step-index vs Graded-index fibers, V-Number, Signal attenuation & dispersion. Holography: Basic principle, Recording and Reconstruction of a hologram.',
        keyFormulas: [
          'Einstein Relation: A₂₁ / B₂₁ = (8πhν³) / c³ ; B₁₂ = B₂₁',
          'Critical Angle: sin θ_c = n₂ / n₁',
          'Numerical Aperture: NA = sin θ_a = √(n₁² - n₂²) = n₁ √(2Δ) where Δ = (n₁ - n₂)/n₁',
          'Attenuation Coefficient: α (dB/km) = (10 / L) log₁₀(P_in / P_out)',
        ],
        keyConcepts: [
          {
            heading: 'Einstein’s Coefficients & Laser Action Principles',
            description:
              'Under thermal equilibrium at temperature T, the rate of upward stimulated absorption equals the sum of downward spontaneous and stimulated emissions.',
            bulletPoints: [
              'Einstein proved B₁₂ = B₂₁ and A₂₁ / B₂₁ = 8πhν³ / c³. Since A₂₁/B₂₁ ∝ ν³, optical lasing requires achieving non-equilibrium Population Inversion (N₂ > N₁) via optical or electrical pumping.',
              'Metastable State: An excited energy level with unusually long lifetime (10⁻³ s vs 10⁻⁸ s) where atoms accumulate to sustain population inversion.',
              '3-Level vs 4-Level Lasers: Ruby laser is a 3-level pulsed laser (lower laser level is the ground state, requiring >50% pumping); He-Ne and Nd:YAG are 4-level continuous/high-efficiency lasers where the lower laser level is well above ground state.',
            ],
          },
          {
            heading: 'Ruby, He-Ne, Nd:YAG & CO2 Lasers',
            description:
              'Construction, energy level diagrams, pumping mechanisms, and active media of key engineering lasers:',
            bulletPoints: [
              'Ruby Laser (6943 Å red): Al₂O₃ doped with 0.05% Cr³⁺ ions; optically pumped by helical Xenon flash lamp (5500 Å); 3-level pulsed output.',
              'He-Ne Laser (6328 Å red): 10:1 mixture of He and Ne at low pressure; electrical discharge excites He to metastable states (20.61 eV, 19.81 eV), transferring energy via resonant collisions to Ne atoms; continuous 4-level operation.',
              'Nd:YAG Laser (1.064 μm IR): Y₃Al₅O₁₂ doped with Nd³⁺ ions, optically pumped by Krypton arc lamp; 4-level laser used in metal drilling and surgery.',
              'CO2 Molecular Laser (10.6 μm & 9.6 μm IR): CO₂ : N₂ : He mixture (1:2:5); transitions occur between vibrational-rotational modes (00°1 symmetric stretching to 10°0 / 02°0 modes); high power industrial cutting & welding.',
            ],
          },
          {
            heading: 'Optical Fiber Propagation, NA & V-Number',
            description:
              'An optical fiber guides light through its core (refractive index n₁) surrounded by cladding (n₂ < n₁) via Total Internal Reflection when internal angle > critical angle θ_c = sin⁻¹(n₂/n₁).',
            bulletPoints: [
              'Acceptance Angle (θ_a): Maximum external launch angle with fiber axis for which light undergoes TIR in the core: sin θ_a = √(n₁² - n₂²) = NA.',
              'Step-Index vs Graded-Index (GRIN): Step-index has uniform core index n₁ causing intermodal pulse dispersion; Graded-index has parabolic index profile n(r) so outer rays travel faster in lower-index regions, equalizing transit times.',
              'V-Number (Normalized Frequency): V = (2πa/λ)·NA. If V < 2.405, only the fundamental HE₁₁ mode propagates (Single-Mode Fiber).',
            ],
          },
          {
            heading: 'Holography (3D Wavefront Recording & Reconstruction)',
            description:
              'Invented by Dennis Gabor, holography records both amplitude and phase (complete 3D wavefront) of light scattered from an object using coherent laser interference.',
            bulletPoints: [
              'Recording: A coherent laser beam is split into a Reference Beam and an Object Beam. Their interference pattern (encoding intensity and phase difference) is recorded on a high-resolution photographic plate.',
              'Reconstruction: Illuminating the developed hologram with the original coherent Reference Beam diffracts light to produce a real and a virtual 3D image with full parallax.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of Einstein’s A & B coefficients relation at thermal equilibrium.',
          'Geometrical derivation of Numerical Aperture NA = √(n₁² - n₂²) = n₁√(2Δ) for an optical fiber.',
        ],
        frequentExamQuestions: [
          'Derive the relation between Einstein’s A and B coefficients and explain why a two-level laser is not practical.',
          'Explain the construction, energy level diagram, and working of a He-Ne laser and CO2 laser.',
          'Derive the expression for Acceptance Angle and Numerical Aperture of an optical fiber. A fiber has n₁ = 1.50 and n₂ = 1.47; find NA, Δ, and θ_a.',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Semiconductor Physics & Optoelectronic Devices',
        weightage: '20% (14 Marks)',
        summary:
          'Density of energy states in semiconductors, Direct and Indirect band gap semiconductors, Effective mass of charge carriers, Fermi-Dirac distribution and Fermi level position in intrinsic & extrinsic (n-type, p-type) semiconductors, Carrier concentration & Law of Mass Action. P-N Junction diode I-V equation, Photovoltaic effect & Solar Cell (I-V characteristics, fill factor), Light Emitting Diode (LED), and Semiconductor Injection Laser Diode (ILD).',
        keyFormulas: [
          'Fermi-Dirac Function: f(E) = 1 / [1 + exp((E - E_F) / k_B T)]',
          'Intrinsic Fermi Level: E_Fi = (E_c + E_v)/2 + (3/4) k_B T ln(m_h* / m_e*)',
          'Law of Mass Action: n · p = n_i² = N_c N_v exp(-E_g / k_B T)',
          'Shockley Diode Equation: I = I₀ [exp(eV / η k_B T) - 1]',
          'Solar Cell Fill Factor: FF = (V_mp × I_mp) / (V_oc × I_sc) ; Efficiency η = (FF · V_oc · I_sc) / P_in',
        ],
        keyConcepts: [
          {
            heading: 'Direct vs Indirect Band Gap & Effective Mass',
            description:
              'In E-k crystal momentum diagrams, semiconductors are classified based on the alignment of valence band maximum and conduction band minimum.',
            bulletPoints: [
              'Direct Band Gap (GaAs, InP, GaN): Conduction band minimum and valence band maximum occur at the same wavevector k = 0. Electron-hole recombination directly emits a photon (hν = E_g), ideal for LEDs and Laser diodes.',
              'Indirect Band Gap (Si, Ge): Conduction band minimum occurs at k ≠ 0; recombination requires phonon intervention to conserve crystal momentum, releasing heat rather than light.',
              'Effective Mass: m* = ħ² / (d²E / dk²), accounting for internal periodic crystal potential.',
            ],
          },
          {
            heading: 'Fermi Level & Carrier Concentration in Semiconductors',
            description:
              'Combining the density of states Z(E)dE = (4π/h³)(2m*)^(3/2) E^(1/2) dE with the Fermi-Dirac probability gives electron and hole concentrations in conduction and valence bands.',
            bulletPoints: [
              'Intrinsic Semiconductor: At T = 0 K, E_F lies exactly at mid-gap (E_c + E_v)/2. Since n = p = n_i, n_i = √(N_c N_v) exp(-E_g / 2k_BT).',
              'Extrinsic Semiconductor: In n-type, E_F lies close to donor level E_d below E_c; in p-type, E_F lies close to acceptor level E_a above E_v. As temperature rises, E_F shifts back toward the intrinsic mid-gap level.',
            ],
          },
          {
            heading: 'Photovoltaic Solar Cell & Optoelectronic Devices (LED & ILD)',
            description:
              'When photons with energy hν > E_g illuminate an unbiased P-N junction solar cell, electron-hole pairs are generated and swept across the depletion barrier field.',
            bulletPoints: [
              'Solar Cell Parameters: Open-circuit voltage V_oc (when I = 0), Short-circuit current I_sc (when V = 0), Fill Factor FF = (V_m I_m)/(V_oc I_sc) (typically 0.7–0.85).',
              'LED vs Injection Laser Diode (ILD): LED operates under forward bias producing incoherent spontaneous emission; ILD uses heavily doped degenerate p-n junction with cleaved Fabry-Perot mirror facets to produce coherent stimulated emission above threshold current.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of intrinsic carrier concentration n_i and position of Fermi level E_F.',
          'Solar cell I-V characteristic curve, Fill Factor, and conversion efficiency relations.',
        ],
        frequentExamQuestions: [
          'Differentiate between Direct and Indirect band gap semiconductors with E-k diagrams. Why is Si not used for making LEDs?',
          'Derive the expression for electron concentration in the conduction band and show that the Fermi level lies midway between valence and conduction bands in an intrinsic semiconductor at 0 K.',
          'Explain the construction, working, and V-I characteristics of a Photovoltaic Solar Cell.',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Superconductors & Nanomaterials',
        weightage: '20% (14 Marks)',
        summary:
          'Temperature dependence of resistivity, Superconductivity phenomenon, Critical temperature (Tc) & Critical magnetic field (Hc), Meissner effect (perfect diamagnetism), Type-I (Soft) and Type-II (Hard) superconductors, BCS Theory (Cooper pairs & coherence length), High-Tc superconductors. Nanomaterials: Quantum confinement (0D, 1D, 2D), Surface-to-volume ratio, Synthesis (Top-down & Bottom-up), Structure, properties & applications of Fullerene (C60) and Carbon Nanotubes (CNTs).',
        keyFormulas: [
          'Critical Magnetic Field: H_c(T) = H_c(0) [1 - (T / T_c)²]',
          'Critical Current (Silsbee’s Rule): I_c = 2 π r H_c',
          'Magnetic Induction inside Superconductor (Meissner Effect): B = μ₀(H + M) = 0 => χ = M/H = -1',
        ],
        keyConcepts: [
          {
            heading: 'Superconductivity, Meissner Effect & Type-I vs Type-II',
            description:
              'Below critical temperature T_c, DC electrical resistivity of certain materials drops abruptly to zero AND magnetic flux is completely expelled from the interior.',
            bulletPoints: [
              'Meissner Effect: When a superconductor is cooled below T_c in a magnetic field H < H_c, magnetic flux lines are expelled (B = 0), yielding magnetic susceptibility χ = -1 (perfect diamagnetism). This proves a superconductor is more than just a perfect conductor.',
              'Type-I (Soft) Superconductors (Hg, Pb, Sn, Al): Exhibit abrupt transition at a single low critical field H_c (~0.1 Tesla); strictly obey Meissner effect up to H_c; limited high-field utility.',
              'Type-II (Hard) Superconductors (Nb-Ti, Nb₃Sn, YBa₂Cu₃O₇): Have two critical fields H_c1 and H_c2; between H_c1 and H_c2 they exist in a Mixed (Vortex) state allowing high magnetic fields (up to 20–30 Tesla), used in MRI and Maglev trains.',
            ],
          },
          {
            heading: 'BCS Theory & Cooper Pairs',
            description:
              'Proposed by Bardeen, Cooper, and Schrieffer (1957), explaining superconductivity via electron-lattice-electron (phonon-mediated) attractive interaction.',
            bulletPoints: [
              'An electron moving through the crystal lattice attracts positive ions, creating a localized positive charge density (phonon) that attracts a second electron with opposite spin and momentum (+k↑, -k↓).',
              'These bound electron pairs (Cooper Pairs) act as bosons with zero net spin and move through the lattice without scattering or resistance.',
            ],
          },
          {
            heading: 'Nanomaterials, Fullerene (C60) & Carbon Nanotubes (CNTs)',
            description:
              'At the nanoscale (1–100 nm), high surface-to-volume ratio and quantum confinement of charge carriers cause optical, electrical, and mechanical properties to become size-dependent.',
            bulletPoints: [
              'Quantum Confinement: 3D Bulk (0 confinement) -> 2D Quantum Well/Graphene (1D confinement) -> 1D Quantum Wire/CNT (2D confinement) -> 0D Quantum Dot/Fullerene (3D confinement).',
              'Fullerene (C60 / Buckminsterfullerene): Cage-like truncated icosahedron with 60 sp² carbon atoms arranged in 20 hexagons and 12 pentagons (no two pentagons share an edge).',
              'Carbon Nanotubes (CNTs): Rolled graphene sheets classified as Single-Walled (SWCNT: Armchair, Zigzag, Chiral) or Multi-Walled (MWCNT). Armchair (n=m) is always metallic; others are metallic if (n-m) is a multiple of 3, else semiconducting.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Proof of perfect diamagnetism (χ = -1) from B = μ₀(H + M) = 0 in the Meissner state.',
          'Comparison table between Type-I and Type-II superconductors.',
        ],
        frequentExamQuestions: [
          'What is the Meissner effect? Prove that a superconductor behaves as a perfect diamagnetic material. Differentiate between Type-I and Type-II superconductors.',
          'Explain BCS theory of superconductivity and the role of Cooper pairs.',
          'Discuss the structure, chiral classifications (Armchair, Zigzag, Chiral), and engineering applications of Carbon Nanotubes (CNTs) and Fullerene (C60).',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Dielectric & Piezoelectric Materials',
        weightage: '20% (14 Marks)',
        summary:
          'Polar and Non-polar dielectrics, Electric dipole moment, Polarization vector P, Electric displacement D, Gauss’s law in the presence of a dielectric, Relation D = ε₀E + P and χ_e = ε_r - 1. Electronic, Ionic, Dipolar & Space-charge polarization, Internal (Lorentz) field and Clausius-Mossotti equation. Ferroelectric materials & hysteresis. Piezoelectricity: Direct and Converse piezoelectric effect, Piezoceramics (PZT, BaTiO3), Piezopolymers (PVDF), and ultrasonic transducers.',
        keyFormulas: [
          'Displacement Vector: D = ε₀E + P = ε₀ ε_r E => P = ε₀(ε_r - 1)E = ε₀ χ_e E',
          'Electronic Polarizability of Atom: α_e = 4 π ε₀ R³',
          'Lorentz Internal Field: E_i = E + P / (3 ε₀)',
          'Clausius-Mossotti Equation: (ε_r - 1) / (ε_r + 2) = (N α) / (3 ε₀)',
        ],
        keyConcepts: [
          {
            heading: 'Dielectric Polarization Mechanisms & Gauss’s Law',
            description:
              'When a dielectric is placed in an external electric field E, bound charges shift slightly, creating an induced dipole moment per unit volume P = Np.',
            bulletPoints: [
              'Electronic Polarization (α_e): Displacement of electron cloud relative to nucleus; occurs in all dielectrics up to optical frequencies (~10¹⁵ Hz) and is independent of temperature.',
              'Ionic Polarization (α_i): Relative displacement of cations and anions in ionic crystals (NaCl) up to infrared frequencies (~10¹³ Hz); independent of temperature.',
              'Orientational (Dipolar) Polarization (α_o = p²/3k_BT): Alignment of permanent polar molecules (H₂O, HCl) up to microwave frequencies; inversely proportional to temperature.',
              'Gauss Law in Dielectrics: ∮ D · dA = q_free, where D = ε₀E + P.',
            ],
          },
          {
            heading: 'Lorentz Internal Field & Clausius-Mossotti Relation',
            description:
              'Inside a solid or liquid dielectric, the local electric field E_local acting on an atom is greater than the macroscopic field E due to surrounding polarized dipoles.',
            bulletPoints: [
              'Using a spherical Lorentz cavity, the internal field in a cubic crystal is E_i = E + P / (3ε₀).',
              'Substituting P = N α E_i and P = ε₀(ε_r - 1)E yields the Clausius-Mossotti relation: (ε_r - 1)/(ε_r + 2) = Nα / (3ε₀).',
            ],
          },
          {
            heading: 'Ferroelectricity & Piezoelectric Materials (PZT, PVDF)',
            description:
              'Non-centrosymmetric crystals generate surface electric charge under mechanical stress and conversely deform mechanically under an electric field.',
            bulletPoints: [
              'Direct Piezoelectric Effect: Application of mechanical stress produces proportional electrical polarization/voltage (used in microphones, pressure sensors, gas igniters).',
              'Converse Piezoelectric Effect: Application of alternating electric field causes mechanical vibration/strain (used in quartz crystal oscillators and ultrasonic Sonar transducers).',
              'Piezoceramics vs Piezopolymers: Lead Zirconate Titanate (PZT) and BaTiO₃ have high piezoelectric coupling constants; Polyvinylidene Fluoride (PVDF) is a flexible, lightweight piezopolymer ideal for wearable and biomedical acoustic sensors.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of D = ε₀E + P and χ_e = ε_r - 1 using Gauss’s law for free and bound surface charges.',
          'Derivation of Lorentz internal field E_i = E + P/(3ε₀) and Clausius-Mossotti equation.',
        ],
        frequentExamQuestions: [
          'State Gauss’s Law in the presence of a dielectric and derive the relation D = ε₀E + P and ε_r = 1 + χ_e.',
          'Define Lorentz internal field in a cubic dielectric and derive the Clausius-Mossotti equation.',
          'Explain Direct and Converse Piezoelectric effects. Discuss the properties and applications of Piezoceramics (PZT) and Piezopolymers (PVDF).',
        ],
      },
    ],
  },

  // 2. MATHEMATICS-II (MAB102)
  'sub-maths-2': {
    subjectId: 'sub-maths-2',
    subjectCode: 'MAB102',
    subjectName: 'Mathematics-II (Probability Distributions & Differential Equations)',
    shortDescription:
      'Binomial, Poisson & Normal distributions, Least-squares curve fitting, Sampling distributions (t, F, Chi-square), Ordinary Differential Equations (ODEs), Cauchy/Legendre & Variation of Parameters, and Partial Differential Equations (PDEs).',
    textbook: 'Higher Engineering Mathematics by B.S. Grewal / T. Veerarajan',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: 'Binomial, Poisson & Normal Distributions',
        formula: 'Binomial: P(X=r) = nCr p^r q^(n-r) ; Poisson: P(X=r) = (e^(-λ) λ^r) / r! ; Normal: Z = (X - μ) / σ',
        note: 'Binomial: Mean = np, Var = npq. Poisson: Mean = Variance = λ = np.',
      },
      {
        title: 'Method of Least Squares (Straight Line & Parabola)',
        formula: 'Line y = a + bx: ∑y = na + b∑x, ∑xy = a∑x + b∑x²',
        note: 'For Parabola y = a + bx + cx², add third normal equation: ∑x²y = a∑x² + b∑x³ + c∑x⁴.',
      },
      {
        title: 'Sampling Tests: Student’s t, F, and Chi-Square (χ²)',
        formula: 't = (x̄ - μ) / (s / √n) [df = n-1] ; χ² = ∑ [(O_i - E_i)² / E_i]',
        note: 'For 2×2 contingency table with r rows and c columns, degrees of freedom ν = (r-1)(c-1).',
      },
      {
        title: 'Variation of Parameters (2nd Order ODE)',
        formula: 'y_p = -y₁ ∫ (y₂ X / W) dx + y₂ ∫ (y₁ X / W) dx',
        note: 'W = Wronskian = y₁ y₂\' - y₂ y₁\' where y_c = c₁y₁ + c₂y₂.',
      },
      {
        title: 'Lagrange’s Linear PDE (Pp + Qq = R)',
        formula: 'Auxiliary Equations: dx / P = dy / Q = dz / R',
        note: 'If u(x,y,z) = c₁ and v(x,y,z) = c₂ are two independent solutions, general solution is φ(u, v) = 0.',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Probability Distribution I & Curve Fitting',
        weightage: '20% (14 Marks)',
        summary:
          'Discrete and Continuous random variables, Binomial distribution (PMF, derivation of Mean = np and Variance = npq), Poisson distribution as limiting case of Binomial (Mean = Variance = λ), Normal (Gaussian) distribution and standard normal Z-score area problems. Principle of Least Squares and Curve Fitting for straight line y = a + bx and second-degree parabola y = a + bx + cx².',
        keyFormulas: [
          'Binomial Moments: Mean μ = np, Variance σ² = npq (Note: Variance < Mean always since 0 < q < 1)',
          'Poisson Recurrence Relation: P(r+1) = (λ / (r+1)) P(r)',
          'Normal Density Function: f(x) = (1 / (σ√(2π))) exp(-(x - μ)² / (2σ²))',
          'Normal Equations for y = a + bx: ∑y = na + b∑x and ∑xy = a∑x + b∑x²',
        ],
        keyConcepts: [
          {
            heading: 'Binomial & Poisson Probability Distributions',
            description:
              'Binomial distribution models n independent Bernoulli trials with constant success probability p (p + q = 1). Poisson distribution models rare events when n → ∞ and p → 0 such that np = λ is finite.',
            bulletPoints: [
              'Binomial Mean & Variance: E(X) = ∑ r · nCr p^r q^(n-r) = np; Var(X) = E(X²) - [E(X)]² = npq.',
              'Poisson Mean & Variance: E(X) = ∑ r · (e^(-λ) λ^r / r!) = λ; Var(X) = λ. Used for defective items in large batches, radioactive decay, or call arrivals.',
            ],
          },
          {
            heading: 'Normal (Gaussian) Distribution',
            description:
              'A bell-shaped symmetrical continuous distribution completely characterized by mean μ and standard deviation σ, where Mean = Median = Mode.',
            bulletPoints: [
              'Standard Normal Variable Z = (X - μ)/σ has Mean = 0 and Variance = 1.',
              'Area properties: 68.27% within μ ± σ, 95.45% within μ ± 2σ, and 99.73% within μ ± 3σ.',
            ],
          },
          {
            heading: 'Method of Least Squares & Curve Fitting',
            description:
              'Minimizes the sum of squares of vertical residuals S = ∑ [y_i - f(x_i)]² by setting ∂S/∂a = 0, ∂S/∂b = 0, ∂S/∂c = 0.',
            bulletPoints: [
              'Straight Line (y = a + bx): Normal equations are ∑y = na + b∑x and ∑xy = a∑x + b∑x².',
              'Second-Degree Parabola (y = a + bx + cx²): Solve the 3×3 system ∑y = na + b∑x + c∑x², ∑xy = a∑x + b∑x² + c∑x³, and ∑x²y = a∑x² + b∑x³ + c∑x⁴.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of Mean and Variance of Binomial and Poisson distributions.',
          'Derivation of Normal equations for fitting a parabola y = a + bx + cx² by Method of Least Squares.',
        ],
        frequentExamQuestions: [
          'Derive the Mean and Variance of the Binomial and Poisson distributions.',
          'In a normal distribution, 31% of the items are under 45 and 8% are over 64. Find the mean μ and standard deviation σ of the distribution.',
          'Fit a second-degree parabola y = a + bx + cx² to a given set of experimental (x, y) data points using the Method of Least Squares.',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Probability Sampling Distributions',
        weightage: '20% (14 Marks)',
        summary:
          'Population vs Sample, Parameter vs Statistic, Standard Error, Null and Alternative Hypotheses, Type-I and Type-II errors, Level of Significance. Small sample tests: Student’s t-distribution (single mean, difference of two independent means, paired t-test), Snedecor’s F-distribution (test for equality of two population variances), and Chi-Square (χ²) distribution (Goodness of fit test and Test of independence of attributes in contingency tables).',
        keyFormulas: [
          'One-Sample t-test: t = (x̄ - μ) / (S / √n) where S² = [1/(n-1)] ∑(x_i - x̄)², df = n - 1',
          'Two-Sample t-test: t = (x̄₁ - x̄₂) / √[S_p² (1/n₁ + 1/n₂)] where S_p² = [(n₁-1)S₁² + (n₂-1)S₂²] / (n₁ + n₂ - 2)',
          'F-test Statistic: F = S₁² / S₂² (with S₁² > S₂²), df = (ν₁ = n₁ - 1, ν₂ = n₂ - 1)',
          'Chi-Square Statistic: χ² = ∑ [(O_i - E_i)² / E_i]',
        ],
        keyConcepts: [
          {
            heading: 'Student’s t-Distribution (Small Sample Mean Tests, n < 30)',
            description:
              'Used when sample size n < 30 and population standard deviation σ is unknown.',
            bulletPoints: [
              'Single Sample Mean: Tests H₀: μ = μ₀ using t = (x̄ - μ₀)/(s/√(n-1)) or (x̄ - μ₀)/(S/√n) with ν = n - 1 degrees of freedom.',
              'Two Independent Means: Assumes equal population variances and pools sample variances into S_p² with ν = n₁ + n₂ - 2.',
              'Paired t-test: Used for before-and-after measurements on the same subjects: t = d̄ / (S_d / √n) with ν = n - 1.',
            ],
          },
          {
            heading: 'Snedecor’s F-Test & Chi-Square (χ²) Tests',
            description:
              'F-test checks whether two independent samples come from populations having the same variance; Chi-square checks goodness of fit and attribute independence.',
            bulletPoints: [
              'F-Test: Always place the larger unbiased sample variance in the numerator so F = S₁²/S₂² > 1 with degrees of freedom (n₁-1, n₂-1).',
              'Chi-Square Goodness of Fit: Compares observed frequencies O_i with theoretical expected frequencies E_i (from Binomial/Poisson/Uniform laws). If χ²_calc < χ²_tab, the fit is good.',
              'Contingency Table Independence: Expected frequency for cell (i,j) is E_ij = (Row_i Total × Col_j Total) / Grand Total N, with df = (r-1)(c-1).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Hypothesis testing procedure, critical region, one-tailed vs two-tailed significance levels (5% and 1%).',
          'Pooled variance formula for two-sample Student’s t-test and Contingency table expected frequencies.',
        ],
        frequentExamQuestions: [
          'Two random samples of sizes 10 and 12 drawn from normal populations have means 15 and 18 and sum of squares of deviations from their means as 90 and 108. Test whether the samples come from the same normal population (use both F-test and t-test).',
          'Fit a Poisson distribution to a given frequency distribution and test the goodness of fit at 5% level of significance using the Chi-Square test.',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Ordinary Differential Equations',
        weightage: '20% (14 Marks)',
        summary:
          'Differential equations of first order and first degree: Exact differential equations, Integrating factors (4 inspection/rule cases), Linear (Leibnitz) and Bernoulli equations. First order and higher degree equations (solvable for p, y, x, and Clairaut’s equation y = px + f(p)). Linear differential equations of higher order with constant coefficients: Complementary Function (CF) and Particular Integral (PI) for e^(ax), sin(ax+b)/cos(ax+b), x^m, e^(ax)V(x), and xV(x).',
        keyFormulas: [
          'Exact ODE Condition: ∂M/∂y = ∂N/∂x for M dx + N dy = 0',
          'Linear & Bernoulli: dy/dx + Py = Q => y·(IF) = ∫ Q·(IF) dx + c where IF = e^(∫P dx)',
          'Clairaut’s Equation: y = px + f(p) => General solution is y = cx + f(c)',
          'Particular Integral Rules: 1/f(D) e^(ax) = e^(ax)/f(a) ; 1/f(D²) sin(ax) = sin(ax)/f(-a²) ; 1/f(D) [e^(ax)V] = e^(ax) [1/f(D+a)] V',
        ],
        keyConcepts: [
          {
            heading: 'Exact Differential Equations & Integrating Factors',
            description:
              'M(x,y)dx + N(x,y)dy = 0 is exact if ∂M/∂y = ∂N/∂x; its general solution is ∫_(y const) M dx + ∫(terms of N free from x) dy = c.',
            bulletPoints: [
              'Rule 1 (Homogeneous): If Mx + Ny ≠ 0, IF = 1 / (Mx + Ny).',
              'Rule 2 (y f(xy)dx + x g(xy)dy = 0): If Mx - Ny ≠ 0, IF = 1 / (Mx - Ny).',
              'Rule 3: If (∂M/∂y - ∂N/∂x) / N = f(x) alone, then IF = exp(∫ f(x) dx).',
              'Rule 4: If (∂N/∂x - ∂M/∂y) / M = g(y) alone, then IF = exp(∫ g(y) dy).',
            ],
          },
          {
            heading: 'Higher Order Linear ODEs with Constant Coefficients',
            description:
              'For f(D)y = X(x), complete solution is y = CF + PI.',
            bulletPoints: [
              'Complementary Function (CF): Roots of Auxiliary Equation f(m) = 0: distinct real roots (c₁e^(m₁x) + c₂e^(m₂x)), repeated roots ((c₁ + c₂x)e^(mx)), complex roots α ± iβ (e^(αx)(c₁cos βx + c₂sin βx)).',
              'Case of Failure in PI: When f(a) = 0 for e^(ax) or f(-a²) = 0 for sin(ax)/cos(ax), multiply by x and differentiate the denominator: PI = x · [1/f\'(D)] X.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Condition of exactness ∂M/∂y = ∂N/∂x and Bernoulli reduction dy/dx + Py = Qy^n via z = y^(1-n).',
          'Operator shift theorem [1/f(D)] e^(ax)V(x) = e^(ax) [1/f(D+a)] V(x).',
        ],
        frequentExamQuestions: [
          'Solve (y² e^(xy²) + 4x³) dx + (2xy e^(xy²) - 3y²) dy = 0 and test for exactness.',
          'Solve (D² - 4D + 4)y = 8 x² e^(2x) sin(2x) using operator methods.',
          'Solve Clairaut’s equation (y - px)(p - 1) = p and find its singular solution.',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Differential Equations of Other Types',
        weightage: '20% (14 Marks)',
        summary:
          'Variable-coefficient linear differential equations: Cauchy’s Homogeneous Linear ODE (x^n d^n y / dx^n + ... = X) and Legendre’s Linear ODE ((ax+b)^n d^n y / dx^n + ... = X). Simultaneous Linear Differential Equations with constant coefficients. Method of Variation of Parameters for second-order differential equations.',
        keyFormulas: [
          'Cauchy Substitution: Put x = e^z (z = ln x), so xD = θ, x²D² = θ(θ - 1), x³D³ = θ(θ - 1)(θ - 2) where θ = d/dz',
          'Legendre Substitution: Put ax + b = e^z, so (ax+b)D = aθ, (ax+b)²D² = a²θ(θ - 1)',
          'Variation of Parameters: y_p = u(x)y₁ + v(x)y₂ where u\' = -y₂X / W and v\' = y₁X / W',
        ],
        keyConcepts: [
          {
            heading: 'Cauchy-Euler & Legendre Homogeneous Linear Equations',
            description:
              'Reduces variable-coefficient equations to constant-coefficient linear equations in independent variable z.',
            bulletPoints: [
              'In Cauchy’s equation ∑ a_k x^k (d^k y / dx^k) = X(x), substituting x = e^z transforms x(dy/dx) = θy and x²(d²y/dx²) = θ(θ-1)y.',
              'After finding CF and PI in terms of z, replace z by ln x and e^z by x.',
            ],
          },
          {
            heading: 'Method of Variation of Parameters & Simultaneous ODEs',
            description:
              'Works for any general right-hand side X(x) such as sec x, tan x, cosec x, or e^x / x where standard operator PI rules do not apply.',
            bulletPoints: [
              'Given d²y/dx² + P(x)dy/dx + Q(x)y = X(x) with CF = c₁y₁ + c₂y₂, compute Wronskian W = y₁y₂\' - y₂y₁\'.',
              'Then PI = -y₁ ∫ (y₂ X / W) dx + y₂ ∫ (y₁ X / W) dx.',
              'Simultaneous ODEs: Eliminate one dependent variable (e.g., y) using operator determinants in D = d/dt, solve for x(t), and substitute back to find y(t).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of u(x) and v(x) formulas in Method of Variation of Parameters.',
          'Transformation proof of x² d²y/dx² = θ(θ-1)y under x = e^z.',
        ],
        frequentExamQuestions: [
          'Solve x² (d²y/dx²) - 3x (dy/dx) + 4y = (1 + x)² and (1 + x)² d²y/dx² + (1 + x) dy/dx + y = 2 sin[log(1 + x)].',
          'Apply the Method of Variation of Parameters to solve (D² + a²)y = sec(ax) and (D² - 2D + 1)y = e^x / x.',
          'Solve the simultaneous differential equations dx/dt + 2y = sin(2t), dy/dt - 2x = cos(2t).',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Partial Differential Equations (PDE)',
        weightage: '20% (14 Marks)',
        summary:
          'Formation of Partial Differential Equations by eliminating arbitrary constants and arbitrary functions. First-order Linear PDEs: Lagrange’s Equation Pp + Qq = R (method of multipliers and grouping). First-order Non-linear PDEs: Four standard forms and Charpit’s General Method. Homogeneous Linear PDEs of higher order with constant coefficients (CF and PI). Method of Separation of Variables for 1D Wave and Heat Equations.',
        keyFormulas: [
          'Standard PDE Notations: p = ∂z/∂x, q = ∂z/∂y, r = ∂²z/∂x², s = ∂²z/∂x∂y, t = ∂²z/∂y²',
          'Charpit’s Auxiliary Equations: dp / (∂f/∂x + p ∂f/∂z) = dq / (∂f/∂y + q ∂f/∂z) = dz / (-p ∂f/∂p - q ∂f/∂q) = dx / (-∂f/∂p) = dy / (-∂f/∂q)',
          'Homogeneous PDE CF: If m₁, m₂ are roots of f(m, 1) = 0, then CF = φ₁(y + m₁x) + φ₂(y + m₂x)',
        ],
        keyConcepts: [
          {
            heading: 'Formation of PDEs & Lagrange’s Linear Equation (Pp + Qq = R)',
            description:
              'PDEs arise by differentiating a relation across x and y to eliminate arbitrary constants or arbitrary functions φ(u, v) = 0.',
            bulletPoints: [
              'Lagrange’s Auxiliary Equations: dx/P = dy/Q = dz/R. Solve by direct grouping of two ratios or by choosing multipliers (l, m, n) such that lP + mQ + nR = 0 => l dx + m dy + n dz = 0.',
              'Once two independent integrals u(x,y,z) = c₁ and v(x,y,z) = c₂ are found, the general solution is φ(u, v) = 0.',
            ],
          },
          {
            heading: 'Charpit’s Method & Four Standard Non-Linear Forms',
            description:
              'For any non-linear first-order PDE f(x, y, z, p, q) = 0, Charpit’s equations find a second relation involving p, q, and an arbitrary constant a.',
            bulletPoints: [
              'Type I: f(p, q) = 0 => Put p = a, q = b where f(a,b) = 0; complete integral is z = ax + by + c.',
              'Type II: z = px + qy + f(p,q) (Clairaut’s PDE) => Complete integral is z = ax + by + f(a,b).',
              'Type III: f(z, p, q) = 0 => Assume q = ap; Type IV: f₁(x, p) = f₂(y, q) = a.',
              'In Charpit’s general method, solve for p and q and integrate dz = p dx + q dy.',
            ],
          },
          {
            heading: 'Homogeneous Higher-Order PDEs with Constant Coefficients',
            description:
              'Equations of the form (a₀ D^n + a₁ D^(n-1)D\' + ... + a_n D\'^n)z = F(x, y) where D = ∂/∂x and D\' = ∂/∂y.',
            bulletPoints: [
              'If F(x, y) = φ(ax + by), then PI = [1 / f(a, b)] ∫∫...∫ φ(u) du^n (provided f(a,b) ≠ 0).',
              'For F(x, y) = sin(ax + by) or cos(ax + by), replace D² by -a², DD\' by -ab, and D\'² by -b².',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Lagrange’s multiplier method for dx/P = dy/Q = dz/R.',
          'Charpit’s auxiliary equations and solution of homogeneous PDEs f(D, D\')z = F(x,y).',
        ],
        frequentExamQuestions: [
          'Solve Lagrange’s PDE: (mz - ny)p + (nx - lz)q = ly - mx and x(y² - z²)p + y(z² - x²)q = z(x² - y²).',
          'Use Charpit’s method to find the complete integral of (p² + q²)y = qz and px + qy = pq.',
          'Solve (D² - DD\' - 2D\'²)z = (y - 1)e^x + sin(3x + 4y).',
        ],
      },
    ],
  },

  // 3. PROBLEM SOLVING USING DATA STRUCTURES (CSA103)
  'sub-dsa': {
    subjectId: 'sub-dsa',
    subjectCode: 'CSA103',
    subjectName: 'Problem Solving using Data Structures',
    shortDescription:
      'Problem solving & asymptotic complexity, Dynamic memory allocation & Array address calculations, Singly/Doubly/Circular Linked Lists, Stacks & Queues (Polish notations, Deque, Priority Queue), Trees (BST, AVL) & Graphs (BFS, DFS), and Searching, Hashing & Sorting algorithms.',
    textbook: 'Data Structures Through C by Yashavant Kanetkar / Fundamentals of Data Structures by Horowitz & Sahni',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: '1D & 2D Array Memory Address Calculation',
        formula: 'Row-Major A[i][j] = B + w × [N × (i - L_r) + (j - L_c)] ; Col-Major = B + w × [(i - L_r) + M × (j - L_c)]',
        note: 'B = Base address, w = element size in bytes, M = total rows, N = total columns.',
      },
      {
        title: 'Circular Queue Full & Empty Conditions',
        formula: 'Next Rear = (rear + 1) % MAX ; Full: (rear + 1) % MAX == front',
        note: 'Overcomes false overflow of linear array queues.',
      },
      {
        title: 'Binary Tree Properties & AVL Balance Factor',
        formula: 'Max nodes at level l = 2^l ; Max nodes of height h = 2^(h+1) - 1 ; n₀ = n₂ + 1 ; BF = h_L - h_R ∈ {-1, 0, +1}',
        note: 'n₀ = number of leaf nodes (degree 0), n₂ = number of internal nodes with degree 2.',
      },
      {
        title: 'Hash Probing Sequences (Open Addressing)',
        formula: 'Linear: h(k, i) = (h\'(k) + i) mod m ; Quadratic: h(k, i) = (h\'(k) + c₁i + c₂i²) mod m',
        note: 'Double Hashing: h(k, i) = (h₁(k) + i · h₂(k)) mod m avoids primary and secondary clustering.',
      },
      {
        title: 'Sorting Time Complexity Summary',
        formula: 'Bubble/Selection/Insertion: O(n²) ; Merge Sort: O(n log n) all cases ; Quick Sort: O(n log n) avg, O(n²) worst',
        note: 'Insertion sort is O(n) on already-sorted input; Merge sort requires O(n) auxiliary space.',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Problem Solving Concepts & Arrays',
        weightage: '20% (14 Marks)',
        summary:
          'Top-down and bottom-up problem-solving approaches, Pointers and Dynamic Memory Allocation in C (malloc, calloc, realloc, free). Classification of Data Structures: Primitive vs Non-primitive, Linear vs Non-linear, Static vs Dynamic. Time and Space Complexity, Asymptotic Notations (Big-O, Omega Ω, Theta Θ). 1D and 2D Arrays: Row-Major and Column-Major memory representation, address calculation numericals, Sparse Matrices, and array insertion/deletion operations.',
        keyFormulas: [
          '1D Array Address: Loc(A[i]) = Base(A) + w × (i - LowerBound)',
          '2D Row-Major: Loc(A[i][j]) = Base + w × [N × (i - L_r) + (j - L_c)]',
          '2D Column-Major: Loc(A[i][j]) = Base + w × [(i - L_r) + M × (j - L_c)]',
          'Asymptotic Growth Order: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!)',
        ],
        keyConcepts: [
          {
            heading: 'Dynamic Memory Allocation & Asymptotic Complexity',
            description:
              'Unlike static arrays whose size is fixed at compile time on the stack, dynamic data structures allocate heap memory at runtime via stdlib.h functions.',
            bulletPoints: [
              'malloc(size) allocates a single uninitialized block of bytes; calloc(n, size) allocates n contiguous blocks initialized to zero; realloc(ptr, new_size) resizes an existing block; free(ptr) releases heap memory.',
              'Big-O (Upper Bound): f(n) = O(g(n)) if 0 ≤ f(n) ≤ c·g(n) for n ≥ n₀ (Worst-case complexity).',
              'Omega Ω (Lower Bound / Best case) and Theta Θ (Tight Bound: c₁g(n) ≤ f(n) ≤ c₂g(n)).',
            ],
          },
          {
            heading: 'Row-Major vs Column-Major 2D Array Representation & Sparse Matrices',
            description:
              'Computer memory is linear; 2D matrices of size M × N are linearized either row-by-row (C/C++) or column-by-column (Fortran/MATLAB).',
            bulletPoints: [
              'Number of elements in range [L..U] is (U - L + 1). Always substitute M = (U_r - L_r + 1) and N = (U_c - L_c + 1) in address formulas.',
              'Sparse Matrix: A matrix with a majority of zero elements. Stored efficiently using 3-Tuple (Row, Column, Value) array representation or Cross-Linked Lists to save memory.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of 2D array Row-Major and Column-Major address formulas with arbitrary lower bounds.',
          'C routines for array insertion at index k (shifting elements right) and deletion at index k (shifting left) in O(n) time.',
        ],
        frequentExamQuestions: [
          'Each element of an array A[-15..20, 10..40] requires 4 bytes of storage. If Base(A) = 1000, calculate the address of A[5][25] in both Row-Major and Column-Major order.',
          'Differentiate between malloc() and calloc() with syntax. Define Big-O, Omega (Ω), and Theta (Θ) asymptotic notations with graphical illustrations.',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Linked Lists',
        weightage: '20% (14 Marks)',
        summary:
          'Dynamic memory representation of Linked Lists vs Arrays. Singly Linked List: Node structure, Traversing, Searching, Insertion (at beginning, end, after given node) and Deletion (first, last, specific key). Doubly Linked List (two-way pointers prev & next) insertion and deletion. Circular Linked List (last->next = head) and Header Linked Lists. Application: Polynomial representation and addition using linked lists.',
        keyFormulas: [
          'Singly Node: struct Node { int data; struct Node *next; };',
          'Doubly Node: struct DNode { int data; struct DNode *prev, *next; };',
          'Polynomial Node: struct Poly { int coeff; int exp; struct Poly *next; };',
        ],
        keyConcepts: [
          {
            heading: 'Singly Linked List Operations & Pointer Manipulation',
            description:
              'A linear collection of self-referential nodes stored at non-contiguous heap addresses connected by next pointers.',
            bulletPoints: [
              'Insert at Beginning (O(1)): newNode->next = head; head = newNode;',
              'Insert after Node ptr (O(1)): newNode->next = ptr->next; ptr->next = newNode; (updating ptr->next first would lose the rest of the list!).',
              'Delete Node after ptr: temp = ptr->next; ptr->next = temp->next; free(temp);',
            ],
          },
          {
            heading: 'Doubly Linked List, Circular Linked List & Polynomial Addition',
            description:
              'Doubly linked lists allow bidirectional O(1) predecessor access; Circular linked lists eliminate NULL pointers at the tail.',
            bulletPoints: [
              'Doubly Linked Insertion between P and Q: new->next = Q; new->prev = P; P->next = new; Q->prev = new;',
              'Doubly Linked Deletion of node ptr: ptr->prev->next = ptr->next; ptr->next->prev = ptr->prev; free(ptr);',
              'Polynomial Addition: Traverse two exponent-sorted polynomial lists P1 and P2 simultaneously; if P1->exp == P2->exp, add coefficients and advance both; otherwise copy the term with larger exponent and advance that pointer.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'C functions for reversing a Singly Linked List in-place using three pointers (prev, curr, next).',
          'Complete algorithm for adding two polynomials represented as singly linked lists.',
        ],
        frequentExamQuestions: [
          'Write C functions to insert a node at a specified position and delete a node with a given key in a Doubly Linked List.',
          'Compare Arrays and Linked Lists. Explain how two polynomials P(x) = 5x⁴ + 3x² + 7 and Q(x) = 4x³ + 2x² + 9 are represented and added using a Linked List.',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Stacks and Queues',
        weightage: '20% (14 Marks)',
        summary:
          'Stack ADT (LIFO principle): Push, Pop, Peek, Overflow & Underflow conditions, Array and Linked List implementations. Applications of Stack: Polish Notations (Infix, Prefix, Postfix), Infix to Postfix conversion algorithm, Evaluation of Postfix expression, Recursion & Tower of Hanoi (2^n - 1 moves). Queue ADT (FIFO principle): Linear Queue, Circular Queue, Double-Ended Queue (Deque), and Priority Queue.',
        keyFormulas: [
          'Tower of Hanoi Moves: T(n) = 2T(n-1) + 1 = 2^n - 1 (O(2^n))',
          'Circular Queue Enqueue: rear = (rear + 1) % SIZE ; Dequeue: front = (front + 1) % SIZE',
          'Operator Precedence: ^ (Right-to-Left, highest) > *, /, % (Left-to-Right) > +, - (Left-to-Right)',
        ],
        keyConcepts: [
          {
            heading: 'Stack Implementation & Polish Expression Conversion/Evaluation',
            description:
              'Stacks enforce Last-In-First-Out access at a single end called TOP. Compilers use stacks to parse parenthesized infix expressions into parenthesis-free Postfix (Reverse Polish) form.',
            bulletPoints: [
              'Infix to Postfix Algorithm: Scan left to right; output operands immediately; push "("; on ")", pop & output until "("; on operator op, pop & output operators from stack with precedence ≥ prec(op), then push op.',
              'Postfix Evaluation Algorithm: Scan left to right; push operands onto stack; when binary operator op is encountered, pop top element as B, next as A, compute A op B, and push result back.',
            ],
          },
          {
            heading: 'Linear Queue, Circular Queue, Deque & Priority Queue',
            description:
              'Queues enforce First-In-First-Out (FIFO) insertion at REAR and deletion at FRONT.',
            bulletPoints: [
              'Circular Queue: Connects index MAX-1 back to 0 using modulo arithmetic, solving the wasted space problem of linear array queues when rear == MAX-1 but front > 0.',
              'Deque (Double-Ended Queue): Allows insertion and deletion at both front and rear ends (Input-restricted vs Output-restricted Deque).',
              'Priority Queue: Elements are dequeued in order of priority rather than arrival order (implemented using multi-queues or binary heaps).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Step-by-step tabular trace of Infix to Postfix conversion and Postfix evaluation.',
          'C code for Circular Queue insert (enqueue) and delete (dequeue) handling wrap-around.',
        ],
        frequentExamQuestions: [
          'Convert the infix expression A + (B * C - (D / E ^ F) * G) * H into Postfix form showing the stack status at every step.',
          'Evaluate the Postfix expression: 6 2 3 + - 3 8 2 / + * 2 ^ 3 + using a stack.',
          'Why is a Circular Queue preferred over a Linear Queue? Write C functions for Enqueue and Dequeue in a Circular Queue.',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Trees and Graphs',
        weightage: '20% (14 Marks)',
        summary:
          'Basic Tree terminology, Binary Trees (Strictly, Complete, Full, Skewed), Array and Linked representation of Binary Trees, Traversals (Preorder, Inorder, Postorder) and reconstructing a tree from Inorder + Preorder/Postorder. Binary Search Tree (BST): Search, Insertion, Deletion (3 cases). AVL Height-Balanced Trees (LL, RR, LR, RL rotations) and B-Trees. Graph terminology, Adjacency Matrix & Adjacency List representations, Breadth First Search (BFS) using Queue, and Depth First Search (DFS) using Stack.',
        keyFormulas: [
          'Preorder: Root → Left → Right ; Inorder: Left → Root → Right ; Postorder: Left → Right → Root',
          'BST Property: For every node N, all keys in Left(N) < Key(N) < all keys in Right(N)',
          'AVL Balance Factor: BF(N) = Height(Left Subtree) - Height(Right Subtree) ∈ {-1, 0, +1}',
          'Handshaking Lemma in Undirected Graph: ∑ deg(v) = 2|E|',
        ],
        keyConcepts: [
          {
            heading: 'Binary Search Trees (BST) & AVL Rotations',
            description:
              'Inorder traversal of any BST always yields keys in strictly ascending sorted order.',
            bulletPoints: [
              'BST Deletion (3 Cases): (1) Leaf node: free directly; (2) One child: bypass node to its single child; (3) Two children: replace node’s key with its Inorder Successor (smallest key in right subtree) or Inorder Predecessor, then delete that successor node.',
              'AVL Tree Rotations: When insertion causes |BF| = 2 at an ancestor node, restore O(log n) height balance via Single Rotations (LL or RR) or Double Rotations (LR or RL).',
            ],
          },
          {
            heading: 'Graph Representations & Traversals (BFS vs DFS)',
            description:
              'A graph G = (V, E) is represented via an Adjacency Matrix (O(V²) space, O(1) edge check) or an Adjacency List (O(V + E) space, ideal for sparse graphs).',
            bulletPoints: [
              'Breadth First Search (BFS): Uses a FIFO Queue; explores vertices level-by-level and finds shortest paths in unweighted graphs in O(V + E) time.',
              'Depth First Search (DFS): Uses a LIFO Stack (or recursion); explores as deep as possible along each branch before backtracking in O(V + E) time.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Unique Binary Tree reconstruction from given Inorder and Preorder/Postorder sequences.',
          'Insertion of keys into an AVL tree showing Balance Factors and LL, RR, LR, RL rotations.',
        ],
        frequentExamQuestions: [
          'Construct an AVL tree by inserting the following elements in order: 21, 26, 30, 9, 4, 14, 28, 18, 15, 10, 2, 3, 7. Show all rotations clearly.',
          'Construct the unique Binary Tree from Inorder: D B E A F C G and Preorder: A B D E C F G, and write its Postorder traversal.',
          'Explain BFS and DFS graph traversal algorithms with an example graph and compare their data structures and applications.',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Searching, Hashing and Sorting',
        weightage: '20% (14 Marks)',
        summary:
          'Sequential (Linear) Search vs Binary Search (algorithm, recurrence & O(log n) complexity). Hashing: Hash table, Hash functions (Division, Mid-square, Folding), Collision resolution techniques: Separate Chaining (Open Hashing) and Open Addressing (Linear Probing, Quadratic Probing, Double Hashing). Internal vs External Sorting, Stability & In-place sorting: Bubble Sort, Selection Sort, Insertion Sort, Quick Sort (partitioning), Merge Sort (divide & conquer), Radix Sort, and Shell Sort.',
        keyFormulas: [
          'Binary Search Recurrence: T(n) = T(n/2) + O(1) => O(log₂ n)',
          'Load Factor of Hash Table: α = n / m (number of keys / table size)',
          'Quick Sort Best/Avg Recurrence: T(n) = 2T(n/2) + O(n) = O(n log n) ; Worst Case: T(n) = T(n-1) + O(n) = O(n²)',
        ],
        keyConcepts: [
          {
            heading: 'Binary Search & Hashing Collision Resolution',
            description:
              'Binary search halves the sorted search interval at each comparison. Hashing provides O(1) average lookup by mapping key k to index h(k) = k mod m.',
            bulletPoints: [
              'Separate Chaining: Each hash table slot points to a linked list of all keys hashing to that index.',
              'Linear Probing: h(k, i) = (h(k) + i) mod m; simple but suffers from Primary Clustering (long contiguous runs of occupied slots).',
              'Quadratic Probing ((h(k) + i²) mod m) eliminates primary clustering; Double Hashing ((h₁(k) + i·h₂(k)) mod m) eliminates both primary and secondary clustering.',
            ],
          },
          {
            heading: 'Divide-and-Conquer & Elementary Sorting Algorithms',
            description:
              'Comparison of mechanism, stability, space complexity, and pass-by-pass execution of sorting algorithms:',
            bulletPoints: [
              'Quick Sort: Selects a pivot element and partitions the array so elements < pivot are on the left and > pivot are on the right. Fastest in practice (in-place O(log n) stack space), though O(n²) if pivot is extremum on sorted input.',
              'Merge Sort: Recursively splits array in half and merges sorted halves in O(n log n) guaranteed worst-case time; stable, but requires O(n) extra array space.',
              'Insertion Sort, Bubble Sort, Merge Sort, and Radix Sort are Stable (preserve relative order of equal keys); Selection Sort, Quick Sort, and Shell Sort are Unstable.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Pass-by-pass partitioning trace of Quick Sort and Merge Sort.',
          'Hash table insertion trace using Division method h(k) = k mod 10 with Linear and Quadratic probing.',
        ],
        frequentExamQuestions: [
          'Trace Quick Sort and Merge Sort on the array: [44, 33, 11, 55, 77, 90, 40, 60, 99, 22, 88] and analyze their best and worst-case time complexities.',
          'Insert keys {76, 93, 40, 47, 10, 55} into a hash table of size m = 7 using h(k) = k mod 7 with (i) Separate Chaining, (ii) Linear Probing, and (iii) Quadratic Probing.',
        ],
      },
    ],
  },

  // 4. BASIC MECHANICAL ENGINEERING (MEB102)
  'sub-bme': {
    subjectId: 'sub-bme',
    subjectCode: 'MEB102',
    subjectName: 'Basic Mechanical Engineering',
    shortDescription:
      'Engineering Materials & Iron-Carbon Diagram, Measurement, Metrology & Reciprocating Machines (IC Engines & Steam Boilers), Thermodynamics & Steam Properties, Power Cycles (Carnot, Otto, Diesel, Rankine) & Refrigeration/AC, and Casting, Welding & Machine Tools.',
    textbook: 'Basic Mechanical Engineering by P.K. Nag / R.K. Rajput / S.S. Rattan',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: 'Hooke’s Law & Elastic Moduli Relations',
        formula: 'σ = E · ε ; E = 2G(1 + μ) = 3K(1 - 2μ) = (9KG) / (3K + G)',
        note: 'E = Young’s Modulus, G = Shear/Rigidity Modulus, K = Bulk Modulus, μ = Poisson’s Ratio.',
      },
      {
        title: 'First Law of Thermodynamics & Enthalpy of Wet Steam',
        formula: 'δQ = dU + δW ; h = h_f + x · h_fg ; s = s_f + x · (h_fg / T_sat)',
        note: 'x = Dryness fraction of wet steam = m_v / (m_v + m_l). For dry saturated steam, x = 1.',
      },
      {
        title: 'Carnot, Otto & Diesel Air-Standard Efficiencies',
        formula: 'η_Carnot = 1 - T_L / T_H ; η_Otto = 1 - 1 / r^(γ-1) ; η_Diesel = 1 - [1 / r^(γ-1)] · [(ρ^γ - 1) / γ(ρ - 1)]',
        note: 'r = V₁/V₂ (Compression ratio), ρ = V₃/V₂ (Cut-off ratio), γ = C_p / C_v = 1.4 for air.',
      },
      {
        title: 'COP of Refrigerator & Heat Pump',
        formula: 'COP_Ref = Q_L / W = T_L / (T_H - T_L) ; COP_HP = Q_H / W = 1 + COP_Ref',
        note: '1 Ton of Refrigeration (1 TR) = 210 kJ/min = 3.5 kW.',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Engineering Materials & Mechanical Properties',
        weightage: '20% (14 Marks)',
        summary:
          'Classification of engineering materials, Mechanical properties (Strength, Elasticity, Plasticity, Ductility, Brittleness, Malleability, Toughness, Hardness, Creep, Fatigue). Stress-Strain diagram for ductile (mild steel) and brittle (cast iron) materials, Hooke’s law & Elastic constants (E, G, K, μ). Composition, properties & applications of Carbon Steels, Alloy Steels, and Cast Iron (Grey, White, Malleable, Spheroidal). Iron-Carbon (Fe-Fe₃C) Phase Equilibrium Diagram and Hardness/Impact testing (Brinell, Rockwell, Izod, Charpy).',
        keyFormulas: [
          'Engineering Stress σ = P / A₀ ; Engineering Strain ε = ΔL / L₀',
          'Poisson’s Ratio μ = -(Lateral Strain) / (Longitudinal Strain)',
          'Eutectoid Reaction (723°C, 0.8% C): Austenite (γ) ↔ Pearlite (α-Ferrite + Fe₃C Cementite)',
          'Eutectic Reaction (1147°C, 4.3% C): Liquid ↔ Ledeburite (Austenite + Cementite)',
        ],
        keyConcepts: [
          {
            heading: 'Stress-Strain Curve for Mild Steel & Elastic Constants',
            description:
              'Uniaxial tensile testing of mild steel reveals distinct elastic and plastic deformation zones prior to cup-and-cone fracture.',
            bulletPoints: [
              'Key Points on Curve: A = Proportional Limit (Hooke’s law σ ∝ ε valid), B = Elastic Limit, C & D = Upper and Lower Yield Points, E = Ultimate Tensile Strength (UTS, maximum load), F = Breaking/Fracture Point (after necking).',
              'Toughness vs Resilience: Resilience is strain energy absorbed up to the elastic limit (area under elastic region); Toughness is total energy absorbed up to fracture (measured by Charpy/Izod impact tests).',
            ],
          },
          {
            heading: 'Iron-Carbon (Fe-Fe3C) Equilibrium Diagram & Cast Irons',
            description:
              'Maps phases of iron-carbon alloys (up to 6.67% C cementite) across temperature: Steels (< 2% C) and Cast Irons (2% to 6.67% C).',
            bulletPoints: [
              'Allotropic forms of Pure Iron: α-Ferrite (BCC, up to 910°C, magnetic below 768°C Curie point), γ-Austenite (FCC, 910°C–1400°C, non-magnetic), δ-Ferrite (BCC, 1400°C–1539°C).',
              'Invariant Reactions: Peritectic (1493°C, 0.18% C), Eutectoid (723°C, 0.8% C forming lamellar Pearlite), and Eutectic (1147°C, 4.3% C forming Ledeburite).',
              'Grey Cast Iron (free graphite flakes, high compressive strength & vibration damping for machine beds) vs White Cast Iron (carbon as hard brittle cementite Fe₃C).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Labeled Stress-Strain diagram for ductile Mild Steel and brittle Cast Iron.',
          'Complete labeled Iron-Carbon (Fe-Fe₃C) Phase Equilibrium diagram showing invariant reactions.',
        ],
        frequentExamQuestions: [
          'Draw the Stress-Strain curve for mild steel under tension and explain all salient points from proportional limit to fracture.',
          'Sketch the Iron-Carbon (Fe-Fe₃C) phase equilibrium diagram, label all phases, and write the Peritectic, Eutectic, and Eutectoid invariant reactions.',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Metrology, Boilers & Internal Combustion Engines',
        weightage: '20% (14 Marks)',
        summary:
          'Measurement & Metrology: Concept of Accuracy, Precision, Sensitivity, Repeatability, Errors in measurement; Vernier Caliper, Micrometer, Dial Gauge, Slip Gauges, Sine Bar (θ = sin⁻¹(h/L)), and Lathe Tool Dynamometer. Steam Boilers: Classification (Fire-tube vs Water-tube), Cochran, Lancashire, Locomotive & Babcock-Wilcox boilers, Boiler Mountings vs Accessories. Internal Combustion (IC) Engines: 2-Stroke vs 4-Stroke, Spark Ignition (SI/Petrol) vs Compression Ignition (CI/Diesel) engines.',
        keyFormulas: [
          'Sine Bar Angle Measurement: sin θ = h / L (h = height of slip gauge stack, L = roller center distance)',
          'IC Engine Stroke Volume: V_s = (π / 4) D² L ; Compression Ratio r = (V_c + V_s) / V_c',
          '4-Stroke vs 2-Stroke Power Strokes: n = N/2 (for 4-stroke) and n = N (for 2-stroke)',
        ],
        keyConcepts: [
          {
            heading: 'Linear & Angular Metrology Instruments (Sine Bar & Slip Gauges)',
            description:
              'Precision workshop metrology measures dimensions and tapers within microns.',
            bulletPoints: [
              'Sine Bar: A hardened steel bar with two precision cylinders separated by center distance L (100 mm or 200 mm), used with wrung Slip Gauges of height h to measure angles via θ = sin⁻¹(h/L).',
              'Systematic vs Random Errors: Systematic errors (instrumental, environmental, observational) are reproducible and correctable by calibration; Random errors fluctuate unpredictably.',
            ],
          },
          {
            heading: 'Steam Boilers: Fire-Tube vs Water-Tube, Mountings & Accessories',
            description:
              'Boilers generate high-pressure steam for power generation and process heating.',
            bulletPoints: [
              'Fire-Tube Boilers (Cochran, Lancashire, Locomotive): Hot flue gases pass inside tubes surrounded by water; low pressure (< 25 bar) and lower steaming rate.',
              'Water-Tube Boilers (Babcock & Wilcox): Water circulates inside inclined tubes heated externally by flue gases; high pressure (> 40–100 bar), rapid steam generation, and safer operation.',
              'Mountings (Safety & Control—mandatory): Water level indicator, Pressure gauge, Safety valves (Dead-weight, Spring-loaded, Fusible plug), Blow-off cock, Feed check valve. Accessories (Efficiency improvers): Economiser, Air preheater, Superheater.',
            ],
          },
          {
            heading: 'Internal Combustion Engines (4-Stroke vs 2-Stroke, SI vs CI)',
            description:
              'IC engines burn air-fuel mixture directly inside the cylinder across Suction, Compression, Power (Expansion), and Exhaust strokes.',
            bulletPoints: [
              'SI (Petrol) vs CI (Diesel): SI works on Otto cycle, uses carburetor/injector + spark plug, compression ratio 6–10; CI works on Diesel cycle, compresses only air to high temperature and injects diesel via fuel injector, compression ratio 16–22.',
              '4-Stroke (2 crank revolutions per power stroke, valves, higher thermal efficiency) vs 2-Stroke (1 crank revolution per power stroke, ports, lighter weight & higher power-to-weight ratio).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Comparison tables: Fire-tube vs Water-tube boilers; Boiler Mountings vs Accessories; 4-Stroke vs 2-Stroke; SI vs CI engines.',
        ],
        frequentExamQuestions: [
          'Explain the construction and working of a Babcock & Wilcox water-tube boiler with a neat sketch. Differentiate between Boiler Mountings and Accessories.',
          'Compare 4-Stroke and 2-Stroke IC engines, as well as Spark Ignition (SI) and Compression Ignition (CI) engines.',
          'Explain the principle of a Sine Bar and Slip Gauges for precision angle measurement.',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Thermodynamics & Steam Properties',
        weightage: '20% (14 Marks)',
        summary:
          'Thermodynamic systems (Open, Closed, Isolated), Macroscopic vs Microscopic view, Intensive & Extensive properties, Path vs Point functions, Quasi-static process. Zeroth Law of Thermodynamics, First Law of Thermodynamics (Closed system δQ = dU + δW and Open Steady Flow Energy Equation SFEE), Second Law of Thermodynamics (Kelvin-Planck & Clausius statements), Entropy. Formation & properties of Steam: Sensible heat, Latent heat, Wet, Dry saturated & Superheated steam, Dryness fraction.',
        keyFormulas: [
          'Steady Flow Energy Equation (SFEE): h₁ + C₁²/2 + gz₁ + q = h₂ + C₂²/2 + gz₂ + w',
          'Polytropic Process (PV^n = C): Work W = (P₁V₁ - P₂V₂) / (n - 1) ; Heat Q = [(γ - n)/(γ - 1)] × W',
          'Enthalpy of Steam: Wet h = h_f + x h_fg ; Dry h_g = h_f + h_fg ; Superheated h_sup = h_g + c_ps (T_sup - T_sat)',
        ],
        keyConcepts: [
          {
            heading: 'Zeroth, First & Second Laws of Thermodynamics',
            description:
              'Fundamental conservation and directional laws governing heat and mechanical work conversion.',
            bulletPoints: [
              'Zeroth Law: Establish thermal equilibrium and temperature measurement (if A is in equilibrium with C and B is with C, then A and B are in thermal equilibrium).',
              'First Law (Law of Conservation of Energy): For a cyclic process ∮ δQ = ∮ δW; for a process δQ = dU + PdV. Perpetual Motion Machine of the First Kind (PMM-1) is impossible.',
              'Second Law: Kelvin-Planck statement (impossible to construct a cyclic heat engine converting 100% of heat from a single reservoir into work; rules out PMM-2) and Clausius statement (heat cannot flow spontaneously from cold to hot body without external work).',
            ],
          },
          {
            heading: 'Formation of Steam & T-s / p-v Phase Diagrams',
            description:
              'Heating 1 kg of water at constant pressure progresses through three stages: Sensible heating to saturation temperature T_sat, Latent vaporization at constant T_sat, and Superheating.',
            bulletPoints: [
              'Dryness Fraction (x): Mass of dry vapour divided by total mass of wet steam mixture (x = m_v / (m_v + m_l)).',
              'Critical Point of Water: At P_c = 221.2 bar and T_c = 374.15°C, latent heat h_fg = 0 and liquid converts directly into vapour.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Equivalence of Kelvin-Planck and Clausius statements of the Second Law of Thermodynamics.',
          'Derivation of work done in Isothermal (W = P₁V₁ ln(V₂/V₁)) and Adiabatic/Polytropic processes.',
        ],
        frequentExamQuestions: [
          'State the Kelvin-Planck and Clausius statements of the Second Law of Thermodynamics and prove that violation of one leads to violation of the other.',
          'Write the Steady Flow Energy Equation (SFEE) and apply it to a Nozzle, Steam Turbine, Compressor, and Throttling device.',
          'Explain the formation of steam on a T-h or T-s diagram and define sensible heat, latent heat, dryness fraction, and degree of superheat.',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Thermodynamic Cycles, Refrigeration & Air Conditioning',
        weightage: '20% (14 Marks)',
        summary:
          'P-V and T-s diagrams and thermal efficiency derivations for Carnot Cycle, Otto Cycle (constant volume heat addition), Diesel Cycle (constant pressure heat addition), Dual Cycle, and Rankine Steam Power Cycle. Refrigeration & Air Conditioning: Ton of Refrigeration (TR), COP, Vapour Compression Refrigeration System (VCRS), Vapour Absorption System, Eco-friendly refrigerants, Psychrometry terms (DBT, WBT, Dew Point, Relative & Specific Humidity) and Window/Split AC working.',
        keyFormulas: [
          'Otto Cycle Efficiency: η_Otto = 1 - 1 / r^(γ-1) where r = V₁ / V₂',
          'Diesel Cycle Efficiency: η_Diesel = 1 - [1 / r^(γ-1)] · [(ρ^γ - 1) / (γ(ρ - 1))] where ρ = V₃ / V₂',
          'Rankine Cycle Efficiency: η_Rankine = (W_Turbine - W_Pump) / Q_Boiler = [(h₁ - h₂) - (h₄ - h₃)] / (h₁ - h₄)',
          'VCRS COP: COP = Refrigerating Effect / Compressor Work = (h₁ - h₄) / (h₂ - h₁)',
        ],
        keyConcepts: [
          {
            heading: 'Air-Standard Cycles (Carnot, Otto, Diesel) & Rankine Cycle',
            description:
              'Ideal thermodynamic cycles compare theoretical limits of IC engines and steam power plants.',
            bulletPoints: [
              'Otto Cycle (4 processes): 1-2 Isentropic compression, 2-3 Constant-volume heat addition, 3-4 Isentropic expansion, 4-1 Constant-volume heat rejection. Efficiency depends solely on compression ratio r.',
              'Diesel Cycle: Replaces 2-3 with Constant-pressure heat addition up to cut-off ratio ρ = V₃/V₂. For the same compression ratio r, η_Otto > η_Diesel.',
              'Rankine Cycle: Ideal vapour cycle for steam power plants comprising Boiler (isobaric heat addition), Steam Turbine (isentropic expansion), Condenser (isobaric heat rejection), and Feed Pump.',
            ],
          },
          {
            heading: 'Vapour Compression Refrigeration (VCRS) & Air Conditioning',
            description:
              'VCRS transfers heat from a low-temperature evaporator space using phase change of a refrigerant.',
            bulletPoints: [
              'Four VCRS Components: (1) Compressor (isentropic compression to high-P superheated vapour), (2) Condenser (rejects heat to surroundings), (3) Expansion/Throttling Valve (isenthalpic pressure drop h₃ = h₄), (4) Evaporator (absorbs latent heat Q_L = h₁ - h₄).',
              'Psychrometric Comfort Conditions: Human thermal comfort requires 22°C–25°C Dry Bulb Temperature (DBT) and 50%–60% Relative Humidity.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Complete derivation of Air-Standard Efficiency of Otto Cycle η = 1 - 1/r^(γ-1) and Diesel Cycle with P-V and T-s diagrams.',
        ],
        frequentExamQuestions: [
          'Derive the expression for the air-standard thermal efficiency of the Otto Cycle and Diesel Cycle with neat P-V and T-s diagrams.',
          'Explain the working of a Vapour Compression Refrigeration System (VCRS) and Window Air Conditioner with schematic and T-s / p-h diagrams.',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Casting, Metal Forming, Welding & Machine Tools',
        weightage: '20% (14 Marks)',
        summary:
          'Foundry & Casting: Sand casting terminology (Flask, Cope, Drag, Core, Sprue, Runner, Riser, Gate), Pattern types & Pattern allowances (Shrinkage, Draft, Machining, Shake, Distortion), Moulding sand properties (Permeability, Green/Dry strength, Refractoriness), Cupola furnace & Casting defects. Metal Forming: Hot vs Cold working, Rolling, Forging, Extrusion, Wire drawing. Welding: Arc welding (SMAW, TIG, MIG), Oxy-Acetylene Gas welding (Neutral, Carburizing, Oxidizing flames), Brazing vs Soldering. Machine Tools: Lathe, Drilling, Milling, and Shaping machines.',
        keyFormulas: [
          'Lathe Machining Time: T_m = L / (f × N) minutes (L = length of cut, f = feed mm/rev, N = spindle RPM)',
          'Cutting Speed: V = (π D N) / 1000 m/min',
        ],
        keyConcepts: [
          {
            heading: 'Sand Casting, Pattern Allowances & Moulding Sand Properties',
            description:
              'Sand casting pours molten metal into a refractory sand mould cavity formed by a replica called a Pattern.',
            bulletPoints: [
              'Pattern Allowances: Shrinkage allowance (compensates solid contraction; Cast Iron ~10 mm/m, Steel ~20 mm/m), Draft/Taper allowance (1°–3° for easy withdrawal), Machining allowance (+2–5 mm), Shake/Rapping allowance (negative allowance).',
              'Moulding Sand Properties: Permeability (porosity to allow gases to escape, preventing blowholes), Refractoriness (withstands high molten temperature), Cohesiveness (strength) & Collapsibility.',
            ],
          },
          {
            heading: 'Welding Processes (Arc & Gas) & Machine Tools (Lathe, Drilling, Milling)',
            description:
              'Permanent metal joining and material-removal machining operations.',
            bulletPoints: [
              'Oxy-Acetylene Flames: Neutral flame (1:1 O₂:C₂H₂, ~3200°C, used for mild steel), Carburizing flame (excess C₂H₂, three zones, for high-carbon steel), Oxidizing flame (excess O₂, ~3400°C, for brass/bronze).',
              'Brazing vs Soldering: Brazing uses brass/spelter filler metal above 450°C; Soldering uses lead-tin alloy filler below 450°C.',
              'Lathe Machine Operations: Turning (step/taper), Facing, Thread cutting (via lead screw), Knurling, Grooving, Parting, and Boring.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Labeled cross-sectional diagram of a Green Sand Mould (Cope, Drag, Pouring basin, Sprue, Runner, Gate, Cavity, Core, Riser) and Centre Lathe machine.',
        ],
        frequentExamQuestions: [
          'Draw a neat cross-sectional diagram of a Green Sand Mould showing all gating elements. Explain the five types of Pattern Allowances.',
          'Differentiate between Soldering, Brazing, and Welding. Explain Oxy-Acetylene gas welding and its three flame types.',
          'Draw a neat block diagram of a Centre Lathe Machine, explain its principal parts, and list the operations performed on it.',
        ],
      },
    ],
  },

  // 5. BASIC ELECTRICAL & ELECTRONICS ENGINEERING (EEB101)
  'sub-beee': {
    subjectId: 'sub-beee',
    subjectCode: 'EEB101',
    subjectName: 'Basic Electrical & Electronics Engineering',
    shortDescription:
      'DC Network Theorems (KCL, KVL, Superposition, Thevenin, Norton, Star-Delta), Single-Phase & Three-Phase AC Circuits, Magnetic Circuits & Single-Phase Transformers, DC Machines & Induction/Synchronous Motors, and Semiconductor Diodes, Rectifiers & Transistors (BJT).',
    textbook: 'Basic Electrical and Electronics Engineering by D.P. Kothari & I.J. Nagrath / B.L. Theraja',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: 'Thevenin, Norton & Maximum Power Transfer',
        formula: 'I_L = V_th / (R_th + R_L) ; I_N = V_th / R_th ; R_L = R_th => P_max = V_th² / (4 R_th)',
        note: 'Replace voltage sources with short circuits and current sources with open circuits when finding R_th.',
      },
      {
        title: '1-Phase & 3-Phase AC Power & Resonance',
        formula: '1-Ph: P = V I cos φ, Q = V I sin φ, S = V I ; 3-Ph: P = √3 V_L I_L cos φ ; f_r = 1 / (2π√(LC))',
        note: 'Star (Y): V_L = √3 V_ph, I_L = I_ph ; Delta (Δ): V_L = V_ph, I_L = √3 I_ph.',
      },
      {
        title: 'Transformer EMF Equation & Efficiency',
        formula: 'E₁ = 4.44 f N₁ Φ_m ; E₂ = 4.44 f N₂ Φ_m ; Max Efficiency when P_cu (I²R_eq) = P_i (Iron loss)',
        note: 'Transformation Ratio K = E₂/E₁ = N₂/N₁ = I₁/I₂.',
      },
      {
        title: 'DC Machine EMF & 3-Phase Induction Motor Slip',
        formula: 'E_g (or E_b) = (Φ Z N / 60) × (P / A) ; N_s = 120f / P ; Slip s = (N_s - N_r) / N_s',
        note: 'Lap winding: A = P (high current); Wave winding: A = 2 (high voltage). Rotor frequency f_r = s · f.',
      },
      {
        title: 'Rectifier Efficiency & BJT Current Gains (α, β)',
        formula: 'Half-Wave η = 40.6%, RF = 1.21 ; Full-Wave η = 81.2%, RF = 0.482 ; β = α / (1 - α)',
        note: 'I_E = I_B + I_C ; α = I_C / I_E (0.95–0.99), β = I_C / I_B (50–300).',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: DC Circuits & Network Theorems',
        weightage: '20% (14 Marks)',
        summary:
          'Active vs Passive, Linear vs Non-linear, Unilateral vs Bilateral, Lumped vs Distributed elements. Independent and Dependent voltage/current sources. Kirchhoff’s Current Law (KCL) & Kirchhoff’s Voltage Law (KVL), Mesh and Nodal analysis. Star-Delta (Y-Δ) transformation. Network Theorems for DC excitations: Superposition Theorem, Thevenin’s Theorem, Norton’s Theorem, and Maximum Power Transfer Theorem.',
        keyFormulas: [
          'KCL: ∑ I_entering = ∑ I_leaving (Conservation of Charge)',
          'KVL: ∑ V_rise - ∑ I·R = 0 around any closed loop (Conservation of Energy)',
          'Delta to Star: R_A = (R_AB · R_CA) / (R_AB + R_BC + R_CA)',
          'Star to Delta: R_AB = R_A + R_B + (R_A · R_B) / R_C',
        ],
        keyConcepts: [
          {
            heading: 'Kirchhoff’s Laws, Star-Delta & Superposition Theorem',
            description:
              'Systematic methods for solving multi-loop resistive networks.',
            bulletPoints: [
              'Superposition Theorem: In any linear bilateral network containing two or more independent sources, the response in any branch equals the algebraic sum of responses caused by each independent source acting alone while all other independent voltage sources are short-circuited and current sources are open-circuited.',
              'Note: Power cannot be calculated by superposition because P = I²R is non-linear.',
            ],
          },
          {
            heading: 'Thevenin’s, Norton’s & Maximum Power Transfer Theorems',
            description:
              'Replaces a complex two-terminal linear network with a simple equivalent circuit across load R_L.',
            bulletPoints: [
              'Thevenin’s Theorem: Equivalent circuit is open-circuit voltage V_th in series with internal resistance R_th.',
              'Norton’s Theorem: Dual of Thevenin; equivalent circuit is short-circuit current I_sc (I_N = V_th / R_th) in parallel with R_N (= R_th).',
              'Maximum Power Transfer Theorem: A resistive load R_L receives maximum DC power when R_L = R_th, giving P_max = V_th² / (4R_th) at 50% efficiency.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Proof of Maximum Power Transfer Condition (dP_L / dR_L = 0 => R_L = R_th) and Star-Delta conversion formulas.',
        ],
        frequentExamQuestions: [
          'State and explain Thevenin’s Theorem and Superposition Theorem. Find the current through the load resistor R_L in a given bridge/multi-source DC circuit.',
          'Derive the expressions for Star-to-Delta and Delta-to-Star resistor transformations.',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Single-Phase & Three-Phase AC Circuits',
        weightage: '20% (14 Marks)',
        summary:
          'Generation of sinusoidal AC voltage, Instantaneous, Peak, Average & RMS values, Form Factor (1.11) and Peak Factor (1.414). Phasor representation of R, L, C, Series RL, RC, and RLC circuits, Impedance, Admittance, Power Factor (cos φ), Active (P), Reactive (Q) & Apparent Power (S). Series and Parallel Resonance, Bandwidth & Q-factor. Three-Phase Balanced AC Circuits: Star (Y) and Delta (Δ) voltage-current-power relations.',
        keyFormulas: [
          'Sinusoidal RMS & Average: V_rms = V_m / √2 = 0.707 V_m ; V_avg = 2V_m / π = 0.637 V_m ; Form Factor = 1.11',
          'Series RLC Impedance: Z = √[R² + (X_L - X_C)²] ∠ tan⁻¹((X_L - X_C)/R)',
          'Series Resonance: X_L = X_C => f_r = 1 / (2π√(LC)) ; Quality Factor Q = (1/R)√(L/C) = f_r / BW',
          'Three-Phase Power (Star & Delta): P = √3 V_L I_L cos φ, Q = √3 V_L I_L sin φ, S = √3 V_L I_L',
        ],
        keyConcepts: [
          {
            heading: 'Series RLC Circuit Phasors & Resonance',
            description:
              'In a pure resistor I is in phase with V; in a pure inductor I lags V by 90°; in a pure capacitor I leads V by 90°.',
            bulletPoints: [
              'At Series Resonance (X_L = X_C): Impedance is minimum (Z = R, purely resistive), current is maximum (I_max = V/R), power factor cos φ = 1 (unity), and voltage across L or C is magnified to Q · V.',
              'Half-Power Frequencies (f₁, f₂): Frequencies where current drops to I_max / √2; Bandwidth BW = f₂ - f₁ = R / (2πL).',
            ],
          },
          {
            heading: 'Three-Phase Balanced Star (Y) & Delta (Δ) Connections',
            description:
              'Three-phase voltages are displaced by 120° electrical (e_R + e_Y + e_B = 0 at every instant).',
            bulletPoints: [
              'Star (Y) Connection: Line current equals phase current (I_L = I_ph), while line voltage is √3 times phase voltage (V_L = √3 V_ph) leading V_ph by 30°.',
              'Delta (Δ) Connection: Line voltage equals phase voltage (V_L = V_ph), while line current is √3 times phase current (I_L = √3 I_ph).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of RMS value, Average value, Form factor (1.11) and Peak factor (1.414) of a sine wave.',
          'Phasor derivation of V_L = √3 V_ph in Star connection and I_L = √3 I_ph in Delta connection.',
        ],
        frequentExamQuestions: [
          'Derive the condition for resonance, resonant frequency, half-power frequencies, bandwidth, and Q-factor in a series RLC circuit.',
          'Establish the relation between Line and Phase voltages and currents in a balanced 3-phase Star (Y) and Delta (Δ) connected system.',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Magnetic Circuits & Single-Phase Transformers',
        weightage: '20% (14 Marks)',
        summary:
          'Magnetic Circuits: MMF, Magnetic Flux (Φ), Reluctance (S = l / μA), Flux density (B), Magnetic field intensity (H), B-H hysteresis curve, Analogy between Electric and Magnetic circuits. Single-Phase Transformer: Working principle (Faraday’s law of mutual induction), Core-type vs Shell-type construction, EMF Equation derivation, Ideal vs Practical transformer on no-load and load, Phasor diagrams, Equivalent circuit, Voltage Regulation, Core (Hysteresis & Eddy current) and Copper losses, Efficiency, and OC/SC tests.',
        keyFormulas: [
          'Ohm’s Law of Magnetic Circuit: Φ = MMF / Reluctance = (N · I) / (l / μ₀ μ_r A)',
          'Transformer EMF Equation: E₁ = 4.44 f N₁ Φ_m ; E₂ = 4.44 f N₂ Φ_m',
          'Transformer Efficiency: η = (x · S · cos φ₂) / [x · S · cos φ₂ + P_i + x² P_cu(fl)]',
          'Load Fraction for Max Efficiency: x = √(P_i / P_cu(fl))',
        ],
        keyConcepts: [
          {
            heading: 'Magnetic Circuits vs Electric Circuits & Core Losses',
            description:
              'Flux Φ in a magnetic core is analogous to current I; MMF (NI) is analogous to EMF (V); Reluctance S = l/(μA) is analogous to Resistance R = ρl/A.',
            bulletPoints: [
              'Hysteresis Loss (P_h = η B_max^1.6 f V): Caused by cyclic reversal of magnetic domains; minimized by using high-grade CRGO Silicon Steel with a narrow hysteresis loop.',
              'Eddy Current Loss (P_e = K_e B_max² f² t² V): Caused by circulating induced currents in the core; minimized by using thin insulated core laminations (0.35–0.5 mm thick).',
            ],
          },
          {
            heading: 'Single-Phase Transformer EMF, Losses, Efficiency & OC/SC Tests',
            description:
              'A static electromagnetic device that transfers AC electrical power from one circuit to another at constant frequency via mutual flux.',
            bulletPoints: [
              'EMF Derivation: Φ = Φ_m sin(ωt) => e = -N dΦ/dt => E_max = 2πf N Φ_m => E_rms = E_max / √2 = 4.44 f N Φ_m.',
              'Open-Circuit (OC) Test (conducted on LV side with HV open at rated voltage/frequency): Measures core/iron loss P_i and no-load parameters R₀, X₀.',
              'Short-Circuit (SC) Test (conducted on HV side with LV shorted at reduced voltage for rated current): Measures full-load copper loss P_cu(fl) and equivalent impedance R_eq, X_eq.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of Transformer EMF equation E = 4.44 f N Φ_m and condition for maximum efficiency (Iron Loss = Copper Loss).',
        ],
        frequentExamQuestions: [
          'Derive the EMF equation of a single-phase transformer. A 25 kVA, 2000/200 V, 50 Hz transformer has 66 secondary turns. Calculate primary turns, full-load currents, and maximum flux Φ_m.',
          'Explain the Open-Circuit (OC) and Short-Circuit (SC) tests on a single-phase transformer and derive the condition for maximum efficiency.',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Electrical Machines (DC, Induction & Synchronous)',
        weightage: '20% (14 Marks)',
        summary:
          'DC Machines: Construction (Yoke, Poles, Armature core, Commutator & Brushes), Working principle of DC Generator & DC Motor, EMF and Torque equations, Types (Separate, Shunt, Series, Compound) and Speed control of DC Shunt motor. Three-Phase Induction Motor: Rotating Magnetic Field (RMF), Synchronous speed (N_s = 120f/P), Slip, Squirrel-cage vs Slip-ring rotor, Torque-Slip characteristics. Single-Phase Induction Motor (Double revolving field theory & capacitor-start) and Synchronous Machines.',
        keyFormulas: [
          'DC Generator Terminal Voltage: V = E_g - I_a R_a ; DC Motor Back EMF: E_b = V - I_a R_a',
          'DC Motor Armature Torque: T_a = 0.159 Φ Z I_a (P / A) N·m ; Speed N ∝ E_b / Φ',
          '3-Phase Induction Motor Rotor Speed: N_r = N_s (1 - s) ; Rotor EMF Frequency: f_r = s · f',
        ],
        keyConcepts: [
          {
            heading: 'DC Generator & DC Motor Principles and Types',
            description:
              'A DC generator uses a split-ring commutator as a mechanical rectifier to convert AC induced in rotating armature conductors into DC; a DC motor produces torque F = B I L.',
            bulletPoints: [
              'Significance of Back EMF (E_b): In a DC motor, rotating armature conductors cut flux to induce E_b opposing supply V. Armature current I_a = (V - E_b)/R_a automatically self-regulates motor load!',
              'DC Shunt Motor (nearly constant speed, used in lathes/blowers) vs DC Series Motor (very high starting torque T ∝ I_a², never started at no-load, used in electric traction and cranes).',
            ],
          },
          {
            heading: 'Three-Phase & Single-Phase Induction Motors',
            description:
              'A 3-phase stator supply produces a constant-magnitude Rotating Magnetic Field (RMF = 1.5 Φ_m) revolving at synchronous speed N_s = 120f/P.',
            bulletPoints: [
              'Why Rotor Never Reaches Synchronous Speed (N_r < N_s): If N_r = N_s, relative speed is zero, no flux is cut, induced rotor EMF and current become zero, and electromagnetic torque becomes zero.',
              'Single-Phase Induction Motor is NOT Self-Starting: A single-phase pulsating flux splits into two equal rotating fields revolving in opposite directions, producing zero net starting torque until an auxiliary phase-split (capacitor) winding is added.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of EMF equation E = (ΦZN/60)(P/A) and Torque equation of a DC machine.',
          'Production of Rotating Magnetic Field (RMF = 1.5 Φ_m) in a 3-phase stator.',
        ],
        frequentExamQuestions: [
          'Explain the construction of a DC machine and derive its EMF equation. Why is a starter required for starting a DC motor?',
          'Explain the working principle of a 3-Phase Induction Motor and differentiate between Squirrel-Cage and Slip-Ring (Wound Rotor) induction motors.',
          'Why is a Single-Phase Induction Motor not self-starting? Explain the Capacitor-Start Capacitor-Run method of starting.',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Basic Electronics (Diodes, Rectifiers & Transistors)',
        weightage: '20% (14 Marks)',
        summary:
          'P-N Junction Diode: Depletion layer, Barrier potential (0.7 V for Si, 0.3 V for Ge), Forward & Reverse bias V-I characteristics, Zener diode & Avalanche vs Zener breakdown, Zener diode as Shunt Voltage Regulator. Rectifiers: Half-Wave, Centre-Tap Full-Wave, and Bridge Full-Wave Rectifiers (Efficiency, Ripple Factor, PIV, TUF) and Filters. Bipolar Junction Transistor (BJT): NPN & PNP operation, CB, CE, and CC configurations, Input/Output characteristics, and relation between α, β, and γ.',
        keyFormulas: [
          'Half-Wave Rectifier: I_dc = I_m / π, I_rms = I_m / 2, η = 40.6%, Ripple Factor = 1.21, PIV = V_m',
          'Full-Wave (Centre-Tap & Bridge): I_dc = 2I_m / π, I_rms = I_m / √2, η = 81.2%, Ripple Factor = 0.482',
          'BJT Current Relations: I_E = I_B + I_C ; β = α / (1 - α) ; α = β / (1 + β) ; I_C = β I_B + (1 + β) I_CBO',
        ],
        keyConcepts: [
          {
            heading: 'P-N Junction Diode, Zener Regulator & Rectifiers',
            description:
              'Rectifiers convert bidirectional AC into pulsating DC using the unidirectional conduction of P-N junction diodes.',
            bulletPoints: [
              'Half-Wave vs Centre-Tap vs Bridge Rectifier: Bridge rectifier achieves 81.2% rectification efficiency and 0.482 ripple factor using 4 diodes without requiring a costly centre-tapped transformer, and has Peak Inverse Voltage PIV = V_m (vs 2V_m for centre-tap).',
              'Zener Voltage Regulator: Operated in reverse breakdown region in parallel with load R_L; maintains constant output voltage V_Z across variable load or fluctuating input.',
            ],
          },
          {
            heading: 'Bipolar Junction Transistor (BJT) Configurations (CB, CE, CC)',
            description:
              'A three-terminal, two-junction bipolar device (Emitter-heavily doped, Base-thin & lightly doped, Collector-largest area & moderately doped) operating in Active (E-B forward, C-B reverse), Cut-off, or Saturation regions.',
            bulletPoints: [
              'Common Emitter (CE) Configuration: Most widely used amplifier configuration because it provides both high current gain (β ≈ 50–300) and high voltage/power gain, with 180° phase inversion between input and output.',
              'Common Base (CB) has low input impedance and unity current gain (α < 1); Common Collector (CC / Emitter Follower) has very high input impedance and low output impedance for impedance matching.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of Average current, RMS current, Rectification Efficiency (81.2%), and Ripple Factor (0.482) of a Full-Wave Rectifier.',
          'Derivation of β = α / (1 - α) and I_C = β I_B + I_CEO for a BJT.',
        ],
        frequentExamQuestions: [
          'Draw the circuit diagram and input/output waveforms of a Full-Wave Bridge Rectifier and derive its Rectification Efficiency (81.2%) and Ripple Factor (0.482).',
          'Explain the working of an NPN transistor in Common Emitter (CE) configuration with input and output V-I characteristic curves (Active, Cut-off, and Saturation regions). Derive β = α / (1 - α).',
        ],
      },
    ],
  },

  // 6. PYTHON PROGRAMMING (ITC101)
  'sub-python': {
    subjectId: 'sub-python',
    subjectCode: 'ITC101',
    subjectName: 'Python Programming',
    shortDescription:
      'Python basics & data types, Conditional & looping control flow, String slicing & Text/CSV File handling, Lists, Tuples & Dictionaries, and Object-Oriented Programming (Classes, Inheritance, Overriding) & Exception Handling.',
    textbook: 'Think Python by Allen B. Downey / Python Programming by Reema Thareja',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: 'String & List Slicing Syntax',
        formula: 'seq[start : stop : step] ; Reverse sequence: seq[::-1]',
        note: 'Positive index starts at 0 from left; Negative index starts at -1 from right.',
      },
      {
        title: 'Mutable vs Immutable Built-in Data Types',
        formula: 'Immutable: int, float, bool, str, tuple, frozenset ; Mutable: list, dict, set',
        note: 'Dictionary keys must be immutable (hashable) objects like str, int, or tuple.',
      },
      {
        title: 'File Modes & Context Manager',
        formula: 'with open("data.txt", "r+") as f: data = f.read()',
        note: 'Modes: "r" (read), "w" (write/truncate), "a" (append), "r+" (read+write), "rb"/"wb" (binary).',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Introduction to Computer Science & Python Basics',
        weightage: '20% (14 Marks)',
        summary:
          'Introduction to algorithms, data representation in memory, Python interactive shell (REPL) vs script mode, IDLE, saving and running programs. Variables, keywords, identifiers, Mutable vs Immutable data types (int, float, complex, bool, str), Type conversion, Arithmetic, Relational, Logical, Bitwise, Assignment, Identity (is, is not) & Membership (in, not in) operators, Operator precedence, Indentation, and Comments.',
        keyFormulas: [
          'Floor Division vs True Division: 7 // 2 == 3, -7 // 2 == -4 ; 7 / 2 == 3.5',
          'Exponentiation (Right-to-Left Associative): 2 ** 3 ** 2 == 2 ** 9 == 512',
        ],
        keyConcepts: [
          {
            heading: 'Python Execution Model, Dynamic Typing & Mutability',
            description:
              'Python compiles source code (.py) into platform-independent bytecode (.pyc) executed by the Python Virtual Machine (PVM).',
            bulletPoints: [
              'Dynamic Typing: Variables are references bound to objects in heap memory; type() returns object type and id() returns memory address.',
              'Identity vs Equality: "a == b" compares values of two objects, whereas "a is b" checks whether both variables point to the exact same memory address (id(a) == id(b)).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Operator Precedence & Associativity table (PEMDAS + Bitwise + Logical).',
        ],
        frequentExamQuestions: [
          'Differentiate between Mutable and Immutable data types in Python with examples. Explain Identity (is) and Membership (in) operators.',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Conditional & Control Flow Statements',
        weightage: '20% (14 Marks)',
        summary:
          'Boolean expressions, range(start, stop, step) generator function, Conditional branching (if, if-else, if-elif-else, nested conditionals). Iterative loops: while loop, for loop over sequences, nested loops, loop else clause, and unconditional control statements (break, continue, pass).',
        keyFormulas: [
          'range(start, stop, step): Generates integers from start up to (stop - 1)',
        ],
        keyConcepts: [
          {
            heading: 'Loop Control Statements & Loop-Else Block',
            description:
              'Python supports an optional else block on both for and while loops.',
            bulletPoints: [
              'The else block of a loop executes ONLY when the loop terminates normally (exhausts its iterable or while condition becomes False) and is skipped if terminated prematurely by break.',
              'break exits the innermost loop immediately; continue skips the remaining body of the current iteration; pass is a null no-op placeholder.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Python programs for prime check, Fibonacci series, Armstrong numbers, and pattern printing.',
        ],
        frequentExamQuestions: [
          'Explain the working of break, continue, pass, and the loop-else clause in Python with suitable code examples.',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Strings, File Manipulation & Directories',
        weightage: '20% (14 Marks)',
        summary:
          'String indexing, slicing, immutability, formatting, and built-in string methods (split, join, strip, find, replace, upper, lower, isdigit, isalpha). Text and binary file manipulation: open(), read(), readline(), readlines(), write(), writelines(), seek(), tell(), close(). Reading and writing CSV files, and navigating directories with os and sys modules.',
        keyFormulas: [
          'File Pointer Positioning: f.seek(offset, whence) ; Current byte offset: f.tell()',
        ],
        keyConcepts: [
          {
            heading: 'String Slicing & File I/O Operations',
            description:
              'Strings are immutable sequences of Unicode characters; files provide persistent storage on disk.',
            bulletPoints: [
              'String Slicing: s[i:j:k] extracts characters from index i to j-1 with step k without modifying the original string.',
              'File Handling & os Module: Using "with open(...) as f:" ensures automatic file closure even if exceptions occur. os.getcwd(), os.listdir(), os.mkdir(), and os.path.exists() manage directory trees.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Python scripts to count lines, words, and characters in a text file and copy contents between files.',
        ],
        frequentExamQuestions: [
          'Explain positive and negative string slicing in Python. Write a Python program to read a text file and count the frequency of each word.',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Lists, Tuples and Dictionaries',
        weightage: '20% (14 Marks)',
        summary:
          'Lists: Creation, slicing, aliasing vs cloning, List methods (append, extend, insert, remove, pop, sort, reverse), List comprehensions, 2D matrices, Linear & Binary search on lists. Tuples: Immutability, packing & unpacking, zip(). Dictionaries: Key-value hashing, adding/updating/deleting items, dict methods (keys, values, items, get, update, pop) and nested dictionaries.',
        keyFormulas: [
          'List Comprehension: [expr for item in iterable if condition]',
          'Dict Comprehension: {k: v for (k, v) in iterable}',
        ],
        keyConcepts: [
          {
            heading: 'Lists vs Tuples & Dictionary Key-Value Operations',
            description:
              'Lists are dynamic mutable arrays; Tuples are fixed immutable records; Dictionaries are hash tables mapping unique immutable keys to values.',
            bulletPoints: [
              'append(x) adds x as a single element at the end of a list, whereas extend(iterable) unpacks and appends each element of the iterable.',
              'd.get(key, default) safely retrieves a value without raising KeyError if the key is absent.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Comparison between List, Tuple, Set, and Dictionary in Python.',
        ],
        frequentExamQuestions: [
          'Compare Lists and Tuples in Python. Explain List Comprehensions and Dictionary methods (get, items, keys, values, update, pop) with examples.',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Classes, Object-Oriented Programming & Exceptions',
        weightage: '20% (14 Marks)',
        summary:
          'OOP concepts in Python: class definition, object instantiation, self parameter, __init__() constructor, __str__(), Instance vs Class variables, Encapsulation & Data hiding (__private attributes). Inheritance (Single, Multiple, Multilevel, Hierarchical), super(), Method Overriding & Operator Overloading. Exception Handling: Syntax errors vs Runtime exceptions, try-except-else-finally blocks, raise statement, and User-Defined Exceptions.',
        keyFormulas: [
          'Constructor: def __init__(self, ...): ; Destructor: def __del__(self):',
          'Custom Exception: class MyError(Exception): pass',
        ],
        keyConcepts: [
          {
            heading: 'Classes, Inheritance & Method Overriding',
            description:
              'Every instance method in Python explicitly receives the calling object reference as its first parameter (self).',
            bulletPoints: [
              'Data Hiding: Prefixing an attribute with double underscores (__balance) triggers name mangling (_ClassName__balance) to prevent accidental external access.',
              'Inheritance & super(): Derived classes inherit attributes and methods from base classes and use super().__init__() to invoke parent initialization.',
            ],
          },
          {
            heading: 'Structured Exception Handling (try-except-else-finally)',
            description:
              'Prevents abrupt program crashes on runtime errors such as ZeroDivisionError, ValueError, KeyError, IndexError, and FileNotFoundError.',
            bulletPoints: [
              'try block contains risky code; except catches and handles matching exceptions; else runs if NO exception was raised in try; finally ALWAYS executes for cleanup.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Complete Python program demonstrating Inheritance, Method Overriding, and try-except-else-finally blocks.',
        ],
        frequentExamQuestions: [
          'Explain the role of self and __init__() in Python classes. Write a program demonstrating Inheritance and Method Overriding.',
          'Explain Exception Handling in Python using try, except, else, finally, and raise with an example of a User-Defined Exception.',
        ],
      },
    ],
  },

  // 7. PRINCIPLE OF SYSTEM SOFTWARE & LINUX (CSA104)
  'sub-sys-soft': {
    subjectId: 'sub-sys-soft',
    subjectCode: 'CSA104',
    subjectName: 'Principle of System Software & Linux',
    shortDescription:
      'Language processors & Linux commands/filters, Two-Pass Assembler design (OPTAB, SYMTAB, LITTAB), Macro Processors (MNT, MDT), Interpreters & UNIX Processes/IPC, and Linkers & Loaders.',
    textbook: 'Systems Programming and Operating Systems by D.M. Dhamdhere / UNIX & Shell Programming by B.A. Forouzan',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: 'Semantic Gap & Binding Time',
        formula: 'Application Domain ↔ PL Domain (Specification Gap) ↔ Execution Domain (Execution Gap)',
        note: 'Language Processors (Compilers, Assemblers, Interpreters) bridge the execution gap.',
      },
      {
        title: 'Linux File Permission Octal Notation',
        formula: 'r = 4, w = 2, x = 1 ; chmod 755 file => rwxr-xr-x (Owner:7, Group:5, Others:5)',
        note: 'Inode stores file metadata (permissions, owner, size, timestamps, disk block pointers) except filename.',
      },
      {
        title: 'Address Binding in Linker & Loader',
        formula: 'Linked Address = Translated Origin + Relocation Factor ; Relocation Factor = Link_Origin - Translate_Origin',
        note: 'Program relocation patches address-sensitive instructions using a Modification Record or Relocation Bitmask.',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Language Processors, Software Tools & Linux Commands',
        weightage: '20% (14 Marks)',
        summary:
          'System software vs Application software, Language processing activities (Program generation vs Program execution), Fundamentals of translation: Toy Compiler Front-End (Lexical Analysis / Scanning, Syntax Analysis / Parsing, Semantic Analysis), Symbol Tables. Linux OS architecture (Kernel, Shell, File system), vi editor modes, File & Process commands, chmod permissions, and Text filters (grep, sed, awk).',
        keyFormulas: [
          'Lexical Analysis -> Tokens ; Syntax Analysis -> Parse Tree / AST ; Semantic Analysis -> Type-checked IC',
        ],
        keyConcepts: [
          {
            heading: 'Language Processing Activities & Compiler Front-End',
            description:
              'Analysis phase breaks the source program into constituent lexical, syntactic, and semantic units and builds the Symbol Table; Synthesis phase generates target machine code.',
            bulletPoints: [
              'Lexical Analyzer (Scanner): Reads character stream and groups characters into Tokens (Identifiers, Keywords, Operators, Literals).',
              'Syntax Analyzer (Parser): Verifies grammar rules and builds a parse tree; Semantic Analyzer performs type checking and updates the Symbol Table.',
            ],
          },
          {
            heading: 'Linux Commands, vi Editor & Text Filters (grep, sed, awk)',
            description:
              'Core UNIX/Linux shell utilities for file manipulation and stream filtering.',
            bulletPoints: [
              'vi Editor Modes: Command mode (navigation, dd, yy, p), Insert mode (i, a, o), and Last-line/Ex mode (:w, :q, :wq, :s/old/new/g).',
              'grep searches files for regular expression patterns; sed performs non-interactive stream editing; awk processes column/field-structured text.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Block diagram of Language Processor (Analysis + Synthesis phases) and Linux Kernel-Shell architecture.',
        ],
        frequentExamQuestions: [
          'Explain the phases of a Language Processor (Lexical, Syntax, and Semantic Analysis) with a trace of the statement: a = b + c * 10.',
          'Explain the three modes of the vi editor and the usage of grep, sed, awk, and chmod in Linux.',
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Assemblers & Two-Pass Assembler Design',
        weightage: '20% (14 Marks)',
        summary:
          'Elements of Assembly Language Programming: Imperative Statements (IS), Declaration Statements (DL: DC, DS), and Assembler Directives (AD: START, END, ORIGIN, EQU, LTORG). Forward Reference problem, Single-Pass vs Two-Pass Assemblers. Complete design of a Two-Pass Assembler: Data structures OPTAB, SYMTAB, LITTAB, POOLTAB, Location Counter (LC) processing in Pass-I, Intermediate Code (Variant I & Variant II), and Target Code synthesis in Pass-II.',
        keyFormulas: [
          'Pass-I: Separate symbol definitions, maintain LC, build SYMTAB & LITTAB, generate Intermediate Code (IC)',
          'Pass-II: Synthesize machine code using IC + SYMTAB + LITTAB',
        ],
        keyConcepts: [
          {
            heading: 'Assembler Directives & The Forward Reference Problem',
            description:
              'When an instruction references a symbol that is defined later in the source program, its memory address is unknown during a single top-down scan.',
            bulletPoints: [
              'START <const> initializes Location Counter (LC); ORIGIN <expr> resets LC; EQU defines a symbol’s value by equating it to another expression; LTORG allocates memory to literals collected in the current literal pool.',
              'Two-Pass Solution: Pass-I scans source to populate SYMTAB and LITTAB with exact addresses; Pass-II uses those tables to emit final machine instructions.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Complete Pass-I and Pass-II trace generating SYMTAB, LITTAB, POOLTAB, and Variant-I / Variant-II Intermediate Code.',
        ],
        frequentExamQuestions: [
          'Explain the data structures (OPTAB, SYMTAB, LITTAB, POOLTAB) used in a Two-Pass Assembler and trace Pass-I on a sample assembly program containing START, LTORG, ORIGIN, and EQU.',
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Macros and Macro Processors',
        weightage: '20% (14 Marks)',
        summary:
          'Macro definition (MACRO ... MEND) and Macro call/expansion, Macros vs Subroutines, Lexical expansion vs Semantic expansion. Positional parameters, Keyword parameters, Default parameter values, Mixed parameter lists. Macro calls within macros (Nested macros), Advanced Macro Facilities (AIF, AGO, ANOP, Expansion-time variables &EV, Sequencing symbols). Design of a Macro Preprocessor: Macro Name Table (MNT), Macro Definition Table (MDT), KPDTAB, PNTAB, and APTAB.',
        keyFormulas: [
          'MNT Entry: (Macro Name, #PP, #KP, MDTP, KPDTP)',
          'MDT: Stores macro body where formal parameters are replaced by positional notation (P, #i)',
        ],
        keyConcepts: [
          {
            heading: 'Macro Expansion, Advanced Facilities & Preprocessor Tables',
            description:
              'A macro processor replaces each macro call with the statements of its body in-line before assembly (saving call/return overhead at the cost of code size).',
            bulletPoints: [
              'Conditional Assembly (AIF & AGO): Alter the sequence of statements generated during macro expansion using expansion-time variables (LCL, GBL, SET) and sequencing symbols (.LOOP, ANOP).',
              'Data Structures: MNT indexes macro names and points into MDT (Macro Definition Table) and KPDTAB (Keyword Parameter Default Table); APTAB (Actual Parameter Table) binds actual arguments during expansion.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Construction of MNT, MDT, PNTAB, and KPDTAB for a macro with positional and keyword parameters.',
        ],
        frequentExamQuestions: [
          'Differentiate between a Macro and a Subroutine. Explain the design of a Macro Preprocessor with MNT, MDT, KPDTAB, and APTAB tables.',
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Interpreters, Processes & Inter-Process Communication',
        weightage: '20% (14 Marks)',
        summary:
          'Use and overview of Interpreters, Benefits of interpretation vs compilation, Components of an Interpreter (Symbol table, Data store, Data manipulation routines), Pure vs Impure interpreters, P-codeCompilers & Java VM. UNIX File System & Inode structure, Process concept, Process states, Process creation & control system calls (fork(), exec(), wait(), exit(), getpid()), Zombie & Orphan processes, and Inter-Process Communication (Pipes, Named FIFOs, Message Queues, Semaphores, Shared Memory).',
        keyFormulas: [
          'fork() Return Value: Returns 0 to the newly created Child process, and Child PID (> 0) to the Parent process',
        ],
        keyConcepts: [
          {
            heading: 'Pure vs Impure Interpreters & UNIX Process Management',
            description:
              'Interpreters execute source or intermediate code statement-by-statement without producing a standalone native binary.',
            bulletPoints: [
              'Pure Interpreter: Source program is kept in raw source form throughout interpretation (high analysis overhead inside loops). Impure Interpreter preprocesses source into an intermediate representation (IC / bytecode) before interpretation.',
              'Zombie vs Orphan Process: A child that terminates before its parent calls wait() becomes a Zombie (retains exit status in process table); a child whose parent terminates first becomes an Orphan and is adopted by init/systemd (PID 1).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Execution trace of fork(), exec(), and wait() system calls and UNIX Inode block addressing.',
        ],
        frequentExamQuestions: [
          'Compare Pure and Impure Interpreters. Explain UNIX process creation using fork(), exec(), and wait(), and differentiate between Zombie and Orphan processes.',
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Linkers and Loaders',
        weightage: '20% (14 Marks)',
        summary:
          'Relocation and Linking concepts: Translated Origin, Linked Origin, and Load Origin. Address-sensitive instructions & Program Relocation (Relocation factor). Linking external references using PUBLIC/ENTRY and EXTRN definitions. Object Module format (Header, Program, Relocation, and Linking tables: NTAB, EXTRN, ENTRY). Design of a Linker, Self-Relocating Programs, Overlay-structured programs (Overlay tree), Absolute vs Relocating Loaders, and Dynamic Linking.',
        keyFormulas: [
          'Relocation Factor (RF_p) = l_origin(p) - t_origin(p)',
          'Patched Address = Translated Address + RF_p',
        ],
        keyConcepts: [
          {
            heading: 'Program Relocation, External Symbol Resolution & Overlays',
            description:
              'A linker combines multiple independently translated object modules into a single executable binary and resolves cross-module symbolic references.',
            bulletPoints: [
              'Pass-I of Linker builds the Name Table (NTAB) recording the linked origin of every object module and every global ENTRY symbol.',
              'Pass-II performs address relocation on address-sensitive instructions and patches EXTRN references using NTAB.',
              'Overlays & Dynamic Linking: An Overlay structure allows mutually exclusive branches of a large program to share the same main memory area; Dynamic Linking defers linking of shared libraries (.so / .dll) until load time or first runtime call.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Address calculation for Relocation and Linking across two object modules using NTAB.',
        ],
        frequentExamQuestions: [
          'Explain Program Relocation and Linking with an example showing Translated Origin, Linked Origin, ENTRY, EXTRN, and the Name Table (NTAB).',
          'Explain Overlay-structured programs, Self-Relocating programs, and Dynamic Linking.',
        ],
      },
    ],
  },
};
