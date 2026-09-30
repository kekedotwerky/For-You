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
            title: 'Hanya Untuk-Mu',
            artist: 'Ten2Five',
            cover: 'assets/cover/cover1.jpg'
        },
        {
            src: 'assets/lagu/lagu2.mp3',
            title: 'Aku Milikmu',
            artist: 'Dewa19',
            cover: 'assets/cover/cover2.jpg'
        },
        {
            src: 'assets/lagu/lagu3.mp3',
            title: 'Kangen',
            artist: 'Dewa19',
            cover: 'assets/cover/cover3.jpg'
        },
        {
            src: 'assets/lagu/lagu4.mp3',
            title: 'Keabadian',
            artist: 'Reza Artamevia',
            cover: 'assets/cover/cover4.jpg'
        },
        {
            src: 'assets/lagu/lagu5.mp3',
            title: 'Sempurna',
            artist: 'Andra & The Backbone',
            cover: 'assets/cover/cover5.jpg'
        }
    ];

    let currentSongIndex = 0;
    let isSeeking = false;


    // ========================================
    // PLAY / PAUSE
    // ========================================

    function toggleMusic() {
        if (!audio) return;

        if (audio.paused) {
            audio.play()
                .then(() => {
                    if (playPauseBtn) {
                        playPauseBtn.innerText = '⏸';
                    }
                })
                .catch(error => {
                    console.error('Music could not be played:', error);
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

    function changeSong(songSrc, songTitle, songArtist, coverSrc) {

        if (!audio) {
            console.error('The audio element #bg-music was not found.');
            return;
        }

        // Stop the current song
        audio.pause();

        // Change to the new song
        audio.src = songSrc;

        // Force browser to load the new MP3
        audio.load();

        // Update title
        const playerTitle = document.getElementById('player-title');

        if (playerTitle) {
            playerTitle.innerText = songTitle;
        }

        // Update artist
        const playerArtist = document.getElementById('player-artist');

        if (playerArtist) {
            playerArtist.innerText = songArtist;
        }

        // Update album cover
        const playerCover = document.getElementById('player-cover');

        if (playerCover) {
            playerCover.src = coverSrc;
        }

        // Find selected song in playlist
        const foundIndex = playlist.findIndex(
            song => song.src === songSrc
        );

        if (foundIndex !== -1) {
            currentSongIndex = foundIndex;
        }

        // Reset progress bar
        if (seekBar) {
            seekBar.value = 0;
        }

        // Reset current time
        if (currentTimeDisplay) {
            currentTimeDisplay.innerText = '0:00';
        }

        // Play selected song
        audio.play()
            .then(() => {
                if (playPauseBtn) {
                    playPauseBtn.innerText = '⏸';
                }
            })
            .catch(error => {
                console.error(
                    'Selected song could not be played:',
                    error
                );

                if (playPauseBtn) {
                    playPauseBtn.innerText = '▶';
                }
            });
    }


    // ========================================
    // NEXT SONG
    // ========================================

    function nextSong() {

        currentSongIndex++;

        if (currentSongIndex >= playlist.length) {
            currentSongIndex = 0;
        }

        const next = playlist[currentSongIndex];

        changeSong(
            next.src,
            next.title,
            next.artist,
            next.cover
        );
    }


    // ========================================
    // PREVIOUS SONG
    // ========================================

    function prevSong() {

        currentSongIndex--;

        if (currentSongIndex < 0) {
            currentSongIndex = playlist.length - 1;
        }

        const previous = playlist[currentSongIndex];

        changeSong(
            previous.src,
            previous.title,
            previous.artist,
            previous.cover
        );
    }


    // ========================================
    // FORMAT TIME
    // ========================================

    function formatTime(seconds) {

        if (!seconds || isNaN(seconds)) {
            return '0:00';
        }

        const min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);

        if (sec < 10) {
            sec = '0' + sec;
        }

        return `${min}:${sec}`;
    }


    // ========================================
    // SEEK BAR
    // ========================================

    if (seekBar && audio) {

        seekBar.addEventListener('input', () => {
            isSeeking = true;
        });

        seekBar.addEventListener('change', () => {

            if (
                !isNaN(audio.duration) &&
                audio.duration > 0
            ) {
                const seekTime =
                    (seekBar.value / 100) *
                    audio.duration;

                audio.currentTime = seekTime;
            }

            isSeeking = false;
        });
    }


    // ========================================
    // AUDIO TIME UPDATE
    // ========================================

    if (audio) {

        audio.addEventListener('timeupdate', () => {

            if (
                !isNaN(audio.duration) &&
                audio.duration > 0
            ) {

                if (seekBar && !isSeeking) {

                    const progressPercent =
                        (audio.currentTime /
                            audio.duration) * 100;

                    seekBar.value = progressPercent;
                }

                if (currentTimeDisplay) {
                    currentTimeDisplay.innerText =
                        formatTime(audio.currentTime);
                }

                if (durationDisplay) {
                    durationDisplay.innerText =
                        formatTime(audio.duration);
                }
            }
        });


        // Audio metadata loaded
        audio.addEventListener('loadedmetadata', () => {

            if (durationDisplay) {
                durationDisplay.innerText =
                    formatTime(audio.duration);
            }

            if (seekBar) {
                seekBar.value = 0;
            }
        });


        // Audio paused
        audio.addEventListener('pause', () => {

            if (playPauseBtn) {
                playPauseBtn.innerText = '▶';
            }
        });


        // Audio playing
        audio.addEventListener('play', () => {

            if (playPauseBtn) {
                playPauseBtn.innerText = '⏸';
            }
        });


        // Automatically play next song
        audio.addEventListener('ended', () => {
            nextSong();
        });
    }


    // ========================================
    // FALLING PETALS
    // ========================================

    const petalsContainer =
        document.getElementById('petals-container');

    if (petalsContainer) {

        for (let i = 0; i < 35; i++) {

            const petal =
                document.createElement('div');

            petal.classList.add('petal');

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

            petalsContainer.appendChild(petal);
        }
    }


    // ========================================
    // SECTION NAVIGATION
    // ========================================

    function nextSection(btn) {

        if (!btn) return;

        const currentSection =
            btn.closest('section');

        if (!currentSection) return;

        const nextSec =
            currentSection.nextElementSibling;

        if (
            nextSec &&
            nextSec.tagName === 'SECTION'
        ) {

            nextSec.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }


    // ========================================
    // SECTION SCROLL ANIMATIONS
    // ========================================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            'in-view'
                        );

                    } else {

                        entry.target.classList.remove(
                            'in-view'
                        );
                    }
                });

            },
            observerOptions
        );


    document
        .querySelectorAll('section')
        .forEach(section => {

            sectionObserver.observe(section);

        });