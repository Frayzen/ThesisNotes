# Links
- [[Cube Cover – Parameterization of 3D Volumes]]
- [My Implementation Repository](https://github.com/Frayzen/CubeCover)

# Pipeline
[[CubeCoverPipeline]]
# Thoughts
- The method is dealing with two spaces. The input (reference) mesh is made of tets. The output (destination) mesh tries to fit as good as possible the cartesian grid and is made regular axis-aligned hexaedras. 
- We aim to deduce the shape of the output mesh based on the frame field where each tet introduces a frame. Each frame can be described as a vector representing the component-wise gradient field.
## Specific sections
- [[Shape functions of tetrahedron]]
- [[Assemble the system]]