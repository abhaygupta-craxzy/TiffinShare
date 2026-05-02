# Running TiffinShare with Docker 🐳

This project is now Dockerized, making it incredibly easy to run on any machine without needing to install Node.js or MongoDB locally.

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

## How to Start
1. Open your terminal in the root directory of the project.
2. Run the following command:
   ```bash
   docker compose up --build
   ```
3. Once the containers are running:
   - **Frontend:** [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://localhost:5000](http://localhost:5000)
   - **MongoDB:** Accessible on `localhost:27017`

## Stopping the App
To stop the application, press `Ctrl + C` in the terminal or run:
```bash
docker compose down
```

## Useful Commands
- **View logs:** `docker compose logs -f`
- **Restart a specific service:** `docker compose restart backend`
