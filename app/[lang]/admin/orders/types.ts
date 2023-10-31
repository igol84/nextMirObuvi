export interface IOrderItem {
  productNameUa: string
  productNameEn: string
  size: number | null
  price: number
  quantity: number
  url: string
  imgUrl: string
}

export interface IOrder {
  id: string
  orderNumber: number
  createdAt: Date
  firstName: string
  lastName: string
  email: string
  phone: string
  delivery: string
  orderItems: IOrderItem[]
}