'use client';

function AlternancePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
            <div className="max-w-[1280px] w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 text-secondary font-sans">Alternance</h1>
                    <p className="text-lg text-muted max-w-[42rem] mx-auto font-sans">
                        Découvrez le rythme alterné : formation théorique à l&rsquo;IUT + expérience professionnelle en entreprise
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mb-12">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">Rythme d&rsquo;alternance</h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center p-3 bg-primary/[0.125] rounded">
                                <span className="font-semibold font-sans">Semaines 1-2</span>
                                <span className="text-primary font-sans">Cours à l&rsquo;IUT</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-secondary/[0.125] rounded">
                                <span className="font-semibold font-sans">Semaine 3</span>
                                <span className="text-secondary font-sans">Entreprise</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-primary/[0.125] rounded">
                                <span className="font-semibold font-sans">Semaines 4-5</span>
                                <span className="text-primary font-sans">Cours à l&rsquo;IUT</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-secondary/[0.125] rounded">
                                <span className="font-semibold font-sans">Semaine 6</span>
                                <span className="text-secondary font-sans">Entreprise</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">Avantages de l&rsquo;alternance</h2>
                        <ul className="flex flex-col gap-3 text-secondary font-sans">
                            <li className="flex items-start">
                                <span className="text-secondary mr-2">✓</span>
                                <span>Rémunération attractive (environ 800-1200€/mois)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-secondary mr-2">✓</span>
                                <span>Expérience professionnelle valorisante</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-secondary mr-2">✓</span>
                                <span>Formation prise en charge par l&rsquo;entreprise</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-secondary mr-2">✓</span>
                                <span>Embauche facilitée à l&rsquo;issue de la formation</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-secondary mr-2">✓</span>
                                <span>Réseau professionnel développé</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div
                    className="p-8 rounded-lg mb-8 font-sans"
                    style={{ background: "linear-gradient(90deg, var(--c-primary), var(--c-secondary))", color: "var(--c-bg)" }}
                >
                    <h3 className="text-2xl font-bold mb-6 text-center">Comment intégrer l&rsquo;alternance ?</h3>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">1</div>
                            <h4 className="font-bold mb-2 text-lg">Recherche d&rsquo;entreprise</h4>
                            <p className="text-sm">Trouver un contrat d&rsquo;apprentissage (via Pôle Emploi, APEC, sites spécialisés)</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">2</div>
                            <h4 className="font-bold mb-2 text-lg">Validation pédagogique</h4>
                            <p className="text-sm">Présentation du contrat à l&rsquo;IUT pour validation</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">3</div>
                            <h4 className="font-bold mb-2 text-lg">Début de formation</h4>
                            <p className="text-sm">Intégration en septembre avec le rythme alterné</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h3 className="text-xl font-bold mb-4 text-primary font-sans">Statistiques 2024</h3>
                        <div className="flex flex-col gap-2 text-secondary font-sans">
                            <p><strong>Taux d&rsquo;insertion :</strong> 98%</p>
                            <p><strong>Contrats signés :</strong> 85% des étudiants</p>
                            <p><strong>Salaire moyen :</strong> 35 000€/an</p>
                            <p><strong>Entreprises partenaires :</strong> 150+</p>
                        </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h3 className="text-xl font-bold mb-4 text-primary font-sans">Secteurs recruteurs</h3>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
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
