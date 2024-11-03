import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  etapa = 1;
  dados: any = {
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    valorFinanciamento: null,
    prazo: null,
    rendaMensal: null,
    patrimonio: null
  };

  avancarEtapa() {
    if (this.etapa < 3) {
      this.etapa++;
    }
  }

  retrocederEtapa() {
    if (this.etapa > 1) {
      this.etapa--;
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log("Formulário enviado com sucesso!", this.dados);
    } else {
      console.log("Formulário inválido.");
    }
  }
}
