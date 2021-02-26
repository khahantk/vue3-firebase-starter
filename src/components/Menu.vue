<template>
  <router-link to="/" class="menuItem">Home</router-link>
  <router-link to="/about" class="menuItem">About</router-link>
  <router-link to="/contact" class="menuItem">Contact</router-link>
  <template v-if="isLoggin">
    <router-link to="/myaccount" class="menuItem">My Account</router-link>
    <a class="menuItem cursor-pointer" @click="logout">Logout</a>
  </template>
  <template v-else>
    <router-link to="/login" class="menuItem">Login</router-link>
    <router-link to="/signup" class="menuItem">Sign up</router-link>
  </template>
</template>
  <script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const logout = async () => {
      await store.dispatch("user/logout");
      router.replace("/login");
    };
    return {
      isLoggin: computed(() => {
        return store.state.user.loggedIn;
      }),
      logout,
    };
  },
};
</script>

  <style scoped>
.menuItem {
  @apply px-3 py-2 rounded-md text-base block md:inline-block font-medium text-white;
}
</style>

