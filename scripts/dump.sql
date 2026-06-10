--
-- PostgreSQL database dump
--

\restrict nqSPrlcdtxZRMh1l4c7ZrqXLBpxbk9z2mbRARIkBOe0GKzp854ADRgYoEZgAde9

-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Parcours; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Parcours" AS ENUM (
    'SIMULATION_REALITE_VIRTUELLE',
    'CONCEPTION_PRODUCTION_DURABLE',
    'NON_DEFINI',
    'LP_MIE',
    'LP_MIEF',
    'LP_MRI'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'ETUDIANT',
    'ENSEIGNANT',
    'ENTREPRISE',
    'ADMIN'
);


--
-- Name: Statut; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Statut" AS ENUM (
    'PENDING',
    'PUBLISHED',
    'REJECTED'
);


--
-- Name: TypeFormation; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TypeFormation" AS ENUM (
    'INITIALE',
    'ALTERNANCE'
);


--
-- Name: TypeGroupe; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TypeGroupe" AS ENUM (
    'CM',
    'TD',
    'TP'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: EmploiDuTemps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EmploiDuTemps" (
    id text NOT NULL,
    jour text NOT NULL,
    "heureDebut" text NOT NULL,
    "heureFin" text NOT NULL,
    salle text NOT NULL,
    intitule text NOT NULL,
    "groupeId" text NOT NULL,
    "enseignantId" text NOT NULL,
    semaine timestamp(3) without time zone NOT NULL,
    "matiereId" text NOT NULL,
    "recurrenceFin" timestamp(3) without time zone,
    recurrent boolean DEFAULT false NOT NULL
);


--
-- Name: Groupe; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Groupe" (
    id text NOT NULL,
    nom text NOT NULL,
    type public."TypeGroupe" NOT NULL,
    "anneeScolaire" text NOT NULL
);


--
-- Name: Matiere; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Matiere" (
    id text NOT NULL,
    nom text NOT NULL,
    code text NOT NULL,
    "ueId" text NOT NULL
);


--
-- Name: MatiereEnseignant; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."MatiereEnseignant" (
    "enseignantId" text NOT NULL,
    "matiereId" text NOT NULL
);


--
-- Name: Note; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Note" (
    id text NOT NULL,
    valeur double precision NOT NULL,
    "dateDepot" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "etudiantId" text NOT NULL,
    "enseignantId" text NOT NULL,
    "matiereId" text NOT NULL,
    annee integer NOT NULL,
    semestre integer NOT NULL
);


--
-- Name: OffreAlternance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."OffreAlternance" (
    id text NOT NULL,
    poste text NOT NULL,
    description text NOT NULL,
    duree text NOT NULL,
    remuneration text,
    prerequis text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "entrepriseId" text NOT NULL,
    statut public."Statut" DEFAULT 'PENDING'::public."Statut" NOT NULL,
    parcours public."Parcours"
);


--
-- Name: ProjetTuteure; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ProjetTuteure" (
    id text NOT NULL,
    titre text NOT NULL,
    description text NOT NULL,
    prerequis text,
    "nbEtudiants" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "entrepriseId" text NOT NULL,
    statut public."Statut" DEFAULT 'PENDING'::public."Statut" NOT NULL,
    parcours public."Parcours"
);


--
-- Name: ResetToken; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ResetToken" (
    id text NOT NULL,
    token text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL
);


--
-- Name: SupportDeCours; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SupportDeCours" (
    id text NOT NULL,
    titre text NOT NULL,
    "cheminFichier" text NOT NULL,
    taille integer NOT NULL,
    "dateDepot" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "enseignantId" text NOT NULL,
    "matiereId" text
);


--
-- Name: UE; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UE" (
    id text NOT NULL,
    nom text NOT NULL,
    code text NOT NULL,
    coefficient double precision NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    nom text NOT NULL,
    prenom text NOT NULL,
    role public."Role" NOT NULL,
    actif boolean DEFAULT true NOT NULL,
    parcours public."Parcours" DEFAULT 'NON_DEFINI'::public."Parcours" NOT NULL,
    "typeFormation" public."TypeFormation" DEFAULT 'INITIALE'::public."TypeFormation" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "anneePromotion" integer DEFAULT 1 NOT NULL,
    "promesseEmbauche" boolean DEFAULT false NOT NULL
);


--
-- Name: _GroupeEtudiants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_GroupeEtudiants" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Data for Name: EmploiDuTemps; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."EmploiDuTemps" (id, jour, "heureDebut", "heureFin", salle, intitule, "groupeId", "enseignantId", semaine, "matiereId", "recurrenceFin", recurrent) FROM stdin;
cmq866lc000156d2evutxbp57	lundi	08:30	10:30	100	Cours de Matière 1.1	cmq866l8p000g6d2e6uiv9n3x	cmq866l6y00056d2eakshwd6v	2026-06-08 00:00:00	cmq866lac000m6d2egg0wois5	\N	f
cmq866lc300166d2eoufz9fy5	mardi	08:30	10:30	101	Cours de Matière 1.2	cmq866l9h000h6d2eiv1to15k	cmq866l7100066d2e7novk4zt	2026-06-08 00:00:00	cmq866laf000n6d2e25txglmq	\N	f
cmq866lc600176d2e1e5rmev7	mercredi	08:30	10:30	102	Cours de Matière 2.1	cmq866l9o000i6d2es8ecrrg3	cmq866l7300076d2e6utdg4dp	2026-06-08 00:00:00	cmq866lal000p6d2edtcr2dii	\N	f
cmq866lc800186d2e0gtind7q	jeudi	08:30	10:30	103	Cours de Matière 2.2	cmq866l9v000j6d2em6dlvzw7	cmq866l7500086d2evuhxmg2f	2026-06-08 00:00:00	cmq866lan000q6d2ecdmfrk1l	\N	f
cmq866lcn00196d2e5xa7p1c0	vendredi	08:30	10:30	104	Cours de Matière 3.1	cmq866la2000k6d2evhx4omc3	cmq866l7i00096d2eb7q3c34v	2026-06-08 00:00:00	cmq866lar000s6d2emaiglvpd	\N	f
\.


--
-- Data for Name: Groupe; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Groupe" (id, nom, type, "anneeScolaire") FROM stdin;
cmq866l8p000g6d2e6uiv9n3x	CM1	CM	2025-2026
cmq866l9h000h6d2eiv1to15k	TD1	TD	2025-2026
cmq866l9o000i6d2es8ecrrg3	TD2	TD	2025-2026
cmq866l9v000j6d2em6dlvzw7	TP1	TP	2025-2026
cmq866la2000k6d2evhx4omc3	TP2	TP	2025-2026
\.


--
-- Data for Name: Matiere; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Matiere" (id, nom, code, "ueId") FROM stdin;
cmq866lac000m6d2egg0wois5	Matière 1.1	MAT11	cmq866la8000l6d2ea3ufc263
cmq866laf000n6d2e25txglmq	Matière 1.2	MAT12	cmq866la8000l6d2ea3ufc263
cmq866lal000p6d2edtcr2dii	Matière 2.1	MAT21	cmq866laj000o6d2esfmn7ab7
cmq866lan000q6d2ecdmfrk1l	Matière 2.2	MAT22	cmq866laj000o6d2esfmn7ab7
cmq866lar000s6d2emaiglvpd	Matière 3.1	MAT31	cmq866lap000r6d2ejmxwjylq
cmq866las000t6d2e22gwzhq8	Matière 3.2	MAT32	cmq866lap000r6d2ejmxwjylq
cmq866law000v6d2e0pdo1001	Matière 4.1	MAT41	cmq866lau000u6d2eh2q0py3i
cmq866lax000w6d2eskqowqbd	Matière 4.2	MAT42	cmq866lau000u6d2eh2q0py3i
cmq866lb0000y6d2ehmztlm8p	Matière 5.1	MAT51	cmq866laz000x6d2e2lc8qzmk
cmq866lb2000z6d2eeyfu55fq	Matière 5.2	MAT52	cmq866laz000x6d2e2lc8qzmk
\.


--
-- Data for Name: MatiereEnseignant; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."MatiereEnseignant" ("enseignantId", "matiereId") FROM stdin;
cmq866l6y00056d2eakshwd6v	cmq866lac000m6d2egg0wois5
cmq866l6y00056d2eakshwd6v	cmq866laf000n6d2e25txglmq
cmq866l7100066d2e7novk4zt	cmq866lal000p6d2edtcr2dii
cmq866l7100066d2e7novk4zt	cmq866lan000q6d2ecdmfrk1l
cmq866l7300076d2e6utdg4dp	cmq866lar000s6d2emaiglvpd
cmq866l7300076d2e6utdg4dp	cmq866las000t6d2e22gwzhq8
cmq866l7500086d2evuhxmg2f	cmq866law000v6d2e0pdo1001
cmq866l7500086d2evuhxmg2f	cmq866lax000w6d2eskqowqbd
cmq866l7i00096d2eb7q3c34v	cmq866lb0000y6d2ehmztlm8p
cmq866l7i00096d2eb7q3c34v	cmq866lb2000z6d2eeyfu55fq
\.


--
-- Data for Name: Note; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Note" (id, valeur, "dateDepot", "etudiantId", "enseignantId", "matiereId", annee, semestre) FROM stdin;
cmq866lbp00106d2edzaz5h9r	13.505085814980326	2026-06-10 14:34:25.525	cmq866l6500006d2esoa5hff5	cmq866l6y00056d2eakshwd6v	cmq866lac000m6d2egg0wois5	2025	1
cmq866lbr00116d2e06p1c20o	19.42210639201375	2026-06-10 14:34:25.527	cmq866l6j00016d2eucn92z2d	cmq866l7100066d2e7novk4zt	cmq866laf000n6d2e25txglmq	2025	2
cmq866lbt00126d2etnw7w3fi	16.846805790827762	2026-06-10 14:34:25.529	cmq866l6n00026d2e7kl3trjt	cmq866l7300076d2e6utdg4dp	cmq866lal000p6d2edtcr2dii	2025	3
cmq866lbv00136d2etsiy95l2	10.74251430939913	2026-06-10 14:34:25.531	cmq866l6r00036d2ex93x9c8w	cmq866l7500086d2evuhxmg2f	cmq866lan000q6d2ecdmfrk1l	2025	4
cmq866lbx00146d2e52zweewd	15.773435835972139	2026-06-10 14:34:25.533	cmq866l6u00046d2ero4c9ofb	cmq866l7i00096d2eb7q3c34v	cmq866lar000s6d2emaiglvpd	2025	5
\.


--
-- Data for Name: OffreAlternance; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."OffreAlternance" (id, poste, description, duree, remuneration, prerequis, "createdAt", "updatedAt", "entrepriseId", statut, parcours) FROM stdin;
cmq866ld7001i6d2et2myaw9y	Apprenti Technicien CAO/FAO	Conception de pièces mécaniques sous SolidWorks et programmation CN.	1 an	900€/mois	Bac+2 en génie mécanique.	2026-06-10 14:34:25.579	2026-06-10 14:34:25.579	cmq866l7m000a6d2e0d07xd0w	PUBLISHED	CONCEPTION_PRODUCTION_DURABLE
cmq866lda001j6d2e82nytmu4	Apprenti Ingénieur Simulation	Développement de modèles de simulation pour des systèmes mécaniques complexes.	1 an	1000€/mois	Bac+2 en génie mécanique.	2026-06-10 14:34:25.582	2026-06-10 14:34:25.582	cmq866l7o000b6d2en4kqunga	PUBLISHED	SIMULATION_REALITE_VIRTUELLE
cmq866ldd001k6d2ejybgonmw	Apprenti Contrôle Qualité	Suivi de la qualité en production, métrologie et rédaction de rapports d'audit.	1 an	1050€/mois	Bac+2 en génie mécanique.	2026-06-10 14:34:25.585	2026-06-10 14:34:25.585	cmq866l7q000c6d2ejrfhbydn	PUBLISHED	LP_MIE
cmq866ldg001l6d2eeebjtkgo	Apprenti Méthodes Industrielles	Optimisation des process de fabrication et rédaction de gammes opératoires.	1 an	1100€/mois	Bac+2 en génie mécanique.	2026-06-10 14:34:25.588	2026-06-10 14:34:25.588	cmq866l7s000d6d2ediu8la0i	PUBLISHED	LP_MIEF
cmq866ldi001m6d2eqoq2op40	Apprenti Maintenance Robotique	Maintenance préventive et corrective de robots industriels en cellule flexible.	1 an	1050€/mois	Bac+2 en génie mécanique.	2026-06-10 14:34:25.59	2026-06-10 14:34:25.59	cmq866l7t000e6d2e8u4vpk5v	PUBLISHED	LP_MRI
\.


--
-- Data for Name: ProjetTuteure; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ProjetTuteure" (id, titre, description, prerequis, "nbEtudiants", "createdAt", "updatedAt", "entrepriseId", statut, parcours) FROM stdin;
cmq866lcz001f6d2eie0q4nhg	De la maquette numérique au prototype physique	SAE de 1ère année : concevoir une maquette numérique sous logiciel CAO puis la concrétiser en prototype physique via des procédés de fabrication adaptés (impression 3D, usinage). L'étudiant suit l'intégralité du cycle de conception-fabrication.	Bases en CAO (SolidWorks ou équivalent), notions de dessin technique.	1	2026-06-10 14:34:25.571	2026-06-10 14:34:25.571	cmq866l7m000a6d2e0d07xd0w	PUBLISHED	CONCEPTION_PRODUCTION_DURABLE
cmq866ld4001h6d2e4iwdddet	Fournir, en autonomie, une solution fonctionnelle et optimisée répondant à une demande industrielle sur l'ensemble du cycle de vie	SAE de 3e année : en totale autonomie, répondre à une commande industrielle complexe en livrant une solution complète, documentée et optimisée (coût, performance, durabilité) couvrant l'ensemble du cycle de vie du produit.	Maîtrise avancée de la CAO/FAO, expérience en gestion de projet industriel, connaissances en optimisation et analyse de cycle de vie.	1	2026-06-10 14:34:25.576	2026-06-10 14:35:44.289	cmq866l7q000c6d2ejrfhbydn	PENDING	CONCEPTION_PRODUCTION_DURABLE
cmq866ld2001g6d2ea4x8r622	Répondre, dans un cadre collaboratif, à un besoin de nature industrielle sur l'ensemble du cycle de vie	SAE de 2e année : en équipe, analyser un besoin industriel réel, proposer une solution technique intégrant les contraintes de conception, de fabrication et de maintenance sur l'ensemble du cycle de vie du produit.	Maîtrise des outils CAO/FAO, connaissances en analyse fonctionnelle et gestion de projet.	2	2026-06-10 14:34:25.574	2026-06-10 14:36:01.967	cmq866l7o000b6d2en4kqunga	PUBLISHED	LP_MIE
\.


--
-- Data for Name: ResetToken; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ResetToken" (id, token, "expiresAt", "userId") FROM stdin;
cmq866ldl001n6d2egntlrlx8	token-secret-0	2026-06-10 15:34:25.592	cmq866l6500006d2esoa5hff5
cmq866ldn001o6d2e1aqw1o3t	token-secret-1	2026-06-10 15:34:25.595	cmq866l6j00016d2eucn92z2d
cmq866ldo001p6d2esi2454hn	token-secret-2	2026-06-10 15:34:25.596	cmq866l6n00026d2e7kl3trjt
cmq866ldq001q6d2e39t11s9v	token-secret-3	2026-06-10 15:34:25.598	cmq866l6r00036d2ex93x9c8w
cmq866lds001r6d2edhq4c123	token-secret-4	2026-06-10 15:34:25.599	cmq866l6u00046d2ero4c9ofb
\.


--
-- Data for Name: SupportDeCours; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SupportDeCours" (id, titre, "cheminFichier", taille, "dateDepot", "enseignantId", "matiereId") FROM stdin;
cmq866lcp001a6d2e6f6bni4s	Support 1 - Matière 1.2	/uploads/support1.pdf	1024	2026-06-10 14:34:25.561	cmq866l7100066d2e7novk4zt	cmq866laf000n6d2e25txglmq
cmq866lcr001b6d2eigqj723u	Support 2 - Matière 2.1	/uploads/support2.pdf	2048	2026-06-10 14:34:25.563	cmq866l7300076d2e6utdg4dp	cmq866lal000p6d2edtcr2dii
cmq866lct001c6d2ewaoqvvuz	Support 3 - Matière 2.2	/uploads/support3.pdf	3072	2026-06-10 14:34:25.565	cmq866l7500086d2evuhxmg2f	cmq866lan000q6d2ecdmfrk1l
cmq866lcv001d6d2ejoj53d06	Support 4 - Matière 3.1	/uploads/support4.pdf	4096	2026-06-10 14:34:25.567	cmq866l7i00096d2eb7q3c34v	cmq866lar000s6d2emaiglvpd
cmq866lcw001e6d2e4gprvpdj	Support 5 - Matière 3.2	/uploads/support5.pdf	5120	2026-06-10 14:34:25.568	cmq866l6y00056d2eakshwd6v	cmq866las000t6d2e22gwzhq8
\.


--
-- Data for Name: UE; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UE" (id, nom, code, coefficient) FROM stdin;
cmq866la8000l6d2ea3ufc263	Unité d'Enseignement 1	UE1	1.5
cmq866laj000o6d2esfmn7ab7	Unité d'Enseignement 2	UE2	2
cmq866lap000r6d2ejmxwjylq	Unité d'Enseignement 3	UE3	2.5
cmq866lau000u6d2eh2q0py3i	Unité d'Enseignement 4	UE4	3
cmq866laz000x6d2e2lc8qzmk	Unité d'Enseignement 5	UE5	3.5
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, email, password, nom, prenom, role, actif, parcours, "typeFormation", "createdAt", "updatedAt", "anneePromotion", "promesseEmbauche") FROM stdin;
cmq866l6500006d2esoa5hff5	etudiant1@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Dupont1	Jean1	ETUDIANT	t	CONCEPTION_PRODUCTION_DURABLE	INITIALE	2026-06-10 14:34:25.325	2026-06-10 14:34:25.325	2	f
cmq866l6j00016d2eucn92z2d	etudiant2@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Dupont2	Jean2	ETUDIANT	t	SIMULATION_REALITE_VIRTUELLE	ALTERNANCE	2026-06-10 14:34:25.339	2026-06-10 14:34:25.339	3	f
cmq866l6n00026d2e7kl3trjt	etudiant3@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Dupont3	Jean3	ETUDIANT	t	CONCEPTION_PRODUCTION_DURABLE	INITIALE	2026-06-10 14:34:25.343	2026-06-10 14:34:25.343	1	f
cmq866l6r00036d2ex93x9c8w	etudiant4@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Dupont4	Jean4	ETUDIANT	t	SIMULATION_REALITE_VIRTUELLE	ALTERNANCE	2026-06-10 14:34:25.347	2026-06-10 14:34:25.347	2	f
cmq866l6u00046d2ero4c9ofb	etudiant5@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Dupont5	Jean5	ETUDIANT	t	CONCEPTION_PRODUCTION_DURABLE	INITIALE	2026-06-10 14:34:25.35	2026-06-10 14:34:25.35	3	f
cmq866l6y00056d2eakshwd6v	enseignant1@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Professeur1	Luc1	ENSEIGNANT	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.354	2026-06-10 14:34:25.354	1	f
cmq866l7100066d2e7novk4zt	enseignant2@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Professeur2	Luc2	ENSEIGNANT	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.357	2026-06-10 14:34:25.357	1	f
cmq866l7300076d2e6utdg4dp	enseignant3@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Professeur3	Luc3	ENSEIGNANT	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.359	2026-06-10 14:34:25.359	1	f
cmq866l7500086d2evuhxmg2f	enseignant4@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Professeur4	Luc4	ENSEIGNANT	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.361	2026-06-10 14:34:25.361	1	f
cmq866l7i00096d2eb7q3c34v	enseignant5@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Professeur5	Luc5	ENSEIGNANT	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.374	2026-06-10 14:34:25.374	1	f
cmq866l7m000a6d2e0d07xd0w	entreprise1@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Entreprise1	Représentant1	ENTREPRISE	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.378	2026-06-10 14:34:25.378	1	f
cmq866l7o000b6d2en4kqunga	entreprise2@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Entreprise2	Représentant2	ENTREPRISE	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.38	2026-06-10 14:34:25.38	1	f
cmq866l7q000c6d2ejrfhbydn	entreprise3@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Entreprise3	Représentant3	ENTREPRISE	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.382	2026-06-10 14:34:25.382	1	f
cmq866l7s000d6d2ediu8la0i	entreprise4@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Entreprise4	Représentant4	ENTREPRISE	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.384	2026-06-10 14:34:25.384	1	f
cmq866l7t000e6d2e8u4vpk5v	entreprise5@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Entreprise5	Représentant5	ENTREPRISE	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.385	2026-06-10 14:34:25.385	1	f
cmq866l7w000f6d2eastem0r7	admin@test.com	$2b$10$dH/2tsvCvQpaTikXjr6YwOWS6yjiwAlWUYUNxreQLhTjvMu2YLPIW	Admin	Boss	ADMIN	t	NON_DEFINI	INITIALE	2026-06-10 14:34:25.388	2026-06-10 14:34:25.388	1	f
\.


--
-- Data for Name: _GroupeEtudiants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."_GroupeEtudiants" ("A", "B") FROM stdin;
cmq866l8p000g6d2e6uiv9n3x	cmq866l6500006d2esoa5hff5
cmq866l8p000g6d2e6uiv9n3x	cmq866l6j00016d2eucn92z2d
cmq866l8p000g6d2e6uiv9n3x	cmq866l6n00026d2e7kl3trjt
cmq866l8p000g6d2e6uiv9n3x	cmq866l6r00036d2ex93x9c8w
cmq866l8p000g6d2e6uiv9n3x	cmq866l6u00046d2ero4c9ofb
cmq866l9h000h6d2eiv1to15k	cmq866l6500006d2esoa5hff5
cmq866l9h000h6d2eiv1to15k	cmq866l6j00016d2eucn92z2d
cmq866l9h000h6d2eiv1to15k	cmq866l6n00026d2e7kl3trjt
cmq866l9o000i6d2es8ecrrg3	cmq866l6r00036d2ex93x9c8w
cmq866l9o000i6d2es8ecrrg3	cmq866l6u00046d2ero4c9ofb
cmq866l9v000j6d2em6dlvzw7	cmq866l6500006d2esoa5hff5
cmq866l9v000j6d2em6dlvzw7	cmq866l6j00016d2eucn92z2d
cmq866la2000k6d2evhx4omc3	cmq866l6n00026d2e7kl3trjt
cmq866la2000k6d2evhx4omc3	cmq866l6r00036d2ex93x9c8w
cmq866la2000k6d2evhx4omc3	cmq866l6u00046d2ero4c9ofb
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e373c7e1-71e3-4f95-88bf-7a0a15f540f7	122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec	2026-06-10 16:34:24.202855+02	20260325122329_init	\N	\N	2026-06-10 16:34:24.198746+02	1
c53ebdd8-f07c-496f-958e-643a20287daf	a62e3c851e1467cb14c048693fe44463facd1f6cd228efe700c07d1df3ece754	2026-06-10 16:34:24.287072+02	20260325144355_add_groupe_parcours	\N	\N	2026-06-10 16:34:24.204417+02	1
2b76b638-fd4a-4147-a204-8d7015d99101	e655a615a5f054dbbc7e1b5276e0e6a07247f97922c2cfbb963f9f8b6df0ec3a	2026-06-10 16:34:24.325922+02	20260325163611_grill_schema_final	\N	\N	2026-06-10 16:34:24.288656+02	1
2411fc3f-5a8a-432d-9c29-9616c6a1fed8	5be6f25ea9674da12f679f8e3846098a581b33c8a19084fe5b206aa70098be76	2026-06-10 16:34:24.342409+02	20260414080509_emploi_du_temps_schema	\N	\N	2026-06-10 16:34:24.327467+02	1
2b989bea-70c5-4b26-b445-f27885654aef	c6bdc98af6f3200e452bd483a7bbde220556d3e4237de78ac229b8429824b53c	2026-06-10 16:34:24.352428+02	20260610133146_add_parcours_to_offre_alternance	\N	\N	2026-06-10 16:34:24.343919+02	1
9fe8c7f5-60bd-449b-9942-05122c1c4e68	f740059c3294b5ec6f11f92a4fa4aba624f362e22cf8bf710a9dff64fe33ce63	2026-06-10 16:34:24.358014+02	20260610135044_add_parcours_to_projet_tuteure	\N	\N	2026-06-10 16:34:24.353884+02	1
53512ca5-20b8-4445-866d-54bf1a8f7e83	c22d5781e5d2c13f813340483040f1385ec9ff539cf0835ddf49cbcdd7e748a6	2026-06-10 16:34:24.364999+02	20260610135652_add_matiere_to_support_de_cours	\N	\N	2026-06-10 16:34:24.35928+02	1
\.


--
-- Name: EmploiDuTemps EmploiDuTemps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmploiDuTemps"
    ADD CONSTRAINT "EmploiDuTemps_pkey" PRIMARY KEY (id);


--
-- Name: Groupe Groupe_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Groupe"
    ADD CONSTRAINT "Groupe_pkey" PRIMARY KEY (id);


--
-- Name: MatiereEnseignant MatiereEnseignant_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MatiereEnseignant"
    ADD CONSTRAINT "MatiereEnseignant_pkey" PRIMARY KEY ("enseignantId", "matiereId");


--
-- Name: Matiere Matiere_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Matiere"
    ADD CONSTRAINT "Matiere_pkey" PRIMARY KEY (id);


--
-- Name: Note Note_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_pkey" PRIMARY KEY (id);


--
-- Name: OffreAlternance OffreAlternance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."OffreAlternance"
    ADD CONSTRAINT "OffreAlternance_pkey" PRIMARY KEY (id);


--
-- Name: ProjetTuteure ProjetTuteure_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProjetTuteure"
    ADD CONSTRAINT "ProjetTuteure_pkey" PRIMARY KEY (id);


--
-- Name: ResetToken ResetToken_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResetToken"
    ADD CONSTRAINT "ResetToken_pkey" PRIMARY KEY (id);


--
-- Name: SupportDeCours SupportDeCours_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SupportDeCours"
    ADD CONSTRAINT "SupportDeCours_pkey" PRIMARY KEY (id);


--
-- Name: UE UE_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UE"
    ADD CONSTRAINT "UE_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _GroupeEtudiants _GroupeEtudiants_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_GroupeEtudiants"
    ADD CONSTRAINT "_GroupeEtudiants_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Matiere_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Matiere_code_key" ON public."Matiere" USING btree (code);


--
-- Name: ResetToken_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ResetToken_token_key" ON public."ResetToken" USING btree (token);


--
-- Name: UE_code_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UE_code_key" ON public."UE" USING btree (code);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _GroupeEtudiants_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_GroupeEtudiants_B_index" ON public."_GroupeEtudiants" USING btree ("B");


--
-- Name: EmploiDuTemps EmploiDuTemps_enseignantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmploiDuTemps"
    ADD CONSTRAINT "EmploiDuTemps_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: EmploiDuTemps EmploiDuTemps_groupeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmploiDuTemps"
    ADD CONSTRAINT "EmploiDuTemps_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES public."Groupe"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: EmploiDuTemps EmploiDuTemps_matiereId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmploiDuTemps"
    ADD CONSTRAINT "EmploiDuTemps_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES public."Matiere"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MatiereEnseignant MatiereEnseignant_enseignantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MatiereEnseignant"
    ADD CONSTRAINT "MatiereEnseignant_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MatiereEnseignant MatiereEnseignant_matiereId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MatiereEnseignant"
    ADD CONSTRAINT "MatiereEnseignant_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES public."Matiere"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Matiere Matiere_ueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Matiere"
    ADD CONSTRAINT "Matiere_ueId_fkey" FOREIGN KEY ("ueId") REFERENCES public."UE"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Note Note_enseignantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Note Note_etudiantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Note Note_matiereId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES public."Matiere"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OffreAlternance OffreAlternance_entrepriseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."OffreAlternance"
    ADD CONSTRAINT "OffreAlternance_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProjetTuteure ProjetTuteure_entrepriseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ProjetTuteure"
    ADD CONSTRAINT "ProjetTuteure_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ResetToken ResetToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ResetToken"
    ADD CONSTRAINT "ResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SupportDeCours SupportDeCours_enseignantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SupportDeCours"
    ADD CONSTRAINT "SupportDeCours_enseignantId_fkey" FOREIGN KEY ("enseignantId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SupportDeCours SupportDeCours_matiereId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SupportDeCours"
    ADD CONSTRAINT "SupportDeCours_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES public."Matiere"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _GroupeEtudiants _GroupeEtudiants_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_GroupeEtudiants"
    ADD CONSTRAINT "_GroupeEtudiants_A_fkey" FOREIGN KEY ("A") REFERENCES public."Groupe"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GroupeEtudiants _GroupeEtudiants_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_GroupeEtudiants"
    ADD CONSTRAINT "_GroupeEtudiants_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict nqSPrlcdtxZRMh1l4c7ZrqXLBpxbk9z2mbRARIkBOe0GKzp854ADRgYoEZgAde9

