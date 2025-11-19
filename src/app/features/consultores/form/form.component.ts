import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultorService } from '../../../core/services/consultor.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { Consultor } from '../../../core/models/consultor.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  consultorForm!: FormGroup;
  isEditMode = false;
  consultorId?: string;
  loading = false;
  errorMessage = '';

  areasEspecializacao = [
    'Tecnologia da Informação',
    'Recursos Humanos',
    'Marketing',
    'Finanças',
    'Operações',
    'Estratégia',
    'Vendas'
  ];

  constructor(
    private fb: FormBuilder,
    private consultorService: ConsultorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.consultorId = params['id'];
        // ✅ CORRIGIDO: Agora só carrega se consultorId não for undefined
        if (this.consultorId) {
          this.loadConsultor(this.consultorId);
        }
      }
    });
  }

  initForm(): void {
    this.consultorForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      areaEspecializacao: ['', Validators.required]
    });
  }

  loadConsultor(id: string): void {
    this.consultorService.getById(id).subscribe({
      next: (consultor: Consultor) => {
        this.consultorForm.patchValue(consultor);
      },
      error: (error) => {
        console.error('Erro ao carregar consultor:', error);
        this.errorMessage = 'Erro ao carregar dados do consultor';
      }
    });
  }

  formatPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      input.value = value;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.consultorForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const consultorData = this.consultorForm.value;

      try {
        if (this.isEditMode && this.consultorId) {
          await this.consultorService.update(this.consultorId, consultorData);
        } else {
          await this.consultorService.create(consultorData);
        }
        this.router.navigate(['/consultores']);
      } catch (error) {
        console.error('Erro ao salvar consultor:', error);
        this.errorMessage = 'Erro ao salvar consultor. Tente novamente.';
      } finally {
        this.loading = false;
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/consultores']);
  }
}