<template>
  <Disclosure as="nav" class="bg-transparent z-50" v-slot="{ open }">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="/src/assets/img/logo.jpg"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? ' text-white'
                    : 'hover:bg-emerald-50 hover:text-black',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
          <div
            class="flex space-x-4 items-center sm:relative sm:right-0 absolute right-4"
          >
            <a href="/shoppingcart">
              <CartIcon
                class="rounded-full p-0.5 h-7 w-auto hidden sm:ml-6 sm:block hover:bg-emerald-50 hover:text-black"
              />
            </a>
            <span
              v-if="cartCount > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
              >{{ cartCount }}</span
            >
          </div>
        </div>
        <ul class="justify-end items-center flex flex-wrap list-none">
          <li class="inline-block relative">
            <!-- <notification-dropdown /> -->
          </li>
        </ul>
        <form class="max-w-md mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  </Disclosure>
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
