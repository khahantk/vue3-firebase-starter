<template>
  <h1>My Account</h1>
  <div class="mt-4">My Account</div>
  <div>{{ user }}</div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    return {
      user: computed(() => {
        return store.state.user.data;
      }),
    };
  },
};
</script>