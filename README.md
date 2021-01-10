# IRONRESTO

## About Project

A website prototype for restaurants to allow for online ordering (click & collect).  

Customer side:  can create an account, connect to his account, consult the available products, place the order, consult the status of the order in real time.  

Restaurant side: is the administrator of the site. He/she can view the daily orders and statistics of orders received, change the details and status of an order, view the status in real time, add and modify products.

## Prerequisites

**Dependencies:**
  - npm >= 6
  - node >= 12
  - mongodb >= 4

### Installation

- [x] [Node](http://nodejs.org/)
- [x]  [NPM](https://npmjs.org/)
- [x] [MongoDB](https://docs.mongodb.com/manual/installation/) 

To make sure you have them available on your machine,
try running the following command.
```sh
$ npm -v && node -v && mongod --version
6.14.8
v12.20.0
db version v4.2.11
```

##  Setup Instructions

### Setup

Create `.env` file:
```txt
PORT=5000
MONGODB_URI=*****
CORS=*****
CLOUDINARY_NAME=*****
CLOUDINARY_KEY=*****
CLOUDINARY_SECRET=ZG-*****
SENDGRID_API_KEY=SG.*****
SENDER_MAIL=*****@*****
```
Then execute:

 ```sh
 npm install
 ```
### Build

```sh
npm run build
```

## API

### Pages

---
| Page              | URL          | Description        | Access         |
|-------------------|---------------|------------------------|------------------| 
| HOME           | /                 | homepage         | public          |
| SIGNUP        | /signup     | signup page      | public          |
| LOGIN           | /login        | login page         | public          |
| PROFILE   | /profile/restaurant        | restaurant profile page         | registered + restaurant    |
| PROFILE   | /profile/user        | client profile page         | registered + client    |
| PROFILE   | /edit        | edit profile page         | registered   |
| ORDERS   | /user/order        | basket page         | public  |
| ORDERS | /restaurant/orders/        | order list page         | registered + restaurant  |
| ORDERS | /orders/:id        | order details page         | registered + client  |
| PRODUCTS | /products | product list page | registered + restaurant |
| PRODUCTS   | /products/:id        | product details page         | registered  + restaurant |
| PRODUCTS   | /products/edit/:id        | edit product page         | registered  + restaurant |

---


## Project Screenshots

### Home page

![home page](https://user-images.githubusercontent.com/18499939/104131365-2e1f9480-5376-11eb-9034-c8370298435e.png)

![ironresto-mobile-home](https://user-images.githubusercontent.com/18499939/104131361-2a8c0d80-5376-11eb-81a8-c889170e9b8a.png)

### Profile pages

**client**
![Screenshot from 2021-01-10 19-11-14](https://user-images.githubusercontent.com/18499939/104131618-a63a8a00-5377-11eb-9d4f-b422eb82f26b.png)

**restaurant**
![ironresto-cartor-profile](https://user-images.githubusercontent.com/18499939/104131373-38da2980-5376-11eb-98e7-007b97c357ae.png)

### Order details page

**client**
![ironresto-order-details](https://user-images.githubusercontent.com/18499939/104131565-4fcd4b80-5377-11eb-840e-dbb4898e032c.png)

**restaurant**
![restaurant profile page](https://user-images.githubusercontent.com/18499939/104131401-59a27f00-5376-11eb-80bf-360768fd4466.png)

**client**

### Basket page

![ironresto-basket](https://user-images.githubusercontent.com/18499939/104131376-3f68a100-5376-11eb-8522-f21ead4f5db1.png)

![ironresto-mobile-basket](https://user-images.githubusercontent.com/18499939/104131380-4394be80-5376-11eb-8603-d347f52acc18.png)

