import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class TimeMessFormatPipe implements PipeTransform {
  transform(value: Date): string {
    const now = new Date();
    
    if (this.isSameDate(value, now)) {
      return this.formatTime(value);
    } else {
      return 'Today';
    }
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate();
  }

  private formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    
    const formattedTime = `${this.padNumber(hours)}:${this.padNumber(minutes)} ${amPm}`;
    return formattedTime;
  }

  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
