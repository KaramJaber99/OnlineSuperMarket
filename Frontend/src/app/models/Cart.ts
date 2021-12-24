import { Product } from "./Product";

export class Cart {
    public constructor(
        public id?: number,
        public dateCreated?: Date,
        public products?: Map<number, Product>
    ) { }
}