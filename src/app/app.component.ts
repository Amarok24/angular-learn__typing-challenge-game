import { Component, VERSION, OnInit } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

export { AppComponent };

type validCssClassName = 'correct' | 'wrong' | '';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
class AppComponent implements OnInit
{
  lorem: LoremIpsum;
  elemInput: HTMLInputElement | null = null;
  userText: string = '';
  randomText: string = '';
  readonly _angularVersion: string = VERSION.full;


  constructor()
  {
    // This app.component constructor will be called before any child-class constructors.
    // Constructor will run before DOM is ready.
    // If you need to run code after DOM ready, insert the code into ngOnInit method.
    console.log('AppComponent constructor');

    this.lorem = new LoremIpsum(
      {
        wordsPerSentence: { min: 3, max: 5 },
      });
  }


  protected startChallenge(): void 
  {
    if (this.elemInput)
    {
      console.log('focusing input element...');
      this.elemInput.value = '';
      this.elemInput.focus();
    }

    this.randomText = this.lorem.generateSentences(1);
    this.userText = '';
  }


  get angularVersion(): string
  {
    return this._angularVersion;
  }


  onKeyDown(kEvent: KeyboardEvent): void 
  {
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
    if (this.textMatches() && (kEvent.key === 'Enter'))
    {
      console.log('restarting...');
      this.startChallenge();
    }
  }


  onInput(et: EventTarget): void 
  {
    const input = et as HTMLInputElement;
    this.userText = input.value;
    console.log(this.userText);
  }


  textMatches = (): boolean => this.randomText === this.userText;


  // The second parameter gets sometimes passed as 'undefined', but TS does not care :-/
  // Correctly the 2nd parameter would need to be defined as "char2?: string".
  getCssClassByComparison(char1: string, char2: string): validCssClassName 
  {
    // console.log('comparing...'); // This would just spam the console - reason see below.
    // There's a problem with this approach when using this method for property binding in the component html template: Angular seems to periodically run such methods. (??)

    if (char2 === undefined) return ''; // Or: if (!char2), but I wanted to be explicit.

    return char1 === char2 ? 'correct' : 'wrong';
  }

  // Handle any additional initialisation tasks here (will run after DOM is ready).
  ngOnInit(): void
  {
    this.elemInput = document.querySelector<HTMLInputElement>('#user-input');
    this.startChallenge();
  }
}
