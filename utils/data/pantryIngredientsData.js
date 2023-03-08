import { clientCredentials } from '../client';

const getPantryIngredients = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/pantryingredient`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const AllPantryIngredientsByPantry = (pantryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/pantry-ingredients/${pantryId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPantryIngredientsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user-pantryingredient/${userId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePantryIngredient = (pantryingredientId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/pantryingredient/${pantryingredientId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data?.id,
        pantry: data?.pantry,
        ingredient: data?.ingredient,
      });
    })
    .catch((error) => reject(error));
});

const createPantryIngredient = (pantryingredient) => new Promise((resolve, reject) => {
  const pantryingredientObj = {
    pantry: pantryingredient?.pantry,
    ingredient: pantryingredient?.ingredient,
  };
  fetch(`${clientCredentials.databaseURL}/pantryingredient`, {
    method: 'POST',
    body: JSON.stringify(pantryingredientObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updatePantryIngredient = (pantryingredient) => new Promise((resolve, reject) => {
  const pantryingredientObj = {
    id: pantryingredient?.id,
    pantry: pantryingredient?.pantry,
    ingredient: pantryingredient?.ingredient,
  };
  fetch(`${clientCredentials.databaseURL}/pantryingredient/${pantryingredient.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pantryingredientObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deletePantryIngredient = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/pantryingredient/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getPantryIngredients, getSinglePantryIngredient, createPantryIngredient, updatePantryIngredient, deletePantryIngredient, getPantryIngredientsByUser, AllPantryIngredientsByPantry,
};
