// const env = `production`; 
// const url = env === 'development' ? `http://localhost:5000/api` : `https://api-bloodbank-v1.herokuapp.com/api`
// let myBlood = document.getElementById('get-blood');
// let check = document.getElementById('check');

// // Enable pusher logging - don't include this in development
// Pusher.logToConsole = true;

// var pusher = new Pusher('d8cb17462a316c94f1de', {
//     cluster: 'ap2'
// });
// const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)
// let userData = []
// myBlood.addEventListener('submit', (e) => {
//     e.preventDefault()
//     fetch(`${url}/bloodgroup/bloodAllGroup`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Basic ${basicAuth}`,
//             "Content-type": "application/json",
//             'Accept': "application/json",
//         },
//     }).then((response) => {
//         return response.json()
//     }).then(data => {
//         data.data.map(blood => {
//             userData = userData.push(blood)
//         })

//     })
// })

// var channel = pusher.subscribe('blood');
// channel.bind('my-blood', function (data) {
//     data.data.map(blood => {
//         // alert(JSON.stringify(blood.bloodgroup));
//     })

// });