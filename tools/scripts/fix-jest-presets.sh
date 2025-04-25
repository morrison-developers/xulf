#!/bin/bash

echo "🔍 Scanning for invalid Jest presets..."

grep -r "preset:" apps libs | grep "preset:" | while read -r line; do
  config=$(echo $line | cut -d: -f1)
  preset=$(grep "preset:" $config | sed -E "s/.*preset:\s*['\"](.*)['\"],?/\1/")
  preset_path="$(dirname $config)/$preset"

  if [ ! -f "$preset_path" ]; then
    echo "⚠️  Missing preset in $config → $preset"
    echo "💥 Commenting out broken preset in $config"
    # Comment out the preset line
    sed -i.bak '/preset:/ s/^/\/\/ /' "$config"
  fi
done

echo "✅ All broken presets have been commented out."
