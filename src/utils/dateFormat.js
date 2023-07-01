import moment from "moment/moment";



export const dateFormat = (date) =>{
    return moment(date).format ('DD/MM/YYYY')
}