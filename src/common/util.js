export const timeFormat = (number) => {
    const formattedTime = new Date(number * 1000).toISOString().substring(11, 19)
    if (formattedTime.substring(0,2) === "00") {
        return formattedTime.substring(3);
    }
    return formattedTime;
}