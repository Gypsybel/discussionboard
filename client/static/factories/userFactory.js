

app.factory("userFactory", ["$http", '$q', '$location', function($http, $q, $location){
    var users = {data:[]};
    var factory = {};


    // function checkStatus(status){
    //   if(status == 200){
    //     return true;
    //   }
      // else if(status == 401){
      //   $location.url('/')
      // }
    // };


    // start admin user functions
    factory.registerUser = function(user){
      console.log(user);
        $http({
            method:"POST",
            url:'/register',
            data:user
        }).then(function(res){
              $location.url('/home')
        })
    };

    factory.loginUser = function(user, callback){
      $http({
        url:'/login',
        method:'POST',
        data: user
      }).then(function(user){
          factory.user = user.data;
          $location.url('/home')
      },function(res){
        callback(res);
      })
    };

    factory.getLoggedInUser = function(callback){
      $http({
        url:'/loggedinuser',
        method:'GET'
      }).then(function(user){
        callback(user);
      })
    };

    factory.postAnswer = function(answer, callback){
      $http({
        url:'/postanswer',
        method:'POST',
        data:answer
      }).then(function(res){
        callback(res.data);
      })
    };
    factory.postComment = function(comment, callback){
      $http({
        url:'/postcomment',
        method:'POST',
        data:comment
      }).then(function(res){
        callback();
      })
    }
    factory.getCategories = function(callback){
      $http({
        url:'/categories',
        method:'GET'
      }).then(function(res){
        callback(res.data)
      })
    };
    factory.getTopics = function(callback){
      $http({
        url:'/topics',
        method:'GET'
      }).then(function(res){
        callback(res.data)
      })
    };
    factory.newTopic = function(topic, callback){
      $http({
        url:'/topics',
        method:'POST',
        data: topic,
      }).then(function(res){
        callback(res.data)
      })
    };
    factory.findTopic = function(id, callback){
      $http({
        url:'/findtopic/' + id,
        method:'GET'
      }).then(function(res){
        callback(res.data)
      })
    }

    // end admin user functions

    // start order functions

    // factory.getOrders = function(callback){
    //   $http({
    //     url:'/orders',
    //     method:'GET'
    //   }).then(function(res){
    //     callback(res.data);
    //   })
    // };
    //
    // factory.createOrder = function(order, callback){
    //   $http({
    //     url:'/orders',
    //     method:'POST',
    //     data:order
    //   }).then(function(res){
    //     if(res.status == 200){
    //     callback();
    //     }
    //   })
    // },
    // factory.deleteOrder = function(order, callback){
    //   $http({
    //     url:'/orders/' + order._id,
    //     method: 'DELETE'
    //   }).then(function(res){
    //     if(res.status == 200){
    //       callback();
    //     }
    //   });
    // }

    // end order functions

    return factory;
}])
