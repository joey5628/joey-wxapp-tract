/**
 * 事件管理器
 */
class Events {
    constructor() {
        this.handlers = {};
    }

    /**
     * 事件注册
     * @param {*} event 事件名字
     * @param {*} handlers 执行函数
     */
    on(event, handlers) {
        this.handlers[event] = this.handlers[event] || [];
        this.handlers[event].push(handlers);
        return this.handlers[event];
    }

    /**
     * 事件方法解绑 或 解绑某一个方法
     * @param {*} event 事件名字
     */
    off(event, func) {
        if (this.handlers[event] && !func) {
            delete this.handlers[event];
        } else if (this.handlers[event] && func) {
            const funcs = this.handlers[event];
            const _funcs = funcs.map(fn => {
                if (fn != func) {
                    return fn;
                }
            });

            if (!funcs.length) {
                delete this.handlers[event];
            } else {
                this.handlers[event] = _funcs;
            }
        }
    }

    /**
     * 触发事件
     * @param {*} event 事件名字
     * @param {*} args 执行参数
     */
    trigger(event, ...params) {
        const funcs = this.handlers[event];
        const result = [];
        if (funcs) {
            funcs.forEach((f) => {
                result.push(f.apply(this, params));
            });
        }
        return result.length === 1 ? result[0] : result;
    }

    /**
     * 清空所以事件注册
     */
    clear() {
        this.handlers = {};
    }

}

export default Events
