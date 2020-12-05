import Vue from 'vue';
import { uuidv4 } from './utils';

export default class Modal {
  constructor(config) {
    this.$store = [];
    this.$config = config;
  }

  /**
   * @param {String} name - name or namespace of component.
   * @param {Object} props - props of component.
   * @param {Object} listeners - event listeners of component.
   *
   * @returns {Object}
   */
  createInstance(name, props, listeners) {
    return {
      id: uuidv4(),
      name,
      props,
      listeners,
      eventBus: new Vue(),
    };
  }

  /**
   * @param {String} name
   *
   * @returns {Object}
   */
  getInstanceByName(name) {
    return this.$store.find((instance) => instance.name === name);
  }

  /**
   * @param {String} id
   *
   * @returns {Object}
   */
  getInstanceById(id) {
    return this.$store.find((instance) => instance.id === id);
  }

  /**
   * Adds an element to the $store array for further use in ModalTarget component.
   *
   * @param {String} name - name or namespace of component.
   * @param {Object} props - props of component.
   * @param {Object} listeners - event listeners of component.
   *
   * @returns {Promise}
   */
  open(name, props = {}, listeners = {}) {
    const instance = this.createInstance(name, props, listeners);

    this.$store.push(instance);

    return new Promise((resolve) => {
      instance.eventBus.$on('after-open', resolve);
    });
  }

  /**
   * Removes an element from the $store array.
   * An element can be found by name, id, or index.
   * If no argument is passed function will removes the last element.
   *
   * @param {String|Number} name
   *
   * @returns {Promise}
   */
  close(value) {
    if (!this.$store.length) {
      return Promise.resolve(false);
    }

    return new Promise((resolve, reject) => {
      const key = value || this.$store.length - 1;
      const isString = typeof key === 'string';

      const instance = isString
        ? this.getInstanceById(key) || this.getInstanceByName(key)
        : this.$store[key];

      if (!instance) {
        return reject(new Error(`instance by value «${key}» not found`));
      }

      const index = isString
        ? this.$store.findIndex(({ id }) => id === instance.id)
        : key;

      this.$store.splice(index, 1);

      instance.eventBus.$on('after-close', resolve);

      return false;
    });
  }

  /**
   * Removes all element from $store array.
   */
  closeAll() {
    this.$store.splice(0, this.$store.length);
  }
}
