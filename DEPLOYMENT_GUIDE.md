# Content Hashing & Cache Strategy for Cloudflare Pages

## 🎯 Overview

This guide ensures your Cloudflare Pages deployment uses content hashing to prevent browser caching issues. Your build system is already configured correctly, but this guide provides testing and deployment strategies.

## ✅ Current Configuration Status

Your project is **already configured correctly** with:

1. **Content Hashing**: ✅ Active (Vite generates hashed filenames)
2. **Cache Headers**: ✅ Optimized (1-year cache for hashed assets)
3. **Build Tool**: ✅ Vite with Remix handles this automatically

## 🧪 Testing Content Hashing

### Automated Test
Run the content hashing test script:

```bash
node scripts/test-content-hashing.cjs
```

This script will:
- Make test changes to your code
- Build the project multiple times
- Verify that asset filenames change when content changes
- Restore original files

### Manual Test
1. Make a small change to any component
2. Run `npm run build`
3. Check `build/client/assets/` for new hashed filenames
4. Make another change and build again
5. Verify filenames changed

## 🚀 Deployment Strategy

### 1. Pre-Deployment Checklist

```bash
# Test content hashing
node scripts/test-content-hashing.cjs

# Build locally
npm run build

# Verify assets have hashes
ls build/client/assets/ | grep -E '\.(js|css)$'

# Check cache headers
cat build/client/_headers
```

### 2. Deploy to Cloudflare Pages

```bash
# Deploy to production
npm run deploy

# Or deploy to preview
wrangler pages deploy ./build/client --project-name fractional-dev-portfolio --compatibility-date=2024-01-01
```

### 3. Post-Deployment Verification

#### Check Cache Headers
```bash
# Test cache headers for hashed assets
curl -I https://fractional-dev-portfolio.pages.dev/assets/entry.client-[HASH].js
curl -I https://fractional-dev-portfolio.pages.dev/assets/index-[HASH].css
```

Expected headers:
```
Cache-Control: public, max-age=31536000, immutable
```

#### Browser Testing
1. Open your site in browser
2. Open Developer Tools → Network tab
3. Reload page
4. Check that assets load with status 200 (not 304)
5. Verify assets have hashed filenames

#### Test Cache Invalidation
1. Make a code change
2. Deploy new version
3. Reload page in browser
4. Verify new assets load (different hashes)

## 🔧 Configuration Details

### Vite Configuration (`vite.config.js`)
```javascript
build: {
  rollupOptions: {
    output: {
      chunkFileNames: 'assets/[name]-[hash].js',
      entryFileNames: 'assets/[name]-[hash].js',
      assetFileNames: (assetInfo) => {
        // Custom naming for different asset types
        return 'assets/[name]-[hash][extname]';
      },
    },
  },
}
```

### Cache Headers (`build/client/_headers`)
```
# Hashed assets - 1 year cache with immutable flag
/assets/*.css
  Cache-Control: public, max-age=31536000, immutable
/assets/*.js
  Cache-Control: public, max-age=31536000, immutable

# Non-hashed assets - shorter cache
/*.css
  Cache-Control: public, max-age=86400
/*.js
  Cache-Control: public, max-age=86400
```

## 🐛 Troubleshooting

### Issue: Assets not getting hashed
**Symptoms**: Asset filenames don't change between builds

**Solutions**:
1. Check Vite configuration in `vite.config.js`
2. Ensure `rollupOptions.output` is configured correctly
3. Verify you're making actual content changes (not just comments)

### Issue: Browser still caching old assets
**Symptoms**: Browser shows old version despite deployment

**Solutions**:
1. Verify cache headers are correct in `_headers` file
2. Check that assets are in `/assets/` directory (hashed assets)
3. Clear browser cache or test in incognito mode
4. Verify Cloudflare Pages is serving correct headers

### Issue: Mixed content warnings
**Symptoms**: Some assets load with hashes, others don't

**Solutions**:
1. Check that all assets are processed through Vite
2. Ensure static assets are in `public/` directory
3. Verify import paths use proper asset references

## 📊 Monitoring

### Key Metrics to Watch
1. **Cache Hit Rate**: Should be high for hashed assets
2. **Load Times**: Should improve with proper caching
3. **Error Rates**: Should decrease with consistent asset loading

### Tools for Monitoring
- Cloudflare Analytics
- Browser Developer Tools
- WebPageTest.org
- Google PageSpeed Insights

## 🎯 Best Practices

1. **Always test locally** before deploying
2. **Use the test script** to verify content hashing
3. **Monitor cache headers** in production
4. **Keep build process consistent** across environments
5. **Document any custom asset handling**

## 📞 Support

If you encounter issues:
1. Run the test script: `node scripts/test-content-hashing.cjs`
2. Check build output in `build/client/assets/`
3. Verify cache headers in `build/client/_headers`
4. Test in browser dev tools
5. Check Cloudflare Pages dashboard for deployment status

---

**Remember**: Your setup is already working correctly! This guide helps you verify and maintain optimal caching behavior.

