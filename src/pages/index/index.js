/**
 * @Author zhangyi
 * @Date 2019/3/22
 */
import Tracker from '../../track/index'
import { createPage } from '../../track/page'

createPage({
    data: {
        storeId: '9D43',
        storeName: '永辉生活-新华路店',
        titleIdx: 1,
        titles: [{
            id: 1,
            name: '蔬菜类'
        },{
            id: 2,
            name: '水果类'
        },{
            id: 3,
            name: '禽肉类'
        }],
        floors: [{
            type: 'skupos',
            goods: [{
                id: 'CB001',
                name:"CB001-套袋红富士套袋红富士套袋红富士套袋红富士",
                priceTag: '31.8',
                imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
            },{
                id: 'CB002',
                name:"CB002-红心火龙果",
                priceTag: '12.8',
                imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
            },{
                id: 'CB003',
                name:"CB003-四川安岳柠檬",
                priceTag: '20',
                imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
            },{
                id: 'CB004',
                name:"CB004-千禧圣女果",
                priceTag: '190',
                imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
            },{
                id: 'CB005',
                name:"CB005-海南青木瓜",
                priceTag: '122',
                imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
            }]
        }, {
            type: 'banner',
            goods: [{
                id: 'CB001',
                name:"CB001-套袋红富士套袋红富士套袋红富士套袋红富士",
                priceTag: '31.8',
                imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
            },{
                id: 'CB002',
                name:"CB002-红心火龙果",
                priceTag: '12.8',
                imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
            },{
                id: 'CB003',
                name:"CB003-四川安岳柠檬",
                priceTag: '20',
                imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
            },{
                id: 'CB004',
                name:"CB004-千禧圣女果",
                priceTag: '190',
                imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
            },{
                id: 'CB005',
                name:"CB005-海南青木瓜",
                priceTag: '122',
                imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
            }]
        }]
    },

    abVersion: 'new',

    onLoad() {
        Tracker.setDefaultParams({
            yh_sellerId: '14'
        })
    },

    onShow() {
        console.log('onShow')
    },

    onHide() {
        console.log('onHide')
    },

    toDetail(event) {
        const { id } = event.detail
        wx.navigateTo({
            url: '/src/pages/detail/index?id=' + id
        })
    }
})
