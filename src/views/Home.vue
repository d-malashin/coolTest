<template>
  <div class="home">
    <input
      v-if='this.$store.getters.selectedAdress'
      class="home__input"
      type="text"
      v-model="this.$store.getters.selectedAdress"
      @click='showModal = true'
    />
    <input
      v-else
      class="home__button button button--add"
      type="button"
      value="Добавить адрес"
      @click='showModal = true'
    />
    <Modal v-if='showModal' @close='showModal = false' maxWidth="600px" />
  </div>
</template>

<script>
import Modal from '../components/Modal.vue';

export default {
  name: 'Home',
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  &__input {
    cursor: pointer;
    width: 400px;
  }
  &__button {
    cursor: pointer;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
