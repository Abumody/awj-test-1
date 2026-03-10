document.addEventListener('DOMContentLoaded', () => {
    
    // --- Configuration: Correct Answers ---
    const strictAnswers = {
        q1: ['taxi', 'cab'],
        q2: ['city centre', 'city center'],
        q3: ['wait'],
        q4: ['door-to-door'],
        q5: ['reserve', 'reserve a seat']
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
            // Change icon to pause bars
            playIcon.setAttribute('d', 'M6 4h4v16H6V4zm8 0h4v16h-4V4z');
        } else {
            audioPlayer.pause();
            playText.textContent = 'Start Listening';
            // Change icon back to play triangle
            playIcon.setAttribute('d', 'M8 5V19L19 12L8 5Z');
        }
    });

    // Update timer as audio plays
    audioPlayer.addEventListener('timeupdate', () => {
        const current = formatTime(audioPlayer.currentTime);
        const duration = formatTime(audioPlayer.duration || 0);
        timeDisplay.textContent = `${current} / ${duration}`;
    });

    // Reset button when audio ends
    audioPlayer.addEventListener('ended', () => {
        playText.textContent = 'Start Listening';
        playIcon.setAttribute('d', 'M8 5V19L19 12L8 5Z');
        audioPlayer.currentTime = 0;
    });

    // Helper: Format seconds into MM:SS
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // --- 2. Navigation Logic ---

    backBtn.addEventListener('click', () => {
        if(confirm("Are you sure you want to go back? Unsaved changes will be lost.")) {
            window.history.back();
        }
    });

    resetBtn.addEventListener('click', () => {
        // Clear inputs
        document.querySelectorAll('input[type="text"]').forEach(input => {
            if (!input.readOnly) {
                input.value = '';
                input.classList.remove('correct', 'incorrect');
            }
        });
        // Hide results
        resultArea.classList.add('hidden');
        // Reset Audio
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        playText.textContent = 'Start Listening';
        playIcon.setAttribute('d', 'M8 5V19L19 12L8 5Z');
        timeDisplay.textContent = "00:00 / 00:00";
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 3. Submit & Grading Logic ---

    submitBtn.addEventListener('click', () => {
        let score = 0;
        let totalQuestions = 5;

        for (let i = 1; i <= totalQuestions; i++) {
            const inputId = `q${i}`;
            const inputElement = document.getElementById(inputId);
            
            if (inputElement) {
                const userAnswer = normalizeText(inputElement.value);
                const validAnswers = strictAnswers[inputId];
                
                // Check if user answer matches any valid answer
                const isCorrect = validAnswers.some(ans => normalizeText(ans) === userAnswer);

                // Visual Feedback
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

        // Display Results
        scoreDisplay.textContent = score;
        resultArea.classList.remove('hidden');
        
        // Scroll to results
        resultArea.scrollIntoView({ behavior: 'smooth' });
    });

    // Helper: Normalize text for comparison
    function normalizeText(text) {
        if (!text) return '';
        return text.toLowerCase().trim().replace(/\s+/g, ' ');
    }
});