import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  
  add(message: string) {
    this.messages.push(message);
     //매개변수를 messages배열에 추가
  }

  clear() {
    this.messages = []; //messages배열을 비움
  }
}
