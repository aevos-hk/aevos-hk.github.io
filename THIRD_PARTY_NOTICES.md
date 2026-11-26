# Third-party notices

Anatomy: BodyParts3D © The Database Center for Life Science (CC BY 4.0); female organs: Human Reference Atlas 3D Reference Organs, HuBMAP (CC BY 4.0); female body and hair: MakeHuman (CC0). Modified by open-anatomy-3d 0.1.0 (https://github.com/MervinR07/open-anatomy-3d), CC BY 4.0. Aevos re-colours and re-lights the models at run time.

Reference appearance: Microsoft Rocketbox, Copyright (c) 2020 Microsoft. The models and their source textures are `Male_Adult_02` and `Female_Adult_02` from [Microsoft Rocketbox at 0943055](https://github.com/microsoft/Microsoft-Rocketbox/tree/0943055db6ec570bcef9f2c8b41c9e5467c808f9/Assets). The [MIT licence](public/models/people/LICENSE-Rocketbox.md) ships next to the converted GLBs. Aevos removes the FBX animation and lights, adjusts UVs, derives roughness from the source specular maps, flips the normal map green channel and encodes WebP textures at two quality levels. The viewer fits the static reference appearance to the existing anatomy and adjusts the upper-arm pose, lighting and hair material at runtime. Conversion is in [scripts/people](scripts/people/).

| Component | Version | Licence |
|---|---|---|
| Mol* | 5.13.1 (two build-time edits, see scripts/vendor-molstar.mjs: dynamic code in the bundled MP4 encoder removed for CSP) | MIT, vendor/molstar/LICENSE |
| three.js | 0.187.0 | MIT |
| React, React DOM | 19.3.1 | MIT |
| PDF.js | 6.5.438 | Apache-2.0 |
| Zod | 4.6.7 | MIT |
| assistant-ui (@assistant-ui/react, conversation thread and list; brings radix-ui, zustand) | 0.15.35 | MIT |
| react-resizable-panels (three-column layout) | 4.21.0 | MIT |
| MakeHuman hair short02 and bob01, from emberlightstudios/Humentity@fd35176; each file header states CC0. Mesh SHA-256 48f979114adfa712… and d7fb73806f47ee37…; fitted by scripts/bake-hair.py | 2020 CC0 release | CC0 1.0 |
| RCSB PDB structures | see src/data/molecules.json | CC0 1.0 |
| UniProt | fetched 2026-11-24 | CC BY 4.0 |
| UBERON / Cell Ontology (EBI OLS) | fetched 2026-11-24 | CC BY 3.0 / CC BY 4.0 |
| NCBI RefSeq insulin CDS | fetched 2026-11-24 | public domain (US Gov.) |
| SMART sandbox sample data (Synthea) | live | Apache-2.0 |
