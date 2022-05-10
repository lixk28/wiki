---
id: semantic-analysis
sidebar_position: 0
---

# Semantic Analysis

:::question Why Semantic Analysis?

- Semantics of a language is much more difficult to describe than syntax.
  - Syntax describes the proper form of the programs (形式)
  - Semantics describes what the program means (意义)
- Context cannot be analyzed using a CFG parser.
  - For instance, associating ids to objects require expressing the pattern:
    $\lbrace wcw \mid w \in \text{id} \rbrace$
    - The first $w$ represents the occurrence of an id in its definition
    - The $c$ represents arbitary intervening code.
    - The second $w$ represents the use of the previous defined id.
- Deeper check into the source program.
  - Semantic analysis is the <u>last stage</u> of the front end. And, it's the compilers <u>last chance</u> to reject incorrect programs.
  - Verify some properties that aren't caught in earlier phases.
    - Variables are declared before used.
    - Type consistency when using ids.
    - Expressions have the right types.
- Gather useful info about program for later phases.
  - Determine what variables are meant by each identifier.
  - Build an internal representation of inheritance hierarchies.
  - Count how many variables are in scope at each point.

:::

Implementation of semantic analysis:
- Attribute grammars (属性文法)
  - One-pass compilation, semantic analysis is done right in the process of parsing.
  - Augment rules to do checking during parsing.
  - Approach suggested in the compilers book.
- AST walk (语法树遍历)
  - Two-pass compilation
    - The first pass digests the syntax and builds a parse tree.
    - The second pass traverses the tree to verify that the program respects all semantic rules.
  - Strict phase separation of syntax analysis and semantic analysis.