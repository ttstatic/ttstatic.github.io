(function() {
  "use strict";
  app.controller('addTreeController', function($scope, $http, $rootScope, $location, $routeParams, Upload) {
    var self = this;
    

    $rootScope.imIn = true;
    // Get tree id for edit
    self.Id = $rootScope.$root.Id;
    self.currentDate = new Date();
    self.year = "";
    // Show message when field is missing and text if success
    self.isRequired = false;
    self.isSuccess = true;

    //Set boolean for checking if picture uploaded
    self.isPictureUploaded = false;

    if($rootScope.$root.Id > 0){
      self.addEditTitle = "Edit Bonsai";
      // API load specific tree info
      $http({
        method: 'GET',
        url: MYBONSAI_API_HOST + '/api/getMyTree/'+self.Id,
        headers: {
          'Content-Type': 'application/json'
        }
        }).then(function successCallback(response) {
          // Set values for editing
          self.myTree = response.data.Tree;
          if(self.myTree.length > 0){
            self.species = self.myTree[0].species;
            self.style = self.myTree[0].style;
            self.dateAquired = new Date(self.myTree[0].dateAquired);
            self.year = self.myTree[0].year === 0? "" : self.myTree[0].year;
            // self.size = self.myTree[0].size;
            self.origin = self.myTree[0].origin;
            self.pricePaid = self.myTree[0].pricePaid;
            self.imageUrlLink = self.myTree[0].imageUrl;
            self.comments = self.myTree[0].comments;
            self.potType = self.myTree[0].potType;
            self.potPrice = self.myTree[0].potPrice;
            self.yearsInTraining = self.myTree[0].yearsInTraining;
            self.acquiredFrom = self.myTree[0].acquiredFrom;
            
          }
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("error");
      });
      self.isNew = false;
    }else{
      self.imageUrlLink = "assets/images/logo-invert.png";
      self.addEditTitle = "Add Bonsai";
      self.isNew = true;
    }
    // Show error if year is not valid
    self.checkRequiredField = function(){
      self.isYearRequired = false;
      if(self.year < 1900 && self.year !== ""){
        self.isYearRequired = true;
      }
    };
    // Save update function
    self.saveUpdate = function(){
      var tempUrl = "";
      var fileName = "";
      self.year = self.year === null? "" : self.year;
      if(self.species === "" || self.species === undefined){
        self.isRequired = true;
      }else{
        if(self.isNew && self.file !== undefined){
          self.imageUrlLink = "http://s3-ap-southeast-2.amazonaws.com/mybonsai-upload/";
          fileName = Date.now().toString() + self.file.name;
          tempUrl = self.imageUrlLink + fileName;
          self.isPictureUploaded = true;
        }else{
          tempUrl = self.imageUrlLink;
        }
        // Values to save in DB
        // API call for add
        
        self.uploadFile(function(tempUrlName){
            var params = {
              "userId"            : 1,
              "Id"                : self.Id,
              "species"           : self.species,
              "style"             : self.style,
              "dateAquired"       : self.dateAquired,
              "year"              : self.year,
              "size"              : self.size,
              "imageUrl"          : tempUrlName,
              "origin"            : self.origin,
              "pricePaid"         : self.pricePaid,
              "potType"           : self.potType,
              "potPrice"          : self.potPrice,
              "comments"          : self.comments,
              "acquiredFrom"      : self.acquiredFrom,
              "yearsInTraining"   : self.yearsInTraining
            };
            console.log(tempUrlName);
            $http({
              method: 'POST',
              url: MYBONSAI_API_HOST + '/api/saveUpdateTree',
              data: params,
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function successCallback(response) {
                // call upload function when tree info successfully save
                // Default picture will be use if no picture to upload
                $location.path('/trees');
                if(self.isNew){
                  $rootScope.isAdd = true;
                }else{
                  $rootScope.isEdit = true;
                }
                // self.isSuccess = false;
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("error");
              });
          });              
        

        
      }
    };

    // Funtion for uploading file
    self.uploadFile = function (callback) {
            if(self.isPictureUploaded){
              Upload.upload({
                  url: MYBONSAI_API_HOST + '/api/uploadPicture', //webAPI exposed to upload the file
                  data:{ 
                    file:self.file
                } //pass file as data, should be user ng-model
              }).then(function (resp) { //upload function returns a promise
                  console.log(resp);
                  if(resp.data.success){ //validate success
                      console.log('Success ' + resp.data.filePath + 'uploaded. Response: ');
                      callback(resp.data.filePath);
                  } else {
                      console.log('an error occured');
                  }
              }, function (resp) { //catch error
                  console.log('Error status: ' + resp.status);
                  console.log('Error status: ' + resp.status);
              }, function (evt) { 
                  console.log(evt);
                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                  console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                  // vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
              });
            } else {
              callback(self.imageUrlLink);
            }
            
        };

    // End of upload function

  });
})();
