# ChatGPT Linter

Not meant for serious purposes.

CLI tool to lint a file using ChatGPT.

Sample usage:

```shell
$ OPENAI_API_KEY=<YOUR_OPENAI_API_KEY> chatgpt-lint check src/main.ts
src/main.ts 3:8 Use type annotations for yargs argument instead of 'any'
src/main.ts 12:7 Use optional chaining instead of force unwrapping OPENAI_API_KEY
src/main.ts 14:7 Use const instead of let for openAI variable
src/main.ts 16:7 Use object shorthand for createChatCompletion arguments
src/main.ts 17:11 Use template literals for messages content instead of concatenation
src/main.ts 23:3 Add error handling for Deno.readTextFile() and openAI.createChatCompletion()
```

## Install

Releases are published to [Github Releases](https://github.com/psastras/chatgpt-lint/releases/) for Linux and Mac.

From terminal using curl,

```shell
# make sure to adjust the target platform and version (you may also want to pin to a specific version)
curl -sSL https://github.com/psastras/chatgpt-lint/releases/latest/download/chatgpt-lint_aarch64-apple-darwin -o chatgpt-lint
```

## Develop

Assuming you have `nix` installed, in your shell run `nix develop`. This will install needed dependencies (`just` and `deno`). From there proceed as usual with your favorite editor.

To build, run `just`.

## How it Works

Calls ChatGPT with a prompt including the file's contents and returns the answers given. See the prompt in `src/main.ts`.
