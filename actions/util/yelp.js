const axios = require('axios');

class Yelp {

  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = "https://api.yelp.com/v3/";
  }

  fetch(resource) {
    return axios.get(`${this.apiUrl}${resource}`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
  }

  searchBusinesses(options) {
    var params = '';
    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        params += option + '=' + options[option] + '&';
      }
    }
    console.log(params);
    return this.fetch(`businesses/search?${params}`);
  };
}

module.exports = new Yelp(process.env.YELP_API_KEY);