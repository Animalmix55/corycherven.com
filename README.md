# Cory Cherven's Personal Portfolio Website

This is the repository for my personal portfolio website. It is a monorepo managed with Yarn Plug'n'Play (PnP) and contains multiple packages.

## Packages

- `@cory/root`: The root package.
- `@cory/web-root`: The web root package.
- `@cory/web-home`: The web home package.

## Installation

To install the dependencies, run:

```sh
yarn install
```

## Commands

### Build

To build the web projects, run:

```sh
yarn workspace @cory/web-root build
yarn workspace @cory/web-home build
```

Alternatively, you can build all packages from the root by running:

```sh
yarn build
```

### Start

To start the web projects, run:

```sh
yarn workspace @cory/web-root start
yarn workspace @cory/web-home start
```

Alternatively, you can start all packages from the root by running:

```sh
yarn start
```

### Lint

To lint all web projects, run:

```sh
yarn lint
```

## Output

The web projects output a single-spa application built with Rollup for SystemJS.
