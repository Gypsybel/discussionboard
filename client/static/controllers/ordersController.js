// app.controller('ordersController',['$scope', '$http', 'userFactory', function($scope, $http, userFactory){
//     function getOrders(){
//         userFactory.getOrders(function(orders){
//             $scope.orders = orders;
//         });
//     };
//     function getCustomers(){
//       userFactory.getCustomers(function(customers){
//         $scope.customers = customers;
//       })
//     };
//     function getProducts(){
//       userFactory.getProducts(function(products){
//         $scope.products = products;
//       })
//     };
//     getOrders();
//     getCustomers();
//     getProducts();
//     $scope.createOrder = function(order){
//       userFactory.createOrder(order, getOrders);
//     };
//     $scope.deleteOrder = function(order){
//       userFactory.deleteOrder(order, getOrders);
//     };
// }]);
