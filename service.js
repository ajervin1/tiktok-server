// Functions That Scrape Data From Tiktok
const TikTokScraper = require('tiktok-scraper')
const session_id = 'sid_tt=d36398ba1eaace7221c3c4ad839e1b7d'

// Get Users
async function getUsers (username) {
	const results = await TikTokScraper.user(username, {
		sessionList: [ session_id ],
		number: 3
	})
	
	const headers = results.headers
	const posts = results.collector
	return { headers, posts }
}

// Get Trending Posts
async function getTrending () {
	const results = await TikTokScraper.trend('', {
		sessionList: [ session_id ],
		number: 3
	})
	const { headers, collector: posts } = results
	return { headers, posts }
}






module.exports = { getUsers, getTrending }




