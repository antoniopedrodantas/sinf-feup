#! /bin/bash

tmp_secret=`tr -dc A-Za-z0-9 </dev/urandom | head -c 32 ; echo ''`  
        

sed -i "s/^TOKEN_SECRET=.*/TOKEN_SECRET=$tmp_secret/g" .env