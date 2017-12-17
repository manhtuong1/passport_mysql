var Sequelize = require('sequelize');
var fs = require("fs");
var path = require('path');
var config = require('./database').development;
var settings = require("../settings");
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};


var appDir = settings.PROJECT_DIR +"/model";

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

fs
    .readdirSync(appDir)
    .filter(function (file) {
        return (file.indexOf(".") !== 0);
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(appDir, file));
        db[model.name] = model;
    });


Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;