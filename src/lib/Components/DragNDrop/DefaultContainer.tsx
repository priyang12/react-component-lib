import * as React from 'react';

/**
 * Props for the DefaultContainer component.
 *
 * Provides a basic file input container used as a fallback within drag-and-drop upload UIs.
 *
 * @property id - The `id` for the file input and label association. Defaults to `'dnd-input'`.
 * @property text - Text displayed within the label prompting users to upload. Defaults to a standard drag-and-drop message.
 * @property inputHidden - Whether the file input is visually hidden. Defaults to `true`.
 * @property onFileSelect - Callback triggered when a file is selected via the file input.
 * @property onClickLabel - Optional click handler for the label element.
 */
export interface DefaultContainerProps {
   /** HTML `id` used to associate the file input and label. */
   id?: string;
   /** Instructional or prompt text displayed to the user. */
   text?: string;
   /** Whether the file input is hidden from view. */
   inputHidden?: boolean;
   /** Callback invoked when a file is selected via the file picker. */
   onFileSelect?: (file: File) => void;
   /** Optional click handler when the label is clicked. */
   onClickLabel?: () => void;
}

/**
 * Default container component for file uploads.
 *
 * Typically used as a fallback UI within a drag-and-drop upload interface.
 * Displays instructional text and a file input element.
 *
 * @returns A basic file upload container with label-triggered input.
 *
 * @example
 * <DefaultContainer onFileSelect={(file) => console.log(file.name)} />
 */
function DefaultContainer({
   id = 'dnd-input',
   text = 'Drag & Drop a file here or click to upload',
   inputHidden = true,
   onFileSelect,
   onClickLabel,
}: DefaultContainerProps) {
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && onFileSelect) {
         onFileSelect(file);
      }
   };

   return (
      <div className="dnd-default-container">
         <label
            htmlFor={id}
            onClick={onClickLabel}
            style={{ cursor: 'pointer' }}
         >
            <p>{text}</p>
         </label>

         <input
            id={id}
            type="file"
            hidden={inputHidden}
            onChange={handleInputChange}
            aria-label={text}
         />
      </div>
   );
}

export default DefaultContainer;
