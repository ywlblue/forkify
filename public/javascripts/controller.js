const fetch = require("node-fetch");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function(id) {
  try {
    // TODO: add a spinner before fetching complete
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    let {recipe} = data.data;
    recipe = {
      id: recipe.id,
      image: recipe.image_url,
      publisher: recipe.publisher,
      title: recipe.title,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }
    return recipe;
    
  } catch(err) {
    throw new Error(err);
  } finally {

  }
}

const allRecipes = async function() {
  try {
    const res = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza");
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    const allRecipes = data.data.recipes;
    let recipes = [];
    allRecipes.forEach(recipe => {
      recipes.push({
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url
      })
    });
    return recipes;
  } catch(err) {
    throw new Error(err);
  }
}

module.exports = {
  allRecipes: allRecipes,
  showRecipe: showRecipe
};