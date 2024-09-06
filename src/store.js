import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => {
    return {
        kanban: {
            'Todo': [{ id: 1, title: 'Task 1', desc: 'desc', dueDate: '01-12-2024', type: 'Todo', priority: 'high', order:0 }],
            'Inprogress': [{ id: 2, title: 'Task 2', desc: 'desc', dueDate: '01-12-2024', type: 'Inprogress', priority: 'high', order: 0 }],
            'InReview': [{ id: 3, title: 'Task 3', desc: 'desc', dueDate: '01-12-2024', type: 'InReview', priority: 'high', order: 0 }],
            'Done': [{ id: 4, title: 'Task 4', desc: 'desc', dueDate: '01-12-2024', type: 'Done', priority: 'high', order: 0 }]
        },
        taskEdit: {}
    };
  },
  getters: {
    getKanban(state) {
      return state.kanban;
    },
    getTaskEdit(state){
      console.log("🚀 ~ getTaskEdit ~ state:", state.taskEdit)
      return state.taskEdit;
    }
  },
  actions: {
    addNewTask(taskType){
      this.$state.kanban[taskType].push({
          id: 6516512, title: 'Task 6516512', desc: 'desc', dueDate: '01-12-2024' 
      })
    },
    changeTaskTypeOrder(task){
      this.$state.kanban[task.Type]
    }
  }
});