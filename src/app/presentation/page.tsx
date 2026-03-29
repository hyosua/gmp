'use client';
import { useRouter } from "next/navigation";

function PresentationPage() {
    const router = useRouter();

    const links = [
        { label: "Programme", href: "/presentation/programme" },
        { label: "Spécificités", href: "/presentation/specificite" },
        { label: "Lieux", href: "/presentation/lieu" },
        { label: "Buts GMP", href: "/presentation/but-gmp" },
        { label: "Alternance", href: "/presentation/alternance" },
        { label: "Après le BUT", href: "/presentation/apres-but" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
            <div className="max-w-2xl w-full text-center">
                <h1 className="text-5xl font-bold mb-8 dark:text-white">Présentation</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {links.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => router.push(link.href)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PresentationPage;