import { FirstYearSubjectNotesDetail } from './firstYearDetailedNotes';

export const SEM_1_DETAILED_NOTES: Record<string, FirstYearSubjectNotesDetail> = {
  // 1. APPLIED CHEMISTRY (CHB101)
  'sub-applied-chem': {
    subjectId: 'sub-applied-chem',
    subjectCode: 'CHB101',
    subjectName: 'Applied Chemistry',
    shortDescription:
      'Water technology, electrochemistry & Li-ion energy storage, corrosion prevention, conducting polymers & nanomaterials, and instrumental methods of analysis.',
    textbook: 'Engineering Chemistry by Jain & Jain / O.G. Palanna',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: 'Hardness in CaCO3 Equivalents',
        formula: 'Hardness (mg/L or ppm) = [Mass of hardness-causing salt (mg/L) × 100] / [Molecular weight of salt]',
        note: 'Equivalent weight of CaCO3 = 50, Molecular weight of CaCO3 = 100.',
      },
      {
        title: 'EDTA Complexometric Titration',
        formula: 'Total Hardness = (V_EDTA × Normality of EDTA × 50 × 1000) / V_WaterSample (ppm)',
        note: 'Eriochrome Black-T (EBT) indicator forms unstable wine-red complex with Ca2+/Mg2+ at pH 10; EDTA displaces EBT to give steel-blue endpoint.',
      },
      {
        title: 'Alkalinity Determination (P & M Endpoint)',
        formula: 'P = (V_p × N × 50 × 1000) / V_sample ; M = (V_m × N × 50 × 1000) / V_sample',
        note: 'Conditions: P=0 => [OH-]=0, [CO3 2-]=0, [HCO3-]=M; P=M => [OH-]=P; P=1/2M => [CO3 2-]=2P; P>1/2M => [OH-]=2P-M, [CO3 2-]=2(M-P); P<1/2M => [CO3 2-]=2P, [HCO3-]=M-2P.',
      },
      {
        title: 'Nernst Equation for Electrode & Cell Potential',
        formula: 'E_cell = E°_cell - (0.0591 / n) log10 ([Products] / [Reactants]) at 298 K (25°C)',
        note: 'Derived from ΔG = ΔG° + RT ln Q and ΔG = -nFE.',
      },
      {
        title: 'Beer-Lambert Law (Colorimetry & UV-Vis)',
        formula: 'Absorbance (A) = log10(I0 / I) = ε · c · l',
        note: 'ε = Molar absorptivity (L mol⁻¹ cm⁻¹), c = Molar concentration, l = Path length of cuvette (cm).',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Water Technology',
        weightage: '20% (14 Marks)',
        summary:
          'Sources, availability, and impurities in water. Types and units of hardness (ppm, mg/L, °Clark, °French), Normality, Molarity, Molality. Water analysis: Hardness determination by EDTA method and Alkalinity determination using Phenolphthalein and Methyl Orange. Boiler troubles (Sludge, Scale, Priming, Foaming, Boiler Corrosion, Caustic Embrittlement). External softening (Lime-Soda, Zeolite, Ion-Exchange resin) and Internal conditioning (Colloidal, Phosphate, Calgon) with numericals.',
        keyFormulas: [
          'Hardness in CaCO3 eq. = (Mass of salt × 50) / Chemical Equivalent Weight of salt',
          '1 ppm = 1 mg/L = 0.07 °Clark = 0.1 °French',
          'Lime Requirement = 74/100 × [Temp Ca2+ + 2×Temp Mg2+ + Perm Mg2+ + CO2 + H+ + HCO3- - NaAlO2] × Volume',
          'Soda Requirement = 106/100 × [Perm Ca2+ + Perm Mg2+ + Fe2+ + Al3+ + H+ - HCO3-] × Volume',
        ],
        keyConcepts: [
          {
            heading: 'Hardness of Water & Complexometric EDTA Method',
            description:
              'Hardness is the soap-consuming capacity of water due to dissolved bicarbonates, chlorides, and sulphates of Ca2+ and Mg2+. Temporary (Carbonate) hardness is due to Ca(HCO3)2 and Mg(HCO3)2 and is removed by boiling. Permanent (Non-Carbonate) hardness is due to CaCl2, MgCl2, CaSO4, MgSO4.',
            bulletPoints: [
              'EDTA Method Principle: At pH 9–10 (maintained by NH4OH + NH4Cl buffer), Eriochrome Black-T (EBT) forms an unstable wine-red complex with Ca2+/Mg2+ ions.',
              'On titrating with disodium salt of EDTA, colourless stable [Ca-EDTA] / [Mg-EDTA] complexes are formed and free EBT is released, turning the solution steel-blue at the endpoint.',
              'Permanent hardness is found by boiling a known volume of water, filtering off precipitated CaCO3/Mg(OH)2, and titrating the filtrate against standard EDTA.',
            ],
          },
          {
            heading: 'Alkalinity Determination (Double Indicator Titration)',
            description:
              'Alkalinity of water is due to OH-, CO3^2-, and HCO3- ions (OH- and HCO3- cannot exist together as OH- + HCO3- -> CO3^2- + H2O). Titrating water with standard HCl using Phenolphthalein (endpoint pH ~8.3, P) and Methyl Orange (endpoint pH ~4.5, M):',
            bulletPoints: [
              'At Phenolphthalein endpoint (P): Complete neutralization of OH- and half neutralization of CO3^2- to HCO3- occurs (P = [OH-] + 1/2[CO3^2-]).',
              'At Methyl Orange endpoint (M): Complete neutralization of all alkaline species occurs (M = [OH-] + [CO3^2-] + [HCO3-]).',
              'Five standard cases (P=0; P=M; P=1/2 M; P > 1/2 M; P < 1/2 M) determine exact ppm concentrations of OH-, CO3^2-, and HCO3-.',
            ],
          },
          {
            heading: 'Boiler Troubles & Internal Conditioning',
            description:
              'Using hard water directly in steam boilers leads to four major defects: Sludge & Scale formation, Priming & Foaming, Boiler Corrosion, and Caustic Embrittlement.',
            bulletPoints: [
              'Sludge vs Scale: Sludge is soft, loose, non-adherent precipitate (MgCO3, MgCl2, CaCl2) formed at cooler parts and removed by blow-down. Scale is hard, adherent crust (CaSO4, CaCO3, Mg(OH)2, CaSiO3) causing fuel wastage and boiler explosion.',
              'Caustic Embrittlement: Intercrystalline cracking of boiler metal caused by high concentration of NaOH (formed from residual Na2CO3 -> 2NaOH + CO2) seeping into hairline cracks by capillary action and dissolving iron as sodium ferroate (Na2FeO2). Prevented by adding Sodium Sulphate (Na2SO4), Tannin, or Lignin.',
              'Internal Treatment: Calgon Conditioning uses Sodium Hexametaphosphate Na2[Na4(PO3)6] which reacts with CaSO4 to form soluble complex Na2[Ca2(PO3)6], preventing scale.',
            ],
          },
          {
            heading: 'External Water Softening: Zeolite & Ion-Exchange Processes',
            description:
              'Zeolite (Permutit) is hydrated sodium alumino-silicate (Na2O·Al2O3·xSiO2·yH2O, written as Na2Ze). Ion-Exchange Demineralization uses styrene-divinylbenzene cross-linked polymeric resins.',
            bulletPoints: [
              'Zeolite Softening: Na2Ze + Ca2+ -> CaZe + 2Na+. Regenerated using 10% brine (NaCl) solution: CaZe + 2NaCl -> Na2Ze + CaCl2. Removes hardness down to 10-15 ppm, but leaves sodium salts.',
              'Ion-Exchange Process: Cation exchange resin (R-H+) exchanges Ca2+, Mg2+, Na+ for H+ ions; Anion exchange resin (R\'-OH-) exchanges Cl-, SO4^2- for OH- ions. H+ and OH- combine to form pure demineralized water (< 2 ppm hardness).',
              'Regeneration: Exhausted cation bed is regenerated with dilute HCl/H2SO4; exhausted anion bed is regenerated with dilute NaOH.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Stoichiometric equations for EDTA complexation and Alkalinity 5-case table.',
          'Lime-Soda chemical balance reactions and softening capacity formulas.',
        ],
        frequentExamQuestions: [
          {
            question: 'Explain the EDTA method for determining temporary, permanent, and total hardness of water with chemical reactions.',
            marks: 7,
            answerSummary:
              'Write structure of EDTA, buffer action at pH=10, wine-red [M-EBT] complex formation, displacement by EDTA to give colourless [M-EDTA] and steel-blue free EBT, and step-by-step calculation formulas.',
          },
          {
            question: 'Describe the Ion-Exchange resin method and Zeolite process for water softening with neat diagrams and regeneration equations.',
            marks: 7,
            answerSummary:
              'Draw Cation & Anion exchange columns with degasifier, write ion-exchange & regeneration reactions, and compare with Zeolite and Lime-Soda methods.',
          },
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Electrochemistry & Energy Storage Systems',
        weightage: '20% (14 Marks)',
        summary:
          'Electrochemistry fundamentals: EMF of cell, Single electrode potential, thermodynamic derivation of Nernst Equation, and numerical problems on E, E°, and E_cell. Energy Storage Systems: Classification of batteries (Primary, Secondary, Reserve). Construction, working, charging/discharging reactions, and EV applications of Lithium-ion batteries. Direct cycling recycling of Li-ion batteries, Na-ion batteries, Graphene batteries, disposal and second-life battery applications.',
        keyFormulas: [
          'ΔG = -n · F · E_cell  and  ΔG° = -n · F · E°_cell',
          'Nernst Equation (Single Electrode M^n+ / M): E = E° - (2.303 RT / nF) log10 (1 / [M^n+])',
          'At T = 298 K (25°C): E_cell = E°_cell - (0.0591 / n) log10 ([Anode Ion] / [Cathode Ion])',
          'Equilibrium Constant: log10 K_c = (n · E°_cell) / 0.0591',
        ],
        keyConcepts: [
          {
            heading: 'Single Electrode Potential & Derivation of Nernst Equation',
            description:
              'When a metal rod is dipped in its own salt solution, an electrical double layer (Helmholtz double layer) develops due to the tendency of metal to undergo oxidation (de-electronation) or reduction (electronation), creating a Single Electrode Potential (E).',
            bulletPoints: [
              'Thermodynamic Derivation: For a reversible redox reaction aA + bB ⇌ cC + dD, the van’t Hoff reaction isotherm gives ΔG = ΔG° + RT ln(([C]^c [D]^d) / ([A]^a [B]^b)).',
              'Substituting electrical work ΔG = -nFE and ΔG° = -nFE° (where n = number of electrons transferred, F = 96,500 C/mol): -nFE = -nFE° + RT ln Q.',
              'Dividing by -nF and converting natural log to base 10: E = E° - (2.303 RT / nF) log10 Q. At 298 K, 2.303 RT / F = 0.0591 V.',
            ],
          },
          {
            heading: 'Classification of Batteries (Primary, Secondary & Reserve)',
            description:
              'A battery is an electrochemical device consisting of two or more galvanic cells connected in series/parallel that converts chemical energy directly into DC electrical energy.',
            bulletPoints: [
              'Primary Batteries (Non-rechargeable): Cell reaction is irreversible; discarded after complete discharge. Examples: Dry cell (Leclanché cell), Alkaline battery, Zinc-Mercuric oxide cell.',
              'Secondary Batteries (Rechargeable / Storage accumulators): Cell reaction can be reversed by passing external DC current in opposite direction. Examples: Lead-acid battery, Nickel-Cadmium (Ni-Cd), Lithium-ion (Li-ion) battery.',
              'Reserve Batteries: One key component (usually the electrolyte) is kept isolated from the electrodes until activation just prior to use, preventing self-discharge during long storage (used in missiles, torpedoes, emergency beacons; e.g., Mg-AgCl sea-water activated battery).',
            ],
          },
          {
            heading: 'Lithium-Ion Battery: Construction, Working & EV Applications',
            description:
              'Li-ion batteries operate on the principle of "Intercalation and De-intercalation" of Li+ ions between layered cathode and anode hosts without metallic lithium plating.',
            bulletPoints: [
              'Components: Anode = Lithiated Graphite (LiC6); Cathode = Lithium Metal Oxide (LiCoO2, LiFePO4, or NMC); Electrolyte = LiPF6 dissolved in non-aqueous organic carbonate solvents (ethylene carbonate / dimethyl carbonate); Separator = Microporous polyethylene/polypropylene membrane.',
              'Discharging Reactions: At Anode: Li_xC6 -> xLi+ + xe- + 6C. At Cathode: Li_(1-x)CoO2 + xLi+ + xe- -> LiCoO2. Overall EMF = 3.6 V to 3.7 V.',
              'Advantages for Electric Vehicles (EVs): Highest energy density (150–250 Wh/kg), light weight (Li is lightest metal), high open-circuit voltage (~3.7V vs 2V for Lead-acid), no memory effect, and low self-discharge (<5% per month).',
            ],
          },
          {
            heading: 'Battery Recycling (Direct Cycling), Na-Ion & Graphene Batteries',
            description:
              'Sustainable battery lifecycle management involves direct cathode regeneration, second-life stationary storage, and next-generation post-lithium chemistries.',
            bulletPoints: [
              'Direct Cycling Recycling Method: Recovers active cathode material (LiCoO2 / NMC) directly from spent Li-ion batteries by physical separation, relithiation (restoring lost Li+ hydrothermally or thermally), and annealing without breaking down the crystal lattice using harsh acids (unlike pyrometallurgy/hydrometallurgy).',
              'Sodium-Ion (Na-ion) Battery: Uses abundant sodium salts and hard carbon anode; lower cost and safer thermal profile for grid energy storage.',
              'Graphene Battery: Incorporates graphene sheets in electrodes to achieve ultra-fast charging, high electrical conductivity, high surface area, and extended cycle life.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Thermodynamic derivation of Nernst Equation from Gibbs Free Energy isotherm.',
          'Intercalation-deintercalation stoichiometry of LiCoO2 / Graphite Li-ion cell.',
        ],
        frequentExamQuestions: [
          {
            question: 'Derive the Nernst equation for single electrode potential and cell EMF. Calculate the EMF of the cell Zn | Zn2+(0.01M) || Cu2+(0.1M) | Cu given E°_cell = 1.10 V.',
            marks: 7,
            answerSummary:
              'Derive E = E° - (0.0591/n) log([Zn2+]/[Cu2+]). Substitute n=2, [Zn2+]=0.01, [Cu2+]=0.1: E = 1.10 - (0.0591/2) log(0.1) = 1.10 + 0.02955 = 1.1295 V.',
          },
          {
            question: 'Explain the construction, charging-discharging reactions, and EV advantages of Lithium-Ion batteries. Write a note on recycling of Li-ion batteries by Direct Cycling.',
            marks: 7,
            answerSummary:
              'Draw layered LiCoO2 and Graphite intercalation diagram, write anode/cathode reversible reactions, list EV advantages, and explain Direct Cycling relithiation.',
          },
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Corrosion & Methods of Prevention',
        weightage: '20% (14 Marks)',
        summary:
          'Introduction to corrosion, economic and safety disadvantages, and classification of corrosion. Theories of corrosion: Dry (Chemical) corrosion and Wet (Electrochemical) corrosion (Hydrogen evolution & Oxygen absorption mechanisms). Types: Galvanic, Pitting, Crevice, Waterline, Intergranular, and Stress corrosion. Factors influencing corrosion rate (nature of metal & environment). Prevention methods: Material selection, Alloying, Surface coatings, Electroplating, Galvanization vs Tinning, Anodizing, and Cathodic Protection (Sacrificial Anode & Impressed Current).',
        keyFormulas: [
          'Pilling-Bedworth Ratio (PBR) = (Volume of Metal Oxide formed) / (Volume of Metal consumed) = (M_oxide × d_metal) / (n × A_metal × d_oxide)',
          'Anodic Oxidation (Dissolution): M -> M^n+ + n e-',
          'Cathodic H2 Evolution (Acidic medium): 2H+ + 2e- -> H2↑',
          'Cathodic O2 Absorption (Neutral/Alkaline medium): 1/2 O2 + H2O + 2e- -> 2OH-',
        ],
        keyConcepts: [
          {
            heading: 'Dry (Chemical) Corrosion & Pilling-Bedworth Rule',
            description:
              'Dry corrosion occurs through direct chemical attack of atmospheric gases (O2, SO2, Cl2, H2S) on metal surfaces in the absence of moisture. Oxidation corrosion forms a metal oxide scale (2M + n/2 O2 -> M2On).',
            bulletPoints: [
              'Protective vs Non-Protective Oxide Film (Pilling-Bedworth Rule): If volume of oxide >= volume of parent metal (PBR between 1 and 2, e.g., Al, Cr, Cu, Ni), the oxide layer is non-porous, tightly adhering, and prevents further corrosion.',
              'If volume of oxide < volume of metal (PBR < 1, e.g., alkali & alkaline earth metals Li, Na, K, Mg), the film is porous, cracked, and corrosion continues rapidly.',
              'Volatile Oxide (MoO3) and Liquid Metal corrosion are other forms of dry corrosion.',
            ],
          },
          {
            heading: 'Wet (Electrochemical) Theory of Corrosion',
            description:
              'Occurs when a conducting liquid is in contact with a metal or when two dissimilar metals are immersed or partially dipped in a solution, forming distinct anodic and cathodic areas.',
            bulletPoints: [
              'Anodic Reaction: Oxidation always occurs at the anode where metal dissolves into ions: Fe -> Fe2+ + 2e-.',
              'Cathodic Reaction (Hydrogen Evolution Type): Occurs in acidic environments (no oxygen) with large cathodic area and small anodic area: 2H+ + 2e- -> H2↑.',
              'Cathodic Reaction (Oxygen Absorption Type): Occurs in neutral or slightly alkaline aqueous solution in presence of dissolved oxygen. 1/2 O2 + H2O + 2e- -> 2OH-. Fe2+ and OH- combine to form Fe(OH)2, which oxidizes to yellow-brown rust Fe2O3·xH2O.',
              'Differential Aeration (Concentration Cell) Corrosion: Less oxygenated part becomes ANODE (corrodes) and more oxygenated part becomes CATHODE (protected)—explains Pitting, Crevice, and Waterline corrosion.',
            ],
          },
          {
            heading: 'Metallic Coatings: Galvanization vs Tinning & Anodizing',
            description:
              'Surface coatings isolate the base metal from the corrosive environment using anodic (sacrificial) or cathodic (noble) metal coatings.',
            bulletPoints: [
              'Galvanization (Anodic Coating): Coating iron/steel with a layer of Zinc by dipping pickled steel in molten Zn at 450°C. Since Zn is more electropositive (anodic) than Fe, even if the Zn coating is scratched, Zn corrodes sacrificially and protects the exposed Fe.',
              'Tinning (Cathodic Coating): Coating iron/steel with Tin (Sn) by dipping in molten tin via palm oil flux. Since Sn is more noble (cathodic) than Fe, if a pinhole or scratch occurs, an intense small-anode/large-cathode cell forms and the underlying iron rusts rapidly. Tin is non-toxic and used for food containers.',
              'Anodizing: Electrolytic oxidation process producing a thick, durable protective oxide film (Al2O3) on non-ferrous metals like Aluminium in chromic/sulphuric acid bath.',
            ],
          },
          {
            heading: 'Cathodic Protection: Sacrificial Anode & Impressed Current',
            description:
              'Cathodic protection forces the entire metallic structure to be protected to behave as a CATHODE, completely eliminating anodic dissolution.',
            bulletPoints: [
              'Sacrificial Anode (Galvanic) Method: The metallic structure (underground pipeline, ship hull, boiler) is connected by a wire to a more active anodic metal block such as Magnesium (Mg), Zinc (Zn), or Aluminium (Al). The active metal corrodes sacrificially while the parent structure remains completely protected.',
              'Impressed Current Cathodic Protection (ICCP): An external DC power source is connected with its negative terminal to the structure to be protected (making it cathode) and positive terminal to an insoluble anode (graphite, platinized titanium, high-silicon iron) buried in backfill.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Electrochemical mechanism of Rusting of Iron (Hydrogen evolution & Oxygen absorption reactions).',
          'Pilling-Bedworth specific volume ratio criterion.',
        ],
        frequentExamQuestions: [
          {
            question: 'Explain the electrochemical (wet) theory of corrosion with Hydrogen evolution and Oxygen absorption mechanisms.',
            marks: 7,
            answerSummary:
              'Draw electrochemical corrosion cell, write anodic oxidation (Fe -> Fe2+ + 2e-), cathodic reactions in acidic and neutral media, and rust formation equations.',
          },
          {
            question: 'How is corrosion prevented by (i) Sacrificial Anode Cathodic Protection, and (ii) Galvanization vs Tinning?',
            marks: 7,
            answerSummary:
              'Include diagram of buried pipeline connected to Mg sacrificial anode, and compare anodic Zn coating (galvanizing) vs cathodic Sn coating (tinning) when scratched.',
          },
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Engineering Materials (Polymers & Nanomaterials)',
        weightage: '20% (14 Marks)',
        summary:
          'Polymers: Nomenclature, classification, and functionality. Advanced Electroactive Polymers: Conducting polymers, Liquid-Crystal Polymers (LCP), Photoactive polymers, Photovoltaic materials (Solar cells and Dye-Sensitized Solar Cells - DSSC). Synthesis, doping, properties, and technological applications of Polyaniline (PANi), Polypyrrole (PPy), and Polythiophene (PTh). Nanomaterials: Synthesis (Top-down & Bottom-up), characterization, and electronics applications of Fullerene (C60), Graphene, Carbon Nanotubes (CNTs), and Quantum Dots. Introduction to Optical Fibres.',
        keyFormulas: [
          'Degree of Polymerization (DP) = Molecular Weight of Polymer (M_n) / Molecular Weight of Repeating Monomer Unit (M_0)',
          'Number-Average Molecular Weight: M_n = Σ(N_i M_i) / Σ N_i',
          'Weight-Average Molecular Weight: M_w = Σ(N_i M_i²) / Σ(N_i M_i) ; Polydispersity Index (PDI) = M_w / M_n',
        ],
        keyConcepts: [
          {
            heading: 'Conducting Polymers: PANi, Polypyrrole (PPy) & Polythiophene (PTh)',
            description:
              'Organic polymers with conjugated π-electron backbones (alternating single and double bonds) that exhibit metallic/semiconductor electrical conductivity upon oxidative (p-type) or reductive (n-type) doping.',
            bulletPoints: [
              'Polyaniline (PANi): Synthesized by oxidative polymerization of aniline monomer in acidic medium (1M HCl) using Ammonium Persulphate ((NH4)2S2O8) as oxidant at 0–5°C. Exists in Leucoemeraldine (fully reduced), Emeraldine base, and conductive Emeraldine salt (green) forms.',
              'Polypyrrole (PPy) & Polythiophene (PTh): Synthesized via chemical or electrochemical oxidative polymerization of pyrrole/thiophene monomers using FeCl3. They possess high environmental stability, tunable bandgaps, and biocompatibility.',
              'Applications: Rechargeable lightweight batteries, flexible OLED displays, chemical/biosensors, anti-static coatings, and electromagnetic shielding.',
            ],
          },
          {
            heading: 'Liquid-Crystal Polymers (LCP), Photoactive Polymers & DSSC Solar Cells',
            description:
              'Specialty functional polymers combining macromolecular mechanics with electro-optical responsiveness.',
            bulletPoints: [
              'Liquid-Crystal Polymers (LCP): Maintain mesogenic molecular order in melt (Thermotropic LCP, e.g., Vectra) or solution (Lyotropic LCP, e.g., Kevlar aramid fiber). Exhibit ultra-high tensile strength, thermal resistance, and low coefficient of thermal expansion.',
              'Dye-Sensitized Solar Cells (DSSC - Grätzel Cell): Third-generation photovoltaic cell comprising a photoanode (mesoporous TiO2 coated with ruthenium/organic photosensitizer dye on FTO glass), I-/I3- redox electrolyte, and platinum counter-electrode.',
              'DSSC Working: Sunlight excites dye (S -> S*), which injects electrons into the conduction band of TiO2; oxidized dye S+ is regenerated by iodide (I-) in the electrolyte.',
            ],
          },
          {
            heading: 'Nanomaterials: Fullerene, Graphene, CNTs & Quantum Dots',
            description:
              'Nanomaterials have at least one dimension in the 1–100 nm range, exhibiting high surface-to-volume ratio and quantum confinement effects. Synthesized via Top-Down (Ball milling, Lithography) or Bottom-Up (Sol-Gel, CVD, Laser ablation) routes.',
            bulletPoints: [
              'Fullerene (C60 - Buckminsterfullerene): Zero-dimensional (0D) cage-like truncated icosahedron of 60 sp² carbons with 20 hexagons and 12 pentagons; used in superconductors and targeted drug delivery.',
              'Graphene & Carbon Nanotubes (CNTs): Graphene is a 2D single-atom-thick hexagonal honeycomb sheet of sp² carbon. CNTs (1D) are rolled-up graphene sheets (Single-Walled SWCNT & Multi-Walled MWCNT) with armchair, zigzag, or chiral geometry; possess ~100× steel tensile strength and ballistic electron transport.',
              'Quantum Dots (QDs): 0D semiconductor nanocrystals (CdSe, InP) whose emission wavelength depends directly on particle radius due to quantum confinement; used in QLED displays and bio-imaging.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Oxidative polymerization mechanism and protonic acid doping of Polyaniline (PANi).',
          'Electron transfer cycle in a Dye-Sensitized Solar Cell (DSSC).',
        ],
        frequentExamQuestions: [
          {
            question: 'Explain the synthesis, doping mechanism, properties, and engineering applications of Polyaniline (PANi), Polypyrrole (PPy), and Polythiophene (PTh).',
            marks: 7,
            answerSummary:
              'Write chemical structures of Aniline -> Emeraldine salt, Pyrrole -> PPy, and Thiophene -> PTh, explain p-doping/n-doping soliton/polaron formation, and list applications.',
          },
          {
            question: 'Write short notes on: (i) Carbon Nanotubes (CNTs) and Graphene, (ii) Dye-Sensitized Solar Cells (DSSC), and (iii) Liquid-Crystal Polymers.',
            marks: 7,
            answerSummary:
              'Detail SWCNT/MWCNT structures & CVD synthesis, draw DSSC TiO2-dye-electrolyte schematic, and explain Thermotropic vs Lyotropic LCPs.',
          },
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Instrumental Methods of Analysis',
        weightage: '20% (14 Marks)',
        summary:
          'Importance and classification of Instrumental methods (Spectroscopic, Electroanalytical, and Chromatographic). Principle, instrumentation block diagrams, working, and applications of: Colorimetry (Beer-Lambert Law), Infrared (IR) Spectroscopy (molecular vibrations & functional group identification), Conductometry (conductometric acid-base & precipitation titrations), pH-Metry (glass electrode potential), Chromatography, and Gas Chromatography (GC).',
        keyFormulas: [
          'Beer-Lambert Law: A = -log10(T) = log10(I0 / I) = ε · c · l',
          'Hooke’s Law for IR Vibrational Frequency: ν̄ (cm⁻¹) = (1 / 2πc) √(k / μ), where μ = (m1·m2)/(m1+m2)',
          'Degrees of Vibrational Freedom: Linear molecule = 3N - 5 ; Non-linear molecule = 3N - 6',
          'Retention Factor (Chromatography): R_f = (Distance travelled by solute) / (Distance travelled by solvent front)',
        ],
        keyConcepts: [
          {
            heading: 'Colorimetry & Beer-Lambert Law',
            description:
              'Colorimetry measures the concentration of coloured compounds in solution by measuring the absorbance of monochromatic visible light (400–800 nm).',
            bulletPoints: [
              'Beer-Lambert Law: When a beam of monochromatic radiation passes through a homogeneous absorbing solution, the absorbance (A) is directly proportional to molar concentration (c) and path length (l): A = εcl.',
              'Instrumentation: Light source (Tungsten lamp) -> Slit -> Condenser lens -> Wavelength Filter -> Cuvette (Sample cell) -> Photocells/Photodetector -> Galvanometer/Digital readout.',
              'Application: Quantitative estimation of iron (Fe3+ with KSCN), copper, and trace heavy metals in industrial effluents; calibration curve of A vs c gives unknown concentration.',
            ],
          },
          {
            heading: 'Infrared (IR) Spectroscopy',
            description:
              'IR Spectroscopy deals with the interaction of infrared radiation (4000–400 cm⁻¹) with matter, causing transitions between quantized vibrational and rotational energy levels of a molecule. A molecule is IR-active only if its vibration causes a net change in dipole moment.',
            bulletPoints: [
              'Types of Molecular Vibrations: (1) Stretching vibrations (Symmetric & Asymmetric stretching—change in bond length), (2) Bending/Deformation vibrations (Scissoring, Rocking, Wagging, Twisting—change in bond angle).',
              'Spectral Regions: Functional Group Region (4000–1500 cm⁻¹, e.g., O-H ~3300 cm⁻¹, C=O ~1715 cm⁻¹) and Fingerprint Region (1500–400 cm⁻¹, unique to every molecule).',
              'Instrumentation: IR Source (Nernst glower or Globar rod) -> Sample & Reference cells -> Monochromator ( NaCl/KBr prism or grating) -> Thermal/Pyroelectric Detector -> Recorder.',
            ],
          },
          {
            heading: 'Conductometry & pH-Metry (Electroanalytical Methods)',
            description:
              'Conductometry measures electrolytic conductance (G = 1/R) to determine titration endpoints based on differences in ionic mobilities (H+ and OH- have highest ionic mobilities). pH-Metry uses a combined Glass and Calomel reference electrode.',
            bulletPoints: [
              'Strong Acid vs Strong Base (HCl + NaOH): Conductance initially falls sharply as fast-moving H+ ions are replaced by slow Na+ ions, reaches a minimum at the equivalence point, and rises sharply due to excess OH- ions (V-shaped curve).',
              'Weak Acid vs Strong Base (CH3COOH + NaOH): Conductance is initially low, rises gradually as salt CH3COONa forms, and then rises steeply after equivalence point due to excess OH- ions.',
              'pH-Metry: Uses a Glass Electrode (E_G = E°_G - 0.0591 pH) coupled with a Saturated Calomel Electrode (SCE). Plotting ΔpH/ΔV vs Volume of titrant gives a sharp peak at the equivalence point.',
            ],
          },
          {
            heading: 'Chromatography & Gas Chromatography (GC)',
            description:
              'Chromatography separates mixture components based on differential partitioning between a Mobile Phase and a Stationary Phase.',
            bulletPoints: [
              'Gas Chromatography (GC) Principle: Volatile, thermally stable sample components are partitioned between an inert carrier gas mobile phase (He, N2, Ar) and a liquid/solid stationary phase coated inside a long coiled capillary or packed column.',
              'GC Instrumentation: Carrier gas cylinder -> Flow controller -> Heated Sample Injection Port -> Thermostatted Column Oven -> Detector (Thermal Conductivity Detector TCD or Flame Ionization Detector FID) -> Chromatogram Recorder.',
              'Chromatogram Output: Retention time (t_R) identifies the compound qualitatively, while Peak Area determines its quantitative concentration.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Derivation of Beer-Lambert Law: -dI/I = k·c·dx => log10(I0/I) = ε·c·l.',
          'Conductometric titration graphs for SA-SB, WA-SB, SA-WB, and WA-WB.',
        ],
        frequentExamQuestions: [
          {
            question: 'State and derive Beer-Lambert Law. Explain the principle, instrumentation block diagram, and applications of a Colorimeter.',
            marks: 7,
            answerSummary:
              'Derive A = εcl, draw block diagram (Lamp -> Filter -> Cuvette -> Photocell -> Readout), and mention limitations of Beer-Lambert law.',
          },
          {
            question: 'Explain the principle, instrumentation, and working of Gas Chromatography (GC) and IR Spectroscopy with neat labelled diagrams.',
            marks: 7,
            answerSummary:
              'Draw GC schematic (Carrier gas, Injector, Column oven, FID/TCD detector) and IR stretching/bending modes (symmetric, asymmetric, scissoring, wagging, rocking, twisting).',
          },
        ],
      },
    ],
  },

  // 2. COMMUNICATION AND REPORT WRITING (HUB102)
  'sub-eng-comm': {
    subjectId: 'sub-eng-comm',
    subjectCode: 'HUB102',
    subjectName: 'Communication and Report Writing',
    shortDescription:
      'Significance & process of communication, employability traits & job interviews, leadership & time management soft skills, technical report writing, and applied grammar.',
    textbook: 'A Practical English Grammar by Thomson & Martinet / Business Correspondence & Report Writing by R.C. Sharma',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: 'Communication Process Cycle',
        formula: 'Sender (Ideation) -> Encoding -> Channel/Medium -> Receiver -> Decoding -> Feedback (Context & Noise)',
        note: 'Two-way cyclical process; communication is complete only when receiver provides desired feedback.',
      },
      {
        title: 'The 7 Cs of Effective Communication',
        formula: 'Clarity + Conciseness + Completeness + Correctness + Concreteness + Courtesy + Consideration',
        note: 'Essential checklist for all formal business letters, emails, and technical reports.',
      },
      {
        title: 'Non-Verbal Communication (KOPPACT)',
        formula: 'Kinesics (Body movement) + Oculesics (Eye contact) + Proxemics (Space) + Paralinguistics (Voice tone) + Chronemics (Time) + Haptics (Touch)',
        note: 'According to Mehrabian’s rule, body language and tone account for the majority of interpersonal impact in interviews.',
      },
      {
        title: 'Direct to Indirect Narration Shift',
        formula: 'Present Simple -> Past Simple | Present Continuous -> Past Continuous | Present Perfect -> Past Perfect | Will/Can -> Would/Could',
        note: 'Pronouns change as per SON Rule: 1st Person -> Subject, 2nd Person -> Object, 3rd Person -> No change.',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Significance of Communication',
        weightage: '20% (14 Marks)',
        summary:
          'Process of communication, importance of effective communication in business and engineering organizations. Verbal and Non-Verbal communication, Oral and Written communication (merits & demerits), Channels of communication (Formal: Downward, Upward, Horizontal, Diagonal; Informal: Grapevine), and Barriers to communication with remedies.',
        keyFormulas: [
          'Communication Cycle: Sender -> Encoding -> Message -> Channel -> Receiver -> Decoding -> Feedback',
          'Formal Networks: Downward, Upward, Horizontal (Lateral), Diagonal (Cross-functional)',
        ],
        keyConcepts: [
          {
            heading: 'Process & Significance of Business Communication',
            description:
              'Communication (derived from Latin "communis" meaning to share) is the dynamic, two-way process of exchanging information, ideas, and technical data to achieve shared understanding.',
            bulletPoints: [
              'Steps in the Communication Process: (1) Ideation by Sender, (2) Encoding into words/symbols, (3) Transmission via Channel, (4) Reception by Receiver, (5) Decoding/Interpretation, and (6) Feedback.',
              'Importance in Business: Facilitates decision-making, coordinates departments, builds client trust, boosts employee morale, and enables global project execution.',
            ],
          },
          {
            heading: 'Verbal vs Non-Verbal & Oral vs Written Communication',
            description:
              'Verbal communication uses structured language (Oral or Written), whereas Non-Verbal communication conveys meaning through wordless cues.',
            bulletPoints: [
              'Oral vs Written: Oral communication (meetings, calls, presentations) offers immediate feedback and personal warmth; Written communication (reports, memos, contracts) provides permanent legal record, precision, and wide accountability.',
              'Non-Verbal Dimensions: Kinesics (facial expressions, posture, gestures), Proxemics (intimate, personal, social, and public space zones), Paralinguistics (pitch, pace, volume, intonation), Chronemics (punctuality), and Oculesics (eye contact).',
            ],
          },
          {
            heading: 'Barriers to Communication & Overcoming Strategies',
            description:
              'Any noise or distortion that obstructs the smooth flow or accurate interpretation of a message is a barrier to communication.',
            bulletPoints: [
              'Semantic & Linguistic Barriers: Unclear jargon, bypassed instructions, homophones, poor translation, and denotative/connotative ambiguity.',
              'Psychological & Interpersonal Barriers: Premature evaluation, closed mind, halo effect, emotional distrust, fear of authority, and poor listening retention.',
              'Physical & Organizational Barriers: Environmental noise, faulty medium, information overload, rigid hierarchical levels, and lack of feedback channels.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Shannon-Weaver Model of Communication with Noise & Feedback loop.',
          'Comparison matrix of Oral vs Written Communication.',
        ],
        frequentExamQuestions: [
          {
            question: 'Explain the process of communication with a neat block diagram. Why is feedback considered the most critical element?',
            marks: 7,
            answerSummary:
              'Draw the 6-stage cyclical diagram (Sender -> Encoding -> Channel -> Decoding -> Receiver -> Feedback with Noise) and explain how feedback verifies shared meaning.',
          },
          {
            question: 'Discuss the various barriers to effective communication and suggest practical measures to overcome them in an organization.',
            marks: 7,
            answerSummary:
              'Categorize into Semantic, Psychological, Organizational, and Physical barriers with examples and 7 Cs remedies.',
          },
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Employability Traits',
        weightage: '20% (14 Marks)',
        summary:
          'Employability skills definition and core competencies (from Drive module: Employability Traits by appmsrt). Job Interview preparation, Body Language in interviews (posture, handshake, eye contact, attire), Types of Interviews (Screening, Technical, Stress, Behavioral STAR, Panel, Telephonic), Interview skills, and Group Discussion (GD) dynamics.',
        keyFormulas: [
          'STAR Interview Technique: Situation -> Task -> Action -> Result',
          'GD Evaluation Rubric: Content Knowledge + Communication Clarity + Leadership Initiative + Team Listening',
        ],
        keyConcepts: [
          {
            heading: 'Employability Skills & Job Readiness',
            description:
              'As defined in the course module, Employability Skills are the transferable foundational skills, knowledge, and attitudes needed by an individual to make them employable and work effectively in global teams.',
            bulletPoints: [
              'Core Employability Pillars: Technical competence, problem-solving attitude, adaptability, teamwork, communication fluency, digital literacy, and work ethics.',
              'Difference between Academic Degree and Employability: A degree certifies domain knowledge, whereas employability demonstrates how effectively you apply those assets to solve real employer problems.',
            ],
          },
          {
            heading: 'Job Interviews: Types & Body Language',
            description:
              'A job interview is a formal, structured conversation designed to assess a candidate’s technical suitability, cultural fit, and personality under pressure.',
            bulletPoints: [
              'Types of Interviews: (1) Screening/Telephonic Interview, (2) Technical Interview, (3) Behavioral/Competency Interview (STAR method), (4) Stress Interview (tests emotional composure), (5) Panel/Board Interview, (6) Walk-in & Video Interview.',
              'Positive Body Language in Interviews: Firm handshake, upright sitting posture leaning slightly forward, steady eye contact (60-70% of the time), calm hand gestures, professional grooming, and active nodding.',
              'Negative Body Language to Avoid: Crossing arms (defensive), slouching, fidgeting with pen/hair, avoiding eye contact, and interrupting the interviewer.',
            ],
          },
          {
            heading: 'Group Discussion (GD) Strategies & Etiquette',
            description:
              'Group Discussion evaluates a candidate’s ability to articulate viewpoints, listen to diverse perspectives, build consensus, and lead a team discussion without aggression.',
            bulletPoints: [
              'Effective GD Roles: Initiator (defines topic & sets structure), Data Contributor, Moderator (bridges conflicting views), and Summarizer (concludes objectively).',
              'GD Do’s & Don’ts: Back arguments with facts/statistics, address the whole group (not just one person), allow quieter members to speak, and never turn a GD into a hostile two-person debate.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Pre-Interview, During-Interview, and Post-Interview checklist.',
          'Body Language Dos and Don’ts matrix for campus placements.',
        ],
        frequentExamQuestions: [
          {
            question: 'What are Employability Skills? Explain the different types of job interviews and the role of positive body language during an interview.',
            marks: 7,
            answerSummary:
              'Define transferable employability skills, detail Technical, Stress, Behavioral, and Panel interviews, and explain Kinesics, Eye Contact, and Posture.',
          },
          {
            question: 'What is a Group Discussion (GD)? Explain the key traits evaluated in a GD and strategies to succeed in it.',
            marks: 7,
            answerSummary:
              'Explain content, analytical clarity, leadership, and active listening, along with Initiator and Summarizer techniques.',
          },
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Soft Skills',
        weightage: '20% (14 Marks)',
        summary:
          'Soft Skills for Engineers: Goal Setting (SMART framework, short-term vs long-term goals), Qualities of a Good Leader and Leadership styles, Time Management (Eisenhower Urgent-Important Matrix, Pareto 80/20 rule), Identifying & eliminating Time Wasters, and Structured Problem Solving & Decision Making.',
        keyFormulas: [
          'SMART Goals: Specific + Measurable + Achievable + Relevant + Time-Bound',
          'Eisenhower Matrix: Q1 (Urgent & Important: Do Now) | Q2 (Important, Not Urgent: Plan/Deep Work) | Q3 (Urgent, Not Important: Delegate) | Q4 (Neither: Eliminate)',
        ],
        keyConcepts: [
          {
            heading: 'Goal Setting & Leadership Qualities',
            description:
              'Goal setting provides direction, measurable milestones, and intrinsic motivation. Leadership is the art of inspiring and guiding a team toward a shared vision.',
            bulletPoints: [
              'SMART Goal Framework: Every academic or career goal must be Specific, Measurable, Achievable, Relevant, and Time-bound.',
              'Qualities of a Good Leader: Integrity, empathy, emotional intelligence (EQ), decisive judgment, accountability, clear communication, and ability to empower team members.',
              'Leadership Styles: Autocratic (directive), Democratic/Participative (collaborative—best for engineering teams), Laissez-Faire (delegative), and Transformational.',
            ],
          },
          {
            heading: 'Time Management, Time Wasters & Problem Solving',
            description:
              'Time management is self-management: allocating finite hours to high-impact priorities while eliminating productivity leaks.',
            bulletPoints: [
              'Eisenhower Priority Matrix: Focus maximum energy on Quadrant 2 (Important but Not Urgent: skill building, project planning, health) to prevent Quadrant 1 crises.',
              'Common Time Wasters: Procrastination, unscheduled social media scrolling, lack of prioritization, multitasking, inability to say "No", and poorly agenda-driven meetings.',
              '6-Step Problem Solving Process: (1) Define the problem clearly, (2) Analyze root causes (5 Whys / Fishbone diagram), (3) Brainstorm alternative solutions, (4) Evaluate & select best option, (5) Implement plan, (6) Review results.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Eisenhower 4-Quadrant Time Management Matrix.',
          '6-Stage Analytical Problem Solving Cycle.',
        ],
        frequentExamQuestions: [
          {
            question: 'Explain the importance of Time Management for engineering students. What are common Time Wasters and how can they be overcome?',
            marks: 7,
            answerSummary:
              'Draw the Eisenhower Urgent-Important 4-quadrant matrix, explain Pareto 80/20 principle, list internal/external time wasters, and give actionable remedies.',
          },
          {
            question: 'Discuss the essential qualities of a good leader and explain the SMART framework of Goal Setting with examples.',
            marks: 7,
            answerSummary:
              'Detail vision, empathy, integrity, decision-making, and break down Specific, Measurable, Achievable, Relevant, and Time-bound goals.',
          },
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Report Writing',
        weightage: '20% (14 Marks)',
        summary:
          'Report Writing: Definition, significance, and characteristics of a good report (precision, factual accuracy, objectivity, reader-orientation). Types of Reports (Routine vs Special, Informational vs Interpretative/Analytical, Feasibility, Trouble/Accident, Laboratory, and Project Reports). Standard Structure and Layout of a formal report (Front Matter, Main Body, Back Matter). Technical Writing vs General Writing, and Essay Writing.',
        keyFormulas: [
          'Formal Report Structure: Front Matter (Title, Letter of Transmittal, Abstract) -> Main Body (Introduction, Methodology, Findings, Conclusions, Recommendations) -> Back Matter (References, Appendices)',
        ],
        keyConcepts: [
          {
            heading: 'Definition, Importance & Types of Technical Reports',
            description:
              'A technical report is a formal, objective document written for a specific audience to convey factual findings, experimental data, and actionable recommendations after systematic investigation.',
            bulletPoints: [
              'Informational vs Analytical Reports: Informational reports present facts without analysis (e.g., attendance/inventory logs); Analytical (Interpretative) reports analyze data, draw conclusions, and propose recommendations.',
              'Feasibility, Progress & Trouble Reports: Feasibility reports evaluate whether a proposed project is technically and economically viable; Trouble/Laboratory reports investigate equipment failure or experimental outcomes.',
            ],
          },
          {
            heading: 'Standard Structure and Layout of a Formal Report',
            description:
              'A comprehensive engineering or business report follows a three-part modular layout for executive readability:',
            bulletPoints: [
              '1. Preliminary / Front Matter: Cover Page, Title Page, Certificate/Acknowledgements, Letter of Transmittal, Table of Contents, List of Illustrations, and Abstract / Executive Summary.',
              '2. Main Text / Body: Introduction (background, scope, objectives), Methodology / Experimental Procedure, Discussion & Description of Findings (with tables/graphs), Conclusions (logical deductions), and Recommendations (future action items).',
              '3. Supplementary / Back Matter: Bibliography / References (IEEE or APA format), Appendices (raw data, questionnaires), and Glossary/Index.',
            ],
          },
          {
            heading: 'Technical Writing vs General Creative Writing',
            description:
              'Technical writing is objective, denotative, impersonal, and structured with headings and visuals, whereas general/literary writing is subjective, connotative, emotional, and narrative.',
            bulletPoints: [
              'Essay Writing Structure: Introduction (Hook + Thesis Statement), Body Paragraphs (Topic sentence + Supporting evidence + Transition), and Conclusion (Restatement + Final synthesis).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Complete 3-Tier Layout of a Formal Engineering Report.',
          'Comparison table between Technical Writing and Literary Writing.',
        ],
        frequentExamQuestions: [
          {
            question: 'What is a Report? Explain in detail the structure and layout of a formal technical report.',
            marks: 7,
            answerSummary:
              'Define technical report, list characteristics, and detail all elements of Front Matter, Main Body, and Back Matter.',
          },
          {
            question: 'Differentiate between Technical Writing and General Writing. Explain the different types of business and engineering reports.',
            marks: 7,
            answerSummary:
              'Compare on purpose, tone, vocabulary, structure, and audience; classify Oral/Written, Routine/Special, and Informational/Analytical reports.',
          },
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Applied Grammar in Communication',
        weightage: '20% (14 Marks)',
        summary:
          'Applied Grammar for error-free professional communication: Use of Articles (Indefinite "a, an" and Definite "the", Zero article rules), Punctuation marks (Comma, Semicolon, Colon, Apostrophe, Hyphen, Quotation marks), Question Tags (positive-negative polarity & exceptions), Subject-Verb Agreement (Concord rules), Prepositions (time, place, direction), and Direct/Indirect Narration.',
        keyFormulas: [
          'Question Tag Rule: Positive Statement -> Negative Tag (Auxiliary + n’t + Pronoun?) | Negative Statement -> Positive Tag (Auxiliary + Pronoun?)',
          'Subject-Verb Concord: A1 + "as well as / along with / together with" + A2 -> Verb agrees with First Subject (A1)',
          'Either...or / Neither...nor -> Verb agrees with the NEARER subject (Proximity Rule)',
        ],
        keyConcepts: [
          {
            heading: 'Articles, Prepositions & Question Tags',
            description:
              'Precision in determiners, prepositions, and conversational tags prevents ambiguity in technical writing.',
            bulletPoints: [
              'Articles: Use "a" before consonant sounds (e.g., a university, a European, a one-rupee note) and "an" before vowel sounds (e.g., an hour, an M.Tech student, an honest man). Use "the" before unique objects, superlatives, rivers, mountain ranges, and previously mentioned nouns.',
              'Question Tags Exceptions: "I am right, aren’t I?" (not amn’t I); Imperative sentences ("Open the door, will you?"); "Let’s go for a walk, shall we?"; Statements with hardy/scarcely/seldom/little take a POSITIVE tag ("He rarely misses lab, does he?").',
              'Prepositions: "In/At/On" for time and place; "Between" (two entities) vs "Among" (more than two); "Beside" (next to) vs "Besides" (in addition to); "Since" (point of time) vs "For" (period of time).',
            ],
          },
          {
            heading: 'Subject-Verb Agreement (Concord) & Direct-Indirect Narration',
            description:
              'A verb must agree with its true grammatical subject in number and person, not with an intervening prepositional phrase.',
            bulletPoints: [
              'Concord Rules: (1) Collective nouns take singular verb when acting as one unit ("The committee has submitted its report"); (2) "Each, Every, Everyone, Either, Neither, One of the" take a SINGULAR verb ("One of the students is absent"); (3) Distances, periods of time, and sums of money take a singular verb ("Ten kilometers is a long walk").',
              'Direct to Indirect Speech (Narration): When reporting verb is in past tense ("said"), tense of reported speech shifts back (Present -> Past, Past Simple -> Past Perfect). Time/place words shift: now -> then, today -> that day, tomorrow -> the next day, yesterday -> the previous day, here -> there, this -> that.',
              'Interrogative & Imperative Narration: Use "asked/inquired + if/whether" for Yes/No questions (change question word order to assertive S+V); use "ordered/requested/advised + to + V1" for imperatives.',
            ],
          },
        ],
        derivationsOrTheorems: [
          '12 Golden Rules of Subject-Verb Agreement.',
          'Tense & Adverbial Transformation Table for Direct/Indirect Narration.',
        ],
        frequentExamQuestions: [
          {
            question: 'State the key rules of Subject-Verb Agreement (Concord) and Question Tags with two illustrative examples for each rule.',
            marks: 7,
            answerSummary:
              'Cover "as well as", "neither-nor", "each/every", "one of the + plural noun + singular verb", collective nouns, and positive/negative question tag rules.',
          },
          {
            question: 'Explain the rules for converting Direct Speech into Indirect Narration for Assertive, Interrogative, Imperative, and Exclamatory sentences.',
            marks: 7,
            answerSummary:
              'Provide tense backshift chart, pronoun SON rule, time/place word changes, and solved sentence conversions.',
          },
        ],
      },
    ],
  },

  // 3. INTRODUCTION TO COMPUTER SCIENCE AND ENGINEERING (CSA101)
  'sub-basic-cs': {
    subjectId: 'sub-basic-cs',
    subjectCode: 'CSA101',
    subjectName: 'Introduction to Computer Science and Engineering',
    shortDescription:
      'Computer organization & generations, problem solving using C programming, modular programming (arrays, functions, recursion), structures/unions/file handling, and modern CS disciplines.',
    textbook: 'Let Us C by Yashavant Kanetkar / Programming in ANSI C by E. Balagurusamy',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: '1D & 2D Array Memory Address Calculation',
        formula: 'Addr(A[i]) = Base(A) + i × sizeof(element) | Row-Major A[i][j] = Base + (i × N_cols + j) × w',
        note: 'In C, array indices start at 0 and 2D arrays are stored in contiguous Row-Major order.',
      },
      {
        title: 'Structure vs Union Memory Size',
        formula: 'sizeof(struct) >= Σ sizeof(all members) (with byte padding) | sizeof(union) = max(sizeof(largest member))',
        note: 'All members of a Union share the same memory location; only one member holds a valid value at a time.',
      },
      {
        title: 'Pointer Operators (& and *)',
        formula: 'int x = 10; int *ptr = &x; => *(&x) == *ptr == 10',
        note: '& is the "Address-of" operator; * is the "Value-at-address" (Dereferencing / Indirection) operator.',
      },
      {
        title: 'Standard File I/O Operations in C',
        formula: 'FILE *fp = fopen("data.txt", "r"); fgetc(fp); fprintf(fp, ...); fscanf(fp, ...); fclose(fp);',
        note: 'Modes: "r" (read), "w" (write/truncate), "a" (append), "r+" (read/write), "rb"/"wb" (binary).',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Introduction to Computer Science and Engineering',
        weightage: '20% (14 Marks)',
        summary:
          'Computer definition, characteristics, classification (Micro, Mini, Mainframe, Supercomputer), and 5 Generations of Computers. Computer Organization: Von Neumann architecture, CPU (ALU, Control Unit, Registers: PC, IR, MAR, MDR, Accumulator), Bus architecture (Address, Data, Control bus), Instruction set, Memory hierarchy (Register, Cache, RAM/ROM, Secondary storage), I/O devices, and System vs Application Software.',
        keyFormulas: [
          '1 Byte = 8 Bits | 1 KB = 1024 Bytes (2¹⁰ B) | 1 MB = 2²⁰ B | 1 GB = 2³⁰ B | 1 TB = 2⁴⁰ B',
          'Instruction Cycle = Fetch Cycle + Decode Cycle + Execute Cycle',
        ],
        keyConcepts: [
          {
            heading: 'Generations of Computers & Von Neumann Organization',
            description:
              'Evolution of hardware switching technology across five generations and the stored-program architecture proposed by John von Neumann.',
            bulletPoints: [
              'Five Generations: 1st Gen (1940–56: Vacuum Tubes, ENIAC, machine language), 2nd Gen (1956–63: Transistors, assembly/COBOL/FORTRAN), 3rd Gen (1964–71: Integrated Circuits ICs, operating systems), 4th Gen (1971–Present: VLSI Microprocessors, PCs, C/C++), 5th Gen (Present & Beyond: ULSI, AI, Parallel processing).',
              'CPU & Registers: Arithmetic Logic Unit (ALU) performs arithmetic/bitwise ops; Control Unit (CU) generates timing and control signals; Special-purpose registers include Program Counter (PC - holds address of next instruction), Instruction Register (IR), Memory Address Register (MAR), and Memory Data Register (MDR).',
              'System Bus Architecture: Address Bus (unidirectional: CPU to Memory/IO), Data Bus (bidirectional), and Control Bus (carries Read/Write/Interrupt signals).',
            ],
          },
          {
            heading: 'Memory Hierarchy & System vs Application Software',
            description:
              'Computer memory is organized in a pyramid balancing speed, cost per bit, and capacity.',
            bulletPoints: [
              'Memory Hierarchy (Fastest to Slowest): CPU Registers -> SRAM Cache (L1, L2, L3) -> Main Memory (DRAM - volatile, & ROM/PROM/EPROM/EEPROM - non-volatile) -> Secondary Storage (SSD, Magnetic Hard Disk, Optical Disk).',
              'System Software vs Application Software: System software manages hardware resources and provides a platform (Operating Systems, Compilers, Assemblers, Linkers, Device Drivers); Application software solves specific user tasks (MS Office, Web Browsers, ERP, CAD).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Block diagram of Von Neumann Computer Architecture & System Bus.',
          'Memory Hierarchy Pyramid comparing Access Time, Capacity, and Cost/Bit.',
        ],
        frequentExamQuestions: [
          {
            question: 'Draw and explain the functional block diagram of a digital computer (Von Neumann architecture), detailing the role of ALU, CU, Registers, and System Buses.',
            marks: 7,
            answerSummary:
              'Draw Input -> CPU (CU, ALU, Registers) <-> Memory -> Output with Address/Data/Control buses and explain each component.',
          },
          {
            question: 'Explain the five generations of computers and differentiate between Primary (RAM/ROM/Cache) and Secondary memory.',
            marks: 7,
            answerSummary:
              'Tabulate the 5 generations by switching device, speed, and language; compare SRAM vs DRAM and RAM vs ROM.',
          },
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Problem Solving using C',
        weightage: '20% (14 Marks)',
        summary:
          'Problem-solving concepts: Algorithms and Flowcharts. Rules/conventions of coding, History & Structure of a C Program. Tokens, Identifiers, Keywords, Data Types & Type Modifiers (signed, unsigned, short, long), Constants & Variables. Operators (Arithmetic, Relational, Logical, Bitwise, Ternary ?:, Pointer & and *), Operator Precedence & Associativity, Type Conversion & Type Casting. Control Constructs: if-else, switch-case, for, while, do-while, break, continue, exit(), goto.',
        keyFormulas: [
          'Basic C Data Types (32/64-bit GCC): char (1B, -128 to 127), int (4B), float (4B, 6 dec digits), double (8B, 15 dec digits)',
          'Ternary Conditional Operator: result = (condition) ? expression_if_true : expression_if_false;',
        ],
        keyConcepts: [
          {
            heading: 'Algorithms, Flowcharts & Structure of a C Program',
            description:
              'An algorithm is a finite sequence of unambiguous step-by-step instructions to solve a problem; a flowchart is its graphical representation using standard ANSI symbols (Oval: Start/Stop, Parallelogram: I/O, Rectangle: Process, Diamond: Decision).',
            bulletPoints: [
              'Structure of a C Program: (1) Documentation Section (/* comments */), (2) Link Section (#include <stdio.h>), (3) Definition Section (#define PI 3.14), (4) Global Declaration Section, (5) main() Function Section { Declaration part; Executable part; }, (6) Subprogram / User-defined Functions.',
              'Operators & Bitwise Operations: Bitwise AND (&), OR (|), XOR (^), One’s Complement (~), Left Shift (<< multiplies by 2^k), and Right Shift (>> divides by 2^k).',
            ],
          },
          {
            heading: 'Control Constructs: Decision Branching & Loops',
            description:
              'Control statements alter the sequential flow of execution based on boolean conditions or counters.',
            bulletPoints: [
              'Entry-Controlled vs Exit-Controlled Loops: `for` and `while` test the condition BEFORE executing the loop body (0 minimum executions); `do { ... } while(condition);` tests the condition AFTER executing the body (guaranteed at least 1 execution).',
              'break vs continue vs goto: `break` terminates the innermost enclosing loop or `switch` immediately; `continue` skips the remaining statements of the current iteration and jumps to the next loop evaluation; `exit(0)` terminates the entire program.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'C programs for Armstrong number, Roots of Quadratic Equation (ax²+bx+c=0), Factorial, and Prime numbers.',
          'Comparison table of while vs do-while and break vs continue.',
        ],
        frequentExamQuestions: [
          {
            question: 'Differentiate between entry-controlled (while, for) and exit-controlled (do-while) loops in C. Write a C program to check whether a given number is an Armstrong number or not.',
            marks: 7,
            answerSummary:
              'Compare syntax, flowchart, and minimum execution count; write C loop extracting digits `r = n % 10; sum += r*r*r; n /= 10;`.',
          },
          {
            question: 'Explain all classes of operators in C (Arithmetic, Logical, Bitwise, Conditional, and Pointer operators) along with operator precedence and type casting.',
            marks: 7,
            answerSummary:
              'Detail each operator group with examples, implicit promotion vs explicit `(float)a/b` casting, and precedence table.',
          },
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Modular Programming',
        weightage: '20% (14 Marks)',
        summary:
          'Modular Programming in C: 1D and 2D Arrays (declaration, initialization, matrix addition/multiplication/transpose). Storage Classes in C (auto, register, static, extern—scope, visibility, lifetime, default value, storage location). Functions: prototype declaration, definition, calling, formal vs actual arguments, return values. Parameter passing: Call by Value vs Call by Reference (using pointers). Recursion: direct, indirect, tree, and tail recursion vs Iteration.',
        keyFormulas: [
          'Matrix Multiplication: C[i][j] = Σ (A[i][k] * B[k][j]) for k = 0 to n-1',
          'Recursive Factorial: int fact(int n) { return (n <= 1) ? 1 : n * fact(n - 1); }',
        ],
        keyConcepts: [
          {
            heading: 'Storage Classes in C (auto, register, static, extern)',
            description:
              'Every variable in C has a data type and a storage class that determines its storage location (RAM or CPU register), default initial value, scope (visibility), and lifetime.',
            bulletPoints: [
              '1. auto (Automatic): Stored in RAM (stack); default value = garbage; scope = local to block; lifetime = till control remains in block.',
              '2. register: Stored in CPU register for fast access (e.g., loop counters); default value = garbage; scope = local to block; cannot apply address-of `&` operator.',
              '3. static: Stored in RAM (data segment); default initial value = 0 (zero); scope = local to block, but LIFETIME persists across multiple function calls!',
              '4. extern (Global): Stored in RAM; default initial value = 0; scope = global across multiple source files; lifetime = entire program execution.',
            ],
          },
          {
            heading: 'Call by Value vs Call by Reference & Recursion',
            description:
              'Functions modularize large C programs into reusable blocks (as detailed in the Drive C Functions notes).',
            bulletPoints: [
              'Call by Value: Values of actual arguments are copied into formal parameters. Changes made inside the function do NOT affect the original variables in `main()`.',
              'Call by Reference: Addresses of actual arguments (`&a, &b`) are passed to pointer formal parameters (`int *x, int *y`). Dereferencing (`*x`) modifies the actual variables in `main()` directly (e.g., `swap(&a, &b)`).',
              'Recursion vs Iteration: Recursion is a function calling itself with a base termination condition. Types include Direct, Indirect, Tail, and Tree recursion (e.g., Fibonacci, Tower of Hanoi). Recursion uses system call stack frames, so deep recursion should be avoided when memory is constrained.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'C program for swapping two numbers using Call by Value vs Call by Reference.',
          'C program for Matrix Multiplication and Recursive Fibonacci / String Reversal.',
        ],
        frequentExamQuestions: [
          {
            question: 'Explain the four Storage Classes in C (auto, register, static, extern) comparing their storage location, default initial value, scope, and lifetime with examples.',
            marks: 7,
            answerSummary:
              'Draw the 4×5 comparison table (Storage, Initial Value, Scope, Lifetime, Keyword) and write a C snippet showing `static int count = 0;` retaining value across calls.',
          },
          {
            question: 'Differentiate between Call by Value and Call by Reference with a C program to swap two numbers. Also compare Recursion with Iteration.',
            marks: 7,
            answerSummary:
              'Write `void swap(int *a, int *b)` using pointers, show memory diagram, and compare recursion stack overhead vs iterative loops.',
          },
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Advance C Programming',
        weightage: '20% (14 Marks)',
        summary:
          'Advance C Programming: Structures (declaration, initialization, dot `.` membership operator, pointer to structure and arrow `->` operator, nested structures, array of structures, self-referential structures). Unions and difference between Structure and Union. C Preprocessor Directives (#include, #define macros, #ifdef, #ifndef, #undef). Enumerated data types (`enum`) and `typedef`. File Handling in C (text vs binary files, `fopen`, `fclose`, `getc`, `putc`, `fprintf`, `fscanf`, `fseek`, `ftell`, `rewind`).',
        keyFormulas: [
          'Pointer to Structure Access: (*ptr).member  is equivalent to  ptr->member',
          'Self-Referential Structure: struct Node { int data; struct Node *next; };',
        ],
        keyConcepts: [
          {
            heading: 'Structures, Pointers to Structures & Unions',
            description:
              'A Structure (`struct`) is a user-defined heterogeneous data type that groups variables of different data types under a single name in contiguous memory locations.',
            bulletPoints: [
              'Array of Structures & Pointer Operator: `struct Book b[10];` stores records of 10 books. If `struct Book *p = &b[0];`, members are accessed via `p->price` or `(*p).price`.',
              'Self-Referential Structure: A structure containing a pointer member that points to a structure of the same type (`struct node *next;`), forming the foundation of linked lists and trees.',
              'Structure vs Union: In a `struct`, every member gets its own separate memory space and all members can be accessed simultaneously (`sizeof(struct)` >= sum of members). In a `union`, all members share the SAME memory block of size equal to the largest member, and only one member can hold a value at a time.',
            ],
          },
          {
            heading: 'C Preprocessor Directives, Enum, Typedef & File Handling',
            description:
              'The C Preprocessor (`cpp`) processes source code before compilation based on directives starting with `#`. File handling enables permanent data persistence on disk.',
            bulletPoints: [
              'Preprocessor Directives: Macro substitution (`#define SQR(x) ((x)*(x))`), File inclusion (`#include <stdio.h>` or `"myheader.h"`), and Conditional compilation (`#ifdef`, `#ifndef`, `#endif`).',
              'enum & typedef: `enum Day { MON=1, TUE, WED };` defines named integer constants; `typedef unsigned long ulong;` creates an alias for an existing data type.',
              'File Handling in C: Uses `FILE *fp;` stream pointer. Standard functions include `fopen()`, `fclose()`, `fgetc()`, `fputc()`, `fgets()`, `fputs()`, `fprintf()`, `fscanf()`, `fread()`, `fwrite()`, and random access functions `fseek(fp, offset, whence)`, `ftell(fp)`, and `rewind(fp)`.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'C program using Array of Structures to store 10 books and display books costing > Rs 200 (Lab Expt 12).',
          'C program to count characters, spaces, tabs, and newlines in a file (Lab Expt 14).',
        ],
        frequentExamQuestions: [
          {
            question: 'Differentiate between Structure and Union in C. Write a C program using an array of structures to store information of 10 books (title, price, copies) and print books costing more than Rs. 200.',
            marks: 7,
            answerSummary:
              'Compare memory allocation and access of `struct` vs `union` with diagram, and provide the complete `struct Book b[10]` program.',
          },
          {
            question: 'Explain File Handling in C, detailing file opening modes and functions (`fopen`, `fclose`, `fscanf`, `fprintf`, `fseek`, `ftell`). Write a C program to count characters, spaces, and lines in a text file.',
            marks: 7,
            answerSummary:
              'List modes ("r", "w", "a", "r+", "w+"), explain each file function, and write the `while((ch = fgetc(fp)) != EOF)` counting loop.',
          },
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Computer Science Disciplines and Applications',
        weightage: '20% (14 Marks)',
        summary:
          'Introduction to core Computer Science disciplines and their real-world applications (from Drive notes: AI.pdf, Operating System presentation, Security issues of IT.pdf, C Unit 5 Notes.pdf): Computer Networking (LAN, MAN, WAN, OSI/TCP-IP), Cyber Security (CIA triad, threats, cryptography), Operating Systems, Data Science, Machine Learning (Supervised, Unsupervised, Reinforcement), Cloud Computing (IaaS, PaaS, SaaS), Blockchain technology, and Web Development.',
        keyFormulas: [
          'CIA Security Triad: Confidentiality + Integrity + Availability',
          'Cloud Service Models: IaaS (Infrastructure) -> PaaS (Platform) -> SaaS (Software as a Service)',
        ],
        keyConcepts: [
          {
            heading: 'Networking, Operating Systems & Cyber Security',
            description:
              'Foundational systems pillars that enable distributed communication, resource management, and information assurance.',
            bulletPoints: [
              'Computer Networking: Interconnects autonomous nodes across LAN (Local Area Network), MAN, and WAN (Internet) using topologies (Star, Mesh, Bus) and layered protocols (OSI 7-layer & TCP/IP stack: HTTP, TCP, IP, Ethernet).',
              'Operating Systems (OS): Acts as an intermediary between user and hardware, managing Process scheduling, Memory management (virtual memory/paging), File systems, and I/O device control.',
              'Cyber Security & IT Security Issues: Protects systems using the CIA Triad (Confidentiality via encryption, Integrity via hashing, Availability via redundancy) against malware, phishing, DoS attacks, and SQL injection.',
            ],
          },
          {
            heading: 'Data Science, Machine Learning, Cloud Computing & Blockchain',
            description:
              'Emerging computing paradigms driving modern intelligent, scalable, and decentralized software engineering.',
            bulletPoints: [
              'Data Science & Machine Learning (AI): Extracts insights from structured/unstructured big data. ML enables systems to learn patterns from data without explicit programming: Supervised Learning (Regression, Classification), Unsupervised Learning (Clustering), and Reinforcement Learning.',
              'Cloud Computing: On-demand delivery of virtualized compute, storage, and databases over the Internet via IaaS (AWS EC2), PaaS (Google App Engine), and SaaS (Gmail, Office 365) across Public, Private, and Hybrid clouds.',
              'Blockchain & Web Development: Blockchain is an immutable, decentralized, cryptographically linked peer-to-peer ledger (Merkle trees, consensus, smart contracts). Web Development spans Frontend (HTML5, CSS3, JavaScript/React) and Backend APIs + Databases.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Architecture comparison of IaaS, PaaS, and SaaS Cloud Models.',
          'Taxonomy of Artificial Intelligence, Machine Learning, and Deep Learning.',
        ],
        frequentExamQuestions: [
          {
            question: 'Write comprehensive notes on: (i) Artificial Intelligence & Machine Learning types, and (ii) Cloud Computing service models (IaaS, PaaS, SaaS).',
            marks: 7,
            answerSummary:
              'Explain Supervised, Unsupervised, and Reinforcement learning with real-world applications, and illustrate IaaS, PaaS, and SaaS layers.',
          },
          {
            question: 'Explain the fundamentals and applications of: (i) Blockchain Technology, (ii) Cyber Security (CIA Triad), and (iii) Computer Networks.',
            marks: 7,
            answerSummary:
              'Detail cryptographic block linking & decentralization, Confidentiality-Integrity-Availability security principles, and LAN/MAN/WAN networking.',
          },
        ],
      },
    ],
  },

  // 4. DIGITAL ELECTRONICS (CSA102)
  'sub-basic-electr': {
    subjectId: 'sub-basic-electr',
    subjectCode: 'CSA102',
    subjectName: 'Digital Electronics',
    shortDescription:
      'Number systems & Hamming error-correcting codes, Boolean algebra & K-Map/Quine-McCluskey minimization, combinational logic modules, sequential flip-flops & shift registers, and counters & FSM.',
    textbook: 'Digital Logic and Computer Design by M. Morris Mano / Fundamentals of Digital Circuits by A. Anand Kumar',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: 'r’s and (r-1)’s Complement',
        formula: '2’s Complement of Binary N = 1’s Complement (invert all bits) + 1',
        note: 'Range of n-bit signed 2’s complement number: -(2^(n-1)) to +(2^(n-1) - 1).',
      },
      {
        title: 'Hamming Error-Correcting Code Condition',
        formula: '2^p >= m + p + 1  (where m = data bits, p = parity bits placed at powers of 2: 1, 2, 4, 8...)',
        note: 'For 4-bit data (m=4), 2^3 = 8 >= 4+3+1 => p=3 parity bits (7,4 Hamming code).',
      },
      {
        title: 'De-Morgan’s Theorems & Consensus Theorem',
        formula: '(A · B)’ = A’ + B’   |   (A + B)’ = A’ · B’   |   AB + A’C + BC = AB + A’C',
        note: 'NAND and NOR are Universal Gates because any Boolean function can be realized using only NAND or only NOR gates.',
      },
      {
        title: 'Full Adder Sum & Carry Expressions',
        formula: 'Sum (S) = A ⊕ B ⊕ C_in   |   Carry (C_out) = A·B + B·C_in + A·C_in = A·B + C_in(A ⊕ B)',
        note: 'A Full Adder can be constructed using two Half Adders and one OR gate.',
      },
      {
        title: 'MOD-N Counter Flip-Flop Requirement',
        formula: 'Number of Flip-Flops (n) required for MOD-N counter: 2^(n-1) < N <= 2^n  (or n = ⌈log2 N⌉)',
        note: 'Output frequency at last flip-flop = f_clock / N. BCD Decade counter is a MOD-10 counter requiring 4 flip-flops.',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Introduction to Digital Electronics & Number Systems',
        weightage: '20% (14 Marks)',
        summary:
          'Review of Number Systems (Binary, Octal, Decimal, Hexadecimal) and radix conversions. Binary Arithmetic, Signed and Unsigned representation (Sign-Magnitude, 1’s Complement, 2’s Complement subtraction). Binary Codes: Weighted (8421 BCD, 2421) and Non-weighted (Excess-3 self-complementing code, Gray unit-distance cyclic code), Binary-to-Gray and Gray-to-Binary conversions. Error detection and correction codes: Even/Odd Parity check codes and 7-bit Hamming Code.',
        keyFormulas: [
          'Binary (b3 b2 b1 b0) to Gray (g3 g2 g1 g0): g3 = b3 ; g2 = b3 ⊕ b2 ; g1 = b2 ⊕ b1 ; g0 = b1 ⊕ b0',
          'Gray to Binary: b3 = g3 ; b2 = b3 ⊕ g2 ; b1 = b2 ⊕ g1 ; b0 = b1 ⊕ g0',
          'BCD Addition Rule: If 4-bit sum > 9 (1001) or carry is generated, add 0110 (6) to get valid BCD.',
        ],
        keyConcepts: [
          {
            heading: 'Number System Conversions & 1’s / 2’s Complement Arithmetic',
            description:
              'Digital systems use base-2 (Binary), base-8 (Octal, 3 bits/digit), and base-16 (Hexadecimal, 4 bits/digit). Subtraction in ALU hardware is performed via addition of the 2’s complement.',
            bulletPoints: [
              '2’s Complement Subtraction (M - N): Add 2’s complement of subtrahend N to minuend M. If a final end-around carry is generated, discard the carry and the result is positive in true binary. If no carry is generated, the result is negative and is in 2’s complement form.',
              '1’s Complement Subtraction: If end-around carry is generated, add 1 to the LSB of the result.',
            ],
          },
          {
            heading: 'Binary Codes (BCD, Excess-3, Gray) & Hamming Error-Correcting Code',
            description:
              'Special binary codes optimize decimal display, arithmetic complementation, rotary shaft encoding, and noisy channel transmission.',
            bulletPoints: [
              'Excess-3 & Gray Code: Excess-3 (BCD + 0011) is a self-complementing code (9’s complement is obtained by simply inverting bits). Gray code is a unit-distance code where successive numbers differ by only 1 bit, eliminating transient errors in rotary encoders and K-map adjacency.',
              'Hamming Code (Error Detection & Single-Bit Correction): Parity bits P1, P2, P4, P8... are placed at bit positions that are powers of 2. P1 checks bits (1,3,5,7,9,11), P2 checks (2,3,6,7,10,11), P4 checks (4,5,6,7). At receiver, recalculating parity checks yields the binary syndrome C4 C2 C1 which directly gives the exact bit position of the corrupted bit!',
            ],
          },
        ],
        derivationsOrTheorems: [
          '7-bit Hamming Code construction and single-bit error syndrome correction example.',
          '4-bit Binary-to-Gray and Gray-to-Binary XOR gate converter circuits.',
        ],
        frequentExamQuestions: [
          {
            question: 'Explain the 7-bit Hamming code for error detection and correction. A 7-bit Hamming code (even parity) is received as 1011011. Determine if there is an error and find the correct code word.',
            marks: 7,
            answerSummary:
              'Check parity groups P1(1,3,5,7), P2(2,3,6,7), P4(4,5,6,7) to compute syndrome C4 C2 C1, locate the erroneous bit, flip it, and extract the 4 data bits.',
          },
          {
            question: 'Perform subtraction using 1’s and 2’s complement methods: (i) (1010100)₂ - (1000100)₂, (ii) (1000100)₂ - (1010100)₂. Also explain BCD, Excess-3, and Gray codes.',
            marks: 7,
            answerSummary:
              'Show step-by-step 1’s and 2’s complement addition with carry handling for both positive and negative results.',
          },
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Boolean Algebra and Switching Functions',
        weightage: '20% (14 Marks)',
        summary:
          'Study of basic logic gates (AND, OR, NOT), Universal gates (NAND, NOR), and Special gates (XOR, XNOR). Basic postulates, Duality principle, and fundamental theorems of Boolean Algebra (De-Morgan’s, Absorption, Consensus, Transposition). Standard & Canonical representations of switching functions: Sum of Products (SOP - Minterms Σm) and Product of Sums (POS - Maxterms ΠM). Simplification of switching functions using 3, 4, and 5-variable Karnaugh Maps (K-Map with Don’t Care conditions) and Quine-McCluskey (Tabular) method.',
        keyFormulas: [
          'Absorption Law: A + A·B = A  and  A·(A + B) = A  and  A + A’·B = A + B',
          'XOR Gate: A ⊕ B = A’B + AB’  |  XNOR Gate: (A ⊕ B)’ = AB + A’B’',
          'NAND Realization: NOT(A) = (A·A)’ ; AND(A,B) = ((A·B)’)’ ; OR(A,B) = (A’ · B’)’',
        ],
        keyConcepts: [
          {
            heading: 'Universal Gates (NAND/NOR) & Canonical SOP / POS Forms',
            description:
              'Any Boolean switching expression can be standardized into canonical Sum of Minterms (SOP) or Product of Maxterms (POS) and implemented using two-level NAND-NAND or NOR-NOR logic.',
            bulletPoints: [
              'Minterms (m_i) vs Maxterms (M_i): For n variables, there are 2^n minterms (AND product terms where 1 = uncomplemented, 0 = complemented) and 2^n maxterms (OR sum terms where 0 = uncomplemented, 1 = complemented). m_i = (M_i)’.',
              'SOP to NAND-NAND & POS to NOR-NOR: Any two-level AND-OR (SOP) circuit is equivalent to a two-level NAND-NAND circuit; any OR-AND (POS) circuit is equivalent to a two-level NOR-NOR circuit.',
            ],
          },
          {
            heading: 'Karnaugh Map (K-Map) & Quine-McCluskey Tabular Method',
            description:
              'Graphical and algorithmic methods to minimize Boolean expressions into minimum literals and prime implicants.',
            bulletPoints: [
              'K-Map Minimization: Uses Gray-code ordering (00, 01, 11, 10) so adjacent cells differ by 1 variable. Grouping 2^k adjacent 1s (Octet=8, Quad=4, Pair=2) eliminates k variables. Don’t Care (d / X) conditions can be treated as 1 or 0 if they help form larger groups.',
              'Quine-McCluskey (Tabular) Method: Ideal for >4 variables or computer automation. Step 1: Group minterms in binary by number of 1s (Index). Step 2: Compare adjacent groups; if two terms differ in exactly one bit position, combine them and place a dash `-` at that bit. Step 3: Repeat until all Prime Implicants (PIs) are found. Step 4: Construct the Prime Implicant Chart to identify Essential Prime Implicants (EPIs) with single crosses in a column.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Realization of NOT, AND, OR, XOR, and XNOR using minimum number of 2-input NAND gates (4 NANDs for XOR, 5 for XNOR).',
          'Step-by-step Quine-McCluskey Tabular minimization example.',
        ],
        frequentExamQuestions: [
          {
            question: 'Minimize the Boolean function F(A,B,C,D) = Σm(0, 1, 2, 5, 7, 8, 9, 10, 13, 15) + d(3, 14) using a 4-variable K-Map and implement the minimal expression using only NAND gates.',
            marks: 7,
            answerSummary:
              'Plot the 4×4 Gray-coded K-Map, form optimal Quads/Octets using Don’t cares, write minimal SOP expression, and draw the 2-level NAND-NAND logic diagram.',
          },
          {
            question: 'Explain the Quine-McCluskey (Tabular) method of Boolean minimization step-by-step with a 4-variable solved example.',
            marks: 7,
            answerSummary:
              'Show Column I (grouped by number of 1s), Column II (1-bit difference pairs), Column III (2-bit dashes), and the Prime Implicant selection table.',
          },
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Combinational Logic Modules and Applications',
        weightage: '20% (14 Marks)',
        summary:
          'Combinational circuit design procedure. Arithmetic circuits: Half Adder, Full Adder, Half Subtractor, Full Subtractor, 4-bit Parallel Binary Adder/Subtractor, Look-Ahead Carry Adder. Code Converters (Binary to Gray, BCD to Excess-3), Parity Generators/Checkers, and Magnitude Comparators (1-bit, 2-bit, 4-bit). Data routing & MSI modules: Encoders (Octal-to-Binary, Priority Encoder), Decoders (3-to-8 Decoder, BCD-to-Seven-Segment Display Decoder), Multiplexers (4:1, 8:1, 16:1 MUX & Boolean function implementation), and Demultiplexers (1:4, 1:8 DEMUX).',
        keyFormulas: [
          'Half Subtractor: Difference (D) = A ⊕ B  |  Borrow (B_out) = A’ · B',
          'Full Subtractor: Difference (D) = A ⊕ B ⊕ B_in  |  Borrow (B_out) = A’B + A’B_in + BB_in',
          '4:1 Multiplexer Output: Y = S1’·S0’·I0 + S1’·S0·I1 + S1·S0’·I2 + S1·S0·I3',
        ],
        keyConcepts: [
          {
            heading: 'Adders, Subtractors & Magnitude Comparators',
            description:
              'Combinational circuits have no memory; their outputs depend solely on the present combination of inputs.',
            bulletPoints: [
              'Full Adder & Full Subtractor: A Full Adder adds three bits (A, B, C_in) producing Sum = A ⊕ B ⊕ C_in and Carry = AB + C_in(A ⊕ B). A 4-bit Adder-Subtractor uses 4 Full Adders and 4 XOR gates controlled by a Mode bit M (M=0 for Addition, M=1 for 2’s complement Subtraction).',
              'Magnitude Comparator: Compares two n-bit binary numbers A and B to generate three outputs: (A > B), (A == B), and (A < B). Equality condition uses XNOR gates: x_i = (A_i ⊕ B_i)’.',
            ],
          },
          {
            heading: 'Encoders, Decoders, BCD-to-7-Segment & Multiplexers (MUX)',
            description:
              'Medium-Scale Integration (MSI) combinational modules used for data selection, address decoding, and display driving.',
            bulletPoints: [
              'Priority Encoder vs Decoder: A 2^n-to-n Encoder converts an active input line into an n-bit binary code; a Priority Encoder resolves simultaneous active inputs by encoding the highest-priority input. An n-to-2^n Decoder activates exactly one minterm output line and can implement any Boolean function using an external OR gate.',
              'BCD to Seven-Segment Decoder: Converts 4-bit BCD input (0000 to 1001) into 7 active outputs (a, b, c, d, e, f, g) to drive common-anode or common-cathode LED 7-segment displays.',
              'Multiplexer (Data Selector) & Demultiplexer (Data Distributor): A 2^n:1 MUX selects one of 2^n data inputs based on n select lines and routes it to a single output. Any (n+1)-variable Boolean function can be implemented using a 2^n:1 MUX by connecting n variables to select lines and the (n+1)th variable (0, 1, D, D’) to data inputs.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Design of Full Adder using two Half Adders and an OR gate.',
          'Implementation of a 4-variable Boolean function using an 8:1 Multiplexer and 3-to-8 Decoder.',
        ],
        frequentExamQuestions: [
          {
            question: 'Design a Full Adder and Full Subtractor circuit with truth tables, K-map simplifications, and logic diagrams. Show how a Full Adder is built using two Half Adders.',
            marks: 7,
            answerSummary:
              'Provide 8-row truth tables for FA and FS, derive Sum/Difference and Carry/Borrow equations, and draw the cascaded Half Adder diagram.',
          },
          {
            question: 'What is a Multiplexer? Implement F(A,B,C,D) = Σm(0, 1, 3, 4, 8, 9, 15) using an 8:1 Multiplexer. Also explain the BCD to Seven-Segment Decoder.',
            marks: 7,
            answerSummary:
              'Connect A, B, C to select lines S2, S1, S0, build the 2×8 implementation table with D and D’, and wire I0..I7 to 1, D, 0, D’.',
          },
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Sequential Circuits and Shift Registers',
        weightage: '20% (14 Marks)',
        summary:
          'Sequential vs Combinational circuits. Latches and Flip-Flops: SR Latch (NAND & NOR), Clocked SR Flip-Flop, D Flip-Flop, J-K Flip-Flop, Race-Around Condition in JK FF and Master-Slave JK Flip-Flop, T (Toggle) Flip-Flop. Level triggering vs Edge triggering (Positive & Negative edge). Characteristic tables, Characteristic equations, Excitation tables, and Flip-Flop conversions (e.g., JK to D/T, SR to JK). Shift Registers: SISO, SIPO, PISO, PIPO, Bidirectional & Universal Shift Register.',
        keyFormulas: [
          'SR FF Characteristic Eq: Q(t+1) = S + R’·Q(t)  (with constraint S·R = 0)',
          'JK FF Characteristic Eq: Q(t+1) = J·Q’(t) + K’·Q(t)',
          'D FF Characteristic Eq: Q(t+1) = D   |   T FF Characteristic Eq: Q(t+1) = T ⊕ Q(t) = T·Q’(t) + T’·Q(t)',
        ],
        keyConcepts: [
          {
            heading: 'Flip-Flops (SR, D, JK, T), Excitation Tables & Race-Around Condition',
            description:
              'A flip-flop is a 1-bit bistable sequential memory element triggered by a clock signal.',
            bulletPoints: [
              'SR vs JK Flip-Flop: In a clocked SR flip-flop, S=1, R=1 is an invalid/indeterminate state. The JK flip-flop eliminates this indeterminate state using feedback from Q and Q’: when J=1 and K=1, the output toggles Q(t+1) = Q’(t).',
              'Race-Around Condition & Master-Slave JK Flip-Flop: In a level-triggered JK flip-flop, when J=1, K=1, and the clock pulse width (t_p) is greater than the propagation delay (Δt) of the flip-flop, the output Q oscillates (toggles) multiple times within a single clock pulse. Prevented by: (1) Edge-triggering, or (2) Master-Slave JK Flip-Flop (Master is active on CLK=1, Slave copies Master on CLK=0).',
              'Excitation Tables (Q_n -> Q_n+1): Used for sequential design and FF conversion. For JK: 0->0 requires (J=0, K=X); 0->1 requires (J=1, K=X); 1->0 requires (J=X, K=1); 1->1 requires (J=X, K=0).',
            ],
          },
          {
            heading: 'Classification of Shift Registers (SISO, SIPO, PISO, PIPO)',
            description:
              'A Shift Register is a cascade of n flip-flops (typically D flip-flops) sharing a common clock that stores n-bit binary data and shifts it left or right.',
            bulletPoints: [
              '1. Serial-In Serial-Out (SISO): Data enters 1 bit per clock and exits serially after n clock pulses (used for time delay).',
              '2. Serial-In Parallel-Out (SIPO): Converts serial communication data into parallel bus format in n clocks.',
              '3. Parallel-In Serial-Out (PISO): Loads all n bits simultaneously via parallel load gates and shifts them out serially.',
              '4. Parallel-In Parallel-Out (PIPO) & Universal Shift Register: Universal shift register uses 4:1 MUXes in front of each D flip-flop to support Hold (00), Shift-Right (01), Shift-Left (10), and Parallel-Load (11).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Characteristic and Excitation Tables of SR, JK, D, and T Flip-Flops.',
          'Conversion of JK Flip-Flop to D and T Flip-Flops, and 4-bit Bidirectional Shift Register diagram.',
        ],
        frequentExamQuestions: [
          {
            question: 'What is the Race-Around condition in a J-K Flip-Flop? Explain with logic diagram and timing waveforms how a Master-Slave J-K Flip-Flop eliminates it.',
            marks: 7,
            answerSummary:
              'State condition (J=K=1 and t_p >> Δt_pd), draw Master-Slave cascaded JK FF with inverted clock to Slave, and show timing waveform.',
          },
          {
            question: 'Write the Characteristic equations and Excitation tables for SR, JK, D, and T flip-flops. Explain the working of SISO, SIPO, PISO, and PIPO Shift Registers.',
            marks: 7,
            answerSummary:
              'Provide all 4 characteristic equations and excitation tables, and draw 4-bit D flip-flop shift register configurations.',
          },
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Counters and Finite State Machines',
        weightage: '20% (14 Marks)',
        summary:
          'Classification of Counters: Asynchronous (Ripple) Counters vs Synchronous Counters. 3-bit and 4-bit Ripple Up/Down counters, propagation delay limitations. Design of MOD-N counters, BCD Decade Counter (MOD-10), Ring Counter and Twisted Ring (Johnson) Counter. Synchronous counter design using state diagrams, state tables, flip-flop excitation tables, and K-maps. Introduction to Finite State Machines (FSM): Mealy Machine vs Moore Machine models.',
        keyFormulas: [
          'Max Clock Frequency of n-bit Ripple Counter: f_max <= 1 / (n × t_pd)',
          'n-bit Ring Counter States = n  |  n-bit Johnson (Twisted Ring) Counter States = 2n',
        ],
        keyConcepts: [
          {
            heading: 'Asynchronous (Ripple) vs Synchronous Counters & BCD/MOD Counters',
            description:
              'Counters are sequential circuits that cycle through a prescribed sequence of states upon receiving clock pulses.',
            bulletPoints: [
              'Asynchronous (Ripple) vs Synchronous Counters: In a Ripple counter, only the first flip-flop receives the external clock; subsequent flip-flops are clocked by the output of the previous stage, causing cumulative propagation delay (n·t_pd) and decoding glitches. In a Synchronous counter, all flip-flops are triggered simultaneously by a common clock pulse.',
              'BCD Decade Counter (MOD-10): Counts from 0000 (0) to 1001 (9) using 4 JK/T flip-flops. On the 10th pulse (state 1010 = 10, where Q3=1 and Q1=1), a NAND gate connected to Q3 and Q1 triggers the active-low asynchronous CLEAR inputs of all flip-flops, resetting the counter to 0000.',
              'Ring vs Johnson Counter: A 4-bit Ring counter feeds Q3 back to D0 (4 valid states: 1000, 0100, 0010, 0001). A 4-bit Johnson (Twisted Ring) counter feeds Q3’ back to D0, producing 2n = 8 states.',
            ],
          },
          {
            heading: 'Synchronous Counter Design & Finite State Machines (Mealy vs Moore)',
            description:
              'Systematic state-machine synthesis allows designing any arbitrary sequence counter or sequence detector.',
            bulletPoints: [
              'Synchronous Counter Design Steps: (1) Determine number of flip-flops n; (2) Draw State Transition Diagram; (3) Construct Present-State / Next-State Excitation Table; (4) Simplify flip-flop input equations (J_i, K_i or T_i) using K-Maps; (5) Draw logic circuit.',
              'Finite State Machines (Moore vs Mealy): In a Moore Machine, the output depends ONLY on the present state of the flip-flops (outputs are labeled inside state circles). In a Mealy Machine, the output depends on BOTH the present state AND the present external inputs (outputs are labeled on transition arcs, requiring fewer states and reacting faster within the same clock cycle).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Design of MOD-6 and MOD-10 (BCD Decade) Ripple and Synchronous Counters.',
          'Comparison of Mealy vs Moore Finite State Machine models.',
        ],
        frequentExamQuestions: [
          {
            question: 'Differentiate between Asynchronous (Ripple) and Synchronous counters. Design a MOD-10 (BCD Decade) counter and a 3-bit Synchronous Up-Counter using JK Flip-Flops.',
            marks: 7,
            answerSummary:
              'Compare clock connection, speed, and hardware; show state excitation table for 000->111, K-maps for JA, KA, JB, KB, JC, KC, and logic diagram.',
          },
          {
            question: 'Explain Ring Counter and Johnson (Twisted Ring) Counter with circuit and timing diagrams. Also differentiate between Mealy and Moore Finite State Machines.',
            marks: 7,
            answerSummary:
              'Draw 4-bit Ring (Q3->D0) and Johnson (Q3’->D0) shift counters with state tables, and compare Mealy vs Moore block diagrams.',
          },
        ],
      },
    ],
  },

  // 5. MATHEMATICS-I: LINEAR ALGEBRA AND CALCULUS (MAB101)
  'sub-maths': {
    subjectId: 'sub-maths',
    subjectCode: 'MAB101',
    subjectName: 'Mathematics-I (Linear Algebra and Calculus)',
    shortDescription:
      'Differential calculus (Leibnitz, Taylor/Maclaurin, curvature, maxima/minima), partial differentiation (Euler’s theorem), multiple integrals, matrices & eigenvalues, and Boolean algebra & graph theory.',
    textbook: 'Higher Engineering Mathematics by B.S. Grewal / H.K. Dass / B.V. Ramana',
    driveFolderUrl: '',
    totalPdfPages: '5 Chapters · Complete Notes',
    quickFormulas: [
      {
        title: 'Leibnitz Theorem for nth Derivative of Product (u·v)',
        formula: 'D^n(u·v) = u_n·v + nC1 u_(n-1)·v_1 + nC2 u_(n-2)·v_2 + ... + nCr u_(n-r)·v_r + ... + u·v_n',
        note: 'Choose v as the algebraic polynomial function whose higher derivatives vanish quickly.',
      },
      {
        title: 'Radius of Curvature (Cartesian Form)',
        formula: 'ρ = [1 + (dy/dx)²]^(3/2) / (d²y/dx²)',
        note: 'Centre of Curvature (X, Y): X = x - [y1(1 + y1²)] / y2 , Y = y + (1 + y1²) / y2.',
      },
      {
        title: 'Euler’s Theorem on Homogeneous Functions',
        formula: 'x (∂u/∂x) + y (∂u/∂y) = n·u   |   x²(∂²u/∂x²) + 2xy(∂²u/∂x∂y) + y²(∂²u/∂y²) = n(n - 1)u',
        note: 'If f(u) = z is homogeneous of degree n, then x(∂u/∂x) + y(∂u/∂y) = n · f(u) / f’(u).',
      },
      {
        title: 'Beta and Gamma Function Relation',
        formula: 'B(m, n) = ∫₀¹ x^(m-1) (1-x)^(n-1) dx = [Γ(m) · Γ(n)] / Γ(m + n)   ;   Γ(1/2) = √π',
        note: 'Γ(n+1) = n·Γ(n) = n! for positive integer n.',
      },
      {
        title: 'Cayley-Hamilton Characteristic Equation',
        formula: '|A - λI| = 0  =>  Every square matrix satisfies its own characteristic equation.',
        note: 'Multiplying the characteristic polynomial by A⁻¹ directly yields the inverse matrix A⁻¹ and higher powers A^n.',
      },
    ],
    units: [
      {
        unitNumber: 1,
        unitTitle: 'Chapter 1: Differential Calculus',
        weightage: '20% (14 Marks)',
        summary:
          'Successive differentiation and Leibnitz Theorem for the nth derivative of the product of two functions. Expansion of functions of one variable by Maclaurin’s and Taylor’s theorems. Maxima and Minima of functions of two variables (Lagrange’s condition rt - s² > 0). Curvature: Radius of Curvature and Centre of Curvature in Cartesian coordinates.',
        keyFormulas: [
          'Maclaurin’s Series: f(x) = f(0) + x·f’(0) + (x²/2!)f’’(0) + (x³/3!)f’’’(0) + ...',
          'Taylor’s Series: f(a + h) = f(a) + h·f’(a) + (h²/2!)f’’(a) + ...',
          'Two-Variable Extrema: p = ∂f/∂x = 0, q = ∂f/∂y = 0 ; r = ∂²f/∂x², s = ∂²f/∂x∂y, t = ∂²f/∂y². If rt - s² > 0: Minimum if r > 0, Maximum if r < 0.',
        ],
        keyConcepts: [
          {
            heading: 'Leibnitz Theorem & Taylor / Maclaurin Expansions',
            description:
              'Leibnitz theorem computes the nth derivative of a product u·v and is widely used to form differential equations connecting y_n, y_(n+1), and y_(n+2) at x = 0.',
            bulletPoints: [
              'Standard Leibnitz Trick: Given y = sin(m sin⁻¹x) or y = (sin⁻¹x)², differentiate twice using y1 and √(1 - x²) to eliminate radicals, yielding (1 - x²)y2 - x·y1 + m²y = 0, then apply Leibnitz Theorem n times to each term.',
              'Maclaurin & Taylor Series: Expand log(1+sin x), tan⁻¹x, or e^(x cos x) in ascending powers of x (Maclaurin) or in powers of (x - a) (Taylor).',
            ],
          },
          {
            heading: 'Maxima & Minima of Two Variables and Cartesian Curvature',
            description:
              'Optimizes multivariable engineering surfaces f(x, y) and measures the rate of bending of plane curves.',
            bulletPoints: [
              'Stationary Points & Saddle Points: Solve ∂f/∂x = 0 and ∂f/∂y = 0 for critical points (a, b). Evaluate Δ = rt - s². If Δ > 0 and r < 0 -> Local Maximum; if Δ > 0 and r > 0 -> Local Minimum; if Δ < 0 -> Saddle Point (neither max nor min).',
              'Radius & Centre of Curvature: Radius of curvature ρ = (1 + y1²)^(3/2) / y2. If tangent is parallel to Y-axis (y1 -> ∞), interchange roles of x and y: ρ = [1 + (dx/dy)²]^(3/2) / (d²x/dy²).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'If y = a cos(log x) + b sin(log x), prove that x² y_(n+2) + (2n+1)x y_(n+1) + (n²+1)y_n = 0.',
          'Derivation of Cartesian Radius of Curvature ρ = (1 + y1²)^(3/2) / y2.',
        ],
        frequentExamQuestions: [
          {
            question: 'State Leibnitz Theorem. If y^(1/m) + y^(-1/m) = 2x, prove that (x² - 1)y_(n+2) + (2n + 1)x y_(n+1) + (n² - m²)y_n = 0.',
            marks: 7,
            answerSummary:
              'Solve quadratic in y^(1/m) to get y = (x ± √(x²-1))^m, differentiate twice to get (x²-1)y2 + x·y1 - m²y = 0, and differentiate n times by Leibnitz theorem.',
          },
          {
            question: 'Find the extreme values (maxima and minima) of f(x, y) = x³ + y³ - 3axy. Also find the radius of curvature at any point (x, y) on the curve x^(2/3) + y^(2/3) = a^(2/3).',
            marks: 7,
            answerSummary:
              'Find stationary points (0,0) and (a,a); at (a,a), rt - s² = 27a² > 0, giving maximum if a<0 and minimum if a>0. For astroid, ρ = 3(axy)^(1/3).',
          },
        ],
      },
      {
        unitNumber: 2,
        unitTitle: 'Chapter 2: Partial Differentiation',
        weightage: '20% (14 Marks)',
        summary:
          'Partial derivatives of first and higher orders. Homogeneous functions and Euler’s Theorem on homogeneous functions (first and second order deductions). Total differentiation, Differentiation of composite and implicit functions, Change of variables, Jacobians, and Errors and Approximations using differentials.',
        keyFormulas: [
          'Total Differential: du = (∂u/∂x)dx + (∂u/∂y)dy  ;  du/dt = (∂u/∂x)(dx/dt) + (∂u/∂y)(dy/dt)',
          'Implicit Differentiation (f(x, y) = 0): dy/dx = -(∂f/∂x) / (∂f/∂y)',
          'Percentage Error in u = f(x, y): (du / u) × 100 = [(∂u/∂x)dx + (∂u/∂y)dy] / u × 100',
        ],
        keyConcepts: [
          {
            heading: 'Homogeneous Functions & Euler’s Theorem',
            description:
              'A function u(x, y) is homogeneous of degree n if it can be expressed in the form x^n · φ(y/x) or if u(kx, ky) = k^n · u(x, y).',
            bulletPoints: [
              'Euler’s First & Second Theorems: For homogeneous u of degree n: (1) x(∂u/∂x) + y(∂u/∂y) = n·u, and (2) x²(∂²u/∂x²) + 2xy(∂²u/∂x∂y) + y²(∂²u/∂y²) = n(n - 1)u.',
              'Modified Euler’s Rule for Composite Functions: If z = f(u) is homogeneous of degree n (e.g., u = sin⁻¹((x²+y²)/(x+y)) => sin u = z is homogeneous of degree n = 2-1 = 1), then x(∂u/∂x) + y(∂u/∂y) = n·f(u)/f’(u) = tan u, and x²u_xx + 2xy u_xy + y²u_yy = g(u)[g’(u) - 1] where g(u) = n·f(u)/f’(u).',
            ],
          },
          {
            heading: 'Total Differentiation, Errors and Approximations',
            description:
              'Total differentials estimate the small change δu in a multivariable physical quantity u(x, y, z) caused by small measurement errors δx, δy, δz.',
            bulletPoints: [
              'Logarithmic Error Shortcut: When u = x^a · y^b / z^c (product/quotient form), take natural log on both sides: log u = a log x + b log y - c log z. Differentiating gives Relative Error du/u = a(dx/x) + b(dy/y) - c(dz/z).',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Proof of Euler’s Theorem and second-order deduction for homogeneous functions.',
          'If u = log((x⁴ + y⁴)/(x + y)), prove that x(∂u/∂x) + y(∂u/∂y) = 3.',
        ],
        frequentExamQuestions: [
          {
            question: 'State and prove Euler’s Theorem for a homogeneous function of two variables. If u = cos⁻¹((x + y) / (√x + √y)), prove that x(∂u/∂x) + y(∂u/∂y) + (1/2) cot u = 0.',
            marks: 7,
            answerSummary:
              'Let z = cos u = (x+y)/(√x+√y), which is homogeneous of degree n = 1 - 1/2 = 1/2. Apply x(∂z/∂x) + y(∂z/∂y) = (1/2)z to obtain -(1/2) cot u.',
          },
          {
            question: 'Explain Total Differentiation and Errors & Approximations. Find the percentage error in the area of an ellipse (A = πab) when an error of +1% is made in measuring the major and minor axes.',
            marks: 7,
            answerSummary:
              'Take log A = log π + log a + log b => (dA/A)×100 = (da/a)×100 + (db/b)×100 = 1% + 1% = 2%.',
          },
        ],
      },
      {
        unitNumber: 3,
        unitTitle: 'Chapter 3: Integral Calculus',
        weightage: '20% (14 Marks)',
        summary:
          'Definite Integral as a Limit of a Sum and its application in summation of infinite series. Beta and Gamma functions (from Drive notes: Gamma and Beta function.pdf). Multiple Integrals: Evaluation of Double and Triple Integrals, Change of Order of Integration in double integrals, Change to Polar/Cylindrical/Spherical coordinates, and Application of Double and Triple Integrals to find Area and Volume.',
        keyFormulas: [
          'Summation of Series via Definite Integral: lim(n->∞) Σ (1/n) · f(r/n) = ∫_(a)^(b) f(x) dx  (replace r/n -> x, 1/n -> dx)',
          'Double Integral in Polar Coordinates: ∬_R f(x, y) dx dy = ∬_R f(r cos θ, r sin θ) · r dr dθ',
          'Area by Double Integral: Area = ∬_R dx dy = ∬_R r dr dθ   |   Volume by Triple Integral: V = ∭_V dx dy dz',
        ],
        keyConcepts: [
          {
            heading: 'Definite Integral as Limit of Sum & Beta-Gamma Functions',
            description:
              'Evaluates the limit of n-term series as n -> ∞ by converting the Riemann sum into a definite integral.',
            bulletPoints: [
              'Rule for Summation of Series: Express the general r-th term as (1/n)·f(r/n). Set r/n = x and 1/n = dx. Lower limit a = lim(n->∞) (lower r)/n, Upper limit b = lim(n->∞) (upper r)/n.',
              'Beta & Gamma Functions: Γ(n) = ∫₀^∞ e^(-x) x^(n-1) dx and B(m, n) = 2 ∫₀^(π/2) sin^(2m-1)θ cos^(2n-1)θ dθ = Γ(m)Γ(n)/Γ(m+n). Duplication formula: √π · Γ(2m) = 2^(2m-1) Γ(m) Γ(m + 1/2).',
            ],
          },
          {
            heading: 'Double & Triple Integrals and Change of Order of Integration',
            description:
              'Change of order of integration reverses `∫ dy ∫ dx` into `∫ dx ∫ dy` by sketching the region of integration and switching from vertical strips (parallel to Y-axis) to horizontal strips (parallel to X-axis).',
            bulletPoints: [
              'Why Change Order of Integration: Integrals like ∫₀^a ∫_y^a (e^x / x) dx dy cannot be integrated with respect to x first in elementary terms, but become trivial (∫₀^a (e^x / x) [∫₀^x dy] dx = ∫₀^a e^x dx) after changing the order to horizontal strips.',
              'Dirichlet’s Theorem for Volume: For x, y, z >= 0 and (x/a)^p + (y/b)^q + (z/c)^r <= 1, the triple integral reduces directly to Gamma functions.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Relation between Beta and Gamma functions: B(m, n) = Γ(m)Γ(n) / Γ(m+n).',
          'Evaluation of double integrals by changing the order of integration and changing to polar coordinates.',
        ],
        frequentExamQuestions: [
          {
            question: 'Change the order of integration in I = ∫₀^a ∫_y^a [x / (x² + y²)] dx dy and hence evaluate the integral.',
            marks: 7,
            answerSummary:
              'Sketch region bounded by x=y, x=a, y=0; switch to vertical strips: x from 0 to a, y from 0 to x. Evaluate ∫₀^a x · (1/x tan⁻¹(y/x))₀^x dx = πa/4.',
          },
          {
            question: 'Evaluate lim(n->∞) [n/(n²+1²) + n/(n²+2²) + ... + n/(n²+n²)] using definite integral as the limit of a sum. Also find the volume of the ellipsoid x²/a² + y²/b² + z²/c² = 1.',
            marks: 7,
            answerSummary:
              'Express general term as (1/n)·[1 / (1 + (r/n)²)], integrate ∫₀¹ dx/(1+x²) = [tan⁻¹x]₀¹ = π/4. Ellipsoid volume = (4/3)πabc.',
          },
        ],
      },
      {
        unitNumber: 4,
        unitTitle: 'Chapter 4: Matrix & Linear Algebra',
        weightage: '20% (14 Marks)',
        summary:
          'Definition, types (Symmetric, Skew-Symmetric, Orthogonal, Hermitian, Unitary), and properties of Matrices. Elementary row/column transformations, Rank of a Matrix (Echelon form & Normal form PAQ = [I_r 0; 0 0]). Consistency of Linear System of Equations (Non-homogeneous AX = B and Homogeneous AX = 0 using Rouche’s Theorem). Eigenvalues and Eigenvectors, Cayley-Hamilton Theorem and its application to find the Inverse (A⁻¹) and powers of a matrix.',
        keyFormulas: [
          'Rouche’s Consistency Theorem (AX = B, n unknowns): Rank(A) == Rank([A|B]) = r => Consistent (Unique solution if r = n; Infinitely many solutions if r < n). Rank(A) != Rank([A|B]) => Inconsistent (No solution).',
          'Eigenvalue Properties: Σ λ_i = Trace(A) (sum of diagonal elements)  ;  Π λ_i = |A| (Determinant of A)',
        ],
        keyConcepts: [
          {
            heading: 'Rank of Matrix & Consistency of Linear Equations (AX = B)',
            description:
              'The rank r of a matrix A is the order of its largest non-vanishing minor, or the number of non-zero rows in its Row-Echelon form.',
            bulletPoints: [
              'Echelon & Normal Form: Using elementary row operations (R_i <-> R_j, R_i -> k·R_i, R_i -> R_i + c·R_j), reduce [A | B] to upper triangular echelon form. Normal form reduces A to diag(I_r, 0) using both row and column operations.',
              'Homogeneous System (AX = 0): Always consistent (trivial solution X = 0 always exists). Non-trivial solutions exist if and only if Rank(A) < n (i.e., |A| = 0), with (n - r) linearly independent parameters.',
            ],
          },
          {
            heading: 'Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem',
            description:
              'For a square matrix A, scalars λ and non-zero vectors X satisfying AX = λX are the eigenvalues (characteristic roots) and eigenvectors.',
            bulletPoints: [
              'Characteristic Equation: Expand |A - λI| = 0. For a 3×3 matrix: λ³ - S1·λ² + S2·λ - |A| = 0, where S1 = Trace(A), S2 = sum of minors of main diagonal elements, and |A| = determinant.',
              'Cayley-Hamilton Theorem: Every square matrix satisfies its own characteristic equation: A³ - S1·A² + S2·A - |A|·I = 0. Pre-multiplying by A⁻¹ gives A⁻¹ = (1/|A|) [A² - S1·A + S2·I].',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Verification of Cayley-Hamilton Theorem for a 3×3 matrix and computation of A⁻¹ and A⁴.',
          'Investigation of values of λ and μ for which a system AX = B has (i) no solution, (ii) unique solution, (iii) infinite solutions.',
        ],
        frequentExamQuestions: [
          {
            question: 'Verify Cayley-Hamilton Theorem for the matrix A = [[2, -1, 1], [-1, 2, -1], [1, -1, 2]] and hence find A⁻¹ and A⁴.',
            marks: 7,
            answerSummary:
              'Find characteristic equation λ³ - 6λ² + 9λ - 4 = 0, verify A³ - 6A² + 9A - 4I = 0, and compute A⁻¹ = (1/4)(A² - 6A + 9I).',
          },
          {
            question: 'Investigate for what values of λ and μ the simultaneous equations x + y + z = 6, x + 2y + 3z = 10, x + 2y + λz = μ have (i) no solution, (ii) a unique solution, (iii) an infinite number of solutions.',
            marks: 7,
            answerSummary:
              'Reduce augmented matrix [A|B] to echelon form; last row is [0, 0, λ-3 | μ-10]. (i) λ=3, μ≠10 (No soln); (ii) λ≠3 (Unique soln); (iii) λ=3, μ=10 (Infinite solns).',
          },
        ],
      },
      {
        unitNumber: 5,
        unitTitle: 'Chapter 5: Boolean Algebra & Graph Theory',
        weightage: '20% (14 Marks)',
        summary:
          'Boolean Algebra (from Drive notes: Boolean algebra 01 & 02.pdf): Algebra of logic, Huntington’s postulates, Principle of Duality, basic theorems (Idempotent, Boundedness, Absorption, Involution, De-Morgan’s), Boolean expressions and Boolean functions (Disjunctive & Conjunctive Normal Forms). Graph Theory: Definition of a Graph G=(V, E), Types of Graphs (Simple, Multigraph, Complete K_n, Bipartite K_{m,n}, Regular), Subgraphs, Isomorphism, Walks, Paths, Circuits, Eulerian and Hamiltonian graphs.',
        keyFormulas: [
          'Handshaking Lemma: Σ deg(v_i) = 2|E|  (Sum of degrees of all vertices = twice the number of edges)',
          'Edges in Complete Graph K_n = n(n - 1) / 2   ;   Edges in Complete Bipartite Graph K_(m,n) = m · n',
          'Euler’s Formula for Connected Planar Graph: V - E + R = 2  (Vertices - Edges + Regions = 2)',
        ],
        keyConcepts: [
          {
            heading: 'Boolean Algebra Axioms, Duality & Normal Forms',
            description:
              'A Boolean Algebra (B, +, ·, ’, 0, 1) is a complemented distributive lattice satisfying closure, commutativity, distributivity, identity, and complement laws.',
            bulletPoints: [
              'Principle of Duality: The dual of any valid Boolean theorem is obtained by interchanging OR (+) and AND (·) operators and interchanging identity elements 0 and 1.',
              'Boolean Theorems Proof: Prove Absorption a + (a·b) = a, Involution (a’)’ = a, uniqueness of complement, and De-Morgan’s laws directly from Huntington’s postulates.',
            ],
          },
          {
            heading: 'Graph Theory: Walks, Paths, Circuits, Euler & Hamilton Graphs',
            description:
              'A graph G = (V, E) consists of a non-empty vertex set V and an edge set E.',
            bulletPoints: [
              'Handshaking Theorem Corollary: In any undirected graph, the number of vertices of ODD degree is always EVEN.',
              'Walk, Trail, Path & Circuit: A Walk is an alternating sequence of vertices and edges; a Trail has no repeated edges; a Path is a walk with no repeated vertices; a Circuit/Cycle is a closed trail/path starting and ending at the same vertex.',
              'Eulerian vs Hamiltonian Graph: An Eulerian circuit traverses every EDGE of G exactly once (exists iff G is connected and every vertex has EVEN degree). A Hamiltonian cycle visits every VERTEX of G exactly once.',
            ],
          },
        ],
        derivationsOrTheorems: [
          'Algebraic proofs of Boolean Absorption, Idempotent, and De-Morgan’s theorems from Huntington axioms.',
          'Proof of Handshaking Lemma and Corollary (number of odd-degree vertices is always even).',
        ],
        frequentExamQuestions: [
          {
            question: 'State the axioms (Huntington’s postulates) of a Boolean Algebra (B, +, ·, ’, 0, 1) and prove: (i) Idempotent laws, (ii) Absorption laws, and (iii) De-Morgan’s laws.',
            marks: 7,
            answerSummary:
              'State Commutative, Distributive, Identity, and Complement postulates, and derive each theorem step-by-step citing the exact axiom used.',
          },
          {
            question: 'Define Walk, Path, Circuit, Complete Graph, Bipartite Graph, and Eulerian Graph. Prove that in any graph the sum of degrees of all vertices is twice the number of edges, and the number of odd-degree vertices is even.',
            marks: 7,
            answerSummary:
              'Give clear definitions with graph sketches, prove Σ deg(v) = 2e by counting edge endpoints, and split sum into even + odd degree vertices.',
          },
        ],
      },
    ],
  },
};
