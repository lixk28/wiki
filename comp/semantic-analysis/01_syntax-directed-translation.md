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

属性可以进行计算和传递，**属性规则 (Attribute Rule)** 是在同一个产生式中，相关联的属性求值规则。

**属性文法 (Attribute Grammar)** 是上下文无关文法在语义上的扩展，形式上可定义为一个三元组 $A = (G, V, E)$，其中 $G$ 代表文法，$V$ 代表属性集，$E$ 代表属性规则集。

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

终结符可以拥有综合属性，但不能拥有继承属性。


:::note SDD of Arithmetic Expression Grammar

| $\textsf{Production}$             | $\textsf{Semantic Rules}$ |
| --------------------------------- | ------------------------- |
| $L \rightarrow E$                 | $print(E.val)$            |
| $E \rightarrow E_1 + T$           | $E.val = E_1.val + T.val$ |
| $E \rightarrow T$                 | $E.val = T.val$           |
| $T \rightarrow T_1 * F$           | $T.val = T_1.val * F.val$ |
| $T \rightarrow F$                 | $T.val = F.val$           |
| $F \rightarrow \lparen E \rparen$ | $F.val = E.val$           |
| $F \rightarrow num$               | $F.val = num.val$         |

:::



## Syntax-Directed Translation Scheme

**Syntax-Directed Translation Scheme (SDT, 语法制导翻译方案)** is