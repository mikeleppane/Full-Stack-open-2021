import axios from "axios";

const personDBURL = "/api";
const axiosInstance = axios.create({
  baseURL: personDBURL,
  timeout: 5000,
});

const getAll = () => {
  const request = axiosInstance.get("/persons");
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axiosInstance.post("/persons", newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axiosInstance.put(`/persons/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axiosInstance.delete(`/persons/${id}`);
  return request.then();
};

export default {
  getAll,
  create,
  update,
  remove,
};
