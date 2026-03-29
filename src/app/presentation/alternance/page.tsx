




'use client';

import { C } from "@/lib/forge";

function AlternancePage() {
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
                    }}>Alternance</h1>
                    <p style={{
                        fontSize: "1.125rem",
                        color: C.muted,
                        maxWidth: "42rem",
                        margin: "0 auto",
                        fontFamily: "var(--font-outfit, sans-serif)"
                    }}>
                        Découvrez le rythme alterné : formation théorique à l'IUT + expérience professionnelle en entreprise
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
                        }}>📅 Rythme d'alternance</h2>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem"
                        }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "0.75rem",
                                background: C.primary + "20",
                                borderRadius: "0.25rem"
                            }}>
                                <span style={{ fontWeight: "600", fontFamily: "var(--font-outfit, sans-serif)" }}>Semaines 1-2</span>
                                <span style={{ color: C.primary, fontFamily: "var(--font-outfit, sans-serif)" }}>Cours à l'IUT</span>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "0.75rem",
                                background: C.secondary + "20",
                                borderRadius: "0.25rem"
                            }}>
                                <span style={{ fontWeight: "600", fontFamily: "var(--font-outfit, sans-serif)" }}>Semaine 3</span>
                                <span style={{ color: C.secondary, fontFamily: "var(--font-outfit, sans-serif)" }}>Entreprise</span>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "0.75rem",
                                background: C.primary + "20",
                                borderRadius: "0.25rem"
                            }}>
                                <span style={{ fontWeight: "600", fontFamily: "var(--font-outfit, sans-serif)" }}>Semaines 4-5</span>
                                <span style={{ color: C.primary, fontFamily: "var(--font-outfit, sans-serif)" }}>Cours à l'IUT</span>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "0.75rem",
                                background: C.secondary + "20",
                                borderRadius: "0.25rem"
                            }}>
                                <span style={{ fontWeight: "600", fontFamily: "var(--font-outfit, sans-serif)" }}>Semaine 6</span>
                                <span style={{ color: C.secondary, fontFamily: "var(--font-outfit, sans-serif)" }}>Entreprise</span>
                            </div>
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
                        }}>💼 Avantages de l'alternance</h2>
                        <ul style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li style={{
                                display: "flex",
                                alignItems: "flex-start"
                            }}>
                                <span style={{ color: C.secondary, marginRight: "0.5rem" }}>✓</span>
                                <span>Rémunération attractive (environ 800-1200€/mois)</span>
                            </li>
                            <li style={{
                                display: "flex",
                                alignItems: "flex-start"
                            }}>
                                <span style={{ color: C.secondary, marginRight: "0.5rem" }}>✓</span>
                                <span>Expérience professionnelle valorisante</span>
                            </li>
                            <li style={{
                                display: "flex",
                                alignItems: "flex-start"
                            }}>
                                <span style={{ color: C.secondary, marginRight: "0.5rem" }}>✓</span>
                                <span>Formation prise en charge par l'entreprise</span>
                            </li>
                            <li style={{
                                display: "flex",
                                alignItems: "flex-start"
                            }}>
                                <span style={{ color: C.secondary, marginRight: "0.5rem" }}>✓</span>
                                <span>Embauche facilitée à l'issue de la formation</span>
                            </li>
                            <li style={{
                                display: "flex",
                                alignItems: "flex-start"
                            }}>
                                <span style={{ color: C.secondary, marginRight: "0.5rem" }}>✓</span>
                                <span>Réseau professionnel développé</span>
                            </li>
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
                    }}>Comment intégrer l'alternance ?</h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1.5rem"
                    }}>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <div style={{
                                width: "3rem",
                                height: "3rem",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 0.75rem",
                                fontSize: "1.25rem",
                                fontWeight: "bold"
                            }}>1</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Recherche d'entreprise</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Trouver un contrat d'apprentissage (via Pôle Emploi, APEC, sites spécialisés)</p>
                        </div>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <div style={{
                                width: "3rem",
                                height: "3rem",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 0.75rem",
                                fontSize: "1.25rem",
                                fontWeight: "bold"
                            }}>2</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Validation pédagogique</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Présentation du contrat à l'IUT pour validation</p>
                        </div>
                        <div style={{
                            textAlign: "center"
                        }}>
                            <div style={{
                                width: "3rem",
                                height: "3rem",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 0.75rem",
                                fontSize: "1.25rem",
                                fontWeight: "bold"
                            }}>3</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Début de formation</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Intégration en septembre avec le rythme alterné</p>
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
                        }}>📊 Statistiques 2024</h3>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <p><strong>Taux d'insertion :</strong> 98%</p>
                            <p><strong>Contrats signés :</strong> 85% des étudiants</p>
                            <p><strong>Salaire moyen :</strong> 35 000€/an</p>
                            <p><strong>Entreprises partenaires :</strong> 150+</p>
                        </div>
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
                        }}>🏢 Secteurs recruteurs</h3>
                        <ul style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            <li>• Industrie automobile</li>
                            <li>• Aéronautique et spatial</li>
                            <li>• Équipements industriels</li>
                            <li>• Énergie et environnement</li>
                            <li>• Agroalimentaire</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlternancePage;

