/**
 * Classe représentant un vecteur en 2 dimensions.
 * @class Vector2
 */
export class Vector2 {
    /**
     * La coordonnée X du vecteur.
     */
    x;

    /**
     * La coordonnée Y du vecteur.
     */
    y;

    /**
     * Renvoie un vecteur nul (0, 0).
     * @returns {Vector2} Le vecteur nul
     */
    static get Zero() {
        return new Vector2(0, 0);
    }

    /**
     * Crée un vecteur en 2 dimensions.
     * @param {number} x coordonée x
     * @param {number} y coordonée y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Méthode pour convertir la classe en JSON.
     * @returns {JSON} La classe format JSON
     */
    toJson() {
        return {
            x: this.x,
            y: this.y
        }
    }

    /**
     * Méthode statique pour créer une instance de Vector2 à partir d'un JSON.
     * @param {JSON} json Le JSON à convertir
     * @returns {Vector2} L'instance de Vector2 créée
     */
    static fromJson(json) {
        return new Vector2(json.x, json.y);
    }
}