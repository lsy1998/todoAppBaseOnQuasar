<template>
  <q-layout view="lHh Lpr lFf" style="height:1000px;">
    <q-page-container style="height:1000px;">
      <router-view style="height:1000px;"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Todo',
    caption: 'todo',
    icon: 'school',
    link: '#/todo'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  created(){
  }
})
</script>
