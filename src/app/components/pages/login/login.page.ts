import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreAPIService } from 'src/app/service/firestore-api.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit, OnDestroy {
  @ViewChild('signUp') signUp!: ElementRef;
  @ViewChild('signIn') signIn!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  loginForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  isRecoveringPassword = false;
  private destroy$ = new Subject<void>();
  private isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn();

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private authService: AuthService,
    private db: FirestoreAPIService<any>
  ) {}

  ngOnInit(): void {
    // Inizializza i form al momento della creazione del componente
    this.initializeForms();
  }

  ngAfterViewInit(): void {
    // Configura gli eventi una volta che gli elementi sono inizializzati
    this.setupEventListeners();
  }

  private initializeForms(): void {
    // Inizializza i form per il login e il reset della password
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  private setupEventListeners(): void {
    // Aggiunge gli eventi ai pulsanti di registrazione e accesso
    this.signUp.nativeElement.addEventListener('click', () =>
      this.showSignUpPanel()
    );
    this.signIn.nativeElement.addEventListener('click', () =>
      this.showSignInPanel()
    );
  }

  private showSignUpPanel(): void {
    // Attiva la visualizzazione del pannello di registrazione
    this.renderer.addClass(this.container.nativeElement, 'right-panel-active');
  }

  private showSignInPanel(): void {
    // Disattiva la visualizzazione del pannello di registrazione
    this.renderer.removeClass(
      this.container.nativeElement,
      'right-panel-active'
    );
  }

  login() {
    // Esegue il login utente utilizzando il servizio di autenticazione
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService
      .signIn({ email, password })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.handleSuccessfulLogin(email),
        error: (error) => this.handleLoginError(error),
      });
  }

  private handleSuccessfulLogin(email: string): void {
    // Gestisce il login utente riuscito
    this.sessionService.setAuthState(true);
    this.authService
      .getCurrentUserEmail()
      .pipe(
        switchMap((userEmail: string | null) => {
          if (userEmail) {
            return this.handleUserRole(email, userEmail);
          } else {
            console.log("Impossibile ottenere l'email dell'utente.");
            this.router.navigate(['/dashboard']);
            return of(false);
          }
        })
      )
      .subscribe();
  }

  private handleUserRole(
    email: string,
    userEmail: string
  ): Observable<boolean> {
    // Gestisce il ruolo dell'utente dopo il login
    return this.authService.getUserRole(userEmail).pipe(
      map((role: string) => this.handleRoleSpecificNavigation(email, role)),
      catchError(() => {
        this.router.navigate(['/dashboard']);
        this.sessionService.setAuthState(false);
        return of(false);
      })
    );
  }

  private handleRoleSpecificNavigation(email: string, role: string): boolean {
    // Naviga in base al ruolo specifico dell'utente
    switch (role) {
      case 'admin':
        this.navigateBasedOnRole(email, 'admin');
        return true;
      case 'author':
        this.navigateBasedOnRole(email, 'authors');
        return true;
      case 'user':
        this.navigateBasedOnRole(email, 'users');
        return true;
      default:
        return false;
    }
  }

  private navigateBasedOnRole(email: string, roleType: string): void {
    // Ottiene i dettagli dell'utente e naviga in base al ruolo
    this.db.getById(email, roleType).subscribe((data) => {
      if (data) {
        this.authService.setAuthName(data.name);
        console.log('data.name: ' + data.name);
        console.log(
          'this.authService.getAuthName(): ' + this.authService.getAuthName()
        );
      }
      this.router.navigate(['/edit', data.name]);
    });
  }

  private handleLoginError(error: any): void {
    // Gestisce gli errori durante il login
    this.sessionService.setAuthState(false);
    console.error('Errore nel login:', error);
    // Aggiungi qui la gestione specifica degli errori, ad esempio mostrando un messaggio all'utente
    // ...
  }

  ngOnDestroy(): void {
    // Completa il subject per evitare memory leak
    this.destroy$.next();
    this.destroy$.complete();
  }
}
