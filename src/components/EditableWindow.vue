<template>
  <Moveable
    class="editable-window"
    :tag="tag"
    :class="{
      'editable-window_is-dragging': isDragging,
      'editable-window_is-resizing': isResizing,
      'editable-window_is-active': isActive
    }"
    :initial-x="initialX"
    :initial-y="initialY"
    :initial-width="initialWidth"
    :initial-height="initialHeight"
    :min-x="minX"
    :min-y="minY"
    :resizers="resizers"
    @start-resizing="onStartResizing"
    @resizing="onResizing"
    @end-resizing="onEndResizing"
    @start-dragging="onStartDragging"
    @dragging="onDragging"
    @end-dragging="onEndDragging"
    :title="name"
  >
    <div class="editable-window__content">
      <div class="editable-window__header"></div>
      <div class="editable-window__body">{{ this.content }}</div>
    </div>
  </Moveable>
</template>

<script>
import Moveable from "./Moveable";
import { SET_ACTIVE } from "../store/actions-types";

export default {
  name: "EditableWindow",
  components: {
    Moveable
  },
  props: {
    tag: String,
    initialX: Number,
    initialY: Number,
    initialWidth: Number,
    initialHeight: Number,
    name: String,
    id: Number,
    resizers: [Array, String],
    content: String,
    walls: Boolean,
    minX: Number,
    maxX: Number,
    minY: Number,
    maxY: Number,
    minWidth: Number,
    maxWidth: Number,
    minHeight: Number,
    maxHeight: Number,
    isActive: Boolean
  },
  mounted() {},
  methods: {
    onStartDragging(data) {
      this.isDragging = true;
      this.$emit("start-dragging", data);
    },
    onDragging(data) {
      this.$emit("dragging", data);
    },
    onEndDragging(data) {
      this.isDragging = false;
      this.$emit("end-dragging", data);
    },
    onStartResizing(data) {
      this.isResizing = true;
      this.$emit("start-resizing", data);
    },
    onResizing(data) {
      this.$emit("resizing", data);
    },
    onEndResizing(data) {
      this.isResizing = false;
      this.$emit("end-resizing", data);
    }
  },
  data() {
    return {
      isDragging: false,
      isResizing: false
    };
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.editable-window {
  position: absolute;
  display: inline-block;
  border: 1px solid $color-primary-dark;
  border-radius: 2px;
  transition: box-shadow 0.2s;
  background-color: $color-secondary-dark;
  color: $text-color-primary-dark;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  &_is-active {
    z-index: 100;
    border: 1px solid $text-color-primary;
    color: $text-color-primary;
  }

  &_is-dragging {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }

  &__controls {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &__content {
    user-select: none;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }
}
</style>
