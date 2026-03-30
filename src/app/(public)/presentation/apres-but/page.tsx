'use client';

function ApresButPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
            <div className="max-w-[1280px] w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 text-secondary font-sans">Après le BUT</h1>
                    <p className="text-lg text-muted max-w-[42rem] mx-auto font-sans">
                        Les perspectives professionnelles et de poursuite d'études après l'obtention du BUT GMP
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mb-12">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">💼 Insertion professionnelle</h2>
                        <div className="flex flex-col gap-4">
                            <div className="bg-secondary/[0.125] p-4 rounded-lg">
                                <p className="text-secondary font-semibold font-sans">Taux d'insertion : 95%</p>
                                <p className="text-sm text-secondary font-sans">dans les 6 mois suivant l'obtention du diplôme</p>
                            </div>
                            <ul className="flex flex-col gap-2 text-secondary font-sans">
                                <li>• Technicien(ne) méthodes</li>
                                <li>• Technicien(ne) industrialisation</li>
                                <li>• Responsable qualité</li>
                                <li>• Chef de projet technique</li>
                                <li>• Technicien(ne) maintenance</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">📈 Évolution de carrière</h2>
                        <div className="flex flex-col gap-3">
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-semibold text-primary font-sans">Après 2-3 ans d'expérience</h4>
                                <p className="text-sm text-muted font-sans">Responsable méthodes, Chef d'équipe</p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-semibold text-primary font-sans">Après 5 ans</h4>
                                <p className="text-sm text-muted font-sans">Ingénieur d'affaires, Manager industriel</p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-semibold text-primary font-sans">Après 8-10 ans</h4>
                                <p className="text-sm text-muted font-sans">Directeur technique, Consultant</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="p-8 rounded-lg mb-8 font-sans"
                    style={{ background: "linear-gradient(90deg, var(--c-primary), var(--c-secondary))", color: "var(--c-bg)" }}
                >
                    <h3 className="text-2xl font-bold mb-6 text-center">Poursuite d'études</h3>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                        <div className="bg-white/10 p-4 rounded-lg">
                            <h4 className="font-bold mb-2 text-lg">🎓 Masters professionnels</h4>
                            <ul className="text-sm flex flex-col gap-1">
                                <li>• Master Productique</li>
                                <li>• Master Qualité</li>
                                <li>• Master Maintenance</li>
                                <li>• Master Management Industriel</li>
                            </ul>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                            <h4 className="font-bold mb-2 text-lg">🏫 Écoles d'ingénieurs</h4>
                            <ul className="text-sm flex flex-col gap-1">
                                <li>• Arts et Métiers</li>
                                <li>• CentraleSupélec</li>
                                <li>• INSA</li>
                                <li>• Écoles spécialisées</li>
                            </ul>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                            <h4 className="font-bold mb-2 text-lg">💼 MBA et formations</h4>
                            <ul className="text-sm flex flex-col gap-1">
                                <li>• MBA Management Industriel</li>
                                <li>• Executive MBA</li>
                                <li>• Formations continues</li>
                                <li>• VAE (Validation Acquis)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)] text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-background">€</div>
                        <h3 className="text-xl font-bold mb-3 text-primary font-sans">Salaire</h3>
                        <div className="text-secondary font-sans">
                            <p className="font-semibold">Débutant : 28-32k€</p>
                            <p className="text-sm">Après 3 ans : 35-45k€</p>
                            <p className="text-sm">Après 5 ans : 45-60k€</p>
                        </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)] text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-background">📍</div>
                        <h3 className="text-xl font-bold mb-3 text-primary font-sans">Mobilité</h3>
                        <div className="text-secondary font-sans">
                            <p className="font-semibold">France entière</p>
                            <p className="text-sm">Europe et international</p>
                            <p className="text-sm">Tous secteurs industriels</p>
                        </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)] text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-background">🚀</div>
                        <h3 className="text-xl font-bold mb-3 text-primary font-sans">Évolution</h3>
                        <div className="text-secondary font-sans">
                            <p className="font-semibold">Création d'entreprise</p>
                            <p className="text-sm">Conseil et expertise</p>
                            <p className="text-sm">Management d'équipe</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApresButPage;
