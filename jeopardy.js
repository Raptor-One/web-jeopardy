/**
 * Created by philip on 2016-11-08.
 */
var numberOfColumns = 0;
var numberOfRows = [];
var moduleDictionary = {};


function loadGameFromText(id) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(document.getElementById(id).value,"text/xml");

    var categories = xmlDoc.getElementsByTagName("category");

    var documentCategories = document.getElementsByClassName("cat");

    for(var c = 0; c < categories.length; c++)
    {

        numberOfColumns++;
        documentCategories[c].innerHTML = categories[c].getElementsByTagName("name")[0].innerHTML.replace(/\n\s\s+/g, ' ');

        var modules = categories[c].getElementsByTagName("module");

        for(var r = 0; r < modules.length; r++)
        {
            numberOfRows[c] = r +1  ;
            moduleDictionary[(c+1)+''+(r+1)] = { "a": modules[r].getElementsByTagName("answer")[0].innerHTML.replace(/\n\s\s+/g, ' '), "q": modules[r].getElementsByTagName("question")[0].innerHTML.replace(/\n\s\s+/g, ' ')};
        }
    }

    if(Object.keys(moduleDictionary).length == numberOfRows*numberOfRows[0])
    {
        activateEventListeners();
        document.getElementById("info-text").innerHTML = "Game Board has been loaded :)";
    }
    else {
        logError("number of rows is not them sam in each column");
        return;
    }
}

function activateEventListeners() {
    var modules = document.getElementsByClassName("money");

    for(var i = 0; i < modules.length; i++)
    {
        modules[i].addEventListener("click", function () {
            document.getElementById("game-board-outer-div").style.display = 'none';
            document.getElementById("question-outer-div").style.display = 'block';
            document.getElementById("info-text").innerHTML = moduleDictionary[this.id.charAt(1)+''+this.id.charAt(3)].a;
            document.addEventListener("dblclick", returnToGameBoard);
        })
    }

}

function returnToGameBoard() {
    document.getElementById("intro-div").style.display = 'none';
    document.getElementById("game-board-outer-div").style.display = 'block';
    document.getElementById("question-outer-div").style.display = 'none';
    document.removeEventListener("dblclick", returnToGameBoard);
}

function loadTextFromFile(elem){

    if (!window.FileReader) {
        alert('Your browser is not supported');
        return false;
    }
    var input = elem;

    // Create a reader object
    var reader = new FileReader();
    if (input.files.length) {
        var textFile = input.files[0];
        // Read the file
        reader.readAsText(textFile);
        reader.addEventListener('load', function(t){
            document.getElementById("game-input").innerHTML = t.target.result;
        });
    }
}

function resizeTable() {
    var viewportWidth = document.body.clientWidth;
    var viewportHeight = document.body.clientHeight;



}

function logError(msg) {

    console.warn(msg);

}

