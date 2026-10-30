- Irregular face = boundary face
- Singularity graph = set of irregular edges
- Conforming block decomposition : iff each side of each block coincides with one other block side (except at the mesh boudnary)


This suggests a simple way to extract the base complex of a given hexahedral mesh: starting from all facets incident to any singular edge, iteratively expanding through opposite facets across regular edges until termination