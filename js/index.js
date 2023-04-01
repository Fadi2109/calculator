function onInit() {
  console.log("ready");
}

var strHTML = "";

//keybord event listenaer
document.addEventListener("keydown", function (event) {
  if (event.key == "0") onNumberClick("0");
  else if (event.key == "1") onNumberClick("1");
  else if (event.key == "2") onNumberClick("2");
  else if (event.key == "3") onNumberClick("3");
  else if (event.key == "4") onNumberClick("4");
  else if (event.key == "5") onNumberClick("5");
  else if (event.key == "6") onNumberClick("6");
  else if (event.key == "7") onNumberClick("7");
  else if (event.key == "8") onNumberClick("8");
  else if (event.key == "9") onNumberClick("9");
  else if (event.key == ".") onNumberClick(".");
  else if (event.key == "+") onNumberClick("+");
  else if (event.key == "-") onNumberClick("-");
  else if (event.key == "*") onNumberClick("*");
  else if (event.key == "/") onNumberClick("/");
  else if (event.key == "Enter") onEqualClick();
  else if (event.key == "Backspace") onNumberClick("delEnd");
  else if (event.key == "Delete") onNumberClick("delStart");
  else if (event.key == "Escape") onNumberClick("reset");
});

function onNumberClick(num) {
  if (num === "input") {
    strHTML = document.querySelector(".inputArea");
    // num="";
    // strHTML += num;
  } else {
    switch (num) {
      case "reset":
        document.querySelector(".inputArea").innerHTML = "0";
        document.querySelector(".result").innerHTML = "";
        strHTML = "0";
        num = "0";
        break;

      case "delStart":
        strHTML = deleteFirstChar(strHTML);
        num = "";
        break;

      case "delEnd":
        strHTML = deletLastChar(strHTML);
        num = "";
        break;

      case ".":
        if (strHTML.includes(".")) num = "";
        break;

      case "+":
        if (
          strHTML[strHTML.length - 1] == "+" ||
          strHTML[strHTML.length - 1] == "-" ||
          strHTML[strHTML.length - 1] == "×" ||
          strHTML[strHTML.length - 1] == "÷"
        )
          strHTML = deletLastChar(strHTML);
        break;

      case "-":
        if (
          strHTML[strHTML.length - 1] == "+" ||
          strHTML[strHTML.length - 1] == "-" ||
          strHTML[strHTML.length - 1] == "×" ||
          strHTML[strHTML.length - 1] == "÷"
        )
          strHTML = deletLastChar(strHTML);
        break;

      case "*":
        if (
          strHTML[strHTML.length - 1] == "+" ||
          strHTML[strHTML.length - 1] == "-" ||
          strHTML[strHTML.length - 1] == "×" ||
          strHTML[strHTML.length - 1] == "÷"
        )
          strHTML = deletLastChar(strHTML);
        num = "×";
        break;

      case "/":
        if (
          strHTML[strHTML.length - 1] == "+" ||
          strHTML[strHTML.length - 1] == "-" ||
          strHTML[strHTML.length - 1] == "×" ||
          strHTML[strHTML.length - 1] == "÷"
        )
          strHTML = deletLastChar(strHTML);
        num = "÷";
        break;
    }
    // console.log({ num });
    if ((strHTML == 0 && num === ".") || strHTML === "0.") strHTML += num;
    else if (strHTML == 0 && num !== ".") strHTML = num;
    else strHTML += num;

    document.querySelector(".inputArea").innerHTML = strHTML;
  }
}

function deleteFirstChar(str) {
  return str.substring(1);
}

function deletLastChar(str) {
  return str.substring(0, str.length - 1);
}

function onEqualClick() {
  var arrNumbers = [];
  var tempNum = "";
  if (
    strHTML[strHTML.length - 1] == "+" ||
    strHTML[strHTML.length - 1] == "-" ||
    strHTML[strHTML.length - 1] == "×" ||
    strHTML[strHTML.length - 1] == "÷"
  )
    strHTML = deletLastChar(strHTML);

  // if (strHTML[strHTML.length - 1] == "t")
  //   strHTML = strHTML.substring(0, strHTML.length - 5);

  var strHTMLForResult = strHTML;
  console.log({ strHTML });
  for (let i = 0; i < strHTML.length; i++) {
    if (
      strHTML[i] == "+" ||
      strHTML[i] == "-" ||
      strHTML[i] == "×" ||
      strHTML[i] == "÷"
    ) {
      arrNumbers.push(strHTML[i]);
    } else {
      tempNum += strHTML[i];
      if (i === strHTML.length - 1) arrNumbers.push(tempNum);
      if (
        strHTML[i + 1] == "+" ||
        strHTML[i + 1] == "-" ||
        strHTML[i + 1] == "×" ||
        strHTML[i + 1] == "÷"
      ) {
        arrNumbers.push(tempNum);
        tempNum = "";
      }
    }
  }

  var flag = 0;
  for (let j = 0; j < arrNumbers.length; j++) {
    if (arrNumbers[j] == "×" || arrNumbers[j] == "÷") {
      if (arrNumbers[j] == "×") {
        arrNumbers[j - 1] = arrNumbers[j - 1] * arrNumbers[j + 1];
        arrNumbers.splice(j, 2);
        j--;
      } else if (arrNumbers[j] == "÷") {
        arrNumbers[j - 1] = arrNumbers[j - 1] / arrNumbers[j + 1];
        arrNumbers.splice(j, 2);
        j--;
      }
    } else if (flag == 1) {
      if (arrNumbers[j] == "+") {
        arrNumbers[j - 1] = +arrNumbers[j - 1] + +arrNumbers[j + 1];
        arrNumbers.splice(j, 2);
        j--;
      } else if (arrNumbers[j] == "-") {
        arrNumbers[j - 1] = arrNumbers[j - 1] - arrNumbers[j + 1];
        arrNumbers.splice(j, 2);
        j--;
      }
    }
    if (j == arrNumbers.length - 1 && flag == 0) {
      flag = 1;
      j = 0;
    } else if (j == arrNumbers.length - 1 && flag == 1) {
      break;
    }
  }

  strHTMLForResult += "=";
  strHTML = String(arrNumbers[0]);
  document.querySelector(".result").innerHTML = strHTMLForResult;
  // String(arrNumbers[0]).includes(".")
  //   ? (document.querySelector(".inputArea").value = String(
  //       arrNumbers[0].toLocaleString().toFixed(5)
  //     ))
  //   :
  document.querySelector(".inputArea").innerHTML = String(
    arrNumbers[0].toLocaleString()
  );
  console.log({ arrNumbers });
}
