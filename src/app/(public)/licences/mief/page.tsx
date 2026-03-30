'use client';

import { C } from "@/lib/forge";

function MIEFPage() {
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
                    }}>Licence MIEF</h1>
                    <p style={{
                        fontSize: "1.125rem",
                        color: C.muted,
                        maxWidth: "42rem",
                        margin: "0 auto",
                        fontFamily: "var(--font-outfit, sans-serif)"
                    }}>
                        Maintenance Industrielle et Équipements Ferroviaires - Spécialisation transport ferroviaire
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
                            <li>• Acquérir des compétences spécifiques au matériel roulant ferroviaire</li>
                            <li>• Maîtriser la maintenance des systèmes de transport guidé</li>
                            <li>• Gérer la sécurité et la fiabilité des équipements ferroviaires</li>
                            <li>• Respecter les normes et réglementations du secteur</li>
                            <li>• Assurer la maintenance préventive et curative du matériel</li>
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
                                <h4 style={{ fontWeight: "600", color: C.primary }}>Semestre 1 : Bases ferroviaires</h4>
                                <p style={{ fontSize: "0.875rem", color: C.muted }}>Technologies du rail, signalisation, traction électrique</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: "600", color: C.primary }}>Semestre 2 : Maintenance spécialisée</h4>
                                <p style={{ fontSize: "0.875rem", color: C.muted }}>Matériel roulant, infrastructures, sécurité</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: "600", color: C.primary }}>Stage professionnel</h4>
                                <p style={{ fontSize: "0.875rem", color: C.muted }}>4 mois en entreprise ferroviaire</p>
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
                            }}>🚂</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Matériel roulant</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Trains et wagons</p>
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
                            }}>🛤️</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Infrastructures</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Voies et signalisation</p>
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
                            }}>Traction électrique</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Systèmes électriques</p>
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
                            }}>🛡️</div>
                            <h4 style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                fontSize: "1.125rem"
                            }}>Sécurité</h4>
                            <p style={{
                                fontSize: "0.875rem"
                            }}>Normes ferroviaires</p>
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
                            <li>• Technicien(ne) de maintenance ferroviaire</li>
                            <li>• Agent(e) de maintenance matériel roulant</li>
                            <li>• Technicien(ne) signalisation</li>
                            <li>• Chargé(e) d'exploitation ferroviaire</li>
                            <li>• Contrôleur(euse) qualité équipements</li>
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
                            <li>• SNCF et filiales</li>
                            <li>• RATP (métro, RER)</li>
                            <li>• Opérateurs de fret</li>
                            <li>• Constructeurs ferroviaires</li>
                            <li>• Maintenance d'infrastructures</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MIEFPage;