import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import rehypeSlug from 'rehype-slug';
import rehypePrism from '@mapbox/rehype-prism';

export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],
  build: {
    assetsInlineLimit: 1024,
    // Ensure content hashing is enabled for all assets
    rollupOptions: {
      output: {
        // Use content hashes for all chunk files
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Different naming patterns for different asset types
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/[name]-[hash].css';
          }
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return 'assets/[name]-[hash][extname]';
          }
          if (assetInfo.name && /\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/[name]-[hash][extname]';
          }
          if (assetInfo.name && /\.(glb|hdr|glsl)$/.test(assetInfo.name)) {
            return 'assets/[name]-[hash][extname]';
          }
          // Default for other assets
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  server: {
    port: 7777,
  },
  plugins: [
    mdx({
      rehypePlugins: [[rehypeImgSize, { dir: 'public' }], rehypeSlug, rehypePrism],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: '@mdx-js/react',
    }),
    remixCloudflareDevProxy(),
    remix({
      routes(defineRoutes) {
        return defineRoutes(route => {
          route('/', 'routes/home/route.js', { index: true });
        });
      },
    }),
    jsconfigPaths(),
  ],
});
