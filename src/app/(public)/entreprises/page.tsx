export default function EntreprisesPartenairesPage() {
  const entreprises = {
    A: [
      "ABD Diag Conseil",
      "ACNS",
      "Adelius",
      "ADEM-MO",
      "Aerolis",
      "Aéroports de Paris",
      "Aforia",
      "Alcatel-Lucent International",
      "Alligator SA",
      "Alstom Power Systems TV BEX",
      "Amicor",
      "Arianespace",
      "Assistance Services",
      "Association Française de Normalisation",
      "Axio",
    ],
    B: [
      "Ballard Etablissement",
      "Bank of Scotland PLC",
      "Banque de France",
      "Bohr Technologies",
      "Boost Your Ops",
      "Bouygues Construction Matériel",
      "BSO Network Solutions",
    ],
    C: [
      "CB",
      "CAMSO France",
      "Carrefour Administratif France",
      "Carrefour Banque",
      "CERAP",
      "CGG Services SAS",
      "Composite Industrie SA",
      "Corwave",
      "CSF Technologies",
    ],
    D: [
      "Dekra Industrial SAS",
      "DEL MONTE France",
      "Diba",
      "DPD France",
      "DR 134",
    ],
    E: [
      "Elcimai Engineering Architecture",
      "Energie Evolution",
      "Eneria",
      "Engineering Réseaux Communications",
      "EOZ",
      "Ertem International",
      "ETS Trochon Jacky",
      "Europe Services Groupe",
      "Europe Services Maintenances ESM",
      "Europe Services Propreté",
      "Européenne de Sélection – SES",
    ],
    F: [
      "Finance Factory",
      "Framatome",
      "France Cars",
      "France Transit Auto SARL",
      "Future Electronics",
    ],
    G: [
      "Galerie Louise Leiris",
      "Geodis Logistics Ile de France",
      "Geoparts",
      "Girault LOR",
      "Grand Garage Feray SAE",
      "Graphiware",
    ],
    I: [
      "ID Finances",
      "IDF Distribution",
      "IMMO 2CF",
      "INEO Télésécurité Services",
      "Infflux Informatique et Flux",
      "Interval",
    ],
    J: ["JOST France SARL"],
    K: [
      "Keolis Orly Airport",
      "Keolis Roissy Airport",
      "Keolis Roissy Services Aéroportuaires",
      "Kuehne Nagel",
    ],
    L: [
      "LCP",
      "Le Quinze",
      "Leader Interim 2878",
      "Leader Interim 92",
      "Leroy Merlin France",
      "Les 2 Mégots",
      "Lindqvist International",
    ],
    M: [
      "Mangaia",
      "Manpower France",
      "Mecanalu",
      "Menuiserie Terrasses Création",
      "Meubles IKEA France",
      "Missler Software",
      "Mon Agent du Grand Paris",
      "Monsieur Luc Vautier",
      "Muzzin & Cie",
    ],
    N: [
      "Neocles Corporate",
      "Nokia Solutions And Networks France",
      "Novact",
    ],
    O: ["OCamlPro", "Orange"],
    P: [
      "Paille",
      "Paulstra SNC 25",
      "Paulstra SNC 45",
      "Playmobil France SARL",
      "Praxair Gases France SAS",
      "Precisium Groupe SAS",
      "Prodica",
    ],
    R: ["Renault SAS Boulogne", "Rexel France"],
    S: [
      "SAS CEEF",
      "SAS VB",
      "Safran Aircraft Engines",
      "Safran Electrical & Power",
      "Safran Transmission Systems",
      "Saint Amand Service France",
      "SAIPEM SA",
      "Samada",
      "SARL Complicite Canine",
      "SAS Barilla France",
      "SAS HVP",
      "SATT Paris Saclay",
      "SELARL Racine",
      "Seledis",
      "SEM Genopole",
      "Sisimmo",
      "SOC Andrade Luis Maçonnerie",
      "SOC BMCP",
      "SOC Solcera",
      "Stanley Black & Decker France Services",
      "STEF Logistique Distribution Montsoult",
      "STEF Logistique Tigery",
      "STEF Transport Paris Vitry",
      "SUNERIS Solution",
    ],
    T: [
      "T.D.H. Paie Experts",
      "TEA",
      "TOTAL Global Procurement",
      "Transdev Île-de-France",
    ],
    V: [
      "Vernet SA",
      "VG Déco",
      "Voyages Autocars Services",
    ],
    X: ["X-FAB France"],
    Z: ["Zodiac Aérospace"],
  };

  const totalEntreprises = Object.values(entreprises).flat().length;

  return (
    <section className="forge-section">
      <div className="forge-container px-6">
        <div className="mb-12">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-primary">
            ENTREPRISES PARTENAIRES
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            Ils nous font confiance
          </h1>

          <p className="max-w-3xl text-muted">
            Plus de <strong>{totalEntreprises} entreprises</strong> accueillent
            nos étudiants en stage, alternance ou collaborent avec le
            département GMP.
          </p>
        </div>

        <div className="grid gap-6">
          {Object.entries(entreprises).map(([lettre, liste]) => (
            <div key={lettre} className="forge-card">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center border border-primary text-xl font-bold text-primary">
                  {lettre}
                </div>

                <h2
                  data-card-title
                  className="text-2xl font-semibold"
                >
                 
                </h2>
              </div>

              <div className="grid gap-x-8 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
                {liste.map((entreprise) => (
                  <p key={entreprise} className="text-sm">
                    {entreprise}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}