# DG\_Tabs: An ADA-Friendly Tab Plugin

-----

`DG_Tabs` is a lightweight, accessible TypeScript plugin that provides basic tab functionality adhering to ADA (Americans with Disabilities Act) standards. It ensures a seamless and inclusive user experience for all.

## Features

  * **ADA Compliant:** Built with accessibility in mind, supporting keyboard navigation and proper ARIA attributes.
  * **Lightweight:** A simple, no-frills solution for common tab panel requirements.
  * **Easy to Use:** Quickly integrate interactive tabs into your web projects with minimal setup.

## Installation

This is a TypeScript class. Simply include the `DG_Tabs` class in your project. There's no complex installation process or external dependencies.

## Usage

To use `DG_Tabs`, you need to:

1.  **Structure your HTML:** Ensure your tab list and corresponding tab panels follow the recommended ARIA design patterns. Each tab should have `role="tab"` and an `aria-controls` attribute pointing to the ID of its associated tab panel. Each tab panel should have `role="tabpanel"`.

    ```html
    <div class="tabs-container">
      <div role="tablist" aria-label="My Tabs">
        <button id="tab-1" role="tab" aria-controls="panel-1">Tab 1</button>
        <button id="tab-2" role="tab" aria-controls="panel-2">Tab 2</button>
        <button id="tab-3" role="tab" aria-controls="panel-3">Tab 3</button>
      </div>

      <div id="panel-1" role="tabpanel" aria-labelledby="tab-1">
        <p>Content for Tab 1</p>
      </div>
      <div id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>
        <p>Content for Tab 2</p>
      </div>
      <div id="panel-3" role="tabpanel" aria-labelledby="tab-3" hidden>
        <p>Content for Tab 3</p>
      </div>
    </div>
    ```

2.  **Initialize the `DG_Tabs` class:** Pass the `tablist` HTML element to the `DG_Tabs` constructor.

    ```typescript
    document.addEventListener('DOMContentLoaded', () => {
      const tabListElement = document.querySelector('[role="tablist"]');
      if (tabListElement) {
        new DG_Tabs(tabListElement as HTMLElement);
      }
    });
    ```

### Keyboard Interaction

The `DG_Tabs` plugin supports the following keyboard interactions for enhanced accessibility:

  * **Left Arrow (←):** Moves focus to the previous tab. If on the first tab, moves to the last tab.
  * **Right Arrow (→):** Moves focus to the next tab. If on the last tab, moves to the first tab.
  * **Home:** Moves focus to the first tab.
  * **End:** Moves focus to the last tab.

## Author

Keith Spang

## Version

1.0.0
