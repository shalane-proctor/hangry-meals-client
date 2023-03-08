import { clientCredentials } from '../client';

const getIngredients = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ingredient`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getIngredientsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user-ingredient/${userId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleIngredient = (ingredientId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ingredient/${ingredientId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data?.id,
        user: data?.user,
        name: data?.name,
        in_stock: data?.in_stock,
      });
    })
    .catch((error) => reject(error));
});

const createIngredient = (ingredient) => new Promise((resolve, reject) => {
  const ingredientObj = {
    id: ingredient?.id,
    user: ingredient?.user,
    name: ingredient?.name,
    in_stock: ingredient?.in_stock,
  };
  fetch(`${clientCredentials.databaseURL}/ingredient`, {
    method: 'POST',
    body: JSON.stringify(ingredientObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateIngredient = (ingredient) => new Promise((resolve, reject) => {
  const ingredientObj = {
    id: ingredient?.id,
    user: ingredient?.user,
    name: ingredient?.name,
    in_stock: ingredient?.in_stock,
  };
  fetch(`${clientCredentials.databaseURL}/ingredient/${ingredient.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ingredientObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteIngredient = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ingredient/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getIngredients, getSingleIngredient, createIngredient, updateIngredient, deleteIngredient, getIngredientsByUser,
};
