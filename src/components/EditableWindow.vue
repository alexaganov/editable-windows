<template>
  <li
    class="editable-window"
    :class="{
      'editable-window_is-dragging': isDragging,
      'editable-window_is-resizing': isResizing,
      'editable-window_is-active': isActive
    }"
    :style="editableWindowStyle"
    :title="name"
  >
    <div class="editable-window__controls">
      <Draggable @dragging="dragging" />
      <Resizable
        @start-resizing="onStartResizing"
        @resizing="onResizing"
        @end-resizing="onEndResizing"
      />
    </div>
    <div class="editable-window__content">
      <div class="editable-window__header"></div>
      <div class="editable-window__body">{{ this.content }}</div>
    </div>
  </li>
</template>

<script>
import Draggable from "./Draggable";
import Resizable from "./Resizable";
import {
  RESIZER_TOP_LEFT,
  RESIZER_TOP_RIGHT,
  RESIZER_BOTTOM_LEFT,
  RESIZER_BOTTOM_RIGHT,
  RESIZER_TOP,
  RESIZER_BOTTOM,
  RESIZER_LEFT,
  RESIZER_RIGHT
} from "./Resizer";

export default {
  name: "EditableWindow",
  components: {
    Draggable,
    Resizable
  },
  props: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    w: { type: Number, default: 200 },
    h: { type: Number, default: 200 },
    name: String,
    id: Number,
    resizers: Array,
    content: String,
    walls: Boolean,
    xMin: { type: Number, default: -Infinity },
    xMax: { type: Number, default: Infinity },
    yMin: { type: Number, default: -Infinity },
    yMax: { type: Number, default: Infinity },
    wMin: { type: Number, default: 200 },
    hMin: { type: Number, default: 200 },
    wMax: { type: Number, default: Infinity },
    hMax: { type: Number, default: Infinity },
    isActive: { type: Boolean, default: false },
    handleActivation: { type: Function, default: () => {} },
    handleResizing: { type: Function, required: true },
    handleDragging: { type: Function, required: true }
  },
  computed: {
    editableWindowStyle() {
      return {
        width: `${this.w}px`,
        height: `${this.h}px`,
        transform: `translate(${this.x}px, ${this.y}px)`
      };
    }
  },
  watch: {
    yMax(newYMax) {
      if (this.y >= newYMax) {
        this.setPosition({ y: newYMax });
      }
    },
    xMax(newXMax) {
      if (this.x >= newXMax) {
        this.setPosition({ x: newXMax });
      }
    }
  },
  mounted: function() {},
  methods: {
    setPosition({ x = this.x, y = this.y }) {
      this.handleDragging({ x, y, id: this.id });
    },
    setSize({ w = this.w, h = this.h }) {
      this.handleResizing({ w, h, id: this.id });
    },
    isResizable(w, h) {
      return (
        w >= this.wMin && w <= this.wMax && h >= this.hMin && h <= this.hMax
      );
    },
    isDraggable(x, y) {
      return (
        !this.walls ||
        (x >= this.xMin && x <= this.xMax && y >= this.yMin && y <= this.yMax)
      );
    },
    dragging(info) {
      switch (info.stage) {
        case "start": {
          this.isDragging = true;
          this.handleActivation({ id: this.id });

          break;
        }
        case "dragging": {
          const { xDir, yDir } = info;
          const x = this.x + xDir;
          const y = this.y + yDir;

          if (this.isDraggable(x, y)) {
            this.setPosition({ x, y });
          }

          break;
        }
        case "end": {
          this.isDragging = false;

          break;
        }
      }
    },
    onStartResizing() {
      this.initialX = this.x;
      this.initialY = this.y;
      this.isResizing = true;

      this.handleActivation({ id: this.id });
    },
    onEndResizing() {
      this.isResizing = false;
    },
    onResizing(info) {
      const { xDir, yDir, resizer } = info;
      let w = this.w + xDir;
      let h = this.h + yDir;

      switch (resizer) {
        case RESIZER_TOP_LEFT: {
          const x = this.x - xDir;
          const y = this.y - yDir;

          if (
            y >= this.yMin &&
            x >= this.xMin &&
            h >= this.hMin &&
            w >= this.wMin
          ) {
            this.setSize({ w, h });
            this.setPosition({ y, x });
          }

          break;
        }

        case RESIZER_TOP_RIGHT: {
          const x = this.x + xDir;
          const y = this.y - yDir;

          if (
            y >= this.yMin &&
            x <= this.xMax &&
            h >= this.hMin &&
            w >= this.wMin
          ) {
            this.setSize({ w, h });
            this.setPosition({ y });
          }

          break;
        }

        case RESIZER_BOTTOM_LEFT: {
          const x = this.x - xDir;
          const y = this.y - yDir;

          if (
            x >= this.xMin &&
            y <= this.yMax &&
            w >= this.wMin &&
            h >= this.hMin
          ) {
            this.setSize({ w, h });
            this.setPosition({ x });
          }

          break;
        }

        case RESIZER_BOTTOM_RIGHT: {
          const x = this.x + xDir;
          const y = this.y + yDir;

          if (
            y <= this.yMax &&
            x <= this.xMax &&
            h >= this.hMin &&
            w >= this.wMin
          ) {
            this.setSize({ w, h });
          }

          break;
        }
        case RESIZER_TOP: {
          const y = this.y - yDir;

          if (y > this.yMin && h > this.hMin) {
            this.setSize({ h });
            this.setPosition({ y });
          }

          break;
        }
        case RESIZER_BOTTOM: {
          const y = this.y + yDir;

          if (y <= this.yMax && h >= this.hMin) {
            this.setSize({ h });
          }
          break;
        }
        case RESIZER_LEFT: {
          const x = this.x - xDir;

          if (x >= this.xMin && w >= this.wMin && x <= this.xMax) {
            this.setSize({ w });
            this.setPosition({ x });
          }
          break;
        }
        case RESIZER_RIGHT: {
          const x = this.x + xDir;

          if (x <= this.xMax && w >= this.wMin) {
            this.setSize({ w });
          }

          break;
        }
      }
    }
  },
  data: function() {
    return {
      initialX: 0,
      initialY: 0,
      outer: 200,
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
    // box-shadow: inset 0 0 0 5px transparentize($color-primary, 0.7);
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
