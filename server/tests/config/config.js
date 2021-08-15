const request = require('supertest');
const app = require('../../app');

global.request = request;
global.app = app;
global.port = process.env.PORT || 3000;
