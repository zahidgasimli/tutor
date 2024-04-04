#!/bin/bash
sshpass -p $SSH_PASSWORD scp -r ./README.md root@167.71.52.4:/data/caddy/data/www
