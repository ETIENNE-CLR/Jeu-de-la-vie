import { Size } from "./game/config/Size.js";
import { Main } from "./game/views/Main.js";
import { resizeCanvas } from "./utils/resizing.js";
import { KEYS_INPUT, KEYS_PREVIOUS, MOUSE } from "./utils/var.js";

// Initialisation du canvas
let currentWindow = null;

/**
 * Taille du canvas
 * @type {Size}
 */
export let screenSize = null;

const canvas = document.getElementById('gamescreen');
const ctx = canvas.getContext('2d');
window.addEventListener('resize', () => {
    let ratio = currentWindow ? currentWindow.Ratio : null;
    resizeCanvas(canvas, ratio);
    screenSize = new Size(canvas.width, canvas.height);
});
window.dispatchEvent(new Event('resize'));

// Views
export const windows = {
    main: new Main()
};

// Au chargement de la fenêtre
document.addEventListener('DOMContentLoaded', async () => {
    // Init vue
    currentWindow = windows.main;
    window.dispatchEvent(new Event('resize'));

    // Lancement du jeu
    let lastTime = performance.now();
    await loadContent();
    inputListener();
    gameLoop();

    function gameLoop() {
        const now = performance.now();
        const delta = (now - lastTime); // en millisecondes
        lastTime = now;

        update(delta);
        draw();

        for (const key in KEYS_INPUT) {
            KEYS_PREVIOUS[key] = KEYS_INPUT[key];
        }

        requestAnimationFrame(gameLoop);
    }

    async function loadContent() {
        // Vues
        await Promise.all(Object.keys(windows).map(wKey => windows[wKey].loadContent()));
        console.log('content loaded');
    }

    function inputListener() {
        // Input du clavier
        document.addEventListener('keydown', (e) => {
            KEYS_INPUT[e.key.toUpperCase()] = true;
        });
        document.addEventListener('keyup', (e) => {
            KEYS_INPUT[e.key.toUpperCase()] = false;
        });

        // Mouvement du curseur
        document.addEventListener('mousemove', (e) => {
            MOUSE.x = e.offsetX;
            MOUSE.y = e.offsetY;
        });
        document.addEventListener('mousedown', (e) => {
            MOUSE.clicked = true;
        });
        document.addEventListener('mouseup', (e) => {
            MOUSE.clicked = false;
        });

        // Empêcher le zoom de l'utilisateur
        window.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        }, { passive: false });
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && ['+', '-', '0', '='].includes(e.key)) {
                e.preventDefault();
            }
        });
    }

    function update(delta) {
        currentWindow.update(delta);
    }

    function draw() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;
        currentWindow.draw(ctx);
    }
});

export function changeWindow(window) {
    currentWindow = window;
}