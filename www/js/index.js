/*

START SERVER
python -m SimpleHTTPServer 8080
use Ripple  Chrome plugin


 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         // var parentElement = document.getElementById(id);
//         // var listeningElement = parentElement.querySelector('.listening');
//         // var receivedElement = parentElement.querySelector('.received');

//         // listeningElement.setAttribute('style', 'display:none;');
//         // receivedElement.setAttribute('style', 'display:block;');

//         // console.log('Received Event: ' + id);
//     }
// };

// app.initialize();


// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('MobileAngularUiExamples', [
  'ngRoute',
  'mobile-angular-ui',
  
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and 
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like 
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
  all: '*',
  user: 'user',
  guest: 'guest'
});

app.service('Session', function () {
  this.create = function (sessionId, userId, userRole, userToken) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
    this.userToken = userToken;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
    this.userToken = null;
  };
});

app.factory('AuthService', function ($http, Session) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id, res.data.user.role, res.data.user.token);
        return res.data.user;
      });
  };
 
  // authService.isAuthenticated = function () {
  //   return !!Session.userId;
  // };
 
  // authService.isAuthorized = function (authorizedRoles) {
  //   if (!angular.isArray(authorizedRoles)) {
  //     authorizedRoles = [authorizedRoles];
  //   }
  //   return (authService.isAuthenticated() &&
  //     authorizedRoles.indexOf(Session.userRole) !== -1);
  // };
 
  return authService;
});

// app.factory('NetworkService', function ($http, Session) {
//   var networkService = {};
 
//   networkService.dealsList = function (time) {
//     return [{'id':1}];
//   };
 
//   networkService.currencysList = function () {
//     return [{'id':1}];
//   };
 
//   networkService.messagesList = function (time) {
//     return [{'id':1}];
//   };

//   networkService.newDeal = function (time) {
//     return [{'id':1}];
//   };
 
//   return networkService;
// });

// app.factory('Book', ['$http', function($http) {  
//      function Book(bookData) {  
//           if (bookData) {  
//                this.setData(bookData):  
//           }  
//           //что-то, что еще нужно для инициализации книги
//      };       
//      Book.prototype = {  
//           setData: function(bookData) {  
//                angular.extend(this, bookData);  
//           },  
//           load: function(id) {  
//                var scope = this;  
//                $http.get('ourserver/books/' + bookId).success(function(bookData) {  
//                     scope.setData(bookData);  
//                });  
//           },  
//           delete: function() {  
//                $http.delete('ourserver/books/' + bookId);  
//           },  
//           update: function() {  
//                $http.put('ourserver/books/' + bookId, this);  
//           },  
//           getImageUrl: function(width, height) {  
//                return 'our/image/service/' + this.book.id + '/width/height';  
//           },  
//           isAvailable: function() {  
//                if (!this.book.stores || this.book.stores.length === 0) {  
//                     return false;  
//                }  
//                return this.book.stores.some(function(store) {  
//                     return store.quantity > 0;  
//                });  
//           }  
//      };  
//      return Book; 
// }]);

// app.factory('booksManager', ['$http', '$q', 'Book', function($http, $q, Book) {  
//      var booksManager = {  
//           _pool: {}, 
//            _retrieveInstance: function(bookId, bookData) {  
//                var instance = this._pool[bookId];   
//                if (instance) {  
//                     instance.setData(bookData);  
//                } else {  
//                     instance = new Book(bookData);  
//                     this._pool[bookId] = instance;  
//                }   
//                return instance;  
//           },  
//           _search: function(bookId) {  
//                return this._pool[bookId];  
//           },       
//           _load: function(bookId, deferred) {  
//                var scope = this;  
//                $http.get('ourserver/books/' + bookId)  
//                     .success(function(bookData) {  
//                          var book = scope._retrieveInstance(bookData.id, bookData);  
//                          deferred.resolve(book);  
//                     })  
//                     .error(function() {  
//                          deferred.reject();  
//                     });  }, 
//           /*Публичные методы*/ 
//           /* Получение книги по идентификатору*/  
//           getBook: function(bookId) {  
//                var deferred = $q.defer();  
//                var book = this._search(bookId);  
//                if (book) {  
//                     deferred.resolve(book);  
//                } else {  
//                     this._load(bookId, deferred);  
//                }  return deferred.promise;  
//           },  
//           /* Получение списка книг */  
//           loadAllBooks: function() {  
//                var deferred = $q.defer();  
//                var scope = this;  
//                $http.get('ourserver/books')  
//                     .success(function(booksArray) {  
//                          var books = [];  
//                          booksArray.forEach(function(bookData) {  
//                               var book = scope._retrieveInstance(bookData.id, bookData);  
//                               books.push(book);  
//                          });   
//                          deferred.resolve(books);  
//                     })  
//                     .error(function() {  
//                          deferred.reject();  
//                     });  
//                     return deferred.promise;  
//                },  
//           /* Редактирование книги*/  
//           setBook: function(bookData) {  
//                var scope = this;  
//                var book = this._search(bookData.id);  
//                if (book) {  
//                     book.setData(bookData);  
//                } else {  
//                     book = scope._retrieveInstance(bookData);  
//                }  return book;  
//           },   
//      };  
//      return booksManager; 
// }]);


// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'home.html', controller: 'HomeController', reloadOnSearch: false});
  $routeProvider.when('/login',         {templateUrl: 'login.html', controller: 'LoginController', reloadOnSearch: false});
  $routeProvider.when('/registration',  {templateUrl: 'registration.html', controller: 'RegistrationController', reloadOnSearch: false});
  $routeProvider.when('/deals',         {templateUrl: 'deals.html', controller: 'DealsController', reloadOnSearch: false});
  $routeProvider.when('/dealsdetailed/:id_deal',    
                                        {templateUrl: 'dealsdetailed.html', controller: 'DealDetailedController', reloadOnSearch: false});


  $routeProvider.when('/my_deals',      {templateUrl: 'my_deals.html', controller: 'MyDealsController', reloadOnSearch: false});

  $routeProvider.when('/currency',      {templateUrl: 'currency.html', controller: 'CurrencyController', reloadOnSearch: false});



  // $routeProvider.when('/scroll',        {templateUrl: 'scroll.html', reloadOnSearch: false}); 
  // $routeProvider.when('/toggle',        {templateUrl: 'toggle.html', reloadOnSearch: false}); 
  // $routeProvider.when('/tabs',          {templateUrl: 'tabs.html', reloadOnSearch: false}); 
  // $routeProvider.when('/accordion',     {templateUrl: 'accordion.html', reloadOnSearch: false}); 
  // $routeProvider.when('/overlay',       {templateUrl: 'overlay.html', reloadOnSearch: false}); 
  // $routeProvider.when('/forms',         {templateUrl: 'forms.html', reloadOnSearch: false});
  // $routeProvider.when('/dropdown',      {templateUrl: 'dropdown.html', reloadOnSearch: false});
  // $routeProvider.when('/drag',          {templateUrl: 'drag.html', reloadOnSearch: false});
  // $routeProvider.when('/carousel',      {templateUrl: 'carousel.html', reloadOnSearch: false});
});

//
// `$drag` example: drag to dismiss
//
app.directive('backButton', function(){
    return {
      restrict: 'A',

      link: function(scope, element, attrs) {
        element.bind('click', goBack);

        function goBack() {
          history.back();
          scope.$apply();
        }
      }
    }
});

app.directive('dragToDismiss', function($drag, $parse, $timeout){
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem, attrs){
        var dismiss = false;

        $drag.bind(elem, {
          constraint: {
            minX: 0, 
            minY: 0, 
            maxY: 0 
          },
          move: function(c) {
            if( c.left >= c.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function(){
            elem.removeClass('dismiss');
          },
          end: function(c, undo, reset) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() { 
                scope.$apply(function() {
                  dismissFn(scope);  
                });
              }, 400);
            } else {
              reset();
            }
          }
        });
      };
    }
  };
});

//
// Another `$drag` usage example: this is how you could create 
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
app.directive('carousel', function(){
  return {
    restrict: 'C',
    scope: {},
    controller: function($scope) {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function(){
        var newId = this.itemCount++;
        this.activeItem = this.itemCount == 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem == this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();
      
      var zIndex = function(){
        var res = 0;
        if (id == carousel.activeItem){
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function(){
        return carousel.activeItem;
      }, function(n, o){
        elem[0].style['z-index']=zIndex();
      });
      

      $drag.bind(elem, {
        constraint: { minY: 0, maxY: 0 },
        adaptTransform: function(t, dx, dy, x, y, x0, y0) {
          var maxAngle = 15;
          var velocity = 0.02;
          var r = t.getRotation();
          var newRot = r + Math.round(dx * velocity);
          newRot = Math.min(newRot, maxAngle);
          newRot = Math.max(newRot, -maxAngle);
          t.rotate(-r);
          t.rotate(newRot);
        },
        move: function(c){
          if(c.left >= c.width / 4 || c.left <= -(c.width / 4)) {
            elem.addClass('dismiss');  
          } else {
            elem.removeClass('dismiss');  
          }          
        },
        cancel: function(){
          elem.removeClass('dismiss');
        },
        end: function(c, undo, reset) {
          elem.removeClass('dismiss');
          if(c.left >= c.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          } else if (c.left <= -(c.width / 4)) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          reset();
        }
      });
    }
  };
});





app.controller('HomeController', ['$scope', '$http',
  function ($scope, $http) {
    // $http.get('phones/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });

    // $scope.orderProp = 'age';
    $scope.orderProp = 'age';    
  }]);


app.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
  
}]);

app.controller('RegistrationController', ['$scope', '$http', function ($scope, $http) {
    
}]);



app.controller('DealsController', ['$scope', '$http', function ($scope, $http) {
    $http.get('testjson/deals.json').success(function(data) {
      $scope.datasource = data["data"];
    });
}]);

app.controller('CurrencyController', ['$scope', '$http', function ($scope, $http) {
    $http.get('testjson/currency.json').success(function(data) {
      $scope.datasource = data["data"];
    });
}]);

app.controller('DealDetailedController', ['$scope', '$routeParams', function($scope, $routeParams) {
      $scope.id_deal = $routeParams.id_deal;
}]);



app.controller('MainController', function($rootScope, $scope){

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;
  
  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });

  // Fake text i used here and there.
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

  // 
  // 'Scroll' screen
  // 
  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;

  $scope.bottomReached = function() {
    alert('Congrats you scrolled to the end of the list!');
  }

  // 
  // Right Sidebar
  // 
  $scope.chatUsers = [
    { name: 'Carlos  Flowers', online: true },
    { name: 'Byron Taylor', online: true },
    { name: 'Jana  Terry', online: true },

  ];

  //
  // 'Forms' screen
  //  
  $scope.rememberMe = true;
  $scope.email = 'me@example.com';
  
  $scope.login = function() {
    alert('You submitted the login form');
  };

  // 
  // 'Drag' screen
  // 
  $scope.notices = [];
  
  for (var j = 0; j < 10; j++) {
    $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1) });
  }

  $scope.deleteNotice = function(notice) {
    var index = $scope.notices.indexOf(notice);
    if (index > -1) {
      $scope.notices.splice(index, 1);
    }
  };
});