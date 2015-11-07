var numberOfHoles = 9;
var holeText = "";
var playAdd = 0;
var select = "";
var firstHoles = true;
var courseLength = 0;
var editNum = 0

$(window).load(function () {
    $('courseSetConfirm').prop('diabled', true);
    $('#setupCourse').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
});

$(':input[type=number]').on('mousewheel', function (e) {
    e.preventDefault();
});

function hideYardRows() {
    $('#blackTee').css('display', 'none');
    $('#blueTee').css('display', 'none');
    $('#whiteTee').css('display', 'none');
    $('#redTee').css('display', 'none');
}

function setFull() {
    $('#toggle').css('display', 'inline-block');
    $('.frontNine').css('display', 'table-cell');
    $('.backNine').css('display', 'none');
    $('.playerSetup').css('display', 'inline-block');
    $('.playerSetup').prop('disabled', false);
    $('.holeSetup').prop('disabled', true);
}

function setFrontNine() {
    $('.frontNine').css('display', 'table-cell');
    $('.backNine').css('display', 'none');
    $('.columnTotal').css('display', 'none');
    $('.playerSetup').css('display', 'inline-block');
    $('.playerSetup').prop('disabled', false);
    $('.holeSetup').prop('disabled', true);
}

function setBackNine() {
    $('.backNine').css('display', 'table-cell');
    $('.frontNine').css('display', 'none');
    $('.columnTotal').css('display', 'none');
    $('.playerSetup').css('display', 'inline-block');
    $('.playerSetup').prop('disabled', false);
    $('.holeSetup').prop('disabled', true);
}

function onlyNine() {
    $('.holeSetup').css('display', 'none');
    $('.frontNine').css('display', 'table-cell');
    $('.nineHole').css('display', 'none');
    $('.playerSetup').css('display', 'inline-block');
    $('.playerSetup').prop('disabled', false);
    $('#modalConfirm').prop('disabled', true);
    hideYardRows();
    $('#setupModal').modal({
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
    $('.playerEntryInst').css('display', 'block');
    for (var i = 0; i < n; i++) {
        $('#player' + (i + 1)).css('display', 'table-row');
        $('#p' + (i + 1) + 'NameLabel').css('display', 'inline-block');
        $('#p' + (i + 1) + 'NameEntry').css('display', 'inline-block');
        $('#p' + (i + 1) + 'TeeEntry').css('display', 'inline-block');
        playAdd++;
    }
    $('.playerSetup').prop('disabled', true);
    $('#modalConfirm').css('display', 'inline-block');
}
function activateStart() {
    $('#modalConfirm').prop('disabled', false)
}
function startGame() {
    $('.playerEntryInst').css('display', 'none');
    $('.playerEntry').css('display', 'none');
    $('.playerSetup').css('display', 'none');
    $('.holeSetup').css('display', 'inline-block');
    $('.holeSetup').prop('disabled', false);
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
    for (var j = 1; j < 7; j++) {
        if (document.getElementById("p" + j + "TeeEntry").value == "Black") {
            $('#blackTee').css('display', 'table-row');
        }
        else if (document.getElementById("p" + j + "TeeEntry").value == "Blue") {
            $('#blueTee').css('display', 'table-row');
        }
        else if (document.getElementById("p" + j + "TeeEntry").value == "White") {
            $('#whiteTee').css('display', 'table-row');
        }
        else if (document.getElementById("p" + j + "TeeEntry").value == "Red") {
            $('#redTee').css('display', 'table-row');
        }
    }
    for (var k = 1; k < 7; k++) {
        document.getElementById("p" + k + "TeeEntry").value = "";
    }
    $('#setupModal').modal('hide');
}
function startAddPlayer() {
    $('#newPlayer').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    $('#player' + (playAdd + 1)).css('display', 'table-row');
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
    if (document.getElementById("newTeeEntry").value == "Black") {
        $('#blackTee').css('display', 'table-row');
    }
    else if (document.getElementById("newTeeEntry").value == "Blue") {
        $('#blueTee').css('display', 'table-row');
    }
    else if (document.getElementById("newTeeEntry").value == "White") {
        $('#whiteTee').css('display', 'table-row');
    }
    else if (document.getElementById("newTeeEntry").value == "Red") {
        $('#redTee').css('display', 'table-row');
    }
    $('#newPlayer').modal('hide');
    document.getElementById("newTeeEntry").value = "";
    document.getElementById("newPlayerEntry").value = "";
}
function startEditPlayerName(n) {
    $('#editPlayer').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    document.getElementById("editPlayerEntry").value = document.getElementById("player" + n + "name").innerHTML;
    editNum = n;
}

function finishEditPlayerName() {
    document.getElementById("player" + editNum + "name").innerHTML = document.getElementById("editPlayerEntry").value;
    $('#editPlayer').modal('hide');
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
    if (playAdd == 0 && courseLength != 9) {
        $('#modalConfirm').prop('disabled', true);
        hideYardRows();
        $('#setupModal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (playAdd == 0 && courseLength == 9) {
        onlyNine();
    }
}

function setPar() {
    var holeCount = model.course.holes.length;
    for (var i = 0; i < holeCount; i++) {

        document.getElementById("par" + (i + 1)).innerHTML = model.course.holes[i].tee_boxes[0].par;

    }
    document.getElementById("parF9").innerHTML = model.course.tee_types[0].front_nine_par;
    document.getElementById("parTotal").innerHTML = model.course.tee_types[0].par;
    if (holeCount == 18) {
        document.getElementById("parB9").innerHTML = model.course.tee_types[0].back_nine_par;
    }
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
    for (var k = 0; k < path.length; k++) {
        if (path[k].tee_boxes[0].hcp != null) {
            document.getElementById("hcp" + (k + 1)).innerHTML = path[k].tee_boxes[0].hcp;
        }
    }
    if (document.getElementById("blackYard1").innerHTML == "") {
        $('.selectBlack').css('display', 'none');
    }
    if (document.getElementById("blueYard1").innerHTML == "") {
        $('.selectBlue').css('display', 'none');
    }
    if (document.getElementById("whiteYard1").innerHTML == "") {
        $('.selectWhite').css('display', 'none');
    }
    if (document.getElementById("redYard1").innerHTML == "") {
        $('.selectRed').css('display', 'none');
    }
    if (document.getElementById("hcp1").innerHTML == "") {
        $('#hcpNum').css('display', 'none');

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
function resetYard() {
    $('#blackTee').css('display', 'none');
    $('.selectBlack').css('display', 'inline-block');
    $('#blueTee').css('display', 'none');
    $('.selectBlue').css('display', 'inline-block');
    $('#whiteTee').css('display', 'none');
    $('.selectWhite').css('display', 'inline-block');
    $('#redTee').css('display', 'none');
    $('.selectRed').css('display', 'inline-block');
    $('#hcpNum').css('display', 'table-row');
    document.getElementById("hcp1").innerHTML = "";
    document.getElementById("blackYard1").innerHTML = "";
    document.getElementById("blueYard1").innerHTML = "";
    document.getElementById("whiteYard1").innerHTML = "";
    document.getElementById("redYard1").innerHTML = "";
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
    $('#tieGame').css('display', 'none');
    $('#noWinnerGame').css('display', 'none');
    $('#winner').css('display', 'block');
    var amazing = "WOW! That was an amazing round for ";
    var goodResult = " did an excellent job!";
    var parResult = " had a satisfactory round.";
    var badResult = " should probably get more practice...";
    var winnerCheck = [];
    var lowest = 0;
    var winnerName = "";
    for (var j = 0; j < playAdd; j++) {
        winnerCheck.push(+document.getElementById("play" + (j + 1) + "OverUnder").innerHTML)
    }
    if (winnerCheck.length == 1) {
        $('#noWinnerGame').css('display', 'block');
        $('#winner').css('display', 'none');
    }
    else {
        for (var k = 1; k < winnerCheck.length; k++) {
            if (winnerCheck[k] < winnerCheck[lowest]) {
                lowest = k;
                winnerName = document.getElementById("player" + (lowest + 1) + "name").innerHTML;
                $('#winner').css('display', 'block');
            }
            else if (winnerCheck[k] == winnerCheck[lowest]) {
                $('#tieGame').css('display', 'block');
                $('#winner').css('display', 'none');
            }
            winnerName = document.getElementById("player" + (lowest + 1) + "name").innerHTML;
        }
    }
    document.getElementById("winner").innerHTML = "The winner is: " + winnerName + "!";
    for (var i = 0; i < playAdd; i++) {
        if (+document.getElementById("play" + (i + 1) + "OverUnder").innerHTML <= (-16)) {
            document.getElementById("comment" + (i + 1)).innerHTML = amazing + document.getElementById("player" + (i + 1) + "name").innerHTML + "!";
        }
        else if ((+document.getElementById("play" + (i + 1) + "OverUnder").innerHTML) <= (-5)) {
            document.getElementById("comment" + (i + 1)).innerHTML = document.getElementById("player" + (i + 1) + "name").innerHTML + goodResult;
        }
        else if (+document.getElementById("play" + (i + 1) + "OverUnder").innerHTML <= 5) {
            document.getElementById("comment" + (i + 1)).innerHTML = document.getElementById("player" + (i + 1) + "name").innerHTML + parResult;
        }
        else {
            document.getElementById("comment" + (i + 1)).innerHTML = document.getElementById("player" + (i + 1) + "name").innerHTML + badResult;
        }
    }
    $('#results').modal('show');
}
function resetCard() {
    for (var i = playAdd; i > 0; i--) {
        removePlayer()
    }
    if (courseLength != 9) {
        $('#modalConfirm').prop('disabled', true);
        hideYardRows();
        $('#setupModal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
    }
    else if (courseLength == 9) {
        onlyNine();
    }
}
function newCourse() {
    for (var i = playAdd; i > 0; i--) {
        $('#player' + playAdd).css('display', 'none');
        document.getElementById("player" + playAdd + "name").innerHTML = "Player" + playAdd;
        for (var j = 1; j < 19; j++) {
            document.getElementById("play" + playAdd + "hole" + j).value = "";
        }
        document.getElementById("play" + playAdd + "holeF9").innerHTML = "";
        document.getElementById("play" + playAdd + "holeB9").innerHTML = "";
        document.getElementById("play" + playAdd + "Total").innerHTML = "";
        document.getElementById("play" + playAdd + "OverUnder").innerHTML = "";
        playAdd--;
    }
    resetYard();
    $('#addNewPlayer').prop('disabled', false);
    $('#courseSetConfirm').prop('disabled', true);
    $('#setupCourse').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
}
function checkValid() {
    var toVerify = document.getElementById("courseIDEntry").value;
    if (toVerify.length == 5) {
        $('#courseSetConfirm').prop('disabled', false);
    }
    else if (toVerify.length != 5) {
        $('#courseSetConfirm').prop('disabled', true);
    }
}
function setCourseID() {
    var setID = +document.getElementById("courseIDEntry").value;
    getCourse(setID);
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
    //choiceModal();
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
        if (xhttp.status == 404) {
            document.getElementById("courseError").innerHTML = "The course ID you entered was not found. Please try again.";
            $('courseSetConfirm').prop('diabled', true);
        }
        else if (xhttp.readyState == 4 && xhttp.status == 200) {
            $('#setupCourse').modal('hide');
            model = JSON.parse(xhttp.responseText);
            var location = model.course.location;
            initMap(location);
            document.getElementById("courseName").innerHTML = model.course.name + " Golf Course";
            courseLength = model.course.holes.length;
            setPar();
            getYard();
            getYardTotals();
            if (courseLength == 9) {
                onlyNine();
            }
            else {
                $('#modalConfirm').prop('disabled', true);
                $('.playerSetup').css('display', 'none');
                hideYardRows();
                $('#setupModal').modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                });
            }
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
    var lastGreen = "";
    var nextTee = "";
    if (hn == 1){
        lastGreen = model.course.location;
        nextTee = model.course.holes[hn].tee_boxes[0].location;
    }
    else if (hn == 18){
        lastGreen = model.course.holes[hn - 2].green_location;
        nextTee = model.course.location;
    }
    else {
        lastGreen = model.course.holes[hn - 2].green_location;
        nextTee = model.course.holes[hn].tee_boxes[0].location;
    }
    var green = model.course.holes[hn - 1].green_location;
    var tee = model.course.holes[hn - 1].tee_boxes[0].location;
    var lati = (green.lat + tee.lat) / 2;
    var long = (green.lng + tee.lng) / 2;
    var fairway = {"lat": lati, "lng": long};
    var fromLastGreen = [lastGreen, tee];
    var toNextTee = [green, nextTee];
    map = new google.maps.Map(document.getElementById('map'), {
        center: fairway,
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
    var firstPath = new google.maps.Polyline({
        path: fromLastGreen,
        geodesic: true,
        strokeColor: 'white',
        strokeOpacity: 0.7,
        strokeWeight: 1.75,
        map: map
    });
    var lastPath = new google.maps.Polyline({
        path: toNextTee,
        geodesic: true,
        strokeColor: 'white',
        strokeOpacity: 0.7,
        strokeWeight: 1.75,
        map: map
    });
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(new google.maps.LatLng(green.lat, green.lng));
    bounds.extend(new google.maps.LatLng(tee.lat, tee.lng));
    map.fitBounds(bounds);
}