import { FeatureCollection } from "geojson";

export type CoffeeData = {
  id: string
  image: string
  name: string
  description: string
  price: number
  storeId: string
  updatedAt: Date | null
  createdAt: Date
  coffeesOnTags: {
    tag: {
      id: string
      name: string
    }
  }[]
  inventory: {
    id: string
    quantity: number
  } | null
}

export interface CoffeeDeliveryRepository {
  getFeaturesCollection: () => Promise<FeatureCollection>
  getCoffees: () => Promise<CoffeeData[]>
  postOrder: (order: any) => Promise<void> 
}
