import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { sendOutline, trashOutline, chatboxEllipsesOutline } from 'ionicons/icons';

interface MensajeGuardado {
  nombre: string;
  email: string;
  mensaje: string;
  fecha: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ContactoPage implements OnInit {

  contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  // Historial dinámico para que el profesor vea sus pruebas locales
  historialMensajes: MensajeGuardado[] = [];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ sendOutline, trashOutline, chatboxEllipsesOutline });
  }

  ngOnInit() {
    this.cargarHistorialLocal();
  }

  cargarHistorialLocal() {
    const datos = localStorage.getItem('kike_portfolio_mensajes');
    if (datos) {
      try {
        this.historialMensajes = JSON.parse(datos);
      } catch (e) {
        console.error('Error al cargar historial', e);
      }
    }
  }

  async enviarFormulario() { 
    if (this.contacto.nombre && this.contacto.email && this.contacto.mensaje) {
      
      // 1. Crear el nuevo registro con marca de tiempo
      const nuevoMensaje: MensajeGuardado = {
        nombre: this.contacto.nombre,
        email: this.contacto.email,
        mensaje: this.contacto.mensaje,
        fecha: new Date().toLocaleString('es-VE') // Formato local de fecha
      };

      // 2. Insertarlo al principio del historial y persistir en LocalStorage
      this.historialMensajes.unshift(nuevoMensaje);
      localStorage.setItem('kike_portfolio_mensajes', JSON.stringify(this.historialMensajes));

      // 3. Fallback seguro: Intentar abrir cliente de correo nativo
      const subject = encodeURIComponent(`Propuesta de Proyecto - ${this.contacto.nombre}`);
      const body = encodeURIComponent(
        `Nombre: ${this.contacto.nombre}\n` +
        `Email: ${this.contacto.email}\n\n` +
        `Mensaje:\n${this.contacto.mensaje}`
      );
      const mailtoLink = `mailto:kikerivera8@gmail.com?subject=${subject}&body=${body}`;
      
      // Ejecutado de forma que no congele la app si falla el protocolo de mailto
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 500);

      // 4. Feedback visual inmediato en la UI
      const toast = await this.toastController.create({
        message: '¡Mensaje procesado localmente y listo para enviar!',
        duration: 3500,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();

      // Limpiar campos del formulario
      this.contacto = { nombre: '', email: '', mensaje: '' };

    } else {
      const alert = await this.alertController.create({
        header: 'Atención',
        message: 'Por favor, rellena todos los campos antes de proceder.',
        buttons: ['Entendido'],
        mode: 'ios'
      });
      await alert.present();
    }
  }

  // Funcionalidad extra: Permitir al profesor limpiar su historial de pruebas
  async borrarHistorial() {
    this.historialMensajes = [];
    localStorage.removeItem('kike_portfolio_mensajes');
    
    const toast = await this.toastController.create({
      message: 'Historial local vaciado de forma segura.',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
}