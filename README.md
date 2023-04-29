# VM setup
```
sudo apt update
sudo apt install git python3-pip nodejs npm nginx -y
sudo vim /etc/nginx/sites-available/default
```

See `nginx.md` to setup nginx
```
git clone https://github.com/huangruoqi/ruoqi-org.git
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
