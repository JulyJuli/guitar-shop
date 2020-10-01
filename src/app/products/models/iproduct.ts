export interface IProduct {
  id: number;
  name: string;
  price: number;
  supplyDate: Date;
  description: string;
  linkToPicture: string;
  isAvailable: boolean;
  numberOfAvailableProducts: number;
}
