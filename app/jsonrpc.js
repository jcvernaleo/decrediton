import WebSocket from 'ws';
//var WebSocket = require('ws');

export async function dcrdRPC(cfg, cert, method, debug) {
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
    if (debug) {
      console.log('dcrd websocket connected');
    }
    switch(method) {
    case 'getblockcount':
      cmdString = cmdStart + id.toString() + '","method":"' + method + '","params":[]}';
      break;
    case 'ping':
      cmdString = cmdStart + id.toString() + '","method":"' + method + '","params":[]}';
      break;
    case 'getbestblock':
      cmdString = cmdStart + id.toString() + '","method":"' + method + '","params":[]}';
      break;
    case 'stop':
      cmdString = cmdStart + id.toString() + '","method":"' + method + '","params":[]}';
      break;
    default:
      if (debug) {
	console.log('Unsupported method: ', method);
      }
    }
    if (cmdString !== '') {
      if (debug) {
	console.log(cmdString);
      }
      ws.send(cmdString);
    }
  });
  await ws.on('message', function(data) {
    var res = JSON.parse(data)
    if (res.id == id) {
      if (debug) {
	console.log(res)
      }
      console.log(res.result);
      ws.close();
      return res.result;
    }
  });
  ws.on('error', function(err) {
    if (debug) {
      console.log('ERROR:' + err);
    }
    ws.close();
    return;
  });
  ws.on('close', function() {
    if (debug) {
      console.log('dcrd websocket disconnected');
    }
    ws.close();
    return;
  });
}
