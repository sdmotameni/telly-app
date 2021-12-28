import httpService from "./httpService";

const apiEndpoint = "https://api.gettelly.com/info/";

function getLinks() {
  return httpService.get(apiEndpoint + "links");
}

export default { getLinks };
