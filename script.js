var timer = 180;
var score = 0;
var currentQuestionIndex = 0;

var topScores = localStorage.topScores;
function getTopScores() {
    var topScores = localStorage.topScores;
    if (topScores == undefined) {
        return [
            {initials : "FOO", score : 1}
        ];
    }
    return JSON.parse(topScores);
}
function renderTopScores() {
    var topScores = getTopScores();
    var ul = $("<ul class='list-group'></ul>");
//     <li class="list-group-item d-flex justify-content-between align-items-center">
//     Cras justo odio
//     <span class="badge badge-primary badge-pill">14</span>
//   </li>
    for (let index = 0; index < topScores.length; index++) {
        const currentScore = topScores[index];
        var li = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>').html(currentScore.initials);
        var badge = $('<span class="badge badge-dark"></span>').html(currentScore.score);
        li.append(badge);
        ul.append(li);
    }
    $("#highScores").html("").append(ul);
}

var questions = [
    {
        question: "what is HTML?",
        options: [
            {label: "A", value: "house"},
            {label: "B", value: "metal"},
            {label: "C", value: "tool"},
            {label: "D", value: "loop"},
        ],
        correct: "C"
    },
    {
        question: "Correct is B?",
        options: [
            {label: "A", value: "A"},
            {label: "B", value: "B"},
            {label: "C", value: "C"},
            {label: "D", value: "D"},
        ],
        correct: "B"
    },
    {
        question: "Correct is B?",
        options: [
            {label: "A", value: "A"},
            {label: "B", value: "B"},
            {label: "C", value: "C"},
            {label: "D", value: "D"},
        ],
        correct: "C"
    },
    {
        question: "Correct is D?",
        options: [
            {label: "A", value: "A"},
            {label: "B", value: "B"},
            {label: "C", value: "C"},
            {label: "D", value: "D"},
        ],
        correct: "D"
    },
    {
        question: "Random words?",
        options: [
            {label: "A", value: "house"},
            {label: "B", value: "metal"},
            {label: "C", value: "tool"},
            {label: "D", value: "loop"},
        ],
        correct: "C"
    },
    {
        question: "what is the answer to the life, universe and everything else?",
        options: [
            {label: "A", value: "food"},
            {label: "B", value: "shelter"},
            {label: "C", value: "water"},
            {label: "D", value: "42"},
        ],
        correct: "D"
    }
]

function renderQuestion(){
    var question = questions[currentQuestionIndex];
    //question wiil be text newline, ul where li is option, each li is clickable
    var q = $("<p class='lead'></p>").html(question.question);
    var ul = $('<ul class="list-group-flush"></ul>');
    for (let index = 0; index < question.options.length; index++) {
        const option = question.options[index];
        var li = $('<li></li>').attr("label", option.label).attr("class", "option list-group-item").html(option.value);
        ul.append(li);
    }
    $("#question").html("").append(q).append(ul);
    $('li').on("click",answerClick);
};

function answerClick(event){
    event.preventDefault();
    var option = $(event.target).attr("label");
    var question = questions[currentQuestionIndex];
    if (option == question.correct) {
        score += 10
    } else {
        timer -= 10
    }
    displayUpdate();
    currentQuestionIndex += 1;
    if (questions[currentQuestionIndex] != undefined) {
        renderQuestion()
    } else {
        timer = 0;
        $("#question").html("");
    }
    //increment question index +1
    // check if there is another quesiton
    //if there is another question, render question
    //ELSE end game
};

function displayUpdate() {
    $("#timer").html(timer);
    $("#score").html(score);
}
var intervalId = null;
function main() {
    if (timer > 0) {
        timer -= 1;
        displayUpdate();
    } else {
        clearInterval(intervalId);
        $("#question").html("gameOver")
    }
};
displayUpdate();
renderQuestion();
renderTopScores();
intervalId = setInterval(main, 1000);