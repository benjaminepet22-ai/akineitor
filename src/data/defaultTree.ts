import { TreeNode } from '../types';

export const INITIAL_DECISION_TREE: TreeNode = {
  id: 'root-1',
  question: '¿Es un ser vivo (persona, animal o criatura ficticia)?',
  yes: {
    id: 'node-fiction',
    question: '¿Es un personaje de ficción o fantasía?',
    yes: {
      id: 'node-superhero',
      question: '¿Tiene superpoderes o trepa muros con telarañas?',
      yes: {
        id: 'leaf-spiderman',
        name: 'Spider-Man (El Hombre Araña)',
        category: 'personaje',
        hint: 'Héroe de Marvel que defiende Nueva York'
      },
      no: {
        id: 'node-videogame',
        question: '¿Es un fontanero de videojuegos con bigote y gorra roja?',
        yes: {
          id: 'leaf-mario',
          name: 'Mario Bros',
          category: 'personaje',
          hint: 'El fontanero más famoso del Reino Champiñón'
        },
        no: {
          id: 'leaf-harry-potter',
          name: 'Harry Potter',
          category: 'personaje',
          hint: 'El joven mago con la cicatriz de rayo'
        }
      }
    },
    no: {
      id: 'node-science',
      question: '¿Es o fue una persona destacada en la ciencia o física?',
      yes: {
        id: 'leaf-einstein',
        name: 'Albert Einstein',
        category: 'personaje',
        hint: 'Físico teórico creador de la teoría de la relatividad'
      },
      no: {
        id: 'node-football',
        question: '¿Es un futbolista legendario campeón del mundo conocido como "La Pulga"?',
        yes: {
          id: 'leaf-messi',
          name: 'Lionel Messi',
          category: 'personaje',
          hint: 'Astro del fútbol mundial con 8 Balones de Oro'
        },
        no: {
          id: 'leaf-davinci',
          name: 'Leonardo da Vinci',
          category: 'personaje',
          hint: 'Polímata renacentista, creador de la Mona Lisa'
        }
      }
    }
  },
  no: {
    id: 'node-electronic',
    question: '¿Es un dispositivo electrónico o tecnológico?',
    yes: {
      id: 'node-phone',
      question: '¿Tiene pantalla táctil y cabe fácilmente en tu bolsillo?',
      yes: {
        id: 'leaf-phone',
        name: 'Un Teléfono Inteligente (Smartphone)',
        category: 'objeto',
        hint: 'Dispositivo móvil que casi todos llevan consigo'
      },
      no: {
        id: 'leaf-laptop',
        name: 'Una Computadora Portátil (Laptop)',
        category: 'objeto',
        hint: 'Equipo portátil con teclado y pantalla plegable'
      }
    },
    no: {
      id: 'node-music',
      question: '¿Es un instrumento musical con cuerdas que se toca con los dedos?',
      yes: {
        id: 'leaf-guitar',
        name: 'Una Guitarra',
        category: 'objeto',
        hint: 'Instrumento musical clásico y eléctrico'
      },
      no: {
        id: 'leaf-book',
        name: 'Un Libro',
        category: 'objeto',
        hint: 'Conjunto de páginas encuadernadas con historias o conocimiento'
      }
    }
  }
};

const STORAGE_KEY = 'akinator_decision_tree_v1';

/**
 * Counts all leaf nodes (characters and objects) stored in the decision tree
 */
export function countLeaves(node: TreeNode | undefined): number {
  if (!node) return 0;
  if (!node.question && node.name) return 1;
  return countLeaves(node.yes) + countLeaves(node.no);
}

/**
 * Retrieves all items currently stored in the tree
 */
export function getAllItems(node: TreeNode | undefined): { name: string; category?: string }[] {
  if (!node) return [];
  if (!node.question && node.name) {
    return [{ name: node.name, category: node.category }];
  }
  return [...getAllItems(node.yes), ...getAllItems(node.no)];
}

/**
 * Inserts a new distinguishing question and character at the target leaf's place.
 * Returns a new cloned tree with the updated structure.
 */
export function insertNewNode(
  root: TreeNode,
  targetLeafId: string,
  newQuestion: string,
  newCharacterName: string,
  answerForNew: 'yes' | 'no'
): TreeNode {
  function traverseAndReplace(current: TreeNode): TreeNode {
    if (current.id === targetLeafId) {
      const newLeaf: TreeNode = {
        id: `leaf-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: newCharacterName.trim(),
        category: 'otro'
      };

      const oldLeafCopy: TreeNode = {
        ...current,
        id: `leaf-old-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
      };

      // Ensure proper punctuation on the question
      let formattedQuestion = newQuestion.trim();
      if (!formattedQuestion.startsWith('¿')) formattedQuestion = '¿' + formattedQuestion;
      if (!formattedQuestion.endsWith('?')) formattedQuestion = formattedQuestion + '?';

      const splitNode: TreeNode = {
        id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        question: formattedQuestion,
        yes: answerForNew === 'yes' ? newLeaf : oldLeafCopy,
        no: answerForNew === 'yes' ? oldLeafCopy : newLeaf
      };

      return splitNode;
    }

    const updatedNode: TreeNode = { ...current };
    if (current.yes) {
      updatedNode.yes = traverseAndReplace(current.yes);
    }
    if (current.no) {
      updatedNode.no = traverseAndReplace(current.no);
    }
    return updatedNode;
  }

  return traverseAndReplace(root);
}

/**
 * Load tree from browser storage or fallback to default initial tree
 */
export function loadTreeFromStorage(): TreeNode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && (parsed.question || parsed.name)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read tree from localStorage', e);
  }
  return INITIAL_DECISION_TREE;
}

/**
 * Save tree to browser storage
 */
export function saveTreeToStorage(tree: TreeNode): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
  } catch (e) {
    console.warn('Could not save tree to localStorage', e);
  }
}

/**
 * Reset decision tree to preloaded default
 */
export function resetTreeToDefault(): TreeNode {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear localStorage', e);
  }
  return JSON.parse(JSON.stringify(INITIAL_DECISION_TREE));
}
