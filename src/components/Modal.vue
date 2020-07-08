<template>
    <transition name="modal">
    <div class="modal-mask">
        <div class="modal__wrapper">
        <div class="modal__container" :style="{ 'max-width': this.maxWidth }">
            <div class="modal__header">
            <slot name="header">Адрес доставки *</slot>
            </div>
            <select v-model="currentCity" name="currentCity" id="currentCity">
              <option value="Москва" selected>Москва</option>
              <option value="Нижний Новгород">Нижний Новгород</option>

            </select>
            <ul class="modal__suggestions suggestions">
              <li
                v-for="(item, index) in suggestionsList"
                :key="item.h1"
                @click="adress = suggestionsList[index].value"
                class="suggestions__item"
                >
                {{ suggestionsList[index].displayName }}
              </li>
            </ul>

            <div class="modal__body">
                <input
                  @click='yandex'
                  v-model='adress'
                  @keypress="yandex"
                  placeholder="Начните вводить адрес"
                  required />
            </div>

            <div class="modal__footer">
            <slot name="footer">
                <button
                  class="modal-default-button"
                  @click="submit"
                >
                  Сохранить
                </button>
                <button
                class="modal-default-button"
                @click="$emit('close')"
                >
                  Отменить
                </button>
            </slot>
            </div>
        </div>
        </div>
    </div>
    </transition>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Modal',
  props: {
    maxWidth: String,
  },
  data() {
    return {
      adress: null,
      value: null,
      currentCity: 'Нижний Новгород',
      suggestionsList: [],
      previouslyEnteredData: [
        { displayName: 'г Нижний Новгород, деревня Комарово, ул Животноводов, д 1', value: 'г Нижний Новгород, деревня Комарово, ул Животноводов, д 1' },
        { displayName: 'г Нижний Новгород, пер. Мотальный, д 8', value: 'г Нижний Новгород, пер. Мотальный, д 8' },
      ],
      geocodeObject: null,
    };
  },
  mounted() {
    if (this.$store.getters.previouslyEntered.length < 1) {
      this.$store.commit('SET_PREVIOUSLY_ENTERED', this.previouslyEnteredData);
      return;
    }
    this.previouslyEnteredData = this.$store.getters.previouslyEntered;
    console.log(this.$store.getters.previouslyEntered);
  },
  methods: {
    submit() {
      if (this.$store.getters.selectedAdress === this.adress) {
        alert('Адрес уже выбран');
        return;
      }
      this.$store.commit('SET_ADRESS', this.adress);
      this.$store.commit('ADD_TO_PREVIOUSLY_ENTERED', this.adress);
      this.geocode(this.adress);
      this.postQuery(this.geocodeObject);
      this.$emit('close');
    },
    yandex(e) {
      if (e.target.value.length < 2) {
        this.showSuggestions(this.$store.getters.previouslyEntered);
        return;
      }
      window.ymaps.suggest(`${this.currentCity}, ${e.target.value}`).then((items) => {
        this.showSuggestions(items);
      });
    },
    showSuggestions(items) {
      const suggestions = [];
      items.forEach((item) => {
        suggestions.push(item);
      });
      this.suggestionsList = suggestions;
    },
    geocode(request) {
      this.geocodeObject = window.ymaps.geocode(request);
      // с локалки в геокод не пускает почему-то, пишет что не указан apikey
    },
    postQuery(qeuryJSON) {
      axios.post('url', qeuryJSON);
    },
  },
};
</script>

<style lang="scss">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal {
  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  &__header h3 {
    margin-top: 0;
    color: #42b983;
  }

  &__body {
    margin: 20px 0;
  }

  &__footer {
    display: flex;
    justify-content: space-around;
  }

  &__default-button {
    float: right;
  }
}

.suggestions {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
  &__item {
    cursor: pointer;

    &:hover {
      background-color: grey;
      color: #FFF;
    }
  }
}
</style>
