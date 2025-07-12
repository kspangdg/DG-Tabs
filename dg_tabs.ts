/**
 * @class DG_Accordion
 * @description Accordion plugin, nothing fancy.
 * @author Keith Spang
 * @version 1.0.0
 */

interface AccordionOptions {
  el: HTMLElement | null;
  open_multiple?: boolean;
}

interface AccordionItem {
  button: HTMLButtonElement;
  content: HTMLElement;
  open: boolean;
  toggle: (open: boolean) => void;
}

class DG_Accordion {
  private defaults: AccordionOptions = {
    el: null,
    open_multiple: false,
  };
  private options: AccordionOptions;
  private accourdion_items: AccordionItem[] = [];
  private buttons: NodeListOf<Element>;

  constructor(args: AccordionOptions) {
    this.options = { ...this.defaults, ...args };

    if (!this.options.el) {
      console.error("DG_Accordion: 'el' option is required and must be an HTMLElement.");
      return;
    }

    this.buttons = this.options.el.querySelectorAll('[data-dgaccordion-trigger]');

    for (let i = 0; i < this.buttons.length; i++) {
      const button = this.buttons[i] as HTMLButtonElement;
      const content_id = button.getAttribute('aria-controls');
      
      if (!content_id) {
        console.warn(`DG_Accordion: Button with id "${button.id}" is missing 'aria-controls' attribute.`);
        continue;
      }

      const content = document.getElementById(content_id);
      
      if (!content) {
        console.warn(`DG_Accordion: No content found for button with id "${button.id}" and aria-controls="${content_id}".`);
        continue;
      }

      // check if content is already open
      const open = button.getAttribute('aria-expanded') === 'true';

      // create accordion item
      const item: AccordionItem = {
        button: button,
        content: content,
        open: open,
        toggle: function(open: boolean) {
          if (open === this.open) return;
          this.open = open;

          // update button state
          this.button.setAttribute('aria-expanded', `${open}`);
          // update content visibility
          if (open) {
            this.content.setAttribute('aria-hidden', 'false');
          } else {
            this.content.setAttribute('aria-hidden', 'true');
          }
        }
      };
      this.accourdion_items.push(item);
    }

    this.init();
  }

  private close_all(): void {
    for (let i = 0; i < this.accourdion_items.length; i++) {
      const item = this.accourdion_items[i];
      if (item.open) {
        item.toggle(false);
      }
    }
  }

  private init(): void {
    // add event listeners
    for (let i = 0; i < this.accourdion_items.length; i++) {
      const item = this.accourdion_items[i];
      item.button.addEventListener('click', () => {
        if (!this.options.open_multiple) {
          this.close_all();
        }
        item.toggle(!item.open);
      });
    }
  }
}

