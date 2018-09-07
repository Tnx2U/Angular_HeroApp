import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ALLOW_MULTIPLE_PLATFORMS } from '@angular/core/src/application_ref';
import { identifierModuleUrl } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(
    private http : HttpClient,
    private messageService: MessageService) {}

  getHeroes() : Observable<Hero[]> {
      //히어로 명단을 패치할때마다 메세지를 보내도록 설정
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
       tap(heroes => this.log('fetched heroes')),
       catchError(this.handleError('getHeroes', []))
    ); //of를 http.get으로 대체
  }

  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
    .pipe(
      map(heroes => heroes[0]),
      tap(h => {
        const outcome = h ? 'fetched' : 'did not find' ;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /*getHeroes() : Hero[] {
    return HEROES;
  }*/

  getHero(id: number): Observable<Hero> {//http로 단일영웅정보를 반환해야함
    // TODO: send the message _after_ fetching the hero
    const url = `${this.heroesUrl}/${id}`;//url지정
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)), //문법조사
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message : string) {
    this.messageService.add(`HeroService: ${message}`); //문법조사
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error : any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      //obserable의 결과가 다 다르기 떄문에 모든 타입에 대해서 정의
      return of(result as T);
    }
  }

  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap( _=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero (hero : Hero) : Observable<Hero> { //post를 사용
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  //Search by Name
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) { //term을 찾지 못하면 빈 array 반환
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
