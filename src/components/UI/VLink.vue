<script>
export default {
  props: {
    text: String,
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="custom-link">
    <a @click="handleClick">
      <slot> </slot>
    </a>
  </div>
</template>

<style scoped lang="scss">
a {
  cursor: pointer;
  color: $green-light;
  font-weight: 700;
  transition: $transition-base;

  &:hover {
    color: $white;
  }
}
</style>
