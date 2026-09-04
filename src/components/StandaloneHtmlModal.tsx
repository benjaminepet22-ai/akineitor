import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, FileCode } from 'lucide-react';
import { getStandaloneHtmlCode } from '../utils/generateStandaloneHtml';

interface StandaloneHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneHtmlModal: React.FC<StandaloneHtmlModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const htmlCode = getStandaloneHtmlCode();

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback copy
      const textarea = document.createElement('textarea');
      textarea.value = htmlCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'genio-adivinador.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#070d1e] border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.2)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-900/40 bg-[#050a17]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 tracking-wide">
                Archivo Único HTML5 + JS Autónomo
              </h2>
              <p className="text-xs text-slate-400">
                HTML, CSS y JavaScript integrados en un solo bloque listo para copiar y ejecutar en cualquier navegador
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-cyan-950/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-[#050b18] border-b border-cyan-900/40">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Tamaño: ~14 KB | Sin dependencias externas | Ejecutable offline</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                copied
                  ? 'bg-cyan-400 text-[#050b18] shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-teal-400 text-[#050b18] shadow-[0_0_15px_rgba(6,182,212,0.25)]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>¡Código Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código Completo</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-cyan-200 bg-[#0e172e] hover:bg-[#152344] hover:text-white border border-cyan-900/50 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .html</span>
            </button>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#040814] text-left font-mono text-xs text-cyan-100/85 leading-relaxed select-all border-y border-cyan-950">
          <pre className="whitespace-pre-wrap break-all">
            {htmlCode}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-cyan-900/40 bg-[#050a17] text-xs text-slate-400 flex items-center justify-between">
          <span>Solo guarda el texto en un archivo con extensión <code>.html</code> y ábrelo con doble clic.</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#0e172e] hover:bg-[#152344] text-slate-300 hover:text-white border border-cyan-900/50 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
