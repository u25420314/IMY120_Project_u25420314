IMY 220 D1
u25420314 - Christian Khaled

Github Repository:

How to use Docker
    I have made 2 seperate docker containers one for frontend and one for backend. They must be built and ran seperately

    1. backend
        open terminal and cd backend

        build the docker image:
            docker build -t photoapp-backend .
        run the container:
            docker run -p 3000:3000 photoapp-backend
        backend server will be running on http://localhost:3000

    2. frontend

        open a second terminal and cd frontend

        build the docker image:
            docker build -t photoapp-frontend .

        run the container:
            docker run -p 5173:5173 photoapp-frontend

        frontend will be running on http://localhost:5173

    3. use the application

        once all is running, open browser on http://localhost:5173