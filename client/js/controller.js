foodApp.controller('homeCtrl', function($rootScope, $scope, foodFactory,$route) {
  $(function() {
//    console.log('here');
      $('.date-picker').datepicker( {
          changeMonth: true,
          changeYear: true,
          minDate:0,
          showButtonPanel: true,
          dateFormat: 'mm/yy',
          onClose: function(dateText, inst) {
              $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
          }
      });
  });


$scope.flag = true;
$scope.successflag = false;
$scope.order = [];
$scope.menu=
  [
    {
      "name": "Hamburger",
      "price": 200,
      "quantity":0,
    },
    {
      "name": "Fries",
      "price": 100,
      "quantity":0
    },
    {
      "name": "Pepsi",
      "price": 50,
      "quantity":0
    },
    {
      "name": "Coke",
      "price": 50,
      "quantity":0
    }
  ];
//console.log($scope.menu);
$scope.orderNo ="";
$scope.paymentDetails = {
  "cardNo" :"",
  "expiry":"",
  "cvv":"",
  "name":"",
  "address":""
};

$scope.payNow = function()
{
  var total = 0;
  for(var i=0; i<$scope.menu.length; i++)
  {
    total = total + $scope.menu[i].price * $scope.menu[i].quantity;
  }
  $scope.orders = {
    "orderNo": $scope.orderNo,
    "amount":total,
    "cardNo":$scope.paymentDetails.cardNo,
    "expiryDate":$scope.paymentDetails.expiry,
    "cvv":$scope.paymentDetails.cvv,
    "name":$scope.paymentDetails.name,
    "address":$scope.paymentDetails.address,
    "paymentStatus":"paid",
    "orderStatus":"pending",
    "orderDetails":$scope.menu
  };
foodFactory.saveOrder($scope.orders)
.then(function(data) {
  if(data.data.resultcode==1||data.data.resultcode=='1')
  {
      $scope.successflag = true;
      $scope.resultcode = 1;
  }});
};

$scope.order = function()
{
  $scope.orderNo = Math.floor(1000 + Math.random() * 9000);
  //return orderNo;
  $scope.orderNo = "ABC"+ $scope.orderNo;
  $scope.flag = false;
};

$scope.changeStatus = function(order)
{
  foodFactory.updateOrder(order)
  .then(function(data) {
    if(data.data.resultcode==1||data.data.resultcode=='1')
    {
        $scope.resultcode = 1;
        $route.reload();
    }});
};
});

foodApp.controller('adminCtrl', function($rootScope, $scope, foodFactory) {
$scope.getOrderList = function(){
   foodFactory.getOrder().then(function(data) {
     $scope.ordersList = data.data;
   });
 };$scope.getOrderList();
});
