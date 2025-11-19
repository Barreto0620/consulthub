export interface Consultor {
  id?: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  areaEspecializacao: string;
  ativo?: boolean; // ✅ ADICIONADO
  dataCadastro?: any; // Firestore Timestamp
  dataAtualizacao?: any; // Firestore Timestamp
}

export interface ConsultorFormData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  areaEspecializacao: string;
  ativo?: boolean; // ✅ ADICIONADO
}