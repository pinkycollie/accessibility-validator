# PinkSync Accessibility Validator

**Part of the MBTQ Ecosystem - Deaf-First Accessibility Automation**

[![CI Status](https://github.com/pinkycollie/accessibility-validator/workflows/CI%20-%20Build%20and%20Test/badge.svg)](https://github.com/pinkycollie/accessibility-validator/actions)
[![Security](https://github.com/pinkycollie/accessibility-validator/workflows/Security%20Scanning/badge.svg)](https://github.com/pinkycollie/accessibility-validator/security)

The Accessibility Validator is a core service within PinkSync that ensures all interfaces prioritize ASL flow and bypass audio-only UX. This service validates websites and applications for Deaf-first accessibility, going beyond standard WCAG compliance to focus on visual ui and sign language navigation patterns.

## 🎯 Purpose in MBTQ Ecosystem

- **PinkSync Role**: Acts as the “nervous system” executor for accessibility validation
- **DeafAUTH Integration**: Validates identity flows work for Deaf users
- **Fibonrose Logging**: Reports accessibility scores to trust/reputation system
- **360Magicians Compatible**: AI agents can trigger validation tasks
- **DAO Governed**: Validation standards controlled by mbtquniverse.com governance

## ✨ Key Features

- 🤖 **Automated CI/CD Pipeline** - Continuous integration and deployment with GitHub Actions
- 🔒 **Security Scanning** - Automated vulnerability detection with CodeQL and dependency audits
- 🔄 **Auto-Fix** - Automatic code formatting and linting fixes
- 📦 **Dependency Management** - Automated updates via Dependabot
- 🐳 **Docker Support** - Lightweight containerized deployment
- 🏢 **Multi-Tenant** - Configurable deployments for different use cases
- 🧪 **Test Infrastructure** - Automated testing for Python and JavaScript

## 🚀 Quick Deploy

### Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/pinkycollie/accessibility-validator.git
cd accessibility-validator

# Run automated setup script
npm run setup
# or
bash scripts/setup-dev.sh
```

This will:
- Install all dependencies (Node.js and Python)
- Create Python virtual environment
- Generate `.env.local` template
- Provide next steps

### One-Click Vercel Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pinkycollie/accessibility-validator)

### Manual Setup

```bash
# Clone and setup
git clone https://github.com/pinkycollie/accessibility-validator.git
cd accessibility-validator

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
npm install
pip install -r requirements.txt

# Copy environment template
cp .env.template .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

Open <http://localhost:3000> to see the validator interface.
FastAPI server runs on <http://127.0.0.1:8000>

### Docker Deployment

```bash
# Build and run with Docker Compose
npm run docker:run
# or
docker-compose up -d

# Stop services
npm run docker:stop
```

## 🏗️ Architecture

### Frontend (Next.js 14)

- **Validation Dashboard**: Real-time accessibility scanning interface
- **Visual Report Generator**: Deaf-first accessibility scores and recommendations
- **URL Input Interface**: Analyze live websites or upload designs
- **Integration Panel**: Connect to MBTQ ecosystem components

### Backend (FastAPI)

- **Web Scraping Engine**: Analyze live websites for accessibility issues
- **ASL Flow Validator**: Check if interfaces support sign language navigation
- **Audio-Bypass Detector**: Identify audio-only elements needing visual alternatives
- **Deaf-First Scoring**: Custom algorithms beyond standard WCAG

## 🔧 API Endpoints

### Core Validation

- `POST /api/py/validate` - Validate a URL or HTML content
- `GET /api/py/report/{validation_id}` - Get validation results
- `POST /api/py/batch-validate` - Validate multiple URLs

### Deaf-First Specific

- `POST /api/py/asl-flow-check` - Analyze ASL navigation compatibility
- `POST /api/py/audio-bypass-scan` - Detect audio-only elements
- `GET /api/py/deaf-score/{url}` - Get Deaf-first accessibility score

### MBTQ Integration

- `POST /api/py/deafauth-validate` - Validate DeafAUTH flow compatibility
- `POST /api/py/fibonrose-report` - Send scores to Fibonrose trust system
- `GET /api/py/ecosystem-status` - Check integration health

## 📊 Validation Criteria

### Visual-First Standards

- ✅ **Color Contrast**: Enhanced ratios for visual clarity
- ✅ **Visual Indicators**: All audio cues have visual alternatives
- ✅ **Text Readability**: Optimized for visual processing
- ✅ **Motion Sensitivity**: Respectful of visual processing differences

### ASL Navigation Compatibility

- ✅ **Gesture Support**: Interface responds to sign language input patterns
- ✅ **Visual Feedback**: Clear visual responses to all interactions
- ✅ **Spatial Logic**: Layout supports spatial thinking patterns
- ✅ **Time Flexibility**: No time-based interactions that exclude processing time

### Audio-Bypass Requirements

- ✅ **No Audio-Only Content**: All audio has visual alternatives
- ✅ **Visual Alerts**: System notifications are visual-first
- ✅ **Captions**: Video content includes accurate captions
- ✅ **Transcript Access**: Audio content has full text alternatives

## 🔗 MBTQ Ecosystem Integration

### DeafAUTH Connection

```javascript
// Validate authentication flow accessibility
const authValidation = await fetch('/api/py/deafauth-validate', {
  method: 'POST',
  body: JSON.stringify({ auth_flow_url: 'https://your-auth.com' })
});
```

### Fibonrose Trust Reporting

```javascript
// Report accessibility scores to trust system
const trustReport = await fetch('/api/py/fibonrose-report', {
  method: 'POST',
  body: JSON.stringify({ 
    url: 'https://validated-site.com',
    deaf_score: 92,
    asl_compatible: true
  })
});
```

### 360Magicians AI Integration

```javascript
// AI agents can trigger validation tasks
const aiValidation = await fetch('/api/py/ai-validate', {
  method: 'POST',
  headers: { 'X-Magician-Role': 'accessibility-auditor' },
  body: JSON.stringify({ task: 'validate_batch', urls: [...] })
});
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start both Next.js and FastAPI dev servers
npm run next-dev         # Start only Next.js dev server
npm run fastapi-dev      # Start only FastAPI dev server

# Building
npm run build            # Build Next.js production bundle
npm run build:lightweight # Run lightweight build script

# Testing
npm run lint             # Run ESLint on JavaScript/TypeScript
npm run lint:fix         # Run ESLint with auto-fix
npm run test:api         # Run Python API tests

# Utilities
npm run setup            # Run automated development setup
npm run docker:build     # Build Docker image
npm run docker:run       # Start Docker containers
npm run docker:stop      # Stop Docker containers
npm run update-deps      # Update all dependencies
```

### Project Structure

```
accessibility-validator/
├── .github/
│   ├── workflows/          # CI/CD automation workflows
│   └── dependabot.yml      # Automated dependency updates
├── app/                    # Next.js frontend
│   ├── components/         # UI components
│   ├── validation/         # Validation dashboard
│   └── api/               # Next.js API routes
├── api/                   # FastAPI backend
│   ├── tests/             # API test suite
│   ├── validators/        # Core validation logic
│   ├── deaf_first/       # Deaf-specific checks
│   ├── integrations/     # MBTQ ecosystem connections
│   └── models/           # Data models
├── config/                # Multi-tenant configurations
├── docs/                  # Documentation
├── scripts/               # Build and setup scripts
├── public/                # Static assets
└── tests/                 # Test suites
```

### Environment Variables

Copy `.env.template` to `.env.local` and configure:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
TENANT_CONFIG=development  # Options: default, enterprise, startup, community, development

# MBTQ Ecosystem (optional)
DEAFAUTH_API_KEY=your_deafauth_key
FIBONROSE_ENDPOINT=https://fibonrose.api.url
DAO_PERMISSIONS_URL=https://mbtquniverse.com/api
```

### Adding Custom Validators

```python
# api/validators/custom_validator.py
from .base import BaseValidator

class MyDeafFirstValidator(BaseValidator):
    def validate(self, content):
        # Your custom Deaf-first validation logic
        return {
            'passed': True,
            'score': 95,
            'recommendations': [...]
        }
```

## 📈 Scoring System

### Deaf-First Score (0-100)

- **Visual Clarity**: 25 points
- **ASL Compatibility**: 25 points
- **Audio Independence**: 25 points
- **Navigation Logic**: 25 points

### Trust Integration

- Scores automatically logged to Fibonrose
- DAO governance can adjust scoring criteria
- Community validation through mbtquniverse.com

## 🚢 Deployment

### Automated CI/CD (GitHub Actions)

This repository includes comprehensive CI/CD automation:

- ✅ **Continuous Integration**: Automatic linting, testing, and building on every push
- 🚀 **Continuous Deployment**: Auto-deploy to Vercel on merge to main
- 🔒 **Security Scanning**: Weekly vulnerability scans and CodeQL analysis
- 🔄 **Auto-Fix**: Automatic code formatting and dependency updates
- 📦 **Dependabot**: Automated dependency update PRs

**Setup:**
1. Fork/clone this repository
2. Add GitHub Secrets for Vercel deployment (see [CI/CD Guide](docs/CI-CD-GUIDE.md))
3. Push to `main` branch to trigger automatic deployment

**Required GitHub Secrets:**
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (for deployment)
- `DEAFAUTH_API_KEY`, `FIBONROSE_API_KEY`, `MAGICIAN_API_KEY` (optional, for ecosystem integration)

See the complete [CI/CD Documentation](docs/CI-CD-GUIDE.md) for detailed setup and usage.

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod
```

### Manual Server

```bash
# Production build
npm run build

# Start production server
npm start
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t accessibility-validator .
docker run -p 3000:3000 -p 8000:8000 accessibility-validator

# Stop services
docker-compose down
```

### Multi-Tenant Deployment

The application supports multiple deployment configurations (see `config/multi-tenant.yml`):
- **Enterprise**: Full features for large organizations
- **Startup**: Lightweight for small teams
- **Community**: Free tier with basic features
- **Development**: Full access for testing

Set `TENANT_CONFIG` environment variable to select configuration.

## 🤝 Contributing

This service is part of the MBTQ ecosystem and follows Deaf-first development principles:

1. **Visual-First Development**: All UI changes must prioritize visual communication
1. **ASL Logic**: Consider sign language navigation patterns
1. **Community Validation**: Changes reviewed by Deaf community members
1. **Ecosystem Integration**: Maintain compatibility with other MBTQ services

## 📄 License

MIT License - Part of the MBTQ Universe ecosystem

## 🔗 MBTQ Ecosystem Links

- **Main Universe**: [mbtquniverse.com](https://mbtquniverse.com)
- **DeafAUTH**: Identity and authentication for Deaf users
- **Fibonrose**: Trust and reputation system
- **360Magicians**: AI-powered automation agents
- **PinkSync**: Accessibility and automation nervous system

-----

**Built with ❤️ for the Deaf community by MBTQ**
