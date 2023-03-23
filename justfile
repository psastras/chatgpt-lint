# May be one of:
# x86_64-unknown-linux-gnu, x86_64-pc-windows-msvc,
# x86_64-apple-darwin, aarch64-apple-darwin
target := env_var_or_default('TARGET', 'aarch64-apple-darwin')

build:
  deno compile --allow-read --allow-net --allow-env \
    --target={{target}} \
    --output target/chatgpt-lint_{{target}} src/main.ts
  echo target/chatgpt-lint_{{target}}
test:
  deno test

clean:
  rm -rf target
