<template>
  <div class="resizable" :style="resizableStyle">
    <Resizer
      v-for="resizer in resizers"
      :key="resizer"
      :debug="debug"
      :type="resizer"
      :size="size"
      @start-resizing="onStartResizing"
      @resizing="onResizing"
      @end-resizing="onEndResizing"
    />
  </div>
</template>

<script>
import { RESIZER_TYPES } from "./Resizer";
import Resizer from "./Resizer";

export default {
  name: "Resizable",
  components: {
    Resizer
  },
  props: {
    resizers: {
      type: Array,
      default: function() {
        return RESIZER_TYPES;
      },
      validator: function(resizers) {
        return resizers.every(resizer => RESIZER_TYPES.indexOf(resizer) !== -1);
      },
      required: false
    },
    size: {
      type: Number,
      default: 10
    },
    debug: Boolean
  },
  computed: {
    resizableStyle() {
      return {
        margin: `${-this.size / 2}px`
      };
    }
  },
  methods: {
    onStartResizing() {
      this.$emit("start-resizing");
    },
    onResizing(info) {
      this.$emit("resizing", info);
    },
    onEndResizing() {
      this.$emit("end-resizing");
    }
  }
};
</script>

<style>
.resizable {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}
</style>
