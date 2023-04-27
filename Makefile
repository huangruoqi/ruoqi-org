setup:
	cd sentiment_analysis/frontend ; npm install
	poetry install

build:
	cd sentiment_analysis/frontend ; npm run build

run:
	poetry run python manage.py runserver 8080

dev:
	cd sentiment_analysis/frontend ; npm start

migrate:
	poetry run python manage.py makemigrations
	poetry run python manage.py migrate

admin:
	poetry run python manage.py createsuperuser
