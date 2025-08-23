from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import io
from PIL import Image
import uvicorn

app = FastAPI(title="PeanutGuard AI Backend")

# CORS
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

class DetectionResponse(BaseModel):
	pestName: str
	confidence: float
	description: str
	severity: str
	recommendations: List[str]

class WeatherRequest(BaseModel):
	latitude: float
	longitude: float

class WeatherResponse(BaseModel):
	temp_c: float
	rain_mm_next_24h: float
	advice: str

class SatelliteResponse(BaseModel):
	ndvi: float
	description: str

class AlertRequest(BaseModel):
	to_phone: str
	message: str

class FeedbackRequest(BaseModel):
	image_id: Optional[str]
	predicted_label: Optional[str]
	correct_label: Optional[str]
	comments: Optional[str]

pest_db = [
	{
		"pestName": "Cicadella viridis (Green Leaf Hopper)",
		"description": "Sap-sucking insect causing yellowing and stunted growth in peanut plants.",
		"severity": "high",
		"recommendations": [
			"Apply neem oil spray during early morning or evening",
			"Introduce natural predators like ladybugs",
			"Remove infected plant debris",
			"Monitor weekly for population changes",
		],
	},
	{
		"pestName": "Aphis craccivora (Cowpea Aphid)",
		"description": "Small insects on leaves and stems causing leaf curling and yellowing.",
		"severity": "medium",
		"recommendations": [
			"Use insecticidal soap solution",
			"Encourage beneficial insects",
			"Apply reflective mulch",
			"Regular monitoring required",
		],
	},
	{
		"pestName": "Thrips palmi (Melon Thrips)",
		"description": "Tiny insects causing silver-white streaks and transmitting viral diseases.",
		"severity": "high",
		"recommendations": [
			"Use blue sticky traps",
			"Apply systemic insecticides",
			"Maintain field hygiene",
			"Early detection is crucial",
		],
	},
]

# Placeholder inference that returns a pseudo-random pest with 85-95% confidence
@app.post("/detect", response_model=DetectionResponse)
async def detect_pest(file: UploadFile = File(...)):
	content = await file.read()
	# Load image to verify
	try:
		Image.open(io.BytesIO(content)).convert("RGB")
	except Exception:
		return DetectionResponse(
			pestName="Unknown",
			confidence=0.0,
			description="Invalid image uploaded",
			severity="low",
			recommendations=["Please upload a valid image"]
		)
	import random
	p = random.choice(pest_db)
	confidence = random.random() * 10 + 85.0
	return DetectionResponse(
		pestName=p["pestName"],
		confidence=round(confidence, 1),
		description=p["description"],
		severity=p["severity"],
		recommendations=p["recommendations"],
	)

@app.post("/weather", response_model=WeatherResponse)
async def get_weather(req: WeatherRequest):
	# Minimal Open-Meteo integration without API key
	# For now, stub with deterministic data
	temp_c = 30.5
	rain_mm_next_24h = 5.2
	advice = "Delay spraying until after rainfall; schedule treatment tomorrow morning."
	return WeatherResponse(temp_c=temp_c, rain_mm_next_24h=rain_mm_next_24h, advice=advice)

@app.post("/satellite", response_model=SatelliteResponse)
async def get_satellite(req: WeatherRequest):
	# Stub NDVI; hook up to Sentinel Hub or Google Earth Engine later
	ndvi = 0.62
	description = "Healthy vegetation with localized stress zones; monitor weekly."
	return SatelliteResponse(ndvi=ndvi, description=description)

@app.post("/alert")
async def send_alert(req: AlertRequest):
	# Twilio WhatsApp integration would go here; stub success
	# Validate E.164-ish format
	if not req.to_phone or len(req.to_phone) < 8:
		return {"status": "error", "message": "Invalid phone number"}
	return {"status": "sent", "to": req.to_phone}

@app.post("/feedback")
async def submit_feedback(req: FeedbackRequest):
	# Persist to SQLite in the future; for now echo
	return {"status": "ok"}

if __name__ == "__main__":
	uvicorn.run("app.main:app", host="0.0.0.0", port=int(os.getenv("PORT", "8000")), reload=False)