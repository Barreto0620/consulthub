import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ← ADICIONE ISSO
import { ConsultorService } from '../../../core/services/consultor.service';
import { AuthService } from '../../../core/services/auth.service';
import { Consultor } from '../../../core/models/consultor.model';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // ← ADICIONE FormsModule
  templateUrl: './lista.html',
  styleUrls: ['./lista.css']
})
export class Lista implements OnInit {
  private consultorService = inject(ConsultorService);
  private authService = inject(AuthService);
  private router = inject(Router);

  consultores: Consultor[] = [];
  consultoresFiltrados: Consultor[] = []; // ← NOVO
  loading = true;
  errorMessage = '';
  searchTerm = ''; // ← NOVO

  ngOnInit(): void {
    this.loadConsultores();
  }

  loadConsultores(): void {
    this.loading = true;
    this.errorMessage = '';

    this.consultorService.getAll().subscribe({
      next: (data) => {
        this.consultores = data;
        this.consultoresFiltrados = data; // ← NOVO
        this.loading = false;
        console.log('Consultores carregados:', data);
      },
      error: (error) => {
        console.error('Erro ao carregar consultores:', error);
        this.errorMessage = 'Erro ao carregar consultores. Tente novamente.';
        this.loading = false;
      }
    });
  }

  // ← NOVO MÉTODO DE BUSCA
  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.consultoresFiltrados = this.consultores;
      return;
    }

    this.consultoresFiltrados = this.consultores.filter(consultor => 
      consultor.nomeCompleto.toLowerCase().includes(term) ||
      consultor.email.toLowerCase().includes(term) ||
      consultor.telefone.toLowerCase().includes(term) ||
      consultor.areaEspecializacao.toLowerCase().includes(term)
    );
  }

  // ← NOVO MÉTODO PARA LIMPAR BUSCA
  clearSearch(): void {
    this.searchTerm = '';
    this.consultoresFiltrados = this.consultores;
  }

  viewDetails(id: string): void {
    this.router.navigate(['/consultores', id]);
  }

  editConsultor(id: string): void {
    this.router.navigate(['/consultores/editar', id]);
  }

  async deleteConsultor(id: string, nome: string): Promise<void> {
    if (confirm(`Tem certeza que deseja excluir o consultor ${nome}?`)) {
      try {
        await this.consultorService.deleteConsultor(id);
        this.loadConsultores();
        alert('Consultor excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir consultor:', error);
        alert('Erro ao excluir consultor. Tente novamente.');
      }
    }
  }

  novoConsultor(): void {
    this.router.navigate(['/consultores/novo']);
  }

  async logout(): Promise<void> {
    if (confirm('Deseja realmente sair?')) {
      await this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}