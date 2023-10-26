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
  orderNumber: number
  firstName: string
  lastName: string
  email: string
  phone: string
  delivery: string
  orderItems: IOrderItem[]
}