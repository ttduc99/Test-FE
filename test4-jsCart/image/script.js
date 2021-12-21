const btn = document.querySelectorAll("button");
//Xu ly su kien click vao nut them gio hang 
btn.forEach(function(button, index) {
        button.addEventListener("click", function(event) {
            {
                var btnItem = event.target
                var product = btnItem.parentElement
                var productImg = product.querySelector("img").src
                var productName = product.querySelector("H1").innerText
                var productPrice = product.querySelector("span").innerText
                    // console.log(productPrice)
                addcart(productPrice, productImg, productName)
            }
        })
    })
    // xuat danh sach gio hang
function addcart(productPrice, productImg, productName) {
    var addtr = document.createElement("tr")
    var cartItem = document.querySelectorAll("tbody tr")
    for (var i = 0; i < cartItem.length; i++) {
        var productT = document.querySelectorAll(".title")
        if (productT[i].innerHTML == productName) {
            alert("Sản phẩm của bạn đã có trong giỏ hàng")
            return
        }
    }
    var trcontent = '  <tr><td style="display: flex; align-items: center;"><img style="width:70px" src="' + productImg + '" alt="product1"><span class="title">' + productName + '</span></td><td><span class="price">' + productPrice + '</span><sup>đ</sup></td><td><input style="width: 30px;outline: none;" type="number" value="1" min="1"></td><td style="cursor: pointer;"><span class="delete-cart">Xóa</span></td></tr>'
    addtr.innerHTML = trcontent
    var cartTable = document.querySelector("tbody")
    cartTable.append(addtr)
    carttotal();
    deleteCart();
}
// Tong tien
function carttotal() {
    var cartItem = document.querySelectorAll("tbody tr")
    var totalC = 0
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value
            // console.log(inputValue)
        var productPrice = parseFloat(cartItem[i].querySelector(".price").innerHTML)
            // console.log(productPrice)
        totalA = inputValue * productPrice * 1000
            // totalB = totalA.toLocaleString('de-DE')
            // console.log(totalB)
        totalC = totalC + totalA
            // console.log(totalC)
    }
    var cartTotalA = document.querySelector(".price-total span")
    var cartPrice = document.querySelector(".cart-icon span")
    cartTotalA.innerHTML = totalC.toLocaleString('de-DE')
    cartPrice.innerHTML = totalC.toLocaleString('de-DE')
    inputchange()
}

// Xoa san pham
function deleteCart() {
    var cartItem = document.querySelectorAll("tbody tr")
    for (var i = 0; i < cartItem.length; i++) {
        var productT = document.querySelectorAll(".delete-cart")
        productT[i].addEventListener("click", function(event) {
            var deleteCart = event.target
            var cartItemR = deleteCart.parentElement.parentElement
            cartItemR.remove();
            carttotal();
        })
    }

}

function inputchange() {
    var cartItem = document.querySelectorAll("tbody tr")
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input")
        inputValue.addEventListener("change", function() {
            carttotal()
        })
    }
}
const cartbtn = document.querySelector(".fa-times")
const cartshow = document.querySelector(".fa-shopping-cart")
cartshow.addEventListener("click", function() {
    document.querySelector(".cart").style.right = "0"
})
cartbtn.addEventListener("click", function() {
    document.querySelector(".cart").style.right = "-100%"
})