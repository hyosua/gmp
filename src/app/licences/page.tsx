'use client';

import { C } from "@/lib/forge";
import Link from "next/link";

function LicencesPage() {
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
                    }}>Licences Professionnelles</h1>
                    <p style={{
                        fontSize: "1.125rem",
                        color: C.muted,
                        maxWidth: "42rem",
                        margin: "0 auto",
                        fontFamily: "var(--font-outfit, sans-serif)"
                    }}>
                        Poursuite d'études après le BUT GMP - Spécialisations professionnelles
                    </p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: "2rem",
                    marginBottom: "3rem"
                }}>
                    <Link href="/licences/mie" style={{ textDecoration: "none" }}>
                        <div style={{
                            background: C.bg,
                            padding: "1.5rem",
                            borderRadius: "0.5rem",
                            border: `2px solid ${C.primary}`,
                            boxShadow: `4px 4px 0 ${C.accent}`,
                            cursor: "pointer",
                            transition: "transform 0.2s",
                            height: "100%"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "1rem"
                            }}>
                                <div style={{
                                    width: "3rem",
                                    height: "3rem",
                                    background: C.primary,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: "1rem",
                                    fontSize: "1.5rem",
                                    color: C.bg
                                }}>🔧</div>
                                <h2 style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: C.primary,
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>Licence MIE</h2>
                            </div>
                            <h3 style={{
                                fontSize: "1.125rem",
                                fontWeight: "600",
                                marginBottom: "0.75rem",
                                color: C.secondary,
                                fontFamily: "var(--font-outfit, sans-serif)"
                            }}>Maintenance Industrielle et Équipements</h3>
                            <p style={{
                                color: C.muted,
                                fontFamily: "var(--font-outfit, sans-serif)",
                                marginBottom: "1rem"
                            }}>
                                Formation spécialisée en maintenance préventive et curative des équipements industriels.
                            </p>
                            <ul style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                                color: C.secondary,
                                fontFamily: "var(--font-outfit, sans-serif)",
                                fontSize: "0.875rem"
                            }}>
                                <li>• Électrotechnique industrielle</li>
                                <li>• Automatisme et robotique</li>
                                <li>• Gestion de production</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/licences/mief" style={{ textDecoration: "none" }}>
                        <div style={{
                            background: C.bg,
                            padding: "1.5rem",
                            borderRadius: "0.5rem",
                            border: `2px solid ${C.primary}`,
                            boxShadow: `4px 4px 0 ${C.accent}`,
                            cursor: "pointer",
                            transition: "transform 0.2s",
                            height: "100%"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "1rem"
                            }}>
                                <div style={{
                                    width: "3rem",
                                    height: "3rem",
                                    background: C.primary,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: "1rem",
                                    fontSize: "1.5rem",
                                    color: C.bg
                                }}>🚂</div>
                                <h2 style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: C.primary,
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>Licence MIEF</h2>
                            </div>
                            <h3 style={{
                                fontSize: "1.125rem",
                                fontWeight: "600",
                                marginBottom: "0.75rem",
                                color: C.secondary,
                                fontFamily: "var(--font-outfit, sans-serif)"
                            }}>Maintenance Industrielle et Équipements Ferroviaires</h3>
                            <p style={{
                                color: C.muted,
                                fontFamily: "var(--font-outfit, sans-serif)",
                                marginBottom: "1rem"
                            }}>
                                Spécialisation dans la maintenance du matériel roulant et des infrastructures ferroviaires.
                            </p>
                            <ul style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                                color: C.secondary,
                                fontFamily: "var(--font-outfit, sans-serif)",
                                fontSize: "0.875rem"
                            }}>
                                <li>• Matériel roulant ferroviaire</li>
                                <li>• Signalisation et sécurité</li>
                                <li>• Traction électrique</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/licences/mri" style={{ textDecoration: "none" }}>
                        <div style={{
                            background: C.bg,
                            padding: "1.5rem",
                            borderRadius: "0.5rem",
                            border: `2px solid ${C.primary}`,
                            boxShadow: `4px 4px 0 ${C.accent}`,
                            cursor: "pointer",
                            transition: "transform 0.2s",
                            height: "100%"
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "1rem"
                            }}>
                                <div style={{
                                    width: "3rem",
                                    height: "3rem",
                                    background: C.primary,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: "1rem",
                                    fontSize: "1.5rem",
                                    color: C.bg
                                }}>🔄</div>
                                <h2 style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: C.primary,
                                    fontFamily: "var(--font-outfit, sans-serif)"
                                }}>Licence MRI</h2>
                            </div>
                            <h3 style={{
                                fontSize: "1.125rem",
                                fontWeight: "600",
                                marginBottom: "0.75rem",
                                color: C.secondary,
                                fontFamily: "var(--font-outfit, sans-serif)"
                            }}>Maintenance et Réparation Industrielle</h3>
                            <p style={{
                                color: C.muted,
                                fontFamily: "var(--font-outfit, sans-serif)",
                                marginBottom: "1rem"
                            }}>
                                Expertise en réparation et rénovation d'équipements industriels complexes.
                            </p>
                            <ul style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                                color: C.secondary,
                                fontFamily: "var(--font-outfit, sans-serif)",
                                fontSize: "0.875rem"
                            }}>
                                <li>• Techniques de réparation</li>
                                <li>• Rénovation d'équipements</li>
                                <li>• Gestion de projet</li>
                            </ul>
                        </div>
                    </Link>
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
                    }}>Admission en Licences Professionnelles</h3>
                    <p style={{
                        fontSize: "1.125rem",
                        marginBottom: "1.5rem"
                    }}>
                        Accessible après un BUT GMP ou équivalent, avec validation d'expérience professionnelle
                    </p>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1rem",
                        fontSize: "0.875rem"
                    }}>
                        <div>
                            <strong>📅 Durée</strong><br />
                            1 an (2 semestres + stage)
                        </div>
                        <div>
                            <strong>🎓 Diplôme</strong><br />
                            Licence Professionnelle
                        </div>
                        <div>
                            <strong>💼 Alternance</strong><br />
                            Possible en contrat pro
                        </div>
                        <div>
                            <strong>📈 Niveau</strong><br />
                            Bac+4 (180 ECTS)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LicencesPage;