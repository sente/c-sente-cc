var winston = require('winston');

winston.loggers.add('main', {
    file: {
        filename: '/home/stu/code/red-note-web-app/logs/winston.log'
    }
});

winston.loggers.add('main_nojson', {
    file: {
        filename: '/home/stu/code/red-note-web-app/logs/winston_txt.log',
        json: false
    }
});

winston.loggers.add('actions', {
    file: {
        filename: '/home/stu/code/red-note-web-app/logs/winston_actions.log',
        json: true
    }
});

var winlog = winston.loggers.get('main');
var winlog2 = winston.loggers.get('main_nojson');
var winlog3 = winston.loggers.get('actions');

var winstonStream = {
    write: function(message, encoding){
        winlog.info(message);
        winlog2.info(message);
        winlog3.info(message);
        //winlog2.warn(message);
        //winlog3.warn(message);
        //winlog.info(message);
    }
};



//var logFile = fs.createWriteStream('/home/stu/myLogFile.log', {flags: 'a'});

app.configure(function(){
  var oneYear = 31557600000;
  app.use(express.cookieParser());
  app.use(express.session({secret: 'secret', cookie: { path: '/', httpOnly: false, maxAge: oneYear }}));


  app.use(mobileDetection);
  app.use(express.logger({stream:winstonStream,  format: ':remote-addr - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time' }));

  //app.all('*', mylogger);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.register(".mustache", require('stache'));
  app.use(isLoggedInMiddleware)
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(everyauth.middleware());

  //app.use(conditionalLogger);
  app.use(express.static(__dirname + '/public', { maxAge: oneYear}));

  app.use(stu_middleware);

  //app.use(express.logger({ format: ':remote-addr - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time | :sessiondata' }));

  app.use(app.router);
  app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
  //app.use(logging.requestLogger);

});
