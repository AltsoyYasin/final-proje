<script setup>
import {RouterView} from 'vue-router'
import {useRoomStore} from './stores/roomStore'
import { onMounted } from 'vue';
const store = useRoomStore()
onMounted(() =>{
    store.getData()
})

</script>
<template>
<RouterView></RouterView>  
</template>