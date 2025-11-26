#!/bin/bash
# Quick commands for debugging MongoDB posts

echo "🔍 Checking posts in MongoDB..."
node check-posts.mjs

echo ""
echo "📝 Useful commands:"
echo "  npm run dev          - Start development server"
echo "  node check-posts.mjs - Check posts in database"
echo "  node test-mongodb.mjs - Full MongoDB connection test"
echo ""
echo "🌐 URLs:"
echo "  http://localhost:3000/dashboard/create-post - Create a post"
echo "  http://localhost:3000/blog - View all posts"
echo "  https://cloud.mongodb.com - MongoDB Atlas Dashboard"
