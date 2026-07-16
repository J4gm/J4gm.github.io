// The number of divs in the Earth's shadow. Higher value means a less blocky shadow.
const resolution = 100;

// Number of seconds in a day.
const secondsPerDay = 24 * 60 * 60;
// An arbitrary reference date used by astronomers when they're doing this kind of maths.
const epoch = new Date(2000, 0, 1, 12);
// The progress of the Earth around the Sun at the above epoch in degrees, relative to its closest point to the Sun.
const meanAnomolyAtEpoch = 357.5291;
// The number of degrees around the Sun that the Earth travels in its orbit each day.
const meanAngularMotion = 0.98560028;
// A magic number that makes everything work that I'm not going to ask questions about.
const earthCoefficient = 1.9148;
// Angle between the major axis of the Earth's orbit and the intersection of the orbit with the solar plane.
const argumentOfPerihelion = 102.9372;
// Axial tilt of the Earth. (bigger angle = more extreme seasons)
const axialTilt = 23.4397;

// Location data for all the cities represented on the map.
const cities = {
    "Tokyo": [35.68, 139.77],
    "Delhi": [28.61, 77.23],
    "Shanghai": [31.23, 121.47],
    "São Paulo": [-23.55, -46.63],
    "Mexico City": [19.43, -99.13],
    "Cairo": [30.04, 31.24],
    "Mumbai": [19.08, 72.88],
    "Beijing": [39.91, 116.40],
    "Dhaka": [23.80, 90.42],
    "New York": [40.72, -74.00],
    "Tehran": [35.69, 51.39],
    "Karachi": [24.86, 67.01],
    "Buenos Aires": [-34.60, -58.38],
    "Chongqing": [29.56, 106.55],
    "Istanbul": [41.01, 28.96],
    "Manila": [14.60, 120.98],
    "Lagos": [6.46, 3.38],
    "Kinshasa": [-4.32, 15.31],
    "Guangzhou": [23.13, 113.26],
    "Los Angeles": [34.05, -118.25],
    "Moscow": [55.75, 37.62],
    "Lahore": [31.55, 74.34],
    "Bangalore": [12.98, 77.59],
    "Paris": [48.86, 2.35],
    "Bogotá": [4.71, -74.07],
    "Jakarta": [-6.18, 106.83],
    "Lima": [-12.06, -77.04],
    "Bangkok": [13.75, 100.49],
    "Seoul": [37.56, 126.99],
    "London": [51.50, -0.13],
    "Chicago": [41.88, -87.63],
    "Saigon": [10.78, 106.70],
    "Luanda": [-8.84, 13.23],
    "Kuala Lumpur": [3.15, 101.70],
    "Xi'an": [34.26, 108.94],
    "Shenyang": [41.80, 123.43],
    "Riyadh": [24.63, 46.72],
    "Baghdad": [33.32, 44.37],
    "Santiago": [-33.44, -70.65],
    "Madrid": [40.42, -3.70],
    "Harbin": [45.76, 126.64],
    "Houston": [29.76, -95.38],
    "Dallas": [32.78, -96.81],
    "Toronto": [43.74, -79.37],
    "Dar es Salaam": [-6.82, 39.28],
    "Miami": [25.78, -80.21],
    "Belo Horizonte": [-19.92, -43.93],
    "Atlanta": [33.75, -84.39],
    "Fukuoka": [33.59, 130.40],
    "Khartoum": [15.60, 32.50],
    "Johannesburg": [-26.20, 28.06],
    "St. Petersburg": [59.94, 30.31],
    "Washington D.C.": [38.90, -77.02],
    "Yangon": [16.80, 96.16],
    "Jinan": [36.67, 117.02],
    "Berlin": [52.52, 13.41],
    "Kyiv": [50.45, 30.52],
    "Rome": [41.9, 12.48],
    "Vienna": [48.21, 16.37],
    "Minsk": [53.90, 27.56],
    "Bucharest": [44.43, 26.10],
    "Milan": [45.47, 9.19],
    "Kazan": [55.80, 49.11],
    "Rostov": [47.22, 39.71],
    "Voronezh": [51.67, 39.21],
    "Odesa": [46.49, 30.74],
    "Havana": [23.14, -82.36],
    "Montreal": [45.51, -73.55],
    "Juárez": [31.75, -106.485],
    "Calgary": [51.05, -114.07],
    "Guatemala City": [14.61, -90.54],
    "Port-au-Prince": [18.59, -72.31],
    "Monterrey": [25.68, -100.32],
    "Panama City": [8.98, -79.52],
    "Jacksonville": [30.34, -81.66],
    "San Jose": [37.34, -121.89],
    "Caracas": [10.48, -66.90],
    "Salvador": [-12.97, -38.48],
    "Brasília": [-15.79, -47.88],
    "Fortaleza": [-3.73, -38.53],
    "Guayaquil": [-2.19, -79.89],
    "Manaus": [-3.12, -60.02],
    "Recife": [-8.05, -34.90],
    "Santa Cruz": [-17.80, -63.18],
    "Porto Alegre": [-30.03, -51.23],
    "Belém": [-1.46, -48.50],
    "Córdoba": [-31.42, -64.18],
    "Sydney": [-33.87, 151.21],
    "Melbourne": [-37.81, 144.96],
    "Brisbane": [-27.47, 153.03],
    "Perth": [-31.96, 115.86],
    "Auckland": [-36.85, 174.77],
    "Adelaide": [-34.93, 138.60],
    "Honolulu": [21.31, -157.86],
    "Christchurch": [-43.53, 172.64],
    "Port Moresby": [-9.48, 147.15],
    "Nouméa": [-22.28, 166.46],
    "Hobart": [-42.89, 147.33],
    "Townsville": [-19.25, 146.82],
    "Papeete": [-17.54, -149.57],
    "Suva": [-18.14, 178.44],
    "Kiritimati": [1.85, -157.40],
    "McMurdo": [-77.85, 166.67],
    "Abidjan": [5.32, -4.03],
    "Addis Ababa": [9.03, 38.74],
    "Nairobi": [-1.29, 36.82],
    "Cape Town": [-33.93, 18.42],
    "Yaoundé": [3.87, 11.52],
    "Durban": [-29.88, 31.05],
    "Casablanca": [33.53, -7.58],
    "Antananarivo": [-18.91, 47.53],
    "Abuja": [9.07, 7.48],
    "Dakar": [14.69, -17.45],
    "Lusaka": [-15.42, 28.28],
    "Algiers": [36.73, 3.09],
    "Bamako": [12.64, -8.00],
    "Lubumbashi": [-11.66, 27.48],
    "Mogadishu": [2.04, 45.34],
    "Conakry": [9.51, -13.71],
    "N'Djamena": [12.11, 15.04],
    "Nouakchott": [18.09, -15.97],
    "Hanoi": [21.00, 105.85],
    "Jeddah": [21.54, 39.17],
    "Kabul": [34.53, 69.18],
    "Wenzhou": [27.99, 120.70],
    "Taipei": [25.04, 121.56],
    "Dubai": [25.26, 55.30],
    "Sapporo": [43.06, 141.35],
    "Almaty": [43.24, 76.92],
    "Davao City": [7.07, 125.60],
    "Novosibirsk": [55.05, 82.95],
    "Yekaterinburg": [56.84, 60.61],
    "Astana": [51.15, 71.42],
    "Amman": [31.95, 35.93],
    "Kuwait City": [29.37, 47.98],
    "Tashkent": [41.31, 69.28],
    "Ulaanbaatar": [47.92, 106.92],
    "Tripoli": [32.89, 13.19],
    "Kigali": [-1.94, 30.06],
    "Stockholm": [59.33, 18.07],
    "Kathmandu": [27.71, 85.32],
    "Ashgabat": [37.94, 58.38],
    "Libreville": [0.39, 9.45],
    "Oslo": [59.91, 10.74],
    "Athens": [37.98, 23.73],
    "Juba": [4.85, 31.60],
    "Asunción": [-25.30, -57.63],
    "Lisbon": [38.73, -9.15],
    "Edinburgh": [55.95, -3.19],
    "Windhoek": [-22.57, 17.08],
    "Dili": [-8.55, 125.58],
    "Paramaribo": [5.85, -55.20],
    "Laayoune": [27.15, -13.20],
    "Malé": [4.18, 73.51],
    "Reykjavík": [64.15, -21.94],
    "Colombo": [6.93, 79.84],
    "Longyearbyen": [78.22, 15.65],
    "Nuuk": [64.18, -51.74],
    "Seattle": [47.61, -122.33],
    "Anchorage": [61.22, -149.89],
    "Irkutsk": [52.28, 104.28],
    "Yakutsk": [62.03, 129.73],
    "Yinchuan": [38.49, 106.23],
    "Ürümqi": [43.82, 87.61],
    "Murmansk": [68.97, 33.08],
    "Punta Arenas": [-53.17, -70.13],
    "Winnipeg": [49.88, -97.15],
    "Denver": [39.74, -104.98],
    "St. John's": [47.56, -52.71],
    "Petropavlovsk": [53.02, 158.65],
    "Makassar": [-5.13, 119.41],
    "Nusantara": [-0.97, 116.71],
    "Cork": [51.90, -8.47],
    "Utqiagvik": [71.29, -156.79],
    "Ikpiarjuk": [73.03, -85.17],
    "Ponta<br>Delgada": [37.74, -25.68],
    "Niamey": [13.51, 2.11],
    "Kraków": [50.06, 19.94],
    "Tbilisi": [41.72, 44.79],
    "Tirana": [41.33, 19.82],
    "Kansas City": [39.10, -94.58],
    "Bridgetown": [13.10, -59.61],
    "Toulouse": [43.60, 1.44],
    "Darwin": [-12.44, 130.84]
}

// Move the background map image to sync up with the solar times along the top of the page.
function updateMapPosition() {
    let now = new Date();
    let seconds = now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds();
    let mapImages = document.querySelectorAll(".mapimg");
    mapImages[0].style = `left: ${(seconds / secondsPerDay) * 100 - 100}%`;
    mapImages[1].style = `left: ${(seconds / secondsPerDay) * 100}%`;
}

// Some basic trig functions so I can work in degrees instead of radians.
function sin(degrees) {
    return Math.sin(2 * Math.PI * (degrees / 360));
}

function asin(x) {
    return 360 * (Math.asin(x) / (2 * Math.PI));
}

function cos(degrees) {
    return Math.cos(2 * Math.PI * (degrees / 360));
}

function acos(x) {
    return 360 * (Math.acos(x) / (2 * Math.PI));
}

// Update the widths and positions of the divs comprising the Earth's shadow.
function updateSunriseTimes() {

    let now = new Date();
    // Get the number of days that have passed since the astronomical epoch.
    let daysSinceEpoch = (now - epoch) / (secondsPerDay * 1000);
    // Get the current progress of the Earth around the Sun.
    let solarMeanAnomaly = (meanAnomolyAtEpoch + meanAngularMotion * daysSinceEpoch) % 360;
    // Making use of the scary Earth coefficient.
    let equationOfTheCentre = earthCoefficient * sin(solarMeanAnomaly);
    // Calculate the apparent longitude of the Sun relative to Earth's point position.
    let eclipticLongitude = (solarMeanAnomaly + equationOfTheCentre + 180 + argumentOfPerihelion) % 360;
    // The time of day at which the Sun is highest in the sky. (You would think this is midday but you'd be wrong).
    let solarTransit = 0.5 + 0.0053 * sin(solarMeanAnomaly) - 0.0069 * sin(2 * eclipticLongitude);
    // The angle of the Sun relative to the Earth's equator.
    let declinationOfSun = asin(sin(eclipticLongitude) * sin(axialTilt));

    let westUmbras = document.querySelectorAll(".west");
    let eastUmbras = document.querySelectorAll(".east");

    for(let i = 0; i < resolution; i++){
        
        // The latitude of this slice of the Earth's shadow.
        let latitude = -180 * i / resolution + 90 - 90 / resolution;
        // The time (expressed as a proportion of a day) between solar transit time and sunrise/sunset at this latitude.
        let hourAngle = acos(Math.max(Math.min((sin(-0.833) - sin(latitude) * sin(declinationOfSun)) / (cos(latitude) * cos(declinationOfSun)), 1), -1));
        // Sunrise and sunset times, in degrees.
        let sunrise = solarTransit - hourAngle / 360;
        let sunset = solarTransit + hourAngle / 360;

        // For parts of the Earth that are in permanent seasonal darkness.
        if(hourAngle <= 0.01) {
            westUmbras[i].style.width = "50%";
            eastUmbras[i].style.width = "50%";
        }
        // For parts of the Earth that are in permanent seasonal sunlight.
        else if(hourAngle >= 179.99) {
            westUmbras[i].style.width = "0";
            eastUmbras[i].style.width = "0";
        }
        // For everywhere else.
        else {
            westUmbras[i].style.width = `${100 * sunrise}%`;
            eastUmbras[i].style.width = `${100 - 100 * sunset}%`;
        }

    }

}

let map = document.querySelector(".container");

// Create shadow divs.
for(let i = 0; i < resolution; i++){
    let westUmbra = document.createElement("div");
    westUmbra.classList.add("umbra", "west");
    westUmbra.style.top = `${100 * i / resolution}%`;
    map.append(westUmbra);
    let eastUmbra = document.createElement("div");
    eastUmbra.classList.add("umbra", "east");
    eastUmbra.style.top = `${100 * i / resolution}%`;
    map.append(eastUmbra);
}

// Add city labels.
for(let i = 0; i < Object.keys(cities).length; i++){

    let city = Object.keys(cities)[i];
    let mapImages = document.querySelectorAll(".mapimg");

    for(let j = 0; j < mapImages.length; j++){
        let label = document.createElement("div");
        label.classList.add("label");
        label.innerHTML = city;
        label.style.top = `${100 * ((90 - cities[city][0]) % 180) / 180}%`
        label.style.left = `${100 * ((cities[city][1] < 0 ? 360 : 0) + cities[city][1] % 360) / 360}%`
        mapImages[j].append(label);
    }
}

updateMapPosition();
updateSunriseTimes();

// Map position is updated every second, shadow position is updated every minute.
setInterval(updateMapPosition, 1000);
setInterval(updateSunriseTimes, 60000);