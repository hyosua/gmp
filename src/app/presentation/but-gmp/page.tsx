




'use client';

function ButGmpPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 dark:text-white">Buts GMP</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Les objectifs de formation du BUT Génie Mécanique et Productique
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">🎯 Objectif principal</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Former des techniciens supérieurs capables de concevoir, réaliser et optimiser des systèmes mécaniques et de production industrielle.
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>Diplôme :</strong> Bachelor Universitaire de Technologie - niveau 6 (Bac+3)
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">💼 Compétences visées</h2>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li>• Concevoir des systèmes mécaniques</li>
                            <li>• Gérer la production industrielle</li>
                            <li>• Assurer la qualité et la maintenance</li>
                            <li>• Maîtriser les outils numériques</li>
                            <li>• Travailler en équipe projet</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-lg mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">Les 4 piliers de la formation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">⚙️</span>
                            </div>
                            <h4 className="font-bold mb-2">Mécanique</h4>
                            <p className="text-sm">Conception et calcul</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">🏭</span>
                            </div>
                            <h4 className="font-bold mb-2">Production</h4>
                            <p className="text-sm">Industrialisation</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">🔧</span>
                            </div>
                            <h4 className="font-bold mb-2">Maintenance</h4>
                            <p className="text-sm">Fiabilité système</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h4 className="font-bold mb-2">Qualité</h4>
                            <p className="text-sm">Management QSE</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Métiers visés</h3>
                        <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                            <li>• Technicien méthodes</li>
                            <li>• Ingénieur d'affaires</li>
                            <li>• Chef de projet industriel</li>
                            <li>• Responsable qualité</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Secteurs d'activité</h3>
                        <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                            <li>• Automobile</li>
                            <li>• Aéronautique</li>
                            <li>• Énergie</li>
                            <li>• Agroalimentaire</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">Poursuite d'études</h3>
                        <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
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