# NMCNPM

## Require

* MongoDB Cloud account: https://www.mongodb.com/products/platform/cloud

## How to run application

* Install node_modules
```
npm install
```

* Create .env file, then add these following variables
```
PORT
dbURI
JWT_SECRET_TOKEN

For example:
PORT=3000
dbURI='mongodb+srv://admin:123456783@cluster0.niavsta.mongodb.net/?retryWrites=true&w=majority'
JWT_SECRET_TOKEN='secret'
```

* Run app
```
nodemon app
```

## Database Design

![Class Diagram](./db_desgin.png)
