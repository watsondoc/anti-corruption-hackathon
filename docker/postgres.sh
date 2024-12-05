#!/bin/bash

clear
echo $SEPARATOR
echo "Disclaimer:"
echo "  1. Any existing container named \"db-pg15\" will be DELETED"
echo "  2. New PostgresSQL container will be started with name \"db-pg15\""
echo $SEPARATOR
read -p "Press [Enter] to proceed..."

clear
echo "Stopping and removing existing container..."
docker stop db-pg15;
docker rm --force db-pg15;

echo "Starting new postgres service..."
docker network create custom_bridge;
docker run -d --network custom_bridge -e POSTGRES_DB=corruption -e POSTGRES_HOST_AUTH_METHOD=trust -p 54321:5432 --name db-pg15 postgres:15

