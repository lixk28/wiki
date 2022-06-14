---
id: syntax-directed-translation
sidebar_position: 1
---

# Syntax-Directed Translation

## Syntax-Directed Definition

**属性 (Attribute)** 代表与文法符号相关的信息，主要指语义信息 (比如类型、值、地址等)，文法产生式中的每个文法符号都附有若干个属性。

If $X$ is a symbol and $a$ is one of its attributes, then we write $X.a$ to denote tha value of $a$ at a particular parse-tree node labeled $X$.

:::question How to Implement Attributes?

If we implement the nodes of the parse tree by records or objects (a `struct` in C for instance), then the attributes of $X$ can be implemented by data fields in the records that represent the nodes for $X$.

:::

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

:::question What's the difference between SDD and SDT?

SDD just defines the attributes of grammar symbols and semantic rules associated with productions, attributes and rules are attached to productions.

SDT specifies the position and execution order of each semantic rules, semantic rules are embedded in the rhs of productions, making them semantic actions.

SDD 只定义了语法属性和语义规则，SDT 进一步确定了语义规则在每一个产生式中具体的实施顺序。

:::

In practice, syntax-directed translation may involves **side effects (副作用)**, they are additional actions besides attribute calculations (属性值计算之外的动作或功能).
- A calculator may print the result of an expression. (计算器输出表达式的值)
- A code generator may add the type of an identifier to the symbol table. (翻译过程中添加标识符到符号表)

**Attribute grammar (属性文法)** is a SDD with no side effects (没有副作用的 SDD). The value of an attribute is purely defined by the values of other attributes and constants.

**Anotated parse tree (标注分析树)** is a parse tree showing the values of its attributes.
- Each node shows its attribute values.
- Actions can also be annotated.
