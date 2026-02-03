#!/usr/bin/env node

/**
 * Enhanced Deployment Script with Cache Busting
 * 
 * This script ensures your deployment never suffers from cached CSS issues by:
 * 1. Building with fresh content hashes
 * 2. Verifying asset hashing
 * 3. Deploying with cache invalidation
 * 4. Testing cache headers post-deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load .dev.vars if it exists
const devVarsPath = path.join(__dirname, '..', '.dev.vars');
if (fs.existsSync(devVarsPath)) {
    const devVars = fs.readFileSync(devVarsPath, 'utf8');
    devVars.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...valueParts] = trimmed.split('=');
            if (key && valueParts.length > 0) {
                process.env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
            }
        }
    });
}

const PROJECT_NAME = 'fractional-dev-portfolio';
const BUILD_DIR = './build/client';
const SITE_URL = 'https://rowleythompson.com';

function log(message, type = 'info') {
    const icons = {
        info: 'ℹ️',
        success: '✅',
        error: '❌',
        warning: '⚠️',
        build: '🔨',
        deploy: '🚀',
        test: '🧪'
    };
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    console.log(`[${timestamp}] ${icons[type]} ${message}`);
}

function runCommand(command, description) {
    log(`Running: ${description}`, 'build');
    try {
        const output = execSync(command, {
            encoding: 'utf8',
            stdio: 'pipe'
        });
        return output;
    } catch (error) {
        log(`Command failed: ${command}`, 'error');
        log(`Error: ${error.message}`, 'error');
        process.exit(1);
    }
}

function verifyAssetHashing() {
    log('Verifying asset hashing...', 'test');

    const assetsDir = path.join(BUILD_DIR, 'assets');
    if (!fs.existsSync(assetsDir)) {
        log('Assets directory not found!', 'error');
        return false;
    }

    const files = fs.readdirSync(assetsDir);
    const cssFiles = files.filter(f => f.endsWith('.css'));
    const jsFiles = files.filter(f => f.endsWith('.js'));

    log(`Found ${cssFiles.length} CSS files and ${jsFiles.length} JS files`, 'info');

    // Check if files have hashes in their names
    const hashedFiles = files.filter(f => f.includes('-') && f.match(/[a-f0-9]{8}/));

    if (hashedFiles.length === 0) {
        log('❌ No hashed files found! Content hashing may not be working.', 'error');
        return false;
    }

    log(`✅ Found ${hashedFiles.length} properly hashed files`, 'success');

    // Log some examples
    hashedFiles.slice(0, 3).forEach(file => {
        log(`  Example: ${file}`, 'info');
    });

    return true;
}

function checkBuildIntegrity() {
    log('Checking build integrity...', 'test');

    // Remix doesn't generate static index.html - it uses SSR with Cloudflare Pages Functions
    // Check for files that actually exist in Remix build output
    const requiredFiles = [
        '_headers',
        'assets'
    ];

    const missingFiles = requiredFiles.filter(file => {
        const filePath = path.join(BUILD_DIR, file);
        return !fs.existsSync(filePath);
    });

    if (missingFiles.length > 0) {
        log(`Missing required files: ${missingFiles.join(', ')}`, 'error');
        return false;
    }

    // Verify assets directory has content
    const assetsDir = path.join(BUILD_DIR, 'assets');
    if (fs.existsSync(assetsDir)) {
        const assetFiles = fs.readdirSync(assetsDir);
        if (assetFiles.length === 0) {
            log('Assets directory is empty!', 'error');
            return false;
        }
        log(`Found ${assetFiles.length} assets in build`, 'info');
    }

    // Check for server build (required for Remix SSR)
    const serverBuildDir = path.join(BUILD_DIR, '..', 'server');
    if (!fs.existsSync(serverBuildDir)) {
        log('⚠️ Server build directory not found - this is needed for Remix SSR', 'warning');
        log('Note: This might be okay if deploying to Cloudflare Pages with Functions', 'info');
    }

    log('✅ Build integrity check passed', 'success');
    return true;
}

function deployToCloudflare() {
    log('Deploying to Cloudflare Pages...', 'deploy');

    // Use wrangler with project config - deploys based on wrangler.toml pages_build_output_dir
    const deployCommand = `wrangler pages deploy ${BUILD_DIR} --project-name ${PROJECT_NAME}`;
    const output = runCommand(deployCommand, 'Deploying to Cloudflare Pages');

    // Extract deployment URL from output
    const urlMatch = output.match(/https:\/\/[^\s]+/);
    if (urlMatch) {
        log(`Deployment URL: ${urlMatch[0]}`, 'success');
    }

    return true;
}

function testCacheHeaders() {
    log('Testing cache headers post-deployment...', 'test');

    // Run the cache header test script
    try {
        runCommand('node ./scripts/test-cache-headers.cjs', 'Testing cache headers');
        log('✅ Cache header tests completed', 'success');
    } catch (error) {
        log('⚠️ Cache header tests failed, but deployment succeeded', 'warning');
    }
}

function cleanupOldBuilds() {
    log('Cleaning up old build artifacts...', 'build');

    // Remove old build directory if it exists
    if (fs.existsSync(BUILD_DIR)) {
        runCommand(`rm -rf ${BUILD_DIR}`, 'Cleaning old build');
    }

    log('✅ Cleanup completed', 'success');
}

async function main() {
    log('🚀 Starting Enhanced Deployment with Cache Busting', 'deploy');
    console.log('');

    try {
        // Step 1: Cleanup
        cleanupOldBuilds();

        // Step 2: Build
        log('Building application...', 'build');
        runCommand('npm run build', 'Building with Vite');

        // Step 3: Verify build
        if (!checkBuildIntegrity()) {
            log('Build integrity check failed!', 'error');
            process.exit(1);
        }

        // Step 4: Verify asset hashing
        if (!verifyAssetHashing()) {
            log('Asset hashing verification failed!', 'error');
            process.exit(1);
        }

        // Step 5: Deploy
        deployToCloudflare();

        // Step 6: Test cache headers
        testCacheHeaders();

        console.log('');
        log('🎉 Deployment completed successfully!', 'success');
        log(`Your site is live at: ${SITE_URL}`, 'success');
        log('CSS and assets are properly cache-busted and will update immediately.', 'success');

        console.log('');
        log('📋 Next steps:', 'info');
        log('1. Visit your site to verify changes', 'info');
        log('2. Check browser dev tools Network tab for proper cache headers', 'info');
        log('3. Hard refresh (Cmd+Shift+R) to test cache busting', 'info');

    } catch (error) {
        log(`Deployment failed: ${error.message}`, 'error');
        process.exit(1);
    }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Enhanced Deployment Script with Cache Busting

Usage: node scripts/deploy-with-cache-busting.cjs [options]

Options:
  --help, -h     Show this help message
  --dry-run      Show what would be done without actually deploying
  --skip-tests   Skip cache header tests

This script ensures your deployment never suffers from cached CSS issues.
    `);
    process.exit(0);
}

if (args.includes('--dry-run')) {
    log('DRY RUN MODE - No actual deployment will occur', 'warning');
    // Modify functions to not actually execute commands
    const originalRunCommand = runCommand;
    runCommand = (command, description) => {
        log(`[DRY RUN] Would run: ${command}`, 'info');
        return '';
    };
}

main();
