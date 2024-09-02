export const cart = [];

export function addToCart(productId) {
    let matchedProduct;

    const quantityElem = document.querySelector(`.js-quantity-selector-${productId}`);

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchedProduct = cartItem;
        }
    })
    if (matchedProduct) {
        matchedProduct.quantity += Number(quantityElem.value);
    } else {
        cart.push({
            productId: productId,
            quantity: Number(quantityElem.value)
        });
    }
    const addedElem = document.querySelector(`.js-added-to-cart-${productId}`)
    addedElem.classList.add("added-to-cart-display")
    console.log(addedElem.classList)
    setTimeout(() => {
        addedElem.classList.remove("added-to-cart-display")
    }, 2000)
}