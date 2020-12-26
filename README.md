# Vue pro modal

Vue plugin for creating modal windows. It can be used both in traditional style and programmatically.

## Installation

```bash
$ npm i vue-pro-modal
```

<br>
<br>

## Nuxt
```js
// nuxt.config.js
export default {
    ...
    modules: [
        'vue-pro-modal/nuxt',
    ],
};
```

Create modal component in the «components» directory and add VModalTarget component to main component.

<br>
<br>

## Usage (programmatically)

```js
import Vue from 'vue';
import VueModal from 'vue-pro-modal';
import 'vue-pro-modal/dist/vue-pro-modal.css';

const options = {
  import: (name) => import(`@/components/${name}.vue`),
};

Vue.use(VueModal, options);
```

Create modal component in the «components» directory:

```js
// components/Modal.vue
<template>
    <v-modal>
        content
    </v-modal>
</template>
```

Add target component in root app:

```js
// App.vue
<template>
    <div>
        <div>
            <router-view />
        </div>

        <v-modal-target />
    </div>
</template>
```

Calling modal:

```js
export default {
    methods: {
        open() {
            this.$modal.open('Modal');
        },
    },
};
```

### More about calling modals programmatically:
The programmatic call of modals dynamically load components from the directory specified in the import option.
The import option is required.
Installing the plugin connects the components globally, and also adds the *$modal* property, which has the following properties and methods:

**$modal.$store** - state of modals:
```js
[
    {
        id: string,
        name: string,
        props: object,
        listeners: object
        eventBus: object
    }
]
```

**$modal.open** - Method for calling modals. Returns a promise that is resolved when the opening animation ends.
```js
/**
 * @param {String} name - name or namespace of component.
 * @param {Object} props - props of component.
 * @param {Object} listeners - event listeners of component.
 *
 * @returns {Promise}
 */
this.$modal.open(name, props, listeners).then(() => {
    console.log('opened');
});
```

**$modal.close** - Method for closing modals. Returns a promise that is resolved when the closing animation ends.
```js
/**
 * An modal can be found by name, id, or index.
 * If no argument is passed function will close the last modal.
 *
 * @param {String|Number} name
 *
 * @returns {Promise}
 */
this.$modal.open(name, props, listeners).then(() => {
    console.log('opened');
});
```

**$modal.closeAll** - Method for closing all modals.

<br>
<br>

## Usage (v-model)

```js
import 'vue-pro-modal/dist/vue-pro-modal.css';
```

```js
<template>
    <div>
        <button v-on:click="modal = true">
            show modal
        </button>

        <v-modal v-model="modal">
            content
        </v-modal>
    </div>
</template>

<script>
import { VModal } from 'vue-pro-modal';

export default {
    components: {
        VModal,
    },
    data() {
        return {
            modal: false
        };
    },
};
</script>
```

<br>
<br>

## Options
Name                | Type               | Default   | Description
--------------------|--------------------|-----------|--------------
transition          | string             | 'scale'   | Transition name to display modal.
loadingTransition   | string             | 'fade'    | Transition name to display modal after loading.
appear              | boolean            | false     | To apply a transition on the initial render.
overlay             | boolean            | true      | Display overlay modal.
layout              | boolean            | true      | Display background modal.
fullscreen          | boolean            | false     | Fullscreen modal.
persistent          | boolean            | false     | Persistent modal. When you click on the overlay, the modal will twitch.
scrollLock          | boolean            | true      | Body scroll lock.
closeOnOverlay      | boolean            | true      | Close modal on click overlay.
closeOnEscape       | boolean            | true      | Close modal on press ESC key.
noPadding           | boolean            | false     | Without paddings (.modal__container).
noRadius            | boolean            | false     | Without border-radius (.modal__container).
focusableElement    | string,null        | null      | Focus element after opening modal.
zIndex              | number,string      | 1000      | z-index modal.
import              | function           | —         | Function for importing components

<br>
<br>

## Components
The module exports components: VModal, VModalTarget, VModalContent, VModalClose

### VModal
The main component for creating a modal window

<br>

#### Props
Name                | Type                | Default   | Description
--------------------|---------------------|-----------|--------------
value               | boolean             | false     | Value for v-model.
portal              | boolean             | true      | Using portal.
mountTo             | string              | 'body'    | A querySelector String defining the DOM element to mount the modal to.
modalClass          | string,array,object | —         | CSS class for .modal
containerClass      | string,array,object | —         | CSS class for .modal__container
width               | string              | —         | Modal width
maxWidth            | string              | —         | Modal max-width
height              | string              | —         | Modal height
maxHeight           | string              | —         | Modal max-height

***You can also specify props from options***

<br>

#### slots
Name                | props
--------------------|------------------------------------------
loading             | —
default             | { close } - Function to close modal

<br>

#### events
* before-open
* open
* after-open
* before-close
* close
* after-close

#### example
```js
<template>
    <v-modal v-model="modal" persistent v-slot="{ close }" v-on:after-open="afterOpen">
        <template v-slot:loading>
            <i class="icon-loading" />
        </template>
        <h2>
            title
        </h2>
        <button v-on:click="close">
            close modal
        </button>
    </v-modal>
</template>

<script>
export default {
    data() {
        return {
            modal: false,
        };
    },
    methods: {
        afterOpen() {
            console.log('modal opened');
        },
    },
};
</script>
```

<br>
<br>

### VModalTarget
Component target. Required to programmatically use modals.

#### Props
Name                | Type                | Default   | Description
--------------------|---------------------|-----------|--------------
transition          | string              | 'scale'   | Transition name

***When using programmatically, the transition must be reassigned here and not the Modal props***

Or you can pass the transition through the props:
```js
this.$modal.open('modals/Test', { transition: 'my-transition-name' })
```

<br>
<br>

### VModalContent
Component for creating modals that have a header footer and a body. In this case, the maximum body height will be calculated using the following formula: (100vh - (header height) - (footer height) - (modal paddings)).
In this case, the height of the header and footer is tracked and can change at any time.

#### slots
Name                | props
--------------------|------------------------------------------
header              | —
body                | —
footer              | —

<br>

#### example
```js
<tempate>
<v-modal>
    <v-modal-content>
        <template v-slot:header>
            modal header
        </template>
        <template v-slot:body>
            modal body
        </template>
        <template v-slot:footer>
            modal footer
        </template>
    </v-modal-content>
</v-modal>
</template>
```

<br>
<br>

### VModalClose
Close button component.

#### Props
Name                | Type                | Default   | Description
--------------------|---------------------|-----------|--------------
tag                 | string              | 'button'  | tag name

<br>

#### slots
Name                | props
--------------------|--------------------------
default             | —

slot for changing default icon (x)

<br>

#### example
```js
<tempate>
<v-modal>
    <v-modal-content>
        <template v-slot:header>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    modal header
                </div>
                <div>
                    <v-modal-close />
                </div>
            </div>
        </template>
        <template v-slot:body>
            modal body
        </template>
        <template v-slot:footer>
            modal footer
        </template>
    </v-modal-content>
</v-modal>
</template>
```
