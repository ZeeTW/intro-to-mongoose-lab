require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./models/customer')

console.log('Welcome to the CRM')

const prompt = require('prompt-sync')()

let customer = prompt('What would you like to do?')

if (customer === 1) {
  const createCustomer = async () => {
    const customerData = {
      name: prompt('Enter your name:'),
      age: prompt('Enter your age:')
    }
    const customer = await Customer.create(customerData)
    console.log('New Customer', customers)
  }
}

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to Database')

  await mongoose.disconnect()
  console.log('Disconnected')
  process.exit()
}

const runQueries = async () => {
  console.log('Queries Running...')
}
