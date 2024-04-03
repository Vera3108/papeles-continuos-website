# papeles-continuos

- usar node 14.\*
- puede ocurrir que no se tenga la versión de Python correcta, por lo que hay que hacer:

  ```bash
  # Instalar pyenv
  brew update
  brew install pyenv

  # Instalar una versión de Python compatible, por ejemplo, Python 3.10

  pyenv install 3.10.0
  pyenv global 3.10.0
  ```

- y copiar esto en .zshrc:

  ```bash
  export PATH="$HOME/.pyenv/bin:$PATH"
  eval "$(pyenv init --path)"
  eval "$(pyenv init -)"
  ```

- hacer `source .zshrc`
- hacer `nvm install 14`
