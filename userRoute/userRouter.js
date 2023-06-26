const express = require('express');
const router = express.Router();
const userController =require('../userController/userController');
const openJourney =require('../userController/openJourney');



//create API

router.post('/emailhashuser',userController.useremailhash)

router.post('/createChannel',userController.createChannel)

router.post('/users',userController.convohistory);
router.post('/saveImages',openJourney.saveImages);
router.put('/likeImages/:id',openJourney.likeImage);



 /// UPDATE TEXT CANVO
router.put("/users/:id",userController.updateConvo);



/// GET APIs
router.get("/getusers",userController.getConvohistory);
router.get('/getImages/',openJourney.getImages);
router.get('/getImage/:id',openJourney.getImage);
router.get("/users/:id",userController.getcanvoid);
router.get("/include/:keywords",openJourney.IncludesWords);
router.get("/exclude/:keywords",openJourney.ExcludeWords);

  module.exports = router




