<template>
  <router-link :to="'/rooms/' + id" class="bg-black flex text-white my-5 p-4 text-xl">
      <div class="flex w-4/5 pl-5 items-center">
        <span> {{ description }} </span>
      </div>
      <div class="flex w-1/5 justify-around items-center">
        <span>{{ numofperson }}</span>
        <i @click="deleteRoom" class="fas fa-times text-red-500 text-2xl cursor-pointer"></i>
      </div>
  </router-link>
</template>

<script>
export default {
    name: 'Room',
    props: ['description','numofperson','id'],
    methods: {
        deleteRoom(){
            this.$emit('deleteroom', { roomId: this.id });
        }
    }
}
</script>
