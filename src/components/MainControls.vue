<template>
  <nav class="main-controls">
    <ul class="main-controls__list">
      <li class="main-controls__item">
        <ControlButton
          class="main-controls__control"
          title="Save"
          :disabled="isSaveBtnDisabled"
          :handleClick="onSave"
        >
          <SaveIcon class="main-controls__control-icon" size="2.5x" stroke-width="1" />
        </ControlButton>
      </li>
      <li class="main-controls__item">
        <ControlButton
          class="main-controls__control main-controls__control-undo"
          title="Undo"
          :disabled="isUndoBtnDisabled"
          :handleClick="onUndo"
        >
          <RotateCcwIcon class="main-controls__control-icon" size="2.5x" stroke-width="1" />
        </ControlButton>
      </li>

      <li class="main-controls__item">
        <ControlButton
          class="main-controls__control main-controls__control-redo"
          title="Redo"
          :disabled="isRedoBtnDisabled"
          :handleClick="onRedo"
        >
          <RotateCwIcon class="main-controls__control-icon" size="2.5x" stroke-width="1" />
        </ControlButton>
      </li>

      <li class="main-controls__item">
        <ControlButton
          class="main-controls__control"
          title="Delete"
          :disabled="isDeleteBtnDisabled"
          :handleClick="onDelete"
        >
          <Trash2Icon class="main-controls__control-icon" size="2.5x" stroke-width="1" />
        </ControlButton>
      </li>
    </ul>
  </nav>
</template>

<script>
import ControlButton from "./ControlButton";
import { SAVE, UNDO, REDO, REMOVE_ACTIVE_WINDOW } from "../store/actions-types";
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
    Trash2Icon,
    ControlButton
  },
  computed: {
    isSaveBtnDisabled() {
      return this.$store.getters.isUndosEmpty;
    },
    isUndoBtnDisabled() {
      return this.$store.getters.isUndosEmpty;
    },
    isRedoBtnDisabled() {
      return this.$store.getters.isRedosEmpty;
    },
    isDeleteBtnDisabled() {
      return !this.$store.getters.isActiveWindowSet;
    }
  },
  mounted() {},
  methods: {
    onDelete() {
      this.$store.dispatch(REMOVE_ACTIVE_WINDOW);
    },
    onSave() {
      this.$store.dispatch(SAVE);
    },
    onUndo() {
      this.$store.dispatch(UNDO);
    },
    onRedo() {
      this.$store.dispatch(REDO);
    }
  }
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
      margin-right: 8px;
    }
  }

  &__control-undo:not(:disabled):active {
    transform: rotate(-45deg);
  }

  &__control-redo:not(:disabled):active {
    transform: rotate(45deg);
  }

  &__control-icon {
    pointer-events: none;
  }
}
</style>
