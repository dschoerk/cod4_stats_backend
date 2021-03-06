const fs = require('fs');
const mysql = require('mysql');
const LOG = require('./log')(module);

let connection;
let instance;
function DbConnection() {
    if (!instance) {
        this._init();
        instance = this;
    }

    return instance;
}

DbConnection.prototype.getConnection = () => {
    if (!connection) {
        connection = mysql.createConnection(this._config.mysql);
    }
    return connection;
};

DbConnection.prototype._init = () => {
    this._config;

    if (!this._config) {
        fs.readFile(__dirname + '/db-conf.json', (err, data) => {
            if (err) {
                LOG.error('Error while reading file', err);
                return;
            }
            this._config = JSON.parse(data);
        });
    }
};


module.exports = DbConnection;