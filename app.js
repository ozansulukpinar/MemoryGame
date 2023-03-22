var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var notSortedNumbers = [];
var firstClickedBoxClassName = null;
var secondClickedBoxClassName = null;
var firstClickedBoxId = 0;
var secondClickedBoxId = 0;
var firstClickedBoxValue = 0;
var secondClickedBoxValue = 0;
var partOfFirstClickedBoxName = null;
var partOfSecondClickedBoxName = null;
var numberOfMatchedPairs = 0;

giveInformation();
createNotSortedArray(true);
drawGroups(1);
drawGroups(2);

function giveInformation() {
  alert("Please match boxes from each group according to their values!");
}

function createNotSortedArray(isItFirstCall) {
  if (isItFirstCall) {
    notSortedNumbers = [];
  }

  var randomNumber = Math.floor(Math.random() * 9);
  if (!notSortedNumbers.includes(numbers[randomNumber])) {
    notSortedNumbers.push(numbers[randomNumber]);
  }

  if (notSortedNumbers.length == 9) {
    return;
  }

  createNotSortedArray(false);
}

function drawGroups(groupNumber) {
  var div = document.createElement("div");
  var table = document.createElement("table");

  var boxesClassName = "";

  if (groupNumber == 1) {
    div.setAttribute("class", "board board-left");
    table.setAttribute("id", "firstGroup");
    boxesClassName = "first box";
  } else {
    div.setAttribute("class", "board board-right");
    table.setAttribute("id", "secondGroup");
    boxesClassName = "second box";
    createNotSortedArray(true);
  }

  var count = 0;

  for (var i = 0; i < 3; i++) {
    var tr = document.createElement("tr");

    for (var j = 0; j < 3; j++) {
      var td = document.createElement("td");
      td.setAttribute("class", "" + boxesClassName);
      td.setAttribute("id", "" + notSortedNumbers[count]);
      td.setAttribute("value", "" + notSortedNumbers[count]);
      td.innerHTML = "<span>" + notSortedNumbers[count] + "</span";

      tr.appendChild(td);
      count++;
    }

    table.appendChild(tr);
  }

  div.appendChild(table);
  document.body.appendChild(div);
}

$(".box").on("click", function () {
  var boxClassName = $(this).attr("class");

  if (!boxClassName.includes("disabled")) {
    var boxId = $(this).attr("id");
    var boxValue = $(this).attr("value");

    var firstPartOfBoxClassName = boxClassName.split(" ")[0];

    if (firstClickedBoxClassName == null) {
      $("td#" + boxId + "." + firstPartOfBoxClassName + " span:first").show();
      partOfFirstClickedBoxName = firstPartOfBoxClassName;
      firstClickedBoxClassName = boxClassName;
      firstClickedBoxId = boxId;
      firstClickedBoxValue = boxValue;
    } else {
      if (boxClassName == firstClickedBoxClassName) {
        alert("You need to select a box from other group not same group!");
      } else {
        $("td#" + boxId + "." + firstPartOfBoxClassName + " span:first").show();
        partOfSecondClickedBoxName = firstPartOfBoxClassName;
        secondClickedBoxClassName = boxClassName;
        secondClickedBoxId = boxId;
        secondClickedBoxValue = boxValue;
      }
    }

    setTimeout(function () {
      if (
        firstClickedBoxClassName != null &&
        secondClickedBoxClassName != null
      ) {
        if (firstClickedBoxValue == secondClickedBoxValue) {
          numberOfMatchedPairs++;

          $("td#" + firstClickedBoxId + "." + partOfFirstClickedBoxName).css(
            "border",
            "solid 0.1px white"
          );
          $("td#" + secondClickedBoxId + "." + partOfSecondClickedBoxName).css(
            "border",
            "solid 0.1px white"
          );
          $(
            "td#" +
              firstClickedBoxId +
              "." +
              partOfFirstClickedBoxName +
              " span:first"
          ).hide();
          $(
            "td#" +
              secondClickedBoxId +
              "." +
              partOfSecondClickedBoxName +
              " span:first"
          ).hide();

          $(
            "td#" + firstClickedBoxId + "." + partOfFirstClickedBoxName
          ).addClass("disabled");
          $(
            "td#" + secondClickedBoxId + "." + partOfSecondClickedBoxName
          ).addClass("disabled");

          cleanParameters();

          setTimeout(function () {
            if (numberOfMatchedPairs == 9) {
              alert("Great! You completed it.");
              location.reload();
            }
          }, 250);
        } else {
          $(
            "td#" +
              firstClickedBoxId +
              "." +
              partOfFirstClickedBoxName +
              " span:first"
          ).hide();
          $(
            "td#" +
              secondClickedBoxId +
              "." +
              partOfSecondClickedBoxName +
              " span:first"
          ).hide();
          cleanParameters();
        }
      }
    }, 250);
  }
});

function cleanParameters() {
  firstClickedBoxClassName = null;
  secondClickedBoxClassName = null;
  firstClickedBoxId = 0;
  secondClickedBoxId = 0;
  firstClickedBoxValue = 0;
  secondClickedBoxValue = 0;
  partOfFirstClickedBoxName = null;
  partOfSecondClickedBoxName = null;
}
