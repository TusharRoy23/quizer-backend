## 🚀 What Is This?
This project is an AI-generated quiz application that helps learners assess their understanding across different subjects.
Users can generate quizzes, interact with AI agents, and even simulate interviews to enhance learning confidence.
## ERD
![Quizer ERD](https://github.com/TusharRoy23/quizer-backend/blob/master/ERD.svg)
## ✨ Features
✅ Smart Quiz Generation
* Choose department, topic(s), question count, and timer to generate customized quizzes.
* Generate questions through form inputs or AI-powered Agentic chat.
* The quiz engine can dynamically adjusts the question difficulty based on user performance — making each quiz a personalized learning experience.

🧩 Answer Review & Insights
* After finishing a quiz, view correct answers, AI-generated examples, and keywords for deeper understanding.

💬 AI Discussion
* Ask the AI agent for clarifications or further explanations.

🎙️ Verbal Quiz Mode
* Simulate an interview environment and build speaking confidence.

📊 Progress Tracking
* Monitor your learning performance over time to identify improvement areas.

## 🧰 Tech Stack
| Name        | version |
| ------------|---------|
| Express.js      | 4.21.2     |
| Typescript  | 5.8.3  |
| Passport    | 0.7.0      |
| Passport-jwt    | 4.0.1   |
| Inversify      | 6.2.2   |
| LangChain | 0.3.34 |
| @langchain/langgraph       | 0.4.9   |
| @langchain/core|0.3.78   |
| @langchain/deepseek | 0.0.2 |
| @langchain/openai | 0.6.14 |
| Prisma ORM | 6.15.0 |
| Cookie-Parser | 1.4.7 |
| AWS SDK (S3) | 3.890.0 |
| Supabase JS | 2.57.2 |

## 🐳 Run the App with Docker
### 🔧 Development
```bash
# Build and run the app
$ docker compose -f docker-compose.dev.yml build --no-cache
$ docker compose -f docker-compose.dev.yml up

# Run without LangGraph Studio
$ docker compose -f docker-compose.dev.yml up dev
```
### 🚀 Production
```bash
# production
$ docker compose -f docker-compose.prod.yml build --no-cache
$ docker compose -f docker-compose.prod.yml up -d
```
### 🧩 Database Setup
This project uses Prisma ORM with Supabase as the database layer.
* Go to [Prisma ORM Quickstarts](https://supabase.com/docs/guides/database/prisma)

## ⚙️ Run Migrations
```bash
# Enter the app container (development)
docker compose -f docker-compose.dev.yml run dev sh

# Run migrations
npx prisma migrate dev --name migration_name
```

## 💡 Future Plans
* Leaderboard and ranking system
* Personalized quiz recommendations
* Contextual learning by sharing documents.

## 🤝 Stay in Touch
- 📖 Read My Stories - [Medium](https://medium.com/@tushar-chy)
- 🔗 Connect on - [LinkedIn](https://www.linkedin.com/in/tushar-roy-chy/)
- 📫 Email Me - [chowdhurytusharroy@gmail.com](mailto:chowdhurytusharroy@gmail.com?subject=Hey%20there)
