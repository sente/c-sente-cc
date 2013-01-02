    var log = null;
    try{
        now = new Date;
        var logfile = 'log_' + (now.getYear() + 1900) + '_' + now.getMonth() + '_' + now.getDate() + '.json';
        log = fs.createWriteStream(logfile, {'flags': 'a'});
        log.write(JSON.stringify(d) + '\n');
        fs.close(log.fd);
    }
    catch(err){
        console.log(err);
        try{
            fs.close(log.fd);
        }
        catch(err){}
    }

