---
id: top-down-parsing
sidebar_position: 2
---

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
      A\alpha_1 \ | \ A\alpha_2 \ | \ \cdots \ | \ A\alpha_m \ | \
      \beta_1 \ | \ \beta_2 \ | \ \cdots \ | \ \beta_n
  $$
  其中，$\beta_i$ 不以 $A$ 为开始。
- 然后将所有的 $A$ 产生式替换为：
  $$
    \begin{aligned}
      A &\rightarrow \beta_1A^{\prime} \ | \ \beta_2A^{\prime} \ | \ \cdots \ | \ \beta_nA^{\prime} \\
      A^{\prime} &\rightarrow \alpha_1A^{\prime} \ | \ \alpha_2A^{\prime} \ | \ \cdots \ | \ \alpha_mA^{\prime} \ | \ \epsilon
    \end{aligned}
  $$

:::note EXAMPLE

考虑下面的算术表达式文法：
$$
  \begin{aligned}
    E &\rightarrow E + T \ | \ E - T \ | \ T \\
    T &\rightarrow T * F \ | \ T / F \ | \ F \\
    F &\rightarrow ( \ E \ ) \ | \ \textbf{id}
  \end{aligned}
$$

它只含有直接左递归，消除左递归后的文法为：
$$
  \begin{aligned}
    E &\rightarrow T E^{\prime} \\
    E^{\prime} &\rightarrow + T E^{\prime} \ | \ - T E^{\prime} \\
    T &\rightarrow F T^{\prime} \\
    T^{\prime} &\rightarrow * F T^{\prime} \ | \ / F T^{\prime} \\
    F &\rightarrow ( \ E \ ) \ | \ \textbf{id}
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

**预测性语法分析器 (Predictive Parser)** 实际上也是递归下降分析器，只不过它不再需要回溯。
顾名思义，既然这种分析器是 "预测性" 的，那么它肯定不是试错的策略，没错，它在每次选择产生式的时候，会向后查看后面一个或几个 token，
它会依据当前正在处理的非终结符、以及后面的一个或多个符号，来选择产生式。




