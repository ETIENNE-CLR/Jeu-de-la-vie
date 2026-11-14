/**
 * Méthode pour afficher un rectangle à la vue (utilisé pour les hitbox)
 * @param {CanvasRenderingContext2D} ctx Le contexte de rendu du canvas
 * @param {Rectangle} rectangle Rectangle à afficher 
 * @param {string} [color] Couleur a dessiner du rectangle
 * @param {boolean} [withBorder] Avec ou sans bordure
 */
export function drawRectangle(ctx, rectangle, color = 'rgba(255, 0, 0, 0.4)', withBorder = false) {
    ctx.lineWidth = 1;
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    
    if (withBorder) {
        ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }
}

/**
 * Méthode qui permet de dessiner une croix sur le canvas
 * @param {CanvasRenderingContext2D} ctx Le contexte du canvas
 * @param {number} x La position x
 * @param {number} y La position y
 * @param {number} size La taille des ligne
 */
export function drawCross(ctx, x, y, size = 10) {
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);
    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);
    ctx.stroke();
}