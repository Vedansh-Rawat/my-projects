let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgame = document.querySelector("#newgame");
let msgcont = document.querySelector(".msg")
let msg = document.querySelector("#msg")
let turnO = true;

const winPatt = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const reset = () => {
    turnO = true;
    enableBoxes();
    msgcont.classList.add("hide");
}

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        console.log("Box was clicked!");
        if (turnO === true){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
})

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgcont.classList.remove("hide");
    disableBoxes();
}

const tie = () => {
    msg.innerText = "Its a Tie!";
    msgcont.classList.remove("hide");
    disableBoxes();
}
const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winPatt) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner!", pos1val);
                showWinner(pos1val);
                winnerFound = true;
            }
        }
    }

    if (!winnerFound){
        let filled = true;
        boxes.forEach((box) => {
            if (box.innerText === "") {
                filled = false;
            }
        });
        if (filled) {
            console.log("Its a tie :(");
            tie();
        }
    }
    }



newgame.addEventListener("click", reset);
resetbtn.addEventListener("click", reset);