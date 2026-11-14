/**
 * Classe représentant un rectangle.
 * Elle sert principalement pour la gestion des collisions.
 * @class Rectangle
 */
export class Tile {
    /**
     * Coordonnée X du rectangle
     * @type {number}
     */
    x;

    /**
     * Coordonnée Y du rectangle
     * @type {number}
     */
    y;

    /**
     * Taille du carré
     * @type {number}
     */
    length;

    /**
     * Définit si la tuile est morte ou pas
     * - Si elle est vivante, elle sera affichée en blanc
     * - Sinon, elle sera en noire
     * @type {boolean}
     */
    dead;

    /**
     * Couleur du rectangle
     * @type {string}
     */
    get Color() { return this.dead ? "#000" : "#fff" }

    /**
     * Taille en pixel d'une tuile
     * @type {number}
     */
    static get SIZE() { return 10 }


    /**
     * Permet de créer un rectangle.
     * @param {number} x La position x du rectangle
     * @param {number} y La position y du rectangle
     * @param {number} length La taille du carrée
     */
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.dead = Math.random() < 0.4;
    }

    /**
     * Méthode pour vérifier la collision avec un autre rectangle.
     * @param {Tile} other Rectangle de collisions
     * @returns {boolean} true si collision, false sinon
     */
    intersects(other) {
        return !(
            this.x + this.length <= other.x ||
            this.x >= other.x + other.length ||
            this.y + this.length <= other.y ||
            this.y >= other.y + other.length
        );
    }

    draw(ctx) {
        ctx.fillStyle = this.Color;
        ctx.fillRect(this.x, this.y, this.length, this.length);
    }
}