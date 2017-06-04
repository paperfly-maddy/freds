foodApp.factory('foodFactory', function($http) {
  var urlBaseMenu = '/api/menu';
  var urlBaseOrder = '/api/orders';
  var _foodService = {};

  _foodService.getMenu = function() {
    return $http.get(urlBaseMenu);
  };
  _foodService.getOrder = function() {
    return $http.get(urlBaseOrder);
  };

  _foodService.saveOrder = function(orders) {
    return $http.post(urlBaseOrder, orders);
  };

  _foodService.updateOrder = function(order) {
    return $http.put(urlBaseOrder, order);
  };

  return _foodService;
});
