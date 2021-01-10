var express = require('express');
var router = express.Router();
var rpController = require('../public/javascripts/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  rpController.allRecipes().then(result => {
    rpController.showRecipe(result[0].id).then(first => {
      res.render('index', { recipes: result, recipe: first });
    }).catch(err => {
      throw new Error(err);
    });
  }).catch(err => {
    throw new Error(err);
  });
  
  
});

module.exports = router;
