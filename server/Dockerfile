# backend/Dockerfile
FROM node:20-alpine
RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

# Generate Prisma client before building
RUN pnpm prisma generate

RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "start"]