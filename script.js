const music = document.getElementById('bg-music');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const leaves = Array.from(document.querySelectorAll('.leaf'));

leaves.forEach((leaf, i) => {
  leaf.style.zIndex = i;
});

const flippingOrder = [...leaves].reverse();
let currentPage = 0;

function goNext() {
  if (currentPage < flippingOrder.length) {
    if (currentPage === 0) music.play().catch(e => {});
    
    const leaf = flippingOrder[currentPage];
    leaf.classList.add('flipped');
    leaf.style.zIndex = 100 + currentPage;
    currentPage++;

    // Only trigger the shift if we just flipped the LAST leaf
    if (currentPage === flippingOrder.length) {
      document.getElementById('book').classList.add('final-center');
    }
  }
}

function goBack() {
  if (currentPage > 0) {
    // If we are currently at the end, slide back to the left before un-flipping
    if (currentPage === flippingOrder.length) {
      document.getElementById('book').classList.remove('final-center');
    }

    currentPage--;
    const leaf = flippingOrder[currentPage];
    leaf.classList.remove('flipped');
    leaf.style.zIndex = (leaves.length - 1) - currentPage;
  }
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goBack);
document.getElementById('book').addEventListener('click', (e) => {
    if(e.target.tagName !== 'BUTTON') goNext();
});

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const audio = document.getElementById('bg-music');

    // 1. Hide the loading screen
    loadingScreen.style.opacity = '0';
    
    // 2. Remove it from the layout after the fade
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 800);

    // 3. Attempt to play (might be blocked, but will trigger on first click)
    audio.play().catch(() => {
        console.log("Autoplay blocked. Music will start on first interaction.");
    });
});

// 4. Backup: Ensure music plays when she clicks the book
document.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    }
}, { once: true }); // Only runs on the very first click