<template>
  <li
    class="list-item"
    @mousedown.prevent="startDrag"
    @mouseup="endDrag"
    @mousemove="drag"
    @mouseleave="endDrag"
    :style="position"
    :class="{ 'list-item--active': isActive, 'list-item--dragging': isDrag }"
  >
    <div class="dragger" :style="size">
      <div class="resizers">
        <div
          v-for="resizer in activeResizers"
          :key="resizer"
          :data-type="resizer"
          :class="`resizer resizer__${resizer}`"
        ></div>
      </div>
      <div class="list-item__content">
        <div class="list-item__header"></div>
        <div class="list-item__body">
          <slot></slot>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "DraggableItem",
  components: {},
  props: {
    width: Number,
    height: Number,
    minWidth: {
      type: Number,
      default: 200
    },
    minHeight: {
      type: Number,
      default: 200
    },
    x: Number,
    y: Number,
    id: Number,
    isActive: Boolean,
    outer: {
      type: Number,
      default: 100
    },
    resizeable: {
      type: Object,
      default: function() {
        return {
          "top-left": true,
          "top-right": true,
          "bottom-left": true,
          "bottom-right": true
        };
      }
    }
  },
  computed: {
    size() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    position() {
      return {
        padding: `${this.outer}px`,
        transform: `translate(${this.x}px, ${this.y}px)`
      };
    },
    activeResizers() {
      const resizeable = [];

      for (const resizer in this.resizeable) {
        if (this.resizeable[resizer]) {
          resizeable.push(resizer);
        }
      }

      return resizeable;
    }
  },
  methods: {
    startDrag(e) {
      const dragger = e.target.closest(".dragger");

      if (dragger) {
        if (e.target.classList.contains("resizer")) {
          this.isResize = true;
          this.resizer = e.target;
          this.initialWidth = this.width;
          this.initialHeight = this.height;
        } else {
          this.isDrag = true;
        }

        this.dragger = dragger;

        const { left } = this.dragger.getBoundingClientRect();

        this.draggerInitialX = left;
      }

      const { left, top } = this.$el.getBoundingClientRect();
      const innerX = e.clientX - left;
      const innerY = e.clientY - top;

      this.originX = e.clientX;
      this.initialLeft = left;
      this.initialX = innerX;
      this.initialY = innerY;

      this.$emit("onActive", this.id);
    },
    endDrag() {
      this.isDrag = false;
      this.isResize = false;
      this.resizer = null;
      this.dragger = null;
    },
    drag(e) {
      let x = e.clientX - this.initialX;
      let y = e.clientY - this.initialY;

      if (this.isDrag) {
        const xMin = -this.outer;
        const yMin = -this.outer;
        const xMax = this.$parent.$el.offsetWidth - this.width - this.outer;
        const yMax = this.$parent.$el.offsetHeight - this.height - this.outer;

        if (x < xMin) {
          x = xMin;
        } else if (x > xMax) {
          x = xMax;
        }

        if (y < yMin) {
          y = yMin;
        } else if (y > yMax) {
          y = yMax;
        }

        this.$emit("onDrag", this.id, x, y);
      } else if (this.isResize) {
        const draggerRect = this.dragger.getBoundingClientRect();
        // const resizerRect = this.resizer.getBoundingClientRect();

        let width = this.width;
        let height = this.height;

        switch (this.resizer.dataset["type"]) {
          case "top-left": {
            break;
          }
          case "top-right": {
            break;
          }
          case "bottom-left": {
            width = this.initialWidth - (e.clientX - this.draggerInitialX);
            height = e.clientY - draggerRect.top;
            x = this.x + this.initialWidth - width;
            this.$emit("onDrag", this.id, x);
            console.log(x);
            // console.log(x);

            // console.log(width, height);

            break;
          }
          case "bottom-right": {
            width = e.clientX - draggerRect.left;
            height = e.clientY - draggerRect.top;

            break;
          }
        }

        if (width < this.minWidth) {
          width = this.minWidth;
        }

        if (height < this.minHeight) {
          height = this.minHeight;
        }

        this.$emit("onResize", this.id, width, height);
      }
    }
  },
  data: function() {
    return {
      initialX: 0,
      initialY: 0,
      initialWidth: 0,
      isDrag: false,
      isResize: false,
      resizer: null,
      dragger: null
    };
  }
};
</script>

<style>
.list-item {
  position: absolute;
  box-sizing: content-box;
}

.list-item__content {
  display: flex;
  flex-direction: column;
  padding: 15px;
}

/* .dragger {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  border: 1px solid #444;
  will-change: transform;
  transition: box-shadow 0.4s;
  cursor: move;
  z-index: 1;
} */

.list-item--active {
  z-index: 5;
}

.list-item--dragging .dragger {
  box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.3);
}

/* .resizers {
  position: absolute;
  width: 100%;
  height: 100%;
}

.resizer {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
}

.resizer__top-left {
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}

.resizer__top-right {
  top: -5px;
  right: -5px;
  cursor: nesw-resize;
}

.resizer__bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}

.resizer__bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: nwse-resize;
} */
</style>
