 export default class Gallery {

   /**
    * @param {resource} resource
   */

   constructor(resource) {
     "ngInject";
     this.resource = resource;
   }

   $onInit() {
     this.images = [];
     this.galleries = [];

     // gallery creator (tag is set as argument)
     this.createItem("html");
     this.createItem("css");

   }

   addItem(){
     if (!angular.isUndefined(this.tag)) {

       this.error = false;
       this.createItem();

     } else {
       this.error = true;
     }
   }

   createItem(customTagName) {
     let resource = this.resource.getResourceData(customTagName || this.tag);
     this.fetchData(resource, customTagName);
   }

   //fetch data from resource service and adds 4 images to the array
   fetchData(resource, customTagName) {
     resource.then(data => {

       data.photos.photo.forEach(answer => {
         this.images.push(`https://farm${answer.farm}.staticflickr.com/${answer.server}/${answer.id}_${answer.secret}.jpg`);
       });

       this.addGalleryToList(customTagName);
     })
   }

   addGalleryToList(customTagName) {
     this.galleries.push({
       'list': this.images,
       'tagName': this.tag || customTagName
     });
     this.images = [];

     return this.galleries;
   }

   removeItem(index) {
     delete this.galleries[index];

     this.galleries = this.galleries.filter(val => {
       return val !== undefined;
     });
   }

 }
