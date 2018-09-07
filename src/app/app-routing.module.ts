import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [  //path()와 component를 가지는 라우터 생성자 선언
  //path로 접속했을때 redirctTo 경로로 다시 매칭시켜줌
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  //path에 : 를 넣으면 뒤에 오는 변수의 placeholder로 작용
  {path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  //위에서 만든 route를 루트에서 라우팅 실행
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { 

}

