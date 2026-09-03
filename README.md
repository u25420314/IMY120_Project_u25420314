# IMY120_Project_u25420314
This is a photo sharing app that I have decided to call Flick, its cool a cool breezy and easy to use feel, and by sharing all of your wicked and cool images it makes your life turn into a movie

IMY 220 D1
u25420314 - Christian Khaled

Github Repository:
https://github.com/u25420314/IMY120_Project_u25420314


How to use Docker

I have made 2 separate docker containers, one for frontend and one for
backend. They must be built and run separately.

1. Backend

    Open a terminal and cd into backend:

        cd backend

    Build the docker image:

        docker build -t photoapp-backend .

    Run the container:

        docker run -p 3000:3000 photoapp-backend

    The backend server will be running on http://localhost:3000


2. Frontend

    Open a second terminal and cd into frontend:

        cd frontend

    Build the docker image:

        docker build -t photoapp-frontend .

    Run the container:

        docker run -p 5173:5173 photoapp-frontend

    The frontend will be running on http://localhost:5173


3. Use the application

    Once both containers are running, open a browser and go to:

        http://localhost:5173

    Both containers must be running at the same time for the application
    to work
