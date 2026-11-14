/**
 * Classe représentant une taille en 2D.
 * @class Size
 */
export class Size {

    /**
     * Renvoie une taille nulle (0, 0).
     * @returns {Size} La taille nulle
     */
    static get Zero() {
        return new Size(0, 0);
    }

    /**
     * Creates an instance of Size.
     * @param {number} width Largeur de l'élément
     * @param {number} height Hauteur de l'élément
     */
    constructor(width = 0, height = 0) {
        this.width = width
        this.height = height
    }

    /**
     * Méthode qui retourne l'objet mais de type JSON
     * @returns {JSON} Json de la classe
     */
    toJson() {
        return {
            width: this.width,
            height: this.height
        }
    }

    /**
     * Méthode qui transforme le json en instance de la classe
     * @param {JSON} json Json de la classe
     * @returns {Size} Intance de la classe créé à partir du JSON
     */
    static fromJson(json) {
        return new Size(json.width, json.height);
    }
}