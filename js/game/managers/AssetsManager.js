import { Texture } from "../config/Texture.js";

/**
 * Classe gérant les assets du jeu (textures, sprites, animations).
 * @class AssetsManager
 */
export class AssetsManager {
    /**
     * Tableau des textures qui ont déjà été chargé
     */
    static #textures = {};

    /**
     * Charge une texture (spritesheet) si elle n'est pas déjà chargée.
     * @param {string} name nom de la texture
     * @param {string} src chemin de la texture
     * @returns {Promise<Texture>} texture chargée
     */
    static async LoadTexture(name, src) {
        const key = name.toLowerCase();
        if (!this.#textures[key]) {
            const texture = new Texture(name, src);
            await texture.load();
            this.#textures[key] = texture;
        }
        this.#verifyIfTextureCloned();
        return this.#textures[key];
    }

    /**
     * Récupère une texture déjà chargée
     * @param {string} name nom de la texture
     * @returns {Texture} texture demandée
     */
    static GetTexture(name) {
        return this.#textures[name.toLowerCase()];
    }

    /**
     * fonction qui verifie si une texture n'a pas deux non différent (n'a pas été chargé deux fois)
     * @throws {Error} si la texture a déjà été chargé
     */
    static #verifyIfTextureCloned() {
        const seen = new Set();
        for (const texture of Object.values(this.#textures)) {
            if (seen.has(texture.src)) throw new Error(`La texture "${texture.src}" a déjà été chargée sous le nom "${texture.name}"!`);
            seen.add(texture.src);
        }
    }
}