import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service'
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { HeaderComponent } from './home/header/header.component';
import { ChatComponent } from './home/chat/chat.component';
import { DetailComponent } from './home/detail/detail.component';
import { BoardComponent } from './home/board/board.component';
import { LoginComponent } from './home/board/login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './home/board/signup/signup.component';
import { ProfileComponent } from './home/board/profile/profile.component';
import { StatusComponent } from './home/board/status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ChatComponent,
    DetailComponent,
    BoardComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(
       [
      {
         path: 'login',
        component: LoginComponent
      },
      {
        path: 'profile',
        component:ProfileComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'signup',
        component:SignupComponent
      },
      {
        path: 'status',
        component:StatusComponent
      },
      {
        path: '',
        component:LoginComponent
      },
      {
        path: '**',
        component:LoginComponent
      }
    ] 
  
  )
  ],
  providers: [AuthService,UserService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
