import { Component } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- ESTA ES LA CLAVE

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // <--- SE AGREGA AQUÍ
})
export class ContactoPage {

  contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  // CAMBIA EL NOMBRE AQUÍ PARA QUE COINCIDA CON EL HTML
  async enviarFormulario() { 
    if (this.contacto.nombre && this.contacto.email && this.contacto.mensaje) {
      
      const subject = encodeURIComponent(`Propuesta de Proyecto - ${this.contacto.nombre}`);
      const body = encodeURIComponent(
        `Nombre: ${this.contacto.nombre}\n` +
        `Email: ${this.contacto.email}\n\n` +
        `Mensaje:\n${this.contacto.mensaje}`
      );
      
      const mailtoLink = `mailto:kikerivera8@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;

      const toast = await this.toastController.create({
        message: 'Abriendo correo... ¡Gracias por escribir!',
        duration: 3000,
        color: 'success'
      });
      await toast.present();

      this.contacto = { nombre: '', email: '', mensaje: '' };

    } else {
      const alert = await this.alertController.create({
        header: 'Atención',
        message: 'Por favor, rellena todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}