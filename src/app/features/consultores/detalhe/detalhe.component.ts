import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultorService } from '../../../core/services/consultor.service';
import { Consultor } from '../../../core/models/consultor.model';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, LoadingComponent],
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {
  consultor$!: Observable<Consultor>;
  consultorId: string;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultorService: ConsultorService
  ) {
    this.consultorId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    if (this.consultorId) {
      this.consultor$ = this.consultorService.getConsultorById(this.consultorId);
      setTimeout(() => this.loading = false, 500);
    }
  }

  editConsultor() {
    this.router.navigate(['/consultores/editar', this.consultorId]);
  }

  async deleteConsultor(consultor: Consultor) {
    if (confirm(`Deseja realmente excluir ${consultor.nomeCompleto}?`)) {
      try {
        await this.consultorService.deleteConsultor(this.consultorId);
        this.router.navigate(['/consultores']);
      } catch (error) {
        alert('Erro ao excluir consultor');
      }
    }
  }

  goBack() {
    this.router.navigate(['/consultores']);
  }

  formatDate(date: any): string {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  formatPhone(phone: string): string {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
    }
    return phone;
  }
}