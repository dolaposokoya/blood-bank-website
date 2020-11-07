var ctx = document.getElementById('myChart').getContext('2d');

Chart.defaults.global.defaultFontFamily = "Roboto Mono', 'monospace'";
Chart.defaults.global.defaultFontSize = 38;
Chart.defaults.global.defaultFontStyle = 'black';

const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        datasets: [{
            label: 'Blood group',
            data: [20.8, 0.57, 38.14, 1.79, 27.85, 1.43, 8.93, 0.49],
            // data: ['20.8%', '0.57%', '38.14%', '1.79%', '27.85%', '	1.43%', '8.93%', '0.49%'],
            weight: 5,
            backgroundColor: [
                '#724DD6',
                '#61DFED',
                '#41F064',
                '#3890FC',
                '#FF4350',
                '#FFEC29',
                '#303AD9',
                '#FF1200'
            ],
            borderColor: [
                '#724DD6',
                '#61DFED',
                '#41F064',
                '#3890FC',
                '#FF4350',
                '#FFEC29',
                '#303AD9',
                '#FF1200'
            ],
            borderWidth: 0,
            borderColor: '#777',
            hoverBorerColor: 'black',

        }]
    },
    options: {
        title: {
            display: true,
            fontSize: 25
        },
        legend: {
            position: 'right',
            labels: {
                text:"Yes",
                fontColor: 'black',
                fontStyle: 'bold',
                fontSize: 25
            }
        },
        tooltips:{
            enable: true
        },
        // scales: {
        //     xAxes: [{
        //         gridLines: {
        //             color: "rgba(0, 0, 0, 0)",
        //         },
        //     }],
        //     yAxes: [{
        //         gridLines: {
        //             color: "rgba(0, 0, 0, 0)",
        //         },
        //         ticks: {
        //             beginAtZero: true
        //         }
        //     }]
        // }
    }
});


function resize(){    
    $("#canvas").outerHeight($(window).height()-$("#canvas").offset().top- Math.abs($("#canvas").outerHeight(true) - $("#canvas").outerHeight()));
  }
  $(document).ready(function(){
    resize();
    $(window).on("resize", function(){                      
        resize();
    });
  });