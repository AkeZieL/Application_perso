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

Pour utiliser le système de creation de points, vous devez crée un SubcriptionPlan via Django Admin.
Voici la liste des features correspondant à chaque Plan:
    free --> Features = []
    pro --> Features = ["create_place"]
    entreprise --> Features = ["create_place", "create_event"]