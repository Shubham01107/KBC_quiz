// ===============================
// KBC QUIZ - 20 QUESTIONS
// ===============================

const questions = [
    {
        question: "Who was the first Indian to win an individual Olympic gold medal?",
        options: ["Abhinav Bindra", "Neeraj Chopra", "Sushil Kumar", "Rajyavardhan Singh Rathore"],
        answer: 0
    },
    {
        question: "Which element has the atomic number 79?",
        options: ["Silver", "Gold", "Platinum", "Copper"],
        answer: 1
    },
    {
        question: "The Battle of Plassey was fought in which year?",
        options: ["1757", "1761", "1857", "1748"],
        answer: 0
    },
    {
        question: "Which is the largest desert in the world?",
        options: ["Gobi Desert", "Sahara Desert", "Arabian Desert", "Antarctic Desert"],
        answer: 3
    },
    {
        question: "Which programming language was created by James Gosling?",
        options: ["Python", "Java", "C++", "JavaScript"],
        answer: 1
    },
    {
        question: "Which Indian state has the longest coastline?",
        options: ["Tamil Nadu", "Maharashtra", "Gujarat", "Andhra Pradesh"],
        answer: 2
    },
    {
        question: "Who discovered the law of electromagnetic induction?",
        options: ["Michael Faraday", "Isaac Newton", "James Watt", "Albert Einstein"],
        answer: 0
    },
    {
        question: "Which planet has the largest number of known moons in our Solar System?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        answer: 1
    },
    {
        question: "Which article of the Indian Constitution deals with the Right to Life and Personal Liberty?",
        options: ["Article 14", "Article 19", "Article 21", "Article 32"],
        answer: 2
    },
    {
        question: "Which gas is mainly responsible for the greenhouse effect among the following?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
        answer: 1
    },
    {
        question: "Who wrote the book 'The Discovery of India'?",
        options: ["Mahatma Gandhi", "B. R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"],
        answer: 2
    },
    {
        question: "Which is the deepest ocean trench in the world?",
        options: ["Java Trench", "Tonga Trench", "Mariana Trench", "Puerto Rico Trench"],
        answer: 2
    },
    {
        question: "In computer science, what does CPU stand for?",
        options: ["Central Processing Unit", "Computer Processing Utility", "Central Program Unit", "Control Processing Unit"],
        answer: 0
    },
    {
        question: "Which Mughal emperor built the Buland Darwaza?",
        options: ["Shah Jahan", "Akbar", "Aurangzeb", "Humayun"],
        answer: 1
    },
    {
        question: "Which blood group is known as the universal donor for red blood cells?",
        options: ["AB positive", "O positive", "O negative", "AB negative"],
        answer: 2
    },
    {
        question: "Which Indian space mission successfully demonstrated a soft landing near the Moon's south polar region?",
        options: ["Chandrayaan-1", "Chandrayaan-2", "Chandrayaan-3", "Mangalyaan"],
        answer: 2
    },
    {
        question: "Who is known as the father of the Indian space programme?",
        options: ["Vikram Sarabhai", "Homi J. Bhabha", "Satish Dhawan", "A. P. J. Abdul Kalam"],
        answer: 0
    },
    {
        question: "Which mathematical constant is approximately equal to 2.718?",
        options: ["Pi", "Phi", "Euler's number", "Square root of 2"],
        answer: 2
    },
    {
        question: "Which country gifted the Statue of Liberty to the United States?",
        options: ["United Kingdom", "France", "Germany", "Italy"],
        answer: 1
    },
    {
        question: "Which is the longest river that flows entirely within India?",
        options: ["Ganga", "Godavari", "Yamuna", "Narmada"],
        answer: 1
    }
];


// ===============================
// PRIZE MONEY - 20 LEVELS
// ===============================

const prizeMoney = [
    "₹1,000",
    "₹2,000",
    "₹3,000",
    "₹5,000",
    "₹10,000",
    "₹20,000",
    "₹40,000",
    "₹80,000",
    "₹1,60,000",
    "₹3,20,000",
    "₹6,40,000",
    "₹12,50,000",
    "₹25,00,000",
    "₹50,00,000",
    "₹75,00,000",
    "₹1,00,00,000",
    "₹2,00,00,000",
    "₹3,00,00,000",
    "₹5,00,00,000",
    "₹7,00,00,000"
];


// ===============================
// VARIABLES
// ===============================

let currentQuestion = 0;
let selectedAnswer = null;
let timer;
let timeLeft = 30;

let usedFifty = false;
let usedAudience = false;
let usedPhone = false;
let usedExpert = false;


// ===============================
// GET HTML ELEMENTS
// ===============================

const questionNumber = document.getElementById("questionNumber");
const questionElement = document.getElementById("question");
const timerElement = document.getElementById("timer");

const optionButtons = [
    document.getElementById("optionA"),
    document.getElementById("optionB"),
    document.getElementById("optionC"),
    document.getElementById("optionD")
];

const lockModal = document.getElementById("lockModal");
const selectedAnswerElement = document.getElementById("selectedAnswer");

const lockYes = document.getElementById("lockYes");
const lockNo = document.getElementById("lockNo");

const resultModal = document.getElementById("resultModal");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const nextQuestion = document.getElementById("nextQuestion");

const fiftyButton = document.getElementById("fifty");
const audienceButton = document.getElementById("audience");
const phoneButton = document.getElementById("phone");
const expertButton = document.getElementById("expert");

const moneyLadder = document.getElementById("moneyLadder");


// ===============================
// CREATE 20-LEVEL MONEY LADDER
// ===============================

function createMoneyLadder() {

    moneyLadder.innerHTML = "";

    for (let i = prizeMoney.length - 1; i >= 0; i--) {

        const prize = document.createElement("div");

        prize.className = "money-level";
        prize.dataset.level = i;

        prize.textContent = `${i + 1}. ${prizeMoney[i]}`;

        moneyLadder.appendChild(prize);
    }
}


// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion() {

    clearInterval(timer);

    selectedAnswer = null;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    questionElement.textContent = current.question;


    optionButtons.forEach((button, index) => {

        button.classList.remove(
            "selected",
            "correct",
            "wrong",
            "disabled"
        );

        button.style.display = "flex";

        const text = button.querySelector("p");

        if (text) {
            text.textContent = current.options[index];
        }
    });


    updateMoneyLadder();

    startTimer();
}


// ===============================
// TIMER
// ===============================

function startTimer() {

    timeLeft = 30;

    timerElement.textContent = `⏱ ${timeLeft}`;

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = `⏱ ${timeLeft}`;

        if (timeLeft <= 10) {
            timerElement.classList.add("danger");
        }

        if (timeLeft <= 0) {

            clearInterval(timer);

            timeOut();
        }

    }, 1000);
}


// ===============================
// TIME OUT
// ===============================

function timeOut() {

    optionButtons.forEach(button => {
        button.classList.add("disabled");
    });

    resultTitle.textContent = "⏰ Time Up!";
    resultMessage.textContent =
        `Time is over. You won ${currentQuestion > 0 ? prizeMoney[currentQuestion - 1] : "₹0"}.`;

    resultModal.style.display = "flex";
}


// ===============================
// OPTION SELECTION
// ===============================

optionButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        if (button.classList.contains("disabled")) {
            return;
        }

        selectedAnswer = index;

        optionButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        const selectedText =
            questions[currentQuestion].options[index];

        selectedAnswerElement.textContent =
            `Your Answer: ${String.fromCharCode(65 + index)}. ${selectedText}`;

        lockModal.style.display = "flex";
    });
});


// ===============================
// LOCK YES
// ===============================

lockYes.addEventListener("click", () => {

    lockModal.style.display = "none";

    clearInterval(timer);

    checkAnswer();
});


// ===============================
// LOCK NO
// ===============================

lockNo.addEventListener("click", () => {

    lockModal.style.display = "none";

    selectedAnswer = null;

    optionButtons.forEach(button => {
        button.classList.remove("selected");
    });
});


// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer() {

    const correctAnswer =
        questions[currentQuestion].answer;

    optionButtons.forEach((button, index) => {

        if (index === correctAnswer) {
            button.classList.add("correct");
        }

        if (
            index === selectedAnswer &&
            selectedAnswer !== correctAnswer
        ) {
            button.classList.add("wrong");
        }

    });


    if (selectedAnswer === correctAnswer) {

        resultTitle.textContent = "🎉 Correct Answer!";

        resultMessage.textContent =
            `Congratulations! You won ${prizeMoney[currentQuestion]}.`;

        updateMoneyLadder(true);

    } else {

        resultTitle.textContent = "❌ Wrong Answer!";

        resultMessage.textContent =
            `The correct answer was ${String.fromCharCode(65 + correctAnswer)}. ${questions[currentQuestion].options[correctAnswer]}`;

        resultMessage.textContent +=
            ` You take home ${currentQuestion > 0 ? prizeMoney[currentQuestion - 1] : "₹0"}.`;
    }


    resultModal.style.display = "flex";
}


// ===============================
// NEXT QUESTION
// ===============================

nextQuestion.addEventListener("click", () => {

    resultModal.style.display = "none";

    if (
        selectedAnswer !== questions[currentQuestion].answer
    ) {
        gameOver();
        return;
    }


    currentQuestion++;

    if (currentQuestion >= questions.length) {

        winnerScreen();

    } else {

        loadQuestion();
    }
});


// ===============================
// UPDATE MONEY LADDER
// ===============================

function updateMoneyLadder(correct = false) {

    const levels =
        document.querySelectorAll(".money-level");

    levels.forEach(level => {

        level.classList.remove("active");

        const levelNumber =
            Number(level.dataset.level);

        if (levelNumber === currentQuestion) {
            level.classList.add("active");
        }
    });


    if (correct && currentQuestion > 0) {

        levels.forEach(level => {

            const levelNumber =
                Number(level.dataset.level);

            if (levelNumber === currentQuestion - 1) {
                level.classList.add("won");
            }

        });
    }
}


// ===============================
// 50:50 LIFELINE
// ===============================

fiftyButton.addEventListener("click", () => {

    if (usedFifty) return;

    usedFifty = true;

    fiftyButton.classList.add("used");

    const correctAnswer =
        questions[currentQuestion].answer;

    let wrongOptions =
        [0, 1, 2, 3].filter(index => index !== correctAnswer);

    wrongOptions =
        wrongOptions.sort(() => Math.random() - 0.5);

    wrongOptions
        .slice(0, 2)
        .forEach(index => {

            optionButtons[index].style.display = "none";
        });
});


// ===============================
// AUDIENCE POLL
// ===============================

audienceButton.addEventListener("click", () => {

    if (usedAudience) return;

    usedAudience = true;

    audienceButton.classList.add("used");

    const correct =
        questions[currentQuestion].answer;

    let percentages = [10, 10, 10, 10];

    percentages[correct] = 55;

    let remaining = 45;

    const others =
        [0, 1, 2, 3].filter(i => i !== correct);

    others.forEach((index, i) => {

        if (i === others.length - 1) {

            percentages[index] = remaining;

        } else {

            const value =
                Math.floor(Math.random() * 15) + 5;

            percentages[index] = value;

            remaining -= value;
        }
    });

    showInfoModal(
        "📊 Audience Poll",
        createPollHTML(percentages)
    );
});


// ===============================
// CREATE POLL HTML
// ===============================

function createPollHTML(percentages) {

    let html = "";

    percentages.forEach((percentage, index) => {

        html += `
            <div class="poll-row">
                <strong>${String.fromCharCode(65 + index)}</strong>
                <div class="poll-bar">
                    <div style="width:${percentage}%"></div>
                </div>
                <span>${percentage}%</span>
            </div>
        `;
    });

    return html;
}


// ===============================
// PHONE A FRIEND
// ===============================

phoneButton.addEventListener("click", () => {

    if (usedPhone) return;

    usedPhone = true;

    phoneButton.classList.add("used");

    const correct =
        questions[currentQuestion].answer;

    const answer =
        questions[currentQuestion].options[correct];

    showInfoModal(
        "📞 Phone a Friend",
        `
        <p>📱 Calling your friend...</p>
        <p>"I think the answer is <strong>${String.fromCharCode(65 + correct)}. ${answer}</strong>."</p>
        <p>Confidence: 82%</p>
        `
    );
});


// ===============================
// ASK EXPERT
// ===============================

expertButton.addEventListener("click", () => {

    if (usedExpert) return;

    usedExpert = true;

    expertButton.classList.add("used");

    const correct =
        questions[currentQuestion].answer;

    const answer =
        questions[currentQuestion].options[correct];

    showInfoModal(
        "👨‍🏫 Ask the Expert",
        `
        <p>The expert thinks carefully...</p>
        <p>According to the expert, the most likely answer is:</p>
        <h3>${String.fromCharCode(65 + correct)}. ${answer}</h3>
        `
    );
});


// ===============================
// INFO MODAL
// ===============================

function showInfoModal(title, content) {

    const existing =
        document.getElementById("infoModal");

    if (existing) {
        existing.remove();
    }

    const modal =
        document.createElement("div");

    modal.id = "infoModal";

    modal.className = "custom-modal";

    modal.innerHTML = `
        <div class="custom-modal-box">
            <h2>${title}</h2>

            <div class="info-content">
                ${content}
            </div>

            <button id="closeInfoModal">
                Continue
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    document
        .getElementById("closeInfoModal")
        .addEventListener("click", () => {

            modal.remove();
        });
}


// ===============================
// GAME OVER
// ===============================

function gameOver() {

    clearInterval(timer);

    resultModal.style.display = "none";

    const gameOverModal =
        document.createElement("div");

    gameOverModal.className = "custom-modal";

    gameOverModal.innerHTML = `
        <div class="custom-modal-box game-over-box">

            <h1>Game Over</h1>

            <h2>💰 You won</h2>

            <div class="final-money">
                ${currentQuestion > 0
                    ? prizeMoney[currentQuestion - 1]
                    : "₹0"}
            </div>

            <button id="restartGame">
                🔄 Play Again
            </button>

        </div>
    `;

    document.body.appendChild(gameOverModal);

    document
        .getElementById("restartGame")
        .addEventListener("click", () => {

            location.reload();
        });
}


// ===============================
// WINNER SCREEN
// ===============================

function winnerScreen() {

    clearInterval(timer);

    const winnerModal =
        document.createElement("div");

    winnerModal.className = "custom-modal";

    winnerModal.innerHTML = `
        <div class="custom-modal-box winner-box">

            <h1>🏆 CONGRATULATIONS! 🏆</h1>

            <h2>You completed all 20 questions!</h2>

            <div class="final-money">
                ₹7,00,00,000
            </div>

            <p>🎉 You are the ultimate Quiz Champion!</p>

            <button id="restartWinner">
                🔄 Play Again
            </button>

        </div>
    `;

    document.body.appendChild(winnerModal);

    createConfetti();

    document
        .getElementById("restartWinner")
        .addEventListener("click", () => {

            location.reload();
        });
}


// ===============================
// CONFETTI
// ===============================

function createConfetti() {

    for (let i = 0; i < 80; i++) {

        const confetti =
            document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "%";

        confetti.style.animationDelay =
            Math.random() * 3 + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}


// ===============================
// KEYBOARD SUPPORT
// ===============================

document.addEventListener("keydown", (event) => {

    const key =
        event.key.toUpperCase();

    const keyMap = {
        A: 0,
        B: 1,
        C: 2,
        D: 3
    };

    if (keyMap[key] !== undefined) {

        const index = keyMap[key];

        if (
            optionButtons[index].style.display !== "none"
        ) {

            optionButtons[index].click();
        }
    }
});


// ===============================
// EXTRA STYLES
// ===============================

const extraStyle =
document.createElement("style");

extraStyle.textContent = `

.custom-modal {

    position: fixed;
    inset: 0;

    background: rgba(0, 0, 0, 0.85);

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 9999;

    backdrop-filter: blur(8px);
}


.custom-modal-box {

    width: min(500px, 90%);

    padding: 35px;

    border-radius: 20px;

    text-align: center;

    background: #111827;

    border: 2px solid #38bdf8;

    box-shadow:
        0 0 30px rgba(56, 189, 248, 0.5);
}


.custom-modal-box h2 {

    margin-bottom: 20px;
}


.custom-modal-box button {

    margin-top: 20px;

    padding: 12px 30px;

    border: none;

    border-radius: 10px;

    cursor: pointer;

    font-weight: bold;

}


.info-content {

    margin-top: 20px;

    font-size: 18px;

    line-height: 1.6;
}


.poll-row {

    display: flex;

    align-items: center;

    gap: 10px;

    margin: 12px 0;
}


.poll-row strong {

    width: 20px;
}


.poll-bar {

    flex: 1;

    height: 18px;

    background: #374151;

    border-radius: 20px;

    overflow: hidden;
}


.poll-bar div {

    height: 100%;

    background: #38bdf8;

    border-radius: 20px;

    transition: width 1s;
}


.final-money {

    font-size: 36px;

    font-weight: bold;

    margin: 25px 0;
}


.winner-box {

    border-color: gold;

    box-shadow:
        0 0 50px rgba(255, 215, 0, 0.7);
}


.game-over-box {

    border-color: #ef4444;
}


.confetti {

    position: fixed;

    top: -20px;

    width: 10px;

    height: 10px;

    background: gold;

    z-index: 10000;

    animation: confettiFall 5s linear forwards;
}


@keyframes confettiFall {

    from {
        transform: translateY(0) rotate(0deg);
    }

    to {
        transform: translateY(110vh) rotate(720deg);
    }

}

`;

document.head.appendChild(extraStyle);


// ===============================
// START GAME
// ===============================

createMoneyLadder();

loadQuestion();