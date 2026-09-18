# TodoBoard

A simple todo-list web app built with React and TypeScript.

## Features

* Create multiple todo lists
* Add, edit, complete, and delete todo items
* Google authentication
* Persistent data using Firebase Cloud Firestore
* Automatic saving and loading of todo lists

## Technologies

* React
* TypeScript
* Vite
* Firebase Authentication
* Cloud Firestore

## Running locally

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Building

Create a production build:

```bash
npm run build
```

The production files are generated in the `dist` folder.

## Firebase

Firebase is used for authentication and data storage.

Each authenticated user's TodoBoard data is stored in their own Firestore document:

```text
Users
└── <user UID>
    └── lists
```

Firestore Security Rules restrict users to their own document.

## Deployment

Firebase Hosting can be configured for the project in the future.
