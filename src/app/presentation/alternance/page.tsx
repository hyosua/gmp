




'use client';

function AlternancePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 dark:text-white">Alternance</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Découvrez le rythme alterné : formation théorique à l'IUT + expérience professionnelle en entreprise
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">📅 Rythme d'alternance</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                                <span className="font-semibold">Semaines 1-2</span>
                                <span className="text-blue-600 dark:text-blue-400">Cours à l'IUT</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                                <span className="font-semibold">Semaine 3</span>
                                <span className="text-green-600 dark:text-green-400">Entreprise</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                                <span className="font-semibold">Semaines 4-5</span>
                                <span className="text-blue-600 dark:text-blue-400">Cours à l'IUT</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                                <span className="font-semibold">Semaine 6</span>
                                <span className="text-green-600 dark:text-green-400">Entreprise</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">💼 Avantages de l'alternance</h2>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Rémunération attractive (environ 800-1200€/mois)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Expérience professionnelle valorisante</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Formation prise en charge par l'entreprise</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Embauche facilitée à l'issue de la formation</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Réseau professionnel développé</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">Comment intégrer l'alternance ?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">1</div>
                            <h4 className="font-bold mb-2">Recherche d'entreprise</h4>
                            <p className="text-sm">Trouver un contrat d'apprentissage (via Pôle Emploi, APEC, sites spécialisés)</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">2</div>
                            <h4 className="font-bold mb-2">Validation pédagogique</h4>
                            <p className="text-sm">Présentation du contrat à l'IUT pour validation</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">3</div>
                            <h4 className="font-bold mb-2">Début de formation</h4>
                            <p className="text-sm">Intégration en septembre avec le rythme alterné</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">📊 Statistiques 2024</h3>
                        <div className="space-y-2 text-gray-700 dark:text-gray-300">
                            <p><strong>Taux d'insertion :</strong> 98%</p>
                            <p><strong>Contrats signés :</strong> 85% des étudiants</p>
                            <p><strong>Salaire moyen :</strong> 35 000€/an</p>
                            <p><strong>Entreprises partenaires :</strong> 150+</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">🏢 Secteurs recruteurs</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
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

