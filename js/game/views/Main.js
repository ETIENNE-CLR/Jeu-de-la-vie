import { screenSize } from "../../game.js";
import { posInsideGrid } from "../../utils/env.js";
import { KEYS_INPUT } from "../../utils/var.js";
import { Tile } from "../config/Tile.js";
import { Vector2 } from "../config/Vector2.js";
import { AbstractViewScreen } from "./AbstractViewScreen.js";

const RESOLUTION = 340;
const TIMEOUT_MS = 125;

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

        // Timer
        this.#elapsedTime += deltaTime;
        if (this.#elapsedTime < TIMEOUT_MS)
            return;
        this.#elapsedTime -= TIMEOUT_MS;

        // Reset
        if (KEYS_INPUT[' ']) {
            this.#genGrid();
        }

        // Parcourir chaque cellule
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

                // Ajouter une cellule sur la nouvelle grille
                nextGrid[x][y] = new Tile(
                    x * this.TILE_SIZE,
                    y * this.TILE_SIZE,
                    this.TILE_SIZE
                );

                // Règles du jeu de la vie :
                // Teste d'état en fonction des cellules voisines
                nextGrid[x][y].dead = cell.dead
                    /* si la cellule est morte */ ? neighboursCount < 3 || neighboursCount > 3
                    /* si la cellule est vivan */ : neighboursCount < 2 || neighboursCount > 3;
            }
        }

        // Remplacer la grille par la nouvelle génération
        this.#grid = nextGrid;
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