
var everyauth = require('everyauth'),
	authConf = require('./config').Auth;



everyauth.debug = true;

var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

var usersByFbId = {};
var usersByTwitId = {};




  everyauth
    .twitter
  	.myHostname(myHost)
      .consumerKey(authConf.twit.consumerKey)
      .consumerSecret(authConf.twit.consumerSecret)
      .callbackPath('/auth/twitter/callback')
      .findOrCreateUser(function (session, accessToken, accessSecret, twitUser) {
  	    var userData = {
  		    accountType: 'twitter',
  		    username: twitUser.screen_name,
  		    name: twitUser.name,
  		    email: null,
  		    gender: null,
  	    };	
  	    var promise = this.Promise();
          rnUtils.findAndSetUser(userData, session, promise);
  	    return promise;
      })
  	.sendResponse( function (res) {
  	    var redirectTo = this.redirectPath();
  		redirectTo = res.req.cookies.rednoteauthredirect || redirectTo;
  	    if (!redirectTo)
  	      throw new Error('You must configure a redirectPath');
  	    res.writeHead(303, {'Location': redirectTo});
  	    res.end();
      })
      .handleAuthCallbackError( function (req, res) {
  		req.session._authStarted = false;
  	    res.redirect('/select?msg=authFailed');
      })
      .redirectPath('/');


  everyauth
    .facebook
      .accessTokenHttpMethod('get')
      .postAccessTokenParamsVia('query')
      .moduleTimeout(60000)
      
      .myHostname(myHost)
      .appId(authConf.fb.appId)
      .appSecret(authConf.fb.appSecret)
      .scope(function(){ return 'email,user_status,publish_stream'; })
      .getAuthUri( function (req, res) {
          if (!this._myHostname || this._alwaysDetectHostname) {
            this.myHostname(extractHostname(req));
          }
  
          var params = {
                  client_id: this.appId()
                , redirect_uri: this.myHostname() + this.callbackPath()
              }
      
            , authPath = req.IsMobile ? 'https://m.facebook.com/dialog/oauth' : 'https://www.facebook.com/dialog/oauth'
          
            , url = (/^http/.test(authPath))
                  ? authPath
                  : (this.oauthHost() + authPath)
            , additionalParams = this.moreAuthQueryParams
            , param;
          if (additionalParams) for (var k in additionalParams) {
            param = additionalParams[k];
            if ('function' === typeof param) {
              additionalParams[k] = // cache the function call
                param = param.call(this);
            }
            if ('function' === typeof param) {
              param = param.call(this, req, res);
            }
            params[k] = param;
          }
          return url + '?' + querystring.stringify(params);
      })
      .sendResponse( function (res) {
          var redirectTo = this.redirectPath();
          redirectTo = res.req.cookies.rednoteauthredirect || redirectTo;
          if (!redirectTo)
            throw new Error('You must configure a redirectPath');
          res.writeHead(303, {'Location': redirectTo});
          res.end();
      })
      .findOrCreateUser(function (session, accessToken, accessTokenExtra, fbUserMetadata) {
          var userData = {
              accountType: 'facebook',
              username: fbUserMetadata.email,
              name: fbUserMetadata.name,
              email: fbUserMetadata.email,
              gender: fbUserMetadata.gender
          };	
          var promise = this.Promise();
          rnUtils.findAndSetUser(userData, session, promise);
          return promise;
      })	
      .handleAuthCallbackError( function (req, res) {
          req.session._authStarted = false;
          res.redirect('/select?msg=authFailed');
      })
  .redirectPath('/');



// I want to do something like this...

//require('./lib/everyauth-facebook.js')(app);
//require('./lib/everyauth-twitter.js')(myHost,rnUtils,everyauth);

