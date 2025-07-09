import { Component } from '@angular/core';

interface Activity {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  steps?: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activities: Activity[] = [
    {
      id: 1,
      title: 'PLANIFICACIÓN DEL VERANO',
      subtitle: 'Ideas y consejos',
      description: 'Lorem ipsum dolor sit amet...',
      category: 'planning'
    },
    {
      id: 2,
      title: 'EXCURSIONES Y CAMINATAS',
      description: 'Lorem ipsum dolor sit amet...',
      category: 'outdoor',
      steps: ['Paso 1', 'Paso 2', 'Paso 3']
    },
  ];

  toggleDetails(activity: Activity) {
    console.log('Mostrando detalles de:', activity.title);
  }
}