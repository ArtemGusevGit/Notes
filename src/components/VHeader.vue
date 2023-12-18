<script>
import VButton from "@/components/UI/VButton.vue";
import VLink from "@/components/UI/VLink.vue";
import userIcon from "@/assets/icons/user-icon.svg";
import { useRouter } from "vue-router/composables";
import { useCommonStore } from "@/stores/common.js";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

export default {
  components: {
    VButton,
    VLink,
  },
  setup() {
    const commonSotre = useCommonStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const { showLoginModal } = storeToRefs(commonSotre);
    const { userData, isUserAuthenticated } = storeToRefs(authStore);
    let showTooltip = ref(false);

    const logOut = async () => {
      await authStore.logoutUser();
      if (router.currentRoute.name !== "HomeView") {
        await router.push({ name: "HomeView" });
      }
      showTooltip.value = false;
    };

    const goToMainPage = () => {
      if (router.currentRoute.name !== "HomeView") {
        router.push({ name: "HomeView" });
      }
    };

    return {
      showLoginModal,
      userIcon,
      showTooltip,
      logOut,
      userData,
      isUserAuthenticated,
      goToMainPage,
    };
  },
};
</script>

<template>
  <header class="header">
    <img
      class="header-logo"
      src="@/assets/images/mynotes-logo.png"
      alt="logo"
      @click="goToMainPage"
    />
    <div
      v-if="isUserAuthenticated"
      class="user-info"
      @click="showTooltip = !showTooltip"
    >
      <div :title="userData.userEmail" class="user-email">
        {{ userData.userEmail }}
      </div>
      <img :src="userIcon" alt="userIcon" />

      <div v-if="showTooltip" class="tooltip">
        <VLink @click="logOut">Выйти</VLink>
      </div>
    </div>
    <template v-else>
      <VButton
        :showEnterIcon="true"
        class="header-btn"
        @click="showLoginModal = !showLoginModal"
      >
        Вход
      </VButton>
    </template>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 0;
  gap: 1rem;
}

.user-info {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 2rem;
}

.user-email {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tooltip {
  z-index: 111;
  position: absolute;
  top: 70px;
  right: 0;
  background-color: $dark-middle;
  padding: 2.5rem;
  box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);
  border-radius: 0.75rem;

  &::after {
    content: "";
    position: absolute;
    top: -22px;
    right: 14px;
    border: 13px solid transparent;
    border-bottom: 13px solid $dark-middle;
  }
}

.header-logo {
  min-width: 2rem;
  cursor: pointer;
}
</style>
