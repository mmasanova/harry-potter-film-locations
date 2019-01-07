# Harry Potter Film Locations

My final Udacity Front End Developer Nanodegree project. The application displays Harry Potter films' locations within UK on a google map and in a listview that can be filtered by movie. Clicking on a marker or listview item displays more information about the location. The information is retrieved from foursquare API.

[Demo](https://mmasanova.github.io/harry-potter-film-locations/)

## How to run

  1. Clone the respository
  
  2. run `npm install`
  
  3. create .env file in the root folder and define your API keys:

    REACT_APP_FOURSQUARE_API_CLIENT_ID={your foursquare client id here}
    REACT_APP_FOURSQUARE_API_CLIENT_SECRET={you foursquare client secret here}
    REACT_APP_GOOGLE_MAPS_API_KEY={your google maps api key here}
  
  4. run `npm start` (for dev) - this will open the application in your default browser
  
     or run `npm run build` and follow instructions printed out
  

## Resources used

[How to Write a Google Maps React Component](https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/)

## Dependencies

[create-react-app](https://www.npmjs.com/package/create-react-app)

[Google Maps API](https://developers.google.com/maps/documentation/)

[Foursquare API](https://developer.foursquare.com/)

[cra-append-sw](https://www.npmjs.com/package/cra-append-sw)
