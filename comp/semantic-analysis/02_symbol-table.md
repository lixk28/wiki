---
id: symbol-table
sidebar_position: 2
---

import Highlight from '@site/src/components/Highlight';

# Symbol Table

## What is Symbol Table

**Symbol table (符号表)** is a important data structure for compilers that tracks information about all program symbols. (符号表是编译器中重要的数据结构，记录程序中每个符号的信息)
- Each entry in symbol table represents a defintion of a identifier (每个表项记录一个标识符的定义)
- Will be updated whenever scopes are entered or exited (每当进入或离开作用域时，必须更新符号表)
- Used to perform binding of identifier uses at current point (用于确定标识符的绑定情况)

:::info Symbol

symbol = variable's name = identifier

:::

Symbol table can be built in two approaches:
- Traversing the parse tree in a seperate pass after parsing (遍历分析树生成符号表)
- Using semantic actions embedded in parsing stage (在分析过程中生成符号表)

Symbol table is usually created in the semantic analysis phase, but many compilers set up a table at lexical analysis stage for the various variables in the program. (通常在词法分析阶段就开始准备)

Symbol table is used in code generation to output assembler directives of the appropriate size and type. (用于类型检查、代码生成等)

Symbol table is usually discared after generating executable binary, because machine code instructions no longer need symbol informations. For use in debuggers, symbol tables may be included. (生成可执行文件后，符号表通常被丢弃，但调试器可能需要符号表信息包含在二进制中)
- To display symbol names instead of addresses in debuggers (如果不包含符号表信息，调试时无法查看变量的信息)
- `-g` option for gcc to include debug symbol tables

## Binding and Scoping

**Binding (绑定)** matches identifier use with definition. (匹配符号的使用和定义)
- Definition: Associating an id with a memory allocation
- Binding associates an id use with a location, and is an essential step before machine code generation

**Scope (作用域)** is a program region where a definition can be bound. (可以与定义绑定的程序区域)
- Uses of identifier in the scope is bound to that definition
- Uses not in scope of any definition results in undefined error
- Scopes for the same identifier can never overlap, there is at most one binding for a identifier at any time

Two types of scoping:
- **Static scoping (静态作用域)**: Scopes formed by where definitions are in program text (程序代码决定)
  - Rule: <u>Bind to the closest <Highlight color="#3578e5">enclosing</Highlight> definition</u>
  - Also known as **lexical scoping (词法作用域)**
  - C/C++, Java, Python, Javascript

  ```c
  void foo()
  {
    int x = 0;
    {
      char x = 'x';
    }
    x = x + 1;  // x will be 1
  }
  ```

- **Dynamic scoping (动态作用域)**: Scopes formed by when definitions happen during runtime (运行时决定)
  - Rule: <u>Bind to the most recent definition in current execution</u>
  - Perl, Bash, Lisp, Scheme

  ```bash
  #!/usr/bin/bash
  greeting="uh oh"
  greeting="hello, world!"
  echo $greeting  # print hello world
  ```

<details>

<summary>Static Scoping or Dynamic Scoping?</summary>

Dynamic scoping:
- All bindings are done at execution time
- Hard to figure out for both compiler and human

Static scoping:
- Leads to fewer programmer errors, bindings are determined by lexical structure of source code
- Leads to more efficient code, compilers can determine bindings at compile time and translate identifier directly to memory location

</details>

## Implementation of Symbol Table

### Symbol Table Structure

Symbol table is an important data stucture in compiler, the performance of compiler's frontend (lexical, syntax, semantic analysis) is affected by symbol table access time. (符号表访问时间影响前端性能)

Common data structures for symbol table:
- List
  - Array
  - Linked List
- Binary tree
- Hash table

Most compilers choose hash table for its quick access time. (大多数编译器都使用哈希表来存储符号)

| Data Structure | Insert/Delete Time | Search Time      | Space               |
| :------------: | :----------------: | :--------------: | :-----------------: |
| Array          | $O(n)$             | $O(n)$           | No extra space      |
| Linked List    | $O(1)$             | $O(n)$           | Extra pointer space |
| Binary Tree    | $O(\text{log}n)$   | $O(\text{log}n)$ | more pointer space  |
| Hash Table     | $O(1)$             | $O(1)$           | way more space      |

:::info Note

- For linked list, we can move recently used identifier to the head (将最近使用的标识符移到表头)
- For binary tree, $O(\text{log}n)$ is average case (or balanced tree), in the worst case, binary tree may reduce to linked list (最坏情况下二叉树退化成链表)
- For hash table, insert/delete/search time can become $O(n)$ if with frequent conflicts and long chains, and the size of hash table is way more large than the number of identifiers (如果冲突频繁且链太长，哈希表维护时间会有一定开销，而且哈希表体积远大于标识符数量)

:::

Maintaining symbol table:
- `enter_scope()`: start a new scope
- `exit_scope()`: exit current scope
- `find_symbol(x)`: find the information about symbol x
- `add_symbol(x)`: add symbol x to the symbol table
- `check_symbol(x)`: check if symbol x is defined in current scope

### Handling Symbol Table with Scopes

Organize all symbol tables into a scope stack
- An individual symbol table for each scope, stack holds on entry for each <u>open scope</u>
- The innermost scope (current scope) is on the top of stack
- Stack push/pop when entering/exiting a scope
  - Create a new symbol table to hold all variables declared in that scope
  - Push/pop the pointer to the symbol table

TODO: an image here.

Cons of stacking symbol tables:
- Inefficient searching due to multiple hash table lookups: Search from the top of stack, and look up all the symbol tables held by the stack in worst case. All global variables will be at the bottom of the stack.
- Inefficient use of memory due to multiple hash tables: The number of symbol tables is the number of current anticipated scopes.

Single symbol table for all scopes using chaining (preferred):
- For each identifier, insert at the front of chain with scope level k, search will fetch the front of chain
- Remove all symbols with level k when exiting level k scope

TODO: an image here.

Pros of chaining symbol table:
- Lookup requires only a single hash table access
- Save memory due to single hash table

Cons of chaining symbol table:
- Unsuitable for class scopes (only block scopes)
- Exiting scope is slightly more expensive

### Symbol Table Entry

TODO

## Type and Type Checking

**Type (类型)** is a set of values and a set of operations on these values.

**Type checking (类型检查)** verifies type consistency across the program. (类型一致性检查)
- A program is said to be **type consistent (类型一致的)** if all operators are consistent with the operand types
- Much of what we do in semantic analysis is type checking

- **Static type checking (静态类型检查)** (at compile time)
- **Dynamic type checking (动态类型检查)** (at execution time)
