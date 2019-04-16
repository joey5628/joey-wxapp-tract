/**
 * @Author zhangyi
 * @Date 2019/4/1
 * 创建createPage,重写页面已有的方法
 */
import Tracker from './index'
import { getTrackConfig } from './utils'

const globalVarPage = Page;


const pageMethods = [{
    methodName: 'onLoad',
    afterFn: function _f() {
        Tracker.init()
    },
},{
    methodName: 'onShow',
    beforeFn: function _f() {
        Tracker.pageShow()
    },
}, {
    methodName: 'onHide',
    afterFn: function _f() {
        Tracker.pageHide()
    },
}, {
    methodName: 'onUnload',
    beforeFn: function _f() {
        Tracker.pageHide()
    }
}]


const addMethodOnPage = (target) => {
    pageMethods.forEach(v => {
        const beforeFn = v.beforeFn
        const afterFn = v.afterFn
        if (target[v.methodName]) {
            const originFunc = target[v.methodName]
            target[v.methodName] = function _fn(...args) {
                beforeFn && beforeFn.apply(this, args)
                originFunc.apply(this, args);
                afterFn && afterFn.apply(this, args)
            }
        } else {
            target[v.methodName] = function _fn(...args) {
                beforeFn && beforeFn.apply(this, args)
                afterFn && afterFn.apply(this, args)
            }
        }
    })
    return target
}

const addTrackOnPage = (target) => {
    console.log('target:', target)

    return target
}

export const createPage = page => globalVarPage(addMethodOnPage(addTrackOnPage(page)))
