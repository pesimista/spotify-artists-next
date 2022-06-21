## Spotify Artists

This is a project based of the Spotify API. The main goal is to allow the user to search for their favourite artists and manage their saved albums. In order to do this the already saved albums should be listed under the profile screen where the user can choose if they want to remove it. 

this serves the purpose of being a practice environment, and portfolios project for future reference

## Running it locally

As this project relies on the Spotify API, it requires some key properties to properly set it up. In development you can set up the `.env.local` with all these keys listed in the `.env` file, the project will pick them up automatically. Feel free to use your own requesting them from the [Spotify Developer site](https://developer.spotify.com/)

To get it running this should be enough:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test the live version!

This app is currently being hosted with [Vercel](https://spotify-artists.vercel.app/dashboard). You can try it from that link given that your account is added to the developer account dashboard

## File structure

It follows (kind of) the standard structure for any Next.js project

```
project/
│   .env.local (you have to add this one)
│   .eslintrc
│   .gitignore
│   next-env.d.ts
│   next.config.js
│   package.json
│   README.md
│
└───components/
│   │   ListItem.tsx
│   │   Navbar.tsx
│   └───...
│
└───lib/
│   │   
│   └───hooks
│   │   │   useUser.hook.ts
│   │   │   ...
│   │
│   └───services
│   │   │   someservice.ts
│   │   │   ...
│   │
│   └───types/
│       └───types folder/
│       │   ...
│
└───pages/
│   │   _app.tsx
│   │   index.tsx
│   │   ...
│
└───public/
│   │   favicon.ico
│   │   ...
│   └─── 
│
└───test/
│   │   mock
│   │   ...
│   └─── 
│
└───styles/ (considering moving to lib)
    │   global.css
    |   ...
    └─── 

```
