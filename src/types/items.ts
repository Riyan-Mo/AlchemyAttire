interface rating{
    stars: number;
    count: number;
}

export interface item{
    id: number,
    image: string,
    company: string,
    item_name: string,
    original_price: number,
    current_price: number,
    discount_percentage: number,
    return_period: number,
    delivery_date: string,
    rating: rating;
}

export interface cartItem extends item{
    count: number;
}