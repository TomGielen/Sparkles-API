const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/user')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './upload')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' +file.originalname)
	}
})

const fileFilter = (req, file, cb) => {
	// reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({
	storage: storage, 
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

router.get("/" , userController.user_getAll )
router.post("/signup", upload.single('userImage'), userController.user_signup )
router.post('/login', userController.user_login)
router.delete('/:userId', userController.user_delete)

module.exports = router

