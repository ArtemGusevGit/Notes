<script>
import VButton from "@/components/UI/VButton.vue";
import VLoginFormModal from "@/components/VLoginFormModal.vue";
import VRefFormModal from "@/components/VRegFormModal.vue";

// import HelloWorld from "@/components/HelloWorld.vue";
// import VButton from "@/components/VButton.vue";

export default {
  name: "HomeView",
  components: {
    VButton,
    VLoginFormModal,
    VRefFormModal,
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <div>
    <div class="home">
      <div class="home-left">
        <h1 class="home-left__title">Мои заметки</h1>
        <h3 class="home-left__subtitle">
          Не забывай о важном,<br />
          храни его в облаке.
        </h3>
      </div>
      <div class="home-right">
        <img src="@/assets/images/home-img.png" alt="home-img" />
      </div>
    </div>
    <VLoginFormModal />
    <VRefFormModal />
  </div>
</template>

<style lang="scss">
.home {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include media-breakpoint-down(lg) {
    flex-direction: column;
    text-align: center;
    margin-top: 2.5rem;
  }
}

.home-left__subtitle {
  margin-top: 2.5rem;
  color: $gray;

  @include media-breakpoint-down(lg) {
    margin-top: 1.25rem;
  }
}
</style>
