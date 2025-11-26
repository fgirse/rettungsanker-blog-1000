#!/bin/bash

# Firebase Storage CORS Configuration Script
# This script configures CORS for your Firebase Storage bucket

echo "🔧 Firebase Storage CORS Configuration"
echo "======================================"
echo ""

BUCKET_NAME="rettungsanker-freiburg-d07e6.appspot.com"

echo "📋 Checking if gsutil is installed..."
if ! command -v gsutil &> /dev/null; then
    echo "❌ gsutil is not installed."
    echo ""
    echo "Please install Google Cloud SDK:"
    echo "1. Visit: https://cloud.google.com/sdk/docs/install"
    echo "2. Or run: brew install google-cloud-sdk (on macOS)"
    echo ""
    echo "After installation, run:"
    echo "  gcloud auth login"
    echo "  gsutil cors set cors.json gs://$BUCKET_NAME"
    exit 1
fi

echo "✅ gsutil is installed"
echo ""
echo "🔐 Authenticating with Google Cloud..."
gcloud auth login

echo ""
echo "🚀 Applying CORS configuration to bucket: $BUCKET_NAME"
gsutil cors set cors.json gs://$BUCKET_NAME

echo ""
echo "✅ CORS configuration applied successfully!"
echo ""
echo "🧪 Verifying CORS configuration..."
gsutil cors get gs://$BUCKET_NAME

echo ""
echo "✨ Done! You can now upload images to Firebase Storage."
