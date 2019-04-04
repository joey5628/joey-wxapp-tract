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

        index: Number
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
            const { data, index } = this.data
            Tracker.triggerTrack({
                action: 'addToCarts',
                args: {
                    ...data,
                    moduleName: 'Goods',
                    index,
                }
            })
        },

    }


})
