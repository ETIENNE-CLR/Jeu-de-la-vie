import { screenSize } from "../../game.js";
import { posInsideGrid } from "../../utils/env.js";
import { changeFillRate, FILL_RATE, FILL_RATE_BASE, isKeyPressedOnce, } from "../../utils/var.js";
import { Tile } from "../config/Tile.js";
import { Vector2 } from "../config/Vector2.js";
import { LIFE_PATTERNS_KEYS } from "../enums/LifePatterns.js";
import { AbstractViewScreen } from "./AbstractViewScreen.js";

const RESOLUTION = 200;
const TIMEOUT_RESET = 100;
let TIMEOUT_MS = TIMEOUT_RESET;

/**
 * Classe représentant l'écran de jeu principal.
 * @class GameScreen
 * @extends AbstractViewScreen
 */
export class Main extends AbstractViewScreen {
    /**
     * Grille tableau en 2D [x][y] de carré
     * @type {Tile[][]}
     */
    #grid;

    /**
     * Temps écoulé
     * @type {number}
     */
    #elapsedTime;

    /**
     * Dit si le jeu est en pause ou pas
     * @type {boolean}
     */
    #on_pause;

    /**
     * Retourne les coordonnées maximales
     * pour les axes x et y de la fenêtre
     * @type {Vector2}
     */
    get MAX() {
        return new Vector2(
            RESOLUTION,
            Math.round(RESOLUTION * screenSize.height / screenSize.width)
        )
    }

    /**
     * Taille d'une cellule
     * @type {number}
     */
    get TILE_SIZE() { return screenSize.width / this.MAX.X }


    constructor() {
        super();
        this.#elapsedTime = 0;
        this.#genGrid();
    }

    /**
     * Reset la grille, elle permet de repartir à 0
     * et sélectionne aléatoirement des cellules vivantes
     */
    #genGrid() {
        this.#grid = [];
        for (let x = 0; x < this.MAX.X; x++) {
            this.#grid[x] = [];

            for (let y = 0; y < this.MAX.Y; y++) {
                this.#grid[x][y] = new Tile(
                    x * this.TILE_SIZE,
                    y * this.TILE_SIZE,
                    this.TILE_SIZE
                );
            }
        }
    }

    async loadContent() { }

    update(deltaTime) {
        // Pause
        if (isKeyPressedOnce(' ')) {
            this.#on_pause = !this.#on_pause;
        }
        if (this.#on_pause) return;

        // Timer
        this.#elapsedTime += deltaTime;
        if (this.#elapsedTime < TIMEOUT_MS)
            return;
        this.#elapsedTime -= TIMEOUT_MS;

        // Commandes
        if (this.#keysListener()) {
            this.#elapsedTime = 0;
            return;
        }

        // Générer une nouvelle génération
        let newGen = this.#nextGeneration();
        for (let x = 0; x < this.MAX.X; x++) {
            for (let y = 0; y < this.MAX.Y; y++) {
                this.#grid[x][y].dead = newGen[x][y];
            }
        }
    }

    /**
     * Génère une nouvelle génération de vie
     * @returns {boolean[][]} Nouvelle génération de la grille
     */
    #nextGeneration() {
        const nextGrid = [];
        for (let x = 0; x < this.MAX.X; x++) {
            nextGrid[x] = [];

            for (let y = 0; y < this.MAX.Y; y++) {
                let cell = this.#grid[x][y];
                let neighboursCount = 0;

                // Parcours des cases voisines
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {

                        // Ignorer la case actuelle
                        if (dx == 0 && dy == 0)
                            continue;

                        let xNeighbor = x + dx;
                        let yNeighbor = y + dy;

                        // Verification
                        if (posInsideGrid(xNeighbor, yNeighbor, this.MAX)) {
                            if (!this.#grid[xNeighbor][yNeighbor].dead)
                                neighboursCount++;
                        }
                    }
                }

                // Règles du jeu de la vie :
                // Teste d'état en fonction des cellules voisines
                nextGrid[x][y] = cell.dead
                    /* si la cellule est morte */ ? neighboursCount < 3 || neighboursCount > 3
                    /* si la cellule est vivan */ : neighboursCount < 2 || neighboursCount > 3;
            }
        }
        return nextGrid;
    }

    /**
     * Fonction qui gère les entrées clavier lors de la simulation
     * @returns {boolean} si une touche a été préssée
     */
    #keysListener() {
        let value = 30;

        // Modifier la vitesse
        if (isKeyPressedOnce('ArrowLeft')) {
            // Ralentir
            TIMEOUT_MS = Math.min(1000, TIMEOUT_MS + value);
            return true;
        }
        if (isKeyPressedOnce('ArrowRight')) {
            // Accélérer
            TIMEOUT_MS = Math.max(5, TIMEOUT_MS - value);
            return true;
        }
        if (isKeyPressedOnce('ArrowDown')) {
            // reset la vitesse
            TIMEOUT_MS = TIMEOUT_RESET;
            return true;
        }

        // Controle
        if (isKeyPressedOnce('r')) {
            // Reset la génération
            this.#genGrid();
            return true;
        }
        if (isKeyPressedOnce('i')) {
            // afficher la vitesse
            console.log(TIMEOUT_MS);
            return true;
        }
        if (isKeyPressedOnce('0')) {
            // Reset le taux de vie
            changeFillRate(FILL_RATE_BASE);
            this.#genGrid();
            return true;
        }
        if (isKeyPressedOnce(LIFE_PATTERNS_KEYS.CANON_PLANEURS)) {
            // Afficher manuellement un canon à planeur
            changeFillRate(0); // ne pas mettre de cellule vivante
            this.#genGrid();
            this.#loadPattern(LIFE_PATTERNS_KEYS.CANON_PLANEURS);
            return true;
        }
    }

    /**
     * Permet d'afficher une configuration de vie spéciale
     * @param {string} key Clé constant qui permet de dire quel patterne de vie afficher
     */
    #loadPattern(key) {
        let pattern;
        let width;
        let height;

        switch (key) {
            case LIFE_PATTERNS_KEYS.CANON_PLANEURS:
                pattern = "24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8bo3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!";
                width = 36;
                height = 9;
                break;

            default:
                return;
        }

        // Vérifier que la grille peut accueillir le pattern
        if (this.MAX.X < width || this.MAX.Y < height)
            return;

        // Centrer le pattern
        const offsetX = Math.floor((this.MAX.X - width) / 3);
        const offsetY = Math.floor((this.MAX.Y - height) / 3);

        // Décoder le RLE
        let x = 0;
        let y = 0;
        let count = "";

        for (const char of pattern) {
            if (char >= "0" && char <= "9") {
                count += char;
                continue;
            }

            const run = count === "" ? 1 : Number(count);
            count = "";

            switch (char) {
                case "b":
                    x += run;
                    break;

                case "o":
                    for (let i = 0; i < run; i++) {
                        this.#grid[offsetX + x][offsetY + y].dead = false;
                        x++;
                    }
                    break;

                case "$":
                    y += run;
                    x = 0;
                    break;

                case "!":
                    return;
            }
        }
    }

    draw(ctx) {

        // Fond en noir
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, screenSize.width, screenSize.height);

        // Affichage de la grille
        for (let x = 0; x < this.MAX.X; x++) {
            for (let y = 0; y < this.MAX.Y; y++) {
                this.#grid[x][y].draw(ctx);
            }
        }
    }
}