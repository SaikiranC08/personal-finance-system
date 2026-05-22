#!/bin/bash

curl -X POST http://localhost:9898/v1/addExpense \
  -H "Content-Type: application/json" \
  -H "x-user-id: user123" \
  -d '{
    "amount": 500,
    "currencyType": "INR",
    "date": "2026-01-29",
    "category": "FOOD",
    "description": "Lunch at cafe",
    "ownerType": "SELF"
  }'
