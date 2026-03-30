'use client';

function MIEFPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
            <div className="max-w-[1280px] w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 text-secondary font-sans">Licence MIEF</h1>
                    <p className="text-lg text-muted max-w-[42rem] mx-auto font-sans">
                        Maintenance Industrielle et Équipements Ferroviaires - Spécialisation transport ferroviaire
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mb-12">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">🎯 Objectifs de la formation</h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Acquérir des compétences spécifiques au matériel roulant ferroviaire</li>
                            <li>• Maîtriser la maintenance des systèmes de transport guidé</li>
                            <li>• Gérer la sécurité et la fiabilité des équipements ferroviaires</li>
                            <li>• Respecter les normes et réglementations du secteur</li>
                            <li>• Assurer la maintenance préventive et curative du matériel</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">📚 Programme d&rsquo;études</h2>
                        <div className="flex flex-col gap-3 text-secondary font-sans">
                            <div>
                                <h4 className="font-semibold text-primary">Semestre 1 : Bases ferroviaires</h4>
                                <p className="text-sm text-muted">Technologies du rail, signalisation, traction électrique</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary">Semestre 2 : Maintenance spécialisée</h4>
                                <p className="text-sm text-muted">Matériel roulant, infrastructures, sécurité</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary">Stage professionnel</h4>
                                <p className="text-sm text-muted">4 mois en entreprise ferroviaire</p>
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
                            <div className="text-3xl mb-2">🚂</div>
                            <h4 className="font-bold mb-2 text-lg">Matériel roulant</h4>
                            <p className="text-sm">Trains et wagons</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                            <div className="text-3xl mb-2">🛤️</div>
                            <h4 className="font-bold mb-2 text-lg">Infrastructures</h4>
                            <p className="text-sm">Voies et signalisation</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                            <div className="text-3xl mb-2">⚡</div>
                            <h4 className="font-bold mb-2 text-lg">Traction électrique</h4>
                            <p className="text-sm">Systèmes électriques</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg text-center">
                            <div className="text-3xl mb-2">🛡️</div>
                            <h4 className="font-bold mb-2 text-lg">Sécurité</h4>
                            <p className="text-sm">Normes ferroviaires</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h3 className="text-xl font-bold mb-4 text-primary font-sans">💼 Débouchés professionnels</h3>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Technicien(ne) de maintenance ferroviaire</li>
                            <li>• Agent(e) de maintenance matériel roulant</li>
                            <li>• Technicien(ne) signalisation</li>
                            <li>• Chargé(e) d&rsquo;exploitation ferroviaire</li>
                            <li>• Contrôleur(euse) qualité équipements</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h3 className="text-xl font-bold mb-4 text-primary font-sans">🏢 Secteurs d&rsquo;activité</h3>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• SNCF et filiales</li>
                            <li>• RATP (métro, RER)</li>
                            <li>• Opérateurs de fret</li>
                            <li>• Constructeurs ferroviaires</li>
                            <li>• Maintenance d&rsquo;infrastructures</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MIEFPage;
