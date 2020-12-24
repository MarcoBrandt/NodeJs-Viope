const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/customers');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get("/api/Customers", query.getAllCustomers);
app.get("/api/Customers/:id", query.getCustomerById);
app.post("/api/Customers", query.addCustomer);
app.delete("/api/Customers/:id", query.deleteCustomer);
app.put("/api/Customers/:id", query.updateCustomer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

module.exports = app;