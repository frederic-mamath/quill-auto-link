# Quill Auto Link

Quill Auto Link is a module for react-quill.

It allows the user to transform an URL when typing or pasting a text containing a URL.

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
