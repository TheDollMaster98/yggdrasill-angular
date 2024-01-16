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
import { FirestoreAPIService } from 'src/app/service/firestore-api.service';

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
    private authService: AuthService,
    private db: FirestoreAPIService<any>
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

  // TODO: controllare QUI!
  login() {
    let email = this.loginForm.value.email;
    let psw = this.loginForm.value.password;

    this.authService
      .signIn({
        email: email,
        password: psw,
      })
      .subscribe({
        next: () => {
          this.authService.getCurrentUserEmail().subscribe((userEmail) => {
            if (userEmail) {
              console.log("Email dell'utente:", userEmail);
              // Ottieni il ruolo e il nome dell'utente
              this.authService.getUserRole(userEmail).subscribe((role) => {
                console.log("Ruolo dell'utente:", role);

                // Usa switch per gestire diversi ruoli
                switch (role) {
                  case 'admin':
                    this.db.getById(email, 'admin').subscribe((data) => {
                      // Memorizza il nome ottenuto solo se data è definito
                      if (data) {
                        this.authService.setAuthName(data.name);
                        console.log('data.name: ' + data.name);
                        console.log(
                          'this.authService.getAuthName(): ' +
                            this.authService.getAuthName()
                        );
                      }
                      // Naviga alla pagina di modifica indipendentemente dal risultato
                      this.router.navigate(['/edit']);
                    });
                    break;
                  case 'author':
                    this.db.getById(email, 'authors').subscribe((data) => {
                      if (data) {
                        this.authService.setAuthName(data.name);
                        console.log('data.name: ' + data.name);
                        console.log(
                          'this.authService.getAuthName(): ' +
                            this.authService.getAuthName()
                        );
                      }
                      this.router.navigate(['/edit']);
                    });
                    break;
                  case 'user':
                    this.db.getById(email, 'users').subscribe((data) => {
                      if (data) {
                        this.authService.setAuthName(data.name);
                        console.log('data.name: ' + data.name);
                        console.log(
                          'this.authService.getAuthName(): ' +
                            this.authService.getAuthName()
                        );
                      }
                      this.router.navigate(['/dashboard']);
                    });
                    break;
                  default:
                    // Gestisci il caso in cui il ruolo non è admin, author o user
                    break;
                }
              });
            } else {
              console.log("Impossibile ottenere l'email dell'utente.");
              // Gestire il caso in cui l'email non può essere recuperata
            }
          });
        },
        error: (error) => {
          console.log('Errore nel login:', error);
          // Gestisci errori in modo più specifico per fornire un feedback utente
          // Mostra un messaggio di errore o nascondi lo spinner di caricamento
          // ...
        },
      });
  }

  // Metodo pubblico che chiama isLoggedIn() del servizio
  public isUserLoggedIn(): Observable<boolean> {
    // console.log('loginpage isUserLoggedIn: ');
    // console.log(this.isLoggedIn$);
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
