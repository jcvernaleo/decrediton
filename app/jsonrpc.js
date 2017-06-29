var WebSocket = require('ws');
import { getCfg, getCert } from './config.js';

var cfg = getCfg();
var cert = getCert();
var user = cfg.get('rpc_user');
var password = cfg.get('rpc_pass');
var url = 'wss://' + cfg.get('daemon_rpc_host') + ':' + cfg.RPCDaemonPort() + 'ws';

var ws = new WebSocket(url, {
  headers: {
    'Authorization': 'Basic '+new Buffer(user+':'+password).toString('base64')
  },
  cert: cert,
  ca: [cert]
});
ws.on('open', function() {
  console.log('CONNECTED');
  ws.send('{"jsonrpc":"1.0","id":"0","method":"getblockcount","params":[]}');
});
ws.on('message', function(data) {
  console.log(data);
});
ws.on('error', function(err) {
  console.log('ERROR:' + err);
});
ws.on('close', function() {
  console.log('DISCONNECTED');
});
