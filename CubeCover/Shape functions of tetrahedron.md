1. Start with the reference tetrahedron
Imagine a simple tetrahedron with vertices
$$
\hat p_0=(0,0,0),\quad
\hat p_1=(1,0,0),\quad
\hat p_2=(0,1,0),\quad
\hat p_3=(0,0,1).
$$

We call this the reference tetrahedron. Its shape functions are
$$
\hat\phi_1(\hat p)=\hat x,\quad
\hat\phi_2(\hat p)=\hat y,\quad
\hat\phi_3(\hat p)=\hat z.
$$
Because each function is 1 at its corresponding vertex and 0 at the other three.
Their gradients are particularly simple:
$$
\hat g_1=\begin{bmatrix}1\\0\\0\end{bmatrix},
\quad
\hat g_2=\begin{bmatrix}0\\1\\0\end{bmatrix},
\quad
\hat g_3=\begin{bmatrix}0\\0\\1\end{bmatrix}.
$$

These are just the three coordinate directions.
2. Transform from the reference tetrahedron to the real one
Now take an arbitrary tetrahedron with vertices $p_0,p_1,p_2,p_3$.
The mapping from reference coordinates $\hat p$ to physical coordinates $p$ is
$$p=p_0+D\hat p,$$

where
$$
D=
\begin{bmatrix}
|&|&|\\
p_1-p_0&p_2-p_0&p_3-p_0\\
|&|&|
\end{bmatrix}.
$$

$D$ transforms reference coordinates into the real tetrahedron, while $D^{-1}$ transforms back.
Rearranging,
$$\hat p=D^{-1}(p-p_0).$$

Writing the three coordinates separately gives
$$
\begin{bmatrix}
\hat x\\\hat y\\\hat z
\end{bmatrix}
=
D^{-1}(p-p_0).
$$

This is the crucial observation: the shape functions on the real tetrahedron are the reference coordinates expressed as functions of the physical point $p$.
Therefore,
$$
\phi_1(p)=\hat x,\qquad
\phi_2(p)=\hat y,\qquad
\phi_3(p)=\hat z.
$$

3. Now we can see where the gradients come from
Let's write the inverse matrix explicitly:
$$
D^{-1}=
\begin{bmatrix}
a&b&c\\
d&e&f\\
g&h&i
\end{bmatrix}.
$$

Multiplying it by $p-p_0=(x-x_0,y-y_0,z-z_0)^T$ gives
$$
\begin{aligned}
\phi_1(p)&=a(x-x_0)+b(y-y_0)+c(z-z_0),\\
\phi_2(p)&=d(x-x_0)+e(y-y_0)+f(z-z_0),\\
\phi_3(p)&=g(x-x_0)+h(y-y_0)+i(z-z_0).
\end{aligned}
$$

Recall the definition of a gradient:
$$
\nabla\phi=
\begin{bmatrix}
\partial\phi/\partial x\\
\partial\phi/\partial y\\
\partial\phi/\partial z
\end{bmatrix}.
$$

For the first shape function, differentiating with respect to $x,y,z$ gives
$$
\boxed{g_1=\nabla\phi_1=
\begin{bmatrix}a\\b\\c\end{bmatrix}.}
$$

Similarly,
$$
\boxed{g_2=
\begin{bmatrix}d\\e\\f\end{bmatrix},
\qquad
g_3=
\begin{bmatrix}g\\h\\i\end{bmatrix}.}
$$

Look carefully: the gradients are the rows of $D^{-1}$, written as column vectors.
That is why we use the transpose:
$$
\boxed{
g_i=(D^{-1})^Te_i
}
$$

where $e_i$ selects row $i$ of $D^{-1}$ and turns it into a column vector.
4. A numerical example
Suppose the tetrahedron has vertices
$$
p_0=(1,1,1),\quad
p_1=(3,1,1),\quad
p_2=(1,2,1),\quad
p_3=(1,1,4).
$$

Then
$$
D=
\begin{bmatrix}
2&0&0\\
0&1&0\\
0&0&3
\end{bmatrix},
\qquad
D^{-1}=
\begin{bmatrix}
1/2&0&0\\
0&1&0\\
0&0&1/3
\end{bmatrix}.
$$

The shape functions are
$$
\begin{aligned}
\phi_1(x,y,z)&=\frac{x-1}{2},\\
\phi_2(x,y,z)&=y-1,\\
\phi_3(x,y,z)&=\frac{z-1}{3}.
\end{aligned}
$$

Their gradients are
$$
\boxed{
g_1=\begin{bmatrix}1/2\\0\\0\end{bmatrix},
\quad
g_2=\begin{bmatrix}0\\1\\0\end{bmatrix},
\quad
g_3=\begin{bmatrix}0\\0\\1/3\end{bmatrix}.
}
$$

Notice the intuition: the tetrahedron is stretched by a factor of 2 in the $x$-direction and 3 in the $z$-direction. As a result, the corresponding shape-function gradients have magnitudes $1/2$ and $1/3$. The inverse transformation compensates for the stretching.
The takeaway
- $D$ tells you how reference-coordinate directions are transformed into physical directions.
- $D^{-1}$ expresses reference coordinates as functions of physical coordinates.
- Each row of $D^{-1}$ contains the coefficients of one shape function.
- Differentiating that shape function gives the corresponding gradient $g_i$.
Finally, the fourth shape function is
$$\phi_0=1-\phi_1-\phi_2-\phi_3,$$

so its gradient is
$$\boxed{g_0=-(g_1+g_2+g_3).}$$