const baseUrl = 'http://127.0.0.1:9000'


function logop(res) {
  console.log(res)
}

function resolveParams(params = {}) {
  const paramKeys = Object.keys(params);
  return paramKeys.map((key) => `${key}=${params[key]}`).join('&');
}


function get({
  url, params = {}, success, fail
}) {
  const ps = resolveParams(params)
  return wx.request({
    url: `${baseUrl}/${url}?${ps}`,
    success,
    fail: fail || logop
  })
}

function post({
  url, params = {}, data, success, fail
}) {
  const ps = resolveParams(params)
  return wx.request({
    url: `${baseUrl}/${url}?${ps}`,
    method: 'POST',
    data,
    success,
    fail: fail || logop
  })
}

module.exports = {
  get,
  post
}