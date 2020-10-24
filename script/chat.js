// const url = `http://localhost:5000/api`;
const url = `https://api-bloodbank-v1.herokuapp.com`
let myBlood = document.getElementById('get-blood');
let check = document.getElementById('check');

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('d8cb17462a316c94f1de', {
    cluster: 'ap2'
});
const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)
let userData = []
myBlood.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(`${url}/bloodgroup/bloodAllGroup`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            "Content-type": "application/json",
            'Accept': "application/json",
        },
    }).then((response) => {
        return response.json()
    }).then(data => {
        data.data.map(blood => {
            console.log('Blood group', JSON.stringify(blood.bloodgroup));
            userData = userData.push(blood)
        })

    })
})

var channel = pusher.subscribe('blood');
channel.bind('my-blood', function(data) {
    data.data.map(blood => {
        // console.log('Pushwer', JSON.stringify(blood.bloodgroup));
        alert(JSON.stringify(blood.bloodgroup));
    })

});