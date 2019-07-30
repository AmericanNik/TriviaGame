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

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let docTime = $('#time');
let time = 30;
let correct = 0;
let incorrect = 0;


let questions = [
{
  question: "What year did the 13 Colonies declare indepdence from England?",
  choice1: "1776",
  choice2: "1841",
  choice3: "1727",
  choice4: "1813",
  answer: 1
},
{
  question:
    "Who was the first President of The United States of America?",
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
  choice1: "Republicans, Democrats, Indepdents",
  choice2: "Democrats, Republicans, Executive",
  choice3: "The Senate, the House of Representatives, and the President",
  choice4: "Executive, Legislative, Judicial",
  answer: 4
}
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

function timeout() {
  setTimeout(function() {
    time--;
    console.log('tick');
    docTime.text(time);
    docCorrect.text(correct);
    docIncorrect.text(incorrect);

    if (time === 0) {
      return false;
    }

    timeout();
  }, 1000);
}

startGame = () => {
timeout();
questionCounter = 0;
score = 0;
availableQuesions = [...questions];
console.log(availableQuesions);
getNewQuestion();
};

getNewQuestion = () => {
if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
  question.text('END GAME!')
  //go to the end page
  // return window.location.assign("/end.html");
}
questionCounter++;
const questionIndex = Math.floor(Math.random() * availableQuesions.length);
currentQuestion = availableQuesions[questionIndex];
question.text(currentQuestion.question);

choices.forEach(choice => {
  const number = choice.dataset["number"];
  choice.innerText = currentQuestion["choice" + number];
});

availableQuesions.splice(questionIndex, 1);
console.log(availableQuesions);
acceptingAnswers = true;
};

choices.forEach(choice => {
choice.addEventListener("click", e => {
  if (!acceptingAnswers) return;

  acceptingAnswers = false;
  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset["number"];
  console.log('selected answer '+selectedAnswer);
  console.log('Question Counter '+ questionCounter)
  console.log(selectedAnswer == currentQuestion.answer)
    if (selectedAnswer == currentQuestion.answer){
      correct++;
      docQcorrect.prepend("currentQuestion");
      docAcorrect.prepend(currentQuestion.answer);
    }else{
      incorrect++
    }
  getNewQuestion();
});
});

startGame();





  // api connect
  // $.ajax({
  //   url:
  //
  // });

});
