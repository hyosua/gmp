'use client';

function MRIPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
            <div className="max-w-[1280px] w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 text-secondary font-sans">Licence MRI</h1>
                    <p className="text-lg text-muted max-w-[42rem] mx-auto font-sans">
                        Maintenance et Réparation Industrielle - Expertise en réparation et rénovation
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mb-12">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">🎯 Objectifs de la formation</h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Maîtriser les techniques de réparation industrielle</li>
                            <li>• Acquérir des compétences en rénovation d&rsquo;équipements</li>
                            <li>• Gérer les processus de remise en état</li>
                            <li>• Optimiser les coûts de maintenance et réparation</li>
                            <li>• Assurer la conformité et la sécurité des équipements</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">📚 Programme d&rsquo;études</h2>
                        <div className="flex flex-col gap-3 text-secondary font-sans">
                            <div>
                                <h4 className="font-semibold text-primary">Semestre 1 : Techniques de réparation</h4>
                                <p className="text-sm text-muted">Soudage, usinage, traitement de surface</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary">Semestre 2 : Gestion de projet</h4>
                                <p className="text-sm text-muted">Planification, budgétisation, qualité</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary">Stage professionnel</h4>
                                <p className="text-sm text-muted">4 mois en entreprise de réparation</p>
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
                            <div className="text-3xl mb-2">🔩</div>
                            <h4 className="font-bold mb-2 text-lg">Réparation</h4>
                            <p className="text-sm">Techniques avancées</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                            <div className="text-3xl mb-2">🔄</div>
                            <h4 className="font-bold mb-2 text-lg">Rénovation</h4>
                            <p className="text-sm">Remise en état</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                            <div className="text-3xl mb-2">💰</div>
                            <h4 className="font-bold mb-2 text-lg">Économie</h4>
                            <p className="text-sm">Gestion des coûts</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                            <div className="text-3xl mb-2">📋</div>
                            <h4 className="font-bold mb-2 text-lg">Qualité</h4>
                            <p className="text-sm">Contrôle et conformité</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h3 className="text-xl font-bold mb-4 text-primary font-sans">💼 Débouchés professionnels</h3>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Technicien(ne) de réparation industrielle</li>
                            <li>• Responsable d&rsquo;atelier de réparation</li>
                            <li>• Technicien(ne) rénovation équipements</li>
                            <li>• Chargé(e) d&rsquo;affaires maintenance</li>
                            <li>• Expert(e) en remise en état</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h3 className="text-xl font-bold mb-4 text-primary font-sans">🏢 Secteurs d&rsquo;activité</h3>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
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
