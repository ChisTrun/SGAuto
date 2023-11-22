const db = require('../database/db')

module.exports = class User {
    static async findUser(userName,passWord,callback) {
        try {
            const result = await db.execute("select * from webUser where username = ${uName} and password = ${pass} and role = 'user'",{uName: userName,pass: passWord});
            callback(null,result);
        } catch (error) {
            callback(error);
        }; 
    }
    static async findAdmin(userName,passWord,callback) {
        try {
            const result = await db.execute("select * from webUser where username = ${uName} and password = ${pass} and role = 'admin'",{uName: userName,pass: passWord});
            callback(null,result);
        } catch (error) {
            callback(error);
        };
    }
    
}