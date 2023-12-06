# GPT-LMS

[![Azure Static Web Apps CI/CD](https://github.com/tkhv/gpt-lms/actions/workflows/azure-static-web-apps-icy-plant-0291c0a0f.yml/badge.svg?branch=prod)](https://github.com/tkhv/gpt-lms/actions/workflows/azure-static-web-apps-icy-plant-0291c0a0f.yml)

This is a Microsoft AI Classroom Hackathon 2023 Submission - See [Installation](##Installation).

GPT-LMS is a learning management system that leverages the Azure OpenAI Service for seamless LLM features. Every created course comes with it's own GPT Teaching Assistant, or a GPTa. Students can redirect questions to GPTa over a human TA, reducing reliance on human TAs for menial tasks. Human TAs can also rely on the GPTa to generate and publish quizzes from a source with simple prompts.

By generating and storing vector embeddings for all course content, we will be able to perform a similarity search with the user's query to provide our model with relevant documents from the course. This will result in context-aware answers as the model can source answers from material unique to the course as taught by the instructors. By engineering prompts using LangChain, we can also allow GPTa to output answers following a specific format, allowing GPTa to interact with the LMS' quiz creation endpoints.

This is a [Next.js](https://nextjs.org/) 14.0.3 project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses the Pages router to maintain compatability with Azure Static Web Apps as of November 2023.

## Installation

#### Note that we require node v18.17.1 as a dependency, to maintain compatability with Azure Functions.

Add the following to your .env:

```
AZURE_STORAGE_CONNECTION_STRING=""
AZURE_ACCOUNT_NAME=""
AZURE_STORAGE_URL=""
AZURE_TENANT_ID=""
AZURE_CLIENT_ID=""
AZURE_CLIENT_SECRET=""

AZURE_COSMOSDB_PG_URL=""
AZURE_COSMOSDB_PG_USER=""
AZURE_COSMOSDB_PG_PASSWORD=""
AZURE_COSMOSDB_PG_DBNAME=""

NEXTAUTH_SECRET="" # Randomly generated string with `openssl rand -base64 32`
NEXTAUTH_URL="http://localhost:3000"
GITHUB_ID=""
GITHUB_SECRET=""

OPENAI_API_KEY=""
PINECONE_API_KEY=""
PINECONE_ENVIRONMENT=""
PINECONE_INDEX=""
```

Install and run the development server:

```bash
npm install
npm run dev
```

The webapp opens on [http://localhost:3000](http://localhost:3000).
