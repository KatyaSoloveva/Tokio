# Tokio
* **Проект находится в разработке и будет дополняться!** 
* **Описание**: Full-stack риложение для написания заметок. Пользовавтель может создавать и форматировать заметки, ставить статус и категорию заметки. 
* **Стек технологий**  
  Django REST Framework, Django, React (Vite), HTML, CSS.
* **Установка**  
Клонировать репозиторий:

```
git clone git@github.com:KatyaSoloveva/Tokio.git
```  

Создать и активировать виртуальное окружение:
```
python -m venv venv
```

Для Windows
```
source venv/Scripts/activate
```

Для Linux
```
source venv/bin/activate
```
Перейти:
```
cd backend
```
Установить зависимости
```
pip install -r requirements.txt
```
```
python -m pip install --upgrade pip
```
Перейти в директорию tokio, выполнить миграции, загрузить категории заметок и запустить проект:
```
python manage.py makemigrations
python manage.py migrate
```
```
python manage.py load_categories
```
```
python manage.py runserver
```
Перейти в директорию frontend, установить зависимости и запустить проект:
```
npm i
npm run dev
```

* **Created by Ekaterina Soloveva**  
https://github.com/KatyaSoloveva