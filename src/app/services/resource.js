export default class Resource {
  constructor($http) {
  	this._$http = $http;
  }

  getResourceData(tag) {
    let request = {
      url: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=919facbc281058f563108e9f812bc18a&tags=${tag}&tag_mode=&per_page=4&format=json&nojsoncallback=1`,
      method: 'GET'
    };
    return this._$http(request).then(r => r.data);
  }
}
