// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today  = new Date();


export function getToday(){
   return today.toISOString().split('T')[0]
}

export function getFormattedDate(date){
    const currentDate = new Date(date)
    return new Intl.DateTimeFormat('en-US', {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(currentDate);
}