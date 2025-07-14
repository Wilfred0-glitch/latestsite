
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildStatic() {
  try {
    console.log('Building static website...');
    
    // Build the client
    await build({
      root: resolve(__dirname, 'client'),
      build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
      },
    });

    // Copy any additional static assets if needed
    const publicDir = resolve(__dirname, 'client/public');
    const distDir = resolve(__dirname, 'dist');
    
    if (fs.existsSync(publicDir)) {
      console.log('Copying static assets...');
      // Copy public directory contents to dist
      fs.cpSync(publicDir, distDir, { recursive: true });
    }

    console.log('✅ Static build complete! Files are in the /dist directory');
    console.log('📁 Upload the contents of the /dist directory to your static hosting provider');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildStatic();
