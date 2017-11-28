angular.module('app', [])
.controller('AppCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.ballot = [];
    $scope.candidates = [];
    //   {name: 'Candidate 1', votes: 0},
    //   {name: 'Candidate 2', votes: 0},
    //   {name: 'Candidate 3', votes: 0}
    // ];
    $scope.getAll = function() {
      return $http.get('/candidates').success(function(data){
        angular.copy(data, $scope.candidates); //copy candidates from DB to this candidates
      });
    };
    $scope.getAll();
    $scope.create = function(candidate) {
      console.log("In create with candidate: "+candidate.name+" : "+candidate.votes);
      return $http.post('/candidates', candidate).success(function(data){
        //$scope.candidates.push(data);
      });
    };
    $scope.voteFor = function(candidate) {
      return $http.put('/candidates/' + candidate._id + '/votefor')
        .success(function(data){
          console.log("voteFor worked");
          candidate.votes += 1;
        });
    };
    $scope.delete = function(candidate) {
      $http.delete('/candidates/' + candidate._id )
        .success(function(data){
          console.log("delete worked");
          $scope.getAll();
        });
    };
    $scope.addCandidate = function() {
      if($scope.newCandidate === "" || $scope.newCandidate === undefined) { return; }
      console.log("In addCandidate with "+$scope.newCandidate);
      // $scope.candidates.push({name: $scope.newCandidate, votes: 0});
      $scope.create({
        name: $scope.newCandidate,
        votes: 0,
      });
      $scope.newCandidate = '';
      $scope.getAll();
    };
    $scope.incrementVotes = function(candidate) {
      // candidate.votes++; //remove this later
      // console.log(candidate.name+ " now has "+candidate.votes+" votes");
        $scope.voteFor(candidate);
    }
    $scope.delete = function(candidate) {
      console.log("In delete with candidate "+candidate.name);
    };

    $scope.ballotResp = '';
    $scope.submitBallot = function() {
      console.log("Submitting ballot");
      $scope.ballot = [];
      for (var i in $scope.candidates) {
        if ($scope.candidates[i].checked) {
          $scope.incrementVotes($scope.candidates[i]);
          $scope.ballot.push($scope.candidates[i]);

        }
      }
    }

  }
]);
