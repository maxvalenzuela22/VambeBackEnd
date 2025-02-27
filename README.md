# Instrucciones para ejecutar el Backend localmente

Este documento proporciona los pasos necesarios para ejecutar el backend de la aplicación en tu entorno local.

## 1. Configuración del archivo `.env`
Para que la aplicación funcione correctamente, es necesario crear un archivo `.env` en la raíz del proyecto con la siguiente información:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=vambe_db
GOOGLE_API_KEY=password
```

## 2.Instalación de dependencias
A continuación, ejecuta los siguientes comandos en tu terminal para instalar las dependencias necesarias:

```
nvm use 22.14  # Establece la versión de Node.js a 22.14
nvm install --latest-npm  # Instala la última versión de npm
npm install  # Instala todas las dependencias del proyecto
```

## 3. Población de la base de datos
Para poblar la base de datos con datos iniciales (si es necesario), ejecuta el siguiente comando:

```
npm run seed
```

## 4. Iniciar el servidor
Una vez que las dependencias estén instaladas y la base de datos esté lista, puedes iniciar el servidor ejecutando:

```
node index.js
```