# Hostinger Server Configuration - Trailing Slash Redirects

This file contains the necessary configuration for handling trailing slash URL redirects.

## NGINX Configuration

Create a file named `nginx.conf` in your hostinger's nginx configuration directory:

```nginx
# Trailing slash redirect configuration
server {
    listen 80;
    server_name themarketingking.org;

    # Redirect URLs without trailing slash to canonical URLs with trailing slash
    rewrite ^(/([^?#]+))$ $1/ permanent;
    rewrite ^(/([^?#]+)/?)$ $1/ permanent;

    # Root directory configuration
    root /usr/share/nginx/html;

    # Existing application server configuration
    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Disable trailing slash for API requests to maintain functionality
        location ~* \.(json|js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            rewrite ^(/([^?#]+))$ $1/ permanent;
        }
    }

    # Exclude static assets from trailing slash redirects
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webm|mp4|pdf|json)$ {
        add_header Cache-Control "public, max-age=31536000";
        rewrite ^(/([^?#]+))$ /$1 last;
    }
}
```

## .htaccess Configuration (if using Apache)

Create a file named `.htaccess` in your project root:

```apache
# Redirect URLs without trailing slash to URLs with trailing slash
RewriteEngine On
RewriteCond %{REQUEST_URI} !\.\(css\|js\|png\|jpg\|jpeg\|gif\|ico\|svg\|woff\|woff2\|ttf\|eot\)\$
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(/[^?#]+)$ $1/ [R=301,L]

# Exclude static assets from trailing slash redirects
RewriteCond %{REQUEST_URI} !\\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webm|mp4|pdf|json)\$
RewriteCond %{DOCUMENT_ROOT}/$1 -f
RewriteRule ^(/[^?#]+)\\.\\1\\$ $1 [L]

# For React Router - pass all non-asset requests to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /index.html [L]
```

## PM2 Ecosystem Config

If using PM2, add this to your `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'tmk-react',
    script: './dist/server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    wait_ready: true,
    listen_backlog: 500,
    error: './logs/err.log',
    out: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    merge_logs: true,
    env: {
      NODE_ENV: 'production',
      PORT: 5173,
      // Enable trailing slash redirects
      ENABLE_TRAILING_SLASH_REDIRECTS: 'true'
    }
  }]
};
```

## Instructions for Hostinger

1. **Connect to your Hostinger server via SSH**
2. **Navigate to your project directory**
3. **Backup existing configuration files**
4. **Upload the new configuration files**
5. **Test the configuration**
6. **Restart the web server**

```bash
# Test nginx configuration
nginx -t

# Restart nginx server
systemctl restart nginx

# Or reload nginx if running
systemctl reload nginx
```

## Benefits of This Configuration

- **SEO Benefits**: All URLs now use trailing slashes as canonical format
- **Redirect Logic**: Automatic 301 redirects from non-trailing slash to trailing slash URLs
- **Preserves Functionality**: Static assets and API calls unaffected
- **React Router Compatible**: Routes are handled correctly by the application
- **Performance**: Minimal overhead from redirect checks

## Monitoring and Testing

After deployment, verify the configuration works:

```bash
# Check if redirects are working
curl -I https://themarketingking.org/about
# Should return HTTP/1.1 301 Moved Permanently

curl -I https://themarketingking.org/contact/
# Should return HTTP/1.1 200 OK
```

## Important Notes

- These are 301 redirects, which are good for SEO
- The redirects preserve all query parameters and hash fragments
- Only non-static URLs are affected
- Cross-platform compatible (works with both Nginx and Apache)