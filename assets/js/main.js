(function() {

    var app = angular.module("myApp", []);
    app.run(['$rootScope','$http', function($rootScope,$http) {
        $rootScope.testText = "Hello World";
       $rootScope.paraNum = 0;
       $rootScope.paraText = ""
       $rootScope.buttonHidden = false;
       $rootScope.yesno = true;
       $rootScope.dontknow = true;
       $rootScope.isHidden2 = true;
       $rootScope.isHidden3 = true;
       $rootScope.formHidden = true;
       $rootScope.lastHidden = true;
       $rootScope.counter = 0;
       $rootScope.docketNumber = 0;
       $rootScope.parray = ["That the Plaintiff is a resident of Pulaski County, Arkansas and has been for more than ninety (90) days.",
       "That the Plaintiff has an address of 611 King Place, Apt. D, Jacksonville, Arkansas, 72076 and she is on disability.",
       "That the Defendant's address is 136 Central Ave., Jacksonville, Arkansas, 72076, and he is on disability.",
       "That Plaintiff and Defendant were married to each other on or about May 23, 1985, in Lonoke County, Arkansas.",
       "That the Plaintiff and Defendant separated on or about October 1, 2015, and have lived separate and apart from that time.",
       "That there is one child born of this marriage, B.M.P., born July 24, 2000, and no other children are expected of this marriage.",
       "That the child receives a disability check drawn from based on the mother’s social security benefits as that makes the child’s benefit higher and that no child support is to be paid by either party",
       "The Plaintiff shall have custody of the minor child.",
       "That the parties have agreed that the Plaintiff will have ownership and possession of the 2010 GMC Sierra and will make the payments on said vehicle and hold the Defendant harmless there from",
       "That the parties have agreed that the Defendant will have ownership and possession of the 2001 Dodge Ram which is paid for"
       ];
    }]);

    app.controller('myCtrl',['$rootScope','$http', function($rootScope,$http){
        this.showScreen = function() {
            $rootScope.counter = $rootScope.counter+1;
            if($rootScope.counter === 1){
                document.getElementById("header").innerHTML = "Where was the lawsuit filed?";
                document.getElementById("button").innerHTML = "Next";
                $rootScope.isHidden2 = !$rootScope.isHidden2;
            }
            else if ($rootScope.counter === 2) {
                document.getElementById("header").innerHTML = "What is your docket number?";
                $rootScope.isHidden2 = !$rootScope.isHidden2;
                $rootScope.isHidden3 = !$rootScope.isHidden3;
            }else if ($rootScope.counter === 3){
                document.getElementById("header").innerHTML = "Is this the complaint you received?";
                $rootScope.isHidden3 = !$rootScope.isHidden3;
                $rootScope.buttonHidden = !$rootScope.buttonHidden;
                $rootScope.yesno = !$rootScope.yesno;

            }
        };
        this.docketSubmit = function(){
            $rootScope.testText="IT HAS CHANGED!";
            return $http.get('http://test-routes.herokuapp.com/test/hello')
                .then(function(res) {
                  // return the enveloped data
                  console.log("whats up?");

                  $rootScope.testText = res.data.message;
                })
        }
        this.nextScreen = function() {
            $rootScope.paraText = $rootScope.parray[$rootScope.paraNum];
            $rootScope.paraNum = $rootScope.paraNum + 1
            if ($rootScope.counter == 3) {
                document.getElementById("yes").innerHTML = "Admit";
                document.getElementById("no").innerHTML = "Deny";
                $rootScope.dontknow = false;
                $rootScope.counter = $rootScope.counter + 1;
            }
            else if ($rootScope.paraNum === 10) {
               $rootScope.yesno = true;
               $rootScope.dontknow = true;
               $rootScope.formHidden = false;
               document.getElementById("header").innerHTML = "Please give us a way to contact you.";
            }
        };

        this.showLast = function() {
           document.getElementById("header").innerHTML = "";
           $rootScope.formHidden = true;
           $rootScope.buttonHidden = true;
           $rootScope.lastHidden = false;
        }

        this.getAccusations = function() {

        }

    }]);

})();


