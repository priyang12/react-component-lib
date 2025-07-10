#!/bin/bash

LAYOUTS_PATH="src/lib/Layouts"

echo "Choose Action:"
echo "1. Create Layout"
echo "2. Delete Layout"
read -p "Enter choice [1-2]: " action

read -p "Enter Layout Name (e.g., SidebarLayout): " NAME

if [ -z "$NAME" ]; then
  echo "❌ Layout name required."
  exit 1
fi

LAYOUT_PATH="$LAYOUTS_PATH/$NAME"

create_layout() {
  if [ -d "$LAYOUT_PATH" ]; then
    echo "❌ Layout already exists at $LAYOUT_PATH"
    exit 1
  fi

  mkdir -p "$LAYOUT_PATH"

  # Layout file
  cat <<EOF > "$LAYOUT_PATH/$NAME.tsx"
import * as React from 'react';
import clsx from 'clsx';
import './$NAME.scss';

export interface ${NAME}Props extends React.ComponentPropsWithoutRef<'div'>{
  
}

function $NAME({ className, children, ...props  }: ${NAME}Props) {
  return (
    <div className={clsx("$NAME", className)} {...props}>
      {children}
    </div>
  );
}

export default $NAME;
EOF

  # Index file
  echo "export { default as $NAME } from './$NAME';" > "$LAYOUT_PATH/index.ts"
  echo "export type { ${NAME}Props } from './$NAME';" >> "$LAYOUT_PATH/index.ts"

  # SCSS file
  touch "$LAYOUT_PATH/$NAME.scss"

  # Test file
  cat <<EOF > "$LAYOUT_PATH/$NAME.test.tsx"
import { render } from '@testing-library/react';
import $NAME from './$NAME';

it('renders children correctly', () => {
  const { getByText } = render(<$NAME>Test Content</$NAME>);
  expect(getByText('Test Content')).toBeInTheDocument();
});
EOF

  # Storybook file
  cat <<EOF > "$LAYOUT_PATH/$NAME.stories.tsx"
import type { Meta, StoryFn } from '@storybook/react';
import $NAME from './$NAME';

export default {
  title: 'Layouts/$NAME',
  component: $NAME,
} as Meta<typeof $NAME>;

export const Default: StoryFn<typeof $NAME> = (args) => (
  <$NAME {...args}>Sample Layout Content</$NAME>
);
EOF

  # Add to global index.ts
  echo "export * from './$NAME';" >> "$LAYOUTS_PATH/index.ts"

  echo "✅ Layout '$NAME' created at $LAYOUT_PATH"
}

delete_layout() {
  if [ ! -d "$LAYOUT_PATH" ]; then
    echo "❌ Layout does not exist."
    exit 1
  fi

  rm -rf "$LAYOUT_PATH"
  sed -i '' "/.\/$NAME/d" "$LAYOUTS_PATH/index.ts"

  echo "🗑️  Layout '$NAME' deleted from $LAYOUT_PATH"
}

if [ "$action" -eq 1 ]; then
  create_layout
elif [ "$action" -eq 2 ]; then
  delete_layout
else
  echo "❌ Invalid action"
  exit 1
fi
