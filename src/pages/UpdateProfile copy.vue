<template>
  <h1>Personal Info</h1>
  <div>{{ profile }}</div>
</template>
<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import useAuth from "@/composables/auth";

export default {
  setup() {
    const store = useStore();
    const profile = ref({});
    const { getProfile } = useAuth();
    onMounted(async () => {
      const { uid: userId } = store.state.user.data;
      profile.value = await getProfile(userId);
    });
    return {
      user: computed(() => {
        return store.state.user.data;
      }),
      profile,
    };
  },
};
</script>