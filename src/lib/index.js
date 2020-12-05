import VModal from '@/components/lib/Modal.vue';
import VModalContent from '@/components/lib/ModalContent.vue';
import VModalTarget from '@/components/lib/ModalTarget.vue';
import VModalClose from '@/components/lib/ModalClose.vue';
import Modal from './Modal';
import defaults from './config';

export {
  defaults,
  Modal,
  VModal,
  VModalContent,
  VModalTarget,
  VModalClose,
};

export default function (Vue, options = {}) {
  const propertyName = '$modal';
  const config = { ...defaults, ...options };

  if (Object.prototype.hasOwnProperty.call(Vue, propertyName)) {
    return;
  }

  Vue.component('VModal', VModal);
  Vue.component('VModalContent', VModalContent);
  Vue.component('VModalTarget', VModalTarget);
  Vue.component('VModalClose', VModalClose);

  Vue.prototype[propertyName] = Vue.observable(new Modal(config));
}
