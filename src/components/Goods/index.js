import Tracker from '../../track/index'

Component({

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
        show() {
        },

        hide() {
        }
    },

    methods: {

        toDetail(event) {
            this.triggerEvent('toDetail', { id: this.data.data.id, index: this.data.index })
        },

        addCarts(event) {
            const { data, index, floorIndex } = this.data
            Tracker.triggerTrack({
                action: 'addToCarts',
                args: {
                    ...data,
                    moduleName: 'Goods',
                    index,
                    floorIndex
                }
            })
        },

    }


})
