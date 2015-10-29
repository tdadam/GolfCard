var numberOfHoles = 9;
var holeText = "";
function addHoles () {
    for (var i=1; i<=numberOfHoles; i++) {
        holeText += "<div id='hole" + i + "' class='holeBox'>" + i + "</div>";
    }
}

//document.getElementById("holeNum").innerHTML += holeText;

//Prompt: Player names, tee, front/back/full   --- transfer to bootstrap


// Scorecard will have 9 holes, yardage, par, players, and totals
//var Players = function() {
//    this.name = Bob;//entered name
//    this.tee = num1// entered tee (to calculate yardage)
//};
//
//function reset() {
//    //reset players and scores, returns to prompt screen
//}
//
//var FrontTotal = //total for first 9 holes (only visible if front or full selected)
//var BackTotal = //total for back 9 holes (only visible if back or full selected)
//var FinalTotal = //total for full course (only visible if full selected)
//
//
////Map will have hole and tee markers, yardage, path to next tee

var clientID = "64f8ab8b-326b-4b4c-9d5f-10b4abf65d9c";
var accessToken, model, map;
var redirectURI = document.URL;
var authUrl = "https://api.swingbyswing.com/v2/oauth/authorize?scope=read&redirect_uri=" + encodeURI(redirectURI) + "&response_type=token&client_id=" + clientID;
accessToken = getUrlVars().access_token;
if (accessToken == null) {
    location.replace(authUrl);
}
else {
    accessToken = accessToken.replace("\n", "");
    getCourse(47500);

}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        });
    return vars;
}

//    https://api.swingbyswing.com/v2/courses/18300?includes=practice_area,nearby_courses,recent_media,recent_comments,recent_rounds,best_rounds,current_rounds,course_stats_month,course_stats_year&access_token={access_token}
//https://api.swingbyswing.com/v2/courses/" + courseID + "?includes=practice_area&access_token=" + accessToken
function Map() {
    this.showLocation();
    {

    }
}
function getCourse(courseID) {
    var xhttp = new XMLHttpRequest();
    var aRequest = "https://api.swingbyswing.com/v2/courses/" + courseID + "?includes=practice_area&access_token=" + accessToken;
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            model = JSON.parse(xhttp.responseText);
            var location = {lat: 43.663415, lng: -89.780945};
            initMap(location);
        }
    };
    xhttp.open("GET", aRequest, true);
    xhttp.send();
}

function initMap(myLatLng) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        scrollwheel: false,
        disableDefaultUI: true
        // set bounds and center on fairway
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "Cold Water Canyon"
    });
}

function hole(hn) {
    var green = model.course.holes[hn - 1].green_location;
    var tee = model.course.holes[hn - 1].tee_boxes[0].location;
    var lati = (green.lat + tee.lat) / 2;
    var long = (green.lng + tee.lng) / 2;
    var fairway = {"lat": lati, "lng": long};
    map = new google.maps.Map(document.getElementById('map'), {
        center: fairway,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        scrollwheel: false,
        disableDefaultUI: true
    });

    var markTee = new google.maps.Marker({
        position: tee,
        map: map,
        title: "Tee Box"
    });

    var markGreen = new google.maps.Marker({
        position: green,
        map: map,
        title: "Green"
    });

//         var bounds =
}


//    function check(hn) {
//        var green = model.course.holes[hn - 1].green_location;
//        console.log(green);
//
//        var tee = model.course.holes[hn - 1].tee_boxes[0].location;
//        console.log(tee);
//    }
// Prompt names, create for each
//
// Prompt for front/back/full
//if front, create 1-9, disable switch
//if back, create 10-18, disable switch
//if full, create 1-18, display 1-9 activate switch
//
//populate yardage
//populate par
//
//scores are input
//
// Bootstrap??
//
//
//
//
//