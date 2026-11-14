import { Vector2 } from "../game/config/Vector2.js";

/**
 * Méthode qui me permet de récupérer le bon nombre de `../`
 * en fonction du nombre de / dans l'URL
 * @returns {string} les '../'
 */
export function getAddonPath() {
    const path = window.location.pathname;
    const slashCount = (path.match(/\//g) || []).length;
    let addonPath = '';

    for (let i = slashCount; i > 1; i--) {
        addonPath += '../';
    }
    return addonPath;
}

/**
 * Teste si deux coordonnées (x, y) ne dépassent
 * pas les limites de la grille de jeu
 * @param {number} x Coordonnée x
 * @param {number} y Coordonnée y
 * @param {Vector2} max Coordonnées maximales
 * @returns {boolean} Si la position est en
 * dehors de la grille
 */
export function posInsideGrid(x, y, max) {
    return !(x < 0 || y < 0 || x >= max.X || y >= max.Y);
}