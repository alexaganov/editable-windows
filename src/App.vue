<template>
  <div id="app">
    <Sidebar />
    <Content />
    <ModalEditWindow />
  </div>
</template>

<script>
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import ModalEditWindow from "./components/ModalEditWindow";

export default {
  name: "App",
  components: {
    Sidebar,
    Content,
    ModalEditWindow
  },
  mounted: function() {}
};
</script>

<style lang="scss">
@import "~@/scss/variables";
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap");

body {
  background-color: $color-secondary;
  max-height: 100vh;
  height: 100vh;
}

input,
button {
  font-family: inherit;
}

img {
  width: 100%;
  max-width: 100%;
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  height: 100%;
  display: flex;
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
