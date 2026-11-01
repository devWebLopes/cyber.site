import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Activity, ArrowRight, Check, ChevronRight, ClipboardList, Cloud, Cpu,
  Download, FileText, Globe2, Headphones, Layers3, LockKeyhole, Mail,
  Menu, MessageCircle, Network, Package, RefreshCw, ScanLine, Server, Shield, ShieldAlert,
  ShieldCheck, Terminal, X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import NotFound from '@/pages/not-found';
import { SiWhatsapp } from 'react-icons/si';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  ['Soluções', '#solucoes'],
  ['Diferenciais', '#diferenciais'],
  ['Resultados', '#resultados'],
  ['Processo', '#processo'],
  ['Contato', '#contato'],
] as const;

const features = [
  { title: 'Monitoramento preventivo de telemetria', description: 'Acompanhe em tempo real a performance das estações e antecipe falhas antes que virem problemas.', pillar: 'Prevenção', Icon: Activity },
  { title: 'Inventário de hardware', description: 'Relação minuciosa e sempre atualizada do parque: CPU, RAM, disco, GPU e rede. Alertas para alterações não autorizadas.', pillar: 'Prevenção', Icon: Cpu },
  { title: 'Inventário de software', description: 'Monitore programas instalados, versões e licenças. Destaque para softwares não homologados.', pillar: 'Prevenção', Icon: Package },
  { title: 'Gestão de vulnerabilidades', description: 'Identifique e classifique fragilidades em sistemas e aplicativos. Saiba o que corrigir primeiro.', pillar: 'Prevenção', Icon: ShieldAlert },
  { title: 'Gestão de patches', description: 'Atualize Windows e mais de 200 softwares de terceiros a partir de um console central.', pillar: 'Prevenção', Icon: RefreshCw },
  { title: 'Descoberta de dispositivos na rede', description: 'Identifique impressoras, tablets, celulares, roteadores e acessos não autorizados na rede interna.', pillar: 'Prevenção', Icon: Network },
  { title: 'Antivírus profissional EDR', description: 'Detecção e resposta em endpoint: rastreie, elimine e previna ameaças com painel centralizado.', pillar: 'Proteção', Icon: ShieldCheck },
  { title: 'Filtro de URL', description: 'Controle de acesso por categorias, redução de banda e bloqueio de malwares e propagandas por padrão.', pillar: 'Proteção', Icon: Globe2 },
  { title: 'Central de atividades (auditoria)', description: 'Ações registradas, rastreáveis e auditáveis conforme padrões internacionais.', pillar: 'Suporte', Icon: ClipboardList },
  { title: 'Scripts remotos (PowerShell)', description: 'Execute ajustes e correções em grupos de máquinas simultaneamente, sem interromper colaboradores.', pillar: 'Suporte', Icon: Terminal },
  { title: 'Implantação de software em larga escala', description: 'Padronize aplicativos homologados rapidamente em todo o parque.', pillar: 'Suporte', Icon: Download },
  { title: 'Suporte remoto com gravação', description: 'Acesso direto aos dispositivos com agente. Sessões gravadas para fins forenses.', pillar: 'Suporte', Icon: Headphones },
  { title: 'Backup profissional em nuvem', description: 'Três níveis: arquivos e pastas, imagem completa (snapshot) e Disaster Recovery com ativação virtual na nuvem.', pillar: 'Recuperação', Icon: Cloud },
];

const filters = ['Todos', 'Prevenção', 'Proteção', 'Suporte', 'Recuperação'];
const whatsappUrl = `https://wa.me/554999119473?text=${encodeURIComponent('Olá! Gostaria de agendar um diagnóstico da CyberTech.')}`;

const differentiators = [
  { title: 'Um único agente', text: 'Semiautônomo, comunica-se com a Central de Acompanhamento. Menos fricção, menos overhead.', Icon: ScanLine },
  { title: 'Implementação gradual', text: 'Aplique recursos conforme a confiança e o orçamento. Transição suave do diagnóstico ao controle completo.', Icon: Layers3 },
  { title: 'Privacidade preservada', text: 'Coleta apenas dados técnicos de desempenho. Sem acesso ao conteúdo processado pelos colaboradores.', Icon: LockKeyhole },
  { title: 'Relatórios executivos em PDF', text: 'Demonstre à diretoria, em tempo real, o estado de cibersegurança do parque.', Icon: FileText },
  { title: 'Redução de custos', text: 'Elimine licenças de suporte remoto de terceiros e otimize reposição e manutenção com dados reais.', Icon: Check },
  { title: 'Compatibilidade multiplataforma', text: 'Windows, Linux, macOS e Android (em testes). Backup para servidores, bancos de dados, controladores de domínio e virtualizações.', Icon: Server },
];

const metrics = [
  { value: '+200', label: 'softwares de terceiros com gestão de patches' },
  { value: '4', label: 'pilares de segurança integrados' },
  { value: '3', label: 'níveis de proteção de backup' },
  { value: '1', label: 'agente por dispositivo' },
  { value: '100%', label: 'rastreabilidade das ações (auditoria)' },
  { value: '24/7', label: 'monitoramento preventivo' },
];

const steps = [
  { title: 'Diagnóstico', text: 'Entendemos seu parque, riscos e objetivos. Sem compromisso.' },
  { title: 'Implantação do agente', text: 'Instalação remota do agente nas estações. Rápida e não invasiva.' },
  { title: 'Configuração gradual', text: 'Ativamos os módulos conforme sua necessidade e orçamento.' },
  { title: 'Monitoramento contínuo', text: 'Visibilidade, alertas, relatórios e suporte contínuo.' },
];

type LeadValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  stations: string;
  message: string;
};
type LeadErrors = Partial<Record<keyof LeadValues, string>>;

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="inline-flex items-center gap-3 no-underline" aria-label="Eratech CyberTech — início" data-testid="link-home">
      <span className="brand-mark" aria-hidden="true" />
      <span className="leading-tight">
        <span className="block text-[15px] font-extrabold tracking-[-.04em] text-slate-100">ERATECH</span>
        {!compact && <span className="mono mt-0.5 block text-[8px] tracking-[.2em] text-blue-300">CYBERTECH</span>}
      </span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header">
      <div className="container-wide flex h-full items-center justify-between">
        <Brand />
        <nav className="desktop-nav flex items-center gap-7" aria-label="Navegação principal">
          {navItems.map(([label, href]) => <a key={href} className="nav-link no-underline" href={href} data-testid={`nav-${href.slice(1)}`}>{label}</a>)}
          <a className="button-primary !min-h-[39px] !px-4 !text-[11px]" href="#contato" data-testid="link-agendar-diagnostico">Agendar diagnóstico <ArrowRight size={14} /></a>
        </nav>
        <button className="mobile-menu hidden items-center justify-center rounded-md border border-slate-700 bg-slate-900/70 p-2 text-slate-100" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="absolute left-0 right-0 top-full border-b border-slate-700/70 bg-[#08111f] px-5 pb-5 pt-2 shadow-xl" aria-label="Menu móvel">
          <div className="mx-auto flex max-w-[560px] flex-col">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} className="border-b border-slate-800 py-3 text-sm text-slate-300 no-underline" data-testid={`mobile-nav-${href.slice(1)}`}>{label}</a>)}
            <a href="#contato" onClick={closeMenu} className="button-primary mt-4" data-testid="mobile-link-agendar">Agendar diagnóstico <ArrowRight size={15} /></a>
          </div>
        </nav>
      )}
    </header>
  );
}

function DashboardIllustration() {
  return (
    <div className="hero-visual rise-in rise-delay-2" aria-label="Ilustração conceitual de um painel de gestão de TI">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="dashboard">
        <div className="dash-top">
          <span className="dash-title">Central de Acompanhamento</span>
          <span className="dash-status"><i className="live-dot" /> ATIVO</span>
        </div>
        <div className="dash-summary">
          <div><strong>TI</strong><span>dispositivos em acompanhamento</span></div>
          <span className="dash-chip">VISÃO GERAL</span>
        </div>
        <div className="dash-graph" aria-label="Gráfico ilustrativo de telemetria">
          <svg viewBox="0 0 400 110" role="img" aria-label="Linha de telemetria ilustrativa">
            <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#438cff" stopOpacity=".28" /><stop offset="100%" stopColor="#438cff" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 79 C25 74 30 54 54 62 S88 89 109 67 136 58 157 64 184 39 206 46 229 72 250 56 277 29 297 39 322 56 342 37 371 43 400 18 L400 110 L0 110 Z" fill="url(#area)" />
            <path d="M0 79 C25 74 30 54 54 62 S88 89 109 67 136 58 157 64 184 39 206 46 229 72 250 56 277 29 297 39 322 56 342 37 371 43 400 18" fill="none" stroke="#5a9fff" strokeWidth="2" />
            <circle cx="297" cy="39" r="3.5" fill="#8dd7ff" />
          </svg>
        </div>
        <div className="dash-list">
          <div className="dash-row"><span><i className="device-dot" />Monitoramento preventivo</span><small>RECURSO</small><b>●</b></div>
          <div className="dash-row"><span><i className="device-dot" style={{ background: '#e9ad5d' }} />Gestão de vulnerabilidades</span><small>RECURSO</small><b>●</b></div>
          <div className="dash-row"><span><i className="device-dot" style={{ background: '#7994b7' }} />Inventário do parque</span><small>RECURSO</small><b>●</b></div>
        </div>
      </div>
      <div className="floating-note"><b>Visibilidade em um só lugar</b>Ilustração conceitual, não é captura do produto.</div>
    </div>
  );
}

function Hero() {
  return (
    <>
      <section id="home" className="hero grid-bg">
        <div className="container-wide hero-layout">
          <div>
            <div className="eyebrow rise-in"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-sky-400 align-middle" /> Plataforma autogerenciada <span className="mx-1 text-slate-600">/</span> Tecnologia Acronis®</div>
            <h1 className="rise-in rise-delay-1">Gestão e cibersegurança do seu parque <span>em uma única plataforma.</span></h1>
            <p className="hero-copy rise-in rise-delay-2">Monitore, proteja e recupere todas as estações da sua empresa com um único agente. Visibilidade total, custos previsíveis e implementação gradual.</p>
            <p className="mt-4 text-[11px] leading-6 text-slate-400">Compatível com Windows, Linux, macOS e Android. Agentes para servidores, bancos de dados e virtualizações.</p>
            <div className="hero-actions mt-7 flex flex-wrap gap-3">
              <a href="#contato" className="button-primary" data-testid="hero-link-agendar">Agendar diagnóstico gratuito <ArrowRight size={15} /></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button-quiet" data-testid="hero-link-whatsapp">Falar com especialista no WhatsApp <MessageCircle size={15} /></a>
            </div>
            <p className="mono mt-5 text-[9px] tracking-wide text-slate-500">PARA EMPRESAS DE 10 A 500 ESTAÇÕES</p>
          </div>
          <DashboardIllustration />
        </div>
      </section>
      <div className="trust-strip">
        <div className="container-wide trust-grid">
          <div className="trust-item"><Package className="trust-icon" size={18} /><span>+200 softwares de terceiros suportados</span></div>
          <div className="trust-item"><Shield className="trust-icon" size={18} /><span>4 pilares integrados de segurança</span></div>
          <div className="trust-item"><FileText className="trust-icon" size={18} /><span>Relatórios em PDF sob demanda</span></div>
          <div className="trust-item"><Check className="trust-icon" size={18} /><span>Implementação gradual, sem fidelidade de longo prazo</span></div>
        </div>
      </div>
    </>
  );
}

function Solutions() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const visibleFeatures = activeFilter === 'Todos' ? features : features.filter((feature) => feature.pillar === activeFilter);
  return (
    <section id="solucoes" className="section-pad solutions-section">
      <div className="container-wide">
        <div className="section-heading">
          <span className="eyebrow">Uma plataforma. Quatro frentes.</span>
          <h2>Controle do parque, do primeiro alerta ao recovery.</h2>
          <p>Treze recursos que trabalham juntos para simplificar a rotina de TI e dar clareza para quem decide.</p>
        </div>
        <div className="filter-row" role="group" aria-label="Filtrar funcionalidades por pilar">
          {filters.map((filter) => <button key={filter} type="button" className={`filter-button ${activeFilter === filter ? 'active' : ''}`} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)} data-testid={`filter-${filter.toLowerCase()}`}>{filter}</button>)}
        </div>
        <div className="feature-grid" aria-live="polite">
          {visibleFeatures.map(({ title, description, pillar, Icon }) => (
            <article key={title} className={`feature-card pillar-${pillar.toLowerCase()}`}>
              <span className="pillar-label">{pillar}</span>
              <span className="feature-icon"><Icon size={17} strokeWidth={1.8} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="feature-cta">
          <p><strong>Conheça os recursos no contexto do seu ambiente.</strong> Um diagnóstico ajuda a priorizar o que faz sentido para seu parque.</p>
          <a href="#contato" className="button-primary" data-testid="link-solicitar-demonstracao">Solicitar demonstração <ArrowRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}

function Differentials() {
  return (
    <section id="diferenciais" className="section-pad differentials">
      <div className="container-wide differential-layout">
        <div className="differential-intro section-heading">
          <span className="eyebrow">Controle sem complexidade</span>
          <h2>Por que a CyberTech se destaca</h2>
          <p>Uma abordagem abrangente — prevenção, proteção, suporte e recuperação — com tecnologia reconhecida mundialmente.</p>
          <a href="#processo" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-blue-300 no-underline hover:text-blue-200" data-testid="link-ver-processo">Veja como funciona <ArrowRight size={14} /></a>
        </div>
        <div>
          <div className="differential-grid">
            {differentiators.map(({ title, text, Icon }) => (
              <article className="diff-card" key={title}>
                <span className="diff-icon"><Icon size={16} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="acronis-band">
            <span className="acronis-symbol"><ShieldCheck size={21} /></span>
            <div><strong>Tecnologia Acronis®</strong><p>Baseada em um fornecedor reconhecido mundialmente em proteção de dados e endpoints, com recursos enterprise em uma experiência autogerenciada.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlIllustration() {
  return (
    <div className="control-visual" role="img" aria-label="Representação ilustrativa de indicadores de inventário e segurança">
      <div className="control-head"><span>Visão executiva do ambiente</span><small>ILUSTRAÇÃO CONCEITUAL</small></div>
      <div className="control-body">
        <div className="control-panel">
          <h4>Inventário e integridade</h4>
          <div className="health-row"><span>Inventário de hardware</span><b>ATIVO</b></div>
          <div className="health-row"><span>Visão de atualizações</span><b>PRONTA</b></div>
          <div className="health-bar"><i style={{ width: '78%' }} /></div>
          <div className="health-row"><span>Gestão de patches</span><b>ATIVA</b></div>
        </div>
        <div className="control-panel">
          <h4>Prioridades de atenção</h4>
          <div className="health-row"><span>Vulnerabilidades</span><span className="risk-tag">Revisar</span></div>
          <div className="health-row"><span>Proteção endpoint</span><span className="risk-tag safe">Ativa</span></div>
          <div className="health-row"><span>Backup</span><span className="risk-tag safe">Configurado</span></div>
        </div>
      </div>
      <div className="control-foot">DADOS E INTERFACE MERAMENTE ILUSTRATIVOS · SEM DADOS DE CLIENTES</div>
    </div>
  );
}

function Results() {
  return (
    <section id="resultados" className="section-pad results">
      <div className="container-wide relative z-[1]">
        <div className="section-heading">
          <span className="eyebrow">Visibilidade que muda a rotina</span>
          <h2>Resultados que falam por si</h2>
          <p>Visibilidade e controle que transformam a gestão do parque de TI. Recursos da plataforma em números.</p>
        </div>
        <div className="metric-grid">
          {metrics.map((metric) => <article className="metric-card" key={metric.value + metric.label}><strong className="metric-value">{metric.value}</strong><p>{metric.label}</p></article>)}
        </div>
        <div className="illustration-area">
          <div className="illustration-copy">
            <span className="eyebrow">Uma visão unificada</span>
            <h3>Da estação à visão executiva.</h3>
            <p>Acompanhe inventário, postura de proteção e pontos de atenção em uma central. Relatórios em PDF ajudam a levar a conversa de TI para a diretoria com dados claros.</p>
            <p className="note">A representação ao lado é ilustrativa e não corresponde a uma captura real do painel.</p>
          </div>
          <ControlIllustration />
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="processo" className="section-pad process-section">
      <div className="container-wide">
        <div className="section-heading">
          <span className="eyebrow">Comece pelo que importa</span>
          <h2>Como funciona</h2>
          <p>Do diagnóstico ao controle completo, em 4 etapas.</p>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <article className="step" key={step.title}>
              <span className="step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="process-cta"><p>Sem compromisso. No seu ritmo, com seu time no controle.</p><a href="#contato" className="button-primary" data-testid="link-comecar-agora">Começar agora <ArrowRight size={14} /></a></div>
      </div>
    </section>
  );
}

function validateLead(values: LeadValues): LeadErrors {
  const errors: LeadErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Informe seu nome completo.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Informe um e-mail válido.';
  if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(values.phone.trim())) errors.phone = 'Use um telefone com DDD, por exemplo (11) 98765-4321.';
  if (values.company.trim().length < 2) errors.company = 'Informe o nome da empresa.';
  if (!['1-10', '11-50', '51-200', '200+'].includes(values.stations)) errors.stations = 'Selecione a quantidade de estações.';
  if (values.message.trim().length > 500) errors.message = 'A mensagem deve ter até 500 caracteres.';
  return errors;
}

function Contact() {
  const [values, setValues] = useState<LeadValues>({ name: '', email: '', phone: '', company: '', stations: '', message: '' });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState('');
  const update = (field: keyof LeadValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (status) setStatus('');
  };
  const validateField = (field: keyof LeadValues) => {
    const fieldErrors = validateLead(values);
    setErrors((current) => ({ ...current, [field]: fieldErrors[field] }));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLead(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('Revise os campos destacados antes de continuar.');
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    const subject = `Diagnóstico CyberTech — ${values.company.trim()}`;
    const body = [
      `Nome: ${values.name.trim()}`,
      `E-mail: ${values.email.trim()}`,
      `Telefone: ${values.phone.trim()}`,
      `Empresa: ${values.company.trim()}`,
      `Estações: ${values.stations}`,
      `Mensagem: ${values.message.trim() || 'Não informada'}`,
    ].join('\n');
    setStatus('Seu aplicativo de e-mail deve abrir com a solicitação preparada. O envio só será concluído quando você enviar a mensagem por lá. Se não abrir, escreva para suporte@eratech.com.br.');
    window.location.href = `mailto:suporte@eratech.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const fieldProps = (field: keyof LeadValues) => ({
    id: field,
    name: field,
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    onBlur: () => validateField(field),
  });
  return (
    <section id="contato" className="section-pad contact-section">
      <div className="container-wide contact-layout">
        <div className="contact-copy">
          <span className="eyebrow">Conversa direta, sem compromisso</span>
          <h2>Agende um diagnóstico gratuito</h2>
          <p>Conte um pouco sobre seu ambiente. Vamos entender o cenário e mostrar por onde começar — sem compromisso e no seu ritmo.</p>
          <div className="contact-method">
            <span className="contact-method-icon"><Mail size={17} /></span>
            <div><span>Prefere falar por e-mail?</span><a href="mailto:suporte@eratech.com.br" data-testid="link-email-contato">suporte@eratech.com.br</a></div>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-method no-underline transition-colors hover:border-blue-400/60" aria-label="Falar com especialista pelo WhatsApp" data-testid="link-whatsapp-contato">
            <span className="contact-method-icon"><MessageCircle size={17} /></span>
            <div><span>Atendimento direto</span><strong className="text-xs font-semibold text-slate-100">Falar pelo WhatsApp</strong></div>
          </a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Nome completo *</label>
            <input {...fieldProps('name')} autoComplete="name" value={values.name} onChange={(event) => update('name', event.target.value)} placeholder="Como podemos chamar você?" data-testid="input-lead-name" />
            {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
          </div>
          <div className="field">
            <label htmlFor="email">E-mail corporativo *</label>
            <input {...fieldProps('email')} type="email" autoComplete="email" value={values.email} onChange={(event) => update('email', event.target.value)} placeholder="voce@empresa.com.br" data-testid="input-lead-email" />
            {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="phone">Telefone com DDD *</label>
            <input {...fieldProps('phone')} type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={(event) => update('phone', event.target.value)} placeholder="(11) 98765-4321" data-testid="input-lead-phone" />
            {errors.phone && <span id="phone-error" className="field-error">{errors.phone}</span>}
          </div>
          <div className="field">
            <label htmlFor="company">Empresa *</label>
            <input {...fieldProps('company')} autoComplete="organization" value={values.company} onChange={(event) => update('company', event.target.value)} placeholder="Nome da empresa" data-testid="input-lead-company" />
            {errors.company && <span id="company-error" className="field-error">{errors.company}</span>}
          </div>
          <div className="field full">
            <label htmlFor="stations">Quantidade de estações *</label>
            <select {...fieldProps('stations')} value={values.stations} onChange={(event) => update('stations', event.target.value)} data-testid="select-lead-stations">
              <option value="">Selecione uma faixa</option>
              <option value="1-10">1 a 10 estações</option>
              <option value="11-50">11 a 50 estações</option>
              <option value="51-200">51 a 200 estações</option>
              <option value="200+">Mais de 200 estações</option>
            </select>
            {errors.stations && <span id="stations-error" className="field-error">{errors.stations}</span>}
          </div>
          <div className="field full">
            <label htmlFor="message">O que gostaria de resolver? <span className="font-normal text-slate-500">(opcional)</span></label>
            <textarea {...fieldProps('message')} maxLength={500} value={values.message} onChange={(event) => update('message', event.target.value)} placeholder="Conte um pouco sobre seu ambiente ou desafio atual." data-testid="textarea-lead-message" />
            <span className="self-end text-[9px] text-slate-500">{values.message.length}/500</span>
            {errors.message && <span id="message-error" className="field-error">{errors.message}</span>}
          </div>
          <div className="form-bottom">
            <span className="form-note">Ao continuar, seu aplicativo de e-mail será aberto. Nenhuma solicitação é enviada automaticamente por este site.</span>
            <button type="submit" className="button-primary" data-testid="button-submit-lead">Preparar e-mail <ArrowRight size={14} /></button>
          </div>
          {status && <div className="form-status" role="status" aria-live="polite">{status}</div>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>Gestão e cibersegurança do parque de computadores em uma única plataforma autogerenciada.</p>
            <span className="status-operational"><i /> Sistemas operacionais</span>
          </div>
          <div className="footer-col"><h3>Produto</h3><a href="#solucoes">Soluções</a><a href="#diferenciais">Diferenciais</a><a href="#processo">Processo</a></div>
          <div className="footer-col"><h3>Eratech</h3><a href="#home">Sobre a CyberTech</a><a href="#contato">Contato</a></div>
          <div className="footer-col"><h3>Fale com a gente</h3><a href="mailto:suporte@eratech.com.br" data-testid="footer-link-email">suporte@eratech.com.br</a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-link-whatsapp">WhatsApp</a></div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Eratech. Todos os direitos reservados. CyberTech é uma solução Eratech.</span>
          <span>Uma plataforma de gestão e cibersegurança.</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Falar com a CyberTech pelo WhatsApp"
      data-testid="floating-whatsapp"
    >
      <SiWhatsapp size={28} aria-hidden="true" />
    </a>
  );
}

function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertiaExponent: 1.7,
      anchors: { offset: -88 },
      respectReducedMotion: true,
    });

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const title = 'CyberTech — Gestão e cibersegurança do parque de computadores';
    const description = 'Plataforma autogerenciada que unifica monitoramento, inventário, EDR, patches, vulnerabilidades e backup em nuvem. Tecnologia Acronis®.';
    document.title = title;
    const setMeta = (selector: string, key: string, value: string, property = false) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(property ? 'property' : 'name', key);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    setMeta('meta[name="description"]', 'description', description);
    setMeta('meta[property="og:title"]', 'og:title', title, true);
    setMeta('meta[property="og:description"]', 'og:description', 'Visibilidade total e controle do seu parque de TI em uma única plataforma.', true);
    setMeta('meta[property="og:type"]', 'og:type', 'website', true);
    setMeta('meta[property="og:locale"]', 'og:locale', 'pt_BR', true);
    let structuredData = document.getElementById('cybertech-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'cybertech-structured-data';
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify([
      { '@context': 'https://schema.org', '@type': 'Organization', name: 'Eratech', email: 'suporte@eratech.com.br' },
      { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'CyberTech', applicationCategory: 'BusinessApplication', description },
    ]);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Solutions />
        <Differentials />
        <Results />
        <Process />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
