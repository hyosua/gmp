'use client';

function LieuPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-background text-secondary">
            <div className="max-w-[1280px] w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 text-secondary font-sans">Lieux</h1>
                    <p className="text-lg text-muted max-w-[42rem] mx-auto font-sans">
                        Découvrez les installations modernes de l'IUT d'Évry pour votre formation GMP
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mb-12">
                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans flex items-center">
                            <span className="text-3xl mr-3">🏫</span>
                            Campus d'Évry
                        </h2>
                        <div className="flex flex-col gap-3 text-secondary font-sans">
                            <p><strong>Adresse :</strong> 25 cours Monseigneur Romero, 91000 Évry-Courcouronnes</p>
                            <p><strong>Accès :</strong> RER D station Évry-Courcouronnes (15 min de Paris)</p>
                            <p><strong>Environnement :</strong> Campus universitaire moderne en plein cœur de la ville nouvelle d'Évry</p>
                        </div>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans flex items-center">
                            <span className="text-3xl mr-3">🔧</span>
                            Ateliers techniques
                        </h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Atelier d'usinage CNC</li>
                            <li>• Laboratoire de métrologie</li>
                            <li>• Salle d'automatisme industriel</li>
                            <li>• Atelier de prototypage rapide</li>
                            <li>• Laboratoire de mécanique des fluides</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans flex items-center">
                            <span className="text-3xl mr-3">📚</span>
                            Espaces d'étude
                        </h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Salles de cours équipées</li>
                            <li>• Bibliothèque universitaire</li>
                            <li>• Salles informatiques</li>
                            <li>• Espaces de travail collaboratif</li>
                            <li>• Cafétéria étudiante</li>
                        </ul>
                    </div>

                    <div className="bg-background p-6 rounded-lg border-2 border-primary shadow-[4px_4px_0_var(--c-accent)]">
                        <h2 className="text-2xl font-bold mb-4 text-primary font-sans flex items-center">
                            <span className="text-3xl mr-3">🏃‍♂️</span>
                            Vie étudiante
                        </h2>
                        <ul className="flex flex-col gap-2 text-secondary font-sans">
                            <li>• Gymnase et terrains de sport</li>
                            <li>• Associations étudiantes</li>
                            <li>• Restaurant universitaire</li>
                            <li>• Résidences étudiantes à proximité</li>
                            <li>• Centre commercial Grand Évry</li>
                        </ul>
                    </div>
                </div>

                <div
                    className="p-8 rounded-lg text-center font-sans"
                    style={{ background: "linear-gradient(90deg, var(--c-primary), var(--c-secondary))", color: "var(--c-bg)" }}
                >
                    <h3 className="text-2xl font-bold mb-4">Un campus connecté</h3>
                    <p className="text-lg mb-4">
                        Situé à 30 minutes de Paris, l'IUT d'Évry bénéficie d'une excellente accessibilité
                    </p>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 text-sm">
                        <div>
                            <strong>🚇 Transport</strong><br />
                            RER D, Bus, Parking gratuit
                        </div>
                        <div>
                            <strong>🏪 Commerces</strong><br />
                            Tous les services à proximité
                        </div>
                        <div>
                            <strong>🌳 Environnement</strong><br />
                            Campus verdoyant et moderne
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LieuPage;
