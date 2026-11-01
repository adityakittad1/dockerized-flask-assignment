# Dockerized Full-Stack Assignment

A responsive Express web form sends a name to a Flask JSON API. Docker Compose builds both services and connects them on a shared bridge network. The API preserves the reference repository's `/process` greeting behavior and adds input validation and a health endpoint.

## Project structure

```text
Docker_Adityakittad/
├── backend/ (Flask API, requirements, Dockerfile)
├── frontend/ (Express server, static UI, Dockerfile)
├── documentation/ (assignment report)
├── docker-compose.yml
├── .dockerignore
└── .gitignore
```

## Run with Docker Desktop

Start Docker Desktop, open a terminal in this folder, then run:

```powershell
docker compose config
docker compose up --build -d
docker compose ps
```

Open <http://localhost:3000>. Submit a name; the frontend calls Flask at <http://localhost:5000/process>. Verify the API with:

```powershell
Invoke-RestMethod http://localhost:5000/health
Invoke-RestMethod -Method Post -Uri http://localhost:5000/process -ContentType 'application/json' -Body '{"name":"Alex"}'
```

Stop services with `docker compose down`.

## Publish images (replace the sample Docker Hub account)

The image names in `docker-compose.yml` contain `adityakittad`. Replace that value with your Docker Hub username, then run:

```powershell
docker login
docker compose build
docker compose push
```

## Publish source to GitHub

Create an empty GitHub repository first, then in this folder run:

```powershell
git init
git add .
git commit -m "Build Dockerized Express and Flask assignment"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## Notes

Docker Hub upload and GitHub push require the student's own accounts and credentials. `documentation/Assignment_Report.docx` includes the architecture, commands, explanations, and a genuine screenshot of the successful Compose build and startup. Add screenshots of `docker compose ps`, the successful browser form response, Docker Hub images, and the GitHub repository after completing those steps. The report does not claim that unpublished images or source have been uploaded.
