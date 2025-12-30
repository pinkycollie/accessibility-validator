# Workflow Usage Guide

This guide provides examples and best practices for using the educational CI/CD workflows in the accessibility-validator repository.

## 🎓 Educational Approach

These workflows are designed to **teach you CI/CD concepts** while automating your development pipeline. Each workflow includes:

- 📖 **Educational "Toast" Notifications**: Learn what's happening at each step
- 💡 **Pro Tips**: Best practices and common solutions
- 🔍 **Transparent Operations**: Clear visibility into every action
- ✅ **Graceful Handling**: Missing configurations don't cause failures

## 🚀 Quick Start

### 1. Trigger CI Workflow

The CI workflow runs automatically on every push and pull request. It validates your code without building or deploying.

**What it checks:**
- ✅ Repository checkout
- ✅ Environment setup (Node.js + Python)
- ✅ Dependency installation
- ✅ ESLint code quality
- ✅ Python syntax validation

**To see it in action:**
1. Make a code change
2. Push to your branch
3. Go to **Actions** tab
4. Click on the latest workflow run
5. Explore each job to see educational messages

### 2. Manual Deployment to Vercel

Deployment is **manual** - you control when code goes live!

**Steps:**
1. Go to repository **Actions** tab
2. Select **"Deploy to Vercel (Manual)"** workflow
3. Click **"Run workflow"** button
4. Choose:
   - **Environment**: production or preview
   - **Reason**: Optional description (e.g., "Bug fix for login")
5. Click **"Run workflow"** (green button)
6. Watch the deployment unfold with educational feedback

**First time deploying?**
- The workflow checks if Vercel secrets are configured
- If missing, it provides step-by-step setup instructions
- No failures, just guidance!

### 3. Security Scanning

Security checks run automatically and weekly, but you can trigger them manually too.

**Automatic triggers:**
- Every push to main/develop
- Every pull request
- Every Monday at 2 AM UTC (scheduled)

**Manual trigger:**
1. Go to **Actions** → **"Security Checks"**
2. Click **"Run workflow"**
3. Optionally enable **"deep scan"** for advanced analysis
4. Review results with educational explanations

### 4. MBTQ Ecosystem Sync

Optional integration with MBTQ services. Works even without configuration!

**What it does:**
- Notifies DeafAUTH (if configured)
- Updates Fibonrose registry (if configured)
- Dispatches to 360Magicians (if configured)
- Provides educational content about each service

**To trigger:**
1. Runs automatically on push to main
2. Or go to **Actions** → **"MBTQ Ecosystem Sync"**
3. Click **"Run workflow"**
4. Choose sync target (all, deafauth, fibonrose, magicians, dao)

## 🔐 Configuring Secrets

Workflows work without secrets but provide limited functionality. Here's how to enable full features:

### Vercel Deployment Secrets

1. **Get Vercel Token:**
   - Visit: https://vercel.com/account/tokens
   - Click "Create Token"
   - Name: "GitHub Actions"
   - Expiration: Choose based on your needs
   - Copy the token (shown only once!)

2. **Get Project IDs:**
   - Go to your Vercel project
   - Click "Settings"
   - Find "Project ID" and "Team ID" (or "Org ID")

3. **Add to GitHub:**
   - Repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add these three secrets:
     - `VERCEL_TOKEN` = [your token]
     - `VERCEL_ORG_ID` = [your org/team ID]
     - `VERCEL_PROJECT_ID` = [your project ID]

### MBTQ Ecosystem Secrets (Optional)

Only add these if you want ecosystem integration:

```
DEAFAUTH_API_KEY=your_key_here
DEAFAUTH_WEBHOOK_URL=https://deafauth.api.url/webhook
FIBONROSE_API_KEY=your_key_here
FIBONROSE_ENDPOINT=https://fibonrose.api.url
MAGICIAN_API_KEY=your_key_here
MAGICIAN_DISPATCHER_URL=https://magicians.api.url
```

**Note**: Without these secrets, workflows still run and provide educational content about each service.

## 📚 Learning from Workflow Logs

Each workflow produces rich educational output. Here's how to learn from them:

### Reading CI Logs

1. Click on a CI workflow run
2. Expand each job:
   - **Educational Setup** - Learn about environment preparation
   - **Code Quality Checks** - Understand linting
   - **Python Validation** - See syntax checking
   - **Build Check** - Learn why we skip heavy builds

3. Look for sections marked with:
   - 🎓 LEARNING MOMENT
   - 💡 Educational Toast
   - ✅ Success messages
   - ⚠️ Helpful warnings

### Understanding Deployment Logs

1. Open a deployment workflow run
2. Key sections to review:
   - **Pre-deployment Check** - What happens before deployment
   - **Verify Deployment Secrets** - Security setup explained
   - **Deploy to Vercel** - The actual deployment process
   - **Post-deployment Summary** - What you learned

### Security Scan Insights

1. Open security workflow results
2. Review each job:
   - **NPM Audit** - Node.js dependency vulnerabilities
   - **Python Security** - pip package issues
   - **Security Summary** - Best practices and next steps

3. If issues found:
   - Read the educational explanation
   - Follow the "HOW TO FIX" instructions
   - Re-run after fixing

## 🎯 Common Scenarios

### Scenario 1: First Time Contributor

**Goal**: Understand the CI/CD pipeline

1. Fork the repository
2. Make a small change (e.g., update README)
3. Push to your branch
4. Watch the CI workflow run
5. Read all the educational messages
6. Learn about each stage

### Scenario 2: Ready to Deploy

**Goal**: Deploy your changes to production

1. Ensure CI is passing (green checkmark)
2. Get code reviewed and approved
3. Merge to main branch
4. Go to Actions → Deploy to Vercel
5. Run workflow with environment: "production"
6. Add deployment reason: "Merged PR #123"
7. Monitor deployment logs
8. Test the deployed site

### Scenario 3: Security Alert Received

**Goal**: Address security vulnerabilities

1. Check which package has issues
2. Review the educational security content
3. Run security workflow manually for latest scan
4. Follow fix instructions in the logs
5. Update dependencies locally
6. Push changes
7. Verify security workflow passes

### Scenario 4: Learning CI/CD

**Goal**: Understand continuous integration

1. Use the Developer Magician API:
   ```bash
   curl http://localhost:8000/api/py/learn/ci-cd-basics
   ```

2. Explore workflow stages:
   ```bash
   curl http://localhost:8000/api/py/workflows/ci-cd-story
   ```

3. Read workflow files:
   - `.github/workflows/ci.yml`
   - `.github/workflows/deploy-vercel.yml`
   - `.github/workflows/security.yml`

4. Experiment:
   - Make small changes
   - Watch workflows run
   - Read the educational output
   - Try different scenarios

## 💡 Best Practices

### ✅ Do

- **Read the educational messages** - They're there to help you learn
- **Fix issues locally first** - Run `npm run lint` before pushing
- **Use preview deployments** - Test changes before production
- **Review security scans** - Address issues promptly
- **Ask questions** - Use GitHub Discussions if confused

### ❌ Don't

- **Ignore linting errors** - They catch bugs early
- **Deploy without CI passing** - Let validation complete first
- **Skip reading logs** - Educational content is valuable
- **Rush deployments** - Manual control is intentional
- **Disable workflows** - They're lightweight and educational

## 🔄 Workflow Customization

### Adjust CI Frequency

Edit `.github/workflows/ci.yml`:

```yaml
on:
  push:
    branches: [main, develop, feature/**]  # Add more branches
  pull_request:
    branches: [main]
```

### Change Security Scan Schedule

Edit `.github/workflows/security.yml`:

```yaml
schedule:
  - cron: '0 2 * * 1'  # Change time or frequency
  # Example: '0 14 * * *' = Every day at 2 PM UTC
```

### Customize Educational Messages

Edit `api/index.py` to add your own educational content:

```python
@app.get("/api/py/learn/custom-topic")
async def learn_custom_topic():
    return {
        "title": "Your Custom Topic",
        "content": "Your educational content here",
        "learning_points": [...]
    }
```

## 🆘 Troubleshooting

### CI Failing?

1. **Check the logs** - Educational messages explain issues
2. **Run locally** - `npm run lint` and `npm ci`
3. **Review changes** - Did you introduce syntax errors?
4. **Ask for help** - Create an issue with workflow run link

### Deployment Not Working?

1. **Verify secrets** - Are all three Vercel secrets configured?
2. **Check logs** - Look for "Secret verification" job
3. **Follow instructions** - Workflow provides setup steps
4. **Try preview first** - Deploy to preview environment to test

### Security Scan Issues?

1. **Don't panic** - Vulnerabilities are common
2. **Read severity** - Low/moderate can often wait
3. **Follow fix guide** - Logs provide specific instructions
4. **Update carefully** - Test after updating dependencies
5. **Re-run scan** - Verify fixes resolved issues

## 📖 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs/concepts/deployments/overview)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MBTQ Universe](https://mbtquniverse.com)

## 🤝 Contributing

Found ways to improve the workflows? Want to add more educational content?

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request
5. Explain what you learned!

Remember: These workflows are designed to teach. Every improvement should maintain or enhance the educational value.

---

**Built with ❤️ for the Deaf community by MBTQ**  
**Educational CI/CD powered by PinkSync**
