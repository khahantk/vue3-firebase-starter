<template>
  <router-link to="/" class="menuItem">Home</router-link>
  <router-link to="/about" class="menuItem">About</router-link>
  <router-link to="/contact" class="menuItem">Contact</router-link>
</template>
  <script>
export default {
  setup() {},
};
</script>

  <style scoped>
.menuItem {
  @apply px-3 py-2 rounded-md text-base block md:inline-block font-medium text-white;
}
</style>

