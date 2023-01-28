import { clientCredentials } from '../client';

const getBangazonUsers = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => (response.status === 200 ? response : false))
    .then((response) => {
      if (response) {
        resolve(response.json());
      } else {
        throw new Error('403 response from server');
      }
    })
    .catch(reject);
});

const getUserById = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        uid: data.uid,
        createdOn: data.created_on,
        imageUrl: data.image_url,
      });
    })
    .catch(reject);
});

const createUser = (user, post) => new Promise((resolve, reject) => {
  const userObj = {
    firstName: post.first_name,
    lastName: post.last_name,
    uid: user.uid,
    createdOn: post.created_on,
    image_url: post.image_url,
  };
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch((error) => reject(error));
});

const updateUser = (user, put, id) => new Promise((resolve, reject) => {
  const userObj = {
    id: put.id,
    firstName: put.first_name,
    lastName: put.last_name,
    uid: user.uid,
    createdOn: put.created_on,
    image_url: put.image_url,
  };
  fetch(`${clientCredentials.databaseURL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

// eslint-disable-next-line import/prefer-default-export
export {
  deleteUser, updateUser, createUser, getUserById, getBangazonUsers,
};
