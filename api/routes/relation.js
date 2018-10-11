const express = require('express');
const router = express.Router();
const relationController = require('../controllers/relation');

router.get('/', relationController.relation_get_all);
router.post('/', relationController.relation_create);
router.delete('/:relation_id', relationController.relation_delete);
router.patch('/:relation_id', relationController.relation_update);
router.get('/relation/:relation_id', relationController.relation_messages); // get all messages of relation
router.get('/passed_relation/:user_id', relationController.relation_passed); // get passed relation
router.get('/active_relation/:user_id', relationController.relation_active); // get active relation

//  The way to update in Postman!!
// 	[{ "propName" : "status", "value": "active" }]

// websocket implementeren.


module.exports = router