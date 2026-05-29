# 💸 FundFlow

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Kong](https://img.shields.io/badge/Kong_API_Gateway-003459?style=for-the-badge&logo=kong&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

A full-stack personal finance management system built using Spring Boot microservices, Kong API Gateway, JWT authentication, Docker, MySQL, and React.

This project demonstrates scalable backend architecture with centralized authentication, secure API communication, expense tracking, fund management, and containerized deployment.

---

# 🏗️ COMPLETE SYSTEM ARCHITECTURE

```text
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                              │
│                  React Frontend / Postman                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              ▼


╔═════════════════════════════════════════════════════════════╗
║                     KONG API GATEWAY                       ║
║                                                             ║
║  • Request Routing                                          ║
║  • JWT Authentication                                       ║
║  • Custom Lua Plugin                                        ║
║  • Identity Propagation                                     ║
║  • Security Layer                                           ║
║  • Centralized Entry Point                                  ║
╚═════════════════════════════════════════════════════════════╝
                 │                               │
                 │                               │
                 ▼                               ▼


┌───────────────────────────────┐    ┌───────────────────────────────┐
│         AUTH SERVICE          │    │       EXPENSE SERVICE         │
│         Spring Boot           │    │         Spring Boot           │
│                               │    │                               │
│  • Signup                     │    │  • Expense APIs               │
│  • Login                      │    │  • Fund APIs                  │
│  • JWT Generation             │    │  • Categories                 │
│  • Token Validation           │    │  • Pagination                 │
│  • Refresh Tokens             │    │  • Idempotency                │
└───────────────────────────────┘    └───────────────────────────────┘
                 │                               │
                 │                               │
                 ▼                               ▼


┌───────────────────────────────┐    ┌───────────────────────────────┐
│         MYSQL AUTH DB         │    │       MYSQL EXPENSE DB        │
│                               │    │                               │
│  • Users                      │    │  • Expenses                   │
│  • Roles                      │    │  • Funds                      │
│  • Refresh Tokens             │    │  • Categories                 │
└───────────────────────────────┘    └───────────────────────────────┘
```



# 🔐 AUTHENTICATION FLOW

```text
┌──────────────────────┐
│        CLIENT        │
└──────────────────────┘
            │
            │ POST /auth/v1/login
            ▼


╔══════════════════════╗
║    KONG GATEWAY      ║
║   Route Management   ║
╚══════════════════════╝
            │
            │ Forward Request
            ▼


┌──────────────────────┐
│     AUTH SERVICE     │
│   Validate User      │
│   Generate JWT       │
└──────────────────────┘
            │
            │ Fetch User
            ▼


┌──────────────────────┐
│    MYSQL AUTH DB     │
└──────────────────────┘
            │
            │ User Verified
            ▼


┌──────────────────────┐
│     AUTH SERVICE     │
│    Return JWT        │
└──────────────────────┘
            │
            │ JWT Response
            ▼


┌──────────────────────┐
│        CLIENT        │
└──────────────────────┘
```



# 💰 EXPENSE REQUEST FLOW

```text
┌──────────────────────┐
│        CLIENT        │
│ Authorization JWT    │
└──────────────────────┘
            │
            │ POST /expense/v1/expenses
            ▼


╔══════════════════════════════════════╗
║            KONG GATEWAY             ║
║                                      ║
║  Custom Authentication Plugin        ║
║                                      ║
║  1. Extract JWT                      ║
║  2. Validate Token                   ║
║  3. Call Auth Service                ║
║  4. Inject X-User-ID                 ║
╚══════════════════════════════════════╝
            │
            │ Validate JWT
            ▼


┌──────────────────────┐
│     AUTH SERVICE     │
│   Extract Username   │
│    Validate Token    │
└──────────────────────┘
            │
            │ Valid User
            ▼


╔══════════════════════════════════════╗
║            KONG GATEWAY             ║
║                                      ║
║  Inject Header:                      ║
║  X-User-ID: chevula                  ║
╚══════════════════════════════════════╝
            │
            │ Forward Authenticated Request
            ▼


┌──────────────────────┐
│    EXPENSE SERVICE   │
│                      │
│ • Create Expense     │
│ • Validate Fund      │
│ • Apply Business     │
│   Logic              │
└──────────────────────┘
            │
            │ Store Expense
            ▼


┌──────────────────────┐
│  MYSQL EXPENSE DB    │
└──────────────────────┘
            │
            │ Success Response
            ▼


┌──────────────────────┐
│        CLIENT        │
└──────────────────────┘
```

# Tech Stack

## Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Flyway Migration
- Gradle

## Infrastructure
- Kong API Gateway
- Docker
- Docker Compose
- MySQL

## Frontend
- React (planned)

---

# Features

## Authentication Service
- User Signup
- User Login
- JWT Token Generation
- Token Validation
- Refresh Token Support
- Secure Password Handling

## Expense Service
- Create Expense
- Update Expense
- Delete Expense
- Pagination & Sorting
- Category-wise Expense Totals
- Fund Management
- Idempotent Expense APIs

## API Gateway
- Kong Gateway Integration
- Centralized JWT Validation
- Custom Kong Plugin
- User Identity Propagation
- Secure Microservice Communication

---

# Project Structure

```bash
personal-finance-system/

├── auth-service/
├── expense-service/
├── kong/
│   ├── kong.yml
│   └── plugins/
│       └── custom-auth/
│           ├── handler.lua
│           └── schema.lua
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
MYSQL_ROOT_PASSWORD=root

MYSQL_AUTH_DB=authDB
MYSQL_EXPENSE_DB=expense

MYSQL_USER=root
MYSQL_PASSWORD=root

JWT_SECRET=your-secret-key

AUTH_PORT=8080
EXPENSE_PORT=9898

KONG_PROXY_PORT=8000
KONG_ADMIN_PORT=8001
```

---

# Running the Project

## Build & Start

```bash
docker compose up --build
```

## Stop Containers

```bash
docker compose down
```

---

# API Gateway Routes

## Auth APIs

```bash
http://localhost:8000/auth/*
```

## Expense APIs

```bash
http://localhost:8000/expense/*
```

---

# Sample APIs

## Signup

```bash
curl -X POST http://localhost:8000/auth/v1/signup \
  -H "Content-Type: application/json" \
  -d '{
        "userId": "user101",
        "userName": "saikiran",
        "password": "password123",
        "email": "saikiran@example.com",
        "phoneNumber": "9876543210"
      }'
```

---

## Create Expense

```bash
curl -X POST http://localhost:8000/expense/v1/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Idempotency-Key: exp-001" \
  -d '{
        "amount": 500,
        "description": "Dinner Expense",
        "ownerType": "SELF",
        "categoryId": 1
      }'
```

---

# Security Flow

1. User authenticates through Auth Service
2. JWT token is generated
3. Client sends JWT through Kong Gateway
4. Custom Kong plugin validates JWT via Auth Service
5. Gateway injects authenticated user identity
6. Expense Service trusts gateway identity

---

# Future Improvements

- React Frontend
- Dashboard Analytics
- Budget Tracking
- Recurring Expenses
- Redis Caching
- Kafka Event Streaming
- CI/CD Pipeline
- Kubernetes Deployment

---

# Learning Outcomes

This project demonstrates:
- Microservices Architecture
- API Gateway Design
- JWT Authentication
- Dockerized Deployment
- Secure Inter-service Communication
- Scalable Backend Engineering
- Distributed System Fundamentals

---

# Author

Saikiran Chevula
