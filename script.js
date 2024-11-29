let countdown;
let timeLeft;
let player;

// YouTube video ID - Can be changed to any video
const VIDEO_ID = 'Ed1sGgHUo88';

// Initialize YouTube player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoPlayer', {
        height: '100%',
        width: '100%',
        videoId: VIDEO_ID,
        playerVars: {
            'playsinline': 1,
            'rel': 0,
            'modestbranding': 1
        }
    });
}

// Format time to MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Start countdown
function startTimer() {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    // Validate input
    if (minutes === 0 && seconds === 0) {
        alert('Please enter a valid time');
        return;
    }
    
    // Disable inputs and start button
    document.getElementById('minutes').disabled = true;
    document.getElementById('seconds').disabled = true;
    document.getElementById('startButton').disabled = true;
    
    // Calculate total time in seconds
    timeLeft = minutes * 60 + seconds;
    
    // Update display immediately
    document.getElementById('timeLeft').textContent = formatTime(timeLeft);
    
    // Start countdown
    countdown = setInterval(() => {
        timeLeft--;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('timeLeft').textContent = '00:00';
            
            // Show and play video
            document.getElementById('videoPlayer').classList.remove('hidden');
            player.playVideo();
        } else {
            document.getElementById('timeLeft').textContent = formatTime(timeLeft);
        }
    }, 1000);
}

// Reset timer
function resetTimer() {
    // Clear interval
    clearInterval(countdown);
    
    // Reset display
    document.getElementById('timeLeft').textContent = '00:00';
    
    // Enable inputs and start button
    document.getElementById('minutes').disabled = false;
    document.getElementById('seconds').disabled = false;
    document.getElementById('startButton').disabled = false;
    
    // Clear inputs
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
    
    // Hide and stop video
    document.getElementById('videoPlayer').classList.add('hidden');
    if (player && player.stopVideo) {
        player.stopVideo();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', startTimer);
    document.getElementById('resetButton').addEventListener('click', resetTimer);
    
    // Input validation
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            let value = parseInt(input.value);
            if (input.id === 'minutes') {
                if (value > 60) input.value = 60;
                if (value < 0) input.value = 0;
            } else if (input.id === 'seconds') {
                if (value > 59) input.value = 59;
                if (value < 0) input.value = 0;
            }
        });
    });
});