#!/bin/bash

curl -X PATCH http://localhost:9898/v1/updateExpense/1 \
  -H "Content-Type: application/json" \
  -H "x-user-id: user123" \
  -d '{
    "amount": 750,
    "currencyType": "INR",
    "date": "2026-01-29",
    "category": "FOOD",
    "description": "Updated lunch expense",
    "ownerType": "SELF"
  }'
