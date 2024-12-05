#!/bin/bash

clear
echo $SEPARATOR
echo "Disclaimer:"
echo "  1. Any existing container named \"mongo\" will be DELETED"
echo "  2. New Mongo container will be started with name \"mongo\""
echo $SEPARATOR
read -p "Press [Enter] to proceed..."

clear
echo "Stopping and removing existing container..."
docker stop mongo;
docker rm --force mongo;

echo "Starting new postgres service..."
docker network create custom_bridge;
docker run -d --network custom_bridge -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password -e MONGO_INITDB_DATABASE=corruption -p 27017:27017 --name mongo mongo:6

