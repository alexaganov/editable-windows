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
    :min-width="minWidth"
    :min-height="minHeight"
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
      <div class="editable-window__header">
        <ControlButton title="Edit">
          <EditIcon size="2x" stroke-width="1" />
        </ControlButton>
      </div>
      <div class="editable-window__body">{{ this.content }}</div>
    </div>
  </Moveable>
</template>

<script>
import Moveable from "./Moveable";
import ControlButton from "./ControlButton";
import { EditIcon } from "vue-feather-icons";

export default {
  name: "EditableWindow",
  components: {
    Moveable,
    ControlButton,
    EditIcon
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
      this.$emit("start-dragging", this.id, data);
    },
    onDragging(data) {
      this.$emit("dragging", this.id, data);
    },
    onEndDragging(data) {
      this.isDragging = false;
      this.$emit("end-dragging", this.id, data);
    },
    onStartResizing(data) {
      this.isResizing = true;
      this.$emit("start-resizing", this.id, data);
    },
    onResizing(data) {
      this.$emit("resizing", this.id, data);
    },
    onEndResizing(data) {
      this.isResizing = false;
      this.$emit("end-resizing", this.id, data);
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
  background-color: $color-secondary;
  color: $text-color-primary-dark;
  transition: box-shadow 0.5s, border 0.5s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  &_is-active {
    z-index: 100;
    border: 1px solid $text-color-primary;
    color: $text-color-primary;
    box-shadow: 0 0 20px -5px $color-primary;
  }

  &_is-resizing,
  &_is-dragging {
    // transition: none;
  }

  &_is-resizing {
    // transition: width 0s, height 0s;
  }

  &__header {
    z-index: 100;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    pointer-events: all;
    opacity: 0;
    transition: all 0.2s;
  }

  &_is-active:hover &__header {
    opacity: 1;
  }

  &__content {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  &__body {
    width: 100%;
    height: 100%;
  }
}
</style>
