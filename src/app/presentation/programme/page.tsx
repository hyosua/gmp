


'use client';

function ProgrammePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 dark:text-white">Programme</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Découvrez le programme complet du BUT GMP, une formation d'excellence en génie mécanique et productique
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Semestre 1-2 : Bases fondamentales</h2>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li>• Mathématiques appliquées</li>
                            <li>• Physique mécanique</li>
                            <li>• Informatique et programmation</li>
                            <li>• Anglais technique</li>
                            <li>• Expression et communication</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Semestre 3-4 : Spécialisation mécanique</h2>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li>• Résistance des matériaux</li>
                            <li>• Mécanique des fluides</li>
                            <li>• Électrotechnique</li>
                            <li>• Automatisme industriel</li>
                            <li>• DAO/FAO (CAO/FAO)</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Semestre 5 : Production et qualité</h2>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li>• Gestion de production</li>
                            <li>• Qualité et contrôle</li>
                            <li>• Maintenance industrielle</li>
                            <li>• Projet tutoré</li>
                            <li>• Stage en entreprise</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Semestre 6 : Expertise et projet</h2>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li>• Management de projet</li>
                            <li>• Innovation technologique</li>
                            <li>• Projet de fin d'études</li>
                            <li>• Stage de spécialisation</li>
                            <li>• Préparation à l'insertion professionnelle</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg text-center">
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