/**
 * Created by philip on 2016-11-08.
 */
var NUMBER_OF_COLUMNS = 6;
var NUMBER_OF_ROWS = 5;
var moduleDictionary = {};


function loadGameFromText(id) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(document.getElementById(id).value,"text/xml");

    var categories = xmlDoc.getElementsByTagName("category");

    if (categories.length == NUMBER_OF_COLUMNS)
    {
        for(var c = 0; c < categories.length; c++)
        {
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

    if(Object.keys(moduleDictionary).length == 1)
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
        })
    }

}
