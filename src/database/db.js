const { query } = require('express');
const { param } = require('../routes/web.r');

const pgp = require('pg-promise')({capSQL: true});
require('dotenv').config();

const connectionInfo = {
    host: process.env.HOST,
    port: process.env.CONNECTION_PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
}

const db = pgp(connectionInfo);

module.exports = {
    execute: async (sql,param) => {
        let dbcn = null;
        try {
            dbcn = await db.connect();
            const data = await dbcn.query(sql,param);
            return data;
        } catch (error) {
            throw error;
        } finally {
            dbcn.done();
        }
    }
}