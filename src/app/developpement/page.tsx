import DashboardNav from "@/components/dashboard-nav";
import MotionRibbon from "@/components/motion-ribbon";
import { developmentStack } from "@/data/portfolio";
import Image from "next/image";

export default function DeveloppementPage() {
  return (
    <main className="page-shell">
      <DashboardNav />

      <header className="section-hero">
        <p className="eyebrow">Développement</p>
        <h1>Stack Technique</h1>
        <p>
          Technologies utilisées pour le développement frontend, backend et base de données.
        </p>
      </header>

      <MotionRibbon label="" items={developmentStack.map((tech) => tech.name)} />

      <section className="stats-grid stats-grid-compact" aria-label="Résumé développement">
        <article className="stat-card">
          <p className="stat-label">Total technos</p>
          <p className="stat-value">{developmentStack.length}</p>
          <p className="stat-hint">Compétences listées</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Cible</p>
          <p className="stat-value">Web</p>
          <p className="stat-hint">Applications modernes</p>
        </article>
      </section>

      <section className="logo-grid">
        {developmentStack.map((tech) => (
          <article key={tech.name} className="logo-card">
            <Image
              src={tech.logo}
              alt={`Logo ${tech.name}`}
              width={48}
              height={48}
              unoptimized
            />
            <p>{tech.name}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
