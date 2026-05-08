import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular'; // Añade AlertController
import { addIcons } from 'ionicons'; 
import { arrowForwardOutline, flash, homeOutline, personOutline, mailOutline } from 'ionicons/icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InicioPage implements OnInit {

  constructor(private alertController: AlertController) { 
    addIcons({ arrowForwardOutline, flash, homeOutline, personOutline, mailOutline });
   }

  ngOnInit() { }

  // Esta es la función que llama el botón
  async saludar() {
    const alert = await this.alertController.create({
      header: '¡Acción Iniciada!',
      message: 'Has presionado el botón de inicio correctamente.',
      buttons: ['Excelente'],
      mode: 'ios'
    });

    await alert.present();
  }
}