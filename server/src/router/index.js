const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const upload = require('../utils/fileUpload');
const contestsRouter = require('./contestsRouter');
const router = express.Router();

// post        ('  ', body);
// get         ('../params?query');
// patch / put ('../params', body);
// delete      ('../params')

// /users
// /offers
// /payment
// /chat

// /auth

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

router.post('/login', validators.validateLogin, userController.login);

router.post('/getUser', checkToken.checkAuth);

// GET /offers?limit=10&offset=0
router.get('/offers', contestController.getAllOffers);

// require auth

router.use(checkToken.checkToken);

router.use('/contests', contestsRouter);

router.get('/users/id/transactions', userController.getTransactions);

router.post('/dataForContest', contestController.dataForContest);

router.post(
  '/getAllContests',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

router.get('/downloadFile/:fileName', contestController.downloadFile);

router.post(
  '/updateContest',
  upload.updateContestFile,
  contestController.updateContest
);

router.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

router.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

router.post(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

router.post('/updateUser', upload.uploadAvatar, userController.updateUser);

router.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

router.post('/newMessage', checkToken.checkToken, chatController.addMessage);

router.post('/getChat', checkToken.checkToken, chatController.getChat);

router.post('/getPreview', checkToken.checkToken, chatController.getPreview);

router.post('/blackList', checkToken.checkToken, chatController.blackList);

router.post('/favorite', checkToken.checkToken, chatController.favoriteChat);

router.post('/createCatalog', chatController.createCatalog);

router.post('/updateNameCatalog', chatController.updateNameCatalog);

router.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);

router.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);

router.post('/deleteCatalog', chatController.deleteCatalog);

router.post('/getCatalogs', checkToken.checkToken, chatController.getCatalogs);

module.exports = router;
