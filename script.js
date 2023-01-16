var apiKey = prompt("Please enter your API key:"); // prompts the user to enter an API key
// and assigns the input to the variable "apiKey".

const Url = "https://my.api.mockaroo.com/GREENGROCER.json"; // defines a constant variable named "Url" that stores
// the URL of the API that will be used to fetch data.

const table = document.createElement("table"); // creates an HTML table element.
const thead = document.createElement("thead"); //creates an HTML thead element, which will be used to hold the table headers.
thead.classList.add("tbl-header");// adds a class of "tbl-header" to the thead element.

const headRow = document.createElement("tr");//creates an HTML tr element, which will be used to hold the table headers.
headRow.classList.add("tbl-header-row");//class of "tbl-header-row" to the headRow element.
// create table headers
const th1 = document.createElement("th");//creates an HTML th element, which will be used to hold the first table header.
th1.textContent = "ID";//sets the text content of the first th element to "ID".
const th2 = document.createElement("th");
th2.textContent = "Product Name";
const th3 = document.createElement("th");
th3.textContent = "Expiration Date";
const th4 = document.createElement("th");
th4.textContent = "Price";
const th5 = document.createElement("th");
th5.textContent = "In Stock";

headRow.appendChild(th1);// adds the first th element to the headRow element.
headRow.appendChild(th2);
headRow.appendChild(th3);
headRow.appendChild(th4);
headRow.appendChild(th5);
thead.appendChild(headRow);
table.appendChild(thead);

const tbody = document.createElement("tbody");
//  creates an HTML tbody element, which will be used to hold the table data.
const options = {
  headers: {
    "X-API-Key": apiKey,
    "Content-Type": "application/json",
  },
};//contains the API key and content type that will be used when fetching data from the API.


fetch(Url, options)// makes request to mockaroo api
  .then((response) => response.json()) // parses the response from the API into a JSON object.
  .then((data) => {
    data.forEach((rowData) => {
      const row = document.createElement("tr"); //creates an HTML tr element, which will be used to hold a row of data in the table.
      const td1 = document.createElement("td"); //creates an HTML td element, which will be used to hold a cell of data in the table.
      td1.textContent = rowData.id; //sets the text content of the first td element to the id property of the current element in the data array.
      const td2 = document.createElement("td");
      td2.textContent = rowData.product_name;
      const td3 = document.createElement("td");
      td3.textContent = rowData.expiration_date;
      const td4 = document.createElement("td");
      td4.textContent = rowData.price;
      const td5 = document.createElement("td");
      td5.textContent = rowData.in_stock;
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      row.appendChild(td4);
      row.appendChild(td5);
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody); //appends the tbody element to the table element.
    document.getElementById("table-container").appendChild(table);//finds the element with the id "table-container" and appends the table element to it,
    // effectively adding the entire table to the specified container in the HTML.

    //create charts
    var ctx = document.getElementById("Chart1").getContext("2d");//finds the element with the id "Chart1" and gets the 2D context of it, 
    //which will be used to create the first chart.
    var myChart = new Chart(ctx, { // creates a new chart using the Chart.js library and the context
      type: "bar",
      data: {
        labels: data.map(function (item) {
          return item.product_name; 
        }),//sets the labels for the chart to the product_name property of each element in the data array.

        datasets: [
          {
            label: "Products in stock",
            data: data.map(function (item) {
              return item.in_stock;
            }),//sets the data for the chart to the in_stock property of each element in the data array.
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    
    var filteredData = data.filter(function (item) {
      return (
        item.expiration_date.indexOf("2022") > -1 ||
        item.expiration_date.indexOf("2023") > -1
      );
    });//creates a new variable that contains a filtered version of the data array, 
    //only containing elements where the expiration_date property contains the string "2022" or "2023".
    

    var ctx = document.getElementById("Chart2").getContext("2d");
    //finds the element with the id "Chart2" and gets the 2D context of it, which will be used to create the second chart.
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["2022", "2023"],
        datasets: [
          {
            label: "Number of products with expiration dates in 2022 or 2023",
            data: [
              filteredData.filter(function (item) {
                return item.expiration_date.indexOf("2022") > -1;
              }).length,
              filteredData.filter(function (item) {
                return item.expiration_date.indexOf("2023") > -1;
              }).length,// sets the data for the chart to the number of elements in the filteredData array that contain the string "2022" or "2023" in the expiration_date property.
            ],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  });
