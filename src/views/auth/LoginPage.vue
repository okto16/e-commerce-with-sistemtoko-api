<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 rounded-xl bg-gradient-to-b from-transparent from-2% via-sky-200 via-50% via-emerald-100 to-90%"
  >
    <div
      class="sm:mx-auto sm:w-full sm:max-w-sm border p-6 bg-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          @submit.prevent="handleLogin('employee')"
          class="space-y-6"
          action="#"
          method="POST"
        >
          <div class="flex justify-center">
            <GoogleLogin
              :callback="callback"
              prompt
              auto-login
              class="w-full"
            />
          </div>
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
              v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required="true"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
              <div class="text-sm">
                <a
                  href="#"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >Forgot password?</a
                >
              </div>
            </div>
            <div class="mt-2">
              <input
              v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required="true"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p v-if="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
import { login } from "@/helpers/apiService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      LoggedIn: false,
      user: {}
    };
  },
  methods: {
    async handleLogin(role) {
      let endpoint;
      if (role === 'employee') {
        endpoint = '/login/employee';
      } else if (role === 'customer') {
        endpoint = '/login/customer';
      }

      try {
        console.log(`Mencoba login sebagai ${role} dengan:`, this.email, this.password);
        const response = await login(endpoint, this.email, this.password);
        this.LoggedIn = true;
        console.log('Login berhasil', response);

        // Log seluruh respons untuk memeriksa strukturnya
        console.log('Respons lengkap:', response);

        // Set data user berdasarkan role
        this.user = response.data;  // Sesuaikan ini berdasarkan struktur respons sebenarnya

        // Simpan data user ke localStorage
        localStorage.setItem('user', JSON.stringify(this.user));
        // Arahkan atau tindakan lain setelah login berhasil
        this.$router.push('/');
        this.$emit("updateUser");
      } catch (error) {
        this.error = 'Login gagal. Silakan periksa kredensial Anda.';
        console.error('Kesalahan saat login:', error);
      }
    },
    callback(response) {
      console.log("Sudah login");
      this.LoggedIn = true;
      console.log(response);

      this.user = decodeCredential(response.credential);

      localStorage.setItem("user", JSON.stringify(this.user));
      this.$router.push('/');
      this.$emit("updateUser");
      // this.$router.push({name: "home"})
      // window.location.href = "/";
    //   const credential = response.credential;

    //   // Mengirim credential ke backend untuk verifikasi dan pembuatan token
    //   try {
    //     const result = await loginWithGoogle(credential);
    //     this.user = result.user;
    //     localStorage.setItem('auth_token', result.token);
    //     localStorage.setItem('user', JSON.stringify(this.user));
    //     window.location.href = "/";
    //   } catch (error) {
    //     console.error('Login with Google failed:', error);
    //     alert('Login with Google failed. Please try again.');
    //   }
    }
  }
};


</script>