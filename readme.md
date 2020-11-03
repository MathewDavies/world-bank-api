World Bank API

Note: this is a learning project so rather than a deadpan description of the programme, this will be a description of what I did and what could be improved.

This project is a demonstration of connecting to an API. The World Bank API gives data on all countries across the world without an API key and with unlimited calls. We have limited our purview to South America, only because the input of 180+ IBAN codes into the selection box woule be laborious and add nothing to my learning.

Web page and code structure:

The web page uses 2 API calls to the world bank, one for population data and the other for country data. The population data is passed to a Chart.JS chart which displays it and the country data is displayed above this. Using the longtitude and Latitude data we also created a custom URL to Bing Maps, where the user can click and view the capital city of the country. 

Code flow:

1)The only event is the click event to display the data.
2)This goes to the master function that calls the 2 API functions
3)The selection made by the user informs the URL for the 2 APIs
3)Both APIs make use of the same Async Function to gather the API data 
4)Each API function also creates their part of the display of the website
5)The population API function extracts and formats data and passes it to the chart JS function, which generates the chart
6)As an oddity, the population API function also provides the current population figure that goes in the information box, this is simply due to the other API not providing this data
7)The information API function fills in the dom elements and creates the custom Bing Maps Link using the longitude and latitude

Review of structure:

This API works fine but the functions are a bit messy as they have overlapping responsibilities. It would be better to create a data class and object to store all of the data and use the 2 API calls to populate all this data. Once all data was within this object, we could then display this data using other functions. Chart.js has its own chart object which we could populate with this data and we could also do all the dom element inner text items in at once.

Overall I am pleased with the result however even if the code structure is procedural.


Sources:

Developer Information for the World Bank API:
//https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information

Iban Country Codes:
//https://www.iban.com/country-codes

Bing Custom URL:
//https://docs.microsoft.com/en-us/bingmaps/articles/create-a-custom-map-url

Charts JS Website:
https://www.chartjs.org/





