var conditionalLogger = function (req, res, next) {
    var mylogger = express.logger({ format: ':remote-addr - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time' })
    //next();
    mylogger(req,res,next);
    //if ((/(select|mood|music-preview-page|SMS|message)/i).test(req.path)) {
    //    logger(req, res, next);
    //} else {
    //    next();
    //}
}

app.configure(function(){
  var oneYear = 31557600000;
  app.use(express.cookieParser());
  app.use(express.session({secret: 'secret', cookie: { path: '/', httpOnly: false, maxAge: oneYear }}));


  app.use(mobileDetection);
  //app.all('*', mylogger);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.register(".mustache", require('stache'));
  app.use(isLoggedInMiddleware)
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(everyauth.middleware());

  app.use(express.static(__dirname + '/public', { maxAge: oneYear}));

  app.use(stu_middleware);

  app.use(express.logger({ format: ':remote-addr - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time | :sessiondata' }));

  app.use(conditionalLogger);

  app.use(app.router);
  app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
  //app.use(logging.requestLogger);

});

