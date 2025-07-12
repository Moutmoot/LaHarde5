from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import uuid
from datetime import datetime
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL')
if not MONGO_URL:
    raise ValueError("MONGO_URL environment variable is required")

client = AsyncIOMotorClient(MONGO_URL)
db = client.laharde_db

# Pydantic models
class MemberRegistration(BaseModel):
    prenom: str
    nom: str
    email: EmailStr
    telephone: str
    age: int
    niveau_experience: str  # débutant, intermédiaire, avancé
    message: Optional[str] = None

class ContactMessage(BaseModel):
    nom: str
    email: EmailStr
    sujet: str
    message: str

class EventRegistration(BaseModel):
    nom: str
    email: EmailStr
    telephone: str
    nom_evenement: str

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "La Harde API is running"}

@app.post("/api/inscription")
async def create_member_registration(registration: MemberRegistration):
    try:
        # Create registration document
        registration_doc = {
            "id": str(uuid.uuid4()),
            "prenom": registration.prenom,
            "nom": registration.nom,
            "email": registration.email,
            "telephone": registration.telephone,
            "age": registration.age,
            "niveau_experience": registration.niveau_experience,
            "message": registration.message,
            "date_inscription": datetime.utcnow().isoformat(),
            "statut": "en_attente"
        }
        
        # Insert into database
        result = await db.inscriptions.insert_one(registration_doc)
        
        if result.inserted_id:
            logger.info(f"New registration created: {registration.email}")
            return {
                "success": True,
                "message": "Inscription reçue avec succès! Nous vous contactons bientôt.",
                "registration_id": registration_doc["id"]
            }
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de l'enregistrement")
            
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@app.get("/api/inscriptions")
async def get_registrations():
    try:
        inscriptions = []
        async for doc in db.inscriptions.find({}):
            doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
            inscriptions.append(doc)
        return {"inscriptions": inscriptions}
    except Exception as e:
        logger.error(f"Error fetching registrations: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des inscriptions")

@app.post("/api/contact")
async def create_contact_message(contact: ContactMessage):
    try:
        contact_doc = {
            "id": str(uuid.uuid4()),
            "nom": contact.nom,
            "email": contact.email,
            "sujet": contact.sujet,
            "message": contact.message,
            "date_creation": datetime.utcnow().isoformat(),
            "statut": "nouveau"
        }
        
        result = await db.contacts.insert_one(contact_doc)
        
        if result.inserted_id:
            logger.info(f"New contact message from: {contact.email}")
            return {
                "success": True,
                "message": "Message envoyé avec succès! Nous vous répondrons bientôt."
            }
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de l'envoi du message")
            
    except Exception as e:
        logger.error(f"Contact error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@app.post("/api/evenement/inscription")
async def create_event_registration(event_reg: EventRegistration):
    try:
        event_doc = {
            "id": str(uuid.uuid4()),
            "nom": event_reg.nom,
            "email": event_reg.email,
            "telephone": event_reg.telephone,
            "nom_evenement": event_reg.nom_evenement,
            "date_inscription": datetime.utcnow().isoformat(),
            "statut": "confirmé"
        }
        
        result = await db.evenements_inscriptions.insert_one(event_doc)
        
        if result.inserted_id:
            logger.info(f"New event registration: {event_reg.email} for {event_reg.nom_evenement}")
            return {
                "success": True,
                "message": f"Inscription à l'événement '{event_reg.nom_evenement}' confirmée!"
            }
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de l'inscription à l'événement")
            
    except Exception as e:
        logger.error(f"Event registration error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@app.get("/api/stats")
async def get_club_stats():
    try:
        total_inscriptions = await db.inscriptions.count_documents({})
        total_contacts = await db.contacts.count_documents({})
        total_evenements = await db.evenements_inscriptions.count_documents({})
        
        return {
            "total_inscriptions": total_inscriptions,
            "total_contacts": total_contacts,
            "total_evenements": total_evenements,
            "membres_actifs": total_inscriptions  # Simplified for now
        }
    except Exception as e:
        logger.error(f"Stats error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des statistiques")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)