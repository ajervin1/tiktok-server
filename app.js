const { downloadVideo, downloadTikTok, zipVideoFiles } = require('./helpers.js')
// Imports
const rimraf = require('rimraf')
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
const session_id = 'sid_tt=d884553c00e4286c9313ffeb0d1b8049'
app.use(express.json())

app.use(express.static('./'))

// Routes

// Test


// Get Trending Posts
app.get('/trending', async (req, res) => {
	const { collector: posts, headers } = await TikTokScraper.trend('', {
		number: 30,
		download: false,
		sessionList: [ session_id ]
	})
	res.send({ posts, headers })
})

// Get A Single Users Feed
app.get('/users/:username', async (req, res) => {
	const { username } = req.params
	
	const post = await TikTokScraper.user(username, {
		download: false,
		number: 200,
		sessionList: [ session_id ],
	})
	res.send({ posts: post.collector, headers: post.headers })
	
	// Set Headers
})


// Convert Video
app.post('/video', async (req, res) => {
	const { video_url, cookie } = req.body
	const stream = await downloadVideo(video_url, cookie)
	res.type('video/mp4')
	stream.pipe(res)
})


// Convert Video To Zip Folter
/*
 {videos: [], cookie: ""}
 * */
app.post('/zip_videos', async (req, res) => {
	const { videos, cookie } = req.body
	for (const url of videos) {
		const r = await downloadTikTok(url, cookie)
		console.log(r)
	}
	const resp = await zipVideoFiles()
	res.send({ done: true })
})
// Download Zip Folder

app.get('/download', (req, res) => {
	res.download('./videos.zip')
	rimraf.sync('./videos')
})


const port = process.env.PORT || 4000

// Server Started
app.listen(port, () => {
	console.log('server started')
})
