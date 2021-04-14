<template>
  <div class="bg-gray-400 flex opacity-80 justify-center items-center h-screen absolute z-50 w-full pointer-events-auto">
    <div class="bg-white shadow-lg p-10 flex flex-col w-3/12">
        <div class="flex justify-end">
          <i @click="closePopUp" class="fas fa-times cursor-pointer"></i>
        </div>
        <h2 class="text-xl mb-5">Create Room:</h2>
        <input v-model="description" type="text" class="input-black" placeholder="Description">
      <div class="flex justify-center">
        <button-black @click="createRoom" class="mt-7 w-2/5"> Create </button-black>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatePopUp',
  data(){
    return {
      description: ''
    }
  },
  methods: {
    closePopUp(){
      this.$emit('closepopup')
    },
    createRoom(){
      this.$emit('createroom', { description: this.description});
      this.closePopUp();
    }
  } 
}
</script>

<style>

</style>