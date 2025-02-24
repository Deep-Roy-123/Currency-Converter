let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#resetBtn")
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container")
let msg=document.querySelector("#msg");


let turnO=true; //PlayerX,PlayerY
let count=0;
//winning pattern
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//for reset game
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){//playerO
            box.innerText="O";
            turnO=false;
        }else{//playerX
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        count++;

        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    })
})


const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulations,winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

////for check the winner
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val==pos2val && pos2val==pos3val){
                console.log("Winner..!");
                console.log(`Winner ${pos1val}`)
                showWinner(pos1val);
            }else{
                if(count==9){
                    console.log("Match Draw")
                }
            }
        }

    }
}

//for draw a game
const gameDraw=()=>{
    msg.innerText="Match Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}


newGameBtn.addEventListener("click",resetGame)
resetBtn.addEventListener("click",resetGame)
