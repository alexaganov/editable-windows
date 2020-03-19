<template>
  <div
    @mouseup="endResize"
    @mousemove="resize"
    @mouseleave="endResize"
    class="resizer"
    :class="{'resizer_resizing': isResizing}"
    :style="resizerStyle"
  >
    <div
      :class="`resizer__control resizer__control_${type}`"
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
export const RESIZER_TYPES = [
  RESIZER_TOP_LEFT,
  RESIZER_TOP_RIGHT,
  RESIZER_BOTTOM_LEFT,
  RESIZER_BOTTOM_RIGHT
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
      default: 30
    },
    onResize: {
      type: Function,
      required: true
    }
  },
  computed: {
    resizerStyle() {
      const [vertical, horizontal] = this.type.split("-");
      const offset = -(this.size / 2 + this.outer);

      return {
        padding: `${this.outer}px`,
        [vertical]: `${offset}px`,
        [horizontal]: `${offset}px`
      };
    },
    controlStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    }
  },
  methods: {
    startResize(e) {
      if (e.target.classList.contains("resizer__control")) {
        this.isResizing = true;
        this.initialX = e.clientX;
        this.initialY = e.clientY;
      }
    },
    endResize() {
      this.isResizing = false;
    },
    resize(e) {
      if (this.isResizing) {
        let xDir = e.clientX - this.initialX;
        let yDir = e.clientY - this.initialY;

        switch (this.type) {
          case RESIZER_TOP_LEFT: {
            xDir = -xDir;
            yDir = -yDir;
            break;
          }

          case RESIZER_TOP_RIGHT: {
            yDir = -yDir;
            break;
          }

          case RESIZER_BOTTOM_LEFT: {
            xDir = -xDir;
            break;
          }

          case RESIZER_BOTTOM_RIGHT: {
            break;
          }
        }

        xDir = xDir + 0;
        yDir = yDir + 0;

        this.onResize({
          xDir,
          yDir,
          resizer: this.type,
          eventType: "resize"
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

.resizer__control {
  background-color: red;
}

.resizer__control_top-left {
  cursor: nwse-resize;
}

.resizer__control_top-right {
  cursor: nesw-resize;
}

.resizer__control_bottom-left {
  cursor: nesw-resize;
}

.resizer__control_bottom-right {
  cursor: nwse-resize;
}
</style>
