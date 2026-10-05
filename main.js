/**
 * Main Application Logic
 * Adhyatm Shaswat Portfolio
 * 1. Snap-scroll dot indicators
 * 2. Typewriter animation
 * 3. Live Analog & Digital Clock widget
 * 4. Real Kanye West - Runaway HTML5 Audio Player & Synced Blurred Lyrics
 * 5. Quick copy email toast
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. SNAP-SCROLL & SIDE 3-DOTS NAVIGATION
     ========================================================================== */
  const sections = document.querySelectorAll('.snap-section');
  const dotBtns = document.querySelectorAll('.dot-btn');
  const snapContainer = document.getElementById('snap-container');

  // Dot click to scroll
  dotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // IntersectionObserver to update active dot on scroll
  const observerOptions = {
    root: snapContainer,
    threshold: 0.55
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dotBtns.forEach(btn => {
          if (btn.getAttribute('data-target') === id) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));


  /* ==========================================================================
     2. TYPEWRITER EFFECT (HERO)
     ========================================================================== */
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const words = ['coder & Ye for life', 'Ye for life', 'developer'];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentWord = words[wordIdx];

      if (isDeleting) {
        charIdx--;
        typedEl.textContent = currentWord.substring(0, charIdx);
      } else {
        charIdx++;
        typedEl.textContent = currentWord.substring(0, charIdx);
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === currentWord.length) {
        speed = 2200; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        speed = 400; // Pause before next word
      }

      setTimeout(typeLoop, speed);
    }

    setTimeout(typeLoop, 800);
  }


  /* ==========================================================================
     3. 1-CLICK EMAIL COPY & TOAST
     ========================================================================== */
  const copyBtn = document.getElementById('quick-copy-mail');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = copyBtn.getAttribute('data-email') || 'xnazhx.dev@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const inp = document.createElement('input');
          inp.value = email;
          document.body.appendChild(inp);
          inp.select();
          document.execCommand('copy');
          document.body.removeChild(inp);
        }
        showToast(`Copied ${email}`);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }


  /* ==========================================================================
     4. LIVE ANALOG & DIGITAL CLOCK WIDGET
     ========================================================================== */
  const clockCanvas = document.getElementById('analog-clock');
  const digitalTimeEl = document.getElementById('digital-time');
  const clockDateEl = document.getElementById('clock-date');

  function updateClock() {
    const now = new Date();

    // Update Digital Time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    if (digitalTimeEl) {
      digitalTimeEl.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Update Date
    if (clockDateEl) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const dateNum = now.getDate();
      
      const offsetMin = -now.getTimezoneOffset();
      const offsetHours = Math.floor(Math.abs(offsetMin) / 60);
      const offsetRemainingMin = Math.abs(offsetMin) % 60;
      const sign = offsetMin >= 0 ? '+' : '-';
      const gmtString = `GMT${sign}${offsetHours}${offsetRemainingMin ? ':' + offsetRemainingMin : ''}`;

      clockDateEl.textContent = `${dayName}, ${monthName} ${dateNum} • ${gmtString}`;
    }

    // Draw Analog Clock
    if (clockCanvas) {
      const ctx = clockCanvas.getContext('2d');
      const width = clockCanvas.width;
      const height = clockCanvas.height;
      const radius = width / 2;

      ctx.clearRect(0, 0, width, height);

      // Dial background
      ctx.beginPath();
      ctx.arc(radius, radius, radius - 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#16171a';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.stroke();

      // Tick marks
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        const isMain = i % 3 === 0;
        const tickLength = isMain ? 5 : 3;
        const x1 = radius + (radius - 5) * Math.cos(angle);
        const y1 = radius + (radius - 5) * Math.sin(angle);
        const x2 = radius + (radius - 5 - tickLength) * Math.cos(angle);
        const y2 = radius + (radius - 5 - tickLength) * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = isMain ? 1.5 : 1;
        ctx.strokeStyle = isMain ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();
      }

      // Calculations for hands
      const secVal = now.getSeconds() + now.getMilliseconds() / 1000;
      const minVal = now.getMinutes() + secVal / 60;
      const hrVal = (now.getHours() % 12) + minVal / 60;

      // Draw Hour Hand
      const hrAngle = (hrVal * Math.PI) / 6 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.lineTo(radius + (radius * 0.48) * Math.cos(hrAngle), radius + (radius * 0.48) * Math.sin(hrAngle));
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Draw Minute Hand
      const minAngle = (minVal * Math.PI) / 30 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.lineTo(radius + (radius * 0.72) * Math.cos(minAngle), radius + (radius * 0.72) * Math.sin(minAngle));
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#dddddd';
      ctx.stroke();

      // Draw Second Hand (Red, matching screenshot)
      const secAngle = (secVal * Math.PI) / 30 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(radius - (radius * 0.15) * Math.cos(secAngle), radius - (radius * 0.15) * Math.sin(secAngle));
      ctx.lineTo(radius + (radius * 0.8) * Math.cos(secAngle), radius + (radius * 0.8) * Math.sin(secAngle));
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = '#ef4444';
      ctx.stroke();

      // Center Pin
      ctx.beginPath();
      ctx.arc(radius, radius, 2.5, 0, 2 * Math.PI);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
    }
  }

  setInterval(updateClock, 1000);
  updateClock();


  /* ==========================================================================
     5. REAL KANYE WEST - RUNAWAY AUDIO PLAYER & SYNCED BLURRED LYRICS
     ========================================================================== */
  const audio = document.getElementById('real-audio-player');
  const playBtn = document.getElementById('btn-play-pause');
  const playSvg = document.getElementById('ctrl-play-svg');
  const pauseSvg = document.getElementById('ctrl-pause-svg');
  const progressFill = document.getElementById('progress-fill');
  const progressTrack = document.getElementById('progress-track');
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');
  const lyricLines = document.querySelectorAll('.lyric-line');
  const lyricsContainer = document.getElementById('lyrics-container');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');

  function formatTime(secs) {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // Update total duration once audio metadata loads
  if (audio) {
    audio.addEventListener('loadedmetadata', () => {
      if (totalTimeEl) totalTimeEl.textContent = formatTime(audio.duration);
    });

    // Time update listener
    audio.addEventListener('timeupdate', () => {
      const cur = audio.currentTime;
      const dur = audio.duration || 548;

      if (currentTimeEl) currentTimeEl.textContent = formatTime(cur);
      if (progressFill) {
        const pct = (cur / dur) * 100;
        progressFill.style.width = `${pct.toFixed(2)}%`;
      }

      // Sync active lyric line
      let activeIndex = -1;
      lyricLines.forEach((line, idx) => {
        const lineTime = parseFloat(line.getAttribute('data-time') || '0');
        if (cur >= lineTime) {
          activeIndex = idx;
        }
      });

      if (activeIndex !== -1) {
        lyricLines.forEach((line, idx) => {
          if (idx === activeIndex) {
            if (!line.classList.contains('active')) {
              line.classList.add('active');
              // Smooth scroll active line into view
              if (lyricsContainer) {
                const lineOffset = line.offsetTop - lyricsContainer.offsetTop;
                lyricsContainer.scrollTo({
                  top: lineOffset - 80,
                  behavior: 'smooth'
                });
              }
            }
          } else {
            line.classList.remove('active');
          }
        });
      }
    });

    audio.addEventListener('ended', () => {
      if (playSvg) playSvg.style.display = 'block';
      if (pauseSvg) pauseSvg.style.display = 'none';
    });
  }

  // Play / Pause toggle
  function toggleAudio() {
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => {
        if (playSvg) playSvg.style.display = 'none';
        if (pauseSvg) pauseSvg.style.display = 'block';
      }).catch(err => {
        console.warn('Audio play request failed: ', err);
      });
    } else {
      audio.pause();
      if (playSvg) playSvg.style.display = 'block';
      if (pauseSvg) pauseSvg.style.display = 'none';
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', toggleAudio);
  }

  // Click on lyric line to seek directly to that line's timestamp
  lyricLines.forEach((line) => {
    line.addEventListener('click', () => {
      const targetTime = parseFloat(line.getAttribute('data-time') || '0');
      if (audio) {
        audio.currentTime = targetTime;
        if (audio.paused) {
          toggleAudio();
        }
      }
    });
  });

  // Click on progress track to seek
  if (progressTrack && audio) {
    progressTrack.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const dur = audio.duration || 548;
      audio.currentTime = pct * dur;
    });
  }

  // Prev / Next button actions (-10s / +10s)
  if (prevBtn && audio) {
    prevBtn.addEventListener('click', () => {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    });
  }

  if (nextBtn && audio) {
    nextBtn.addEventListener('click', () => {
      const dur = audio.duration || 548;
      audio.currentTime = Math.min(dur, audio.currentTime + 10);
    });
  }

});
