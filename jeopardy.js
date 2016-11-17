/**
 * Created by philip on 2016-11-08.
 */
var NUMBER_OF_COLUMNS = 1;
var NUMBER_OF_ROWS = 1;
var moduleDictionary = {};


function loadGameFromText(id) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(document.getElementById(id).value,"text/xml");

    var categories = xmlDoc.getElementsByTagName("category");

    if (categories.length == NUMBER_OF_COLUMNS)
    {
        var documentCategories = document.getElementsByClassName("cat");

        for(var c = 0; c < categories.length; c++)
        {
            documentCategories[c].innerHTML = categories[c].getElementsByTagName("name")[0].innerHTML.replace(/\s\s+/g, ' ');

            var modules = categories[c].getElementsByTagName("module");

            if (modules.length == NUMBER_OF_ROWS)
            {
                for(var r = 0; r < modules.length; r++)
                {
                    moduleDictionary[{c: c, r: r}] = { a: modules[r].getElementsByTagName("answer")[0].innerHTML.replace(/\s\s+/g, ' '), q: modules[r].getElementsByTagName("question")[0].innerHTML.replace(/\s\s+/g, ' ')};
                }
            }
        }
    }

    if(Object.keys(moduleDictionary).length == NUMBER_OF_COLUMNS*NUMBER_OF_ROWS)
    {
        activateEventListeners();
        document.getElementById("info-text").innerHTML = "Game Board has been loaded :)";
    }
}

function activateEventListeners() {
    var modules = document.getElementsByClassName("money");

    for(var i = 0; i < modules.length; i++)
    {
        modules[i].addEventListener("click", function () {
            document.getElementById("game-board-outer-div").style.display = 'none';
            document.getElementById("question-outer-div").style.display = 'block';
            document.getElementById("info-text").innerHTML = moduleDictionary[{c: this.id.charAt(1), r: this.id.charAt(3)}].a;
            document.addEventListener("dblclick", returnToGameBoard);
        })
    }

}

function returnToGameBoard() {
    document.getElementById("game-board-outer-div").style.display = 'block';
    document.getElementById("question-outer-div").style.display = 'none';
    document.removeEventListener("dblclick", returnToGameBoard);
}

