// First, parse the JSON data and store it in a variable.
var jsonData = '[{"id":1,"product_name":"Crackers - Melba Toast","expiration_date":"7/1/2023","price":"€6,47","in_stock":45}]';
var data = JSON.parse(jsonData);

// Next, create a new Chart.js chart using the <canvas> element and the parsed JSON data.
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: data.map(function(item) {
            return item.product_name;
        }),
        datasets: [{
            label: "My chart",
            data: data.map(function(item) {
                return item.in_stock;
            }),
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)"
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


var filteredData = data.filter(function(item) {
    return item.expiration_date.indexOf("2022") > -1 || item.expiration_date.indexOf("2023") > -1;
});

// Finally, create a new Chart.js chart using the <canvas> element and the filtered data.
// In this example, we will create a bar chart that shows the number of products with expiration dates in 2022 or 2023.
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["2022", "2023"],
        datasets: [{
            label: "My chart",
            data: [
                filteredData.filter(function(item) {
                    return item.expiration_date.indexOf("2022") > -1;
                }).length,
                filteredData.filter(function(item) {
                    return item.expiration_date.indexOf("2023") > -1;
                }).length
            ]
        }]
    },
});
    