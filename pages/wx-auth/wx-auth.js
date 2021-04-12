// pages/wx-auth/wx-auth.js
const {
  get,
  post
} = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    systemInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      systemInfo: wx.getSystemInfoSync()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  login1() {
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        wx.showToast({
          title: 'session未过期',
          icon: 'none'
        })
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          timeout: 30000,
          success(res) {
            get({
              url: '/wx',
              params: {
                code: res.code
              },
              success(result) {
                console.log('login success result = ', result)
              }
            })
          },
          fail(err) {
            console.log(' wx.login fail ', err)
          }
        })
      }
    })
  },
  login() {
    wx.login({
      timeout: 30000,
      success(res) {
        get({
          url: 'wx',
          params: {
            code: res.code
          },
          success(result) {
            console.log('login success result = ', result)
          }
        })
      },
      fail(err) {
        console.log(' wx.login fail ', err)
      }
    })
  },

  // 直接调用
  userLocation() {
    // 需要配置app.json 里的 permission
    wx.authorize({
      scope: "scope.userLocation",
      success: () => {
        wx.getLocation({
          success: (res) => {
            console.log('getLocation res = ', res)
          }
        })
      }
    })
  },
  userLocationBackground() {
    // 需、需在app.json中配置requiredBackgroundModes: ['location']后使用
    // 需要配置app.json 里的 permission
    console.log('userLocationBackground')
    wx.authorize({
      scope: "scope.userLocationBackground",
      success: () => {
        wx.startLocationUpdateBackground({
          success: (res) => {
            console.log('startLocationUpdateBackground res = ', res)
          },
          fail: (err) => {
            console.log('startLocationUpdateBackground err = ', err)
          }
        })
      },
      fail: (e) => {
        console.log('au userLocationBackground e = ', e)
      }
    })
  },
  // 注意：以上的地理微信授权拒绝后，小程序下次不会唤起授权弹窗，而只能引导用户去设置页面修改
  address() {
    wx.authorize({
      scope: 'scope.address',
      success: () => {
        wx.chooseAddress({
          success: (res) => {
            console.log('chooseAddress res = ', res)
          },
          fail: (e) => {
            console.log('chooseAddress e = ', e)
          }
        })
      },
      fail: (err) => {
        console.log('au adress e = ', err)
      }
    })
  },
  invoiceTitle() {
    wx.authorize({
      scope: 'scope.invoiceTitle',
      success: () => {
        wx.chooseInvoiceTitle({
          success: (res) => {
            console.log('chooseInvoiceTitle res = ', res)
          },
          fail: (e) => {
            console.log('chooseInvoiceTitle e = ', e)
          }
        })
      },
      fail: (err) => {
        console.log('au invoiceTitle e = ', err)
      }
    })
  },
  // 真机不支持
  invoice() {
    if (this.data.systemInfo.platform === "devtools") {
      wx.showToast({
        title: '微信开发工具不知道该api-invoice',
        icon: 'none'
      })
      return false
    }
    wx.authorize({
      scope: 'scope.invoice',
      success: () => {
        wx.chooseInvoice({
          success: (res) => {
            console.log('chooseInvoice res = ', res)
          },
          fail: (e) => {
            console.log('chooseInvoice e = ', e)
          }
        })
      },
      fail: (err) => {
        console.log('au invoice e = ', err)
      }
    })
  },
  // 返回的是加密数据，所以需要登录后进行解密
  werun() {
    // stepInfoList: [{step: 4624,timestamp: 1615564800}]
    wx.authorize({
      scope: 'scope.werun',
      success: () => {
        wx.getWeRunData({
          success: (res) => {
            const {
              encryptedData,
              iv
            } = res
            post({
              url: 'wx/decrypt',
              data: {
                encryptedData,
                iv
              },
              success: (res) => {
                console.log('wx/user res = ', res)
              }
            })
          },
          fail: (e) => {
            console.log('getWeRunData e = ', e)
          }
        })
      },
      fail: (err) => {
        console.log('au werun e = ', err)
      }
    })
  },
  record() {
    wx.authorize({
      scope: 'scope.record',
      success: (res) => {
        console.log('au record res = ', res)
      },
      fail: (err) => {
        console.log('au werun e = ', err)
      }
    })
  },

  // 点击调用
  getUserProfile() {
    // 2.10.4 开始支持
    wx.getUserProfile({
      desc: '用于完善用户信息', // 必填
      success: (res) => {
        const {
          encryptedData,
          iv,
          userInfo

        } = res
        post({
          url: 'wx/decrypt',
          data: {
            encryptedData,
            iv
          },
          success: (res) => {
            console.log('wx/user res = ', res)
          }
        })
      }
    })
  },

  // open-type
  getUserInfo(res) {
    // 2021.4.13后 微信昵称为："微信用户"， 头像为：灰色头像
    const {
      detail: {
        encryptedData,
        iv,
        userInfo
      }
    } = res
    post({
      url: 'wx/decrypt',
      data: {
        encryptedData,
        iv
      },
      success: (res) => {
        console.log('wx/user res = ', res)
      }
    })
  },
  getPhoneNumber(res) {
    const {
      detail: {
        encryptedData,
        iv
      }
    } = res
    post({
      url: 'wx/decrypt',
      data: {
        encryptedData,
        iv
      },
      success: (res) => {
        console.log('wx/phone res = ', res)
      }
    })
  }
})