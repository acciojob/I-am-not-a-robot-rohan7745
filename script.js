//your code 
const imageElements = document.querySelectorAll('.image-container img');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');
let selectedImages = [];
let state = 1;

// Function to shuffle the image order randomly
function shuffleImages() {
    const imagesArray = Array.from(imageElements);
    for (let i = imagesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagesArray[i], imagesArray[j]] = [imagesArray[j], imagesArray[i]];
    }
    // Replace the existing image elements with the shuffled ones
    imagesArray.forEach((img, index) => {
        imageElements[index].src = img.src;
    });
}

// Function to reset the game to its initial state
function resetGame() {
    selectedImages = [];
    state = 1;
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.textContent = '';
    shuffleImages();
}

// Event listeners for image clicks
imageElements.forEach((img, index) => {
    img.addEventListener('click', () => {
        if (state === 1) {
            selectedImages.push(index);
            state = 2;
            resetButton.style.display = 'inline';
        } else if (state === 2) {
            // Reset button is already visible
        } else if (state === 3) {
            // Verify button is already visible
        }

        if (selectedImages.length === 2) {
            state = 3;
            verifyButton.style.display = 'inline';
        }

        if (selectedImages.length > 2) {
            // More than 2 images clicked, do nothing
            return;
        }
    });
});

// Event listener for the reset button
resetButton.addEventListener('click', resetGame);

// Event listener for the verify button
verifyButton.addEventListener('click', () => {
    state = 4;
    verifyButton.style.display = 'none';

    const img1 = imageElements[selectedImages[0]];
    const img2 = imageElements[selectedImages[1]];

    if (img1.src === img2.src) {
        para.textContent = 'You are a human. Congratulations!';
    } else {
        para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
});

// Initial game setup
shuffleImages();

