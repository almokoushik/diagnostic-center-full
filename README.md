# Diagnostic Center and Appointment Platform

A full-stack diagnostic/appointments platform with:
- User-facing frontend (Vite + React)
- Admin/Doctor dashboard (Vite + React)
- Backend API (Express + MongoDB + Cloudinary)

Payments (Stripe/Razorpay) have been removed. Cross-navigation between Admin and User sites is available via navbar buttons.

## Repository Structure

```
/
  admin/       # Admin/Doctor dashboard (Vite)
  backend/     # Express API (serverless-ready for Vercel)
  frontend/    # User-facing site (Vite)
```

## Tech Stack
- Frontend: React 18, Vite, TailwindCSS, React Router
- Admin: React 18, Vite, TailwindCSS, React Router
- Backend: Node.js, Express, Mongoose, Cloudinary
- Database: MongoDB (Atlas or self-hosted)
- Hosting: Vercel (3 projects from the monorepo)

## Local Development

1) Backend
```bash
cd backend
npm install
# create .env with the variables shown below
npm run server
```

2) Frontend (User site)
```bash
cd frontend
npm install
# create .env with VITE_ variables below
npm run dev
```

3) Admin (Dashboard)
```bash
cd admin
npm install
# create .env with VITE_ variables below
npm run dev
```

## Environment Variables

### Backend (.env in `backend/`)
Required:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin_login_email
ADMIN_PASSWORD=admin_login_password
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
# CURRENCY is optional if you don’t show currency symbols in UI
CURRENCY=USD
```

### Frontend (User) – `.env` in `frontend/`
```
VITE_BACKEND_URL=https://your-backend.vercel.app
VITE_ADMIN_URL=https://your-admin.vercel.app
```

### Admin (Dashboard) – `.env` in `admin/`
```
VITE_BACKEND_URL=https://your-backend.vercel.app
VITE_FRONTEND_URL=https://your-frontend.vercel.app
VITE_CURRENCY=USD
```

### Backend Project
- Root directory: `backend`
- Framework preset: Other
- Build command: (leave empty)
- Output directory: (leave empty)
- Add environment variables (see Backend section) in Vercel → Settings → Environment Variables
- Deploy

The backend includes:
- `backend/app.js` exporting the Express app
- `backend/api/index.js` for Vercel Serverless Function entry
- `backend/vercel.json` routes all paths to the function

### Frontend Project (User)
- Root directory: `frontend`
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  - `VITE_BACKEND_URL=https://your-backend.vercel.app`
  - `VITE_ADMIN_URL=https://your-admin.vercel.app`
- Deploy

`frontend/vercel.json` already handles SPA rewrites.

### Admin Project (Dashboard)
- Root directory: `admin`
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  - `VITE_BACKEND_URL=https://your-backend.vercel.app`
  - `VITE_FRONTEND_URL=https://your-frontend.vercel.app`
  - `VITE_CURRENCY=USD`
- Deploy

`admin/vercel.json` already handles SPA rewrites.

## Cross‑Navigation Buttons
- Frontend navbar shows an “Admin” button when `VITE_ADMIN_URL` is set.
- Admin navbar shows a “User” button when `VITE_FRONTEND_URL` is set.


## Scripts
Backend (`backend/package.json`):
- `npm start` → start Express on PORT (default 4000)
- `npm run server` → start with nodemon

Frontend/Admin:
- `npm run dev` → Vite dev server
- `npm run build` → production build
- `npm run preview` → preview built app

## API Overview (Selected)
Base URL: `VITE_BACKEND_URL`

- `GET /api/doctor/list` – list of doctors
- Auth (User):
  - `POST /api/user/register`
  - `POST /api/user/login`
  - `GET /api/user/get-profile` (requires header: `token`)
  - `POST /api/user/update-profile` (multipart form, `image` optional)
  - `POST /api/user/book-appointment`
  - `GET /api/user/appointments`
  - `POST /api/user/cancel-appointment`
- Admin endpoints under `/api/admin/...`
- Doctor endpoints under `/api/doctor/...`

