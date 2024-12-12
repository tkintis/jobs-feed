export function getDateMinusMonths(months: number): Date {
    const nowDate = new Date(); 
    nowDate.setMonth(nowDate.getMonth() - months);
    return nowDate;
}