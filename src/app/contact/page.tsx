import DashboardNav from "@/components/dashboard-nav";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="page-shell">
      <DashboardNav />

      <header className="section-hero">
        <p className="eyebrow">Contact</p>
        <h1>Entrer En Contact</h1>
        <p>
          Disponible pour échanger autour de projets, alternances et opportunités en
          infrastructure, réseau, sécurité et développement.
        </p>
      </header>

      <section className="contact-grid" aria-label="Informations de contact">
        <article className="content-card contact-photo-card">
          <Image
            src="/alexandre-rupp.png"
            alt="Photo de Alexandre Rupp"
            width={420}
            height={630}
            className="contact-photo"
            priority
          />
        </article>

        <article className="content-card contact-info-card">
          <h2>Coordonnées</h2>
          <p className="muted">
            N&apos;hésitez pas à me contacter par e-mail ou via LinkedIn.
          </p>

          <div className="contact-actions">
            <a className="contact-action" href="mailto:rupp.alexandre.school@gmail.com">
              rupp.alexandre.school@gmail.com
            </a>
            <a
              className="contact-action"
              href="https://www.linkedin.com/in/alexandre-rupp/"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/alexandre-rupp
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
