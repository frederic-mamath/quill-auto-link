# Quill Auto Link

Quill Auto Link is a module for react-quill.

It allows the user to transform an URL when typing or pasting a text containing a URL into Quill's editor.

## Installation

> npm install --save quill-auto-link

## Documentation

```
import { Quill } from 'react-quill';

...

Quill.register('modules/autoLinkType', AutoLinkType);
Quill.register('modules/autoLinkPaste', AutoLinkPaste);

const modules = {
    ...,
    autoLinkPaste: true,
    autoLinkType: true,
    ...,
};

...

const Component = () => (
    <ReactQuill
        ...
        modules={{
            ...modules,
        }}
        ...
    >
      {children}
    </ReactQuill>
)
```

## Compatibility

The versions greater than the ones mentioned are incompatible with IE11.

- react-quill: 1.3.5
  - quill: 1.3.7
