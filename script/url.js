const apiEndpoint = `https://api-bloodbank-v1.herokuapp.com`

// const apiEndpoint = "http://localhost:5000/api/";

export const url = {
    userLoginUrl: apiEndpoint + "user/loginUser",
    userRegistrationUrl: apiEndpoint + "user/createUser",
    getAllusers: apiEndpoint + "user/getAllUser",
    getMetaData: apiEndpoint + "bloodgroup/bloodAllGroup",
    makeRequest: apiEndpoint + "request/createRequest",
};