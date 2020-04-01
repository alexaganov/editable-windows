<template>
  <div class="file-uploader">
    <label
      @drag.stop.prevent
      @dragstart.stop.prevent
      @dragenter.stop.prevent
      @dragover.stop.prevent
      @dragleave.stop.prevent
      @drop.stop.prevent="onChange"
      class="file-uploader__uploader"
    >
      <input
        @change="onChange"
        :accept="accept"
        :multiple="multiple"
        type="file"
        class="file-uploader__input"
      />
      <slot>Choose or drop {{ accept }} here</slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "FileUploader",
  props: {
    accept: String,
    multiple: Boolean
  },
  methods: {
    onChange(e) {
      const { files } = e.type === "drop" ? e.dataTransfer : e.target;

      if (files.length) {
        if (this.multiple) {
          this.$emit(
            "upload",
            files.map(file => {
              const [type] = file.type.split("/");

              return {
                type,
                name: file.name,
                src: URL.createObjectURL(file)
              };
            })
          );
        } else {
          const currentFile = files[0];
          const [type] = currentFile.type.split("/");
          const file = {
            type,
            name: currentFile.name,
            src: URL.createObjectURL(currentFile)
          };

          this.$emit("upload", file);
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.file-uploader {
  display: flex;
  height: inherit;

  &__preview,
  &__uploader {
    flex: 1 1 100%;
    height: inherit;
    overflow: hidden;
    border-radius: 5px;
    background-color: $color-secondary;
    box-shadow: $small-shadow;
  }

  &__input {
    width: 0px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
}
</style>
