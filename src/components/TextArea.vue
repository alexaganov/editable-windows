<template>
  <div class="text-area">
    <div class="text-area__inner">
      <textarea
        class="text-area__textarea"
        placeholder="Enter your text"
        @input="$emit('input', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextArea"
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.text-area {
  &__inner {
    height: inherit;
  }

  &__textarea {
    display: block;
    height: inherit;
    width: 100%;
    background-color: $color-secondary;
    border: none;
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    resize: none;
    color: $color-primary;
    font-family: inherit;
    padding: 1em 1.2em;
    line-height: 1.4em;
    font-size: 0.875em;

    &::placeholder {
      color: $color-secondary-light;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>