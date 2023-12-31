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
  resetPasswordForm!: FormGroup;
  // WIP per ricordarsi del login
  // TODO: continuare dal service e capire come convertire
  // isLoggingIn = this.authService.isLoggedIn;
  // isRecoveringPassword = this.authService.isRecoveringPassword;
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

    // Inizializza il form per la reimpostazione della password
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

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
          console.log('Errore nel login.');
          // Handle error
        },
      });
  }

  logout() {
    this.authService.signOut().subscribe({
      next: () => {
        this.isLoggingIn = false;
        console.log('Utente disconnesso con successo!');
        // Puoi aggiungere il reindirizzamento o altre azioni dopo il logout
      },
      error: (error) => {
        console.log('Errore durante il logout:', error);
        // Gestisci eventuali errori durante il logout
      },
    });
  }

  changeLoginForgot() {
    this.isRecoveringPassword = !this.isRecoveringPassword;
    // Imposta l'email nel form di reimpostazione password, se necessario
    this.resetPasswordForm.get('email')?.setValue(this.loginForm.value.email);
  }
  //WIP
  forgotPassword() {
    // Al click su "Hai dimenticato la password", popola l'input con l'email corrente
    const currentEmail = this.loginForm.value.email;
    if (currentEmail) {
      // Imposta l'email nel form di reimpostazione password, se necessario
      this.resetPasswordForm.get('email')?.setValue(currentEmail);
    } else {
      console.log(
        "Inserisci l'indirizzo email prima di procedere con il recupero della password."
      );
    }
  }

  register() {
    // Implement your registration logic here
  }
}
