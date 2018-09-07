import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';//외부클래스 hero를 Hero로 가져옴
import { HeroService } from '../hero.service';
//import { HEROES } from '../mock-heroes';//히어로 배열 불러옴

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  //heroes = HEROES; //불러온 배열 변수에 바인딩
  heroes : Hero[];
  /*selectedHero : Hero;*/

  //컴포넌트가 실행되면 heroservice의 객체를 만듬
  constructor(private heroService: HeroService) { }

  //constructor로 생성된 객체 heroService로부터 히어로 명단을 받아서 heroes변수에 저장
  /*getHeroes(): void {
    this.heroes = this.heroService.getHeroes(); 
  }*/
  getHeroes() : void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h!== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  /*onSelect(hero: Hero) : void {//문법주의
    this.selectedHero = hero; 
  }*/

}
