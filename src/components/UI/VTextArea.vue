<script>
import { ref } from "vue";
import passwordOffIcon from "@/assets/icons/toggle-password-off-icon.svg";
import passwordOnIcon from "@/assets/icons/toggle-password-on-icon.svg";

export default {
  props: {
    label: String,
    placeholder: String,
    showCounter: Boolean,
    errorMessage: Array,
    maxLength: Number,
  },
  methods: {
    updateValue(event) {
      this.inputValue = event.target.value;
      this.$emit("input", event.target.value);
    },
  },
  setup() {
    const inputValue = ref("");

    return {
      inputValue,
    };
  },
};
</script>

<template>
  <div class="custom-input">
    <label class="custom-input__label">{{ label }}</label>
    <textarea :placeholder="placeholder" @input="updateValue" />
    <div v-if="showCounter" class="custom-input__counter">
      {{ inputValue.length }} / {{ maxLength }}
    </div>
    <div v-if="errorMessage">
      <div class="custom-input__error">{{ errorMessage[0] }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
textarea {
  padding: 22px 58px 22px 28px;
  border-radius: 36px;
  border: none;
  transition: all 0.2s;
  border: 2px solid transparent;
  min-height: 15.2rem;
  resize: none;


  &:focus {
    outline: none;
  }

  &:hover {
    border: 2px solid $green-light;
  }

  &::placeholder {
    color: $gray;
    font-size: 18px;
    font-family: Montserrat, sans-serif;
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
    margin-right: 8rem;
  }

  &__counter {
    color: $gray;
    position: absolute;
    right: 30px;
    top: 283px;
  }
}

.toggle-password {
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: 50px;
}
</style>
