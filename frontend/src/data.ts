export interface Project {
  id: number;
  title: string;
  description: string;
  technology: string[];
  link: string;
  github: string;
  image: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Portfolio v1",
    description: "Trang web cá nhân đầu tiên giới thiệu về các kỹ năng và dự án đã thực hiện.",
    technology: ["React", "TypeScript", "Vite", "Vanilla CSS"],
    link: "https://example.com",
    github: "https://github.com",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "E-Commerce App",
    description: "Ứng dụng bán hàng trực tuyến với giỏ hàng và thanh toán trực tiếp.",
    technology: ["React", "Spring Boot", "PostgreSQL"],
    link: "https://example.com",
    github: "https://github.com",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1470&auto=format&fit=crop"
  }
];

export const SKILLS: Skill[] = [
  { name: "React", icon: "Code2" },
  { name: "TypeScript", icon: "FileCode" },
  { name: "Spring Boot", icon: "Coffee" },
  { name: "PostgreSQL", icon: "Database" },
  { name: "Docker", icon: "HardDrive" },
  { name: "Framer Motion", icon: "Zap" }
];

export const INFO = {
  name: "Trần Đức Long",
  role: "Fullstack Developer",
  bio: "Đam mê xây dựng các sản phẩm công nghệ chất lượng cao, từ giao diện người dùng mượt mà đến hệ thống backend ổn định.",
  email: "tranduclong@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  facebook: "https://facebook.com/longtran.530215"
};
