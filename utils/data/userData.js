import { clientCredentials } from '../client';

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data?.id,
        uid: data?.uid,
        username: data?.username,
      });
    })
    .catch((error) => reject(error));
});

const createUser = (user) => new Promise((resolve, reject) => {
  const userObj = {
    uid: user.uid,
    username: user.username,
  };
  fetch(`${clientCredentials.databaseURL}/user`, {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateUserProfile = (user) => new Promise((resolve, reject) => {
  const userObj = {
    username: user.username,
  };
  fetch(`${clientCredentials.databaseURL}/user/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getUsers, getSingleUser, createUser, updateUserProfile, deleteUser,
};
