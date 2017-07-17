/*Каждая из сущностей реализовывает CRUD (create, read, update, delete) через REST (post, get, put, delete).*/

const router = require('express').Router();
const messageService = require('../../services/message');


router.get('/', (req, res, next) => {
	messageService.findAll((err, data) => {
		if (!err){
			res.data = data;
			res.json(res.data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

router.get('/:id', (req, res, next) => {
	messageService.findOne(Number(req.params.id), (err, data) => {
		if (!err){
			res.data = data;
			res.json(res.data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

router.post('/', (req, res, next) => {
	const obj = {
	    "senderId": req.body.senderId,
	    "receiverId": req.body.receiverId,
	    "text": req.body.text 
	};
	messageService.add(obj, (err, data) => {
		if (!err){
			res.data = data.rows[0];
		}
		res.json(res.data);
	});
});


router.delete('/:id', (req, res, next) => {
	messageService.findOneAndDelete(Number(req.params.id), (err, data) => {
		if (!err){
			res.json(res.data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

router.put('/:id', (req, res, next) => {
	const obj = req.body;
	messageService.findOneAndUpdate(Number(req.params.id), obj, (err, data) => {
		if (!err){
			res.json(res.data);
		} else {
			res.status(400);
			res.end();
		}
	});
	
});

module.exports = router;