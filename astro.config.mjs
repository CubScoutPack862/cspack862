import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { normalizeBase, validateOrigin } from './src/lib/paths.ts';
import remarkPack from './src/lib/remark-pack.ts';

export default defineConfig({
  output: 'static',
  site: validateOrigin(process.env.SITE_URL),
  base: normalizeBase(process.env.BASE_PATH),
  trailingSlash: 'always',
  markdown: { processor: unified({ remarkPlugins: [remarkPack] }) },
  devToolbar: { enabled: false },
  vite: { server: { watch: { ignored: ['**/.cache/**'] } } },
});
