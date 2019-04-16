/**
 * @Author zhangyi
 * @Date 2019/4/15
 */
import { getActivePage, getPrevPage, isFunction, getTrackConfig } from "./utils";
import Tracker from './index'

const globalVarComponent = Component


function addTrackOnComponent(target) {
    const readyFn = target.ready

    target.ready = function _fn(...args) {
        readyFn && readyFn.apply(this, args)

        const page = getActivePage()
        if (page && page.route) {
            const trackConfig = getTrackConfig(page.route)
            const componentConfig = trackConfig.component || ''
            console.log('componentConfig:', componentConfig)

            if (!componentConfig) return;

            const methodNames = Object.keys(componentConfig)
            console.log('target.methods:', target.methods)
            console.log('target.methodNames:', methodNames)
            methodNames.forEach(method => {
                if(target.methods[method] && isFunction(target.methods[method])) {
                    const config = componentConfig[method]
                    if (config.auto === false) {
                        return;
                    }
                    const originFunc = target.methods[method]
                    console.log('method:', method)
                    target.methods[method] = function _fn(...args) {
                        console.log('-------')
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
                        Tracker.track(trackInfo)
                    }
                }
            })
        }
    }

    return target
}

export const createComponent = component => globalVarComponent(component)
