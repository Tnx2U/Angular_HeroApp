import { Component, OnInit } from '@angular/core';
 
import { Observable, Subject } from 'rxjs';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
 
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>()//RxJS의 Subject사용;
 
  constructor(private heroService: HeroService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);//subject객체의 경우 next함수로 값을 push할 수 있음
  }
 
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),//과다한 리퀘스트 방지용
 
      distinctUntilChanged(),//이전과 같은 새 term은 무시
 
       switchMap((term: string) => this.heroService.searchHeroes(term)),
       //이전 검색값을 삭제하고 최신 검색값으로 검색 서비스 수행
    );
  }
}