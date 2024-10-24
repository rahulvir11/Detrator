## Features

- User authentication via a simple username input.
- Post comments with associated usernames.
- View comments in real-time without refreshing the page.
- Responsive and mobile-friendly UI using Material UI.
- Comments stored in a MySQL database.

## Technologies

- **Front-End:** Next.js, Material UI, Axios
    -  npm install
    -  npm run dev
- **Back-End:** Node.js, Express, MySQL, Socket.IO
  // please change password and database according your mysql
  - const db = mysql.createConnection({
    - host: 'localhost',
    - user: 'root',
    - password: 'root@123',
    - database: 'comments_db'
  - });

 - cd Backend
 - npm install
 - npm run dev
- **Database:** MySQL

## API Endpoints
- **Authentication** 
   - POST /api/login Accepts a username and returns a session ID.

- **Comments**
    - GET /api/comments  Fetches the list of comments from the MySQL database.
    - POST /api/comments  Accepts a comment with the associated username and stores it in the MySQL database.