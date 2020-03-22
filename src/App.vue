<template>
  <div id="app">
    <Sidebar />
    <Content />
  </div>
</template>

<script>
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

export default {
  name: "App",
  components: {
    Sidebar,
    Content
  },
  mounted: function() {}
};
</script>

<style lang="scss">
@import "~@/scss/variables";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  background-color: $color-secondary;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
  overflow: visible;
}

::-webkit-scrollbar-thumb:hover {
  background-color: $color-primary;
}

::-webkit-scrollbar-thumb,
::-webkit-scrollbar-corner {
  background-color: $color-primary-dark;
  border-radius: 1px;
}
</style>
