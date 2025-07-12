import React, { useState } from 'react';
import './App.css';

// Données statiques (remplace la base de données)
const STATIC_DATA = {
  stats: {
    total_inscriptions: 23,
    membres_actifs: 23,
    evenements_a_venir: 4,
    total_photos: 15
  },
  
  events: [
    {
      id: "1",
      titre: "Entraînement débutants",
      description: "Séance spéciale pour les nouveaux membres. Venez découvrir le roller derby dans une ambiance conviviale !",
      date: "2025-01-20",
      heure: "14:00",
      lieu: "Gymnase Municipal - 123 Rue du Sport, Paris",
      type_evenement: "entraînement",
      places_max: 15,
      prix: "Gratuit pour les nouveaux"
    },
    {
      id: "2",
      titre: "Match amical vs. Les Fauves",
      description: "Match amical contre l'équipe des Fauves de Lyon. Venez encourager La Harde !",
      date: "2025-01-25",
      heure: "19:00",
      lieu: "Gymnase Municipal - 123 Rue du Sport, Paris",
      type_evenement: "match",
      places_max: 50,
      prix: "5€ entrée"
    },
    {
      id: "3",
      titre: "Tournoi Régional d'Hiver",
      description: "Participation au tournoi régional. L'occasion de voir du roller derby de haut niveau !",
      date: "2025-02-15",
      heure: "09:00",
      lieu: "Palais des Sports - Créteil",
      type_evenement: "tournoi",
      places_max: null,
      prix: "10€ - transport inclus"
    },
    {
      id: "4",
      titre: "Soirée conviviale équipe",
      description: "Soirée détente avec toute l'équipe. Pizzas, jeux et bonne humeur au programme !",
      date: "2025-02-08",
      heure: "20:00",
      lieu: "Local du club",
      type_evenement: "événement_social",
      places_max: 30,
      prix: "15€ repas inclus"
    }
  ],
  
  photos: [
    {
      id: "1",
      titre: "Entraînement en équipe",
      description: "Séance d'entraînement intensive avec toute l'équipe de La Harde",
      url_image: "https://images.unsplash.com/photo-1568557412756-7d219873dd11",
      categorie: "entraînement",
      date_prise: "2024-12-15"
    },
    {
      id: "2",
      titre: "Préparation physique",
      description: "Échauffement avant un match important",
      url_image: "https://images.unsplash.com/photo-1526676537331-7747bf8278fc",
      categorie: "entraînement",
      date_prise: "2024-12-10"
    },
    {
      id: "3",
      titre: "Match contre les Tigres",
      description: "Action de jeu lors du match contre l'équipe des Tigres",
      url_image: "https://images.unsplash.com/photo-1559302995-ab792ee16ce8",
      categorie: "match",
      date_prise: "2024-11-28"
    },
    {
      id: "4",
      titre: "Esprit d'équipe",
      description: "La cohésion de l'équipe La Harde en action",
      url_image: "https://images.unsplash.com/photo-1573301724534-c9ad93472d13",
      categorie: "équipe",
      date_prise: "2024-12-01"
    },
    {
      id: "5",
      titre: "Concentration avant match",
      description: "Les joueuses se préparent mentalement avant le coup d'envoi",
      url_image: "https://images.unsplash.com/photo-1603124076947-7b6412d8958e",
      categorie: "équipe",
      date_prise: "2024-11-20"
    },
    {
      id: "6",
      titre: "Formation technique",
      description: "Apprentissage des techniques de base du roller derby",
      url_image: "https://images.unsplash.com/photo-1568557412756-7d219873dd11",
      categorie: "entraînement",
      date_prise: "2024-11-15"
    },
    {
      id: "7",
      titre: "Victoire d'équipe",
      description: "Célébration après une victoire importante",
      url_image: "https://images.unsplash.com/photo-1526676537331-7747bf8278fc",
      categorie: "match",
      date_prise: "2024-10-30"
    },
    {
      id: "8",
      titre: "Nouvelles recrues",
      description: "Accueil des nouveaux membres dans l'équipe",
      url_image: "https://images.unsplash.com/photo-1573301724534-c9ad93472d13",
      categorie: "équipe",
      date_prise: "2024-10-15"
    }
  ]
};

function App() {
  const [showInscriptionForm, setShowInscriptionForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [selectedCategory, setSelectedCategory] = useState('toutes');
  const [submitMessage, setSubmitMessage] = useState('');

  // Données de formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    age: '',
    niveau_experience: 'débutant',
    message: ''
  });
  
  const [contactData, setContactData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value
    });
  };

  // Simulation d'envoi de formulaire (version statique)
  const handleSubmitInscription = (e) => {
    e.preventDefault();
    setSubmitMessage('✅ Inscription reçue ! (Version démo - les données ne sont pas sauvegardées)');
    setFormData({
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      age: '',
      niveau_experience: 'débutant',
      message: ''
    });
    setShowInscriptionForm(false);
    
    // Masquer le message après 5 secondes
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    setSubmitMessage('✅ Message envoyé ! (Version démo - les données ne sont pas sauvegardées)');
    setContactData({
      nom: '',
      email: '',
      sujet: '',
      message: ''
    });
    setShowContactForm(false);
    
    // Masquer le message après 5 secondes
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  const handleEventRegistration = (eventName) => {
    const nom = prompt("Votre nom complet:");
    const email = prompt("Votre email:");
    const telephone = prompt("Votre téléphone:");

    if (nom && email && telephone) {
      setSubmitMessage(`✅ Inscription à "${eventName}" confirmée ! (Version démo - les données ne sont pas sauvegardées)`);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'entraînement': return '🏃‍♀️';
      case 'match': return '🏆';
      case 'tournoi': return '🏅';
      case 'événement_social': return '🎉';
      default: return '📅';
    }
  };

  const filteredPhotos = selectedCategory === 'toutes' 
    ? STATIC_DATA.photos 
    : STATIC_DATA.photos.filter(photo => photo.categorie === selectedCategory);

  const categories = ['toutes', 'équipe', 'entraînement', 'match', 'événement'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">La Harde</h1>
              <span className="ml-3 text-red-200">Roller Derby Club</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <button onClick={() => setActiveSection('accueil')} className="hover:text-red-200 transition">Accueil</button>
              <button onClick={() => setActiveSection('club')} className="hover:text-red-200 transition">Le Club</button>
              <button onClick={() => setActiveSection('roller-derby')} className="hover:text-red-200 transition">Roller Derby</button>
              <button onClick={() => setActiveSection('evenements')} className="hover:text-red-200 transition">Événements</button>
              <button onClick={() => setActiveSection('galerie')} className="hover:text-red-200 transition">Galerie</button>
              <button onClick={() => setActiveSection('contact')} className="hover:text-red-200 transition">Contact</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {activeSection === 'accueil' && (
        <>
          <section className="relative bg-gray-900 text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1526676537331-7747bf8278fc" 
                alt="Athletic track" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-red-600 bg-opacity-40"></div>
            </div>
            <div className="relative container mx-auto px-6 py-20 text-center">
              <h2 className="text-5xl font-bold mb-6">Rejoignez La Harde !</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Découvrez le roller derby, un sport d'équipe spectaculaire qui combine vitesse, stratégie et esprit d'équipe. 
                Que vous soyez débutant(e) ou expérimenté(e), venez glisser avec nous !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setShowInscriptionForm(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition transform hover:scale-105"
                >
                  S'inscrire maintenant
                </button>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 font-bold py-4 px-8 rounded-lg text-lg transition"
                >
                  Nous contacter
                </button>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{STATIC_DATA.stats.membres_actifs}+</div>
                  <div>Membres actifs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">3</div>
                  <div>Entraînements/semaine</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{STATIC_DATA.stats.evenements_a_venir}</div>
                  <div>Événements à venir</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{STATIC_DATA.stats.total_photos}</div>
                  <div>Photos en galerie</div>
                </div>
              </div>
            </div>
          </section>

          {/* Le Club Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">À propos de La Harde</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <img 
                    src="https://images.pexels.com/photos/11745764/pexels-photo-11745764.jpeg" 
                    alt="Roller derby action" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-red-600">Notre Histoire</h3>
                  <p className="text-gray-600 mb-6">
                    Fondé en 2019, La Harde est un club de roller derby passionné et inclusif. 
                    Nous accueillons tous les niveaux et tous les genres dans une ambiance conviviale 
                    et bienveillante. Notre équipe participe aux championnats régionaux et nationaux.
                  </p>
                  <h3 className="text-2xl font-bold mb-4 text-red-600">Nos Valeurs</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• <strong>Inclusivité :</strong> Tout le monde est le bienvenu</li>
                    <li>• <strong>Respect :</strong> Fair-play et esprit d'équipe</li>
                    <li>• <strong>Progression :</strong> Accompagnement personnalisé</li>
                    <li>• <strong>Plaisir :</strong> Le sport avant tout pour s'amuser</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Roller Derby Section */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Qu'est-ce que le Roller Derby ?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-red-600 text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-3">Sport d'équipe</h3>
                  <p className="text-gray-600">
                    Deux équipes de 5 joueuses s'affrontent sur une piste ovale. 
                    L'objectif : marquer des points en dépassant les adversaires.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-red-600 text-4xl mb-4">🛼</div>
                  <h3 className="text-xl font-bold mb-3">Sur patins à roulettes</h3>
                  <p className="text-gray-600">
                    Joué exclusivement sur des patins à roulettes traditionnels (quads), 
                    le roller derby demande agilité et équilibre.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-red-600 text-4xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold mb-3">Sport international</h3>
                  <p className="text-gray-600">
                    Reconnu mondialement avec des championnats nationaux et internationaux. 
                    Un sport en pleine expansion !
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Entraînements Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Nos Entraînements</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-red-600">Planning Hebdomadaire</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-bold text-red-600">Mardi 19h30 - 21h30</div>
                      <div className="text-gray-600">Entraînement technique - Gymnase Municipal</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-bold text-red-600">Jeudi 20h00 - 22h00</div>
                      <div className="text-gray-600">Entraînement tactique - Gymnase Municipal</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-bold text-red-600">Samedi 14h00 - 16h00</div>
                      <div className="text-gray-600">Séance débutants + jeux - Gymnase Municipal</div>
                    </div>
                  </div>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1603124076947-7b6412d8958e" 
                    alt="Sports training" 
                    className="rounded-lg shadow-lg"
                  />
                  <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800 mb-2">Première séance gratuite !</h4>
                    <p className="text-yellow-700">
                      Venez tester le roller derby sans engagement. 
                      Nous prêtons tout l'équipement nécessaire.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Événements Section */}
      {activeSection === 'evenements' && (
        <section className="py-16 bg-white min-h-screen">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Événements à venir</h2>
              <p className="text-xl text-gray-600">Découvrez nos prochaines activités et rejoignez-nous !</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {STATIC_DATA.events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{event.titre}</h3>
                      <span className="text-2xl">{getEventTypeIcon(event.type_evenement)}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <span className="font-semibold w-16">📅</span>
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="font-semibold w-16">🕐</span>
                        <span>{event.heure}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="font-semibold w-16">📍</span>
                        <span>{event.lieu}</span>
                      </div>
                      {event.places_max && (
                        <div className="flex items-center text-gray-700">
                          <span className="font-semibold w-16">👥</span>
                          <span>{event.places_max} places max</span>
                        </div>
                      )}
                      {event.prix && (
                        <div className="flex items-center text-gray-700">
                          <span className="font-semibold w-16">💰</span>
                          <span>{event.prix}</span>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => handleEventRegistration(event.titre)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition"
                    >
                      S'inscrire à cet événement
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Galerie Section */}
      {activeSection === 'galerie' && (
        <section className="py-16 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Galerie Photos</h2>
              <p className="text-xl text-gray-600">Revivez les meilleurs moments de La Harde</p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-red-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Photo grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-w-16 aspect-h-12">
                    <img 
                      src={photo.url_image}
                      alt={photo.titre}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{photo.titre}</h3>
                    <p className="text-gray-600 text-sm mb-2">{photo.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        {photo.categorie}
                      </span>
                      {photo.date_prise && (
                        <span className="text-gray-500 text-xs">
                          {new Date(photo.date_prise).toLocaleDateString('fr-FR')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPhotos.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">Aucune photo dans cette catégorie</h3>
                <p className="text-gray-500">Essayez une autre catégorie !</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Club Section */}
      {activeSection === 'club' && (
        <section className="py-16 bg-white min-h-screen">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">À propos de La Harde</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.pexels.com/photos/11745764/pexels-photo-11745764.jpeg" 
                  alt="Roller derby action" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-red-600">Notre Histoire</h3>
                <p className="text-gray-600 mb-6">
                  Fondé en 2019, La Harde est un club de roller derby passionné et inclusif. 
                  Nous accueillons tous les niveaux et tous les genres dans une ambiance conviviale 
                  et bienveillante. Notre équipe participe aux championnats régionaux et nationaux.
                </p>
                <h3 className="text-2xl font-bold mb-4 text-red-600">Nos Valeurs</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Inclusivité :</strong> Tout le monde est le bienvenu</li>
                  <li>• <strong>Respect :</strong> Fair-play et esprit d'équipe</li>
                  <li>• <strong>Progression :</strong> Accompagnement personnalisé</li>
                  <li>• <strong>Plaisir :</strong> Le sport avant tout pour s'amuser</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Roller Derby Section */}
      {activeSection === 'roller-derby' && (
        <section className="py-16 bg-gray-100 min-h-screen">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Qu'est-ce que le Roller Derby ?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-red-600 text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3">Sport d'équipe</h3>
                <p className="text-gray-600">
                  Deux équipes de 5 joueuses s'affrontent sur une piste ovale. 
                  L'objectif : marquer des points en dépassant les adversaires.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-red-600 text-4xl mb-4">🛼</div>
                <h3 className="text-xl font-bold mb-3">Sur patins à roulettes</h3>
                <p className="text-gray-600">
                  Joué exclusivement sur des patins à roulettes traditionnels (quads), 
                  le roller derby demande agilité et équilibre.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-red-600 text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-3">Sport international</h3>
                <p className="text-gray-600">
                  Reconnu mondialement avec des championnats nationaux et internationaux. 
                  Un sport en pleine expansion !
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <section className="py-16 bg-red-600 text-white min-h-screen">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Prêt(e) à nous rejoindre ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              N'hésitez pas à nous contacter pour toute question ou pour venir découvrir notre club !
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl mb-2">📍</div>
                <h3 className="font-bold mb-2">Adresse</h3>
                <p>Gymnase Municipal<br />123 Rue du Sport<br />75000 Paris</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📧</div>
                <h3 className="font-bold mb-2">Email</h3>
                <p>contact@laharde.fr</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-bold mb-2">Téléphone</h3>
                <p>06 12 34 56 78</p>
              </div>
            </div>
            <button 
              onClick={() => setShowInscriptionForm(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition transform hover:scale-105"
            >
              Je m'inscris maintenant !
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 La Harde - Roller Derby Club. Tous droits réservés.</p>
          <div className="mt-4 space-x-6">
            <a href="#" className="hover:text-red-400 transition">Facebook</a>
            <a href="#" className="hover:text-red-400 transition">Instagram</a>
            <a href="#" className="hover:text-red-400 transition">YouTube</a>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>🔧 Version statique - Compatible GitHub Pages</p>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      {showInscriptionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Inscription</h3>
              <button 
                onClick={() => setShowInscriptionForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                🔧 <strong>Version démo :</strong> Les données ne sont pas sauvegardées réellement.
              </p>
            </div>
            
            <form onSubmit={handleSubmitInscription} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Âge *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="12"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau d'expérience</label>
                <select
                  name="niveau_experience"
                  value={formData.niveau_experience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="débutant">Débutant(e)</option>
                  <option value="intermédiaire">Intermédiaire</option>
                  <option value="avancé">Avancé(e)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Questions, disponibilités, etc."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition"
              >
                S'inscrire (Démo)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Contact</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                🔧 <strong>Version démo :</strong> Les messages ne sont pas envoyés réellement.
              </p>
            </div>
            
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  type="text"
                  name="nom"
                  value={contactData.nom}
                  onChange={handleContactChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleContactChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                <input
                  type="text"
                  name="sujet"
                  value={contactData.sujet}
                  onChange={handleContactChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  name="message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition"
              >
                Envoyer (Démo)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Submit Message */}
      {submitMessage && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50 max-w-sm">
          {submitMessage}
        </div>
      )}
    </div>
  );
}

export default App;