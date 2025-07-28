// export const createAuthSlice = (set) => ({
//   userInfo: null,
//   setUserInfo: (userInfo) => set({ userInfo }),
//   clearUserInfo: () => set({ userInfo: null }),
// });


export const createAuthSlice = (set) => ({
  userInfo: null,

  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
  updateUserImage: (imagePath) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        image: imagePath,
      },
    })),
});
