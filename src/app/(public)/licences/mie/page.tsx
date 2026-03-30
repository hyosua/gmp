'use client';

import { C } from "@/lib/forge";

function MIEPage() {
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
                    }}>Licence MIE</h1>
                    <p style={{
                        fontSize: "1.125rem",
                        color: C.muted,
                        maxWidth: "42rem",
                        margin: "0 auto",
                        fontFamily: "var(--font-outfit, sans-serif)"
                    }}>
                        Maintenance Industrielle et Équipements - Formation professionnelle spécialisée
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
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>🎯 Objectifs de la formation</h2>
                        <ul style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Acquérir des compétences en maintenance préventive et curative</li>
                            <li>• Maîtriser les technologies de maintenance industrielle</li>
                            <li>• Gérer les équipements et installations industrielles</li>
                            <li>• Assurer la continuité de production</li>
                            <li>• Respecter les normes de sécurité et environnementales</li>
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
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>📚 Programme d'études</h2>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <div>
                                <h4 style={{ fontWeight: "600", color: C.primary }}>Semestre 1 : Bases techniques</h4>
                                <p style={{ fontSize: "0.875rem", color: C.muted }}>Électrotechnique, mécanique, automatisme</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: "600", color: C.primary }}>Semestre 2 : Maintenance spécialisée</h4>
                                <p style={{ fontSize: "0.875rem", color: C.muted }}>Diagnostic, réparation, prévention</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: "600", color: C.primary }}>Stage professionnel</h4>
                                <p style={{ fontSize: "0.875rem", color: C.muted }}>4 mois en entreprise</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`,
                    color: C.bg,
                    padding: "2rem",
                    borderRadius: "0.5rem",
                    marginBottom: "2rem",
                    fontFamily: "var(--font-outfit, sans-serif)"
                }}>
                    <h3 style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "1.5rem",
                        textAlign: "center"
                    }}>Compétences développées</h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1.5rem"
                    }}>
                        <div style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            textAlign: "center"
                        }}>
                            <div style={{
                                fontSize: "2rem",
                                marginBottom: "0.5rem"
                            }}>🔧</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Maintenance</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Préventive et curative</p>
                        </div>
                        <div style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            textAlign: "center"
                        }}>
                            <div style={{
                                fontSize: "2rem",
                                marginBottom: "0.5rem"
                            }}>⚡</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Électrotechnique</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Équipements électriques</p>
                        </div>
                        <div style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            textAlign: "center"
                        }}>
                            <div style={{
                                fontSize: "2rem",
                                marginBottom: "0.5rem"
                            }}>🤖</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Automatisme</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Systèmes automatisés</p>
                        </div>
                        <div style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            textAlign: "center"
                        }}>
                            <div style={{
                                fontSize: "2rem",
                                marginBottom: "0.5rem"
                            }}>📊</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Qualité</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Management QSE</p>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "1.5rem"
                }}>
                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`
                    }}>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>💼 Débouchés professionnels</h3>
                        <ul style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Technicien(ne) de maintenance industrielle</li>
                            <li>• Responsable de maintenance</li>
                            <li>• Technicien(ne) méthodes maintenance</li>
                            <li>• Chargé(e) d'exploitation industrielle</li>
                            <li>• Technicien(ne) en équipements industriels</li>
                        </ul>
                    </div>

                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`
                    }}>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>🏢 Secteurs d'activité</h3>
                        <ul style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Industrie manufacturière</li>
                            <li>• Énergie et utilities</li>
                            <li>• Agroalimentaire</li>
                            <li>• Chimie et pétrochimie</li>
                            <li>• Transport et logistique</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MIEPage;