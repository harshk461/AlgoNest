#!/bin/bash

if [[ "$LANGUAGE" == "cpp" ]]; then
  g++ /app/main.cpp -o /app/main && /app/main
elif [[ "$LANGUAGE" == "python" ]]; then
  python3 /app/script.py
elif [[ "$LANGUAGE" == "java" ]]; then
  javac /app/Main.java && java -cp /app Main
else
  echo "Unsupported language"
  exit 1
fi
