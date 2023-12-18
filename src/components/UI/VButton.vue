<script>
import enterIcon from "@/assets/icons/btn-enter-icon.svg";
import closeIcon from "@/assets/icons/btn-close-icon.svg";
import addIcon from "@/assets/icons/btn-add-icon.svg";
import loadIcon from "@/assets/icons/btn-load-icon.gif";

export default {
  props: {
    fullWidth: Boolean,
    disabled: Boolean,
    type: String,
    showEnterIcon: Boolean,
    showCloseIcon: Boolean,
    showAddIcon: Boolean,
    showLoadIcon: Boolean,
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
  setup() {
    return { enterIcon, closeIcon, addIcon, loadIcon };
  },
};
</script>

<template>
  <div class="custom-btn">
    <button
      :type="type"
      :disabled="disabled"
      :class="[{ 'full-width': fullWidth }, { 'icon-shadow': showAddIcon }]"
      @click="handleClick"
    >
      <img v-if="showEnterIcon" :src="enterIcon" alt="icon" />
      <img v-if="showCloseIcon" :src="closeIcon" alt="icon" />
      <img v-if="showAddIcon" :src="addIcon" alt="icon" />
      <img v-if="showLoadIcon" :src="loadIcon" alt="icon" />
      <slot> </slot>
    </button>
  </div>
</template>

<style scoped lang="scss">
button {
  border-radius: 2rem;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: $transition-base;
  background: $green-light;
  color: $white;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  min-height: 3.6rem;
  justify-content: center;

  &:hover {
    background: $green-middle;
  }

  &:active {
    background: $green-dark;
  }

  &:disabled {
    background: $white;
    color: $gray;
    pointer-events: none;
  }
}

.full-width {
  width: 100%;
}

.icon-shadow {
  box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);
}
</style>
