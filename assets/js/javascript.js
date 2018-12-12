// Initialize Firebase
$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyBgUcIoo1YqvalGCRYgDpVqiPK-Hxldeu8",
    authDomain: "logintest-f64e6.firebaseapp.com",
    databaseURL: "https://logintest-f64e6.firebaseio.com",
    projectId: "logintest-f64e6",
    storageBucket: "logintest-f64e6.appspot.com",
    messagingSenderId: "1035191972409"
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
