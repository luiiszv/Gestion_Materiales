Script de la Bade de datos en archibo db


Este repositorio incluye un script SQL en /db

## Instrucciones
-Importa el script
-Usa la base de datos gestion;
-Crea el usuario

USE gestion;
CREATE USER 'luis'@'localhost' IDENTIFIED BY 'luis';
GRANT ALL PRIVILEGES ON gestion.* TO 'luis'@'localhost';
FLUSH PRIVILEGES;

y Listo :)

