import DashboardNav from "@/components/dashboard-nav";
import MotionRibbon from "@/components/motion-ribbon";
import { infraSkills } from "@/data/portfolio";
import Image from "next/image";

type ItemVisual = {
  logo?: string;
  fallback?: string;
};

const infraItemVisuals: Record<string, ItemVisual> = {
  VMware: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/vmware.svg"
  },
  "Supervision de production": { fallback: "MON" },
  "Windows Server": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg"
  },
  "Active Directory (gestion utilisateurs)": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"
  },
  "Gestion des sauvegardes (bandes magnétiques)": { fallback: "BKP" },
  Veeam: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/veeam.svg"
  },
  "NAC via ClearPass": { fallback: "NAC" },
  "Analyse réseau (Wireshark / Nmap)": {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/wireshark.svg"
  },
  "Attaques MITM (Kali Linux)": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kalilinux/kalilinux-original.svg"
  },
  "Notions de cryptographie et certificats SSL/TLS": { fallback: "TLS" },
  "Adressage IP": { fallback: "IP" },
  "Protocoles TCP/IP": { fallback: "TCP" },
  DHCP: { fallback: "DHCP" },
  DNS: { fallback: "DNS" },
  VLAN: { fallback: "VLAN" }
};

export default function InfrastructurePage() {
  return (
    <main className="page-shell">
      <DashboardNav />

      <header className="section-hero">
        <p className="eyebrow">Infrastructure</p>
        <h1>Infrastructure, Réseau & Sécurité</h1>
        <p>
          Vision globale des compétences techniques, du parcours de formation et des expériences.
        </p>
      </header>

      <MotionRibbon
        label=""
        items={[
          "Supervision",
          "Windows Server",
          "Active Directory",
          "NAC ClearPass",
          "Analyse Réseau",
          "TCP/IP",
          "DHCP / DNS / VLAN",
          "Cryptographie SSL/TLS"
        ]}
      />

      <section className="stats-grid stats-grid-compact" aria-label="Résumé infrastructure">
        <article className="stat-card">
          <p className="stat-label">Domaines</p>
          <p className="stat-value">{infraSkills.length}</p>
          <p className="stat-hint">Supervision, systèmes, sécurité, réseau</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Axes techniques</p>
          <p className="stat-value">4</p>
          <p className="stat-hint">Production, administration, sécurité, réseau</p>
        </article>
      </section>

      <section className="cards-grid">
        {infraSkills.map((block) => (
          <article key={block.title} className="content-card">
            <h2>{block.title}</h2>
            <ul className="infra-items-list">
              {block.items.map((item) => (
                <li key={item} className="infra-item">
                  <span className="infra-item-icon" aria-hidden="true">
                    {infraItemVisuals[item]?.logo ? (
                      <Image
                        src={infraItemVisuals[item].logo as string}
                        alt=""
                        width={22}
                        height={22}
                        unoptimized
                      />
                    ) : (
                      <span className="infra-item-fallback">
                        {infraItemVisuals[item]?.fallback ?? "IT"}
                      </span>
                    )}
                  </span>
                  <span>{item.replace(/\s*\([^)]*\)/g, "")}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
