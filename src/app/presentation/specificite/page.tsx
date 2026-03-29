





'use client';

function SpecificitePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 dark:text-white">Spécificités</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Ce qui fait la particularité du BUT GMP à l'IUT d'Évry
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">⚙️</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Double compétence</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Formation équilibrée entre mécanique théorique et savoir-faire pratique en production
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">🏭</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Laboratoires modernes</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Équipements de pointe pour l'usinage, la métrologie et l'automatisation industrielle
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">🤝</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">Partenariats industriels</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Relations étroites avec les entreprises locales pour stages et projets professionnels
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">🎓</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-orange-600 dark:text-orange-400">Pédagogie active</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Apprentissage par projets, travaux pratiques et cas d'études industriels
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">🌍</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-red-600 dark:text-red-400">Ouverture internationale</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Possibilité d'échanges Erasmus et enseignement en anglais
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-bold">📈</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-teal-600 dark:text-teal-400">Insertion professionnelle</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Taux d'insertion de 95% dans les 6 mois suivant l'obtention du diplôme
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 text-center">Pourquoi choisir le BUT GMP d'Évry ?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold mb-2">🏆 Excellence académique</h4>
                            <p>Formation reconnue et appréciée par les entreprises du secteur industriel</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">💼 Réseau professionnel</h4>
                            <p>Plus de 200 entreprises partenaires dans la région Île-de-France</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">🔬 Recherche & Innovation</h4>
                            <p>Laboratoires de recherche intégrés aux enseignements</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">📚 Poursuite d'études</h4>
                            <p>Possibilité d'intégrer des masters ou écoles d'ingénieurs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecificitePage;