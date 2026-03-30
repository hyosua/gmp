





'use client';

import { C } from "@/lib/forge";

function LieuPage() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "3rem 1rem",
            background: C.bg,
            color: C.secondary
        }}>
            <div style={{
                maxWidth: "1280px",
                width: "100%"
            }}>
                <div style={{
                    textAlign: "center",
                    marginBottom: "3rem"
                }}>
                    <h1 style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        marginBottom: "1.5rem",
                        color: C.secondary,
                        fontFamily: "var(--font-outfit, sans-serif)"
                    }}>Lieux</h1>
                    <p style={{
                        fontSize: "1.125rem",
                        color: C.muted,
                        maxWidth: "42rem",
                        margin: "0 auto",
                        fontFamily: "var(--font-outfit, sans-serif)"
                    }}>
                        Découvrez les installations modernes de l'IUT d'Évry pour votre formation GMP
                    </p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: "2rem",
                    marginBottom: "3rem"
                }}>
                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`
                    }}>
                        <h2 style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <span style={{ fontSize: "1.875rem", marginRight: "0.75rem" }}>🏫</span>
                            Campus d'Évry
                        </h2>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <p><strong>Adresse :</strong> 25 cours Monseigneur Romero, 91000 Évry-Courcouronnes</p>
                            <p><strong>Accès :</strong> RER D station Évry-Courcouronnes (15 min de Paris)</p>
                            <p><strong>Environnement :</strong> Campus universitaire moderne en plein cœur de la ville nouvelle d'Évry</p>
                        </div>
                    </div>

                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`
                    }}>
                        <h2 style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <span style={{ fontSize: "1.875rem", marginRight: "0.75rem" }}>🔧</span>
                            Ateliers techniques
                        </h2>
                        <ul style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Atelier d'usinage CNC</li>
                            <li>• Laboratoire de métrologie</li>
                            <li>• Salle d'automatisme industriel</li>
                            <li>• Atelier de prototypage rapide</li>
                            <li>• Laboratoire de mécanique des fluides</li>
                        </ul>
                    </div>

                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`
                    }}>
                        <h2 style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <span style={{ fontSize: "1.875rem", marginRight: "0.75rem" }}>📚</span>
                            Espaces d'étude
                        </h2>
                        <ul style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Salles de cours équipées</li>
                            <li>• Bibliothèque universitaire</li>
                            <li>• Salles informatiques</li>
                            <li>• Espaces de travail collaboratif</li>
                            <li>• Cafétéria étudiante</li>
                        </ul>
                    </div>

                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`
                    }}>
                        <h2 style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <span style={{ fontSize: "1.875rem", marginRight: "0.75rem" }}>🏃‍♂️</span>
                            Vie étudiante
                        </h2>
                        <ul style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Gymnase et terrains de sport</li>
                            <li>• Associations étudiantes</li>
                            <li>• Restaurant universitaire</li>
                            <li>• Résidences étudiantes à proximité</li>
                            <li>• Centre commercial Grand Évry</li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`,
                    color: C.bg,
                    padding: "2rem",
                    borderRadius: "0.5rem",
                    textAlign: "center",
                    fontFamily: "var(--font-outfit, sans-serif)"
                }}>
                    <h3 style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "1rem"
                    }}>Un campus connecté</h3>
                    <p style={{
                        fontSize: "1.125rem",
                        marginBottom: "1rem"
                    }}>
                        Situé à 30 minutes de Paris, l'IUT d'Évry bénéficie d'une excellente accessibilité
                    </p>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1rem",
                        fontSize: "0.875rem"
                    }}>
                        <div>
                            <strong>🚇 Transport</strong><br />
                            RER D, Bus, Parking gratuit
                        </div>
                        <div>
                            <strong>🏪 Commerces</strong><br />
                            Tous les services à proximité
                        </div>
                        <div>
                            <strong>🌳 Environnement</strong><br />
                            Campus verdoyant et moderne
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LieuPage;