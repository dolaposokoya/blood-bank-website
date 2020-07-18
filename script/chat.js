const host = `http://localhost:5000/request/blood-all-group`;
let myBlood = document.getElementById('get-blood');
let check = document.getElementById('check');
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('d8cb17462a316c94f1de', {
    cluster: 'ap2'
});

let userData = []
myBlood.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:5000/request/blood-all-group', {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            accept: "application/json",
        },
    }).then((response) => {
        return response.json()
    }).then(data => {
        // console.log(JSON.stringify(data.data));
        data.data.map(blood => {
            console.log('Blood group',JSON.stringify(blood.bloodgroup));
            userData = userData.push(blood)
        })

    })
})

var channel = pusher.subscribe('blood');
channel.bind('my-blood', function (data) {
    data.data.map(blood => {
        // console.log('Pushwer', JSON.stringify(blood.bloodgroup));
        alert(JSON.stringify(blood.bloodgroup));
    })

});

