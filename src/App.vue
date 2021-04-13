<template>
  <div class="h-screen w-full flex relative">
    <div class="flex items-center justify-center w-full">
      <div class="flex flex-col w-1/4">
        <h1 class="header">Bet Holder</h1>
        <input type="text" @keypress.enter="createHostUserName" v-model="name" class="input-black" placeholder="Enter Your Name">
        <span v-if="error" class="text-red-500"> Please insert your name first </span>
        <span v-if="isDeplicated" class="text-red-500"> This user already exist </span>
        <div class="flex justify-center">
          <button-black @click="createHostUserName" type="submit" class="w-2/4 mt-10">
            <span class="animate-pulse-upgrade">
            Jump in 
            <i class="fas fa-angle-double-right ml-3 middle" />
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
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
</template>
<script>
import axios from "./axios-instance/backendInstance"
export default {
  data() {
    return {
      name: '',
      error: false,
      isDeplicated: false,
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
      this.validate();
      const res = await axios.get(`/hostusername?name=${this.name}`);

      if(res === null || res.data.length === 0) this.isDeplicated = false;
      else if(res.data.length > 0) {
        this.isDeplicated = true; 
      }

      if(!this.error && !this.isDeplicated){
        await axios.post('/hostusername',{
          name: this.name
        }) 
      }
    },
  }
}
</script>
<style>
</style>