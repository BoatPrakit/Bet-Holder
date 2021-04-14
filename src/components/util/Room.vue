<template>
  <router-link :to="path" class="bg-black flex text-white my-5 p-5">
      <div class="flex w-3/5">
        <span> {{ description }} </span>
      </div>
      <div class="flex w-2/5 justify-between">
        <span>{{ numofperson }}</span>
        <i class="fas fa-times text-red-500"></i>
      </div>
  </router-link>
</template>

<script>
export default {
    name: 'Room',
    data() {
        return {
            path: '/' + this.id
        }
    },
    props: ['description','numofperson','id']
}
</script>
