# CI/CD Pipeline Setup Guide

## 📁 Workflow Files Created

| File | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | Simple CI - runs tests on every push |
| `.github/workflows/ci-artifacts.yml` | CI with artifact storage |
| `.github/workflows/deploy-frontend.yml` | Deploy React to Firebase |
| `.github/workflows/deploy-backend.yml` | Deploy Spring Boot to AWS EC2 |
| `.github/workflows/ci-cd.yml` | **Full CI/CD pipeline** (recommended) |

---

## 🔧 Required GitHub Secrets

### For Firebase Deployment:
- `FIREBASE_TOKEN` - Run `firebase login:ci` to get token
- `FIREBASE_PROJECT_ID` - Your Firebase project ID

### For AWS EC2 Deployment:
- `EC2_HOST` - Your EC2 public IP/hostname
- `EC2_USER` - SSH username (usually `ubuntu`)
- `EC2_SSH_KEY` - Private SSH key

### Optional (for Docker):
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

---

## 🚀 Setup Steps

### 1. Firebase Setup
```bash
npm install -g firebase-tools
firebase login
firebase login:ci
```

### 2. AWS EC2 Setup
- Launch Ubuntu EC2 instance
- Open ports: 22 (SSH), 8080 (app)
- Copy SSH private key to GitHub secrets

### 3. Add Secrets
Go to: **GitHub Repo → Settings → Secrets and variables → Actions**

---

## 📋 Project Structure Expected

```
fullstack-project/
├── frontend/        # React (Vite)
├── backend/         # Spring Boot
├── docker-compose.yml (optional)
└── .github/workflows/
```

---

## ✅ Using the Pipeline

1. **Push to main** → Triggers CI (build + test)
2. **CI passes** → Triggers CD (deploy frontend + backend)
3. **Frontend** → Deployed to Firebase Hosting
4. **Backend** → Deployed to AWS EC2

---

## 🔄 Alternative: Deploy Frontend to Netlify/Vercel

### Netlify:
```yaml
- name: Deploy to Netlify
  uses: nwtgck/actions-netlify@v2.0
  with:
    publish-dir: './frontend/dist'
    production-branch: main
    github-token: ${{ secrets.GITHUB_TOKEN }}
    deploy-message: "Deploy from GitHub Actions"
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Vercel:
```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-args: '--prod'
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
```