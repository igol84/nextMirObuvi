import {createWithEqualityFn} from 'zustand/traditional'
import {User} from "@/lib/store/types";
import {User as userDB} from "@/lib/db/user";
import {shallow} from "zustand/shallow";


type UseUser = {
  user?: User | undefined
  loading: boolean
  setUser: (user: User) => void,
  setFavoriteProducts: (favoriteProducts: string[]) => void,
  pushFavoriteProduct: (favoriteProduct: string) => void,
  putFavoriteProduct: (favoriteProduct: string) => void
}

export const useUser = createWithEqualityFn<UseUser>()((set) => ({
  user: undefined,
  loading: false,
  setUser: async (user: User) => {
    set({user})
  },
  setFavoriteProducts: async (favoriteProducts: string[]) => {
    set(state => {
      const user: User | undefined = state.user
        ? {...state.user, favoriteProducts}
        : undefined
      return {user}
    })
  },

  pushFavoriteProduct: async (favoriteProduct: string) => {
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

  putFavoriteProduct: async (favoriteProduct: string) => {
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

}), shallow)

export const userConvertFromDB = (user: userDB): User => {
  return {id: user.id, name: user.name, image: user.image, favoriteProducts: user.favoriteProducts}
}