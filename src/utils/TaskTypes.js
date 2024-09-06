export const taskNames = ['Todo', 'In progress', 'In review', 'Done'];

export const taskTypeVariant = {
    Todo: 'primary',
    Inprogress: 'info',
    InReview: 'warning',
    Done: 'success'
}



export function camelString(str) {
    return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}

export function getTaskName(){
    return Object.keys(taskTypeVariant);
}