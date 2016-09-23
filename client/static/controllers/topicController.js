app.controller('topicController',['$scope', '$http', 'userFactory', '$routeParams', function($scope, $http, userFactory, $routeParams){

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
    function getTopic(id){
      userFactory.findTopic(id, function (topic) {
        $scope.topic = topic;
      })
    };
    $scope.postAnswer = function(answer){
      answer.topics = $scope.topic._id;
      userFactory.postAnswer(answer, getTopic)
    };
    $scope.postComment = function(comment){
      console.log(comment);
      userFactory.postComment(comment);
    }
    getTopic($routeParams.id);
    getLoggedInUser();
}]);
