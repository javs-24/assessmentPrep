const Session = require('../models/Session');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  console.log('\n---invoking isLoggedIn middleware---');
  console.log('The client sent this ssid in a cookie = ', req.cookies.ssid);
  Session.findOne({cookieId: req.cookies.ssid}, (err, session) => {
    if (err) return next('DB ERROR FINDING A SESSION:\n' + err);
    if (session === null) return next('PROBLEM VERIFYING SESSION: Need to log in');
    console.log('Verified that the user is logged in, by finding this session document', session)
    return next();
  })
};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*/
sessionController.startSession = (req, res, next) => {
  console.log('\n---invoking startSession middleware---');
  const newSession = {
    cookieId: res.locals.id
  }
  
  Session.create(newSession, (err, session) =>{
    if (err) return next('\nDB ERROR CREATING A SESSION:\n' + err);
    console.log('Session document successfuly created = ', session);
    return next();
  })

};

module.exports = sessionController;
