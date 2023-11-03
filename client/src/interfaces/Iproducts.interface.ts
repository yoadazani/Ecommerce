export interface IProducts {
    id: string,
    categoryID: string,
    createdAt: Date,
    updatedAt: Date,
    productName: string,
    price: number,
    picture: string[],
    likesAmount: number,
    salesAmount: number,
    rating: number,
    inStock: boolean,
    sizes: string[],
    colors: string[]
}
