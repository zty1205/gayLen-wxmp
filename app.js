// app.js

function interceptRequest(params) {
  Object.assign(wx, {
    __MITO_REQUEST__: params
  });
  return params;
}

let wxRequest = wx.request;

function newRequest(params) {
  return wxRequest(interceptRequest(params));
}

Object.defineProperty(wx, 'request', {
  value: newRequest,
  writable: true,
  configurable: true
});

App({
  onLaunch() {},
  globalData: {}
});
