export default {
    pageName: '首页',
    addToCarts: {
        name: 'yh_elementClick',
        params: {
            yh_elementName: '加入购物车',
            yh_moduleName: '{args.moduleName}',
            yh_elementIndexNum: '{args.index}',
            yh_productId: '{page.data.floors[args.floorIndex].goods[args.index].id}',
            yh_productName: '{page.data.floors[args.floorIndex].goods[args.index].name}',
            abVersion: '{page.abVersion}',
            storeId: '{page.data.storeId}',
            titleId: '{page.data.titles[page.data.titleIdx].id}',
            titleName: '{page.data.titles[page.data.titleIdx].name}',
            uId: '{APP.globalData.userInfo.uId}',

        }
    },
    toDetail: {
        name: 'yh_elementClick',
        params: {
            yh_elementName: '进入商详页',
            yh_moduleName: '{args.moduleName}',
            yh_elementIndexNum: '{args.index}',
            yh_productId: '{page.data.floors[args.floorIndex].goods[args.index].id}',
            yh_productName: '{page.data.floors[args.floorIndex].goods[args.index].name}',
            abVersion: '{page.abVersion}',
            storeId: '{page.data.storeId}',
            uId: '{APP.globalData.userInfo.uId}',
        }
    }
}
