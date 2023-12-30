import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('signUp') signUp!: ElementRef;
  @ViewChild('signIn') signIn!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  loginForm!: FormGroup;
  isLoggingIn = false;
  isRecoveringPassword = false;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  // animation:
  ngAfterViewInit(): void {
    this.signUp.nativeElement.addEventListener('click', () => {
      this.renderer.addClass(
        this.container.nativeElement,
        'right-panel-active'
      );
    });

    this.signIn.nativeElement.addEventListener('click', () => {
      this.renderer.removeClass(
        this.container.nativeElement,
        'right-panel-active'
      );
    });
  }
  //login
  login() {
    this.authService
      .signIn({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: () => {
          this.isLoggingIn = true;
          console.log('Utente loggato con successo!');
          this.router.navigate(['admin']);
        },
        error: (error) => {
          this.isLoggingIn = false;
          console.log('errore nel login.');
          // Handle error
        },
      });
  }

  forgotPassword() {
    // Implement your forgot password logic here
  }

  register() {
    // Implement your registration logic here
  }
}
