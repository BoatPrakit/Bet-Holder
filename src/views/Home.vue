<template>
    <div :class="pointerClass" class="relative">
        <CreatePopup v-if="isShowPopUp" @createroom="insertRoom" @closepopup="openOrClosePopUp"></CreatePopup>
        <Navbar :hostusername="hostusername"></Navbar>
        <div class="bg-gray-bg h-content p-8 z-0">
            <h1 class="header">Bet Holder</h1>
            <div class="flex justify-center w-full">
                <card class="w-3/6">
                    <div class="flex justify-between">
                        <h2 class="text-xl font-extrabold">Your Room:</h2>
                        <button @click="openOrClosePopUp" class="bg-green-500 text-white px-2"> + </button>
                    </div>
                    <div v-for="room in totalRoom" class="flex flex-col" :key="room.id" >
                        <Room :description="room.description" :numofperson="room.nameList.length" />
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/util/Navbar.vue"
import CreatePopup from "../components/util/CreatePopup"
import Room from "../components/util/Room"
import axios from "../axios-instance/backendInstance"

export default {
    name: "Home",
    props: ['hostusername'],
    components: {
        Navbar,
        CreatePopup,
        Room
    },
    data(){
        return {
            isShowPopUp: false,
            pointerClass: '',
            rooms: []
        }
    },
    methods: {
        openOrClosePopUp(){
            this.isShowPopUp = !this.isShowPopUp;
            if(this.isShowPopUp) this.pointerClass = 'pointer-events-none'
            else this.pointerClass = ''
        },
        async insertRoom({ description }){
            const data = {
               owner: this.hostusername,
               description,
               nameList: [
                   { name: this.hostusername, money: 0}
               ]
            }
            const res = await axios.post('/rooms', data)
            this.rooms.push(...data, res.data.id)
        }
    },
    async mounted() {
        if(!this.hostusername) this.$router.push('/');
        const res = await axios.get(`/rooms?owner=${this.hostusername}`);
        if(res.status === 200) this.rooms = res.data;
    },
    computed: {
        totalRoom(){
            return this.rooms;
        }
    }
}
</script>
