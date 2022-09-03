export const signin = ({ email, password }) =>
  fetch(`http://localhost:3000/api/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());

export const signup = (user, token) =>
  fetch(`http://localhost:3000/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

export const verifyToken = (token) =>
  fetch(`http://localhost:3000/api/verify?tok=${token}`).then((res) =>
    res.json()
  );
