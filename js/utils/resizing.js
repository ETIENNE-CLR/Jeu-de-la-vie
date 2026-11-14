import { Size } from "../game/config/Size.js";

/**
 * Permet de définir la taille du canvas
 * @param {HTMLCanvasElement} canvas L'élement canvas
 * @param {number} ratio Le ratio à appliquer au canevas
 */
export function resizeCanvas(canvas, ratio = null) {
    let withRatio = (ratio != null);
    if (withRatio) {
        // Pour une size avec un ratio
        const calcSize = calcScreenSizeRatio(0.99, ratio);
        canvas.width = calcSize.width;
        canvas.height = calcSize.height;
    } else {
        // Sans ratio
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    canvas.width = Math.round(canvas.width);
    canvas.height = Math.round(canvas.height);
}

/**
 * Méthode qui permet de calculer la taille adapté à l'écran
 * @param {number} padding la marge interieur au bord de l'écran
 * @param {number} ratio le ratio de l'écran
 * @returns {Size} La taille calculée
 */
export function calcScreenSizeRatio(padding, ratio) {
    // Taille maximale utilisable
    let maxWidth = window.innerWidth * padding;
    let maxHeight = window.innerHeight * padding;

    // On calcule d'abord la largeur idéale
    let width = maxWidth;
    let height = width / ratio;

    // Si la hauteur dépasse, on ajuste
    if (height > maxHeight) {
        height = maxHeight;
        width = height * ratio;
    }
    return new Size(width, height);
}
