<template>
  <li
    class="editable-window"
    :class="{
      'editable-window_is-dragging': isDragging,
      'editable-window_is-resizing': isResizing,
      'editable-window_is-active': isActive
    }"
    :style="editableWindowStyle"
  >
    <div class="editable-window__controls">
      <Draggable @dragging="dragging" />
      <Resizable @resizing="resizing" debug />
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
    title: String,
    id: Number,
    resizers: Array,
    content: String,
    xMin: { type: Number, default: -Infinity },
    xMax: { type: Number, default: Infinity },
    yMin: { type: Number, default: -Infinity },
    yMax: { type: Number, default: Infinity },
    wMin: { type: Number, default: 200 },
    hMin: { type: Number, default: 200 },
    wMax: { type: Number, default: Infinity },
    hMax: { type: Number, default: Infinity },
    isActive: { type: Boolean, default: false },
    activatorHanlder: { type: Function, default: () => {} },
    resizingHandler: { type: Function, required: true },
    draggingHandler: { type: Function, required: true }
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
      if (this.y > newYMax) {
        this.setPosition({ y: newYMax });
      }
    },
    xMax(newXMax) {
      if (this.x > newXMax) {
        this.setPosition({ x: newXMax });
      }
    }
  },
  mounted: function() {},
  methods: {
    setPosition({ x, y }) {
      x = this.xMin >= x ? this.xMin : x >= this.xMax ? this.xMax : x;
      y = this.yMin >= y ? this.yMin : y >= this.yMax ? this.yMax : y;

      this.draggingHandler({ x, y, id: this.id });
    },
    setSize({ w, h }) {
      w = this.wMin >= w ? this.wMin : w >= this.wMax ? this.wMax : w;
      h = this.hMin >= h ? this.hMin : h >= this.hMax ? this.hMax : h;

      this.resizingHandler({ w, h, id: this.id });
    },
    dragging(info) {
      switch (info.stage) {
        case "start": {
          this.isDragging = true;
          this.activatorHanlder({ id: this.id });

          break;
        }
        case "dragging": {
          const { xDir, yDir } = info;
          const x = this.x + xDir;
          const y = this.y + yDir;

          this.setPosition({ x, y });
          break;
        }
        case "end": {
          this.isDragging = false;

          break;
        }
      }
    },
    resizing(info) {
      switch (info.stage) {
        case "start": {
          this.initialX = this.x;
          this.initialY = this.y;
          this.initialWidth = this.width;
          this.initialHeight = this.height;
          this.isResizing = true;
          this.activatorHanlder({ id: this.id });

          break;
        }
        case "end": {
          this.isResizing = false;

          break;
        }
        case "resizing": {
          const { xDir, yDir, resizer } = info;
          let w = this.w + xDir;
          let h = this.h + yDir;
          let x = this.x;
          let y = this.y;

          switch (resizer) {
            case RESIZER_TOP_LEFT: {
              y -= yDir;
              x -= xDir;

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
              y -= yDir;
              x += xDir;

              if (y >= this.yMin && x <= this.xMax && h >= this.hMin) {
                this.setSize({ w, h });
                this.setPosition({ y });
              }

              break;
            }

            case RESIZER_BOTTOM_LEFT: {
              y += yDir;
              x -= xDir;

              /* if (h >= this.hMin) {
                this.setSize({ h });
              }

              if (w > this.wMin) {
                this.setSize({ w });

                if (x > this.xMin) this.setPosition({ x });
              } */
              if (x >= this.xMin && y <= this.yMax && w >= this.wMin) {
                this.setSize({ w, h });
                this.setPosition({ x });
              }

              break;
            }

            case RESIZER_BOTTOM_RIGHT: {
              y += yDir;
              x += xDir;

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
              y -= yDir;

              if (y >= this.yMin && h >= this.hMin) {
                this.setSize({ h });
                this.setPosition({ y });
              }

              break;
            }
            case RESIZER_BOTTOM: {
              y += yDir;

              if (y <= this.yMax && h >= this.hMin) {
                this.setSize({ h });
              }
              break;
            }
            case RESIZER_LEFT: {
              break;
            }
            case RESIZER_RIGHT: {
              x += xDir;

              if (x <= this.xMax && w >= this.wMin) {
                this.setSize({ w });
              }

              break;
            }
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

<style>
.editable-window {
  position: absolute;
  display: inline-block;
  border: 1px solid rgb(172, 172, 172);
  border-radius: 5px;
  transition: box-shadow 0.2s;
  background-color: #fff;
}

.editable-window_is-active {
  z-index: 100;
  border: 1px solid rgb(47, 47, 47);
}

.editable-window_is-dragging {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.editable-window__controls {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.editable-window__content {
  user-select: none;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
</style>
