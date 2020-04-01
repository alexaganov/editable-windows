<template>
  <Modal class="edit-window-modal" v-model="isShown">
    <div class="edit-window-modal__content">
      <div class="edit-window-modal__header">
        <h2 class="edit-window-modal__title">Edit window form</h2>
        <Button @click="close" class="edit-window-modal__close-button" variant="icon">
          <XIcon />
        </Button>
      </div>
      <div class="edit-window-modal__body">
        <RadioButtonGroup class="edit-window-modal__radio-button-group">
          <RadioButton
            name="content-type"
            v-for="contentType in contentTypes"
            :key="contentType"
            :value="contentType"
            :label="contentType"
            v-model="currentContentType"
          />
        </RadioButtonGroup>
        <div class="edit-window-modal__edit-area">
          <TextArea
            class="edit-window-modal__text-area"
            v-if="currentContentType === contentTypes.TEXT"
            v-model="text"
          />
          <div v-else class="edit-window-modal__file-area">
            <FilePreview
              :src="currentFile.src"
              :name="currentFile.name"
              :type="currentFile.type"
              class="edit-window-modal__file-preview"
            />
            <FileUploader
              :accept="currentContentType === contentTypes.IMAGE ? 'image/*': 'video/*'"
              @upload="onUpload"
              class="edit-window-modal__file-uploader"
            >
              <div class="edit-window-modal__file-uploader-inner">
                <span class="edit-window-modal__file-uploader-icon">
                  <ImageIcon
                    v-show="currentContentType === contentTypes.IMAGE"
                    size="2x"
                    stroke-width="1"
                  />
                  <FilmIcon
                    v-show="currentContentType === contentTypes.VIDEO"
                    size="2x"
                    stroke-width="1"
                  />
                </span>
                <p class="edit-window-modal__description">
                  Choose or Drop
                  {{
                  currentContentType === contentTypes.IMAGE ? "image" : "video"
                  }}
                  here
                </p>
              </div>
            </FileUploader>
          </div>
        </div>
      </div>
      <div class="edit-window-modal__footer">
        <ButtonGroup v-once>
          <Button @click="close">Close</Button>
          <Button @click="accept" variant="solid">Accept</Button>
        </ButtonGroup>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal";
import Button from "./Button";
import RadioButton from "./RadioButton";
import RadioButtonGroup from "./RadioButtonGroup";
import TextArea from "./TextArea";
import FileUploader from "./FileUploader";
import FilePreview from "./FilePreview";
import ButtonGroup from "./ButtonGroup";
import { HIDE_EDIT_MODAL } from "../store/mutations-types";
import { SET_WINDOW_CONTENT } from "../store/actions-types";
import { TEXT, IMAGE, VIDEO } from "../store/content-types";
import { ImageIcon, XIcon, FilmIcon } from "vue-feather-icons";

export default {
  name: "ModalEditWindow",
  props: {
    windowName: String
  },
  components: {
    Modal,
    Button,
    RadioButton,
    RadioButtonGroup,
    TextArea,
    FileUploader,
    FilePreview,
    ButtonGroup,
    XIcon,
    ImageIcon,
    FilmIcon
  },
  computed: {
    modalInfo() {
      return this.$store.getters.editModalInfo;
    },
    isShown: {
      set() {
        this.close();
      },
      get() {
        return this.modalInfo.isShown;
      }
    },
    content() {
      return this.modalInfo.content;
    }
  },
  watch: {
    currentContentType(newCurrentContentType) {
      switch (newCurrentContentType) {
        case this.contentTypes.IMAGE:
          this.currentFile = this.image;
          break;
        case this.contentTypes.VIDEO:
          this.currentFile = this.video;
          break;
      }
    }
  },
  methods: {
    onUpload(file) {
      switch (file.type) {
        case this.contentTypes.IMAGE:
          this.image = file;
          break;
        case this.contentTypes.VIDEO:
          this.video = file;
          break;
      }

      this.currentFile = file;
    },
    close() {
      this.$store.commit(HIDE_EDIT_MODAL);
    },
    accept() {
      const { window } = this.modalInfo;

      const content = {
        type: this.currentContentType,
        data:
          this.currentContentType === this.contentTypes.TEXT
            ? this.text
            : this.currentFile
      };

      this.currentFile = this.image = this.video = {};

      this.$store.dispatch(SET_WINDOW_CONTENT, {
        window,
        content
      });
    }
  },
  data() {
    return {
      contentTypes: {
        TEXT,
        IMAGE,
        VIDEO
      },
      currentContentType: TEXT,
      currentFile: {},
      image: {},
      video: {},
      text: ""
    };
  }
};
</script>

<style lang="scss">
@import "~@/scss/variables";

.edit-window-modal {
  color: $color-primary;

  &__content {
    background-color: $color-secondary-dark;
    border-radius: 2px;
  }

  &__header {
    border-bottom: 1px solid $color-secondary;
    padding: 30px 30px 15px 30px;
    position: relative;
  }

  &__body {
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
  }

  &__footer {
    border-top: 1px solid $color-secondary;
    display: flex;
    justify-content: flex-end;
    padding: 15px 30px 20px 30px;
  }

  &__close-button {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  &__title {
    color: $color-primary;
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 300;
    text-shadow: 0 0 10px $color-primary;
    letter-spacing: 2px;
    position: relative;
  }

  &__radio-button-group {
    align-self: center;
    width: 100%;
    margin-bottom: 20px;
  }

  &__edit-area {
    height: 10em;
  }

  &__text-area,
  &__file-area {
    height: 100%;
  }

  &__file-area {
    display: flex;
  }

  &__file-preview {
    margin-right: 20px;
  }

  &__file-preview,
  &__file-uploader {
    flex: 1 1 100%;
  }

  &__file-uploader-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: $color-primary-dark;
    user-select: none;
    padding: 15px;
    height: inherit;
    transition: all 0.2s;
    cursor: pointer;
    font-weight: 300;

    &:hover {
      color: $color-primary;
      text-shadow: 0 0 10px $color-primary;
    }
  }

  &__file-uploader-icon {
    display: inline-block;
    margin-bottom: 0.3em;
  }

  &__file-uploader-inner:hover &__file-uploader-icon {
    filter: drop-shadow(0px 0px 10px $color-primary);
  }
}
</style>
