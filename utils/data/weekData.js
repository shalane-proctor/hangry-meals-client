import { clientCredentials } from '../client';

const getWeeks = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/week`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getWeeksByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/user-week/${userId}/`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleWeek = (weekId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/week/${weekId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data?.id,
        user: data?.user,
        monday: data?.monday,
        tuesday: data?.tuesday,
        wednesday: data?.wednesday,
        thursday: data?.thursday,
        friday: data?.friday,
        saturday: data?.saturday,
        sunday: data?.sunday,
      });
    })
    .catch((error) => reject(error));
});

const createWeek = (week) => new Promise((resolve, reject) => {
  const WeekObj = {
    id: week?.id,
    user: week?.user,
    monday: week?.monday,
    tuesday: week?.tuesday,
    wednesday: week?.wednesday,
    thursday: week?.thursday,
    friday: week?.friday,
    saturday: week?.saturday,
    sunday: week?.sunday,
  };
  fetch(`${clientCredentials.databaseURL}/week`, {
    method: 'Week',
    body: JSON.stringify(WeekObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateWeek = (week) => new Promise((resolve, reject) => {
  const WeekObj = {
    id: week?.id,
    user: week?.user,
    monday: week?.monday,
    tuesday: week?.tuesday,
    wednesday: week?.wednesday,
    thursday: week?.thursday,
    friday: week?.friday,
    saturday: week?.saturday,
    sunday: week?.sunday,
  };
  fetch(`${clientCredentials.databaseURL}/week/${week.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(WeekObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteWeek = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/week/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getWeeks, getSingleWeek, createWeek, updateWeek, deleteWeek, getWeeksByUser,
};
