import * as mutationTypes from '@/store/mutationTypes'

/**
 *
 *
 * @export
 * @param {object} memo
 * @returns
 */
export function memoAdd(memo) {
    return { type: mutationTypes.ADD, memo };
}

/**
 *
 *
 * @export
 * @param {number} selectedIndex
 * @returns
 */
export function memoDelete(selectedIndex) {
    return { type: mutationTypes.REMOVE, selectedIndex };
}

/**
 *
 *
 * @export
 * @param {number} index
 * @returns
 */
export function selectedIndexChanged(index) {
    return { type: mutationTypes.SELECT, index };
}

export function selectedIndexDecrease() {
    return { type: mutationTypes.INDEX_DECREMENT };
}

/**
 *
 *
 * @export
 * @param {boolean} boolean
 * @returns
 */
export function isLogin(boolean) {
    return { type: mutationTypes.IS_LOGIN, boolean };
}

/**
 *
 *
 * @export
 * @param {boolean} boolean
 * @returns
 */
export function isLoading(boolean) {
    return { type: mutationTypes.IS_LOADING, boolean };
}

/**
 *
 *
 * @export
 * @param {object} memos
 * @returns
 */
export function memosLoad(memos) {
    return { type: mutationTypes.LOAD, memos };
}

/**
 *
 *
 * @export
 * @param {object} user
 * @returns
 */
export function onAuthStateChanged(user) {
    return { type: mutationTypes.AUTH_CHANGED, user };
}
