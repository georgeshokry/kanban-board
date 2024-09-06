<template>
    <draggable
        id="first"
        :list="tasks[columnType]"
        class="card-content"
        draggable=".task"
        group="a"
        :animation="200"
        @change="log"
    >
        <b-card v-for="(task, index) in tasks[columnType]" :key="index" :title="task.title" class="task mb-2">
            <b-card-text>
                {{ task.desc }}
            </b-card-text>
            Due Date: {{ task.dueDate }}
            <template #footer>
                <b-row class="justify-content-between">
                    <b-col cols="auto">
                        <b-button variant="outline-secondary " size="sm" class="mr-5" @click="editTask(task, columnType)">
                            <b-icon icon="pencil-square" aria-hidden="true" ></b-icon>
                        </b-button>
                    </b-col>
                    <b-col cols="auto">
                        <b-button variant="danger " size="sm" >
                            <b-icon icon="trash" aria-hidden="true" ></b-icon>
                        </b-button>
                    </b-col>
                </b-row>
          </template>
        </b-card>
    </draggable>
</template>
<script>
import {getTaskName} from "../utils/TaskTypes"
import draggable from "vuedraggable";
import { useMainStore } from '@/store.js';
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
  methods:{
    log(data){
      console.log("🚀 ~ log ~ data:", data, this.columnType)
    },
    editTask(task){
        this.store.taskEdit = task
    }
  }
}
</script>