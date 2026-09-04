import React, { useState } from 'react';
import { X, Network, CornerDownRight, HelpCircle, User, Sparkles } from 'lucide-react';
import { TreeNode } from '../types';
import { countLeaves } from '../data/defaultTree';

interface TreeVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rootNode: TreeNode;
}

export const TreeVisualizerModal: React.FC<TreeVisualizerModalProps> = ({
  isOpen,
  onClose,
  rootNode
}) => {
  const [filterText, setFilterText] = useState('');

  if (!isOpen) return null;

  const totalLeaves = countLeaves(rootNode);

  // Recursive tree renderer
  const renderNode = (node: TreeNode | undefined, branchLabel?: string, depth = 0): React.ReactNode => {
    if (!node) return null;

    const isLeaf = !node.question && Boolean(node.name);
    const matchesFilter = filterText.trim() === '' || 
      (node.question?.toLowerCase().includes(filterText.toLowerCase())) ||
      (node.name?.toLowerCase().includes(filterText.toLowerCase()));

    return (
      <div key={node.id} className={`flex flex-col text-left ${depth > 0 ? 'ml-4 sm:ml-6 pl-2.5 border-l border-cyan-900/40' : ''}`}>
        <div className={`my-1 p-2 rounded-xl text-xs sm:text-sm transition-all flex items-start gap-2 ${
          matchesFilter ? 'opacity-100' : 'opacity-30'
        } ${
          isLeaf 
            ? 'bg-cyan-950/60 border border-cyan-400/50 text-cyan-100 shadow-[0_0_12px_rgba(6,182,212,0.15)]' 
            : 'bg-[#0a1329] border border-cyan-900/50 text-slate-200'
        }`}>
          {branchLabel && (
            <span className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
              branchLabel === 'Sí' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}>
              <CornerDownRight className="w-2.5 h-2.5 mr-0.5" />
              {branchLabel}
            </span>
          )}

          {isLeaf ? (
            <div className="flex items-center gap-1.5 font-semibold">
              <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-cyan-200">{node.name}</span>
            </div>
          ) : (
            <div className="flex items-start gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="font-medium text-slate-300">{node.question}</span>
            </div>
          )}
        </div>

        {/* Child branches */}
        {!isLeaf && (
          <div className="flex flex-col">
            {node.yes && renderNode(node.yes, 'Sí', depth + 1)}
            {node.no && renderNode(node.no, 'No', depth + 1)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#070d1e] border border-cyan-500/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.2)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-900/40 bg-[#050a17]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 tracking-wide">
                Árbol Binario de Decisión
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-400/40 font-mono">
                  {totalLeaves} personajes
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Estructura jerárquica de nodos y bifurcaciones Sí/No
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

        {/* Filter input */}
        <div className="px-5 py-2.5 bg-[#050b18] border-b border-cyan-900/40">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Buscar pregunta o personaje en el árbol..."
            className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#0a1226] border border-cyan-900/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-colors"
          />
        </div>

        {/* Tree Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-1 bg-[#070d1e]">
          {renderNode(rootNode)}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-cyan-900/40 bg-[#050a17] text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cada vez que el oráculo aprende, este árbol se expande automáticamente en memoria.</span>
          </div>
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
