const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

let customers = [
    {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
    {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
    {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
  ]

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.get("/", (req, res) => {
    res.send("Hello Express!");
  });

// Fetch all customers
app.get("/api/customers", (req, res) => {
    res.json(customers);
  });

  // Fetch customer by id
app.get("/api/customers/:id", (req, res) => {
    const customerId = req.params.id;
  
    const customer = customers.filter(customer => customer.id === customerId);
    if (customer.length > 0)
      res.json(customer);
    else
      res.status(404).end();
  });

  // Add new customer
app.post("/api/customers", (req, res) => {
    // Extract customer from the request body and generate id
    const newcustomer = {'id': Date.now(), ...req.body};
  
    // Add new customer at the end of the customers array
    customers = [...customers, newcustomer];
  
    res.json(newcustomer);
  });

//Delete customer
app.delete("/api/customers/:id", (req, res) => { 
    const id = req.params.id;
  
    customers = customers.filter(customer => customer.id !== id);
    res.status(204).end();
  });
  
//Update customer
app.put("/api/customers/:id", (req, res) => { 
    const id = req.params.id;
    const updatedcustomer = {'id': id, ...req.body};
  
    //Get the index of updated customer
    const index = customers.findIndex(customer => customer.id === id);
    //Replace updated customer in the array
    customers.splice(index, 1, updatedcustomer); 
  
    res.json(updatedcustomer);
  })
