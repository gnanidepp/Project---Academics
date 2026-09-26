import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Copy,
  Check,
  Printer,
  Download,
  BookOpen,
  HelpCircle,
  Layers,
  ClipboardList,
  Calendar,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { StudyKit, DifficultyLevel } from './types';
import { SAMPLE_LECTURE_NOTES, SAMPLE_KITS_BY_DIFFICULTY } from './sampleData';

type ActiveSection = 'all' | 'concepts' | 'practice' | 'flashcards' | 'exams' | 'schedule';

interface UploadedFilePayload {
  base64: string;
  mimeType: string;
  fileName: string;
  sizeBytes: number;
}

export default function App() {
  // Difficulty state controlled via radio buttons
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');

  // Study Kit state & cache by difficulty for the active material
  const [isUsingSample, setIsUsingSample] = useState<boolean>(true);
  const [customKitsCache, setCustomKitsCache] = useState<Partial<Record<DifficultyLevel, StudyKit>>>({});
  const [currentCustomKit, setCurrentCustomKit] = useState<StudyKit | null>(null);

  // Upload & backend parser state
  const [showUploadDrawer, setShowUploadDrawer] = useState<boolean>(false);
  const [courseTitleInput, setCourseTitleInput] = useState<string>('');
  const [notesTextInput, setNotesTextInput] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<UploadedFilePayload | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Navigation & view state
  const [activeSection, setActiveSection] = useState<ActiveSection>('all');
  const [practiceTab, setPracticeTab] = useState<'mcq' | 'short' | 'application'>('mcq');

  // Interactive Concept Mastery state
  const [masteredConcepts, setMasteredConcepts] = useState<Record<string, boolean>>({});

  // Interactive Practice Questions state
  const [selectedMcqOptions, setSelectedMcqOptions] = useState<Record<string, number>>({});
  const [revealedShortAnswers, setRevealedShortAnswers] = useState<Record<string, boolean>>({});
  const [revealedAppAnswers, setRevealedAppAnswers] = useState<Record<string, boolean>>({});
  const [studentDrafts, setStudentDrafts] = useState<Record<string, string>>({});
  const [showAllPracticeAnswers, setShowAllPracticeAnswers] = useState<boolean>(false);

  // Interactive Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [flashcardViewMode, setFlashcardViewMode] = useState<'split' | 'cards' | 'json'>('split');
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  // Interactive Model Exams state
  const [activeExamPaperIndex, setActiveExamPaperIndex] = useState<number>(0);
  const [examMcqSelections, setExamMcqSelections] = useState<Record<string, string>>({});
  const [showExamAnswerKey, setShowExamAnswerKey] = useState<Record<number, boolean>>({});
  const [examSubmitted, setExamSubmitted] = useState<Record<number, boolean>>({});

  // Study Schedule checklist state
  const [completedScheduleItems, setCompletedScheduleItems] = useState<Record<string, boolean>>({});

  // Resolve active StudyKit
  const activeKit: StudyKit = isUsingSample
    ? SAMPLE_KITS_BY_DIFFICULTY[difficulty]
    : currentCustomKit || SAMPLE_KITS_BY_DIFFICULTY[difficulty];

  const flashcardsLimited = (activeKit.flashcards || []).slice(0, 10);

  // Handle file selection for backend parsing
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg(null);

    if (file.size > 18 * 1024 * 1024) {
      setErrorMsg('File exceeds the 18 MB limit. Please upload a smaller document or paste key sections.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      setUploadedFile({
        base64,
        mimeType: file.type || 'text/plain',
        fileName: file.name,
        sizeBytes: file.size,
      });
      if (!courseTitleInput.trim()) {
        setCourseTitleInput(file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.onerror = () => {
      setErrorMsg('Could not read the selected file. Please try another file or paste your text directly.');
    };
    reader.readAsDataURL(file);
  };

  // Generate Study Kit via Backend
  const generateKitFromBackend = async (targetDifficulty: DifficultyLevel) => {
    if (!notesTextInput.trim() && !uploadedFile) {
      setErrorMsg('Please upload a study document (.pdf, .txt, .md, image) or paste your study notes first.');
      setShowUploadDrawer(true);
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-study-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textContent: notesTextInput,
          fileData: uploadedFile,
          difficulty: targetDifficulty,
          courseTitle: courseTitleInput,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse study materials on the server.');
      }

      const generatedKit: StudyKit = {
        ...data,
        flashcards: (data.flashcards || []).slice(0, 10),
      };

      setIsUsingSample(false);
      setCurrentCustomKit(generatedKit);
      setCustomKitsCache((prev) => ({
        ...prev,
        [targetDifficulty]: generatedKit,
      }));
      setCurrentCardIndex(0);
      setIsCardFlipped(false);
      setSelectedMcqOptions({});
      setShowUploadDrawer(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred while generating your study kit.';
      setErrorMsg(message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Radio Button Difficulty Change
  const handleDifficultyChange = async (newDiff: DifficultyLevel) => {
    setDifficulty(newDiff);
    setSelectedMcqOptions({});

    if (isUsingSample) {
      return;
    }

    // Check if we already generated this difficulty level for the uploaded custom material
    if (customKitsCache[newDiff]) {
      setCurrentCustomKit(customKitsCache[newDiff]!);
      return;
    }

    // Otherwise, if custom study material is present, parse at the newly selected difficulty
    if (notesTextInput.trim() || uploadedFile) {
      await generateKitFromBackend(newDiff);
    }
  };

  const handleLoadSampleIntoEditor = () => {
    setCourseTitleInput('Cellular Bioenergetics, Glycolysis & Oxidative Phosphorylation');
    setNotesTextInput(SAMPLE_LECTURE_NOTES);
    setUploadedFile(null);
    setErrorMsg(null);
  };

  const handleCopyFlashcardsJson = () => {
    const cleanJson = JSON.stringify(flashcardsLimited, null, 2);
    navigator.clipboard.writeText(cleanJson);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadFlashcardsJson = () => {
    const cleanJson = JSON.stringify(flashcardsLimited, null, 2);
    const blob = new Blob([cleanJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeKit.courseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-flashcards.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentExam = activeKit.exams?.[activeExamPaperIndex] || activeKit.exams?.[0];

  // Calculate MCQ score in active exam paper
  const calculateExamMcqScore = (paperNumber: number) => {
    const paper = activeKit.exams.find((p) => p.paperNumber === paperNumber);
    if (!paper) return { correct: 0, total: 10 };
    let correct = 0;
    paper.mcqQuestions.forEach((q) => {
      const key = `${paperNumber}-${q.questionNumber}`;
      if (examMcqSelections[key] === q.correctAnswer) {
        correct += 1;
      }
    });
    return { correct, total: paper.mcqQuestions.length };
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* TOP BAR CONTRACT: Strictly 3 zones (Single Brand Wordmark | 4-6 Nav Links | 1-2 Primary Actions) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-3.5 no-print">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-6">
          {/* Zone 1: Brand Title (single text element) */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('all');
            }}
            className="font-display text-xl font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Distinction
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setActiveSection('all')}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                activeSection === 'all'
                  ? 'text-slate-900 border-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Full Study Kit
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('concepts')}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                activeSection === 'concepts'
                  ? 'text-slate-900 border-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              1. Key Concepts
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('practice')}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                activeSection === 'practice'
                  ? 'text-slate-900 border-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              2. Practice Questions
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('flashcards')}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                activeSection === 'flashcards'
                  ? 'text-slate-900 border-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              3. Flashcards
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('exams')}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                activeSection === 'exams'
                  ? 'text-slate-900 border-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              4. Model Exams
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('schedule')}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                activeSection === 'schedule'
                  ? 'text-slate-900 border-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              Study Schedule
            </button>
          </nav>

          {/* Zone 3: 2 Primary Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Kit
            </button>
            <button
              type="button"
              onClick={() => setShowUploadDrawer((prev) => !prev)}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              {showUploadDrawer ? 'Close Uploader' : 'Upload Study Material'}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE CONTAINER */}
      <main id="top" className="flex-1 max-w-[1360px] w-full mx-auto px-6 py-8">
        {/* UPLOAD & BACKEND PARSING STUDIO PANEL */}
        {showUploadDrawer && (
          <section className="mb-10 bg-white border border-slate-200 rounded-xl p-6 no-print">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <h2 className="font-display text-xl font-semibold text-slate-900">
                  Transform Study Material into a Distinction Kit
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Upload lecture notes, textbook chapters (.pdf, .txt, .md, or images) or paste your study material below. All concepts, quizzes, flashcards, and 100-mark exams are strictly grounded in your uploaded content.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleLoadSampleIntoEditor}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  Load Sample Bioenergetics Text
                </button>
                {!isUsingSample && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsUsingSample(true);
                      setShowUploadDrawer(false);
                    }}
                    className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
                  >
                    Reset to Default Kit
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Left Column: File Upload Dropzone & Course Metadata */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Course or Module Title
                  </label>
                  <input
                    type="text"
                    value={courseTitleInput}
                    onChange={(e) => setCourseTitleInput(e.target.value)}
                    placeholder="e.g., BIO-204 Cellular Bioenergetics & Metabolism"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Upload Document (.pdf, .txt, .md, .png, .jpg)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.md,.pdf,.png,.jpg,.jpeg,.webp,.csv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-sky-600 bg-slate-50/70 hover:bg-sky-50/30 rounded-xl p-5 text-center transition-colors"
                  >
                    <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-800">
                      Click to select a study document from your device
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Supports PDF handouts, plain text notes, Markdown, and scanned note images
                    </p>
                  </div>

                  {uploadedFile && (
                    <div className="mt-3 flex items-center justify-between px-3.5 py-2.5 bg-slate-100 rounded-lg text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-sky-700 shrink-0" />
                        <span className="font-medium text-slate-900 truncate">
                          {uploadedFile.fileName}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-600 font-mono tabular-nums">
                          {(uploadedFile.sizeBytes / 1024).toFixed(1)} KB
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-slate-500 hover:text-red-600 p-1"
                        title="Remove file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Radio Button Question Difficulty Selector */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="block text-xs font-semibold text-slate-800 mb-2">
                    Select Question Difficulty Level
                  </span>
                  <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Question Difficulty">
                    {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((level) => (
                      <label
                        key={level}
                        className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                          difficulty === level
                            ? 'bg-white border-sky-700 text-slate-900 font-semibold'
                            : 'bg-transparent border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="uploader-difficulty"
                          value={level}
                          checked={difficulty === level}
                          onChange={() => setDifficulty(level)}
                          className="accent-sky-700"
                        />
                        <span className="capitalize whitespace-nowrap">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Raw Study Material Paste Area */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Paste or Edit Study Material Text
                  </label>
                  <span className="text-xs text-slate-500 font-mono tabular-nums">
                    {notesTextInput.length.toLocaleString()} characters
                  </span>
                </div>
                <textarea
                  value={notesTextInput}
                  onChange={(e) => setNotesTextInput(e.target.value)}
                  rows={9}
                  placeholder="Paste your lecture notes, textbook excerpts, definitions, or syllabus content here..."
                  className="w-full flex-1 p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-600 focus:bg-white transition-colors font-sans leading-relaxed"
                />

                {errorMsg && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-200 px-3.5 py-2.5 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadDrawer(false)}
                    className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isGenerating}
                    onClick={() => generateKitFromBackend(difficulty)}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 disabled:opacity-60 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Parsing Material & Building Kit...
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4" />
                        Parse Material & Generate Study Kit
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* COURSE HEADER & GLOBAL DIFFICULTY RADIO CONTROL BAR */}
        <section className="pb-8 mb-8 border-b border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              {/* Zero-Pill Metadata Discipline: quiet unboxed text with typographic separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                <span>Academic Distinction Study Kit</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{activeKit.keyConcepts.length} Core Concepts</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{flashcardsLimited.length} / 10 Max Flashcards</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{activeKit.exams.length} Model Question Papers (100 Marks Each)</span>
                <span aria-hidden="true">·</span>
                <span>Strictly Source-Grounded</span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                {activeKit.courseTitle}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                {activeKit.sourceSummary}
              </p>
            </div>

            {/* Persistent Radio Button Control for Easy, Medium, and Hard Question Levels */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shrink-0 no-print">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-semibold text-slate-800">
                  Question Difficulty Level
                </span>
                {isGenerating && (
                  <span className="text-xs text-sky-700 flex items-center gap-1 font-medium">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Updating...
                  </span>
                )}
              </div>
              <div
                className="flex items-center gap-3"
                role="radiogroup"
                aria-label="Toggle between easy, medium, and hard level questions"
              >
                {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((level) => (
                  <label
                    key={level}
                    className={`cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap ${
                      difficulty === level
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="global-difficulty-toggle"
                      value={level}
                      checked={difficulty === level}
                      disabled={isGenerating}
                      onChange={() => handleDifficultyChange(level)}
                      className="sr-only"
                    />
                    <span
                      className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                        difficulty === level ? 'border-white' : 'border-slate-400'
                      }`}
                    >
                      {difficulty === level && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Section Switcher */}
          <div className="flex lg:hidden items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-slate-200 no-print">
            {(
              [
                ['all', 'Full Kit'],
                ['concepts', '1. Concepts'],
                ['practice', '2. Practice'],
                ['flashcards', '3. Flashcards'],
                ['exams', '4. Exams'],
                ['schedule', 'Schedule'],
              ] as [ActiveSection, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveSection(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
                  activeSection === key
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* =====================================================================
            1. KEY CONCEPTS & SUMMARIES
           ===================================================================== */}
        {(activeSection === 'all' || activeSection === 'concepts') && (
          <section className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="text-xs text-slate-500 mb-1">
                  Section 01 · Core Material Extraction · {activeKit.keyConcepts.length} Concepts (4–5 Concise Points Each)
                </div>
                <h2 className="font-display text-2xl font-semibold text-slate-900">
                  1. Key Concepts & Summaries
                </h2>
              </div>
              <div className="text-xs text-slate-600 font-mono tabular-nums no-print">
                Mastered: {Object.values(masteredConcepts).filter(Boolean).length} / {activeKit.keyConcepts.length} Concepts
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeKit.keyConcepts.map((concept, idx) => {
                const isMastered = !!masteredConcepts[concept.id || String(idx)];
                return (
                  <article
                    key={concept.id || idx}
                    className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 pb-3 mb-3 border-b border-slate-100">
                        <div>
                          <div className="text-xs text-slate-500 font-mono tabular-nums mb-1">
                            Concept 0{idx + 1}
                          </div>
                          <h3 className="text-base font-semibold text-slate-900">
                            {concept.title}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setMasteredConcepts((prev) => ({
                              ...prev,
                              [concept.id || String(idx)]: !isMastered,
                            }))
                          }
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 no-print ${
                            isMastered
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {isMastered ? '● Mastered' : 'Mark Mastered'}
                        </button>
                      </div>

                      <p className="text-sm text-slate-700 font-medium mb-4 leading-relaxed">
                        {concept.summary}
                      </p>

                      <ul className="space-y-2.5">
                        {(concept.points || []).slice(0, 5).map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                            <span className="font-mono text-xs text-slate-400 tabular-nums mt-0.5 shrink-0">
                              {idx + 1}.{pIdx + 1}
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* =====================================================================
            2. PRACTICE QUESTIONS FOR EXAM
           ===================================================================== */}
        {(activeSection === 'all' || activeSection === 'practice') && (
          <section className="mb-14 pt-4 border-t border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
              <div>
                <div className="text-xs text-slate-500 mb-1">
                  Section 02 · Active Recall & Application · Calibrated to{' '}
                  <span className="font-semibold text-slate-800 capitalize">{difficulty}</span> Level
                </div>
                <h2 className="font-display text-2xl font-semibold text-slate-900">
                  2. Practice Questions for Exam
                </h2>
              </div>

              {/* Interactive Question Type Filter & Answer Toggle */}
              <div className="flex flex-wrap items-center gap-3 no-print">
                <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setPracticeTab('mcq')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      practiceTab === 'mcq'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Multiple Choice ({activeKit.practiceQuestions.mcq.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPracticeTab('short')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      practiceTab === 'short'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Short Answer ({activeKit.practiceQuestions.shortAnswer.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPracticeTab('application')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      practiceTab === 'application'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Application Based ({activeKit.practiceQuestions.applicationBased.length})
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllPracticeAnswers((prev) => !prev)}
                  className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  {showAllPracticeAnswers ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      Hide All Answers
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      Reveal All Answers
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2A. MULTIPLE CHOICE QUESTIONS (MCQ) */}
            {practiceTab === 'mcq' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
                  <span>Multiple Choice Questions (MCQ) — Four options per question with verified answer key</span>
                  <button
                    type="button"
                    onClick={() => setSelectedMcqOptions({})}
                    className="text-sky-700 hover:underline flex items-center gap-1 no-print"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Choices
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeKit.practiceQuestions.mcq.map((q, qIdx) => {
                    const qKey = q.id || `mcq-${qIdx}`;
                    const selectedIdx = selectedMcqOptions[qKey];
                    const hasAnswered = selectedIdx !== undefined;
                    const isCorrect =
                      hasAnswered &&
                      (selectedIdx === q.correctAnswerIndex ||
                        q.options[selectedIdx] === q.correctAnswer);

                    return (
                      <div
                        key={qKey}
                        className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span className="font-mono tabular-nums">MCQ 0{qIdx + 1}</span>
                            <span className="capitalize">{difficulty} Level</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-900 mb-4 leading-relaxed">
                            {q.question}
                          </p>

                          <div className="space-y-2">
                            {q.options.map((opt, optIdx) => {
                              const isThisSelected = selectedIdx === optIdx;
                              const isThisCorrectOption =
                                optIdx === q.correctAnswerIndex || opt === q.correctAnswer;
                              const showFeedback = hasAnswered || showAllPracticeAnswers;

                              let buttonStyle =
                                'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                              if (showFeedback) {
                                if (isThisCorrectOption) {
                                  buttonStyle =
                                    'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-medium';
                                } else if (isThisSelected && !isThisCorrectOption) {
                                  buttonStyle =
                                    'bg-red-50 border-red-400 text-red-900';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  type="button"
                                  onClick={() =>
                                    setSelectedMcqOptions((prev) => ({
                                      ...prev,
                                      [qKey]: optIdx,
                                    }))
                                  }
                                  className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition-colors flex items-start justify-between gap-3 ${buttonStyle}`}
                                >
                                  <div className="flex items-start gap-2.5">
                                    <span className="font-mono text-xs text-slate-500 mt-0.5 shrink-0">
                                      {String.fromCharCode(65 + optIdx)}.
                                    </span>
                                    <span>{opt}</span>
                                  </div>
                                  {showFeedback && isThisCorrectOption && (
                                    <span className="text-xs font-semibold text-emerald-700 shrink-0 flex items-center gap-1">
                                      <CheckCircle2 className="w-4 h-4" />
                                      Correct
                                    </span>
                                  )}
                                  {showFeedback && isThisSelected && !isThisCorrectOption && (
                                    <span className="text-xs font-semibold text-red-700 shrink-0 flex items-center gap-1">
                                      <XCircle className="w-4 h-4" />
                                      Incorrect
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {(hasAnswered || showAllPracticeAnswers) && (
                          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                            <div className="font-semibold text-slate-900 mb-1">
                              {hasAnswered
                                ? isCorrect
                                  ? '● Correct Answer Selected'
                                  : `▲ Review Needed — Correct Answer: ${q.correctAnswer}`
                                : `Correct Answer: ${q.correctAnswer}`}
                            </div>
                            <p>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2B. SHORT ANSWER QUESTIONS */}
            {practiceTab === 'short' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-500 pb-2">
                  Short Answer Questions — Practice drafting your response, then compare against the concise high-scoring model answer
                </div>

                <div className="space-y-4">
                  {activeKit.practiceQuestions.shortAnswer.map((sq, sIdx) => {
                    const sKey = sq.id || `sa-${sIdx}`;
                    const isRevealed = !!revealedShortAnswers[sKey] || showAllPracticeAnswers;

                    return (
                      <div
                        key={sKey}
                        className="bg-white border border-slate-200 rounded-xl p-6"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <span className="font-mono text-xs text-slate-500 tabular-nums">
                              Short Answer 0{sIdx + 1} · {difficulty.toUpperCase()}
                            </span>
                            <h3 className="text-base font-semibold text-slate-900 mt-1">
                              {sq.question}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setRevealedShortAnswers((prev) => ({
                                ...prev,
                                [sKey]: !prev[sKey],
                              }))
                            }
                            className="px-3 py-1.5 text-xs font-medium text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors whitespace-nowrap shrink-0 no-print"
                          >
                            {isRevealed ? 'Hide Model Answer' : 'Show High-Scoring Answer'}
                          </button>
                        </div>

                        <div className="mt-3 no-print">
                          <textarea
                            rows={2}
                            value={studentDrafts[sKey] || ''}
                            onChange={(e) =>
                              setStudentDrafts((prev) => ({
                                ...prev,
                                [sKey]: e.target.value,
                              }))
                            }
                            placeholder="Draft your concise short answer here before checking the marking scheme..."
                            className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-600 focus:bg-white"
                          />
                        </div>

                        {isRevealed && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="text-xs font-semibold text-emerald-800 mb-1.5">
                              Concise High-Scoring Answer:
                            </div>
                            <p className="text-sm text-slate-800 leading-relaxed mb-3">
                              {sq.conciseHighScoringAnswer}
                            </p>
                            {sq.scoringChecklist && sq.scoringChecklist.length > 0 && (
                              <div className="pt-2 border-t border-slate-100">
                                <span className="text-xs font-semibold text-slate-600 block mb-1.5">
                                  Examiner Marking Checklist:
                                </span>
                                <ul className="space-y-1">
                                  {sq.scoringChecklist.map((item, idx) => (
                                    <li
                                      key={idx}
                                      className="text-xs text-slate-600 flex items-center gap-2"
                                    >
                                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2C. APPLICATION BASED QUESTIONS */}
            {practiceTab === 'application' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-500 pb-2">
                  Application Based Questions — Apply concepts from the uploaded study material to real-world scientific & practical scenarios
                </div>

                <div className="space-y-5">
                  {activeKit.practiceQuestions.applicationBased.map((aq, aIdx) => {
                    const aKey = aq.id || `app-${aIdx}`;
                    const isRevealed = !!revealedAppAnswers[aKey] || showAllPracticeAnswers;

                    return (
                      <div
                        key={aKey}
                        className="bg-white border border-slate-200 rounded-xl p-6"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                          <div>
                            <span className="font-mono tabular-nums">Application Scenario 0{aIdx + 1}</span>
                            <span className="mx-1.5">·</span>
                            <span className="text-slate-700 font-medium">
                              Concept Applied: {aq.conceptApplied}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setRevealedAppAnswers((prev) => ({
                                ...prev,
                                [aKey]: !prev[aKey],
                              }))
                            }
                            className="px-3 py-1.5 text-xs font-medium text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors whitespace-nowrap no-print"
                          >
                            {isRevealed ? 'Hide Solution' : 'Reveal Application Analysis'}
                          </button>
                        </div>

                        <p className="text-sm text-slate-600 italic border-l-2 border-sky-600 pl-3.5 py-1 mb-3">
                          "{aq.realWorldScenario}"
                        </p>

                        <h3 className="text-base font-semibold text-slate-900 mb-3">
                          {aq.question}
                        </h3>

                        <div className="no-print">
                          <textarea
                            rows={2}
                            value={studentDrafts[aKey] || ''}
                            onChange={(e) =>
                              setStudentDrafts((prev) => ({
                                ...prev,
                                [aKey]: e.target.value,
                              }))
                            }
                            placeholder="Write how you would apply the concept from the material to solve this scenario..."
                            className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-600 focus:bg-white"
                          />
                        </div>

                        {isRevealed && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="text-xs font-semibold text-emerald-800 mb-1">
                              Distinction-Grade Application Answer:
                            </div>
                            <p className="text-sm text-slate-800 leading-relaxed">
                              {aq.applicationModelAnswer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* =====================================================================
            3. FLASHCARDS (JSON FORMAT) — Strictly Maximum 10 Cards
           ===================================================================== */}
        {(activeSection === 'all' || activeSection === 'flashcards') && (
          <section className="mb-14 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="text-xs text-slate-500 mb-1">
                  Section 03 · Clean JSON Array & Interactive Deck · Strictly Capped at {flashcardsLimited.length} / 10 Cards
                </div>
                <h2 className="font-display text-2xl font-semibold text-slate-900">
                  3. Flashcards (JSON Format)
                </h2>
              </div>

              <div className="flex items-center gap-2 no-print">
                <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setFlashcardViewMode('split')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      flashcardViewMode === 'split'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Interactive + JSON
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlashcardViewMode('cards')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      flashcardViewMode === 'cards'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All {flashcardsLimited.length} Cards Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlashcardViewMode('json')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      flashcardViewMode === 'json'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Raw JSON Array
                  </button>
                </div>
              </div>
            </div>

            {flashcardViewMode === 'cards' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {flashcardsLimited.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono text-slate-400 tabular-nums mb-2">
                        Card {String(idx + 1).padStart(2, '0')} / {String(flashcardsLimited.length).padStart(2, '0')}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mb-1">Front (Term or Question)</div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">
                        {card.front}
                      </h3>
                    </div>
                    <div className="pt-3 border-t border-slate-100">
                      <div className="text-xs font-semibold text-sky-700 mb-1">Back (Definition or Answer)</div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {card.back}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Interactive Flashcard Player */}
                {flashcardViewMode === 'split' && flashcardsLimited.length > 0 && (
                  <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span className="font-mono tabular-nums">
                        Flashcard {currentCardIndex + 1} of {flashcardsLimited.length} (Max 10)
                      </span>
                      <span>Click card to flip Front / Back</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCardFlipped((prev) => !prev)}
                      className="w-full min-h-[220px] text-left p-6 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors flex flex-col justify-between cursor-pointer"
                    >
                      <div className="text-xs font-mono uppercase tracking-wider text-sky-700">
                        {isCardFlipped ? 'BACK — DEFINITION OR ANSWER' : 'FRONT — TERM OR QUESTION'}
                      </div>

                      <div className="my-auto py-4">
                        <p
                          className={`${
                            isCardFlipped
                              ? 'text-base text-slate-800 leading-relaxed'
                              : 'font-display text-xl font-semibold text-slate-900'
                          }`}
                        >
                          {isCardFlipped
                            ? flashcardsLimited[currentCardIndex]?.back
                            : flashcardsLimited[currentCardIndex]?.front}
                        </p>
                      </div>

                      <div className="text-xs text-slate-500 flex items-center justify-between pt-3 border-t border-slate-200/70">
                        <span>
                          {isCardFlipped ? 'Showing back of card' : 'Showing front of card'}
                        </span>
                        <span className="font-medium text-sky-700">
                          {isCardFlipped ? 'Flip to Term →' : 'Flip to Answer →'}
                        </span>
                      </div>
                    </button>

                    {/* Deck Navigation Controls */}
                    <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCardFlipped(false);
                          setCurrentCardIndex((prev) =>
                            prev === 0 ? flashcardsLimited.length - 1 : prev - 1
                          );
                        }}
                        className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous Card
                      </button>

                      <div className="flex items-center gap-1.5">
                        {flashcardsLimited.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setCurrentCardIndex(idx);
                              setIsCardFlipped(false);
                            }}
                            aria-label={`Go to flashcard ${idx + 1}`}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              currentCardIndex === idx ? 'bg-sky-700' : 'bg-slate-300 hover:bg-slate-400'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsCardFlipped(false);
                          setCurrentCardIndex((prev) =>
                            prev === flashcardsLimited.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                      >
                        Next Card
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Clean JSON Array Display */}
                <div
                  className={`${
                    flashcardViewMode === 'json' ? 'lg:col-span-12' : 'lg:col-span-6'
                  } bg-slate-900 text-slate-100 rounded-xl p-5 flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between gap-4 pb-3 mb-3 border-b border-slate-800">
                    <div className="text-xs font-mono text-slate-400">
                      flashcards.json · {flashcardsLimited.length} items (strictly &le; 10)
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyFlashcardsJson}
                        className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap"
                      >
                        {copiedJson ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Copied JSON
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy JSON
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadFlashcardsJson}
                        className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>

                  <pre className="font-mono text-xs text-slate-200 overflow-x-auto max-h-[270px] leading-relaxed">
                    {JSON.stringify(flashcardsLimited, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </section>
        )}

        {/* =====================================================================
            4. EXAMS (AT LEAST 2 MODEL QUESTION PAPERS — 100 MARKS EACH)
           ===================================================================== */}
        {(activeSection === 'all' || activeSection === 'exams') && currentExam && (
          <section className="mb-14 pt-4 border-t border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
              <div>
                <div className="text-xs text-slate-500 mb-1">
                  Section 04 · Full-Length Examination Papers · 10 MCQs [1M] + 10 Short Answer [5M] + 5 Long/Application [8M] = 100 Marks
                </div>
                <h2 className="font-display text-2xl font-semibold text-slate-900">
                  4. Model Question Papers
                </h2>
              </div>

              {/* Paper Switcher & Answer Key Toggle */}
              <div className="flex flex-wrap items-center gap-3 no-print">
                <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
                  {activeKit.exams.map((paper, idx) => (
                    <button
                      key={paper.paperNumber || idx}
                      type="button"
                      onClick={() => setActiveExamPaperIndex(idx)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeExamPaperIndex === idx
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Model Question Paper {paper.paperNumber || idx + 1} (100 Marks)
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowExamAnswerKey((prev) => ({
                      ...prev,
                      [currentExam.paperNumber]: !prev[currentExam.paperNumber],
                    }))
                  }
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  {showExamAnswerKey[currentExam.paperNumber] ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      Hide Examiner Key
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      Show Examiner Answer Key
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Exam Paper Sheet */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              {/* Formal Academic Exam Header */}
              <div className="pb-6 mb-8 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-slate-500 tabular-nums">
                    PAPER 0{currentExam.paperNumber} · DIFFICULTY: {difficulty.toUpperCase()}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 mt-1">
                    {currentExam.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    All questions are compulsory and strictly derived from the uploaded course material.
                  </p>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-slate-700 space-y-1 shrink-0 tabular-nums">
                  <div>Duration: {currentExam.duration || '3 Hours'}</div>
                  <div className="font-semibold text-slate-900">
                    Maximum Marks: {currentExam.totalMarks || 100}
                  </div>
                  <div>Distinction Benchmark: 85 / 100</div>
                </div>
              </div>

              {/* PART A: MCQ (10 Questions, 1 Mark Each) */}
              <div className="mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-slate-200">
                  <h4 className="text-base font-semibold text-slate-900">
                    Part A: Multiple Choice Questions (MCQ) [1 Mark Each — 10 × 1 = 10 Marks]
                  </h4>
                  <div className="flex items-center gap-3 no-print">
                    {examSubmitted[currentExam.paperNumber] && (
                      <span className="text-xs font-mono font-semibold text-emerald-800 tabular-nums">
                        Part A Score: {calculateExamMcqScore(currentExam.paperNumber).correct} /{' '}
                        {calculateExamMcqScore(currentExam.paperNumber).total} Marks
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setExamSubmitted((prev) => ({
                          ...prev,
                          [currentExam.paperNumber]: !prev[currentExam.paperNumber],
                        }))
                      }
                      className="px-3 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors whitespace-nowrap"
                    >
                      {examSubmitted[currentExam.paperNumber] ? 'Reset Part A Grading' : 'Grade Part A MCQs'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentExam.mcqQuestions.map((mcq, mIdx) => {
                    const qNum = mcq.questionNumber || mIdx + 1;
                    const selKey = `${currentExam.paperNumber}-${qNum}`;
                    const userChoice = examMcqSelections[selKey];
                    const showKey =
                      !!showExamAnswerKey[currentExam.paperNumber] ||
                      !!examSubmitted[currentExam.paperNumber];

                    return (
                      <div key={qNum} className="pb-4 border-b border-slate-100">
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <p className="text-sm font-medium text-slate-900 leading-relaxed">
                            <span className="font-mono text-xs text-slate-500 mr-2 tabular-nums">
                              Q{qNum}.
                            </span>
                            {mcq.question}
                          </p>
                          <span className="font-mono text-xs text-slate-500 shrink-0 tabular-nums">
                            [1 Mark]
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-1.5 pl-5">
                          {mcq.options.map((option, oIdx) => {
                            const isSelected = userChoice === option;
                            const isCorrectOption = option === mcq.correctAnswer;

                            return (
                              <label
                                key={oIdx}
                                className={`cursor-pointer flex items-center justify-between gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${
                                  showKey && isCorrectOption
                                    ? 'bg-emerald-50 text-emerald-950 font-semibold border border-emerald-300'
                                    : showKey && isSelected && !isCorrectOption
                                    ? 'bg-red-50 text-red-900 border border-red-300'
                                    : isSelected
                                    ? 'bg-slate-100 text-slate-900 font-medium'
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`exam-mcq-${selKey}`}
                                    checked={isSelected}
                                    onChange={() =>
                                      setExamMcqSelections((prev) => ({
                                        ...prev,
                                        [selKey]: option,
                                      }))
                                    }
                                    className="accent-sky-700"
                                  />
                                  <span className="font-mono text-slate-400">
                                    ({String.fromCharCode(97 + oIdx)})
                                  </span>
                                  <span>{option}</span>
                                </div>
                                {showKey && isCorrectOption && (
                                  <span className="text-[11px] font-mono text-emerald-700 shrink-0">
                                    ✓ Correct
                                  </span>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PART B: SHORT ANSWER QUESTIONS (10 Questions, 5 Marks Each) */}
              <div className="mb-10">
                <div className="pb-3 mb-5 border-b border-slate-200">
                  <h4 className="text-base font-semibold text-slate-900">
                    Part B: Short Answer Questions [5 Marks Each — 10 × 5 = 50 Marks]
                  </h4>
                </div>

                <div className="space-y-4">
                  {currentExam.shortAnswerQuestions.map((sq, sIdx) => {
                    const qNum = sq.questionNumber || sIdx + 1;
                    const showKey = !!showExamAnswerKey[currentExam.paperNumber];

                    return (
                      <div key={qNum} className="pb-4 border-b border-slate-100">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-sm font-medium text-slate-900 leading-relaxed">
                            <span className="font-mono text-xs text-slate-500 mr-2 tabular-nums">
                              Q{qNum}.
                            </span>
                            {sq.question}
                          </p>
                          <span className="font-mono text-xs text-slate-500 shrink-0 tabular-nums">
                            [5 Marks]
                          </span>
                        </div>

                        {showKey && (
                          <div className="mt-2.5 pl-6 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 leading-relaxed">
                            <span className="font-semibold text-emerald-800 block mb-1">
                              5-Mark Examiner Model Answer:
                            </span>
                            {sq.modelAnswer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PART C: LONG ANSWER / APPLICATION BASED QUESTIONS (5 Questions, 8 Marks Each) */}
              <div>
                <div className="pb-3 mb-5 border-b border-slate-200">
                  <h4 className="text-base font-semibold text-slate-900">
                    Part C: Long Answer / Application Based Questions [8 Marks Each — 5 × 8 = 40 Marks]
                  </h4>
                </div>

                <div className="space-y-5">
                  {currentExam.longAnswerQuestions.map((lq, lIdx) => {
                    const qNum = lq.questionNumber || lIdx + 1;
                    const showKey = !!showExamAnswerKey[currentExam.paperNumber];

                    return (
                      <div key={qNum} className="pb-5 border-b border-slate-100 last:border-b-0">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-sm font-medium text-slate-900 leading-relaxed">
                            <span className="font-mono text-xs text-slate-500 mr-2 tabular-nums">
                              Q{qNum}.
                            </span>
                            {lq.question}
                          </p>
                          <span className="font-mono text-xs text-slate-500 shrink-0 tabular-nums">
                            [8 Marks]
                          </span>
                        </div>

                        {showKey && (
                          <div className="mt-3 pl-6 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200/80 leading-relaxed">
                            <span className="font-semibold text-emerald-800 block mb-1">
                              8-Mark Distinction Synthesis & Application Answer:
                            </span>
                            {lq.modelAnswer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            PERSONALIZED DISTINCTION STUDY SCHEDULE
           ===================================================================== */}
        {(activeSection === 'all' || activeSection === 'schedule') &&
          activeKit.studySchedule &&
          activeKit.studySchedule.length > 0 && (
            <section className="mb-10 pt-4 border-t border-slate-200">
              <div className="mb-6">
                <div className="text-xs text-slate-500 mb-1">
                  Personalized Distinction Roadmap · Structured Pacing for Exam Mastery
                </div>
                <h2 className="font-display text-2xl font-semibold text-slate-900">
                  Personalized Study Schedule
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeKit.studySchedule.map((block, bIdx) => {
                  const blockKey = `${activeKit.id}-sched-${bIdx}`;
                  const isDone = !!completedScheduleItems[blockKey];

                  return (
                    <div
                      key={bIdx}
                      className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                          <div>
                            <span className="font-mono text-xs text-sky-700 font-semibold">
                              {block.day}
                            </span>
                            <h3 className="text-base font-semibold text-slate-900 mt-0.5">
                              {block.phase}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setCompletedScheduleItems((prev) => ({
                                ...prev,
                                [blockKey]: !isDone,
                              }))
                            }
                            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap no-print ${
                              isDone
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {isDone ? '● Completed' : 'Mark Complete'}
                          </button>
                        </div>

                        <div className="text-xs text-slate-500 mb-3">
                          <span className="font-semibold text-slate-700">Focus:</span>{' '}
                          {block.focusConcepts}
                        </div>

                        <ul className="space-y-2 mb-4">
                          {(block.actionItems || []).map((item, iIdx) => (
                            <li
                              key={iIdx}
                              className="text-sm text-slate-700 flex items-start gap-2 leading-relaxed"
                            >
                              <span className="text-sky-700 font-mono text-xs mt-0.5">→</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
                        <span className="font-semibold text-slate-900">Target Milestone:</span>{' '}
                        {block.targetMilestone}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
      </main>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 no-print">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Distinction — Academic Study Kit & Exam Studio · Strictly grounded in student-uploaded materials
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowUploadDrawer(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Upload New Study Material
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="hover:text-slate-900 transition-colors"
            >
              Print Full Study Kit
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
