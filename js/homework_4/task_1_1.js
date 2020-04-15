'use strict'

function Product(name, price) {
    this.name = name;
    this.price = price;
}

Product.prototype.make25PercentDiscount = function() {
    this.price = this.price - this.price * 0.25;
};

const user1 = new Product('Егор', 100);
user1.make25PercentDiscount();

class Product2 {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    make25PercentDiscount() {
        this.price = this.price - this.price * 0.25;
    }
}

const user2 = new Product2('Егор', 100);
user2.make25PercentDiscount();