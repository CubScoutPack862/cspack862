export function normalizeBase(value = '/') {
  if (!/^\/[a-zA-Z0-9/_-]*$/.test(value) || value.includes('//')) {
    throw new Error('BASE_PATH must be / or a path such as /repository/');
  }
  return value === '/' ? '/' : `/${value.replace(/^\/+|\/+$/g, '')}/`;
}

export function withBase(path: string, base = '/') {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('..')) {
    throw new Error(`Internal path must start with / and stay inside the site: ${path}`);
  }
  return normalizeBase(base) + path.slice(1);
}

export function validateOrigin(value?: string) {
  if (!value) return undefined;
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL must be an HTTP(S) origin without a path, credentials, query, or fragment');
  }
  return url.origin;
}
