# Application_perso

My personal app

## Stack technique

### Backend
- Django
- Django REST Framework
- JWT Authentication
- Cookie HttpOnly
- CORS (django-cors-headers)

### Frontend
- Next.js
- shadcn/ui
- Tailwind CSS
- REST API communication with Django

### Database
- PostgreSQL
- PostGIS (géospatial)

## Utilisation

Modifiez le .env_template par .env, remplissez avec vos identifiant.<br>
Le Makefile propose différentes commande voici celle pour démarrer le projet:<br>
    make app ou make app-log(affiche les logs)<br>

Pour utiliser le système de creation de points, vous devez crée un SubcriptionPlan via Django Admin.<br>
Voici la liste des features correspondant à chaque Plan:<br>
    free --> Features = []<br>
    pro --> Features = ["create_place"]<br>
    entreprise --> Features = ["create_place", "create_event"]<br>