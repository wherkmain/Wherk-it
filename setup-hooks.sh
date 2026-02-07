#!/bin/bash
# setup-hooks.sh - Run this to install git hooks

echo "Setting up git hooks..."

# Create hooks directory
mkdir -p .git/hooks

# Install pre-commit hook
if [ -f .githooks/pre-commit ]; then
    cp .githooks/pre-commit .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    echo "✅ Pre-commit hook installed"
else
    echo "❌ Pre-commit hook not found in .githooks/"
    exit 1
fi

# Install post-checkout hook (auto-installs hooks on clone)
if [ -f .githooks/post-checkout ]; then
    cp .githooks/post-checkout .git/hooks/post-checkout
    chmod +x .git/hooks/post-checkout
    echo "✅ Post-checkout hook installed"
fi

# Configure git to use local hooks (if needed)
git config core.hooksPath .git/hooks

echo ""
echo "🛡️ Secret detection is now active!"
echo "Any commit containing secrets will be blocked."
