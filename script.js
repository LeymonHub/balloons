const questions = [
    {
        question: "The anti-British uprising in Assam primarily took place during which period?",
        options: ["1857-1858", "1900-1905", "1930-1942", "1945-1950"],
        answer: 2
    },
    {
        question: "Which movement in Assam was led by the peasant community against British rule?",
        options: ["Tebhaga Movement", "Satyagraha Movement", "Civil Disobedience Movement", "Quit India Movement"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

document.getElementById('startButton').onclick = startQuiz;

function startQuiz() {
    document.getElementById('backgroundMusic').play();
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById('timer').innerText = timeLeft;
    document.getElementById('questionNumber').innerText = `Question ${currentQuestionIndex + 1}`;
    
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('questionText').innerText = currentQuestion.question;

    const balloonContainer = document.getElementById('balloonContainer');
    balloonContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.innerText = option;
        balloon.onclick = () => checkAnswer(index, balloon);
        balloonContainer.appendChild(balloon);
    });

    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Moving to the next question.");
            moveToNextQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedOption, balloon) {
    const currentQuestion = questions[currentQuestionIndex];

    // Play the balloon pop sound
    const popSound = document.getElementById('popSound');
    popSound.currentTime = 0;
    popSound.play();

    // Add pop effect to balloon
    balloon.classList.add('pop');
    balloon.style.pointerEvents = 'none'; // Disable clicking after pop

    // Trigger sparkles flying on screen
    createSparklesOnScreen();

    // Feedback for correct/incorrect answer
    if (selectedOption === currentQuestion.answer) {
        balloon.classList.add('correct');
        setTimeout(() => alert("Correct!"), 400);
        score++;
    } else {
        balloon.classList.add('wrong');
        setTimeout(() => alert("Wrong!"), 400);
    }

    clearInterval(timer);
    setTimeout(moveToNextQuestion, 500); // Move to the next question after a delay
}

function createSparklesOnScreen() {
    const balloonContainer = document.getElementById('balloonContainer');
    const numberOfSparkles = 20; // Number of sparkles flying on screen

    for (let i = 0; i < numberOfSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('screenSparkle');

        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        sparkle.style.left = `${startX}px`;
        sparkle.style.top = `${startY}px`;

        // Random trajectory
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        const distance = Math.random() * 300 + 100; // Distance the sparkle will travel
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;

        sparkle.style.setProperty('--translateX', `${endX}px`);
        sparkle.style.setProperty('--translateY', `${endY}px`);

        // Append the sparkle to the container
        balloonContainer.appendChild(sparkle);

        // Remove the sparkle after the animation ends
        setTimeout(() => sparkle.remove(), 2000); // Matches the animation duration
    }
}

    // Create sparkles
    for (let i = 0; i < numberOfSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 100; // Sparkle spread distance
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        sparkle.style.setProperty('--x', `${x}px`);
        sparkle.style.setProperty('--y', `${y}px`);

        sparkle.style.left = `${balloonRect.left + balloonRect.width / 2}px`;
        sparkle.style.top = `${balloonRect.top + balloonRect.height / 2}px`;

        balloonContainer.appendChild(sparkle);

        // Remove sparkles after animation
        setTimeout(() => sparkle.remove(), 1000);
    }

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        calculateScore();
    }
}

function calculateScore() {
    clearInterval(timer);
    const resultElement = document.getElementById('result');
    resultElement.innerText = `Your score is ${score} out of ${questions.length}.`;
    document.getElementById('quizContent').style.display = 'none';
}
