<template>
  <h1>My Account</h1>
  <div class="mt-4">Manage your account information</div>
  <div>
    <router-link to="/changepassword">Change password</router-link>
  </div>
  <div>
    <router-link to="/profile">Personal Info</router-link>
  </div>
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