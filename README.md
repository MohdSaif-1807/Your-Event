# Your-Event

## Overview

This is a MERN (MongoDB, Express.js, React, Node.js) stack application integrated with Google OAuth. Users can log in using their Google accounts to view and create events in their Google Calendar.

## Features

- **Google OAuth Authentication**: Secure login using Google accounts.
- **View Events**: Fetch and display all events from the user's Google Calendar.
- **Create Events**: Allow users to create new events directly in their Google Calendar.
- **User-Friendly Interface**: Intuitive UI for managing calendar events.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js with Google OAuth
- **API**: Google Calendar API
- **CSS Framework**: Tailwind CSS 

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database (local or cloud).
- Google Cloud Platform account for OAuth credentials.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MohdSaif-1807/Your-Event.git
   cd your-repo-name
   ```

2. **Backend Setup**:

   - Navigate to the backend directory and install dependencies:

     ```bash
     cd backend
     npm install
     ```

   - Create a `.env` file in the `backend` directory and add your environment variables:

     ```plaintext
     PORT=5000
     DATABASE_URL=mongodb://localhost:27017/your-db-name
     GOOGLE_CLIENT_ID=your-google-client-id
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     SECRET_KEY=your-session-secret
     ```

   - Start the backend server:

     ```bash
     npm run dev
     ```

3. **Frontend Setup**:

   - Navigate to the frontend directory and install dependencies:

     ```bash
     cd frontend
     npm install
     ```

   - Start the frontend server:

     ```bash
     npm start
     ```

### Usage

1. **Login**: Open the application in your browser. Click on the "Login with Google" button to authenticate.
2. **View Events**: After logging in, you will see all your Google Calendar events.
3. **Create Events**: Use the "Create Event" form to add new events to your calendar.

## Screenshots

Login Screen:
![image](https://github.com/user-attachments/assets/e243f150-db31-4fae-aefe-0d483c5ae49e)

Getting Logged-In with Google OAUTH2:
![image](https://github.com/user-attachments/assets/609aeab8-3400-49ce-ae2f-f7defbb33602)

Dashboard:
![image](https://github.com/user-attachments/assets/2edaa037-16ff-47dc-90fc-6705f8712b56)

New Event Creation:
![image](https://github.com/user-attachments/assets/720eb3ab-04dc-4b1f-af63-8fc15b6ada58)

Event added and listed Successfully:
![image](https://github.com/user-attachments/assets/6d1c88ce-6c5f-4afd-847b-66e631fb4978)

Cross verifying in Google Calendar:
![image](https://github.com/user-attachments/assets/dfd58872-cd50-4aef-aeb2-23a53d698a82)

Login details added in database:
![image](https://github.com/user-attachments/assets/c5ee667b-97e5-4af2-a56b-11569a60a8e3)








