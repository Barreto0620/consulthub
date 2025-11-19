import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, collectionData, query, orderBy, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Consultor, ConsultorFormData } from '../models/consultor.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultorService {
  private collectionName = 'consultores';

  constructor(private firestore: Firestore) {}

  async create(consultorData: ConsultorFormData): Promise<string> {
    try {
      const consultoresRef = collection(this.firestore, this.collectionName);
      const docRef = await addDoc(consultoresRef, {
        ...consultorData,
        dataCadastro: Timestamp.now(),
        dataAtualizacao: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar consultor:', error);
      throw error;
    }
  }

  async update(id: string, consultorData: Partial<ConsultorFormData>): Promise<void> {
    try {
      const docRef = doc(this.firestore, this.collectionName, id);
      await updateDoc(docRef, {
        ...consultorData,
        dataAtualizacao: Timestamp.now()
      });
    } catch (error) {
      console.error('Erro ao atualizar consultor:', error);
      throw error;
    }
  }

  async deleteConsultor(id: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao deletar consultor:', error);
      throw error;
    }
  }

  getById(id: string): Observable<Consultor> {
    return new Observable(observer => {
      const docRef = doc(this.firestore, this.collectionName, id);
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          observer.next({ id: docSnap.id, ...docSnap.data() } as Consultor);
        } else {
          observer.error('Consultor não encontrado');
        }
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getConsultorById(id: string): Observable<Consultor> {
    return this.getById(id);
  }

  getAll(): Observable<Consultor[]> {
    const consultoresRef = collection(this.firestore, this.collectionName);
    const q = query(consultoresRef, orderBy('dataCadastro', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Consultor[]>;
  }
}