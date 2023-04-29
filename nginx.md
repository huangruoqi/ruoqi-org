Enter root and download acme
```
sudo bash
curl https://get.acme.sh | sh
.acme.sh/acme.sh --register-account --accountemail "youremail@example.com"
touch /etc/nginx/conf.d/<your-domain>.conf
.acme.sh/acme.sh --issue --nginx -d <your-domain> -d www.<your-domain>
```
configure nginx `/etc/nginx/sites-available/default`
```
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/html;

    # Add index.php to the list if you are using PHP
    index index.html index.htm index.nginx-debian.html;

    server_name <your-domain> www.<your-domain>;
    return 301 https://$server_name$request_uri;
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name <your-domain> www.<your-domain>;

    ssl_certificate /root/.acme.sh/ruoqi.org_ecc/fullchain.cer;
    ssl_certificate_key /root/.acme.sh/ruoqi.org_ecc/ruoqi.org.key;

    # SSL configuration options
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # other server block directives
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Test and restart nginx
```
sudo nginx -t
sudo service nginx restart
```

