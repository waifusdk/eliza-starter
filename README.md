# W.A.I.F.U starter for ElizaOS

This is the starter for W.A.I.F.U using the ElizaOS framework. Currently, its only meant to be as an example of what is possible and help developers get started using waifuSDK.

Please refer to the [ElizaOS documentation](https://github.com/elizaos/eliza) for setup.

# How is W.A.I.F.U used?

In this example we are using W.A.I.F.U to use elizaOS and ask questions about specific tokens and its analysis on them.

## Demo Video

<div align="center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/Gw7DDG22sT0" title="WaifuSDK Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

# Setup

1. Clone the repository

```bash
git clone https://github.com/waifusdk/waifu-eliza-starter.git
```

2. Navigate to the repository

```bash
cd waifu-eliza-starter
```

3. Install the dependencies

```bash
pnpm install
```

1. Setup .env

```bash
cp .env.example .env
```

5. Start the elizaOS

```bash
pnpm start
```

6. Add functionality to your agent

Edit src/waifu.ts

7. Run chat for testing

```bash
pnpm waifu
```
