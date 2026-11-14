import { screenSize } from "../../game.js";
import { Tile } from "../config/Tile.js";
import { AbstractViewScreen } from "./AbstractViewScreen.js";

const RESOLUTION = 75;
const TIMEOUT_MS = 1000;

/**
 * Classe représentant l'écran de jeu principal.
 * @class GameScreen
 * @extends AbstractViewScreen
 */
export class Main extends AbstractViewScreen {
    /**
     * Grille tableau en 2D [x][y] de carré
     * @type {Tile[]}
     */
    #grid;

    get MAX_X() { return RESOLUTION }
    get MAX_Y() {
        return Math.round(RESOLUTION * screenSize.height / screenSize.width);
    }

    get TILE_SIZE() {
        return screenSize.width / this.MAX_X;
    }

    constructor() {
        super();

        // Création de la grille de jeu
        this.#grid = [];
        for (let x = 0; x < this.MAX_X; x++) {
            this.#grid[x] = [];

            for (let y = 0; y < this.MAX_Y; y++) {
                this.#grid[x][y] = new Tile(
                    x * this.TILE_SIZE,
                    y * this.TILE_SIZE,
                    this.TILE_SIZE
                );
            }
        }
    }

    /**
     * Génère une grille adapté à l'écran (taille du caneva)
     * (écrase `this.#grid`)
     */
    #genGrid() {
    }

    async loadContent() { }

    update(deltaTime) { }

    draw(ctx) {

        // Fond en noir
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, screenSize.width, screenSize.height);

        // Affichage de la grille
        for (let x = 0; x < this.MAX_X; x++) {
            for (let y = 0; y < this.MAX_Y; y++) {
                this.#grid[x][y].draw(ctx);
            }
        }
    }
}