@echo off
geth --datadir data --networkid 15 --nat extip:192.168.1.207 --http --http.api eth,miner,web3,admin,personal,net --http.addr "0.0.0.0" --http.corsdomain "*" --allow-insecure-unlock console
pause