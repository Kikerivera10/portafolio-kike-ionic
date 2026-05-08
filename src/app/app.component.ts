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
  IonRouterLink
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
  bookmarkSharp
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
    IonRouterOutlet
  ],
})
export class AppComponent {
  // Configuración de las páginas del menú lateral
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
    { title: 'Información Personal', url: '/informacion', icon: 'person' },
    { title: 'Contacto', url: '/contacto', icon: 'mail' },
  ];
  // public appPages = [
  //   { title: 'Inicio', url: '/inicio', icon: 'homeOutline' },
  //   { title: 'Información Personal', url: '/informacion', icon: 'personOutline' },
  //   { title: 'Contacto', url: '/contacto', icon: 'mailOutline' },
  // ];

  // Etiquetas secundarias del menú
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {
    /**
     * Registro de iconos. 
     * Mapeamos nombres cortos ('home') a las constantes reales (homeOutline).
     */
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
      'bookmark-sharp': bookmarkSharp
    });
  }
}