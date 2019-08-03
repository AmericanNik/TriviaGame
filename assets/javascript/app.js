$(document).ready(function() {
  console.log('ready');

  const question = $('#question');
  const choices = Array.from(document.getElementsByClassName("choice-text"));

  let docCorrect = $('#correct');
  let docIncorrect = $('#incorrect');
  let docQcorrect = $('#correctQuestion');
  let docQincorrect = $('#incorrectQuestion');
  let docAcorrect = $('#correctAnswer');
  let docAincorrect = $('#incorrectAnswer');
  let begin = $('#begin');
  let restart = $('#restart');

  let currentQuestion = {};
  let acceptingAnswers = false;
  let score = 0;
  let questionCounter = 0;
  let availableQuesions = [];
  let docTime = $('#time');
  let time = 30;
  let correct = 0;
  let incorrect = 0;
  let endgame = false;
  let timeout;


  let questions = [{
      question: "What year did the 13 Colonies declare indepdence from England?",
      choice1: "1776",
      choice2: "1841",
      choice3: "1727",
      choice4: "1813",
      answer: 1
    },
    {
      question: "Who was the first President of The United States of America?",
      choice1: "Thomas Jefferson",
      choice2: "Abraham Lincoln",
      choice3: "George Washington",
      choice4: "John Adams",
      answer: 3
    },
    {
      question: "When was the Constitution signed?",
      choice1: "4th July, 1776",
      choice2: "21st Febuary, 1812 ",
      choice3: "31st March, 1803",
      choice4: "21 June, 1788",
      answer: 4
    },
    {
      question: "What is the 1st amendment?",
      choice1: "Right to Privacy",
      choice2: "Freedom of Speech",
      choice3: "Women's sufferage",
      choice4: "Abolishes Slavery",
      answer: 2
    },
    {
      question: "When was the Constitution signed?",
      choice1: "4th July, 1776",
      choice2: "21st Febuary, 1812 ",
      choice3: "31st March, 1803",
      choice4: "21 June, 1788",
      answer: 4
    },
    {
      question: "How many states succeeded from the United States during the Civil War?",
      choice1: "22 States",
      choice2: "15 States",
      choice3: "8 States",
      choice4: "11 States",
      answer: 4
    },
    {
      question: "What is the 2nd Amendment?",
      choice1: "Right to bear arms",
      choice2: "Freedom of the Press",
      choice3: "Freedom to Practice Any Religion",
      choice4: "Pursuit of happiness",
      answer: 1
    },
    {
      question: "What are the 3 branches of government?",
      choice1: "Republicans, Democrats, Independents",
      choice2: "Democrats, Republicans, Executive",
      choice3: "The Senate, the House of Representatives, and the President",
      choice4: "Executive, Legislative, Judicial",
      answer: 4
    }
  ];

  //CONSTANTS
  const CORRECT_BONUS = 10;
  const MAX_QUESTIONS = 5;



  $('.aOptions').hide();
  // question.hide();
  restart.hide();

  startGame = () => {
    console.log('gameStart!  questionCounter: ' + questionCounter)
    endgame = false;
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    // clearTimeout(timeout);
    docTime.text('30');
    getNewQuestion();
    begin.hide();
    restart.hide();
  };

  getNewQuestion = () => {
    // clearTimeout(timeout);
    console.log('new Question Function Fired!  questionCounter: ' + questionCounter)
    if (endgame === false) {
      console.log('endgame False!!')
      $('.aOptions').show();
      time = 30;

    }
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS || endgame === true) {
      console.log('End Game 2 Flag! questionCounter: ' + questionCounter)
      let endgame = true;
      question.text('END GAME!');
      $('.aOptions').hide();
      restart.show();
      stopCountdown();
      clearTimeout();
      clearTimeout(countdown);
      clearTimeout(timeout);
      return false;
    }
    countdown();
    questionCounter++;
    console.log('question counter flag 1: '+ questionCounter);
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.text(currentQuestion.question);
    console.log(currentQuestion);

    choices.forEach(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
      console.log('for each loop 1 '+number);
    });

    availableQuesions.splice(questionIndex, 1);
    console.log(availableQuesions);
    acceptingAnswers = true;
  };

  choices.forEach(choice => {
    console.log('for each loop 2!'+choice)
    choice.addEventListener("click", e => {
      stopCountdown();
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];
      console.log('selected answer ' + selectedAnswer);
      console.log('Question Counter ' + questionCounter)
      console.log(selectedAnswer == currentQuestion.answer)
      if (selectedAnswer == currentQuestion.answer) {
        console.log('correct answer!')
        correct++;
        docQcorrect.prepend($('<p class="answerrr">'+currentQuestion["choice" + currentQuestion.answer]+'</p>'));
        docQcorrect.prepend($('<p>'+currentQuestion.question+'</p>'));
        docTime.text(time);
        docCorrect.text(correct);
        docIncorrect.text(incorrect);

      } else {
        docQincorrect.prepend($('<p class="answerrr">'+currentQuestion["choice" + currentQuestion.answer]+'</p>'))
        docQincorrect.prepend($('<p>'+currentQuestion.question+'</p>'));
        console.log('incorrect answer!')
        incorrect++;
        docTime.text(time);
        docCorrect.text(correct);
        docIncorrect.text(incorrect);
      }

      docTime.text('30');
      getNewQuestion();

    });
  });

  function countdown() {
    timeout = setTimeout(function() {
      time--;
      console.log('tick');
      docTime.text(time);
      docCorrect.text(correct);
      docIncorrect.text(incorrect);

      if (time === 0 || acceptingAnswers === false) {

        incorrect++;
        docQincorrect.prepend($('<p class="answerrr">'+currentQuestion["choice" + currentQuestion.answer]+'</p>'))
        docQincorrect.prepend($('<p>'+currentQuestion.question+'</p>'));
        docTime.text('30');
        getNewQuestion();
        clearTimeout(timeout);
      }
      if (endgame === true) {
        clearTimeout(timeout)
        return false;
      }
      // clearTimeout(timeout);
      countdown();
    }, 1000);
  }

  function stopCountdown(){
    clearTimeout(countdown);
    clearTimeout(timeout);
  }

 begin.on('click', function(){
     startGame();
     $('.aOptions').show();
     question.show();

 });

 restart.on('click', function(){

   docQcorrect.empty() ;
   docQincorrect.empty() ;
   docAcorrect.empty();
   docAincorrect.empty();
   correct=0;
   incorrect=0;
   docTime.text(time);
   docCorrect.text(correct);
   docIncorrect.text(incorrect);

   clearTimeout(countdown);
   clearTimeout(timeout);
   startGame();
 });



});
