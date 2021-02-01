// Helper Functions
// Download Video




const fs = require('fs')

const { v4: uuidv4 } = require('uuid')

const rimraf = require('rimraf')
const path = require('path')
const dir = __dirname

const archiver = require('archiver')

const axios = require('axios')
axios.defaults.adapter = require('axios/lib/adapters/http')


// download user videos
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


async function downloadTikTok (videoUrl, cookie) {
	if (!fs.existsSync('videos')) {
		fs.mkdirSync('videos')
	}
	const res = await axios.get(videoUrl, {
		responseType: 'arraybuffer',
		headers: { cookie, referer: 'https://www.tiktok.com/' }
	})
	const buffer = Buffer.from(res.data)
	const id = uuidv4()
	const filename = `./videos/v-${ id }.mp4`
	const ws = fs.writeFileSync(filename, buffer)
	return 'downloaded video'
	
}



// Zip Videos To Example.xip
async function zipVideoFiles () {
	var archive = archiver('zip')
	const output = fs.createWriteStream('videos.zip')
	archive.pipe(output)
	archive.directory('./videos', 'videos')
	await archive.finalize()
	return new Promise(resolve => {
		output.on('close', function () {
			console.log(archive.pointer() + ' total bytes')
			resolve('done zipping files')
		})
	})
}


module.exports = { downloadVideo, downloadTikTok, zipVideoFiles }
