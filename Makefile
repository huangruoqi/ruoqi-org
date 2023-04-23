setup:
	cd frontend & npm install
	poetry install

run:
	poetry run python manage.py runserver

build:
	cd frontend & npm run build

dev:
	cd frontend & npm start

migrate:
	poetry run python manage.py makemigrations
	poetry run python manage.py migrate

admin:
	poetry run python manage.py createsuperuser