

var productDetailsContainer = document.getElementById("product-details-container")
var cartLogo = document.getElementById("cart-logo")
var cartIcon = document.getElementById("cart-icon")
const parameter = location.search.split("=")[1]

var noOfItems = document.getElementById("items__in__cart")
noOfItems.innerHTML += localStorage.getItem("cartItemNo")



var counter = 0
function renderProductDetailsPage(data, cartcount) {
  var productDetailsPage = document.createElement("div")
  productDetailsPage.className = "product-details-page"
  productDetailsPage.id = "product-details-page"
  productDetailsContainer.appendChild(productDetailsPage)

  var previewContainer = document.createElement("div")
  previewContainer.className = "left"
  productDetailsPage.appendChild(previewContainer)

  var preview = document.createElement("img")
  preview.id = "cover-image"
  preview.className = "preview"
  preview.src = data.preview
  previewContainer.appendChild(preview)

  var detailsConatiner = document.createElement("div")
  detailsConatiner.className = "right"
  productDetailsPage.appendChild(detailsConatiner)

  var productName = document.createElement("h1")
  productName.className = "product-name"
  productName.innerHTML = data.name
  detailsConatiner.appendChild(productName)

  var productBrand = document.createElement("h3")
  productBrand.className = "product-brand"
  productBrand.innerHTML = data.brand
  detailsConatiner.appendChild(productBrand)

  var productPrice = document.createElement("h3")
  productPrice.className = "product-price"
  productPrice.innerHTML = "Price: Rs "
  detailsConatiner.appendChild(productPrice)

  var price = document.createElement("span")
  price.id = "price"
  productPrice.appendChild(price)
  price.innerHTML = data.price

  var productDescription = document.createElement("h3")
  productDescription.className = "product-description"
  productDescription.innerHTML = "Description"
  detailsConatiner.appendChild(productDescription)

  var description = document.createElement("p")
  description.className = "description"
  description.innerHTML = data.description
  detailsConatiner.appendChild(description)

  var productPreview = document.createElement("h3")
  productPreview.className = "product-preview"
  productPreview.innerHTML = "Product Preview"
  detailsConatiner.appendChild(productPreview)

  var productImgContainer = document.createElement("div")
  productImgContainer.id = "product-image-container"
  detailsConatiner.appendChild(productImgContainer)

  thumbnailHtml = []
  thumbnail = data.photos

  for (var i = 0; i < thumbnail.length; i++) {
    if (i == 0) {
      var productImg = document.createElement("img")
      productImg.src = thumbnail[i]
      productImg.className = "product-preview-img"
      productImg.classList.add("active")
      productImgContainer.appendChild(productImg)
    }
    else {
      var productImg = document.createElement("img")
      productImg.src = thumbnail[i]
      productImg.className = "product-preview-img"
      productImgContainer.appendChild(productImg)
    }
  }

  addToCart = document.createElement("button")
  addToCart.innerHTML = "Add to Cart"
  addToCart.className = "add-to-cart"
  detailsConatiner.appendChild(addToCart)
  addToCart.addEventListener("click", function (e) {
    counter++
    alert("Added to cart")
    addtoLocalStorage(data)

  })
}

$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + parameter, function (response) {

  //console.log(response)
  renderProductDetailsPage(response)

  coverImage = document.getElementById("cover-image")
  productImageslist = document.querySelectorAll(".product-preview-img")

  for (var i = 0; i < productImageslist.length; i++) {
    //console.log(productImageslist)
    function changeCoverImage(index) {
      productImageslist[index].addEventListener("click", function () {
        thumbnailBorders = document.querySelector(".active")
        thumbnailBorders.classList.remove("active")

        productImageslist[index].classList.add("active")

        coverImage.src = productImageslist[index].src
      })
    }
    changeCoverImage(i)
  }
})
cartLogo.addEventListener("click", function (e) {
  cartIcon.href = "./cart.html"
})

function addtoLocalStorage(data) {
  var productArr = []
  var foundAtPos = -1
  var fromlocalStorage = localStorage.getItem("productData")
  if (fromlocalStorage === null || fromlocalStorage === undefined) {
    data.quantity = 1
    data.totalprice = data.price
    productArr.push(data)
    localStorage.setItem("cartItemNo", JSON.stringify(1))
    localStorage.setItem("productData", JSON.stringify(productArr))
  }
  else {
    productArr = JSON.parse(fromlocalStorage)
    for (i = 0; i < productArr.length; i++) {
      if (productArr[i].id == data.id) {
        foundAtPos = i
        console.log(foundAtPos)
      }
    }
    if (foundAtPos > -1) {
      productArr[foundAtPos].quantity += 1
      productArr[foundAtPos].totalprice = productArr[foundAtPos].quantity * data.price
      console.log("Already present")
      const cartCount = Number(localStorage.getItem("cartItemNo")) + 1
      localStorage.setItem("cartItemNo", JSON.stringify(cartCount))
      localStorage.setItem("productData", JSON.stringify(productArr))
      noOfItems.innerHTML += localStorage.getItem("cartItemNo")


    }
    else {
      data.quantity  = 1
      data.totalprice = data.price
      productArr.push(data)
      const cartCount = Number(localStorage.getItem("cartItemNo")) + 1
      localStorage.setItem("cartItemNo", JSON.stringify(cartCount))
      localStorage.setItem("productData", JSON.stringify(productArr))
      noOfItems.innerHTML += localStorage.getItem("cartItemNo")

    }

  }
  noOfItems.innerHTML = localStorage.getItem("cartItemNo")
}



