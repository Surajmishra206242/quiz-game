const questions = [
    {
        question: "What is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue-Whale", correct: true },
            { text: "Elephent", correct: false },
            { text: "Lion", correct: false },
        ]
    },
    {
        question: "Who is the tallest man in the world?",
        answers: [
            { text: "Sahil Khan", correct: false },
            { text: "Sultan Kösen", correct: true },
            { text: "Sunny-Dancer", correct: false },
            { text: "Sanjay Kumar", correct: false },
        ]
    },
    {
        question: "Who is the Richest man in the world?",
        answers: [
            { text: "Elon Musk", correct: true },
            { text: "Salman Khan", correct: false },
            { text: "Lalu Yadav", correct: false },
            { text: "Avg Pakistani", correct: false },
        ]
    },
    {
        question: "which Contery is poorest in the World?",
        answers: [
            { text: "USA", correct: false },
            { text: "Africa", correct: false },
            { text: "China", correct: false },
            { text: "Pakistan", correct: true },
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let curreuntQuestionIndex = 0;
let score = 0;

function startQuiz() {
    curreuntQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion() {
    resetState();
    let curruentQuestion = questions[curreuntQuestionIndex];
    let questionNo = curreuntQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + curruentQuestion.question;


    curruentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;

        }

        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML =`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display="block";
}

function handleNextButton(){
    curreuntQuestionIndex++;
    if(curreuntQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (curreuntQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
})

showQuestion();
