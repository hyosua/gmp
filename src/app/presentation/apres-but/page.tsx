







'use client';

import { C } from "@/lib/forge";

function ApresButPage() {
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
                    }}>Après le BUT</h1>
                    <p style={{
                        fontSize: "1.125rem",
                        color: C.muted,
                        maxWidth: "42rem",
                        margin: "0 auto",
                        fontFamily: "var(--font-outfit, sans-serif)"
                    }}>
                        Les perspectives professionnelles et de poursuite d'études après l'obtention du BUT GMP
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
                        }}>💼 Insertion professionnelle</h2>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem"
                        }}>
                            <div style={{
                                background: C.secondary + "20",
                                padding: "1rem",
                                borderRadius: "0.5rem"
                            }}>
                                <p style={{
                                    color: C.secondary,
                                    fontWeight: "600",
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>Taux d'insertion : 95%</p>
                                <p style={{
                                    fontSize: "0.875rem",
                                    color: C.secondary,
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>dans les 6 mois suivant l'obtention du diplôme</p>
                            </div>
                            <ul style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                                color: C.secondary,
                                fontFamily: "var(--font-outfit, sans-serif)"
                            }}>
                                <li>• Technicien(ne) méthodes</li>
                                <li>• Technicien(ne) industrialisation</li>
                                <li>• Responsable qualité</li>
                                <li>• Chef de projet technique</li>
                                <li>• Technicien(ne) maintenance</li>
                            </ul>
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
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>📈 Évolution de carrière</h2>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem"
                        }}>
                            <div style={{
                                borderLeft: `4px solid ${C.primary}`,
                                paddingLeft: "1rem"
                            }}>
                                <h4 style={{
                                    fontWeight: "600",
                                    color: C.primary,
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>Après 2-3 ans d'expérience</h4>
                                <p style={{
                                    fontSize: "0.875rem",
                                    color: C.muted,
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>Responsable méthodes, Chef d'équipe</p>
                            </div>
                            <div style={{
                                borderLeft: `4px solid ${C.primary}`,
                                paddingLeft: "1rem"
                            }}>
                                <h4 style={{
                                    fontWeight: "600",
                                    color: C.primary,
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>Après 5 ans</h4>
                                <p style={{
                                    fontSize: "0.875rem",
                                    color: C.muted,
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>Ingénieur d'affaires, Manager industriel</p>
                            </div>
                            <div style={{
                                borderLeft: `4px solid ${C.primary}`,
                                paddingLeft: "1rem"
                            }}>
                                <h4 style={{
                                    fontWeight: "600",
                                    color: C.primary,
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>Après 8-10 ans</h4>
                                <p style={{
                                    fontSize: "0.875rem",
                                    color: C.muted,
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>Directeur technique, Consultant</p>
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
                    }}>Poursuite d'études</h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1.5rem"
                    }}>
                        <div style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            padding: "1rem",
                            borderRadius: "0.5rem"
                        }}>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>🎓 Masters professionnels</h4>
                            <ul style={{
                                fontSize: "0.875rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem"
                            }}>
                                <li>• Master Productique</li>
                                <li>• Master Qualité</li>
                                <li>• Master Maintenance</li>
                                <li>• Master Management Industriel</li>
                            </ul>
                        </div>
                        <div style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            padding: "1rem",
                            borderRadius: "0.5rem"
                        }}>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>🏫 Écoles d'ingénieurs</h4>
                            <ul style={{
                                fontSize: "0.875rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem"
                            }}>
                                <li>• Arts et Métiers</li>
                                <li>• CentraleSupélec</li>
                                <li>• INSA</li>
                                <li>• Écoles spécialisées</li>
                            </ul>
                        </div>
                        <div style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            padding: "1rem",
                            borderRadius: "0.5rem"
                        }}>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>💼 MBA et formations</h4>
                            <ul style={{
                                fontSize: "0.875rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem"
                            }}>
                                <li>• MBA Management Industriel</li>
                                <li>• Executive MBA</li>
                                <li>• Formations continues</li>
                                <li>• VAE (Validation Acquis)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.5rem"
                }}>
                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`,
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "4rem",
                            height: "4rem",
                            background: C.primary,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1rem",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: C.bg
                        }}>€</div>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Salaire</h3>
                        <div style={{
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <p style={{ fontWeight: "600" }}>Débutant : 28-32k€</p>
                            <p style={{ fontSize: "0.875rem" }}>Après 3 ans : 35-45k€</p>
                            <p style={{ fontSize: "0.875rem" }}>Après 5 ans : 45-60k€</p>
                        </div>
                    </div>

                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`,
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "4rem",
                            height: "4rem",
                            background: C.primary,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1rem",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: C.bg
                        }}>📍</div>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Mobilité</h3>
                        <div style={{
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <p style={{ fontWeight: "600" }}>France entière</p>
                            <p style={{ fontSize: "0.875rem" }}>Europe et international</p>
                            <p style={{ fontSize: "0.875rem" }}>Tous secteurs industriels</p>
                        </div>
                    </div>

                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`,
                        textAlign: "center"
                    }}>
                        <div style={{
                            width: "4rem",
                            height: "4rem",
                            background: C.primary,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1rem",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: C.bg
                        }}>🚀</div>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Évolution</h3>
                        <div style={{
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <p style={{ fontWeight: "600" }}>Création d'entreprise</p>
                            <p style={{ fontSize: "0.875rem" }}>Conseil et expertise</p>
                            <p style={{ fontSize: "0.875rem" }}>Management d'équipe</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApresButPage;