export const isValidPositiveNumber = (str: string): boolean => {
    const num = Number(str);
    return !isNaN(num) && isFinite(num) && num > 0 && str.trim() !== "";
}