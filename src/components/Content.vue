<template>
  <main class="content">
    <!-- <Draggable :data="data" @resizeItem="handleResize" @dragItem="handleDrag" /> -->

    <DraggableNew :x="x" :y="y" :w="width" :h="height" :outer="outer" :onDrag="onDragAndResize">
      <Resizable :onResize="onDragAndResize" />
      <div class="item">content</div>
    </DraggableNew>
  </main>
</template>

<script>
import Draggable from "./Draggable";
import DraggableNew from "./DraggableNew";
import Resizable from "./Resizable";
import {
  RESIZER_TOP_LEFT,
  RESIZER_TOP_RIGHT,
  RESIZER_BOTTOM_LEFT,
  RESIZER_BOTTOM_RIGHT
} from "./Resizer";
// import DraggableArea from "./DraggableArea";
// import { mapMutations } from "vuex";

export default {
  name: "Content",
  components: {
    // eslint-disable-next-line
    Draggable,
    Resizable,
    DraggableNew
    // DraggableArea
  },
  computed: {
    size() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    }
  },
  mounted: function() {},
  watch: {
    dragXDir(dragXDir, newDragXDir) {}
  },
  methods: {
    onDragAndResize({ xDir, yDir, eventType, resizer }) {
      if (eventType === "resize") {
        this.resizeXDir = xDir;
        this.resizeYDir = yDir;
        this.resizer = resizer;
      } else if (eventType === "drag") {
        this.dragXDir = xDir;
        this.dragYDir = yDir;
      }
    },
    onDrag({ xDir, yDir }) {
      this.dragXDir = xDir;
      this.dragYDir = yDir;

      /* const xMin = -this.outer;
      const yMin = -this.outer;
      const xMax = this.$el.offsetWidth - this.width - this.outer;
      const yMax = this.$el.offsetHeight - this.height - this.outer;

      let x = this.x + xDir;
      let y = this.y + yDir;

      this.x = x < xMin ? xMin : x > xMax ? xMax : x;
      this.y = y < yMin ? yMin : y > yMax ? yMax : y; */
    },
    onResize({ xDir, yDir, resizer }) {
      this.resizeXDir = xDir;
      this.resizeYDir = yDir;
      this.resizer = resizer;

      /*  let width = this.width;
      let height = this.height;

      switch (resizer) {
        case RESIZER_TOP_LEFT: {
          break;
        }

        case RESIZER_TOP_RIGHT: {
          break;
        }

        case RESIZER_BOTTOM_LEFT: {
          break;
        }

        case RESIZER_BOTTOM_RIGHT: {
          width += xDir;
          height += yDir;
          break;
        }
      }
      if (width < 200) {
        width = 200;
      }

      if (height < 200) {
        height = 200;
      }

      this.width = width;
      this.height = height; */
    }
  },
  data: function() {
    return {
      width: 200,
      height: 200,
      dragXDir: 0,
      dragYDir: 0,
      resizeXDir: 0,
      resizeYDir: 0,
      resizer: "",
      x: 100,
      y: 100,
      outer: 30,
      isActive: false,
      id: 1
    };
  }
};
</script>

<style>
.content {
  flex: 1 1 100%;
  overflow: hidden;
  position: relative;
}

.test {
  position: absolute;
  border: 1px solid #000;
}
</style>
