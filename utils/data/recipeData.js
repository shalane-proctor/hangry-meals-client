import { clientCredentials } from '../client';

const getRecipes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipe`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getRecipesByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user-recipe/${userId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleRecipe = (recipeId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipe/${recipeId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data?.id,
        user: data?.user,
        name: data?.name,
        instructions: data?.instructions,
      });
    })
    .catch((error) => reject(error));
});

const createRecipe = (recipe) => new Promise((resolve, reject) => {
  const RecipeObj = {
    id: recipe?.id,
    user: recipe?.user,
    name: recipe?.name,
    instructions: recipe?.instructions,
  };
  fetch(`${clientCredentials.databaseURL}/recipe`, {
    method: 'Recipe',
    body: JSON.stringify(RecipeObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateRecipe = (recipe) => new Promise((resolve, reject) => {
  const RecipeObj = {
    id: recipe?.id,
    user: recipe?.user,
    name: recipe?.name,
    instructions: recipe?.instructions,
  };
  fetch(`${clientCredentials.databaseURL}/recipe/${recipe.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(RecipeObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteRecipe = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipe/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe, getRecipesByUser,
};
