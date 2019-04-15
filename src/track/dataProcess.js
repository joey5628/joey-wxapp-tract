/**
 * @Author zhangyi
 * @Date 2019/4/13
 * 把配置变转化为数据
 */
export function handleData(trackInfo, page, trackConfig) {
    const { action, args } = trackInfo

    const { name, params } = trackConfig[action]
    let newPrams = {}

    for(let key in params) {
        let value  = params[key] || ''

        if (/^{[\S]*}$/.test(value)) {
            value = value.replace(/^{|}$/g, '')
            let dataSource = getDataBase(value, args, page)
            let arr = getValueArray(value)
            arr = arr.splice(1, arr.length)

            arr.forEach((item) => {
                const regArr = /^([\w\$]*)\[(.*)\]$/.exec(item)
                if (regArr && regArr.length >= 3) {
                    const itemKey = regArr[1]
                    const idxStr = regArr[2]
                    if (itemKey) {
                        dataSource = dataSource[itemKey]
                        let idx = getIdx(idxStr, args, page)
                        if (idx !== undefined && dataSource[idx] !== undefined) {
                            dataSource = dataSource[idx]
                        } else {
                            console.error('Tracker args中缺乏配置的[$Index]参数')
                        }
                    }
                } else {
                    dataSource = dataSource[item]
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


/**
 * 获取数据源
 * @param value
 * @param args
 * @param page
 * @returns {*} args page getApp()
 */
function getDataBase(value, args, page) {
    if (value.indexOf('page.') === 0) {
        return page
    } else if (value.indexOf('args.') === 0) {
        return args
    } else if (value.indexOf('APP.') === 0) {
        return getApp()
    } else {
        return value
    }
}

/**
 * 获取对象后[]内的值
 * @param str
 * @param args
 * @param page
 * @returns {*}
 */
function getIdx(str, args, page) {
    let data = getDataBase(str, args, page)
    let arr = getValueArray(str)
    arr = arr.splice(1, arr.length)

    arr.forEach((item) => {
        const regArr = /^([\w\$]*)\[(.*)\]$/.exec(item) //.match(/(\S*)\[(\S*)\]/)
        if (regArr && regArr.length >= 3) {
            const itemKey = regArr[1]
            const idxStr = regArr[2]

            if (itemKey) {
                data = data[itemKey]
                let value = getIdx(idxStr, args, page)
                if (value !== undefined && data[value] !== undefined) {
                    data = data[value]
                } else {
                    console.error('Tracker 缺乏配置的[Index]参数')
                }
            }
        } else {
            data = data[item]
        }
    })
    return data
}

/**
 * 获取配置字符串转化后的数组
 * @param str
 * @returns {Array}
 */
function getValueArray(str) {
    const reg = /\.?([^\.]*\[.*?\][^\.]*)\.?|(.*?)\.|(.+$)/g
    let regResult = []

    function getRegResult() {
        let result = reg.exec(str)

        if(!result) return
        if(result[1]) {
            regResult.push(result[1])
        } else if(result[2]) {
            regResult.push(result[2])
        } else {
            regResult.push(result[3])
        }
        getRegResult()
    }
    getRegResult()
    return regResult
}



