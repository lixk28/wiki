---
id: context-free-grammar
sidebar_position: 1
---

# Context-Free Grammars

## The Formal Definition of a Context-Free Grammar

一个 **上下文无关文法 (CFG, Context-Free Grammar)** $G$ 是一个四元组 $(T, NT, S, P)$，其中：
- $T$：**终结符集 / 单词集 (Terminals / Terminal Symbols)**，就是词法分析中的 token，是语言 $L(G)$ 中的单词，终结符号是组成句子的基本单位。
- $NT$：**非终结符集 (Nonterminals / Variables)**，是语法上的变量，表示了语言 $L(G)$ 层次化的结构，出现在 $G$ 的产生式中。
- $S$：**开始符 (Start Symbol)**，单独从 $NT$ 中指定一个非终结符作为开始符，$S$ 所能生成的所有句子就是文法 $G$ 代表的语言 $L(G)$。按照惯例，开始符的产生式总是写在第一个。
- $P$：**产生集 / 规则集 (Productions / Rules)**，文法 $G$ 中所有产生式的集合，一个产生式具有 $NT \rightarrow (T \cup NT)^+$ 的形式，也就是说，产生式将一个非终结符替换为一个符号串。

:::tip 巴科斯范式

上下文无关文法的传统表示是巴科斯范式 (BNF, Backus Normal Form)，又称为巴科斯-诺尔范式 (BNF, Backus-Naur Form)。
它是由美国著名计算机科学家 [John Backus](https://en.wikipedia.org/wiki/John_Backus)[^1] 和丹麦著名计算机科学家 [Peter Naur](https://en.wikipedia.org/wiki/Peter_Naur)[^2] 首先引入的用来描述计算机语言语法的符号集。

:::

:::note 算术表达式文法

$$
  \begin{aligned}
    E &\rightarrow E + T \ | \ E - T \ | \ T \\
    T &\rightarrow T * F \ | \ T / F \ | \ F \\
    F &\rightarrow ( \ E \ ) \ | \ \textbf{id}
  \end{aligned}
$$

其中，$E$ 代表 expression，$T$ 代表 term，$F$ 代表 factor，$\textbf{id}$ 代表 identifier。

:::

:::tip 文法的分类

美国著名语言学家、哲学家 [Noam Chomsky](https://en.wikipedia.org/wiki/Noam_Chomsky) 在 1956 年提出了 [Chomosky Hierarchy](https://en.wikipedia.org/wiki/Chomsky_hierarchy)，将形式语言分为四类：

<center><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chomsky-hierarchy.svg/320px-Chomsky-hierarchy.svg.png" alt="chmosky-hierarchy"/></center>

| Grammar | Language | Automaton | Production Rules |
| ------- | -------- | --------- | ---------------- |
| Type 0 | Recursively Enumerable (Unrestricted) | Turing Machine | $\gamma \rightarrow \alpha$ (no constraints) |
| Type 1 | Context-Sensitive | Linear-Bounded Non-Deterministic Turing Machine | $\alpha A \beta \rightarrow \alpha \gamma \beta$ |
| Type 2 | Context-Free | Non-Deterministic Pushdown Automaton | $A \rightarrow \alpha$ |
| Type 3 | Regular | Finite State Automaton | $A \rightarrow a$ <br/> or $A \rightarrow aB$ |

符号的含义：
- $a$ = terminal
- $A, B$ = nonterminal
- $\alpha, \beta, \gamma$ = string of terminals and/or nonterminals
  - $\alpha, \beta$ maybe empty
  - $\gamma$ is never empty

从上下文有关文法的产生式规则中可以看出，**只有当非终结符 $A$ 在 $\alpha$ 和 $\beta$ 的中间时 (或者说在 $\alpha$ 和 $\beta$ 的上下文中)**，才可以将 $A$ 替换成非空的 $\gamma$。
而在上下文无关文法的产生式规则中，无论非终结符 $A$ 的上下文是什么，我们总是可以将 $A$ 替换成 $\alpha$。
这就是所谓的上下文有关与上下文无关。

对于正则文法的产生式规则，实际上表示的是，当有限自动机的输入为 $\alpha$ 时，它将从状态 $A$ 转移到状态 $B$。

对于无限制文法，超出了编译原理一般上研究的范畴，而且笔者对此了解不多，故不作解释，有兴趣的读者可以自行搜索或查阅相关资料。

在工程中，很多编程语言是上下文有关的，但为什么仍用 CFG 进行语法分析呢？
- CFG 可以完美地描述表达式和语句的递归语法。
- CSG 语法解析器效率低。
- 编程语言大部分结构是 CF 的，剩下 CS 的部分可以在语义分析阶段进行分析。
  - 比如 if statement, declarations 等是 CF 的。
  - 比如 define before use, matching formal parameters 等问题是 CS 的。

:::

## Derivations

将产生式看成是重写规则，产生式实际上在做的就是符号串的替换。

一个 **句子 (Sentence)** 指的是一个可以由文法 $G$ 生成的符号串，**其中所有的符号都是终结符**。
一个文法 $G$ 生成的 **语言 (Language)** $L(G)$ 是它所有句子组成的集合。
如果两个文法生成的语言相同，这两个文法就被称为是等价的。

一个 **推导 (Derivation)** 指的是一个应用产生式规则的序列，以文法 $G$ 的开始符作为开始，以 $L(G)$ 中的一个句子作为结束。我们用符号 $\Rightarrow$ 表示应用一次产生式。

$$
  E \rightarrow E \ + \ E \ | \ E \ * \ E \ | \ -E \ | \ ( \ E \ ) \ | \ \textbf{id}
$$

[^1]: John Backus 领导发明设计了 FORTRAN 语言，被称为 FORTRAN 语言之父，他提出了 BNF，发明了函数式编程的概念及实践该概念的 FP 语言，为 1977 年图灵奖得主。
[^2]: Peter Naur 协作开发了 BNF，为 2005 年图灵奖得主，也是目前唯一一位丹麦籍的得主。