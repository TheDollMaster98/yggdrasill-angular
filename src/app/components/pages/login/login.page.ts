import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  @ViewChild('signUp') signUp!: ElementRef;
  @ViewChild('signIn') signIn!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  loginForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  isRecoveringPassword = false;

  private isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn();

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
          console.log('Utente loggato con successo!');
          this.router.navigate(['admin']);
        },
        error: (error) => {
          console.log('Errore nel login.');
          // Handle error
        },
      });
  }

  // Metodo pubblico che chiama isLoggedIn() del servizio
  public isUserLoggedIn(): Observable<boolean> {
    console.log('loginpage isUserLoggedIn: ');
    console.log(this.isLoggedIn$);
    return this.isLoggedIn$;
  }

  logout() {
    this.authService.signOut().subscribe({
      next: () => {
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

  forgotPassword() {
    // Implementa la logica per il recupero della password
  }

  register() {
    // Implementa la logica per la registrazione
  }
}
