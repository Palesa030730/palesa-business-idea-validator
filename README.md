\# Palesa's Business Idea Validator



An AI-powered business idea validation API that analyzes business ideas, generates a score and verdict, and stores the results in PostgreSQL.



\## Overview



Palesa's Business Idea Validator allows users to submit a business idea for AI-powered analysis.



The application consists of:



\* \*\*Node.js + Express\*\* — REST API

\* \*\*Python + FastAPI\*\* — AI analysis service

\* \*\*PostgreSQL\*\* — database for storing validated ideas

\* \*\*Docker Compose\*\* — service orchestration



The application was developed and tested locally before deployment.



\## Architecture



```text

&#x20;                   Client

&#x20;                     │

&#x20;                     ▼

&#x20;            ┌──────────────────┐

&#x20;            │ Node.js / Express│

&#x20;            │   API :3000      │

&#x20;            └────────┬─────────┘

&#x20;                     │

&#x20;         ┌───────────┴───────────┐

&#x20;         ▼                       ▼

&#x20;┌─────────────────┐     ┌─────────────────┐

&#x20;│ FastAPI AI      │     │   PostgreSQL    │

&#x20;│ Service :8000   │     │    Database     │

&#x20;└─────────────────┘     └─────────────────┘

```



\## Features



\* Submit a business idea for validation

\* AI-powered business idea analysis

\* Generate a business score

\* Generate a business verdict

\* Store validated ideas in PostgreSQL

\* Retrieve all validated ideas

\* Retrieve an individual business idea

\* Input validation

\* Error handling for nonexistent ideas

\* Health-check endpoint

\* Docker Compose configuration



\## Technology Stack



| Component        | Technology                     |

| ---------------- | ------------------------------ |

| API              | Node.js / Express              |

| AI Service       | Python / FastAPI               |

| Database         | PostgreSQL                     |

| Containerization | Docker Compose                 |

| API Testing      | PowerShell / Invoke-RestMethod |

| Version Control  | Git / GitHub                   |



\## Project Structure



```text

palesa-business-idea-validator/

│

├── ai-service/

│   ├── app.py

│   └── requirements.txt

│

├── routes/

│   └── ideaRoutes.js

│

├── db.js

├── docker-compose.yml

├── index.js

├── package.json

├── package-lock.json

└── .gitignore

```



\## API Endpoints



\### Health Check



```http

GET /health

```



Example:



```powershell

Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get

```



Expected response:



```json

{

&#x20; "status": "ok"

}

```



\### Validate a Business Idea



```http

POST /api/validate

```



Request:



```json

{

&#x20; "idea": "A mobile app that helps students find affordable tutoring"

}

```



PowerShell example:



```powershell

Invoke-RestMethod `

&#x20; -Uri "http://localhost:3000/api/validate" `

&#x20; -Method Post `

&#x20; -ContentType "application/json" `

&#x20; -Body '{"idea":"A mobile app that helps students find affordable tutoring"}'

```



Example response:



```text

status: success

data:

&#x20; id: 2

&#x20; idea: A mobile app that helps students find affordable tutoring

&#x20; score: 75

&#x20; verdict: Promising

```



\### Get All Business Ideas



```http

GET /api/ideas

```



Example:



```powershell

Invoke-RestMethod -Uri "http://localhost:3000/api/ideas" -Method Get

```



The endpoint returns all business ideas that have been validated and stored in the database.



\### Get a Specific Business Idea



```http

GET /api/ideas/:id

```



Example:



```powershell

Invoke-RestMethod -Uri "http://localhost:3000/api/ideas/2" -Method Get

```



\### Error Handling



If an idea does not exist:



```http

GET /api/ideas/9999

```



The API returns:



```json

{

&#x20; "status": "error",

&#x20; "message": "Business idea not found"

}

```



If a business idea is submitted without an idea value:



```json

{

&#x20; "idea": ""

}

```



The API returns:



```json

{

&#x20; "status": "error",

&#x20; "message": "Business idea is required"

}

```



\## Running Locally



\### Prerequisites



Install:



\* Node.js

\* Python

\* PostgreSQL or Docker Desktop

\* Git



\### 1. Clone the Repository



```powershell

git clone https://github.com/Palesa030730/palesa-business-idea-validator.git

cd palesa-business-idea-validator

```



\### 2. Install Node.js Dependencies



```powershell

npm install

```



\### 3. Install AI Service Dependencies



```powershell

cd ai-service

pip install -r requirements.txt

cd ..

```



\### 4. Start the AI Service



From the `ai-service` directory:



```powershell

python -m uvicorn app:app --host 0.0.0.0 --port 8000

```



The AI service will be available at:



```text

http://localhost:8000

```



\### 5. Start the Node.js API



From the project root:



```powershell

node index.js

```



The API will be available at:



```text

http://localhost:3000

```



\### 6. Run with Docker Compose



The project also includes a Docker Compose configuration:



```powershell

docker compose up --build

```



To stop the services:



```powershell

docker compose down

```



\## Testing



The API was tested locally using PowerShell and `Invoke-RestMethod`.



The following functionality has been verified:



\* `GET /health` — successful

\* `POST /api/validate` — successful

\* AI analysis — successful

\* Database storage — successful

\* `GET /api/ideas` — successful

\* `GET /api/ideas/:id` — successful

\* Nonexistent idea handling — successful

\* Empty business idea validation — successful



Example successful validation:



```text

Business idea:

A mobile app that helps students find affordable tutoring



Score:

75



Verdict:

Promising

```



\## Environment Variables



Sensitive configuration should be stored in environment variables rather than committed to Git.



Example:



```env

DB\_HOST=localhost

DB\_PORT=5432

DB\_NAME=business\_ideas

DB\_USER=postgres

DB\_PASSWORD=your\_password

AI\_SERVICE\_URL=http://localhost:8000

```



Do not commit `.env` files or database passwords to GitHub.



\## Git Workflow



The project uses Git for version control.



Typical workflow:



```powershell

git status

git add .

git commit -m "Describe the change"

git push origin main

```



\## Repository



GitHub repository:



https://github.com/Palesa030730/palesa-business-idea-validator



\## Project Status



\*\*Current status: Local development and API testing completed.\*\*



The core API, AI service integration, database storage, validation, error handling, Docker configuration, and GitHub repository have been set up and tested successfully.



The next phase is deployment to a dedicated server.



\## Author



\*\*Palesa Manabile\*\*



Business Idea Validator — AI-powered business idea analysis API.



