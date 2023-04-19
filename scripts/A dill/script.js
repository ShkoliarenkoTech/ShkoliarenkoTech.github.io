let btn = document.querySelector('.navbar-toggler');
let changed = document.querySelector('.wrapper__caption');

function toggleButton() {
    let username = document.getElementById('firstname').value;
    let email = document.getElementById('email').value;

    if (username && email) {
        document.getElementById('submitButton').disabled = false;
        document.getElementById('submitButton').classList.remove('disabled');
    } else {
        document.getElementById('submitButton').disabled = true;
        document.getElementById('submitButton').classList.add('disabled');
    }
}

function toggleInputOther() {
    const inp = document.querySelector('.input__other');
    const sel = document.getElementById("form__select");

    if (inp.value !== '') {
        sel.classList.add('disabled');
        sel.disabled = true;
    } else {
        sel.classList.remove('disabled');
        sel.disabled = false;
    }
}
// !

// * Vue *

var app = new Vue({
    el: "#app",
    data: {
        products: [
            { id: 1, title: "TAG 1000 (TAG 853)", short_text: "Dill Determinate Green Standard Round", image: 'first.jpg', desc: "Full desc" },
            { id: 2, title: "TAG 1001 (TAG 855)", short_text: "Dill Determinate Green Standard Round", image: 'second.jpeg', desc: "Full desc" },
            { id: 3, title: "TAG 1002 (TAG 809)", short_text: "Dill Determinate Green Standard Round", image: 'third.jpeg', desc: "Full desc" },
            { id: 4, title: "TAG 1003 (TAG 834)", short_text: "Dill Determinate Green Standard Round", image: 'forth.jpeg', desc: "Full desc" },
            { id: 5, title: "TAG 1004 (TAG 848)", short_text: "Dill Determinate Green Standard Round", image: 'fifth.jpg', desc: "Full desc" },
        ],
        product: [],
        cart: [],
        contactFields: [],
        btnVisible: 0,
        fieldsVisible: 0,
    },
    methods: {
        getProduct: function () {
            if (window.location.hash) {
                var id = window.location.hash.replace('#', '');
                if (this.products && this.products.length > 0) {
                    for (i in this.products) {
                        if (this.products[i] && this.products[i].id && id == this.products[i].id) {
                            this.product = this.products[i];
                        }
                    }
                }
            }
        },
        addToCart: function (id) {
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if (cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                setTimeout(() => this.btnVisible = 1, 100);
            };
        },
        removeFromCart: function (id) {

            let cart = [];
            item = id.toString();

            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            console.log('cart: ' + cart);
            console.log("ID: " + id);
            console.log("ITEM: " + item);
            console.log("cart length: " + cart.length);
            cart.sort(function (a, b) {
                return a - b;
            });

            let index = cart.indexOf(item);

            cart.splice(index, 1);
            this.cart.splice(index, 1);


            window.localStorage.setItem('cart', cart.join());
        },
        getCart: function () {

            item = window.localStorage.getItem('cart');

            for (i in this.products) {
                if (item != null && item.includes(this.products[i].id)) {
                    this.cart.push(this.products[i]);
                }
            }
            return this.cart;
        },
        checkInCart: function () {
            if (this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1) {
                this.btnVisible = 1;
            }
        },
        makeOrder: function () {
            if (this.cart.length > 0 && window.localStorage.length > 0) {
                this.fieldsVisible = 1;
                this.cart.splice(0, this.cart.length);
                window.localStorage.clear();
                document.getElementById("form").reset();
            } else {
                alert("Add at least one product in the cart");
            }
        }
    },
    mounted: function () {
        this.getProduct();
        this.checkInCart();
        this.getCart();
    }
})




