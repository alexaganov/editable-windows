<template>
  <div
    @mouseup="endResize"
    @mousemove="resize"
    @mouseleave="endResize"
    :class="[
      'resizer',
      { 'resizer_is-resizing': isResizing, 
      resizer_debug: debug },
      `resizer_${type}`
    ]"
    :style="resizerResizingStyle"
  >
    <div
      :class="`resizer__control resizer_${type}`"
      @mousedown.stop.prevent="startResize"
      :style="controlStyle"
    ></div>
  </div>
</template>

<script>
export const RESIZER_TOP_LEFT = "top-left";
export const RESIZER_TOP_RIGHT = "top-right";
export const RESIZER_BOTTOM_LEFT = "bottom-left";
export const RESIZER_BOTTOM_RIGHT = "bottom-right";
export const RESIZER_RIGHT = "right";
export const RESIZER_LEFT = "left";
export const RESIZER_TOP = "top";
export const RESIZER_BOTTOM = "bottom";

export const RESIZER_TYPES = [
  RESIZER_TOP_LEFT,
  RESIZER_TOP_RIGHT,
  RESIZER_BOTTOM_LEFT,
  RESIZER_BOTTOM_RIGHT,
  RESIZER_RIGHT,
  RESIZER_LEFT,
  RESIZER_TOP,
  RESIZER_BOTTOM
];

export default {
  name: "Resizer",
  props: {
    type: {
      type: String,
      validator: function(value) {
        return RESIZER_TYPES.indexOf(value) !== -1;
      },
      default: "top-left"
    },
    size: {
      type: Number,
      default: 10
    },
    outer: {
      type: Number,
      default: 200
    },
    debug: Boolean
  },
  computed: {
    resizerResizingStyle() {
      const offset = -(this.isResizing ? this.outer : 0);
      let style = this.isResizing ? { padding: `${this.outer}px` } : {};

      switch (this.type) {
        case RESIZER_TOP_LEFT:
        case RESIZER_TOP_RIGHT:
        case RESIZER_BOTTOM_LEFT:
        case RESIZER_BOTTOM_RIGHT: {
          const [vertical, horizontal] = this.type.split("-");

          style[vertical] = style[horizontal] = `${offset}px`;
          break;
        }

        case RESIZER_LEFT: {
          style["left"] = style["top"] = `${offset}px`;
          break;
        }
        case RESIZER_RIGHT:
          style["right"] = style["top"] = `${offset}px`;
          break;
        case RESIZER_TOP:
          style["top"] = style["left"] = `${offset}px`;
          break;
        case RESIZER_BOTTOM:
          style["bottom"] = style["left"] = `${offset}px`;
          break;
      }

      return style;
    },
    controlStyle() {
      const style = {};

      switch (this.type) {
        case RESIZER_TOP_LEFT:
        case RESIZER_TOP_RIGHT:
        case RESIZER_BOTTOM_LEFT:
        case RESIZER_BOTTOM_RIGHT: {
          style["width"] = style["height"] = `${this.size}px`;
          break;
        }

        case RESIZER_LEFT:
        case RESIZER_RIGHT: {
          style["width"] = `${this.size}px`;
          break;
        }
        case RESIZER_TOP:
        case RESIZER_BOTTOM: {
          style["height"] = `${this.size}px`;

          break;
        }
      }

      return style;
    }
  },
  methods: {
    startResize(e) {
      if (e.target.classList.contains("resizer__control")) {
        this.isResizing = true;
        this.initialX = e.clientX;
        this.initialY = e.clientY;

        this.$emit("resizing", { stage: "start" });
      }
    },
    endResize() {
      this.isResizing = false;
      this.$emit("resizing", { stage: "end" });
    },
    resize(e) {
      if (this.isResizing) {
        let xDir = 0;
        let yDir = 0;

        switch (this.type) {
          case RESIZER_TOP_LEFT:
            xDir += this.initialX - e.clientX;
            yDir += this.initialY - e.clientY;
            break;

          case RESIZER_TOP_RIGHT:
            xDir += e.clientX - this.initialX;
            yDir += this.initialY - e.clientY;
            break;

          case RESIZER_BOTTOM_LEFT:
            xDir += this.initialX - e.clientX;
            yDir += e.clientY - this.initialY;
            break;

          case RESIZER_BOTTOM_RIGHT:
            xDir += e.clientX - this.initialX;
            yDir += e.clientY - this.initialY;
            break;

          case RESIZER_RIGHT:
            xDir += e.clientX - this.initialX;
            break;

          case RESIZER_LEFT:
            xDir += this.initialX - e.clientX;
            break;

          case RESIZER_TOP:
            yDir += this.initialY - e.clientY;
            break;

          case RESIZER_BOTTOM:
            yDir += e.clientY - this.initialY;
            break;
        }

        this.$emit("resizing", {
          xDir,
          yDir,
          resizer: this.type,
          stage: "resizing"
        });

        this.initialX = e.clientX;
        this.initialY = e.clientY;
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
}

.resizer_debug {
  background-color: rgba(0, 255, 26, 0.4);
}

.resizer_debug .resizer__control {
  border: 1px solid #000;
  background-color: rgba(255, 0, 0, 1);
}

.resizer_top,
.resizer_bottom {
  /* left: 0;
  right: 0;
  margin: auto; */
  width: 100%;
}

.resizer_left,
.resizer_right {
  /* top: 0;
  bottom: 0;
  margin: auto; */
  height: 100%;
}

.resizer_top,
.resizer_bottom,
.resizer_left,
.resizer_right {
  z-index: 10;
}

.resizer_top-left,
.resizer_top-right,
.resizer_bottom-left,
.resizer_bottom-right {
  z-index: 20;
}

.resizer_is-resizing {
  z-index: 30;
}

.resizer_top {
  cursor: n-resize;
}

.resizer_bottom {
  cursor: s-resize;
}

.resizer_left {
  cursor: w-resize;
}

.resizer_right {
  cursor: e-resize;
}

.resizer_top-left {
  cursor: nwse-resize;
}

.resizer_top-right {
  cursor: nesw-resize;
}

.resizer_bottom-left {
  cursor: nesw-resize;
}

.resizer_bottom-right {
  cursor: nwse-resize;
}
</style>
