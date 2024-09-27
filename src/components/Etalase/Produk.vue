<template>
  <div
    class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
  >
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 text-center">Featured Products</h2>
    <div
      class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="group"
      >
        <div
          class="w-full max-w-sm bg-white"
        >
          <img
            class="p-8 rounded-lg bg-gray-200"
            :src="product.photo"
            :alt="product.name"
          />
          <div class="px-5 pb-5">
            <h5
              class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              {{ product.name }}
            </h5>
            <div class="flex items-center mt-2.5 mb-5">
              <div
                class="flex items-center space-x-1 rtl:space-x-reverse"
              ></div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-1xl font-bold bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded">{{product.currency}}{{ product.childs[0]?.buyPrice}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProducts } from "@/helpers/apiService";
export default {
  components: {
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts(this.products);
  },
  methods: {
    async fetchProducts() {
      try {
        const products = await getProducts();
        this.products = products.data.aaData;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>
