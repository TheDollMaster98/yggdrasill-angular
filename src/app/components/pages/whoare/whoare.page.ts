import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whoare',
  templateUrl: './whoare.page.html',
  styleUrls: ['./whoare.page.scss'],
})
export class WhoarePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // Membri chiave visualizzati orizzontalmente
  keyTeamMembers = [
    {
      name: 'Yama',
      role: 'CEO & COFOUNDER',
      image: '../../../../assets/images/pg/yama.jpg',
    },
    {
      name: 'Demetra',
      role: 'Project Manager & COFOUNDER',
      image: '../../../../assets/images/pg/dumi.jpeg',
      showDetails: false,
    },
    {
      name: 'Federica',
      role: 'Creative Director & COFOUNDER',
      image: '../../../../assets/images/pg/federica.png',
      showDetails: false,
    },
    // Aggiungi altri membri chiave del team con i rispettivi ruoli e immagini
  ];

  // Membri del team visualizzati verticalmente con dettagli al passaggio del mouse
  teamMembers = [
    {
      name: 'Marta',
      role: 'Head of communication',
      image: '../../../../assets/images/pg/marta.jpeg',
      showDetails: false,
    },
    {
      name: 'Loris',
      role: 'Web Developer',
      image: '../../../../assets/images/pg/loris.png',
      showDetails: false,
    },
    {
      name: 'Raffaella',
      role: 'Chief Editor',
      image: '../../../../assets/images/pg/raffaella.jpeg',
      showDetails: false,
    },
    {
      name: 'Jasmine',
      role: 'Articolista',
      image: '../../../../assets/images/pg/jasmine.jpeg',
      showDetails: false,
    },
    {
      name: 'Anna',
      role: 'Articolista',
      image: '../../../../assets/images/pg/anna.jpeg',
      showDetails: false,
    },
  ];
  //WIP per lo show details
  // Mostra i dettagli al passaggio del mouse
  showDetails(member: any): void {
    member.showDetails = true;
  }

  // Nascondi i dettagli al mouseleave
  hideDetails(): void {
    this.teamMembers.forEach((member) => {
      member.showDetails = false;
    });
  }
}
