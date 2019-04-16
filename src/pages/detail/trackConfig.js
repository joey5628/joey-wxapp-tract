export default {
    pageName: '商品详情页',
    addToCarts: {
        name: '加入购物车',
        params: {
            yh_elementName: '加入购物车',
            yh_productId: '{page.data.detail.id}',
            yh_productName: '{page.data.detail.name}',
            yh_productPrice: '{page.data.detail.priceTag}',
        }
    }
}
