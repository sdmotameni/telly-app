import httpService from "./httpService";

const apiEndpoint = "https://api.gettelly.com/";

const login = (phone) => {
  return httpService.post(apiEndpoint + "login", { phone });
};

const validateToken = (token, loginCode) => {
  return httpService.post(apiEndpoint + "validate", { token, loginCode });
};

export default { login, validateToken };
