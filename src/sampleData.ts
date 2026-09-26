import { StudyKit, DifficultyLevel } from './types';

export const SAMPLE_LECTURE_NOTES = `COURSE MODULE: CELLULAR BIOENERGETICS, GLYCOLYSIS & OXIDATIVE PHOSPHORYLATION

1. Overview of Cellular Respiration and ATP Currency
Adenosine triphosphate (ATP) serves as the primary energy currency of the cell because its terminal phosphoanhydride bonds release substantial free energy (approximately -30.5 kJ/mol under standard biochemical conditions) when hydrolyzed to ADP and inorganic phosphate (Pi). Cellular respiration oxidizes organic fuel molecules—primarily glucose (C6H12O6)—through a series of controlled redox reactions rather than a single explosive combustion step, allowing energy to be captured efficiently into ATP and reduced electron carriers (NADH and FADH2).

2. Glycolysis (Embden-Meyerhof-Parnas Pathway)
Glycolysis occurs in the cytosol of all living cells and does not require molecular oxygen (O2). It converts one 6-carbon glucose molecule into two 3-carbon pyruvate molecules through ten enzymatic reactions divided into two phases:
- Preparatory (Investment) Phase (Steps 1–5): Consumes 2 ATP molecules per glucose. Hexokinase phosphorylates glucose to glucose-6-phosphate (G6P), trapping it inside the cell. Phosphofructokinase-1 (PFK-1) catalyzes the committed, rate-limiting step: phosphorylation of fructose-6-phosphate to fructose-1,6-bisphosphate. PFK-1 is allosterically inhibited by high levels of ATP and citrate, and allosterically activated by AMP and ADP.
- Payoff Phase (Steps 6–10): Produces 4 ATP molecules (via substrate-level phosphorylation catalyzed by phosphoglycerate kinase and pyruvate kinase) and 2 NADH molecules. The net yield of glycolysis per molecule of glucose is 2 ATP, 2 NADH, and 2 Pyruvate.

3. Pyruvate Oxidation (Link Reaction)
In eukaryotic cells under aerobic conditions, pyruvate is transported into the mitochondrial matrix via the mitochondrial pyruvate carrier. The Pyruvate Dehydrogenase Complex (PDC) catalyzes the oxidative decarboxylation of pyruvate into Acetyl-CoA (a 2-carbon acetyl group attached to Coenzyme A), releasing one molecule of CO2 and reducing one NAD+ to NADH per pyruvate (2 CO2 and 2 NADH per original glucose).

4. The Citric Acid Cycle (Krebs Cycle / TCA Cycle)
Taking place in the mitochondrial matrix, the Citric Acid Cycle oxidizes Acetyl-CoA completely to CO2.
- Citrate synthase condenses the 2-carbon Acetyl-CoA with 4-carbon oxaloacetate to form 6-carbon citrate.
- Isocitrate dehydrogenase and alpha-ketoglutarate dehydrogenase catalyze two successive oxidative decarboxylations, releasing 2 CO2 and generating 2 NADH per Acetyl-CoA.
- Succinyl-CoA synthetase generates 1 GTP (or ATP) by substrate-level phosphorylation.
- Succinate dehydrogenase (which is also Complex II of the electron transport chain, embedded in the inner mitochondrial membrane) oxidizes succinate to fumarate, reducing FAD to FADH2.
- Malate dehydrogenase oxidizes malate back to oxaloacetate, generating a third NADH.
Per glucose molecule (2 turns of the cycle), the TCA cycle yields 6 NADH, 2 FADH2, 2 ATP (or GTP), and 4 CO2.

5. Electron Transport Chain (ETC) and Proton-Motive Force
Located in the cristae (infoldings) of the inner mitochondrial membrane, the ETC comprises four multi-protein complexes (Complexes I–IV) plus two mobile electron carriers: ubiquinone (Coenzyme Q, lipid-soluble) and cytochrome c (water-soluble in the intermembrane space).
- Complex I (NADH dehydrogenase) accepts electrons from NADH and pumps 4 H+ protons from the matrix into the intermembrane space.
- Complex II (Succinate dehydrogenase) accepts electrons from FADH2 and transfers them to ubiquinone without pumping protons across the membrane.
- Complex III (Cytochrome bc1 complex) transfers electrons from ubiquinol to cytochrome c via the Q-cycle, pumping 4 H+ protons into the intermembrane space.
- Complex IV (Cytochrome c oxidase) transfers electrons from cytochrome c to molecular oxygen (O2)—the terminal electron acceptor—forming H2O, while pumping 2 H+ protons per electron pair.
Because NADH enters at Complex I (10 H+ pumped per NADH) whereas FADH2 enters at Complex II (6 H+ pumped per FADH2), NADH yields approximately 2.5 ATP while FADH2 yields approximately 1.5 ATP.

6. Chemiosmosis and ATP Synthase (Complex V)
According to Peter Mitchell's chemiosmotic coupling hypothesis, the pumping of protons into the intermembrane space establishes an electrochemical proton gradient (proton-motive force) consisting of both a pH gradient (chemical potential, intermembrane space more acidic than matrix) and a transmembrane electrical potential (electrical potential, intermembrane space positively charged relative to matrix).
ATP Synthase (F0F1-ATPase) harnesses this proton-motive force:
- The F0 rotor domain, embedded in the inner membrane, forms a proton channel; as H+ ions flow back down their electrochemical gradient into the matrix, the c-ring and gamma-stalk rotate mechanically.
- The F1 catalytic head domain, protruding into the matrix, undergoes conformational changes (Open, Loose, Tight states as described by Paul Boyer's binding-change mechanism) to synthesize ATP from ADP and Pi.
Chemical uncouplers (such as 2,4-dinitrophenol or DNP) and physiological uncoupling proteins (UCP1 / thermogenin in brown adipose tissue) make the inner mitochondrial membrane permeable to protons, dissipating the proton gradient as heat without ATP synthesis while accelerating electron transport and oxygen consumption.

7. Anaerobic Pathways: Lactic Acid and Alcoholic Fermentation
When oxygen is absent or the ETC is blocked, cells must regenerate NAD+ from NADH in the cytosol so that Glyceraldehyde-3-phosphate dehydrogenase (Step 6 of glycolysis) can continue operating.
- Lactic Acid Fermentation: In skeletal muscle during intense exertion and in erythrocytes (which lack mitochondria), lactate dehydrogenase reduces pyruvate directly to lactate, oxidizing NADH back to NAD+.
- Alcoholic Fermentation: In yeast, pyruvate decarboxylase removes CO2 from pyruvate to form acetaldehyde, and alcohol dehydrogenase reduces acetaldehyde to ethanol, regenerating NAD+.`;

export const SAMPLE_KITS_BY_DIFFICULTY: Record<DifficultyLevel, StudyKit> = {
  easy: {
    id: 'sample-bio-easy',
    courseTitle: 'Cellular Bioenergetics, Glycolysis & Oxidative Phosphorylation',
    sourceSummary:
      'Foundational study kit covering ATP hydrolysis, the two phases of cytosolic glycolysis, mitochondrial pyruvate oxidation, the Citric Acid Cycle, the Electron Transport Chain, chemiosmosis, and anaerobic fermentation.',
    difficulty: 'easy',
    createdAt: '2026-09-25T10:00:00Z',
    studySchedule: [
      {
        day: 'Day 1',
        phase: 'Stage 1: Cytosolic Pathways & ATP Fundamentals',
        focusConcepts: 'ATP Currency, Glycolysis Investment & Payoff Phases, Anaerobic Fermentation',
        actionItems: [
          'Review the 6 core concept summaries and trace the carbon count from 6C glucose to two 3C pyruvates.',
          'Complete the 10 JSON flashcards until you can recall every enzyme and net ATP/NADH yield without hesitation.',
        ],
        targetMilestone: '100% accuracy on Glycolysis & Fermentation flashcards',
      },
      {
        day: 'Day 2',
        phase: 'Stage 2: Mitochondrial Matrix Reactions',
        focusConcepts: 'Pyruvate Dehydrogenase Complex (PDC) & Citric Acid Cycle (TCA)',
        actionItems: [
          'Map the 4-carbon oxaloacetate + 2-carbon Acetyl-CoA condensation to 6-carbon citrate.',
          'Practice the Multiple Choice and Short Answer questions at Easy level.',
        ],
        targetMilestone: 'Score 6/6 on Practice MCQs and self-grade Short Answers',
      },
      {
        day: 'Day 3',
        phase: 'Stage 3: Inner Membrane Electron Transport & Chemiosmosis',
        focusConcepts: 'Complexes I–IV, Ubiquinone, Cytochrome c, and F0F1-ATP Synthase',
        actionItems: [
          'Contrast proton pumping between NADH (Complex I entry, 10 H+) and FADH2 (Complex II entry, 6 H+).',
          'Work through the 4 Real-World Application questions on uncouplers and oxygen deprivation.',
        ],
        targetMilestone: 'Explain the binding-change mechanism and DNP uncoupling in plain prose',
      },
      {
        day: 'Day 4',
        phase: 'Stage 4: Timed Full-Length Mock Examination',
        focusConcepts: 'Full Module Synthesis (Model Question Papers 1 & 2)',
        actionItems: [
          'Sit Model Question Paper 1 (100 Marks) under closed-book exam conditions.',
          'Audit missed marks against the model answers and complete Model Question Paper 2.',
        ],
        targetMilestone: 'Achieve >= 85/100 (Distinction Rank threshold) on both Model Papers',
      },
    ],
    keyConcepts: [
      {
        id: 'concept-1',
        title: 'ATP as the Cellular Energy Currency & Redox Capture',
        summary: 'Cells store and transfer chemical energy safely using ATP and reduced electron carriers rather than releasing energy all at once.',
        points: [
          'Adenosine triphosphate (ATP) releases roughly -30.5 kJ/mol of free energy when its terminal phosphoanhydride bond is hydrolyzed into ADP and inorganic phosphate (Pi).',
          'Instead of burning glucose in a single explosive reaction, cellular respiration oxidizes glucose (C6H12O6) in controlled enzymatic steps.',
          'Energy released during oxidation is conserved in two forms: direct ATP synthesis and reduced electron carriers (NADH and FADH2).',
          'Controlled stepwise oxidation prevents thermal damage to the cell and maximizes chemical energy capture efficiency.',
        ],
      },
      {
        id: 'concept-2',
        title: 'Glycolysis: Investment vs. Payoff in the Cytosol',
        summary: 'A 10-step anaerobic pathway in the cytosol that splits one 6-carbon glucose into two 3-carbon pyruvates.',
        points: [
          'Glycolysis takes place entirely in the cytosol and does not require molecular oxygen (O2) to operate.',
          'The Preparatory (Investment) Phase (Steps 1–5) consumes 2 ATP molecules to phosphorylate glucose and trap it in the cell.',
          'Phosphofructokinase-1 (PFK-1) catalyzes the committed, rate-limiting step and is inhibited by high ATP/citrate and activated by AMP/ADP.',
          'The Payoff Phase (Steps 6–10) generates 4 ATP via substrate-level phosphorylation and 2 NADH, giving a net yield of 2 ATP, 2 NADH, and 2 Pyruvate per glucose.',
        ],
      },
      {
        id: 'concept-3',
        title: 'Pyruvate Oxidation & The Citric Acid Cycle (TCA)',
        summary: 'Inside the mitochondrial matrix, carbon skeletons are completely oxidized to CO2 while loading electrons onto NADH and FADH2.',
        points: [
          'Under aerobic conditions, pyruvate enters the mitochondrial matrix and is converted by the Pyruvate Dehydrogenase Complex (PDC) into Acetyl-CoA, releasing 1 CO2 and 1 NADH per pyruvate.',
          'Citrate synthase initiates the Citric Acid Cycle by combining 2-carbon Acetyl-CoA with 4-carbon oxaloacetate to form 6-carbon citrate.',
          'Two oxidative decarboxylation steps (catalyzed by isocitrate dehydrogenase and alpha-ketoglutarate dehydrogenase) release 2 CO2 and produce 2 NADH per cycle turn.',
          'Across two turns of the cycle (one per pyruvate from a single glucose), the TCA cycle produces 6 NADH, 2 FADH2, 2 ATP/GTP, and 4 CO2.',
        ],
      },
      {
        id: 'concept-4',
        title: 'The Electron Transport Chain (Complexes I–IV)',
        summary: 'Embedded in the inner mitochondrial membrane cristae, protein complexes pass electrons to oxygen while pumping protons.',
        points: [
          'Complex I accepts electrons from NADH and pumps 4 H+ protons from the matrix into the intermembrane space.',
          'Complex II (succinate dehydrogenase) accepts electrons from FADH2 and passes them to ubiquinone (CoQ) without pumping any protons.',
          'Complex III passes electrons from ubiquinol to water-soluble cytochrome c while pumping 4 H+ protons across the membrane.',
          'Complex IV transfers electrons from cytochrome c to molecular oxygen (O2, the terminal electron acceptor) to form H2O and pumps 2 H+ protons.',
          'Because NADH pumps 10 H+ total while FADH2 bypasses Complex I and pumps 6 H+, each NADH yields ~2.5 ATP and each FADH2 yields ~1.5 ATP.',
        ],
      },
      {
        id: 'concept-5',
        title: 'Chemiosmosis, ATP Synthase & Uncoupling',
        summary: 'Proton flow back into the matrix drives mechanical rotation of ATP Synthase to manufacture ATP.',
        points: [
          'Proton pumping creates a proton-motive force across the inner membrane consisting of a chemical pH gradient and an electrical charge gradient.',
          'ATP Synthase (Complex V) contains an F0 membrane proton channel and an F1 catalytic head protruding into the matrix.',
          'As H+ ions flow down their gradient through F0, mechanical rotation drives conformational changes (Open, Loose, Tight) in F1 to combine ADP + Pi into ATP.',
          'Uncouplers like 2,4-dinitrophenol (DNP) and UCP1 (thermogenin in brown fat) let protons leak across the membrane, releasing energy as heat instead of making ATP.',
        ],
      },
      {
        id: 'concept-6',
        title: 'Anaerobic Fermentation & NAD+ Regeneration',
        summary: 'When oxygen is absent, cells reduce pyruvate or acetaldehyde in the cytosol strictly to recycle NAD+ for glycolysis.',
        points: [
          'Without oxygen, the Electron Transport Chain halts and NADH accumulates, depleting the cytosolic pool of oxidized NAD+.',
          'Glycolysis requires NAD+ at Step 6 (Glyceraldehyde-3-phosphate dehydrogenase) to continue generating 2 net ATP.',
          'In skeletal muscle and red blood cells (erythrocytes), lactate dehydrogenase converts pyruvate to lactate while oxidizing NADH back to NAD+.',
          'In yeast, pyruvate is decarboxylated to acetaldehyde (releasing CO2) and then reduced to ethanol by alcohol dehydrogenase to regenerate NAD+.',
        ],
      },
    ],
    practiceQuestions: {
      mcq: [
        {
          id: 'mcq-e1',
          question: 'Where does glycolysis take place within the cell?',
          options: ['Mitochondrial matrix', 'Cytosol', 'Inner mitochondrial membrane', 'Intermembrane space'],
          correctAnswerIndex: 1,
          correctAnswer: 'Cytosol',
          explanation: 'As stated in the material, glycolysis occurs in the cytosol of all living cells and does not require oxygen.',
        },
        {
          id: 'mcq-e2',
          question: 'What is the net yield of ATP molecules produced directly by glycolysis per molecule of glucose?',
          options: ['1 ATP', '2 ATP', '4 ATP', '6 ATP'],
          correctAnswerIndex: 1,
          correctAnswer: '2 ATP',
          explanation: 'Glycolysis invests 2 ATP in the preparatory phase and produces 4 ATP in the payoff phase, resulting in a net gain of 2 ATP per glucose.',
        },
        {
          id: 'mcq-e3',
          question: 'Which enzyme catalyzes the committed, rate-limiting step of glycolysis?',
          options: ['Hexokinase', 'Pyruvate kinase', 'Phosphofructokinase-1 (PFK-1)', 'Citrate synthase'],
          correctAnswerIndex: 2,
          correctAnswer: 'Phosphofructokinase-1 (PFK-1)',
          explanation: 'Phosphofructokinase-1 (PFK-1) phosphorylates fructose-6-phosphate to fructose-1,6-bisphosphate and is the committed rate-limiting step.',
        },
        {
          id: 'mcq-e4',
          question: 'Which molecule serves as the terminal electron acceptor at Complex IV of the Electron Transport Chain?',
          options: ['NAD+', 'Ubiquinone (CoQ)', 'Cytochrome c', 'Molecular oxygen (O2)'],
          correctAnswerIndex: 3,
          correctAnswer: 'Molecular oxygen (O2)',
          explanation: 'Complex IV (Cytochrome c oxidase) transfers electrons from cytochrome c to molecular oxygen (O2), forming water (H2O).',
        },
        {
          id: 'mcq-e5',
          question: 'Which Electron Transport Chain complex does NOT pump protons across the inner mitochondrial membrane?',
          options: ['Complex I', 'Complex II', 'Complex III', 'Complex IV'],
          correctAnswerIndex: 1,
          correctAnswer: 'Complex II',
          explanation: 'Complex II (Succinate dehydrogenase) accepts electrons from FADH2 and transfers them to ubiquinone without pumping H+ protons.',
        },
        {
          id: 'mcq-e6',
          question: 'What is the primary biochemical purpose of lactic acid fermentation in oxygen-deprived muscle cells?',
          options: [
            'To pump protons into the intermembrane space',
            'To regenerate NAD+ from NADH so glycolysis can continue',
            'To produce Acetyl-CoA for the Citric Acid Cycle',
            'To synthesize GTP by substrate-level phosphorylation',
          ],
          correctAnswerIndex: 1,
          correctAnswer: 'To regenerate NAD+ from NADH so glycolysis can continue',
          explanation: 'Fermentation oxidizes NADH back to NAD+ so Glyceraldehyde-3-phosphate dehydrogenase (Step 6 of glycolysis) can keep running.',
        },
      ],
      shortAnswer: [
        {
          id: 'sa-e1',
          question: 'Distinguish between the Preparatory Phase and the Payoff Phase of glycolysis in terms of ATP consumption and production.',
          conciseHighScoringAnswer:
            'The Preparatory (Investment) Phase (Steps 1–5) consumes 2 ATP molecules per glucose to phosphorylate intermediates (via hexokinase and PFK-1). The Payoff Phase (Steps 6–10) generates 4 ATP molecules via substrate-level phosphorylation and 2 NADH, yielding a net gain of 2 ATP per glucose.',
          scoringChecklist: [
            'States 2 ATP consumed in Preparatory Phase (Steps 1–5)',
            'States 4 ATP and 2 NADH produced in Payoff Phase (Steps 6–10)',
            'Concludes with net yield of 2 ATP per glucose',
          ],
        },
        {
          id: 'sa-e2',
          question: 'Explain how the Pyruvate Dehydrogenase Complex (PDC) links glycolysis to the Citric Acid Cycle.',
          conciseHighScoringAnswer:
            'After pyruvate is transported from the cytosol into the mitochondrial matrix, the Pyruvate Dehydrogenase Complex (PDC) catalyzes its oxidative decarboxylation into a 2-carbon Acetyl-CoA molecule, releasing 1 molecule of CO2 and reducing 1 NAD+ to NADH per pyruvate.',
          scoringChecklist: [
            'Identifies transport into mitochondrial matrix',
            'Mentions conversion of 3C pyruvate to 2C Acetyl-CoA',
            'Notes release of CO2 and reduction of NAD+ to NADH',
          ],
        },
        {
          id: 'sa-e3',
          question: 'Why does the oxidation of one NADH molecule yield more ATP (~2.5 ATP) than one FADH2 molecule (~1.5 ATP)?',
          conciseHighScoringAnswer:
            'NADH donates its electrons to Complex I, resulting in a total of 10 H+ protons pumped across the inner membrane (4 at Complex I, 4 at Complex III, 2 at Complex IV). FADH2 donates electrons at Complex II, which pumps 0 protons, so only 6 H+ protons are pumped per FADH2, driving less ATP synthesis.',
          scoringChecklist: [
            'NADH enters at Complex I (10 H+ pumped)',
            'FADH2 enters at Complex II which pumps no protons (6 H+ pumped)',
            'Links proton count to ~2.5 ATP vs ~1.5 ATP yield',
          ],
        },
        {
          id: 'sa-e4',
          question: 'What are the two components of the proton-motive force established across the inner mitochondrial membrane?',
          conciseHighScoringAnswer:
            'The proton-motive force consists of (1) a chemical potential (pH gradient), where the intermembrane space is more acidic (higher H+ concentration) than the matrix, and (2) an electrical potential, where the intermembrane space is positively charged relative to the matrix.',
          scoringChecklist: [
            'Identifies the pH gradient (chemical potential)',
            'Identifies the transmembrane electrical potential',
            'Correctly states intermembrane space is more acidic / positively charged',
          ],
        },
        {
          id: 'sa-e5',
          question: 'Compare the end-products of lactic acid fermentation and alcoholic fermentation.',
          conciseHighScoringAnswer:
            'In lactic acid fermentation, lactate dehydrogenase directly reduces pyruvate to lactate without releasing CO2. In alcoholic fermentation (in yeast), pyruvate decarboxylase first removes CO2 to form acetaldehyde, and alcohol dehydrogenase reduces acetaldehyde to ethanol. Both regenerate NAD+.',
          scoringChecklist: [
            'Lactic acid fermentation produces lactate with no CO2 release',
            'Alcoholic fermentation produces ethanol + CO2 via acetaldehyde',
            'Both pathways oxidize NADH back to NAD+',
          ],
        },
      ],
      applicationBased: [
        {
          id: 'app-e1',
          realWorldScenario:
            'Mature human red blood cells (erythrocytes) do not contain any mitochondria, yet they constantly require ATP to maintain ion pumps across their cell membranes.',
          question: 'Based strictly on the study material, how do erythrocytes generate ATP and what byproduct do they release?',
          applicationModelAnswer:
            'Because erythrocytes lack mitochondria, they cannot perform pyruvate oxidation, the Citric Acid Cycle, or oxidative phosphorylation. They rely exclusively on cytosolic glycolysis (yielding 2 net ATP per glucose via substrate-level phosphorylation) and use lactate dehydrogenase to reduce pyruvate to lactate, regenerating NAD+ so glycolysis can continue.',
          conceptApplied: 'Cytosolic Glycolysis & Lactic Acid Fermentation',
        },
        {
          id: 'app-e2',
          realWorldScenario:
            'Hibernating mammals possess specialized brown adipose tissue rich in mitochondria containing Uncoupling Protein 1 (UCP1 / thermogenin).',
          question: 'How does UCP1 help a hibernating mammal stay warm without shivering, and how does this affect ATP production in those mitochondria?',
          applicationModelAnswer:
            'UCP1 makes the inner mitochondrial membrane permeable to H+ protons, allowing protons pumped by Complexes I, III, and IV to flow back into the matrix bypassing ATP Synthase. Instead of driving ATP synthesis, the potential energy of the proton-motive force is dissipated directly as heat to maintain body temperature.',
          conceptApplied: 'Chemiosmotic Uncoupling (UCP1 / Thermogenin)',
        },
        {
          id: 'app-e3',
          realWorldScenario:
            'A resting muscle cell has accumulated high intracellular concentrations of ATP and citrate, while AMP levels are very low.',
          question: 'What immediate effect will this intracellular state have on the rate of glycolysis, and which specific enzyme mediates this control?',
          applicationModelAnswer:
            'The rate of glycolysis will slow down markedly. High levels of ATP and citrate allosterically inhibit Phosphofructokinase-1 (PFK-1), which catalyzes the committed, rate-limiting step of glycolysis (fructose-6-phosphate to fructose-1,6-bisphosphate).',
          conceptApplied: 'Allosteric Regulation of Phosphofructokinase-1 (PFK-1)',
        },
        {
          id: 'app-e4',
          realWorldScenario:
            'A baker seals yeast and glucose solution inside an airtight fermentation vessel to brew beverage alcohol.',
          question: 'Why does pressure build up inside the sealed vessel while ethanol accumulates, and which two enzymes are responsible?',
          applicationModelAnswer:
            'In the absence of oxygen, yeast perform alcoholic fermentation. First, pyruvate decarboxylase removes a carboxyl group from pyruvate to form acetaldehyde, releasing carbon dioxide (CO2) gas that builds pressure in the sealed vessel. Second, alcohol dehydrogenase reduces acetaldehyde to ethanol while regenerating NAD+.',
          conceptApplied: 'Alcoholic Fermentation in Yeast',
        },
      ],
    },
    flashcards: [
      {
        front: 'ATP Hydrolysis Standard Free Energy',
        back: 'Releases approximately -30.5 kJ/mol when hydrolyzed to ADP and inorganic phosphate (Pi).',
      },
      {
        front: 'Phosphofructokinase-1 (PFK-1)',
        back: 'Catalyzes the committed, rate-limiting step of glycolysis (F6P to F-1,6-BP); inhibited by ATP/citrate and activated by AMP/ADP.',
      },
      {
        front: 'Net Yield of Glycolysis (per Glucose)',
        back: '2 ATP (4 produced minus 2 invested), 2 NADH, and 2 Pyruvate molecules in the cytosol.',
      },
      {
        front: 'Pyruvate Dehydrogenase Complex (PDC)',
        back: 'Mitochondrial matrix enzyme complex that converts pyruvate into Acetyl-CoA, releasing 1 CO2 and 1 NADH per pyruvate.',
      },
      {
        front: 'Citrate Synthase',
        back: 'First enzyme of the Citric Acid Cycle; condenses 2-carbon Acetyl-CoA with 4-carbon oxaloacetate to form 6-carbon citrate.',
      },
      {
        front: 'Complex II (Succinate Dehydrogenase)',
        back: 'Dual TCA cycle and ETC enzyme that oxidizes succinate to fumarate (producing FADH2) and passes electrons to ubiquinone without pumping protons.',
      },
      {
        front: 'Ubiquinone (CoQ) vs. Cytochrome c',
        back: 'Two mobile electron carriers in the ETC: Ubiquinone is lipid-soluble inside the inner membrane; Cytochrome c is water-soluble in the intermembrane space.',
      },
      {
        front: 'Proton-Motive Force',
        back: 'Electrochemical H+ gradient across the inner mitochondrial membrane combining a pH gradient and transmembrane electrical potential.',
      },
      {
        front: 'F0 and F1 Domains of ATP Synthase',
        back: 'F0 is the membrane-embedded proton channel rotor; F1 is the matrix-facing catalytic head that synthesizes ATP via Open, Loose, and Tight conformations.',
      },
      {
        front: '2,4-Dinitrophenol (DNP) & UCP1',
        back: 'Uncoupling agents that make the inner mitochondrial membrane permeable to H+ protons, dissipating the proton gradient as heat instead of synthesizing ATP.',
      },
    ],
    exams: [
      {
        paperNumber: 1,
        title: 'Model Question Paper 1 — Cellular Bioenergetics (Foundational)',
        duration: '3 Hours',
        totalMarks: 100,
        mcqQuestions: [
          {
            questionNumber: 1,
            question: 'Approximately how much standard free energy is released when the terminal phosphoanhydride bond of ATP is hydrolyzed?',
            options: ['-7.3 kJ/mol', '-15.2 kJ/mol', '-30.5 kJ/mol', '-68.0 kJ/mol'],
            correctAnswer: '-30.5 kJ/mol',
          },
          {
            questionNumber: 2,
            question: 'Which enzyme phosphorylates glucose to glucose-6-phosphate in Step 1 of glycolysis?',
            options: ['Hexokinase', 'Citrate synthase', 'Pyruvate kinase', 'Succinate dehydrogenase'],
            correctAnswer: 'Hexokinase',
          },
          {
            questionNumber: 3,
            question: 'How many ATP molecules are invested during the Preparatory Phase (Steps 1–5) of glycolysis per glucose?',
            options: ['1 ATP', '2 ATP', '4 ATP', '6 ATP'],
            correctAnswer: '2 ATP',
          },
          {
            questionNumber: 4,
            question: 'Which allosteric effectors activate Phosphofructokinase-1 (PFK-1)?',
            options: ['ATP and Citrate', 'AMP and ADP', 'NADH and FADH2', 'Acetyl-CoA and GTP'],
            correctAnswer: 'AMP and ADP',
          },
          {
            questionNumber: 5,
            question: 'Where does the Citric Acid Cycle take place in eukaryotic cells?',
            options: ['Cytosol', 'Intermembrane space', 'Mitochondrial matrix', 'Outer mitochondrial membrane'],
            correctAnswer: 'Mitochondrial matrix',
          },
          {
            questionNumber: 6,
            question: 'Which 4-carbon molecule condenses with Acetyl-CoA to form citrate?',
            options: ['Succinate', 'Fumarate', 'Oxaloacetate', 'Malate'],
            correctAnswer: 'Oxaloacetate',
          },
          {
            questionNumber: 7,
            question: 'How many total NADH molecules are generated by the Citric Acid Cycle per single molecule of glucose (two turns)?',
            options: ['2 NADH', '3 NADH', '6 NADH', '8 NADH'],
            correctAnswer: '6 NADH',
          },
          {
            questionNumber: 8,
            question: 'Which mobile electron carrier is lipid-soluble within the inner mitochondrial membrane?',
            options: ['Cytochrome c', 'Ubiquinone (Coenzyme Q)', 'NAD+', 'Flavoprotein'],
            correctAnswer: 'Ubiquinone (Coenzyme Q)',
          },
          {
            questionNumber: 9,
            question: 'How many H+ protons are pumped into the intermembrane space per NADH oxidized through the Electron Transport Chain?',
            options: ['4 H+', '6 H+', '10 H+', '12 H+'],
            correctAnswer: '10 H+',
          },
          {
            questionNumber: 10,
            question: 'In lactic acid fermentation, which enzyme reduces pyruvate directly to lactate?',
            options: ['Pyruvate decarboxylase', 'Alcohol dehydrogenase', 'Lactate dehydrogenase', 'Malate dehydrogenase'],
            correctAnswer: 'Lactate dehydrogenase',
          },
        ],
        shortAnswerQuestions: [
          {
            questionNumber: 1,
            question: 'Explain why cells oxidize glucose through multi-step enzymatic pathways rather than a single combustion step.',
            modelAnswer: 'Stepwise enzymatic oxidation allows free energy to be captured efficiently into chemical intermediates (ATP, NADH, and FADH2) rather than releasing all energy at once as destructive heat.',
          },
          {
            questionNumber: 2,
            question: 'Describe the role of Hexokinase in the first step of glycolysis.',
            modelAnswer: 'Hexokinase transfers a phosphate group from ATP to glucose to form glucose-6-phosphate (G6P), consuming 1 ATP and trapping the negatively charged G6P inside the cytosol.',
          },
          {
            questionNumber: 3,
            question: 'How is Phosphofructokinase-1 (PFK-1) regulated by cellular energy status?',
            modelAnswer: 'PFK-1 is allosterically inhibited when energy reserves are abundant (high ATP and citrate) and allosterically activated when energy charge is low (elevated AMP and ADP).',
          },
          {
            questionNumber: 4,
            question: 'Summarize the reactants and products of the Pyruvate Dehydrogenase Complex (PDC) reaction per glucose molecule.',
            modelAnswer: 'Per glucose molecule (2 pyruvates), PDC oxidatively decarboxylates 2 pyruvates in the mitochondrial matrix to form 2 Acetyl-CoA, 2 NADH, and 2 CO2 molecules.',
          },
          {
            questionNumber: 5,
            question: 'Identify the single step in the Citric Acid Cycle that performs substrate-level phosphorylation.',
            modelAnswer: 'Succinyl-CoA synthetase catalyzes substrate-level phosphorylation in the Citric Acid Cycle, generating 1 GTP (or ATP) per Acetyl-CoA (2 per glucose).',
          },
          {
            questionNumber: 6,
            question: 'Explain the unique dual role of Succinate Dehydrogenase in mitochondrial metabolism.',
            modelAnswer: 'Succinate dehydrogenase is both an enzyme of the Citric Acid Cycle (oxidizing succinate to fumarate while reducing FAD to FADH2) and Complex II of the Electron Transport Chain embedded in the inner mitochondrial membrane.',
          },
          {
            questionNumber: 7,
            question: 'List the four protein complexes of the Electron Transport Chain and state how many protons each pumps per electron pair.',
            modelAnswer: 'Complex I pumps 4 H+; Complex II pumps 0 H+; Complex III pumps 4 H+; Complex IV pumps 2 H+ per electron pair transferred to O2.',
          },
          {
            questionNumber: 8,
            question: 'Describe the structural difference and functional roles of the F0 and F1 subunits of ATP Synthase.',
            modelAnswer: 'The F0 domain is embedded in the inner mitochondrial membrane and acts as a proton channel rotor driven by H+ influx; the F1 domain protrudes into the matrix and catalyzes ATP synthesis from ADP and Pi via mechanical rotation.',
          },
          {
            questionNumber: 9,
            question: 'What is Paul Boyer’s binding-change mechanism for ATP Synthase?',
            modelAnswer: 'As the gamma-stalk rotates inside F1, the catalytic subunits cycle through three conformational states—Open (releases ATP), Loose (binds ADP + Pi), and Tight (catalyzes ATP formation).',
          },
          {
            questionNumber: 10,
            question: 'Why does glycolysis stop immediately under anaerobic conditions if fermentation does not occur?',
            modelAnswer: 'Without oxygen, the ETC cannot oxidize NADH back to NAD+. Once cytosolic NAD+ is depleted, Glyceraldehyde-3-phosphate dehydrogenase (Step 6 of glycolysis) lacks its required cofactor and glycolysis halts.',
          },
        ],
        longAnswerQuestions: [
          {
            questionNumber: 1,
            question: 'Trace the complete path of carbon atoms from one 6-carbon glucose molecule until all 6 carbons are released as CO2 during aerobic respiration.',
            modelAnswer: 'In the cytosol, one 6C glucose is split during glycolysis into two 3C pyruvate molecules (0 CO2 released). After transport into the mitochondrial matrix, the Pyruvate Dehydrogenase Complex removes 1 carbon from each pyruvate as CO2 (2 CO2 total), forming two 2C Acetyl-CoA molecules. Each Acetyl-CoA enters the Citric Acid Cycle by condensing with 4C oxaloacetate to form 6C citrate. Isocitrate dehydrogenase and alpha-ketoglutarate dehydrogenase catalyze two successive oxidative decarboxylations per cycle turn, releasing 2 CO2 per Acetyl-CoA (4 CO2 total for two turns). Thus, 2 CO2 from pyruvate oxidation + 4 CO2 from the Citric Acid Cycle account for all 6 carbons of glucose.',
          },
          {
            questionNumber: 2,
            question: 'Compare and contrast substrate-level phosphorylation and oxidative phosphorylation using specific examples from the study material.',
            modelAnswer: 'Substrate-level phosphorylation transfers a phosphate group directly from a high-energy metabolic intermediate to ADP (or GDP). In glycolysis, phosphoglycerate kinase and pyruvate kinase generate 4 ATP this way; in the Citric Acid Cycle, succinyl-CoA synthetase generates 1 GTP/ATP per turn. In contrast, oxidative phosphorylation couples electron transport along Complexes I–IV in the inner mitochondrial membrane to proton pumping into the intermembrane space, establishing a proton-motive force that drives rotational catalysis by F0F1-ATP Synthase.',
          },
          {
            questionNumber: 3,
            question: 'Explain Peter Mitchell’s chemiosmotic hypothesis and analyze what happens when 2,4-dinitrophenol (DNP) is added to actively respiring mitochondria.',
            modelAnswer: 'Mitchell’s chemiosmotic hypothesis states that electron transport pumps H+ protons into the intermembrane space, generating an electrochemical gradient (pH gradient + electrical potential) that drives ATP synthesis via ATP Synthase. When DNP is added, it permeabilizes the inner mitochondrial membrane to protons, allowing H+ to leak back into the matrix without passing through F0F1-ATPase. Consequently, the proton-motive force collapses, ATP synthesis stops, energy is released as heat, and oxygen consumption accelerates.',
          },
          {
            questionNumber: 4,
            question: 'Detail the electron transfer pathway from NADH and FADH2 to molecular oxygen, explaining the exact stoichiometric difference in proton pumping and ATP yield.',
            modelAnswer: 'NADH transfers electrons to Complex I (4 H+ pumped), which passes them to lipid-soluble ubiquinone (CoQ). FADH2 (from succinate oxidation at Complex II) passes electrons to ubiquinone while bypassing Complex I (0 H+ pumped at Complex II). From ubiquinol, electrons move to Complex III (4 H+ pumped via the Q-cycle), then to water-soluble cytochrome c in the intermembrane space, and finally to Complex IV (2 H+ pumped), where O2 is reduced to H2O. Because NADH pumps 10 H+ total and FADH2 pumps 6 H+ total, NADH yields ~2.5 ATP while FADH2 yields ~1.5 ATP.',
          },
          {
            questionNumber: 5,
            question: 'Contrast the metabolic fate of pyruvate in human skeletal muscle during intense anaerobic sprinting versus yeast cells in an anaerobic fermentation vat.',
            modelAnswer: 'In both cases, lack of O2 halts the mitochondrial ETC, requiring cytosolic regeneration of NAD+ from NADH so Step 6 of glycolysis can continue producing 2 net ATP. In human skeletal muscle, lactate dehydrogenase directly reduces 3C pyruvate to 3C lactate using NADH, with no carbon dioxide released. In yeast, alcoholic fermentation is a two-step process: pyruvate decarboxylase first removes CO2 from pyruvate to yield 2C acetaldehyde, and alcohol dehydrogenase then reduces acetaldehyde to ethanol using NADH.',
          },
        ],
      },
      {
        paperNumber: 2,
        title: 'Model Question Paper 2 — Bioenergetics & Metabolic Regulation',
        duration: '3 Hours',
        totalMarks: 100,
        mcqQuestions: [
          {
            questionNumber: 1,
            question: 'Which two enzymes catalyze substrate-level phosphorylation during the payoff phase of glycolysis?',
            options: [
              'Hexokinase and PFK-1',
              'Phosphoglycerate kinase and Pyruvate kinase',
              'Citrate synthase and Malate dehydrogenase',
              'Pyruvate decarboxylase and Lactate dehydrogenase',
            ],
            correctAnswer: 'Phosphoglycerate kinase and Pyruvate kinase',
          },
          {
            questionNumber: 2,
            question: 'How many total CO2 molecules are released per glucose molecule during the Pyruvate Dehydrogenase Complex (link) reaction?',
            options: ['1 CO2', '2 CO2', '4 CO2', '6 CO2'],
            correctAnswer: '2 CO2',
          },
          {
            questionNumber: 3,
            question: 'Which Citric Acid Cycle enzyme regenerates oxaloacetate while producing the final NADH of the cycle?',
            options: ['Citrate synthase', 'Isocitrate dehydrogenase', 'Succinate dehydrogenase', 'Malate dehydrogenase'],
            correctAnswer: 'Malate dehydrogenase',
          },
          {
            questionNumber: 4,
            question: 'Where is Cytochrome c located within the mitochondrion?',
            options: ['Cytosol', 'Mitochondrial matrix', 'Intermembrane space', 'Outer membrane'],
            correctAnswer: 'Intermembrane space',
          },
          {
            questionNumber: 5,
            question: 'How many H+ protons are pumped per electron pair by Complex IV (Cytochrome c oxidase)?',
            options: ['0 H+', '2 H+', '4 H+', '6 H+'],
            correctAnswer: '2 H+',
          },
          {
            questionNumber: 6,
            question: 'What is the approximate ATP yield per molecule of FADH2 oxidized via the Electron Transport Chain?',
            options: ['1.0 ATP', '1.5 ATP', '2.5 ATP', '3.0 ATP'],
            correctAnswer: '1.5 ATP',
          },
          {
            questionNumber: 7,
            question: 'Compared to the mitochondrial matrix, the intermembrane space during active electron transport has:',
            options: [
              'A lower pH (more acidic) and positive electrical charge',
              'A higher pH (more basic) and negative electrical charge',
              'Identical pH and neutral charge',
              'No protons present',
            ],
            correctAnswer: 'A lower pH (more acidic) and positive electrical charge',
          },
          {
            questionNumber: 8,
            question: 'Which physiological protein in brown adipose tissue acts as a natural uncoupler to generate heat?',
            options: ['Hexokinase', 'UCP1 (Thermogenin)', 'Cytochrome bc1', 'Succinyl-CoA synthetase'],
            correctAnswer: 'UCP1 (Thermogenin)',
          },
          {
            questionNumber: 9,
            question: 'Which glycolysis enzyme directly requires oxidized NAD+ as a substrate to continue functioning?',
            options: [
              'Hexokinase',
              'Phosphofructokinase-1',
              'Glyceraldehyde-3-phosphate dehydrogenase',
              'Pyruvate kinase',
            ],
            correctAnswer: 'Glyceraldehyde-3-phosphate dehydrogenase',
          },
          {
            questionNumber: 10,
            question: 'In alcoholic fermentation, what is the immediate 2-carbon intermediate formed when CO2 is removed from pyruvate?',
            options: ['Lactate', 'Acetyl-CoA', 'Acetaldehyde', 'Oxaloacetate'],
            correctAnswer: 'Acetaldehyde',
          },
        ],
        shortAnswerQuestions: [
          {
            questionNumber: 1,
            question: 'State the chemical reason why glucose-6-phosphate remains trapped inside the cytosol after Step 1 of glycolysis.',
            modelAnswer: 'Hexokinase phosphorylates glucose using ATP to form glucose-6-phosphate (G6P), which carries a negative phosphate charge that prevents it from diffusing back across the plasma membrane.',
          },
          {
            questionNumber: 2,
            question: 'Account for the net production of 2 ATP, 2 NADH, and 2 Pyruvate in cytosolic glycolysis.',
            modelAnswer: 'Steps 1–5 invest 2 ATP per 6C glucose. Cleavage yields two 3C intermediates that pass through Steps 6–10, producing 2 NADH and 4 ATP via substrate-level phosphorylation (4 - 2 = 2 net ATP) and ending as 2 pyruvates.',
          },
          {
            questionNumber: 3,
            question: 'Describe how pyruvate crosses into the mitochondrion and what cofactors are required for its conversion to Acetyl-CoA.',
            modelAnswer: 'Pyruvate crosses the inner membrane via the mitochondrial pyruvate carrier. Inside the matrix, the Pyruvate Dehydrogenase Complex uses Coenzyme A and NAD+ to form Acetyl-CoA, CO2, and NADH.',
          },
          {
            questionNumber: 4,
            question: 'Identify the two enzymes in the Citric Acid Cycle that release CO2 through oxidative decarboxylation.',
            modelAnswer: 'Isocitrate dehydrogenase and alpha-ketoglutarate dehydrogenase catalyze the two successive oxidative decarboxylation steps, each releasing 1 CO2 and generating 1 NADH per turn.',
          },
          {
            questionNumber: 5,
            question: 'Summarize the total yield of reduced coenzymes, ATP/GTP, and CO2 from two turns of the Citric Acid Cycle.',
            modelAnswer: 'Two turns of the Citric Acid Cycle (representing one glucose molecule) produce 6 NADH, 2 FADH2, 2 ATP (or GTP), and 4 CO2.',
          },
          {
            questionNumber: 6,
            question: 'Distinguish between the physical properties and membrane locations of Ubiquinone (CoQ) and Cytochrome c.',
            modelAnswer: 'Ubiquinone (CoQ) is a small, lipid-soluble mobile carrier that diffuses within the hydrophobic core of the inner mitochondrial membrane, whereas Cytochrome c is a water-soluble protein located in the intermembrane space.',
          },
          {
            questionNumber: 7,
            question: 'Explain the Q-cycle’s functional significance at Complex III.',
            modelAnswer: 'Complex III (Cytochrome bc1 complex) uses the Q-cycle to transfer electrons from lipid-soluble ubiquinol to water-soluble cytochrome c while pumping 4 H+ protons into the intermembrane space.',
          },
          {
            questionNumber: 8,
            question: 'How does mechanical rotation of the F0 c-ring and gamma-stalk result in ATP synthesis in F1?',
            modelAnswer: 'Proton flow down the electrochemical gradient spins the F0 c-ring and attached gamma-stalk, which induces sequential conformational transitions (Open, Loose, Tight) in the stationary F1 catalytic head to synthesize ATP.',
          },
          {
            questionNumber: 9,
            question: 'Why does oxygen consumption increase when mitochondria are treated with the uncoupler 2,4-dinitrophenol (DNP)?',
            modelAnswer: 'DNP dissipates the proton gradient across the inner membrane, removing the back-pressure on proton pumping; Complexes I–IV therefore transport electrons and reduce O2 to H2O at maximum speed in a futile attempt to restore the gradient.',
          },
          {
            questionNumber: 10,
            question: 'Why do mature human erythrocytes produce lactate even when blood oxygen levels are high?',
            modelAnswer: 'Mature erythrocytes lack mitochondria entirely, so they have no Pyruvate Dehydrogenase Complex, Citric Acid Cycle, or ETC; they must reduce pyruvate to lactate via lactate dehydrogenase to recycle NAD+ for glycolysis.',
          },
        ],
        longAnswerQuestions: [
          {
            questionNumber: 1,
            question: 'Analyze how allosteric feedback at Phosphofructokinase-1 (PFK-1) coordinates the rate of cytosolic glycolysis with the activity of the mitochondrial Citric Acid Cycle and oxidative phosphorylation.',
            modelAnswer: 'PFK-1 catalyzes the committed, rate-limiting step of glycolysis. When mitochondrial oxidative phosphorylation and the Citric Acid Cycle are producing abundant energy, cytosolic ATP and citrate levels rise. Both ATP and citrate bind allosterically to PFK-1 to inhibit its activity, preventing unnecessary breakdown of glucose. Conversely, when cellular ATP is rapidly consumed, AMP and ADP accumulate and allosterically activate PFK-1, accelerating glycolytic flux to supply more pyruvate and NADH to the mitochondria.',
          },
          {
            questionNumber: 2,
            question: 'Perform a complete accounting of all NADH, FADH2, and direct ATP/GTP molecules produced per molecule of glucose across Glycolysis, Pyruvate Oxidation, and the Citric Acid Cycle.',
            modelAnswer: '1. Glycolysis (cytosol): Produces 2 net ATP (substrate-level) and 2 NADH. 2. Pyruvate Oxidation (mitochondrial matrix): Produces 2 NADH (1 per pyruvate) and 0 ATP. 3. Citric Acid Cycle (2 turns in matrix): Produces 6 NADH (3 per turn), 2 FADH2 (1 per turn at succinate dehydrogenase), and 2 ATP/GTP (1 per turn at succinyl-CoA synthetase). Total prior to ETC = 4 direct ATP/GTP, 10 NADH, and 2 FADH2.',
          },
          {
            questionNumber: 3,
            question: 'Describe the spatial architecture of the mitochondrion (matrix, inner membrane cristae, intermembrane space) and explain how each compartment contributes to oxidative phosphorylation.',
            modelAnswer: 'The mitochondrial matrix houses the Pyruvate Dehydrogenase Complex and Citric Acid Cycle enzymes that generate NADH and FADH2, as well as the F1 catalytic head of ATP Synthase. The folded inner membrane (cristae) provides a large surface area embedding Complexes I–IV, ubiquinone, and the F0 rotor of ATP Synthase while remaining impermeable to H+ ions. The narrow intermembrane space accumulates H+ protons pumped by Complexes I, III, and IV, creating the acidic, positively charged reservoir that drives chemiosmosis.',
          },
          {
            questionNumber: 4,
            question: 'Evaluate the bioenergetic consequences of a specific inhibitor that blocks Complex I (NADH dehydrogenase) versus an inhibitor that blocks Complex IV (Cytochrome c oxidase).',
            modelAnswer: 'If Complex I is blocked, electrons from NADH cannot enter the ETC, halting NADH oxidation and proton pumping at Complex I. However, electrons from succinate/FADH2 can still enter at Complex II, pass via ubiquinone to Complex III (4 H+ pumped) and Complex IV (2 H+ pumped), allowing partial ATP synthesis (~1.5 ATP per FADH2). In contrast, if Complex IV is blocked, electron transfer to the terminal acceptor (O2) stops completely; all upstream carriers (cytochrome c, Complex III, ubiquinone, Complexes I & II) become fully reduced, proton pumping ceases entirely, and oxidative phosphorylation halts.',
          },
          {
            questionNumber: 5,
            question: 'Compare the energetic efficiency and cofactor balance of aerobic respiration of glucose versus anaerobic fermentation (lactic acid or alcoholic).',
            modelAnswer: 'Under anaerobic fermentation, glucose is only partially oxidized to lactate or ethanol + CO2. The 2 NADH generated in Step 6 of glycolysis are consumed in the cytosol to reduce pyruvate or acetaldehyde, regenerating NAD+ so glycolysis can yield 2 net ATP per glucose via substrate-level phosphorylation. Under aerobic respiration, pyruvate is completely oxidized to 6 CO2 in the mitochondrion, generating 4 direct ATP/GTP plus 10 NADH (~2.5 ATP each) and 2 FADH2 (~1.5 ATP each) oxidized via the ETC and chemiosmosis, yielding vastly more ATP per glucose.',
          },
        ],
      },
    ],
  },
  medium: {
    id: 'sample-bio-medium',
    courseTitle: 'Cellular Bioenergetics, Glycolysis & Oxidative Phosphorylation',
    sourceSummary:
      'Intermediate analytical study kit focusing on allosteric regulation, redox stoichiometry, proton-motive force bioenergetics, and metabolic integration across cytosol and mitochondria.',
    difficulty: 'medium',
    createdAt: '2026-09-25T10:00:00Z',
    studySchedule: [
      {
        day: 'Day 1',
        phase: 'Stage 1: Enzymatic Regulation & Carbon Stoichiometry',
        focusConcepts: 'PFK-1 Allosteric Control, Substrate-Level Phosphorylation, PDC Link Reaction',
        actionItems: [
          'Analyze the allosteric effectors of PFK-1 (ATP/citrate inhibition vs. AMP/ADP activation).',
          'Drill the 10 JSON flashcards focusing on enzyme names and cofactor yields.',
        ],
        targetMilestone: 'Complete all 10 flashcards and trace carbon counts without notes',
      },
      {
        day: 'Day 2',
        phase: 'Stage 2: TCA Cycle & Electron Transport Chain Coupling',
        focusConcepts: 'TCA Oxidative Decarboxylations, Complex II Dual Function, Proton Stoichiometry',
        actionItems: [
          'Compare the 10 H+ path of NADH (Complexes I, III, IV) with the 6 H+ path of FADH2 (Complexes II, III, IV).',
          'Complete the 6 Medium-difficulty MCQs and 5 Short Answer questions.',
        ],
        targetMilestone: 'Score 100% on Medium Practice Questions',
      },
      {
        day: 'Day 3',
        phase: 'Stage 3: Chemiosmotic Mechanics & Uncoupling Scenarios',
        focusConcepts: 'F0F1 Rotational Catalysis, Boyer Binding-Change Model, DNP vs. UCP1',
        actionItems: [
          'Work through all 4 Real-World Application questions on metabolic inhibitors and uncouplers.',
          'Practice writing structured 5-mark and 8-mark responses.',
        ],
        targetMilestone: 'Articulate chemical vs. electrical components of proton-motive force',
      },
      {
        day: 'Day 4',
        phase: 'Stage 4: Distinction Exam Simulation',
        focusConcepts: 'Timed Completion of Model Question Papers 1 & 2 (100 Marks each)',
        actionItems: [
          'Complete Model Paper 1 and Model Paper 2 under exam timing.',
          'Cross-check every response against the examiner marking schemes.',
        ],
        targetMilestone: 'Achieve >= 88/100 across both 100-mark papers',
      },
    ],
    keyConcepts: [], // Will share keyConcepts and flashcards from easy kit below
    practiceQuestions: {
      mcq: [
        {
          id: 'mcq-m1',
          question: 'Why does high intracellular citrate concentration reduce the rate of cytosolic glycolysis?',
          options: [
            'Citrate competitively inhibits hexokinase at Step 1',
            'Citrate allosterically inhibits Phosphofructokinase-1 (PFK-1), the committed rate-limiting step',
            'Citrate oxidizes NADH back to NAD+ in the cytosol',
            'Citrate blocks the mitochondrial pyruvate carrier',
          ],
          correctAnswerIndex: 1,
          correctAnswer: 'Citrate allosterically inhibits Phosphofructokinase-1 (PFK-1), the committed rate-limiting step',
          explanation: 'High citrate signals abundant TCA cycle intermediates and energy, allosterically inhibiting PFK-1 along with high ATP.',
        },
        {
          id: 'mcq-m2',
          question: 'How many total H+ protons are pumped into the intermembrane space when 2 molecules of FADH2 from the Citric Acid Cycle are oxidized by the ETC?',
          options: ['6 H+', '10 H+', '12 H+', '20 H+'],
          correctAnswerIndex: 2,
          correctAnswer: '12 H+',
          explanation: 'Each FADH2 enters at Complex II (0 H+ pumped) and drives 4 H+ at Complex III + 2 H+ at Complex IV = 6 H+ per FADH2. For 2 FADH2, 12 H+ are pumped.',
        },
        {
          id: 'mcq-m3',
          question: 'Which enzyme is physically embedded in the inner mitochondrial membrane and participates directly in BOTH the Citric Acid Cycle and the Electron Transport Chain?',
          options: [
            'Isocitrate dehydrogenase',
            'Succinyl-CoA synthetase',
            'Succinate dehydrogenase (Complex II)',
            'Cytochrome c oxidase (Complex IV)',
          ],
          correctAnswerIndex: 2,
          correctAnswer: 'Succinate dehydrogenase (Complex II)',
          explanation: 'Succinate dehydrogenase oxidizes succinate to fumarate in the TCA cycle while reducing FAD to FADH2 as Complex II of the ETC.',
        },
        {
          id: 'mcq-m4',
          question: 'When the chemical uncoupler 2,4-dinitrophenol (DNP) is added to respiring mitochondria, what happens to the rate of oxygen consumption and ATP synthesis?',
          options: [
            'Both oxygen consumption and ATP synthesis stop immediately',
            'Oxygen consumption accelerates while ATP synthesis drops sharply',
            'Oxygen consumption decreases while ATP synthesis increases',
            'Both oxygen consumption and ATP synthesis double',
          ],
          correctAnswerIndex: 1,
          correctAnswer: 'Oxygen consumption accelerates while ATP synthesis drops sharply',
          explanation: 'DNP makes the inner membrane permeable to H+, dissipating the proton gradient as heat without ATP synthesis while accelerating electron transport and O2 consumption.',
        },
        {
          id: 'mcq-m5',
          question: 'During two complete turns of the Citric Acid Cycle (from one glucose molecule), how many carbon atoms enter as Acetyl groups and how many leave as CO2?',
          options: [
            '2 carbons enter; 2 leave as CO2',
            '4 carbons enter; 4 leave as CO2',
            '6 carbons enter; 6 leave as CO2',
            '4 carbons enter; 2 leave as CO2',
          ],
          correctAnswerIndex: 1,
          correctAnswer: '4 carbons enter; 4 leave as CO2',
          explanation: 'Each Acetyl-CoA brings a 2-carbon acetyl group (4 carbons total for 2 turns), and each turn releases 2 CO2 via isocitrate dehydrogenase and alpha-ketoglutarate dehydrogenase (4 CO2 total).',
        },
        {
          id: 'mcq-m6',
          question: 'According to Paul Boyer’s binding-change mechanism, which subunit and conformational states drive ATP synthesis in Complex V?',
          options: [
            'Cytochrome c cycling between oxidized and reduced states in F0',
            'Mechanical rotation of the gamma-stalk driving F1 catalytic sites through Open, Loose, and Tight states',
            'Direct phosphorylation of F0 c-ring subunits by Succinyl-CoA',
            'Proton pumping from the matrix into the intermembrane space by F1',
          ],
          correctAnswerIndex: 1,
          correctAnswer: 'Mechanical rotation of the gamma-stalk driving F1 catalytic sites through Open, Loose, and Tight states',
          explanation: 'Proton influx through F0 rotates the c-ring and gamma-stalk, causing the F1 catalytic domain to cycle through Open, Loose, and Tight conformations.',
        },
      ],
      shortAnswer: [
        {
          id: 'sa-m1',
          question: 'Explain why Phosphofructokinase-1 (PFK-1) rather than Hexokinase is the committed step of glycolysis, and detail its allosteric effectors.',
          conciseHighScoringAnswer:
            'PFK-1 catalyzes the phosphorylation of fructose-6-phosphate to fructose-1,6-bisphosphate, committing the sugar to glycolytic cleavage. It is allosterically inhibited by high ATP and citrate (signaling high energy charge and abundant TCA intermediates) and activated by AMP and ADP (signaling low energy charge).',
          scoringChecklist: [
            'Identifies F6P to F-1,6-BP reaction catalyzed by PFK-1',
            'Explains allosteric inhibition by high ATP and citrate',
            'Explains allosteric activation by AMP and ADP',
          ],
        },
        {
          id: 'sa-m2',
          question: 'Compare the roles and membrane solubility of Ubiquinone (CoQ) and Cytochrome c in the Electron Transport Chain.',
          conciseHighScoringAnswer:
            'Ubiquinone (Coenzyme Q) is a lipid-soluble mobile carrier within the inner mitochondrial membrane that accepts electrons from both Complex I (NADH) and Complex II (FADH2) and delivers them to Complex III. Cytochrome c is a water-soluble mobile protein in the intermembrane space that shuttles electrons from Complex III to Complex IV.',
          scoringChecklist: [
            'Ubiquinone is lipid-soluble and links Complexes I/II to Complex III',
            'Cytochrome c is water-soluble in the intermembrane space',
            'Cytochrome c shuttles electrons from Complex III to Complex IV',
          ],
        },
        {
          id: 'sa-m3',
          question: 'Calculate and explain the total number of H+ protons pumped across the inner mitochondrial membrane per 1 NADH vs. 1 FADH2.',
          conciseHighScoringAnswer:
            'One NADH enters at Complex I (4 H+ pumped), passes electrons via ubiquinone to Complex III (4 H+ pumped), and then via cytochrome c to Complex IV (2 H+ pumped), totaling 10 H+ (~2.5 ATP). One FADH2 enters at Complex II (0 H+ pumped), driving only Complex III (4 H+) and Complex IV (2 H+), totaling 6 H+ (~1.5 ATP).',
          scoringChecklist: [
            'Breaks down Complex I (4 H+), Complex III (4 H+), Complex IV (2 H+) = 10 H+ for NADH',
            'Notes Complex II pumps 0 H+, giving 4 + 2 = 6 H+ for FADH2',
            'Connects proton count to ~2.5 ATP vs ~1.5 ATP',
          ],
        },
        {
          id: 'sa-m4',
          question: 'Describe how the two components of the proton-motive force are generated and utilized by F0F1-ATP Synthase.',
          conciseHighScoringAnswer:
            'Proton pumping by Complexes I, III, and IV into the intermembrane space creates a chemical pH gradient (acidic intermembrane space) and an electrical gradient (positive intermembrane space). Protons flow back into the matrix down this combined electrochemical gradient through the F0 rotor, spinning the gamma-stalk to drive ATP synthesis in the F1 head.',
          scoringChecklist: [
            'Defines both pH gradient and electrical potential across inner membrane',
            'Explains H+ flow through F0 rotor down the gradient',
            'Connects gamma-stalk rotation to F1 conformational catalysis',
          ],
        },
        {
          id: 'sa-m5',
          question: 'Why does the specific enzymatic step catalyzed by Glyceraldehyde-3-phosphate dehydrogenase make fermentation mandatory under anaerobic conditions?',
          conciseHighScoringAnswer:
            'Step 6 of glycolysis (Glyceraldehyde-3-phosphate dehydrogenase) requires oxidized NAD+ as an electron acceptor, reducing it to NADH. When O2 is absent, the mitochondrial ETC cannot oxidize NADH back to NAD+. Fermentation (reducing pyruvate to lactate or acetaldehyde to ethanol) is strictly required to regenerate cytosolic NAD+ so Step 6 and glycolytic ATP production can continue.',
          scoringChecklist: [
            'Identifies Glyceraldehyde-3-phosphate dehydrogenase (Step 6) requirement for NAD+',
            'Explains that anaerobic conditions halt mitochondrial NADH oxidation',
            'States fermentation reduces pyruvate/acetaldehyde to regenerate NAD+',
          ],
        },
      ],
      applicationBased: [
        {
          id: 'app-m1',
          realWorldScenario:
            'In a biochemistry lab, isolated mitochondria are supplied with pyruvate, ADP, Pi, and O2. A researcher then adds 2,4-dinitrophenol (DNP) to the suspension.',
          question: 'Predict the immediate changes in (a) the pH difference across the inner mitochondrial membrane, (b) the rate of ATP synthesis, and (c) the temperature of the suspension.',
          applicationModelAnswer:
            '(a) The pH difference across the inner membrane collapses because DNP makes the inner membrane permeable to H+ protons, allowing them to leak back into the matrix. (b) ATP synthesis by F0F1-ATP Synthase drops to zero due to the loss of the proton-motive force. (c) The temperature of the suspension increases because the free energy of the dissipated proton gradient is released directly as heat while electron transport and O2 consumption accelerate.',
          conceptApplied: 'Chemiosmotic Coupling & Chemical Uncouplers (DNP)',
        },
        {
          id: 'app-m2',
          realWorldScenario:
            'A patient has a genetic deficiency in the mitochondrial pyruvate carrier protein, preventing pyruvate from crossing the inner mitochondrial membrane into the matrix.',
          question: 'How will this defect impact the cell’s ATP yield per glucose molecule and blood lactate levels?',
          applicationModelAnswer:
            'Because pyruvate cannot enter the mitochondrial matrix, the Pyruvate Dehydrogenase Complex and Citric Acid Cycle cannot oxidize glucose-derived carbons, drastically reducing ATP yield to just the 2 net ATP from cytosolic glycolysis. Excess cytosolic pyruvate is diverted to lactate dehydrogenase, which reduces pyruvate to lactate using NADH, causing elevated blood lactate (lactic acidosis).',
          conceptApplied: 'Mitochondrial Pyruvate Transport & Lactic Acid Fermentation',
        },
        {
          id: 'app-m3',
          realWorldScenario:
            'During an experiment, a specific toxin blocks electron transfer within Complex I (NADH dehydrogenase), but succinate is added directly to the mitochondrial suspension.',
          question: 'Will the mitochondria still be able to synthesize ATP when succinate is added? Explain the exact pathway and proton stoichiometry involved.',
          applicationModelAnswer:
            'Yes, ATP synthesis will resume. Succinate is oxidized to fumarate by Succinate dehydrogenase (Complex II), generating FADH2 and passing electrons directly to ubiquinone (CoQ), completely bypassing the blocked Complex I. Electrons then flow through Complex III (pumping 4 H+) and Complex IV (pumping 2 H+) to O2, establishing a proton-motive force of 6 H+ per succinate oxidized (~1.5 ATP synthesized via ATP Synthase).',
          conceptApplied: 'Complex I vs. Complex II Electron Entry Points',
        },
        {
          id: 'app-m4',
          realWorldScenario:
            'A brewing microbiologist switches a yeast culture from an aerated tank (high O2) to a sealed anaerobic tank while keeping glucose supply constant.',
          question: 'Why must the yeast consume glucose at a drastically faster rate in the sealed anaerobic tank to maintain the same cellular ATP production rate?',
          applicationModelAnswer:
            'In the sealed anaerobic tank, the Electron Transport Chain and oxidative phosphorylation cannot operate without O2 as the terminal electron acceptor. Yeast must rely solely on cytosolic glycolysis (yielding only 2 net ATP per glucose) coupled to alcoholic fermentation (pyruvate decarboxylase + alcohol dehydrogenase) to regenerate NAD+. Because 2 ATP per glucose is far lower than full aerobic oxidation, glucose consumption must increase sharply to meet cellular ATP demand.',
          conceptApplied: 'Aerobic Respiration vs. Alcoholic Fermentation ATP Yield',
        },
      ],
    },
    flashcards: [],
    exams: [],
  },
  hard: {
    id: 'sample-bio-hard',
    courseTitle: 'Cellular Bioenergetics, Glycolysis & Oxidative Phosphorylation',
    sourceSummary:
      'Distinction-level challenge kit testing multi-pathway integration, bioenergetic perturbation analysis, rotational catalysis mechanics, and quantitative redox stoichiometry.',
    difficulty: 'hard',
    createdAt: '2026-09-25T10:00:00Z',
    studySchedule: [],
    keyConcepts: [],
    practiceQuestions: {
      mcq: [
        {
          id: 'mcq-h1',
          question: 'If a cell oxidizes 1 molecule of glucose completely to 6 CO2 via glycolysis, the PDC link reaction, and the Citric Acid Cycle, how many total H+ protons are pumped by the mitochondrial Electron Transport Chain assuming all 10 NADH and 2 FADH2 are oxidized by Complexes I–IV?',
          options: ['80 H+ protons', '100 H+ protons', '112 H+ protons', '120 H+ protons'],
          correctAnswerIndex: 2,
          correctAnswer: '112 H+ protons',
          explanation: 'Complete oxidation yields 10 NADH (2 glycolysis + 2 PDC + 6 TCA) and 2 FADH2 (2 TCA). Each NADH pumps 10 H+ (10 × 10 = 100 H+) and each FADH2 pumps 6 H+ (2 × 6 = 12 H+), giving 112 H+ total.',
        },
        {
          id: 'mcq-h2',
          question: 'Which statement accurately contrasts the bioenergetic consequence of adding 2,4-dinitrophenol (DNP) versus inhibiting Complex IV (Cytochrome c oxidase)?',
          options: [
            'Both DNP and Complex IV inhibition stop O2 consumption and increase the proton gradient',
            'DNP abolishes ATP synthesis while accelerating O2 consumption, whereas Complex IV inhibition halts both O2 consumption and proton pumping',
            'DNP blocks ubiquinone reduction at Complex II, whereas Complex IV inhibition uncouples F0 from F1',
            'DNP increases ATP synthesis via substrate-level phosphorylation in the matrix',
          ],
          correctAnswerIndex: 1,
          correctAnswer: 'DNP abolishes ATP synthesis while accelerating O2 consumption, whereas Complex IV inhibition halts both O2 consumption and proton pumping',
          explanation: 'DNP permeabilizes the inner membrane to H+, collapsing the proton gradient so electron transport and O2 reduction run unchecked without ATP synthesis; blocking Complex IV prevents electron transfer to O2, halting the entire ETC.',
        },
        {
          id: 'mcq-h3',
          question: 'Why does the oxidation of succinate to fumarate in the Citric Acid Cycle fail to contribute to proton translocation at the first step of electron entry into the ETC?',
          options: [
            'Succinate is oxidized in the cytosol rather than the mitochondrial matrix',
            'Succinate dehydrogenase IS Complex II, which transfers electrons via FADH2 to ubiquinone without spanning the membrane as a proton pump',
            'Succinate oxidation transfers electrons directly to cytochrome c in the intermembrane space',
            'Succinate oxidation consumes 2 ATP to overcome an unfavorable free energy barrier',
          ],
          correctAnswerIndex: 1,
          correctAnswer: 'Succinate dehydrogenase IS Complex II, which transfers electrons via FADH2 to ubiquinone without spanning the membrane as a proton pump',
          explanation: 'Succinate dehydrogenase serves as both a TCA cycle enzyme and Complex II of the ETC, transferring electrons from FADH2 to ubiquinone with 0 H+ pumped.',
        },
        {
          id: 'mcq-h4',
          question: 'Suppose a mutation locks the F1 catalytic domain of ATP Synthase so that the gamma-stalk cannot rotate, while the inner mitochondrial membrane remains intact and impermeable to H+. What is the expected effect on the proton-motive force and electron transport?',
          options: [
            'The proton-motive force dissipates immediately as heat and O2 consumption triples',
            'Protons cannot re-enter the matrix through F0, causing the proton-motive force to build up to a maximum back-pressure that slows Complexes I, III, and IV',
            'Complex II begins pumping 4 H+ protons per FADH2 to compensate',
            'Cytochrome c diffuses into the matrix to hydrolyze ATP',
          ],
          correctAnswerIndex: 1,
          correctAnswer: 'Protons cannot re-enter the matrix through F0, causing the proton-motive force to build up to a maximum back-pressure that slows Complexes I, III, and IV',
          explanation: 'Because F0F1 rotation is coupled to H+ influx and the membrane is intact, blocking F0F1 prevents H+ return to the matrix; only adding an uncoupler like DNP would dissipate this built-up gradient.',
        },
        {
          id: 'mcq-h5',
          question: 'In a cell performing strictly anaerobic alcoholic fermentation of 3 molecules of glucose, what is the net change in the cytosolic NAD+/NADH ratio and how many molecules of CO2 and ATP are net-produced?',
          options: [
            'Net NAD+/NADH ratio is unchanged; 6 CO2 and 6 net ATP are produced',
            'NADH increases by 6 molecules; 0 CO2 and 6 net ATP are produced',
            'Net NAD+/NADH ratio is unchanged; 0 CO2 and 12 net ATP are produced',
            'NAD+ is completely depleted; 18 CO2 and 6 net ATP are produced',
          ],
          correctAnswerIndex: 0,
          correctAnswer: 'Net NAD+/NADH ratio is unchanged; 6 CO2 and 6 net ATP are produced',
          explanation: 'Per glucose, glycolysis produces 2 net ATP and reduces 2 NAD+ to 2 NADH; pyruvate decarboxylase releases 2 CO2 and alcohol dehydrogenase oxidizes all 2 NADH back to 2 NAD+. For 3 glucoses: 6 net ATP, 6 CO2, and zero net change in NAD+/NADH.',
        },
        {
          id: 'mcq-h6',
          question: 'Which pair of reactions represents one substrate-level phosphorylation step in the cytosol and one substrate-level phosphorylation step in the mitochondrial matrix?',
          options: [
            'Hexokinase (cytosol) and Citrate synthase (matrix)',
            'Phosphofructokinase-1 (cytosol) and Pyruvate Dehydrogenase Complex (matrix)',
            'Pyruvate kinase (cytosol) and Succinyl-CoA synthetase (matrix)',
            'Lactate dehydrogenase (cytosol) and Malate dehydrogenase (matrix)',
          ],
          correctAnswerIndex: 2,
          correctAnswer: 'Pyruvate kinase (cytosol) and Succinyl-CoA synthetase (matrix)',
          explanation: 'Pyruvate kinase (along with phosphoglycerate kinase) catalyzes substrate-level phosphorylation in cytosolic glycolysis, whereas Succinyl-CoA synthetase catalyzes substrate-level phosphorylation in the mitochondrial matrix.',
        },
      ],
      shortAnswer: [
        {
          id: 'sa-h1',
          question: 'Synthesize the exact bioenergetic relationship between the ΔG°\' of ATP hydrolysis (-30.5 kJ/mol) and the two components of the mitochondrial proton-motive force.',
          conciseHighScoringAnswer:
            'Because synthesizing ATP from ADP + Pi requires overcoming a large positive free-energy barrier (+30.5 kJ/mol under standard conditions), Complexes I, III, and IV couple exergonic electron transport to pump H+ into the intermembrane space. The resulting chemical pH gradient (acidic intermembrane space) and electrical potential (positive intermembrane space) store sufficient electrochemical free energy to drive rotational catalysis in F0F1-ATP Synthase.',
          scoringChecklist: [
            'References -30.5 kJ/mol free energy of ATP terminal phosphoanhydride bond',
            'Integrates chemical (pH) and electrical components of proton-motive force',
            'Explains mechanochemical coupling via F0 rotor and F1 Open/Loose/Tight states',
          ],
        },
        {
          id: 'sa-h2',
          question: 'Perform a rigorous stoichiometric comparison of CO2 release, NADH generation, and ATP production between 1 mole of glucose undergoing (a) Lactic Acid Fermentation, (b) Alcoholic Fermentation, and (c) Aerobic Oxidation up to the completion of the TCA cycle.',
          conciseHighScoringAnswer:
            '(a) Lactic Acid Fermentation: 0 CO2, 0 net NADH (2 produced in glycolysis, 2 oxidized by lactate dehydrogenase), 2 net ATP. (b) Alcoholic Fermentation: 2 CO2 (via pyruvate decarboxylase), 0 net NADH (2 oxidized by alcohol dehydrogenase), 2 net ATP. (c) Aerobic Oxidation through TCA: 6 CO2 (2 from PDC + 4 from TCA), 10 NADH (2 glycolysis + 2 PDC + 6 TCA), 2 FADH2, and 4 direct ATP/GTP (2 glycolysis + 2 TCA).',
          scoringChecklist: [
            'Accurately contrasts 0 CO2 (lactic) vs 2 CO2 (alcoholic) vs 6 CO2 (aerobic)',
            'Explains zero net NADH accumulation in both fermentations due to NAD+ regeneration',
            'Accounts for 10 NADH, 2 FADH2, and 4 substrate-level ATP/GTP in aerobic pathway',
          ],
        },
        {
          id: 'sa-h3',
          question: 'Explain why Citrate and AMP act as opposing allosteric regulators of Phosphofructokinase-1 (PFK-1) and how this integrates cytosolic and mitochondrial metabolism.',
          conciseHighScoringAnswer:
            'Citrate is formed in the first step of the mitochondrial Citric Acid Cycle by citrate synthase; high cytosolic citrate indicates that the TCA cycle is saturated and biosynthetic/energy needs are met, so it allosterically inhibits PFK-1 alongside high ATP. Conversely, elevated AMP signals low cellular energy charge (ATP depletion via hydrolysis to ADP/AMP), allosterically activating PFK-1 to accelerate glycolytic flux.',
          scoringChecklist: [
            'Links citrate to Citrate Synthase / TCA cycle saturation',
            'Explains coordinate inhibition of PFK-1 by ATP and citrate',
            'Explains activation by AMP/ADP when cellular energy charge drops',
          ],
        },
        {
          id: 'sa-h4',
          question: 'Detail the functional architecture of the Q-cycle at Complex III and explain why both lipid-soluble and water-soluble mobile carriers are required on either side of Complex III.',
          conciseHighScoringAnswer:
            'Complex III (Cytochrome bc1 complex) receives electrons from ubiquinol (reduced Ubiquinone/CoQ), a lipid-soluble carrier that collects electrons inside the hydrophobic inner membrane from both Complex I and Complex II. Via the Q-cycle, Complex III pumps 4 H+ into the intermembrane space and transfers electrons one at a time to Cytochrome c, a water-soluble protein in the aqueous intermembrane space that delivers them to Complex IV.',
          scoringChecklist: [
            'Explains Ubiquinone (CoQ) lipid solubility collecting from Complexes I & II',
            'Identifies Q-cycle at Complex III pumping 4 H+ protons',
            'Explains water-soluble Cytochrome c in intermembrane space shuttling to Complex IV',
          ],
        },
        {
          id: 'sa-h5',
          question: 'Contrast the mechanism of ATP synthesis in Succinyl-CoA synthetase (TCA cycle) with F0F1-ATP Synthase (Complex V).',
          conciseHighScoringAnswer:
            'Succinyl-CoA synthetase performs direct substrate-level phosphorylation in the mitochondrial matrix, coupling the cleavage of the high-energy thioester bond of succinyl-CoA directly to the phosphorylation of GDP/ADP to form 1 GTP/ATP. In contrast, F0F1-ATP Synthase performs oxidative phosphorylation via chemiosmosis: H+ flow through the membrane-embedded F0 rotor rotates the gamma-stalk, forcing the F1 head through Open, Loose, and Tight conformational states to synthesize ATP.',
          scoringChecklist: [
            'Identifies Succinyl-CoA synthetase as matrix substrate-level phosphorylation',
            'Identifies F0F1-ATP Synthase as inner-membrane chemiosmotic rotational catalysis',
            'Contrasts direct chemical group transfer with proton-motive conformational change',
          ],
        },
      ],
      applicationBased: [
        {
          id: 'app-h1',
          realWorldScenario:
            'In a mitochondrial bioenergetics assay, isolated mitochondria are incubated with NADH-generating substrates (pyruvate + malate), ADP, Pi, and O2. First, an inhibitor that blocks the F0 proton channel of ATP Synthase is added. Second, 2 minutes later, 2,4-dinitrophenol (DNP) is added.',
          question: 'Trace the changes in (1) oxygen consumption rate and (2) ATP synthesis rate after the first addition and after the second addition.',
          applicationModelAnswer:
            'After Addition 1 (F0 proton channel blocker): Protons cannot return to the matrix through ATP Synthase, so ATP synthesis stops immediately. Because the inner membrane is impermeable to H+, the proton-motive force builds to a maximum back-pressure that halts proton pumping by Complexes I, III, and IV, causing O2 consumption to drop to near zero. After Addition 2 (DNP): DNP permeabilizes the inner membrane to H+, collapsing the proton gradient. While ATP synthesis remains zero (since F0 is blocked and the gradient is dissipated as heat), the back-pressure on the ETC is relieved, causing electron transport and O2 consumption at Complex IV to surge rapidly.',
          conceptApplied: 'Coupled Respiration vs. Chemical Uncoupling (DNP & F0F1-ATPase)',
        },
        {
          id: 'app-h2',
          realWorldScenario:
            'A biochemist compares two tissue samples under strictly hypoxic (zero O2) conditions: Tissue A is human skeletal muscle and Tissue B is a suspension of brewer’s yeast. Both consume exactly 10 micromoles of glucose.',
          question: 'Calculate the exact micromoles of (a) net ATP produced, (b) CO2 gas evolved, and (c) NAD+ regenerated in Tissue A versus Tissue B.',
          applicationModelAnswer:
            'In both Tissue A and Tissue B, 10 micromoles of glucose undergoing anaerobic glycolysis produce 20 micromoles of net ATP (2 ATP per glucose) and require the regeneration of 20 micromoles of NAD+ (2 NADH oxidized back to NAD+ per glucose) so Glyceraldehyde-3-phosphate dehydrogenase can operate. However, Tissue A (skeletal muscle) uses lactate dehydrogenase to reduce pyruvate directly to 20 micromoles of lactate with 0 micromoles of CO2 evolved. Tissue B (yeast) uses pyruvate decarboxylase and alcohol dehydrogenase to produce 20 micromoles of ethanol and 20 micromoles of CO2 gas.',
          conceptApplied: 'Quantitative Stoichiometry of Lactic Acid vs. Alcoholic Fermentation',
        },
        {
          id: 'app-h3',
          realWorldScenario:
            'A mutant cell line has a defective Succinate Dehydrogenase enzyme that can still oxidize succinate to fumarate in the matrix but cannot transfer electrons to Ubiquinone (CoQ).',
          question: 'How does this single mutation affect both the Citric Acid Cycle and the Electron Transport Chain?',
          applicationModelAnswer:
            'Because Succinate Dehydrogenase is both a Citric Acid Cycle enzyme and Complex II of the Electron Transport Chain, inability to transfer electrons from FADH2 to ubiquinone traps the enzyme’s FAD cofactor in its reduced FADH2 state. Without oxidized FAD, succinate cannot be oxidized to fumarate, halting the Citric Acid Cycle at succinate and preventing regeneration of malate and oxaloacetate. Simultaneously, the ~1.5 ATP yield per FADH2 via Complex III and Complex IV is lost.',
          conceptApplied: 'Dual Role of Succinate Dehydrogenase (Complex II) & Cofactor Recycling',
        },
        {
          id: 'app-h4',
          realWorldScenario:
            'An athlete’s muscle cells transition instantaneously from rest (high ATP, high citrate, low AMP) to an all-out sprint where ATP is rapidly hydrolyzed to ADP and AMP.',
          question: 'Explain the molecular cascade by which this drop in ATP/AMP ratio accelerates both cytosolic glycolysis and mitochondrial electron transport.',
          applicationModelAnswer:
            'In the cytosol, the drop in ATP removes allosteric inhibition on Phosphofructokinase-1 (PFK-1) while rising AMP and ADP allosterically activate PFK-1, dramatically accelerating the conversion of fructose-6-phosphate to fructose-1,6-bisphosphate and increasing pyruvate and NADH production. Simultaneously, in the mitochondrial matrix, elevated ADP and Pi increase the rate of ATP synthesis by F0F1-ATP Synthase, which consumes H+ protons from the intermembrane space, lowers the proton-motive back-pressure, and accelerates electron transport through Complexes I–IV and O2 reduction.',
          conceptApplied: 'Coordinated Regulation of PFK-1 & Chemiosmotic Respiratory Control',
        },
      ],
    },
    flashcards: [],
    exams: [],
  },
};

// Populate shared keyConcepts, flashcards, studySchedule, and exams across medium & hard presets
SAMPLE_KITS_BY_DIFFICULTY.medium.keyConcepts = SAMPLE_KITS_BY_DIFFICULTY.easy.keyConcepts;
SAMPLE_KITS_BY_DIFFICULTY.medium.flashcards = SAMPLE_KITS_BY_DIFFICULTY.easy.flashcards;
SAMPLE_KITS_BY_DIFFICULTY.medium.exams = SAMPLE_KITS_BY_DIFFICULTY.easy.exams;

SAMPLE_KITS_BY_DIFFICULTY.hard.studySchedule = SAMPLE_KITS_BY_DIFFICULTY.medium.studySchedule;
SAMPLE_KITS_BY_DIFFICULTY.hard.keyConcepts = SAMPLE_KITS_BY_DIFFICULTY.easy.keyConcepts;
SAMPLE_KITS_BY_DIFFICULTY.hard.flashcards = SAMPLE_KITS_BY_DIFFICULTY.easy.flashcards;
SAMPLE_KITS_BY_DIFFICULTY.hard.exams = SAMPLE_KITS_BY_DIFFICULTY.easy.exams;
