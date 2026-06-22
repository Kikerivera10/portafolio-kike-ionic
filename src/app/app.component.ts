import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  personOutline,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  gameControllerOutline,
  trophyOutline,
  sparklesOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonButton
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
    { title: 'Información Personal', url: '/informacion', icon: 'person' },
    { title: 'Contacto', url: '/contacto', icon: 'mail' },
  ];

  public juegoActivo: boolean = false;
  public puntuacion: number = 0;
  public record: number = Number(localStorage.getItem('kike_game_record')) || 0;
  public tiempoRestante: number = 10;
  public botonPosicionLeft: string = '40%';
  public botonPosicionTop: string = '20px';
  private juegoInterval: any;

  constructor() {
    addIcons({
      'home-outline': homeOutline,
      'person-outline': personOutline,
      'mail-outline': mailOutline,
      'home': homeOutline,
      'person': personOutline,
      'mail': mailOutline,
      'mail-sharp': mailSharp,
      'paper-plane-outline': paperPlaneOutline,
      'paper-plane-sharp': paperPlaneSharp,
      'heart-outline': heartOutline,
      'heart-sharp': heartSharp,
      'archive-outline': archiveOutline,
      'archive-sharp': archiveSharp,
      'trash-outline': trashOutline,
      'trash-sharp': trashSharp,
      'warning-outline': warningOutline,
      'warning-sharp': warningSharp,
      'bookmark-outline': bookmarkOutline,
      'bookmark-sharp': bookmarkSharp,
      'game-controller-outline': gameControllerOutline,
      'trophyOutline': trophyOutline,
      'sparklesOutline': sparklesOutline
    });
  }

  iniciarJuego() {
    this.juegoActivo = true;
    this.puntuacion = 0;
    this.tiempoRestante = 10;
    this.moverBoton();

    this.juegoInterval = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        this.finalizarJuego();
      }
    }, 1000);
  }

  registrarClic(event: Event) {
    event.stopPropagation();
    if (!this.juegoActivo) return;
    
    this.puntuacion++;
    this.moverBoton();
  }


  moverBoton() {
    const randomLeft = Math.floor(Math.random() * 65) + 5;
    const randomTop = Math.floor(Math.random() * 40) + 10;
    this.botonPosicionLeft = `${randomLeft}%`;
    this.botonPosicionTop = `${randomTop}px`;
  }

  finalizarJuego() {
    clearInterval(this.juegoInterval);
    this.juegoActivo = false;
    
    if (this.puntuacion > this.record) {
      this.record = this.puntuacion;
      localStorage.setItem('kike_game_record', this.record.toString());
    }
  }
}