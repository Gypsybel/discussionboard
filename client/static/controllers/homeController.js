app.controller('homeController',['$scope', '$http', 'userFactory', function($scope, $http, userFactory){

    function getLoggedInUser(){
        userFactory.getLoggedInUser(function(user){
            $scope.user = user.data;
        });
    };
    function getCategories(){
      userFactory.getCategories(function(categories){
        $scope.categories = categories;
      });
    };
    function getTopics(){
      userFactory.getTopics(function (topics) {
        $scope.topics = topics;
      })
    };
    $scope.newTopic = function (topic){
      userFactory.newTopic(topic, getTopics)
    };
    getTopics();
    getLoggedInUser();
    getCategories();
}]);
