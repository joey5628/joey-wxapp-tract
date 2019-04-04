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
