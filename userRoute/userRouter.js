const express = require('express');
const router = express.Router();
const userController =require('../userController/userController');
const openJourney =require('../userController/openJourney');
const LikeImage =require('../userController/LikeImage');
const pagination=require('../userController/pagination')
const middleware=require('../middleware/middleware')
//create API

router.post('/saveImages',middleware.middlewareSaveImage,openJourney.saveImages);

 /// UPDATE TEXT CANVO
router.put('/likeImages/:id',middleware.middlewareLike,LikeImage.userLiked);

/// GET APIs
router.get("/getusers",userController.getConvohistory);
router.get("/pegination",pagination.pagination);
router.get('/likedimage/:Like_user',LikeImage.getUserLikedImage);
router.get('/getImages/',openJourney.getImages);
router.get('/getImage/:id',openJourney.getImage);
router.get("/users/:id",userController.getcanvoid);
router.get("/include/:keywords",openJourney.IncludesWords);
router.get("/exclude/:keywords",openJourney.ExcludeWords);

  module.exports = router




