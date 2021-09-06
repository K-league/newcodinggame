function getTopScores() {
    var topScores = localStorage.topScores;
    if (topScores == undefined) {
        return [
            {initials : "FOO", score : 1}
        ];
    }
    return JSON.parse(topScores); // get a string that has an object defined in it, and make it an object
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

function recordScore() {
    var inputInitials = $("#initials").val();
    var topScores = getTopScores();
    topScores.push({initials: inputInitials, score: currentScore});
    topScores = topScores.sort(function (item, other) {
        return parseInt(other.score) - parseInt(item.score)        
    });
    topScores = topScores.slice(0, 5);
    localStorage.topScores = JSON.stringify(topScores); //get this object and transform it into a string that looks like json
    $("#scorePrompt").hide();
    renderTopScores();
}