import angular from 'angular';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'; 
import '../css/app.css';


  let app = () => {
    return {
      template: require('./app.html'),
      controller: 'AppCtrl',
      controllerAs: 'app'
    }
  };

  class AppCtrl {
    constructor() {
     //this.url = 'https://github.com/preboot/angular-webpack';
    };

    
  }

  const MODULE_NAME = 'app';

  angular.module(MODULE_NAME,  
    ['ngStorage'])
  .directive('app', app)
  .controller('AppCtrl',['$scope','$localStorage', 'orderByFilter',function($scope, $localStorage,orderBy
   ){
    $scope.NewPost = {};
    $scope.dataBase= []
    $scope.NewPost=$localStorage.$default({
     name:"",
     planet:""
    });
    $scope.dataBase = [
      { id:"1",planet:"mars",name:"jose"},
      { id:"2",planet:"mars",name:"juanito"},
      { id:"3",planet:"mars",name:"sebastian"},
      { id:"4",planet:"mars",name:"carlos"},
    ];
    if( $localStorage.dataBase){
      $scope.dataBase = $localStorage.dataBase ;
    } 
    $scope.Delete = function(post){
      var index = $scope.dataBase.indexOf(post);
      $scope.dataBase.splice(index, 1);
      $localStorage.dataBase =  $scope.dataBase
    };
    $scope.Modify = function(post){
      $scope.beforePost = post; 
      $scope.ShowModify = true;
      $scope.CurrentPost = post;
    }; 
    $scope.sortBy = function(propertyName) {
      $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
          ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
      $scope.dataBase = orderBy( $scope.dataBase, $scope.propertyName, $scope.reverse);
    };
    $scope.ModifyAndSave = function() {
      $scope.CurrentPost = {};
      $scope.ShowModify = false;
    }	
    $scope.cancel = function() {
      $scope.CurrentPost = {};     
      $scope.ShowModify = false;
    }	



    $scope.Add = function(NewPost){
  
      if(NewPost.name === ''|| !NewPost.name ){
        $scope.errorName = true;
        return;
      }else{
        $scope.errorName = false;
      }
     if(NewPost.planet === ''||  !NewPost.planet ){
       $scope.errorPlanet = true;
       return;
     }else{
      $scope.errorPlanet = false;
     }


     let Newdate = {
        "id":$scope.dataBase.length + 1,
        "name":NewPost.name,
        "planet":NewPost.planet,

    }
    $localStorage.dataBase =  $scope.dataBase
      $scope.dataBase.push(Newdate);
      $localStorage.dataBase =  $scope.dataBase
      $scope.NewPost = {};
    };
  }]);
export default MODULE_NAME;