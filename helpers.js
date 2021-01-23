// Helper Functions
// Download Video
const axios = require('axios')
axios.defaults.adapter = require('axios/lib/adapters/http')

 async function downloadVideo (videoUrl, cookie) {
	const { data: stream } = await axios.get(videoUrl, {
		responseType: 'stream',
		headers: {
			Referer: 'https://www.tiktok.com/',
			Cookie: cookie
		}
	})
	return stream
}

module.exports = { downloadVideo }

