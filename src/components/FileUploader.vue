<template>
  <div class="file-uploader">
    <div v-show="isPreview" class="file-uploader__preview">
      <img
        class="file-uploader__preview-image"
        v-if="file && accept === 'image'"
        :src="file.src"
        :alt="file.name"
      />
      <video
        class="file-uploader__preview-video"
        v-else-if="file && accept === 'video'"
        :src="file.src"
        :alt="file.name"
      />
    </div>
    <label class="file-uploader__uploader">
      <input @change="onChange" type="file" class="file-uploader__input" />
      <slot>Choose or drop file here</slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "FileUploader",
  props: {
    accept: {
      type: [String, Array],
      default: "image",
      validator(accept) {
        return ["", "image", "video"].indexOf(accept) !== -1;
      }
    }
  },
  methods: {
    onChange(e) {
      const { files } = e.target;

      if (files.length) {
        const file = files[0];

        this.file = {
          name: file.name,
          src: URL.createObjectURL(file)
        };

        this.isPreview = true;
      } else {
        this.isPreview = false;
        this.file = null;
      }
    }
  },
  data() {
    return {
      file: null,
      isPreview: false
    };
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.file-uploader {
  display: flex;

  &__preview {
    margin-right: 15px;
  }

  &__preview,
  &__uploader {
    flex: 1 1 50%;
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