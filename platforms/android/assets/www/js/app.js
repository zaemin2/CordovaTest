
angular.module('App', [])
.controller('MainController', ['$scope', '$filter',function ($scope, $filter) {
    $scope.todos = [];

    $scope.newTitle = '';

    $scope.addTodo = function () {
      $scope.todos.push({
        title: $scope.newTitle,
        done: false
      });

      $scope.newTitle = '';
    };
    
    /* 動かない
    $scope.deleteTodo = function (todo) {
      console.log($scope.todos);
      delete $scope.todos[$scope.todos.indexOf(todo)];
      console.log($scope.todos);
    };
    */
   
    // 全て完了/未了
    $scope.checkAll = function () {
      var state = !!$scope.remainingCount; // 未了にするのか完了にするのかの判定

      angular.forEach($scope.todos, function (todo) {
        todo.done = state;
      });
    };

    // 完了した ToDo を全て削除
    $scope.removeDoneTodo = function () {
      $scope.todos = where($scope.todos, $scope.filter.remaining);
    };

    // 任意の ToDo を削除
    $scope.removeTodo = function (currentTodo) {
      $scope.todos = where($scope.todos, function (todo) {
        return currentTodo !== todo;
      });
    };
    
    $scope.offsetTodo = function () {
        $scope.todos = where($scope.todos, function(todo){

        });
    };
     

    $scope.filter = {
      done: { done: true },
      remaining: { done: false }
    };
    $scope.currentFilter = null;

    $scope.changeFilter = function (filter) {
      $scope.currentFilter = filter;
    };
    
    var where = $filter('filter'); // filter フィルタ関数の取得
    $scope.$watch('todos', function (todos) {
      var length = todos.length;

      $scope.allCount = length;                                   // 総件数モデル
      $scope.doneCount = where(todos, $scope.filter.done).length; // 完了件数モデル
      $scope.remainingCount = length - $scope.doneCount;          // 未了件数モデル
    }, true);
    
    var originalTitle;     // 編集前の要件
    $scope.editing = null; // 編集モードの ToDo モデルを表すモデル

    $scope.editTodo = function (todo) {
      originalTitle = todo.title;
      $scope.editing = todo;
    };
    
    $scope.doneEdit = function () {
      if (todoForm.$invalid) {
        $scope.editing.title = originalTitle;
      }
      $scope.editing = originalTitle = null;
    };

  
}])
.directive('mySelect', [function () {
  return function (scope, $el, attrs) {
    scope.$watch(attrs.mySelect, function (val) {
      if (val) {
        $el[0].select();
      }
    });
  };
}]);
