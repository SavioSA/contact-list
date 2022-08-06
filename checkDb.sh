#!/bin/bash
ENV_PATH=$(dirname `realpath $0`)/.env

if [ -f $ENV_PATH ]; then
    # Load Environment Variables
    export $(cat $ENV_PATH | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi

apk add mysql mysql-client
mkdir /run/mysqld
mysql_install_db

echo "Waiting for database..."
while !(mysql -u$MYSQL_USER --port=$MYSQL_PORT --protocol=TCP -h 172.27.0.3 -p$MYSQL_PASSWORD -e"use $MYSQL_DATABASE;")
do
echo "Waiting for database..."
sleep 10
done
