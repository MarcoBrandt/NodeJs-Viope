const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Include helmet
const helmet = require('helmet');
app.use(helmet());

let customers = [
    {id: '1588323375416', firstname: 'John', lastname: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
    {id: '1588323375417', firstname: 'Mary', lastname: 'Smith', email: 'mary@smith.com', phone: '6654113'},
    {id: '1588323375418', firstname: 'Peter', lastname: 'North', email: 'peter@north.com', phone: '901176'},
  ]

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug')

app.get("/", (req, res) => {
    res.render("customerlist", {customers: customers});
  })

app.get("/addcustomer", (req, res) => {
    res.render("addcustomer");
  })

app.post("/addcustomer", (req, res) => {
    const newCustomer = {id: new Date().now, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone};
    customers = [...customers, newCustomer];
    res.redirect("/");
  })

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${port}.`);
  });