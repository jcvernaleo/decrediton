import WebSocket from 'ws';
//var WebSocket = require('ws');

export function dcrdRPC(cfg, cert, method) {
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
    switch(method) {
    case 'getblockcount':
      ws.send('{"jsonrpc":"1.0","id":"0","method":"getblockcount","params":[]}');
      break;
    case 'ping':
      ws.send('{"jsonrpc":"1.0","id":"0","method":"ping","params":[]}');
      break;
    case 'getbestblock':
      ws.send('{"jsonrpc":"1.0","id":"0","method":"getbestblock","params":[]}');
      break;
    case 'stop':
      ws.send('{"jsonrpc":"1.0","id":"0","method":"stop","params":[]}');
      break;
    default:
      console.log('Unsupported method: ', method);
    }
  });
  ws.on('message', function(data) {
    var res = JSON.parse(data)
    console.log(res.result);
    ws.close();
    return res.result
  });
  ws.on('error', function(err) {
    console.log('ERROR:' + err);
    ws.close();
    return;
  });
  ws.on('close', function() {
    console.log('DISCONNECTED');
    ws.close();
    return;
  });
}
