<template>
    <b-card-group deck>
        <b-card
            header-tag="header"
            footer-tag="footer"
            body-border-variant="primary"
            :bg-variant="ColumnVariant"
            text-variant="white"
        >
          <template #header>
            <b-row class="justify-content-between">
              <b-col cols="auto" class="mr-auto">
                <h5 class="mb-0">{{ columnType }}</h5>
              </b-col>
              <b-col cols="auto" class="" v-if="columnTypeNotDone">
                <b-button variant="secondary " size="sm" squared @click="openAddEditModal">
                  <b-icon icon="clipboard-plus" aria-hidden="true"></b-icon>
                </b-button>
              </b-col>

            </b-row>
          </template>
          <card-content :columnType="columnType" :tasks="tasks"></card-content>
          <em v-if="!tasks[columnType].length">No Tasks Here</em>
        </b-card>
  </b-card-group>
</template>
<script>
import {taskTypeVariant, getTaskName} from "../utils/TaskTypes"
import CardContent from "@/components/CardContent.vue";
export default {
  name: 'kanban-columns',
  components: {
    CardContent
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
  computed:{
    ColumnVariant(){
      return this.columnType ? taskTypeVariant[this.columnType] : 'primary'
    },
    columnTypeNotDone(){
      return this.columnType !== 'Done'
    }
  },
  methods:{
    log(data){
      console.log("🚀 ~ log ~ data:", data, this.columnType)
    },
    openAddEditModal(){
      this.$bvModal.show('addTaskModal')
      // console.log("🚀 ~ openAddEditModal ~ this.$refs['add-task-modal']:", this.$refs['add-task-modal'])
    }
  }
}
</script>