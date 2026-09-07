/* =========================================================
   KRUSHISETU - MAIN JAVASCRIPT
   Smart Farmer Market Decision Support System
   ========================================================= */


/* =========================================================
   1. GENERAL NAVIGATION
   ========================================================= */
// KrushiSetu Backend API
const API_BASE_URL = "http://localhost:5000/api";
function findMarket() {

    const marketSection =
        document.getElementById("markets");

    if (marketSection) {

        marketSection.scrollIntoView({
            behavior: "smooth"
        });

    } else {

        window.location.href = "pages/markets.html";

    }

}


/* =========================================================
   2. LOGIN
   ========================================================= */

function openLogin() {

    window.location.href = "pages/login.html";

}


/* =========================================================
   3. SHOW CROP PRICES
   ========================================================= */

function showPrices() {

    const priceSection =
        document.getElementById("prices");

    if (priceSection) {

        priceSection.scrollIntoView({
            behavior: "smooth"
        });

    } else {

        window.location.href = "pages/prices.html";

    }

}


/* =========================================================
   4. WEATHER PAGE
   ========================================================= */

function weatherInfo() {

    window.location.href =
        "pages/weather.html";

}


/* =========================================================
   5. MARKET PAGE
   ========================================================= */

function openMarkets() {

    window.location.href =
        "pages/markets.html";

}


/* =========================================================
   6. PROFILE PAGE
   ========================================================= */

function openProfile() {

    window.location.href =
        "pages/profile.html";

}


/* =========================================================
   7. LOCATION DETECTION
   ========================================================= */

function getLocation() {

    const locationElement =
        document.getElementById("location");

    if (!navigator.geolocation) {

        if (locationElement) {

            locationElement.innerText =
                "GPS is not supported by your browser.";

        }

        return;

    }


    if (locationElement) {

        locationElement.innerText =
            "Detecting your location...";

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            if (locationElement) {

                locationElement.innerText =
                    "Latitude: " +
                    latitude.toFixed(5) +
                    " | Longitude: " +
                    longitude.toFixed(5);

            }


            console.log(
                "Farmer Location:",
                latitude,
                longitude
            );


            /*
             * Later we will send these coordinates
             * to the backend.
             *
             * Example:
             *
             * /api/markets?lat=20.00&lon=73.78
             */

        },


        function(error) {

            let message =
                "Unable to detect location.";

            if (error.code === 1) {

                message =
                    "Location permission was denied.";

            }

            if (error.code === 2) {

                message =
                    "Location information is unavailable.";

            }

            if (error.code === 3) {

                message =
                    "Location request timed out.";

            }


            if (locationElement) {

                locationElement.innerText =
                    message;

            }

        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }

    );

}


/* =========================================================
   8. CROP DATA
   DEMONSTRATION DATA ONLY
   ========================================================= */

const cropPrices = {

    onion: 3250,

    tomato: 2800,

    maize: 2300,

    soybean: 5200

};


/* =========================================================
   9. MARKET DATA
   DEMONSTRATION DATA ONLY
   ========================================================= */

const marketDistances = {

    nashik: 20,

    pune: 90,

    ahmednagar: 70,

    latur: 180

};


/* =========================================================
   10. PROFIT / NET REALIZATION CALCULATOR
   ========================================================= */

function calculateProfit() {


    const cropElement =
        document.getElementById("crop");

    const quantityElement =
        document.getElementById("quantity");

    const marketElement =
        document.getElementById("market");


    if (!cropElement ||
        !quantityElement ||
        !marketElement) {

        return;

    }


    const crop =
        cropElement.value;


    const quantity =
        Number(quantityElement.value);


    const market =
        marketElement.value;


    if (!quantity ||
        quantity <= 0) {

        alert(
            "Please enter a valid quantity."
        );

        return;

    }


    const price =
        Number(cropElement.selectedOptions[0].dataset.price)
        || cropPrices[crop]
        || Number(cropElement.value);


    const distance =
        Number(marketElement.selectedOptions[0].dataset.distance)
        || marketDistances[market]
        || Number(marketElement.value);


    /*
     * Demonstration transport rate.
     *
     * This will later be replaced with
     * actual transportation calculation.
     */

    const transportRate =
        10;


    const transportCost =
        distance *
        transportRate;


    const grossRevenue =
        price *
        quantity;


    /*
     * Demonstration additional charges.
     *
     * Later these will come from actual
     * market/mandi information.
     */

    const loadingCost =
        quantity * 20;


    const unloadingCost =
        quantity * 20;


    const marketCharges =
        quantity * 10;


    const commission =
        grossRevenue * 0.01;


    const totalExpenses =
        transportCost +
        loadingCost +
        unloadingCost +
        marketCharges +
        commission;


    const netRealization =
        grossRevenue -
        totalExpenses;


    const result =
        document.getElementById("result");


    if (!result) {

        return;

    }


    result.innerHTML = `

        <h3>💰 Selling Calculation</h3>

        <p>
            <strong>Crop:</strong>
            ${crop}
        </p>

        <p>
            <strong>Quantity:</strong>
            ${quantity} Quintal
        </p>

        <p>
            <strong>Market:</strong>
            ${market}
        </p>

        <p>
            <strong>Market Price:</strong>
            ₹${price.toLocaleString("en-IN")}
            / Quintal
        </p>

        <hr>

        <p>
            <strong>Gross Revenue:</strong>
            ₹${grossRevenue.toLocaleString("en-IN")}
        </p>

        <p>
            <strong>Transport Cost:</strong>
            ₹${transportCost.toLocaleString("en-IN")}
        </p>

        <p>
            <strong>Loading:</strong>
            ₹${loadingCost.toLocaleString("en-IN")}
        </p>

        <p>
            <strong>Unloading:</strong>
            ₹${unloadingCost.toLocaleString("en-IN")}
        </p>

        <p>
            <strong>Market Charges:</strong>
            ₹${marketCharges.toLocaleString("en-IN")}
        </p>

        <p>
            <strong>Commission:</strong>
            ₹${Math.round(commission).toLocaleString("en-IN")}
        </p>

        <hr>

        <h2>
            🏆 Expected Net Realization:
            ₹${Math.round(netRealization).toLocaleString("en-IN")}
        </h2>

        <small>
            ⚠️ This is an estimated calculation.
            Actual realization may vary.
        </small>

    `;


    result.style.display =
        "block";

}


/* =========================================================
   11. TRANSPORT CALCULATOR
   ========================================================= */

function transportCalculator() {

    const distance =
        Number(
            prompt(
                "Enter distance to market in kilometres:"
            )
        );


    if (!distance ||
        distance <= 0) {

        alert(
            "Please enter a valid distance."
        );

        return;

    }


    const rate =
        10;


    const cost =
        distance * rate;


    alert(

        "Estimated Transport Cost\n\n" +

        "Distance: " +
        distance +
        " km\n" +

        "Estimated Rate: ₹" +
        rate +
        "/km\n\n" +

        "Estimated Cost: ₹" +
        cost.toLocaleString("en-IN")

    );

}


/* =========================================================
   12. SAVE FARMER PROFILE
   ========================================================= */

function saveFarmerProfile() {


    const name =
        document.getElementById(
            "farmerName"
        )?.value;


    const mobile =
        document.getElementById(
            "mobileNumber"
        )?.value;


    const village =
        document.getElementById(
            "village"
        )?.value;


    const district =
        document.getElementById(
            "district"
        )?.value;


    const language =
        document.getElementById(
            "language"
        )?.value;


    if (!name) {

        alert(
            "Please enter farmer name."
        );

        return;

    }


    const profile = {

        name: name,

        mobile: mobile,

        village: village,

        district: district,

        language: language

    };


    localStorage.setItem(

        "krushiProfile",

        JSON.stringify(profile)

    );


    const message =
        document.getElementById(
            "saveMessage"
        );


    if (message) {

        message.innerText =
            "✅ Profile saved successfully.";

    }

}


/* =========================================================
   13. LOAD FARMER PROFILE
   ========================================================= */

function loadFarmerProfile() {


    const savedProfile =
        localStorage.getItem(
            "krushiProfile"
        );


    if (!savedProfile) {

        return;

    }


    const profile =
        JSON.parse(savedProfile);


    const name =
        document.getElementById(
            "farmerName"
        );


    const mobile =
        document.getElementById(
            "mobileNumber"
        );


    const village =
        document.getElementById(
            "village"
        );


    const district =
        document.getElementById(
            "district"
        );


    const language =
        document.getElementById(
            "language"
        );


    if (name)
        name.value =
            profile.name || "";


    if (mobile)
        mobile.value =
            profile.mobile || "";


    if (village)
        village.value =
            profile.village || "";


    if (district)
        district.value =
            profile.district || "";


    if (language)
        language.value =
            profile.language || "";

}


/* =========================================================
   14. LOGIN CHECK
   ========================================================= */

function checkLogin() {


    const loggedIn =
        localStorage.getItem(
            "krushiLoggedIn"
        );


    return loggedIn === "true";

}


/* =========================================================
   15. LOGOUT
   ========================================================= */

function logout() {


    localStorage.removeItem(
        "krushiLoggedIn"
    );


    window.location.href =
        "../index.html";

}


/* =========================================================
   16. CURRENT DATE & TIME
   ========================================================= */

function showCurrentDateTime() {


    const element =
        document.getElementById(
            "updateTime"
        );


    if (!element) {

        return;

    }


    const now =
        new Date();


    element.innerText =
        now.toLocaleString(
            "en-IN",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );

}


/* =========================================================
   17. WEATHER - API READY FUNCTION
   ========================================================= */

async function getLiveWeather(
    latitude,
    longitude
) {


    /*
     * IMPORTANT:
     *
     * Do NOT put a private API key directly
     * into this JavaScript file.
     *
     * In the final project:
     *
     * Browser
     *     ↓
     * Node.js Backend
     *     ↓
     * Weather API
     *
     */


    console.log(
        "Weather coordinates:",
        latitude,
        longitude
    );


    /*
     * Future example:
     *
     * const response =
     * await fetch(
     * `/api/weather?lat=${latitude}&lon=${longitude}`
     * );
     *
     * const data =
     * await response.json();
     *
     * updateWeatherUI(data);
     */

}


/* =========================================================
   18. GET WEATHER LOCATION
   ========================================================= */

function getWeatherLocation() {


    if (!navigator.geolocation) {

        alert(
            "GPS is not supported."
        );

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position) {


            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            const location =
                document.getElementById(
                    "location"
                );


            if (location) {

                location.innerText =

                    "Latitude: " +
                    latitude.toFixed(4) +

                    " | Longitude: " +
                    longitude.toFixed(4);

            }


            getLiveWeather(
                latitude,
                longitude
            );


        },


        function() {

            alert(
                "Unable to detect your location."
            );

        }

    );

}


/* =========================================================
   19. REFRESH DATA
   ========================================================= */

function refreshData() {


    showCurrentDateTime();


    /*
     * Later:
     *
     * refresh market prices
     * refresh weather
     * refresh market distances
     */


    console.log(
        "KrushiSetu data refresh requested."
    );

}


/* =========================================================
   20. LANGUAGE SELECTION
   ========================================================= */

function changeLanguage(language) {


    localStorage.setItem(
        "krushiLanguage",
        language
    );


    console.log(
        "Selected language:",
        language
    );


    /*
     * Later we can implement
     * complete Marathi / Hindi /
     * English translation.
     */

}


/* =========================================================
   21. INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        console.log(
            "🌾 KrushiSetu initialized successfully."
        );


        /*
         * Load saved profile if profile
         * page is opened.
         */

        loadFarmerProfile();


        /*
         * Show current date/time wherever
         * updateTime exists.
         */

        showCurrentDateTime();


        /*
         * Automatically detect location
         * if location element exists.
         */

        const locationElement =
            document.getElementById(
                "location"
            );


        if (locationElement) {

            getLocation();

        }


    }
);
    
