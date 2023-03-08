import { clientCredentials } from '../client';

const getPantries = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/pantry`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPantriesByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user-pantry/${userId}`)
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getSinglePantry = (pantryId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/pantry/${pantryId}`)
    .then((response) => response)
    .then((data) => {
      resolve({
        id: data?.id,
        user: data?.user,
      });
    })
    .catch((error) => reject(error));
});

const createPantry = (pantry) => new Promise((resolve, reject) => {
  const pantryObj = {
    id: pantry?.id,
    user: pantry?.user,
  };
  fetch(`${clientCredentials.databaseURL}/pantry`, {
    method: 'POST',
    body: JSON.stringify(pantryObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updatePantry = (pantry) => new Promise((resolve, reject) => {
  const pantryObj = {
    id: pantry?.id,
    user: pantry?.user,
  };
  fetch(`${clientCredentials.databaseURL}/pantry/${pantry.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pantryObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deletePantry = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/pantry/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getPantries, getSinglePantry, createPantry, updatePantry, deletePantry, getPantriesByUser,
};
