var app = module.exports = express.createServer();

app.configure(function(){
  var oneYear = 31557600000;
  app.use(express.cookieParser());
  app.use(express.session({secret: 'secret'}));
  app.use(mobileDetection);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(isLoggedInMiddleware)
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(everyauth.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
});
