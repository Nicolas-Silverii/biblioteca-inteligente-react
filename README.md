# Libropolis – Frontend

Frontend de **Libropolis**, desarrollado con **React + Vite** y desplegado en **Firebase Hosting**.  
La aplicación consume el backend en CleverCloud (NestJS + MySQL) y muestra una biblioteca de libros.

---

## Demo en producción

- **Frontend (Firebase Hosting):** https://libropolis-f0962.web.app  
- **Backend (CleverCloud):** https://app-cd643bda-018a-40e2-b604-e3fa43e5465c.cleverapps.io/api/libros  

---

## Tecnologías utilizadas

- React 18 + Vite  
- React Router  
- Axios para consumo de API REST  
- CSS Modules / estilos propios  
- Firebase Hosting para deploy

---

## Estructura del proyecto

src/ ├── components/ # Botones, inputs, tarjetas, modales 
     ├── pages/ # Vistas principales (Home, Biblioteca, Ajustes) 
     ├── services/ # Configuración de Axios y llamadas a la API 
     ├── App.jsx # Configuración de rutas 
     └── main.jsx # Punto de entrada


---

## Instalación y ejecución local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Nicolas-Silverii/biblioteca-inteligente-react.git
   cd biblioteca-inteligente-react
## Instalar dependencias:

bash
npm install
Configurar variables de entorno en .env:

env
VITE_API_URL=https://app-cd643bda-018a-40e2-b604-e3fa43e5465c.cleverapps.io/api
## Ejecutar en modo desarrollo:

bash
npm run dev
## Build para producción:

bash
npm run build

## Deploy en Firebase Hosting
Instalar Firebase CLI:

bash
npm install -g firebase-tools
## Login en Firebase:

bash
firebase login
## Inicializar proyecto:

bash
firebase init
## Deploy:

bash
firebase deploy

## Limitaciones actuales
La biblioteca puede arrancar vacía si no hay libros precargados en el backend.

La API externa (Gutendex) presenta limitaciones de permisos y carga de libros.

Funcionalidades pendientes: perfil de usuario, valoraciones y reseñas.

## Próximos pasos
Completar perfil de usuario

Agregar sistema de valoraciones y reseñas

Mejorar integración con APIs externas

Pulir experiencia visual y responsive

## Autor
Nicolás Silverii – Proyecto Libropolis Olavarría, Buenos Aires – 2025
