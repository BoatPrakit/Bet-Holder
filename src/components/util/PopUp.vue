<template>
  <div class="bg-gray-400 flex bg-opacity-80 justify-center items-center h-screen absolute z-50 w-full pointer-events-auto">
    <div class="bg-white shadow-lg p-10 flex flex-col w-3/12">
        <div class="flex justify-end">
          <i @click="closePopUp" class="fas fa-times cursor-pointer"></i>
        </div>
        <h2 class="text-xl mb-5"> {{ option.topic }} </h2>
        <input v-model="inputValue" type="text" class="input-black" :placeholder="option.placeholder">
        <span class="text-red-500" v-if="isValidInputValue"> {{ option.invalidValueError }} </span>
        <span class="text-red-500" v-if="isDeplicated"> {{ option.deplicatedError }} </span>
      <div class="flex justify-center">
        <button-black @click="create" class="mt-7 w-2/5"> Create </button-black>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopUp',
  data(){
    return {
      inputValue: '',
      isValidInputValue: false,
      isDeplicated: false
    }
  },
  props: ['option'],
  methods: {
    closePopUp(){
      this.$emit('closepopup')
    },
    create(){
      if(!this.inputValue) {
        this.isValidInputValue = true;
        return;
      }else this.isValidInputValue = false;

      this.checkDeplicated();
      if(!this.isDeplicated) {
        this.$emit('create', { inputValue: this.inputValue });
      }else return;
      this.closePopUp();
    },
    checkDeplicated(){
      const dataArr = this.option.data;
      this.isDeplicated = dataArr.some( data => data === this.inputValue);
    }
  } 
}
</script>