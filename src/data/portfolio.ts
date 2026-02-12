export type TechItem = {
  name: string;
  logo: string;
};

export type SkillBlock = {
  title: string;
  items: string[];
};

export type TimelineItem = {
  title: string;
  period: string;
  place?: string;
  details: string[];
};

export type DevOpsItem = {
  name: string;
  logo: string;
  description: string;
};

export const developmentStack: TechItem[] = [
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  },
  {
    name: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
  },
  {
    name: "C",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
  },
  {
    name: "C++",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/cplusplus.svg"
  },
  {
    name: "Angular",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg"
  },
  {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
  }
];

export const infraSkills: SkillBlock[] = [
  {
    title: "Supervision & virtualisation",
    items: ["VMware", "Supervision de production"]
  },
  {
    title: "Systèmes & administration",
    items: [
      "Windows Server",
      "Active Directory (gestion utilisateurs)",
      "Gestion des sauvegardes (bandes magnétiques)",
      "Veeam"
    ]
  },
  {
    title: "Sécurité",
    items: [
      "NAC via ClearPass",
      "Analyse réseau (Wireshark / Nmap)",
      "Attaques MITM (Kali Linux)",
      "Notions de cryptographie et certificats SSL/TLS"
    ]
  },
  {
    title: "Réseau",
    items: ["Adressage IP", "Protocoles TCP/IP", "DHCP", "DNS", "VLAN"]
  }
];

export const education: TimelineItem[] = [
  {
    title: "Baccalauréat Général Section Européenne",
    period: "2020 - 2023",
    place: "Lycée Edgar Faure, Morteau",
    details: [
      "Mention Assez Bien",
      "Spécialités Physique Chimie / Sciences de l’ingénieur"
    ]
  },
  {
    title: "Bachelor Universitaire de Technologie Informatique",
    period: "2023 - 2026",
    place: "Université de Bourgogne",
    details: ["Troisième année en cours à l’IUT de Dijon"]
  }
];

export const experience: TimelineItem[] = [
  {
    title: "Stage de deuxième année - LISI AEROSPACE",
    period: "Jan 2025 - Mar 2025",
    details: [
      "Mise en place d’un outil de supervision des machines de production",
      "Sécurisation du NAC via le logiciel ClearPass",
      "Maintenance des serveurs",
      "Connexion des machines de production au réseau interne via boitiers MOXA et EWON"
    ]
  }
];

export const devopsStack: DevOpsItem[] = [
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    description: "Containerisation et portabilité des applications"
  },
  {
    name: "GitLab",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    description: "Gestion de code et pipelines CI/CD"
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    description: "Versioning, workflow collaboratif et traçabilité"
  },
  {
    name: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    description: "Administration système et scripts d’exploitation"
  },
  {
    name: "Portainer",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/portainer/portainer-original.svg",
    description: "Gestion visuelle des environnements conteneurisés"
  }
];
