import Tracker from '/src/track/index'

App({
    onLaunch: function () {
        Tracker.setDefaultParams({
            yh_appName: '永辉生活',
            yh_userId: '-1',
            yh_deviceId: '',
            yh_platform: '',
            yh_latitude: '',
            yh_longitude: '',
            yh_shopId: '',
            yh_shopName: '',
            yh_sellerId: '',
            yh_sellerName: '',
            yh_pageName: '',
            yh_prePageName: '',
            yh_isFirstTimeVisit: '',
            yh_isLocationAllowed: ''
        })
    },

    globalData: {
        userInfo: {
            uId: 'a0090182'
        }
    }
})
