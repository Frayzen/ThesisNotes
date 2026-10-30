---
zotflow-locked: true
zotero-key: 7NK9Q7WZ
library-id: 22103483
item-version: 575
item-tree: 453c5f71
library-version: 579
citationKey: ""
title: "Hex-Mesh Generation and Processing: A Survey"
itemType: journalArticle
creators:
  - Nico Pietroni
  - Marcel Campen
  - Alla Sheffer
  - Gianmarco Cherchi
  - David Bommes
  - Xifeng Gao
  - Riccardo Scateni
  - Franck Ledoux
  - Jean Remacle
  - Marco Livesu
publication: ACM Transactions on Graphics
date: 2023-04-30
year: 2023
url: https://dl.acm.org/doi/10.1145/3554920
doi: 10.1145/3554920
tags: []
---
# Hex-Mesh Generation and Processing: A Survey
## Abstract
> In this article, we provide a detailed survey of techniques for hexahedral mesh generation. We cover the whole spectrum of alternative approaches to mesh generation, as well as post-processing algorithms for connectivity editing and mesh optimization. For each technique, we highlight capabilities and limitations, also pointing out the associated unsolved challenges. Recent relaxed approaches, aiming to generate not pure-hex but hex-dominant meshes, are also discussed. The required background, pertaining to geometrical as well as combinatorial aspects, is introduced along the way.

## Attachments
- [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf](obsidian://zotflow?type=open-attachment&libraryID=22103483&key=ZDT3I9A4)

## Notes
## Annotations
### Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf
> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.2](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=YU2GY6VH)
> > vertices V (0-cells), edges E (1-cells), facets F (2-cells), and cells C (3-cells)
>
> <!-- ZF_ANNO_BEG_YU2GY6VH -->
> 
> <!-- ZF_ANNO_END_YU2GY6VH -->
> 
^YU2GY6VH

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.3](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=YLQAWQUE)
> > Singularities
>
> <!-- ZF_ANNO_BEG_YLQAWQUE -->
> 
> <!-- ZF_ANNO_END_YLQAWQUE -->
> 
^YLQAWQUE

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.3](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=NF5CKXYU)
> > Irregular facets simply correspond to the boundary of the mesh
>
> <!-- ZF_ANNO_BEG_NF5CKXYU -->
> 
> <!-- ZF_ANNO_END_NF5CKXYU -->
> 
^NF5CKXYU

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.3](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=X98A9ZS3)
> > Singularity Graph
>
> <!-- ZF_ANNO_BEG_X98A9ZS3 -->
> 
> <!-- ZF_ANNO_END_X98A9ZS3 -->
> 
^X98A9ZS3

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.3](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=D2ZSDHBX)
> > an interior edge incident to k 4 hexahedra, or a boundary edge incident to k 2 hexahedra
>
> <!-- ZF_ANNO_BEG_D2ZSDHBX -->
> 
> <!-- ZF_ANNO_END_D2ZSDHBX -->
> 
^D2ZSDHBX

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.3](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=XT5RR5ZN)
> > relation between primal and dual representations
>
> <!-- ZF_ANNO_BEG_XT5RR5ZN -->
> 
> <!-- ZF_ANNO_END_XT5RR5ZN -->
> 
^XT5RR5ZN

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.4](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=U7NTPTAA)
> > t follows that the entire dual complex can be viewed as an arrangement of intersecting manifold surfaces (sheets): dual vertices are formed by three intersecting sheets, chords are formed by two intersecting sheets and split into dual edges by transversely crossing sheets, sheets are split into dual facets by crossing sheets, and dual cells are the spatial compartments enclosed by sheets. Conceptually, a sheet corresponds to one layer of hexahedra in the primal mesh; how this layer is composed of individual hexahedra, however, is not defined by this sheet itself but by sheets that cross this sheet transversely. Figure 4 illustrates this primal-dual relationship.
>
> <!-- ZF_ANNO_BEG_U7NTPTAA -->
> 
> <!-- ZF_ANNO_END_U7NTPTAA -->
> 
^U7NTPTAA

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.4](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=MMYKZVIP)
> > dron could be considered an individual block (of size 1 × 1 × 1). We can distinguish conforming and non-conforming block decompositions: a block decomposition is conforming iff each side of each block coincides with one other block side (except at the mesh boundary).
>
> <!-- ZF_ANNO_BEG_MMYKZVIP -->
> 
> <!-- ZF_ANNO_END_MMYKZVIP -->
> 
^MMYKZVIP

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.4](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=KGVXU2C3)
> > This suggests a simple way to extract the base complex of a given hexahedral mesh: starting from all facets incident to any singular edge, iteratively expanding through opposite facets across regular edges until termination
>
> <!-- ZF_ANNO_BEG_KGVXU2C3 -->
> 
> <!-- ZF_ANNO_END_KGVXU2C3 -->
> 
^KGVXU2C3

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.4](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=8IMP4ZW5)
> > regular
>
> <!-- ZF_ANNO_BEG_8IMP4ZW5 -->
> 
> <!-- ZF_ANNO_END_8IMP4ZW5 -->
> 
^8IMP4ZW5

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.4](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=WD5H3F6X)
> > the rigid global structure does not allow for localized refinement
>
> <!-- ZF_ANNO_BEG_WD5H3F6X -->
> 
> <!-- ZF_ANNO_END_WD5H3F6X -->
> 
^WD5H3F6X

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.4](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=M62NS5JW)
> > semi-regular
>
> <!-- ZF_ANNO_BEG_M62NS5JW -->
> 
> <!-- ZF_ANNO_END_M62NS5JW -->
> 
^M62NS5JW

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.4](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=JU56HU59)
> > define a coarse block layout
>
> <!-- ZF_ANNO_BEG_JU56HU59 -->
> 
> <!-- ZF_ANNO_END_JU56HU59 -->
> 
^JU56HU59

> [!zotflow-highlight-#ffd400] [Pietroni et al. - 2023 - Hex-Mesh Generation and Processing A Survey.pdf, p.5](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=ZCZPYCED)
> > voxelization
>
> <!-- ZF_ANNO_BEG_ZCZPYCED -->
> 
> <!-- ZF_ANNO_END_ZCZPYCED -->
> 
^ZCZPYCED

