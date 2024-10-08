import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formateCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let cartItemQuantity = 0;


    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        let delOption = getDeliveryOption(cartItem.deliveryOptionId)
        shippingPriceCents += delOption.priceCent

        cartItemQuantity += cartItem.quantity
    })

    const totalBeforTax = productPriceCents + shippingPriceCents

    const estimatedTax = totalBeforTax * 0.1

    const totalCents = totalBeforTax + estimatedTax

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${cartItemQuantity}):</div>
          <div class="payment-summary-money">
            $${formateCurrency(productPriceCents)}
          </div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">
            $${formateCurrency(shippingPriceCents)}
          </div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">
            $${formateCurrency(totalBeforTax)}
          </div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">
            $${formateCurrency(estimatedTax)}
          </div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">
            $${formateCurrency(totalCents)}
          </div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `;

    document.querySelector(".js-payment-summary")
        .innerHTML = paymentSummaryHTML
}