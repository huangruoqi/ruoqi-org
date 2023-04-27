setup:
	cd frontend ; npm install
	poetry install

run:
	cd frontend ; npm run build
	poetry run python manage.py runserver 8080

dev:
	cd frontend ; npm start

migrate:
	poetry run python manage.py makemigrations
	poetry run python manage.py migrate

admin:
	poetry run python manage.py createsuperuser
