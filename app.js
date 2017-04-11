'use strict';

const express     		= require('express');
const bodyParser  		= require('body-parser');
const http            = require('http');
const cycleDetection 	= require('./lib/cycleDetection');
const cycleDetectCtrl = require('./controllers/cycleDetect');

/**
 * Build the main application
 * @returns {Promise}
 */
function app() {

  var self = this;

  self.main = {};

  return new Promise((resolve, reject)=> {

		self.getApp()
			.then(()=> {
				return self.libs();
			})
			.then(()=> {
				return self.controllers();
			})
			.then(()=> {
				return self.routers();
			})
			.then(()=> {
				resolve(self.main);
			})
			.catch((err)=> {
				console.log("Error init: ", err);
			});
	});
}

/**
 * Create the express instance an inject into main property the instance and server (http)
 * @returns {Promise}
 */
app.prototype.getApp = function () {
	var self = this;

	return new Promise((resolve, reject)=> {
		self.main.app = express();
    
    self.main.app.use(bodyParser.urlencoded({ extended: true }));
    self.main.app.use(bodyParser.json());
		self.main.app.use(express.static('./public'));

		self.main.server = http.createServer(self.main.app);
		resolve({app: self.main.app, server: self.main.server});
	});
}

/**
 * Create the common lib instances for all REST Application
 * @returns {Promise}
 */
app.prototype.libs = function () {
	var self = this;
	return new Promise((resolve, reject)=> {

		self.main.libs = {};
		self.main.libs.http = http;
		self.main.libs.cycleDetection = new cycleDetection();
		
		resolve(self.main.libs);
	});
}

/**
 * Create the common controllers
 * @returns {Promise}
 */
app.prototype.controllers = function () {
	var self = this;
	self.main.controllers = {};

	return new Promise((resolve, reject)=> {
		
		self.main.controllers.cycleDetectCtrl = new cycleDetectCtrl(self.main);
		resolve(self.main.controllers);
	});
}

/**
 * Create the routes for all REST Application
 */
app.prototype.routers = function() {
  var self = this;

  return new Promise((resolve, reject) =>{
    let app = self.main.app;
    let cycleDetectCtrl = self.main.controllers.cycleDetectCtrl
		console.log(cycleDetectCtrl);
    let router = express.Router();

    router.get('/', (req, res)=>{
			res.sendFile(process.cwd()+'/public/index.html');
    });
		app.use(router);

    //API Routes
    let cycle = express.Router();
    cycle.route('/detectCycle')
      .get(cycleDetectCtrl.detect);

    app.use('/api', cycle);
		
		resolve();
  })
}

module.exports = app;