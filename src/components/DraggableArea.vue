<template>
  <div class="draggable-area" @mousedown.prevent="startDrag" @mouseup="stopDrag" @mousemove="drag">
    <slot></slot>
    <!--  <div class="draggable" :class="{'draggable--active': isDrag}" :style="style">
      <div class="draggable__resizers">
        <div class="draggable__resizer top-left"></div>
        <div class="draggable__resizer top-right"></div>
        <div class="draggable__resizer bottom-left"></div>
        <div class="draggable__resizer bottom-right"></div>
      </div>
      <div class="draggable__content">
        <slot></slot>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "DraggbleArea",
  props: {
    draggableElemClass: String
  },
  computed: {
    style() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        transform: `translate(${this.x}px, ${this.y}px)`
      };
    }
  },
  mounted: function() {
    /* this.$children.forEach(child => {
      console.log(child.$options);
    }); */
  },
  methods: {
    startDrag(e) {
      const activeElem = e.target.classList.contains("draggable")
        ? e.target
        : e.target.closest(`.draggable`);

      if (activeElem) {
        this.active = activeElem;

        if (e.target.classList.contains("draggable__resizer")) {
          this.isResize = true;
        } else {
          this.isDrag = true;
        }

        this.initialX = e.clientX - this.xOffset;
        this.initialY = e.clientY - this.yOffset;
      }
    },
    drag(e) {
      if (this.active) {
        if (this.isDrag) {
          const activeElemRect = this.active.getBoundingClientRect();
          const xMin = 0;
          const yMin = 0;
          const xMax = this.$el.offsetWidth - activeElemRect.width;
          const yMax = this.$el.offsetHeight - activeElemRect.height;

          let x = e.clientX - this.initialX;
          let y = e.clientY - this.initialY;

          this.x = x < xMin ? xMin : x > xMax ? xMax : x;
          this.xOffset = this.x;
          this.y = y < yMin ? yMin : y > yMax ? yMax : y;
          this.yOffset = this.y;
        } else if (this.isResize) {
          console.log(1);
        }
      }
    },
    stopDrag() {
      this.active = null;
      this.isDrag = false;
      this.isResize = false;
    }
  },
  data: function() {
    return {
      minSize: 200,
      initialX: 0,
      initialY: 0,
      xOffset: 0,
      yOffset: 0,
      x: 0,
      y: 0,
      active: null,
      isDrag: false,
      isResize: false
    };
  }
};
</script>

<style>
.draggable-area {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.draggable {
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 5px;
  border: 1px solid #444;
  cursor: move;
  will-change: transform;
  transition: box-shadow 0.4s;
}

.draggable--active {
  box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.3);
}

.draggable__resizers {
  position: absolute;
  width: 100%;
  height: 100%;
}

.draggable__resizer {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: red;
}

.draggable__resizer.top-left {
  top: -3px;
  left: -3px;
  cursor: nwse-resize;
}

.draggable__resizer.top-right {
  top: -3px;
  right: -3px;
  cursor: nesw-resize;
}

.draggable__resizer.bottom-left {
  bottom: -3px;
  left: -3px;
  cursor: nesw-resize;
}

.draggable__resizer.bottom-right {
  bottom: -3px;
  right: -3px;
  cursor: nwse-resize;
}
</style>
