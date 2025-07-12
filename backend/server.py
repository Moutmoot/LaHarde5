from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import uuid
from datetime import datetime, date
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

class Event(BaseModel):
    titre: str
    description: str
    date: str  # YYYY-MM-DD format
    heure: str  # HH:MM format
    lieu: str
    type_evenement: str  # entraînement, match, tournoi, événement_social
    places_max: Optional[int] = None
    prix: Optional[str] = None

class PhotoGallery(BaseModel):
    titre: str
    description: str
    url_image: str
    categorie: str  # équipe, entraînement, match, événement
    date_prise: Optional[str] = None

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

# New Events Management
@app.get("/api/evenements")
async def get_upcoming_events():
    try:
        events = []
        # Get events that are today or in the future
        today = datetime.now().strftime("%Y-%m-%d")
        
        async for doc in db.evenements.find({"date": {"$gte": today}}).sort("date", 1):
            doc["_id"] = str(doc["_id"])
            events.append(doc)
        
        return {"evenements": events}
    except Exception as e:
        logger.error(f"Error fetching events: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des événements")

@app.post("/api/evenements")
async def create_event(event: Event):
    try:
        event_doc = {
            "id": str(uuid.uuid4()),
            "titre": event.titre,
            "description": event.description,
            "date": event.date,
            "heure": event.heure,
            "lieu": event.lieu,
            "type_evenement": event.type_evenement,
            "places_max": event.places_max,
            "prix": event.prix,
            "date_creation": datetime.utcnow().isoformat(),
            "statut": "actif"
        }
        
        result = await db.evenements.insert_one(event_doc)
        
        if result.inserted_id:
            logger.info(f"New event created: {event.titre}")
            return {
                "success": True,
                "message": "Événement créé avec succès!",
                "event_id": event_doc["id"]
            }
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de la création de l'événement")
            
    except Exception as e:
        logger.error(f"Event creation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

# Photo Gallery Management
@app.get("/api/galerie")
async def get_photo_gallery():
    try:
        photos = []
        async for doc in db.galerie.find({}).sort("date_prise", -1):
            doc["_id"] = str(doc["_id"])
            photos.append(doc)
        
        return {"photos": photos}
    except Exception as e:
        logger.error(f"Error fetching gallery: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération de la galerie")

@app.post("/api/galerie")
async def add_photo_to_gallery(photo: PhotoGallery):
    try:
        photo_doc = {
            "id": str(uuid.uuid4()),
            "titre": photo.titre,
            "description": photo.description,
            "url_image": photo.url_image,
            "categorie": photo.categorie,
            "date_prise": photo.date_prise,
            "date_ajout": datetime.utcnow().isoformat(),
            "statut": "actif"
        }
        
        result = await db.galerie.insert_one(photo_doc)
        
        if result.inserted_id:
            logger.info(f"New photo added to gallery: {photo.titre}")
            return {
                "success": True,
                "message": "Photo ajoutée à la galerie avec succès!",
                "photo_id": photo_doc["id"]
            }
        else:
            raise HTTPException(status_code=500, detail="Erreur lors de l'ajout de la photo")
            
    except Exception as e:
        logger.error(f"Photo gallery error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")

@app.get("/api/stats")
async def get_club_stats():
    try:
        total_inscriptions = await db.inscriptions.count_documents({})
        total_contacts = await db.contacts.count_documents({})
        total_evenements = await db.evenements_inscriptions.count_documents({})
        total_photos = await db.galerie.count_documents({})
        total_events_upcoming = await db.evenements.count_documents({"date": {"$gte": datetime.now().strftime("%Y-%m-%d")}})
        
        return {
            "total_inscriptions": total_inscriptions,
            "total_contacts": total_contacts,
            "total_evenements": total_evenements,
            "total_photos": total_photos,
            "evenements_a_venir": total_events_upcoming,
            "membres_actifs": total_inscriptions  # Simplified for now
        }
    except Exception as e:
        logger.error(f"Stats error: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des statistiques")

# Initialize some default data
@app.on_event("startup")
async def startup_event():
    # Add some default events if none exist
    events_count = await db.evenements.count_documents({})
    if events_count == 0:
        default_events = [
            {
                "id": str(uuid.uuid4()),
                "titre": "Entraînement débutants",
                "description": "Séance spéciale pour les nouveaux membres. Venez découvrir le roller derby dans une ambiance conviviale !",
                "date": "2025-01-20",
                "heure": "14:00",
                "lieu": "Gymnase Municipal - 123 Rue du Sport, Paris",
                "type_evenement": "entraînement",
                "places_max": 15,
                "prix": "Gratuit pour les nouveaux",
                "date_creation": datetime.utcnow().isoformat(),
                "statut": "actif"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Match amical vs. Les Fauves",
                "description": "Match amical contre l'équipe des Fauves de Lyon. Venez encourager La Harde !",
                "date": "2025-01-25",
                "heure": "19:00",
                "lieu": "Gymnase Municipal - 123 Rue du Sport, Paris",
                "type_evenement": "match",
                "places_max": 50,
                "prix": "5€ entrée",
                "date_creation": datetime.utcnow().isoformat(),
                "statut": "actif"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Tournoi Régional d'Hiver",
                "description": "Participation au tournoi régional. L'occasion de voir du roller derby de haut niveau !",
                "date": "2025-02-15",
                "heure": "09:00",
                "lieu": "Palais des Sports - Créteil",
                "type_evenement": "tournoi",
                "places_max": None,
                "prix": "10€ - transport inclus",
                "date_creation": datetime.utcnow().isoformat(),
                "statut": "actif"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Soirée conviviale équipe",
                "description": "Soirée détente avec toute l'équipe. Pizzas, jeux et bonne humeur au programme !",
                "date": "2025-02-08",
                "heure": "20:00",
                "lieu": "Local du club",
                "type_evenement": "événement_social",
                "places_max": 30,
                "prix": "15€ repas inclus",
                "date_creation": datetime.utcnow().isoformat(),
                "statut": "actif"
            }
        ]
        
        await db.evenements.insert_many(default_events)
        logger.info("Default events added to database")
    
    # Add some default gallery photos if none exist
    photos_count = await db.galerie.count_documents({})
    if photos_count == 0:
        default_photos = [
            {
                "id": str(uuid.uuid4()),
                "titre": "Entraînement en équipe",
                "description": "Séance d'entraînement intensive avec toute l'équipe de La Harde",
                "url_image": "https://images.unsplash.com/photo-1568557412756-7d219873dd11",
                "categorie": "entraînement",
                "date_prise": "2024-12-15",
                "date_ajout": datetime.utcnow().isoformat(),
                "statut": "actif"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Préparation physique",
                "description": "Échauffement avant un match important",
                "url_image": "https://images.unsplash.com/photo-1526676537331-7747bf8278fc",
                "categorie": "entraînement",
                "date_prise": "2024-12-10",
                "date_ajout": datetime.utcnow().isoformat(),
                "statut": "actif"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Match contre les Tigres",
                "description": "Action de jeu lors du match contre l'équipe des Tigres",
                "url_image": "https://images.unsplash.com/photo-1559302995-ab792ee16ce8",
                "categorie": "match",
                "date_prise": "2024-11-28",
                "date_ajout": datetime.utcnow().isoformat(),
                "statut": "actif"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Esprit d'équipe",
                "description": "La cohésion de l'équipe La Harde en action",
                "url_image": "https://images.unsplash.com/photo-1573301724534-c9ad93472d13",
                "categorie": "équipe",
                "date_prise": "2024-12-01",
                "date_ajout": datetime.utcnow().isoformat(),
                "statut": "actif"
            },
            {
                "id": str(uuid.uuid4()),
                "titre": "Concentration avant match",
                "description": "Les joueuses se préparent mentalement avant le coup d'envoi",
                "url_image": "https://images.unsplash.com/photo-1603124076947-7b6412d8958e",
                "categorie": "équipe",
                "date_prise": "2024-11-20",
                "date_ajout": datetime.utcnow().isoformat(),
                "statut": "actif"
            }
        ]
        
        await db.galerie.insert_many(default_photos)
        logger.info("Default gallery photos added to database")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)