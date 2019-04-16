import Tracker from '../../track/index'
import { createComponent } from '../../track/component'

createComponent({

    properties: {
        data: {
            type: Object,
            value: {},
            observer(newVal, oldVal, changedPath) {
                // console.log('observer')
                // console.log('newVal:', newVal)
                // console.log('oldVal:', oldVal)
                // console.log('changedPath:', changedPath)
            }
        },

        index: Number,
        floorIndex: Number
    },

    lifetimes: {

        attached() {
        },

        detached() {
        }
    },

    pageLifetimes: {

    },

    methods: {

        toDetail(event) {
            this.triggerEvent('toDetail', { id: this.data.data.id, index: this.data.index })
        },

        addCarts(event) {
            console.log(1111)
            const { data, index, floorIndex } = this.data
            // Tracker.track({
            //     action: 'addToCarts',
            //     args: {
            //         ...data,
            //         moduleName: 'Goods',
            //         index,
            //         floorIndex
            //     }
            // })
        },

    }


})
