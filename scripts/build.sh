#!/bin/bash

# Lightweight build script for accessibility-validator
# Optimized for minimal overhead and fast execution

set -e

echo "🚀 Starting lightweight build process..."

# Check if node_modules exists, install if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing Node.js dependencies..."
  npm ci --prefer-offline --no-audit
else
  echo "✅ Node.js dependencies already installed"
fi

# Check if Python venv exists
if [ ! -d "venv" ]; then
  echo "🐍 Creating Python virtual environment..."
  python3 -m venv venv
fi

# Activate venv and install Python dependencies
echo "📦 Installing Python dependencies..."
source venv/bin/activate
pip install -q -r requirements.txt

# Update browserslist database for minimal warnings
echo "🔄 Updating browserslist database..."
npx update-browserslist-db@latest --silent || true

# Run linting
echo "🔍 Running linters..."
npm run lint --silent

# Build Next.js application
echo "🏗️  Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "📊 Build artifacts:"
ls -lh .next/

echo ""
echo "🎯 To start the application:"
echo "  Development: npm run dev"
echo "  Production:  npm start"
