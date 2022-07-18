---
id: syntax-directed-translation
sidebar_position: 1
---

import Highlight from '@site/src/components/Highlight';

# Syntax-Directed Translation

## Syntax-Directed Definition

**属性 (Attribute)** 代表与文法符号相关的信息，主要指语义信息 (比如类型、值、地址等)，文法产生式中的每个文法符号都附有若干个属性。

If $X$ is a symbol and $a$ is one of its attributes, then we write $X.a$ to denote tha value of $a$ at a particular parse-tree node labeled $X$.

<details>

<summary>How to Implement Attributes?</summary>

If we implement the nodes of the parse tree by records or objects (a `struct` in C for instance), then the attributes of $X$ can be implemented by data fields in the records that represent the nodes for $X$.

</details>

A **Syntax-Directed Definition (SDD, 语法制导定义)** is a context-free grammar together with attributes and rules.
- Attributes are asscociated with grammar symbols. (文法符号和语义属性相关联)
- Rules are associated with productions. (产生式和语义规则相关联)

非终结符的属性可以分为两类，对于位于语法树节点 $N$ 的非终结符 $A$：
- **综合属性 (Synthesized Attribute)**
  - Defined by a semantic rule associated with <u>the production at $N$</u>. The production must have $A$ as its head.
  - A synthesized attribute of node $N$ is defined only by attribute values of $N$'s children and $N$ itself. (由子节点和自身确定)
- **继承属性 (Inherited Attribute)**
  - Defined by a semantic rule associated with <u>the production at the parent of $N$</u>. The production must have $A$ as a symbol in its body.
  - An inherited attribute of node $N$ is defined only by attribute values of $N$'s parent, $N$ itself and $N$'s siblings. (由父节点、自身和兄弟节点确定)

综合属性用于自底向上求值，继承属性用于自顶向下求值。

终结符可以拥有综合属性，但没有继承属性，终结符的综合属性可以从词法分析阶段获得 (比如数字的值)。


:::note SDD of Arithmetic Expression Grammar

| $\textsf{Production}$             | $\textsf{Semantic Rules}$ |
| --------------------------------- | ------------------------- |
| $L \rightarrow E$                 | $print(E.val)$            |
| $E \rightarrow E + T$             | $E.val = E_1.val + T.val$ |
| $E \rightarrow T$                 | $E.val = T.val$           |
| $T \rightarrow T * F$             | $T.val = T_1.val * F.val$ |
| $T \rightarrow F$                 | $T.val = F.val$           |
| $F \rightarrow \lparen E \rparen$ | $F.val = E.val$           |
| $F \rightarrow num$               | $F.val = num.val$         |

:::

## Syntax-Directed Translation Scheme

**Syntax-Directed Translation Scheme (SDT, 语法制导翻译方案)** is a context-free grammar with program fragments embedded within production bodies.
- The program fragments are called **semantic actions (语义动作)**, they can appear at any position within a production body.
- By convention, we place curly braces around actions.

Typically, SDT is implemented during parsing, but you can also first build a parse tree and then perform the SDT actions in preorder traversal of the parse tree.

:::note An Example of Type Declaration

Grammar ($\textbf{int}$ declaration):
$$
  \begin{aligned}
    D &\rightarrow T \ L \\
    T &\rightarrow \textbf{int} \\
    L &\rightarrow L, \ \textbf{id} \\
    L &\rightarrow \textbf{id} \\
  \end{aligned}
$$

SDD:
$$
  \begin{aligned}
    D &\rightarrow T \ L \quad &&\lbrace L.type = T.type \rbrace \\
    T &\rightarrow \textbf{int} \quad &&\lbrace T.type = \text{integer} \rbrace \\
    L &\rightarrow L, \ \textbf{id} \quad &&\lbrace L_1.type = L.type \rbrace, \lbrace \text{add\_type}(\textbf{id}, L.type) \rbrace \\
    L &\rightarrow \textbf{id} \quad &&\lbrace \text{add\_type}(\textbf{id}, L.type) \rbrace
  \end{aligned}
$$

SDT:
$$
  \begin{aligned}
    D &\rightarrow T \ \lbrace L.type = T.type \rbrace \ L \\
    T &\rightarrow \textbf{int} \ \lbrace T.type = \text{integer} \rbrace \\
    L &\rightarrow \lbrace L_1.type = L.type \rbrace \ L, \lbrace \text{add\_type}(\textbf{id}, L.type) \rbrace \ \textbf{id} \\
    L &\rightarrow \lbrace \text{add\_type}(\textbf{id}, L.type) \rbrace \textbf{id}
  \end{aligned}
$$

$\text{add\_type}(\textbf{id}, \text{type})$ means that add an entry $(\textbf{id}, \text{type})$ to the symbol table.

:::

<details>

<summary>What's the difference between SDD and SDT?</summary>

SDD just defines the attributes of grammar symbols and semantic rules associated with productions, attributes and rules are attached to productions.

SDT specifies the position and execution order of each semantic rules, semantic rules are embedded in the rhs of productions, making them semantic actions.

SDD 只定义了语法属性和语义规则，SDT 进一步确定了语义规则在每一个产生式中具体的实施顺序。

</details>

In practice, syntax-directed translation may involves **side effects (副作用)**, they are additional actions besides attribute calculations (属性值计算之外的动作或功能).
- A calculator may print the result of an expression. (计算器输出表达式的值)
- A code generator may add the type of an identifier to the symbol table. (翻译过程中添加标识符到符号表)

An **attribute grammar (属性文法)** is a SDD with no side effects (没有副作用的 SDD). The value of an attribute is purely defined by the values of other attributes and constants.

An **anotated parse tree (标注分析树)** is a parse tree showing the values of its attributes.
- Each node shows its attribute values.
- Actions can also be annotated.

## Evaluation Orders for SDD

### Dependency Graph

A **dependency graph (依赖图)** is a directed graph where edges are dependence relationships between attributes.
- While the annotated parse tree shows the value of attributes, a dependency graph determines the computation order of those values. (决定属性值的计算顺序)
- It depicts the flow of information among the attribute instances in a particular parse tree (描述了分析树的属性信息流).

Constructing the dependency graph:
- For each parse tree node labeled by grammar symbol $X$, there's a graph node for each attribute of $X$.
- If attribute $X.a$ depends on attribute $Y.b$, then there's one directed edge from $Y.b$ to $X.a$.

Ordering the evaluation of attributes:
- If the graph has an edge from node $M$ to node $N$, then the attribute associated with $M$ must be eavluated before $N$. (依赖图中存在由 $M$ 指向 $N$ 的边 $(M, N)$，则节点 $M$ 对应属性值必须在 $N$ 之前计算)
- The allowable orders of evaluation are those sequence of nodes $N_1, N_2, \dots, N_k$ such that if there is an edge of the graph from $N_i$ to $N_j$, then $i < j$. This is called a topological sort (拓扑排序) of a graph.
  - If there is any cycle in the dependency graph, then there are no topological sorts, there is no way to evaluate the attributes in the parse tree. (依赖图有环，不存在拓扑排序，属性值的计算顺序无法确定)
  - If there are no cycles in the dependency graph, then there is always at least one topological sort. (依赖图无环，存在拓扑排序，一定可以确定属性值的计算顺序)

<details>

<summary>Topological Sort</summary>

不断选取入度为 0 的节点，将它们从图中删去的同时，令它们指向的节点的入度减 1。

```algorithm title="Kahn's algorithm"
L ← Empty list that will contain the sorted elements
S ← Set of all nodes with no incoming edge

while S is not empty do
    remove a node n from S
    add n to L
    for each node m with an edge e from n to m do
        remove edge e from the graph
        if m has no other incoming edges then
            insert m into S

if graph has edges then
    return error   (graph has at least one cycle)
else
    return L   (a topologically sorted order)
```

</details>

Before evaluating an attribute at a node of a parse tree, we must evaluate all attributes it depends on, it is difficult to tell whether there exsit any parse trees whose dependency graphs have cycles. (在开始属性值计算之前，必须确定属性值的依赖关系，循环依赖非常难确定)

But in practice, translations can be implemented using classes of SDD's that guarantee an evaluation order, they do not permit dependency graphs with cycles. (实践中一般使用某类 SDD，可以保证计算的顺序，不会产生循环依赖)

Moreover, the two classes introduced later can be implemented efficiently in connection with top-down or bottom-up parsing. (可以高效地与自顶向下或自底向上分析联系起来实现)

### S-Attributed Definitions

An SDD is **S-attributed (S-属性)** if <u>every attribute is synthesized</u>. (所有的属性都是综合属性)

The attributes of S-SDD can be evaluated in any bottom-up order of the nodes in the parse tree. (可以按照任何自底向上的顺序计算属性值)

It is simple to evaluate the attributes of S-SDD by performing a postorder traversal of the parse tree. It can be also implemented during bottom-up parsing. (可以后序遍历语法树实现，也可以在自底向上分析中实现)

### L-Attributed Definitions

An SDD is **L-attributed (L-属性)** if for any attributes associated with a production body, the edges in dependency graph can go from <u>left to right</u>, but not from right to left. (依赖图的边只能从左到右)

More precisely, each attribute must satisfy one of the rules below:
- The attribute is synthesized.
- The attribute is inherited, but with the rules limited as follows. Suppose that there is a production $A \rightarrow X_1 X_2 \cdots X_n$, and that there is an inherited attribute $X_i.a$ computed by a rule associated with this production. $X_i.a$ may only depends on:
  - Inherited attributes associated with $A$ (<Highlight color="#3578e5">cannot be synthesized!</Highlight> If $X_i.a$ depends on $A.s$, $A.s$ depends on $X_i.a$, then there is a cycle).
  - Either synthesized or inherited attributes of $X_1, X_2, \dots, X_{i-1}$ located to the <Highlight color="#3578e5">left</Highlight> of $X_i$.
  - Either synthesized or inherited attributes of $X_i$ itself, but <Highlight color="#3578e5">no cycles</Highlight> formed by the attributes of this $X_i$.

L-SDD can be implemented during top-down parsing.

:::note Example

Consider the following simple SDD:

| $\textsf{Production Rules}$ | $\textsf{Semantic Rules}$        |
| --------------------------- | -------------------------------- |
| $A \rightarrow B \ C$       | $A.s = B.b \\ B.i = f(C.c, A.s)$ |

It is neither S-SDD or L-SDD. Consider the rule $B.i = f(C.c, A.s)$:
- $B.i$ is an inherited attribute, because it depends on $A.s$, which is an attribute of its parent, so it is not S-SDD.
- $C.c$ is located to the right of $B$ in the production, and $B.i$ depends on the synthesized attribute $A.s$ of $A$, so it is not L-SDD.

:::

## Implmentations of Syntax-Directed Translation

SDT can be implemented in two ways:
- Traversing the parse tree
  - First build the parse tree, then apply rules or actions at each node when traversing the tree (two pass).
  - <Highlight color="#3578e5">All</Highlight> SDDs (without cycles) and SDTs can be implemented using this approach. Because the tree can be traversed freely.
- Implemented during parsing
  - Apply rules or actions at each production while parsing (one pass).
  - <Highlight color="#3578e5">Only a subset</Highlight> of SDDs and SDTs can be implemented. Evaluation order for attributes is restricted to parser derivation order.

Typically, <u>SDT (or semantic analysis) is done during parsing</u>, without building a parse tree explicitly, which saves both time and memory.

Two import classes of SDD:
- S-attributed SDD, the underlying grammar is LR-parsable.
- L-attributed SDD, the underlying grammar is LL-parsable.

### Implementation of S-attributed SDD

Convert S-attributed SDD to SDT by placeing each rule or action at the end of the production. Each action will be executed along with the reduction of that production. (将每个语义动作都放在产生式的后面，当使用产生式进行归约时，同时执行相关联的语义动作)

SDT with all actions at the right ends of the production bodies are called **postfix SDT (后缀/尾部 SDT)**.

:::note Example

Postfix SDT implementing calculator
$$
  \begin{aligned}
    L &\rightarrow E \quad &&\lbrace \text{print}(E.val) \rbrace \\
    E &\rightarrow E + T \quad &&\lbrace E.val = E_1.val + T.val \rbrace \\
    E &\rightarrow E - T \quad &&\lbrace E.val = E_1.val - T.val \rbrace \\
    E &\rightarrow T \quad &&\lbrace E.val = T.val \rbrace \\
    T &\rightarrow T * F \quad &&\lbrace T.val = T_1.val \times F.val \rbrace \\
    T &\rightarrow T \ / \ F \quad &&\lbrace T.val = T_1.val \ / \ F.val \rbrace \\
    T &\rightarrow F \quad &&\lbrace T.val = F.val \rbrace \\
    F &\rightarrow \lparen E \rparen \quad &&\lbrace F.val = E.val \rbrace \\
    F &\rightarrow \textbf{digit} \quad &&\lbrace F.val = \textbf{digit}.lexval \rbrace
  \end{aligned}
$$

:::

Postfix SDT can be implemented during LR parsing by executing the actions when reductions occur.
- Place the attributes along with the grammar symbols in records on stack (LR states stack).
- It is better to put pointers to records on the stack.

:::note Example



:::

### Implementation of L-attributed SDD

Convert L-attributed SDD to SDT:
- Embed the action that computes the inherited attributes for a nonterminal $A$ immediately before that occurrence of $A$ in the body of that production. (将计算非终结符 $A$ 的继承属性的语义动作插入到产生式右部紧靠 $A$ 之前)
- Place the actions that compute a synthesized attribute for the head of a production at the end of the body of that production. (将计算产生式左部符号的综合属性的语义动作放在产生式的末尾)

:::note Example

L-attributed SDD for arithmetic expressions:

| $\textsf{Production}$                      | $\textsf{Semantic Rules}$ |
| ------------------------------------------ | ------------------------- |
| $L \rightarrow E$                          | $\text{print}(E.val)$ |
| $E \rightarrow T \ E^{\prime}$             | $E.val = E^{\prime}.syn \\ E^{\prime}.inh = T.val$ |
| $E^{\prime} \rightarrow + T \ E^{\prime}$  | $E^{\prime}.syn = E^{\prime}_1.syn \\ E^{\prime}_1.inh = E^{\prime}.inh + T.val$ |
| $E^{\prime} \rightarrow \epsilon$          | $E^{\prime}.syn = E^{\prime}.inh$ |
| $T \rightarrow F \ T^{\prime}$             | $T.val = T^{\prime}.syn \\ T^{\prime}.inh = F.val$ |
| $T^{\prime} \rightarrow * F \ T^{\prime}$  | $T^{\prime}.syn = T^{\prime}_1.syn \\ T^{\prime}_1.inh = T^{\prime}inh * F.val$ |
| $T^{\prime} \rightarrow \epsilon$          | $T^{\prime}.syn = T^{\prime}.inh$ |
| $F \rightarrow \lparen E \rparen$          | $F.val = E.val$ |
| $F \rightarrow \textbf{digit}$             | $F.val = \textbf{digit}.val$ |

Its SDT:
$$
  \begin{aligned}
    L &\rightarrow E \ \lbrace \text{print}(E.val) \rbrace \\
    E &\rightarrow T \ \lbrace E^{\prime}.inh = T.val \rbrace \ E^{\prime} \ \lbrace E.val = E^{\prime}.syn \rbrace \\
    E^{\prime} &\rightarrow + T \ \lbrace E_1^{\prime}.inh = E^{\prime}.inh + T.val \rbrace \ E^{\prime} \ \lbrace E^{\prime}.syn = E_1^{\prime}.syn \rbrace \\
    E^{\prime} &\rightarrow \epsilon \ \lbrace E^{\prime}.syn = E^{\prime}.inh \rbrace \\
    T &\rightarrow F \ \lbrace T^{\prime}.inh = F.val \rbrace \ T^{\prime} \ \lbrace T.val = T^{\prime}.syn \rbrace \\
    T^{\prime} &\rightarrow * F \ \lbrace T_1^{\prime}.inh = T^{\prime}.inh * F.val \rbrace \ T^{\prime} \ \lbrace T^{\prime}.syn = T_1^{\prime}.syn \rbrace \\
    T^{\prime} &\rightarrow \epsilon \ \lbrace T^{\prime}.syn = T^{\prime}.inh \rbrace \\
    F &\rightarrow \lparen E \rparen \ \lbrace F.val = E.val \rbrace \\
    F &\rightarrow \textbf{digit} \ \lbrace F.val = \textbf{digit}.val \rbrace
  \end{aligned}
$$

:::

## Semantic Translation during Parsing

If the grammar is LL-parsable, then the SDT can be implemented during LL or LR parsing.
- Semantic Translation during LL parsing
  - Recursive descent parser: Augment non-terminal functions to both parse and handle attributes
  - Predictive parser: Extend the parser stack to hold actions and certain data items needed for attribute evaluation
- Semantic Translation during LR parsing
  - Involve marker to rewrite grammar

### Semantic Translation during Recursive Descent Parsing

A recursive descent parser has a function for each nonterminal $A$:
- Synthesized attributes: Evaluate at end of function as <Highlight color="#3578e5">return value</Highlight>
- Inherited attributes: Pass as <Highlight color="#3578e5">arguments</Highlight> to function
  - Values may come from parent or siblings
  - L-attributed SDD guarantees they have been computed

:::note Example



:::

### Semantic Translation during Predictive Parsing

Extend the parse stack to hold actions and certain data items needed for attribute evaluation. (扩展语法分析栈)
- Action-record (动作记录): Represent the actions to be executed
- Synthesized-record (综合记录): Hold synthesized attributes for non-terminals

Manage attributes on stack:
- The inherited attributes of a nonterminal $A$ are placed in the stack record that represents that nonterminal
- The synthesized attributes of a nonterminal $A$ are placed in a seperate synthesized-record that is implemented below $A$

:::note Example



:::

### Semantic Translation during LR Parsing

This part is so fxxking confusing!

A **marker (标记符号)** is a nonterminal marking a location equidistant from the symbol that has an inherited attribute.
