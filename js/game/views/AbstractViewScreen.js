import { AbstractGameElementInterface } from "../base/AbstractGameElementInterface.js";

/**
 * Classe abstraite pour initialiser une vue
 * @class AbstractViewScreen
 * @extends AbstractGameElementInterface
 */
export class AbstractViewScreen extends AbstractGameElementInterface {
    /**
     * Ratio de la vue
     * @type {number}
     */
    #ratio;

    /**
     * Ratio de la vue
     * @type {number}
     */
    get Ratio() { return this.#ratio; }

    /**
     * Constructeur...
     * @param {number|null} [ratio] Ratio de la fenêtre (optionnel, sinon ce sera en grand écran)
     */
    constructor(ratio = null) {
        super();
        this.#ratio = ratio;
    }
}