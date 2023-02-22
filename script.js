const quiz = [
    {
        question: "What does HTML stand for?",
        answers: ["Home Tool Markup Language", "Hyper Tool Markup Language", "Hyperlinks and Type Markup Language", "Hyper Text Markup language"],
        correctAnswer: 4
    },
    {
        question: " ________  is a block of code which only runs when it is called",
        answers: ["Operator", "Object", "Method", "Script"],
        correctAnswer: 3
    },
    {
        question: "Random number can be created by ______",
        answers: ["Math.random", "math.Random", "Math.floor", "math.Floor"],
        correctAnswer: 1
    },
    {
        question: "If a variable is defined outside of function, it is a ______ variable",
        answers: ["Local", "Static", "Global", "Dynamic"],
        correctAnswer: 3
    },
]

//Placeholder and  timer
let questionNumber = 0;
let seconds = 75;


const timer = document.getElementById('timer');
let timerInterval;
let temporaryMessageTimeout;


const quizHeader = document.getElementById('quiz-header');
const questions = document.getElementById('questions');
//quiz question
function setQuestion(num) {
    quizHeader.textContent = quiz[num].question;
    const answers = quiz[num].answers;
    document.getElementById('answer1').innerHTML = "1. " + answers[0]
    document.getElementById('answer2').innerHTML = "2. " + answers[1]
    document.getElementById('answer3').innerHTML = "3. " + answers[2]
    document.getElementById('answer4').innerHTML = "4. " + answers[3]
}
//adding hidden elsement to go from quiz start to questions
document.getElementById('start-button').onclick = function () {
    questions.hidden = false;
    document.getElementById('starting-section').hidden = true;
    setQuestion(0);
    timerInterval = setInterval(function () {
        timer.innerHTML = --seconds;
    }, 1000);
}
//Correct/Wrong?
function showTemporaryMessage(type){
    if(type === "correct"){
        document.getElementById('correct').hidden = false;
        document.getElementById('wrong').hidden = true;
    } else {
        document.getElementById('correct').hidden = true;
        document.getElementById('wrong').hidden = false;
    }
    document.getElementById('temp-results').hidden = false; 
    temporaryMessageTimeout = setTimeout(function () {
        document.getElementById('temp-results').hidden = true;
    }, 2000)
}
//function for checking answers and reassign time 
function answer(userAnswer) {
    clearTimeout(temporaryMessageTimeout);
    if (userAnswer === quiz[questionNumber].correctAnswer) {
        showTemporaryMessage("correct")
    } else {
        // wrong answer
        seconds -= 20;
        timer.innerHTML = seconds; 
        showTemporaryMessage("wrong")
    }

    questionNumber += 1;
    if (questionNumber < quiz.length) {
        setQuestion(questionNumber);
    } else {
        quizHeader.innerHTML = "All done";
        questions.hidden = true;
        document.getElementById('quiz-results').hidden = false;
        clearInterval(timerInterval);
        if (seconds < 0) {
            seconds = 0
        }
        document.getElementById('results').innerHTML = seconds;
    }
}

document.getElementById('answer1').onclick = function () { answer(1) };
document.getElementById('answer2').onclick = function () { answer(2) };
document.getElementById('answer3').onclick = function () { answer(3) };
document.getElementById('answer4').onclick = function () { answer(4) };

document.getElementById('submit').onclick = function () {
    let initials = document.getElementById('initials').value;
    if (!initials || initials.length > 3){
        showTemporaryMessage("wrong");
        return;
    }
    initials = initials.toUpperCase();
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    const score = { initials, seconds }
    scores.push(score);
    seconds = 0;
    scores.sort(function (a, b) {
        return b.seconds - a.seconds
    });
    localStorage.setItem("scores", JSON.stringify(scores))
    window.location.href = "./highscore.html";
};