import axiosInstance from "@/plugins/axios";

export const getProducts = () => {
  return axiosInstance.get(`/product`, {
  });
};
export const getCategories = () => {
  return axiosInstance.get(`/cat`, {
  });
};
export const keywords = () => {
  return axiosInstance.get(`/categories`, {
  });
};
export const getVarians = () => {
  return axiosInstance.get(`//varian/${id}`, {
  });
};
export const getProductsDetails = () => {
  return axiosInstance.get(`single/${id}`, {
  });
};
