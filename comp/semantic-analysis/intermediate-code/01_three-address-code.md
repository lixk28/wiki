---
id: three-address-code
sidebar_position: 1
---

import Highlight from '@site/src/components/Highlight';

# Three-Address Code

**Three-Address Code (TAC, 三地址代码)** is the form of high-level assembly where each operation has at most <u>three</u> operands. The generic form of TAC is `X = Y op Z`, where `X`, `Y`, `Z` can be varibles, constants or compiler-generated temporaries holding intermediate values.

- TAC is desirable for target-code generation:
  - Multi-operator arithmetic expressions are converted to multiple instructions.
  - Nested control flow statements are converted to jumps.
- TAC is desirable for machine-independent optimization:
  - The operations are generic.
  - Function calls represented as generic call nodes.
  - Use symbolic names rather than register names.
- TAC is easy to be rearranged:
  - The use of compiler-generated temporaries for intermediate values.

## Three-Address Code Instructions

- Binary assignment instruction

  ```tac
  x = y op z
  ```
  where `op` is a binary arithmetic or logical operation, `x`, `y` and `z` are addresses.
- Unary assignment instruction

  ```tac
  x = op y
  ```
  where `op` is a unary operation.
- Copy instruction

  ```tac
  x = y
  ```
  `x` is assigned the value of `y`.
- Unconditional jump

  ```tac
  goto L
  ```
  where `L` is a label.
- Conditional jump

  ```tac
  if x goto L
  if (x relop y) goto L
  ```
  where `relop` is a relational operator.
  Execute the instruction with label `L` next if the expression is true, otherwise the following instruction in sequence is executed next.
- Procedural call

  ```tac
  param a1
  param a2
  ...
  param an
  call proc, n
  ```
  `param ai` for parameters, `proc` stands for the procedure being called, `n` indicates the number of parameters.
- Procedural call return

  ```tac
  return x
  ```
  where `x` is the return value.
- Indexed assignment

  ```tac
  x = y[i]
  ```
  Set `x` to the value in the location `i` memory units beyond location `y`.

  ```tac
  y = x[i]
  ```
  Set the contents of location `i` units beyond `x` to the value of `y`.
- Address and pointer operation
  ```tac
  x = &y
  ```
  A pointer `x` is set to the address of `y`.

  ```tac
  x = *y
  ```
  `x` is set to the value of location pointed to by pointer `x`.

  ```tac
  *x = y
  ```
  The content pointed to by pointer `x` is assigned `y`.

:::note A TAC Example for Atrithmetic Expressions

```c
a + a * (b - c) + (b - c) * d
```

```tac
t1 = b - c
t2 = a * t1
t3 = a + t2
t4 = t1 * d
t5 = t3 + t4
```

:::

:::note A TAC Example for Control Flow Statements

```c
i = 1;
do {
  a[i] = x * 5;
  i++;
} while (i <= 10);
```

```tac
    i = 1
L:  t1 = x * 5
    a[i] = t1
    i = i + 1
    if i <= 10 goto L
```

`a[i] = x * 5` can be translated more detailedly.

```tac
    i = 1
L:  t1 = x * 5
    t2 = &a
    t3 = sizeof(int)
    t4 = t3 * i
    t5 = t2 + t4
    *t5 = t1
    i = i + 1
    if i <= 10 goto L
```

:::

## Quadruples

A **Quadruple (四元式)** has four fileds:

```quad
(op, arg1, arg2, result)
```

- `op` contains an internal code for the operator.
- `arg1`, `arg2` and `result` are optional, depending on the `op`.

Three-address code represented in quadruple:
- Binary assignment instruction

  ```tac
  x = y op z
  ```

  ```quad
  (op, y, z, x)
  ```

- Unary assignment instruction

  ```tac
  x = op y
  ```

  ```quad
  (op, y, nil, x)
  ```
  `arg2` is not used for unary assignments instruction (`nil` means it's empty).

- Copy instruction

  ```tac
  x = y
  ```

  ```quad
  (=, y, nil, x)
  ```
  `op` is `=` for copy instruction, while for most operations, the assignment operator is implied.

- Unconditional jump

  ```tac
  goto L
  ```

  ```quad
  (goto, nil, nil, L)
  ```
  The target label `L` is put in `result` field.

- Conditional jump

  ```tac

  ```

  ```quad

  ```

- Procedural call

  ```tac
  param ai
  ```

  ```quad
  (param, ai, nil, nil)
  ```
  `param` use neither `arg2` or `result`.

- Procedural call return

  ```tac
  return x
  ```

  ```quad
  (return, x, nil, nil)
  ```
  `return` use neither `arg2` or `result`.

- Indexed assignment

- Address and pointer operation

:::note Quadruple Representation for Arithmetic Expressions

```c
a = b * -c + b * -c
```

| position | `op` | `arg1` | `arg2` | `result` |
| -------- | ---- | ------ | ------ | -------- |
| (0)      | `-`  | `c`    |        | `t1`     |
| (1)      | `*`  | `b`    | `t1`   | `t2`     |
| (2)      | `-`  | `c`    |        | `t3`     |
| (3)      | `*`  | `b`    | `t3`   | `t4`     |
| (4)      | `+`  | `t2`   | `t4`   | `t5`     |
| (5)      | `=`  | `t5`   |        | `a`      |

:::

## Triples

A **Triple (三元式)** has three fields (quadruple without the `result` field):

```tri
(op, arg1, arg2)
```

Triples refer to the result of an operation `x op y` by its position, rather than by an explicit temporary name.

:::note Triple Representation for Arithmetic Expressions

```c
a = b * -c + b * -c
```

| position | `op` | `arg1` | `arg2` |
| -------- | ---- | ------ | ------ |
| (0)      | `-`  | `c`    |        |
| (1)      | `*`  | `b`    | `(0)`  |
| (2)      | `-`  | `c`    |        |
| (3)      | `*`  | `b`    | `(2)`  |
| (4)      | `+`  | `(1)`  | `(3)`  |
| (5)      | `=`  | `a`    | `(4)`  |

:::

## Static Single-Assignment Form

