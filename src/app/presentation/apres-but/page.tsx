







'use client';

function ApresButPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 dark:text-white">Après le BUT</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Les perspectives professionnelles et de poursuite d'études après l'obtention du BUT GMP
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">💼 Insertion professionnelle</h2>
                        <div className="space-y-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <p className="text-green-800 dark:text-green-200 font-semibold">Taux d'insertion : 95%</p>
                                <p className="text-sm text-green-700 dark:text-green-300">dans les 6 mois suivant l'obtention du diplôme</p>
                            </div>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                <li>• Technicien(ne) méthodes</li>
                                <li>• Technicien(ne) industrialisation</li>
                                <li>• Responsable qualité</li>
                                <li>• Chef de projet technique</li>
                                <li>• Technicien(ne) maintenance</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">📈 Évolution de carrière</h2>
                        <div className="space-y-3">
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h4 className="font-semibold text-purple-700 dark:text-purple-300">Après 2-3 ans d'expérience</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Responsable méthodes, Chef d'équipe</p>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h4 className="font-semibold text-purple-700 dark:text-purple-300">Après 5 ans</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Ingénieur d'affaires, Manager industriel</p>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h4 className="font-semibold text-purple-700 dark:text-purple-300">Après 8-10 ans</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Directeur technique, Consultant</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">Poursuite d'études</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white/10 p-4 rounded-lg">
                            <h4 className="font-bold mb-2">🎓 Masters professionnels</h4>
                            <ul className="text-sm space-y-1">
                                <li>• Master Productique</li>
                                <li>• Master Qualité</li>
                                <li>• Master Maintenance</li>
                                <li>• Master Management Industriel</li>
                            </ul>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                            <h4 className="font-bold mb-2">🏫 Écoles d'ingénieurs</h4>
                            <ul className="text-sm space-y-1">
                                <li>• Arts et Métiers</li>
                                <li>• CentraleSupélec</li>
                                <li>• INSA</li>
                                <li>• Écoles spécialisées</li>
                            </ul>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                            <h4 className="font-bold mb-2">💼 MBA et formations</h4>
                            <ul className="text-sm space-y-1">
                                <li>• MBA Management Industriel</li>
                                <li>• Executive MBA</li>
                                <li>• Formations continues</li>
                                <li>• VAE (Validation Acquis)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">€</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Salaire</h3>
                        <div className="text-gray-700 dark:text-gray-300">
                            <p className="font-semibold">Débutant : 28-32k€</p>
                            <p className="text-sm">Après 3 ans : 35-45k€</p>
                            <p className="text-sm">Après 5 ans : 45-60k€</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">📍</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Mobilité</h3>
                        <div className="text-gray-700 dark:text-gray-300">
                            <p className="font-semibold">France entière</p>
                            <p className="text-sm">Europe et international</p>
                            <p className="text-sm">Tous secteurs industriels</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">🚀</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">Évolution</h3>
                        <div className="text-gray-700 dark:text-gray-300">
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