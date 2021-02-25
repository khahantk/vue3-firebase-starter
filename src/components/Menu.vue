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
export default {
  setup() {
    const logout = () => {};
    return {
      isLoggin: true,
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

