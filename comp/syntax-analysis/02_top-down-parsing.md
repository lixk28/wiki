---
id: top-down-parsing
sidebar_position: 2
---

# Top-Down Parsing

**自顶向下解析 (Top-Down Parsing)** 从根节点开始，以深度优先的方式创建语法树的节点。自顶向下解析等价于找到输入符号串的一个最左推导。

## Recursive-Descent Parsing

**递归下降解析 (Recursive-Descent Parsing)**

```algorithm title="Recursive-Descent Parsing Algorithm"
Choose an A-production, A -> X1 X2 ... Xk;
for i = 1 to k:
  if Xi is a nonterminal:
    call procedure Xi();
  else if Xi equals the current input symbol a:
    advance the input to the next symbol;
  else:
    raise an error
```

## Left Recursion and Its Elimination

## Left Factoring
