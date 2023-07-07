#!/bin/bash

COMPOSE="/usr/local/bin/docker-compose --no-ansi"
DOCKER="/usr/bin/docker"

cd /home/stark/vue_workspace/vuegram
$COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP vue-nginx
$DOCKER system prune -af
