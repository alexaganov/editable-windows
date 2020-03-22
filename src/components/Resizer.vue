<template>
  <div
    @mouseup="endResize"
    @mousemove="resize"
    @mouseleave="endResize"
    :class="[
      'resizer', `resizer_${type}`,
      { 
        'resizer_is-resizing': isResizing, 
        resizer_debug: debug 
      },
    ]"
    :style="resizerResizingStyle"
  >
    <div
      :class="`resizer__control resizer_${type}`"
      @mousedown.stop.prevent="startResize"
      :style="resizerControlStyle"
    ></div>
  </div>
</template>

<script>
export const POINT_TOP_LEFT = "point-top-left";
export const POINT_TOP_RIGHT = "point-top-right";
export const POINT_BOTTOM_LEFT = "point-bottom-left";
export const POINT_BOTTOM_RIGHT = "point-bottom-right";
export const LINE_RIGHT = "line-right";
export const LINE_LEFT = "line-left";
export const LINE_TOP = "line-top";
export const LINE_BOTTOM = "line-bottom";

export const RESIZER_BORDER_TYPES = [
  LINE_RIGHT,
  LINE_LEFT,
  LINE_TOP,
  LINE_BOTTOM
];

export const RESIZER_CORNER_TYPES = [
  POINT_TOP_LEFT,
  POINT_TOP_RIGHT,
  POINT_BOTTOM_LEFT,
  POINT_BOTTOM_RIGHT
];

export const RESIZER_ALL_TYPES = [
  ...RESIZER_BORDER_TYPES,
  ...RESIZER_CORNER_TYPES
];

export default {
  name: "Resizer",
  props: {
    type: {
      type: String,
      validator: function(resizerType) {
        return RESIZER_ALL_TYPES.indexOf(resizerType) !== -1;
      },
      default: POINT_TOP_LEFT
    },
    size: { type: Number, default: 10 },
    outer: { type: Number, default: 200 },
    debug: Boolean
  },
  computed: {
    resizerResizingStyle() {
      const offset = this.isResizing ? -this.outer : 0;
      const style = {
        padding: this.isResizing ? `${this.outer}px` : null
      };

      switch (this.type) {
        case POINT_TOP_LEFT:
        case LINE_TOP:
        case LINE_LEFT:
          style["top"] = style["left"] = `${offset}px`;
          break;

        case POINT_TOP_RIGHT:
        case LINE_RIGHT:
          style["top"] = style["right"] = `${offset}px`;
          break;

        case POINT_BOTTOM_RIGHT:
          style["bottom"] = style["right"] = `${offset}px`;
          break;

        case POINT_BOTTOM_LEFT:
        case LINE_BOTTOM:
          style["bottom"] = style["left"] = `${offset}px`;
          break;
      }

      return style;
    },
    resizerControlStyle() {
      const style = {};

      switch (this.type) {
        case POINT_TOP_LEFT:
        case POINT_TOP_RIGHT:
        case POINT_BOTTOM_LEFT:
        case POINT_BOTTOM_RIGHT:
          style["width"] = style["height"] = `${this.size}px`;
          break;

        case LINE_LEFT:
        case LINE_RIGHT:
          style["width"] = `${this.size}px`;
          break;

        case LINE_TOP:
        case LINE_BOTTOM:
          style["height"] = `${this.size}px`;
          break;
      }

      return style;
    }
  },
  methods: {
    startResize(e) {
      if (!this.isResizing && e.target.classList.contains("resizer__control")) {
        this.isResizing = true;
        this.initialX = e.clientX;
        this.initialY = e.clientY;

        this.$emit("start-resizing");
      }
    },
    endResize() {
      if (this.isResizing) {
        this.isResizing = false;
        this.$emit("end-resizing");
      }
    },
    resize(e) {
      if (this.isResizing) {
        let xDir = 0;
        let yDir = 0;

        switch (this.type) {
          case POINT_TOP_LEFT:
            xDir += this.initialX - e.clientX;
            yDir += this.initialY - e.clientY;
            break;

          case POINT_TOP_RIGHT:
            xDir += e.clientX - this.initialX;
            yDir += this.initialY - e.clientY;
            break;

          case POINT_BOTTOM_LEFT:
            xDir += this.initialX - e.clientX;
            yDir += e.clientY - this.initialY;
            break;

          case POINT_BOTTOM_RIGHT:
            xDir += e.clientX - this.initialX;
            yDir += e.clientY - this.initialY;
            break;

          case LINE_RIGHT:
            xDir += e.clientX - this.initialX;
            break;

          case LINE_LEFT:
            xDir += this.initialX - e.clientX;
            break;

          case LINE_TOP:
            yDir += this.initialY - e.clientY;
            break;

          case LINE_BOTTOM:
            yDir += e.clientY - this.initialY;
            break;
        }

        this.initialX = e.clientX;
        this.initialY = e.clientY;

        this.$emit("resizing", { xDir, yDir, resizer: this.type });
      }
    }
  },
  data: function() {
    return {
      initialX: 0,
      initialY: 0,
      isResizing: false
    };
  }
};
</script>

<style>
.resizer {
  position: absolute;
  box-sizing: content-box;
  pointer-events: all;
}

.resizer_debug {
  background-color: rgba(82, 255, 180, 0.5);
}

.resizer_debug .resizer__control {
  border: 1px solid #000;
  background-color: rgba(255, 82, 82, 0.5);
}

.resizer_line-top,
.resizer_line-bottom {
  width: 100%;
}

.resizer_line-left,
.resizer_line-right {
  height: 100%;
}

.resizer_line-top,
.resizer_line-bottom,
.resizer_line-left,
.resizer_line-right {
  z-index: 10;
}

.resizer_point-top-left,
.resizer_point-top-right,
.resizer_point-bottom-left,
.resizer_point-bottom-right {
  z-index: 20;
}

.resizer_is-resizing {
  z-index: 30;
}

.resizer_line-top {
  cursor: n-resize;
}

.resizer_line-bottom {
  cursor: s-resize;
}

.resizer_line-left {
  cursor: w-resize;
}

.resizer_line-right {
  cursor: e-resize;
}

.resizer_point-top-left {
  cursor: nwse-resize;
}

.resizer_point-top-right {
  cursor: nesw-resize;
}

.resizer_point-bottom-left {
  cursor: nesw-resize;
}

.resizer_point-bottom-right {
  cursor: nwse-resize;
}
</style>
