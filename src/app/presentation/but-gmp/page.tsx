




'use client';

import { C } from "@/lib/forge";

function ButGmpPage() {
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
                    }}>Buts GMP</h1>
                    <p style={{
                        fontSize: "1.125rem",
                        color: C.muted,
                        maxWidth: "42rem",
                        margin: "0 auto",
                        fontFamily: "var(--font-outfit, sans-serif)"
                    }}>
                        Les objectifs de formation du BUT Génie Mécanique et Productique
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
                        }}>🎯 Objectif principal</h2>
                        <p style={{
                            color: C.secondary,
                            marginBottom: "1rem",
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            Former des techniciens supérieurs capables de concevoir, réaliser et optimiser des systèmes mécaniques et de production industrielle.
                        </p>
                        <div style={{
                            background: C.primary + "20",
                            padding: "1rem",
                            borderRadius: "0.5rem"
                        }}>
                            <p style={{
                                fontSize: "0.875rem",
                                color: C.primary,
                                fontFamily: "var(--font-outfit, sans-serif)"
                            }}>
                                <strong>Diplôme :</strong> Bachelor Universitaire de Technologie - niveau 6 (Bac+3)
                            </p>
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
                        }}>💼 Compétences visées</h2>
                        <ul style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Concevoir des systèmes mécaniques</li>
                            <li>• Gérer la production industrielle</li>
                            <li>• Assurer la qualité et la maintenance</li>
                            <li>• Maîtriser les outils numériques</li>
                            <li>• Travailler en équipe projet</li>
                        </ul>
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
                    }}>Les 4 piliers de la formation</h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1.5rem"
                    }}>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <div style={{
                                width: "4rem",
                                height: "4rem",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 0.75rem",
                                fontSize: "1.5rem"
                            }}>⚙️</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Mécanique</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Conception et calcul</p>
                        </div>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <div style={{
                                width: "4rem",
                                height: "4rem",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 0.75rem",
                                fontSize: "1.5rem"
                            }}>🏭</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Production</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Industrialisation</p>
                        </div>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <div style={{
                                width: "4rem",
                                height: "4rem",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 0.75rem",
                                fontSize: "1.5rem"
                            }}>🔧</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Maintenance</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Fiabilité système</p>
                        </div>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <div style={{
                                width: "4rem",
                                height: "4rem",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 0.75rem",
                                fontSize: "1.5rem"
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
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Métiers visés</h3>
                        <ul style={{
                            fontSize: "0.875rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Technicien méthodes</li>
                            <li>• Ingénieur d'affaires</li>
                            <li>• Chef de projet industriel</li>
                            <li>• Responsable qualité</li>
                        </ul>
                    </div>

                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`,
                        textAlign: "center"
                    }}>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Secteurs d'activité</h3>
                        <ul style={{
                            fontSize: "0.875rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Automobile</li>
                            <li>• Aéronautique</li>
                            <li>• Énergie</li>
                            <li>• Agroalimentaire</li>
                        </ul>
                    </div>

                    <div style={{
                        background: C.bg,
                        padding: "1.5rem",
                        borderRadius: "0.5rem",
                        border: `2px solid ${C.primary}`,
                        boxShadow: `4px 4px 0 ${C.accent}`,
                        textAlign: "center"
                    }}>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Poursuite d'études</h3>
                        <ul style={{
                            fontSize: "0.875rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Masters industriels</li>
                            <li>• Écoles d'ingénieurs</li>
                            <li>• MBA spécialisés</li>
                            <li>• Doctorat</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ButGmpPage;