# Personal Blog Project

## Project URL
https://roadmap.sh/projects/personal-blog

## Description
This is a simple personal blog with a guest section for reading articles and an admin section for managing articles (add, edit, delete). The articles are stored as JSON files in the local filesystem.

## Features
### Guest Section
- View all published articles
- View individual articles

### Admin Section
- Login to admin dashboard
- Add new articles
- Edit existing articles
- Delete articles

## Pages
- `/` : Home page listing all articles
- `/article/:id` : Article detail page
- `/login` : Admin login page
- `/admin` : Admin dashboard with list of articles
- `/admin/add` : Add article page
- `/admin/edit/:id` : Edit article page

## Usage
### Start the server
```bash
node server.js
```

### Open in browser
```
http://localhost:3000/
```

### Admin Credentials
- Username: `admin`
- Password: `password`

## Project Structure
```
personal-blog/
│
├── articles/              # Stores article JSON files
├── public/                # CSS and static files
│   └── styles.css
├── views/                 # EJS templates
├── server.js              # Main server file
└── README.md
```

## Tech Stack
- Node.js
- Express.js
- EJS (Embedded JavaScript templates)
- HTML & CSS
- File System (fs) for data storage

## Notes
- No database required
- Sessions used for admin authentication
- No external frameworks for frontend, only plain HTML and CSS
