---
zotflow-locked: true
zotero-key: LXB8RX44
library-id: 22103483
item-version: 94
item-tree: 5ee65bb3
library-version: 120
citationKey: nieserUbeParameterization3D2011
title: Cube Cover – Parameterization of 3D Volumes
itemType: journalArticle
creators:
  - M. Nieser
  - U. Reitebuch
  - K. Polthier
publication: Computer Graphics Forum
date: 08/2011
year: 2011
url: https://onlinelibrary.wiley.com/doi/10.1111/j.1467-8659.2011.02014.x
doi: 10.1111/j.1467-8659.2011.02014.x
tags:
  - "#Volume_Parameterization"
---
# Cube Cover – Parameterization of 3D Volumes
## Abstract
> Despite the success of quad-based 2D surface parameterization methods, effective parameterization algorithms for 3D volumes with cubes, i.e. hexahedral elements, are still missing. CUBECOVER is a ﬁrst approach for generating a hexahedral tessellation of a given volume with boundary aligned cubes which are guided by a frame ﬁeld.

## Attachments
- [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf](obsidian://zotflow?type=open-attachment&libraryID=22103483&key=KY4PEIXV)

## Notes
## Annotations
### Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf
> [!zotflow-highlight-#ffd400] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1398](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=B8FZLPDE)
> > Most of the mentioned methods are cross-parameterization methods, i.e. they map the input volume to another predefined volume, typically a simpler geometry such as the unit ball, a cylinder, a given polycube or any other volume. To our knowledge, there is no method which computes a parameterization from the input volume into R3 without prescribing the map at the boundary. Furthermore, most present methods compute parameterizations without any singularities. As known from 2D parameterizations, singularities are essential to reduce the overall distortion.
>
> <!-- ZF_ANNO_BEG_B8FZLPDE -->
> Limitations of existing methods
> <!-- ZF_ANNO_END_B8FZLPDE -->
> 
^B8FZLPDE

> [!zotflow-highlight-#ffd400] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1399](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=SSDCEHRK)
> > Given an underlying volumetric geometry as subset V ⊂ R3 bounded by a two-dimensional closed surface M = ∂V , a volume parameterization of V is an atlas of maps f : V → R3, p → (u, v, w)T .
>
> <!-- ZF_ANNO_BEG_SSDCEHRK -->
> Mathematical definition of the parameterization
> <!-- ZF_ANNO_END_SSDCEHRK -->
> 
^SSDCEHRK

> [!zotflow-highlight-#5fb236] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1399](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=2N85Z4JX)
> > f|t = Πst f|s + gst ,
>
> <!-- ZF_ANNO_BEG_2N85Z4JX -->
> This is just another way of saying that the faces must represent the same polygon but a displacement and a rotation can be applied
> <!-- ZF_ANNO_END_2N85Z4JX -->
> 
^2N85Z4JX

> [!zotflow-highlight-#5fb236] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1400](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=CVHX6Q98)
> > Πst (called matching matrix between s and t) is an element of the chiral cubical symmetry group, i.e. any map in SO(3) which maps coordinate axes to coordinate axes. This group contains 24 different transformations.
>
> <!-- ZF_ANNO_BEG_CVHX6Q98 -->
> For example, a rotation might send
> e_x -\> e_y
> e_y -\> e_x
> e_z -\> -e_z
> <!-- ZF_ANNO_END_CVHX6Q98 -->
> 
^CVHX6Q98

> [!zotflow-highlight-#a28ae5] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1401](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=ZI36AQVD)
> > 2.3. Singularities in a Hexahedral Mesh
>
> <!-- ZF_ANNO_BEG_ZI36AQVD -->
> Skipped for now
> <!-- ZF_ANNO_END_ZI36AQVD -->
> 
^ZI36AQVD

> [!zotflow-highlight-#ffd400] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1402](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=HE4DLG23)
> > The output is a parameter map f = (u, v, w)
>
> <!-- ZF_ANNO_BEG_HE4DLG23 -->
> 
> <!-- ZF_ANNO_END_HE4DLG23 -->
> 
^HE4DLG23

> [!zotflow-highlight-#ffd400] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1402](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=QUEWGWED)
> > The user input to this parameterization step is a tet mesh V together with a frame-field X (matchings Πi j plus frames (U,V,W )) and optionally conditions at the boundary
>
> <!-- ZF_ANNO_BEG_QUEWGWED -->
> 
> <!-- ZF_ANNO_END_QUEWGWED -->
> 
^QUEWGWED

> [!zotflow-highlight-#ffd400] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1402](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=EZELHY4E)
> > f = (u0, v0, w0, . . ., uN , vN , wN )T ∈ R12·#tets
>
> <!-- ZF_ANNO_BEG_EZELHY4E -->
> 
> <!-- ZF_ANNO_END_EZELHY4E -->
> 
^EZELHY4E

> [!zotflow-highlight-#5fb236] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1402](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=V7WI2VYS)
> > The texture coordinates f|t
>
> <!-- ZF_ANNO_BEG_V7WI2VYS -->
> We call texture coordinates the projection of the coordinates of the input mesh to the "reference" domain
> <!-- ZF_ANNO_END_V7WI2VYS -->
> 
^V7WI2VYS

> [!zotflow-highlight-#ffd400] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1403](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=FP896V2A)
> > trilinear frame-field in the actual hexahedron
>
> <!-- ZF_ANNO_BEG_FP896V2A -->
> 
> <!-- ZF_ANNO_END_FP896V2A -->
> 
^FP896V2A

> [!zotflow-highlight-#ffd400] [Nieser et al. - 2011 - Cube Cover – Parameterization of 3D Volumes.pdf, p.1403](obsidian://zotflow?type=open-annotation&libraryID=22103483&key=Z88LA9HB)
> > The frame-field is evaluated at the barycenters of all inner tets providing a frame-field on the tetrahedral input mesh
>
> <!-- ZF_ANNO_BEG_Z88LA9HB -->
> 
> <!-- ZF_ANNO_END_Z88LA9HB -->
> 
^Z88LA9HB

