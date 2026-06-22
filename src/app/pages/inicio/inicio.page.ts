import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular'; 
import { addIcons } from 'ionicons'; 
import { 
  arrowForwardOutline, 
  flash, 
  homeOutline, 
  personOutline, 
  mailOutline, 
  downloadOutline, 
  bookmark, 
  bookmarkOutline 
} from 'ionicons/icons';

// Estructura interna para gestionar los proyectos dinámicamente
interface Proyecto {
  id: string;
  titulo: string;
  badge?: string;
  descripcion: string;
  detalle: string;
  tags: string[];
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InicioPage implements OnInit {

  // Listado oficial con todos tus proyectos originales intactos
  proyectos: Proyecto[] = [
    {
      id: 'aura',
      titulo: 'A.U.R.A. (ADMINISTRADOR UNIFICADO DE RECURSOS AUTOGESTIONABLES)',
      badge: 'PROYECTO INSIGNIA',
      descripcion: 'Orquestador unificado de alto nivel desarrollado para la Corporación Digitel. Esta plataforma web fue concebida para centralizar y automatizar la gestión de líneas prepago y postpago dentro de entornos de aseguramiento de calidad (QA).',
      detalle: 'El sistema actúa como una capa de abstracción sobre APIs SOAP/XML complejas, permitiendo que departamentos de Producto, Integración y Calidad realicen ajustes de saldo, cambios de planes y limpiezas de estatus de forma autónoma. Esto redujo drásticamente la dependencia de intervención manual técnica, acelerando el "Time-to-Market" de nuevos servicios.',
      tags: ['Python / Django', 'SOAP API', 'QA Automation']
    },
    {
      id: 'une',
      titulo: 'SISTEMA INTEGRAL DE CONTROL DE ESTUDIOS (UNE)',
      descripcion: 'Desarrollo y modernización de la infraestructura digital de gestión académica para la Universidad Nueva Esparta. El proyecto abarcó la digitalización completa del flujo de vida del estudiante, desde la pre-inscripción hasta el egreso.',
      detalle: 'Implementé módulos robustos para el control de expedientes, carga masiva de notas y generación automatizada de actas académicas. La solución optimizó la comunicación entre la secretaría y el cuerpo docente, garantizando la integridad de los datos académicos y simplificando procesos que anteriormente requerían múltiples validaciones manuales.',
      tags: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 'core-voz',
      titulo: 'PLATAFORMA DE MONITOREO CRÍTICO CORE VOZ',
      descripcion: 'Diseño de una interfaz de control en tiempo real para el monitoreo de tráfico nacional en Telefónica (Movistar). El desafío consistió en la extracción de datos brutos desde switches de red nacionales para convertirlos en información analítica accionable.',
      detalle: 'Utilizando una arquitectura basada en SQL para el almacenamiento y Grafana para la visualización, logré desplegar tableros dinámicos que reflejan métricas de llamadas, SMS y consumo de datos. Esta herramienta permite al equipo de operaciones identificar anomalías en la red de forma instantánea, garantizando la continuidad del servicio a nivel nacional.',
      tags: ['Grafana', 'PRTG Integration', 'SQL Server']
    },
    {
      id: 'ivic',
      titulo: 'SISTEMA DE GESTIÓN TECNOLÓGICA NUCLEAR (IVIC)',
      descripcion: 'Desarrollo de un software de inventario especializado para la unidad tecnológica nuclear del Instituto Venezolano de Investigaciones Científicas. Debido a la naturaleza sensible de los activos, el sistema requirió un enfoque estricto en seguridad y trazabilidad.',
      detalle: 'Fui responsable de todo el ciclo de vida: maquetado de UI, arquitectura de backend y documentación técnica exhaustiva. La aplicación permite un control riguroso de componentes y recursos científicos, integrando flujos de aprobación y reportes de auditoría que cumplen con los estándares institucionales de investigación.',
      tags: ['CodeIgniter 3', 'JavaScript']
    },
    {
      id: 'hexa3d',
      titulo: 'HEXA 3D: PLATAFORMA DE FABRICACIÓN DIGITAL',
      descripcion: 'Ecosistema digital para la gestión de un emprendimiento de fabricación aditiva. Este proyecto fusiona el desarrollo web con la ingeniería de hardware, permitiendo la personalización y comercialización de accesorios impresos en 3D.',
      detalle: 'La plataforma gestiona el catálogo de productos, la recepción de diseños personalizados y el seguimiento de pedidos. Es el punto de unión donde mis capacidades de diseño gráfico (Illustrator) se encuentran con la programación para ofrecer una experiencia de usuario fluida en el mundo de la manufactura digital.',
      tags: ['Illustrator', 'E-commerce', '3D Printing']
    }
  ];

  // Arreglo secundario que se muestra en la pantalla
  proyectosFiltrados: Proyecto[] = [];
  
  // Variables auxiliares para combinar los filtros de texto y chips
  textoBusqueda: string = '';
  tecnologiaSeleccionada: string = 'Todos';
  favoritosIds: Set<string> = new Set<string>();

  constructor(private alertController: AlertController) { 
    addIcons({ 
      arrowForwardOutline, 
      flash, 
      homeOutline, 
      personOutline, 
      mailOutline, 
      downloadOutline, 
      bookmark, 
      bookmarkOutline 
    });
  }

  ngOnInit() { 
    this.cargarFavoritos();
    // Inicialmente mostramos todos los proyectos
    this.proyectosFiltrados = [...this.proyectos];
  }

  // Lógica del Buscador en tiempo real
  buscarProyecto(event: any) {
    this.textoBusqueda = event.target.value?.toLowerCase() || '';
    this.aplicarFiltros();
  }

  // Lógica de los Chips de Tecnología
  filtrarPorTecnologia(tecnologia: string) {
    this.tecnologiaSeleccionada = tecnologia;
    this.aplicarFiltros();
  }

  // Centraliza la combinación de la barra de búsqueda y los chips de filtro
  aplicarFiltros() {
    this.proyectosFiltrados = this.proyectos.filter(proyecto => {
      // Validar coincidencia de texto (en título, descripción o tags)
      const coincideTexto = 
        proyecto.titulo.toLowerCase().includes(this.textoBusqueda) ||
        proyecto.descripcion.toLowerCase().includes(this.textoBusqueda) ||
        proyecto.tags.some(tag => tag.toLowerCase().includes(this.textoBusqueda));

      // Validar coincidencia de tecnología por chip
      let coincideTecnologia = true;
      if (this.tecnologiaSeleccionada !== 'Todos') {
        coincideTecnologia = proyecto.tags.some(tag => 
          tag.toLowerCase().includes(this.tecnologiaSeleccionada.toLowerCase())
        );
      }

      return coincideTexto && coincideTecnologia;
    });
  }

  // Gestión de persistencia local (Favoritos)
  cargarFavoritos() {
    const saved = localStorage.getItem('kike_portfolio_favs');
    if (saved) {
      try {
        this.favoritosIds = new Set<string>(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }

  esFavorito(id: string): boolean {
    return this.favoritosIds.has(id);
  }

  toggleFavorito(id: string) {
    if (this.favoritosIds.has(id)) {
      this.favoritosIds.delete(id);
    } else {
      this.favoritosIds.add(id);
    }
    localStorage.setItem('kike_portfolio_favs', JSON.stringify(Array.from(this.favoritosIds)));
  }

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