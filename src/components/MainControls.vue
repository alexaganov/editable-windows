<template>
  <nav class="main-controls">
    <ul class="main-controls__list">
      <li class="main-controls__item">
        <button
          @click="$emit('save')"
          class="main-controls__control"
          title="Save"
          type="button"
        >
          <SaveIcon size="2.5x" stroke-width="1" />
        </button>
      </li>
      <li class="main-controls__item">
        <button
          @click="$emit('undo')"
          class="main-controls__control"
          title="Undo"
          type="button"
        >
          <RotateCcwIcon size="2.5x" stroke-width="1" />
        </button>
      </li>

      <li class="main-controls__item">
        <button
          @click="$emit('redo')"
          class="main-controls__control"
          title="Redo"
          type="button"
        >
          <RotateCwIcon size="2.5x" stroke-width="1" />
        </button>
      </li>

      <li class="main-controls__item">
        <button
          @click="$emit('delete')"
          class="main-controls__control"
          title="Delete"
          type="button"
        >
          <Trash2Icon size="2.5x" stroke-width="1" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import {
  RotateCcwIcon,
  RotateCwIcon,
  SaveIcon,
  Trash2Icon
} from "vue-feather-icons";
export default {
  name: "MainControls",
  components: {
    RotateCcwIcon,
    RotateCwIcon,
    SaveIcon,
    Trash2Icon
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.main-controls {
  &__list {
    list-style: none;
    display: flex;
    justify-content: center;
  }

  &__item {
    &:not(:last-child) {
      margin-right: 5px;
    }
  }

  &__control {
    padding: 0.5em;
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: $color-primary;
    transition: 0.2s transform;

    &:hover {
      transform: scale(1.3);
    }

    &:active {
      transform: scale(1);
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
