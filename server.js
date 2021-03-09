const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const axios = require('axios')
axios.defaults.adapter = require('axios/lib/adapters/http')
const { getTrending, getUsers } = require('./service')
// Setup
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('./'))


// Routes
app.get('/', (req, res) => {
	res.send('test')
})


app.get('/trending', async (req, res) => {
	const results = await getTrending()
	res.send(results)
})



app.get('/users/:username', async (req, res) => {
	const results = await getUsers(req.params.username)
	res.send(results)
})





// Start Server
app.listen(4000, () => {
	console.log('server started')
})
