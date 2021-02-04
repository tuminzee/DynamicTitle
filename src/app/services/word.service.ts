import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Word } from './word';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  getword(){
    return this.http.get<Word>(this.url);
  }
}
