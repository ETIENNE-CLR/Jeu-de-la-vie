// ===================================
//    FICHIER DE VARIABLES GLOBALES
// ===================================

/**
 * Contante définissant si on est en mode production
 * @type {boolean}
 */
export const DEBUG_MOD = true;


/**
 * Tableau contenant toutes les informations concernant la souris
 * @type {JSON}
 */
export const MOUSE = {
    x: 0,
    y: 0,
    clicked: false
};

/**
 * Collection des inputs appuyés sur le clavier
 * @type {JSON}
 */
export const KEYS_INPUT = {};

export const KEYS_PREVIOUS = {};

export function isKeyPressedOnce(key) {
    const pressed = KEYS_INPUT[key];
    ResetKeysInputValue(key);
    return pressed;
}

export function ResetKeysInputValue(key = null) {
    if (key) {
        KEYS_INPUT[key] = false;
        KEYS_PREVIOUS[key] = false;
    } else {
        Object.keys(KEYS_INPUT).map(key => KEYS_INPUT[key] = false);
        Object.keys(KEYS_PREVIOUS).map(key => KEYS_PREVIOUS[key] = false);
    }
}