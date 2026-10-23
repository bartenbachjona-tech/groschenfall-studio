#!/bin/bash
# $1 in, $2 out  — Johannes: 1,2 Halbtöne tiefer (Variante 1) + 6 % schneller
R=$(python3 -c "print(2**(-1.2/12))"); T=$(python3 -c "print(1.06/2**(-1.2/12))")
ffmpeg -loglevel error -y -i "$1" -af "asetrate=44100*$R,aresample=44100,atempo=$T" -ac 1 "$2"
