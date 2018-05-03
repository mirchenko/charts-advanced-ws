const _ = require('lodash');
const crypto = require('crypto');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const generateBlocks = require('./blocks');

const SERVER_CONFIG = {
	PORT: 8080,
	TICK: 10,
	CLIENT_KEY_SIZE: 16,
	CLIENT_TTL: 5 * 1000,
	PROBABILITY_FAIL: 0.01
};
const BLOCKS_INIT_CONFIG = {
	alphabet: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda',
		'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'],
	pointsQty: 100,
	absMax: 100,
	delayMax: 10
};


const socketClients = [];
const clients = {};

function initClient(socket) {
	const clientKey = crypto.randomBytes(SERVER_CONFIG.CLIENT_KEY_SIZE).toString('hex');
	clients[clientKey] = {
    socket,
		blocks: generateBlocks(BLOCKS_INIT_CONFIG, socket),
		lastAccessTime: Date.now()
	};
	return clientKey;
}

setInterval(function () {
	_.forEach(_.keys(clients), (clientKey) => {
		const client = clients[clientKey];
		client.blocks.tick();
	});
}, SERVER_CONFIG.TICK);


app.use(express.static('public'));
app.get('/' , (req, res) => {
  res.sendFile('/public/index.html')
});


io.on('connection', socket => {
  const clientKey = initClient(socket);
  socketClients.push({ socketId: socket.conn.id, clientKey });
  socket.emit('init', {
    clientKey: clientKey,
    time: clients[clientKey].lastAccessTime,
    stations: clients[clientKey].blocks.getBlocks()
  });

  socket.on('disconnect', () => {
    const socketClientIndex = _.findIndex(socketClients, item => item.socketId === socket.conn.id);
    if(socketClientIndex >= 0) {
      delete clients[socketClients[socketClientIndex].clientKey];
      socketClients.splice(socketClientIndex, 1);
		}
	});
});



server.listen(SERVER_CONFIG.PORT, function () {
  console.log(`listening on port ${SERVER_CONFIG.PORT}`);
});
