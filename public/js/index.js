angular.module('patternfly.navigation').controller('vertNavController', ['$scope',
    function($scope) {
        $scope.navigationItems = [
            {
                title: "New leads",
                iconClass: "fa fa-address-book-o",
                href: "#/leads"
            },
            {
                title: "My sales",
                iconClass: "fa fa-briefcase",
                href: "#/sales"
            },
            {
                title: "Analytics",
                iconClass: "fa fa-line-chart",
                href: "#/analytics"
            },
            {
                title: "Clients",
                iconClass: "fa fa-address-card-o",
                href: "#/clients"
            },
            {
                title: "Reminders",
                iconClass: "fa fa-bell-o",
                href: "#/reminders"
            }
        ];
    }
]);

const socket = io();
socket.on('call status change', function(msg) {
    console.log(msg);
});

let signedIn = false;

window.addEventListener("load", function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            signedIn = true;
            user.getIdToken().then(function(accessToken) {
                document.getElementById("sign-in").textContent = "Sign out";
                document.getElementById("account-details").textContent
                    = user.displayName + " (" + user.email + ")";
            });
        } else {
            signedIn = false;
            document.getElementById("sign-in").textContent = "Sign in";
            document.getElementById("account-details").textContent = "Not signed in";
        }
    }, function(error) {
        console.log(error);
    });

    document.getElementById("sign-in").addEventListener(
        "click", function() {
            if (signedIn) {
                firebase.auth().signOut();
            } else {
                window.location.assign("/signin.html");
            }
        }
    );
});