#!/usr/bin/env node

/**
 * Content Hashing Test Script
 * 
 * This script verifies that your build process is generating proper content hashes
 * for all assets, ensuring cache busting works correctly.
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = './build/client';
const ASSETS_DIR = path.join(BUILD_DIR, 'assets');

function log(message, type = 'info') {
    const icons = {
        info: 'ℹ️',
        success: '✅',
        error: '❌',
        warning: '⚠️',
        test: '🧪'
    };
    console.log(`${icons[type]} ${message}`);
}

function checkBuildExists() {
    if (!fs.existsSync(BUILD_DIR)) {
        log('Build directory not found! Run "npm run build" first.', 'error');
        return false;
    }
    return true;
}

function checkAssetsDirectory() {
    if (!fs.existsSync(ASSETS_DIR)) {
        log('Assets directory not found! Build may have failed.', 'error');
        return false;
    }
    return true;
}

function analyzeAssetFiles() {
    log('Analyzing asset files...', 'test');

    const files = fs.readdirSync(ASSETS_DIR);

    const analysis = {
        total: files.length,
        css: files.filter(f => f.endsWith('.css')),
        js: files.filter(f => f.endsWith('.js')),
        fonts: files.filter(f => /\.(woff2?|ttf|otf|eot)$/.test(f)),
        images: files.filter(f => /\.(png|jpg|jpeg|gif|svg|webp|avif)$/.test(f)),
        models: files.filter(f => /\.(glb|hdr|glsl)$/.test(f)),
        other: files.filter(f => !/\.(css|js|woff2?|ttf|otf|eot|png|jpg|jpeg|gif|svg|webp|avif|glb|hdr|glsl)$/.test(f))
    };

    log(`Total assets: ${analysis.total}`, 'info');
    log(`CSS files: ${analysis.css.length}`, 'info');
    log(`JS files: ${analysis.js.length}`, 'info');
    log(`Font files: ${analysis.fonts.length}`, 'info');
    log(`Image files: ${analysis.images.length}`, 'info');
    log(`3D model files: ${analysis.models.length}`, 'info');
    log(`Other files: ${analysis.other.length}`, 'info');

    return analysis;
}

function checkContentHashing(analysis) {
    log('Checking content hashing...', 'test');

    const allAssets = [
        ...analysis.css,
        ...analysis.js,
        ...analysis.fonts,
        ...analysis.images,
        ...analysis.models,
        ...analysis.other
    ];

    const hashedFiles = allAssets.filter(file => {
        // Check for 8-character hash pattern (e.g., filename-ABC12345.ext)
        return file.includes('-') && file.match(/[a-f0-9]{8}/);
    });

    const unhashedFiles = allAssets.filter(file => !hashedFiles.includes(file));

    log(`Hashed files: ${hashedFiles.length}/${allAssets.length}`,
        hashedFiles.length === allAssets.length ? 'success' : 'warning');

    if (unhashedFiles.length > 0) {
        log('Unhashed files found:', 'warning');
        unhashedFiles.forEach(file => {
            log(`  - ${file}`, 'warning');
        });
    }

    return {
        hashed: hashedFiles.length,
        total: allAssets.length,
        unhashed: unhashedFiles
    };
}

function checkHashUniqueness(analysis) {
    log('Checking hash uniqueness...', 'test');

    const allAssets = [
        ...analysis.css,
        ...analysis.js,
        ...analysis.fonts,
        ...analysis.images,
        ...analysis.models,
        ...analysis.other
    ];

    const hashes = new Set();
    const duplicates = [];

    allAssets.forEach(file => {
        const hashMatch = file.match(/-([a-f0-9]{8})/);
        if (hashMatch) {
            const hash = hashMatch[1];
            if (hashes.has(hash)) {
                duplicates.push(file);
            } else {
                hashes.add(hash);
            }
        }
    });

    if (duplicates.length > 0) {
        log(`Duplicate hashes found: ${duplicates.length}`, 'error');
        duplicates.forEach(file => {
            log(`  - ${file}`, 'error');
        });
        return false;
    }

    log(`✅ All hashes are unique (${hashes.size} unique hashes)`, 'success');
    return true;
}

function checkFileSizes(analysis) {
    log('Checking file sizes...', 'test');

    const allAssets = [
        ...analysis.css,
        ...analysis.js,
        ...analysis.fonts,
        ...analysis.images,
        ...analysis.models,
        ...analysis.other
    ];

    let totalSize = 0;
    const largeFiles = [];

    allAssets.forEach(file => {
        const filePath = path.join(ASSETS_DIR, file);
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        totalSize += stats.size;

        if (stats.size > 1024 * 1024) { // Files larger than 1MB
            largeFiles.push({ file, size: sizeKB });
        }
    });

    const totalSizeMB = Math.round(totalSize / (1024 * 1024) * 100) / 100;
    log(`Total assets size: ${totalSizeMB}MB`, 'info');

    if (largeFiles.length > 0) {
        log('Large files detected:', 'warning');
        largeFiles.forEach(({ file, size }) => {
            log(`  - ${file}: ${size}KB`, 'warning');
        });
    }

    return { totalSize, largeFiles };
}

function generateReport(analysis, hashing, uniqueness, sizes) {
    log('Generating content hashing report...', 'test');

    const report = {
        timestamp: new Date().toISOString(),
        build: {
            totalAssets: analysis.total,
            assetTypes: {
                css: analysis.css.length,
                js: analysis.js.length,
                fonts: analysis.fonts.length,
                images: analysis.images.length,
                models: analysis.models.length,
                other: analysis.other.length
            }
        },
        hashing: {
            hashedFiles: hashing.hashed,
            totalFiles: hashing.total,
            percentage: Math.round((hashing.hashed / hashing.total) * 100),
            unhashedFiles: hashing.unhashed
        },
        uniqueness: {
            uniqueHashes: hashing.hashed,
            duplicates: hashing.unhashed.length
        },
        performance: {
            totalSizeMB: Math.round(sizes.totalSize / (1024 * 1024) * 100) / 100,
            largeFiles: sizes.largeFiles.length
        }
    };

    // Save report
    const reportPath = path.join(BUILD_DIR, 'content-hashing-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log(`Report saved to: ${reportPath}`, 'success');

    return report;
}

function printSummary(report) {
    console.log('\n' + '='.repeat(60));
    log('CONTENT HASHING TEST SUMMARY', 'test');
    console.log('='.repeat(60));

    log(`Total Assets: ${report.build.totalAssets}`, 'info');
    log(`Hashed Assets: ${report.hashing.hashed}/${report.hashing.total} (${report.hashing.percentage}%)`,
        report.hashing.percentage === 100 ? 'success' : 'warning');
    log(`Unique Hashes: ${report.uniqueness.uniqueHashes}`, 'success');
    log(`Total Size: ${report.performance.totalSizeMB}MB`, 'info');

    if (report.hashing.unhashedFiles.length > 0) {
        console.log('\n⚠️  UNHASHED FILES:');
        report.hashing.unhashedFiles.forEach(file => {
            log(`  - ${file}`, 'warning');
        });
    }

    if (report.performance.largeFiles > 0) {
        console.log('\n⚠️  LARGE FILES DETECTED:');
        report.performance.largeFiles.forEach(({ file, size }) => {
            log(`  - ${file}: ${size}KB`, 'warning');
        });
    }

    console.log('\n' + '='.repeat(60));

    if (report.hashing.percentage === 100 && report.uniqueness.duplicates === 0) {
        log('🎉 ALL TESTS PASSED! Your cache busting is working perfectly.', 'success');
    } else {
        log('⚠️  Some issues detected. Review the report above.', 'warning');
    }

    console.log('='.repeat(60) + '\n');
}

async function main() {
    log('🧪 Starting Content Hashing Test...', 'test');
    console.log('');

    try {
        // Step 1: Check build exists
        if (!checkBuildExists()) {
            process.exit(1);
        }

        // Step 2: Check assets directory
        if (!checkAssetsDirectory()) {
            process.exit(1);
        }

        // Step 3: Analyze asset files
        const analysis = analyzeAssetFiles();

        // Step 4: Check content hashing
        const hashing = checkContentHashing(analysis);

        // Step 5: Check hash uniqueness
        const uniqueness = checkHashUniqueness(analysis);

        // Step 6: Check file sizes
        const sizes = checkFileSizes(analysis);

        // Step 7: Generate report
        const report = generateReport(analysis, hashing, uniqueness, sizes);

        // Step 8: Print summary
        printSummary(report);

        // Exit with appropriate code
        if (hashing.hashed === hashing.total && uniqueness) {
            process.exit(0);
        } else {
            process.exit(1);
        }

    } catch (error) {
        log(`Test failed: ${error.message}`, 'error');
        process.exit(1);
    }
}

main();