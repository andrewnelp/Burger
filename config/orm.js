const connection = require("../config/connection");

const createQmarks = num => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

const translateSql = ob => {
  let arr = [];
  for (let key in ob) {
    let value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

let orm = {
  selectAll: (table, cb) => {
    let dbQuery = "SELECT * FROM " + table + ";";

    connection.query(dbQuery, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  insertOne: (table, cols, vals, cb) => {
    let dbQuery =
      "INSERT INTO " +
      table +
      " (" +
      cols.toString() +
      ") " +
      "VALUES (" +
      createQmarks(vals.length) +
      ") ";

    console.log(dbQuery);
    connection.query(dbQuery, vals, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  updateOne: (table, objColVals, condition, cb) => {
    var dbQuery =
      "UPDATE " +
      table +
      " SET " +
      translateSql(objColVals) +
      " WHERE " +
      condition;

    console.log(dbQuery);

    connection.query(dbQuery, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  deleteOne: (table, condition, cb) => {
    let dbQuery = "DELETE FROM " + table + " WHERE " + condition;
    console.log(dbQuery);

    connection.query(dbQuery, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};
module.exports = orm;
