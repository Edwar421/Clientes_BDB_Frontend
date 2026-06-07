# 🏦 Clientes BDB Frontend

Sistema de gestión de clientes del Banco de Bogotá (BDB) - Interfaz moderna y responsiva para consultar, registrar y administrar información de clientes.

## 🌟 Características Principales

- ✅ **Dashboard intuitivo** - Visualización y gestión de clientes con filtros avanzados
- ✅ **Registro de clientes** - Formulario completo con validación
- ✅ **Búsqueda y filtros** - Busca por identificación, edad y productos
- ✅ **Edición y eliminación** - Gestión completa de datos de clientes
- ✅ **Tema oscuro/claro** - Interfaz adaptable según preferencias del usuario
- ✅ **Diseño responsive** - Optimizado para desktop, tablet y mobile
- ✅ **Componentes modulares** - Arquitectura escalable con Atomic Design
- ✅ **Validaciones robustas** - Formularios con Formik y Yup
- ✅ **Estadísticas visuales** - Gráficos con Recharts
- ✅ **Integración con API** - Comunicación backend vía Axios

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| **React** | 19.0.0 | Librería de UI |
| **TypeScript** | Latest | Tipado seguro |
| **Vite** | Latest | Bundler y dev server |
| **Tailwind CSS** | 4.0.12 | Estilos y diseño |
| **React Router** | 7.3.0 | Enrutamiento |
| **Axios** | 1.8.1 | Cliente HTTP |
| **Formik + Yup** | 2.2.9 + 1.0.0 | Gestión de formularios |
| **Recharts** | 3.8.1 | Visualización de datos |
| **React Icons** | 5.5.0 | Iconografía |
| **Jest + RTL** | 29.7.0 | Testing |
| **ESLint** | 9.21.0 | Linting |

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── atoms/              # Componentes básicos (Button, Input, Modal, etc)
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ThemeToggle.tsx
│   ├── molecules/          # Componentes compuestos (CustomerCard, CustomerForm, etc)
│   │   ├── CustomerCard.tsx
│   │   ├── CustomerForm.tsx
│   │   ├── CustomerForm.test.tsx
│   │   └── CustomerStats.tsx
│   ├── organisms/          # Componentes complejos (Header, CustomerList, etc)
│   │   ├── CustomerList.tsx
│   │   └── Header.tsx
│   └── templates/          # Layouts (DashboardTemplate)
│       └── DashboardTemplate.tsx
├── pages/                  # Páginas principales
│   ├── DashboardPage.tsx   # Página de lista de clientes
│   └── RegisterPage.tsx    # Página de registro
├── services/               # Servicios (API calls)
│   └── api.ts             # Configuración Axios y métodos API
├── types/                  # Tipos TypeScript
│   └── types.ts           # Interfaces y tipos globales
├── App.tsx                 # Componente raíz
├── main.tsx                # Punto de entrada
└── index.css              # Estilos globales
```

## 📋 Prerequisitos

- **Node.js** >= 16.x
- **npm** >= 8.x o **yarn** >= 1.22.x
- Acceso a la API backend

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd Clientes_BDB_Frontend
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:3000/api
```

## 🏃 Ejecución

### Desarrollo
```bash
npm run dev
```
Accede a `http://localhost:5173`

### Build para producción
```bash
npm run build
```

### Preview de build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

### Testing
```bash
npm run test              # Ejecutar pruebas
npm run test:coverage     # Ejecutar con cobertura
```

## 📦 Dependencias Principales

### Runtime
- **react** - Librería UI
- **react-dom** - Renderizado en DOM
- **react-router-dom** - Enrutamiento
- **axios** - Cliente HTTP
- **formik** - Gestión de formularios
- **yup** - Validación de esquemas
- **tailwindcss** - Utility-first CSS
- **recharts** - Gráficos React
- **react-icons** - Iconos SVG

### Development
- **typescript** - Lenguaje con tipos
- **vite** - Bundler moderno
- **jest** - Framework de testing
- **@testing-library/react** - Utilities de testing
- **eslint** - Linting de código
- **tailwindcss** - Framework de CSS

## 🎨 Temas

El proyecto soporta dos temas:

### Tema Claro (por defecto)
- Fondo azul degradado
- Interfaz clara y legible

### Tema Oscuro
- Fondo oscuro
- Interfaz optimizada para ojos cansados
- Se guarda en localStorage

Usar el botón **Modo claro/Oscuro** en el header para cambiar.

## 🔧 Configuración API

La URL base de la API se configura en `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Endpoints principales esperados:
- `GET /api/customers` - Obtener lista de clientes
- `POST /api/customers` - Crear cliente
- `PUT /api/customers/:id` - Actualizar cliente
- `DELETE /api/customers/:id` - Eliminar cliente

## 📱 Responsividad

El proyecto es completamente responsive:

| Dispositivo | Ancho | Comportamiento |
|------------|-------|----------------|
| **Mobile** | < 768px | Navegación stacked, fuentes pequeñas |
| **Tablet** | 768px - 1024px | Layout optimizado |
| **Desktop** | > 1024px | Layout completo |

## ✅ Testing

### Ejecutar todas las pruebas
```bash
npm run test
```

### Ejecutar con cobertura
```bash
npm run test:coverage
```

### Archivos de test
- `src/components/atoms/Button.test.tsx`
- `src/components/molecules/CustomerForm.test.tsx`

## 🏗️ Atomic Design

El proyecto utiliza **Atomic Design** para organizar componentes:

### Átomos
Componentes base reutilizables sin dependencias:
- `Button` - Botón genérico
- `Input` - Campo de entrada
- `Modal` - Modal genérico
- `ThemeToggle` - Toggle tema

### Moléculas
Grupos de componentes átomos:
- `CustomerCard` - Tarjeta de cliente
- `CustomerForm` - Formulario de cliente
- `CustomerStats` - Estadísticas

### Organismos
Componentes complejos compuestos:
- `Header` - Encabezado con navegación
- `CustomerList` - Lista de clientes

### Templates
Layouts reutilizables:
- `DashboardTemplate` - Layout del dashboard

### Pages
Páginas completas:
- `DashboardPage` - Página de lista
- `RegisterPage` - Página de registro

## 🔐 Validación de Formularios

Se utiliza **Formik + Yup** para validar formularios:

```typescript
// Ejemplo en CustomerForm
const validationSchema = Yup.object().shape({
  identification: Yup.string().required('Identificación requerida'),
  name: Yup.string().required('Nombre requerido'),
  email: Yup.string().email('Email inválido'),
  age: Yup.number().min(18, 'Mínimo 18 años'),
});
```

## 📊 Componentes Principales

### DashboardPage
- Lista de clientes con tabla responsiva
- Filtros avanzados (identificación, edad, producto)
- Acciones: editar y eliminar
- Modales de confirmación

### RegisterPage
- Formulario completo de registro
- Validación en tiempo real
- Selección de productos
- Tipos de identificación

### Header
- Navegación principal
- Toggle de tema
- Responsive (collapsa en mobile)

## 🐛 Debugging

### Estructura de tipos
Ver archivo `src/types/types.ts` para los tipos principales:

```typescript
interface Customer {
  id: string;
  typeIdentification: typeIdentification;
  identification: string;
  name: string;
  age: number;
  email: string;
  product: CustomerProduct;
  createdAt: string;
  updatedAt: string;
}
```

### Servicios API
Revisar `src/services/api.ts` para:
- Configuración de Axios
- Métodos HTTP disponibles
- Manejo de errores

## 🤝 Contribuir

1. Crear una rama para tu feature: `git checkout -b feature/nueva-caracteristica`
2. Commit cambios: `git commit -am 'Agregar nueva característica'`
3. Push a la rama: `git push origin feature/nueva-caracteristica`
4. Abrir un Pull Request

## 📝 Convenciones

### Nombres de componentes
- PascalCase para componentes React: `CustomerForm.tsx`
- camelCase para funciones: `fetchCustomers()`
- UPPER_CASE para constantes: `API_BASE_URL`

### Estructura de archivos
- Un componente por archivo
- Test colocado junto al componente: `Button.tsx` + `Button.test.tsx`
- Tipos en carpeta `types/`
- Servicios en carpeta `services/`

### CSS con Tailwind
- Usar clases Tailwind en lugar de CSS custom
- Responsive first: mobile → tablet → desktop
- Dark mode: usar `dark:` prefix

## 🚨 Troubleshooting

### Puerto 5173 en uso
```bash
npm run dev -- --port 3000
```

### Limpiar cache
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problemas con tipos TypeScript
```bash
npm run build  # Verifica errores de compilación
```

## 📄 Licencia

Proyecto desarrollado para el Banco de Bogotá.

