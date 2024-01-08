# Consulta de CEP React Native

Este é um aplicativo simples desenvolvido em React Native que permite realizar consultas de CEP (Código de Endereçamento Postal) utilizando a API pública fornecida pelo ViaCEP. O aplicativo foi construído com o objetivo de exemplificar o uso de componentes fundamentais do React Native e integração com uma API externa.

## Funcionalidades

- **Busca de CEP:** Insira um CEP válido na caixa de texto e clique em "Buscar". O aplicativo buscará informações associadas ao CEP fornecido, como logradouro, bairro, cidade e estado.

- **Limpar:** Toque no botão "Limpar" para redefinir a caixa de texto e limpar os resultados da busca.

## Instruções de Uso

 **Instalação das Dependências:**
   Certifique-se de ter as dependências necessárias instaladas. Utilize o seguinte comando no terminal na pasta do projeto:
   ```bash
   npm install
```
   
Execução no Dispositivo ou Emulador:
Execute o aplicativo no seu dispositivo físico ou emulador usando o seguinte comando:

``` bash
npx react-native run-android
```
ou

``` bash
npx react-native run-ios
```
## Uso:

- Insira um CEP válido na caixa de texto e clique em "Buscar".
- Toque em "Limpar" para redefinir a caixa de texto e limpar os resultados.


## Bibliotecas Utilizadas
- react-native-modal: Para exibição de modais na aplicação.
- axios: Para realizar chamadas HTTP para a API do ViaCEP.
## Nota Adicional
O aplicativo utiliza a API do ViaCEP para obter informações sobre os endereços associados aos CEPs fornecidos. Agradeço ao ViaCEP pela disponibilização dessa API pública.
