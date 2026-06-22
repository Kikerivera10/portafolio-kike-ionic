import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  briefcaseOutline, 
  gameControllerOutline, 
  schoolOutline, 
  codeSlashOutline, // Icono corregido aquí
  statsChartOutline
} from 'ionicons/icons';

interface Skill {
  nombre: string;
  nivel: number; // Valor final entre 0 y 1
  progresoActual: number; // Para la animación
}

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InformacionPage implements OnInit {

  // Controla qué vista se muestra (Experiencia o Hobbies)
  vistaSeleccionada: string = 'profesional';

  // Dataset para las barras de progreso dinámicas
  skills: Skill[] = [
    { nombre: 'Angular & Ionic Framework', nivel: 0.45, progresoActual: 0 },
    { nombre: 'Python & Automation Scripts', nivel: 0.90, progresoActual: 0 },
    { nombre: 'SQL Server & Data Analytics', nivel: 0.80, progresoActual: 0 },
    { nombre: '3D CAD & Digital Manufacturing', nivel: 0.75, progresoActual: 0 }
  ];

  constructor() {
    // Registramos el nuevo icono corregido 'codeSlashOutline'
    addIcons({ 
      briefcaseOutline, 
      gameControllerOutline, 
      schoolOutline, 
      codeSlashOutline,
      statsChartOutline
    });
  }

  ngOnInit() {
    this.animarBarrasDeProgreso();
  }

  // Genera un efecto de llenado progresivo al entrar a la vista
  animarBarrasDeProgreso() {
    this.skills.forEach(skill => {
      let current = 0;
      const interval = setInterval(() => {
        if (current >= skill.nivel) {
          skill.progresoActual = skill.nivel;
          clearInterval(interval);
        } else {
          current += 0.05;
          skill.progresoActual = current;
        }
      }, 50);
    });
  }

  // Manejador del cambio de segmento
  segmentChanged(event: any) {
    this.vistaSeleccionada = event.detail.value;
    if (this.vistaSeleccionada === 'profesional') {
      this.animarBarrasDeProgreso();
    }
  }
}