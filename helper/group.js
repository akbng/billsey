const baseUrl = "http://localhost:3000/api";

export const getGroupsOfMember = (userId, token) =>
  fetch(`${baseUrl}/groups/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const createGroup = ({ token, name, description, tags, members }) =>
  fetch(`${baseUrl}/group/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description, tags, members }),
  }).then((res) => res.json());

export const getGroup = (groupId, token) =>
  fetch(`${baseUrl}/group/${groupId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const saveBillToGroup = ({
  name,
  totalAmount,
  members,
  splitAmount,
  token,
  groupId,
}) =>
  fetch(`${baseUrl}/group/add/bill`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      groupId,
      bill: { name, totalAmount, members, splitAmount },
    }),
  }).then((res) => res.json());
