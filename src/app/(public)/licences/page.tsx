'use client';

import Link from "next/link";

function LicencesPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
            <div className="max-w-[1280px] w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 text-secondary font-sans">Licences Professionnelles</h1>
                    <p className="text-lg text-muted max-w-[42rem] mx-auto font-sans">
                        Poursuite d'études après le BUT GMP - Spécialisations professionnelles
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mb-12">
                    <Link href="/licences/mie" className="no-underline">
                        <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)] cursor-pointer transition-transform duration-200 h-full hover:-translate-y-1">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 text-2xl text-background">🔧</div>
                                <h2 className="text-2xl font-bold text-primary font-sans">Licence MIE</h2>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-secondary font-sans">Maintenance Industrielle et Équipements</h3>
                            <p className="text-muted font-sans mb-4">
                                Formation spécialisée en maintenance préventive et curative des équipements industriels.
                            </p>
                            <ul className="flex flex-col gap-1 text-secondary font-sans text-sm">
                                <li>• Électrotechnique industrielle</li>
                                <li>• Automatisme et robotique</li>
                                <li>• Gestion de production</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/licences/mief" className="no-underline">
                        <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)] cursor-pointer transition-transform duration-200 h-full hover:-translate-y-1">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 text-2xl text-background">🚂</div>
                                <h2 className="text-2xl font-bold text-primary font-sans">Licence MIEF</h2>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-secondary font-sans">Maintenance Industrielle et Équipements Ferroviaires</h3>
                            <p className="text-muted font-sans mb-4">
                                Spécialisation dans la maintenance du matériel roulant et des infrastructures ferroviaires.
                            </p>
                            <ul className="flex flex-col gap-1 text-secondary font-sans text-sm">
                                <li>• Matériel roulant ferroviaire</li>
                                <li>• Signalisation et sécurité</li>
                                <li>• Traction électrique</li>
                            </ul>
                        </div>
                    </Link>

                    <Link href="/licences/mri" className="no-underline">
                        <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)] cursor-pointer transition-transform duration-200 h-full hover:-translate-y-1">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 text-2xl text-background">🔄</div>
                                <h2 className="text-2xl font-bold text-primary font-sans">Licence MRI</h2>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-secondary font-sans">Maintenance et Réparation Industrielle</h3>
                            <p className="text-muted font-sans mb-4">
                                Expertise en réparation et rénovation d'équipements industriels complexes.
                            </p>
                            <ul className="flex flex-col gap-1 text-secondary font-sans text-sm">
                                <li>• Techniques de réparation</li>
                                <li>• Rénovation d'équipements</li>
                                <li>• Gestion de projet</li>
                            </ul>
                        </div>
                    </Link>
                </div>

                <div
                    className="p-8 rounded-lg text-center font-sans"
                    style={{ background: "linear-gradient(90deg, var(--c-primary), var(--c-secondary))", color: "var(--c-bg)" }}
                >
                    <h3 className="text-2xl font-bold mb-4">Admission en Licences Professionnelles</h3>
                    <p className="text-lg mb-6">
                        Accessible après un BUT GMP ou équivalent, avec validation d'expérience professionnelle
                    </p>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 text-sm">
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
