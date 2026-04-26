# Fullstack Project

React + Spring Boot with CI/CD

## 🏗️ Project Structure

```
fullstack-project/
├── frontend/           # React (Vite)
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── firebase.json
│   └── Dockerfile
├── backend/            # Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── docker-compose.yml
├── CI_CD_SETUP.md
└── .github/workflows/
    ├── ci.yml
    ├── ci-artifacts.yml
    ├── deploy-frontend.yml
    ├── deploy-backend.yml
    └── ci-cd.yml
```

## 🚀 Quick Start

### Local Development

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
mvn spring-boot:run
```

### With Docker

```bash
docker compose up
```

## 🔧 CI/CD Setup

See [CI_CD_SETUP.md](CI_CD_SETUP.md) for detailed setup instructions.

### Required GitHub Secrets:
- `FIREBASE_TOKEN` - Firebase deployment
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `EC2_HOST` - AWS EC2 host
- `EC2_USER` - SSH username
- `EC2_SSH_KEY` - Private SSH key

## 📝 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/hello` | Hello message |

## 🧪 Testing

```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
mvn test
```