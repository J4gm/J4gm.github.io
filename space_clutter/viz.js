const INTRO = `
    <h1>Space Clutter</h1>
    <p>In the year 2025, the satellite industry is booming. Powerful rockets carrying dozens of payloads at a time launch all sorts of things into space of mixed usefulness and morality: radio transceivers, environmental monitors, scientific personnel, military spyware, and egotistical billionaires, to name a few. Deep space exploration and human spaceflights still grab headlines, but satellite launches have become routine, mundane, and largely ignored by the general population.</p>
    <p>There is a hidden cost to the satellite boom. To orbit the Earth, you have to gain enough sideways velocity to continuously miss the ground as you plummet downwards. The minimum speed to achieve this is about seven kilometres per second. And the more objects that whip around the planet at this speed, the higher the chance of a catastrophic collision.</p>
    <p>With enough satellites in orbit, a collision like this could cause a chain reaction and create billions of bullet-like fragments, potentially rendering space inaccessible for centuries.</p>
    <p>So how close are we to that point? How many satellites are even in space? It's a surprisingly difficult question to answer.</p>
    <p id="continue-main" class="nav-button">Continue →</p>
`;

const TRIVIA = {
    1957: "By the end of 1957, there were only two; the first two Soviet Sputnik launches, one of which carried Laika the dog. The United States attempted an orbital launch this year, but it failed.",
    1958: "However, the United States quickly caught up. You can hover over individual satellites to see details about them.",
    1959: "The Soviet lunar exploration programme began in 1959, but most of those spacecraft are not shown here because they are not Earth satellites. You may be wondering why the number of Soviet satellites decreased this year; this is because the orbit of low-flying satellites slowly decays over time until they fall back into the atmosphere.",
    1960: "By 1960, space launches were becoming more routine. Japan and China both achieved suborbital spaceflights in this year, but since suborbital craft do not stay in orbit, they are not shown here.",
    1961: "Soviet cosmonaut Yuri Gagarin became the first human in space in 1961 (not shown here as orbit was only maintained for a few hours). But while the Soviet Union dominated the newspaper headlines with impressive milestones, it was the United States who dominated in Earth orbit.",
    1962: "The United States proved the usefulness of space for communication in 1962 by launching Telstar 1, the first satellite to relay television signals. They accidentally destroyed it a few months later during a high altitude nuclear test, also proving the usefulness of space for mass destruction. Meanwhile, Canada and the United Kingdom became the third and fourth countries to place satellites in orbit, albeit using American rockets launched from American soil.",
    1963: "In 1963 the United States attempted to artificially strengthen the ionosphere for improving radio communications. To do this, they launched 480 million microscopic copper needles into orbit to much protest from scientists and other countries. Only large payloads are shown on this page; otherwise there would now be half a billion blue dots on screen. Luckily, the experiment failed and most of the needles decayed and fell back to Earth.",
    1964: "1964 saw the Soviet Union achieve the first multi-person orbital mission, and also the first spacewalk. Meanwhile, the United States was mostly focused on the Gemini programme, which would later meet similar milestones.",
    1965: "In 1965, France became the third country to achieve orbit with a domestic rocket, launching from the former French colony of Algeria. Due to the rotation of the Earth and safety concerns, the best way to launch satellites is eastwards over a large uninhabited area near the equator. There are no such locations in Europe, so French colonies, especially Guyana in South America, would later prove vital to European space activity, contributing to the perpetuation of colonialism in these regions.",
    1966: "The US Gemini programme reached its peak in 1966, achieving the first in-flight docking of two spacecraft. Japan attempted two domestic satellite launches, but both attempts failed.",
    1967: "In 1967, the Outer Space Treaty was signed. Partially due to the disastrous consequences of high-altitude nuclear tests, this treaty sought to demilitarise Earth's orbit, and was largely successful. This year would hold the record for most orbital launches for a very long time, not being surpassed until the 2020s, although most of these craft did not remain in orbit for long.",
    1968: "1968 saw the first human flyby of the Moon by the US Apollo 8 mission, though they were not the first Earthlings to visit the moon as they were beaten there by two tortoises aboard the Soviet Zond 5 mission.",
    1969: "The most famous event in space history is indisputably the crewed landing of Apollo 11 on the Moon in 1969. It also saw Soviet setbacks in their own lunar programme. Many view this as the end of the Cold War's space race. But behind the scenes, Earth's orbit remained an area of fierce competition.",
    1970: "Japan and China both achieved independent orbital launches in 1970, becoming the fourth and fifth countries to do so after the Soviet Union, the United States, and France. Competition between these two countries was largely dwarfed by the larger US-Soviet space race, but both would develop their own extensive space programmes.",
    1971: "In 1971 the Soviet Union launched the first space station, opening a new chapter in Earth's orbit. The Soyuz 11 mission to the station ended in tragedy when a malfunction caused its crew to be killed on re-entry. To date, these are the only human deaths in space. Also this year, the United Kingdom became the sixth country with independent launch capability, but they only ever launched a single satellite.",
    1972: "By 1972, it was clear that the main roadblock to reducing the cost of satellite launches was a lack of reusable launch systems. The United States began developing the Space Shuttle in an attempt to address this.",
    1973: "With the conclusion of the Apollo missions, the United States space programme slowed down significantly. The Soviet Union, on the other hand, began to gain the upper hand in number of orbital launches, and by 1973 they had nearly the same number of spacecraft in orbit as the United States. The US launched their first space station this year.",
    1974: "The space programme continued to slow, with the total number of satellites in orbit decreasing while Japan, China, and Europe made steady progress on their own launch capabilities.",
    1975: "In 1975, a joint Soviet-United States mission to dock an Apollo spacecraft to a Soyuz spacecraft led to the development of an international standard for docking ports, which was later vital to the creation of large modular space stations. Hoping to compete on the international stage, the European Space Agency was founded this year.",
    1976: "An increase in international cooperation in space, and the development of Europe's space infrastructure, led to more countries deploying their own satellites during the 70s.",
    1977: "The Wikipedia pages for the 1970s are lacking in detail, and there were far more launches than represented here.",
    1978: "The first satellite of the Global Positioning System (GPS) was launched in 1978.",
    1979: "In 1979, the European Space Agency launched their first Ariane rocket, bringing European launch capabilities in line with the major spacefaring nations. It is launched from French Guyana.",
    1980: "By 1980, the Soviet Union had more satellites in orbit than the United States. India successfully launched a satellite aboard their own rocket.",
    1981: "1981 saw the first orbital flight of the United States' Space Shuttle. By coincidence, a technical problem caused the launch to take place on the 20th anniversary of Yuri Gagarin's flight.",
    1982: "A communications satellite launched in 1982 was the first commercial mission of the Space Shuttle programme. Commercial communications satellites would become a driving force of the satellite launch industry.",
    1983: "In 1983 a Space Shuttle mission launched the first American woman into space, twenty years after the Soviet Union.",
    1984: "The Space Shuttle made possible a variety of retrieval and repair missions that weren't possible beforehand, including the recovery of broken satellites for refurbishment, and the in-orbit repair of others.",
    1985: "1985 saw the first member of a royal family to fly in space, as well as the first US member of congress.",
    1986: "In 1986, Space Shuttle Challenger disintegrated during launch, which was a major setback to the programme. Meanwhile, the Soviet space station programme continued to gain momentum with the launch of Mir, the first modular space station.",
    1987: "1987 saw the first spaceflight to launch with two cosmonauts and return with an extra one, picked up from the Mir space station.",
    1988: "The Space Shuttle returned to service in 1988. The Soviet Union conducted the first test flight of their own shuttle, called Buran, but it was never launched to orbit.",
    1989: "The European Space Agency was becoming a leading provider of launch services from the late 80s, and was attempting to develop its own reusable crewed spaceplane called Hermes, but this never came to fruition.",
    1990: "1990 saw the deployment of the famous Hubble Space Telescope during a shuttle mission.",
    1991: "The collapse of the Soviet Union had a massive impact on the politics of space. Russia retained the lead in number of satellites for a while, but with the end of the Cold War, the number of space launches declined in the 1990s.",
    1992: "China launched its crewed space programme in 1992. Russia continued the Soviet space station programme.",
    1993: "1993 saw the Hubble repair mission, where the Hubble telescope was serviced in-orbit by a Shuttle crew.",
    1994: "In 1994 Valeri Polyakov began his 437 day stay aboard Space Station Mir, which to date is the longest spaceflight in history.",
    1995: "A lowering of Cold War tensions led to the Shuttle-Mir programme, which began in 1995, where American Space Shuttles visited the Soviet space station Mir. This programme was a precursor to the later development of the International Space Station.",
    1996: "The construction of Mir was completed in 1996.",
    1997: "In 1997, a Progress spacecraft collided with Space Station Mir during docking, causing serious damage to the station and depressurising one of its modules.",
    1998: "1998 saw the launch of the Russian spacecraft Zarya, which would become the first module of the International Space Station. A Space Shuttle mission later in the year delivered Unity, the first American module of the station. The ISS would soon become the largest space station in history.",
    1999: "Several Shuttle missions during the 1990s continued to show warning signs. The Chandra X-ray observatory, launched in 1999, ended up in a lower orbit than expected due to problems with the Shuttle.",
    2000: "In the year 2000, the International Space Station became operational with its first long-term crew. Since then, it has been continuously inhabited.",
    2001: "Space Station Mir was de-orbited in 2001, as Russia committed to collaborating with the United States on the International Space Station instead. It was the largest spacecraft ever to be de-orbited.",
    2002: "SpaceX was founded in 2002 with the goal of decreasing the cost of access to space. They would play a pivotal role in the following decades of spaceflight.",
    2003: "In 2003, Space Shuttle Columbia disintegrated during re-entry, marking the second loss of a Space Shuttle crew, and leading to the retirement of the Shuttle programme a few years later. Meanwhile, China achieved its first human spaceflight.",
    2004: "2004 saw the first privately funded spaceflight, though it was only a suborbital flight.",
    2005: "Not wanting to lose its human spaceflight capabilities, the United States began seeking alternatives to the unsafe Shuttle. It began developing the Orion spacecraft, which was never finished.",
    2006: "The growth of China's space programme saw it become a competitor to the United States, Europe, and Russia.",
    2007: "By 2007, the Russian space programme had declined to the point that the United States re-took a tenuous lead in the number of satellites.",
    2008: "SpaceX achieved its first orbital flight in 2008.",
    2009: "In 2009, Iran achieved its first orbital flight, and the permanent crew of the International Space Station was increased from three to six.",
    2010: "SpaceX achieved the first flight of the Falcon 9 rocket in 2010, which quickly became the most affordable orbital rocket on the global market.",
    2011: "The Space Shuttle performed its final flight in 2011, leaving the United States without the capacity to launch crewed missions into space. With the Orion spacecraft a long way from launching, the American government had invested heavily into the crewed programmes of private companies, including SpaceX and Boeing. China also launched its first space station this year.",
    2012: "The SpaceX Dragon spacecraft docked with the ISS carrying cargo, becoming the first private spacecraft to reach the station.",
    2013: "The Orbital Science Cygnus spacecraft followed up on SpaceX's achievement of the previous year.",
    2014: "In 2014, NASA tested the Orion spacecraft without a crew. The first crewed flight of the craft has not yet occurred, as of 2025.",
    2015: "In 2015, SpaceX achieved the first soft landing and re-use of an orbital first stage rocket, dramatically reducing the cost of launching spacecraft.",
    2016: "China's space programme continued to expand, as they launched their second space station, and SpaceX achieved a booster recovery at sea, allowing Falcon rockets to launch payloads into high orbits and still recover their boosters.",
    2017: "2017 saw the launch of a record 466 satellites, of which 289 weighed less than ten kilograms, marking a shift towards smaller more numerous satellites.",
    2018: "For the first time since 1990, more than 100 orbital launches were conducted in 2018.",
    2019: "SpaceX began launching its Starlink constellation of communications satellites in 2019. Since then, over seven thousand have been launched. The increase in the number of American satellites since last year is already very visible as a result.",
    2020: "In 2020, SpaceX launched a crewed Dragon 2 spacecraft to the International Space Station, providing human spaceflight capabilities to the American government for the first time since the retirement of the Shuttle in 2011.",
    2021: "Unlike many other industries, the satellite industry was largely unaffected by the coronavirus pandemic. 2021 continued the streak for record-breaking numbers of launches and satellites.",
    2022: "In 2022, the United States conducted more launches than China for the first time since 2017, mostly due to the rapid success of the SpaceX Falcon 9.",
    2023: "In 2023, the record for most humans in space at one time became twenty, with six people on a suborbital Virgin Galactic spaceplane, three aboard the Chinese Tiangong space station, and eleven aboard the International Space Station.",
    2024: "2024 continued the trend of year-on-year record-breaking numbers of both launches and satellites.",
    2025: "We are only halfway through 2025, but it already looks set to break the record for number of launches in a year.",
}

document.addEventListener("DOMContentLoaded", () => {

    // Load the data then render it.
    fetch("scraper/launches.json").then(response => {
        response.json().then(data => {

            document.getElementById("intro").innerHTML = INTRO;

            // Button listeners.
            document.getElementById("prev").addEventListener("click", () => changeYear(data, -1));
            document.getElementById("next").addEventListener("click", () => changeYear(data, 1));

            let summaryMode = 0;

            // Resize listener.
            window.addEventListener("resize", () => {
                // Only render the chart if it's on the correct page.
                if (document.getElementById("button-main").classList.contains("current-page")) {
                    renderChart(data, parseInt(document.getElementById("year").innerText));
                }
                if (document.getElementById("button-summary").classList.contains("current-page")) {
                    renderSummaryChart(data, summaryMode);
                }
            });

            // Listeners for navbar.
            document.getElementById("button-intro").addEventListener("click", navigateToIntro);
            document.getElementById("button-main").addEventListener("click", () => navigateToMain(data));
            document.getElementById("continue-main").addEventListener("click", () => navigateToMain(data));
            document.getElementById("button-summary").addEventListener("click", () => navigateToSummary(data, summaryMode));
            document.getElementById("continue-summary").addEventListener("click", () => navigateToSummary(data, summaryMode));

            // Listeners for summary navbar.
            document.getElementById("button-countries").addEventListener("click", () => {
                document.getElementById("button-countries").classList.add("current-page");
                document.getElementById("button-decades").classList.remove("current-page");
                document.getElementById("button-us").classList.remove("current-page");
                document.getElementById("button-constellations").classList.remove("current-page");
                document.getElementById("countries-info").style.display = "block";
                document.getElementById("decades-info").style.display = "none";
                document.getElementById("us-info").style.display = "none";
                document.getElementById("constellations-info").style.display = "none";
                summaryMode = 0;
                renderSummaryChart(data, summaryMode);
            });
            document.getElementById("button-decades").addEventListener("click", () => {
                document.getElementById("button-countries").classList.remove("current-page");
                document.getElementById("button-decades").classList.add("current-page");
                document.getElementById("button-us").classList.remove("current-page");
                document.getElementById("button-constellations").classList.remove("current-page");
                document.getElementById("countries-info").style.display = "none";
                document.getElementById("decades-info").style.display = "block";
                document.getElementById("us-info").style.display = "none";
                document.getElementById("constellations-info").style.display = "none";
                summaryMode = 3;
                renderSummaryChart(data, summaryMode);
            });
            document.getElementById("button-us").addEventListener("click", () => {
                document.getElementById("button-countries").classList.remove("current-page");
                document.getElementById("button-decades").classList.remove("current-page");
                document.getElementById("button-us").classList.add("current-page");
                document.getElementById("button-constellations").classList.remove("current-page");
                document.getElementById("countries-info").style.display = "none";
                document.getElementById("decades-info").style.display = "none";
                document.getElementById("us-info").style.display = "block";
                document.getElementById("constellations-info").style.display = "none";
                summaryMode = 1;
                renderSummaryChart(data, summaryMode);
            });
            document.getElementById("button-constellations").addEventListener("click", () => {
                document.getElementById("button-countries").classList.remove("current-page");
                document.getElementById("button-decades").classList.remove("current-page");
                document.getElementById("button-us").classList.remove("current-page");
                document.getElementById("button-constellations").classList.add("current-page");
                document.getElementById("countries-info").style.display = "none";
                document.getElementById("decades-info").style.display = "none";
                document.getElementById("us-info").style.display = "none";
                document.getElementById("constellations-info").style.display = "block";
                summaryMode = 2;
                renderSummaryChart(data, summaryMode);
            });
        });
    });

});

function renderChart(data, year) {
    
    // Get width and height of the viewport.
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Listeners for info icon.
    document.getElementById("trivia").addEventListener("mouseover", e => {
        let tooltip = document.getElementById("tooltip");
        // Position tooltip
        positionTooltip(tooltip, width, height, e.clientX, e.clientY);
        // Add info to tooltip.
        tooltip.innerHTML = Object.keys(TRIVIA).includes(year.toString()) ? TRIVIA[year.toString()] : "Error";
        // Unhide tooltip.
        tooltip.style.display = "block";
    });
    document.getElementById("trivia").addEventListener("mousemove", e => positionTooltip(document.getElementById("tooltip"), width, height, e.clientX, e.clientY));
    document.getElementById("trivia").addEventListener("mouseout", () => {
        document.getElementById("tooltip").style.display = "none";
    });

    // Clear svg if it already exists.
    d3.selectAll("svg").remove();

    // Add new svg to the container div.
    const svg = d3.select("#container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Add the earth at the bottom of the screen.
    let earthSize = height * 12;
    svg.append("circle")
        .attr("fill", "darkslateblue")
        .attr("r", earthSize)
        .attr("cx", width / 2)
        .attr("cy", height * 11 / 12 + earthSize);

    // A group to hold the chart.
    const parliamentChart = svg.append("g");

    let payloads = [];
    for (let i = 0; i < data.length; i++) {
        // Check the launch year is before the current year.
        let launchYear = parseInt(data[i][0].split(" ")[2]);
        if (launchYear <= year) {
            for (let j = 0; j < data[i][8].length; j++) {
                let payload = data[i][8][j];
                // Add the launch date to the payload data so it can be used in the viz.
                payload.push(data[i][0]);
                payload.push(data[i][5]);
                payload.push(data[i][4]);
                let decay = payload[5].split(" ");
                // Check the decay year is after the current year.
                if (decay.length > 2) {
                    let decayYear = parseInt(decay[2]);
                    if (decayYear >= year) {
                        payloads.push(payload);
                    }
                } else {
                    payloads.push(payload);
                }
            }
        }
    }

    // Organise the payloads by colour based on their country.
    let colours = {};
    payloads.forEach(payload => {
        let colour = colourFromCountry(payload[0]);
        if (!Object.keys(colours).includes(colour)) {
            colours[colour] = [payload];
        } else {
            colours[colour].push(payload);
        }
    });

    // Create a list of the colours and sort it by which has the most payloads in orbit.
    const sortedColours = Object.keys(colours).toSorted((a, b) => colours[b].length - colours[a].length);
    // Grey, representing misc countries, should come at the end even if it is not the smallest colour.
    if (sortedColours.includes("grey")) {
        sortedColours.splice(sortedColours.indexOf("grey"), 1);
        sortedColours.push("grey");
    }

    // Size and position of the chart generated dynamically based on window size.
    const scaleFactor = width - height;
    const dotRadius = Math.min(Math.min(width / 5, height / 2.5) / Math.sqrt(payloads.length), 10); // Size of individual dots, which also defines the row and column size.
    const origin = {"x": width / 2, "y": Math.min(scaleFactor * 2 / 3 + height * 3 / 4, height * 3 / 2)}; // Polar centre of the chart.
    const baseDistance = Math.max(Math.min(scaleFactor, height), 100); // Radius of the circle of negative space at the centre of the chart.
    const fitAdjustment = Math.sqrt(payloads.length) / Math.PI; // Magically makes the blocs all the same height... lost track of the maths that got me here.

    // Min angle starts slightly less than expected to account for angle wasted on incomplete top rows of blocs.
    let minAngle = Math.PI / 4 - sortedColours.length * (fitAdjustment / payloads.length) / 2; // Radians.

    // Draw each bloc.
    sortedColours.forEach(colour => {
        // Defines the bounds of the bloc.
        let maxAngle = minAngle + (Math.PI / 2) * (colours[colour].length + fitAdjustment) / payloads.length; // Radians.
        parliamentChart.append("g")
            .selectAll("circle")
            .data(colours[colour])
            .join("circle")
            .attr("fill", colour)
            .attr("r", dotRadius)
            // Get the coords of each point.
            .attr("cx", (d, i) => polarToX(getPolarCoords(i, colours[colour].length, baseDistance, minAngle, maxAngle, dotRadius), origin))
            .attr("cy", (d, i) => polarToY(getPolarCoords(i, colours[colour].length, baseDistance, minAngle, maxAngle, dotRadius), origin))
            .on("mouseover", (e, d) => mouseoverTooltip(e, d, width, height))
            // Reposition the tooltip without regenerating the content; mouseover has already done that.
            .on("mousemove", e => positionTooltip(document.getElementById("tooltip"), width, height, e.clientX, e.clientY))
            .on("mouseout", e => mouseoutTooltip(e, colour));
        // Draw the text labels for the blocs.
        let textCoords = {"r": -20 - getPolarCoords(colours[colour].length, colours[colour].length, baseDistance, minAngle, maxAngle, dotRadius).r, "a": (minAngle + maxAngle) / 2};
        let textX = polarToX(textCoords, origin);
        let textY = polarToY(textCoords, origin);
        // The text should be rendered vertically (normal to the chart) if there is less than 150px of space.
        let textHorizontal = -textCoords.r * (maxAngle - minAngle) > 150;
        parliamentChart.append("text")
            .html(labelFromColour(colour, year))
            .attr("text-anchor", textHorizontal ? "middle" : (textX < width / 2 ? "end" : "start"))
            .attr("x", textX)
            .attr("y", textY)
            // CSS rad unit doesn't work here for some reason, had to convert to degrees for the transform rotate.
            .attr("transform", `rotate(${360 * textCoords.a / (2 * Math.PI) + (textHorizontal ? -90 : (textX < width / 2 ? 0 : 180))}, ${textX}, ${textY})`)
            .attr("fill", colour);
        // Reset for next bloc.
        minAngle = maxAngle;
    });

}

function renderSummaryChart(data, mode) {

    // Get width and height of the viewport.
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Clear svg if it already exists.
    d3.selectAll("svg").remove();

    // Add new svg to the container div.
    const svg = d3.select("#summary-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // A group to hold the chart.
    const parliamentChart = svg.append("g");

    // Extract payloads from data.
    let payloads = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i][8].length; j++) {
            let payload = data[i][8][j];
            // Add the launch date to the payload data so it can be used in the viz.
            payload.push(data[i][0]);
            payload.push(data[i][5]);
            payload.push(data[i][4]);
            payloads.push(payload);
        }
    }

    // Calculate percentages for the summary info.
    let totalUnitedStates = 0;
    let totalConstellations = 0;
    let total2020s = 0;
    for (let i = 0; i < payloads.length; i++) {
        if (payloads[i][0] == "United States") {
            totalUnitedStates += 1;
        }
        if (payloads[i][1].includes("×")) {
            totalConstellations += 1;
        }
        if (payloads[i][7].includes("202")) {
            total2020s += 1;
        }
    }
    document.getElementById("us-percentage").innerHTML = Math.round(100 * totalUnitedStates / payloads.length);
    document.getElementById("constellations-percentage").innerHTML = Math.round(100 * totalConstellations / payloads.length);
    document.getElementById("2020s-percentage").innerHTML = Math.round(100 * total2020s / payloads.length);

    // Calculate chart size.
    let area = width * 0.75 * height * 0.5;
    let dotRadius = Math.sqrt(area / payloads.length) / 2;
    let columns = Math.floor(width * 0.75 / (dotRadius * 2));

    // Render chart.
    parliamentChart.append("g")
        .selectAll("circle")
        .data(payloads)
        .join("circle")
        .attr("fill", d => colourFromMode(d, mode))
        .attr("r", dotRadius)
        .attr("cx", (d, i) => 0.125 * width + (i % columns) * dotRadius * 2)
        .attr("cy", (d, i) => 0.1 * height + Math.floor(i / columns) * dotRadius * 2)
        .on("mouseover", (e, d) => mouseoverTooltip(e, d, width, height))
        // Reposition the tooltip without regenerating the content; mouseover has already done that.
        .on("mousemove", e => positionTooltip(document.getElementById("tooltip"), width, height, e.clientX, e.clientY))
        .on("mouseout", (e, d) => mouseoutTooltip(e, colourFromMode(d, mode)));

}

function colourFromMode(d, mode) {
    if (mode == 0) {
        return colourFromCountry(d[0]);
    } else if (mode == 1 && d[0] == "United States") {
        return colourFromCountry(d[0]);
    } else if (mode == 2 && d[1].includes("×")) {
        return "red";
    } else if (mode == 3) {
        if (d[7].includes("195")) {
            return "red";
        } else if (d[7].includes("196")) {
            return "orange";
        } else if (d[7].includes("197")) {
            return "yellow";
        } else if (d[7].includes("198")) {
            return "green";
        } else if (d[7].includes("199")) {
            return "cyan";
        } else if (d[7].includes("200")) {
            return "blue";
        } else if (d[7].includes("201")) {
            return "magenta";
        } else if (d[7].includes("202")) {
            return "white";
        }
    }
    return "#222222";
}

function mouseoverTooltip(e, d, width, height) {
    // Highlight the hovered dot.
    d3.select(e.target).attr("fill", "lime");
    // Position the tooltip.
    let tooltip = document.getElementById("tooltip");
    positionTooltip(tooltip, width, height, e.clientX, e.clientY);
    // Add info to tooltip.
    tooltip.innerHTML = `
        <strong>${d[1]}</strong><br>
        ${d[2] != "" ? d[2] + ", " : ""}${d[0]}<br>
        Launched ${d[7]} from ${d[8]}, ${d[9]}<br>
        ${d[5] == "In orbit" ? "Still in orbit" : "Decayed " + d[5]}<br>
        Purpose: ${d[4]}<br>
        ${d[6]}
    `;
    // Unhide tooltip.
    tooltip.style.display = "block";
}

function mouseoutTooltip(e, colour) {
    // Remove dot highlight.
    d3.select(e.target).attr("fill", colour);
    // Hide tooltip.
    document.getElementById("tooltip").style.display = "none";
}

function changeYear(data, amount) {
    let year = parseInt(document.getElementById("year").innerText) + amount;
    // Year must remain between 1957 and 2025.
    year = Math.min(Math.max(1957, year), 2025);
    document.getElementById("year").innerText = year;
    let cont = document.getElementById("continue-summary");
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    // Hide the arrows if the year is at its minimum or maximum.
    if (year == 1957) {
        prev.style.display = "none";
    } else {
        prev.style.display = "inline";
    }
    if (year == 2025) {
        next.style.display = "none";
        cont.style.display = "block";
    } else {
        next.style.display = "inline";
        cont.style.display = "none";
    }
    renderChart(data, year);
}

// Get the bloc that a payload should be assigned to, from its country.
function colourFromCountry(country) {
    switch(country) {
        case "United States":
            return "deepskyblue";
        case "Russia":
            return "yellow";
        case "China":
            return "red";
        // European countries get bundled together.
        case "United Kingdom":
        case "France":
        case "Germany":
        case "Italy":
        case "European Union":
        case "European Space Agency":
        case "Luxembourg": // The EU's fourth largest spacefaring country, for tax purposes.
        case "Spain":
        case "Finland":
        case "Turkey":
        case "Switzerland":
        case "Sweden":
        case "Netherlands":
        case "Norway":
        case "Ukraine":
        case "Poland":
        case "Denmark":
        case "Jersey":
        case "Belgium":
        case "Czech Republic":
        case "Lithuania":
        case "Hungary":
        case "Bulgaria":
        case "Greece":
        case "Slovakia":
        case "Austria":
        case "Belarus":
        case "Estonia":
        case "Romania":
        case "Portugal":
        case "Albania":
        case "Slovenia":
        case "Monaco":
        case "Isle of Man":
        case "Croatia":
        case "Republic of Ireland":
        case "Vatican City": // popemobile got an upgrade
        case "Moldova":
        case "Latvia":
        case "Czechoslovakia":
            return "blue";
        case "Japan":
            return "white";
        default:
            return "grey";
    }
}

function labelFromColour(colour, year) {
    switch(colour) {
        case "deepskyblue":
            return "United States";
        case "yellow":
            return year < 1991 ? "Soviet Union" : "Russia";
        case "red":
            return "China";
        case "blue":
            return "Europe";
        case "white":
            return "Japan";
        case "grey":
            return "Others";
        default:
            return "Error";
    }
}

// Get the polar coordinates of a dot.
function getPolarCoords(index, total, baseDistance, minAngle, maxAngle, dotRadius) {
    let currentMax = -1
    let itemsInCurrentRow = 0;
    // Figure out which row this dot should be in (baseDistance) and its position in the row (currentMax - index).
    while (currentMax < index) {
        // Find number of dots that will fit in the current row by dividing the arc length by the column width.
        itemsInCurrentRow = Math.floor(baseDistance * (maxAngle - minAngle) / (dotRadius * 2));
        currentMax += itemsInCurrentRow;
        baseDistance += dotRadius * 2;
    }
    // If this is the final row then centre the row. Otherwise start it from minAngle as usual.
    let centreAdjustment = currentMax > total ? -(maxAngle - minAngle) * (currentMax - total) / (2 * itemsInCurrentRow) : 0;
    return {
        "r": baseDistance - dotRadius * 2,
        "a": Math.PI + minAngle + centreAdjustment + (maxAngle - minAngle) * (currentMax - index) / itemsInCurrentRow
    };
}

// Polar to Cartesian functions.
function polarToX(polarCoords, origin) {
    return origin.x + polarCoords.r * Math.cos(polarCoords.a);
}
function polarToY(polarCoords, origin) {
    return origin.y + polarCoords.r * Math.sin(polarCoords.a);
}

// Positions the hover tooltip.
function positionTooltip(tooltip, width, height, x, y) {
    // Position the tooltip to the left of the mouse when on the right of the screen, and vice versa, preventing overflow.
    // The 19 pixel offset is to prevent the tooltip from flicking from side to side while hovering over the trivia button.
    if (x < width / 2 + 19) {
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.right = "auto";
    } else {
        tooltip.style.right = `${width - x + 10}px`;
        tooltip.style.left = "auto";
    }
    // Ditto for vertical position.
    if (y < height / 2) {
        tooltip.style.top = `${y + 10}px`;
        tooltip.style.bottom = "auto";
    } else {
        tooltip.style.bottom = `${height - y + 10}px`;
        tooltip.style.top = "auto";
    }
}

// Promise object for cancelling page hiding.
let timeout;

// Functions for navigating between pages.
function navigateToIntro() {
    // Cancel page hiding to prevent the new page from disappearing if the user clicks a second nav button before the animation completes.
    clearTimeout(timeout);
    document.getElementById("intro-page").style.display = "block";
    // One millisecond delay so that the page doesn't skip its animation.
    setTimeout(() => {
        // Begin page animations.
        document.getElementById("intro-page").classList.remove("be-gone");
        document.getElementById("main-page").classList.add("be-gone");
        document.getElementById("summary-page").classList.add("be-gone");
        // Style navbar.
        document.getElementById("button-intro").classList.add("current-page");
        document.getElementById("button-main").classList.remove("current-page");
        document.getElementById("button-summary").classList.remove("current-page");
    }, 1);
    // Hide the pages that have gone off-screen after one second.
    timeout = setTimeout(() => {
        // Remove the chart so it doesn't show up if the page is resized on the intro page.
        d3.selectAll("svg").remove();
        document.getElementById("main-page").style.display = "none";
        document.getElementById("summary-page").style.display = "none";
    }, 1000);
}

function navigateToMain(data) {
    clearTimeout(timeout);
    document.getElementById("main-page").style.display = "block";
    renderChart(data, parseInt(document.getElementById("year").innerText));
    setTimeout(() => {
        document.getElementById("intro-page").classList.add("be-gone");
        document.getElementById("main-page").classList.remove("be-gone");
        document.getElementById("summary-page").classList.add("be-gone");
        document.getElementById("button-intro").classList.remove("current-page");
        document.getElementById("button-main").classList.add("current-page");
        document.getElementById("button-summary").classList.remove("current-page");
    }, 1);
    
    timeout = setTimeout(() => {
        document.getElementById("intro-page").style.display = "none";
        document.getElementById("summary-page").style.display = "none";
    }, 1000);
}

function navigateToSummary(data, mode) {
    clearTimeout(timeout);
    document.getElementById("summary-page").style.display = "block";
    renderSummaryChart(data, mode);
    setTimeout(() => {
        document.getElementById("intro-page").classList.add("be-gone");
        document.getElementById("main-page").classList.add("be-gone");
        document.getElementById("summary-page").classList.remove("be-gone");
        document.getElementById("button-intro").classList.remove("current-page");
        document.getElementById("button-main").classList.remove("current-page");
        document.getElementById("button-summary").classList.add("current-page");
    }, 1);
    timeout = setTimeout(() => {
        document.getElementById("intro-page").style.display = "none";
        document.getElementById("main-page").style.display = "none";
    }, 1000);
}