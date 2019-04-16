/**
 * 获取当前页面
 * @returns {*}
 */
export function getActivePage() {
    const pages = getCurrentPages()
    return pages[pages.length - 1]
}

/**
 * 获取前一个页面
 * @returns {*}
 */
export function getPrevPage() {
    const pages = getCurrentPages()
    return pages[pages.length - 2]
}

/**
 * 获取当前页面的埋点配置
 * @param pageRoute
 * @returns {boolean}
 */
export function getTrackConfig(pageRoute = '') {
    try {
        const arr = pageRoute.split('/')
        arr[arr.length - 1] = 'trackConfig'
        const path = arr.join('/')
        // 这里需要相对路径
        return require(`../../${path}`).default
    } catch(err) {
        console.log('err:', err)
    }
}

const _toString = Object.prototype.toString;
export const isFunction = value => _toString.call(value) === '[object Function]';
