const express = require('express')
const router = express.Router()

const HomeController = require('../controllers/HomeController')
const WatchController = require('../controllers/WatchController')
const CategoryController = require('../controllers/CategoryController')

router.get('/new',HomeController.new)
router.get('/rank',HomeController.rank)
router.post('/search',HomeController.search)

router.get('/category', CategoryController.index)
router.get('/category/:url', CategoryController.anime)

router.get('/watch',WatchController.get)
router.post('/watch',WatchController.post)

module.exports = router