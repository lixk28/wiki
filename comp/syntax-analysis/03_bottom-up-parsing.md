---
id: bottom-up-parsing
sidebar_position: 3
---

import ImageCenter from '@site/src/components/ImageCenter';

# Bottom-Up Parsing

## Reductions

**归约 (Reduction)** 是<u>推导的逆过程</u>。

对于文法 $G$，如果有推导 $\alpha \xRightarrow{*} \beta$，则称 $\beta$ 可归约为 $\alpha$，或者 $\alpha$ 是 $\beta$ 的一个归约。
特别的，如果有 $\alpha \Rightarrow \beta$，则称 $\beta$ 可直接归约为 $\alpha$，或者 $\alpha$ 是 $\beta$ 的一个 **直接归约 (Direct Reduction)**。

- **最左归约 (Leftmost Reduction)**：最右推导的逆过程，也称为 **规范归约 (Canonical Reduction)**。
- **最右归约 (Rightmost Reduction)**：最左推导的逆过程。

:::note Example



:::

## Handle

对于文法 $G$，如果有 $S \xRightarrow[rm]{*} \alpha$ (其中 $S$ 是 $G$ 的开始符号)，则称 $\alpha$ 是 $G$ 的一个 **最右句型 (Right-Sentential Form)**。对于 **最左句型 (Left-Sentential Form)**，我们有完全类似的定义。
前面说过，最右推导通常被称为规范推导，而最右句型也称 **规范句型 (Canonical Sentential Form)**。

对于文法 $G$，如果有 $S \xRightarrow{*} xAy \xRightarrow{+} x \alpha y$，则称 $\alpha$ 是句型 $xAy$ 关于 $A$ 的 **短语 (Phrase)**。
特别的，如果 $S \xRightarrow{*} xAy \Rightarrow x \alpha y$，则称 $\alpha$ 是 **简单短语/直接短语 (Simple Phrase)**。

一个句型的 <u>最左简单短语 (leftmost simple phrase)</u> 被称为这个句型的 **句柄 (Handle)**。

:::tip From the View of Parse Tree

从语法分析树的角度来说：
- 一个句型的语法树中任一子树的叶子所组成的符号串都是该句型的短语。
  > 子树就是以内部节点为根节点的树。内部节点是非叶子节点。
- 一个句型的语法树中 <u>只有一层分支</u> 的子树的叶子所组成的符号串都是该句型的简单短语。
  - 句柄就是语法树最左边的简单短语。

考虑表达式文法：
$$
  \begin{aligned}
    E &\rightarrow E + T \ | \ E - T \ | \ T \\
    T &\rightarrow T * F \ | \ T / F \ | \ F \\
    F &\rightarrow ( \ E \ ) \ | \ \textbf{id}
  \end{aligned}
$$
以及下面的句型：
$$
  T + T * F + id
$$

它的语法树为：
<ImageCenter scale="50%">

![phrase-and-handle-parse-tree](assets/phrase_and_handle_parse_tree.png)

</ImageCenter>

它的短语有：
- $T + T * F + id$
- $T + T * F$
- $T$ (句柄、简单短语)
- $T * F$ (简单短语)
- $\textbf{id}$ (简单短语)

:::

## Shift-Reduce Parsing

## LR Parsers

### LR(0)

### SLR(1)

### LR(1)

### LALR(1)
