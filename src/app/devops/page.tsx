import DashboardNav from "@/components/dashboard-nav";
import MotionRibbon from "@/components/motion-ribbon";
import { devopsStack } from "@/data/portfolio";
import Image from "next/image";

export default function DevOpsPage() {
  return (
    <main className="page-shell">
      <DashboardNav />

      <header className="section-hero">
        <p className="eyebrow">DevOps</p>
        <h1>Industrialisation et CI/CD</h1>
        <p>
          Outils orientés automatisation, versioning, containerisation et déploiement.
        </p>
      </header>

      <MotionRibbon
        label=""
        items={[
          ...devopsStack.map((tool) => tool.name),
          "Build",
          "Test",
          "Release",
          "Deploy",
          "Monitor"
        ]}
      />

      <section className="stats-grid stats-grid-compact" aria-label="Résumé DevOps">
        <article className="stat-card">
          <p className="stat-label">Outils</p>
          <p className="stat-value">{devopsStack.length}</p>
          <p className="stat-hint">Technologies DevOps</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Pipeline</p>
          <p className="stat-value">5</p>
          <p className="stat-hint">Étapes clés</p>
        </article>
      </section>

      <section className="devops-grid">
        {devopsStack.map((tool) => (
          <article key={tool.name} className="devops-card">
            <Image
              src={tool.logo}
              alt={`Logo ${tool.name}`}
              width={48}
              height={48}
              unoptimized
            />
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
          </article>
        ))}
      </section>

      <section className="pipeline-strip" aria-label="Pipeline DevOps">
        <div>Build</div>
        <div>Test</div>
        <div>Release</div>
        <div>Deploy</div>
        <div>Monitor</div>
      </section>
    </main>
  );
}
