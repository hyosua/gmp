--
-- PostgreSQL database dump
--

\restrict Xn0hTvgY9CtaUB82dScPTz7bzREz9XxvP9tjXWHzQNlGYwgQ0Sr2gRCOmOYKtFc

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
    "matiereId" text,
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
    statut public."Statut" DEFAULT 'PENDING'::public."Statut" NOT NULL
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
    statut public."Statut" DEFAULT 'PENDING'::public."Statut" NOT NULL
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
    "enseignantId" text NOT NULL
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
cmq7n22w90015852ewmcrkyeq	lundi	08:30	10:30	100	Cours de Matière 1.1	cmq7n22sz000g852ejy69ircm	cmq7n22rn0005852e75sp912c	2026-06-08 00:00:00	cmq7n22ui000m852eg91yx3xz	\N	f
cmq7n22wb0016852end9ahh3i	mardi	08:30	10:30	101	Cours de Matière 1.2	cmq7n22tb000h852e7p554ihg	cmq7n22rp0006852ep7xrxujf	2026-06-08 00:00:00	cmq7n22ul000n852elywzqv5c	\N	f
cmq7n22wd0017852ey6j1yvnp	mercredi	08:30	10:30	102	Cours de Matière 2.1	cmq7n22tx000i852ez364pgd9	cmq7n22rr0007852e2sy3odx5	2026-06-08 00:00:00	cmq7n22up000p852e1qcjzavh	\N	f
cmq7n22we0018852erel1spp7	jeudi	08:30	10:30	103	Cours de Matière 2.2	cmq7n22u4000j852e5i8glhon	cmq7n22rs0008852er7f175g3	2026-06-08 00:00:00	cmq7n22ur000q852ezgstv4ad	\N	f
cmq7n22wg0019852ebhgxfapz	vendredi	08:30	10:30	104	Cours de Matière 3.1	cmq7n22ua000k852ew6bc4at0	cmq7n22ru0009852egc22kdew	2026-06-08 00:00:00	cmq7n22uu000s852e3jjk1xve	\N	f
cmq7rdc410000dp2edsszo97h	lundi	08:00	10:00	109		cmq7n22ua000k852ew6bc4at0	cmq7n22rr0007852e2sy3odx5	2026-06-07 22:00:00	cmq7n22uv000t852eejasodms	\N	f
\.


--
-- Data for Name: Groupe; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Groupe" (id, nom, type, "anneeScolaire") FROM stdin;
cmq7n22sz000g852ejy69ircm	CM1	CM	2025-2026
cmq7n22tb000h852e7p554ihg	TD1	TD	2025-2026
cmq7n22tx000i852ez364pgd9	TD2	TD	2025-2026
cmq7n22u4000j852e5i8glhon	TP1	TP	2025-2026
cmq7n22ua000k852ew6bc4at0	TP2	TP	2025-2026
\.


--
-- Data for Name: Matiere; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Matiere" (id, nom, code, "ueId") FROM stdin;
cmq7n22ui000m852eg91yx3xz	Matière 1.1	MAT11	cmq7n22uf000l852eraecd012
cmq7n22ul000n852elywzqv5c	Matière 1.2	MAT12	cmq7n22uf000l852eraecd012
cmq7n22up000p852e1qcjzavh	Matière 2.1	MAT21	cmq7n22un000o852eynpivozy
cmq7n22ur000q852ezgstv4ad	Matière 2.2	MAT22	cmq7n22un000o852eynpivozy
cmq7n22uu000s852e3jjk1xve	Matière 3.1	MAT31	cmq7n22us000r852evq0va6cy
cmq7n22uv000t852eejasodms	Matière 3.2	MAT32	cmq7n22us000r852evq0va6cy
cmq7n22uy000v852evqbd46wi	Matière 4.1	MAT41	cmq7n22ux000u852eed5lg0jx
cmq7n22v0000w852eahdd7hzj	Matière 4.2	MAT42	cmq7n22ux000u852eed5lg0jx
cmq7n22v3000y852ew81gn2f0	Matière 5.1	MAT51	cmq7n22v2000x852e76ii2jes
cmq7n22v5000z852e007rb7bx	Matière 5.2	MAT52	cmq7n22v2000x852e76ii2jes
\.


--
-- Data for Name: MatiereEnseignant; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."MatiereEnseignant" ("enseignantId", "matiereId") FROM stdin;
cmq7n22rn0005852e75sp912c	cmq7n22ui000m852eg91yx3xz
cmq7n22rn0005852e75sp912c	cmq7n22ul000n852elywzqv5c
cmq7n22rp0006852ep7xrxujf	cmq7n22up000p852e1qcjzavh
cmq7n22rp0006852ep7xrxujf	cmq7n22ur000q852ezgstv4ad
cmq7n22rr0007852e2sy3odx5	cmq7n22uu000s852e3jjk1xve
cmq7n22rr0007852e2sy3odx5	cmq7n22uv000t852eejasodms
cmq7n22rs0008852er7f175g3	cmq7n22uy000v852evqbd46wi
cmq7n22rs0008852er7f175g3	cmq7n22v0000w852eahdd7hzj
cmq7n22ru0009852egc22kdew	cmq7n22v3000y852ew81gn2f0
cmq7n22ru0009852egc22kdew	cmq7n22v5000z852e007rb7bx
\.


--
-- Data for Name: Note; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Note" (id, valeur, "dateDepot", "etudiantId", "enseignantId", "matiereId", annee, semestre) FROM stdin;
cmq7n22vy0010852eavozk4k8	10.102749229412497	2026-06-10 05:39:02.302	cmq7n22q50000852esca862dt	cmq7n22rn0005852e75sp912c	cmq7n22ui000m852eg91yx3xz	2025	1
cmq7n22w00011852ews7lvm7i	12.360924473912254	2026-06-10 05:39:02.304	cmq7n22qh0001852e5559ivtn	cmq7n22rp0006852ep7xrxujf	cmq7n22ul000n852elywzqv5c	2025	2
cmq7n22w20012852etfcpzoet	15.800202626418036	2026-06-10 05:39:02.306	cmq7n22rf0002852ei4o2boqx	cmq7n22rr0007852e2sy3odx5	cmq7n22up000p852e1qcjzavh	2025	3
cmq7n22w40013852eelt4n0n1	19.827343036319277	2026-06-10 05:39:02.308	cmq7n22ri0003852esy2k7w4b	cmq7n22rs0008852er7f175g3	cmq7n22ur000q852ezgstv4ad	2025	4
cmq7n22w60014852ec3jxmklk	14.995293298613877	2026-06-10 05:39:02.31	cmq7n22rk0004852exi91hm7y	cmq7n22ru0009852egc22kdew	cmq7n22uu000s852e3jjk1xve	2025	5
\.


--
-- Data for Name: OffreAlternance; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."OffreAlternance" (id, poste, description, duree, remuneration, prerequis, "createdAt", "updatedAt", "entrepriseId", statut) FROM stdin;
cmq7n22wx001i852ezk7ufhdu	Apprenti Ingénieur Mécanique 1	Offre d'alternance chez Entreprise1 pour un poste de conception.	1 an	Selon profil	Bac+2 en génie mécanique.	2026-06-10 05:39:02.337	2026-06-10 05:39:02.337	cmq7n22s0000b852e41bf85of	PUBLISHED
cmq7n22wy001j852ex1kz4f8p	Apprenti Ingénieur Mécanique 2	Offre d'alternance chez Entreprise2 pour un poste de conception.	1 an	Selon profil	Bac+2 en génie mécanique.	2026-06-10 05:39:02.338	2026-06-10 05:39:02.338	cmq7n22s1000c852ery3lgd66	PUBLISHED
cmq7n22x0001k852efpy3oviv	Apprenti Ingénieur Mécanique 3	Offre d'alternance chez Entreprise3 pour un poste de conception.	1 an	Selon profil	Bac+2 en génie mécanique.	2026-06-10 05:39:02.34	2026-06-10 05:39:02.34	cmq7n22s3000d852e7x9wjc1k	PUBLISHED
cmq7n22x2001l852euwlc7pc9	Apprenti Ingénieur Mécanique 4	Offre d'alternance chez Entreprise4 pour un poste de conception.	1 an	Selon profil	Bac+2 en génie mécanique.	2026-06-10 05:39:02.342	2026-06-10 05:39:02.342	cmq7n22s5000e852eqsu6wcca	PUBLISHED
cmq7n22x4001m852ed3ah36tc	Apprenti Ingénieur Mécanique 5	Offre d'alternance chez Entreprise5 pour un poste de conception.	1 an	Selon profil	Bac+2 en génie mécanique.	2026-06-10 05:39:02.344	2026-06-10 05:39:02.344	cmq7n22ry000a852e0ezm0nm3	PUBLISHED
cmq7u3uuo0000hz2ei9bbgicl	test	test description	9	899	non	2026-06-10 08:56:22.512	2026-06-10 08:56:22.512	cmq7n22s0000b852e41bf85of	PENDING
cmq7uit1k0001hz2egdu76tzw	Un poste	une description	8 mois	900	aucun	2026-06-10 09:08:00.008	2026-06-10 09:08:00.008	cmq7n22s0000b852e41bf85of	PENDING
\.


--
-- Data for Name: ProjetTuteure; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ProjetTuteure" (id, titre, description, prerequis, "nbEtudiants", "createdAt", "updatedAt", "entrepriseId", statut) FROM stdin;
cmq7n22wq001f852egq7usy1n	De la maquette numérique au prototype physique	SAE de 1ère année : concevoir une maquette numérique sous logiciel CAO puis la concrétiser en prototype physique via des procédés de fabrication adaptés (impression 3D, usinage). L'étudiant suit l'intégralité du cycle de conception-fabrication.	Bases en CAO (SolidWorks ou équivalent), notions de dessin technique.	1	2026-06-10 05:39:02.33	2026-06-10 05:39:02.33	cmq7n22ry000a852e0ezm0nm3	PUBLISHED
cmq7n22ws001g852eqsp28cmr	Répondre, dans un cadre collaboratif, à un besoin de nature industrielle sur l'ensemble du cycle de vie	SAE de 2e année : en équipe, analyser un besoin industriel réel, proposer une solution technique intégrant les contraintes de conception, de fabrication et de maintenance sur l'ensemble du cycle de vie du produit.	Maîtrise des outils CAO/FAO, connaissances en analyse fonctionnelle et gestion de projet.	1	2026-06-10 05:39:02.332	2026-06-10 05:39:02.332	cmq7n22s0000b852e41bf85of	PUBLISHED
cmq7n22wu001h852e37ynpttc	Fournir, en autonomie, une solution fonctionnelle et optimisée répondant à une demande industrielle sur l'ensemble du cycle de vie	SAE de 3e année : en totale autonomie, répondre à une commande industrielle complexe en livrant une solution complète, documentée et optimisée (coût, performance, durabilité) couvrant l'ensemble du cycle de vie du produit.	Maîtrise avancée de la CAO/FAO, expérience en gestion de projet industriel, connaissances en optimisation et analyse de cycle de vie.	1	2026-06-10 05:39:02.334	2026-06-10 05:39:02.334	cmq7n22s1000c852ery3lgd66	PENDING
\.


--
-- Data for Name: ResetToken; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ResetToken" (id, token, "expiresAt", "userId") FROM stdin;
cmq7n22x6001n852ebu2krvwj	token-secret-0	2026-06-10 06:39:02.345	cmq7n22q50000852esca862dt
cmq7n22x8001o852e0utsccwf	token-secret-1	2026-06-10 06:39:02.348	cmq7n22qh0001852e5559ivtn
cmq7n22xa001p852e2ga8msw9	token-secret-2	2026-06-10 06:39:02.349	cmq7n22rf0002852ei4o2boqx
cmq7n22xb001q852eum0m4uzu	token-secret-3	2026-06-10 06:39:02.351	cmq7n22ri0003852esy2k7w4b
cmq7n22xd001r852ecsvsks2c	token-secret-4	2026-06-10 06:39:02.353	cmq7n22rk0004852exi91hm7y
\.


--
-- Data for Name: SupportDeCours; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SupportDeCours" (id, titre, "cheminFichier", taille, "dateDepot", "enseignantId") FROM stdin;
cmq7n22wi001a852egoapp6lg	Support 1 - Matière 1.2	/uploads/support1.pdf	1024	2026-06-10 05:39:02.322	cmq7n22rp0006852ep7xrxujf
cmq7n22wk001b852ekjenl916	Support 2 - Matière 2.1	/uploads/support2.pdf	2048	2026-06-10 05:39:02.324	cmq7n22rr0007852e2sy3odx5
cmq7n22wl001c852edzw5m2pi	Support 3 - Matière 2.2	/uploads/support3.pdf	3072	2026-06-10 05:39:02.325	cmq7n22rs0008852er7f175g3
cmq7n22wn001d852ewq0mq5w7	Support 4 - Matière 3.1	/uploads/support4.pdf	4096	2026-06-10 05:39:02.327	cmq7n22ru0009852egc22kdew
cmq7n22wo001e852etyl4ebmk	Support 5 - Matière 3.2	/uploads/support5.pdf	5120	2026-06-10 05:39:02.328	cmq7n22rn0005852e75sp912c
cmq7woon500003i2ey114ldsh	stack-technique.pdf	public/support/stack-technique.pdf	60420	2026-06-10 10:08:33.474	cmq7n22rn0005852e75sp912c
\.


--
-- Data for Name: UE; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UE" (id, nom, code, coefficient) FROM stdin;
cmq7n22uf000l852eraecd012	Unité d'Enseignement 1	UE1	1.5
cmq7n22un000o852eynpivozy	Unité d'Enseignement 2	UE2	2
cmq7n22us000r852evq0va6cy	Unité d'Enseignement 3	UE3	2.5
cmq7n22ux000u852eed5lg0jx	Unité d'Enseignement 4	UE4	3
cmq7n22v2000x852e76ii2jes	Unité d'Enseignement 5	UE5	3.5
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, email, password, nom, prenom, role, actif, parcours, "typeFormation", "createdAt", "updatedAt", "anneePromotion", "promesseEmbauche") FROM stdin;
cmq7n22q50000852esca862dt	etudiant1@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Dupont1	Jean1	ETUDIANT	t	CONCEPTION_PRODUCTION_DURABLE	INITIALE	2026-06-10 05:39:02.093	2026-06-10 05:39:02.093	2	f
cmq7n22qh0001852e5559ivtn	etudiant2@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Dupont2	Jean2	ETUDIANT	t	SIMULATION_REALITE_VIRTUELLE	ALTERNANCE	2026-06-10 05:39:02.105	2026-06-10 05:39:02.105	3	f
cmq7n22rf0002852ei4o2boqx	etudiant3@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Dupont3	Jean3	ETUDIANT	t	CONCEPTION_PRODUCTION_DURABLE	INITIALE	2026-06-10 05:39:02.139	2026-06-10 05:39:02.139	1	f
cmq7n22ri0003852esy2k7w4b	etudiant4@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Dupont4	Jean4	ETUDIANT	t	SIMULATION_REALITE_VIRTUELLE	ALTERNANCE	2026-06-10 05:39:02.142	2026-06-10 05:39:02.142	2	f
cmq7n22rk0004852exi91hm7y	etudiant5@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Dupont5	Jean5	ETUDIANT	t	CONCEPTION_PRODUCTION_DURABLE	INITIALE	2026-06-10 05:39:02.144	2026-06-10 05:39:02.144	3	f
cmq7n22rn0005852e75sp912c	enseignant1@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Professeur1	Luc1	ENSEIGNANT	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.147	2026-06-10 05:39:02.147	1	f
cmq7n22rr0007852e2sy3odx5	enseignant3@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Professeur3	Luc3	ENSEIGNANT	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.151	2026-06-10 05:39:02.151	1	f
cmq7n22rs0008852er7f175g3	enseignant4@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Professeur4	Luc4	ENSEIGNANT	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.153	2026-06-10 05:39:02.153	1	f
cmq7n22ry000a852e0ezm0nm3	entreprise1@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Entreprise1	Représentant1	ENTREPRISE	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.158	2026-06-10 05:39:02.158	1	f
cmq7n22s0000b852e41bf85of	entreprise2@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Entreprise2	Représentant2	ENTREPRISE	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.16	2026-06-10 05:39:02.16	1	f
cmq7n22s1000c852ery3lgd66	entreprise3@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Entreprise3	Représentant3	ENTREPRISE	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.161	2026-06-10 05:39:02.161	1	f
cmq7n22s3000d852e7x9wjc1k	entreprise4@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Entreprise4	Représentant4	ENTREPRISE	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.163	2026-06-10 05:39:02.163	1	f
cmq7n22s5000e852eqsu6wcca	entreprise5@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Entreprise5	Représentant5	ENTREPRISE	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.165	2026-06-10 05:39:02.165	1	f
cmq7n22s7000f852ewxcaepsc	admin@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Admin	Boss	ADMIN	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.167	2026-06-10 05:39:02.167	1	f
cmq7n22ru0009852egc22kdew	enseignant5@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Professeur5	Luc5	ADMIN	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.155	2026-06-10 07:23:49.554	1	f
cmq7n22rp0006852ep7xrxujf	enseignant2@test.com	$2b$10$UdlLTU4ZogaTtncYLf5GCO.wHPKv9./vNBQZ5sokf9lneBB4PWHcW	Professeur2	Luc2	ENSEIGNANT	t	NON_DEFINI	INITIALE	2026-06-10 05:39:02.149	2026-06-10 07:25:23.68	1	f
\.


--
-- Data for Name: _GroupeEtudiants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."_GroupeEtudiants" ("A", "B") FROM stdin;
cmq7n22sz000g852ejy69ircm	cmq7n22q50000852esca862dt
cmq7n22sz000g852ejy69ircm	cmq7n22qh0001852e5559ivtn
cmq7n22sz000g852ejy69ircm	cmq7n22rf0002852ei4o2boqx
cmq7n22sz000g852ejy69ircm	cmq7n22ri0003852esy2k7w4b
cmq7n22sz000g852ejy69ircm	cmq7n22rk0004852exi91hm7y
cmq7n22tb000h852e7p554ihg	cmq7n22q50000852esca862dt
cmq7n22tb000h852e7p554ihg	cmq7n22qh0001852e5559ivtn
cmq7n22tb000h852e7p554ihg	cmq7n22rf0002852ei4o2boqx
cmq7n22tx000i852ez364pgd9	cmq7n22ri0003852esy2k7w4b
cmq7n22tx000i852ez364pgd9	cmq7n22rk0004852exi91hm7y
cmq7n22u4000j852e5i8glhon	cmq7n22q50000852esca862dt
cmq7n22u4000j852e5i8glhon	cmq7n22qh0001852e5559ivtn
cmq7n22ua000k852ew6bc4at0	cmq7n22rf0002852ei4o2boqx
cmq7n22ua000k852ew6bc4at0	cmq7n22ri0003852esy2k7w4b
cmq7n22ua000k852ew6bc4at0	cmq7n22rk0004852exi91hm7y
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8864cef7-e5f0-4fac-88e6-6d9f943e6e63	122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec	2026-06-10 07:39:00.910576+02	20260325122329_init	\N	\N	2026-06-10 07:39:00.907604+02	1
c2056a97-d97b-45ae-bc08-d84f6a2025c0	a62e3c851e1467cb14c048693fe44463facd1f6cd228efe700c07d1df3ece754	2026-06-10 07:39:00.98879+02	20260325144355_add_groupe_parcours	\N	\N	2026-06-10 07:39:00.91163+02	1
923c4656-924e-4d0f-969c-df5a7201a829	e655a615a5f054dbbc7e1b5276e0e6a07247f97922c2cfbb963f9f8b6df0ec3a	2026-06-10 07:39:01.029041+02	20260325163611_grill_schema_final	\N	\N	2026-06-10 07:39:00.989892+02	1
6e952efd-ecdb-4848-9253-ab004ec309d6	5be6f25ea9674da12f679f8e3846098a581b33c8a19084fe5b206aa70098be76	2026-06-10 07:39:01.047064+02	20260414080509_emploi_du_temps_schema	\N	\N	2026-06-10 07:39:01.031098+02	1
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
    ADD CONSTRAINT "EmploiDuTemps_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES public."Matiere"(id) ON UPDATE CASCADE ON DELETE SET NULL;


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

\unrestrict Xn0hTvgY9CtaUB82dScPTz7bzREz9XxvP9tjXWHzQNlGYwgQ0Sr2gRCOmOYKtFc

