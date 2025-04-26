export const getColor = (num) => {
    if (num >= 80) {
        return "#0077b6";
    } else if (num >= 60) {
        return "#57cc99";
    } else if (num >= 45) {
        return "#f77f00";
    } else {
        return "#d90429";
    }
}
