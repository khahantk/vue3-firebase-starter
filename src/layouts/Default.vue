<template>
  <div>
    <nav class="bg-white">
      <div class="max-w-lg mx-auto">
        <div class="flex items-center px-2 lg:px-8 justify-between">
          <router-link to="/" class="py-2 rounded-md text-4xl font-medium">
            Demo
          </router-link>
        </div>
      </div>
    </nav>
    <div class="border border-gray-200 w-100"></div>
    <main>
      <div class="max-w-lg mx-auto py-6 px-4 lg:px-8"><router-view /></div>
    </main>
  </div>
</template>
<script>
export default {
  setup() {
    return {};
  },
};
</script>
