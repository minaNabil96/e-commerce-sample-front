import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_APIBASEURL;

export const apiSlice = createApi({
  // highlight-start
  reducerPath: "categoriesApi",
  tagTypes: [
    "Categories",
    "SubCategories",
    "SubCategoriesByCategory",
    "Products",
    "Brands",
    "Login",
    "Comments",
    "Offers",
    "User",
    "Contact",
    "productsByBrand",
  ],
  // highlight-end
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    // prepareHeaders: (headers, { getState }) => {
    //   headers.set(
    //     "Access-Control-Allow-Origin",
    //     "https://laconic-e-commerce-sample-api.cyclic.app/"
    //   );
    //   headers.set(
    //     "Access-Control-Allow-Origin",
    //     "https://laconic-e-commerce-sample-api.cyclic.app"
    //   );
    //   headers.set(
    //     "access-control-allow-origin",
    //     "https://laconic-e-commerce-sample-api.cyclic.app/"
    //   );
    //   headers.set(
    //     "access-control-allow-origin",
    //     "https://laconic-e-commerce-sample-api.cyclic.app"
    //   );
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    // ...endpoints
    // start contact
    contact: builder.mutation({
      query: (name, email, phone, message) => ({
        url: `/users/contact-me`,
        method: "PUT",
        body: name,
        email,
        phone,
        message,
      }),
    }),
    // end contact
    // start users
    userLogin: builder.mutation({
      query: ({ username, password }) => ({
        url: `/users/login`,
        method: "POST",
        credentials: "include",
        body: {
          username,
          password,
        },
      }),
      // transformResponse: (res) => res.data,
      invalidatesTags: ["Login"],
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Login"],
    }),
    userSignUp: builder.mutation({
      query: (signUpObj) => ({
        url: `/users/signup`,
        method: "POST",
        credentials: "include",
        body: signUpObj,
      }),
      invalidatesTags: ["Login"],
    }),
    userSignUpConfirm: builder.mutation({
      query: (confirmObj) => ({
        url: `/users/signup/confirmation`,
        method: "POST",
        credentials: "include",
        body: confirmObj,
      }),
      invalidatesTags: ["Login"],
    }),
    userResetPassword: builder.mutation({
      query: (forgotObj) => ({
        url: `/users/reset-password`,
        method: "POST",
        credentials: "include",
        body: forgotObj,
      }),
      invalidatesTags: ["Login"],
    }),
    userEditPassword: builder.mutation({
      query: (passObj) => ({
        url: `/users/edit-password`,
        method: "POST",
        credentials: "include",
        body: passObj,
      }),
      invalidatesTags: ["Login"],
    }),

    getSpecificUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "POST",
        credentials: "include",
      }),

      providesTags: ["User"],
    }),
    addFavorites: builder.mutation({
      query: (favoriteObj) => ({
        url: `/users/add-favorites/${favoriteObj.id}`,
        method: "POST",
        credentials: "include",
        body: favoriteObj,
      }),
      invalidatesTags: ["User"],
    }),
    deleteFavorites: builder.mutation({
      query: (favoriteObj) => ({
        url: `/users/delete-favorites/${favoriteObj.id}`,
        method: "PUT",
        credentials: "include",
        body: favoriteObj,
      }),
      invalidatesTags: ["User"],
    }),
    // end users
    // start categories
    getAllCategories: builder.query({
      query: ({ limit, page }) => `/categories?limit=${limit}&page=${page}`,
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation({
      query: (categoryObj) => ({
        url: `/admins/create-category`,
        method: "POST",
        credentials: "include",

        body: categoryObj,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admins/hide-category/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Categories"],
    }),
    editCategory: builder.mutation({
      query: ({ id, editCatobj }) => ({
        url: `/admins/edit-category/${id}`,
        method: "PUT",
        credentials: "include",
        body: editCatobj,
      }),
      invalidatesTags: ["Categories"],
    }),
    // end categories
    // start subCategories
    getAllSubCategories: builder.query({
      query: (subCategoryObj) => `/subcategories?limit=16`,
      providesTags: ["SubCategories"],
    }),
    getSubCategoriesByCategory: builder.query({
      query: (categoryId) => ({
        url: `/subcategories/by-category`,
        method: "POST",
        credentials: "include",
        body: { categoryId: categoryId },
      }),
      providesTags: ["SubCategoriesByCategory"],
    }),
    addSubCategory: builder.mutation({
      query: (subCategoryObj) => ({
        url: `/admins/create-subcategory`,
        method: "POST",
        credentials: "include",
        body: subCategoryObj,
      }),
      invalidatesTags: ["SubCategories", "SubCategoriesByCategory"],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/admins/hide-subcategory/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["SubCategories", "SubCategoriesByCategory"],
    }),
    editSubCategory: builder.mutation({
      query: ({ id, editSubObj }) => ({
        url: `/admins/edit-subcategory/${id}`,
        method: "PUT",
        credentials: "include",
        body: editSubObj,
      }),
      invalidatesTags: ["SubCategories", "SubCategoriesByCategory"],
    }),

    // end categories
    // start products
    getAllProducts: builder.query({
      query: ({ page, limit, sort, term }) =>
        `/products?sort=${sort}&limit=${limit}&page=${page}&term=${term}`,
      providesTags: ["Products"],
    }),
    getProductsWithFeatures: builder.mutation({
      query: ({ page, limit, sort, term }) => ({
        url: `/products?sort=${sort}&limit=${limit}&page=${page}&term=${term}`,
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    getProductsWithSub: builder.query({
      query: ({ subCategoryId, limit, page, sort, term }) => ({
        url: `/products/bysubcategory/${subCategoryId}?limit=${limit}&page=${page}&sort=${sort}&term=${term}`,
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Products", "SubCategories", "SubCategoriesByCategory"],
    }),
    getProductsWithBrand: builder.query({
      query: ({ brandId, limit, page, sort, term }) => ({
        url: `/products/bybrand/${brandId}?limit=${limit}&page=${page}&sort=${sort}&term=${term}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["productsByBrand"],
    }),
    getSpecificProduct: builder.query({
      query: (productId) => `/products/${productId}`,
      invalidatesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (productObj) => ({
        url: `/admins/create-product`,
        method: "POST",
        credentials: "include",
        body: productObj,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admins/hide-product/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    rateAndCommentProduct: builder.mutation({
      query: (userRateWithComment) => ({
        url: `/comments/addrateandcomment`,
        method: "POST",
        credentials: "include",
        body: userRateWithComment,
      }),
      invalidatesTags: ["Comments", "Products"],
    }),
    getRatingsAndCommentsProduct: builder.query({
      query: (productObj) => ({
        url: `/comments/getratingsandcomment/${productObj.productId}?page=${productObj.page}&limit=3`,
        method: "POST",
        credentials: "include",
      }),
      providesTags: ["Comments", "Products"],
    }),
    // end products
    // start brands
    getAllBrands: builder.query({
      query: ({ limit, page }) => `/brands?limit=${limit}&page=${page}`,
      providesTags: ["Brands"],
    }),

    addBrand: builder.mutation({
      query: (brandObj) => ({
        url: `/admins/create-brand`,
        method: "POST",
        credentials: "include",
        body: brandObj,
      }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/admins/hide-brand/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Brands"],
    }),
    editBrand: builder.mutation({
      query: ({ id, editBrandObj }) => ({
        url: `/admins/edit-brand/${id}`,
        method: "PUT",
        credentials: "include",
        body: editBrandObj,
      }),
      invalidatesTags: ["Brands"],
    }),

    // end brands
    // start offers
    getOffers: builder.query({
      query: (queryobj) =>
        `/offers?page=${queryobj.page}&limit=${queryobj.limit}`,
      providesTags: ["Offers"],
    }),

    addOffer: builder.mutation({
      query: (offerObj) => ({
        url: `/admins/create-offer`,
        method: "POST",
        credentials: "include",
        body: offerObj,
      }),
      invalidatesTags: ["Offers"],
    }),

    // end offers
  }),
});

export const {
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserSignUpMutation,
  useUserSignUpConfirmMutation,
  useUserResetPasswordMutation,
  useUserEditPasswordMutation,
  useGetSpecificUserQuery,
  useAddFavoritesMutation,
  useDeleteFavoritesMutation,
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetAllSubCategoriesQuery,
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useEditSubCategoryMutation,
  useGetSubCategoriesByCategoryQuery,
  useGetAllProductsQuery,
  useGetProductsWithFeaturesMutation,
  useGetProductsWithSubQuery,
  useGetProductsWithBrandQuery,
  useGetSpecificProductQuery,
  useAddProductMutation,
  useRateAndCommentProductMutation,
  useGetRatingsAndCommentsProductQuery,
  useDeleteProductMutation,
  useGetAllBrandsQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
  useEditBrandMutation,
  useGetOffersQuery,
  useAddOfferMutation,
  useContactMutation,
} = apiSlice;
