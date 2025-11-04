#!/bin/bash

# Heroku Deployment Script for Notes App Backend
echo "=== Notes App Backend Deployment ==="

# Step 1: Initialize git repository (if not already done)
echo "Initializing git repository..."
git init
git add .
git commit -m "Initial backend deployment"

# Step 2: Create Heroku app (replace 'your-app-name' with your desired name)
echo "Creating Heroku app..."
echo "Please run: heroku create your-notes-backend-unique-name"

# Step 3: Set environment variables
echo "Set these environment variables in Heroku dashboard:"
echo "- SECRET_KEY: your-secret-key-here"
echo "- DATABASE_URL: (Heroku will auto-provision PostgreSQL)"

# Step 4: Deploy
echo "Deploy with: git push heroku main"

echo "=== Deployment commands ==="
echo "1. heroku login"
echo "2. heroku create your-notes-backend-unique-name"
echo "3. heroku config:set SECRET_KEY=your-secret-key-here"
echo "4. heroku addons:create heroku-postgresql:hobby-dev"
echo "5. git push heroku main"