var playAdd = 0; //Retains the number of players listed so the add player or remove player adjusts the correct scorecard row.
var firstHoles = true; //Placeholder for the front/back toggle button.
var courseLength = 0; //Placeholder that is set by the JSON holes array, determines if 9 or 18 hole course.
var editNum = 0; //Set on player name edit start, retains player number that is being edited so the finish edit can run properly.
//On load, shows the course selection modal and disables the confirm/close on the modal until the 5 digit course ID is entered.
$(window).load(function () {
    $('courseSetConfirm').prop('diabled', true);
    $('#setupCourse').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
});
//Set to prevent mousewheel from changing the number on the score inputs.
$(':input[type=number]').on('mousewheel', function (e) {
    e.preventDefault();
});
//Runs when initializing the scorecard, new course is chosen, scorecard is reset, or last player is removed (same as a reset).
function hideYardRows() {
    $('#blackTee').css('display', 'none');
    $('#blueTee').css('display', 'none');
    $('#whiteTee').css('display', 'none');
    $('#redTee').css('display', 'none');
    $('#toggle').css('display', 'none');
}
//Runs when the Full option is selected, available after the course is set or the card is reset.
//Displays the toggle front/back button, displays the Player setup section, disables the Full/Front/Back options.
//Starts with the front nine holes showing, includes the Total columns.
function setFull() {
    $('#toggle').css('display', 'inline-block');
    $('.frontNine').css('display', 'table-cell');
    $('.backNine').css('display', 'none');
    $('.playerSetup').css('display', 'inline-block');
    $('.playerSetup').prop('disabled', false);
    $('.holeSetup').prop('disabled', true);
}
//Runs when the Front 9 option is selected, available after the course is set or the card is reset.
//Displays the Player setup section, disables the Full/Front/Back options.
//Hides the total columns, relies on the Out/In for totals.
function setFrontNine() {
    $('.frontNine').css('display', 'table-cell');
    $('.backNine').css('display', 'none');
    $('.columnTotal').css('display', 'none');
    $('.playerSetup').css('display', 'inline-block');
    $('.playerSetup').prop('disabled', false);
    $('.holeSetup').prop('disabled', true);
}
//Runs when the Back 9 option is selected, available after the course is set or the card is reset.
//Displays the Player setup section, disables the Full/Front/Back options.
//Hides the total columns, relies on the Out/In for totals.
function setBackNine() {
    $('.backNine').css('display', 'table-cell');
    $('.frontNine').css('display', 'none');
    $('.columnTotal').css('display', 'none');
    $('.playerSetup').css('display', 'inline-block');
    $('.playerSetup').prop('disabled', false);
    $('.holeSetup').prop('disabled', true);
}
//Runs automatically if the selected course only has 9 holes, not a full 18.
//Hides Out, replaces with Total columns.
//Skips the Full/Front/Back section of setup modal, goes straight to Player setup.
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
//Allows the toggle button to switch the displayed columns from front to back (as many times as desired).
//Only shows if the user has the Full course selected.
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
//Displays the desired number of player setup (name/tee) rows based on the number of players selected.
//Disables the player number options so the function cannot be run multiple times.
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
//Runs when the tee is selected for Player 1, enables button to allow game to start.
function activateStart() {
    $('#modalConfirm').prop('disabled', false)
}
//As it says, starts the game. Runs when the setup modal is complete (last step adding a tee for at least Player 1).
//Hides the modal sections so the user will step through same every time (cannot skip to Player entry).
//Sets up the scorecard with player names and displays only the selected tee information.
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
//Runs when the Add Player button is clicked, opens modal and finds the player number to adjust correct row.
function startAddPlayer() {
    $('#newPlayer').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    $('#player' + (playAdd + 1)).css('display', 'table-row');
}
//Actually adds the player after information set.
//Disables the Add Player if max reached, sets name, shows tee row (if not already displayed).
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
//Runs when the player name td is clicked, opens modal to accept the new name.
function startEditPlayerName(n) {
    $('#editPlayer').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    document.getElementById("editPlayerEntry").value = document.getElementById("player" + n + "name").innerHTML;
    editNum = n;
}
//Finishes the player name edit (actually adjusts the name), using the editNum stored in the startEditPlayerName function.
function finishEditPlayerName() {
    document.getElementById("player" + editNum + "name").innerHTML = document.getElementById("editPlayerEntry").value;
    $('#editPlayer').modal('hide');
}
//Removes the last player row and reduces playAdd to verify next one added is same as removed (cannot skip player row).
//Resets all scores and totals, removes name, hides row.
//If it was the last player that is removed, functions same as reset card - prompts for hole count, etc.
function removePlayer() {
        $('#player' + playAdd).css('display', 'none');
        document.getElementById("player" + playAdd + "name").innerHTML = "Player" + playAdd;
        for (var i = 1; i < 19; i++) {
            document.getElementById("play" + playAdd + "hole" + i).value = "";
        }
        document.getElementById("play" + playAdd + "holeF9").innerHTML = "";
        document.getElementById("play" + playAdd + "holeB9").innerHTML = "";
        document.getElementById("play" + playAdd + "Total").innerHTML = "";
        document.getElementById("play" + playAdd + "OverUnder").innerHTML = "";

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
//Runs when course is set, just finds Par values and populates the Par row.
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
//Runs when the course is set.
//Finds the available tee information, sets yardage values for each tee row.
//Hides any tee from the player's tee choices if yardage not available.
//Also checks for handicap information and populates / displays handicap row if available.
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
//Same as previous function, but pulls the course information without going into the holes.
//Sets front 9 / back 9 / full yardage totals for the available tees.
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
//Runs when a new course is selected to clear the available tee list on player select and hide all rows so only the new selected tees display.
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
//Runs on score entry blur, calculates front 9, back 9, and full course totals.
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
//Run on score entry blur as part of calcScore, compares the par for entered holes with the entered amount and displays running +/- total.
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
//Opens modal to display winner's name based on lowest score as well as comments for individual performance.
//Can be run at any time, did not set it to run when all scores filled in and did not disable the option until all scores were entered.
//Also checks if there is only one player or if there was a tie and changes winner text based on those results.
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
//Removes all players, resets all scores, and hides all tee rows.
//Starts a new game on the same course, automatically opens setup modal to start the next round.
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
//Resets everything and opens the course select modal - functions the same as opening or refreshing the page.
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
//Does not allow the manually entered course ID to be run in the getCourse function unless it meets the length requirement (5 digits).
function checkValid() {
    var toVerify = document.getElementById("courseIDEntry").value;
    if (toVerify.length == 5) {
        $('#courseSetConfirm').prop('disabled', false);
    }
    else if (toVerify.length != 5) {
        $('#courseSetConfirm').prop('disabled', true);
    }
}
//Pulls the entered course ID and runs the getCourse with that ID.
//Only runs for the manually entered ID, the buttons skip this function and run getCourse with a predefined parameter.
function setCourseID() {
    var setID = +document.getElementById("courseIDEntry").value;
    getCourse(setID);
}
//Setup the swingbyswing api.
var clientID = "b0967d81-8cd6-4469-9f41-2aaecb1f08d3";
var accessToken, model, map;
var redirectURI = document.URL;
var authUrl = "https://api.swingbyswing.com/v2/oauth/authorize?scope=read&redirect_uri=" + encodeURI(redirectURI) + "&response_type=token&client_id=" + clientID;
accessToken = getUrlVars().access_token;
if (accessToken == null) {
    location.replace(authUrl);
}
else {
    accessToken = accessToken.replace("\n", "");
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        });
    return vars;
}
//This does most of the work.
//Sets up the JSON to pull the par, yards, handicap, and hole/tee locations.
//Checks for course ID to exist, stays on the course select modal and displays error if it does not.
//Runs multiple setup functions (including setPar, getYard, getYardTotals) and sets up next modal (with onlyNine if necessary).
//Establishes location for the map.
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
//Creates the map, centered on the clubhouse location from the JSON.
//Sets map properties that I want (hide UI, Satellite, no scrollwheel zoom).
//Marker is default, only use custom for the holes (tee and green).
function initMap(myLatLng) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        scrollwheel: false,
        disableDefaultUI: true
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "Clubhouse"
    });
}
//Runs when a hole number, par, yardage, or handicap td is clicked.
//Centers map on fairway (halfway between tee and green).
//Custom markers, ball on tee for tee - flag for green.
//Sets bounds on the tee/green to establish zoom for the map.
//Polylines show the path from green to tee from previous hole and to next hole (starting and ending with clubhouse).
//Rubric note:
//Did not accomplish the map adjustment for each tee type/color. Every tee row will pull the same tee location and will not adjust the map for the different yardages.
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
