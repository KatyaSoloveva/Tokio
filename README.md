# Tokio
* **Проект находится в разработке и будет дополняться!** 
* **Описание**: Full-stack риложение для написания заметок. Пользовавтель может создавать и форматировать заметки, ставить статус и категорию заметки, а также отправлять другим пользователям заявку в друзья, а друзьям - приглашение им стать коллаборатором заметки.
* **Стек технологий**  
  Django REST Framework, Django, Djoser, React (Vite), HTML, CSS.
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

* **Документация для Api** (пока что готова не полностью, находится в разработке).   

ReDoc: 
```
/api/docs/redoc/
```
Swagger:
```
/api/docs/swagger/
```

* **Примеры запросов**  
   *Регистрация пользователя(POST)*  
    http://localhost/api/users/  
    Request
    ```
    {
      "email": "email@yandex.ru",
      "username": "some_username",
      "password": "some_password"
    }
    ```
    Response
    ```
    {
      "username": "some_username",
      "email": "email@yandex.ru",
      "id": 1,
    }
    ```

    *Просмотр полученных заявок на коллаборацию(GET)*  
    http://localhost/api/collaborations/received/  
    Response
    ```
  {
      "count": 1,
      "next": null,
      "previous": null,
      "results": [
          {
              "id": 1,
              "receiver": "receiver_username",
              "sender": "sender_username",
              "task": {
                  "id": 1,
                  "name": "task_name"
              },
              "status": "accepted",
              "request_date": "2025-05-31 08:34:20"
          }
      ]
  }
    ```

    *Ответ на заявку в друзья(POST)*  
    http://localhost/api/friendship/{id}/respond/  
    Request
    ```
    {
      "action": "accepted"
    }
    ```
    Response
    ```
    {
      "id": 1,
      "receiver": "receiver_username",
      "sender": "sender_username",
      "status": "accepted",
      "request_date": "2025-05-31 09:33:50"
    }
    ```

* **Created by Ekaterina Soloveva**  
https://github.com/KatyaSoloveva