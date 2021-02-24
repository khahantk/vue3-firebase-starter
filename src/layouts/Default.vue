<template>
  <div class="dashboard">
    <nav class="fixed-top bg-gray-800" v-if="showMenu">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex flex-1 justify-around items-center">
            <div class="flex-shrink-0 text-white text-bold">
              <router-link to="/" class="font-semibold text-white"
                >Vue3 Firebase Starter</router-link
              >
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <Menu />
              </div>
            </div>
          </div>

          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button
              @click="toggleMenu()"
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        id="m-nav-container"
        class="md:hidden"
        :class="showMobileMenu ? 'block' : 'hidden'"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Menu />
        </div>
      </div>
    </nav>
    <main>
      <div class="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-2 py-3 pt-16 md:px-4 md:py-6 md:pt-20 sm:px-0">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import { onMounted, onUnmounted, ref } from "vue";
export default {
  inject: ["store"],
  components: {
    Menu,
  },
  setup() {
    const showMobileMenu = ref(false);
    const showMenu = ref(true);
    const toggleMenu = () => {
      showMobileMenu.value = !showMobileMenu.value;
    };
    const clickMenu = (event) => {
      const element = document.getElementById("m-nav-container");
      if (!element) {
        return;
      }
      const isVisible = !(window.getComputedStyle(element).display === "none");
      const isContain = element.contains(event.target);
      // console.log({ event, isVisible, isContain })
      if (isVisible && showMobileMenu.value && isContain) {
        showMobileMenu.value = false;
      }
    };
    const onResize = () => {
      showMobileMenu.value = false;
    };
    const onScroll = () => {};
    onMounted(() => {
      document.addEventListener("click", clickMenu);
      window.addEventListener("resize", onResize);
      document.addEventListener("scroll", onScroll);
    });
    onUnmounted(() => {
      document.removeEventListener("click", clickMenu);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("scroll", onScroll);
    });
    return {
      showMobileMenu,
      toggleMenu,
      showMenu,
    };
  },
};
</script>