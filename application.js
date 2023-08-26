$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  var maxNumber = 10;
  var questionType = "+";


  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
    if (score > highScore) {
      highScore = score;
    }
  };
  $('#question-type').on('change', function () {
    questionType = $(this).val();
    score = 0;
    timeLeft = 10;
    clearInterval(interval);
    interval = undefined;
    $('#score').text(score);
    $('#time-left').text(timeLeft);
    renderNewQuestion(); 
  });
  
  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  };
  
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(maxNumber);
    var num2 = randomNumberGenerator(maxNumber);
    
    if (questionType == "-") {
      num1 = Math.max(num1, num2); // Ensures num1 is greater for subtraction
      question.answer = num1 - num2;
      question.equation = String(num1) + " - " + String(num2);
    } else if (questionType == "*") {
      question.answer = num1 * num2;
      question.equation = String(num1) + " * " + String(num2);
    } else if (questionType == "/") {
      num1 = num1 * num2; // Ensures num1 is a multiple for division
      question.answer = num1 / num2;
      question.equation = String(num1) + " / " + String(num2);
    } else {
      question.answer = num1 + num2;
      question.equation = String(num1) + " + " + String(num2);
    }
  
    return question;
  };
  
  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  };
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  
  renderNewQuestion();
  
  //  to set the number limit
  var numberLimitInput = $("#number-limit");
  numberLimitInput.on('change', function () {
    maxNumber = Number(numberLimitInput.val());
  });
  
  // restart the game
  var restartButton = $("#restart-button");
  restartButton.click(function () {
    timeLeft = 10;
    score = 0;
    $("#time-left").text(timeLeft);
    $("#score").text(score);
    
    // Clear the interval
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }
    
    // Render a new question
    renderNewQuestion();
  });
  
  // show high score
  var highScoreButton = $("#high-score-button");
  highScoreButton.click(function () {
    alert("Your high score is " + highScore);
  });   
})

// OTILO !!