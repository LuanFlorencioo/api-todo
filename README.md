# API Todo

The **Todo App API** is a web application developed with Node.js, Typescript, Express and TypeORM, which offers functionalities to manage tasks. The application has authenticated routes, which guarantee the security of user data.

**BaseURL**: `https://api-todo-luanflorencioo.onrender.com`

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About](#about)
- [Users](#users)
  - [Create user](#create-user)
  - [Login](#login)
- [Tasks](#tasks)
	- [Create task](#create-task)
	- [List tasks](#list-tasks)
	- [Handle check task](#handle-check-task)
	- [Delete task](#delete-task)
- [Author](#author)

## About

Through this API, users can **create**, **update**, **list** and **delete** their tasks, as well as mark tasks as completed. The API uses TypeORM to manage the database, which can be configured with different databases supported by TypeORM.

Application routes are protected by **authentication**, using JWT tokens (JSON Web Token) to ensure that only authenticated users can access them. Authentication is done through a login system, where the user must provide their credentials (nickname and password) to obtain a valid JWT token.

## Users

The main route for those using the application for the first time is to create a user. Creating a user, passing valid data and using a nickname not used by others, you will be able to use the other functionalities of the application involving the tasks.

### Create user

![Route](https://img.shields.io/badge/POST-%2Fusers-blueviolet)

The POST /users route is unique for creating a new user. It is not necessary to send an authorization in the request header. The following properties must be passed in the body of the request:

- **username** (`string`): Must choose a username;
	- `minLength - 3`
	- `maxLength - 40`
- **nickname** (`string`): Must choose a unique nickname for the user to login;
	- `minLength - 3`
	- `maxLength - 40`
- **password** (`string`): Must choose a password for the user to login.
	- `minLenght - 4`
	- `maxLength - 20`

With success, an object will be returned containing a property informing its creation date, the user's unique id and the data passed in the creation, except the password, for security reasons.

----

#### Expected return: 

##### ✅ Success - Create with valid data
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-201%20%7C%20CREATED-brightgreen)

Body:
```json
{
	"username": "John",
	"nickname": "JohnDoe",
	"password": "123456Abc"
}
```

Response:
```json
{
	"id": 3,
	"username": "John",
	"nickname": "JohnDoe",
	"createdAt": "2023-03-13T15:30:00",
}
```

----

##### ❌ Error - Nickname already used
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-409%20%7C%20CONFLICT-orange)

Body:
```json
{
	"username": "John",
	"nickname": "JohnDoe",
	"password": "123456Abc"
}
```

Response:
```json
{
	"message": "Already exists nickname"
}
```

----

##### ❌ Error - Entering invalid and wrong data
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-400%20%7C%20BAD%20REQUEST-yellow)

Body:
```json
{
	"username": true,
	"nickname": ["anything"],
	"password": "3"
}
```

Response:
```json
{
	"message": {
		"username": [
			"Expected string, received boolean"
		],
		"nickname": [
			"Expected string, received array"
		],
		"password": [
			"String must contain at least 4 character(s)"
		]
	}
}
```

### Login

![Route](https://img.shields.io/badge/POST-%2Flogin-blueviolet)

Route to perform login, where, with success, it returns a valid token that will have authentication for the functionalities of the user's tasks.
To log in, you must send in the body of the request two properties that were used in the creation of the user, these properties are the `nickname` and the `password`.

If the user sends data that does not exist in the database, an error message will be returned stating that the credentials are invalid.

----

#### Expected return: 

##### ✅ Success - Login with valid data
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-200%20%7C%20OK-brightgreen)

Body:
```json
{
	"nickname": "JohnDoe",
	"password": "123456Abc"
}
```

Response:
```json
{
	"token": "eyJhbGciOiJ..."
}
```

----

##### ❌ Error - Invalid email or password
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-401%20%7C%20UNAUTHORIZED-red)

Body:
```json
{
	"nickname": "nobody",
	"password": "987654321"
}
```

Response:
```json
{
	"message": "Invalid credentials"
}
```

##### ❌ Error - No keys required.
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-400%20%7C%20BAD_REQUEST-yellow)

Body:
```json
{
	"id": 3,
	"user": "John"
}
```

Response:
```json
{
	"message": {
		"nickname": [
			"Required"
		],
		"password": [
			"Required"
		]
	}
}
```

## Tasks

All routes referring to tasks are authenticated, that is, they only work if they send a Bearer Token from the logged in user.

### Create task

![Route](https://img.shields.io/badge/POST-%2Ftasks-blueviolet)

POST routes are used to send information and data to a server. In this case, the POST route "/tasks" will be used to create tasks for the logged in user, provided he has authorization to access them. To access this route, it is necessary to send an authorization token in the request header.

```sql
POST /tasks
Authorization: Bearer <token>
```

In the body of the request, the following properties must be sent:

- **title** (`string`): Task title or name;
	- `maxLength: 40`
- **checked** (`boolean`): Whether the task completed or not.
	- `opcional`
	- `default: false`

With success, an object will be returned with the information of the task created, containing the properties "id", "title" and the "checked" of the task, in addition to the properties "createdAt", referring to the task creation date, and "updatedAt " which refers to the task update date.

----

#### Expected return: 

##### ✅ Success - Create with valid data
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-201%20%7C%20CREATED-brightgreen)

Body:
```json
{
	"title": "Read 1 hour a day",
	"checked": false
}
```

Response:
```json
{
	"id": 3,
	"title": "Read 1 hour a day",
	"checked": false,
	"createdAt": "2023-03-17T21:02:20.170Z",
	"updatedAt": "2023-03-17T21:02:20.170Z"
}
```

----

##### ❌ Error - Request without sending an authorization
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-401%20%7C%20ANAUTHORIZED-red)

Response:
```json
{
	"message": "Missing bearer token"
}
```

----

##### ❌ Error - Request without sending token
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-401%20%7C%20ANAUTHORIZED-red)

Response:
```json
{
	"message": "jwt malformed"
}
```

----

##### ❌ Error - Request with invalid token
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-401%20%7C%20ANAUTHORIZED-red)

Response:
```json
{
	"message": "invalid signature"
}
```

### List tasks

![Route](https://img.shields.io/badge/GET-%2Ftasks-blueviolet)

GET routes are used to fetch information from a server. In this case, the "/tasks" GET route will be used to list all the tasks that were created by the user, as long as he has authorization to access them. To access this route, it is necessary to send an authorization token in the request header.

```sql
GET /tasks
Authorization: Bearer <token>
```

As it is a GET route, a JSON body should not be sent in the request. On success, it should return to the user an array containing all the tasks that were created by the user. If the user has not created any tasks or deleted all tasks, an empty array will be returned. Tasks will come in object format containing the following properties:

- **id** (`number`): A unique task identifier;
- **title** (`string`): Task title or name;
- **checked** (`boolean`): Whether the task completed or not;
- **createdAt** (`string`): The task creation date and time;
- **updatedAt** (`string`): The date and time the task was last updated.

----

#### Expected return: 

##### ✅ Success - Returning all tasks
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-200%20%7C%20OK-brightgreen)

Response:
```json
[
	{
		"id": 3,
		"title": "Read 1 hour a day",
		"checked": false,
		"createdAt": "2023-03-17T21:02:20.170Z",
		"updatedAt": "2023-03-17T21:02:20.170Z"
	},
	{
		"id": 4,
		"title": "Create todo API",
		"checked": true,
		"createdAt": "2023-03-15T15:00:20.170Z",
		"updatedAt": "2023-03-16T06:25:20.170Z"
	},
	...
]
```

----

##### ❌ Error - Request without sending an authorization
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-401%20%7C%20ANAUTHORIZED-red)

Response:
```json
{
	"message": "Missing bearer token"
}
```

----

##### ❌ Error - Request without sending token
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-401%20%7C%20ANAUTHORIZED-red)

Response:
```json
{
	"message": "jwt malformed"
}
```

----

##### ❌ Error - Request with invalid token
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-401%20%7C%20ANAUTHORIZED-red)

Response:
```json
{
	"message": "invalid signature"
}
```

### Handle check task

![Route](https://img.shields.io/badge/PATCH-%2Ftasks%2F%3Cid%3E-blueviolet)

PATCH routes are used to update information from a server. In this case, the PATCH "/tasks/\<id>" route will be used to update a task, specifically the "checked" property, of course, provided that the logged in user has authorization to update it. To access this route, you need to send an authorization token in the request header.

```sql
GET /tasks
Authorization: Bearer <token>
```

In the request route, the id must be inserted after the "/tasks" endpoint of the task you want to update. It is not necessary to send a body in the request, as the process of updating the task will be automatic just by sending the id in the route.

With success, an object will be returned referring to the task's information with the "checked" property updated.

----

#### Expected return: 

##### ✅ Success - Updating a valid task
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-200%20%7C%20OK-brightgreen)

Endpoint: `/tasks/3`

Response:
```json
{
	"id": 3,
	"title": "Read 1 hour a day",
	"checked": true, // With checked changed
	"createdAt": "2023-03-17T21:02:20.170Z",
	"updatedAt": "2023-03-19T13:01:20.170Z"
}
```

----

##### ❌ Error - Sending a task id from another user
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-403%20%7C%20FORBIDDEN-red)

Response:
```json
{
	"message": "User does not have permission for this non-owned task"
}
```

----

##### ❌ Error - Sending an id that doesn't exist
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-404%20%7C%20NOT_FOUND-yellow)

Response:
```json
{
	"message": "Task not found"
}
```

### Delete task

![Route](https://img.shields.io/badge/DELETE-%2Ftasks%2F%3Cid%3E-blueviolet)

DELETE routes are used to delete or delete information or data from a server. In this case, the DELETE route "/tasks/\<id>" will be used to delete a task, as long as the logged in user has authorization to update it. To access this route, you need to send an authorization token in the request header.

```sql
GET /tasks
Authorization: Bearer <token>
```

In the request route, the id must be inserted after the "/tasks" endpoint of the task you want to delete. It is not necessary to send a body in the request, as the task deletion process will be automatic just by sending the id in the route.

With success, nothing will be returned, only status 204 - no content

----

#### Expected return: 

##### ✅ Success - Deleting with a valid id
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-204%20%7C%20NO_CONTENT-brightgreen)

Endpoint: `/tasks/3`

Response:
```json
// Empty. Means the task has been deleted
```

----

##### ❌ Error - Sending a task id from another user
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-403%20%7C%20FORBIDDEN-red)

Response:
```json
{
	"message": "User does not have permission for this non-owned task"
}
```

----

##### ❌ Error - Sending an id that doesn't exist
![StatusCode](https://img.shields.io/badge/Status%20code%3A%20-404%20%7C%20NOT_FOUND-yellow)

Response:
```json
{
	"message": "Task not found"
}
```

## Author

[![Linkedin](https://img.shields.io/badge/linkedin-27f?style=for-the-badge&logo=linkedin&logoColor=)](https://linkedin.com/in/luanflorencioo)
[![Linkedin](https://img.shields.io/badge/github-ddd?style=for-the-badge&logo=github&logoColor=000)](https://github.com/LuanFlorencioo/)

![Luan Avatar](https://avatars.githubusercontent.com/u/71609088?s=120&v=4)

**______Luan Florencio**