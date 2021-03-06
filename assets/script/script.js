$(document).ready(function () {

   //creating empty variables
   var category = "";
   var difficulty = "";
   var possiblePoints = 0;
   var userScore = 0;
   var gameTime = 150;
   var correctAnswer = "";
   var userName;

   // creating empty array
   var game = [];

   // selecting html elements
   var startPageDiv = $("#start-page")
   var timerSpan = $("#timerValue")
   var userScoreDiv = $("#user-score-div")
   var gameSectionDiv = $("#game-section")
   var questionAnswerDiv = $("#question-answer-section")
   var gameOverDiv = $("#game-over")
   var userScoreFinalDiv = $("#user-score-final")
   var questionDiv = $("#question-text")
   var answerBtn1 = $("#answer-1")
   var answerBtn2 = $("#answer-2")
   var answerBtn3 = $("#answer-3")
   var answerBtn4 = $("#answer-4")
   var clearButton = $("#clear-button");

   // adding sounds to variables using the Howler library

   var correctAnswerSound = new Howl({
      src: ["./assets/mp3s/correct-answer.mp3"],
      volume: 0.7,
   })
   var wrongAnswerSound = new Howl({
      src: ["./assets/mp3s/wrong-answer.mp3"],
      volume: 0.7,
   })
   var loseGameSound = new Howl({
      src: ["./assets/mp3s/game-over-lose.mp3"],
      volume: 0.7,
   })
   var winGameSound = new Howl({
      src: ["./assets/mp3s/game-over-win.mp3"],
      volume: 0.7,
   })
   var gameplayMusic = new Howl({
      src: ["./assets/mp3s/game-play-music.mp3"],
      loop: true,
      volume: 0.5,
   })
   var questionSelectSound = new Howl({
      src: ["./assets/mp3s/swoosh.mp3"]
   })


   function highScorePage() {
      // store localStorage into arrays

      gameDisplay = localStorage.getItem("games");
      gameDisplay = JSON.parse(gameDisplay);

      //function to sort scores in descending
      function orderScores() {
         if (gameDisplay != null) {
            gameDisplay.sort(function (a, b) {
               return parseInt(b.score) - parseInt(a.score);
            });
         }
      }

      orderScores();

      // display scores
      if (gameDisplay != null) {
         console.log(gameDisplay);
         for (var i = 0; i < gameDisplay.length; i++) {

            // =====Varibles=====
            var scoreTBody = $(".scores-tbody")
            var row = $("<tr>");
            var nameColumn = $("<td>");
            var scoreColumn = $("<td>");
            var dateColumn = $("<td>");

            nameColumn.text(gameDisplay[i].user);
            row.append(nameColumn);

            scoreColumn.text(gameDisplay[i].score);
            row.append(scoreColumn);

            dateColumn.text(gameDisplay[i].date);
            row.append(dateColumn);

            scoreTBody.append(row);

         }
      }

      // Hide clear button when localStorage is empty
      else {
         clearButton.css("display", "none");
      }
      // clear localStorage
      clearButton.on('click', function () {
         localStorage.clear();
         location.reload();
      });


   }

   // starting Oage function
   function startingPage() {

      // =====Variables=====
      var startButton = $("#start-button")

      gameSectionDiv.fadeIn(250)
      setTimeout(function () { startPageDiv.fadeIn(500) }, 150)

      startButton.click(function (element) {
         element.preventDefault();

         // =====Varibles=====
         userName = $("#user-name").val();
         console.log(userName);

         // Prevents user from leaving input blank
         if (userName.trim() === "") {
            $("#myForm :input").prop("disabled", true);
            var notificationDiv = $("<div>");
            notificationDiv.attr("class", "notification");
            notificationDiv.text("Please enter a name, do not leave blank!");

            var exitButton = $("<button>");
            exitButton.attr("class", "delete");

            notificationDiv.append(exitButton);
            startPageDiv.append(notificationDiv);

            exitButton.click(function () {
               notificationDiv.css("display", "none");
               $("#myForm :input").prop("disabled", false);
            })
            // start game 
         } else {

            startPageDiv.fadeOut(250)

            //start timer 
            startTimer();

            // play game music
            gameplayMusic.play();


            // store user name in varible
            var nameHeader = $("#name-header");
            nameHeader.text("Good Luck " + userName + "!");
         }
      });

   }

   // setting intitial value of timerSpan to gameTime
   timerSpan.text("Timer: " + gameTime)

   function generateQuestion(event) {
      event.preventDefault();

      questionSelectSound.play();

      var thisButton = $(this);
      var thisButtonData = thisButton.attr("data-game");

      console.log(thisButton.attr("data-game"));

      // this switch statement determines the URL that we're going to use in the API
      switch (thisButtonData) {
         case "easy-music":
            category = "12";
            difficulty = "easy";
            possiblePoints = 100;
            break;
         case "medium-music":
            category = "12";
            difficulty = "medium";
            possiblePoints = 300;
            break;
         case "hard-music":
            category = "12";
            difficulty = "hard";
            possiblePoints = 500;
            break;
         case "easy-film":
            category = "11";
            difficulty = "easy";
            possiblePoints = 100;
            break;
         case "medium-film":
            category = "11";
            difficulty = "medium";
            possiblePoints = 300;
            break;
         case "hard-film":
            category = "11";
            difficulty = "hard";
            possiblePoints = 500;
            break;
         case "easy-celebs":
            category = "26";
            difficulty = "easy";
            possiblePoints = 100;
            break;
         case "medium-celebs":
            category = "26";
            difficulty = "medium";
            possiblePoints = 300;
            break;
         case "hard-celebs":
            category = "26";
            difficulty = "hard";
            possiblePoints = 500;
            break;
         case "easy-tv":
            category = "14";
            difficulty = "easy";
            possiblePoints = 100;
            break;
         case "medium-tv":
            category = "14";
            difficulty = "medium";
            possiblePoints = 300;
            break;
         case "hard-tv":
            category = "14";
            difficulty = "hard";
            possiblePoints = 500;
            break;
         case "easy-cartoon":
            category = "32";
            difficulty = "easy";
            possiblePoints = 100;
            break;
         case "medium-cartoon":
            category = "32";
            difficulty = "medium";
            possiblePoints = 300;
            break;
         case "hard-cartoon":
            category = "32";
            difficulty = "hard";
            possiblePoints = 500;
            break;
         case "easy-books":
            category = "10";
            difficulty = "easy";
            possiblePoints = 100;
            break;
         case "medium-books":
            category = "10";
            difficulty = "medium";
            possiblePoints = 300;
            break;
         default:
            category = "10";
            difficulty = "hard";
            possiblePoints = 500;
      }

      console.log(category);
      console.log(difficulty);

      // query URL for the AJAX call
      var queryURL = "https://opentdb.com/api.php?amount=1&category=" + category + "&difficulty=" + difficulty + "&type=multiple";

      console.log(queryURL);

      $.ajax({
         url: queryURL,
         method: "GET"
      }).then(
         function (response) {

            // getting the question from the AJAX call
            var question = response.results[0].question;

            // creating an empty array variable for the incorrec answers
            var possibleAnswers = [];

            // storing the correct answer in a variable. going to use this variable later in a comparison to say 'if value of the button pressed by the user === correctAnswer, take this action, else, take this action
            correctAnswer = response.results[0].correct_answer;
            console.log(correctAnswer)

            // looping through the object to push the incorrect answers into an array
            for (var i = 0; i < response.results[0].incorrect_answers.length; i++) {
               possibleAnswers.push(response.results[0].incorrect_answers[i]);
            }
            // adding correct answer to the array
            possibleAnswers.push(correctAnswer)

            // randomize possible answers - got this from w3schools
            possibleAnswers.sort(function (a, b) { return 0.5 - Math.random() });

            // adding values to HTML elements
            questionDiv.html(question)
            answerBtn1.html(possibleAnswers[0]);
            answerBtn2.html(possibleAnswers[1]);
            answerBtn3.html(possibleAnswers[2]);
            answerBtn4.html(possibleAnswers[3]);

            gameSectionDiv.fadeOut(150)
            setTimeout(function () { questionAnswerDiv.fadeIn(150) }, 150)

            // this is where we'll have to collect the user's choice of answer and compare that to the correctAnswer variable
            $(".answer-option").on("click", function (event) {
               event.preventDefault();

               var thisAnswer = $(this)
               if (thisAnswer.text() === correctAnswer) {
                  correctAnswerSound.play();
                  userScore = userScore + possiblePoints;
                  userScoreDiv.text(userScore)
               } else {
                  wrongAnswerSound.play();
                  userScore = userScore - possiblePoints;
                  userScoreDiv.text(userScore)
               }

               // fade out, fade in
               questionAnswerDiv.fadeOut(150);

               setTimeout(function () {
                  gameSectionDiv.fadeIn(150);
                  gameSectionDiv.attr("style", "margin: auto")
               }, 150);

               // hide the button that was selected 
               thisButton.css("display", "none");
               questionAnswerDiv.fadeOut(150);
               setTimeout(function () { gameSectionDiv.fadeIn(150) }, 150);

               // reset margin            

               // reset point to 0
               possiblePoints = 0;
            })
         }
      )
   }

   function startTimer() {
      $(".game-category").on("click", generateQuestion);
      var timerInterval = setInterval(function () {
         gameTime--;
         timerSpan.text("Timer: " + gameTime);

         // this is where we set the end of the game
         if (gameTime <= 0) {
            clearInterval(timerInterval)

            userScoreFinalDiv.text("Your score: " + userScore)

            let user = userName;
            let score = userScore;

            var currentDate = moment().format('L LT');
            let date = currentDate;

            // store scores into localStorage
            game = JSON.parse(localStorage.getItem("games") || "[]");
            game.push({ user: user, score: score, date: date });
            localStorage.setItem("games", JSON.stringify(game));

            gameSectionDiv.fadeOut(150);
            questionAnswerDiv.fadeOut(150);

            setTimeout(function () {
               gameSectionDiv.fadeOut(150);
               questionAnswerDiv.fadeOut(150);
            }, 150)

            gameSectionDiv.css("display", "none");
            questionAnswerDiv.css("display", "none");

            setTimeout(function () { gameOverDiv.fadeIn(150) }, 150)

            // =====Varibles=====
            var winGiphyURL = "https://api.giphy.com/v1/gifs/search?api_key=u9OvLuwupZYRbeoXLfTbguCAA1Z6E3Lk&q=win&limit=25&offset=0&rating=PG-13&lang=en";
            var loseGiphyURL = "https://api.giphy.com/v1/gifs/search?api_key=u9OvLuwupZYRbeoXLfTbguCAA1Z6E3Lk&q=lose&limit=25&offset=0&rating=PG-13&lang=en";

            if (userScore > 0) {
               // Giphy Ajax call
               $.ajax({
                  url: winGiphyURL,
                  method: "GET"
               }).then(function (giphyData) {
                  console.log(giphyData);

                  // create elements to append giphy to
                  var giphyDiv = $("#giphy-div");
                  var giphy = $("<img>");
                  // pick a giphy at random from the giphyData array
                  giphy.attr("src", giphyData.data[Math.floor(Math.random() * 25)].images.fixed_height.url);
                  giphyDiv.append(giphy);

               });

               gameplayMusic.stop();
               winGameSound.play();
            }

            else {
               // Giphy Ajax call
               $.ajax({
                  url: loseGiphyURL,
                  method: "GET"
               }).then(function (giphyData) {
                  console.log(giphyData);

                  // create elements to append giphy to
                  var giphyDiv = $("#giphy-div");
                  var giphy = $("<img>");
                  // pick a giphy at random from the giphyData array
                  giphy.attr("src", giphyData.data[Math.floor(Math.random() * 25)].images.fixed_height.url);
                  giphy.attr("class", "giphyImg");
                  giphyDiv.append(giphy);
               });

               gameplayMusic.stop();
               loseGameSound.play();
            }
         }

      }, 1000)
   }

   // highscore page
   highScorePage();

   // start game 
   startingPage();

   // mobile responsiveness click for the menu
   $(".navbar-burger").click(function () {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

   });
});
