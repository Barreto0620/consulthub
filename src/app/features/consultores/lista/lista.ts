import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConsultorService } from '../../../core/services/consultor.service';
import { Consultor } from '../../../core/models/consultor.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {
  consultores$!: Observable<Consultor[]>;
  loading = true;

  constructor(
    private consultorService: ConsultorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.consultores$ = this.consultorService.getAll();
    setTimeout(() => this.loading = false, 500);
  }

  viewDetails(id: string) {
    this.router.navigate(['/consultores', id]);
  }

  editConsultor(id: string) {
    this.router.navigate(['/consultores/editar', id]);
  }

  async deleteConsultor(consultor: Consultor) {
    if (confirm(`Deseja realmente excluir ${consultor.nomeCompleto}?`)) {
      try {
        if (consultor.id) {
          await this.consultorService.deleteConsultor(consultor.id);
        }
      } catch (error) {
        alert('Erro ao excluir consultor');
      }
    }
  }

  createNew() {
    this.router.navigate(['/consultores/novo']);
  }
}
