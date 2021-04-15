<template>
    <div :class="pointerClass" class="relative">
        <PopUp v-if="isShowPopUp" :option="optionPopUp" @create="insertRoom" @closepopup="openOrClosePopUp"></PopUp>
        <Navbar :hostusername="hostusername"></Navbar>
        <div class="bg-gray-bg min-h-content p-8 z-0">
            <h1 class="header">Bet Holder</h1>
            <div class="flex justify-center w-full">
                <card class="w-3/6">
                    <div class="flex justify-between">
                        <h2 class="text-2xl font-extrabold">Your Room:</h2>
                        <button @click="openOrClosePopUp" class="bg-green-500 text-white px-3"> + </button>
                    </div>
                    <div v-for="room in totalRoom" class="flex flex-col" :key="room.id" >
                        <Room @deleteroom="deleteRoom" :id="room.id" :room="room" />
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/util/Navbar.vue"
import PopUp from "../components/util/PopUp.vue"
import Room from "../components/util/Room.vue"
import axios from "../axios-instance/backendInstance"

export default {
    name: "Home",
    props: ['hostusername'],
    components: {
        Navbar,
        PopUp,
        Room
    },
    data(){
        return {
            isShowPopUp: false,
            pointerClass: '',
            rooms: [],
            optionPopUp: {
                topic: "Create Room:",
                placeholder: "Description",
                invalidValueError: "Please insert description",
                deplicatedError: "This room already already exists. Please change your description",
            }
        }
    },
    methods: {
        openOrClosePopUp(){
            this.isShowPopUp = !this.isShowPopUp;
            if(this.isShowPopUp) this.pointerClass = 'pointer-events-none bg-gray-200 opacity-80'
            else this.pointerClass = ''
        },
        async insertRoom({ inputValue }){
            const data = {
               owner: this.hostusername,
               description: inputValue,
               nameList: [
                   { name: this.hostusername, money: 0}
               ]
            }
            const res = await axios.post('/rooms', data)
            this.rooms.push({...data, id: res.data.id})
        },
        async deleteRoom({ roomId }){
            await axios.delete(`/rooms/${roomId}`);
            this.rooms = this.rooms.filter( room => room.id !== roomId );
        }
    },
    async mounted() {
        if(!this.hostusername) this.$router.push('/');
        const res = await axios.get(`/rooms?owner=${this.hostusername}`);
        if(res.status === 200) {
            this.rooms = res.data;
            this.optionPopUp.data = this.rooms.map( element => element.description )
        }
    },
    computed: {
        totalRoom(){
            return this.rooms;
        }
    }
}
</script>
