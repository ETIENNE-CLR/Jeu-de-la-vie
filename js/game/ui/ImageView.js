import { Vector2 } from "../config/Vector2.js";
import { DEV_MOD } from "../../var.js";
import { AssetsManager } from "../managers/AssetsManager.js";
import { drawRectangle, findIdTexture } from "../../others/Tools.js";
import { AbstractGameElement } from "../base/AbstractGameElement.js";

/**
 * Classe qui représente une simple image afficher
 * @class ImageView
 * @extends AbstractGameElement
 */
export class ImageView extends AbstractGameElement {
    /**
     * Constructeur de la classe...
     * @param {string} ressource Chemin d'accès de la ressource
     * @param {Vector2} position Position de l'element
     * @param {number} scale Echelle à laquelle on doit l'afficher
     */
    constructor(ressource, position, scale = 1) {
        super(position, Vector2.Zero, scale);
        this._textureName = findIdTexture(this.constructor);
        this.ressource = ressource;
        // this._showHitbox = true;
        this._translate = true;
    }

    async loadContent() {
        await AssetsManager.LoadTexture(this._textureName, this.ressource);
    }

    draw(ctx) {
        let rect = this.Hitbox;
        ctx.drawImage(this.Texture.img,
            rect.x, rect.y,
            rect.width, rect.height
        );

        // Hitbox de debug
        if (DEV_MOD && this.ShowHitbox) {
            drawRectangle(ctx, rect);
        }
    }
}