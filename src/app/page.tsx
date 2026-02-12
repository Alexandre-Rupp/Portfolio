import DashboardNav from "@/components/dashboard-nav";
import MotionRibbon from "@/components/motion-ribbon";
import PortfolioDecryptedTitle from "@/components/portfolio-decrypted-title";
import {
  developmentStack,
  devopsStack,
  education,
  experience,
  infraSkills
} from "@/data/portfolio";
import Link from "next/link";

function SecurityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="menu-card-icon-svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2l7 3v6c0 5-2.8 8.7-7 11-4.2-2.3-7-6-7-11V5l7-3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.9 15.5c.9-1.1 1.9-1.6 3.1-1.6s2.2.5 3.1 1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.2 9.8c.8-.7 1.6-1 2.5-1M15.8 9.8c-.8-.7-1.6-1-2.5-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DevOpsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="menu-card-icon-svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7.2 7.5H4.5V4.8M16.8 16.5h2.7v2.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 7.5a7.5 7.5 0 0 1 13-4.9M19.5 16.5a7.5 7.5 0 0 1-13 4.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 8.7l4 3.3-4 3.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 8.7l-4 3.3 4 3.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const menuCards = [
  {
    id: "01",
    title: "Développement",
    description: "Langages, frameworks et outils pour concevoir des applications.",
    href: "/developpement",
    icon: "</>",
    tone: "dev",
    highlights: ["Frontend", "Backend", "Base de données"]
  },
  {
    id: "02",
    title: "Infrastructure, Réseau & Sécurité",
    description: "Administration, supervision, réseau et cybersécurité.",
    href: "/infrastructure",
    icon: "security",
    tone: "infra",
    highlights: ["Production", "Administration", "Cybersécurité"]
  },
  {
    id: "03",
    title: "DevOps",
    description: "CI/CD, conteneurisation et automatisation des workflows.",
    href: "/devops",
    icon: "devops",
    tone: "ops",
    highlights: ["CI/CD", "Conteneurs", "Automatisation"]
  }
];

const stats = [
  { label: "Pages", value: "4", hint: "Menu + 3 spécialités" },
  { label: "Technos Dev", value: `${developmentStack.length}`, hint: "Langages et frameworks" },
  { label: "Domaines Infra", value: `${infraSkills.length}`, hint: "Systèmes, réseau, sécurité" },
  { label: "Outils DevOps", value: `${devopsStack.length}`, hint: "Industrialisation" },
  { label: "Formations", value: `${education.length}`, hint: "Parcours académique" },
  { label: "Expériences", value: `${experience.length}`, hint: "Missions professionnelles" }
];

const liveItems = [
  "Dashboard interactif",
  "Expérience fluide",
  "Infrastructure & Sécurité",
  "Développement Web",
  "DevOps & CI/CD",
  "Organisation professionnelle",
  "Clarté visuelle",
  "Parcours technique"
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <DashboardNav />

      <header className="hero-panel">
        <h1><PortfolioDecryptedTitle /></h1>
        <p className="hero-copy">
          Interface de navigation rapide pour accéder à chaque domaine de compétences.
        </p>
      </header>

      <MotionRibbon label="" items={liveItems} />

      <section className="stats-grid" aria-label="Indicateurs du portfolio">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-hint">{stat.hint}</p>
          </article>
        ))}
      </section>

      <section className="menu-grid" aria-label="Navigation principale">
        {menuCards.map((card) => (
          <Link key={card.id} href={card.href} className="menu-card" data-tone={card.tone}>
            <div className="menu-card-top">
              <span className="menu-card-id">Section {card.id}</span>
              <span className="menu-card-icon" aria-hidden="true">
                {card.icon === "security" ? <SecurityIcon /> : null}
                {card.icon === "devops" ? <DevOpsIcon /> : null}
                {card.icon !== "security" && card.icon !== "devops" ? card.icon : null}
              </span>
            </div>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <ul className="menu-card-highlights" aria-label={`Points clés ${card.title}`}>
              {card.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Link>
        ))}
      </section>

      <section className="section-hero" aria-label="Parcours">
        <p className="eyebrow">Parcours</p>
        <h1>Éducation & Expérience Professionnelle</h1>
        <p>
          Détails du cursus, des missions réalisées, du projet informatique et du centre
          d’intérêt.
        </p>
      </section>

      <section className="two-col-grid" aria-label="Éducation et expérience professionnelle">
        <article className="content-card">
          <h2>Éducation</h2>
          <div className="timeline-stack">
            {education.map((entry) => (
              <div key={entry.title} className="timeline-entry">
                <p className="meta">{entry.period}</p>
                <p className="strong">{entry.title}</p>
                {entry.place ? <p className="muted">{entry.place}</p> : null}
                <ul className="timeline-list">
                  {entry.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className="content-card">
          <h2>Expérience Professionnelle</h2>
          <div className="timeline-stack">
            {experience.map((entry) => (
              <div key={entry.title} className="timeline-entry">
                <p className="meta">{entry.period}</p>
                <p className="strong">{entry.title}</p>
                <ul className="timeline-list">
                  {entry.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="two-col-grid" aria-label="Projet informatique et centre d’intérêt">
        <article className="content-card">
          <h2>Projet Informatique</h2>
          <p className="muted">
            Création d’un Windows server avec partage de fichiers, serveur Git, hébergement
            Apache et accès à une base MySQL via PHPMyAdmin.
          </p>
        </article>

        <article className="content-card">
          <h2>Centre d’intérêt</h2>
          <p className="muted">
            Sport automobile - Commissaire de piste FIA grade International.
          </p>
        </article>
      </section>
    </main>
  );
}
