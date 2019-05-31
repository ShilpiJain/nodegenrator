// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */


// post/put/get/delete

router.get('/', (req, res) => {
	res.render('index', {text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
})



router.post('/post',(req, res) => {
	const body  = req.body
	res.json({
		confirmation:'success',
		data:body
	})
})


//with :paramiter can get value from variable
router.get('/:path', (req, res) => { //http://localhost:3000/xyz
	const path = req.params.path

	res.json({
		data: path
	})
})

const profiles = {
	sjain : {
		name : 'Shilpi',
		company: 'Self',
		languages : ['HTML','CSS','javascript']
	},
	sjobs : {
		name : 'Steave jobs',
		company: 'Apple',
		languages : ['ojective c','swift','C++']
	},
	bgates : {
		name : 'Bill gates',
		company: 'Microsoft',
		languages : ['c','C#','Java']
	},
}
router.post('/addprofile', (req, res) =>{ //http://localhost:3000/profile/sjain
	const body = req.body
	body['languages'] = req.body.languages.split(', ');
	profiles[body.username]  = body
	res.redirect('profile/' +body.username)
	// res.json({
	// 	confirmation: 'success',
	// 	data: body
	// })
})
router.get('/query',(req, res) => { //http://localhost:3000/query?name=shilpi or http://localhost:3000/query?name=shilpi&occupation=job
	const name = req.query.name
	const occupation = req.query.occupation
	const data = {
		name : name,
		occupation: occupation
	}
	res.render('profile', data)
	// res.json({
	// 	name: name,
	// 	occupation:occupation
	// })
})
router.get('/:profile/:username', (req, res) => { //http://localhost:3000/123/shilpi
	const profile = req.params.profile
	const username = req.params.username
	const currentprofile = profiles[username]
	if(currentprofile== null){
		res.json({
			confirmation:'fail',
			message:"profile"+ username + "not found"
		})
		return
	}
	// res.json({
	//  	confirmation:'Successful',
	// 	profile: currentprofile
	//  	//username: username
	//  }) 
	 res.render('profile', currentprofile)
})


// /*  This route render json data */
// router.get('/json', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		app: process.env.TURBO_APP_ID,
// 		data: 'this is a sample json route.'
// 	})
// })

// /*  This route sends text back as plain text. */
// router.get('/send', (req, res) => {
// 	res.send('This is the Send Route')
// })

// /*  This route redirects requests to Turbo360. */
// router.get('/redirect', (req, res) => {
// 	res.redirect('https://www.turbo360.co/landing')
// })


module.exports = router
