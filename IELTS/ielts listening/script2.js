document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuration: Correct Answers ---
    const strictAnswers = {
        q6: ['17th october', '17th of october', 'the 17th october', 'the 17th of october', 'october 17th', '17 october'],
        q7: ['12.30', '12:30', '1230'],
        q8: ['thomson'],
        q9: ['ac 936', 'ac936'],
        q10: ['3303 8450 2045 6837', '3303845020456837', '3303-8450-2045-6837']
    };

    // DOM Elements
    const submitBtn = document.getElementById('submit-btn');
    const backBtn = document.getElementById('back-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultArea = document.getElementById('result-area');
    const scoreDisplay = document.getElementById('score-display');
    
    // Audio Elements
    const playBtn = document.getElementById('play-btn');
    const audioPlayer = document.getElementById('actual-audio');
    const timeDisplay = document.getElementById('time-display');
    const playText = playBtn.querySelector('span');
    const playIcon = playBtn.querySelector('svg path');

    // --- 1. Audio Player Logic ---

    playBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playText.textContent = 'Pause';
            playIcon.setAttribute('d', 'M6 4h4v16H6V4zm8 0h4v16h-4V4z');
        } else {
            audioPlayer.pause();
            playText.textContent = 'Start Listening';
            playIcon.setAttribute('d', 'M8 5V19L19 12L8 5Z');
        }
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const current = formatTime(audioPlayer.currentTime);
        const duration = formatTime(audioPlayer.duration || 0);
        timeDisplay.textContent = `${current} / ${duration}`;
    });

    audioPlayer.addEventListener('ended', () => {
        playText.textContent = 'Start Listening';
        playIcon.setAttribute('d', 'M8 5V19L19 12L8 5Z');
        audioPlayer.currentTime = 0;
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // --- 2. Navigation Logic ---

    backBtn.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });

    resetBtn.addEventListener('click', () => {
        document.querySelectorAll('input[type="text"]').forEach(input => {
            if (!input.readOnly) {
                input.value = '';
                input.classList.remove('correct', 'incorrect');
            }
        });
        resultArea.classList.add('hidden');
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        playText.textContent = 'Start Listening';
        playIcon.setAttribute('d', 'M8 5V19L19 12L8 5Z');
        timeDisplay.textContent = "00:00 / 00:00";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 3. Submit & Grading Logic ---

    submitBtn.addEventListener('click', () => {
        let score = 0;
        let totalQuestions = 5;

        for (let i = 6; i <= 10; i++) {
            const inputId = `q${i}`;
            const inputElement = document.getElementById(inputId);
            
            if (inputElement) {
                const userAnswer = normalizeText(inputElement.value);
                const validAnswers = strictAnswers[inputId];
                
                const isCorrect = validAnswers.some(ans => normalizeText(ans) === userAnswer);

                if (isCorrect) {
                    inputElement.classList.add('correct');
                    inputElement.classList.remove('incorrect');
                    score++;
                } else {
                    inputElement.classList.add('incorrect');
                    inputElement.classList.remove('correct');
                }
            }
        }

        scoreDisplay.textContent = score;
        resultArea.classList.remove('hidden');
        resultArea.scrollIntoView({ behavior: 'smooth' });
    });

    function normalizeText(text) {
        if (!text) return '';
        return text.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[-]/g, '');
    }
});