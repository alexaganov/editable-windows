<template>
  <div class="resizable">
    <Resizer v-for="resizer in activeResizers" :key="resizer" :type="resizer" :onResize="onResize" />
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
      type: Object,
      default: function() {
        return RESIZER_TYPES.reduce((acc, curr) => {
          acc[curr] = true;
          return acc;
        }, {});
      },
      validator: function(resizers) {
        for (const resizer in resizers) {
          if (RESIZER_TYPES.indexOf(resizer) === -1) {
            return false;
          }
        }
        return true;
      }
    },
    onResize: {
      type: Function,
      required: true
    }
  },
  computed: {
    activeResizers() {
      const result = [];

      for (const resizer in this.resizers) {
        if (this.resizers[resizer]) {
          result.push(resizer);
        }
      }

      return result;
    }
  },
  methods: {
    handleResize(xDir, yDir) {
      console.log(xDir, yDir);
    }
  }
};
</script>

<style>
.resizable {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
