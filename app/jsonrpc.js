// Inspired by bitcore's old rpc.
var https = require('https');
//import getCfg from './config.js';

function RpcClient(opts) {
  opts = opts || {};
  this.host = opts.host || '127.0.0.1';
  this.port = opts.port || 8332;
  this.user = opts.user || 'user';
  this.pass = opts.pass || 'pass';
  this.protocol = https;
  this.rejectUnauthorized = opts.rejectUnauthorized || false;
}

var methods = {
  getBestBlockHash: '',
  getBlockCount: '',
  getBlockNumber: '',
  getCoinSupply: '',
  stop: '',
  ping: '',
};

var slice = function(arr, start, end) {
  return Array.prototype.slice.call(arr, start, end);
};

function generateRPCMethods(constructor, apiCalls, rpc) {
  function createRPCMethod(methodName, argMap) {
    return function() {
      var limit = arguments.length - 1;
      for (var i = 0; i < limit; i++) {
        if (argMap[i]) arguments[i] = argMap[i](arguments[i]);
      };
      rpc.call(this, {
        method: methodName,
        params: slice(arguments, 0, arguments.length - 1),
        id: "rpc-node"
      }, arguments[arguments.length - 1]);
    };
  };

  var types = {
    str: function(arg) {
      return arg.toString();
    },
    int: function(arg) {
      return parseFloat(arg);
    },
    float: function(arg) {
      return parseFloat(arg);
    },
    bool: function(arg) {
      return (arg === true || arg == '1' || arg == 'true' || arg.toString().toLowerCase() == 'true');
    },
  };

  for (var k in apiCalls) {
    if (apiCalls.hasOwnProperty(k)) {
      var spec = apiCalls[k].split(' ');
      for (var i = 0; i < spec.length; i++) {
        if (types[spec[i]]) {
          spec[i] = types[spec[i]];
        } else {
          spec[i] = types.string;
        }
      }
      var methodName = k.toLowerCase();
      constructor.prototype[k] = createRPCMethod(methodName, spec);
      constructor.prototype[methodName] = constructor.prototype[k];
    }
  }
}

function rpc(request, callback) {
  var self = this;
  var request;
  request = JSON.stringify(request);
  var auth = Buffer(self.user + ':' + self.pass).toString('base64');

  var options = {
    host: self.host,
    path: '/',
    method: 'POST',
    port: self.port,
    rejectUnauthorized: self.rejectUnauthorized,
  };
  var err = null;
  var req = this.protocol.request(options, function(res) {

    var buf = '';
    res.on('data', function(data) {
      buf += data;
    });
    res.on('end', function() {
      if (res.statusCode == 401) {
        callback(new Error('JSON-RPC connection rejected: 401 unauthorized'));
        return;
      }
      if (res.statusCode == 403) {
        callback(new Error('JSON-RPC connection rejected: 403 forbidden'));
        return;
      }

      if (err) {
        callback(err);
        return;
      }
      try {
        var parsedBuf = JSON.parse(buf);
      } catch (e) {
        console.log(e.stack);
        console.log(buf);
        console.log('HTTP Status code:' + res.statusCode);
        callback(e);
        return;
      }
      callback(parsedBuf.error, parsedBuf);
    });
  });
  req.on('error', function(e) {
    var err = new Error('Could not connect to dcrd via RPC at host: ' + self.host + ' port: ' + self.port + ' Error: ' + e.message);
    console.log(err);
    callback(err);
  });

  req.setHeader('Content-Length', request.length);
  req.setHeader('Content-Type', 'application/json');
  req.setHeader('Authorization', 'Basic ' + auth);
  req.write(request);
  req.end();
};

generateRPCMethods(RpcClient, methods, rpc);

var run = function() {
  var config = {
    //user: cfg.getCfg.get('rpc_user'),
    user: 'USER',
    pass: 'PASSWORD',
    host: '127.0.0.1',
    port: '19119',
  };

  var rpc = new RpcClient(config);

  rpc.getBlockCount(function(err, ret) {
    if (err) {
      console.error('An error occured fetching blockheight');
      console.error(err);
      return;
    }
    console.log(ret);
  });
  rpc.ping(function(err, ret) {
    if (err) {
      console.error('An error occured with ping');
      console.error(err);
      return;
    }
    console.log(ret);
  });
};

module.exports.run = run;
if (require.main === module) {
  run();
}
