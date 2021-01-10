# IRONRESTO

## Table of contents

## About Project

A website prototype for restaurants to allow for online ordering (click & collect).  

Customer side:  can create an account, connect to his account, consult the available products, place the order, consult the status of the order in real time.  

Restaurant side: is the administrator of the site. He/she can view the daily orders and statistics of orders received, change the details and status of an order, view the status in real time, add and modify products.

## Project Status

This project is currently in development. Users can filter tweets by username and keyword and see visual data representation. Functionality to sort by additional parameters is in progress.

## Project Screen Shot(s)

### User side

#### User profile
[ScreenShoots 1]

### Restaurant side
#### Restaurant profile
[ScreenShoots 2]

#### Restaurant order status
[ScreenShoots 3]

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

### Build

### Deployment


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

