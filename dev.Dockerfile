FROM node:20-alpine

WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package.json yarn.lock ./
RUN yarn install

# 소스 코드 복사
COPY . .

# 개발 서버 포트
EXPOSE 3000

# 개발 환경 설정
ENV NODE_ENV=development

# 개발 서버 실행
CMD ["yarn", "develop"]