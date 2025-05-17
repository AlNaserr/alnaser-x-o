
let boxes = document.querySelectorAll(".box");
const restart = document.getElementById("restart");
let turn = true; // true = X, false = O

let xScoreIndex = 1;
let oScoreIndex = 1;

const winnerPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// تفعيل النقر على المربعات
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      box.innerText = "X";
      box.style.backgroundColor = "#7fffd4";
      turn = false;
    } else {
      box.innerText = "O";
      box.style.backgroundColor = "#ff83f1";
      turn = true;
    }

    box.disabled = true;
    checkWinner();
  });
});

function checkWinner() {
  for (let pattern of winnerPattern) {
    let posval1 = boxes[pattern[0]].innerText;
    let posval2 = boxes[pattern[1]].innerText;
    let posval3 = boxes[pattern[2]].innerText;

    if (posval1 !== "" && posval2 !== "" && posval3 !== "") {
      if (posval1 === posval2 && posval2 === posval3) {
        // عرض رسالة الفوز
        document.getElementById("msg").innerHTML =`${posval1} you are winner`;

        // تلوين مربعات الفوز باللون الأخضر
        pattern.forEach(index => {
          boxes[index].style.backgroundColor = "green";
        });

        // تعطيل باقي المربعات وتلوينها لو كانت فاضية
        boxes.forEach((box) => {
          box.disabled = true;
          if (box.innerHTML === "") {
            box.style.backgroundColor = " hsl(212, 19.50%, 15.10%)";
          }
        });

        // تحديث النقاط
        const scoreX = document.getElementById("scoreX").children;
        const scoreO = document.getElementById("scoreO").children;

        if (posval1 === "X") {
          scoreX[xScoreIndex].innerText = "1";
          scoreO[oScoreIndex].innerText = "0";
        } else if (posval1 === "O") {
          scoreX[xScoreIndex].innerText = "0";
          scoreO[oScoreIndex].innerText = "1";
        }

        xScoreIndex++;
        oScoreIndex++;
      

      // إذا امتلأت النتائج
      if (xScoreIndex ===7&& oScoreIndex ===7) {
        setTimeout(declareFinalWinner, 500);
      
      }
        return;
      } 
    }
  }
  }


// إعادة تعيين اللعبة (بدون مسح النقاط)
restart.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "#080ce2";
    box.style.color = "#000";
  });
  turn = true;
});





/*

function checkWinner() {
  for (let pattern of winnerPattern) {
    let a = boxes[pattern[0]].innerText;
    let b = boxes[pattern[1]].innerText;
    let c = boxes[pattern[2]].innerText;

    if (a !== "" && a === b && b === c) {
      boxes.forEach(box => box.disabled = true);

      if (xScoreIndex < 7 && oScoreIndex < 7) {
        const scoreX = document.getElementById("scoreX").children;
        const scoreO = document.getElementById("scoreO").children;

        if (a === "X") {
          scoreX[xScoreIndex].innerText = "1";
          scoreO[oScoreIndex].innerText = "0";
        } else {
          scoreX[xScoreIndex].innerText = "0";
          scoreO[oScoreIndex].innerText = "1";
        }

        xScoreIndex++;
        oScoreIndex++;
      }

      // إذا امتلأت النتائج
      if (xScoreIndex === 7 && oScoreIndex === 7) {
        setTimeout(declareFinalWinner, 500);
      }

      return;
    }
  }
}
*/
function declareFinalWinner() {
  const scoreX = document.getElementById("scoreX").children;
  const scoreO = document.getElementById("scoreO").children;

  let xWins = 0;
  let oWins = 0;

  for (let i = 1; i < 7; i++) {
    if (scoreX[i].innerText === "1") xWins++;
    if (scoreO[i].innerText === "1") oWins++;
  }

  document.body.innerHTML = " "; // نحذف كل شيء

  const winner = xWins > oWins ? "X" : oWins > xWins ? "O" : "لا أحد";
  const message = document.createElement("h1");
  message.innerText = (winner==="X" ||winner==="O")?`${winner} الفائز هو اللاعب`:"تعادل ";
  message.style.color = winner === "X" ? "rgb(3, 252, 169)" : winner === "O" ? "rgb(226, 7, 201)" : "#000";
  message.style.textAlign = "center";
  message.style.fontSize = "2em";
  document.body.appendChild(message);

  // مفرقعات!
  createFireworks();

  // زر إعادة تشغيل
  const resetBtn = document.createElement("button");
  resetBtn.innerText = " اعادة اللعب";
  resetBtn.style.display = "block";
  resetBtn.style.margin = "20px auto";
  resetBtn.style.padding = "10px 30px";
  resetBtn.style.backgroundColor = "blue";
  resetBtn.style.fontSize = "1em";
  resetBtn.onclick = () => location.reload();
  document.body.appendChild(resetBtn);
}

// مفرقعات بسيطة باستخدام CSS
function createFireworks() {
  const style = document.createElement("style");
  style.innerHTML =` 
    .firework {
      position: absolute;
      width: 10px;
      height: 10px;
      background: gold;
      border-radius: 50%;
      animation: explode 3s ease-out forwards ;
    }

    @keyframes explode {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(10); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < 30; i++) {
    const dot = document.createElement("div");
    dot.className = "firework";
    dot.style.top =` ${Math.random() * window.innerHeight}px`;
    dot.style.left =` ${Math.random() * window.innerWidth}px`;
    document.body.appendChild(dot);
  }
}










