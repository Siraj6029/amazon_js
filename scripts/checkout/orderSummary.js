import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { cart, removeFromCart, saveToStorage, updateDeliveryOption } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { formateCurrency } from ".././utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary() {

    let cartSummaryHTML = "";
    cart.forEach((item) => {
        const productId = item.productId;

        products.forEach((product) => {
            if (product.id === productId) {

                const deliveryOptionId = item.deliveryOptionId;
                let deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId) || deliveryOptions[0]

                const dateString = dayjs().add(deliveryOption.deliveryDays, "days").format("dddd, MMMM D")

                cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${productId}">
                <div class="delivery-date">
                ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${product.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${product.name}
                    </div>
                    <div class="product-price">
                    $${formateCurrency(product.priceCents)}
                    </div>
                    <div class="product-quantity js-product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label">${item.quantity}</span>
                    </span>
                    <input class="quantity-input-box" type="Number" min="1"></input>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${productId}">    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                        Delete
                    </span>
                    </div>
                    </div>
                    <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(productId, item)}
                </div>
                </div>
            </div>
            </div>
        `
            }
        })
    })

    function deliveryOptionsHTML(productId, cartItem) {
        let html = "";
        console.log(cartItem)
        deliveryOptions.forEach((option) => {
            const dateString = dayjs().add(option.deliveryDays, "days").format("dddd, MMMM D")
            const shippingPrice = option.priceCent === 0 ? "FREE" : `$${formateCurrency(option.priceCent)} -`

            const isChecked = option.id === cartItem.deliveryOptionId


            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${option.id}">
                <input type="radio" ${isChecked ? "checked" : ""}
                class="delivery-option-input js-delivery-option-input"
                name="delivery-option-${productId}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${shippingPrice} Shipping
                </div>
                </div>
                </div>
            `
        });
        return html

    }

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML

    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {

            const productId = link.dataset.productId;
            removeFromCart(productId);

            document.querySelector(`.js-cart-item-container-${productId}`).remove()
            renderPaymentSummary()
        })
    });

    document.querySelectorAll(`.js-update-quantity-link`)
        .forEach((updateElem) => {
            updateElem.addEventListener("click", () => {
                const productId = updateElem.dataset.productId

                const quantityInputElem = document.querySelector(`.js-cart-item-container-${productId} .quantity-input-box`);

                const quantityElem = document.querySelector(`.js-cart-item-container-${productId} .js-quantity-label`)

                if (updateElem.innerText.trim() === "Update") {

                    quantityInputElem.style.display = "inline"
                    quantityElem.style.display = "none"

                    updateElem.innerText = "Save"

                } else {
                    const newValue = Number(quantityInputElem.value)
                    if (newValue < 1) {
                        alert("Quantity must be greater than 0.")
                    } else {
                        quantityElem.style.display = "inline"
                        quantityElem.innerHTML = newValue

                        quantityInputElem.style.display = "none";
                        updateElem.innerText = "Update";

                        const matchedItem = cart.find(obj => obj.productId === productId)
                        matchedItem.quantity = newValue
                        saveToStorage();
                        renderPaymentSummary();
                    }

                };
            })

        })

    document.querySelectorAll(".js-delivery-option").forEach((deliveryOptionElem) => {
        deliveryOptionElem.addEventListener("click", () => {
            console.log(deliveryOptionElem.dataset)
            const { productId, deliveryOptionId } = deliveryOptionElem.dataset;
            updateDeliveryOption(productId, Number(deliveryOptionId));
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
};
