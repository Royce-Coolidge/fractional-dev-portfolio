#!/usr/bin/env node

/**
 * Content Hashing Test Script for Cloudflare Pages
 * 
 * This script verifies that content hashing is working correctly by:
 * 1. Making a test change to a component
 * 2. Building the project
 * 3. Capturing asset filenames
 * 4. Making another change and building again
 * 5. Verifying that asset hashes changed
 * 6. Restoring original files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TEST_FILE = 'app/components/button/button.jsx';
const BUILD_DIR = 'build/client/assets';

function log(message, type = 'info') {
    const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
    console.log(`${icons[type]} ${message}`);
}

function getAssetFilenames() {
    if (!fs.existsSync(BUILD_DIR)) {
        return { js: [], css: [] };
    }

    const files = fs.readdirSync(BUILD_DIR);
    return {
        js: files.filter(f => f.endsWith('.js')).sort(),
        css: files.filter(f => f.endsWith('.css')).sort(),
        images: files.filter(f => /\.(png|jpg|jpeg|gif|svg|webp|avif)$/i.test(f)).sort(),
        fonts: files.filter(f => /\.(woff2?|ttf|otf|eot)$/i.test(f)).sort()
    };
}

function makeTestChange() {
    const content = fs.readFileSync(TEST_FILE, 'utf8');
    const timestamp = Date.now();
    const newContent = content.replace(
        'export const Button = forwardRef(({ href, ...rest }, ref) => {',
        `export const Button = forwardRef(({ href, ...rest }, ref) => {\n  // Content hash test - ${timestamp}`
    );

    fs.writeFileSync(TEST_FILE, newContent);
    return content;
}

function restoreFile(originalContent) {
    fs.writeFileSync(TEST_FILE, originalContent);
}

function buildProject() {
    log('Building project...', 'info');
    try {
        execSync('npm run build', { stdio: 'pipe' });
        log('Build completed successfully', 'success');
        return true;
    } catch (error) {
        log(`Build failed: ${error.message}`, 'error');
        return false;
    }
}

function compareAssets(before, after, type) {
    const beforeFiles = before[type] || [];
    const afterFiles = after[type] || [];

    if (JSON.stringify(beforeFiles) !== JSON.stringify(afterFiles)) {
        log(`${type.toUpperCase()} files changed - content hashing working!`, 'success');
        return true;
    } else {
        log(`${type.toUpperCase()} files unchanged - content hashing may not be working`, 'warning');
        return false;
    }
}

function main() {
    log('🧪 Testing Content Hashing for Cloudflare Pages...', 'info');
    console.log('');

    try {
        // Step 1: Initial build
        log('Step 1: Initial build', 'info');
        if (!buildProject()) {
            process.exit(1);
        }

        const initialAssets = getAssetFilenames();
        log(`Initial assets: ${initialAssets.js.length} JS, ${initialAssets.css.length} CSS files`, 'info');

        // Step 2: Make test change
        log('Step 2: Making test change to button component', 'info');
        const originalContent = makeTestChange();

        // Step 3: Build with changes
        log('Step 3: Building with changes', 'info');
        if (!buildProject()) {
            restoreFile(originalContent);
            process.exit(1);
        }

        const changedAssets = getAssetFilenames();
        log(`Changed assets: ${changedAssets.js.length} JS, ${changedAssets.css.length} CSS files`, 'info');

        // Step 4: Make another change
        log('Step 4: Making second test change', 'info');
        const secondChange = changedAssets.js[0] ? 'Second change' : 'Fallback change';
        makeTestChange();

        // Step 5: Build again
        log('Step 5: Building again', 'info');
        if (!buildProject()) {
            restoreFile(originalContent);
            process.exit(1);
        }

        const finalAssets = getAssetFilenames();

        // Step 6: Restore original file
        log('Step 6: Restoring original file', 'info');
        restoreFile(originalContent);

        // Step 7: Analyze results
        log('Step 7: Analyzing results', 'info');
        console.log('');

        const jsChanged = compareAssets(initialAssets, changedAssets, 'js');
        const cssChanged = compareAssets(initialAssets, changedAssets, 'css');
        const jsChangedAgain = compareAssets(changedAssets, finalAssets, 'js');

        console.log('');
        log('📊 Test Results Summary:', 'info');
        log(`JavaScript files changed: ${jsChanged ? 'YES' : 'NO'}`, jsChanged ? 'success' : 'warning');
        log(`CSS files changed: ${cssChanged ? 'YES' : 'NO'}`, cssChanged ? 'success' : 'warning');
        log(`JavaScript files changed again: ${jsChangedAgain ? 'YES' : 'NO'}`, jsChangedAgain ? 'success' : 'warning');

        if (jsChanged || cssChanged) {
            console.log('');
            log('🎉 SUCCESS: Content hashing is working correctly!', 'success');
            log('   Your build system generates unique filenames when content changes.', 'success');
            log('   This prevents browser caching issues on Cloudflare Pages.', 'success');
        } else {
            console.log('');
            log('⚠️  WARNING: Content hashing may not be working as expected.', 'warning');
            log('   Asset filenames did not change when code was modified.', 'warning');
            log('   This could lead to caching issues in production.', 'warning');
        }

        console.log('');
        log('📋 Next Steps:', 'info');
        log('1. Deploy to Cloudflare Pages: npm run deploy', 'info');
        log('2. Test in production with browser dev tools', 'info');
        log('3. Verify cache headers are working correctly', 'info');
        log('4. Monitor for any caching issues in production', 'info');

    } catch (error) {
        log(`Test failed: ${error.message}`, 'error');
        process.exit(1);
    }
}

main();

