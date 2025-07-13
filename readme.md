# Cross Program Invocation (CPI) for Solana Native Contracts (https://solana.com/docs/core/cpi)

A comprehensive example and implementation of Cross Program Invocation (CPI) patterns for Solana native programs, demonstrating how programs can interact with each other on the Solana blockchain.

## Overview

Cross Program Invocation (CPI) is a powerful feature in Solana that allows one program to call instructions of another program. This repository provides practical examples and implementations of various CPI patterns commonly used in Solana development.

## What is Cross Program Invocation?

CPI enables programs to invoke instructions on other programs, allowing for composable and modular smart contract architecture. This is essential for:

- Token transfers and minting
- Interacting with system programs
- Building complex DeFi protocols
- Creating program-to-program communication

## Features

- ✅ Basic CPI examples
- ✅ Token program interactions
- ✅ System program calls
- ✅ Account creation via CPI

## Prerequisites

Before running this project, ensure you have:

- [Rust](https://rustup.rs/) installed
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) installed
- Node.js / bun / litesvm for client-side testing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ketan27j/cpi_solana.git
cd cpi_solana
```

2. Install Rust dependencies:
```bash
cargo build-bpf
```

## Usage

### Running Tests

```bash
bun test
```

## CPI Examples Included

### 1. Basic CPI Call
Demonstrates how to make a simple cross-program invocation.

### 2. Token Transfer via CPI
Shows how to transfer SPL tokens using CPI to the Token program.

### 3. Account Creation
Example of creating accounts via CPI to the System program.


## Resources

- [Solana CPI Documentation](https://solana.com/docs/core/cpi)
- [Solana Cookbook - CPI](https://solanacookbook.com/references/programs.html#how-to-do-cross-program-invocation)
- https://www.canva.com/design/DAGk-iTF7VU/1NZkynObNlGecuGVs9x_nA/view

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have questions or need help:

- Open an issue on GitHub
- Check the [Solana Stack Exchange](https://solana.stackexchange.com/)
- Join the [Solana Discord](https://discord.gg/solana)

## Acknowledgments

- Solana Foundation for excellent documentation
- Solana developer community for best practices

---

**Note**: This is an educational project. Always audit smart contracts before deploying to mainnet.
