//Function for converting ISO date into normal
export const convertDate = (isoDate : string) => {

    const date = new Date(isoDate).toDateString()
    return date

}