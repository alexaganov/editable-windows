<template>
  <component
    class="moveable"
    :is="tag"
    :style="[
      moveableSizeStyle, 
      moveablePositionStyle
    ]"
  >
    <div class="moveable__controllers">
      <Draggable
        @start-dragging="onStartDragging"
        @dragging="onDragging"
        @end-dragging="onEndDragging"
        :outer="draggerOuter"
        :debug="debug"
      />
      <Resizable
        @start-resizing="onStartResizing"
        @resizing="onResizing"
        @end-resizing="onEndResizing"
        :resizer-outer="resizerOuter"
        :resizer-size="resizerSize"
        :resizers="resizers"
        :debug="debug"
      />
    </div>
    <div class="moveable__content">
      <slot></slot>
    </div>
  </component>
</template>

<script>
import Resizable from "./Resizable";
import Draggable from "./Draggable";
import {
  POINT_TOP_LEFT,
  POINT_TOP_RIGHT,
  POINT_BOTTOM_LEFT,
  POINT_BOTTOM_RIGHT,
  LINE_RIGHT,
  LINE_LEFT,
  LINE_TOP,
  LINE_BOTTOM
} from "./Resizer";

export default {
  name: "Moveable",
  components: {
    Resizable,
    Draggable
  },
  props: {
    tag: { type: String, default: "div" },
    initialX: { type: Number, default: 0 },
    initialY: { type: Number, default: 0 },
    initialWidth: { type: Number, default: 200 },
    initialHeight: { type: Number, default: 200 },
    resizerOuter: Number,
    resizerSize: Number,
    draggerOuter: Number,
    resizers: { type: [Array, String] },
    minX: { type: Number, default: -Infinity },
    maxX: { type: Number, default: Infinity },
    minY: { type: Number, default: -Infinity },
    maxY: { type: Number, default: Infinity },
    minWidth: { type: Number, default: 200 },
    maxWidth: { type: Number, default: Infinity },
    minHeight: { type: Number, default: 200 },
    maxHeight: { type: Number, default: Infinity },
    debug: Boolean
  },
  computed: {
    moveableSizeStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    moveablePositionStyle() {
      return {
        transform: `translate(${this.x}px, ${this.y}px)`
      };
    },
    properMaxX() {
      return Number.isFinite(this.maxX) ? this.maxX - this.width : this.maxX;
    },
    properMaxY() {
      return Number.isFinite(this.maxY) ? this.maxY - this.height : this.maxY;
    }
  },
  mounted() {},
  methods: {
    // dragging
    isDraggable(x, y) {
      return (
        x >= this.minX &&
        x <= this.properMaxX &&
        y >= this.minY &&
        y <= this.properMaxY
      );
    },
    onStartDragging() {
      this.$emit("start-dragging", { x: this.x, y: this.y });
    },
    onEndDragging() {
      this.$emit("end-dragging", { x: this.x, y: this.y });
    },
    onDragging({ xDir, yDir }) {
      const x = this.x + xDir;
      const y = this.y + yDir;

      if (this.isDraggable(x, y)) {
        this.x = x;
        this.y = y;

        this.$emit("dragging", { x: this.x, y: this.y });
      }
    },
    // resizing
    onStartResizing() {
      this.$emit("start-resizing", {
        x: this.x,
        y: this.y,
        w: this.width,
        h: this.height
      });
    },
    onEndResizing() {
      this.$emit("end-resizing", {
        x: this.x,
        y: this.y,
        w: this.width,
        h: this.height
      });
    },
    isTopLeftResizerResizable(x, y, w, h) {
      return (
        x >= this.minX &&
        y >= this.minY &&
        w >= this.minWidth &&
        h >= this.minHeight
      );
    },
    isTopResizerResizable(y, h) {
      return y >= this.minY && h >= this.minHeight;
    },

    isTopRightResizerResizable(x, y, w, h) {
      return (
        x <= this.properMaxX &&
        y >= this.minY &&
        w >= this.minWidth &&
        h >= this.minHeight
      );
    },

    isRightResizerResizable(x, w) {
      return x <= this.properMaxX && w >= this.minWidth;
    },

    isBottomRightResizerResizable(x, y, w, h) {
      return (
        x <= this.properMaxX &&
        y <= this.properMaxY &&
        w >= this.minWidth &&
        h >= this.minHeight
      );
    },

    isBottomResizerResizable(y, h) {
      return y <= this.properMaxY && h >= this.minHeight;
    },

    isBottomLeftResizerResizable(x, y, w, h) {
      return (
        x >= this.minX &&
        y <= this.properMaxY &&
        w >= this.minWidth &&
        h >= this.minHeight
      );
    },
    isLeftResizerResizable(x, w) {
      return x >= this.minX && w >= this.minWidth && x <= this.properMaxX;
    },

    onResizing({ xDir, yDir, resizer }) {
      let w = this.width + xDir;
      let h = this.height + yDir;

      switch (resizer) {
        case POINT_TOP_LEFT: {
          const x = this.x - xDir;
          const y = this.y - yDir;

          if (this.isTopLeftResizerResizable(x, y, w, h)) {
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
          }

          break;
        }

        case LINE_TOP: {
          const y = this.y - yDir;

          if (this.isTopResizerResizable(y, h)) {
            this.y = y;
            this.height = h;
          }

          break;
        }

        case POINT_TOP_RIGHT: {
          const x = this.x + xDir;
          const y = this.y - yDir;

          if (this.isTopRightResizerResizable(x, y, w, h)) {
            this.y = y;
            this.width = w;
            this.height = h;
          }

          break;
        }

        case LINE_RIGHT: {
          const x = this.x + xDir;

          if (this.isRightResizerResizable(x, w)) {
            this.width = w;
          }

          break;
        }

        case POINT_BOTTOM_RIGHT: {
          const x = this.x + xDir;
          const y = this.y + yDir;

          if (this.isBottomRightResizerResizable(x, y, w, h)) {
            this.width = w;
            this.height = h;
          }

          break;
        }

        case LINE_BOTTOM: {
          const y = this.y + yDir;

          if (this.isBottomResizerResizable(y, h)) {
            this.height = h;
          }
          break;
        }

        case POINT_BOTTOM_LEFT: {
          const x = this.x - xDir;
          const y = this.y + yDir;

          if (this.isBottomLeftResizerResizable(x, y, w, h)) {
            this.x = x;
            this.width = w;
            this.height = h;
          }

          break;
        }

        case LINE_LEFT: {
          const x = this.x - xDir;

          if (this.isLeftResizerResizable(x, w)) {
            this.x = x;
            this.width = w;
          }
          break;
        }
      }

      this.$emit("resizing", {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      });
    }
  },
  data() {
    return {
      x: this.initialX,
      y: this.initialY,
      width: this.initialWidth,
      height: this.initialHeight
    };
  }
};
</script>

<style lang="scss">
.moveable {
  position: absolute;

  &__controllers {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>