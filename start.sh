## 开发服务器启动
 #```
 # setsid  nohup sh start.sh &
 #
 #```
# pkill -9 -f "flowise" && kill -9 $(sudo lsof -i -P | grep LISTEN | grep :4000| grep 'node.*hello' | awk '{print $2}') && kill -9 $(sudo lsof -i -P | grep LISTEN | grep :8080| grep 'node.*hello' | awk '{print $2}')
pkill -9 -f "flowise" && netstat -anp | grep -Po ':4000\s.*LISTEN.*?\K\d+(?=/)' | xargs kill
git pull
cd ../FlowiseChatEmbed
git pull
yarn install
rm -rf dist
yarn build
cd ../Flowise
cd packages/ui
rm -rf packages/ui/build
pnpm build
cd ../../
pnpm install
pnpm build
pnpm start
