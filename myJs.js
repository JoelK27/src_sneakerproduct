var productName = document.getElementById('productName');
var productDesc = document.getElementById('productDesc');
var productModel = document.getElementById('productModel');
var productPrice = document.getElementById('productPrice');
var productBtn = document.getElementById('productBtn');
// var productImg = document.getElementById('productImg'); // Removed line
var formControl = document.getElementsByClassName('form-control');
// var myClose = document.getElementsByClassName('myClose'); // Removed line
var mySearchInp = document.getElementById('mySearchInp');
var productHeadline = document.getElementById('productHeadline');
// var dataRow = document.getElementById('dataRow'); // Removed line
var productContainer;
var currentIndex = 0;
//check for local storage at begining
if (localStorage.getItem('productsStorage') == null) {
    productContainer = [];
    productHeadline.style.display = 'none';
    // searchItem.style.display = 'none'; // Commented out line
} else {
    productContainer = JSON.parse(localStorage.getItem('productsStorage'));
    showProducts();
}
//check for empty fields to disable button
disableBtn();

productBtn.addEventListener('click', function () {
    if (productBtn.innerHTML == 'add product') {
        //disableBtn();
        addProducts();
        showAlert();
        showProducts();
        emptyFields();
    } else {
        saveUpdate();
        emptyFields();
    }

});

// Define successProductAlert variable
var successProductAlert = document.getElementById('successProductAlert');

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> //should be added to the html file

function addProducts() {

    var products = {
        productName: productName.value,
        // productImg: productImg.value,
        productDesc: productDesc.value,
        productModel: productModel.value,
        productPrice: productPrice.value
    };
    productContainer.push(products);

    localStorage.setItem('productsStorage', JSON.stringify(productContainer));
    console.log('products added');
}

var searchItem = document.getElementById('searchItem');

function showProducts() {

    var rows = '';
    for (var i = 0; i < productContainer.length; i++) {
        rows += '<div class="col-lg-4 col-md-6 col-sm-12 my-2 products"><div class="product"><div class="card p-1 text-center m-auto" style="width: 18rem;"><div class="d-flex justify-content-between"><i class="fas fa-edit fa-2x" onclick="updateProduct(' + i + ')"></i><i class="fa fa-times-circle fa-2x " onclick="deleteItem(' + i + ')"></i></div><img class="img-fluid" src="images/3191.jpg" class="card-img-top" alt="test"><div class="card-body"><h5 class="card-title">' + productContainer[i].productName + '</h5><p class="card-text">' + productContainer[i].productDesc + '</p><a href="#" class="btn btn-primary">' + productContainer[i].productPrice + ' L.E</a></div></div></div></div>';
    }
    document.getElementById('dataRow').innerHTML = rows;
    //console.log('show products func');
    productContainer = JSON.parse(localStorage.getItem('productsStorage'));
    productHeadline.style.display = 'block';
    searchItem.style.display = 'block';
}

// Removed the unused 'updateProduct' function

function saveUpdate() {
    var products = {
        productName: productName.value,
        productDesc: productDesc.value,
        productModel: productModel.value,
        productPrice: productPrice.value
    };
    productContainer[currentIndex] = products;
    localStorage.setItem('productsStorage', JSON.stringify(productContainer));
    showProducts();
    productBtn.innerHTML = 'add product';
}

function emptyFields() {
    for (var i = 0; i < formControl.length; i++) {
        formControl[i].value = '';
    }
    disableBtn();
}

// Removed the unused 'deleteItem' function

mySearchInp.addEventListener('keyup', function (e) {
    //console.log(e.target.value);
    var rows = '';
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].productName.toLowerCase().includes(e.target.value.toLowerCase())) {
            rows += '<div class="col-lg-4 col-md-6 col-sm-12 my-2 products"><div class="product"><div class="card p-1 text-center m-auto" style="width: 18rem;"><div class="d-flex justify-content-between"><i class="fas fa-edit fa-2x" onclick="updateProduct(' + i + ')"></i><i class="fa fa-times-circle fa-2x" onclick="deleteItem(' + i + ')"></i></div><img class="img-fluid" src="images/3191.jpg" class="card-img-top" alt="test"><div class="card-body"><h5 class="card-title">' + productContainer[i].productName + '</h5><p class="card-text">' + productContainer[i].productDesc + '</p><a href="#" class="btn btn-primary">' + productContainer[i].productPrice + '</a></div></div></div></div>';
        }
    }
    document.getElementById('dataRow').innerHTML = rows;
});

//nav bar scroll
let navHeight = $('nav').outerHeight();
//console.log('nav height = ' + navHeight);
$(window).scroll(function () {
    let scrollTop = $(window).scrollTop();
    if (scrollTop > navHeight) {
        document.querySelector('nav').style.position = 'fixed';
        document.querySelector('nav').style.zIndex = '1000';
        document.querySelector('.my-Container').style.width = '85%';
        document.querySelector('nav').style.width = '85%';
        document.querySelector('.marginTop').style.marginTop = '0rem';
    } else {
        // $('nav').css('backgroundColor', 'green');
        document.querySelector('nav').style.position = 'relative';
        document.querySelector('.my-Container').style.width = '85%';
        document.querySelector('nav').style.width = '100%';
        document.querySelector('.marginTop').style.marginTop = '3rem';
    }
});