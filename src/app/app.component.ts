import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Word } from './services/word';
import { WordService } from './services/word.service';
import Speech from 'speak-tts'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  word: string = '';
  speech: any;
 public constructor(private titleService: Title, private wordsService: WordService) {}
  ngOnInit() {
    this.generateTitle();
    this.speech = new Speech();
    this.speech.init().then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log("Speech is ready, voices are available", data)
      }).catch(e => {
          console.error("An error occured while initializing : ", e)
      });
      Speech.init({
            'volume': 1,
              'lang': 'en-GB',
              'rate': 1,
              'pitch': 1,
              'voice':'Google UK English Male',
              'splitSentences': true,
              'listeners': {
                  'onvoiceschanged': (voices) => {
                      console.log("Event voiceschanged", voices)
                  }
              }
        });
  }

  generateTitle(){
    setInterval(() => {
      this.wordsService.getword().subscribe((data: Word) => {
       this.word = data[0]['word'];
       //console.log(this.word);
       this.titleService.setTitle(this.word);
       this.speech.speak({
        text: this.word,
    }).then(() => {
        console.log("Success !")
    }).catch(e => {
        console.error("An error occurred :", e)
    })
      })
    }, 2000)
  }




}
