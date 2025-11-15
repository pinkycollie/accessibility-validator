# CI/CD Pipeline Documentation

## Overview

The accessibility-validator repository now includes a comprehensive CI/CD pipeline optimized for lightweight operations, automation, and efficient development workflows. This document outlines the automated processes and how to use them.

## Automated Workflows

### 1. Continuous Integration (CI)

**Workflow File:** `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**What it does:**
- Lints JavaScript/TypeScript code using ESLint
- Lints Python code using Flake8
- Builds the Next.js application
- Runs unit tests (when available)
- Validates code quality and standards

**Manual Run:**
```bash
# Locally test what CI will check
npm run lint
npm run build
npm run test:api
```

### 2. Continuous Deployment (CD)

**Workflow File:** `.github/workflows/deploy.yml`

**Triggers:**
- Push to `main` branch
- Manual trigger via GitHub Actions UI

**What it does:**
- Builds the production application
- Deploys to Vercel (when configured)
- Reports deployment status

**Required Secrets:**
- `VERCEL_TOKEN` - Your Vercel authentication token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

**Setup Instructions:**
1. Create a Vercel account and project
2. Get your Vercel token from: https://vercel.com/account/tokens
3. Add secrets to GitHub: Settings → Secrets and variables → Actions
4. Push to `main` branch to trigger deployment

### 3. Auto-Fix Workflow

**Workflow File:** `.github/workflows/auto-fix.yml`

**Triggers:**
- Push to any branch
- Pull requests
- Manual trigger

**What it does:**
- Automatically fixes ESLint issues
- Formats Python code with Black
- Sorts Python imports with isort
- Updates browserslist database
- Commits and pushes fixes automatically

**Note:** This workflow requires write permissions and will create commits automatically.

### 4. Security Scanning

**Workflow File:** `.github/workflows/security.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests
- Weekly schedule (Monday 2 AM UTC)
- Manual trigger

**What it does:**
- Runs `npm audit` for Node.js dependencies
- Runs `safety check` for Python dependencies
- Performs CodeQL analysis for vulnerabilities
- Reports security issues in GitHub Security tab

**View Results:**
- Go to: Repository → Security → Code scanning alerts

### 5. MBTQ Ecosystem Integration

**Workflow File:** `.github/workflows/ecosystem-sync.yml`

**Triggers:**
- Push to `main` branch
- Manual trigger

**What it does:**
- Notifies DeafAUTH service about deployments
- Updates Fibonrose registry with deployment info
- Triggers 360Magicians post-deployment validation

**Required Secrets:**
- `DEAFAUTH_API_KEY`
- `DEAFAUTH_WEBHOOK_URL`
- `FIBONROSE_API_KEY`
- `FIBONROSE_ENDPOINT`
- `MAGICIAN_API_KEY`
- `MAGICIAN_DISPATCHER_URL`

### 6. Dependency Updates (Dependabot)

**Configuration File:** `.github/dependabot.yml`

**What it does:**
- Automatically checks for dependency updates weekly
- Creates PRs for npm package updates
- Creates PRs for pip package updates
- Creates PRs for GitHub Actions updates
- Ignores major version updates by default for stability

**Configuration:**
- Runs every Monday at 2 AM UTC
- Maximum 10 open PRs for npm/pip, 5 for GitHub Actions
- Auto-labels PRs with `dependencies` and ecosystem tags

## Lightweight Build Scripts

### Build Script

**Location:** `scripts/build.sh`

**Usage:**
```bash
bash scripts/build.sh
# or
npm run build:lightweight
```

**What it does:**
- Checks and installs dependencies only if needed
- Creates Python virtual environment
- Updates browserslist database
- Runs linters
- Builds the application
- Reports build artifacts

**Benefits:**
- Minimal overhead
- Fast execution
- Offline-friendly (prefers cached packages)
- Clear progress reporting

### Development Setup Script

**Location:** `scripts/setup-dev.sh`

**Usage:**
```bash
bash scripts/setup-dev.sh
# or
npm run setup
```

**What it does:**
- Checks for required tools (Node.js, Python, npm)
- Installs all dependencies
- Creates Python virtual environment
- Generates `.env.local` template
- Provides next steps guidance

**When to use:**
- First time setting up the project
- After cloning the repository
- When starting fresh development

## Multi-Tenant Configuration

**Configuration File:** `config/multi-tenant.yml`

**Purpose:**
Enable easy deployment for different tenant types with varying feature sets and limits.

**Tenant Types:**
1. **Default** - Standard production configuration
2. **Enterprise** - Extended features for large organizations
3. **Startup** - Lightweight for small teams
4. **Community** - Free tier with basic features
5. **Development** - Full access for testing

**Usage:**
Set the `TENANT_CONFIG` environment variable to the desired tenant type.

```bash
# In .env.local
TENANT_CONFIG=enterprise
```

**Features Controlled:**
- API rate limits
- Batch processing sizes
- Concurrent validation limits
- Feature availability
- Integration enablement

## Docker Deployment

### Build and Run with Docker

**Single Container:**
```bash
docker build -t accessibility-validator .
docker run -p 3000:3000 -p 8000:8000 accessibility-validator
```

**Using Docker Compose:**
```bash
# Start services
npm run docker:run
# or
docker-compose up -d

# Stop services
npm run docker:stop
# or
docker-compose down
```

**Features:**
- Multi-stage build for minimal image size
- Non-root user for security
- Health checks included
- Python and Node.js in single container
- Production-optimized

## Manual Testing

### Run Tests Locally

**Python/FastAPI Tests:**
```bash
npm run test:api
# or
pytest api/tests/ -v
```

**Linting:**
```bash
# JavaScript/TypeScript
npm run lint
npm run lint:fix

# Python
pip install flake8 black isort
flake8 api/
black api/ --check
isort api/ --check
```

**Build Verification:**
```bash
npm run build
npm start
```

## Monitoring and Maintenance

### Check Workflow Status

1. Go to repository on GitHub
2. Click "Actions" tab
3. View workflow runs and their status

### Review Security Alerts

1. Go to repository on GitHub
2. Click "Security" tab
3. Review "Code scanning alerts"
4. Review "Dependabot alerts"

### Update Dependencies

**Automatic:**
- Dependabot creates PRs weekly
- Review and merge PRs after CI passes

**Manual:**
```bash
npm run update-deps
```

## Best Practices

1. **Always run CI locally before pushing:**
   ```bash
   npm run lint
   npm run build
   npm run test:api
   ```

2. **Review auto-fix commits:**
   - Auto-fix workflow may create commits
   - Review changes before merging PRs

3. **Keep secrets secure:**
   - Never commit API keys or tokens
   - Use GitHub Secrets for sensitive data
   - Use `.env.local` for local development

4. **Monitor security alerts:**
   - Check Security tab weekly
   - Address vulnerabilities promptly
   - Keep dependencies updated

5. **Test deployments:**
   - Use development tenant config for testing
   - Verify integrations before production deploy
   - Monitor deployment status in Actions tab

## Troubleshooting

### Build Fails

**Check:**
- Node.js version (requires >= 18.0.0)
- Python version (requires >= 3.11)
- Network connectivity for dependencies
- `.env.local` configuration

**Fix:**
```bash
# Clean and rebuild
rm -rf node_modules .next
npm install
npm run build
```

### Tests Fail

**Check:**
- All dependencies installed
- Python virtual environment activated
- Test files exist in correct locations

**Fix:**
```bash
# Reinstall Python dependencies
pip install -r requirements.txt
pytest api/tests/ -v
```

### Deployment Fails

**Check:**
- Vercel secrets configured correctly
- Build passes locally
- No syntax errors in workflow files

**Fix:**
- Verify secrets in GitHub Settings
- Check Actions tab for error details
- Re-run workflow after fixing issues

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Docker Documentation](https://docs.docker.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## Support

For issues or questions:
1. Check this documentation
2. Review workflow logs in Actions tab
3. Check existing GitHub issues
4. Create new issue with details and logs
