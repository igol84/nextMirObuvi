import {User} from "@/lib/store/types";
import {User as userDB} from "@/lib/db/user";
import {StateCreator} from "zustand";

type State = {
  user: User | undefined
}

type Actions = {
  setUser: (user: User | undefined) => void,
  setFavoriteProducts: (favoriteProducts: string[]) => void,
  pushFavoriteProduct: (favoriteProduct: string) => void,
  putFavoriteProduct: (favoriteProduct: string) => void
}

export type UserSlice = State & Actions

export const createUserSlice: StateCreator<
  UserSlice,
  [],
  [],
  UserSlice
> = ((set) => ({
  user: undefined,
  loading: false,
  setUser: (user) => {
    set({user})
  },
  setFavoriteProducts: (favoriteProducts) => {
    set(state => {
      const user: User | undefined = state.user
        ? {...state.user, favoriteProducts}
        : undefined
      return {user}
    })
  },

  pushFavoriteProduct: (favoriteProduct) => {
    set(state => {
      let user: User | undefined = undefined
      if(state.user) {
        const userFavoriteProducts = new Set(state.user.favoriteProducts)
        userFavoriteProducts.add(favoriteProduct)
        user = {...state.user, favoriteProducts: Array.from(userFavoriteProducts)}
      }
      return {user}
    })
  },

  putFavoriteProduct: (favoriteProduct) => {
    set(state => {
      let user: User | undefined = undefined
      if(state.user) {
        const userFavoriteProducts = new Set(state.user.favoriteProducts)
        userFavoriteProducts.delete(favoriteProduct)
        user = {...state.user, favoriteProducts: Array.from(userFavoriteProducts)}
      }
      return {user}
    })
  }

}))

export const userConvertFromDB = (user: userDB): User => {
  return {id: user.id, name: user.name, image: user.image, favoriteProducts: user.favoriteProducts}
}