// Initialize Firebase
$(document).ready(function() {
  var config = {
    apiKey: "API key goes here",
    authDomain: "logintest-f64e6.firebaseapp.com",
    databaseURL: "https://logintest-f64e6.firebaseio.com",
    projectId: "logintest-f64e6",
    storageBucket: "logintest-f64e6.appspot.com",
    messagingSenderId: "12345"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  $("#submit").on("click", function() {
    console.log("input");
    // take user input
    var trainName = $("#trainName")
      .val()
      .trim();
    var trainDest = $("#trainDest")
      .val()
      .trim();
    var trainStart = moment(
      $("#trainStart")
        .val()
        .trim(),
      "HH:mm"
    ).format("HH:mm");
    var trainFreq = $("#trainFreq")
      .val()
      .trim();

    // to create local temporary object to hold train data
    var newTrain = {
      name: trainName,
      place: trainDest,
      strain: trainStart,
      freq: trainFreq
    };
    // uploads train data to the database
    database.ref().push(newTrain);
    console.log(newTrain.name);
    // clears all the text-boxes
    $("#trainName").val("");
    $("#trainDest").val("");
    $("#trainStart").val("");
    $("#trainFreq").val("");
    // Prevents moving to new page
    return false;
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().place;
    var trainStart = childSnapshot.val().strain;
    var trainFreq = childSnapshot.val().freq;

    var firstConvert = moment(trainStart, "HH:mm");
    console.log(firstConvert);
    var currentTime = moment().format("HH:mm");
    console.log("CURRENT TIME: " + currentTime);

    var timeDifference = moment().diff(moment(firstConvert), "minutes");
    console.log(trainStart);
    var timeRemainder = timeDifference % trainFreq;
    console.log(timeRemainder);

    var minsTilTrain = trainFreq - timeRemainder;

    var nextTrn = moment()
      .add(minsTilTrain, "minutes")
      .format("HH:mm");

    $("#trainData>tbody").append(
      "<tr><td>" +
        trainName +
        "</td><td>" +
        trainDest +
        "</td><td>" +
        nextTrn +
        "</td><td>" +
        trainFreq +
        "</td><td>" +
        minsTilTrain +
        "</tr></td>"
    );
  });

  //   database.ref().on("child_added", function(snapshot) {
  //     console.log("==============");
  //     console.log(snapshot.val());
  //     console.log("==============");

  //     $(".name").prepend("<p>" + snapshot.val().empName + "</p>");
  //     $(".role").prepend("<p>" + snapshot.val().empRole + "</p>");
  //     $(".start").prepend("<p>" + snapshot.val().empStart + "</p>");
  //     $(".worked").prepend("<p>" + snapshot.val().empWorked + "</p>");
  //     $(".rate").prepend("<p>" + snapshot.val().empMonthly + "</p>");
  //     $(".total").prepend("<p>" + snapshot.val().empTotal + "</p>");
  //   });
});
