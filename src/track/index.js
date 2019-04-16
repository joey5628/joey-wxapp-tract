/**
 * @Author zhangyi
 * @Date 2019/4/1
 */
import Events from './events'
import { getActivePage, getPrevPage, isFunction } from "./utils";
import { handleData } from './dataProcess'

let defaultParams = {}

class Tracker extends Events {

    constructor() {
        super()
        this.instance = null
        this.showTime = 0
    }

    /**
     * 设置默认数据
     * @param params
     */
    setDefaultParams(params = {}) {
        defaultParams = Object.assign(defaultParams, params)
    }

    /**
     * 获取当前页面的埋点配置
     * @param pageRoute
     * @returns {boolean}
     */
    getTrackConfig(pageRoute = '') {
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

    /**
     * 添加埋点监听
     */
    addTrackListener(page, trackConfig) {
        this.on('track', (trackInfo = {}) => {
            this.report(handleData(trackInfo, page, trackConfig))
        })
    }

    /**
     * 触发埋点
     * @param trackInfo
     */
    track(trackInfo = {}) {
        this.trigger('track', trackInfo)
    }

    /**
     * 根据配置表给页面中的方法自动加上埋点事件
     */
    addTrackOnPageMethod(page, trackConfig) {
        const that = this
        const methodNames = Object.keys(trackConfig)
        methodNames.forEach(method => {
            if(method !== 'pageName' && page[method] && isFunction(page[method])) {
                const config = trackConfig[method]
                if (config.auto === false) {
                    return;
                }
                const originFunc = page[method]
                page[method] = function _fn(...args) {
                    const event = args[0]
                    let trackInfo = event && event.currentTarget && event.currentTarget.dataset ?
                        event.currentTarget.dataset.track : null
                    originFunc.apply(this, args)
                    trackInfo = {
                        action: method,
                        args: {
                            ...trackInfo
                        }
                    }
                    that.track(trackInfo)
                }
            }
        })
    }

    init() {
        const page = getActivePage()
        if (page && page.route) {
            const trackConfig = this.getTrackConfig(page.route)
            if (trackConfig) {
                this.addTrackOnPageMethod(page, trackConfig)
            }
        }
    }

    /**
     * 页面显示时初始化数据和上报pageView埋点
     */
    pageShow() {
        const page = getActivePage()
        if (page && page.route) {
            const trackConfig = this.getTrackConfig(page.route)
            let pageName = ''
            if (trackConfig) {
                pageName = trackConfig.pageName
                this.addTrackListener(page, trackConfig)
            }
            page.$PageName = pageName
            const prePageName = getPrevPage() ? getPrevPage().$PageName : ''
            this.showTime = +new Date()

            defaultParams = {
                ...defaultParams,
                yh_pageName: pageName,
                yh_prePageName: prePageName,
            }
            this.report({
                name: 'yh_pageView',
                params: defaultParams
            })
        }
    }

    /**
     * 清楚数据和埋点监听，上报pageLeave埋点
     */
    pageHide() {
        const showTime = this.showTime
        const time = +new Date()
        const duration = time - showTime

        this.report({
            name: 'yh_pageLeave',
            params: {
                yh_duration: duration
            }
        })
        this.clear()
    }

    /**
     * 生成最终的埋点数据
     * 也可以直接调用
     * @param data
     */
    report(data = {}) {
        let { name, params } = data;

        params = Object.assign({}, defaultParams, params)
        console.log('Tracker report:', { name, params})
        // console.log('To do the report track data')
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Tracker()
        }
        return this.instance
    }
}

const tracker = Tracker.getInstance()

export default tracker
