# SecondBrain🧠

SecondBrain is a personal knowledge management app that allows users to save and organize useful links for future reference. Users can also share their collection of saved resources with others.

## Features

- **User Authentication**: Secure authentication using **JWT** and **password hashing**.
- **Zod Validation**: Ensures data integrity and validation.
- **Save & Organize Links**: Store and categorize useful links.
- **Categorization**: Automatically segregate links as **Twitter**, **YouTube**, or **Other** based on the URL.
- **Share Your Brain**: Easily share your saved links with others.
- **Fully Typed**: Utilizes **TypeScript** for both frontend and backend.

## Tech Stack

### Frontend:

- **React** with **TypeScript**
- **React Hooks** for state management
- **Tailwind CSS** for styling

### Backend:

- **Node.js** with **Express.js**
- **MongoDB** for database
- **Mongoose** with **TypeScript schemas, types, and interfaces**
- **JWT Authentication** for secure user sessions
- **Zod** for input validation

## Installation & Setup

### Clone the repository:

```sh
git clone https://github.com/yourusername/secondbrain.git
cd secondbrain
```

### Install dependencies:

```sh
npm install
```

### Set up environment variables:

#### Create a `.env` file in the `backend` directory with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run the application:

#### Start the backend and frontend together:

```sh
cd backend && npm run dev
```

## Usage

- Sign up and log in to start saving links.
- Organize and categorize saved links for easy access.
- Automatically categorize links as Twitter, YouTube, or Other.
- Share your collection with others when needed.

## Contributing

Feel free to submit issues and pull requests to improve SecondBrain.

## License

This project is licensed under the **MIT License**.
