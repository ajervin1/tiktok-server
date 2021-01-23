const { downloadVideo } = require('./helpers.js')
// Imports
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const axios = require('axios')
axios.defaults.adapter = require('axios/lib/adapters/http')
const TikTokScraper = require('tiktok-scraper')
// App Setup
app.use(cors())
app.use(morgan('dev'))
const fs = require('fs')
const session_id = 'sid_tt=601a98c8eeea0111d6cde18e509e1ab6'
app.use(express.json())
app.use(express.urlencoded({ extended: false, }))


// Routes

// Test
app.get('/', (req, res) => {
	res.send('test')
})

// Get Trending Posts
app.get('/trending', async (req, res) => {
	const { collector: posts, headers } = await TikTokScraper.trend('', {
		number: 8,
		download: false,
		sessionList: [ session_id ]
	})
	res.send({ posts, headers })
})

// Get A Single Users Feed
app.get('/users/:username', async (req, res) => {
	const { username } = req.params
	try {
		const post = await TikTokScraper.user(username, {
			download: false,
			number: 8,
			sessionList: [ session_id ],
			
		})
		res.send({ posts: post.collector, headers: post.headers })
	} catch (e) {
		console.log(e)
	}
	// Set Headers
})


// Get HashTag
app.get('/hashtag/:hashtag', async (req, res) => {
	const { hashtag } = req.params
	const post = await TikTokScraper.hashtag(hashtag, {
		download: false,
		number: 8,
		sessionList: [ session_id ],
	})
	// Set Headers
	res.send({ posts: post.collector, headers: post.headers })
})

// Get Music Id
app.get('/songs/:songid', async (req, res) => {
	const { songid } = req.params
	const post = await TikTokScraper.music(songid, {
		download: false,
		number: 8,
		sessionList: [ session_id ],
	})
	// Set Headers
	res.send({ posts: post.collector, headers: post.headers })
})



// Convert Video
app.post('/video', async (req, res) => {
	const { video_url, cookie } = req.body
	const stream = await downloadVideo(video_url, cookie)
	res.type('video/mp4')
	stream.pipe(res)
})

const port = process.env.PORT || 4000

// Server Started
app.listen(port, () => {
	console.log('server started')
})
