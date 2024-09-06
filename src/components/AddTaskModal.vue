<template> 
    <b-modal ref="addTaskModal"  id="addTaskModal" title="Add/Edit Task" hide-header-close hide-footer @show="onOpeningModal">
        <b-form @submit="onSubmitTask" @reset="onResetTaskForm">
        <b-container fluid>
            <b-row class="my-1">
                <b-form-group label-cols="4" label-cols-lg="2" label-for="title">
                    <label for="title">Title:</label>
                    <b-form-input id="title" placeholder="Title" size="sm" type="text" required v-model.trim="task.title"></b-form-input>
                </b-form-group>
            </b-row>
            <b-row class="my-1">
                <b-form-group label-cols="4" label-cols-lg="2" label-for="desc">
                    <label for="desc">Description:</label>
                    <b-form-textarea id="desc" placeholder="Description" size="sm" type="text" max-rows="5" required v-model.trim="task.desc"></b-form-textarea>
                </b-form-group>
            </b-row>
            <b-row class="my-1">
                <b-form-group label-cols="4" label-cols-lg="2" label-for="dueDate">
                    <label for="dueDate">Due Date:</label>
                    <b-form-input id="dueDate"  placeholder="Due Date" size="sm" type="date" required v-model="task.dueDate" :min="todayDate"></b-form-input>
                </b-form-group>
            </b-row>
            <b-row class="my-1">
                <b-form-group label-cols="4" label-cols-lg="2" label-for="taskType">
                    <label for="taskType">Task Type:</label>
                    <b-form-select
                        id="taskType"
                        :options="allTaskTypes"
                        required
                        v-model="task.type"
                    ></b-form-select>
                </b-form-group>
            </b-row>
        

            <b-row class="mt-4 justify-content-between">
              <b-col cols="auto">
                <b-button  variant="outline-secondary " type="reset" @click="hideModal">Close</b-button>
              </b-col>
              <b-col cols="auto" class="">
                <b-button  variant="outline-primary"  type="submit">Save</b-button>
              </b-col>
            </b-row>
    </b-container>
    </b-form>
    </b-modal>
</template>
<script>
import {getTaskName} from "@/utils/TaskTypes"
import {getToday} from "@/utils/dateFormate"
import { useMainStore } from '@/store.js';
  export default {
    name:'add-task-modal',
    setup () {
        const store = useMainStore()
        return { store }
    },
    data(){
        return{
            task:{
                title: '',
                desc: '',
                dueDate: '',
                type: ''
            },
            oldTaskType: ''
        }
    },
    computed:{
        allTaskTypes(){
            const taskNames = getTaskName()
            return taskNames;
        },
        getTaskEdit(){
            return this.store.getTaskEdit
        },
        todayDate(){
            return getToday()
        }
    },
    mounted(){
        // this.$refs['addTaskModal'].show()
    },
    methods: {
      showModal() {
        this.$refs['addTaskModal'].show()
      },
      hideModal() {
        this.$refs['addTaskModal'].hide()
      },
      toggleModal() {
        this.$refs['addTaskModal'].toggle('#toggle-btn')
      },
      onSubmitTask(e){
        e.preventDefault()
        //this mean that there is task to be edit
        if(this.store.taskEdit && Object.keys(this.store.taskEdit).length > 0){
            this.store.editTask(this.task.id, this.oldTaskType, this.task)
        }else{
            // mean that its a new task
            this.store.addNewTask(this.task.type, this.task)
        }
        this.onResetTaskForm(e)
      },
      onResetTaskForm(e){
        e.preventDefault()
        this.task={
            title: '',
            desc: '',
            dueDate: '',
            type: 'Todo'
        }
        this.hideModal()
      },
      onOpeningModal(){
        if(this.getTaskEdit){
            this.oldTaskType = this.getTaskEdit.type
            this.task = this.getTaskEdit
        }
      }
    },
  }
</script>