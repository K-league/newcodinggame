var timer = 180;
var currentScore = 0;
var currentQuestionIndex = 0;

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
        currentScore += 10
    } else {
        timer -= 10
    }
    displayUpdate();
    currentQuestionIndex += 1;
    if (questions[currentQuestionIndex] != undefined) {
        renderQuestion()
    } else {
        timer = 0;
        main();
    }
    //increment question index +1
    // check if there is another quesiton
    //if there is another question, render question
    //ELSE end game
};

function displayUpdate() {
    $("#timer").html(timer);
    $("#currentScore").html(currentScore);
}
var intervalId = null;
function main() {
    if (timer > 0) {
        timer -= 1;
        displayUpdate();
    } else {
        clearInterval(intervalId);
        $("#question").html("gameOver");
        var topScores = getTopScores()
        var lowestScore = topScores[topScores.length -1]; // get last item in scores
        if(currentScore > lowestScore.score || topScores.length < 5) {
            $("#scorePrompt").show();
        }
    }
};
$("#scorePrompt").hide();
displayUpdate();
renderQuestion();
renderTopScores();
intervalId = setInterval(main, 1000);