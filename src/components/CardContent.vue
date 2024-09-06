<template>
    <draggable
        id="first"
        :list="tasks[columnType]"
        class="card-content"
        draggable=".task"
        group="a"
        :animation="200"
        @end="endMove"
        :disabled="store.getSearchInProgress"
    >
        <b-card v-for="(task, index) in tasks[columnType]" :key="index" :title="task.title" class="task mb-2">
            <b-card-sub-title class="mb-3" >
                <span :class="lateDueDateReached(task.dueDate, columnType)">
                    Due Date: {{ task.dueDate | getDateFormate }} 
                </span>
            </b-card-sub-title>
            <b-card-text>
                {{ task.desc }}
            </b-card-text>
            
            <template #footer>
                <b-row class="justify-content-between">
                    <b-col cols="auto">
                        <b-button variant="outline-secondary " size="sm" class="mr-5" @click="editTask(task, columnType)">
                            <b-icon icon="pencil-square" aria-hidden="true" ></b-icon>
                        </b-button>
                    </b-col>
                    <b-col cols="auto">
                        <b-button variant="danger " size="sm" @click="deleteTask(task.id, columnType)">
                            <b-icon icon="trash" aria-hidden="true" ></b-icon>
                        </b-button>
                    </b-col>
                </b-row>
          </template>
        </b-card>
    </draggable>
</template>
<script>
import {getTaskName} from "@/utils/TaskTypes"
import draggable from "vuedraggable";
import { useMainStore } from '@/store.js';
import {getFormattedDate, isAfterOrEqualToday} from "@/utils/dateFormate"
export default {
  name: 'card-content',
  setup () {
    const store = useMainStore()
    return { store }
  },
  components: {
    draggable
  },
  props:{
      columnType:{
          type: String,
          default: 'Todo',
          validator: function (value) {
              const taskNames = getTaskName()
              return taskNames.includes(value)
            },
            required: true
        },
        tasks:{
            type:Object,
        }
    },
    filters:{
        getDateFormate(value){
            return getFormattedDate(value)
        }

    },
  methods:{
    endMove(){
        this.$nextTick(()=>{
            this.store.editNewTask()

        })
    },
    editTask(task){
        this.store.taskEdit = task
        this.$bvModal.show('addTaskModal')
    },
    deleteTask(taskId, taskType){
        this.store.deleteTask(taskType,taskType)
    },
    lateDueDateReached(date, columnType){
       return isAfterOrEqualToday(date) && columnType !== 'Done' ? 'card-content__date-blink' : ''
    }
  }
}
</script>
<style lang="scss" scoped>
.card-content{
    &__date-blink{
        color: red;
        animation: blinker 2s linear infinite;
        
        @keyframes blinker {
            50% {
                opacity: 0;
            }
        }
    }
}
</style>