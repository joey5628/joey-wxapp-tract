/**
 * @Author zhangyi
 * @Date 2019/4/1
 */
import Events from './events'
import { getActivePage, getPrevPage } from "./utils";
import { handleData } from './dataProcess'

let defaultParams = {}

class Tracker extends Events {

    constructor() {
        super()
        this.instance = null
        this.page = null
        this.trackConfig = null
        this.showTime = 0
    }

    /**
     * 解析埋点配置文件，转变为需要上报的数据
     * @param trackInfo
     * @param page
     * @param trackConfig
     * @returns {{name, params}}
     */
    /*handleData(trackInfo, page, trackConfig) {
        const { action, args } = trackInfo

        if (action && trackConfig && trackConfig[action]) {
            const { name, params } = trackConfig[action]
            let newPrams = {}

            for(let key in params) {
                let value  = params[key] || ''

                if (/^{[\S]*}$/.test(value)) {
                    value = value.replace(/^{|}$/g, '')
                    let dataSource;
                    if (value.indexOf('page.') === 0) {
                        dataSource = page
                    } else if (value.indexOf('args.') === 0) {
                        dataSource = args
                    } else {
                        // APP引用不能提升
                        const APP = getApp()
                        dataSource = APP
                    }
                    let arr = value.split('.')

                    arr.forEach((item, idx) => {
                        if (idx > 0) {
                            const regArr = item.match(/(\S*)\[\$(\S*)\]/)
                            if (regArr && regArr.length >= 3) {
                                const itemKey = regArr[1]
                                const idxStr = regArr[2]

                                if (itemKey) {
                                    dataSource = dataSource[itemKey]
                                    if (idxStr && args[idxStr] !== undefined) {
                                        dataSource = dataSource[args[idxStr]]
                                    } else {
                                        console.error('Tracker args中缺乏配置的[$Index]参数')
                                    }
                                }
                            } else {
                                dataSource = dataSource[item]
                            }
                        }
                    })
                    newPrams[key] = dataSource
                } else {
                    newPrams[key] = value
                }
            }
            return {
                name,
                params: newPrams
            }
        }
    }*/

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
    addTrackListener() {
        console.log('Tracker onTrack')
        this.on('track', (trackInfo = {}) => {
            this.report(handleData(trackInfo, this.page, this.trackConfig))
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
     * 页面显示时初始化数据和上报pageView埋点
     */
    pageShow() {
        const page = getActivePage()
        if (page && page.route) {
            this.page = page
            this.trackConfig = this.getTrackConfig(this.page.route)
            let pageName = ''
            if (this.trackConfig) {
                pageName = this.trackConfig.pageName
                this.addTrackListener()
            }

            const prePageName = getPrevPage() ? getPrevPage().$PageName : ''
            this.page.$PageName = pageName
            this.showTime = +new Date()
            // const trackParams = this.page.$trackParams || {}

            defaultParams = {
                ...defaultParams,
                yh_pageName: pageName,
                yh_prePageName: prePageName,
                // ...trackParams
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
