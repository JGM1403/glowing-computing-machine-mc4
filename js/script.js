//Global variables
var welcomeMessageEl = document.querySelector("#welcome");
var questionsContainerEl = document.querySelector("#questions-container");
var questionTextEl = document.querySelector("#question");
var currentScoreEl = document.querySelector("#current-score");
var highscoresEl = document.querySelector("#highscore");
var highscoreDisplayEl = document.querySelector("#highscores-display");
var highscoreButtonEl = document.querySelector("#highscore-button");
var clearHighscoreEl = document.querySelector("#clear-highscore");
var returnHighscoreEl = document.querySelector("#return-highscore");

// Variables for score form and initials input
var initialsAndScoreEl = document.querySelector("#initials-and-score");
var initialsFormEl = document.querySelector("#initials-form");
var initialsInputEl = document.querySelector("#initials-input");

// Timer variable
var timerEl = document.querySelector("#time-left");

// start button variable
var startButtonEl = document.querySelector("#start-button");

// question and answers array
var questions = {
    0: ["Question 1: What data type is shown?, (1,2,3,4)", "A) Number", "B) String ", "C) Boolean ", "D) None of the above"],
    1: ["Question 2: DOM stands for", "A) Document Object Mobile", "B) Documented Operations Model", "C) Document Object Model", "D) None of the above"],
    2: ["Question 3: Which method allows you to set the attributes of an HTML element?", "A) .setAttr()", "B) .setAttribute()", "C) .getAttribute()", "D) .selectAttribute()"],
    3: ["Question 4: How do you call a funtion?", "A) By calling the function by its name", "B) By runing callfunction()", "C) By running startfunction()", "D) i dont know"],
    4: ["Question 5: Which method allows you to add data to local storage?", "A) .localStorage()", "B) localStorage.addItem()", "C) localStorage.appendItem()", "D) localStorage.setItem()"]
};

// Array holding correct answers
var answers = ["A) Number", "C) Document Object Model", "B) .setAttribute()", "A) By calling the function by its name", "D) localStorage.setItem()"];

var options = {
    1: document.querySelector("#option1"),
    2: document.querySelector("#option2"),
    3: document.querySelector("#option3"),
    4: document.querySelector("#option4")
};

// Variables for timer
var timer;
var timeLeft = 0;
var score;
var questionCount;
var correctAnswer;

function init()
{
    initialsAndScoreEl.hidden = true;

    highscoresEl.hidden = true;

    startButtonEl.addEventListener("click", startQuiz);

    highscoreButtonEl.addEventListener("click", viewHighscore);
}

// Shows user highscores and scores saved to local storage
function viewHighscore()
{
    var quizCount = JSON.parse(localStorage.getItem("Quiz Count"));

    if (quizCount === null)
    {
        window.alert("No quiz scores recorded");

        return;
    }


    else
    {
        startButtonEl.hidden = true;
        highscoresEl.hidden = false;
        highscoreButtonEl.hidden = true;

        for (var i = 1; i < quizCount + 1; i++)
        {
            var quizResults = JSON.parse(localStorage.getItem("Initials and Score " + i));

            var initialsScoreDisplayEl = document.createElement("div");
            initialsScoreDisplayEl.textContent = "Initials: " + quizResults.initials + " - Score: " + quizResults.score + "%";
            highscoreDisplayEl.appendChild(initialsScoreDisplayEl);
        }

        clearHighscoreEl.addEventListener("click", function()
        {
            // Delete local storage

            for (var i = 1; i < quizCount + 1; i++)
            {
                localStorage.removeItem("Initials and Score " + i);
            }

            localStorage.removeItem("Quiz Count");

            highscoresEl.hidden = true;
            highscoreButtonEl.hidden = false;
            startButtonEl.hidden = false;

            return;
        });

        returnHighscoreEl.addEventListener("click", function()
        {
            highscoresEl.hidden = true;
            highscoreButtonEl.hidden = false;
            startButtonEl.hidden = false;

            location.reload();

            return;
        });
    }
}

function getQuizCount()
{

    var quizCount = JSON.parse(localStorage.getItem("Quiz Count"));
    
    if (quizCount === null)
    {
        return 0;
    }

    else
    {
        return parseInt(quizCount);
    }
}

function saveResults()
{
    clearInterval(timer);

    timerEl.textContent = "";

    initialsAndScoreEl.hidden = false;

    initialsFormEl.addEventListener("submit", function(event)
    {
        event.preventDefault();

        var quizCount = getQuizCount();

        quizCount++;

        var initialsAndScore = {
            initials: initialsInputEl.value.trim(),
            score: score
        };

        localStorage.setItem("Initials and Score " + quizCount, JSON.stringify(initialsAndScore));

        localStorage.setItem("Quiz Count", JSON.stringify(quizCount));

        initialsAndScoreEl.hidden = true;
        welcomeMessageEl.hidden = false;

        location.reload();
    });
}

function quizComplete()
{
    clearQuestion();

    window.alert("Quiz complete");
    window.alert("Your score was: " + score + "%");

    saveResults();
}

function noTimeLeft()
{
    window.alert("Sorry, you ran out of time");

    quizComplete();
}

function startTimer()
{
    timer = setInterval(function()
    {
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds left";
       
        if (timeLeft <= 0)
        {
            clearInterval(timer);
            timeLeft = 0;
            noTimeLeft();
        }
    }, 1000);
}

//adds to score if correct answer is chosen
function answerSelection()
{

    options[1].addEventListener("click", function()
        {
            if (questions[questionCount][1] === correctAnswer)
            {
                score += 20;

                window.alert("Correct!");
            }
            else
            {
                timeLeft -= 20;

                window.alert("Incorrect");
            }

            questionCount++;

            clearQuestion();

            displayQuestions();
        });

        options[2].addEventListener("click", function()
        {
            if (questions[questionCount][2] === correctAnswer)
            {
                score += 20;

                window.alert("Correct!");
            }
            else
            {
                timeLeft -= 20;

                window.alert("Incorrect");
            }
    
            questionCount++;

            clearQuestion();

            displayQuestions();
        });

        options[3].addEventListener("click", function()
        {
            if (questions[questionCount][3] === correctAnswer)
            {
                score += 20;

                window.alert("Correct!");
            }
            else
            {
                timeLeft -= 20;

                window.alert("Incorrect");
            }

            questionCount++;

            clearQuestion();

            displayQuestions();
        });

        options[4].addEventListener("click", function()
        {
            if (questions[questionCount][4] === correctAnswer)
            {
                score += 20;

                window.alert("Correct!");
            }
            else
            {
                timeLeft -= 20;

                window.alert("Incorrect");
            }

            questionCount++;

            clearQuestion();

            displayQuestions();
        });
}

function clearQuestion()
{
    questionTextEl.textContent = "";
    
    for (var i = 1; i < Object.keys(questions).length; i++)
    {
        options[i].textContent = "";
    }

    currentScoreEl.textContent = "";
}

function displayQuestions()
{
    correctAnswer = answers[questionCount];

    if (questionCount >= Object.keys(questions).length)
    {
        quizComplete();
        return;
    }

    else
    {
        questionTextEl.textContent = questions[questionCount][0];

        for (var i = 1; i < Object.keys(options).length + 1; i++)
        {
            var answer = options[i];

            answer.textContent = questions[questionCount][i];
        }

        currentScoreEl.textContent = "Current score: " + score + "%";

        return;
    }
}

// calls and starts quiz by calling all needed functions
function startQuiz()
{
    score = 0;
    timeLeft = 120;
    timerEl.textContent = timeLeft + " seconds left";
    questionCount = 0;

    welcomeMessageEl.hidden = true;
    
    startTimer();
    displayQuestions();
    answerSelection();
}

init();