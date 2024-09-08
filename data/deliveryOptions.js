export const deliveryOptions = [
    {
        id: 1,
        deliveryDays: 7,
        priceCent: 0
    },
    {
        id: 2,
        deliveryDays: 3,
        priceCent: 499
    },
    {
        id: 3,
        deliveryDays: 1,
        priceCent: 999
    }
]

export function getDeliveryOption(deliveryOptionId) {
    const delOption = deliveryOptions.find(deliveryOption => deliveryOption.id === deliveryOptionId)

    return delOption || deliveryOptions[0]
}