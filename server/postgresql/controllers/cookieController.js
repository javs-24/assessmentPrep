const cookieController = {};

/**
* setSSIDCookie - store the supplied id in a cookie
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
cookieController.setSSIDCookie = (req, res, next) => {
  console.log('\n---Invoking setSSIDCookie middleware---')
  if(res.locals.ssid) {
    res.cookie('ssid', res.locals.ssid, {httpOnly: true});
    console.log('cookie succesfully setup using the user document id as SSID = ', res.locals.ssid)
  }
  return next();
}

module.exports = cookieController;