# Clientes BDB Frontend

Sistema de gestión de clientes del Banco de Bogotá.

## Requisitos

- Node.js >= 16.x
- npm >= 8.x

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Accede a `http://localhost:5173`

## Producción

### Construir

```bash
npm run build
```

### Previsualizar build

```bash
npm run preview
```

### Despliegue

El deploy a AWS S3 se ejecuta automáticamente al hacer push a `main` via GitHub Actions.

## Variables de entorno

Crear archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
``` 
