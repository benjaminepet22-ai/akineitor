/**
 * Generates a clean, standalone, zero-dependency single HTML file
 * with embedded CSS and JavaScript that can run directly in any web browser.
 */
export function getStandaloneHtmlCode(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>El Genio Adivinador - Árbol de Decisión</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Cinzel:wght@700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #050b18;
      --bg-card: #0a1226;
      --bg-card-alt: #0b1428;
      --accent-cyan: #06b6d4;
      --accent-blue: #3b82f6;
      --accent-teal: #14b8a6;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border-color: rgba(6, 182, 212, 0.3);
      --radius: 20px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      background: radial-gradient(circle at 50% 15%, #0e1e3d 0%, var(--bg-dark) 75%);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      line-height: 1.6;
    }

    .container {
      width: 100%;
      max-width: 580px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(6, 182, 212, 0.15);
      padding: 32px 24px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #06b6d4, #38bdf8, #3b82f6);
    }

    /* Avatar styles */
    .avatar-wrapper {
      position: relative;
      margin-bottom: 20px;
      margin-top: 8px;
    }

    .avatar-circle {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0d1e3a, #071326);
      border: 3px solid var(--accent-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 52px;
      box-shadow: 0 0 30px rgba(6, 182, 212, 0.35);
      animation: float 4s ease-in-out infinite;
      user-select: none;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }

    .lamp-badge {
      position: absolute;
      bottom: -4px;
      right: 4px;
      background: var(--accent-cyan);
      color: #050b18;
      font-size: 14px;
      padding: 3px 8px;
      border-radius: 12px;
      font-weight: 700;
      box-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    h1 {
      font-family: 'Cinzel', serif;
      font-size: 1.6rem;
      letter-spacing: 1px;
      color: #ffffff;
      margin-bottom: 6px;
    }

    .badge-counter {
      display: inline-block;
      font-size: 0.82rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      background: rgba(6, 182, 212, 0.15);
      color: #67e8f9;
      padding: 4px 14px;
      border-radius: 20px;
      border: 1px solid rgba(6, 182, 212, 0.35);
      margin-bottom: 18px;
    }

    /* Speech Bubble */
    .bubble {
      background: var(--bg-card-alt);
      border: 1px solid rgba(6, 182, 212, 0.25);
      border-radius: 14px;
      padding: 22px 20px;
      width: 100%;
      margin-bottom: 24px;
      position: relative;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    }

    .bubble::after {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 10px 10px 10px;
      border-style: solid;
      border-color: transparent transparent var(--bg-card-alt) transparent;
    }

    .speech-text {
      font-size: 1.22rem;
      font-weight: 600;
      color: #ffffff;
      min-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Button Group */
    .btn-group {
      display: flex;
      gap: 16px;
      width: 100%;
      justify-content: center;
    }

    .btn {
      flex: 1;
      padding: 14px 20px;
      font-size: 1.05rem;
      font-weight: 700;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      outline: none;
    }

    .btn:active {
      transform: scale(0.97);
    }

    .btn-yes {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
    }
    .btn-yes:hover {
      background: linear-gradient(135deg, #34d399, #10b981);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.45);
    }

    .btn-no {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: white;
      box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
    }
    .btn-no:hover {
      background: linear-gradient(135deg, #f87171, #ef4444);
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.45);
    }

    .btn-primary {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
      color: white;
      box-shadow: 0 4px 14px rgba(139, 92, 246, 0.35);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #a78bfa, #8b5cf6);
    }

    .btn-secondary {
      background: #374151;
      color: #e5e7eb;
    }
    .btn-secondary:hover {
      background: #4b5563;
    }

    /* Learning form */
    .learn-box {
      width: 100%;
      text-align: left;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 18px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 14px;
    }

    .form-label {
      display: block;
      font-size: 0.88rem;
      font-weight: 600;
      color: #d1d5db;
      margin-bottom: 6px;
    }

    .form-input {
      width: 100%;
      padding: 10px 14px;
      background: #111827;
      border: 1px solid #374151;
      border-radius: 8px;
      color: #fff;
      font-size: 0.95rem;
      font-family: inherit;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--accent-purple);
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    }

    /* Footer & Restart */
    .controls-footer {
      margin-top: 24px;
      padding-top: 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .btn-link {
      background: none;
      border: none;
      color: #a78bfa;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 6px;
      transition: all 0.2s;
    }

    .btn-link:hover {
      color: #fff;
      background: rgba(139, 92, 246, 0.2);
    }

    .hidden {
      display: none !important;
    }
  </style>
</head>
<body>

  <div class="container" id="game-card">
    <div class="avatar-wrapper">
      <div class="avatar-circle" id="avatar-emoji">🧞‍♂️</div>
      <div class="lamp-badge">✨</div>
    </div>

    <h1>EL GENIO ADIVINADOR</h1>
    <div class="badge-counter" id="status-badge">Pregunta #1</div>

    <div class="bubble">
      <div class="speech-text" id="speech-text">
        Piensa en un personaje u objeto... ¿Listo?
      </div>
    </div>

    <!-- State 1: Start Screen -->
    <div id="view-start" class="btn-group">
      <button class="btn btn-primary" id="btn-start" onclick="startGame()">
        🔮 ¡Empezar a Jugar!
      </button>
    </div>

    <!-- State 2: Questioning (Sí / No) -->
    <div id="view-question" class="btn-group hidden">
      <button class="btn btn-yes" onclick="handleAnswer('yes')">
        ✓ ¡Sí!
      </button>
      <button class="btn btn-no" onclick="handleAnswer('no')">
        ✗ ¡No!
      </button>
    </div>

    <!-- State 3: Guess Confirmation -->
    <div id="view-guess" class="btn-group hidden">
      <button class="btn btn-yes" onclick="handleGuessResult(true)">
        🎉 ¡Sí, acertaste!
      </button>
      <button class="btn btn-no" onclick="handleGuessResult(false)">
        ❌ No, fallaste
      </button>
    </div>

    <!-- State 4: Victory -->
    <div id="view-victory" class="hidden" style="width: 100%;">
      <p style="color: #a7f3d0; font-size: 1.1rem; margin-bottom: 18px; font-weight: 600;">
        ¡Lo sabía! Nadie puede ocultar sus pensamientos al gran genio.
      </p>
      <button class="btn btn-primary" style="width: 100%;" onclick="resetGame()">
        🔄 Jugar otra partida
      </button>
    </div>

    <!-- State 5: Learning Form -->
    <div id="view-learn" class="hidden" style="width: 100%;">
      <div class="learn-box">
        <div class="form-group">
          <label class="form-label" for="input-character">1. ¿En qué personaje u objeto estabas pensando?</label>
          <input type="text" id="input-character" class="form-input" placeholder="Ej: Harry Potter, Batman, Una Manzana...">
        </div>

        <div class="form-group">
          <label class="form-label" for="input-question">2. Escribe una pregunta que lo diferencie de "<span id="failed-guess-name" style="color: #fbbf24;"></span>":</label>
          <input type="text" id="input-question" class="form-input" placeholder="Ej: ¿Tiene una cicatriz de rayo en la frente?">
        </div>

        <div class="form-group">
          <label class="form-label">3. Para tu personaje, ¿cuál es la respuesta correcta a esa pregunta?</label>
          <div style="display: flex; gap: 12px; margin-top: 6px;">
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
              <input type="radio" name="new-answer" value="yes" checked> Sí
            </label>
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
              <input type="radio" name="new-answer" value="no"> No
            </label>
          </div>
        </div>
      </div>

      <div class="btn-group">
        <button class="btn btn-primary" onclick="submitLearning()">
          🧠 Enseñar al Genio
        </button>
        <button class="btn btn-secondary" onclick="resetGame()">
          Cancelar
        </button>
      </div>
    </div>

    <!-- State 6: Learned Confirmation -->
    <div id="view-learned" class="hidden" style="width: 100%;">
      <p style="color: #c4b5fd; font-size: 1.05rem; margin-bottom: 18px; font-weight: 500;">
        ¡Gracias! He memorizado esta nueva rama en mi árbol de decisión. ¡La próxima vez no fallaré!
      </p>
      <button class="btn btn-primary" style="width: 100%;" onclick="resetGame()">
        ✨ Probar otra partida
      </button>
    </div>

    <!-- Footer with restart and knowledge counter -->
    <div class="controls-footer">
      <span id="knowledge-counter">📚 Conocimientos: 6</span>
      <div>
        <button class="btn-link" onclick="resetGame()">Reiniciar</button>
        <button class="btn-link" onclick="resetToFactoryTree()">Restaurar inicial</button>
      </div>
    </div>
  </div>

  <script>
    /**
     * ESTRUCTURA DE ÁRBOL DE DECISIÓN BINARIO (Binary Decision Tree)
     * Cada nodo interior tiene: question, rama 'yes', rama 'no'.
     * Cada nodo hoja tiene: name (el personaje u objeto final).
     */
    const INITIAL_TREE = {
      id: 'root',
      question: '¿Es un ser vivo (persona, animal o criatura ficticia)?',
      yes: {
        id: 'n_fiction',
        question: '¿Es un personaje de ficción o fantasía?',
        yes: {
          id: 'n_superhero',
          question: '¿Tiene superpoderes o trepa muros con telarañas?',
          yes: {
            id: 'l_spiderman',
            name: 'Spider-Man (El Hombre Araña)'
          },
          no: {
            id: 'l_mario',
            name: 'Mario Bros'
          }
        },
        no: {
          id: 'n_real_science',
          question: '¿Es o fue una persona destacada en la ciencia o física?',
          yes: {
            id: 'l_einstein',
            name: 'Albert Einstein'
          },
          no: {
            id: 'l_messi',
            name: 'Lionel Messi'
          }
        }
      },
      no: {
        id: 'n_electronic',
        question: '¿Es un dispositivo electrónico o tecnológico?',
        yes: {
          id: 'l_phone',
          name: 'Un Teléfono Móvil (Smartphone)'
        },
        no: {
          id: 'l_book',
          name: 'Un Libro'
        }
      }
    };

    // Estado del juego en memoria
    let decisionTree = JSON.parse(JSON.stringify(INITIAL_TREE));
    let currentNode = null;
    let questionCount = 0;

    // Elementos DOM
    const speechText = document.getElementById('speech-text');
    const statusBadge = document.getElementById('status-badge');
    const avatarEmoji = document.getElementById('avatar-emoji');
    const knowledgeCounter = document.getElementById('knowledge-counter');
    const failedGuessName = document.getElementById('failed-guess-name');

    // Vistas
    const views = {
      start: document.getElementById('view-start'),
      question: document.getElementById('view-question'),
      guess: document.getElementById('view-guess'),
      victory: document.getElementById('view-victory'),
      learn: document.getElementById('view-learn'),
      learned: document.getElementById('view-learned')
    };

    function showView(viewName) {
      Object.keys(views).forEach(key => {
        if (key === viewName) views[key].classList.remove('hidden');
        else views[key].classList.add('hidden');
      });
    }

    function countTreeLeaves(node) {
      if (!node) return 0;
      if (!node.question && node.name) return 1;
      return countTreeLeaves(node.yes) + countTreeLeaves(node.no);
    }

    function updateKnowledgeCounter() {
      const total = countTreeLeaves(decisionTree);
      knowledgeCounter.textContent = '📚 Personajes/Objetos: ' + total;
    }

    function startGame() {
      currentNode = decisionTree;
      questionCount = 1;
      avatarEmoji.textContent = '🤔';
      statusBadge.textContent = 'Pregunta #' + questionCount;
      speechText.textContent = currentNode.question;
      showView('question');
    }

    function handleAnswer(answer) {
      if (!currentNode) return;

      if (answer === 'yes') {
        currentNode = currentNode.yes;
      } else {
        currentNode = currentNode.no;
      }

      // Verificamos si es nodo hoja (adivinación) o nodo de pregunta
      if (currentNode.name) {
        // Llegamos a una hoja: Hacemos la predicción
        avatarEmoji.textContent = '🔮';
        statusBadge.textContent = '¡Adivinación final!';
        speechText.textContent = '¿Estás pensando en: ' + currentNode.name + '?';
        showView('guess');
      } else {
        // Continuamos preguntando
        questionCount++;
        statusBadge.textContent = 'Pregunta #' + questionCount;
        speechText.textContent = currentNode.question;
        avatarEmoji.textContent = (questionCount % 2 === 0) ? '🧐' : '🤔';
      }
    }

    function handleGuessResult(isCorrect) {
      if (isCorrect) {
        // Victoria del Genio
        avatarEmoji.textContent = '🎉';
        statusBadge.textContent = '¡Victoria del Genio!';
        speechText.textContent = '¡Lo sabía! ¡Adiviné tu personaje (' + currentNode.name + ')!';
        showView('victory');
      } else {
        // Fallo: Iniciar aprendizaje
        avatarEmoji.textContent = '😮';
        statusBadge.textContent = '¡Me has sorprendido!';
        speechText.textContent = '¡Vaya, me has vencido! Enséñame para no volver a fallar.';
        failedGuessName.textContent = currentNode.name;
        document.getElementById('input-character').value = '';
        document.getElementById('input-question').value = '';
        showView('learn');
      }
    }

    function submitLearning() {
      const newChar = document.getElementById('input-character').value.trim();
      let newQuest = document.getElementById('input-question').value.trim();
      const ansRadio = document.querySelector('input[name="new-answer"]:checked');
      const ansValue = ansRadio ? ansRadio.value : 'yes';

      if (!newChar) {
        alert('Por favor ingresa en quién o qué estabas pensando.');
        return;
      }
      if (!newQuest) {
        alert('Por favor ingresa una pregunta que lo diferencie.');
        return;
      }

      // Formatear pregunta con signos de interrogación
      if (!newQuest.startsWith('¿')) newQuest = '¿' + newQuest;
      if (!newQuest.endsWith('?')) newQuest = newQuest + '?';

      // Actualizamos el árbol de decisión dinámicamente en memoria
      const oldCharacterName = currentNode.name;
      const oldNodeCopy = {
        id: 'leaf_' + Date.now() + '_old',
        name: oldCharacterName
      };
      const newNodeCopy = {
        id: 'leaf_' + Date.now() + '_new',
        name: newChar
      };

      // Reemplazamos la hoja actual por un nuevo nodo de bifurcación
      delete currentNode.name;
      currentNode.id = 'node_' + Date.now();
      currentNode.question = newQuest;
      if (ansValue === 'yes') {
        currentNode.yes = newNodeCopy;
        currentNode.no = oldNodeCopy;
      } else {
        currentNode.yes = oldNodeCopy;
        currentNode.no = newNodeCopy;
      }

      avatarEmoji.textContent = '🧠';
      statusBadge.textContent = '¡Conocimiento actualizado!';
      speechText.textContent = '¡He añadido a "' + newChar + '" a mi árbol mental!';
      updateKnowledgeCounter();
      showView('learned');
    }

    function resetGame() {
      currentNode = null;
      questionCount = 0;
      avatarEmoji.textContent = '🧞‍♂️';
      statusBadge.textContent = 'Listo para jugar';
      speechText.textContent = 'Piensa en un personaje u objeto... ¿Listo para desafiarme?';
      showView('start');
    }

    function resetToFactoryTree() {
      if (confirm('¿Deseas restaurar el árbol al conjunto inicial de personajes?')) {
        decisionTree = JSON.parse(JSON.stringify(INITIAL_TREE));
        updateKnowledgeCounter();
        resetGame();
      }
    }

    // Inicializar al cargar
    updateKnowledgeCounter();
  </script>
</body>
</html>`;
}
