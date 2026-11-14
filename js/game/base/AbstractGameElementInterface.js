/**
 * Classe abstraite représentant un élément de jeu.
 * Toutes les classes de jeu doivent hériter de cette classe.
 * @class AbstractGameElementInterface
 */
export class AbstractGameElementInterface {
    /**
     * Méthode pour charger le contenu de l'élément de jeu.
     * @throws {Error} Si la méthode n'est pas implémentée
     */
    async loadContent() {
        throw new Error("Méthode LoadContent non implémentée.");
    }

    /**
     * Méthode pour mettre à jour l'élément de jeu.
     * @param {number} deltaTime Le temps écoulé depuis la dernière mise à jour
     * @throws {Error} Si la méthode n'est pas implémentée
     */
    update(deltaTime) {
        throw new Error("Méthode Update non implémentée.");
    }

    /**
     * Méthode pour dessiner l'élément de jeu.
     * @param {CanvasRenderingContext2D} ctx Le contexte de rendu du canvas
     * @throws {Error} Si la méthode n'est pas implémentée
     */
    draw(ctx) {
        throw new Error("Méthode Draw non implémentée.");
    }
}