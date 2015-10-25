var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var path = require('path');

module.exports = function walk (dir, opts, emitter, dstat) {
    if (!opts) opts = {};
    var fdir = opts._original || dir;
    opts._original = undefined;
    
    if (!emitter) {
        emitter = new EventEmitter;
        emitter.stop = function () {
            emitter._stopped = true;
            emitter.emit('stop');
        };
        emitter._pending = 0;
        emitter._seen = {};
    }
    emitter._pending ++;
    
    if (dstat) {
        var stopped = false;
        emitter.emit('directory', fdir, dstat, function stop () {
            stopped = true;
        });
        emitter.emit('path', fdir, dstat);
        if (!stopped) fs.readdir(dir, onreaddir);
        else check()
    }
    else fs.lstat(dir, function onstat (err, stat) {
        if (emitter._stopped) return;
        if (err) return finish();
        emitter._seen[stat.ino || dir] = true;
        
        if (stat.isSymbolicLink() && opts.followSymlinks) {
            emitter.emit('link', fdir, stat);
            fs.readlink(dir, function (err, rfile) {
                if (emitter._stopped) return;
                if (err) return finish();
                var file_ = path.resolve(dir, rfile);
                emitter.emit('readlink', fdir, file_);
                fs.lstat(file_, onstat);
            });
        }
        else if (stat.isSymbolicLink()) {
            emitter.emit('link', fdir, stat);
            emitter.emit('path', fdir, stat);
            finish();
        }
        else if (stat.isDirectory()) {
            var stopped = false;
            emitter.emit('directory', fdir, stat, function stop () {
                stopped = true;
            });
            emitter.emit('path', fdir, stat);
            if (!stopped) fs.readdir(dir, onreaddir);
            else check()
        }
        else {
            emitter.emit('file', fdir, stat);
            emitter.emit('path', fdir, stat);
            finish();
        }
    });
    
    return emitter;
    
    function check () {
        if (-- emitter._pending === 0) finish();
    }
    
    function finish () {
        emitter.emit('end');
        emitter._seen = null;
    }
    
    function onreaddir (err, files) {
        if (emitter._stopped) return;
        if (err) return check();
        
        files.forEach(function (rfile) {
            emitter._pending ++;
            var file = path.join(fdir, rfile);
            
            fs.lstat(file, function (err, stat) {
                if (emitter._stopped) return;
                if (err) check()
                else onstat(file, stat)
            });
        });
       check();
    }
    
    function onstat (file, stat, original) {
        if (emitter._seen[stat.ino || file]) return check();
        emitter._seen[stat.ino || file] = true;
        
        if (stat.isDirectory()) {
            if (original) opts._original = original;
            walk(file, opts, emitter, stat);
            check();
        }
        else if (stat.isSymbolicLink() && opts.followSymlinks) {
            emitter.emit('link', file, stat);
            
            fs.readlink(file, function (err, rfile) {
                if (emitter._stopped) return;
                if (err) return check();
                var file_ = path.resolve(path.dirname(file), rfile);
                
                emitter.emit('readlink', file, file_);
                fs.lstat(file_, function (err, stat_) {
                    if (emitter._stopped) return;
                    if (err) return check();
                    
                    emitter._pending ++;
                    onstat(file_, stat_, file);
                    check();
                });
            });
        }
        else if (stat.isSymbolicLink()) {
            emitter.emit('link', file, stat);
            emitter.emit('path', file, stat);
            check();
        }
        else {
            emitter.emit('file', file, stat);
            emitter.emit('path', file, stat);
            check();
        }
    }
};
