<script>
import Hero from "@/components/Headers/Hero.vue";
import Produk from "@/components/Etalase/Produk.vue";
import Testimonial from "@/components/Testimonial/Testimonial.vue";
export default{
  components:{
    Hero,
    Produk,
    Testimonial
  },
  methods: {
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
      this.$emit('updateCart', cartCount);
    },
  }
}
</script>

<template>
  <div class="container mx-auto divide-y divide-y-reverse">
    <Hero />
    <Produk id="produk" @addToCart="updateCartCount"/>
    <Testimonial />
  </div>
</template>
