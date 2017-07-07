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
  var id = new Date().getTime();
  ws.on('open', function() {
    var cmdString = '';
    var cmdStart = '{"jsonrpc":"1.0","id":"';
    console.log('CONNECTED');
    switch(method) {
    case 'getblockcount':
      cmdString = cmdStart + id.toString() + '","method":"getblockcount","params":[]}';
      break;
    case 'ping':
      cmdString = cmdStart + id.toString() + '","method":"ping","params":[]}';
      break;
    case 'getbestblock':
      cmdString = cmdStart + id.toString() + '","method":"getblestblock","params":[]}';
      break;
    case 'stop':
      cmdString = cmdStart + id.toString() + '","method":"stop","params":[]}';
      break;
    default:
      console.log('Unsupported method: ', method);
    }
    if (cmdString !== '') {
      //console.log(cmdString);
      ws.send(cmdString);
    }
  });
  ws.on('message', function(data) {
    var res = JSON.parse(data)
    if (res.id == id) {
      //console.log(res)
      console.log(res.result);
      ws.close();
      return res.result;
    }
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
