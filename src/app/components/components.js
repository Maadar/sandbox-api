import angular from 'angular';

import gallery from './gallery/gallery';

export default angular
  .module('app.components', [
    gallery.name
  ]);
