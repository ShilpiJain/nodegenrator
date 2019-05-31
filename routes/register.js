// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

router.post('/user',(req, res)=>{
    const body  = req.body
	res.json({
        confirmation:'success',
        route:'register',
		data:body
	})
})

module.exports = router
