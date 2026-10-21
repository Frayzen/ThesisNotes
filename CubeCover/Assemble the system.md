# Start with [Equation $8$](obsidian://zotflow?type=open-attachment&libraryID=22103483&key=KY4PEIXV&navigation=%7B%22position%22%3A%7B%22pageIndex%22%3A5%2C%22rects%22%3A%5B%5B341.1420688%2C568.4483215999999%2C368.37840544%2C577.4147215999998%5D%2C%5B370.405%2C579.944475%2C375.004729%2C588.014175%5D%2C%5B374.725%2C561.9222294921875%2C378.9859918%2C568.0356914%5D%2C%5B381.325%2C568.4402%2C438.77754400000003%2C579.6184556%5D%5D%7D%2C%22selectedText%22%3A%22E(f)%20%3D%20%20%E2%88%AB%20%20V%20%20%E2%80%96%E2%88%87%20f%20%E2%88%92%20X%E2%80%962dvol%22%2C%22pageLabel%22%3A6%7D)
The energy is
$$
E(f)=\int_V \|\nabla f-X\|^2\,d\mathrm{vol}.
\tag{8}
$$

Here:
- $V$ is the tetrahedral volume domain.
- $f:V\to\mathbb R^3$ is the parameterization.
- $\nabla f$ is the Jacobian matrix of $f$.
- $X$ is the prescribed frame field, represented locally by a $3\times3$ matrix.
- The squared norm is the Frobenius norm, $\|A\|_F^2=\operatorname{tr}(A^TA)$.
The goal is to make the gradient of the parameterization as close as possible to $X$.
# Express the energy on one tetrahedron
Let $t$ be a tetrahedron with vertices $p_0,p_1,p_2,p_3$. Since $f$ is piecewise linear, its restriction to $t$ is an affine map:
$$f|_t(p)=A_t p+c_t,$$

where $A_t\in\mathbb R^{3\times3}$ is constant within the tetrahedron. Consequently,
$$\nabla f|_t=A_t.$$

The energy integral becomes a sum over tetrahedra:
$$
E(f)=\sum_{t\in V}
\int_t\|A_t-X(x)\|_F^2\,dx.
$$

If $X$ is also treated as constant on each tetrahedron, denoting its value by $X_t$, this simplifies to
$$
\boxed{
E(f)=\sum_t |t|\,
\|A_t-X_t\|_F^2
}
$$

where $|t|$ is the volume of tetrahedron $t$.
If $X$ varies within a tetrahedron, its integral must instead be evaluated or approximated using an appropriate quadrature rule.
# Express the gradient using the vertex values
Let $\phi_0,\phi_1,\phi_2,\phi_3$ be the four barycentric basis functions on tetrahedron $t$. They satisfy
$$f(p)=\sum_{i=0}^{3} f_i\phi_i(p),$$

where $f_i=f|_t(p_i)\in\mathbb R^3$.
Because each $\phi_i$ is linear, its gradient is constant on $t$. Therefore,
$$
\boxed{
A_t=\nabla f|_t
=\sum_{i=0}^{3} f_i(\nabla\phi_i)^T
}
$$

Define
$$g_i=\nabla\phi_i\in\mathbb R^3.$$

Check out [[Shape functions of tetrahedron]] in order to define $g_i$ for any given tetrahedron.
Then $A_t=\sum_i f_i g_i^T$. Substituting into the energy gives
$$
E_t=\lvert t\rvert
\left\|\sum_{i=0}^{3}f_i g_i^T-X_t\right\|_F^2.
$$

The energy is now expressed directly in terms of the unknown vertex values $f_i$.
# Differentiate the energy
For clarity, consider one scalar component $u$ of the map $f=(u,v,w)^T$. Let $u_i=u(p_i)$. Its gradient is
$$\nabla u=\sum_{j=0}^{3}u_jg_j.$$

Let $x_t\in\mathbb R^3$ be the corresponding row of $X_t$, written as a column vector. The contribution to the energy is
$$
E_t^{(u)}
=|t|\left\|\sum_j u_jg_j-x_t\right\|^2.
$$

Differentiate with respect to $u_i$:
$$
\frac{\partial E_t^{(u)}}{\partial u_i}
=2|t|\,g_i^T
\left(\sum_j u_jg_j-x_t\right).
$$

At the minimum, all these derivatives vanish. Dividing by $2|t|$, we obtain
$$
\sum_{j=0}^{3}(g_i^Tg_j)u_j
=g_i^Tx_t,
\qquad i=0,\ldots,3.
$$

These four equations can be written as a matrix system:
$$\boxed{K_t\mathbf u_t=\mathbf b_t}$$

where
$$
K_t=
|t|
\begin{bmatrix}
g_0^Tg_0 & g_0^Tg_1 & g_0^Tg_2 & g_0^Tg_3\\
g_1^Tg_0 & g_1^Tg_1 & g_1^Tg_2 & g_1^Tg_3\\
g_2^Tg_0 & g_2^Tg_1 & g_2^Tg_2 & g_2^Tg_3\\
g_3^Tg_0 & g_3^Tg_1 & g_3^Tg_2 & g_3^Tg_3
\end{bmatrix},
$$

$$
\mathbf u_t=
\begin{bmatrix}u_0\\u_1\\u_2\\u_3\end{bmatrix},
\qquad
\mathbf b_t=
|t|
\begin{bmatrix}
g_0^Tx_t\\
g_1^Tx_t\\
g_2^Tx_t\\
g_3^Tx_t
\end{bmatrix}.
$$

The factor $|t|$ can be removed from both sides of this local system when the frame field is constant on $t$. It is shown here to match the energy-weighted formulation.
# Assemble the matrix for all three components
Repeat the same derivation for $v$ and $w$. Since the squared Frobenius norm is the sum of the squared errors for all three components, the local system becomes
$$
\begin{bmatrix}
K_t&0&0\\
0&K_t&0\\
0&0&K_t
\end{bmatrix}
\begin{bmatrix}
\mathbf u_t\\
\mathbf v_t\\
\mathbf w_t
\end{bmatrix}
=
\begin{bmatrix}
\mathbf b_t^{(u)}\\
\mathbf b_t^{(v)}\\
\mathbf b_t^{(w)}
\end{bmatrix}.
$$

This is a $12\times12$ system for the 12 scalar unknowns associated with the four vertices of one tetrahedron.
For all tetrahedra, collect the unknowns into
$$
\mathbf f=(u_0,v_0,w_0,\ldots,
u_N,v_N,w_N)^T,
$$

using the paper's chosen indexing convention. Assembling all local systems gives
$$\boxed{L\mathbf f=\mathbf b.}$$

- $L$ is assembled from the local stiffness matrices $K_t$, which have entries based on dot products of barycentric gradients.
- $\mathbf b$ is assembled from the dot products between those gradients and the frame-field components.
This is why $L$ is called a Laplace matrix: its local entries have the same form as the standard finite-element discretization of the Laplacian.