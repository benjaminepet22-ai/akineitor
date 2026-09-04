import React, { useState } from 'react';
import { Brain, CheckCircle, ArrowRight, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface LearningFormProps {
  failedGuessName: string;
  onSubmit: (characterName: string, question: string, answerForNew: 'yes' | 'no') => void;
  onCancel: () => void;
}

export const LearningForm: React.FC<LearningFormProps> = ({
  failedGuessName,
  onSubmit,
  onCancel
}) => {
  const [characterName, setCharacterName] = useState('');
  const [question, setQuestion] = useState('');
  const [answerForNew, setAnswerForNew] = useState<'yes' | 'no'>('yes');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!characterName.trim()) {
      setError('Por favor indica en quién o en qué estabas pensando.');
      return;
    }
    if (!question.trim()) {
      setError('Escribe una pregunta para diferenciar tu personaje de ' + failedGuessName + '.');
      return;
    }

    sounds.playLearn();
    onSubmit(characterName.trim(), question.trim(), answerForNew);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-[#0a1226]/90 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-[0_0_30px_rgba(6,182,212,0.12)] backdrop-blur-md text-left"
    >
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-cyan-900/40">
        <div className="p-2 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
            ¡Enséñale al Oráculo IA!
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            El oráculo intentó adivinar: <strong className="text-cyan-300 font-semibold">"{failedGuessName}"</strong>
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs sm:text-sm shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          {error}
        </div>
      )}

      {/* Step 1 */}
      <div className="mb-4">
        <label
          htmlFor="input-character-name"
          className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5"
        >
          1. ¿En quién o en qué estabas pensando realmente?
        </label>
        <input
          id="input-character-name"
          type="text"
          value={characterName}
          onChange={(e) => {
            setCharacterName(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Ej: Harry Potter, Batman, Una Manzana..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#060c1c] border border-cyan-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-colors"
          autoFocus
        />
      </div>

      {/* Step 2 */}
      <div className="mb-4">
        <label
          htmlFor="input-diff-question"
          className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5"
        >
          2. Escribe una pregunta que diferencie a{' '}
          <span className="text-cyan-300 font-bold">
            {characterName.trim() || 'tu personaje'}
          </span>{' '}
          de <span className="text-amber-300 font-bold">"{failedGuessName}"</span>:
        </label>
        <input
          id="input-diff-question"
          type="text"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Ej: ¿Tiene una cicatriz de rayo en la frente?"
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#060c1c] border border-cyan-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-colors"
        />
      </div>

      {/* Step 3 */}
      <div className="mb-5">
        <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-2">
          3. Para{' '}
          <span className="text-cyan-300 font-bold">
            {characterName.trim() || 'tu personaje'}
          </span>
          , ¿cuál es la respuesta correcta a esa pregunta?
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
              answerForNew === 'yes'
                ? 'bg-cyan-950/70 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-[#060c1c]/70 border-slate-800 text-slate-400 hover:border-cyan-900/60'
            }`}
          >
            <input
              type="radio"
              name="answerForNew"
              value="yes"
              checked={answerForNew === 'yes'}
              onChange={() => setAnswerForNew('yes')}
              className="sr-only"
            />
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            <span>Sí</span>
          </label>

          <label
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
              answerForNew === 'no'
                ? 'bg-rose-950/70 border-rose-400 text-rose-300 font-bold shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                : 'bg-[#060c1c]/70 border-slate-800 text-slate-400 hover:border-rose-950'
            }`}
          >
            <input
              type="radio"
              name="answerForNew"
              value="no"
              checked={answerForNew === 'no'}
              onChange={() => setAnswerForNew('no')}
              className="sr-only"
            />
            <X className="w-4 h-4 text-rose-400" />
            <span>No</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="submit"
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-[#050b18] bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 hover:from-cyan-300 hover:to-teal-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer transition-all active:scale-[0.98]"
        >
          <span>Guardar en Memoria y Aprender</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-[#0e172e] hover:bg-[#152344] border border-cyan-900/40 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
