function handleError(error) {
  console.log("An error occurred:", error.message);
}

function fetchProductsThen() {
  fetch("https://www.course-api.com/javascript-store-products")
    .then(function (response) {
      return response.json();
    })
    .then(function (products) {
      products.forEach(function (product) {
        console.log(product.fields.name);
      });
    })
    .catch(function (error) {
      console.log("Fetch with .then() failed:", error.message);
    });
}

async function fetchProductsAsync() {
  try {
    const response = await fetch("https://www.course-api.com/javascript-store-products");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById("product-container");

  const firstFiveProducts = products.slice(0, 5);

  firstFiveProducts.forEach(function (product) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const productName = document.createElement("h2");
    productName.textContent = product.fields.name;

    const productImage = document.createElement("img");
    productImage.src = product.fields.image[0].url;
    productImage.alt = product.fields.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = "$" + (product.fields.price / 100).toFixed(2);

    card.appendChild(productImage);
    card.appendChild(productName);
    card.appendChild(productPrice);

    productContainer.appendChild(card);
  });
}

fetchProductsThen();
fetchProductsAsync();