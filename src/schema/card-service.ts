import { Injectable } from '@angular/core';
import { Item } from './card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor() {}

  baseUrl = 'http://127.0.0.1:8964/api/v1/bangumiData/getThisSeason';

  async getThisSeason(date: string): Promise<Item[]> {
    try {
      const url = `${this.baseUrl}?date=${date}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: Item[] = await response.json();

      if (data) {
        return data;
      } else {
        console.error('API 错误:');
        return [];
      }
    } catch (error) {
      console.error('请求失败:', error);
      return [];
    }
  }

}
