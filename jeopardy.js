/**
 * Created by philip on 2016-11-08.
 */
var numberOfColumns = 0;
var numberOfRows = [];
var moduleDictionary = {};
var moduleValues = [];
var categoryNames = [];


function loadGameFromText(id) {

    resetValues();

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(document.getElementById(id).value,"text/xml");
    var gameBoard = xmlDoc.getElementsByTagName("game-board")[0];


    var points = gameBoard.getElementsByTagName("money");

    for(var p = 0; p < points.length; p++)
    {
        moduleValues[p] = points[p].innerHTML.replace(/\n\s\s+/g, ' ');
    }

    var categories = gameBoard.getElementsByTagName("category");

    for(var c = 0; c < categories.length; c++)
    {

        numberOfColumns++;
        categoryNames[c] = categories[c].getElementsByTagName("name")[0].innerHTML.replace(/\n\s\s+/g, ' ');

        var modules = categories[c].getElementsByTagName("module");

        for(var r = 0; r < modules.length; r++)
        {
            numberOfRows[c] = r +1  ;
            moduleDictionary[(c+1)+''+(r+1)] = { "a": modules[r].getElementsByTagName("answer")[0].innerHTML.replace(/\n\s\s+/g, ' '), "q": modules[r].getElementsByTagName("question")[0].innerHTML.replace(/\n\s\s+/g, ' ')};
        }
    }

    if(categoryNames.length != numberOfColumns)
    {
        logError("number of money values is not them same as the number of columns");
        return;
    }
    else if (Object.keys(moduleDictionary).length != numberOfColumns*numberOfRows[0])
    {
        logError("number of rows is not them same in each column");
        return;
    }
    else {
        generateTableData();
        document.getElementById("info-text").innerHTML = "Game Board has been loaded :)";
    }
}

function startGame(){
    document.getElementById("intro-div").style.display = "none";
    document.getElementById("game-board-outer-div").style.display = "block";

}

function generateTableData() {

    var tableBody = document.getElementById("game-board").getElementsByTagName("tbody")[0];

    var tableRow = document.createElement("TR");

    for(var c = 0; c < numberOfColumns; c++) {
        var cat = document.createElement("TD");
        cat.className = "cat";
        cat.innerHTML = categoryNames[c].toUpperCase();

        tableRow.appendChild(cat);
    }

    tableBody.appendChild(tableRow);

    for(var r = 0; r < numberOfColumns; r++)
    {
        var tableRow = document.createElement("TR");

        for(var c = 0; c < numberOfColumns; c++)
        {
            var module = document.createElement("TD");
            module.className = "money";
            module.innerHTML = moduleValues[r];
            module.addEventListener("click", function () {
                document.getElementById("game-board-outer-div").style.display = 'none';
                document.getElementById("question-outer-div").style.display = 'block';
                document.getElementById("clue-text").innerHTML = moduleDictionary[(c)+""+(r)].a.toUpperCase();
                document.addEventListener("dblclick", returnToGameBoard);});

            tableRow.appendChild(module);

        }

        tableBody.appendChild(tableRow);
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

function resetValues(){
    numberOfColumns = 0;
    numberOfRows = [];
    moduleDictionary = {};
    moduleValues = [];
    categoryNames = [];
}

