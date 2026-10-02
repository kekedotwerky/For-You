const audio = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');


// ========================================
// PLAYLIST
// ========================================

const playlist = [

    {
        src: 'assets/lagu/lagu1.mp3',
        title: 'You Got It All',
        artist: 'MYMP',
        cover: 'assets/cover/cover1.jpg'
    },

    {
        src: 'assets/lagu/lagu2.mp3',
        title: 'Pahintulot',
        artist: 'Shirebound',
        cover: 'assets/cover/cover2.jpg'
    },

    {
        src: 'assets/lagu/lagu3.mp3',
        title: 'Sagip',
        artist: 'Jan Roberts',
        cover: 'assets/cover/cover3.jpg'
    },

    {
        src: 'assets/lagu/lagu4.mp3',
        title: 'Falling For You',
        artist: '1975',
        cover: 'assets/cover/cover4.jpg'
    },

    {
        src: 'assets/lagu/lagu5.mp3',
        title: 'Lego House',
        artist: 'Ed Sheeran',
        cover: 'assets/cover/cover5.jpg'
    }

];


let currentSongIndex = 0;
let isSeeking = false;


// ========================================
// SONG MESSAGES
// ========================================

const songMessages = {

    /* You Got It All */
    0: '',


    /* Pahintulot */

    1: `This song reminds me of you because it makes me think about how some things don't need to be rushed.

Especially with us, I don't want you to feel like you have to hurry because of me or because of what I feel.

I'm happy just getting to know you little by little. Even the simple conversations, random jokes, and small moments we share mean something to me.

So take your time, Pau. No pressure.

Let's just let things happen naturally, at our own pace and at the right time.`,


    /* Sagip */

    2: `This song reminds me of you because sometimes I find myself wondering if you're doing okay, especially when life gets tiring or you have a lot going on.

I know we all have our own struggles, and we don't always talk about everything. I don't want to be someone who tries to fix all your problems.

I just want you to know nga naa ra ko if ever you need someone to talk to or someone who will simply listen.

And if things get tiring, pahulay lang. You don't have to figure everything out right away. It's okay to take things slowly. Take care always, Pau. I hope you're doing okay, even on the days when things feel a little heavy.`,


    /* Falling For You */

    3: `Hi Pau,

I think this song reminds me the most of how I slowly started liking you.

Wala gyud nako siya gi-expect. It just happened naturally through our conversations, mga jokes, and those little moments nga naa ta together.

Then eventually, naka-realize ko nga I was starting to care about you more than I expected.

I know what I feel, pero I don't want you to feel pressured because of it.

I just want to be honest with you.

I like you, Pau.

And I'm happy nga slowly, nakaila ko nimo more.

Dili man kinahanglan dali-on ang tanan. Let's just take things one step at a time and let God guide us kung asa ni padulong.

For now, I'm just thankful nga naa ka sa life nako.`,


    /* Lego House */
    4: ''

};


// ========================================
// SONG MESSAGE ELEMENTS
// ========================================

const songMessage =
    document.getElementById('song-message');

const songMessageText =
    document.getElementById('song-message-text');


// ========================================
// SHOW SONG MESSAGE
// ========================================

function showSongMessage(index) {

    if (!songMessage || !songMessageText) {
        return;
    }

    const message = songMessages[index];

    if (!message || message.trim() === '') {

        hideSongMessage();

        return;
    }

    songMessageText.innerText = message;

    songMessage.classList.remove('show');

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            songMessage.classList.add('show');

        });

    });

}


// ========================================
// HIDE SONG MESSAGE
// ========================================

function hideSongMessage() {

    if (!songMessage) {
        return;
    }

    songMessage.classList.remove('show');

}


// ========================================
// SELECT SONG FROM PLAYLIST
// ========================================

function selectSong(index) {

    if (
        index < 0 ||
        index >= playlist.length
    ) {
        return;
    }

    const song =
        playlist[index];

    changeSong(
        song.src,
        song.title,
        song.artist,
        song.cover
    );

    showSongMessage(index);

}


// ========================================
// CLICK ANYWHERE ELSE → FADE MESSAGE
// ========================================

document.addEventListener('click', function(event) {

    /*
     * Clicking a music card should NOT
     * immediately close the message.
     */

    if (event.target.closest('.music-item')) {
        return;
    }


    /*
     * Clicking or interacting with the
     * scrollable message box should NOT
     * close the message.
     */

    if (event.target.closest('#song-message-box')) {
        return;
    }


    /*
     * Clicking anywhere outside the
     * message closes it.
     */

    hideSongMessage();

});


// ========================================
// PLAY / PAUSE
// ========================================

function toggleMusic() {

    if (!audio) {
        return;
    }

    if (audio.paused) {

        audio.play()
            .then(() => {

                if (playPauseBtn) {
                    playPauseBtn.innerText = '⏸';
                }

            })
            .catch(error => {

                console.error(
                    'Music could not be played:',
                    error
                );

            });

    } else {

        audio.pause();

        if (playPauseBtn) {
            playPauseBtn.innerText = '▶';
        }

    }

}


// ========================================
// CHANGE SONG
// ========================================

function changeSong(
    songSrc,
    songTitle,
    songArtist,
    coverSrc
) {

    if (!audio) {

        console.error(
            'The audio element #bg-music was not found.'
        );

        return;
    }

    /*
     * Stop current song.
     */

    audio.pause();


    /*
     * Change audio source.
     */

    audio.src = songSrc;


    /*
     * Force browser to load new MP3.
     */

    audio.load();


    /*
     * Update title.
     */

    const playerTitle =
        document.getElementById('player-title');

    if (playerTitle) {

        playerTitle.innerText =
            songTitle;

    }


    /*
     * Update artist.
     */

    const playerArtist =
        document.getElementById('player-artist');

    if (playerArtist) {

        playerArtist.innerText =
            songArtist;

    }


    /*
     * Update album cover.
     */

    const playerCover =
        document.getElementById('player-cover');

    if (playerCover) {

        playerCover.src =
            coverSrc;

    }


    /*
     * Find selected song in playlist.
     */

    const foundIndex =
        playlist.findIndex(
            song => song.src === songSrc
        );


    if (foundIndex !== -1) {

        currentSongIndex =
            foundIndex;

    }


    /*
     * Reset progress bar.
     */

    if (seekBar) {
        seekBar.value = 0;
    }


    /*
     * Reset current time.
     */

    if (currentTimeDisplay) {

        currentTimeDisplay.innerText =
            '0:00';

    }


    /*
     * Play selected song.
     */

    audio.play()
        .then(() => {

            if (playPauseBtn) {

                playPauseBtn.innerText =
                    '⏸';

            }

        })
        .catch(error => {

            console.error(
                'Selected song could not be played:',
                error
            );

            if (playPauseBtn) {

                playPauseBtn.innerText =
                    '▶';

            }

        });

}


// ========================================
// NEXT SONG
// ========================================

function nextSong() {

    currentSongIndex++;

    if (
        currentSongIndex >=
        playlist.length
    ) {

        currentSongIndex = 0;

    }

    const next =
        playlist[currentSongIndex];

    changeSong(
        next.src,
        next.title,
        next.artist,
        next.cover
    );

    /*
     * Do NOT show the song message here.
     */

}


// ========================================
// PREVIOUS SONG
// ========================================

function prevSong() {

    currentSongIndex--;

    if (
        currentSongIndex < 0
    ) {

        currentSongIndex =
            playlist.length - 1;

    }

    const previous =
        playlist[currentSongIndex];

    changeSong(
        previous.src,
        previous.title,
        previous.artist,
        previous.cover
    );

    /*
     * Do NOT show a message here either.
     */

}


// ========================================
// FORMAT TIME
// ========================================

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return '0:00';

    }

    const min =
        Math.floor(seconds / 60);

    let sec =
        Math.floor(seconds % 60);

    if (sec < 10) {

        sec =
            '0' + sec;

    }

    return `${min}:${sec}`;

}


// ========================================
// SEEK BAR
// ========================================

if (seekBar && audio) {

    seekBar.addEventListener(
        'input',
        () => {

            isSeeking = true;

        }
    );


    seekBar.addEventListener(
        'change',
        () => {

            if (
                !isNaN(audio.duration) &&
                audio.duration > 0
            ) {

                const seekTime =
                    (
                        seekBar.value / 100
                    ) *
                    audio.duration;

                audio.currentTime =
                    seekTime;

            }

            isSeeking = false;

        }
    );

}


// ========================================
// AUDIO EVENTS
// ========================================

if (audio) {

    audio.addEventListener(
        'timeupdate',
        () => {

            if (
                !isNaN(audio.duration) &&
                audio.duration > 0
            ) {

                if (
                    seekBar &&
                    !isSeeking
                ) {

                    const progressPercent =
                        (
                            audio.currentTime /
                            audio.duration
                        ) *
                        100;

                    seekBar.value =
                        progressPercent;

                }


                if (currentTimeDisplay) {

                    currentTimeDisplay.innerText =
                        formatTime(
                            audio.currentTime
                        );

                }


                if (durationDisplay) {

                    durationDisplay.innerText =
                        formatTime(
                            audio.duration
                        );

                }

            }

        }
    );


    /*
     * Audio metadata loaded.
     */

    audio.addEventListener(
        'loadedmetadata',
        () => {

            if (durationDisplay) {

                durationDisplay.innerText =
                    formatTime(
                        audio.duration
                    );

            }

            if (seekBar) {

                seekBar.value =
                    0;

            }

        }
    );


    /*
     * Audio paused.
     */

    audio.addEventListener(
        'pause',
        () => {

            if (playPauseBtn) {

                playPauseBtn.innerText =
                    '▶';

            }

        }
    );


    /*
     * Audio playing.
     */

    audio.addEventListener(
        'play',
        () => {

            if (playPauseBtn) {

                playPauseBtn.innerText =
                    '⏸';

            }

        }
    );


    /*
     * Automatically play next song.
     */

    audio.addEventListener(
        'ended',
        () => {

            nextSong();

        }
    );

}


// ========================================
// FALLING PETALS
// ========================================

const petalsContainer =
    document.getElementById(
        'petals-container'
    );


if (petalsContainer) {

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const petal =
            document.createElement('div');

        petal.classList.add(
            'petal'
        );

        const size =
            Math.random() * 8 + 6;

        petal.style.width =
            size + 'px';

        petal.style.height =
            size + 'px';

        petal.style.left =
            Math.random() * 100 + 'vw';

        petal.style.animationDuration =
            Math.random() * 6 + 6 + 's';

        petal.style.animationDelay =
            Math.random() * 7 + 's';

        petalsContainer.appendChild(
            petal
        );

    }

}


// ========================================
// SECTION NAVIGATION
// ========================================

let currentSectionIndex = 0;
let isChangingSection = false;

const sections =
    document.querySelectorAll(
        '#main-content > section'
    );


// ========================================
// INITIALIZE SCENARIOS
// ========================================

function initializeSections() {

    if (!sections.length) {
        return;
    }

    sections.forEach(
        (section, index) => {

            section.classList.remove(
                'active',
                'fade-in',
                'fade-out'
            );


            if (index === 0) {

                section.style.display =
                    'flex';

                section.classList.add(
                    'active'
                );

            } else {

                section.style.display =
                    'none';

            }

        }
    );

    currentSectionIndex = 0;

}

function nextSection(btn) {
    if (!btn || isChangingSection) return;

    const currentSection = btn.closest('section');
    if (!currentSection) return;

    const currentIndex = Array.from(sections).indexOf(currentSection);
    const nextIndex = currentIndex + 1;

    if (nextIndex >= sections.length) return;

    isChangingSection = true;
    hideSongMessage();

    const nextSec = sections[nextIndex];

    // Start fading current scene out
    currentSection.classList.remove('fade-in');
    currentSection.classList.add('fade-out');

    // Wait for fade-out to finish
    setTimeout(() => {

        // Hide current scene
        currentSection.classList.remove('active', 'fade-out');
        currentSection.style.display = 'none';

        // Prepare next scene
        nextSec.style.display = 'flex';
        nextSec.classList.remove('active', 'fade-out');
        nextSec.classList.add('fade-in');

        // Force browser to render the starting position
        void nextSec.offsetWidth;

        // Start fade-in
        nextSec.classList.remove('fade-in');
        nextSec.classList.add('active');

        nextSec.style.opacity = '1';
        nextSec.style.transform = 'translateY(0)';
        nextSec.style.visibility = 'visible';

        // Reset scrolling
        nextSec.scrollTop = 0;

        currentSectionIndex = nextIndex;

        setTimeout(() => {
            isChangingSection = false;
        }, 650);

    }, 600);
}

// ========================================
// INITIALIZE
// ========================================

initializeSections();