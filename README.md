-----

# DG\_Accordion

A lightweight and straightforward JavaScript plugin for creating accessible accordions.

-----

## Features

  * **Simple Setup**: Easily initialize an accordion with minimal configuration.
  * **Accessibility Focused**: Adheres to WAI-ARIA practices with `aria-expanded`, `aria-controls`, and `aria-hidden` attributes for improved accessibility.
  * **Toggle Multiple Items**: Option to allow multiple accordion items to be open simultaneously.

-----

## Installation

To use `DG_Accordion`, simply include the JavaScript file in your project. There's no complex build process or dependencies.

```html
<script src="path/to/dg_accordion.min.js"></script>
```

-----

## Usage

### HTML Structure

Your HTML should follow a specific structure for the accordion to function correctly. Each accordion "trigger" (button) needs a `data-dgaccordion-trigger` attribute and an `aria-controls` attribute pointing to the ID of its corresponding content. The content itself should have an `id` matching the `aria-controls` value.

```html
<div id="myAccordionContainer">
    <button type="button" data-dgaccordion-trigger aria-expanded="false" aria-controls="content1">
        Accordion Title 1
    </button>
    <div id="content1" aria-hidden="true">
        <p>This is the content for accordion item 1.</p>
    </div>

    <button type="button" data-dgaccordion-trigger aria-expanded="false" aria-controls="content2">
        Accordion Title 2
    </button>
    <div id="content2" aria-hidden="true">
        <p>This is the content for accordion item 2.</p>
        <p>It can contain any HTML content.</p>
    </div>

    <button type="button" data-dgaccordion-trigger aria-expanded="true" aria-controls="content3">
        Accordion Title 3 (Initially Open)
    </button>
    <div id="content3" aria-hidden="false">
        <p>This accordion item starts in an open state.</p>
    </div>
</div>
```

-----

### JavaScript Initialization

Initialize the `DG_Accordion` by passing an options object to its constructor. The `el` property is required and should be the parent `HTMLElement` that contains your accordion triggers and content.

```javascript
// Initialize a basic accordion where only one item can be open at a time
new DG_Accordion({
    el: document.getElementById('myAccordionContainer')
});

// Initialize an accordion where multiple items can be open simultaneously
new DG_Accordion({
    el: document.getElementById('myAccordionContainer'),
    open_multiple: true
});
```

-----

## Options

| Option        | Type           | Default | Description                                                                                             |
| :------------ | :------------- | :------ | :------------------------------------------------------------------------------------------------------ |
| `el`          | `HTMLElement`  | `null`  | **Required**. The root DOM element containing all accordion buttons and content.                        |
| `open_multiple` | `boolean`      | `false` | If `true`, allows multiple accordion items to be open simultaneously. If `false`, only one item can be open at a time (toggles others closed). |

-----

## Development

### Running the Plugin

After including the `dg_accordion.min.js` file, ensure your HTML is set up correctly, and then instantiate the `DG_Accordion` class with your desired options.

### Error Handling

The plugin includes basic error and warning messages in the console if:

  * The `el` option is not provided.
  * An accordion trigger button is missing the `aria-controls` attribute.
  * No content element is found for a given `aria-controls` ID.

-----

## Author

**Keith Spang**

-----

## Version

1.0.0

-----