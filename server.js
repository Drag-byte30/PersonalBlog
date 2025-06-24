// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// Setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

// Hardcoded credentials
const adminUser = { username: 'admin', password: 'password' };

// Routes
// Home Page
app.get('/', (req, res) => {
    const files = fs.readdirSync('./articles');
    const articles = files.map(file => JSON.parse(fs.readFileSync(`./articles/${file}`)));
    res.render('home', { articles });
});

// Article Page
app.get('/article/:id', (req, res) => {
    const articlePath = `./articles/${req.params.id}.json`;
    if (fs.existsSync(articlePath)) {
        const article = JSON.parse(fs.readFileSync(articlePath));
        res.render('article', { article });
    } else {
        res.status(404).send('Article not found');
    }
});

// Login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === adminUser.username && password === adminUser.password) {
        req.session.isLoggedIn = true;
        res.redirect('/admin');
    } else {
        res.send('Invalid credentials');
    }
});

// Dashboard
app.get('/admin', isAuthenticated, (req, res) => {
    const files = fs.readdirSync('./articles');
    const articles = files.map(file => JSON.parse(fs.readFileSync(`./articles/${file}`)));
    res.render('dashboard', { articles });
});

// Add Article
app.get('/admin/add', isAuthenticated, (req, res) => {
    res.render('add');
});

app.post('/admin/add', isAuthenticated, (req, res) => {
    const { title, content, date } = req.body;
    const id = Date.now().toString();
    const article = { id, title, content, date };
    fs.writeFileSync(`./articles/${id}.json`, JSON.stringify(article));
    res.redirect('/admin');
});

// Edit Article
app.get('/admin/edit/:id', isAuthenticated, (req, res) => {
    const article = JSON.parse(fs.readFileSync(`./articles/${req.params.id}.json`));
    res.render('edit', { article });
});

app.post('/admin/edit/:id', isAuthenticated, (req, res) => {
    const { title, content, date } = req.body;
    const article = { id: req.params.id, title, content, date };
    fs.writeFileSync(`./articles/${req.params.id}.json`, JSON.stringify(article));
    res.redirect('/admin');
});

// Delete Article
app.post('/admin/delete/:id', isAuthenticated, (req, res) => {
    fs.unlinkSync(`./articles/${req.params.id}.json`);
    res.redirect('/admin');
});

// Logout
app.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Authentication Middleware
function isAuthenticated(req, res, next) {
    if (req.session.isLoggedIn) {
        return next();
    }
    res.redirect('/login');
}

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
