export default function DashboardPage() {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "var(--font-outfit, sans-serif)",
        color: "var(--c-secondary)",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          marginBottom: "0.5rem",
        }}
      >
        Tableau de bord
      </h1>
      <p style={{ color: "var(--c-muted)", fontSize: "0.875rem" }}>
        Bienvenue. Les fonctionnalités seront disponibles une fois l&apos;authentification configurée.
      </p>
    </div>
  );
}
