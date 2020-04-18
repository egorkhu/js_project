'use strict'

let cart = {

    counter: 0,
    addedProducts: [],
    sum: 0,

    init() {
        let buttons = this.getAddToCartButtons();

        for (let button of buttons) {
            button.addEventListener('click', this.addToCart);
        }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            let cart = document.querySelector('.b-cart');

            cart.addEventListener('click', function() {
                document.querySelector('.b-cart__popup').classList.toggle('show');
            });
        } else {
            let button = document.querySelectorAll('.add-to-cart-button__mobile').forEach(element => {
                element.style.display = 'none';
            });

            let head = document.querySelector('head');
            let style = document.createElement('style');
            style.innerHTML = `.b-cart:hover .b-cart__popup {display: block;}
                               .product-wrap:hover .add-to-cart { opacity: 1; visibility: visible; transform: translate(0,0)}
                               .product-wrap:hover .shadow {opacity: 1}
                                `;
            head.appendChild(style);
        }
    },

    totalSum() {
        let sum = document.querySelector('.total-sum b');
        this.sum = 0;

        for (let element of this.addedProducts) {
            this.sum += parseInt(element.price.match(/\d+/)) * element.quantity;
        }
        sum.innerText = `${this.sum}`;
    },

    deleteProduct(element) {
        let popup = document.querySelector('.b-cart__popup');
        let product = document.querySelector(`#product-${element.id}`);
        let count = cart.getCounter();
        cart.counter -= element.quantity;
        if (cart.counter === 0) {
            count.style.display = 'none';
        } else {
            count.innerHTML = cart.counter;
        }
        cart.addedProducts.splice(cart.addedProducts.indexOf(element), 1);
        popup.removeChild(product);
        cart.totalSum();
    },

    getAddToCartButtons() {
        return document.querySelectorAll('.add-to-cart-button, .add-to-cart-button__mobile');
    },

    getCounter() {
        return document.querySelector('.b-cart__counter');
    },

    getParent(element) {
        while (!element.classList.contains('product-wrap')) {
            element = element.parentNode;
        }
        return element;
    },

    createProductObj(parent) {
        let product = {};
        class Product {
            constructor(parent) {
                this.id = parent.getAttribute('id').slice(-1);
                this.img = parent.querySelector('img').outerHTML;
                this.name = parent.querySelector('.product-list > h3').outerHTML;
                this.price = parent.querySelector('.product-list > .price').outerHTML;
                this.quantity = 1;
            }
        }
        return product = new Product(parent);
    },

    markupInsertProduct(element) {
        let cartHeader = document.querySelector('.cart-header');

        cartHeader.insertAdjacentHTML('afterend', `
            <div class="product-cart" id="product-${element.id}">
                     ${element.img}
                     ${element.name}
                     ${element.price}
                <div>${element.quantity}</div>
                <i class="far fa-trash-alt"></i>
            </div>
        `);

        let deleteButton = document.querySelector(`#product-${element.id} .fa-trash-alt`);
        deleteButton.addEventListener('click', () => {
            this.deleteProduct(element);
        });
    },

    markupRemoveProduct(element) {
        let cartProduct = document.querySelector(`#product-${element.id}`);
        cartProduct.remove();
    },

    addToCart() {
        cart.counter += 1;
        let count = cart.getCounter();
        count.style.display = 'flex';
        count.innerHTML = cart.counter;
        let element = event.target;
        let parent = cart.getParent(element);
        let product = cart.createProductObj(parent);
        if (cart.addedProducts.length < 1) {
            cart.addedProducts.push(product);
        } else {
            for (let element of cart.addedProducts) {
                if (element.id === product.id) {
                    element.quantity += 1;
                    cart.markupRemoveProduct(element);
                    cart.markupInsertProduct(element);
                    cart.totalSum();
                    return;
                }
            }
            cart.addedProducts.push(product);
        }
        cart.markupInsertProduct(product);
        cart.totalSum();
    }
};

cart.init();