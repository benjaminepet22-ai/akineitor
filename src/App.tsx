import { useState, useCallback } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Network, 
  Code2, 
  Volume2, 
  VolumeX, 
  History, 
  Trophy, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { TreeNode, GamePhase, HistoryStep } from './types';
import { 
  INITIAL_DECISION_TREE, 
  countLeaves, 
  insertNewNode, 
  loadTreeFromStorage, 
  saveTreeToStorage, 
  resetTreeToDefault 
} from './data/defaultTree';
import { GenieAvatar, GenieMood } from './components/GenieAvatar';
import { SpeechBubble } from './components/SpeechBubble';
import { QuestionButtons } from './components/QuestionButtons';
import { LearningForm } from './components/LearningForm';
import { TreeVisualizerModal } from './components/TreeVisualizerModal';
import { StandaloneHtmlModal } from './components/StandaloneHtmlModal';
import { sounds } from './utils/soundEffects';

export default function App() {
  // Tree state in memory (also synced to localStorage for persistence across reloads)
  const [decisionTree, setDecisionTree] = useState<TreeNode>(() => loadTreeFromStorage());
  const [currentNode, setCurrentNode] = useState<TreeNode | null>(null);
  const [phase, setPhase] = useState<GamePhase>('start');
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [history, setHistory] = useState<HistoryStep[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals
  const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);
  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Stats
  const totalCharacters = countLeaves(decisionTree);

  // Start new game
  const handleStartGame = useCallback(() => {
    sounds.playClick();
    setCurrentNode(decisionTree);
    setPhase('questioning');
    setQuestionCount(1);
    setHistory([]);
  }, [decisionTree]);

  // Handle Yes / No answer during questioning
  const handleAnswer = useCallback((answer: 'yes' | 'no') => {
    if (!currentNode) return;

    // Record history
    if (currentNode.question) {
      setHistory(prev => [
        ...prev,
        {
          nodeId: currentNode.id,
          question: currentNode.question || '',
          answer
        }
      ]);
    }

    const nextNode = answer === 'yes' ? currentNode.yes : currentNode.no;

    if (!nextNode) {
      // Safety fallback: if branch doesn't exist, guess current
      setPhase('guessing');
      return;
    }

    setCurrentNode(nextNode);

    // Check if the next node is a leaf (character guess)
    if (!nextNode.question && nextNode.name) {
      setPhase('guessing');
    } else {
      setQuestionCount(prev => prev + 1);
      setPhase('questioning');
    }
  }, [currentNode]);

  // Handle final guess outcome
  const handleGuessResult = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      sounds.playVictory();
      setPhase('victory');
    } else {
      setPhase('learning');
    }
  }, []);

  // Handle learning form submission
  const handleLearnSubmit = useCallback((characterName: string, question: string, answerForNew: 'yes' | 'no') => {
    if (!currentNode) return;

    // Insert new branch in the decision tree
    const updatedTree = insertNewNode(
      decisionTree,
      currentNode.id,
      question,
      characterName,
      answerForNew
    );

    setDecisionTree(updatedTree);
    saveTreeToStorage(updatedTree);
    setPhase('learned');
  }, [currentNode, decisionTree]);

  // Restart game back to start
  const handleReset = useCallback(() => {
    sounds.playClick();
    setCurrentNode(null);
    setPhase('start');
    setQuestionCount(0);
    setHistory([]);
  }, []);

  // Reset to factory tree
  const handleFactoryReset = useCallback(() => {
    if (window.confirm('¿Deseas restablecer el árbol a los 6 personajes iniciales predeterminados?')) {
      const freshTree = resetTreeToDefault();
      setDecisionTree(freshTree);
      handleReset();
    }
  }, [handleReset]);

  // Toggle sound
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  // Determine avatar mood
  const getGenieMood = (): GenieMood => {
    switch (phase) {
      case 'start':
        return 'idle';
      case 'questioning':
        return questionCount > 3 ? 'inquiring' : 'thinking';
      case 'guessing':
        return 'guessing';
      case 'victory':
        return 'victory';
      case 'learning':
        return 'surprised';
      case 'learned':
        return 'learning';
    }
  };

  // Get current speech text
  const getSpeechText = () => {
    switch (phase) {
      case 'start':
        return '¡Saludos, mortal! Piensa en cualquier personaje real, de ficción o un objeto común. Yo leeré tu mente... ¿Te atreves a desafiarme?';
      case 'questioning':
        return currentNode?.question || 'Mmm... déjame analizar...';
      case 'guessing':
        return `¿Estás pensando en... "${currentNode?.name}"?`;
      case 'victory':
        return `¡Ja, ja, ja! ¡Lo sabía! Tu mente es un libro abierto para mí. ¡Adiviné a ${currentNode?.name}!`;
      case 'learning':
        return `¡Por las barbas de Merlín! Me has derrotado... ¿Quién era? Ayúdame a aprender para la próxima vez.`;
      case 'learned':
        return `¡Excelente! He agregado este conocimiento a mi árbol mental. ¡La próxima vez no fallaré!`;
    }
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100 flex flex-col items-center justify-between p-3 sm:p-6 font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-[#050b18]">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[450px] h-[450px] bg-blue-600/12 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full max-w-2xl flex items-center justify-between py-2.5 px-3.5 rounded-2xl bg-[#0a1226]/80 border border-cyan-500/25 backdrop-blur-xl mb-3 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-[#050b18] font-bold text-sm shadow-md shadow-cyan-500/20">
            ✨
          </span>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-wide font-serif">
              GENIO ADIVINADOR
            </h1>
            <p className="text-[11px] text-cyan-300/80">
              Árbol de Decisión Binario • IA
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setIsTreeModalOpen(true)}
            title="Ver estructura del Árbol de Decisión"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-cyan-200 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 transition-colors cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.15)]"
          >
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Árbol</span>
            <span className="px-1.5 py-0.2 rounded-full bg-cyan-900 text-[10px] text-cyan-300 font-mono border border-cyan-400/30">
              {totalCharacters}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsHtmlModalOpen(true)}
            title="Exportar archivo único HTML5"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-sky-200 bg-sky-950/60 hover:bg-sky-900/70 border border-sky-800/60 transition-colors cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">HTML Único</span>
          </button>

          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/50 transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {phase !== 'start' && (
            <button
              type="button"
              onClick={handleReset}
              title="Reiniciar partida actual"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-950/60 hover:bg-rose-900/70 border border-rose-800/60 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Interactive Stage / Card */}
      <main className="relative z-10 w-full max-w-xl flex-1 flex flex-col items-center justify-center my-2">
        <div className="w-full bg-[#0a1226]/85 border border-cyan-500/30 rounded-3xl p-5 sm:p-8 shadow-[0_0_35px_rgba(6,182,212,0.12)] backdrop-blur-xl relative overflow-hidden flex flex-col items-center text-center">
          {/* Top subtle decorative strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600" />

          {/* Genie Avatar */}
          <GenieAvatar mood={getGenieMood()} />

          {/* Dialogue / Question Speech Bubble */}
          <SpeechBubble
            text={getSpeechText()}
            stepNumber={phase === 'questioning' ? questionCount : undefined}
            highlight={phase === 'guessing' || phase === 'victory'}
          />

          {/* Dynamic Content Views based on game phase */}
          {phase === 'start' && (
            <div className="w-full mt-3 space-y-4">
              <button
                type="button"
                onClick={handleStartGame}
                className="w-full py-4 px-6 rounded-2xl text-lg font-bold text-[#050b18] bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 hover:from-cyan-300 hover:to-teal-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5 fill-[#050b18] text-[#050b18]" />
                <span>¡Comenzar el Desafío!</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                  {totalCharacters} personajes cargados
                </span>
                <span>•</span>
                <span>Árbol binario auto-aprendiz</span>
              </div>
            </div>
          )}

          {phase === 'questioning' && (
            <div className="w-full mt-2">
              <QuestionButtons
                onAnswer={handleAnswer}
                yesLabel="¡Sí!"
                noLabel="¡No!"
              />
            </div>
          )}

          {phase === 'guessing' && (
            <div className="w-full mt-2 space-y-3">
              <QuestionButtons
                onAnswer={(ans) => handleGuessResult(ans === 'yes')}
                yesLabel="¡Sí, acertaste!"
                noLabel="No, fallaste"
              />
              <p className="text-xs text-slate-400">
                ¿Logró el genio adivinar en lo que estabas pensando?
              </p>
            </div>
          )}

          {phase === 'victory' && (
            <div className="w-full mt-3 space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-400/50 text-cyan-200 text-sm flex items-center justify-center gap-2 font-medium shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <Trophy className="w-5 h-5 text-cyan-300 shrink-0" />
                <span>¡Victoria del Genio! He leído tu mente con éxito.</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleStartGame}
                  className="flex-1 py-3 px-5 rounded-xl font-bold text-[#050b18] bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 hover:from-cyan-300 hover:to-teal-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer transition-all active:scale-[0.98]"
                >
                  🔄 Jugar otra partida
                </button>

                <button
                  type="button"
                  onClick={() => setIsTreeModalOpen(true)}
                  className="py-3 px-4 rounded-xl font-semibold text-cyan-200 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 cursor-pointer transition-all"
                >
                  Ver Árbol de Conocimiento
                </button>
              </div>
            </div>
          )}

          {phase === 'learning' && currentNode?.name && (
            <div className="w-full mt-3">
              <LearningForm
                failedGuessName={currentNode.name}
                onSubmit={handleLearnSubmit}
                onCancel={handleReset}
              />
            </div>
          )}

          {phase === 'learned' && (
            <div className="w-full mt-3 space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-400/50 text-cyan-100 text-sm shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <p className="font-semibold text-cyan-300 mb-1">
                  ¡Nuevo personaje memorizado con éxito!
                </p>
                <p className="text-xs text-slate-300">
                  El árbol de decisión binario ha insertado un nuevo nodo de bifurcación. Ahora tu personaje puede ser adivinado en futuras partidas de esta sesión.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleStartGame}
                  className="flex-1 py-3 px-5 rounded-xl font-bold text-[#050b18] bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 hover:from-cyan-300 hover:to-teal-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer transition-all active:scale-[0.98]"
                >
                  ✨ Desafiar de nuevo
                </button>

                <button
                  type="button"
                  onClick={() => setIsTreeModalOpen(true)}
                  className="py-3 px-4 rounded-xl font-semibold text-cyan-200 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 cursor-pointer transition-all"
                >
                  Inspeccionar Árbol
                </button>
              </div>
            </div>
          )}

          {/* History Breadcrumbs / Step Trail Drawer */}
          {history.length > 0 && (
            <div className="w-full mt-5 pt-4 border-t border-cyan-950/80 text-left">
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-1.5 text-xs text-cyan-400/80 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <History className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {showHistory ? 'Ocultar' : 'Ver'} camino recorrido ({history.length} {history.length === 1 ? 'pregunta' : 'preguntas'})
                </span>
              </button>

              {showHistory && (
                <div className="mt-2.5 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {history.map((step, idx) => (
                    <div
                      key={step.nodeId + idx}
                      className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#060c1c]/80 border border-cyan-950/80"
                    >
                      <span className="text-slate-300 truncate mr-2">
                        #{idx + 1}. {step.question}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase ${
                          step.answer === 'yes'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        {step.answer === 'yes' ? 'Sí' : 'No'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Tips / Instructions */}
        <div className="mt-4 text-center text-xs text-slate-400 max-w-md flex items-center justify-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>
            Tip: Puedes responder con las teclas <kbd className="px-1.5 py-0.5 rounded bg-[#0e172e] text-cyan-200 border border-cyan-900/50 font-mono">S</kbd> para Sí y <kbd className="px-1.5 py-0.5 rounded bg-[#0e172e] text-cyan-200 border border-cyan-900/50 font-mono">N</kbd> para No.
          </span>
        </div>
      </main>

      {/* Footer info & Factory reset */}
      <footer className="relative z-10 w-full max-w-2xl mt-4 pt-3 border-t border-cyan-950/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div>
          Juego estilo Akinator basado en Árboles Binarios de Decisión
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleFactoryReset}
            className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Restaurar personajes iniciales
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setIsHtmlModalOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-medium"
          >
            Ver código HTML autónomo
          </button>
        </div>
      </footer>

      {/* Modals */}
      <TreeVisualizerModal
        isOpen={isTreeModalOpen}
        onClose={() => setIsTreeModalOpen(false)}
        rootNode={decisionTree}
      />

      <StandaloneHtmlModal
        isOpen={isHtmlModalOpen}
        onClose={() => setIsHtmlModalOpen(false)}
      />
    </div>
  );
}
