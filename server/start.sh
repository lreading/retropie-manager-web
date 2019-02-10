#!/bin/bash

help() {
    echo 'start.sh - Starts the Server for Retropie Manager Web'
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

if [ ! -f "$ENV_FILE" ]; then
    echo "Environment $ENV_FILE not found."
    exit 1
fi

source $ENV_FILE

PGHOST=localhost \
    PGUSER=$POSTGRES_USER \
    PGDATABASE=$POSTGRES_DB \
    PGPASSWORD=$POSTGRES_PASSWORD \
    PGPORT=5432 \
    npm run start
