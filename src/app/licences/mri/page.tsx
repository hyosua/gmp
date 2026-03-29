'use client';

import { C } from "@/lib/forge";

function MRIPage() {
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
                    }}>Licence MRI</h1>
                    <p style={{
                        fontSize: "1.125rem",
                        color: C.muted,
                        maxWidth: "42rem",
                        margin: "0 auto",
                        fontFamily: "var(--font-outfit, sans-serif)"
                    }}>
                        Maintenance et Réparation Industrielle - Expertise en réparation et rénovation
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
                            <li>• Maîtriser les techniques de réparation industrielle</li>
                            <li>• Acquérir des compétences en rénovation d'équipements</li>
                            <li>• Gérer les processus de remise en état</li>
                            <li>• Optimiser les coûts de maintenance et réparation</li>
                            <li>• Assurer la conformité et la sécurité des équipements</li>
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
                                <h4 style={{ fontWeight: "600", color: C.primary }}>Semestre 1 : Techniques de réparation</h4>
                                <p style={{ fontSize: "0.875rem", color: C.muted }}>Soudage, usinage, traitement de surface</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: "600", color: C.primary }}>Semestre 2 : Gestion de projet</h4>
                                <p style={{ fontSize: "0.875rem", color: C.muted }}>Planification, budgétisation, qualité</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: "600", color: C.primary }}>Stage professionnel</h4>
                                <p style={{ fontSize: "0.875rem", color: C.muted }}>4 mois en entreprise de réparation</p>
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
                            }}>🔩</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Réparation</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Techniques avancées</p>
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
                            }}>🔄</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Rénovation</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Remise en état</p>
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
                            }}>💰</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Économie</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Gestion des coûts</p>
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
                            }}>📋</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Qualité</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Contrôle et conformité</p>
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
                            <li>• Technicien(ne) de réparation industrielle</li>
                            <li>• Responsable d'atelier de réparation</li>
                            <li>• Technicien(ne) rénovation équipements</li>
                            <li>• Chargé(e) d'affaires maintenance</li>
                            <li>• Expert(e) en remise en état</li>
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
                            <li>• Industrie lourde</li>
                            <li>• Construction mécanique</li>
                            <li>• Services de réparation</li>
                            <li>• Équipementiers industriels</li>
                            <li>• Secteur naval et offshore</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MRIPage;