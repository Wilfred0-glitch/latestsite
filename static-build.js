import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildStatic() {
  try {
    console.log('🚀 Building static website...');

    // Build the client
    await build({
      root: resolve(__dirname, 'client'),
      build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
          output: {
            manualChunks: undefined,
          },
        },
      },
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    });

    // Create _redirects file for SPA routing
    const redirectsContent = `/*    /index.html   200`;
    fs.writeFileSync(resolve(__dirname, 'dist/_redirects'), redirectsContent);

    // Create vercel.json for Vercel deployment
    const vercelConfig = {
      "rewrites": [
        { "source": "/(.*)", "destination": "/index.html" }
      ]
    };
    fs.writeFileSync(resolve(__dirname, 'dist/vercel.json'), JSON.stringify(vercelConfig, null, 2));

    console.log('✅ Static build complete! Files are in the /dist directory');
    console.log('📁 Ready for deployment to Vercel, Netlify, or any static hosting');

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildStatic();
