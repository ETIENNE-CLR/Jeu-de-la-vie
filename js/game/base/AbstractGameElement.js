import { getNumberFromPourcentage } from "../../utils/tools/logics.js";
import { Rectangle } from "../config/Rectangle.js";
import { Size } from "../config/Size.js";
import { Texture } from "../config/Texture.js";
import { Vector2 } from "../config/Vector2.js";
import { AssetsManager } from "../managers/AssetsManager.js";
import { AbstractGameElementInterface } from "./AbstractGameElementInterface.js";

/**
 * Classe abstraite pour un élement de jeu
 * @class AbstractGameElement
 * @extends AbstractGameElementInterface
 */
export class AbstractGameElement extends AbstractGameElementInterface {
    /**
     * Position de l'élement
     * @type {Vector2}
     */
    _position;

    /**
     * Nom de la texture associée
     * @type {string}
     */
    _textureName;

    /**
     * Vélocité de l'élement
     * @type {Vector2}
     */
    _velocity;

    /**
     * Facteur de zoom pour l'affichage
     * @type {number}
     */
    _scale;

    /**
     * Indicateur d'affichage de la hitbox
     * @type {boolean}
     */
    _showHitbox;

    //#region getters
    // ==================================================
    //                       GETTER
    // ==================================================

    /**
     * Position de l'élement
     * @type {Vector2}
     */
    get Position() { return this._position }
    
    /**
     * Texture de l'élement
     * @type {Texture}
     */
    get Texture() {
        let n = this.TextureName;
        return (n) ? AssetsManager.GetTexture(n) : null; 
    }

    /**
     * Nom de la texture associée
     * @type {string}
     */
    get TextureName() { return this._textureName; }

    /**
     * Vélocité de l'élement
     * @type {Vector2}
     */
    get Velocity() { return this._velocity }

    /**
     * Facteur de zoom pour l'affichage
     * @type {number}
     */
    get Scale() { return this._scale };

    /**
     * Si l'élement doit se draw à -50% de sa position
     * @type {boolean}
     */
    _translate;

    /**
     * Si l'élement doit se draw à -50% de sa position
     * @type {boolean}
     */
    get Translate() { return this._translate; }

    /**
     * Indicateur d'affichage de la hitbox
     * @type {boolean}
     */
    get ShowHitbox() { return this._showHitbox; }

    /**
     * Dimension de l'élement
     * @type {Size}
     */
    get Size() {
        return (this.Texture) ? new Size(this.Texture.img.width, this.Texture.img.height) : this._size
    }

    /**
     * Si l'élement est retourné
     * @type {boolean}
     */
    _flipped;

    /**
     * Si l'élement est retourné
     * @type {boolean}
     */
    get Flipped() { return this._flipped }

    /**
     * Hitbox de l'élement
     * @type {Rectangle}
     */
    get Hitbox() {
        let rect = new Rectangle(
            this.Position.x,
            this.Position.y,
            this.Size.width * this.Scale,
            this.Size.height * this.Scale
        );

        if (this.Translate) {
            rect.x -= getNumberFromPourcentage(50, rect.width);
            rect.y -= getNumberFromPourcentage(50, rect.height);
        }
        return rect;
    }
    //#endregion

    /**
     * Constructeur de la classe AbstractGameElement.
     * @param {Vector2} position La position initiale de l'entité
     * @param {Vector2} velocity La vélocité initiale de l'entité
     * @param {number} scale Facteur de zoom pour l'affichage
     */
    constructor(position, velocity, scale = 1) {
        super();
        this._position = position;
        this._size = new Size(0, 0);
        this._velocity = velocity;
        this._scale = scale;
        this._textureName = null;
        this._showHitbox = false;
        this._translate = false;
    }
}
