# PeanutGuard AI

Web-based pest detection and management for peanut farming with FastAPI backend and React frontend.

## Features
- CNN-based detection API (stubbed) with EVITA/MFO hooks ready
- Weather-aware treatment advice (stubbed Open-Meteo)
- Satellite NDVI insights (stubbed)
- WhatsApp alert endpoint (Twilio-ready stub)
- Feedback collection endpoint
- Multilingual UI (English/Hindi)

## Prerequisites
- Node 18+
- Python 3.10+
- On Debian/Ubuntu: `sudo apt-get install -y python3-venv`

## Backend (FastAPI)
```
python3 -m venv /workspace/.venv
source /workspace/.venv/bin/activate
pip install -r backend/requirements.txt
cp backend/.env.example backend/.env # optional for Twilio
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --app-dir backend --reload
```

## Frontend (Vite + React + Tailwind)
Create `.env.local` at repo root if needed:
```
VITE_API_BASE_URL=http://localhost:8000
```
Run the dev server:
```
npm install
npm run dev
```

## Environment Variables
Backend `.env`:
- `PORT` (default 8000)
- `CORS_ORIGINS` (default *)
- `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_WHATSAPP_FROM` (optional)

Frontend `.env.local`:
- `VITE_API_BASE_URL` pointing to FastAPI origin

## Notes
- Detection is currently a random stub. Replace in `backend/app/main.py` and add a real model server.
- Integrate Open-Meteo and Sentinel/Google Earth Engine for production data.
- EVITA transformer blocks and MFO optimization should be implemented in a dedicated model service.