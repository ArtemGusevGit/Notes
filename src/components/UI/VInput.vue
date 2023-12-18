<script>
import { ref } from "vue";
import passwordOffIcon from "@/assets/icons/toggle-password-off-icon.svg";
import passwordOnIcon from "@/assets/icons/toggle-password-on-icon.svg";

export default {
  props: {
    label: String,
    placeholder: String,
    type: String,
    errorMessage: Array,
    showCounter: Boolean,
    maxLength: Number,
  },
  methods: {
    updateValue(event) {
      this.inputValue = event.target.value;
      this.$emit("input", event.target.value);
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
  setup() {
    const inputValue = ref("");
    const showPassword = ref(false);

    return {
      inputValue,
      showPassword,
      passwordOnIcon,
      passwordOffIcon,
    };
  },
};
</script>

<template>
  <div class="custom-input">
    <label class="custom-input__label">{{ label }}</label>
    <input
      :type="showPassword ? 'text' : type"
      :placeholder="placeholder"
      @input="updateValue"
    />
    <div v-if="showCounter" class="custom-input__counter">
      {{ inputValue.length }} / {{ maxLength }}
    </div>
    <div class="toggle-password" @click="togglePassword">
      <img
        v-if="type === 'password'"
        :src="showPassword ? passwordOnIcon : passwordOffIcon"
        alt="icon"
      />
    </div>
    <div v-if="errorMessage">
      <div class="custom-input__error">{{ errorMessage[0] }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
input {
  padding: 22px 58px 22px 28px;
  border-radius: 36px;
  border: none;
  transition: $transition-base;
  border: 2px solid transparent;
  width: 100%;

  &:focus {
    outline: none;
  }

  &:hover {
    border: 2px solid $green-light;
  }

  &::placeholder {
    color: $gray;
    font-size: 18px;
  }
}

.custom-input {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 24px;

  &__label {
    color: $gray;
    margin-bottom: 0.5rem;
    margin-left: 1.5rem;
  }

  &__error {
    color: #ff7461;
    margin-top: 0.5rem;
    margin-left: 1.5rem;
    margin-right: 4rem;
  }

  &__counter {
    color: $gray;
    position: absolute;
    right: 30px;
    top: 101px;
  }
}

.toggle-password {
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: 57px;
}
</style>
