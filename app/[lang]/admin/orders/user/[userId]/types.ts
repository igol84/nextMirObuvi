export interface IOrderItem {
  id: string
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
  userId: string | null
  orderNumber: number
  createdAt: Date
  firstName: string
  lastName: string
  email: string
  phone: string
  delivery: string
  orderItems: IOrderItem[]
}

export interface IUser {
  id: string
  name: string | null
  email: string | null
  image: string | null
  orders: IOrder[]
}

export interface IDroppableOrder {
  productIds: string[]
}