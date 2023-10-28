# NMCNPM

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

For example
PORT=3000
dbURI='mongodb+srv://admin:01042003@cluster0.niavsta.mongodb.net/?retryWrites=true&w=majority'
JWT_SECRET_TOKEN='secret'
```

* Run app
```
nodemon app
```
