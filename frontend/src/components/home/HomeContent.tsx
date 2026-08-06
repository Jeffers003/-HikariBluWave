interface HomeContentProps {
  children: React.ReactNode;
}

export default function HomeContent({ children }: HomeContentProps) {
  return (
    <section>
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-75" />

      {/* Conteúdo */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
