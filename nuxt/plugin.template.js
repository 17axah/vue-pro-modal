import Vue from 'vue';
import 'vue-pro-modal/dist/vue-pro-modal.css';

import {
  defaults,
  Modal,
  VModal,
  VModalContent,
  VModalTarget,
  VModalClose,
} from 'vue-pro-modal';

export default (ctx, inject) => {
  const options = {
    ...defaults,
    ...<%= serialize(options) %>,
  };

  const propertyName = '$modal';
  const modal = Vue.observable(new Modal(options))

  Vue.component('VModal', VModal);
  Vue.component('VModalContent', VModalContent);
  Vue.component('VModalTarget', VModalTarget);
  Vue.component('VModalClose', VModalClose);

  Vue.prototype[propertyName] = modal;

  inject('modal', modal);
};
