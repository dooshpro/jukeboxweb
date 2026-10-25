let queue = [];
let curIndex = -1;
let player = new Audio();
const songInput = document.getElementById('songInput');
const addBtn = document.getElementById('addBtn');
const queueList = document.getElementById('queueList');
const pauseBtn = document.getElementById('pauseBtn');
const skipBtn = document.getElementById('skipBtn');

addBtn.addEventListener('click', function () {
    let url = songInput.value.trim();
    if (!url) return; 

    let name = url.split('/').pop().split('?')[0];
    if (!name || name.length > 25) name = "saloon track #" + (queue.length + 1);

    queue.push({ name: name, url: url });
    songInput.value = '';

    renderQueue();

    if (curIndex === -1) {
        playNext();
    }
});

function playNext() {
    if (queue.length === 0) return;

    curIndex++;
    if (curIndex >= queue.length) {
        console.log("reached end of queue");
        return;
    } 

    let song = queue[curIndex];
    player.src = song.url;

    player.play().catch(err => {
        console.log("autoplay blocked or broken link:", err);
    });

    renderQueue();
}

player.onended = function () {
    playNext();
};

pauseBtn.addEventListener('click', function () {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
});

skipBtn.addEventListener('click', function () {
    playNext();
});

function renderQueue() {
    queueList.innerHTML = '';

    if (queue.length === 0) {
        queueList.innerHTML = '<p style="color:#777">no tracks queued up yet...</p>';
        return;
    }

    queue.forEach((item, idx) => {
        let div = document.createElement('div');
        div.className = 'queue-item';

        if (idx === curIndex) {
            div.style.borderColor = '#00ff66';
            div.innerHTML = `<strong>▶ ${item.name}</strong> (playing)`;
        } else {
            div.innerText = `${idx + 1}. ${item.name}`;
        }

        queueList.appendChild(div);
    });
}

function addPreset(url, name) {
    queue.push({ name: name, url: url });
    renderQueue();
    if (curIndex === -1) {
        playNext();
    }
} 

renderQueue(); // init empty state 




