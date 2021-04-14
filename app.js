// app.js
App({
  onLaunch() {
    const performance = wx.getPerformance()
    const observer = performance.createObserver((entryList) => {
      console.log(entryList.getEntries())
    })
    observer.observe({
      entryTypes: ['navigation', 'render', 'script']
    })
  },
  globalData: {
    userInfo: null
  }
})