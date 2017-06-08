import angular from 'angular';

import gallery from './gallery.component';
import resource from '../../services/services';

export default angular
  .module('appGallery', [
    resource.name
  ])
  .component('gallery', gallery);
