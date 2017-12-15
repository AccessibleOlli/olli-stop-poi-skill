const resolveLocation = require('./util/resolve_location');
const yelp = require('./util/yelp');

module.exports = (searchTerm, searchCategory, responseKey, handler, request, response) => {
  if (!request.attributes.location) {
    return;
  }
  const searchOptions = {
    term: searchTerm,
    categories: searchCategory,
    radius: process.env.YELP_SEARCH_RADIUS_METERS,
    sort_by: process.env.YELP_SEARCH_SORT_BY,
    limit: process.env.YELP_SEARCH_LIMIT
  };
  const latLong = resolveLocation(request.attributes.location);
  if (latLong) {
    searchOptions['latitude'] = latLong[0];
    searchOptions['longitude'] = latLong[1];
  }
  else {
    searchOptions['location'] = location;
  }
  yelp.searchBusinesses(searchOptions)
    .then((yelpResponse) => {
      response.card('pois', yelpResponse.data.businesses);
      response.say(handler.t(responseKey)).end();
    })
    .catch((e) => {
    });
}