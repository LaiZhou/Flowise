## 开发服务器启动
 #```
 # setsid  nohup sh start.sh &
 #
 #```
#sudo lsof -i -P | grep LISTEN | grep :4000
#sudo lsof -i -P | grep LISTEN | grep :8080
pkill -9 -f "flowise"
netstat -anp | grep -Po ':4000\s.*LISTEN.*?\K\d+(?=/)' | xargs kill
pnpm start
