require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./models/customer')
const prompt = require('prompt-sync')()

console.log('Welcome to the CRM')

const createCustomer = async () => {
  const customerData = {
    name: prompt('Enter your name:'),
    age: prompt('Enter your age:')
  }
  const customer = await Customer.create(customerData)
  console.log('New Customer', customer)
}

const viewCustomers = async () => {
  const customers = await Customer.find()
  customers.forEach((customer, index) => {
    console.log(
      `${index}. ${customer.name} (ID: ${customer._id}), Age: ${customer.age}`
    )
  })
}

const updateCustomer = async () => {
  await viewCustomers()
  let id = prompt('ID of customer to be updated: ')
  let name = prompt('Enter new name: ')
  let age = prompt('Enter new age: ')
  const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, age })
  console.log('Customer Updated:', updatedCustomer)
}

const deleteCustomer = async () => {
  await viewCustomers()
  let id = prompt('ID of customer to be deleted: ')
  await Customer.findByIdAndDelete(id)
  console.log('Customer Deleted')
}

const menu = async () => {
  let choice = ''
  console.log('Welcome to the CRM')
  console.log('1. Create Customer')
  console.log('2. View Customers')
  console.log('3. Update Customer')
  console.log('4. Delete Customer')
  console.log('5. Quit')
  choice = prompt('Choose an option: ')
  if (choice === '1') {
    await createCustomer()
  } else if (choice === '2') {
    await viewCustomers()
  } else if (choice === '3') {
    await updateCustomer()
  } else if (choice === '4') {
    await deleteCustomer()
  } else if (choice === '5') {
    console.log('Okay bye!!!')
    return
  }
}

const connect = async () => {
  await mongoose.connect(process.env.MONGODP_URI)
  console.log('Connected to Database')
  await runQueries()

  await mongoose.disconnect()
  console.log('Disconnected')
  process.exit()
}

const runQueries = async () => {
  await menu()
  console.log('Queries Running...')
}

connect()
