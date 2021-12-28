import { create } from "apisauce";
import authStorage from "../auth/authStorage";

const api = create({
  baseURL: "https://api.gettelly.com",
});

api.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;

  request.headers["x-auth-token"] = authToken;
});

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
};
