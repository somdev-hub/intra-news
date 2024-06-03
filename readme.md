# Description

Intra news is built with React.js and typescript. It is a news app that fetches news from the newsapi.org API. It has two sections where you can view the top headlines for news. In the backend, which is built using node.js and express.js, the app fetches the data from newsapi.org and caches it in a redis database. The frontend then fetches the data from the backend and displays it to the user. The app is hosted on vercel and can be accessed [here](https://intra-news.vercel.app/).

# Frontend

The frontend is built with React.js and typescript. It uses the Axios library to make requests to the backend. The app has two sections, one for the top headlines and the other for the latest news. The app uses react-router-dom to handle routing. The app is styled using the tailwind css library.

## techstack

- React.js
- Typescript
- Axios
- Tailwind CSS

## Dependencies

- react
- axios
- react-icons
- tailwindcss

## Installation

To install the dependencies, run the following command:

```bash
cd client
npm install
```

To start the development server, run the following command:

```bash
npm run dev
```

# Backend

The backend is built with node.js and express.js. It fetches the data from newsapi.org and caches it in a redis database. The backend has two routes, one for fetching the top headlines and the other for fetching the latest news. The backend is hosted on render.com. For production, redislabs is used as the redis database.

## techstack

- Node.js
- Express.js
- Redis

## Dependencies

- axios
- express
- redis
- body-parser
- cors
- dotenv

## Routes

- `api/news` - Fetches the latest news.
- `api/top-headlines` - Fetches the top headlines for hot topics like business, technology, etc.

## Installation

To install the dependencies, run the following command:

```bash
cd server
npm install
```

To start the development server, run the following command:

<i>Note: For redis to work, you have to add the REDIS_HOST, REDIS_POST AND REDIS_PASSOWRD in a .env file for more reference check the redis documentation [here](https://redis.io/documentation).
</i>

```bash
node server
```
