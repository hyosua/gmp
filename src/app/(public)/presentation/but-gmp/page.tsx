'use client';

function ButGmpPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
            <div className="max-w-[1280px] w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 text-secondary font-sans">Buts GMP</h1>
                    <p className="text-lg text-muted max-w-[42rem] mx-auto font-sans">
                        Les objectifs de formation du BUT Génie Mécanique et Productique
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mb-12">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">🎯 Objectif principal</h2>
                        <p className="text-secondary mb-4 font-sans">
                            Former des techniciens supérieurs capables de concevoir, réaliser et optimiser des systèmes mécaniques et de production industrielle.
                        </p>
                        <div className="bg-primary/[0.125] p-4 rounded-lg">
                            <p className="text-sm text-primary font-sans">
                                <strong>Diplôme :</strong> Bachelor Universitaire de Technologie - niveau 6 (Bac+3)
                            </p>
                        </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">💼 Compétences visées</h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Concevoir des systèmes mécaniques</li>
                            <li>• Gérer la production industrielle</li>
                            <li>• Assurer la qualité et la maintenance</li>
                            <li>• Maîtriser les outils numériques</li>
                            <li>• Travailler en équipe projet</li>
                        </ul>
                    </div>
                </div>

                <div
                    className="p-8 rounded-lg mb-8 font-sans"
                    style={{ background: "linear-gradient(90deg, var(--c-primary), var(--c-secondary))", color: "var(--c-bg)" }}
                >
                    <h3 className="text-2xl font-bold mb-6 text-center">Les 4 piliers de la formation</h3>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">⚙️</div>
                            <h4 className="font-bold mb-2 text-lg">Mécanique</h4>
                            <p className="text-sm">Conception et calcul</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🏭</div>
                            <h4 className="font-bold mb-2 text-lg">Production</h4>
                            <p className="text-sm">Industrialisation</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🔧</div>
                            <h4 className="font-bold mb-2 text-lg">Maintenance</h4>
                            <p className="text-sm">Fiabilité système</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">📊</div>
                            <h4 className="font-bold mb-2 text-lg">Qualité</h4>
                            <p className="text-sm">Management QSE</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)] text-center">
                        <h3 className="text-xl font-bold mb-3 text-primary font-sans">Métiers visés</h3>
                        <ul className="text-sm flex flex-col gap-1 text-secondary font-sans">
                            <li>• Technicien méthodes</li>
                            <li>• Ingénieur d'affaires</li>
                            <li>• Chef de projet industriel</li>
                            <li>• Responsable qualité</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)] text-center">
                        <h3 className="text-xl font-bold mb-3 text-primary font-sans">Secteurs d'activité</h3>
                        <ul className="text-sm flex flex-col gap-1 text-secondary font-sans">
                            <li>• Automobile</li>
                            <li>• Aéronautique</li>
                            <li>• Énergie</li>
                            <li>• Agroalimentaire</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)] text-center">
                        <h3 className="text-xl font-bold mb-3 text-primary font-sans">Poursuite d'études</h3>
                        <ul className="text-sm flex flex-col gap-1 text-secondary font-sans">
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
