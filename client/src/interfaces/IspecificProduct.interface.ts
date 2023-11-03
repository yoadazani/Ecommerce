import {IProducts} from "./Iproducts.interface";
import {IReviews} from "./Ireviews.interface";

export interface ISpecificProduct extends IProducts {
    amount: number,
    description: string,
    itemSpecifics: { key: string, value: string }[],
    reviews: IReviews[]
}
