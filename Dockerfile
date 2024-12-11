FROM node:20

# 환경 변수 설정
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# 환경 변수 파일 복사
COPY .env.production /app/.env.production

# 애플리케이션 코드 복사
WORKDIR /app
COPY . /app

# 의존성 설치 및 빌드
COPY package.json yarn.lock ./
RUN yarn install && yarn build

# 포트 공개 (Elastic Beanstalk의 기본 포트는 8080)
EXPOSE 8080

# 서버 실행
CMD ["yarn", "start"]
