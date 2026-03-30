

'use client';

function ProgrammePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
            <div className="max-w-[1280px] w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 text-secondary font-sans">Programme</h1>
                    <p className="text-lg text-muted max-w-[42rem] mx-auto font-sans">
                        Découvrez le programme complet du BUT GMP, une formation d'excellence en génie mécanique et productique
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mb-12">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">Semestre 1-2 : Bases fondamentales</h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Mathématiques appliquées</li>
                            <li>• Physique mécanique</li>
                            <li>• Informatique et programmation</li>
                            <li>• Anglais technique</li>
                            <li>• Expression et communication</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">Semestre 3-4 : Spécialisation mécanique</h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Résistance des matériaux</li>
                            <li>• Mécanique des fluides</li>
                            <li>• Électrotechnique</li>
                            <li>• Automatisme industriel</li>
                            <li>• DAO/FAO (CAO/FAO)</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">Semestre 5 : Production et qualité</h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Gestion de production</li>
                            <li>• Qualité et contrôle</li>
                            <li>• Maintenance industrielle</li>
                            <li>• Projet tutoré</li>
                            <li>• Stage en entreprise</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans">Semestre 6 : Expertise et projet</h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Management de projet</li>
                            <li>• Innovation technologique</li>
                            <li>• Projet de fin d'études</li>
                            <li>• Stage de spécialisation</li>
                            <li>• Préparation à l'insertion professionnelle</li>
                        </ul>
                    </div>
                </div>

                <div
                    className="p-8 rounded-lg text-center font-sans"
                    style={{ background: "linear-gradient(90deg, var(--c-primary), var(--c-secondary))", color: "var(--c-bg)" }}
                >
                    <h3 className="text-2xl font-bold mb-4">Une formation équilibrée</h3>
                    <p className="text-lg">
                        60% de cours théoriques, 40% de travaux pratiques et projets, avec un stage obligatoire en entreprise
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProgrammePage;
