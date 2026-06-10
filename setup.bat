@echo off
chcp 65001 >nul
echo === Installation du projet GMP ===

REM Vérification de Node.js
where node >nul 2>&1
if errorlevel 1 (
  echo ERREUR : Node.js n'est pas installe. Telecharger sur https://nodejs.org
  pause
  exit /b 1
)

REM Vérification de PostgreSQL
where createdb >nul 2>&1
if errorlevel 1 (
  echo ERREUR : PostgreSQL n'est pas installe ou n'est pas dans le PATH.
  echo Telecharger sur https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
  echo.
  echo Si PostgreSQL est installe, ajouter ce dossier au PATH :
  echo   C:\Program Files\PostgreSQL\16\bin
  echo Puis redemarrer ce script.
  pause
  exit /b 1
)

REM Création du .env si absent
if not exist .env (
  echo.
  echo --- Configuration de la base de donnees ---
  set /p PG_PASSWORD="Mot de passe PostgreSQL (utilisateur postgres) : "

  powershell -Command "(Get-Content .env.example) -replace 'VOTRE_MOT_DE_PASSE', '%PG_PASSWORD%' | Set-Content .env"
  powershell -Command "$secret = [System.BitConverter]::ToString([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32)) -replace '-',''; (Get-Content .env) -replace 'your-auth-secret', $secret.ToLower() | Set-Content .env"

  echo .env cree.
) else (
  echo .env deja present, on continue.
)

REM Dépendances
echo.
echo --- Installation des dependances ---
call npm install
if errorlevel 1 ( echo ERREUR lors de npm install & pause & exit /b 1 )

REM Génération du client Prisma
echo.
echo --- Generation du client Prisma ---
call npx prisma generate
if errorlevel 1 ( echo ERREUR lors de prisma generate & pause & exit /b 1 )

REM Base de données
echo.
echo --- Creation de la base de donnees ---
set PGPASSWORD=%PG_PASSWORD%
createdb -U postgres gmp 2>nul && echo Base 'gmp' creee. || echo Base 'gmp' deja existante, on continue.

REM Restauration du dump
echo.
echo --- Chargement des donnees de demo ---
psql -U postgres gmp < scripts\dump.sql >nul 2>&1
if errorlevel 1 ( echo ERREUR lors du chargement du dump & pause & exit /b 1 )
echo Donnees chargees.

echo.
echo === Installation terminee ===
echo.
echo Lancer le projet : npm run dev
echo Ouvrir : http://localhost:3000
echo.
echo Comptes de demo (mot de passe : gmp) :
echo   admin@test.com       - Administrateur
echo   enseignant1@test.com - Enseignant
echo   etudiant1@test.com   - Etudiant
echo   entreprise1@test.com - Entreprise
echo.
pause
