'use client';

function MIEPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
            <div className="max-w-[1280px] w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 text-secondary font-sans">Licence MIE</h1>
                    <p className="text-lg text-muted max-w-[42rem] mx-auto font-sans">
                        Maintenance Industrielle et Équipements - Formation professionnelle spécialisée
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mb-12">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">🎯 Objectifs de la formation</h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Acquérir des compétences en maintenance préventive et curative</li>
                            <li>• Maîtriser les technologies de maintenance industrielle</li>
                            <li>• Gérer les équipements et installations industrielles</li>
                            <li>• Assurer la continuité de production</li>
                            <li>• Respecter les normes de sécurité et environnementales</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">📚 Programme d'études</h2>
                        <div className="flex flex-col gap-3 text-secondary font-sans">
                            <div>
                                <h4 className="font-semibold text-primary">Semestre 1 : Bases techniques</h4>
                                <p className="text-sm text-muted">Électrotechnique, mécanique, automatisme</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary">Semestre 2 : Maintenance spécialisée</h4>
                                <p className="text-sm text-muted">Diagnostic, réparation, prévention</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary">Stage professionnel</h4>
                                <p className="text-sm text-muted">4 mois en entreprise</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="p-8 rounded-lg mb-8 font-sans"
                    style={{ background: "linear-gradient(90deg, var(--c-primary), var(--c-secondary))", color: "var(--c-bg)" }}
                >
                    <h3 className="text-2xl font-bold mb-6 text-center">Compétences développées</h3>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                            <div className="text-3xl mb-2">🔧</div>
                            <h4 className="font-bold mb-2 text-lg">Maintenance</h4>
                            <p className="text-sm">Préventive et curative</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                            <div className="text-3xl mb-2">⚡</div>
                            <h4 className="font-bold mb-2 text-lg">Électrotechnique</h4>
                            <p className="text-sm">Équipements électriques</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                            <div className="text-3xl mb-2">🤖</div>
                            <h4 className="font-bold mb-2 text-lg">Automatisme</h4>
                            <p className="text-sm">Systèmes automatisés</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                            <div className="text-3xl mb-2">📊</div>
                            <h4 className="font-bold mb-2 text-lg">Qualité</h4>
                            <p className="text-sm">Management QSE</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h3 className="text-xl font-bold mb-4 text-primary font-sans">💼 Débouchés professionnels</h3>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Technicien(ne) de maintenance industrielle</li>
                            <li>• Responsable de maintenance</li>
                            <li>• Technicien(ne) méthodes maintenance</li>
                            <li>• Chargé(e) d'exploitation industrielle</li>
                            <li>• Technicien(ne) en équipements industriels</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h3 className="text-xl font-bold mb-4 text-primary font-sans">🏢 Secteurs d'activité</h3>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
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
