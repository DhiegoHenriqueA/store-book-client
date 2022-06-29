import { defineStore } from 'pinia'

import type { User } from "@/entities/user"

interface IState {
  loggedIn: boolean,
  user?: User
}

export const useCounterStore = defineStore({
  id: 'counter',
  state: (): IState => ({
    loggedIn: false,
  }),
  
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  // actions: {
  //   increment() {
  //     this.counter++
  //   }
  // }
})
