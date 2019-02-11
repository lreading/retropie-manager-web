#!/bin/bash

CONTAINER_NAME="retropie-manager-web-database"
IMAGE_NAME=$CONTAINER_NAME
TAG=latest

help() {
    echo 'start.sh - Starts the Postgres DB for Retropie Manager Web'
    echo
    echo 'Provide an env file to load the environment from'
    echo
    echo 'Required arguments: '
    echo -e '\t\t"-e"\tenvironment: the name of the environment file'
    echo
    echo 'Usage: ./start.sh -e dev.env'
    echo
}

if [[ $# -eq 0 ]] ; then
    help
    exit 0
fi

while getopts ":e:t:" opt; do
    case $opt in
        e)
            ENV_FILE="../env/$OPTARG"
            ;;
        h)
            help
            exit 0
            ;;
        \?)
            echo "Invalid option -$OPTARG"
            help
            exit 1
            ;;
  esac
done

if [ ! -f $ENV_FILE ]; then
    echo "Environment $ENV_FILE not found."
    exit 1
fi

RUNNING_CONTAINERS="$(docker ps -f name=$CONTAINER_NAME -q | wc -l)"
if [ $RUNNING_CONTAINERS -ne 0 ]; then 
    echo "Detected running database container, exiting."
    exit 0
fi

docker build -t $IMAGE_NAME:$TAG .

docker run \
    --name $CONTAINER_NAME \
    --env-file $ENV_FILE \
    -p 5432:5432 \
    -d \
    $IMAGE_NAME:$TAG
