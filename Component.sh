#!/bin/bash

COMPONENTS_PATH="src/lib/Components"

echo "Choose Action:"
echo "1. Create Component"
echo "2. Delete Component"
read -p "Enter choice [1-2]: " action

read -p "Enter Component Name (e.g., Button): " NAME

if [ -z "$NAME" ]; then
  echo "❌ Component name required."
  exit 1
fi

COMP_PATH="$COMPONENTS_PATH/$NAME"

create_component() {
  if [ -d "$COMP_PATH" ]; then
    echo "❌ Component already exists at $COMP_PATH"
    exit 1
  fi

  mkdir -p "$COMP_PATH"

  # Component file
  cat <<EOF > "$COMP_PATH/$NAME.tsx"
import * as React from 'react';
import './$NAME.scss';

export interface ${NAME}Props extends React.ComponentPropsWithoutRef<'div'> {
}

function $NAME({ ...props }: ${NAME}Props) {
  return (
    <div {...props}>
      $NAME
    </div>
  );
}

export default $NAME;
EOF

  # Index file
  echo "export { default as $NAME } from './$NAME';" > "$COMP_PATH/index.ts"
  echo "export type { ${NAME}Props } from './$NAME';" > "$COMP_PATH/index.ts"
  

  # SCSS file
  touch "$COMP_PATH/$NAME.scss"

  # Test file
  cat <<EOF > "$COMP_PATH/$NAME.test.tsx"
import { render } from '@testing-library/react';
import $NAME from './$NAME';

it('renders without crashing', () => {
  render(<$NAME />);
});
EOF

  # Storybook file
  cat <<EOF > "$COMP_PATH/$NAME.stories.tsx"
import type { Meta, StoryFn } from '@storybook/react';
import $NAME from './$NAME';

export default {
  title: 'General/$NAME',
  component: $NAME,
  decorators: [(story) => <div className="container">{story()}</div>],
} as Meta<typeof $NAME>;

export const Template: StoryFn<typeof $NAME> = (args) => <$NAME {...args} />;
EOF

  # Add to global index.ts
  echo "export * from './$NAME';" >> "$COMPONENTS_PATH/index.ts"

  echo "✅ Component '$NAME' created at $COMP_PATH"
}

delete_component() {
  if [ ! -d "$COMP_PATH" ]; then
    echo "❌ Component does not exist."
    exit 1
  fi

  rm -rf "$COMP_PATH"
  sed -i '' "/.\/$NAME/d" "$COMPONENTS_PATH/index.ts"

  echo "🗑️  Component '$NAME' deleted from $COMP_PATH"
}

if [ "$action" -eq 1 ]; then
  create_component
elif [ "$action" -eq 2 ]; then
  delete_component
else
  echo "❌ Invalid action"
  exit 1
fi
