---
id: top-down-parsing
sidebar_position: 2
---

import Highlight from '@site/src/components/Highlight';

# Top-Down Parsing

:::tip What is parsing?

文法递归定义了一种语言的语法，**语法分析器 (Parser)** 的工作就是根据定义的文法，将词法分析器输出的 token list
作为输入 (token list 就相当于语言的一个句子)，构造出 token list 的推导。

语法分析器主要有两个任务：
- 确定符号串 (即 token list) 是否可以从文法推导出来，不能的话需要报告错误并终止。
- 构建推导符号串的语法分析树，作为输出传递给编译器的下一个阶段。

:::

:::tip Parsing Types


:::

**自顶向下解析 (Top-Down Parsing)** 从根节点开始，以深度优先的方式创建语法树的节点。自顶向下解析等价于找到输入符号串的一个最左推导。

## Recursive-Descent Parsing

**[递归下降解析 (RDP, Recursive-Descent Parsing)](https://en.wikipedia.org/wiki/Recursive_descent_parser)**

```algorithm title="Recursive-Descent Parsing Algorithm"
Choose an A-production, A -> X1 X2 ... Xk;
for i = 1 to k:
  if Xi is a nonterminal:
    call procedure Xi();
  else if Xi equals the current input symbol a:
    advance the input to the next symbol;
  else:
    raise an error;
```

从 RDP 的算法中可以看出，RDP 是通过递归调用代表替换非终结符 $X_i$ 的产生式函数 `Xi()` 来实现的。

算法的具体流程如下：
1. 以开始符号 $S$ 为起始的推导。
2. 对于当前推导的非终结符，遍历尝试它所有的产生式，直到：
   1. 某个产生式可以生成部分输入串。
   2. 或者没有任何一个产生式可以生成部分输入串，这时进行回溯，回溯到前一个非终结符处，继续尝试它其他的产生式。
3. 不断尝试、回溯，直到成功匹配输入串，或者没有推导能够匹配输入串。

RDP 实现上比较简单，容易手写，但是可能会需要指数级时间。

:::note EXAMPLE



:::

## Left Recursion and Its Elimination

一个文法 $G$ 被称为是 **[左递归的 (Left Recursive)](https://en.wikipedia.org/wiki/Left_recursion)**，
当且仅当存在一个非终结符 $A$，$A$ 可以推导出以自己为最左边符号的句型，即 $A \xRightarrow{+} A\alpha$，
其中 $\alpha$ 是一个串。

- **直接左递归 (Direct/Immediate Left Recursion)** 指的是存在下面的产生式规则：
  $$
    A \rightarrow A\alpha
  $$
- **间接左递归 (Indirect/Non-Immediate Left Recursion)** 指的是存在下面的产生式规则：
  $$
    \begin{aligned}
      A_0 &\rightarrow \beta_0 A_1 \alpha_0 \\
      A_1 &\rightarrow \beta_1 A_2 \alpha_1 \\
      &\dots \\
      A_n &\rightarrow \beta_n A_0 \alpha_n \\
    \end{aligned}
  $$
  其中，$\beta_0, \beta_1, \dots, \beta_n$ 满足 $\beta_i \xRightarrow{*} \epsilon$。
  $\alpha_0, \alpha_1, \dots, \alpha_n$ 是由任意的终结符和(或)非终结符组成的串。
  这些产生式实际上是在说，$A_0$ 是可以左递归的：
  $$
    A_0 \Rightarrow \beta_0 A_1 \alpha_0
        \xRightarrow{*} A_1 \alpha_0
        \Rightarrow \beta_1 A_2 \alpha_1 \alpha_0
        \xRightarrow{*} \cdots
        \xRightarrow{*} A_0 \alpha_n \dots \alpha_1 \alpha_0
  $$

自顶向下语法分析不能够处理左递归文法，考虑 RDP，我们在展开具有左递归性质的非终结符 $A$ 时，
可能会 $A \Rightarrow A \alpha \Rightarrow A A \alpha \Rightarrow \dots$ 一直这样进行下去，
导致算法不能终止。

我们可以通过消除左递归来使文法适用于自顶向下语法分析 (将左递归改写成右递归)。

如果文法中只有直接左递归，那么问题就简单一些了，我们可以通过下面的规则改写：
- 首先将产生式合并在一起：
  $$
    A \rightarrow
      A\alpha_1 \mid A\alpha_2 \mid \cdots \mid A\alpha_m \ |
      \ \beta_1 \mid \beta_2 \mid \cdots \mid \beta_n
  $$
  其中，$\beta_i$ 是不以 $A$ 为开始的串。
- 然后将所有的 $A$ 产生式替换为：
  $$
    \begin{aligned}
      A &\rightarrow \beta_1A^{\prime} \mid \beta_2A^{\prime} \mid \cdots \mid \beta_nA^{\prime} \\
      A^{\prime} &\rightarrow \alpha_1A^{\prime} \mid \alpha_2A^{\prime} \mid \cdots \mid \alpha_mA^{\prime} \mid \epsilon
    \end{aligned}
  $$

:::note EXAMPLE

考虑下面的算术表达式文法：
$$
  \begin{aligned}
    E &\rightarrow E + T \mid E - T \mid T \\
    T &\rightarrow T * F \mid T / F \mid F \\
    F &\rightarrow ( \ E \ ) \mid \textbf{id}
  \end{aligned}
$$

它只含有直接左递归，消除左递归后的文法为：
$$
  \begin{aligned}
    E &\rightarrow T E^{\prime} \\
    E^{\prime} &\rightarrow + T E^{\prime} \mid - T E^{\prime} \\
    T &\rightarrow F T^{\prime} \\
    T^{\prime} &\rightarrow * F T^{\prime} \mid / F T^{\prime} \\
    F &\rightarrow ( \ E \ ) \mid \textbf{id}
  \end{aligned}
$$

:::

如果文法中含有间接左递归，可以通过下面的算法消除所有的左递归。

```algorithm title="Eliminating Left Recursion"
given a set of nonterminals A1, A2, ..., An and their productions
for each i from 1 to n:
  for each j from 1 to i - 1:
    replace each production with form Ai -> Aj a by Ai -> b1 a | b2 a | ... | bk a,
    where Aj -> b1 | b2 | ... | bk are all current Aj-productions
  eliminate the direct left recursion among the Ai-productions
```

:::note EXAMPLE



:::

## Common Prefix and Left Factoring

再来考虑递归下降语法分析器，它性能低是因为它没有什么策略，只是挨个尝试产生式所有可行的替换，再进行匹配，如果不对再进行回溯。
我们很自然可以想到，可以在递归下降分析器的基础上，让它变得更 "聪明" 一点，什么叫更 "聪明" 呢？
无非就是给它定制某种固定的策略，让它不再是一直傻乎乎地不停试错。

**预测性语法分析器 (Predictive Parser)** 实际上也是递归下降分析器<del>，只不过它不再需要回溯</del>。
顾名思义，既然这种分析器是 "预测性" 的，那么它肯定不是试错的策略，没错，它在每次选择产生式的时候，会向后查看后面一个或几个 token，
它会依据当前正在处理的非终结符、以及后面的一个或多个符号，来选择产生式。

:::tip 向前看

RDP 是完全不看，这里是向前看一个。

:::

为了让预测性语法分析器适用于我们的文法，除了消除左递归外，我们还需要对文法做一点变换，使之满足 "可被预测" 的要求。

**左公因子提取 (Left Factoring)** 指的是提取出产生式右侧的 **左公共前缀 (Left Common Prefix)**。

具体来说，就是将下面形式的产生式
$$
  A \rightarrow \alpha \beta \mid \alpha \gamma
$$
变换为
$$
  \begin{aligned}
    A &\rightarrow \alpha A^{\prime} \\
    A^{\prime} &\rightarrow \beta \mid \gamma
  \end{aligned}
$$

且慢，这样做的意义在哪呢？我们容易发现，对于原始的产生式 $A \rightarrow \alpha \beta \mid \alpha \gamma$，
如果当前正在处理的终结符是 $A$，向前看的符号是 $\alpha$，那么，我们的 predictive parser 就无法判断用哪个产生式对 $A$ 进行替换，也就是说它需要将这两个替换都尝试一下，看哪个是正确的，这样，predictive parser 就需要进行回溯。
确切的来说，我们需要的 predictive parser 是 backtrack-free 的。

但是，如果提取产生式右边的左公因子，进行上面的变换后，predictive parser 就可以确定选择了，为什么呢？
因为 $\beta$ 和 $\gamma$ 肯定是不同的串 (否则，写成一个不就好了)，由 $A$ 和 $\alpha$ 选择 $A^{\prime}$，
这时对于 $A^{\prime}$ 的选择就是 $\beta$ 和 $\gamma$ 两者之中，是确定的。
左公因子提取实际上就是在<u>推迟选择，直至可区分</u>。

对于非终结符 $A$，将它的产生式
$$
  A \rightarrow \alpha\beta_1 \mid \alpha\beta_2 \mid \cdots | \alpha\beta_n \mid \gamma
$$
其中，$\alpha$ 是 $\alpha\beta_i$ 的最长左公共前缀，替换为
$$
  \begin{aligned}
    A &\rightarrow \alpha A^{\prime} \mid \gamma \\
    A^{\prime} &\rightarrow \beta_1 \mid \beta_2 \mid \cdots \mid \beta_n
  \end{aligned}
$$

:::note EXAMPLE


:::

## FIRST and FOLLOW

构造 top-down parser 和 bottom-up parser 都需要用到两个辅助函数 $\text{FIRST}$ 和 $\text{FOLLOW}$，它们与给定的文法相关联。

在 top-down parsing 中，根据向前看符号，$\text{FIRST}$ 和 $\text{FOLLOW}$ 用于帮助选择应用哪个产生式。

Given grammar $G(T, NT, S, P)$，$\text{FIRST}$ and $\text{FOLLOW}$ are defined as [^1]:
- $\text{FIRST} (\alpha)$: For any string $\alpha$ of gammar symbols (that is, $\alpha = (T \cup NT)^+$), $\text{FIRST}(\alpha)$ is the set of terminals that can appear at the very start of any string derived from $\alpha$.
  Formally,
  $$
    \text{FIRST}(\alpha) = \{ \ t \mid \alpha \xRightarrow{*} t \beta, \ t \in T \ \}
  $$
  where $\beta$ can be any string even $\epsilon$, while $T$ is the set of terminals in grammar $G$.
  Especially, if $\alpha \xRightarrow{*} \epsilon$, then $\epsilon \in \text{FIRST}(\alpha)$ [^2].
- $\text{FOLLOW} (A)$: For any nonterminal $A$, $\text{FOLLOW}(A)$ is the set of terminals that can appear immediately after $A$.
  Formally,
  $$
    \text{FOLLOW}(A) = \{ \ t \mid S \xRightarrow{*} \alpha At \beta, \ t \in T \ \}
  $$
  where $\alpha$ can be any string even $\epsilon$, $\beta$ must be a non-empty string,
  while $S$ is the start symbol of $G$, $T$ is the set of terminals in $G$.
  Especially, if $S \xRightarrow{*} \alpha A$, then $\$$ (or EOF) is in $\text{FOLLOW}(A)$.

计算给定文法 $G$ 所有符号 $X$ 的 $\text{FIRST}(X)$，重复下面的操作，直到所有的 $\text{FIRST}(X)$ 都不再变化：
- 如果存在产生式 $X \rightarrow \epsilon$，那么将 $\epsilon$ 添加到 $\text{FIRST}(X)$。
- 如果 $X$ 是终结符，那么 $\text{FIRST}(X) = \{ \ X \ \}$。
- 如果 $X$ 是非终结符，遍历 $X$ 所有的产生式：
  $$
    X \rightarrow Y_1Y_2 \cdots Y_k
  $$
  其中，$Y_k$ 可以使是终结符或非终结符。
  对于 $X$ 的每个产生式，执行下面的操作：
  1. 如果所有的 $\text{FIRST}(Y_i)$ 都含有 $\epsilon$，那么将 $\epsilon$ 添加到 $\text{FIRST}(X)$ 中。
  2. 对于 $Y_i$，将 $\text{FIRST}(Y_i) - \epsilon$ 添加到 $\text{FIRST}(X)$ 中。
  3. 再判断 $\text{FIRST}(Y_i)$ 中是否含有 $\epsilon$，如果有，$i = i + 1$，继续执行步骤 ii，否则结束并退出。

有了所有符号 $X$ 的 $\text{FIRST}(X)$，我们就可以计算任意符号串 $X_1X_2 \cdots X_n$ 了。
计算符号串 $X_1X_2 \cdots X_n$ 的 $\text{FIRST}(X_1X_2 \cdots X_n)$ 的过程与计算非终结符的 $\text{FIRST}$ 的过程相同。

计算给定文法 $G$ 所有非终结符 $A$ 的 $\text{FOLLOW}(A)$，重复下面的操作，直到所有的 $\text{FOLLOW}(A)$ 都不再变化：
- 将 $\$$ 添加到 $\text{FOLLOW}(S)$ 中，其中 $S$ 是开始符号，$\$$ 是 EOF token。
- 如果有产生式 $A \rightarrow \alpha B \beta$ (其中 $B$ 是非终结符，$\alpha$、$\beta$ 是串，且 $\beta$ 非空)：
  - 如果 $\epsilon \notin \text{FIRST}(\beta)$，则将 $\text{FIRST}(\beta)$ 添加到 $\text{FOLLOW}(B)$ 中。
  - 如果 $\epsilon \in \text{FIRST}(\beta)$，则将 $\text{FIRST}(\beta) - \epsilon \cup \text{FOLLOW}(A)$ 添加到 $\text{FOLLOW}(B)$ 中。
- 如果有产生式 $A \rightarrow \alpha B$，则将 $\text{FOLLOW}(A)$ 添加到 $\text{FOLLOW}(B)$ 中。

:::note EXAMPLE



:::

:::tip Why Need First and Follow?



:::

## LL(1)

:::tip [LL(k)](https://en.wikipedia.org/wiki/LL_grammar)

**LL(k) parser**: A predictive parser that uses k lookahead tokens
- **L**: Scan the input from <Highlight color="#3578e5">l</Highlight>eft to right.
- **L**: Produce a <Highlight color="#3578e5">l</Highlight>eftmost derivation.
- **k**: Use <Highlight color="#3578e5">k</Highlight>  input symbols of lookahead at each step to decide.

**LL(k) Grammar**: A grammar that can be parsed using an LL(k) parser.
- LL(k) $\subset$ CFG

**LL(k) Language**: A language that can be expressed as an LL(K) grammar.

LL(k) Parser Implementation:
- recursive implmentation: recursive descent, use recursive function calls (implicit stack).
- non-recursive implementation: use explicit stack to keep track of recursion.

:::

### Construction of a Predictive Parsing Table

给定文法 $G$，我们可以通过 $\text{FIRST}$ 和 $\text{FOLLOW}$ 构造出 **预测分析表 (Predictive Parsing Table)** $M$。
$M$ 是一个二维数组，纵向索引是非终结符 $A$，横向索引是终结符或者 $\$$。
$M[A, a]$ 代表的是，在当前处理的非终结符为 $A$、向前看一个的终结符为 $a$ 时，应该选择的产生式。

给定文法 $G$，构造其预测分析表 $M$，对于 $G$ 中的每个产生式 $A \rightarrow \alpha$，
- 如果 $\epsilon \notin \text{FIRST}(\alpha)$，那么对于 $\text{FIRST}(\alpha)$ 中的每个终结符 $a$，将 $A \rightarrow \alpha$ 添加到 $M[A, a]$。
- 如果 $\epsilon \in \text{FIRST}(\alpha)$，那么对于 $\text{FOLLOW}(A)$ 中的每个终结符 $b$ (包括 $\$$，即 $\$$ 也视为终结符)，
  将 $A \rightarrow \alpha$ 添加到 $M[A, b]$。
  :::caution 注意

  如果 $A$ 存在 $\epsilon$-production，即若 $\alpha = \epsilon$，
  则有 $\text{FIRST}(\alpha) = \text{FIRST}(\epsilon) = \epsilon$，显然 $\epsilon \in \text{FIRST}(\alpha)$，
  那么对于 $\text{FOLLOW}(A)$ 中的每个终结符 $b$ (包括 $\$$)，也要将 $A \rightarrow \epsilon$ 添加到 $M[A, b]$。

  :::

:::note EXAMPLE



:::

### Table-Driven Predictive Parsing

[^1]: The definition in Chinese is too nasty, English is easier to understand 😇.
[^2]: This avoid defining $\text{NULLABLE}$ in the classic book "Modern Compiler Implementation".
