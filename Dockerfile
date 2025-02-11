# Build local monorepo image
# docker build --no-cache -t  flowise .

# Run image
# docker run -d -p 3000:3000 flowise

FROM node:20-alpine


#install PNPM globaly
RUN npm install -g pnpm


ENV NODE_OPTIONS=--max-old-space-size=8192

WORKDIR /usr/src

# Copy app source
COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm pnpm install 

RUN pnpm build

EXPOSE 4000

CMD [ "pnpm", "start" ]
