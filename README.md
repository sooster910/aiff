## AIFF 예약 어플리케이션

- 현재 서비스 중인 어플리케이션 입니다.

## Getting Started

First, run the development server:

```
yarn dev

```

## AIFF CI/CD

![CI/CD](./aiff-ci-cd.png)

## AIFF Architecture Overview

```mermaid
flowchart TD
    subgraph Browser[브라우저]
        Client[Next.js 개발 서버:3000]
    end

    subgraph Frontend[Frontend Server :5000]
        Next[Express Server]
        ProxyMiddleware[Proxy Middleware]
        API[Express API Routes]
    end

    subgraph Backend[Backend Server :3434]
        BackendAPI[Backend API]
    end

    subgraph External[외부 서비스]
        TossPayments[Toss Payments API]
        KakaoMsg[카카오 알림톡]
        Slack[Slack API]
    end

    Client -->|1 . HTTP Request| Next
    Next -->|2 . API 요청| ProxyMiddleware
    ProxyMiddleware -->|3 . /proxy/api/**| BackendAPI
    API -->|4 . 결제 승인| TossPayments
    API -->|5 . 알림톡 발송| KakaoMsg
    API -->|6 . 주문 알림| Slack
    classDef server fill: #f9f, stroke: #333, stroke-width: 4px
    classDef proxy fill: #bbf, stroke: #333, stroke-width: 2px
    classDef external fill: #bfb, stroke: #333, stroke-width: 2px
    class Frontend server
    class Backend server
    class ProxyMiddleware proxy
class TossPayments, KakaoMsg, Slack external
Next ---|포트 5000|Frontend
BackendAPI ---|포트 3434|Backend

```

AIFF 웹 애플리케이션은 다음과 같은 4개의 계층으로 구성되어 있습니다:

### 1. 클라이언트 계층

- Next.js 개발 서버 - React 기반 클라이언트 사이드 렌더링
- 개발 환경에서의 HMR(Hot Module Replacement) 지원

### 2. 프론트엔드 서버 계층 (포트: 5000)

- Express 어플리케이션 서버로서 RESTful API 엔드포인트 제공 합니다.
- 결제, 알림 등 비즈니스 로직을 처리
- API Gateway/Proxy 역할
- 클라이언트와 백엔드 사이의 중개자 역할

### 3. 백엔드 서버 계층 (포트: 3434) - 현재 repository는 백엔드 서버 지원 X, 별도 repository에서 관리

- 핵심 비즈니스 로직 처리
- 데이터 관리 및 처리
- API 엔드포인트 제공

### 4. 외부 서비스 계층

- Toss Payments: 결제 처리
- 카카오 알림톡: 사용자 알림
- Slack: 내부 알림 및 모니터링

## API Flow

1. 클라이언트에서 API 요청 발생
2. Next.js 서버에서 요청 접수
3. Proxy Middleware가 백엔드로 요청 전달
4. 필요한 경우 외부 서비스와 통신
5. 응답을 클라이언트로 전달

## 프록시 설정

- 모든 API 요청은 `/proxy/api/**` 경로로 라우팅
- CORS 이슈 해결 및 보안 강화
- 백엔드 서버 주소 은닉

```mermaid
sequenceDiagram
    Browser ->> Express(4200): origin: localhost:3000
    Express(4200) ->> Backend(3434): origin: localhost:4200
    Note over Backend(3434): ❌ CORS 에러<br/>4200 포트는 허용되지 않음
```

```mermaid
sequenceDiagram
    Browser ->> Next.js(3000): 1. 페이지 요청
    Browser ->> Express(4200): 2. API 요청
    Note over Express(4200): Origin 헤더 수정:<br/>'localhost:5000'
    Express(4200) ->> Backend(3434): 3. 프록시 요청
    Note over Backend(3434): CORS 검사:<br/>localhost:5000 허용됨
```

