$(document).ready(function() {

  console.log('ready');
  //hooks into document
  let time = 30;
  let docTime = $('#time');
  let docQuestion = $('#question');
  let docChoices = Array.from($('.choice-text'));
  let selectedQuestion = {};
  let userAnswer = true;
  let score = 0;
  let gameCounter = 0;
  let questionBank = [{
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  }, {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  }, {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }];

  console.log(docChoices)



  gameStart = function(){
    questionCounter = 0;
    score = 0;
    availableQuestions = questionBank;
    console.log(availableQuestions);
    timeout();
    loadQuestion();
  };

  loadQuestion= function(){
    questionCounter++;
    let questionIndex = Math.floor(Math.random()*availableQuestions.length);
    selectedQuestion = availableQuestions[questionIndex];
    docQuestion.text(selectedQuestion.question);
    docChoices.forEach( function(){
      const number = choice.dataset['number'];
      docChoices.text(selectedQuestion['choice' + number]);
    });
  };
  // Countdown

  function timeout() {
    setTimeout(function() {
      time--;
      console.log('tick');
      docTime.text(time);

      if (time === 0) {
        return false;
      }

      timeout();
    }, 1000);
  }

  gameStart();

  // api connect
  // $.ajax({
  //   url:
  //
  // });

});
