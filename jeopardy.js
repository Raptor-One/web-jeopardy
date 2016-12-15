/**
 * Created by philip on 2016-11-08.
 */
var numberOfColumns = 0;
var numberOfRows = 0;
var moduleDictionary = {};
var moduleValues = [];
var categoryNames = [];


function loadGameFromText(id) {

    resetValues();

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(document.getElementById(id).value,"text/xml");
    var gameBoard = xmlDoc.getElementsByTagName("game-board")[0];


    var points = gameBoard.getElementsByTagName("points");

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

        var rowCount = 0;
        for(var r = 0; r < modules.length; r++)
        {
            rowCount++;
            moduleDictionary[(c+1)+''+(r+1)] = { "a": modules[r].getElementsByTagName("answer")[0].innerHTML.replace(/\n\s\s+/g, ' '), "q": modules[r].getElementsByTagName("question")[0].innerHTML.replace(/\n\s\s+/g, ' ')};
        }

        if(numberOfRows == 0)
        {
            numberOfRows = rowCount;
        }
        else if (numberOfRows != rowCount)
        {
            logError("number of rows is not them same in each column");
            return;
        }


    }

    if(categoryNames.length != numberOfColumns)
    {
        logError("number of money values is not them same as the number of columns");
        return;
    }
    else if (Object.keys(moduleDictionary).length != numberOfColumns*numberOfRows)
    {
        logError("number of rows is not them same in each column");
        return;
    }
    else {
        generateTableData();
        resizeTable();
        window.addEventListener('resize', resizeTable);
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

    for(var r = 0; r < numberOfRows; r++)
    {
        var tableRow = document.createElement("TR");

        for(var c = 0; c < numberOfColumns; c++)
        {
            var module = document.createElement("TD");
            module.className = "money";
            module.innerHTML = moduleValues[r];
            module.id = (c+1)+""+(r+1);
            module.setAttribute("a", moduleDictionary[(c+1)+""+(r+1)].a.toUpperCase());
            module.addEventListener("click", function () {
                document.getElementById("game-board-outer-div").style.display = 'none';
                document.getElementById("question-outer-div").style.display = 'block';
                document.getElementById("clue-text").innerHTML = this.getAttribute("a");
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
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var table = document.getElementById("game-board");

    var width;
    var height;

    if((numberOfColumns*26)/((numberOfRows+1)*15) < viewportWidth/viewportHeight)
    {
        height = (viewportHeight/(numberOfRows+1))-((numberOfRows+1)*12-2);
        width = height*(26/15);
        table.style.height = "100%";
    }
    else
    {
        width = (viewportWidth/numberOfColumns)-(numberOfColumns*12);
        height = width*(15/26);
        table.style.height = "initial";
    }

    var modules = table.getElementsByTagName("td");

    for(var i = 0; i < modules.length; i++)
    {
        modules[i].width = width+"px";
        modules[i].height = height+"px";
    }

    for(var r = 0; r < numberOfRows; r++)
    {
        var textDimensions = getWidthOfText(moduleValues[r], "ITCkorinna", 100);
        var fontSize;
        if(textDimensions.w/textDimensions.h < width/height)
        {
            fontSize = height;
        }
        else
        {
            fontSize = textDimensions.h /textDimensions.w * width
        }

        for(var c = 0; c < numberOfColumns; c++)
        {
            var elem = document.getElementById((c+1)+""+(r+1));
            elem.style.fontSize = fontSize - (fontSize*0.1)+"px";
            var shadow = fontSize*0.05;
            elem.style.textShadow = shadow + "px "+ shadow + "px #04050D";

        }
    }

}

window.getWidthOfText = function(txt, fontname, fontsize){
    // Create dummy span
    this.e = document.createElement('span');
    // Set font-size
    this.e.style.fontSize = fontsize;
    // Set font-face / font-family
    this.e.style.fontFamily = fontname;
    // Set text
    this.e.innerHTML = txt;
    document.body.appendChild(this.e);
    // Get width NOW, since the dummy span is about to be removed from the document
    var w = this.e.offsetWidth;
    var h = this.e.offsetHeight;
    // Cleanup
    document.body.removeChild(this.e);
    // All right, we're done
    return {w:w,h:h};
}

function logError(msg) {

    console.warn(msg);

}

function resetValues(){
    numberOfColumns = 0;
    numberOfRows = 0;
    moduleDictionary = {};
    moduleValues = [];
    categoryNames = [];
}

