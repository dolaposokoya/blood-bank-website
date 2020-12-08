const env = `production`;
const apiEndpoint = env === 'development' ? `http://localhost:5000/api/` : `https://api-bloodbank-v1.herokuapp.com/api/`

export const url = {
    userLoginUrl: apiEndpoint + "user/loginUser",
    userRegistrationUrl: apiEndpoint + "user/createUser",
    getAllusers: apiEndpoint + "user/getAllUser",
    getMetaData: apiEndpoint + "bloodgroup/bloodAllGroup",
    makeRequest: apiEndpoint + "request/createRequest",
};