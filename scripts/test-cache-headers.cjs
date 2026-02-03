#!/usr/bin/env node

/**
 * Cache Headers Test Script for Cloudflare Pages
 * 
 * This script tests that cache headers are working correctly by:
 * 1. Making HTTP requests to your live assets
 * 2. Checking cache-control headers
 * 3. Verifying expected cache behavior
 */

const https = require('https');
const http = require('http');

const SITE_URL = 'https://fractional-dev-portfolio.pages.dev';

function log(message, type = 'info') {
    const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
    console.log(`${icons[type]} ${message}`);
}

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;

        const req = client.request(url, { method: 'HEAD' }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    url: url
                });
            });
        });

        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.end();
    });
}

function checkCacheHeader(headers, expectedValue) {
    const cacheControl = headers['cache-control'];
    if (!cacheControl) {
        return { valid: false, message: 'No cache-control header found' };
    }

    if (cacheControl.includes(expectedValue)) {
        return { valid: true, message: `Cache header correct: ${cacheControl}` };
    }

    return { valid: false, message: `Cache header incorrect. Expected: ${expectedValue}, Got: ${cacheControl}` };
}

async function testAsset(url, expectedCacheControl) {
    try {
        log(`Testing: ${url}`, 'info');
        const response = await makeRequest(url);

        if (response.statusCode !== 200) {
            log(`❌ Status ${response.statusCode} for ${url}`, 'error');
            return false;
        }

        const cacheCheck = checkCacheHeader(response.headers, expectedCacheControl);
        if (cacheCheck.valid) {
            log(`✅ ${cacheCheck.message}`, 'success');
            return true;
        } else {
            log(`❌ ${cacheCheck.message}`, 'error');
            return false;
        }

    } catch (error) {
        log(`❌ Error testing ${url}: ${error.message}`, 'error');
        return false;
    }
}

async function discoverAssets() {
    log('🔍 Discovering assets from your site...', 'info');

    // Common asset patterns to test
    const assetTests = [
        // Static assets (should have 1-hour cache)
        { url: `${SITE_URL}/favicon.ico`, expected: 'max-age=3600' },
        { url: `${SITE_URL}/favicon.svg`, expected: 'max-age=3600' },
        { url: `${SITE_URL}/icon-256.png`, expected: 'max-age=3600' },
        { url: `${SITE_URL}/manifest.json`, expected: 'max-age=3600' },
        { url: `${SITE_URL}/robots.txt`, expected: 'max-age=3600' },
    ];

    // Try to discover hashed assets by fetching the main page
    try {
        log('🔍 Attempting to discover hashed assets...', 'info');
        const mainPageResponse = await makeRequest(`${SITE_URL}/`);

        if (mainPageResponse.statusCode === 200) {
            log('✅ Main page accessible', 'success');
        }
    } catch (error) {
        log(`⚠️ Could not fetch main page: ${error.message}`, 'warning');
    }

    log('📝 To test hashed assets automatically:', 'info');
    log('1. Run: npm run test:content-hashing', 'info');
    log('2. Or manually add asset URLs to this script', 'info');
    log('3. Check browser dev tools Network tab for asset URLs', 'info');

    return assetTests;
}

async function main() {
    log('🧪 Testing Cache Headers for Cloudflare Pages...', 'info');
    log(`Site: ${SITE_URL}`, 'info');
    console.log('');

    try {
        const assetTests = await discoverAssets();

        if (assetTests.length === 0) {
            log('No assets to test. Please add asset URLs to the script.', 'warning');
            return;
        }

        log('Running cache header tests...', 'info');
        console.log('');

        let passed = 0;
        let total = assetTests.length;

        for (const test of assetTests) {
            const success = await testAsset(test.url, test.expected);
            if (success) passed++;
            console.log('');
        }

        log('📊 Test Results:', 'info');
        log(`Passed: ${passed}/${total}`, passed === total ? 'success' : 'warning');

        if (passed === total) {
            log('🎉 All cache headers are working correctly!', 'success');
        } else {
            log('⚠️  Some cache headers need attention.', 'warning');
        }

        console.log('');
        log('📋 Manual Verification Steps:', 'info');
        log('1. Open browser dev tools on your site', 'info');
        log('2. Go to Network tab and reload page', 'info');
        log('3. Check that assets show correct cache headers', 'info');
        log('4. Verify hashed assets have "immutable" flag', 'info');

    } catch (error) {
        log(`Test failed: ${error.message}`, 'error');
    }
}

main();

