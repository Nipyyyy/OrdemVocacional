import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Download, Eye, X, ZoomIn } from 'lucide-react';

interface Token {
  id: string;
  name: string;
  description: string;
  imagePath: string;
}

interface Map {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  details: string;
}

interface ProfessionCategory {
  id: string;
  name: string;
  description: string;
  tokens: Token[];
}

const TokensAndMaps: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [selectedMap, setSelectedMap] = useState<Map | null>(null);

  const maps: Map[] = [
    {
      id: 'hospital',
      name: 'Posto de Saúde',
      description: 'Mapa detalhado de um hospital com salas de emergência, consultórios e atendimento.',
      imagePath: '/src/assets/HOSPITAL SUS.jpg',
      details: 'Este mapa inclui: Recepção principal, Salas de emergência, Consultórios médicos, Centro cirúrgico, UTI, Farmácia interna, Laboratórios, Salas de espera e Corredores de acesso.'
    },
    {
      id: 'office',
      name: 'Empresa Publica',
      description: 'Ambiente corporativo com salas de reunião, escritórios e áreas comuns.',
      imagePath: '/src/assets/ESCRITORIO TI.png',
      details: 'Este mapa inclui: Recepção corporativa, Escritórios individuais, Salas de reunião, Open space, Sala de diretoria, Copa/cozinha, Banheiros e Área de descanso.'
    },
    {
      id: 'school',
      name: 'Escola Publica',
      description: 'Ambiente escolar completo com salas de aula, laboratórios e biblioteca.',
      imagePath: '/src/assets/school_map.png',
      details: 'Este mapa inclui: Salas de aula, Biblioteca, Laboratório de ciências, Laboratório de informática, Quadra esportiva, Pátio, Cantina, Diretoria e Sala dos professores.'
    },
    {
      id: 'courthouse',
      name: 'Fórum de Justiça',
      description: 'Tribunal completo com salas de audiência, gabinetes e cartórios.',
      imagePath: '/src/assets/courthouse_map.png',
      details: 'Este mapa inclui: Salas de audiência, Gabinetes dos juízes, Cartórios, Sala dos advogados, Sala do júri, Arquivo, Segurança e Recepção do fórum.'
    },
    {
      id: 'laboratory',
      name: 'Laboratório de Pesquisa',
      description: 'Laboratório científico com equipamentos de pesquisa e análise.',
      imagePath: '/src/assets/laboratory_map.png',
      details: 'Este mapa inclui: Bancadas de trabalho, Equipamentos de análise, Sala de esterilização, Depósito de materiais, Sala de reuniões, Escritório do coordenador e Área de segurança.'
    },
    {
      id: 'newsroom',
      name: 'Redação de Jornal',
      description: 'Ambiente de redação com estúdio de TV e rádio.',
      imagePath: '/src/assets/newsroom_map.png',
      details: 'Este mapa inclui: Redação principal, Estúdio de TV, Estúdio de rádio, Sala de edição, Arquivo, Sala de reuniões, Recepção e Área técnica.'
    },
    {
      id: 'advertising_agency',
      name: 'Agência de Publicidade',
      description: 'Escritório criativo com salas de brainstorm e estúdio de produção.',
      imagePath: '/src/assets/advertising_agency_map.png',
      details: 'Este mapa inclui: Área criativa, Salas de brainstorm, Estúdio de produção, Sala de apresentação, Atendimento, Diretoria, Copa e Área de descanso.'
    },
    {
      id: 'art_studio',
      name: 'Estúdio de Arte',
      description: 'Espaço criativo com ateliês e salas de exposição.',
      imagePath: '/src/assets/art_studio_map.png',
      details: 'Este mapa inclui: Ateliês de pintura, Sala de escultura, Área de design digital, Galeria de exposição, Depósito de materiais, Sala de aula e Recepção.'
    },
    {
      id: 'film_studio',
      name: 'Estúdio de Cinema',
      description: 'Complexo de produção audiovisual com sets e salas de edição.',
      imagePath: '/src/assets/film_studio_map.png',
      details: 'Este mapa inclui: Sets de filmagem, Salas de edição, Estúdio de som, Camarins, Depósito de equipamentos, Sala de produção, Recepção e Área técnica.'
    },
    {
      id: 'zoo',
      name: 'Zoológico e Centro de Pesquisa',
      description: 'Complexo zoológico com áreas de pesquisa e conservação.',
      imagePath: '/src/assets/zoo_map.png',
      details: 'Este mapa inclui: Recintos dos animais, Laboratório veterinário, Centro de pesquisa, Berçário, Quarentena, Clínica veterinária, Administração e Área educativa.'
    },
    {
      id: 'social_center',
      name: 'Centro de Assistência Social',
      description: 'Centro comunitário com salas de atendimento e atividades sociais.',
      imagePath: '/src/assets/social_center_map.png',
      details: 'Este mapa inclui: Salas de atendimento, Auditório, Salas de atividades, Cozinha comunitária, Brinquedoteca, Biblioteca, Administração e Recepção.'
    },
    {
      id: 'tech_company',
      name: 'Empresa de Tecnologia',
      description: 'Escritório moderno de tecnologia com laboratórios e salas de desenvolvimento.',
      imagePath: '/src/assets/tech_company_map.png',
      details: 'Este mapa inclui: Área de desenvolvimento, Laboratório de testes, Salas de reunião, Área de descanso, Data center, Sala de servidores, Recepção e Coworking.'
    }
  ];

  const professionCategories: ProfessionCategory[] = [
    {
      id: 'medicina',
      name: 'Medicina',
      description: 'Tokens relacionados à área médica e de saúde',
      tokens: [
        {
          id: 'medico-1',
          name: 'Médico Clínico',
          description: 'Médico com tablet realizando consulta',
          imagePath: '/src/assets/Medico Folha.png',
        },
        {
          id: 'medico-2',
          name: 'Médico Emergencista',
          description:
            'Médico com máscara e prancheta em situação de emergência',
          imagePath: '/src/assets/Medica Prancha.png',
        },
        {
          id: 'medica-1',
          name: 'Médica com Seringa',
          description: 'Médica preparando aplicação de vacina ou medicamento',
          imagePath: '/src/assets/Medica Seringa.png',
        },
        {
          id: 'medica-2',
          name: 'Médica com Oxímetro',
          description: 'Médica utilizando oxímetro para verificar saturação',
          imagePath: '/src/assets/Medica Pressão.png',
        },
      ],
    },
    {
      id: 'informatica',
      name: 'Tecnologia da Informação',
      description: 'Tokens relacionados à área de TI e desenvolvimento',
      tokens: [
        {
          id: 'dev-1',
          name: 'Desenvolvedor Frontend',
          description: 'Desenvolvedor trabalhando com interfaces web',
          imagePath: '/src/assets/dev_frontend.png',
        },
        {
          id: 'dev-2',
          name: 'Analista de Sistemas',
          description: 'Profissional analisando arquitetura de sistemas',
          imagePath: '/src/assets/analista_sistemas.png',
        },
        {
          id: 'dev-3',
          name: 'Administrador de Redes',
          description: 'Especialista em infraestrutura e redes',
          imagePath: '/src/assets/admin_redes.png',
        },
        {
          id: 'dev-4',
          name: 'Cientista de Dados',
          description: 'Profissional analisando dados e estatísticas',
          imagePath: '/src/assets/cientista_dados.png',
        },
      ],
    },
    {
      id: 'educacao',
      name: 'Educação',
      description: 'Tokens relacionados ao ensino e pedagogia',
      tokens: [
        {
          id: 'prof-1',
          name: 'Professora de Matematica',
          description: 'Professora do Senac tomando um café',
          imagePath: '/src/assets/Samara.png',
        },
        {
          id: 'prof-2',
          name: 'Professor de Artes',
          description: 'Professor dando aula pratica',
          imagePath: 'https://photos.app.goo.gl/RmLgn36mxauHPnLF9',
        },
        {
          id: 'prof-3',
          name: 'Professora de Portugues',
          description: 'Professora explicando a matéria',
          imagePath: '/src/assets/Renata.png',
        },
        {
          id: 'prof-4',
          name: 'Professor de Educação Física',
          description: 'Professor orientando atividades esportivas',
          imagePath: '/src/assets/prof_educacao_fisica.png',
        },
      ],
    },
    {
      id: 'direito',
      name: 'Direito',
      description: 'Tokens relacionados à área jurídica',
      tokens: [
        {
          id: 'adv-1',
          name: 'Advogado Criminalista',
          description: 'Advogado especializado em direito criminal',
          imagePath: '/src/assets/advogado_criminalista.png',
        },
        {
          id: 'adv-2',
          name: 'Juiz',
          description: 'Magistrado presidindo audiência',
          imagePath: '/src/assets/juiz.png',
        },
        {
          id: 'adv-3',
          name: 'Promotor',
          description: 'Promotor de justiça em tribunal',
          imagePath: '/src/assets/promotor.png',
        },
        {
          id: 'adv-4',
          name: 'Advogado Empresarial',
          description: 'Advogado especializado em direito empresarial',
          imagePath: '/src/assets/advogado_empresarial.png',
        },
      ],
    },
    {
      id: 'artes',
      name: 'Artes Visuais e Design',
      description: 'Tokens relacionados à criação artística e design',
      tokens: [
        {
          id: 'art-1',
          name: 'Designer Gráfico',
          description: 'Designer criando identidade visual',
          imagePath: '/src/assets/designer_grafico.png',
        },
        {
          id: 'art-2',
          name: 'Ilustrador',
          description: 'Artista criando ilustrações digitais',
          imagePath: '/src/assets/ilustrador.png',
        },
        {
          id: 'art-3',
          name: 'Designer UX/UI',
          description: 'Designer criando interfaces de usuário',
          imagePath: '/src/assets/designer_ux_ui.png',
        },
        {
          id: 'art-4',
          name: 'Diretor de Arte',
          description: 'Profissional dirigindo projetos visuais',
          imagePath: '/src/assets/diretor_arte.png',
        },
      ],
    },
    {
      id: 'administracao',
      name: 'Administração',
      description: 'Tokens relacionados à gestão e negócios',
      tokens: [
        {
          id: 'adm-1',
          name: 'Gestor de Projetos',
          description: 'Profissional gerenciando equipes e projetos',
          imagePath: '/src/assets/gestor_projetos.png',
        },
        {
          id: 'adm-2',
          name: 'Analista Financeiro',
          description: 'Profissional analisando dados financeiros',
          imagePath: '/src/assets/analista_financeiro.png',
        },
        {
          id: 'adm-3',
          name: 'Gestor de RH',
          description: 'Profissional de recursos humanos',
          imagePath: '/src/assets/gestor_rh.png',
        },
        {
          id: 'adm-4',
          name: 'Empreendedor',
          description: 'Empresário desenvolvendo novos negócios',
          imagePath: '/src/assets/empreendedor.png',
        },
      ],
    },
    {
      id: 'jornalismo',
      name: 'Jornalismo',
      description: 'Tokens relacionados à comunicação e mídia',
      tokens: [
        {
          id: 'jorn-1',
          name: 'Repórter de Campo',
          description: 'Jornalista fazendo cobertura externa',
          imagePath: '/src/assets/reporter_campo.png',
        },
        {
          id: 'jorn-2',
          name: 'Apresentador de TV',
          description: 'Jornalista apresentando telejornal',
          imagePath: '/src/assets/apresentador_tv.png',
        },
        {
          id: 'jorn-3',
          name: 'Editor de Conteúdo',
          description: 'Profissional editando matérias jornalísticas',
          imagePath: '/src/assets/editor_conteudo.png',
        },
        {
          id: 'jorn-4',
          name: 'Fotojornalista',
          description: 'Jornalista especializado em fotografia',
          imagePath: '/src/assets/fotojornalista.png',
        },
      ],
    },
    {
      id: 'publicidade',
      name: 'Publicidade e Propaganda',
      description: 'Tokens relacionados à comunicação publicitária',
      tokens: [
        {
          id: 'pub-1',
          name: 'Redator Publicitário',
          description: 'Profissional criando textos publicitários',
          imagePath: '/src/assets/redator_publicitario.png',
        },
        {
          id: 'pub-2',
          name: 'Diretor Criativo',
          description: 'Profissional dirigindo campanhas publicitárias',
          imagePath: '/src/assets/diretor_criativo.png',
        },
        {
          id: 'pub-3',
          name: 'Social Media Manager',
          description: 'Especialista em redes sociais',
          imagePath: '/src/assets/social_media_manager.png',
        },
        {
          id: 'pub-4',
          name: 'Planejador de Mídia',
          description: 'Profissional planejando veiculação de campanhas',
          imagePath: '/src/assets/planejador_midia.png',
        },
      ],
    },
    {
      id: 'cinema',
      name: 'Cinema e Audiovisual',
      description: 'Tokens relacionados à produção audiovisual',
      tokens: [
        {
          id: 'cin-1',
          name: 'Diretor de Cinema',
          description: 'Diretor comandando filmagem',
          imagePath: '/src/assets/diretor_cinema.png',
        },
        {
          id: 'cin-2',
          name: 'Cinegrafista',
          description: 'Profissional operando câmera de cinema',
          imagePath: '/src/assets/cinegrafista.png',
        },
        {
          id: 'cin-3',
          name: 'Editor de Vídeo',
          description: 'Profissional editando material audiovisual',
          imagePath: '/src/assets/editor_video.png',
        },
        {
          id: 'cin-4',
          name: 'Produtor Audiovisual',
          description: 'Profissional produzindo conteúdo audiovisual',
          imagePath: '/src/assets/produtor_audiovisual.png',
        },
      ],
    },
    {
      id: 'zoologia',
      name: 'Zoologia',
      description: 'Tokens relacionados ao estudo e cuidado animal',
      tokens: [
        {
          id: 'zoo-1',
          name: 'Zoólogo de Campo',
          description: 'Pesquisador estudando animais na natureza',
          imagePath: '/src/assets/zoologo_campo.png',
        },
        {
          id: 'zoo-2',
          name: 'Biólogo Marinho',
          description: 'Especialista em vida aquática',
          imagePath: '/src/assets/biologo_marinho.png',
        },
        {
          id: 'zoo-3',
          name: 'Conservacionista',
          description: 'Profissional trabalhando na preservação animal',
          imagePath: '/src/assets/conservacionista.png',
        },
        {
          id: 'zoo-4',
          name: 'Veterinário de Zoo',
          description: 'Veterinário cuidando de animais selvagens',
          imagePath: '/src/assets/veterinario_zoo.png',
        },
      ],
    },
    {
      id: 'assistente',
      name: 'Assistência Social',
      description: 'Tokens relacionados ao trabalho social',
      tokens: [
        {
          id: 'ass-1',
          name: 'Assistente Social',
          description: 'Profissional atendendo famílias em vulnerabilidade',
          imagePath: '/src/assets/assistente_social.png',
        },
        {
          id: 'ass-2',
          name: 'Conselheiro Tutelar',
          description: 'Profissional protegendo direitos de crianças',
          imagePath: '/src/assets/conselheiro_tutelar.png',
        },
        {
          id: 'ass-3',
          name: 'Educador Social',
          description: 'Profissional trabalhando com educação social',
          imagePath: '/src/assets/educador_social.png',
        },
        {
          id: 'ass-4',
          name: 'Gestor de ONG',
          description: 'Profissional gerenciando organização social',
          imagePath: '/src/assets/gestor_ong.png',
        },
      ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  const openTokenModal = (token: Token) => {
    setSelectedToken(token);
  };

  const closeTokenModal = () => {
    setSelectedToken(null);
  };

  const openMapModal = (map: Map) => {
    setSelectedMap(map);
  };

  const closeMapModal = () => {
    setSelectedMap(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-accent-gold mb-6">
              Tokens e Mapas RPG
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore nossa coleção de tokens de personagens organizados por
              profissão e mapas de cenários para enriquecer suas sessões de RPG.
            </p>
            <div className="flex justify-center">
              <div className="h-1 w-32 bg-accent-gold rounded-full"></div>
            </div>
          </div>

          {/* Seção de Tokens por Categoria */}
          <section className="mb-16">
            <h2 className="text-3xl font-cinzel font-bold text-accent-gold mb-8 text-center">
              Tokens por Profissão
            </h2>

            <div className="space-y-4">
              {professionCategories.map((category) => (
                <div key={category.id} className="card">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-2 hover:bg-dark-purple/20 rounded-md transition-colors"
                  >
                    <div className="text-left">
                      <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-1">
                        {category.name}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {category.description} • {category.tokens.length} tokens
                        disponíveis
                      </p>
                    </div>
                    <div className="text-accent-gold">
                      {expandedCategory === category.id ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedCategory === category.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 border-t border-light-purple/20 pt-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {category.tokens.map((token) => (
                            <motion.div
                              key={token.id}
                              className="bg-dark-purple/30 rounded-lg p-4 border border-light-purple/20 hover:border-accent-gold/50 transition-all duration-300 cursor-pointer group"
                              whileHover={{ scale: 1.02 }}
                              onClick={() => openTokenModal(token)}
                            >
                              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-dark-blue/50">
                                <img
                                  src={token.imagePath}
                                  alt={token.name}
                                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <h4 className="text-lg font-cinzel font-semibold text-accent-gold mb-2">
                                {token.name}
                              </h4>
                              <p className="text-gray-300 text-sm mb-4">
                                {token.description}
                              </p>
                              <div className="flex space-x-2">
                                <button className="flex-1 bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center">
                                  <Eye size={14} className="mr-1" />
                                  Ver
                                </button>
                                <button className="flex-1 bg-dark-blue/50 hover:bg-dark-blue text-white text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center">
                                  <Download size={14} className="mr-1" />
                                  Baixar
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* Seção de Mapas */}
          <section>
            <h2 className="text-3xl font-cinzel font-bold text-accent-gold mb-8 text-center">
              Mapas dos Cenários
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {maps.map((map) => (
                <div key={map.id} className="card">
                  <div 
                    className="aspect-video rounded-lg overflow-hidden mb-4 bg-dark-purple/50 cursor-pointer group relative"
                    onClick={() => openMapModal(map)}
                  >
                    <img 
                      src={map.imagePath} 
                      alt={map.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent-gold/90 text-dark-blue px-4 py-2 rounded-full flex items-center">
                        <ZoomIn size={18} className="mr-2" />
                        <span className="font-medium">Ver Mapa</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-cinzel font-semibold text-accent-gold mb-2">
                    {map.name}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {map.description}
                  </p>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => openMapModal(map)}
                      className="btn-primary flex-1 flex items-center justify-center"
                    >
                      <Eye size={16} className="mr-2" />
                      Visualizar
                    </button>
                    <button className="btn-secondary flex items-center justify-center px-4">
                      <Download size={16} className="mr-2" />
                      Baixar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>

      {/* Modal de Token */}
      <AnimatePresence>
        {selectedToken && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeTokenModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-dark-blue border border-light-purple/20 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-cinzel font-bold text-accent-gold mb-2">
                    {selectedToken.name}
                  </h3>
                  <p className="text-gray-300">{selectedToken.description}</p>
                </div>
                <button
                  onClick={closeTokenModal}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={selectedToken.imagePath}
                  alt={selectedToken.name}
                  className="w-full max-w-md mx-auto rounded-lg"
                />
              </div>

              <div className="flex space-x-4">
                <button className="btn-primary flex-1 flex items-center justify-center">
                  <Download size={18} className="mr-2" />
                  Baixar Token
                </button>
                <button
                  onClick={closeTokenModal}
                  className="btn-secondary flex-1"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Mapa */}
      <AnimatePresence>
        {selectedMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={closeMapModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-dark-blue border border-light-purple/20 rounded-lg p-6 max-w-6xl w-full max-h-[95vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-cinzel font-bold text-accent-gold mb-2">
                    {selectedMap.name}
                  </h3>
                  <p className="text-gray-300 mb-4">{selectedMap.description}</p>
                  <div className="bg-dark-purple/30 p-4 rounded-lg border border-light-purple/20">
                    <h4 className="text-lg font-cinzel font-semibold text-accent-gold mb-2">
                      Detalhes do Mapa
                    </h4>
                    <p className="text-gray-300 text-sm">{selectedMap.details}</p>
                  </div>
                </div>
                <button
                  onClick={closeMapModal}
                  className="text-gray-400 hover:text-white transition-colors p-2 ml-4"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="mb-6">
                <div className="rounded-lg overflow-hidden bg-dark-purple/20 border border-light-purple/20">
                  <img
                    src={selectedMap.imagePath}
                    alt={selectedMap.name}
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="btn-primary flex-1 flex items-center justify-center">
                  <Download size={18} className="mr-2" />
                  Baixar Mapa em Alta Resolução
                </button>
                <button
                  onClick={closeMapModal}
                  className="btn-secondary flex-1"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TokensAndMaps;