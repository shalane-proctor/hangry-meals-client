import { clientCredentials } from '../client';

const getRecipeIngredients = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipeingredient`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getRecipeIngredientsByRecipe = (recipeId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipe-ingredients/${recipeId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleRecipeIngredient = (recipeingredientId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipeingredient/${recipeingredientId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data?.id,
        recipe: data?.recipe,
        ingredient: data?.ingredient,
      });
    })
    .catch((error) => reject(error));
});

const createRecipeIngredient = (recipeingredient) => new Promise((resolve, reject) => {
  const recipeingredientObj = {
    id: recipeingredient?.id,
    recipe: recipeingredient?.recipe,
    ingredient: recipeingredient?.ingredient,
  };
  fetch(`${clientCredentials.databaseURL}/recipeingredient`, {
    method: 'POST',
    body: JSON.stringify(recipeingredientObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateRecipeIngredient = (recipeingredient) => new Promise((resolve, reject) => {
  const recipeingredientObj = {
    id: recipeingredient?.id,
    recipe: recipeingredient?.recipe,
    ingredient: recipeingredient?.ingredient,
  };
  fetch(`${clientCredentials.databaseURL}/recipeingredient/${recipeingredient.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeingredientObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteRecipeIngredient = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipeingredient/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getRecipeIngredients, getSingleRecipeIngredient, createRecipeIngredient, updateRecipeIngredient, deleteRecipeIngredient, getRecipeIngredientsByRecipe,
};
