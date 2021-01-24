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

function renderQuestion(question){
    //question wiil be text newline, ul where li is option, each li is clickable
    var q = $("<p></p>").html(question.question);
    var ul = $("<ul></ul>");
    for (let index = 0; index < question.options.length; index++) {
        const option = question.options[index];
        var li = $("<li></li>").attr("label", option.label).attr("class", "option").html(option.value);
        ul.append(li)
    }
    $("#question").html("").append(q).append(ul)
};
renderQuestion(questions[1])