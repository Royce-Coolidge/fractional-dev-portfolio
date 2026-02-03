# Cache Busting Guide for Cloudflare Workers

This guide ensures your web app never suffers from cached CSS issues when deploying to Cloudflare Workers.

## 🚀 Quick Start

### Deploy with Cache Busting
```bash
npm run deploy
```

This runs the enhanced deployment script that:
- ✅ Builds with fresh content hashes
- ✅ Verifies asset hashing
- ✅ Deploys to Cloudflare Pages
- ✅ Tests cache headers

### Test Cache Headers
```bash
npm run test:cache-headers
```

### Test Content Hashing
```bash
npm run test:content-hashing
```

## 🔧 What's Been Configured

### 1. Vite Configuration (`vite.config.js`)
- **Content hashing**: All assets get 8-character hashes
- **CSS code splitting**: CSS is extracted and hashed separately
- **Asset organization**: Different patterns for different asset types

### 2. Cache Headers (`public/_headers`)
- **Hashed assets**: 1-year cache with `immutable` flag
- **Static assets**: 1-hour cache (can change)
- **HTML files**: No cache (always fresh)
- **Security headers**: Added `X-Content-Type-Options`

### 3. Deployment Script (`scripts/deploy-with-cache-busting.cjs`)
- **Build verification**: Checks asset hashing before deploy
- **Integrity checks**: Ensures all required files exist
- **Post-deploy testing**: Verifies cache headers work
- **Cleanup**: Removes old builds

## 📋 How It Works

### Content Hashing
1. **Vite generates hashes** based on file content
2. **Filenames include hashes**: `style-ABC12345.css`
3. **When content changes**: Hash changes, filename changes
4. **Browser sees new filename**: Downloads fresh file

### Cache Headers
1. **Hashed assets**: `Cache-Control: public, max-age=31536000, immutable`
2. **Static assets**: `Cache-Control: public, max-age=3600`
3. **HTML files**: `Cache-Control: no-cache, no-store, must-revalidate`

### Deployment Process
1. **Clean build directory**
2. **Build with Vite** (generates hashed assets)
3. **Verify asset hashing** (all files have hashes)
4. **Deploy to Cloudflare** (with proper headers)
5. **Test cache headers** (verify they work)

## 🛠️ Troubleshooting

### CSS Not Updating?
1. **Check if assets are hashed**: Run `npm run test:content-hashing`
2. **Verify cache headers**: Run `npm run test:cache-headers`
3. **Hard refresh**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
4. **Check browser dev tools**: Network tab should show new filenames

### Assets Not Loading?
1. **Check build output**: Look in `build/client/assets/`
2. **Verify file names**: Should have 8-character hashes
3. **Check console errors**: Look for 404s or CORS issues

### Cache Headers Wrong?
1. **Check `_headers` file**: Ensure it's in `public/` directory
2. **Verify deployment**: Headers should be copied to build output
3. **Test with curl**: `curl -I https://your-site.com/assets/style-ABC12345.css`

## 📊 Monitoring

### Content Hashing Report
After each build, check `build/client/content-hashing-report.json`:
```json
{
  "hashing": {
    "hashedFiles": 45,
    "totalFiles": 45,
    "percentage": 100
  }
}
```

### Cache Header Test
The test script checks:
- ✅ Static assets have 1-hour cache
- ✅ Hashed assets have 1-year cache with `immutable`
- ✅ HTML files have no cache

## 🔄 Workflow

### Development
```bash
npm run dev
```

### Testing
```bash
npm run test:content-hashing
npm run test:cache-headers
```

### Deployment
```bash
npm run deploy
```

### Legacy Deployment (if needed)
```bash
npm run deploy:legacy
```

## 🎯 Best Practices

1. **Always use `npm run deploy`** instead of manual deployment
2. **Test after each deployment** to ensure cache busting works
3. **Monitor build output** for any unhashed files
4. **Keep `_headers` file updated** when adding new asset types
5. **Use hard refresh** during development to test cache busting

## 🚨 Emergency Cache Clear

If you need to clear all caches immediately:

1. **Redeploy**: `npm run deploy`
2. **Cloudflare Purge**: Use Cloudflare dashboard to purge all cache
3. **Verify**: Check that new assets load with different hashes

## 📝 Notes

- **Hashed assets are immutable**: They never change, so they can be cached forever
- **HTML is never cached**: Always fresh, so it can reference new asset hashes
- **Static assets have short cache**: Can be updated without deployment
- **Content hashing is automatic**: Vite handles this based on file content

This setup ensures your users always get the latest CSS and assets without any cache issues!

