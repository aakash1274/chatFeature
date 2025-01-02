import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { GoogleAuthProvider } from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  faGoogle = faGoogle


  toastrService = inject(ToastrService);

  constructor(private router: Router, private authService: AuthService) {};
  handleSignInWithEmail(){
    console.log("Email test");
    
  }
  handleSignInWithGoogle(){
    console.log("loging");

    this.authService.signInWithGoogle().then((result) =>{
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("loging");
      const user = result.user;

      this.authService.addUserData(user,null);
      this.authService.setCurrentUser(user);
      this.router.navigateByUrl('')
    })
  }
}
