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

## Deploy environment
nmcnpm-bid.vercel.app/webid/home

## Database Design

![Class Diagram](./db_design.png)

## Warning
When visit this app through this URL: nmcnpm-bid.vercel.app/webid/home
Images upload to this app should be < 4.5 MB, because Vercel maximum payload size is 4.5 MB
