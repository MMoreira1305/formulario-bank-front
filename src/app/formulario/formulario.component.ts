import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  etapa = 1;
  isLoading = false;
  dados: any = {
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    valorFinanciamento: null,
    prazo: null,
    rendaMensal: null,
    patrimonio: null,
    token: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  avancarEtapa() {
    if (this.etapa < 4) { 
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
      this.http.post(environment.apiUrl+'/lead', this.dados)
        .subscribe({
          next: (response) => {
            console.log("Formulário enviado com sucesso!");
            alert("Dados enviados com sucesso!");
            this.avancarEtapa(); // Avança para a etapa de verificação de token
            this.isLoading = false;
          },
          error: (error) => {
            console.error("Erro ao enviar formulário:", error);
            alert("Houve um erro ao enviar os dados. Tente novamente. \n Erro: " + error);
            this.isLoading = false;
          }
        });
    } else {
      console.log("Formulário inválido.");
    }
  }

  verificarToken() {
    this.http.get(environment.apiUrl + '/token/'+this.dados.email, {})
      .subscribe({
        // Retorna o token que foi enviado para o email
        next: (response) => {
          if(this.dados.token = response){
            this.confirmaToken();
            console.log("Token verificado com sucesso!", response);
            alert("Token verificado com sucesso! Seu cadastro foi enviado para nossos especialistas!");
            this.router.navigate(['/formulario']);
          }else{
            alert("Token inválido! Tente novamente ou reenvie!");
          }
          
        },
        error: (error) => {
          console.error("Erro ao verificar token:", error);
          alert("Token inválido. Tente novamente.");
        }
      });
  }

  enviarNovamenteToken() {
    // Função para reenviar o token, se necessário
    this.http.post(environment.apiUrl + '/token/send/'+this.dados.email, {})
      .subscribe({
        next: (response) => {
          console.log("Token reenviado com sucesso!", response);
          alert("Token reenviado para o seu email.");
        },
        error: (error) => {
          console.error("Erro ao reenviar token:", error);
          alert("Houve um erro ao reenviar o token. Tente novamente.");
        }
      });
  }

  confirmaToken(){
    this.http.put(environment.apiUrl + '/token/confirm/' + this.dados.email, {})
      .subscribe({
        next: (response) => {
          console.log("Confirmando envio de token, ok!");
        },
        error: (error) => {
          alert("Erro ao confirmar que o token foi correto!:" + error);
          console.error("Erro ao confirmar que o token foi correto!:", error);
        }
    })
  }
}
