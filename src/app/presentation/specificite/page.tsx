





'use client';

import { C } from "@/lib/forge";

function SpecificitePage() {
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
                    }}>Spécificités</h1>
                    <p style={{
                        fontSize: "1.125rem",
                        color: C.muted,
                        maxWidth: "42rem",
                        margin: "0 auto",
                        fontFamily: "var(--font-outfit, sans-serif)"
                    }}>
                        Ce qui fait la particularité du BUT GMP à l'IUT d'Évry
                    </p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.5rem",
                    marginBottom: "3rem"
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
                        }}>⚙️</div>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Double compétence</h3>
                        <p style={{
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            Formation équilibrée entre mécanique théorique et savoir-faire pratique en production
                        </p>
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
                        }}>🏭</div>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Laboratoires modernes</h3>
                        <p style={{
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            Équipements de pointe pour l'usinage, la métrologie et l'automatisation industrielle
                        </p>
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
                        }}>🤝</div>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Partenariats industriels</h3>
                        <p style={{
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            Relations étroites avec les entreprises locales pour stages et projets professionnels
                        </p>
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
                        }}>🎓</div>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Pédagogie active</h3>
                        <p style={{
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            Apprentissage par projets, travaux pratiques et cas d'études industriels
                        </p>
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
                        }}>🌍</div>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Ouverture internationale</h3>
                        <p style={{
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            Possibilité d'échanges Erasmus et enseignement en anglais
                        </p>
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
                        }}>📈</div>
                        <h3 style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "0.75rem",
                            color: C.primary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>Insertion professionnelle</h3>
                        <p style={{
                            color: C.secondary,
                            fontFamily: "var(--font-outfit, sans-serif)"
                        }}>
                            Taux d'insertion de 95% dans les 6 mois suivant l'obtention du diplôme
                        </p>
                    </div>
                </div>

                <div style={{
                    background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`,
                    color: C.bg,
                    padding: "2rem",
                    borderRadius: "0.5rem",
                    fontFamily: "var(--font-outfit, sans-serif)"
                }}>
                    <h3 style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                        textAlign: "center"
                    }}>Pourquoi choisir le BUT GMP d'Évry ?</h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "1.5rem"
                    }}>
                        <div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>🏆 Excellence académique</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Formation reconnue et appréciée par les entreprises du secteur industriel</p>
                        </div>
                        <div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>💼 Réseau professionnel</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Plus de 200 entreprises partenaires dans la région Île-de-France</p>
                        </div>
                        <div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>🔬 Recherche & Innovation</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Laboratoires de recherche intégrés aux enseignements</p>
                        </div>
                        <div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>📚 Poursuite d'études</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Possibilité d'intégrer des masters ou écoles d'ingénieurs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecificitePage;