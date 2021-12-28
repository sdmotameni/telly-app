import httpService from "./httpService";

const apiEndpoint = "https://api.gettelly.com/admin/";

function getAllUsers() {
  return httpService.get(apiEndpoint);
}

function getUserById(profileId) {
  return httpService.get(apiEndpoint + profileId);
}

function deleteProfile(profileId) {
  return httpService.delete(apiEndpoint + profileId);
}

export default { getAllUsers, getUserById, deleteProfile };
