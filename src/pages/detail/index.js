import { createPage } from '../../track/page'
import Tracker from '../../track/index'

createPage({
    data: {
        detail: {
            id: 'CB001',
            name:"套袋红富士套袋红富士套袋红富士套袋红富士",
            priceTag: '31.8',
            imgUrl: 'https://image.yonghuivip.com/image/1459841184250dfaaeed694eae97c85b434d102c0fe199eb9c461?imageMogr2/thumbnail/120x/'
        },
        buyCount: 0
    },

    abVersion: 'detail-old',

    onLoad(options) {

    },

    addToCarts(event) {
        this.setData({
            buyCount: ++this.data.buyCount
        })
        Tracker.track({
            action: 'addToCarts'
        })
    }

})
