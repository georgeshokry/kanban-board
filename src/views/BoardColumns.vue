<template>
    <b-container fluid>
      <b-row class="py-5">
        <b-col lg="3" sm="12" class="mb-3">
          <kanban-column column-type="Todo" :tasks="allKanban"></kanban-column>
        </b-col>
        <b-col lg="3" sm="12" class="mb-3">
          <kanban-column column-type="Inprogress" :tasks="allKanban"></kanban-column>
        </b-col>
        <b-col lg="3" sm="12" class="mb-3">
          <kanban-column column-type="InReview" :tasks="allKanban"></kanban-column>
        </b-col>
        <b-col lg="3" sm="12" class="mb-3">
          <kanban-column column-type="Done" :tasks="allKanban"></kanban-column>
        </b-col>
      </b-row>
    </b-container>
</template>
  
<script>
import KanbanColumn from "@/components/KanbanColumn.vue";
import { useMainStore } from '@/store.js';
export default {
  name: 'board-columns',
  setup () {
    const store = useMainStore()
    return { store }
  },
  components: {
    KanbanColumn
  },
  data(){
    return{
      allKanban: {}
    }
  },
  computed:{
    getKanban(){
      return this.store.getKanban
    },
    getFilteredKanban(){
      return this.store.getFilteredKanban
    }
  },
  watch:{
    getFilteredKanban:{
      handler(newVal){
        newVal ? this.allKanban = newVal : this.allKanban = this.getKanban
      }
    }
  },
  created(){
    // read old tasks from user localstorage
    this.store.readLocalTasks()
    this.allKanban = this.getKanban
  },
  methods:{

  }
}
</script>