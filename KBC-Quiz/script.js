// ==========================================
// KBC QUIZ - COMPLETE JAVASCRIPT
// 100% HTML + CSS + JavaScript
// ==========================================


// ==========================================
// QUESTIONS
// ==========================================

const questions = [

    {
        question: "Who is known as the Father of the Nation in India?",
        options: [
            "Jawaharlal Nehru",
            "Sardar Patel",
            "Mahatma Gandhi",
            "Subhash Chandra Bose"
        ],
        answer: 2
    },

    {
        question: "Which planet is known as the Red Planet?",
        options: [
            "Earth",
            "Mars",
            "Jupiter",
            "Venus"
        ],
        answer: 1
    },

    {
        question: "Who wrote the Indian National Anthem?",
        options: [
            "Rabindranath Tagore",
            "Bankim Chandra Chattopadhyay",
            "Sarojini Naidu",
            "Subhash Chandra Bose"
        ],
        answer: 0
    },

    {
        question: "Which is the largest ocean in the world?",
        options: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Arctic Ocean",
            "Pacific Ocean"
        ],
        answer: 3
    },

    {
        question: "How many players are there in a cricket team?",
        options: [
            "9",
            "11",
            "10",
            "12"
        ],
        answer: 1
    },

    {
        question: "Which gas is most abundant in Earth's atmosphere?",
        options: [
            "Oxygen",
            "Carbon Dioxide",
            "Nitrogen",
            "Hydrogen"
        ],
        answer: 2
    },

    {
        question: "Which is the smallest prime number?",
        options: [
            "2",
            "1",
            "3",
            "0"
        ],
        answer: 0
    },

    {
        question: "Which Indian city is known as the Pink City?",
        options: [
            "Udaipur",
            "Jodhpur",
            "Jaipur",
            "Bikaner"
        ],
        answer: 2
    },

    {
        question: "What is the chemical symbol for Gold?",
        options: [
            "Ag",
            "Au",
            "Fe",
            "Gd"
        ],
        answer: 1
    },

    {
        question: "Which is the longest river in India?",
        options: [
            "Yamuna",
            "Godavari",
            "Narmada",
            "Ganga"
        ],
        answer: 3
    }

];


// ==========================================
// PRIZE MONEY
// ==========================================

const prizeMoney = [
    "₹1,000",
    "₹5,000",
    "₹10,000",
    "₹20,000",
    "₹40,000",
    "₹80,000",
    "₹1,60,000",
    "₹3,20,000",
    "₹5,00,000",
    "₹10,00,000"
];


// ==========================================
// GAME VARIABLES
// ==========================================

let currentQuestion = 0;
let selectedOption = null;
let timer = 30;
let timerInterval = null;

let fiftyUsed = false;
let audienceUsed = false;
let phoneUsed = false;
let expertUsed = false;

let gameLocked = false;


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const questionElement = document.getElementById("question");
const questionNumberElement = document.getElementById("questionNumber");
const timerElement = document.getElementById("timer");

const optionButtons = [
    document.getElementById("optionA"),
    document.getElementById("optionB"),
    document.getElementById("optionC"),
    document.getElementById("optionD")
];

const optionLabels = ["A", "B", "C", "D"];

const fiftyButton = document.getElementById("fifty");
const audienceButton = document.getElementById("audience");
const phoneButton = document.getElementById("phone");
const expertButton = document.getElementById("expert");

const lockModal = document.getElementById("lockModal");
const selectedAnswerElement = document.getElementById("selectedAnswer");

const lockYes = document.getElementById("lockYes");
const lockNo = document.getElementById("lockNo");

const resultModal = document.getElementById("resultModal");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const nextQuestionButton = document.getElementById("nextQuestion");

const moneyLadder = document.getElementById("moneyLadder");


// ==========================================
// CREATE EXTRA STYLES FOR JAVASCRIPT MODALS
// ==========================================

const extraStyles = document.createElement("style");

extraStyles.innerHTML = `

    .js-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 20, 0.82);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeInJS 0.3s ease;
    }

    .js-card {
        width: min(520px, 90%);
        background:
            linear-gradient(145deg, #101f52, #060d27);
        border: 2px solid #2196ff;
        border-radius: 25px;
        padding: 30px;
        text-align: center;
        box-shadow:
            0 0 30px rgba(0, 153, 255, 0.35),
            0 0 80px rgba(0, 80, 255, 0.15);
        animation: popupJS 0.4s ease;
        color: white;
    }

    .js-card h2 {
        margin-bottom: 15px;
        color: #ffd700;
        font-size: 28px;
    }

    .js-card p {
        color: #dbe7ff;
        line-height: 1.6;
    }

    .js-close {
        margin-top: 22px;
        border: none;
        padding: 12px 28px;
        border-radius: 25px;
        background: linear-gradient(90deg, #006eff, #00b7ff);
        color: white;
        font-weight: bold;
        cursor: pointer;
        font-size: 16px;
    }

    .poll-container {
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        height: 210px;
        margin-top: 20px;
    }

    .poll-item {
        width: 18%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .poll-bar {
        width: 100%;
        max-width: 55px;
        min-height: 20px;
        background: linear-gradient(to top, #007bff, #00d4ff);
        border-radius: 8px 8px 0 0;
        box-shadow: 0 0 15px rgba(0, 174, 255, 0.6);
        transition: height 1s ease;
    }

    .poll-percent {
        color: #ffd700;
        font-weight: bold;
    }

    .phone-circle {
        width: 90px;
        height: 90px;
        margin: 10px auto 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        background: #061b45;
        border: 3px solid #00aaff;
        box-shadow: 0 0 25px rgba(0, 170, 255, 0.6);
        animation: phonePulseJS 1.2s infinite;
    }

    .expert-avatar {
        width: 90px;
        height: 90px;
        margin: 5px auto 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 42px;
        background: linear-gradient(145deg, #302070, #091a48);
        border: 3px solid #b56cff;
        box-shadow: 0 0 25px rgba(181, 108, 255, 0.6);
    }

    .lifeline-used {
        opacity: 0.35 !important;
        pointer-events: none !important;
        filter: grayscale(1);
    }

    .option-hidden {
        opacity: 0.12 !important;
        pointer-events: none !important;
        transform: scale(0.96);
    }

    .option-selected {
        background: linear-gradient(
            90deg,
            rgba(255, 166, 0, 0.95),
            rgba(255, 208, 0, 0.65)
        ) !important;

        border-color: #ffd700 !important;
        box-shadow: 0 0 25px rgba(255, 215, 0, 0.7) !important;
    }

    .option-correct {
        background: linear-gradient(
            90deg,
            #087f35,
            #14c45d
        ) !important;

        border-color: #36ff82 !important;
        box-shadow: 0 0 30px rgba(30, 255, 110, 0.8) !important;
        animation: correctJS 0.6s ease;
    }

    .option-wrong {
        background: linear-gradient(
            90deg,
            #8a1010,
            #e01c1c
        ) !important;

        border-color: #ff4141 !important;
        box-shadow: 0 0 30px rgba(255, 50, 50, 0.8) !important;
        animation: wrongJS 0.5s ease;
    }

    .money-active {
        transform: scale(1.08);
        background: linear-gradient(
            90deg,
            #ffd700,
            #ff9d00
        ) !important;
        color: #06102b !important;
        border-radius: 8px;
        padding: 5px 10px;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
    }

    .money-won {
        color: #55ff9a !important;
    }

    .winner-screen h1 {
        font-size: 42px;
        color: #ffd700;
        margin-bottom: 15px;
    }

    .winner-money {
        font-size: 40px;
        color: #55ff9a;
        font-weight: 900;
        margin: 20px 0;
        text-shadow: 0 0 20px rgba(85,255,154,0.7);
    }

    .restart-btn {
        margin-top: 15px;
        padding: 14px 35px;
        border: none;
        border-radius: 30px;
        background: linear-gradient(90deg, #ffb000, #ffd700);
        color: #10152f;
        font-size: 17px;
        font-weight: 900;
        cursor: pointer;
    }

    .confetti-piece {
        position: fixed;
        top: -20px;
        width: 9px;
        height: 16px;
        z-index: 10001;
        animation: confettiFall 3s linear forwards;
    }

    @keyframes fadeInJS {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes popupJS {
        from {
            opacity: 0;
            transform: scale(0.7) translateY(30px);
        }

        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes correctJS {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.04); }
    }

    @keyframes wrongJS {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }

    @keyframes phonePulseJS {
        0%, 100% {
            box-shadow: 0 0 20px rgba(0,170,255,0.5);
        }

        50% {
            box-shadow: 0 0 45px rgba(0,170,255,1);
        }
    }

    @keyframes confettiFall {
        to {
            transform:
                translateY(110vh)
                rotate(720deg);
            opacity: 0;
        }
    }

`;

document.head.appendChild(extraStyles);


// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    clearInterval(timerInterval);

    selectedOption = null;
    gameLocked = false;

    const current = questions[currentQuestion];

    // Question number
    questionNumberElement.textContent = currentQuestion + 1;

    // Question
    questionElement.textContent = current.question;

    // Options
    optionButtons.forEach((button, index) => {

        button.classList.remove(
            "option-selected",
            "option-correct",
            "option-wrong",
            "option-hidden"
        );

        button.disabled = false;

        const textElement = button.querySelector("p");

        if (textElement) {
            textElement.textContent = current.options[index];
        }
    });

    // Update prize ladder
    updatePrizeLadder();

    // Reset timer
    startTimer();
}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    clearInterval(timerInterval);

    timer = 30;
    timerElement.textContent = timer;

    timerInterval = setInterval(() => {

        timer--;

        timerElement.textContent = timer;

        if (timer <= 10) {
            timerElement.style.color = "#ff4141";
        } else {
            timerElement.style.color = "";
        }

        if (timer <= 0) {

            clearInterval(timerInterval);

            timeUp();

        }

    }, 1000);
}


// ==========================================
// TIME UP
// ==========================================

function timeUp() {

    if (gameLocked) return;

    gameLocked = true;

    optionButtons.forEach(button => {
        button.disabled = true;
    });

    showResult(
        "TIME UP!",
        "Your 30 seconds are over.",
        false
    );
}


// ==========================================
// OPTION CLICK
// ==========================================

optionButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        if (gameLocked) return;

        selectedOption = index;

        // Remove old selection
        optionButtons.forEach(btn => {
            btn.classList.remove("option-selected");
        });

        // Highlight selected option
        button.classList.add("option-selected");

        // Show selected answer
        selectedAnswerElement.textContent =
            `${optionLabels[index]}. ${questions[currentQuestion].options[index]}`;

        // Open lock modal
        lockModal.style.display = "flex";
    });

});


// ==========================================
// LOCK NO
// ==========================================

lockNo.addEventListener("click", () => {

    lockModal.style.display = "none";

    selectedOption = null;

    optionButtons.forEach(button => {
        button.classList.remove("option-selected");
    });

});


// ==========================================
// LOCK YES
// ==========================================

lockYes.addEventListener("click", () => {

    if (selectedOption === null) return;

    lockModal.style.display = "none";

    gameLocked = true;

    clearInterval(timerInterval);

    optionButtons.forEach(button => {
        button.disabled = true;
    });

    // Small dramatic delay
    setTimeout(() => {

        const correctAnswer =
            questions[currentQuestion].answer;

        if (selectedOption === correctAnswer) {

            optionButtons[selectedOption]
                .classList.remove("option-selected");

            optionButtons[selectedOption]
                .classList.add("option-correct");

            showResult(
                "CORRECT! 🎉",
                `Excellent! You have won ${prizeMoney[currentQuestion]}.`,
                true
            );

        } else {

            optionButtons[selectedOption]
                .classList.remove("option-selected");

            optionButtons[selectedOption]
                .classList.add("option-wrong");

            optionButtons[correctAnswer]
                .classList.add("option-correct");

            showResult(
                "WRONG ANSWER! ❌",
                `The correct answer was ${optionLabels[correctAnswer]}. ${questions[currentQuestion].options[correctAnswer]}`,
                false
            );

        }

    }, 800);

});


// ==========================================
// RESULT MODAL
// ==========================================

function showResult(title, message, correct) {

    resultTitle.textContent = title;
    resultMessage.textContent = message;

    if (correct) {

        nextQuestionButton.textContent =
            currentQuestion === questions.length - 1
                ? "🏆 See Final Result"
                : "Next Question ➜";

    } else {

        nextQuestionButton.textContent =
            "Finish Game";

    }

    resultModal.style.display = "flex";
}


// ==========================================
// NEXT QUESTION
// ==========================================

nextQuestionButton.addEventListener("click", () => {

    resultModal.style.display = "none";

    const correctAnswer =
        questions[currentQuestion].answer;

    // If answer was wrong
    if (selectedOption !== correctAnswer) {

        gameOver(
            currentQuestion > 0
                ? prizeMoney[currentQuestion - 1]
                : "₹0"
        );

        return;
    }

    // Last question
    if (currentQuestion === questions.length - 1) {

        winnerScreen();

        return;
    }

    currentQuestion++;

    loadQuestion();

});


// ==========================================
// UPDATE PRIZE LADDER
// ==========================================

function updatePrizeLadder() {

    const moneyItems =
        moneyLadder.querySelectorAll("div");

    moneyItems.forEach((item, index) => {

        item.classList.remove(
            "money-active",
            "money-won"
        );

    });

    /*
       HTML ladder is displayed from highest to lowest.
       Therefore we map the current prize accordingly.
    */

    const reversedIndex =
        prizeMoney.length - 1 - currentQuestion;

    if (moneyItems[reversedIndex]) {

        moneyItems[reversedIndex]
            .classList.add("money-active");

    }
}


// ==========================================
// 50 : 50 LIFELINE
// ==========================================

fiftyButton.addEventListener("click", () => {

    if (fiftyUsed || gameLocked) return;

    fiftyUsed = true;

    fiftyButton.classList.add("lifeline-used");

    const correctAnswer =
        questions[currentQuestion].answer;

    let wrongOptions = [];

    for (let i = 0; i < 4; i++) {

        if (i !== correctAnswer) {
            wrongOptions.push(i);
        }

    }

    // Shuffle wrong answers
    wrongOptions.sort(() => Math.random() - 0.5);

    // Remove two wrong answers
    const removeThese =
        wrongOptions.slice(0, 2);

    removeThese.forEach(index => {

        optionButtons[index]
            .classList.add("option-hidden");

        optionButtons[index].disabled = true;

    });

});


// ==========================================
// AUDIENCE POLL
// ==========================================

audienceButton.addEventListener("click", () => {

    if (audienceUsed || gameLocked) return;

    audienceUsed = true;

    audienceButton.classList.add("lifeline-used");

    const correctAnswer =
        questions[currentQuestion].answer;

    // Generate realistic-looking percentages
    let percentages = [0, 0, 0, 0];

    let correctPercentage =
        Math.floor(Math.random() * 21) + 55;

    percentages[correctAnswer] =
        correctPercentage;

    let remaining =
        100 - correctPercentage;

    let firstWrong =
        Math.floor(Math.random() * (remaining + 1));

    let secondWrong =
        Math.floor(Math.random() *
            (remaining - firstWrong + 1));

    let thirdWrong =
        remaining - firstWrong - secondWrong;

    let wrongIndexes =
        [0, 1, 2, 3].filter(
            i => i !== correctAnswer
        );

    percentages[wrongIndexes[0]] = firstWrong;
    percentages[wrongIndexes[1]] = secondWrong;
    percentages[wrongIndexes[2]] = thirdWrong;

    const overlay = createOverlay();

    overlay.innerHTML = `

        <div class="js-card">

            <h2>👥 Audience Poll</h2>

            <p>
                The audience has voted!
            </p>

            <div class="poll-container">

                ${percentages.map((percent, index) => `

                    <div class="poll-item">

                        <div class="poll-percent">
                            ${percent}%
                        </div>

                        <div
                            class="poll-bar"
                            style="height:${Math.max(percent * 1.5, 20)}px"
                        ></div>

                        <strong>
                            ${optionLabels[index]}
                        </strong>

                    </div>

                `).join("")}

            </div>

            <button class="js-close">
                Continue
            </button>

        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".js-close")
        .addEventListener("click", () => {

            overlay.remove();

        });

});


// ==========================================
// PHONE A FRIEND
// ==========================================

phoneButton.addEventListener("click", () => {

    if (phoneUsed || gameLocked) return;

    phoneUsed = true;

    phoneButton.classList.add("lifeline-used");

    const correctAnswer =
        questions[currentQuestion].answer;

    const friendAnswers = [

        `I think the answer is ${optionLabels[correctAnswer]}. I'm quite confident about it!`,

        `Hmm... I'm almost sure it's ${optionLabels[correctAnswer]}.`,

        `Yes, go with ${optionLabels[correctAnswer]}. That's my answer!`

    ];

    const randomAnswer =
        friendAnswers[
            Math.floor(Math.random() * friendAnswers.length)
        ];

    const overlay = createOverlay();

    overlay.innerHTML = `

        <div class="js-card">

            <div class="phone-circle">
                📞
            </div>

            <h2>Calling Friend...</h2>

            <p>
                📱 Connected to your friend
            </p>

            <p style="
                margin-top:20px;
                font-size:18px;
                color:#ffffff;
            ">
                "${randomAnswer}"
            </p>

            <button class="js-close">
                End Call
            </button>

        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".js-close")
        .addEventListener("click", () => {

            overlay.remove();

        });

});


// ==========================================
// ASK THE EXPERT
// ==========================================

expertButton.addEventListener("click", () => {

    if (expertUsed || gameLocked) return;

    expertUsed = true;

    expertButton.classList.add("lifeline-used");

    const correctAnswer =
        questions[currentQuestion].answer;

    const confidence =
        Math.floor(Math.random() * 16) + 80;

    const overlay = createOverlay();

    overlay.innerHTML = `

        <div class="js-card">

            <div class="expert-avatar">
                🧠
            </div>

            <h2>Ask the Expert</h2>

            <p>
                <strong>Expert's Analysis</strong>
            </p>

            <p style="
                font-size:18px;
                margin-top:15px;
            ">
                Based on my knowledge, I believe the
                correct answer is:
            </p>

            <p style="
                color:#55ff9a;
                font-size:24px;
                font-weight:900;
                margin:20px 0;
            ">
                ${optionLabels[correctAnswer]}.
                ${questions[currentQuestion].options[correctAnswer]}
            </p>

            <p>
                Confidence Level: ${confidence}%
            </p>

            <button class="js-close">
                Continue
            </button>

        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".js-close")
        .addEventListener("click", () => {

            overlay.remove();

        });

});


// ==========================================
// CREATE OVERLAY
// ==========================================

function createOverlay() {

    const overlay =
        document.createElement("div");

    overlay.className = "js-overlay";

    return overlay;
}


// ==========================================
// GAME OVER
// ==========================================

function gameOver(amount) {

    clearInterval(timerInterval);

    const overlay = createOverlay();

    overlay.innerHTML = `

        <div class="js-card winner-screen">

            <h1>Game Over</h1>

            <p>
                Better luck next time!
            </p>

            <div class="winner-money">
                ${amount}
            </div>

            <p>
                You played really well.
            </p>

            <button
                class="restart-btn"
                id="restartGame"
            >
                🔄 Play Again
            </button>

        </div>

    `;

    document.body.appendChild(overlay);

    document.getElementById("restartGame")
        .addEventListener("click", () => {

            location.reload();

        });

}


// ==========================================
// WINNER SCREEN
// ==========================================

function winnerScreen() {

    clearInterval(timerInterval);

    createConfetti();

    const overlay = createOverlay();

    overlay.innerHTML = `

        <div class="js-card winner-screen">

            <h1>🏆 CONGRATULATIONS! 🏆</h1>

            <p>
                You have answered all questions correctly!
            </p>

            <div class="winner-money">
                ₹10,00,000
            </div>

            <p>
                You are the KBC Champion! 🎉
            </p>

            <button
                class="restart-btn"
                id="restartGame"
            >
                🔄 Play Again
            </button>

        </div>

    `;

    document.body.appendChild(overlay);

    document.getElementById("restartGame")
        .addEventListener("click", () => {

            location.reload();

        });

}


// ==========================================
// CONFETTI
// ==========================================

function createConfetti() {

    for (let i = 0; i < 100; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti-piece";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.backgroundColor =
            [
                "#ffd700",
                "#00aaff",
                "#ff3b7a",
                "#55ff9a",
                "#b56cff"
            ][
                Math.floor(Math.random() * 5)
            ];

        piece.style.animationDelay =
            Math.random() * 2 + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 5000);

    }

}


// ==========================================
// KEYBOARD SUPPORT
// A / B / C / D
// ==========================================

document.addEventListener("keydown", (event) => {

    if (gameLocked) return;

    const key =
        event.key.toUpperCase();

    const keyIndex = {
        A: 0,
        B: 1,
        C: 2,
        D: 3
    };

    if (keyIndex[key] !== undefined) {

        const index = keyIndex[key];

        if (!optionButtons[index].disabled) {

            optionButtons[index].click();

        }

    }

});


// ==========================================
// INITIALIZE GAME
// ==========================================

loadQuestion();

console.log("🔥 KBC Quiz JavaScript Loaded Successfully!");