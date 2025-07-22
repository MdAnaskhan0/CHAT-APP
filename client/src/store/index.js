import {create} from 'zustand'
import { createAuthSlice } from './slices/auth-slice.js'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: 'auth-storage',
    }
  )
);

