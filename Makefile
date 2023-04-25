setup:
	cd frontend ; npm install
	poetry install

run:
	cd frontend ; npm run build
	poetry run python -B manage.py runserver 

migrate:
	poetry run python -B manage.py makemigrations
	poetry run python -B manage.py migrate

addadmin:
	poetry run python -B manage.py createsuperuser