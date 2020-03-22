<template>
  <div class="add-editable-window">
    <form @submit.prevent="onSubmit" class="add-editable-window__form">
      <input
        type="text"
        class="add-editable-window__input"
        placeholder="Enter name of new window"
        v-model="text"
      />
      <button title="Add new" type="submit" class="add-editable-window__submit-btn">
        <PlusIcon size="2x" stroke-width="1" class="add-editable-window__submit-btn-icon" />
      </button>
    </form>
  </div>
</template>

<script>
import { PlusIcon } from "vue-feather-icons";
import { CREATE_NEW_WINDOW } from "../store/actions-types";

export default {
  name: "AddEditableWindow",
  components: {
    PlusIcon
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(CREATE_NEW_WINDOW, {
        nameOfNewWindow: this.text
      });

      if (this.text) this.text = "";
    }
  },
  data: function() {
    return {
      text: ""
    };
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.add-editable-window {
  &__form {
    display: flex;
  }

  &__input {
    width: 100%;
    border: 0;
    border-radius: 2px;
    background-color: $color-secondary;
    margin-right: 15px;
    font-size: 0.875em;
    padding: 0.8em 1.2em;
    color: $text-color-primary;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

    &::placeholder {
      color: $color-secondary-light;
      user-select: none;
    }
  }

  &__input:focus {
    outline: none;
  }

  &__submit-btn {
    cursor: pointer;
    color: $color-secondary-dark;
    border-radius: 2px;
    // border: 1px solid $color-primary;
    border: 0;
    padding: 0 0.6em;
    background: $color-primary-dark;
    transition: 0.2s all;

    &:focus {
      outline: 0;
    }

    &:hover {
      background: $color-primary;
      box-shadow: 0 0 20px -5px $color-primary;
      // color: $color-secondary-dark;
    }
  }

  &__submit-btn-icon {
    vertical-align: middle;
  }
}
</style>
