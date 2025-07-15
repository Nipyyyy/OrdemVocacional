import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Dice1 as DiceOne, ExternalLink } from 'lucide-react';

const RPGInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('regras');
  
  // Link do PDF das regras - você pode alterar este link
  const rulesBookPdfUrl = "https://www.canva.com/design/DAGsAhQQ8K0/AAGBQeGrluop_b0baleG4A/view?utm_content=DAGsAhQQ8K0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h80bd9183f0";
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-accent-gold mb-6">
              RPG Ordem Vocacional
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Descubra um universo único onde sua vocação se transforma em uma 
              jornada épica de autodescoberta e aventura.
            </p>
            <div className="flex justify-center">
              <div className="h-1 w-32 bg-accent-gold rounded-full"></div>
            </div>
          </div>

          {/* Tabs de Navegação */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            <button 
              className={`px-4 py-2 rounded-full flex items-center transition-colors ${
                activeTab === 'regras' 
                  ? 'bg-accent-gold text-dark-blue font-medium' 
                  : 'bg-dark-blue/50 text-white hover:bg-dark-blue/70 hover:text-accent-gold'
              }`}
              onClick={() => setActiveTab('regras')}
            >
              <Book size={18} className="mr-2" />
              Regras
            </button>
            <button 
              className={`px-4 py-2 rounded-full flex items-center transition-colors ${
                activeTab === 'situacoes' 
                  ? 'bg-accent-gold text-dark-blue font-medium' 
                  : 'bg-dark-blue/50 text-white hover:bg-dark-blue/70 hover:text-accent-gold'
              }`}
              onClick={() => setActiveTab('situacoes')}
            >
              <DiceOne size={18} className="mr-2" />
              Situações
            </button>
          </div>

          {/* Conteúdo da Tab Ativa */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'regras' && (
              <div className="card">
                <h2 className="text-2xl font-cinzel font-bold text-accent-gold mb-6">
                  Livro de Regras
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Capa do Livro */}
                  <div className="order-2 lg:order-1">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-cinzel font-semibold text-white mb-3">
                          Visão Geral
                        </h3>
                        <p className="text-gray-300 mb-4">
                          O RPG Ordem Vocacional é um jogo de interpretação de papéis baseado em 
                          narrativa, onde os jogadores exploram diferentes profissões e situações 
                          do dia a dia em um contexto imersivo e educativo.
                        </p>
                      </div>
                      
                      <div className="bg-dark-blue/70 p-4 rounded-lg border border-light-purple/30">
                        <h3 className="text-lg font-cinzel font-semibold text-accent-gold mb-2">
                          Acesse o Livro de Regras Completo
                        </h3>
                        <p className="text-gray-300 mb-4">
                          Para acessar todas as regras, mecânicas e detalhes do sistema, consulte 
                          nosso livro de regras completo em PDF.
                        </p>
                        <a 
                          href={rulesBookPdfUrl}
                          className="btn-primary inline-flex items-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Book size={18} className="mr-2" />
                          Acessar Livro de Regras
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Capa do Livro - Clicável */}
                  <div className="order-1 lg:order-2">
                    <div className="relative group">
                      <a 
                        href={rulesBookPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="relative overflow-hidden rounded-lg shadow-2xl border-2 border-accent-gold/30 hover:border-accent-gold transition-all duration-300 group-hover:scale-105">
                          {/* Placeholder para a capa do livro - você pode substituir esta URL */}
                          <img 
                            src="src/assets/Capa do Livro RPG.png"
                            alt="Capa do Livro de Regras - Ordem Vocacional"
                            className="w-full h-auto aspect-[3/4] object-cover"
                          />
                          
                          {/* Overlay com efeito hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="bg-accent-gold/90 text-dark-blue px-4 py-2 rounded-full flex items-center justify-center font-medium">
                                <Book size={18} className="mr-2" />
                                Abrir PDF
                                <ExternalLink size={16} className="ml-2" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Brilho sutil */}
                          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-transparent to-transparent"></div>
                        </div>
                      </a>
                      
                      {/* Título da capa */}
                      <div className="mt-4 text-center">
                        <h3 className="text-xl font-cinzel font-bold text-accent-gold mb-1">
                          Livro de Regras
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Ordem Vocacional RPG
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Clique para abrir o PDF
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'situacoes' && (
              <div className="card">
                <h2 className="text-2xl font-cinzel font-bold text-accent-gold mb-6">
                  Situações por Profissão
                </h2>
                
                <div className="space-y-8">
                  {/* Técnico em Informática */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Técnico em Informática - Empresa
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm italic">
                      O local seria em uma empresa onde o setor da TI ajuda os outros a resolver alguns problemas.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          RH - Computador não Liga
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Alguém abriu um chamado pedindo ajuda pois o computador desligou e não quer ligar mais. 
                          O local seria em um setor maior com mais pessoas e espaço.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Documentos - Liberação de VPN
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Uma pessoa está querendo fazer teletrabalho e precisa que sua VPN seja liberada para teletrabalho. 
                          O local seria em uma sala mais apertada, mas com muitas pessoas.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Sala de Servidor - Invasão Hacker
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Depois de voltar de um recesso da empresa, a equipe de TI percebe que o sistema não está funcionando. 
                          Pelos servidores ficarem muito tempo sem monitoramento, um hacker conseguiu invadir o sistema. 
                          O cenário seria caótico pois estaria monte de pessoas da TI juntas tentando ajudar mais atrapalhando.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Médico */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Médico - Hospital Público
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm italic">
                      O local seria em um hospital público do SUS onde há vacinas, consultas, medicamentos e cirurgias.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Vacina - Criança com Medo
                        </h4>
                        <p className="text-gray-300 text-sm">
                          No final da tarde uma criança com sua mãe chega para tomar vacina e ela está com muito medo 
                          e não quer tomar a vacina e tenta se rebater. A sala é bem calma com vários desenhos nas paredes.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Remédio - Parada Cardíaca
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Uma paciente chega da ambulância com os médicos correndo com ele em uma maca pois está tendo 
                          uma parada cardíaca. O hospital está lotado e o paciente está no corredor sem tempo para levar até um quarto.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Reanimação - Paciente em Psicose
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Uma ambulância chega com um paciente acidentado, ele está extremamente machucado e está sofrendo psicose, 
                          com medo de deixar qualquer médico examinar ele, cabe ao jogador tentar acalmar o paciente e tratá-lo.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Veterinário */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Veterinário - Posto Veterinário Interior
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm italic">
                      O local seria como um posto veterinário mais para emergências ou casos rápidos. 
                      É um lugar apertado com recepção, sala de espera, apenas 1 sala mas que é grande para cuidar dos casos.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Carrapato - Cachorro com Pulgas
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Um cachorro está com pulgas e alguns carrapatos por causa que estava correndo e brincando no mato. 
                          E ele veio no braços de um menininho pedindo ajuda com ele.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Espinhos - Gatinho Ferido
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Uma moça chega correndo assustada e chorando porque seu gatinho caiu em um arbusto com espinhos 
                          e alguns deles o furou.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Mal Parto - Animal Atropelado
                        </h4>
                        <p className="text-gray-300 text-sm">
                          O veterinário estava andando até seu serviço e viu um animal de rua foi atropelado por alguma coisa 
                          caído no chão. Ele provavelmente além de estar com alguma parte quebrada está com uma hemorragia 
                          e você está um perto do veterinário, mas não sabe se é tempo suficiente.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Administrador */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Administrador - Assistente de Empresa Grande
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm italic">
                      O local é uma empresa que é muito grande na produção, administração, tecnologia. 
                      Mas ela não tem condições de trabalho quando é para os funcionários ela foca mais para ser mostra bonita ao público.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Material - Perda de Estoque
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Alguns materiais foram perdidos por conta da bagunça de onde ficaram e então como foram muitos 
                          houve uma boa perda de material e dinheiro. Além disso a sala onde os materiais está vazia sem nenhum estoque.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Projetos - Nova Ideia de Negócio
                        </h4>
                        <p className="text-gray-300 text-sm">
                          A empresa está diminuindo suas vendas após outra empresa um pouco mais conhecida copiou a sua ideia do projeto 
                          então é preciso de uma nova ideia de projeto para começar a ser feito e alguns administradores além de você 
                          foi escolhido para isso.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Improviso - Promoção Urgente
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Você foi chamado no RH pois você estava trabalhando muito bem e eles acham que você pode ser alguém 
                          para administrar as coisas mais sérias da empresa que seria as contas das transições de empresários 
                          de outras empresas. E você tem pouco tempo para fazer a conta de uma lista grande dessas transações.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Professor */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Professor
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Situação 1
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Situação 2
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Situação 3
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Zoologia */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Zoologia
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Situação 1
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Situação 2
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Situação 3
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Publicidade e Propaganda */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Publicidade e Propaganda
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Situação 1
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Situação 2
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Situação 3
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Jornalismo */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Jornalismo
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Situação 1
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Situação 2
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Situação 3
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Artes Visuais e Design */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Artes Visuais e Design
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Situação 1
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Situação 2
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Situação 3
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Direito */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Direito
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Situação 1
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Situação 2
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Situação 3
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cinema e Audiovisual */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Cinema e Audiovisual
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Situação 1
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Situação 2
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Situação 3
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Assistência Social */}
                  <div className="bg-dark-purple/30 p-6 rounded-lg border border-light-purple/20">
                    <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-4">
                      Assistência Social
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">FÁCIL</span>
                          Situação 1
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs mr-2">MÉDIO</span>
                          Situação 2
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs mr-2">DIFÍCIL</span>
                          Situação 3
                        </h4>
                        <p className="text-gray-300 text-sm italic">
                          [Texto da situação será adicionado em breve]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Nota sobre desenvolvimento */}
                  <div className="bg-dark-blue/50 p-6 rounded-lg border border-accent-gold/30">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-accent-gold rounded-full mr-3 animate-pulse"></div>
                      <h3 className="text-lg font-cinzel font-semibold text-accent-gold">
                        Em Desenvolvimento
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                      As situações marcadas como "[Texto da situação será adicionado em breve]" 
                      estão sendo desenvolvidas e serão incluídas nas próximas atualizações do RPG. 
                      Cada profissão terá cenários únicos e desafiadores para proporcionar uma 
                      experiência completa e imersiva.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RPGInfo;