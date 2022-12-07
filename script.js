const Url = "https://my.api.mockaroo.com/EDI.json";
const table = document.createElement("table");
table.cellPadding = 0;
table.cellSpacing = 0;
table.border = 0;
const thead = document.createElement("thead");
thead.classList.add("tbl-header");
thead.cellPadding = 0;
thead.cellSpacing = 0;
thead.border = 0;
const headRow = document.createElement("tr");
headRow.classList.add("tbl-header-row");
headRow.cellPadding = 0;
headRow.cellSpacing = 0;
headRow.border = 0;
const th1 = document.createElement("th");
th1.textContent = "ID";
const th2 = document.createElement("th");
th2.textContent = "Product Name";
const th3 = document.createElement("th");
th3.textContent = "Expiration Date";
const th4 = document.createElement("th");
th4.textContent = "Price";
const th5 = document.createElement("th");
th5.textContent = "In Stock";
headRow.appendChild(th1);
headRow.appendChild(th2);
headRow.appendChild(th3);
headRow.appendChild(th4);
headRow.appendChild(th5);
thead.appendChild(headRow);
table.appendChild(thead);

const tbody = document.createElement("tbody");
const options = {
  headers: {
    "X-API-Key": "aac96970",
    "Content-Type": "application/json",
  },
};
fetch(Url, options)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((rowData) => {
      const row = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.textContent = rowData.id;
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
    table.appendChild(tbody);
    document.getElementById("table-container").appendChild(table);
    var filteredData = data.filter(function (item) {
      return (
        item.expiration_date.indexOf("2022") > -1 ||
        item.expiration_date.indexOf("2023") > -1
      );
    });
    var ctx = document.getElementById("Chart2").getContext("2d");
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
              }).length,
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
    var ctx = document.getElementById("Chart1").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map(function (item) {
          return item.product_name;
        }),
        datasets: [
          {
            label: "Products in stock",
            data: data.map(function (item) {
              return item.in_stock;
            }),
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
  });
