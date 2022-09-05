const baseUrl = "http://localhost:3000/api";

export const getUsers = (token) =>
  fetch(`${baseUrl}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const getFriends = (token) =>
  fetch(`${baseUrl}/friends`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const addFriend = (friendId, token) =>
  fetch(`${baseUrl}/friend/add`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ friendId }),
  }).then((res) => res.json());

export const pushNotify = ({ token, notifications, userId }) =>
  fetch(`${baseUrl}/user/notify`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ notifications, userId }),
  }).then((res) => res.json());
