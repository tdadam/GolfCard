var numberOfHoles = 9;
var holeText = "";
var playAdd = 0;
var select = "";
var firstHoles = true;

$(window).load(function () {
    $('#setupModal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
});

$(':input[type=number]').on('mousewheel', function (e) {
    e.preventDefault();
});

function setFull() {
    $('#toggle').css('display', 'inline-block');
    $('.frontNine').css('display', 'table-cell');
    $('.backNine').css('display', 'none');
    $('#setupModal').modal('hide');
    for (var i = 1; i < 7; i++) {
        $('#add' + i).prop('disabled', false);
    }
    $('#playerModal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function setFrontNine() {
    $('.frontNine').css('display', 'table-cell');
    $('.backNine').css('display', 'none');
    $('.columnTotal').css('display', 'none');
    $('#setupModal').modal('hide');
    for (var i = 1; i < 7; i++) {
        $('#add' + i).prop('disabled', false);
    }
    $('#playerModal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function setBackNine() {
    $('.backNine').css('display', 'table-cell');
    $('.frontNine').css('display', 'none');
    $('.columnTotal').css('display', 'none');
    $('#setupModal').modal('hide');
    for (var i = 1; i < 7; i++) {
        $('#add' + i).prop('disabled', false);
    }
    $('#playerModal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

function toggleView() {
    if (firstHoles) {
        $('.frontNine').css('display', 'none');
        $('.backNine').css('display', 'table-cell');
        firstHoles = false;
    }
    else {
        $('.backNine').css('display', 'none');
        $('.frontNine').css('display', 'table-cell');
        firstHoles = true;
    }
}
function addRow(n) {
    for (var i = 0; i < n; i++) {
        $('#player' + (i + 1)).css('display', 'table-row');
        $('#p' + (i + 1) + 'NameLabel').css('display', 'inline-block');
        $('#p' + (i + 1) + 'NameEntry').css('display', 'inline-block');
        $('#modalConfirm').css('display', 'inline-block');
        playAdd++;
    }
    for (var j = 1; j < 7; j++)
        $('#add' + j).prop('disabled', true);
}
function startGame() {
    $('.playerEntry').css('display', 'none');
    for (var i = 1; i <= playAdd; i++) {
        var setName = "";
        var backupName = "Player " + i;
        setName = document.getElementById("p" + i + "NameEntry").value;
        if (setName != "") {
            document.getElementById("player" + i + "name").innerHTML = setName;
        }
        else {
            document.getElementById("player" + i + "name").innerHTML = backupName;
        }
    }
    $('#playerModal').modal('hide');
}
function startAddPlayer() {
    $('#newPlayer').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    $('#player' + (playAdd + 1)).css('display', 'table-row');
    //}
}
function finishAddPlayer() {
    playAdd++;
    if (playAdd == 8) {
        $('#addNewPlayer').prop('disabled', true);
    }
    var playName = document.getElementById("newPlayerEntry").value;
    if (playName != "") {
        document.getElementById("player" + playAdd + "name").innerHTML = playName;
    }
    else {
        document.getElementById("player" + playAdd + "name").innerHTML = "Player " + playAdd;
    }
    $('#newPlayer').modal('hide');
    document.getElementById("newPlayerEntry").value = "";
}
function removePlayer() {
    if (playAdd == 0) {
        return;
    }
    else {
        $('#player' + playAdd).css('display', 'none');
        document.getElementById("player" + playAdd + "name").innerHTML = "Player" + playAdd;
        for (var i = 1; i < 19; i++) {
            document.getElementById("play" + playAdd + "hole" + i).value = "";
        }
        document.getElementById("play" + playAdd + "holeF9").innerHTML = "";
        document.getElementById("play" + playAdd + "holeB9").innerHTML = "";
        document.getElementById("play" + playAdd + "Total").innerHTML = "";
        document.getElementById("play" + playAdd + "OverUnder").innerHTML = "";

    }
    playAdd--;
    $('#addNewPlayer').prop('disabled', false);
    if (playAdd == 0) {
        $('#setupModal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
    }
}

function setPar() {
    for (var i = 1; i < 19; i++) {

        document.getElementById(("par" + i)).innerHTML = model.course.holes[i - 1].tee_boxes[0].par;

    }
    document.getElementById("parF9").innerHTML = model.course.tee_types[0].front_nine_par;
    document.getElementById("parB9").innerHTML = model.course.tee_types[0].back_nine_par;
    document.getElementById("parTotal").innerHTML = model.course.tee_types[0].par;
}

function getYard() {
    var path = model.course.holes;
    for (var i = 0; i < path.length; i++) {
        for (var j = 0; j < (path[i].tee_boxes.length - 1); j++)
            if (path[i].tee_boxes[j].tee_color_type == "black") {
                document.getElementById("blackYard" + (i + 1)).innerHTML = path[i].tee_boxes[j].yards;
            }
            else if (path[i].tee_boxes[j].tee_color_type == "white") {
                document.getElementById("whiteYard" + (i + 1)).innerHTML = path[i].tee_boxes[j].yards;
            }
            else if (path[i].tee_boxes[j].tee_color_type == "blue") {
                document.getElementById("blueYard" + (i + 1)).innerHTML = path[i].tee_boxes[j].yards;
            }
            else if (path[i].tee_boxes[j].tee_color_type == "red") {
                document.getElementById("redYard" + (i + 1)).innerHTML = path[i].tee_boxes[j].yards;
            }
    }
    if (document.getElementById("blackYard1").innerHTML == "") {
        $('#blackTee').css('display', 'none');

    }
    if (document.getElementById("blueYard1").innerHTML == "") {
        $('#blueTee').css('display', 'none');

    }
    if (document.getElementById("whiteYard1").innerHTML == "") {
        $('#whiteTee').css('display', 'none');

    }
    if (document.getElementById("redYard1").innerHTML == "") {
        $('#redTee').css('display', 'none');

    }
}
function getYardTotals() {
    var path = model.course.tee_types;
    for (var i = 0; i < path.length; i++) {
        if (path[i].tee_color_type == "black") {
            document.getElementById("blackYardF9").innerHTML = path[i].front_nine_yards;
            document.getElementById("blackYardB9").innerHTML = path[i].back_nine_yards;
            document.getElementById("blackYardTotal").innerHTML = path[i].yards;
        }
        else if (path[i].tee_color_type == "white") {
            document.getElementById("whiteYardF9").innerHTML = path[i].front_nine_yards;
            document.getElementById("whiteYardB9").innerHTML = path[i].back_nine_yards;
            document.getElementById("whiteYardTotal").innerHTML = path[i].yards;
        }
        else if (path[i].tee_color_type == "blue") {
            document.getElementById("blueYardF9").innerHTML = path[i].front_nine_yards;
            document.getElementById("blueYardB9").innerHTML = path[i].back_nine_yards;
            document.getElementById("blueYardTotal").innerHTML = path[i].yards;
        }
        else if (path[i].tee_color_type == "red") {
            document.getElementById("redYardF9").innerHTML = path[i].front_nine_yards;
            document.getElementById("redYardB9").innerHTML = path[i].back_nine_yards;
            document.getElementById("redYardTotal").innerHTML = path[i].yards;
        }
    }
}
function calcScore(n) {
    var f9Total = 0;
    var b9Total = 0;
    for (var i = 1; i < 10; i++) {
        f9Total += +document.getElementById("play" + n + "hole" + i).value;
    }
    document.getElementById("play" + n + "holeF9").innerHTML = String(f9Total);
    for (var j = 10; j < 19; j++) {
        b9Total += +document.getElementById("play" + n + "hole" + j).value;
    }
    document.getElementById("play" + n + "holeB9").innerHTML = String(b9Total);
    document.getElementById("play" + n + "Total").innerHTML = String(f9Total + b9Total);
    calcOverUnder(n)
}
function calcOverUnder(x) {
    var final = 0;
    var finalStroke = 0;
    var finalPar = 0;
    for (var i = 1; i < 19; i++) {
        if (document.getElementById("play" + x + "hole" + i).value != 0) {
            finalStroke += +document.getElementById("play" + x + "hole" + i).value;
            finalPar += model.course.holes[i - 1].tee_boxes[0].par;
            final = finalStroke - finalPar;
        }
    }
    return document.getElementById("play" + x + "OverUnder").innerHTML = final
}
function endGame() {
    var amazing = "WOW! That was an amazing round for ";
    var goodResult = " did an excellent job!";
    var parResult = " had a satisfactory round.";
    var badResult = " should probably get more practice...";
    var winnerCheck = [];
    var lowest = 0;
    for (var j = 0; j < playAdd; j++){
        winnerCheck.push(+document.getElementById("play" + (j+1) + "OverUnder"))
    }
    for (var k = 1; k < winnerCheck.length; k++) {
        if (winnerCheck[k] < winnerCheck[lowest]) {
            lowest = k;
        }
        else if (winnerCheck[k] == winnerCheck[lowest]) {
            $('#tieGame').css('display', 'block');
            $('#winner').css('display', 'none');
            return document.getElementById("tieGame").innerHTML = "There was a tie.";
        }
    }
    document.getElementById("winner").innerHTML = "The winner is: " + winnerCheck[lowest] + "!";
    for (var i = 0; i < playAdd; i++){
        if (+document.getElementById("play" + (i+1) + "OverUnder") <= -16){
            document.getElementById("comment" + (i+1)).innerHTML = amazing + document.getElementById("player" + (i+1) + "name").innerHTML + "!";
        }
        else if (+document.getElementById("play" + (i+1) + "OverUnder") <= -5){
            document.getElementById("comment" + (i+1)).innerHTML = document.getElementById("player" + (i+1) + "name").innerHTML + goodResult;
        }
        else if (+document.getElementById("play" + (i+1) + "OverUnder") <= 5){
            document.getElementById("comment" + (i+1)).innerHTML = document.getElementById("player" + (i+1) + "name").innerHTML + parResult;
        }
        else {
            document.getElementById("comment" + (i+1)).innerHTML = document.getElementById("player" + (i+1) + "name").innerHTML + badResult;
        }
    }
}
function resetCard() {
    for (var i = playAdd; i > 0; i--) {
        removePlayer()
    }
    $('#setupModal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}

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
//Pebble Beach: 13197; St. Andrews (Old Course): 51763; Thanksgiving Point: 11819; Cold Water Canyon: 47500
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
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            model = JSON.parse(xhttp.responseText);
            var location = model.course.location;
            initMap(location);
            document.getElementById("courseName").innerHTML = model.course.name + " Golf Course";
            setPar();
            getYard();
            getYardTotals();
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
        // set bounds
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "Clubhouse"
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
    var teeMarker = {
        url: '../images/red_tee.png',
        scaledSize: new google.maps.Size(22, 32),
        origin: new google.maps.Point(0, 0)
    };
    var markTee = new google.maps.Marker({
        position: tee,
        map: map,
        title: "Tee Box",
        icon: teeMarker
    });
    var greenMarker = {
        url: '../images/icon-flag.png',
        anchor: new google.maps.Point(3, 30)
    };
    var markGreen = new google.maps.Marker({
        position: green,
        map: map,
        title: "Green",
        icon: greenMarker
    });

//         var bounds =
}