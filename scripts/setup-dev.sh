#!/bin/bash

# Lightweight development setup script
# Minimal dependencies and quick start

set -e

echo "🎯 Setting up accessibility-validator development environment..."

# Check for required tools
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting."; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "❌ Python 3 is required but not installed. Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting."; exit 1; }

echo "✅ Prerequisites check passed"

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Create Python virtual environment
if [ ! -d "venv" ]; then
  echo "🐍 Creating Python virtual environment..."
  python3 -m venv venv
fi

# Activate and install Python dependencies
echo "📦 Installing Python dependencies..."
source venv/bin/activate
pip install -r requirements.txt

# Create .env.local from template if it doesn't exist
if [ ! -f ".env.local" ]; then
  echo "📝 Creating .env.local from template..."
  cat > .env.local << 'EOF'
# Development Environment Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NODE_ENV=development

# MBTQ Ecosystem Integration (Optional - add your keys)
# DEAFAUTH_API_KEY=your_deafauth_key_here
# FIBONROSE_ENDPOINT=https://fibonrose.api.url
# DAO_PERMISSIONS_URL=https://mbtquniverse.com/api
# MAGICIAN_DISPATCHER_URL=https://360magicians.api.url
EOF
  echo "✅ .env.local created - update with your API keys if needed"
fi

echo ""
echo "✅ Development environment setup complete!"
echo ""
echo "🚀 To start development:"
echo "  npm run dev       # Start both Next.js and FastAPI"
echo "  npm run next-dev  # Start only Next.js"
echo "  npm run fastapi-dev # Start only FastAPI"
echo ""
echo "🌐 Application will be available at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
