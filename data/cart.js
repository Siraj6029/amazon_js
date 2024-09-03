export const cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
    }
];

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