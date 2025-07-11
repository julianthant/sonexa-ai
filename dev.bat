@echo off
echo 🚧 Stopping and removing existing containers...
docker-compose -f docker-compose.dev.yml down

echo 🧼 Cleaning dangling Docker images...
docker image prune -f

echo 🚀 Rebuilding and starting Sonexa (dev mode)...
docker-compose -f docker-compose.dev.yml up --build
pause