<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>KrushiSetu | Crop Prices</title>

<link rel="stylesheet"
href="../css/style.css">

</head>


<body>


<header class="navbar">

<div class="logo">
🌾 KrushiSetu
</div>

<nav>

<a href="../index.html">
Home
</a>

<a href="dashboard.html">
Dashboard
</a>

<a href="markets.html">
Markets
</a>

<a href="weather.html">
Weather
</a>

</nav>

</header>


<main class="page-container">

<h1>
🌾 Current Crop Prices
</h1>

<p>
Latest available market information
</p>


<div class="filter-box">

<label>
Select Crop
</label>

<select id="cropSelect"
onchange="loadPrices()">

<option value="onion">
Onion
</option>

<option value="tomato">
Tomato
</option>

<option value="soybean">
Soybean
</option>

<option value="maize">
Maize
</option>

</select>


<label>
Select District
</label>

<select id="districtSelect"
onchange="loadPrices()">

<option>
Nashik
</option>

<option>
Pune
</option>

<option>
Ahmednagar
</option>

<option>
Latur
</option>

</select>

</div>


<div class="update-box">

🔄 Last checked:

<span id="updateTime">
--:--
</span>

<button onclick="loadPrices()"
class="refresh-btn">

Refresh

</button>

</div>


<div class="table-container">

<table>

<thead>

<tr>

<th>Market</th>

<th>Crop</th>

<th>Price ₹/Quintal</th>

<th>Status</th>

</tr>

</thead>


<tbody id="priceTable">

</tbody>

</table>

</div>


<div class="price-summary">

<div>
<h3>Highest Price</h3>

<p id="highestPrice">
--
</p>
</div>


<div>
<h3>Lowest Price</h3>

<p id="lowestPrice">
--
</p>
</div>


<div>
<h3>Average Price</h3>

<p id="averagePrice">
--
</p>
</div>

</div>


<p class="data-note">

⚠️ Market prices displayed here are demonstration
data until the live government/agricultural market
data API is connected.

</p>


</main>


<script>

const marketData = {

onion: [

{
market: "Nashik APMC",
price: 3250
},

{
market: "Pune APMC",
price: 3180
},

{
market: "Ahmednagar APMC",
price: 3300
},

{
market: "Latur APMC",
price: 3050
}

],


tomato: [

{
market: "Nashik APMC",
price: 2800
},

{
market: "Pune APMC",
price: 2950
},

{
market: "Ahmednagar APMC",
price: 2750
},

{
market: "Latur APMC",
price: 2600
}

],


soybean: [

{
market: "Nashik APMC",
price: 5200
},

{
market: "Pune APMC",
price: 5350
},

{
market: "Ahmednagar APMC",
price: 5500
},

{
market: "Latur APMC",
price: 5650
}

],


maize: [

{
market: "Nashik APMC",
price: 2300
},

{
market: "Pune APMC",
price: 2400
},

{
market: "Ahmednagar APMC",
price: 2350
},

{
market: "Latur APMC",
price: 2450
}

]

};


function loadPrices() {

const crop =
document.getElementById("cropSelect").value;

const data =
marketData[crop];


const table =
document.getElementById("priceTable");

table.innerHTML = "";


const prices =
data.map(item => item.price);


const highest =
Math.max(...prices);

const lowest =
Math.min(...prices);

const average =
prices.reduce((a,b) => a+b,0)
/
prices.length;


data.forEach(item => {

const row =
document.createElement("tr");

let status =
"Normal";

if(item.price === highest) {

status =
"🏆 Highest";

}


row.innerHTML = `

<td>${item.market}</td>

<td>
${crop.toUpperCase()}
</td>

<td>
₹${item.price.toLocaleString()}
</td>

<td>
${status}
</td>

`;

table.appendChild(row);

});


document.getElementById(
"highestPrice"
).innerText =
"₹" + highest.toLocaleString();


document.getElementById(
"lowestPrice"
).innerText =
"₹" + lowest.toLocaleString();


document.getElementById(
"averagePrice"
).innerText =
"₹" + Math.round(average).toLocaleString();


document.getElementById(
"updateTime"
).innerText =
new Date().toLocaleString();

}


loadPrices();

</script>


</body>
</html>
