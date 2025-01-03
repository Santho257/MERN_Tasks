const asTwoDigit = (number) => {
    return number.toString().padStart(2,0)
}
export const formatDate = (date) => {
    return `${asTwoDigit(new Date(date).getDate())}/${asTwoDigit(new Date(date).getMonth() + 1)}`
}