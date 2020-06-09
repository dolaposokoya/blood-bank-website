// const apiEndpoint = "https://api-bloodbank.herokuapp.com/";

let apiEndpoint = "http://localhost:5000/";

export const url = {
  userLoginUrl: apiEndpoint + "user/login-user",
  userRegistrationUrl: apiEndpoint + "user/create-user",
  getAllusers: apiEndpoint + "user/get-all-user",
  getMetaData: apiEndpoint + "request/blood-all-group",
  makeRequest: apiEndpoint + "request/create-request",
};
