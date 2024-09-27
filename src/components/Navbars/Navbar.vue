<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="flex flex-wrap justify-center items-center mx-auto p-4 space-x-12"
    >
      <a
        href="https://flowbite.com"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <img
          src="/src/assets/img/frame 2.png"
          class="h-8"
          alt="Flowbite Logo"
        />
      </a>
      <form class="flex items-center ">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="absolute inset-y-2 start-2 flex items-center pointer-events-none"
          ></div>
          <input
            type="text"
            id="simple-search"
            class="p-2.5 ps-32 mx-auto w-full text-sm text-center rounded-lg text-gray-900"
            placeholder="Search branch name..."
            required
          />
        </div>
        <button
          type="submit"
          class="p-2.5 ms-2 text-sm font-medium text-black"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>
      <div class="flex items-center rtl:space-x-reverse">
        <div class="flex space-x-4 font-bold items-center">
          <p>New Product</p>
          <p>Woman</p>
          <p>Login</p>
          <p class="text-white bg-black px-4 py-2 rounded ">Sign Up</p>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import XMarkIcon from "@/components/icons/XMark.vue";
import Bars3Icon from "@/components/icons/Bar3.vue";
import CartIcon from "@/components/icons/cart.vue";
export default {
  props: {
    userchange: {
      default: false,
    },
    cartCount: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    userchange() {
      // this.getUser();
      this.checkUserLoginStatus();
    },
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Bars3Icon,
    XMarkIcon,
    CartIcon,
  },
  data() {
    return {
      navigation: [{ name: "Home", href: "/" }],
      navigation: [{ name: "Brand", href: "/" }],
      cartItemCount: 0,
      LoggedIn: false,
      user: {},
    };
  },
  created() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.LoggedIn = true;
    }
    this.loadCart();
    this.checkUserLoginStatus();
  },
  methods: {
    checkUserLoginStatus() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
        this.LoggedIn = true;
      } else {
        this.LoggedIn = false;
      }
    },
    handleUserUpdate(user) {
      this.user = user;
      this.LoggedIn = !!user;
    },
    loadCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cartItemCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
  },
};
</script>
