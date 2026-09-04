/**
 * Binary Decision Tree node interface
 */
export interface TreeNode {
  id: string;
  // If it's an internal question node:
  question?: string;
  yes?: TreeNode; // branch taken if answer is 'Sí'
  no?: TreeNode;  // branch taken if answer is 'No'
  // If it's a leaf node (character/object guess):
  name?: string;
  hint?: string;
  category?: 'personaje' | 'objeto' | 'animal' | 'lugar' | 'otro';
}

export type GamePhase = 
  | 'start'        // Initial greeting / intro
  | 'questioning'  // Answering questions traversing the tree
  | 'guessing'     // Reached a leaf node, making the final guess
  | 'victory'      // Genie guessed correctly
  | 'learning'     // Genie guessed wrong, learning new item
  | 'learned';     // Finished learning, confirmation message

export interface HistoryStep {
  nodeId: string;
  question: string;
  answer: 'yes' | 'no';
}

export interface LearnFormState {
  newCharacterName: string;
  differentiatingQuestion: string;
  correctAnswerForNew: 'yes' | 'no';
}
