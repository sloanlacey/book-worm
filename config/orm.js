// Require connection
const connection = require('./connection');
// Helper function creates questionmarks for MySQL query statements
function questionMarks(num) {
    const qArr = [];

    for (let i = 0; i < num; i++) {
        qArr.push('?');
    }

    return qArr.toString();
}
// Helper function converts object to key/value pairs
function objSql(ob) {
    const obArr = [];

    for (var key in ob) {
        const value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = `'${value}'`;
            }
            obArr.push(`${key} = ${value}`);
        }
    }

    return obArr.toString();
}

const orm = {
    selectAll: function(table, cb) {
        const queryString = `SELECT * FROM ${table};`;
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    },

    insertOne: function(table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}`;
        
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += questionMarks(vals.length);
        queryString += ") ";
        
        connection.query(queryString, vals, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    },

    updateOne: function(table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table}`;

        queryString += " SET ";
        queryString += objSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    }
}

module.exports = orm;