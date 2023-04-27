# VM setup
```
sudo apt update
sudo apt install git python3-pip nodejs npm nginx -y
sudo vim /etc/nginx/sites-available/default
```
```
server {
    listen 80;
    server_name <your ipv4>;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
```
sudo nginx -t
sudo service nginx restart


git clone https://github.com/huangruoqi/sentiment_analysis-application.git
cd sentiment_analysis-application
python3 -m pip install poetry
make setup

make run &> /dev/null &
disown
```
To kill process
```
sudo lsof -i TCP:8080
kill -9 <pid>
```
