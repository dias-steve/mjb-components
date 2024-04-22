
/**
 * Date formater
 * Convert a raw string date to a dd/mm/yyyy 
 * @param date raw string date
 * @returns date in dd/mm/yyyy format
 */
export const dateConverter = (rawDate: string) => {
    const date = new Date(rawDate);

    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;

}


/**
 * 
 * @param date 
 * @returns 
 */
export const dataObjectToString = (date: Date) =>{
    return date.getDate().toString().padStart(2, '0')+'/'+ (date.getMonth()+1).toString().padStart(2, '0')+'/'+date.getFullYear();
}

export const getNbDayBetweentowDate = (rawDateStart: string, rawDateEnd: string) => {
    const dateStart = new Date(rawDateStart);
    const dateEnd = new Date(rawDateEnd);
    // Calculer la différence en millisecondes
    var differenceEnMillisecondes = dateEnd.getTime() - dateStart.getTime() 

    // Calculer le nombre de jours en divisant par le nombre de millisecondes par jour
    const nombreDeJours = differenceEnMillisecondes / (1000 * 60 * 60 * 24) ;

    return nombreDeJours;
}

export function parseISOStringToDateObject(dateISO: string) {
    var b : any= String(dateISO).split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }