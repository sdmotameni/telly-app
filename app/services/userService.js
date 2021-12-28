import httpService from "./httpService";

const apiEndpoint = "https://api.gettelly.com/user/";

function getMe() {
  return httpService.get(apiEndpoint + "me");
}

function updateSettings(data) {
  return httpService.post(apiEndpoint + "settings", data);
}

function updateLinks(data) {
  return httpService.post(apiEndpoint + "links", data);
}

function uploadProfilePicture(formData, cb) {
  return httpService.post(apiEndpoint + "upload", formData, {
    onUploadProgress: (progressEvent) => {
      cb(Math.round((progressEvent.loaded / progressEvent.total) * 100));
    },
  });
}

export default { getMe, updateSettings, updateLinks, uploadProfilePicture };
