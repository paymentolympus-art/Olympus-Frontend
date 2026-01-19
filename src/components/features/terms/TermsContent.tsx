import { motion } from "motion/react";
import type { TermsDocument } from "./TermsSidebar";

interface TermsContentProps {
  activeDocument: TermsDocument;
}

const documentTitles: Record<TermsDocument, string> = {
  "privacy-buyers": "O QUE FAZEMOS COM AS SUAS INFORMAÇÕES - USUÁRIO COMPRADOR",
  "privacy-site": "AVISO DE PRIVACIDADE DO SITE",
  "privacy-sellers": "O QUE FAZEMOS COM AS SUAS INFORMAÇÕES - USUÁRIO VENDEDOR",
  ethics: "CÓDIGO DE ÉTICA",
  antifraud: "POLÍTICA ANTIFRAUDE",
  cookies: "POLÍTICA DE COOKIES",
  aml: "PREVENÇÃO À LAVAGEM DE DINHEIRO E FINANCIAMENTO AO TERRORISMO",
  security: "POLÍTICA DE SEGURANÇA DA INFORMAÇÃO",
  "general-terms": "TERMOS GERAIS DE USO",
  "terms-consumers": "TERMOS DE USO PARA CONSUMIDORES",
};

export function TermsContent({ activeDocument }: TermsContentProps) {
  return (
    <motion.main
      key={activeDocument}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 min-w-0"
    >
      <div className="bg-gradient-to-br from-[#0d0a14]/80 to-[#110d1a]/60 rounded-lg p-6 lg:p-10 border-[0.1px] border-zinc-800/40">
        <header className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-purple-500 to-primary mb-4">
            {documentTitles[activeDocument]}
          </h1>
          <p className="text-gray-500 text-sm">
            Última atualização: 10 de Janeiro de 2026
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4" />
        </header>

        <DocumentContent type={activeDocument} />
      </div>
    </motion.main>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-lg mb-6">
      <p className="text-gray-200 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-pink-600/20 to-pink-500/10 border-l-4 border-pink-500 p-4 rounded-r-lg mb-6">
      <p className="text-gray-200 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-purple-400 mt-8 mb-4">
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-300 text-sm leading-relaxed mb-4">{children}</p>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-medium">
      {children}
    </span>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-gray-300 text-sm leading-relaxed mb-2 ml-4 list-disc">
      {children}
    </li>
  );
}

function DocumentContent({ type }: { type: TermsDocument }) {
  switch (type) {
    case "general-terms":
      return <GeneralTermsContent />;
    case "privacy-buyers":
      return <PrivacyBuyersContent />;
    case "privacy-site":
      return <PrivacySiteContent />;
    case "privacy-sellers":
      return <PrivacySellersContent />;
    case "ethics":
      return <EthicsContent />;
    case "antifraud":
      return <AntifraudContent />;
    case "cookies":
      return <CookiesContent />;
    case "aml":
      return <AmlContent />;
    case "security":
      return <SecurityContent />;
    case "terms-consumers":
      return <TermsConsumersContent />;
    default:
      return <GeneralTermsContent />;
  }
}

function PrivacyBuyersContent() {
  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <p className="text-gray-400 text-sm mb-6">
        Aviso de Privacidade para Usuários Compradores
      </p>

      <InfoBox>
        <strong>
          Fizemos o máximo para explicar de forma clara e simples quais dados
          pessoais precisaremos de você e o que vamos fazer com cada um deles.
        </strong>{" "}
        Por isso, separamos abaixo os pontos mais importantes, que também podem
        ser lidos de forma bem completa e detalhada no nosso Aviso de
        Privacidade - Usuário Comprador.
        <br />
        <br />
        Além disso, estamos sempre disponíveis para tirar qualquer dúvida geral
        que você tenha por meio do <strong>contato@olympuspay.com.br</strong>.
        Para falar especificamente sobre seus dados pessoais, possuímos um canal
        específico: <strong>lgpd@olympuspay.com.br</strong>.
      </InfoBox>

      <SectionTitle>
        1. Quem é o responsável pelo tratamento de dados?
      </SectionTitle>

      <Paragraph>
        Somos <Highlight>operadores</Highlight> do tratamento dos dados pessoais
        do Usuário Comprador, que são inseridos em nossas soluções pelo Usuário
        Vendedor ou Usuário Afiliado. Ou seja, realizamos o tratamento de dados
        com base nos tratamentos informados pelo Usuário Vendedor ou Usuário
        Afiliado.
      </Paragraph>

      <Paragraph>
        O Usuário Vendedor e Usuário Afiliado são os{" "}
        <Highlight>controladores</Highlight> dos dados pessoais que coletarem e
        tratarem por meio da plataforma, tais como informações de Usuários
        Compradores, dados essenciais para fornecer seus produtos digitais e
        realizar entregas, uma vez que o Usuário Vendedor ou Usuário Afiliado é
        capaz de determinar os elementos essenciais do tratamento e as
        finalidades específicas.
      </Paragraph>

      <Paragraph>
        Além disso, também existem alguns suboperadores terceiros contratados
        pela OlympusPay, que podem realizar o tratamento dos dados pessoais, como
        assessoria jurídica, parceiros tecnológicos, servidores, entre outros.
      </Paragraph>

      <SectionTitle>2. Como faremos a segurança de seus dados?</SectionTitle>

      <Paragraph>
        A OlympusPay se compromete a manter os dados fornecidos na plataforma em
        ambiente seguro, observados o porte do tratamento, por meio de medidas
        técnicas compatíveis com os padrões internacionais e pelo estímulo ao
        uso de boas práticas, o que inclui uma análise de riscos de segurança da
        informação e a implementação de Políticas de Segurança da Informação
        eficazes e difundidas.
      </Paragraph>

      <Paragraph>
        <strong>Segurança AWS:</strong> Para garantir que suas informações sejam
        armazenadas em ambiente seguro, a plataforma utiliza os servidores AWS
        (Amazon Web Services), cujo acesso é restrito. Com isso, essa empresa
        passa a ter acesso aos seus dados somente para armazená-los assim que
        você os fornece na OlympusPay.
      </Paragraph>

      <SectionTitle>
        3. Quais dados precisa nos informar para utilizar nossa plataforma?
      </SectionTitle>

      <Paragraph>
        Para realizar o cadastro e utilizar os nossos serviços, você deverá
        informar, se você é um Usuário Comprador:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Nome</ListItem>
        <ListItem>E-mail</ListItem>
        <ListItem>Telefone ou Celular para Contato</ListItem>
        <ListItem>CPF</ListItem>
      </ul>

      <SectionTitle>
        4. Para quais finalidades utilizamos os seus dados pessoais?
      </SectionTitle>

      <Paragraph>
        Todos os seus dados são tratados com finalidades específicas e de acordo
        com a Lei Geral de Proteção de Dados Pessoais. Nós poderemos tratar
        essas informações para:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Prestar o nosso serviço</ListItem>
        <ListItem>
          Compartilhar dados com os Usuários Vendedores e Usuários Afiliados
        </ListItem>
        <ListItem>Dar suporte e realizar atendimento ao cliente</ListItem>
        <ListItem>Enviar contatos relacionados a vendas e marketing</ListItem>
        <ListItem>Oferecer nossos serviços ou produtos</ListItem>
      </ul>

      <SectionTitle>
        5. Com quem compartilhamos seus dados pessoais?
      </SectionTitle>

      <Paragraph>
        Nós não iremos compartilhar seus dados com terceiros, salvo nos casos
        citados neste Aviso de Privacidade, em caso de consentimento legal do
        titular dos dados pessoais e por força de ordem judicial ou determinação
        legal.
      </Paragraph>

      <SectionTitle>6. Seus registros de acesso serão coletados?</SectionTitle>

      <Paragraph>
        Quando você entra na nossa plataforma, colhemos seus registros de
        acesso, ou seja, conjunto de informações referentes à data e hora de uso
        de uma determinada aplicação de internet a partir de um determinado
        endereço IP. Essas informações serão mantidas pela OlympusPay, sob
        sigilo, em ambiente controlado e de segurança, pelo prazo mínimo de 06
        (seis) meses, nos termos da Lei n. 12.965/2014, e artigo 7º, II, da Lei
        n. 13.709/18.
      </Paragraph>

      <SectionTitle>
        7. Registros de comunicações serão armazenados?
      </SectionTitle>

      <Paragraph>
        Nós iremos armazenar também as conversas que você tiver conosco em
        nossos canais de comunicação, pois isso irá melhorar o seu atendimento,
        torná-lo mais eficiente e mais seguro para as partes.
      </Paragraph>

      <SectionTitle>8. Quais são seus direitos?</SectionTitle>

      <Paragraph>
        Mesmo que você já tenha nos fornecido seus dados pessoais, você possui
        total direito de, a qualquer momento, solicitar ao controlador:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>
          Confirmação da existência de tratamento dos seus dados
        </ListItem>
        <ListItem>Acesso aos seus dados</ListItem>
        <ListItem>Correção dos seus dados</ListItem>
        <ListItem>Anonimização dos dados</ListItem>
        <ListItem>
          Bloqueio ou eliminação dos dados desnecessários, excessivos ou
          tratados em desconformidade com a Lei
        </ListItem>
        <ListItem>Portabilidade dos dados à outro fornecedor</ListItem>
        <ListItem>
          Eliminação dos dados, exceto aqueles exigidos por lei
        </ListItem>
        <ListItem>
          Informações sobre com quem o controlador realizou uso compartilhado de
          dados
        </ListItem>
        <ListItem>
          Informação sobre a possibilidade de não fornecer consentimento e sobre
          as consequências da negativa
        </ListItem>
        <ListItem>Voltar atrás e revogar o seu consentimento</ListItem>
      </ul>

      {/* AVISO DE PRIVACIDADE COMPLETO */}
      <div className="border-t border-purple-500/20 mt-10 pt-10">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
          AVISO DE PRIVACIDADE - USUÁRIO COMPRADOR
        </h2>

        <WarningBox>
          Antes de acessar a plataforma OLYMPUSPAY, é importante que você leia,
          entenda e aceite de forma livre, inequívoca e informada este Aviso de
          Privacidade.
        </WarningBox>

        <Paragraph>
          Esta plataforma, cujo nome é <strong>https://olympuspay.com.br</strong>
          , é de propriedade e mantida por{" "}
          <Highlight>OLYMPUSPAY TECNOLOGIA SERVIÇOS E PAGAMENTOS LTDA</Highlight>
          , pessoa jurídica de direito privado, inscrita no CNPJ sob o nº{" "}
          <Highlight>00.000.000/0001-00</Highlight>, com endereço na Rua
          Example, nº 000, Bairro Centro, na Cidade de São Paulo - SP, CEP
          00.000-000.
        </Paragraph>

        <SectionTitle>1. DATA DE DISPONIBILIZAÇÃO DO TEXTO</SectionTitle>

        <Paragraph>
          O presente documento foi redigido e disponibilizado em 10/01/2026.
        </Paragraph>

        <SectionTitle>
          2. EXPLICAÇÃO DOS TERMOS TÉCNICOS OU EM LÍNGUA ESTRANGEIRA
        </SectionTitle>

        <Paragraph>
          Abaixo estão dispostos os significados das nomenclaturas técnicas e
          termos na língua inglesa:
        </Paragraph>

        <ul className="mb-4">
          <ListItem>
            <strong>Controlador:</strong> pessoa natural ou jurídica, de direito
            público ou privado, a quem competem as decisões referentes ao
            tratamento de dados pessoais.
          </ListItem>
          <ListItem>
            <strong>Cookies:</strong> pequenos arquivos de texto que ficam
            gravados no computador do internauta e podem ser recuperados pelo
            site que o enviou durante a navegação. São utilizados principalmente
            para identificar e armazenar informações sobre os Usuários.
          </ListItem>
          <ListItem>
            <strong>Criptografia:</strong> conjunto de princípios e técnicas
            para cifrar a escrita, torná-la ininteligível para os que não tenham
            acesso às convenções combinadas.
          </ListItem>
          <ListItem>
            <strong>Dado pessoal:</strong> informação relacionada a pessoa
            natural identificada ou identificável.
          </ListItem>
          <ListItem>
            <strong>Dado pessoal sensível:</strong> dado pessoal sobre origem
            racial ou étnica, convicção religiosa, opinião política, filiação a
            sindicato ou a organização de caráter religioso, filosófico ou
            político, dado referente à saúde ou à vida sexual, dado genético ou
            biométrico, quando vinculado a uma pessoa natural.
          </ListItem>
          <ListItem>
            <strong>Encarregado:</strong> pessoa indicada pelo controlador e
            operador para atuar como canal de comunicação entre o controlador,
            os titulares dos dados e a Autoridade Nacional de Proteção de Dados
            (ANPD).
          </ListItem>
          <ListItem>
            <strong>IP (ou Internet Protocol):</strong> Identificação única para
            cada computador conectado a uma rede.
          </ListItem>
          <ListItem>
            <strong>Operador:</strong> pessoa natural ou jurídica, de direito
            público ou privado, que realiza o tratamento de dados pessoais em
            nome do controlador.
          </ListItem>
          <ListItem>
            <strong>Tratamento de dados:</strong> toda operação realizada com
            dados pessoais, como as que se referem a coleta, produção, recepção,
            classificação, utilização, acesso, reprodução, transmissão,
            distribuição, processamento, arquivamento, armazenamento,
            eliminação, avaliação ou controle da informação, modificação,
            comunicação, transferência, difusão ou extração.
          </ListItem>
        </ul>

        <Paragraph>
          <strong>2.2. Tipos de Usuários da plataforma:</strong>
        </Paragraph>

        <ul className="mb-4">
          <ListItem>
            <strong>Usuário Comprador:</strong> Aquele que entra na plataforma e
            possui o interesse e/ou realiza compras de infoproduto do Usuário
            Vendedor.
          </ListItem>
          <ListItem>
            <strong>Usuário Vendedor:</strong> Pessoa que acessa a plataforma
            com o objetivo de vender os produtos digitais para Usuários
            Compradores.
          </ListItem>
          <ListItem>
            <strong>Usuário Afiliado:</strong> Pessoa que atua junto ao Usuário
            Vendedor, apoiando nas vendas de produtos digitais e utiliza a
            plataforma buscando acompanhar sua performance e produtos vendidos.
          </ListItem>
        </ul>

        <SectionTitle>6. TRATAMENTO DE DADOS PESSOAIS</SectionTitle>

        <Paragraph>
          Ao aceitar o presente Aviso de Privacidade, o Usuário Comprador
          compreende que a coleta e tratamento dos dados pessoais abaixo são
          necessários para a prestação do serviço com a OlympusPay, conforme
          informações apresentadas a seguir:
        </Paragraph>

        {/* Tabela de dados */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-purple-500/20">
                <th className="border border-purple-500/30 p-3 text-left text-purple-300">
                  Tipo de Dado Pessoal
                </th>
                <th className="border border-purple-500/30 p-3 text-left text-purple-300">
                  Base Legal
                </th>
                <th className="border border-purple-500/30 p-3 text-left text-purple-300">
                  Finalidade
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  Nome e Sobrenome, CPF
                </td>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  Necessário para a execução de contrato ou de procedimentos
                  preliminares relacionados a contrato do qual seja parte o
                  titular, a pedido do titular dos dados (Art. 7º, V, Lei nº
                  13.709/2018).
                </td>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  Utilizado para identificação e verificação do Usuário.
                  Trata-se de dados pessoais essenciais para que seja possível o
                  acesso à plataforma.
                </td>
              </tr>
              <tr>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  E-mail / Telefone Celular
                </td>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  a) Necessário para a execução de contrato (Art. 7º, V, Lei nº
                  13.709/2018).
                  <br />
                  b) Necessário para atender aos interesses legítimos do
                  controlador (Art. 7º, IX, Lei nº 13.709/2018).
                </td>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  a) Utilizado para validação e login de cadastro na plataforma.
                  Utilizado como meio de comunicação com o Usuário.
                  <br />
                  b) Utilizado para envio de e-mails informativos.
                </td>
              </tr>
              <tr>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  Histórico de conversas
                </td>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  Necessário para atender aos interesses legítimos do
                  controlador (Art. 7º, IX, Lei nº 13.709/2018).
                </td>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  Criação de um histórico sobre o Usuário, facilidade na
                  comunicação, maior efetividade na resolução de questionamentos
                  e melhoria na experiência do Usuário.
                </td>
              </tr>
              <tr>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  Registro de acesso (IP, data e hora)
                </td>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  Cumprimento de obrigação legal ou regulatória pelo controlador
                  (Art. 7º, II, Lei nº 13.709/2018).
                </td>
                <td className="border border-purple-500/30 p-3 text-gray-300">
                  Obediência ao artigo 15 da Lei n. 12.965/2014, que impõe o
                  dever de manter os respectivos registros de acesso, sob
                  sigilo, pelo prazo de 6 (seis) meses.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <SectionTitle>
          7. CANCELAMENTO DA PLATAFORMA, DE CONTAS DE ACESSO E EXCLUSÃO DE DADOS
        </SectionTitle>

        <Paragraph>
          <strong>7.1. Cancelamento de contas de acesso pela OlympusPay:</strong>
        </Paragraph>

        <Paragraph>
          A OlympusPay poderá, a seu exclusivo critério, bloquear, restringir,
          desabilitar ou impedir o acesso de qualquer Usuário à plataforma
          sempre que for detectada uma conduta inadequada.
        </Paragraph>

        <Paragraph>
          <strong>
            7.2. Cancelamento de contas de acesso pelo Usuário Comprador:
          </strong>
        </Paragraph>

        <Paragraph>
          Para cancelar os serviços e requisitar a exclusão da conta de acesso,
          o Usuário Comprador deverá entrar em contato com a OlympusPay
          solicitando a exclusão de acesso pelo e-mail{" "}
          <strong>contato@olympuspay.com.br</strong>. Caso exista algum tipo de
          compra, pagamento ou utilização pendente, a conta só será cancelada
          após a solução da pendência.
        </Paragraph>

        <Paragraph>
          <strong>7.3. Exclusão dos dados:</strong>
        </Paragraph>

        <Paragraph>
          Quando finda a finalidade de tratamento de dados, o Usuário Comprador
          poderá solicitar à OlympusPay a exclusão das informações, porém, caberá
          a ela avaliar junto ao controlador dos dados a possibilidade de
          exclusão das informações.
        </Paragraph>

        <WarningBox>
          <strong>Importante:</strong> O Usuário Comprador terá todos os seus
          dados deletados imediatamente e permanentemente, exceto os dados cuja
          manutenção seja obrigatória por lei ou regulação, ou os dados
          necessários para o exercício regular de direitos em processo judicial,
          administrativo ou arbitral, como os registros de acesso, que serão
          mantidos, sob sigilo, em ambiente controlado e de segurança, nos
          termos da Lei n.º 12.965/2014 e com a base legal do art. 7, II, da Lei
          n.º 13.709/18.
        </WarningBox>

        <Paragraph>
          A OlympusPay não se responsabiliza por quaisquer prejuízos, danos ou
          problemas que os Usuários ou terceiros tenham em função da deleção dos
          dados disposta nesta cláusula.
        </Paragraph>

        <SectionTitle>8. DIREITOS DO TITULAR DOS DADOS PESSOAIS</SectionTitle>

        <Paragraph>
          O titular de dados pessoais tem direito a obter do controlador, em
          relação aos dados por ele tratados, a qualquer momento e mediante
          requisição:
        </Paragraph>

        <ul className="mb-4">
          <ListItem>Confirmação da existência de tratamento de dados.</ListItem>
          <ListItem>Acesso aos dados.</ListItem>
          <ListItem>
            Correção de dados incompletos, inexatos ou desatualizados.
          </ListItem>
          <ListItem>
            Anonimização, bloqueio ou eliminação de dados desnecessários,
            excessivos ou tratados em desconformidade com o disposto na Lei n.
            13.709/2018.
          </ListItem>
          <ListItem>
            Portabilidade dos dados a outro fornecedor de serviço ou produto,
            mediante requisição expressa, de acordo com a regulamentação da
            autoridade nacional, observados os segredos comercial e industrial.
          </ListItem>
          <ListItem>
            Eliminação dos dados tratados com o consentimento do titular, exceto
            nas hipóteses previstas na Lei n. 13.709/2018.
          </ListItem>
          <ListItem>
            Informação das entidades públicas e privadas com as quais o
            controlador realizou uso compartilhado de dados.
          </ListItem>
          <ListItem>
            Informação sobre a possibilidade de não fornecer consentimento e
            sobre as consequências da negativa.
          </ListItem>
          <ListItem>Revogação do consentimento.</ListItem>
        </ul>

        <SectionTitle>9. MUDANÇAS NO AVISO DE PRIVACIDADE</SectionTitle>

        <Paragraph>
          A OlympusPay poderá unilateralmente adicionar e/ou modificar qualquer
          cláusula contida neste Aviso de Privacidade. A versão atualizada
          valerá para o uso da plataforma realizada a partir de sua publicação.
          A continuidade de acesso ou utilização da plataforma, depois da
          divulgação, confirmará a vigência do novo Aviso de Privacidade pelos
          Usuários.
        </Paragraph>

        <Paragraph>
          Caso a mudança efetuada necessite de consentimento do Usuário, será
          apresentada a opção de aceitar de forma livre, inequívoca e informada
          o novo texto ou recusá-lo.
        </Paragraph>

        <SectionTitle>CANAIS DE COMUNICAÇÃO SOBRE PRIVACIDADE</SectionTitle>

        <Paragraph>
          A OlympusPay ressalta que a sua privacidade continua sendo nossa
          prioridade, por isso disponibiliza os seguintes canais para
          comunicação sobre qualquer assunto envolvendo dados pessoais:
        </Paragraph>

        <InfoBox>
          <strong>E-mail LGPD:</strong> lgpd@olympuspay.com.br
          <br />
          <strong>E-mail geral:</strong> contato@olympuspay.com.br
          <br />
          <strong>E-mail reembolso:</strong> contato@olympuspay.com.br
          <br />
          <strong>E-mail denúncias:</strong> denuncias@olympuspay.com.br
          <br />
          <strong>E-mail jurídico:</strong> juridico@olympuspay.com.br
          <br />
          <strong>E-mail ouvidoria:</strong> ouvidoria@olympuspay.com.br
          <br />
          <strong>Telefone:</strong> (99) 99999-9999
          <br />
          <strong>WhatsApp:</strong> (99) 99999-9999
        </InfoBox>
      </div>
    </article>
  );
}

function PrivacySiteContent() {
  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <p className="text-gray-400 text-sm mb-6">
        Aviso de Privacidade do Site OlympusPay
      </p>

      <InfoBox>
        Este Aviso de Privacidade descreve como coletamos, usamos e protegemos
        suas informações quando você visita nosso site institucional{" "}
        <strong>olympuspay.com.br</strong>.
      </InfoBox>

      <SectionTitle>1. Informações que coletamos</SectionTitle>

      <Paragraph>
        Ao navegar em nosso site, podemos coletar automaticamente:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Endereço IP</ListItem>
        <ListItem>Tipo de navegador e dispositivo</ListItem>
        <ListItem>Páginas visitadas e tempo de permanência</ListItem>
        <ListItem>Origem do tráfego (como você chegou ao site)</ListItem>
        <ListItem>Cookies e tecnologias similares</ListItem>
      </ul>

      <Paragraph>
        Se você preencher formulários de contato, também coletaremos:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Nome</ListItem>
        <ListItem>E-mail</ListItem>
        <ListItem>Telefone</ListItem>
        <ListItem>Mensagem enviada</ListItem>
      </ul>

      <SectionTitle>2. Finalidade do tratamento</SectionTitle>

      <Paragraph>Utilizamos as informações coletadas para:</Paragraph>

      <ul className="mb-4">
        <ListItem>Melhorar a experiência de navegação</ListItem>
        <ListItem>Analisar o desempenho do site</ListItem>
        <ListItem>Responder solicitações de contato</ListItem>
        <ListItem>Personalizar conteúdo e ofertas</ListItem>
        <ListItem>Fins estatísticos e de marketing</ListItem>
      </ul>

      <SectionTitle>3. Cookies</SectionTitle>

      <Paragraph>
        Utilizamos cookies para melhorar sua experiência. Você pode gerenciar
        suas preferências de cookies através das configurações do seu navegador.
        Para mais informações, consulte nossa Política de Cookies.
      </Paragraph>

      <SectionTitle>4. Compartilhamento de dados</SectionTitle>

      <Paragraph>
        Podemos compartilhar dados com parceiros de analytics (como Google
        Analytics) para análise de tráfego e melhorias no site. Esses parceiros
        estão sujeitos a obrigações de confidencialidade.
      </Paragraph>

      <SectionTitle>5. Seus direitos</SectionTitle>

      <Paragraph>
        Você tem direito a acessar, corrigir ou solicitar a exclusão de seus
        dados pessoais. Para exercer seus direitos, entre em contato:
      </Paragraph>

      <WarningBox>
        E-mail: <strong>lgpd@olympuspay.com.br</strong>
        <br />
        Telefone: <strong>(99) 99999-9999</strong>
      </WarningBox>

      <SectionTitle>6. Alterações neste Aviso</SectionTitle>

      <Paragraph>
        Podemos atualizar este Aviso periodicamente. Recomendamos que você
        revise esta página regularmente para estar ciente de quaisquer
        alterações.
      </Paragraph>
    </article>
  );
}

function PrivacySellersContent() {
  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <p className="text-gray-400 text-sm mb-6">
        Aviso de Privacidade para Usuários Vendedores e Afiliados
      </p>

      <InfoBox>
        <strong>
          Fizemos o máximo para explicar de forma clara e simples quais dados
          pessoais precisaremos de você e o que vamos fazer com cada um deles.
        </strong>{" "}
        Por isso, separamos abaixo os pontos mais importantes, que também podem
        ser lidos de forma bem completa e detalhada no nosso Aviso de
        Privacidade - Usuário Vendedor.
        <br />
        <br />
        Estamos sempre disponíveis para tirar qualquer dúvida geral através do{" "}
        <strong>contato@olympuspay.com.br</strong>. Para falar especificamente
        sobre seus dados pessoais: <strong>lgpd@olympuspay.com.br</strong>.
      </InfoBox>

      <SectionTitle>
        1. Quem é o responsável pelo tratamento de dados?
      </SectionTitle>

      <Paragraph>
        A <Highlight>OlympusPay Tecnologia e Pagamentos Ltda.</Highlight>,
        inscrita no CNPJ nº <Highlight>00.000.000/0001-00</Highlight>, é a{" "}
        <strong>controladora</strong> dos dados pessoais dos Usuários Vendedores
        e Afiliados, sendo responsável pelas decisões referentes ao tratamento
        desses dados.
      </Paragraph>

      <SectionTitle>2. Quais dados pessoais são coletados?</SectionTitle>

      <Paragraph>
        <strong>Dados cadastrais:</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Nome completo / Razão Social</ListItem>
        <ListItem>CPF / CNPJ</ListItem>
        <ListItem>Data de nascimento</ListItem>
        <ListItem>E-mail e telefone</ListItem>
        <ListItem>Endereço completo</ListItem>
        <ListItem>
          Documentos de identificação (RG, CNH, comprovante de endereço)
        </ListItem>
      </ul>

      <Paragraph>
        <strong>Dados financeiros:</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Dados bancários para recebimento</ListItem>
        <ListItem>Histórico de transações</ListItem>
        <ListItem>Informações fiscais</ListItem>
      </ul>

      <Paragraph>
        <strong>Dados de uso da plataforma:</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Logs de acesso</ListItem>
        <ListItem>Endereço IP</ListItem>
        <ListItem>Ações realizadas na plataforma</ListItem>
      </ul>

      <SectionTitle>3. Para que usamos seus dados?</SectionTitle>

      <ul className="mb-4">
        <ListItem>Criar e gerenciar sua conta na plataforma</ListItem>
        <ListItem>Verificar sua identidade (KYC - Know Your Customer)</ListItem>
        <ListItem>Processar pagamentos e transferências</ListItem>
        <ListItem>Emitir notas fiscais e relatórios financeiros</ListItem>
        <ListItem>Cumprir obrigações legais e regulatórias</ListItem>
        <ListItem>Prevenir fraudes e lavagem de dinheiro</ListItem>
        <ListItem>Fornecer suporte ao cliente</ListItem>
        <ListItem>Melhorar nossos serviços</ListItem>
      </ul>

      <SectionTitle>4. Com quem compartilhamos seus dados?</SectionTitle>

      <ul className="mb-4">
        <ListItem>
          <strong>Instituições financeiras:</strong> Para processamento de
          pagamentos e transferências
        </ListItem>
        <ListItem>
          <strong>Órgãos reguladores:</strong> COAF, Receita Federal, Banco
          Central
        </ListItem>
        <ListItem>
          <strong>Parceiros tecnológicos:</strong> Provedores de infraestrutura
          e serviços
        </ListItem>
        <ListItem>
          <strong>Autoridades:</strong> Quando exigido por lei ou ordem judicial
        </ListItem>
      </ul>

      <SectionTitle>5. Retenção de dados</SectionTitle>

      <Paragraph>
        Mantemos seus dados enquanto sua conta estiver ativa e pelo período
        necessário para cumprir obrigações legais, que pode ser de até 5 anos
        após o encerramento da conta para fins fiscais e de prevenção à lavagem
        de dinheiro.
      </Paragraph>

      <SectionTitle>6. Seus direitos</SectionTitle>

      <WarningBox>
        Você pode exercer seus direitos de titular de dados (acesso, correção,
        exclusão, portabilidade) através do e-mail:{" "}
        <strong>lgpd@olympuspay.com.br</strong>
      </WarningBox>
    </article>
  );
}

function EthicsContent() {
  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <p className="text-gray-400 text-sm mb-6">
        Código de Ética e Conduta da OlympusPay
      </p>

      <InfoBox>
        O presente Código de Ética estabelece os princípios, valores e
        diretrizes que norteiam a atuação da OlympusPay e de todos os seus
        colaboradores, parceiros e usuários.
      </InfoBox>

      <SectionTitle>1. Nossos Valores</SectionTitle>

      <Paragraph>
        <strong>Integridade:</strong> Agimos com honestidade, transparência e
        ética em todas as nossas relações.
      </Paragraph>

      <Paragraph>
        <strong>Respeito:</strong> Tratamos todos com dignidade, respeito e
        igualdade, valorizando a diversidade.
      </Paragraph>

      <Paragraph>
        <strong>Excelência:</strong> Buscamos constantemente a melhoria de
        nossos serviços e processos.
      </Paragraph>

      <Paragraph>
        <strong>Responsabilidade:</strong> Assumimos responsabilidade por nossas
        ações e seus impactos.
      </Paragraph>

      <Paragraph>
        <strong>Inovação:</strong> Valorizamos a criatividade e a busca por
        soluções inovadoras.
      </Paragraph>

      <SectionTitle>2. Condutas Esperadas</SectionTitle>

      <Paragraph>
        <strong>De nossos colaboradores:</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Atuar com profissionalismo e dedicação</ListItem>
        <ListItem>Manter sigilo sobre informações confidenciais</ListItem>
        <ListItem>Evitar conflitos de interesse</ListItem>
        <ListItem>Tratar clientes e colegas com respeito</ListItem>
        <ListItem>Reportar irregularidades identificadas</ListItem>
      </ul>

      <Paragraph>
        <strong>De nossos usuários (vendedores):</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>
          Fornecer informações verdadeiras sobre produtos e serviços
        </ListItem>
        <ListItem>Cumprir com as obrigações de entrega e garantia</ListItem>
        <ListItem>Respeitar os direitos dos consumidores</ListItem>
        <ListItem>Não comercializar produtos ilegais ou proibidos</ListItem>
        <ListItem>Manter comunicação transparente com compradores</ListItem>
      </ul>

      <SectionTitle>3. Práticas Proibidas</SectionTitle>

      <WarningBox>
        São expressamente proibidas as seguintes condutas:
      </WarningBox>

      <ul className="mb-4">
        <ListItem>Fraude, falsificação ou adulteração de documentos</ListItem>
        <ListItem>Lavagem de dinheiro ou financiamento ao terrorismo</ListItem>
        <ListItem>Corrupção, suborno ou propina</ListItem>
        <ListItem>Discriminação de qualquer natureza</ListItem>
        <ListItem>Assédio moral ou sexual</ListItem>
        <ListItem>Uso indevido de informações confidenciais</ListItem>
        <ListItem>Venda de produtos falsificados ou ilegais</ListItem>
        <ListItem>Propaganda enganosa ou práticas comerciais desleais</ListItem>
      </ul>

      <SectionTitle>4. Canal de Denúncias</SectionTitle>

      <Paragraph>
        Disponibilizamos um canal confidencial para relato de violações a este
        Código:
      </Paragraph>

      <InfoBox>
        <strong>E-mail:</strong> etica@olympuspay.com.br
        <br />
        <strong>Telefone:</strong> (99) 99999-9999
        <br />
        <br />
        Todas as denúncias são tratadas com confidencialidade e sigilo, sendo
        proibida qualquer forma de retaliação contra denunciantes de boa-fé.
      </InfoBox>

      <SectionTitle>5. Consequências</SectionTitle>

      <Paragraph>Violações a este Código podem resultar em:</Paragraph>

      <ul className="mb-4">
        <ListItem>Advertência formal</ListItem>
        <ListItem>Suspensão temporária da conta</ListItem>
        <ListItem>Encerramento definitivo da conta</ListItem>
        <ListItem>Comunicação às autoridades competentes</ListItem>
        <ListItem>Ações judiciais cabíveis</ListItem>
      </ul>
    </article>
  );
}

function AntifraudContent() {
  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <p className="text-gray-400 text-sm mb-6">
        Política Antifraude da OlympusPay
      </p>

      <InfoBox>
        A OlympusPay está comprometida em manter um ambiente seguro para todos os
        usuários. Esta política descreve as medidas que adotamos para prevenir,
        detectar e combater fraudes em nossa plataforma.
      </InfoBox>

      <SectionTitle>1. Compromisso com a Segurança</SectionTitle>

      <Paragraph>
        A prevenção à fraude é prioridade na OlympusPay. Investimos continuamente
        em tecnologias e processos para proteger nossos usuários e garantir a
        integridade das transações realizadas em nossa plataforma.
      </Paragraph>

      <SectionTitle>2. Medidas de Prevenção</SectionTitle>

      <Paragraph>
        <strong>Verificação de Identidade (KYC):</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Validação de documentos de identificação</ListItem>
        <ListItem>Verificação de dados cadastrais</ListItem>
        <ListItem>Análise de consistência de informações</ListItem>
        <ListItem>Selfie com documento (quando necessário)</ListItem>
      </ul>

      <Paragraph>
        <strong>Análise de Transações:</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Monitoramento em tempo real de todas as transações</ListItem>
        <ListItem>Análise de padrões de comportamento</ListItem>
        <ListItem>Verificação de dispositivos e geolocalização</ListItem>
        <ListItem>Score de risco para cada transação</ListItem>
      </ul>

      <Paragraph>
        <strong>Tecnologias Utilizadas:</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Machine Learning para detecção de anomalias</ListItem>
        <ListItem>Inteligência Artificial para análise comportamental</ListItem>
        <ListItem>Device fingerprinting</ListItem>
        <ListItem>Análise de velocidade de transações</ListItem>
      </ul>

      <SectionTitle>3. Autenticação e Segurança</SectionTitle>

      <ul className="mb-4">
        <ListItem>Autenticação em dois fatores (2FA)</ListItem>
        <ListItem>Tokens de segurança para operações sensíveis</ListItem>
        <ListItem>Notificações de atividades suspeitas</ListItem>
        <ListItem>Bloqueio automático em caso de tentativas suspeitas</ListItem>
      </ul>

      <SectionTitle>4. Procedimentos em Caso de Suspeita</SectionTitle>

      <WarningBox>
        Transações identificadas como suspeitas podem ser:
        <br />
        <br />
        • Retidas para análise manual
        <br />
        • Solicitada documentação adicional
        <br />
        • Bloqueadas preventivamente
        <br />• Canceladas em caso de confirmação de fraude
      </WarningBox>

      <Paragraph>
        O prazo de análise pode variar de acordo com a complexidade do caso,
        podendo impactar o prazo de liberação dos valores.
      </Paragraph>

      <SectionTitle>5. Responsabilidades do Usuário</SectionTitle>

      <ul className="mb-4">
        <ListItem>Manter dados cadastrais atualizados</ListItem>
        <ListItem>Utilizar senhas fortes e não compartilhá-las</ListItem>
        <ListItem>Ativar autenticação em dois fatores</ListItem>
        <ListItem>Reportar imediatamente atividades suspeitas</ListItem>
        <ListItem>Não compartilhar credenciais de acesso</ListItem>
      </ul>

      <SectionTitle>6. Consequências</SectionTitle>

      <Paragraph>
        Contas envolvidas em atividades fraudulentas estarão sujeitas a:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Suspensão imediata da conta</ListItem>
        <ListItem>Retenção de valores para investigação</ListItem>
        <ListItem>Encerramento definitivo da conta</ListItem>
        <ListItem>Comunicação às autoridades competentes</ListItem>
        <ListItem>Inclusão em lista de restrições</ListItem>
        <ListItem>Ações judiciais cabíveis</ListItem>
      </ul>

      <SectionTitle>7. Contato</SectionTitle>

      <InfoBox>
        Para reportar atividades suspeitas ou fraudes:
        <br />
        <strong>E-mail:</strong> seguranca@olympuspay.com.br
        <br />
        <strong>Telefone:</strong> (99) 99999-9999
      </InfoBox>
    </article>
  );
}

function CookiesContent() {
  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <p className="text-gray-400 text-sm mb-6">
        Política de Cookies da OlympusPay
      </p>

      <InfoBox>
        Esta política explica o que são cookies, como os utilizamos em nossa
        plataforma e suas opções de gerenciamento.
      </InfoBox>

      <SectionTitle>1. O que são Cookies?</SectionTitle>

      <Paragraph>
        Cookies são pequenos arquivos de texto armazenados em seu dispositivo
        (computador, tablet ou celular) quando você visita um site. Eles são
        amplamente utilizados para fazer os sites funcionarem de forma mais
        eficiente e fornecer informações aos proprietários do site.
      </Paragraph>

      <SectionTitle>2. Tipos de Cookies que Utilizamos</SectionTitle>

      <Paragraph>
        <strong>Cookies Essenciais (Necessários):</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Necessários para o funcionamento básico do site</ListItem>
        <ListItem>Permitem navegação e uso de recursos essenciais</ListItem>
        <ListItem>Não podem ser desativados</ListItem>
        <ListItem>Não coletam informações para fins de marketing</ListItem>
      </ul>

      <Paragraph>
        <strong>Cookies de Desempenho (Analytics):</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Coletam informações sobre como você usa o site</ListItem>
        <ListItem>Ajudam a melhorar o desempenho e a experiência</ListItem>
        <ListItem>Dados são agregados e anônimos</ListItem>
        <ListItem>Utilizamos Google Analytics</ListItem>
      </ul>

      <Paragraph>
        <strong>Cookies de Funcionalidade:</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Lembram suas preferências e escolhas</ListItem>
        <ListItem>Personalizam sua experiência</ListItem>
        <ListItem>Mantêm você logado</ListItem>
      </ul>

      <Paragraph>
        <strong>Cookies de Marketing/Publicidade:</strong>
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Rastreiam sua atividade em diferentes sites</ListItem>
        <ListItem>Exibem anúncios relevantes</ListItem>
        <ListItem>Medem a eficácia de campanhas publicitárias</ListItem>
        <ListItem>Podem ser compartilhados com parceiros</ListItem>
      </ul>

      <SectionTitle>3. Cookies de Terceiros</SectionTitle>

      <Paragraph>
        Utilizamos serviços de terceiros que podem definir seus próprios
        cookies:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Google Analytics (análise de tráfego)</ListItem>
        <ListItem>Facebook Pixel (publicidade)</ListItem>
        <ListItem>Hotjar (análise de comportamento)</ListItem>
        <ListItem>Intercom (suporte ao cliente)</ListItem>
      </ul>

      <SectionTitle>4. Como Gerenciar Cookies</SectionTitle>

      <Paragraph>
        Você pode controlar e/ou excluir cookies através das configurações do
        seu navegador. A maioria dos navegadores permite:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Ver quais cookies estão armazenados</ListItem>
        <ListItem>Excluir cookies individualmente ou todos de uma vez</ListItem>
        <ListItem>Bloquear cookies de terceiros</ListItem>
        <ListItem>Bloquear cookies de sites específicos</ListItem>
        <ListItem>Bloquear todos os cookies</ListItem>
        <ListItem>Excluir todos os cookies ao fechar o navegador</ListItem>
      </ul>

      <WarningBox>
        <strong>Atenção:</strong> Se você desativar cookies essenciais, algumas
        funcionalidades do site podem não funcionar corretamente.
      </WarningBox>

      <SectionTitle>5. Mais Informações</SectionTitle>

      <Paragraph>
        Para saber mais sobre cookies e como gerenciá-los, visite:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>www.allaboutcookies.org</ListItem>
        <ListItem>www.aboutcookies.org</ListItem>
      </ul>

      <InfoBox>
        Para dúvidas sobre nossa Política de Cookies, entre em contato:
        <br />
        <strong>E-mail:</strong> privacidade@olympuspay.com.br
      </InfoBox>
    </article>
  );
}

function AmlContent() {
  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <p className="text-gray-400 text-sm mb-6">
        Política de Prevenção à Lavagem de Dinheiro e Financiamento ao
        Terrorismo (PLD/FT)
      </p>

      <InfoBox>
        A OlympusPay está comprometida com a prevenção à lavagem de dinheiro e ao
        financiamento do terrorismo, em conformidade com a Lei nº 9.613/1998 e
        regulamentações do Banco Central do Brasil e COAF.
      </InfoBox>

      <SectionTitle>1. Compromisso Institucional</SectionTitle>

      <Paragraph>
        A OlympusPay adota políticas, procedimentos e controles internos
        destinados a prevenir a utilização de sua plataforma para fins de
        lavagem de dinheiro, ocultação de bens, direitos e valores, e
        financiamento do terrorismo.
      </Paragraph>

      <SectionTitle>2. Conheça Seu Cliente (KYC)</SectionTitle>

      <Paragraph>
        Implementamos procedimentos rigorosos de identificação e verificação de
        clientes:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Coleta de dados cadastrais completos</ListItem>
        <ListItem>Verificação de documentos de identificação</ListItem>
        <ListItem>Validação de informações junto a bases públicas</ListItem>
        <ListItem>Análise de compatibilidade financeira</ListItem>
        <ListItem>Verificação de listas restritivas (PEP, sanções)</ListItem>
        <ListItem>Atualização periódica de cadastros</ListItem>
      </ul>

      <SectionTitle>3. Monitoramento de Transações</SectionTitle>

      <Paragraph>
        Realizamos monitoramento contínuo das operações realizadas em nossa
        plataforma:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Análise de transações atípicas ou suspeitas</ListItem>
        <ListItem>Verificação de padrões de comportamento</ListItem>
        <ListItem>Identificação de operações fracionadas</ListItem>
        <ListItem>Monitoramento de volumes incompatíveis</ListItem>
        <ListItem>Alertas automáticos para operações de risco</ListItem>
      </ul>

      <SectionTitle>4. Comunicação ao COAF</SectionTitle>

      <WarningBox>
        Operações suspeitas identificadas são comunicadas ao Conselho de
        Controle de Atividades Financeiras (COAF) conforme exigido pela
        legislação, independentemente do valor.
      </WarningBox>

      <Paragraph>
        As comunicações são realizadas de forma sigilosa, sendo vedada a
        comunicação ao cliente sobre a existência de tal reporte.
      </Paragraph>

      <SectionTitle>5. Pessoas Politicamente Expostas (PEP)</SectionTitle>

      <Paragraph>
        Adotamos procedimentos específicos para relacionamento com Pessoas
        Politicamente Expostas:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Identificação de PEPs e seus relacionados</ListItem>
        <ListItem>
          Aprovação em nível gerencial para início de relacionamento
        </ListItem>
        <ListItem>Monitoramento reforçado de operações</ListItem>
        <ListItem>Atualização periódica da condição de PEP</ListItem>
      </ul>

      <SectionTitle>6. Treinamento</SectionTitle>

      <Paragraph>
        Todos os colaboradores da OlympusPay recebem treinamento periódico sobre:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Legislação de PLD/FT</ListItem>
        <ListItem>Procedimentos internos</ListItem>
        <ListItem>Identificação de operações suspeitas</ListItem>
        <ListItem>Responsabilidades individuais</ListItem>
      </ul>

      <SectionTitle>7. Registros e Documentação</SectionTitle>

      <Paragraph>
        Mantemos registros de todas as operações e documentos de identificação
        pelo prazo mínimo de 5 (cinco) anos, contados do encerramento da conta
        ou da conclusão da última transação.
      </Paragraph>

      <SectionTitle>8. Canal de Comunicação</SectionTitle>

      <InfoBox>
        Para reportar atividades suspeitas ou obter informações sobre nossa
        política de PLD/FT:
        <br />
        <strong>E-mail:</strong> compliance@olympuspay.com.br
        <br />
        <strong>Telefone:</strong> (99) 99999-9999
      </InfoBox>
    </article>
  );
}

function SecurityContent() {
  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <p className="text-gray-400 text-sm mb-6">
        Política de Segurança da Informação da OlympusPay
      </p>

      <InfoBox>
        A segurança das informações de nossos usuários é prioridade máxima na
        OlympusPay. Esta política descreve as medidas técnicas e organizacionais
        que adotamos para proteger seus dados.
      </InfoBox>

      <SectionTitle>1. Compromisso com a Segurança</SectionTitle>

      <Paragraph>
        A OlympusPay investe continuamente em segurança da informação,
        implementando controles baseados em padrões internacionais reconhecidos
        como ISO 27001 e PCI-DSS.
      </Paragraph>

      <SectionTitle>2. Criptografia</SectionTitle>

      <ul className="mb-4">
        <ListItem>
          <strong>Em trânsito:</strong> Todas as comunicações utilizam
          criptografia TLS 1.3
        </ListItem>
        <ListItem>
          <strong>Em repouso:</strong> Dados sensíveis são criptografados com
          AES-256
        </ListItem>
        <ListItem>
          <strong>Dados de pagamento:</strong> Tokenização de cartões conforme
          PCI-DSS
        </ListItem>
      </ul>

      <SectionTitle>3. Controle de Acesso</SectionTitle>

      <ul className="mb-4">
        <ListItem>
          Autenticação em dois fatores (2FA) disponível para todos os usuários
        </ListItem>
        <ListItem>Políticas de senhas fortes</ListItem>
        <ListItem>Bloqueio automático após tentativas falhas</ListItem>
        <ListItem>Sessões com tempo de expiração</ListItem>
        <ListItem>Acesso baseado em perfis e permissões (RBAC)</ListItem>
      </ul>

      <SectionTitle>4. Infraestrutura</SectionTitle>

      <ul className="mb-4">
        <ListItem>Data centers certificados (SOC 2, ISO 27001)</ListItem>
        <ListItem>Redundância geográfica</ListItem>
        <ListItem>Firewalls e sistemas de detecção de intrusão</ListItem>
        <ListItem>Monitoramento 24/7</ListItem>
        <ListItem>Backups automáticos e criptografados</ListItem>
        <ListItem>Plano de recuperação de desastres testado</ListItem>
      </ul>

      <SectionTitle>5. Desenvolvimento Seguro</SectionTitle>

      <ul className="mb-4">
        <ListItem>Revisão de código por pares</ListItem>
        <ListItem>Testes de segurança automatizados</ListItem>
        <ListItem>Análise de vulnerabilidades periódica</ListItem>
        <ListItem>Penetration tests por empresas especializadas</ListItem>
        <ListItem>Programa de Bug Bounty</ListItem>
      </ul>

      <SectionTitle>6. Gestão de Incidentes</SectionTitle>

      <Paragraph>
        Possuímos procedimentos estruturados para resposta a incidentes de
        segurança:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Equipe de resposta a incidentes</ListItem>
        <ListItem>Procedimentos de contenção e erradicação</ListItem>
        <ListItem>Comunicação aos afetados quando necessário</ListItem>
        <ListItem>Análise post-mortem e melhorias</ListItem>
      </ul>

      <SectionTitle>7. Conformidade</SectionTitle>

      <ul className="mb-4">
        <ListItem>
          PCI-DSS (Payment Card Industry Data Security Standard)
        </ListItem>
        <ListItem>LGPD (Lei Geral de Proteção de Dados)</ListItem>
        <ListItem>Regulamentações do Banco Central</ListItem>
        <ListItem>ISO 27001 (em processo de certificação)</ListItem>
      </ul>

      <SectionTitle>8. Recomendações aos Usuários</SectionTitle>

      <WarningBox>
        Para sua proteção, recomendamos:
        <br />
        <br />
        • Ative a autenticação em dois fatores (2FA)
        <br />
        • Use senhas fortes e únicas
        <br />
        • Não compartilhe suas credenciais
        <br />
        • Verifique sempre a URL antes de inserir dados
        <br />
        • Mantenha seu dispositivo e navegador atualizados
        <br />• Desconfie de e-mails e mensagens suspeitas
      </WarningBox>

      <SectionTitle>9. Contato</SectionTitle>

      <InfoBox>
        Para reportar vulnerabilidades ou incidentes de segurança:
        <br />
        <strong>E-mail:</strong> seguranca@olympuspay.com.br
        <br />
        <strong>Bug Bounty:</strong> bugbounty@olympuspay.com.br
      </InfoBox>
    </article>
  );
}

function GeneralTermsContent() {
  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <p className="text-gray-400 text-sm mb-6">
        Termos Gerais de Uso da Plataforma
      </p>

      <InfoBox>
        Os seguintes Termos regem a sua experiência como Usuário da OlympusPay. É
        crucial que você compreenda estes Termos, pois a utilização dos nossos
        serviços implica na sua aceitação.
      </InfoBox>

      <Paragraph>
        A OlympusPay oferece um espaço para quem deseja criar ou divulgar um
        produto digital de forma simples e prática, possibilitando que as
        pessoas vivam de suas paixões e compartilhem o que têm de melhor com o
        mundo todo.
      </Paragraph>

      <Paragraph>
        Estes Termos regem o uso da Plataforma OlympusPay e de todos os recursos,
        aplicativos, serviços, tecnologias e softwares disponibilizados pela
        OlympusPay, exceto quando esclarecemos expressamente que outros termos (e
        não estes) se aplicam.
      </Paragraph>

      <WarningBox>
        <strong>
          Ao acessar ou usar a Plataforma, você concorda em se vincular a estes
          Termos e em cumprir as suas regras.
        </strong>{" "}
        Você deve ler estes Termos de forma atenta e cuidadosa, pois eles contêm
        informações importantes sobre seus direitos e obrigações relativos ao
        acesso ou uso dos recursos ou Serviços da OlympusPay.
      </WarningBox>

      <SectionTitle>TERMOS DE USO</SectionTitle>

      <Paragraph>
        A empresa <Highlight>OlympusPay Tecnologia e Pagamentos Ltda.</Highlight>
        , uma pessoa jurídica de direito privado, registrada sob o CNPJ nº{" "}
        <Highlight>00.000.000/0001-00</Highlight> e proprietária exclusiva dos
        domínios <strong>olympuspay.com.br</strong>, será referida como
        "OlympusPay" ou "Plataforma".
      </Paragraph>

      <SectionTitle>1. DEFINIÇÕES</SectionTitle>

      <Paragraph>
        <strong>1.1. Plataforma:</strong> Conjunto de ferramentas, sistemas e
        serviços oferecidos pela OlympusPay para facilitar transações comerciais
        digitais.
      </Paragraph>

      <Paragraph>
        <strong>1.2. Usuário:</strong> Qualquer pessoa física ou jurídica que
        acesse, utilize ou interaja com os serviços da OlympusPay.
      </Paragraph>

      <Paragraph>
        <strong>1.3. Usuário Vendedor:</strong> Usuário que utiliza a plataforma
        para comercializar produtos ou serviços.
      </Paragraph>

      <Paragraph>
        <strong>1.4. Usuário Afiliado:</strong> Usuário que promove produtos de
        terceiros em troca de comissões.
      </Paragraph>

      <Paragraph>
        <strong>1.5. Usuário Comprador:</strong> Usuário que adquire produtos ou
        serviços através da plataforma.
      </Paragraph>

      <SectionTitle>2. CONDIÇÕES DE USO</SectionTitle>

      <Paragraph>
        <strong>2.1.</strong> Para utilizar os serviços da OlympusPay, o usuário
        deve ter pelo menos 18 (dezoito) anos de idade ou ser emancipado nos
        termos da legislação vigente.
      </Paragraph>

      <Paragraph>
        <strong>2.2.</strong> O usuário compromete-se a fornecer informações
        verdadeiras, completas e atualizadas durante o cadastro e a manter esses
        dados atualizados.
      </Paragraph>

      <Paragraph>
        <strong>2.3.</strong> É de responsabilidade exclusiva do usuário manter
        a confidencialidade de suas credenciais de acesso.
      </Paragraph>

      <Paragraph>
        <strong>2.4.</strong> O usuário não poderá ceder, transferir ou
        compartilhar sua conta com terceiros.
      </Paragraph>

      <SectionTitle>3. SERVIÇOS OFERECIDOS</SectionTitle>

      <Paragraph>
        <strong>3.1.</strong> A OlympusPay disponibiliza uma plataforma completa
        para processamento de pagamentos, gestão de produtos digitais e físicos,
        e ferramentas de marketing.
      </Paragraph>

      <Paragraph>
        <strong>3.2.</strong> Os serviços incluem, mas não se limitam a:
      </Paragraph>

      <ul className="mb-4">
        <ListItem>Checkout personalizado e otimizado para conversão</ListItem>
        <ListItem>Processamento de pagamentos (PIX, cartão, boleto)</ListItem>
        <ListItem>Gestão de produtos e ofertas</ListItem>
        <ListItem>Sistema de afiliados</ListItem>
        <ListItem>Área de membros</ListItem>
        <ListItem>Integrações com ferramentas externas</ListItem>
        <ListItem>Relatórios e análises</ListItem>
        <ListItem>Prevenção a fraudes</ListItem>
      </ul>

      <SectionTitle>4. RESPONSABILIDADES DA OLYMPUSPAY</SectionTitle>

      <Paragraph>
        <strong>4.1.</strong> Manter a plataforma em funcionamento, salvo
        interrupções programadas ou de força maior.
      </Paragraph>

      <Paragraph>
        <strong>4.2.</strong> Processar pagamentos de forma segura e em
        conformidade com as regulamentações aplicáveis.
      </Paragraph>

      <Paragraph>
        <strong>4.3.</strong> Proteger os dados dos usuários conforme a LGPD e
        nossa Política de Privacidade.
      </Paragraph>

      <Paragraph>
        <strong>4.4.</strong> Fornecer suporte aos usuários através dos canais
        disponibilizados.
      </Paragraph>

      <SectionTitle>5. RESPONSABILIDADES DO USUÁRIO</SectionTitle>

      <Paragraph>
        <strong>5.1.</strong> O Usuário Vendedor é integralmente responsável
        pelos produtos e serviços que comercializa.
      </Paragraph>

      <Paragraph>
        <strong>5.2.</strong> É proibida a comercialização de produtos ilegais,
        fraudulentos, que violem direitos de terceiros ou que estejam em
        desacordo com nossa política de conteúdo.
      </Paragraph>

      <Paragraph>
        <strong>5.3.</strong> O usuário deve cumprir todas as obrigações fiscais
        e tributárias decorrentes de suas operações.
      </Paragraph>

      <SectionTitle>6. TAXAS E PAGAMENTOS</SectionTitle>

      <Paragraph>
        <strong>6.1.</strong> As taxas aplicáveis aos serviços da OlympusPay
        estão disponíveis na área logada do usuário e podem ser atualizadas
        mediante aviso prévio de 30 (trinta) dias.
      </Paragraph>

      <Paragraph>
        <strong>6.2.</strong> Os pagamentos são processados conforme os prazos
        estabelecidos na plataforma, respeitando os períodos de análise
        antifraude.
      </Paragraph>

      <Paragraph>
        <strong>6.3.</strong> Os saques estão sujeitos a limites e prazos
        definidos na plataforma.
      </Paragraph>

      <SectionTitle>7. PROPRIEDADE INTELECTUAL</SectionTitle>

      <Paragraph>
        <strong>7.1.</strong> Todo o conteúdo da plataforma OlympusPay (marca,
        logotipos, textos, códigos, design) é de propriedade exclusiva da
        OlympusPay ou de seus licenciadores.
      </Paragraph>

      <Paragraph>
        <strong>7.2.</strong> É vedada a reprodução, distribuição ou uso não
        autorizado de qualquer conteúdo da plataforma.
      </Paragraph>

      <SectionTitle>8. SUSPENSÃO E ENCERRAMENTO</SectionTitle>

      <Paragraph>
        <strong>8.1.</strong> A OlympusPay reserva-se o direito de suspender ou
        encerrar contas que violem estes termos ou a legislação vigente.
      </Paragraph>

      <Paragraph>
        <strong>8.2.</strong> Em caso de suspeita de fraude, a conta poderá ser
        bloqueada preventivamente até conclusão da análise.
      </Paragraph>

      <SectionTitle>9. DISPOSIÇÕES GERAIS</SectionTitle>

      <Paragraph>
        <strong>9.1.</strong> Estes termos podem ser alterados a qualquer
        momento, sendo o usuário notificado sobre mudanças significativas.
      </Paragraph>

      <Paragraph>
        <strong>9.2.</strong> A tolerância quanto ao descumprimento de qualquer
        disposição não constituirá renúncia ao direito de exigir seu
        cumprimento.
      </Paragraph>

      <Paragraph>
        <strong>9.3.</strong> Questões não abordadas nestes termos serão
        resolvidas de acordo com a legislação brasileira.
      </Paragraph>

      <SectionTitle>10. FORO</SectionTitle>

      <Paragraph>
        <strong>10.1.</strong> Fica eleito o foro da comarca de São Paulo/SP
        para dirimir quaisquer controvérsias decorrentes destes Termos.
      </Paragraph>

      <InfoBox>
        <strong>Dúvidas?</strong> Entre em contato conosco:
        <br />
        E-mail: contato@olympuspay.com.br
        <br />
        Telefone: (99) 99999-9999
      </InfoBox>
    </article>
  );
}

function TermsConsumersContent() {
  return (
    <article className="prose prose-invert prose-purple max-w-none">
      <p className="text-gray-400 text-sm mb-6">
        Termos de Uso para Consumidores
      </p>

      <InfoBox>
        Estes termos regulam a relação entre você (consumidor/comprador) e os
        vendedores que utilizam a plataforma OlympusPay como meio de pagamento.
      </InfoBox>

      <SectionTitle>1. Papel da OlympusPay</SectionTitle>

      <Paragraph>
        <strong>1.1.</strong> A OlympusPay atua como{" "}
        <Highlight>intermediadora de pagamentos</Highlight> entre compradores e
        vendedores.
      </Paragraph>

      <Paragraph>
        <strong>1.2.</strong> A responsabilidade pelo produto ou serviço
        adquirido é exclusivamente do vendedor.
      </Paragraph>

      <Paragraph>
        <strong>1.3.</strong> A OlympusPay não é proprietária dos produtos
        comercializados e não se responsabiliza pela qualidade, entrega ou
        características dos mesmos.
      </Paragraph>

      <SectionTitle>2. Processo de Compra</SectionTitle>

      <Paragraph>
        <strong>2.1.</strong> Ao realizar uma compra através de um checkout
        OlympusPay, você está adquirindo um produto ou serviço de um vendedor
        independente.
      </Paragraph>

      <Paragraph>
        <strong>2.2.</strong> Após a confirmação do pagamento, você receberá um
        e-mail de confirmação com os detalhes da transação.
      </Paragraph>

      <Paragraph>
        <strong>2.3.</strong> O acesso ao produto digital será liberado conforme
        as instruções do vendedor, geralmente após a confirmação do pagamento.
      </Paragraph>

      <Paragraph>
        <strong>2.4.</strong> Para produtos físicos, o prazo de entrega é de
        responsabilidade do vendedor.
      </Paragraph>

      <SectionTitle>3. Formas de Pagamento</SectionTitle>

      <ul className="mb-4">
        <ListItem>
          <strong>PIX:</strong> Pagamento instantâneo. Liberação imediata após
          confirmação.
        </ListItem>
        <ListItem>
          <strong>Cartão de Crédito:</strong> Parcelamento em até 12x (conforme
          oferta do vendedor). Sujeito a análise antifraude.
        </ListItem>
        <ListItem>
          <strong>Boleto Bancário:</strong> Compensação em até 3 dias úteis após
          pagamento.
        </ListItem>
      </ul>

      <SectionTitle>4. Direito de Arrependimento</SectionTitle>

      <WarningBox>
        Conforme o Código de Defesa do Consumidor (Art. 49), você tem direito de
        desistir da compra em até <strong>7 (sete) dias</strong> contados do
        recebimento do produto ou da contratação do serviço, quando a compra for
        realizada fora do estabelecimento comercial.
      </WarningBox>

      <Paragraph>
        <strong>4.1.</strong> Para exercer o direito de arrependimento, você
        deve entrar em contato com o vendedor através dos canais de atendimento
        informados.
      </Paragraph>

      <Paragraph>
        <strong>4.2.</strong> O vendedor é responsável por processar seu pedido
        de reembolso conforme sua política de devolução.
      </Paragraph>

      <Paragraph>
        <strong>4.3.</strong> A OlympusPay processará o estorno após autorização
        do vendedor.
      </Paragraph>

      <SectionTitle>5. Garantia</SectionTitle>

      <Paragraph>
        <strong>5.1.</strong> Alguns vendedores oferecem garantia adicional além
        do prazo legal de 7 dias.
      </Paragraph>

      <Paragraph>
        <strong>5.2.</strong> As condições de garantia estão descritas na página
        de venda de cada produto.
      </Paragraph>

      <SectionTitle>6. Segurança dos Pagamentos</SectionTitle>

      <Paragraph>
        <strong>6.1.</strong> Todos os pagamentos são processados em ambiente
        seguro com criptografia.
      </Paragraph>

      <Paragraph>
        <strong>6.2.</strong> Seus dados de cartão não são armazenados em nossos
        servidores.
      </Paragraph>

      <Paragraph>
        <strong>6.3.</strong> Utilizamos sistemas de análise antifraude para
        proteger suas transações.
      </Paragraph>

      <SectionTitle>7. Suporte</SectionTitle>

      <Paragraph>
        <strong>Para questões relacionadas ao produto:</strong>
      </Paragraph>

      <Paragraph>
        Entre em contato diretamente com o vendedor através dos canais de
        atendimento informados no e-mail de confirmação ou na página do produto.
      </Paragraph>

      <Paragraph>
        <strong>Para questões relacionadas ao pagamento:</strong>
      </Paragraph>

      <InfoBox>
        E-mail: suporte@olympuspay.com.br
        <br />
        Telefone: (99) 99999-9999
        <br />
        Horário: Segunda a Sexta, das 9h às 18h
      </InfoBox>

      <SectionTitle>8. Reclamações</SectionTitle>

      <Paragraph>
        <strong>8.1.</strong> Caso tenha problemas com uma compra, recomendamos
        primeiro tentar resolver diretamente com o vendedor.
      </Paragraph>

      <Paragraph>
        <strong>8.2.</strong> Se não conseguir resolução, você pode abrir uma
        disputa através do nosso canal de suporte.
      </Paragraph>

      <Paragraph>
        <strong>8.3.</strong> A OlympusPay analisará a situação e poderá mediar a
        resolução entre as partes.
      </Paragraph>

      <SectionTitle>9. Seus Dados Pessoais</SectionTitle>

      <Paragraph>
        <strong>9.1.</strong> Ao realizar uma compra, seus dados são coletados
        para processamento do pagamento e entrega do produto.
      </Paragraph>

      <Paragraph>
        <strong>9.2.</strong> Para mais informações sobre como tratamos seus
        dados, consulte nosso Aviso de Privacidade para Compradores.
      </Paragraph>

      <WarningBox>
        Para exercer seus direitos de titular de dados (acesso, correção,
        exclusão), entre em contato: <strong>lgpd@olympuspay.com.br</strong>
      </WarningBox>
    </article>
  );
}
