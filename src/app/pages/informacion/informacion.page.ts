import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logoPython, logoAngular, logoNodejs, serverOutline, cubeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class InformacionPage implements OnInit {

  constructor() { 
    addIcons({ logoPython, logoAngular, logoNodejs, serverOutline, cubeOutline });
  }

  ngOnInit() {
  }

}
