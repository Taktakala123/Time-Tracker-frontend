<template>
    <div class="flex justify-content-start flex-wrap">
        <Date />
    </div>

    <div class="flex justify-content-end flex-wrap">
        <div class="flex align-items-center justify-content-center m-2">
            <StartButton @StartTime="Addtime" />
        </div>
        <div class="flex align-items-center justify-content-center m-2">
            <StopButton  @StopTime="stop"/>
        </div>
    </div>

    <div class="card">
        <div v-for="time in times" :key="time.id">
            Period {{ time.id }}
            {{ time.StartTime }} - {{ time.EndTime }}
        </div>
    </div>
</template>
 
 
<script lang="ts">
import Date from '../components/Date.vue';
import StartButton from '../components/StartButton.vue';
import StopButton from '../components/StopButton.vue';
import { defineComponent } from "vue";
import service from "../../service/index"
export default defineComponent({
    name: "Timer",

    components: {
        Date,
        StartButton,
        StopButton,
    },

    data() {
        return {
            times: {},
            response: {},
            timeid: Number,
        };
    },

    mounted: async function () {
        try {
            this.response = await service.timeLogControllerFindAll({ format: 'json' });
            console.log(this.response);
            this.times = this.response.data;
        }
        catch (error) {
            console.log(error);
        }
    },
    methods: {
        async Addtime() {
            try {
                const Startdata = await service.start.timeLogControllerStartNewTimeLog({ format: 'json' })
                this.times = [...this.response.data, Startdata.data];
                this.timeid = Startdata.data.id
                console.log(this.timeid)
            }
            catch (error) {
                console.log(error);
            }
        },
        async stop() {
            try {
                const Stopdata = await service.stop.timeLogControllerStopTimeLog(this.timeid, { format: 'json' })
                console.log(Stopdata)
                this.times = [...this.response.data, Stopdata.data];
            }
            catch (error) {
                console.log(error);
            }
        },
    },

});
</script>
 