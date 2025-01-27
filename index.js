const displayHist = document.querySelector(".display-history");
const display = document.querySelector(".display-input");
const displayTemp = document.querySelector(".display-tempresult");

const nums = document.querySelectorAll(".nums");
const operators = document.querySelectorAll(".operators");
const clear = document.querySelector(".clear");
const ce = document.querySelector(".entity_c");
const equal = document.querySelector(".equal");

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

nums.forEach((num) => {
    num.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            console.log(e.target.innerText)
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            console.log("sudah")
            reeturn;
        }
        dis2Num += e.target.innerText
        display.innerText = dis2Num
    })
});

operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        if (!dis2Num) {
            return;
        }
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation()
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName)
        lastOperation = operationName
    })
})

function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    displayHist.innerText = dis1Num;
    display.innerText = "";
    dis2Num = "";
    displayTemp.innerText = result;
}

function mathOperation() {
    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equal.addEventListener("click", () => {
    if (!dis1Num || !dis2Num) {
        return;
    }
    haveDot = false;
    mathOperation();
    clearVar();
    display.innerText = result;
    displayTemp.innerText = "";
    dis2Num = result;
    dis1Num = "";
})

clear.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    haveDot = false;
    displayHist.innerText = "";
    display.innerText = "";
    displayTemp.innerText = "";
    result = null;
    lastOperation = "";
})

ce.addEventListener("click", () => {
    display.innerText = "";
    dis2Num = "";
})

window.addEventListener("keydown", (e) =>{
    if (e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9"
    ) {
        clickButton(e.key);
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
        clickOperator(e.key);
    } else if (e.key === "*") {
        clickOperator("x");
    } else if (e.key === "Enter" || e.key === "=") {
        clickEqual();
    } else if (e.key === "Backspace") {
        clickClear();
    } else if (e.key === "Delete") {
        clickClearAll();
    }
})

function clickButton(key) {
    nums.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOperator(key) {
    operators.forEach((operator) => {
        if (operator.innerText === key) {
            operator.click();
        }
    })
}

function clickEqual() {
    equal.click();
}

function clickClear() {
    ce.click();
}

function clickClearAll() {
    clear.click();
}