run:
	poetry run python -B manage.py runserver

migrate:
	poetry run python -B manage.py makemigrations
	poetry run python -B manage.py migrate