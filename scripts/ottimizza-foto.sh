#!/bin/zsh
# Alleggerisce le foto del sito (dalla cartella del sito: zsh scripts/ottimizza-foto.sh)
# 1. le foto oltre 250 KB vengono ricompresse (stesse misure, differenza invisibile)
# 2. per ogni foto nasce una versione "-m" larga 760 px, che il browser usa dove la foto appare piccola
# Le foto già fatte vengono saltate: si può rilanciare ogni mese dopo aver aggiunto le foto nuove.
setopt null_glob
J="$PWD/scripts/jpeg.js"
for f in assets/img/privati/*.jpg assets/img/eventi/*/*.jpg assets/img/librazine/*/1.jpg casa-libra/assets/img/*.jpg; do
  [[ $f == *-m.jpg ]] && continue
  if (( $(du -k "$f" | cut -f1) > 250 )); then
    osascript -l JavaScript "$J" "$PWD/$f" /tmp/libra-foto.jpg 0 0.45 >/dev/null
    (( $(du -k /tmp/libra-foto.jpg | cut -f1) * 10 < $(du -k "$f" | cut -f1) * 9 )) && mv /tmp/libra-foto.jpg "$f"
  fi
  m="${f%.jpg}-m.jpg"
  [[ -f $m ]] || osascript -l JavaScript "$J" "$PWD/$f" "$PWD/$m" 760 0.45 >/dev/null
done
