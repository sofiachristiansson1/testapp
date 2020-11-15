
var sqlite3 = require('sqlite3').verbose();
var dbFilePath = './carshop.db';
const data = require('../data.json');
const express = require("express");
const pino = require('express-pino-logger')();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(pino);

const HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

let db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.log('Could not connect to database', err)
  } else {
      console.log('Connected to database')
  }
});
//serialize garanterar att anropen körs i ordning och inte förrän den föregående är klar
db.serialize(function(){ 
  db.run('CREATE TABLE IF NOT EXISTS employees(id int PRIMARY KEY, name text)');
  db.run('CREATE TABLE IF NOT EXISTS carmodels(id int PRIMARY KEY, brand text, model text, price int)');
  db.run('CREATE TABLE IF NOT EXISTS sales(id int PRIMARY KEY, employee_id int, carmodel_id int)');
  db.run('CREATE TABLE IF NOT EXISTS users(id int, email text, user_name text, password text)');
  db.run('DELETE FROM employees');
  db.run('DELETE FROM carmodels');
  db.run('DELETE FROM sales');
  db.run('DELETE FROM users');
});


let carshop=data.carshop;
db.serialize(function(){
  for(var x in carshop.employees) {
    let table =carshop.employees;
    db.run('INSERT INTO employees(id,name) VALUES(?,?)',[table[x].id, table[x].name]);
}
for(var y in carshop.carmodels) {
  let table =carshop.carmodels;
  db.run('INSERT INTO carmodels(id,brand,model,price) VALUES(?,?,?,?)',[table[y].id, table[y].brand, table[y].model, table[y].price]);
}
for(var z in carshop.sales) {
  let table =carshop.sales;
  db.run('INSERT INTO sales(id,employee_id,carmodel_id) VALUES(?,?,?)',[table[z].id, table[z].employee_id, table[z].carmodel_id]);
}
db.run('INSERT INTO users (id, email, user_name, password) VALUES (?,?,?,?)',
["10", "sofia", "sofia", "sofia"]);
db.run('INSERT INTO sales (id,employee_id,carmodel_id) VALUES(?,?,?)',
["15", "10", "1"]);
db.run('INSERT INTO employees (id,name) VALUES(?,?)',
["10", "sofia"]);


db.all('SELECT * FROM sales', [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

});
app.get("/employees", (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json({"Employees":rows});
    });
});
app.get("/carmodels", (req, res) => {
  db.all("SELECT * FROM carmodels", [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json({"Carmodels":rows});
    });
});

app.get("/total_sales", (req, res) => {
  db.all("SELECT employees.id AS id, name, SUM(carmodels.price) AS sales FROM employees INNER JOIN sales on employees.id=sales.employee_id INNER JOIN carmodels on sales.carmodel_id=carmodels.id GROUP BY employees.id", [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json({"Total sales":rows});
    });
});

app.get("/total_sales/:user_name", (req, res) => {
  var query = "SELECT employees.id AS id, name, SUM(carmodels.price) AS sales FROM employees INNER JOIN sales on employees.id=sales.employee_id INNER JOIN carmodels on sales.carmodel_id=carmodels.id INNER JOIN users on users.id=employees.id WHERE users.user_name=? GROUP BY employees.id";
  db.all(query, [req.params.user_name], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json({"Total sales":rows});
    });
});

app.post("/carmodels/", (req, res) => {
  var reqBody = req.body;
      db.run('INSERT INTO carmodels (id, brand, model, price) VALUES (?,?,?,?)',
      [reqBody.id, reqBody.brand, reqBody.model, reqBody.price],
      function (err) {
          if (err) {
              return res.status(400).json({ "error": err.message })
              
          }
          return res.status(201).json(
              reqBody.model)
      });
 
});

app.delete("/carmodels/:id", (req, res) => {
  db.all("SELECT * FROM carmodels WHERE id=?", [req.params.id], (err,rows) => {
  db.run("DELETE FROM carmodels WHERE id = ?",
      req.params.id,
      function (err, result) {
          if (err) {
              res.status(400).json({ "error": res.message })
              return;
          }
          res.status(200).json({ deleted_model: rows })
      });
    });
});

app.post("/users/", (req, res) => {
  var reqBody = req.body;
      db.run('INSERT INTO users (id, email, user_name, password) VALUES (?,?,?,?)',
      [reqBody.id, reqBody.email, reqBody.username, reqBody.password],
      function (err) {
          if (err) {
              return res.status(400).json({ "error": err.message })
              
          }
          return res.status(201).json(
              reqBody.id)
      });
 
});

app.get("/users/:user_name", (req, res) => {
  db.all("SELECT id FROM users WHERE user_name=?", [req.params.user_name], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(rows);
    });
});

app.post("/users/login", (req, res) => {
  var reqBody = req.body;
      db.run('SELECT id FROM users WHERE user_name =? AND password=?',
      [reqBody.user_name, reqBody.password],
      function (err) {
          if (err) {
              return res.status(400).json({ "error": err.message })
              
          }
          return res.status(201).json(
              reqBody.user_name)
      });
    });