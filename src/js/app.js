'use strict';

// Selector
const overlay = document.querySelector(".overlay");
const confirmPopup = document.getElementById("confirmPopup");
const popupMessage = document.querySelector(".popup-message");
const inputs = document.querySelectorAll("input");
const titleInput = document.querySelector(".title-input");
const priceInput = document.querySelector(".price-input");
const taxesInput = document.querySelector(".taxes-input");
const adsInput = document.querySelector(".ads-input");
const discountInput = document.querySelector(".discount-input");
const quantityInput = document.querySelector(".quantity-input");
const categoryInput = document.querySelector(".category-input");
const total = document.querySelector(".total");
const createBtn = document.getElementById("create-btn");
const deleteAllBtn = document.querySelector(".deleteAll-btn");
const thead = document.querySelector(".thead");
const searchInput = document.getElementById("searchInput");
let mood = "create";
let tmpProductId;
let products;
let financialInputs = [priceInput, taxesInput, adsInput, discountInput];

// Check if any product in database
if (localStorage.products != null) {
    products = JSON.parse(localStorage.products);
} else {
    products = [];
}

// Get total
const getTotal = () => {
    if (priceInput.value !== "") {
        let result =
            +priceInput.value +
            +taxesInput.value +
            +adsInput.value -
            +discountInput.value;
        total.children[0].innerHTML = `${result}`;
        total.classList.add("active");
    } else {
        total.classList.remove("active");
        total.children[0].innerHTML = "0";
    }
};
financialInputs.forEach((input) => input.addEventListener("keyup", getTotal));

// Reset all inputs
const reset = () => {
    inputs.forEach((input) => (input.value = ""));
    total.classList.remove("active");
    total.children[0].innerHTML = "0";
    createBtn.innerHTML = "Create";
};

// Create a Product
const createProduct = () => {
    let productInfo = {
        title: titleInput.value.toLowerCase(),
        price: priceInput.value.toLowerCase(),
        taxes: taxesInput.value.toLowerCase() || "0",
        ads: adsInput.value.toLowerCase() || "0",
        discount: discountInput.value.toLowerCase() || "0",
        total: total.children[0].innerHTML.toLowerCase(),
        category: categoryInput.value.toLowerCase(),
        quantity: quantityInput.value.toLowerCase() || "1",
    };

    if (mood === "create") {
        if (
            titleInput.value !== "" &&
            priceInput.value !== "" &&
            categoryInput.value !== ""
        ) {
            products.push(productInfo);
        } else {
            const inputs = [titleInput, priceInput, categoryInput];
            inputs.forEach((input) => {
                if (input.value === "") {
                    input.classList.add("error");
                    setTimeout(() => {
                        input.classList.remove("error");
                    }, 1000);
                }
            });
        }
    } else {
        products[tmpProductId] = productInfo;
        mood = "create";
        createBtn.innerHTML = "Create";
    }
    localStorage.setItem("products", JSON.stringify(products));
    showProducts();
    reset();
};
createBtn.addEventListener("click", createProduct);

// Show Products in the Page
const showProducts = () => {
    let myProducts = "";

    if (products.length !== 0) {
        products.forEach((product, index) => {
            myProducts += `
      <tr class="product-details">
      <td>${index + 1}</td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>${product.taxes}</td>
      <td>${product.ads}</td>
      <td>${product.discount}</td>
      <td>${product.total}</td>
      <td>${product.category}</td>
      <td>${product.quantity}</td>
      <td>
        <button  onCLick="updateHandler(${index})" id="update-btn">update</button>
      </td>
      <td>
        <button  onCLick="deleteHandler(${index})" id="delete-btn">delete</button>
      </td>
    </tr>
      `;
        });

        deleteAllBtn.classList.add("active");
        thead.classList.remove("hidden");
    } else {
        deleteAllBtn.classList.remove("active");
        thead.classList.add("hidden");
    }
    document.getElementById("tbody").innerHTML = myProducts;
};
showProducts();

// Handle the Update mood
const updateHandler = (product_id) => {
    scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    mood = "update";
    titleInput.focus();
    titleInput.value = products[product_id].title;
    priceInput.value = products[product_id].price;
    taxesInput.value = products[product_id].taxes;
    adsInput.value = products[product_id].ads;
    discountInput.value = products[product_id].discount;
    quantityInput.value = products[product_id].quantity;
    categoryInput.value = products[product_id].category;
    total.children[0].innerHTML = products[product_id].total;
    total.classList.add("active");
    createBtn.innerHTML = "Update";
    tmpProductId = product_id;
};

// Delete Product Handler.
const deleteHandler = (product_id) => {
    overlay?.classList.add("active");
    confirmPopup?.classList.add("active");
    popupMessage.innerHTML = "Are you sure you want to delete this!";

    // delete Confirm Message
    confirmMessageHandler(function () {
        products.splice(product_id, 1);
        localStorage.products = JSON.stringify(products);
        showProducts();
        overlay?.classList.remove("active");
        confirmPopup?.classList.remove("active");
    });
    // reset all settings and inputs
    reset();
};

// Delete All Products.
const deleteAllProducts = () => {
    overlay?.classList.add("active");
    confirmPopup?.classList.add("active");
    popupMessage.innerHTML = "Are you sure you want to delete all products!";

    confirmMessageHandler(function () {
        products = [];
        localStorage.removeItem("products");
        document.getElementById("tbody").innerHTML = "";
        showProducts();
        reset();
        overlay?.classList.remove("active");
        confirmPopup?.classList.remove("active");
    });
};
deleteAllBtn.addEventListener("click", deleteAllProducts);

// Search Handler
const searchHandler = (searchType) => {
    searchInput.focus();
    searchInput.placeholder = `Search for products By ${searchType}`;
    searchForProducts(searchType);
};

// Search For Products
const searchForProducts = (searchType) => {
    searchInput.addEventListener("keyup", () => {
        let myProducts = "";

        products.forEach((product, index) => {
            if (
                searchType === "title"
                    ? product.title.includes(searchInput.value.toLowerCase())
                    : product.category.includes(searchInput.value.toLowerCase())
            ) {
                myProducts += `
        <tr class="product-details">
        <td>${index + 1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td>${product.quantity}</td>
        <td>
          <button onCLick="updateHandler(${index})" id="update-btn">update</button>
        </td>
        <td>
          <button onCLick="deleteProduct(${index})" id="delete-btn">delete</button>
        </td>
      </tr>
        `;
            }
        });

        document.getElementById("tbody").innerHTML = myProducts;
        deleteAllBtn.classList.add("active");
    });
};
searchForProducts("title");

const searchByTitle = document.getElementById("searchByTitle");
const searchByCategory = document.getElementById("searchByCategory");

searchByTitle?.addEventListener("click", () => searchHandler("title"));
searchByCategory?.addEventListener("click", () => searchHandler("category"));
