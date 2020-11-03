//Dom Elements
button = document.getElementById('button');
country = document.getElementById('country');
container = document.getElementById('container');
displayCountry = document.getElementById('country-title');
displayCapital = document.getElementById('capital-city');
displayIncome = document.getElementById('income-level');
displayLongitude = document.getElementById('longitude');
displayLatitude = document.getElementById('latitude');
displayLink = document.getElementById('link');
displayPopulation = document.getElementById('latest-population');
// Helper function to retrieve and return data
async function retrieveData(apiUrl){
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        newData = data[1];
       return newData;

    } catch (error) {
        console.log("error:", error )
    }
}
//Builds chart with chart js with thousand separators - used in populationPerCountry
function buildChart(labelData, inputData){

    let ctx = document.getElementById('myChart').getContext('2d');
    Chart.defaults.global.defaultFontColor = 'rgb(67, 67, 163)';
    Chart.defaults.global.defaultFontFamily = 'Overpass';
    Chart.defaults.global.defaultFontStyle = 'Bold';
    Chart.defaults.global.defaultFontSize = '16';
    let chart = new Chart(ctx, {
        
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: labelData,
            datasets: [{
                label: 'Population',
                backgroundColor: 'rgba(77, 206, 83, 0.4)',
                borderColor: 'rgb(0, 0, 0)',
                
                data: inputData
            }]
        },
        // Configuration options go here
        options: {
            events: ['click'],
            legend: {
                display: false,
            },

            tooltips: {
                mode: 'xy',
                callbacks: {
                      label: function(tooltipItem, data) {
                          var value = data.datasets[0].data[tooltipItem.index];
                          if(parseInt(value) >= 1000){
                                     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                  } else {
                                     return value;
                                  }
                      }
                } // end callbacks:
              }, //end tooltips                
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                    }
                }]
            }
        }
    });
}

async function populationPerCountry(){
    //Take the country value from the drop down box and put it into the API URL
    countryInput = country.value;
    const apiUrl = `http://api.worldbank.org/v2/country/${countryInput}/indicator/SP.POP.TOTL?format=json`;
    //Await response from URL before continuing
    const populationData = await retrieveData(apiUrl);
    populationArray = [];
    yearArray = [];
    for(i=0; i < populationData.length; i++){
        //create the data for the chart
        populationArray.unshift(populationData[i].value);
        //create the label (y axis) for the chart
        yearArray.unshift(populationData[i].date);
        //use Chart Js to build a population chart from the arrays
        buildChart(yearArray, populationArray);
    }

    //If/else statement irons out a bug where the world bank has an entry for 2020 but no population data
    let latestPop = 0;
    if(populationArray[populationArray.length-1] !==null){
        latestPop = populationArray[populationArray.length-1]
    }else{
        latestPop = populationArray[populationArray.length-2]
    }

    //If it's equal or over 1000, put thousand separators on the number
    if(parseInt(latestPop) >= 1000){
        latestPop = latestPop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     } 
     //display the latest population number
    displayPopulation.innerText = latestPop;
}

async function displayCountryData(){
        countryInput = country.value;
        apiUrl =  `http://api.worldbank.org/v2/country/${countryInput}?format=json`;
        const countryData = await retrieveData(apiUrl);
        console.log(countryData);
        const latitude = countryData[0].latitude;
        const longitude = countryData[0].longitude;
        const capitalCity = countryData[0].capitalCity; 
        displayCapital.innerText = capitalCity;
        displayIncome.innerText = countryData[0].incomeLevel.value;
        displayLongitude.innerText = latitude;
        displayLatitude.innerText = longitude;

        const mapLink = `https://bing.com/maps/default.aspx?cp=${latitude}~${longitude}&lvl=8&style=r`;
        displayLink.innerText = capitalCity;
        displayLink.href = mapLink;
}

function displayData(){
    displayCountryData();
    populationPerCountry();
}

//Event Listener
button.addEventListener('click', displayData);

//onload - display default country
displayData();





//https://bing.com/maps/default.aspx?cp=6.80461~-58.1548&lvl=7&style=r

//https://bing.com/maps/default.aspx?cp=latitude~longitude&lvl=7&style=r
