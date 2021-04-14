<template>
  <div class="h-screen w-full flex relative">
    <div class="flex items-center justify-center w-full">
      <div class="flex flex-col w-1/4">
        <h1 class="header">Bet Holder</h1>
        <input type="text" @keypress.enter="createHostUserName" v-model="name" class="input-black" placeholder="Enter Your Name">
        <span v-if="error" class="text-red-500"> Please insert your name first </span>
        <div class="flex justify-center">
          <button-black @click="createHostUserName" type="submit" class="w-2/4 mt-10">
            <span class="animate-pulse-upgrade relative">
            Jump in 
            <i class="fas fa-angle-double-right ml-3 absolute middle"></i>
            </span> 
          </button-black>
        </div>
      </div>
    </div>
    <div class="absolute left-10 bottom-10">
      <p>This version is dummy </p>
      <p>if you fill any name same as in database </p>
      <p>you will have information of that name</p>
    </div>
  </div>
</template>
<script>
import axios from "../axios-instance/backendInstance"
export default {
  name: "Login",
  data() {
    return {
      name: '',
      error: false,
    }
  },
  methods: {
    validate(){
      if(!this.name) this.error = true;
      else {
        this.error = false;
      }
    },
    async createHostUserName(){
      let isDeplicated = false;
      this.validate();
      const res = await axios.get(`/hostusername?name=${this.name}`);

      if(res.data === null || res.data.length === 0) isDeplicated = false;
      else if(res.data.length > 0) {
        isDeplicated = true; 
      }
      if(!this.error){
        if(!isDeplicated){
          await axios.post('/hostusername', {
            name: this.name
          });
        }
        this.$router.push({name: 'Home', params: { 'hostusername': this.name }})
      }
    },
  }
}
</script>