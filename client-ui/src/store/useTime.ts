import { defineStore } from 'pinia'
import service from '../../service';
import { ref } from "vue";

export const useTime = defineStore({
    id: 'time',
    state: () => ({
        timeid: null,
        times: <any>ref([]),
    }),
    actions: {
        findall: async function () {
            try {
                const response = <any>ref({});
                response.value = await service.timeLogControllerFindAll({ format: 'json' });
                response.value.data.forEach((element :any )=> {
                    this.times.push(element)
                });
            } catch (error) {
                console.log(error);
            }
        },
        addTime: async function () {
            try {
                const Startdata: any = await service.start.timeLogControllerStartNewTimeLog({ format: 'json' });
                this.times.push(Startdata.data)
                console.log('addtime', Startdata)
                this.timeid = Startdata.data.id;
            } catch (error) {
                console.log(error);
            }
        },
        stop: async function () {
            try {
                if (this.timeid) {
                    const Stopdata: any = await service.stop.timeLogControllerStopTimeLog(this.timeid, { format: 'json' });
                    console.log(Stopdata)
                    const stopIndex = this.times.findIndex((item: any) => item.id === this.timeid);
                    if (stopIndex !== -1) {
                        this.times.splice(stopIndex, 1, Stopdata.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
});